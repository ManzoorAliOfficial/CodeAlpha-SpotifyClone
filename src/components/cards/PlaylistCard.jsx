import React from 'react'
import { Play, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import usePlayerStore from '../../store/usePlayerStore'

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate()
  const { playSong } = usePlayerStore()
  const isLiked = playlist.id === 'liked'

  const handlePlay = (e) => {
    e.stopPropagation()
    if (playlist.songs?.length > 0) {
      playSong(playlist.songs[0], playlist.songs)
    }
  }

  const handleClick = () => {
    if (isLiked) navigate('/collection/tracks')
    else navigate(`/playlist/${playlist.id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-sp-surface rounded-xl p-3 sm:p-4 cursor-pointer group hover:bg-sp-elevated transition-colors duration-200"
      onClick={handleClick}
    >
      <div className="relative mb-3 sm:mb-4">
        {isLiked ? (
          <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-400 flex items-center justify-center shadow-lg">
            <Heart size={48} fill="white" className="text-white" />
          </div>
        ) : (
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 bg-sp-green rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200"
          onClick={handlePlay}
        >
          <Play size={18} fill="black" className="text-black ml-0.5" />
        </motion.button>
      </div>

      <p className="font-bold text-sm text-white truncate mb-1">{playlist.name}</p>
      <p className="text-sp-muted text-xs line-clamp-2">
        {playlist.description || `By ${playlist.owner}`}
      </p>
    </motion.div>
  )
}

export default PlaylistCard