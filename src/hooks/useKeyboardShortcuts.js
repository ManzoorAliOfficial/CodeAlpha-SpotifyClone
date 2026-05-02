import { useEffect } from 'react'
import usePlayerStore from '../store/usePlayerStore'

const useKeyboardShortcuts = () => {
  const {
    togglePlay,
    toggleMute,
    playNext,
    playPrev,
    currentSong,
    setVolume,
    volume,
    isMuted,
  } = usePlayerStore()

  useEffect(() => {
    const handler = (e) => {
      // Input ya textarea mein focus ho toh shortcuts kaam na karein
      const tag = e.target?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return

      switch (e.key) {
        case ' ':
          e.preventDefault()
          if (currentSong) togglePlay()
          break
        case 'ArrowRight':
          e.preventDefault()
          playNext()
          break
        case 'ArrowLeft':
          e.preventDefault()
          playPrev()
          break
        case 'm':
        case 'M':
          if (currentSong) toggleMute()
          break
        case 'ArrowUp':
          e.preventDefault()
          setVolume(Math.min(1, (isMuted ? 0 : volume) + 0.1))
          break
        case 'ArrowDown':
          e.preventDefault()
          setVolume(Math.max(0, (isMuted ? 0 : volume) - 0.1))
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentSong, volume, isMuted])
}

export default useKeyboardShortcuts