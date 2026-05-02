import { useState, useEffect } from 'react'
import SearchBar from '../components/search/SearchBar'
import usePlayerStore from '../store/usePlayerStore'

const API_BASE = 'https://musicapi.x007.workers.dev'
const ENGINES = [
  { value: 'gaama', label: '🎵 Gaana' },
  { value: 'seevn', label: '🎶 Saavn' },
  { value: 'hunjama', label: '🎸 Hungama' },
  { value: 'mtmusic', label: '🎤 MT Music' },
]

const Search = () => {
  const [query, setQuery] = useState('')
  const [engine, setEngine] = useState('gaama')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingId, setLoadingId] = useState(null)

  const { playSong } = usePlayerStore()

  const searchSongs = async (q) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}&searchEngine=${engine}`)
      const data = await res.json()
      if (data.status === 200) {
        setResults(data.response)
      } else {
        setError('Koi song nahi mila')
        setResults([])
      }
    } catch {
      setError('API se connect nahi ho raha')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) searchSongs(query)
      else setResults([])
    }, 600)
    return () => clearTimeout(timer)
  }, [query, engine])

  // ✅ FIX: clicked song ka stream URL fetch karo, phir baaki songs bhi queue mein sahi object banao
  const handlePlay = async (song) => {
    setLoadingId(song.id)
    try {
      const res = await fetch(`${API_BASE}/fetch?id=${song.id}`)
      const data = await res.json()
      const streamUrl = data.status === 200 ? data.response : null

      if (!streamUrl) {
        alert('Yeh song play nahi ho raha, doosra try karo')
        return
      }

      const toSongObj = (s, url = null) => ({
        id: s.id,
        apiId: s.id,           // useAudio hook is se stream fetch karega
        title: s.title,
        artist: s.subtitle || 'Unknown Artist',
        album: '',
        cover: s.img,          // ✅ coverImage nahi, cover — Player.jsx is field ko use karta hai
        audioUrl: url,         // clicked song ka url hai, baaki null rahenge (useAudio fetch karega)
        duration: 0,
      })

      const clickedSong = toSongObj(song, streamUrl)
      const queue = results.map((s) => s.id === song.id ? clickedSong : toSongObj(s))

      // ✅ playSong use karo — yeh currentSong + queue + isPlaying sab ek saath set karta hai
      playSong(clickedSong, queue)
    } catch {
      alert('Song load nahi ho saka')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="px-6 py-4 text-white min-h-screen bg-[#121212]">
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
        <SearchBar value={query} onChange={setQuery} />
        <select
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
          className="bg-[#2a2a2a] text-white text-sm px-4 py-2.5 rounded-full outline-none border border-[#3a3a3a] cursor-pointer"
        >
          {ENGINES.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-[#b3b3b3] mb-4">
          <div className="w-4 h-4 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
          Dhoond raha hai...
        </div>
      )}

      {error && <p className="text-red-400 text-sm mb-4">⚠️ {error}</p>}

      {results.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((song) => (
              <div
                key={song.id}
                onClick={() => handlePlay(song)}
                className="bg-[#181818] hover:bg-[#282828] rounded-lg p-3 cursor-pointer transition-all group relative"
              >
                <div className="relative mb-3 rounded-md overflow-hidden aspect-square">
                  <img
                    src={song.img}
                    alt={song.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150x150/1DB954/000?text=Music' }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {loadingId === song.id ? (
                      <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl">
                        <svg viewBox="0 0 24 24" fill="black" width="22" height="22">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-white text-sm font-semibold truncate">{song.title}</p>
                {song.subtitle && (
                  <p className="text-[#b3b3b3] text-xs truncate mt-0.5">{song.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && !error && results.length === 0 && query.trim() && (
        <div className="text-center text-[#b3b3b3] mt-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">"{query}" ke liye koi results nahi mile</p>
          <p className="text-sm mt-2">Doosra engine try karo ya spelling check karo</p>
        </div>
      )}

      {!query.trim() && (
        <div className="text-center text-[#b3b3b3] mt-20">
          <p className="text-6xl mb-4">🎵</p>
          <p className="text-xl font-semibold text-white">Koi bhi song dhoondo</p>
          <p className="text-sm mt-2">Gaana, Saavn, Hungama — sab available hai</p>
        </div>
      )}
    </div>
  )
}

export default Search