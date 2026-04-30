import React from 'react'
import { User } from 'lucide-react'

const Avatar = ({ src, name, size = 'md', className = '' }) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
  }

  const initials = name
    ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : null

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center bg-sp-elevated flex-shrink-0 ${sizes[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={name || 'avatar'} className="w-full h-full object-cover" />
      ) : initials ? (
        <span className="font-bold text-white">{initials}</span>
      ) : (
        <User size={16} className="text-sp-muted" />
      )}
    </div>
  )
}

export default Avatar