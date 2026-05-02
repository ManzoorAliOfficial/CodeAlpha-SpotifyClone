import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Music, Mic2 } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'

const API_BASE = 'https://musicapi.x007.workers.dev'

const LyricsPanel = ({ isOpen, onClose }) => {
  const { currentSong } = usePlayerStore()
  const [lyrics, setLyrics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFetchedId, setLastFetchedId] = useState(null)

  useEffect(() => {
    if (!isOpen || !currentSong?.apiId) return
    if (lastFetchedId === currentSong.apiId) return // Already fetched

    setLoading(true)
    setLyrics(null)
    setError(null)

    fetch(`${API_BASE}/lyrics?id=${currentSong.apiId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 200 && data.response) {
          setLyrics(data.response)
        } else {
          setError('Is song ke lyrics available nahi hain')
        }
        setLastFetchedId(currentSong.apiId)
      })
      .catch(() => setError('Lyrics load nahi ho sake'))
      .finally(() => setLoading(false))
  }, [isOpen, currentSong?.apiId])

  // Naya song aaye toh reset karo
  useEffect(() => {
    if (currentSong?.apiId !== lastFetchedId) {
      setLyrics(null)
      setError(null)
    }
  }, [currentSong?.id])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-[90px] w-full sm:w-[380px] bg-[#121212] border-l border-sp-border z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sp-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <Mic2 size={18} className="text-sp-green" />
              <span className="text-white font-bold text-sm">Lyrics</span>
            </div>
            <button onClick={onClose} className="text-sp-muted hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Song info */}
          {currentSong && (
            <div className="flex items-center gap-3 px-6 py-4 border-b border-sp-border flex-shrink-0">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-12 h-12 rounded-md object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{currentSong.title}</p>
                <p className="text-sp-muted text-xs truncate">{currentSong.artist}</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {!currentSong && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Music size={48} className="text-sp-muted mb-4" />
                <p className="text-sp-muted text-sm">Koi song play karo</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-8 h-8 border-2 border-sp-green border-t-transparent rounded-full animate-spin" />
                <p className="text-sp-muted text-sm">Lyrics dhoond raha hai...</p>
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Mic2 size={48} className="text-sp-muted mb-4" />
                <p className="text-sp-muted text-sm">{error}</p>
              </div>
            )}

            {lyrics && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <pre className="text-white text-sm leading-8 whitespace-pre-wrap font-sans">
                  {lyrics}
                </pre>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LyricsPanel