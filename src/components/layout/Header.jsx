import React from 'react'
import { ChevronLeft, ChevronRight, Bell, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const Header = ({ transparent = false, children }) => {
  const navigate = useNavigate()

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 flex-shrink-0 ${
        transparent
          ? 'bg-transparent'
          : 'bg-sp-bg/80 backdrop-blur-md border-b border-sp-border/30'
      }`}
    >
      {/* Nav arrows - desktop only */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="hidden md:flex w-8 h-8 bg-black/50 rounded-full items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => navigate(1)}
          className="hidden md:flex w-8 h-8 bg-black/50 rounded-full items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
        {children}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        <Button variant="outline" size="sm" className="hidden sm:flex text-xs font-bold">
          <ExternalLink size={14} className="mr-1.5" />
          Upgrade
        </Button>
        <button className="hidden md:flex w-8 h-8 bg-sp-elevated rounded-full items-center justify-center text-sp-muted hover:text-white transition-colors">
          <Bell size={16} />
        </button>
        <button className="flex items-center gap-2 bg-sp-elevated rounded-full p-0.5 pr-3 hover:bg-sp-hover transition-colors">
          <Avatar size="sm" name="User" />
          <span className="text-sm font-bold text-white hidden sm:block">User</span>
        </button>
      </div>
    </header>
  )
}

export default Header