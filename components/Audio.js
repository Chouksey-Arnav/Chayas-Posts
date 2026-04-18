'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/* ══════════════════════════════════════════════════════════════════════
   AudioPlayer — plays a Supabase-hosted audio URL with custom controls
   ══════════════════════════════════════════════════════════════════════ */
export function AudioPlayer({ url, title }) {
  const audioRef = useRef(null)
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume,   setVolume]   = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    const onLoaded  = () => setDuration(audio.duration)
    const onEnded   = () => { setPlaying(false); setProgress(0) }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      await audio.play()
      setPlaying(true)
    }
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const pct = parseFloat(e.target.value)
    audio.currentTime = (pct / 100) * audio.duration
    setProgress(pct)
  }

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const currentTime = audioRef.current
    ? (progress / 100) * (audioRef.current.duration || 0)
    : 0

  return (
    <div
      className="rounded-sm p-4 mt-4"
      style={{
        background: 'linear-gradient(135deg, rgba(45,8,16,0.06), rgba(200,155,58,0.08))',
        border: '1px solid rgba(200,155,58,0.2)',
      }}
    >
      <audio ref={audioRef} src={url} preload="metadata" />

      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#c9993a] text-lg">🎙</span>
        <span
          className="font-display italic text-sm"
          style={{ color: 'var(--ink-soft)' }}
        >
          {title || 'Voice Recording'}
        </span>
      </div>

      {/* Play + Progress */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, var(--burgundy-mid), var(--burgundy-bright))',
            color: '#f0d080',
            boxShadow: '0 2px 8px rgba(45,8,16,0.2)',
          }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="1" y="0" width="4" height="12" rx="1"/>
              <rect x="7" y="0" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <path d="M1 0.5L11.5 7L1 13.5V0.5Z"/>
            </svg>
          )}
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="audio-progress"
          />
          <div className="flex justify-between text-xs font-display" style={{ color: 'var(--ink-soft)' }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolume}
            className="audio-progress w-16"
          />
        </div>
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════════════
   AudioRecorder — record audio, preview it, then call onRecorded(blob)
   ══════════════════════════════════════════════════════════════════════ */
export function AudioRecorder({ onRecorded, disabled = false }) {
  const [status,   setStatus]   = useState('idle') // idle | recording | preview
  const [seconds,  setSeconds]  = useState(0)
  const [audioURL, setAudioURL] = useState(null)
  const [error,    setError]    = useState(null)

  const mediaRef    = useRef(null)
  const chunksRef   = useRef([])
  const timerRef    = useRef(null)
  const streamRef   = useRef(null)
  const blobRef     = useRef(null)

  const startRecording = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Pick best supported MIME type
      const mimeType = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ].find((m) => MediaRecorder.isTypeSupported(m)) || ''

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})
      mediaRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' })
        blobRef.current = blob
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        setStatus('preview')
        onRecorded && onRecorded(blob)
      }

      recorder.start(250)
      setStatus('recording')
      setSeconds(0)

      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
    } catch (err) {
      setError('Microphone access denied. Please allow microphone and try again.')
    }
  }, [onRecorded])

  const stopRecording = useCallback(() => {
    clearInterval(timerRef.current)
    if (mediaRef.current && mediaRef.current.state !== 'inactive') {
      mediaRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const resetRecording = () => {
    if (audioURL) URL.revokeObjectURL(audioURL)
    setAudioURL(null)
    blobRef.current = null
    setStatus('idle')
    setSeconds(0)
    onRecorded && onRecorded(null)
  }

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const formatSecs = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div
      className="rounded-sm p-5"
      style={{ background: 'rgba(45,8,16,0.04)', border: '1px solid rgba(200,155,58,0.18)' }}
    >
      <p className="section-label mb-3">Voice Recording</p>

      {error && (
        <p className="text-sm mb-3 px-3 py-2 rounded" style={{ background: 'rgba(180,30,30,0.08)', color: '#b81e30' }}>
          {error}
        </p>
      )}

      {status === 'idle' && (
        <button
          onClick={startRecording}
          disabled={disabled}
          className="btn-primary w-full justify-center"
          style={{ gap: '0.6rem' }}
        >
          <span>🎙</span> Start Recording
        </button>
      )}

      {status === 'recording' && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full recording-pulse"
              style={{ background: '#b81e30' }}
            />
            <span className="font-display text-lg" style={{ color: 'var(--ink-mid)' }}>
              Recording — {formatSecs(seconds)}
            </span>
          </div>
          <button
            onClick={stopRecording}
            className="btn-secondary"
          >
            ⏹ Stop Recording
          </button>
        </div>
      )}

      {status === 'preview' && audioURL && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-display italic" style={{ color: 'var(--gold-primary)' }}>
            ✓ Recording ready — {formatSecs(seconds)}
          </p>
          <audio src={audioURL} controls className="w-full" style={{ height: '36px' }} />
          <button
            onClick={resetRecording}
            className="text-sm font-display underline text-left"
            style={{ color: 'var(--ink-soft)' }}
          >
            Record again
          </button>
        </div>
      )}
    </div>
  )
}
