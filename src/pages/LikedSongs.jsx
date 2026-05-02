import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Heart, Clock, Shuffle, MoreHorizontal, Search as SearchIcon } from 'lucide-react'
import Header from '../components/layout/Header'
import useLibraryStore from '../store/useLibraryStore'
import usePlayerStore from '../store/usePlayerStore'
import { formatTime } from '../utils/formatTime'

const SongRow = ({ song, index, queue, isActive, isPlaying }) => {
  const { playSong } = usePlayerStore()
  const { toggleLikeSong, isLiked } = useLibraryStore()
  const liked = isLiked(song.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className="grid grid-cols-[auto_1fr_auto_auto_auto] sm:grid-cols-[auto_1fr_1fr_auto_auto] gap-4 items-center px-4 py-2 rounded-md hover:bg-sp-elevated group cursor-pointer"
      onClick={() => playSong(song, queue)}
    >
      {/* Index */}
      <div className="w-8 flex items-center justify-center text-sp-muted group-hover:text-white">
        {isActive && isPlaying ? (
          <div className="flex gap-0.5 items-end h-4">
            <div className="w-0.5 bg-sp-green rounded-sm eq-bar-1" style={{ height: 8 }} />
            <div className="w-0.5 bg-sp-green rounded-sm eq-bar-2" style={{ height: 12 }} />
            <div className="w-0.5 bg-sp-green rounded-sm eq-bar-3" style={{ height: 8 }} />
          </div>
        ) : (
          <>
            <span className={`text-sm group-hover:hidden ${isActive ? 'text-sp-green' : ''}`}>{index + 1}</span>
            <Play size={14} fill="white" className="hidden group-hover:block text-white" />
          </>
        )}
      </div>

      {/* Cover + title */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.cover}
          alt={song.title}
          className="w-10 h-10 rounded object-cover flex-shrink-0"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/40x40/1DB954/000?text=M' }}
        />
        <div className="min-w-0">
          <p className={`text-sm font-semibold truncate ${isActive ? 'text-sp-green' : 'text-white'}`}>
            {song.title}
          </p>
          <p className="text-xs text-sp-muted truncate">{song.artist}</p>
        </div>
      </div>

      {/* Album */}
      <p className="text-sm text-sp-muted truncate hidden sm:block">{song.album || '—'}</p>

      {/* Unlike button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleLikeSong(song) }}
        className={`transition-all ${liked ? 'opacity-100 text-sp-green' : 'opacity-0 group-hover:opacity-100 text-sp-muted hover:text-white'}`}
      >
        <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
      </button>

      {/* Duration */}
      <span className="text-sm text-sp-muted w-10 text-right hidden sm:block">
        {song.duration ? formatTime(song.duration) : '—'}
      </span>
    </motion.div>
  )
}

const LikedSongs = () => {
  const { likedSongs } = useLibraryStore()
  const { playSong, togglePlay, toggleShuffle, currentSong, isPlaying } = usePlayerStore()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = likedSongs.filter((s) =>
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.artist?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isPlaylistActive = filteredSongs.some((s) => s.id === currentSong?.id)

  const handlePlayAll = () => {
    if (isPlaylistActive) {
      togglePlay()
    } else if (filteredSongs.length > 0) {
      playSong(filteredSongs[0], filteredSongs)
    }
  }

  const totalDuration = filteredSongs.reduce((acc, s) => acc + (s.duration || 0), 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pb-10"
    >
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-[#4B3BA8] to-[#121212] px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="flex flex-col sm:flex-row items-end gap-6">
          {/* Liked Songs gradient cover */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 bg-gradient-to-br from-[#4B3BA8] to-[#2D2B55] flex items-center justify-center rounded-lg shadow-2xl">
            <Heart size={80} fill="white" className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold uppercase mb-2">Playlist</p>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">Liked Songs</h1>
            <p className="text-sp-muted text-sm">
              {likedSongs.length} songs
              {totalDuration > 0 && ` · ${formatTime(totalDuration)}`}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={handlePlayAll}
          disabled={likedSongs.length === 0}
          className="w-14 h-14 bg-sp-green rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg disabled:opacity-40"
        >
          {isPlaylistActive && isPlaying ? (
            <Pause size={24} fill="black" className="text-black" />
          ) : (
            <Play size={24} fill="black" className="text-black ml-0.5" />
          )}
        </button>
        <button onClick={toggleShuffle} className="text-sp-muted hover:text-white transition-colors">
          <Shuffle size={22} />
        </button>
        <button className="text-sp-muted hover:text-white transition-colors">
          <MoreHorizontal size={22} />
        </button>
      </div>

      {likedSongs.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <Heart size={64} className="text-sp-muted mb-4" />
          <p className="text-white text-xl font-bold mb-2">Songs jo aapko pasand hain</p>
          <p className="text-sp-muted text-sm max-w-xs">
            Kisi bhi song ke saath heart icon tap karo — woh yahan dikh jaayega
          </p>
        </div>
      ) : (
        <>
          {/* Search within liked songs */}
          {likedSongs.length > 8 && (
            <div className="px-4 sm:px-6 lg:px-8 pb-4">
              <div className="flex items-center gap-2 bg-sp-elevated rounded-md px-3 py-2 max-w-xs">
                <SearchIcon size={14} className="text-sp-muted" />
                <input
                  type="text"
                  placeholder="Find in liked songs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder-sp-muted outline-none flex-1"
                />
              </div>
            </div>
          )}

          {/* Table header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] sm:grid-cols-[auto_1fr_1fr_auto_auto] gap-4 items-center px-4 sm:px-6 lg:px-8 pb-2 border-b border-sp-border mb-2">
            <span className="w-8 text-center text-sp-muted text-sm">#</span>
            <span className="text-xs font-semibold text-sp-muted uppercase tracking-wider">Title</span>
            <span className="text-xs font-semibold text-sp-muted uppercase tracking-wider hidden sm:block">Album</span>
            <span className="w-6" />
            <Clock size={14} className="text-sp-muted hidden sm:block" />
          </div>

          {/* Songs list */}
          <div className="px-4 sm:px-6 lg:px-8">
            {filteredSongs.length === 0 ? (
              <p className="text-sp-muted text-sm text-center py-8">"{searchQuery}" se koi song nahi mila</p>
            ) : (
              filteredSongs.map((song, i) => (
                <SongRow
                  key={song.id}
                  song={song}
                  index={i}
                  queue={filteredSongs}
                  isActive={currentSong?.id === song.id}
                  isPlaying={isPlaying}
                />
              ))
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}

export default LikedSongs