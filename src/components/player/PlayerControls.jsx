import React from 'react'
import {
  Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Repeat1,
} from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'
import Tooltip from '../ui/Tooltip'

const PlayerControls = ({ size = 'md' }) => {
  const {
    isPlaying, shuffle, repeat,
    togglePlay, toggleShuffle, cycleRepeat, playNext, playPrev,
    currentSong,
  } = usePlayerStore()

  const btnSize = size === 'lg' ? 24 : 18
  const playSize = size === 'lg' ? 28 : 20

  const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat

  return (
    <div className={`flex items-center ${size === 'lg' ? 'gap-6' : 'gap-4'}`}>
      <Tooltip content="Shuffle">
        <button
          onClick={toggleShuffle}
          className={`transition-colors ${shuffle ? 'text-sp-green' : 'text-sp-muted hover:text-white'}`}
          disabled={!currentSong}
        >
          <Shuffle size={btnSize} />
        </button>
      </Tooltip>

      <Tooltip content="Previous">
        <button
          onClick={playPrev}
          className="text-sp-muted hover:text-white transition-colors disabled:opacity-40"
          disabled={!currentSong}
        >
          <SkipBack size={btnSize} fill="currentColor" />
        </button>
      </Tooltip>

      <button
        onClick={togglePlay}
        disabled={!currentSong}
        className={`${
          size === 'lg' ? 'w-16 h-16' : 'w-10 h-10'
        } bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 flex-shrink-0`}
      >
        {isPlaying ? (
          <Pause size={playSize} fill="black" className="text-black" />
        ) : (
          <Play size={playSize} fill="black" className="text-black ml-0.5" />
        )}
      </button>

      <Tooltip content="Next">
        <button
          onClick={playNext}
          className="text-sp-muted hover:text-white transition-colors disabled:opacity-40"
          disabled={!currentSong}
        >
          <SkipForward size={btnSize} fill="currentColor" />
        </button>
      </Tooltip>

      <Tooltip content={repeat === 'off' ? 'Enable repeat' : repeat === 'all' ? 'Enable repeat one' : 'Disable repeat'}>
        <button
          onClick={cycleRepeat}
          className={`transition-colors relative ${repeat !== 'off' ? 'text-sp-green' : 'text-sp-muted hover:text-white'}`}
          disabled={!currentSong}
        >
          <RepeatIcon size={btnSize} />
          {repeat !== 'off' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-sp-green rounded-full" />
          )}
        </button>
      </Tooltip>
    </div>
  )
}

export default PlayerControls