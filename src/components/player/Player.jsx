import React, { useState } from 'react'
import { Heart, Maximize2, ListMusic, Laptop2, Mic2 } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'
import useLibraryStore from '../../store/useLibraryStore'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'
import Tooltip from '../ui/Tooltip'
import LyricsPanel from '../lyrics/LyricsPanel'

const Player = () => {
  const { currentSong } = usePlayerStore()
  const { toggleLikeSong, isLiked } = useLibraryStore()
  const [lyricsOpen, setLyricsOpen] = useState(false)

  const liked = currentSong ? isLiked(currentSong.id) : false

  return (
    <>
      <footer className="hidden md:flex items-center justify-between bg-sp-black border-t border-sp-border px-4 h-[90px] flex-shrink-0 gap-4">
        {/* Left: song info */}
        <div className="flex items-center gap-3 w-[280px] min-w-0">
          {currentSong ? (
            <>
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-14 h-14 rounded object-cover flex-shrink-0 shadow"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
                <p className="text-xs text-sp-muted truncate">{currentSong.artist}</p>
              </div>
              <Tooltip content={liked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}>
                <button
                  onClick={() => toggleLikeSong(currentSong)}
                  className={`transition-colors flex-shrink-0 ${liked ? 'text-sp-green' : 'text-sp-muted hover:text-white'}`}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                </button>
              </Tooltip>
            </>
          ) : (
            <div className="text-sp-faint text-sm italic">Nothing playing</div>
          )}
        </div>

        {/* Center: controls + progress */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[600px]">
          <PlayerControls />
          <ProgressBar />
        </div>

        {/* Right: extra controls */}
        <div className="flex items-center gap-3 w-[280px] justify-end">
          {/* ✅ Lyrics button */}
          <Tooltip content="Lyrics">
            <button
              onClick={() => setLyricsOpen(!lyricsOpen)}
              className={`transition-colors ${lyricsOpen ? 'text-sp-green' : 'text-sp-muted hover:text-white'}`}
              disabled={!currentSong}
            >
              <Mic2 size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Queue">
            <button className="text-sp-muted hover:text-white transition-colors">
              <ListMusic size={18} />
            </button>
          </Tooltip>
          <Tooltip content="Connect to a device">
            <button className="text-sp-muted hover:text-white transition-colors">
              <Laptop2 size={18} />
            </button>
          </Tooltip>
          <VolumeControl />
          <Tooltip content="Full screen">
            <button className="text-sp-muted hover:text-white transition-colors">
              <Maximize2 size={16} />
            </button>
          </Tooltip>
        </div>
      </footer>

      {/* ✅ Lyrics Panel */}
      <LyricsPanel isOpen={lyricsOpen} onClose={() => setLyricsOpen(false)} />
    </>
  )
}

export default Player