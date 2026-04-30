import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Search, Library, Plus, Heart, Music2 } from 'lucide-react'
import { motion } from 'framer-motion'
import useLibraryStore from '../../store/useLibraryStore'
import usePlayerStore from '../../store/usePlayerStore'

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
)

const navItems = [
  { to: '/', icon: Home, label: 'Home', exact: true },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/library', icon: Library, label: 'Your Library' },
]

const Sidebar = () => {
  const { playlists } = useLibraryStore()
  const { playSong } = usePlayerStore()
  const navigate = useNavigate()

  return (
    <aside className="hidden md:flex flex-col bg-sp-black h-full w-[240px] flex-shrink-0 overflow-hidden">
      {/* Logo */}
      <div className="px-6 pt-6 pb-2">
        <NavLink to="/" className="flex items-center gap-2 text-white hover:text-sp-green transition-colors">
          <div className="w-8 h-8 text-sp-green">
            <SpotifyLogo />
          </div>
          <span className="text-xl font-black tracking-tight">Spotify</span>
        </NavLink>
      </div>

      {/* Primary nav */}
      <nav className="px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-md font-semibold text-sm transition-colors duration-150 ${
                isActive ? 'text-white' : 'text-sp-muted hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} className={isActive ? 'text-white' : 'text-sp-muted'} strokeWidth={isActive ? 2.5 : 2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="h-px bg-sp-border mx-3" />

      {/* Library section */}
      <div className="flex-1 overflow-hidden flex flex-col px-3 py-4">
        <div className="flex items-center justify-between px-3 mb-3">
          <span className="text-sp-muted font-semibold text-sm">Your Library</span>
          <button className="w-7 h-7 flex items-center justify-center rounded-full text-sp-muted hover:text-white hover:bg-sp-elevated transition-colors">
            <Plus size={18} />
          </button>
        </div>

        {/* Liked songs shortcut */}
        <button
          onClick={() => navigate('/collection/tracks')}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sp-surface transition-colors w-full text-left group mb-1"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-700 to-blue-400 rounded flex items-center justify-center flex-shrink-0">
            <Heart size={16} fill="white" className="text-white" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Liked Songs</p>
            <p className="text-xs text-sp-muted truncate">Playlist</p>
          </div>
        </button>

        {/* Playlist list */}
        <div className="overflow-y-auto flex-1 space-y-1 mt-1">
          {playlists.filter((p) => p.id !== 'liked').map((pl) => (
            <motion.button
              key={pl.id}
              whileHover={{ x: 2 }}
              onClick={() => navigate(`/playlist/${pl.id}`)}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sp-surface transition-colors w-full text-left"
            >
              {pl.cover ? (
                <img src={pl.cover} alt={pl.name} className="w-10 h-10 rounded object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 bg-sp-elevated rounded flex items-center justify-center flex-shrink-0">
                  <Music2 size={16} className="text-sp-muted" />
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{pl.name}</p>
                <p className="text-xs text-sp-muted truncate">Playlist · {pl.owner}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar