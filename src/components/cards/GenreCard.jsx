import React from 'react'
import { motion } from 'framer-motion'

const GenreCard = ({ genre, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      onClick={() => onClick?.(genre)}
      className="relative rounded-lg overflow-hidden cursor-pointer h-16 sm:h-20 flex items-start p-3"
      style={{ backgroundColor: genre.color }}
    >
      <span className="font-bold text-sm sm:text-base text-white z-10 relative">{genre.name}</span>
      <div
        className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg transform rotate-[25deg] translate-x-2 translate-y-2 opacity-80"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      />
    </motion.div>
  )
}

export default GenreCard