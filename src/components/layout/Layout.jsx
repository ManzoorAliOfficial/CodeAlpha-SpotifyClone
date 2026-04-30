import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Player from '../player/Player'
import MiniPlayer from '../player/MiniPlayer'
import MobilePlayer from '../player/MobilePlayer'
import usePlayerStore from '../../store/usePlayerStore'
import useAudio from '../../hooks/useAudio'

const Layout = () => {
  const [mobilePlayerOpen, setMobilePlayerOpen] = useState(false)
  const { currentSong } = usePlayerStore()

  // Mount audio engine at root
  useAudio()

  return (
    <div className="flex flex-col h-screen bg-sp-bg overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-sp-bg">
          <Outlet />
        </main>
      </div>

      {/* Desktop player */}
      <Player />

      {/* Mobile mini player + bottom nav */}
      <div className="md:hidden flex flex-col flex-shrink-0">
        <AnimatePresence>
          {currentSong && (
            <MiniPlayer onExpand={() => setMobilePlayerOpen(true)} />
          )}
        </AnimatePresence>
        <MobileNav />
      </div>

      {/* Mobile full screen player */}
      <MobilePlayer
        isOpen={mobilePlayerOpen}
        onClose={() => setMobilePlayerOpen(false)}
      />
    </div>
  )
}

export default Layout