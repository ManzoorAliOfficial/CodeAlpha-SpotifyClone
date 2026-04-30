import React from 'react'
import { ChevronDown, Heart, ListMusic, MoreHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'
import useLibraryStore from '../../store/useLibraryStore'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'

const MobilePlayer = ({ isOpen, onClose }) => {
  const { currentSong } = usePlayerStore()
  const { toggleLikeSong, isLiked } = useLibraryStore()

  if (!currentSong) return null

  const liked = isLiked(currentSong.id)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[300] md:hidden flex flex-col"
          style={{
            background: 'linear-gradient(180deg, #1a3a2a 0%, #121212 60%)',
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-12 pb-4">
            <button onClick={onClose} className="text-white p-1">
              <ChevronDown size={28} />
            </button>
            <div className="text-center">
              <p className="text-xs text-sp-muted uppercase tracking-widest font-semibold">Now Playing</p>
              <p className="text-sm font-bold text-white truncate max-w-[200px]">{currentSong.album}</p>
            </div>
            <button className="text-white p-1">
              <MoreHorizontal size={24} />
            </button>
          </div>

          {/* Artwork */}
          <div className="flex-1 flex items-center justify-center px-8 py-4">
            <motion.img
              key={currentSong.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-full max-w-[300px] aspect-square object-cover rounded-xl shadow-2xl"
            />
          </div>

          {/* Song info + like */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-black text-white truncate">{currentSong.title}</h2>
                <p className="text-sp-muted font-semibold truncate">{currentSong.artist}</p>
              </div>
              <button
                onClick={() => toggleLikeSong(currentSong)}
                className={`ml-4 flex-shrink-0 transition-colors ${liked ? 'text-sp-green' : 'text-sp-muted'}`}
              >
                <Heart size={26} fill={liked ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <ProgressBar />
            </div>

            {/* Controls */}
            <div className="flex justify-center mb-6">
              <PlayerControls size="lg" />
            </div>

            {/* Volume + Queue */}
            <div className="flex items-center gap-3">
              <VolumeControl />
              <div className="flex-1" />
              <button className="text-sp-muted hover:text-white transition-colors">
                <ListMusic size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobilePlayer