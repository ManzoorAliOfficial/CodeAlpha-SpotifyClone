import { useEffect, useRef, useCallback } from 'react'
import usePlayerStore from '../store/usePlayerStore'

const API_BASE = 'https://musicapi.x007.workers.dev'

// Stream URL fetch karo song ID se
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
    progress,
    repeat,
    setProgress,
    setDuration,
    setIsPlaying,
    playNext,
  } = usePlayerStore()

  // Load new song — agar audioUrl nahi hai toh API se fetch karo
  useEffect(() => {
    if (!currentSong) return
    const audio = audioRef.current

    const loadAndPlay = async () => {
      let url = currentSong.audioUrl

      // Agar song mein apiId hai (real API song) toh stream URL fetch karo
      if (currentSong.apiId) {
        url = await fetchStreamUrl(currentSong.apiId)
      }

      if (!url) {
        console.error('No audio URL found for this song')
        return
      }

      audio.src = url
      audio.load()
      if (isPlaying) {
        audio.play().catch(() => setIsPlaying(false))
      }
    }

    loadAndPlay()
  }, [currentSong?.id])

  // Play / pause
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

  // Time update / ended
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