import React, { useRef } from 'react'
import usePlayerStore from '../../store/usePlayerStore'
import useAudio from '../../hooks/useAudio'
import { formatTime } from '../../utils/formatTime'

const ProgressBar = ({ compact = false }) => {
  const { progress, duration } = usePlayerStore()
  const { seek } = useAudio()
  const barRef = useRef(null)

  const pct = duration > 0 ? (progress / duration) * 100 : 0

  const handleClick = (e) => {
    if (!barRef.current) return
    const rect = barRef.current.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    seek(ratio * duration)
  }

  const handleChange = (e) => {
    seek(Number(e.target.value))
  }

  if (compact) {
    return (
      <div className="progress-bar w-full" onClick={(e) => e.stopPropagation()}>
        <div
          ref={barRef}
          className="h-1 bg-sp-faint rounded-full cursor-pointer"
          onClick={handleClick}
        >
          <div
            className="h-full bg-sp-green rounded-full pointer-events-none"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="progress-bar flex items-center gap-2 w-full group">
      <span className="text-xs text-sp-muted w-9 text-right flex-shrink-0">{formatTime(progress)}</span>
      <div className="relative flex-1 flex items-center" style={{ '--progress': `${pct}%` }}>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={progress}
          onChange={handleChange}
          className="w-full h-1 cursor-pointer accent-white group-hover:accent-sp-green"
          style={{
            '--progress': `${pct}%`,
            background: `linear-gradient(to right, white ${pct}%, #535353 ${pct}%)`,
          }}
        />
      </div>
      <span className="text-xs text-sp-muted w-9 flex-shrink-0">{formatTime(duration)}</span>
    </div>
  )
}

export default ProgressBar