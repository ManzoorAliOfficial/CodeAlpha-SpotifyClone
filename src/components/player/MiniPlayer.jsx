import React from 'react'
import { Play, Pause } from 'lucide-react'
import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'
import ProgressBar from './ProgressBar'

const MiniPlayer = ({ onExpand }) => {
  const { currentSong, isPlaying, togglePlay } = usePlayerStore()

  if (!currentSong) return null

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="md:hidden bg-sp-elevated rounded-xl mx-2 mb-1 overflow-hidden shadow-2xl"
    >
      <div
        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
        onClick={onExpand}
      >
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-10 h-10 rounded-md object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
          <p className="text-xs text-sp-muted truncate">{currentSong.artist}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay() }}
          className="w-9 h-9 flex items-center justify-center text-white"
        >
          {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" className="ml-0.5" />}
        </button>
      </div>
      <ProgressBar compact />
    </motion.div>
  )
}

export default MiniPlayer