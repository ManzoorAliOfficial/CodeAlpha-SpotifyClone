import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Pause, UserCheck, MoreHorizontal } from 'lucide-react'
import Header from '../components/layout/Header'
import SongCard from '../components/cards/SongCard'
import AlbumCard from '../components/cards/AlbumCard'
import SectionHeader from '../components/sections/SectionHeader'
import usePlayerStore from '../store/usePlayerStore'
import { MOCK_ARTISTS, MOCK_SONGS, MOCK_ALBUMS } from '../constants/mockSongs'
import { formatNumber } from '../utils/formatNumber'

const Artist = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playSong, togglePlay, currentSong, isPlaying } = usePlayerStore()
  const [following, setFollowing] = useState(false)

  const artist = MOCK_ARTISTS.find((a) => a.id === id)
  const artistSongs = MOCK_SONGS.slice(0, 5)
  const artistAlbums = MOCK_ALBUMS.slice(0, 3)

  if (!artist) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-xl font-bold text-white mb-2">Artist not found</p>
          <button onClick={() => navigate('/')} className="text-sp-green hover:underline">Go home</button>
        </div>
      </div>
    )
  }

  const isArtistActive = artistSongs.some((s) => s.id === currentSong?.id)

  const handlePlay = () => {
    if (isArtistActive) togglePlay()
    else playSong(artistSongs[0], artistSongs)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Header />

      {/* Hero banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={artist.cover}
          alt={artist.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sp-bg via-sp-bg/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-white font-semibold">Verified Artist</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-2">{artist.name}</h1>
          <p className="text-white/80 text-sm font-semibold">
            {artist.followers} monthly listeners
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={handlePlay}
          className="w-14 h-14 bg-sp-green rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          {isArtistActive && isPlaying
            ? <Pause size={24} fill="black" className="text-black" />
            : <Play size={24} fill="black" className="text-black ml-0.5" />
          }
        </button>
        <button
          onClick={() => setFollowing((f) => !f)}
          className={`px-5 py-1.5 rounded-full text-sm font-bold border transition-colors ${
            following
              ? 'border-sp-green text-sp-green hover:border-white hover:text-white'
              : 'border-sp-faint text-white hover:border-white'
          }`}
        >
          {following ? (
            <span className="flex items-center gap-2"><UserCheck size={14} /> Following</span>
          ) : 'Follow'}
        </button>
        <button className="text-sp-muted hover:text-white transition-colors">
          <MoreHorizontal size={22} />
        </button>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-10 space-y-10">
        {/* Popular tracks */}
        <section>
          <SectionHeader title="Popular" />
          <div className="space-y-1">
            {artistSongs.map((song, i) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-sp-elevated group cursor-pointer"
                onClick={() => playSong(song, artistSongs)}
              >
                <span className="w-5 text-sm text-sp-muted group-hover:hidden">{i + 1}</span>
                <Play size={14} fill="white" className="hidden group-hover:block text-white w-5 flex-shrink-0" />
                <img src={song.cover} alt={song.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${currentSong?.id === song.id ? 'text-sp-green' : 'text-white'}`}>
                    {song.title}
                  </p>
                </div>
                <span className="text-sm text-sp-muted">{formatNumber(Math.floor(Math.random() * 500_000_000 + 50_000_000))}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Discography */}
        <section>
          <SectionHeader title="Discography" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artistAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* About */}
        <section>
          <SectionHeader title="About" />
          <div className="relative rounded-xl overflow-hidden">
            <img src={artist.cover} alt={artist.name} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-2xl font-bold text-white mb-1">{artist.followers} monthly listeners</p>
              <p className="text-sp-muted text-sm">
                {artist.name} is one of the most streamed artists on Spotify with millions of fans worldwide.
              </p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

export default Artist