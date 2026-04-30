import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Grid2X2, List } from 'lucide-react'
import Header from '../components/layout/Header'
import PlaylistCard from '../components/cards/PlaylistCard'
import LibraryList from '../components/library/LibraryList'
import useLibraryStore from '../store/useLibraryStore'

const Library = () => {
  const { playlists } = useLibraryStore()
  const [view, setView] = useState('grid')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 py-6 pb-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Your Library</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sp-muted hover:text-white transition-colors text-sm font-semibold">
              <Plus size={16} />
              <span className="hidden sm:inline">Create playlist</span>
            </button>
            <div className="flex items-center gap-1 ml-3">
              <button
                onClick={() => setView('list')}
                className={`p-1.5 rounded transition-colors ${view === 'list' ? 'text-white' : 'text-sp-muted hover:text-white'}`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'text-white' : 'text-sp-muted hover:text-white'}`}
              >
                <Grid2X2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['Playlists', 'Artists', 'Albums', 'Podcasts'].map((f) => (
            <button
              key={f}
              className="px-3 py-1 rounded-full bg-sp-elevated text-white text-sm font-semibold hover:bg-sp-hover transition-colors first:bg-white first:text-black"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Content */}
        {view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {playlists.map((pl) => (
              <PlaylistCard key={pl.id} playlist={pl} />
            ))}
          </div>
        ) : (
          <LibraryList />
        )}
      </div>
    </motion.div>
  )
}

export default Library