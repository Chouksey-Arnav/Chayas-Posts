-- ================================================================
-- CHAYA'S POSTS — Supabase Database Schema
-- ================================================================
-- HOW TO USE:
--   1. Open your Supabase project
--   2. Go to SQL Editor (left sidebar) → New Query
--   3. Paste this ENTIRE file and click Run
-- ================================================================


-- ── Posts table ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  type       TEXT        NOT NULL CHECK (type IN ('poem', 'prose')),
  title      TEXT        NOT NULL,
  content    TEXT,                      -- nullable: audio-only posts have no text
  audio_url  TEXT,                      -- nullable: text-only posts have no audio
  published  BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- At least one of content or audio_url must be present
  CONSTRAINT has_content CHECK (content IS NOT NULL OR audio_url IS NOT NULL)
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS posts_touch_updated_at ON public.posts;
CREATE TRIGGER posts_touch_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Index so the homepage query (published=true ORDER BY created_at DESC) is fast
CREATE INDEX IF NOT EXISTS posts_feed_idx ON public.posts (published, created_at DESC);


-- ── Row-Level Security ───────────────────────────────────────────
--  Anyone (anon key) can READ published posts.
--  The service_role key used by the admin API bypasses RLS entirely,
--  so no extra write policy is needed.
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can read published posts" ON public.posts;
CREATE POLICY "public can read published posts"
  ON public.posts FOR SELECT
  USING (published = TRUE);


-- ── Storage bucket for audio ─────────────────────────────────────
--  Creates the "audio" bucket if it doesn't already exist.
--  The bucket is PUBLIC so audio URLs work without auth tokens.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio', 'audio', TRUE,
  26214400,   -- 25 MB per file
  ARRAY['audio/webm','audio/webm;codecs=opus','audio/mp4','audio/mpeg',
        'audio/mp3','audio/ogg','audio/wav','audio/x-wav','audio/aac','audio/flac']
)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read (stream/download) audio files
DROP POLICY IF EXISTS "public can read audio" ON storage.objects;
CREATE POLICY "public can read audio"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'audio');

-- Service-role (admin API) bypasses RLS for uploads — no extra policy needed.


-- ── Verify setup ─────────────────────────────────────────────────
-- Run these two queries after the above to confirm everything was created:
--
-- SELECT id, type, title FROM public.posts LIMIT 5;
-- SELECT id, name, public FROM storage.buckets WHERE id = 'audio';
