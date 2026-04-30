import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Pause, Heart, MoreHorizontal, Shuffle, Clock } from 'lucide-react'
import Header from '../components/layout/Header'
import usePlayerStore from '../store/usePlayerStore'
import useLibraryStore from '../store/useLibraryStore'
import { MOCK_ALBUMS } from '../constants/mockSongs'
import { formatTime } from '../utils/formatTime'

const SongRow = ({ song, index, queue }) => {
  const { playSong, currentSong, isPlaying } = usePlayerStore()
  const { toggleLikeSong, isLiked } = useLibraryStore()
  const isActive = currentSong?.id === song.id
  const liked = isLiked(song.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-sp-elevated group cursor-pointer"
      onClick={() => playSong(song, queue)}
    >
      <div className="w-8 flex items-center justify-center text-sp-muted">
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
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isActive ? 'text-sp-green' : 'text-white'}`}>{song.title}</p>
        <p className="text-xs text-sp-muted">{song.artist}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); toggleLikeSong(song) }}
        className={`opacity-0 group-hover:opacity-100 transition-all mr-2 ${liked ? 'opacity-100 text-sp-green' : 'text-sp-muted hover:text-white'}`}
      >
        <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
      </button>
      <span className="text-sm text-sp-muted w-10 text-right">{formatTime(song.duration)}</span>
    </motion.div>
  )
}

const Album = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playSong, togglePlay, currentSong, isPlaying } = usePlayerStore()

  const album = MOCK_ALBUMS.find((a) => a.id === id)

  if (!album) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-xl font-bold text-white mb-2">Album not found</p>
          <button onClick={() => navigate('/')} className="text-sp-green hover:underline">Go home</button>
        </div>
      </div>
    )
  }

  const songs = album.songs || []
  const isAlbumActive = songs.some((s) => s.id === currentSong?.id)
  const totalDuration = songs.reduce((acc, s) => acc + (s.duration || 0), 0)

  const handlePlay = () => {
    if (isAlbumActive) togglePlay()
    else if (songs.length > 0) playSong(songs[0], songs)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Header />

      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-sp-bg/80 to-sp-bg" />
        <div className="relative z-10 flex flex-col sm:flex-row items-end gap-6 px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <img
            src={album.cover}
            alt={album.name}
            className="w-44 h-44 sm:w-56 sm:h-56 object-cover rounded-lg shadow-2xl flex-shrink-0"
          />
          <div className="flex-1 min-w-0 pb-2">
            <p className="text-xs font-bold uppercase text-white/70 mb-2">Album</p>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 leading-tight">{album.name}</h1>
            <p className="text-white/80 text-sm font-semibold">
              <span className="font-bold">{album.artist}</span>
              <span className="text-sp-muted mx-1">·</span>
              <span className="text-sp-muted">{album.year}</span>
              <span className="text-sp-muted mx-1">·</span>
              <span className="text-sp-muted">{songs.length} songs, {formatTime(totalDuration)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 px-4 sm:px-6 lg:px-8 pb-6">
        <button
          onClick={handlePlay}
          className="w-14 h-14 bg-sp-green rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          {isAlbumActive && isPlaying
            ? <Pause size={24} fill="black" className="text-black" />
            : <Play size={24} fill="black" className="text-black ml-0.5" />
          }
        </button>
        <button className="text-sp-muted hover:text-white transition-colors"><Shuffle size={22} /></button>
        <button className="text-sp-muted hover:text-white transition-colors"><MoreHorizontal size={22} /></button>
      </div>

      {/* Table header */}
      <div className="flex items-center gap-4 px-4 sm:px-6 lg:px-8 pb-2 border-b border-sp-border mb-2">
        <span className="w-8 text-center text-sp-muted text-sm">#</span>
        <span className="flex-1 text-xs font-semibold text-sp-muted uppercase tracking-wider">Title</span>
        <Clock size={14} className="text-sp-muted" />
      </div>

      {/* Songs */}
      <div className="px-4 sm:px-6 lg:px-8 pb-10">
        {songs.map((song, i) => (
          <SongRow key={song.id} song={song} index={i} queue={songs} />
        ))}
      </div>

      {/* Album footer */}
      <div className="px-4 sm:px-6 lg:px-8 pb-10 text-sp-muted text-sm">
        <p className="mb-1">© {album.year} {album.artist}</p>
        <p className="text-xs">℗ {album.year} {album.artist} under exclusive license</p>
      </div>
    </motion.div>
  )
}

export default Album