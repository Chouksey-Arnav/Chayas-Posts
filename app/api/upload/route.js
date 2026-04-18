import { NextResponse } from 'next/server';
import { dbAdmin, isAdmin } from '@/lib/db';

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

export async function POST(req) {
  // ── Auth check ────────────────────────────────────────────────────
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('audio');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No audio file provided.' }, { status: 400 });
    }

    // ── Size guard ────────────────────────────────────────────────────
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 25 MB.' },
        { status: 413 }
      );
    }

    // ── Type guard (accept any audio/* MIME type) ─────────────────────
    if (!file.type.startsWith('audio/')) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Only audio files are accepted.` },
        { status: 415 }
      );
    }

    // ── Build a unique path ───────────────────────────────────────────
    const ext = (file.name?.split('.').pop() || 'webm').toLowerCase();
    const key = `audio/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // ── Upload to Supabase Storage ────────────────────────────────────
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { data, error } = await dbAdmin.storage
      .from('audio')
      .upload(key, bytes, {
        contentType: file.type || 'audio/webm',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload audio. Please try again.' },
        { status: 500 }
      );
    }

    // ── Return the public URL ─────────────────────────────────────────
    const { data: urlData } = dbAdmin.storage
      .from('audio')
      .getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl });

  } catch (err) {
    console.error('Upload route error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred during upload.' },
      { status: 500 }
    );
  }
}
