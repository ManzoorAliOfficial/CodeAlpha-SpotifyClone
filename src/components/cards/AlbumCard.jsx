import React from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import usePlayerStore from '../../store/usePlayerStore'

const AlbumCard = ({ album }) => {
  const navigate = useNavigate()
  const { playSong } = usePlayerStore()

  const handlePlay = (e) => {
    e.stopPropagation()
    if (album.songs?.length > 0) {
      playSong(album.songs[0], album.songs)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-sp-surface rounded-xl p-3 sm:p-4 cursor-pointer group hover:bg-sp-elevated transition-colors duration-200"
      onClick={() => navigate(`/album/${album.id}`)}
    >
      <div className="relative mb-3 sm:mb-4">
        <img
          src={album.cover}
          alt={album.name}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 bg-sp-green rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200"
          onClick={handlePlay}
        >
          <Play size={18} fill="black" className="text-black ml-0.5" />
        </motion.button>
      </div>

      <p className="font-bold text-sm text-white truncate mb-1">{album.name}</p>
      <p className="text-sp-muted text-xs truncate">
        {album.year && `${album.year} · `}
        {album.artist}
      </p>
    </motion.div>
  )
}

export default AlbumCard