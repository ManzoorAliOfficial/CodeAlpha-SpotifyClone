import { useState, useEffect } from 'react'
import useDebounce from './useDebounce'
import { MOCK_SONGS, MOCK_ARTISTS, MOCK_ALBUMS, MOCK_PLAYLISTS } from '../constants/mockSongs'

const useSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ songs: [], artists: [], albums: [], playlists: [] })
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, 350)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults({ songs: [], artists: [], albums: [], playlists: [] })
      return
    }
    setLoading(true)
    // Simulate async search
    const timer = setTimeout(() => {
      const q = debouncedQuery.toLowerCase()
      setResults({
        songs: MOCK_SONGS.filter(
          (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
        ),
        artists: MOCK_ARTISTS.filter((a) => a.name.toLowerCase().includes(q)),
        albums: MOCK_ALBUMS.filter(
          (a) => a.name.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)
        ),
        playlists: MOCK_PLAYLISTS.filter((p) => p.name.toLowerCase().includes(q)),
      })
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [debouncedQuery])

  return { query, setQuery, results, loading }
}

export default useSearch