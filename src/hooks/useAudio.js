import { useEffect, useRef, useCallback } from 'react'
import usePlayerStore from '../store/usePlayerStore'

const API_BASE = 'https://musicapi.x007.workers.dev'

export const fetchStreamUrl = async (songId) => {
  try {
    const res = await fetch(`${API_BASE}/fetch?id=${songId}`)
    const data = await res.json()
    if (data.status === 200) return data.response
    return null
  } catch {
    return null
  }
}

const useAudio = () => {
  const audioRef = useRef(new Audio())
  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    repeat,
    setProgress,
    setDuration,
    setIsPlaying,
    playNext,
  } = usePlayerStore()

  // ✅ FIX: audioUrl null ho toh apiId se fetch karo (queue ke baaki songs ke liye)
  useEffect(() => {
    if (!currentSong) return
    const audio = audioRef.current

    const loadAndPlay = async () => {
      let url = currentSong.audioUrl

      // Queue mein next song ka audioUrl null hoga — fetch karo
      if (!url && currentSong.apiId) {
        url = await fetchStreamUrl(currentSong.apiId)
      }

      if (!url) {
        console.error('Audio URL nahi mili:', currentSong.title)
        setIsPlaying(false)
        return
      }

      audio.src = url
      audio.load()
      audio.play().catch(() => setIsPlaying(false))
    }

    loadAndPlay()
  }, [currentSong?.id])

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current
    if (!currentSong) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Volume
  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Events
  useEffect(() => {
    const audio = audioRef.current
    const onTimeUpdate = () => setProgress(audio.currentTime)
    const onDuration = () => setDuration(audio.duration)
    const onEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0
        audio.play()
      } else {
        playNext()
      }
    }
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onDuration)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('ended', onEnded)
    }
  }, [repeat])

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time
    setProgress(time)
  }, [])

  return { audioRef, seek }
}

export default useAudio