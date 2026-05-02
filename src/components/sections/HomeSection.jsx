import React from 'react'
import CardRow from './CardRow'
import QuickAccessGrid from './QuickAccessGrid'
import SongCard from '../cards/SongCard'
import AlbumCard from '../cards/AlbumCard'
import ArtistCard from '../cards/ArtistCard'
import PlaylistCard from '../cards/PlaylistCard'
import { MOCK_SONGS, MOCK_ALBUMS, MOCK_ARTISTS, MOCK_PLAYLISTS } from '../../constants/mockSongs'

const HomeSection = () => {
  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-5">{greeting()}</h1>
      <QuickAccessGrid />

      <CardRow title="Recently played" cols={5}>
        {MOCK_SONGS.slice(0, 5).map((song) => (
          <SongCard key={song.id} song={song} queue={MOCK_SONGS} />
        ))}
      </CardRow>

      <CardRow title="Made for you" cols={5}>
        {MOCK_PLAYLISTS.slice(0, 5).map((pl) => (
          <PlaylistCard key={pl.id} playlist={pl} />
        ))}
      </CardRow>

      <CardRow title="Popular artists" cols={5}>
        {MOCK_ARTISTS.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </CardRow>

      <CardRow title="Popular albums" cols={5}>
        {MOCK_ALBUMS.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </CardRow>

      <CardRow title="Trending now" cols={5}>
        {MOCK_SONGS.slice(5).map((song) => (
          <SongCard key={song.id} song={song} queue={MOCK_SONGS} />
        ))}
      </CardRow>

      <CardRow title="Charts" cols={5}>
        {MOCK_PLAYLISTS.slice(1, 6).map((pl) => (
          <PlaylistCard key={pl.id} playlist={pl} />
        ))}
      </CardRow>
    </div>
  )
}

export default HomeSection