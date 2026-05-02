import React, { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Player from '../player/Player'
import MiniPlayer from '../player/MiniPlayer'
import MobilePlayer from '../player/MobilePlayer'
import usePlayerStore from '../../store/usePlayerStore'
import useAudio from '../../hooks/useAudio'
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts'
import useRecentlyPlayedStore from '../../store/useRecentlyPlayedStore'

const Layout = () => {
  const [mobilePlayerOpen, setMobilePlayerOpen] = useState(false)
  const { currentSong } = usePlayerStore()
  const { addRecentSong } = useRecentlyPlayedStore()
  const lastSongId = useRef(null)

  // Audio engine mount
  useAudio()

  // Keyboard shortcuts
  useKeyboardShortcuts()

  // ✅ Jab bhi currentSong change ho, recently played mein save karo
  useEffect(() => {
    if (currentSong && currentSong.id !== lastSongId.current) {
      lastSongId.current = currentSong.id
      addRecentSong(currentSong)
    }
  }, [currentSong?.id])

  return (
    <div className="flex flex-col h-screen bg-sp-bg overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-sp-bg">
          <Outlet />
        </main>
      </div>

      <Player />

      <div className="md:hidden flex flex-col flex-shrink-0">
        <AnimatePresence>
          {currentSong && (
            <MiniPlayer onExpand={() => setMobilePlayerOpen(true)} />
          )}
        </AnimatePresence>
        <MobileNav />
      </div>

      <MobilePlayer
        isOpen={mobilePlayerOpen}
        onClose={() => setMobilePlayerOpen(false)}
      />
    </div>
  )
}

export default Layout