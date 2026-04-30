import React from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

const SongCard = ({ song, queue = [], showArtist = true }) => {
  const { playSong, currentSong, isPlaying } = usePlayerStore()
  const isActive = currentSong?.id === song.id

  const handlePlay = (e) => {
    e.stopPropagation()
    if (isActive) {
      usePlayerStore.getState().togglePlay()
    } else {
      playSong(song, queue)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-sp-surface rounded-xl p-3 sm:p-4 cursor-pointer group hover:bg-sp-elevated transition-colors duration-200 relative"
      onClick={handlePlay}
    >
      <div className="relative mb-3 sm:mb-4">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
        <motion.button
          initial={{ opacity: 0, y: 8, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          animate={isActive && isPlaying ? { opacity: 1, y: 0, scale: 1 } : {}}
          className="absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 bg-sp-green rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200"
          onClick={handlePlay}
        >
          {isActive && isPlaying ? (
            <div className="flex gap-0.5 items-end h-4">
              <div className="w-1 bg-black rounded-sm eq-bar-1" style={{ height: 8 }} />
              <div className="w-1 bg-black rounded-sm eq-bar-2" style={{ height: 12 }} />
              <div className="w-1 bg-black rounded-sm eq-bar-3" style={{ height: 8 }} />
            </div>
          ) : (
            <Play size={18} fill="black" className="text-black ml-0.5" />
          )}
        </motion.button>
      </div>

      <p className={`font-bold text-sm truncate mb-1 ${isActive ? 'text-sp-green' : 'text-white'}`}>
        {song.title}
      </p>
      {showArtist && (
        <p className="text-sp-muted text-xs truncate">{song.artist}</p>
      )}
    </motion.div>
  )
}

export default SongCard