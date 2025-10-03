import { useState, useRef, useCallback, useEffect } from 'react'

type AudioState = {
  isPlaying: boolean
  isMuted: boolean
  isLoaded: boolean
  error: string | null
}

export const useAudio = (audioSrc: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isMuted: false,
    isLoaded: false,
    error: null,
  })

  useEffect(() => {
    const audio = new Audio(audioSrc)
    audio.loop = true
    audio.preload = 'auto'

    const handleCanPlay = () => {
      setAudioState((prev) => ({ ...prev, isLoaded: true, error: null }))
    }

    const handleError = () => {
      setAudioState((prev) => ({
        ...prev,
        error: 'Failed to load audio',
        isLoaded: false,
      }))
    }

    const handlePlay = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: true }))
    }

    const handlePause = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: false }))
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    audioRef.current = audio

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.pause()
      audioRef.current = null
    }
  }, [audioSrc])

  const playAudio = useCallback(async () => {
    if (!audioRef.current || !audioState.isLoaded) return

    try {
      await audioRef.current.play()
    } catch {
      setAudioState((prev) => ({
        ...prev,
        error: 'Autoplay prevented by browser',
      }))
    }
  }, [audioState.isLoaded])

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
  }, [])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return

    const newMutedState = !audioState.isMuted
    audioRef.current.muted = newMutedState
    setAudioState((prev) => ({ ...prev, isMuted: newMutedState }))
  }, [audioState.isMuted])

  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = Math.max(0, Math.min(1, volume))
  }, [])

  return {
    audioState,
    playAudio,
    pauseAudio,
    toggleMute,
    setVolume,
  }
}
