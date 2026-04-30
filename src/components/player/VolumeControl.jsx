import React from 'react'
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'
import Tooltip from '../ui/Tooltip'

const VolumeControl = () => {
  const { volume, isMuted, setVolume, toggleMute } = usePlayerStore()

  const displayVol = isMuted ? 0 : volume
  const pct = displayVol * 100

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />
    if (volume < 0.33) return <Volume size={18} />
    if (volume < 0.66) return <Volume1 size={18} />
    return <Volume2 size={18} />
  }

  return (
    <div className="volume-bar flex items-center gap-2">
      <Tooltip content={isMuted ? 'Unmute' : 'Mute'}>
        <button onClick={toggleMute} className="text-sp-muted hover:text-white transition-colors">
          <VolumeIcon />
        </button>
      </Tooltip>
      <div className="w-24 flex items-center" style={{ '--progress': `${pct}%` }}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={displayVol}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-1 cursor-pointer"
          style={{
            background: `linear-gradient(to right, white ${pct}%, #535353 ${pct}%)`,
          }}
        />
      </div>
    </div>
  )
}

export default VolumeControl