import React from 'react'
import { Play, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import usePlayerStore from '../../store/usePlayerStore'
import { HOME_QUICK_ACCESS } from '../../constants/mockSongs'

const QuickAccessGrid = () => {
  const navigate = useNavigate()
  const { playSong } = usePlayerStore()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-8">
      {HOME_QUICK_ACCESS.map((item) => (
        <div
          key={item.id}
          className="bg-sp-elevated rounded-md flex items-center gap-3 overflow-hidden cursor-pointer hover:bg-[#3a3a3a] transition-colors duration-200 group relative h-14 sm:h-16"
          onClick={() => navigate(item.route)}
        >
          {item.gradient ? (
            <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
              <Heart size={22} fill="white" className="text-white" />
            </div>
          ) : (
            <img
              src={item.cover}
              alt={item.name}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover flex-shrink-0"
            />
          )}
          <span className="font-bold text-sm text-white truncate pr-2">{item.name}</span>
          <button className="absolute right-2 w-9 h-9 bg-sp-green rounded-full items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hidden sm:flex">
            <Play size={14} fill="black" className="ml-0.5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default QuickAccessGrid