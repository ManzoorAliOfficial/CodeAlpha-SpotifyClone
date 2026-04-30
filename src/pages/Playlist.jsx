import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Play, Pause, Heart, MoreHorizontal, Clock, Search as SearchIcon,
  Shuffle, Plus
} from 'lucide-react'
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
      className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_1fr_auto_auto] gap-4 items-center px-4 py-2 rounded-md hover:bg-sp-elevated group cursor-pointer"
      onClick={() => playSong(song, queue)}
    >
      {/* Index / eq */}
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
        <img src={song.cover} alt={song.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />
        <div className="min-w-0">
          <p className={`text-sm font-semibold truncate ${isActive ? 'text-sp-green' : 'text-white'}`}>
            {song.title}
          </p>
          <p className="text-xs text-sp-muted truncate">{song.artist}</p>
        </div>
      </div>

      {/* Album – hidden on mobile */}
      <p className="text-sm text-sp-muted truncate hidden sm:block">{song.album}</p>

      {/* Like button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleLikeSong(song) }}
        className={`opacity-0 group-hover:opacity-100 transition-all ${liked ? 'opacity-100 text-sp-green' : 'text-sp-muted hover:text-white'}`}
      >
        <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
      </button>

      {/* Duration */}
      <span className="text-sm text-sp-muted w-10 text-right hidden sm:block">{formatTime(song.duration)}</span>
    </motion.div>
  )
}

const Playlist = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playlists } = useLibraryStore()
  const { playSong, togglePlay, currentSong, isPlaying, toggleShuffle } = usePlayerStore()

  const playlist = playlists.find((p) => p.id === id)

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full text-sp-muted">
        <div className="text-center">
          <p className="text-xl font-bold text-white mb-2">Playlist not found</p>
          <button onClick={() => navigate('/')} className="text-sp-green hover:underline">
            Go home
          </button>
        </div>
      </div>
    )
  }

  const songs = playlist.songs || []
  const isPlaylistActive = songs.some((s) => s.id === currentSong?.id)

  const handlePlayAll = () => {
    if (isPlaylistActive) {
      togglePlay()
    } else if (songs.length > 0) {
      playSong(songs[0], songs)
    }
  }

  const totalDuration = songs.reduce((acc, s) => acc + (s.duration || 0), 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />

      {/* Hero */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 via-sp-bg/80 to-sp-bg"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-end gap-6 px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          {/* Cover */}
          <div className="flex-shrink-0">
            {playlist.cover ? (
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="w-44 h-44 sm:w-56 sm:h-56 object-cover rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-44 h-44 sm:w-56 sm:h-56 bg-gradient-to-br from-indigo-700 to-blue-400 rounded-lg shadow-2xl flex items-center justify-center">
                <Heart size={64} fill="white" className="text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pb-2">
            <p className="text-xs font-bold uppercase text-white/70 mb-2">Playlist</p>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 leading-tight">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-sp-muted text-sm mb-3">{playlist.description}</p>
            )}
            <p className="text-white/80 text-sm font-semibold">
              <span className="font-bold">Spotify</span>
              <span className="text-sp-muted mx-1">·</span>
              <span className="text-sp-muted">{songs.length} songs, {formatTime(totalDuration)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 pb-6">
        <button
          onClick={handlePlayAll}
          className="w-14 h-14 bg-sp-green rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
        >
          {isPlaylistActive && isPlaying ? (
            <Pause size={24} fill="black" className="text-black" />
          ) : (
            <Play size={24} fill="black" className="text-black ml-0.5" />
          )}
        </button>
        <button
          onClick={toggleShuffle}
          className="text-sp-muted hover:text-white transition-colors"
        >
          <Shuffle size={22} />
        </button>
        <button className="text-sp-muted hover:text-white transition-colors">
          <MoreHorizontal size={22} />
        </button>
      </div>

      {/* Search within playlist */}
      {songs.length > 8 && (
        <div className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex items-center gap-2 bg-sp-elevated rounded-md px-3 py-2 max-w-xs">
            <SearchIcon size={14} className="text-sp-muted" />
            <input
              type="text"
              placeholder="Find in playlist"
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

      {/* Songs */}
      <div className="px-4 sm:px-6 lg:px-8 pb-10">
        {songs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white font-semibold text-lg mb-1">This playlist is empty</p>
            <p className="text-sp-muted text-sm">Add songs to get started</p>
          </div>
        ) : (
          songs.map((song, i) => (
            <SongRow
              key={song.id}
              song={song}
              index={i}
              queue={songs}
              isActive={currentSong?.id === song.id}
              isPlaying={isPlaying}
            />
          ))
        )}
      </div>
    </motion.div>
  )
}

export default Playlist