import { useEffect, useState } from 'react'
import CardRow from './CardRow'
import QuickAccessGrid from './QuickAccessGrid'
import usePlayerStore from '../../store/usePlayerStore'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

const API_BASE = 'https://musicapi.x007.workers.dev'

// Real trending searches — inhe API se fetch karenge
const TRENDING_QUERIES = [
  { query: 'arijit singh', label: 'Arijit Singh' },
  { query: 'bollywood hits 2024', label: 'Bollywood Hits' },
  { query: 'atif aslam', label: 'Atif Aslam' },
  { query: 'ap dhillon', label: 'AP Dhillon' },
  { query: 'trending english', label: 'Trending English' },
]

// Ek query se songs fetch karo
const fetchSongs = async (query) => {
  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&searchEngine=gaama`)
    const data = await res.json()
    if (data.status === 200) {
      return data.response.slice(0, 6).map((s) => ({
        id: s.id,
        apiId: s.id,
        title: s.title,
        artist: s.subtitle || 'Unknown',
        album: '',
        cover: s.img,
        audioUrl: null, // useAudio fetch karega jab play hoga
        duration: 0,
      }))
    }
  } catch {
    return []
  }
  return []
}

// Real song card for home page
const RealSongCard = ({ song, queue }) => {
  const { playSong, currentSong, isPlaying } = usePlayerStore()
  const isActive = currentSong?.id === song.id

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-sp-surface rounded-xl p-3 sm:p-4 cursor-pointer group hover:bg-sp-elevated transition-colors duration-200 relative"
      onClick={() => isActive ? usePlayerStore.getState().togglePlay() : playSong(song, queue)}
    >
      <div className="relative mb-3">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150x150/1DB954/000?text=Music' }}
        />
        <motion.button
          className="absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 bg-sp-green rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
          onClick={(e) => { e.stopPropagation(); isActive ? usePlayerStore.getState().togglePlay() : playSong(song, queue) }}
        >
          {isActive && isPlaying ? (
            <div className="flex gap-0.5 items-end h-4">
              <div className="w-1 bg-black rounded-sm" style={{ height: 8, animation: 'eq1 0.8s infinite' }} />
              <div className="w-1 bg-black rounded-sm" style={{ height: 12, animation: 'eq2 0.8s infinite' }} />
              <div className="w-1 bg-black rounded-sm" style={{ height: 8, animation: 'eq1 0.8s infinite 0.2s' }} />
            </div>
          ) : (
            <Play size={18} fill="black" className="text-black ml-0.5" />
          )}
        </motion.button>
      </div>
      <p className={`font-bold text-sm truncate mb-1 ${isActive ? 'text-sp-green' : 'text-white'}`}>
        {song.title}
      </p>
      <p className="text-sp-muted text-xs truncate">{song.artist}</p>
    </motion.div>
  )
}

// Skeleton loader
const SkeletonCard = () => (
  <div className="bg-sp-surface rounded-xl p-3 sm:p-4 animate-pulse">
    <div className="w-full aspect-square bg-sp-elevated rounded-lg mb-3" />
    <div className="h-3 bg-sp-elevated rounded mb-2 w-3/4" />
    <div className="h-2 bg-sp-elevated rounded w-1/2" />
  </div>
)

// Row with real songs
const RealCardRow = ({ title, query }) => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSongs(query).then((data) => {
      setSongs(data)
      setLoading(false)
    })
  }, [query])

  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-black text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : songs.map((song) => (
              <RealSongCard key={song.id} song={song} queue={songs} />
            ))
        }
      </div>
    </div>
  )
}

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

      {TRENDING_QUERIES.map(({ query, label }) => (
        <RealCardRow key={query} title={label} query={query} />
      ))}
    </div>
  )
}

export default HomeSection