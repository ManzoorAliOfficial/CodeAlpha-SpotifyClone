import { useEffect, useRef, useCallback } from 'react'
import usePlayerStore from '../store/usePlayerStore'

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

  // Load new song
  useEffect(() => {
    if (!currentSong?.audioUrl) return
    const audio = audioRef.current
    audio.src = currentSong.audioUrl
    audio.load()
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
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

  // Time update
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