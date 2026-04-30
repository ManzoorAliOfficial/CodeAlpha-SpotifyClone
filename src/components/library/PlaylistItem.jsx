import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Music2 } from 'lucide-react'

const PlaylistItem = ({ playlist }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (playlist.id === 'liked') navigate('/collection/tracks')
    else navigate(`/playlist/${playlist.id}`)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-sp-elevated transition-colors text-left"
    >
      {playlist.cover ? (
        <img src={playlist.cover} alt={playlist.name} className="w-12 h-12 rounded object-cover flex-shrink-0" />
      ) : (
        <div className="w-12 h-12 bg-sp-elevated rounded flex items-center justify-center flex-shrink-0">
          <Music2 size={20} className="text-sp-muted" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white truncate">{playlist.name}</p>
        <p className="text-xs text-sp-muted truncate">Playlist · {playlist.owner}</p>
      </div>
    </button>
  )
}

export default PlaylistItem