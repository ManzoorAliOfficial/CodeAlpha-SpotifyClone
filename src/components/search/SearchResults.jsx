import React from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'
import { formatTime } from '../../utils/formatTime'
import ArtistCard from '../cards/ArtistCard'
import AlbumCard from '../cards/AlbumCard'
import PlaylistCard from '../cards/PlaylistCard'
import SectionHeader from '../sections/SectionHeader'

const SongRow = ({ song, index, queue }) => {
  const { playSong, currentSong, isPlaying } = usePlayerStore()
  const isActive = currentSong?.id === song.id

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-sp-elevated group cursor-pointer"
      onClick={() => playSong(song, queue)}
    >
      <div className="w-8 flex items-center justify-center flex-shrink-0">
        {isActive && isPlaying ? (
          <div className="flex gap-0.5 items-end h-4">
            <div className="w-0.5 bg-sp-green rounded-sm eq-bar-1" style={{ height: 8 }} />
            <div className="w-0.5 bg-sp-green rounded-sm eq-bar-2" style={{ height: 12 }} />
            <div className="w-0.5 bg-sp-green rounded-sm eq-bar-3" style={{ height: 8 }} />
          </div>
        ) : (
          <>
            <span className={`text-sm group-hover:hidden ${isActive ? 'text-sp-green' : 'text-sp-muted'}`}>
              {index + 1}
            </span>
            <Play size={14} fill="white" className="text-white hidden group-hover:block" />
          </>
        )}
      </div>
      <img src={song.cover} alt={song.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isActive ? 'text-sp-green' : 'text-white'}`}>
          {song.title}
        </p>
        <p className="text-xs text-sp-muted truncate">{song.artist}</p>
      </div>
      <p className="text-sm text-sp-muted hidden sm:block">{song.album}</p>
      <p className="text-sm text-sp-muted w-12 text-right">{formatTime(song.duration)}</p>
    </motion.div>
  )
}

const SearchResults = ({ results }) => {
  const { songs, artists, albums, playlists } = results
  const hasResults = songs.length + artists.length + albums.length + playlists.length > 0

  if (!hasResults) {
    return (
      <div className="text-center py-16 text-sp-muted">
        <p className="text-lg font-semibold">No results found</p>
        <p className="text-sm mt-1">Try searching for something else</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {songs.length > 0 && (
        <section>
          <SectionHeader title="Songs" />
          <div className="space-y-1">
            {songs.map((song, i) => (
              <SongRow key={song.id} song={song} index={i} queue={songs} />
            ))}
          </div>
        </section>
      )}

      {artists.length > 0 && (
        <section>
          <SectionHeader title="Artists" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artists.map((a) => <ArtistCard key={a.id} artist={a} />)}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section>
          <SectionHeader title="Albums" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {albums.map((a) => <AlbumCard key={a.id} album={a} />)}
          </div>
        </section>
      )}

      {playlists.length > 0 && (
        <section>
          <SectionHeader title="Playlists" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {playlists.map((p) => <PlaylistCard key={p.id} playlist={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}

export default SearchResults