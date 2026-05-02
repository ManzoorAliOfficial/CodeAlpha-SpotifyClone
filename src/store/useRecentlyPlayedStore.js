import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_RECENT = 20

const useRecentlyPlayedStore = create(
  persist(
    (set, get) => ({
      recentSongs: [],

      // Song play hone par add karo
      addRecentSong: (song) => {
        if (!song?.id) return
        const { recentSongs } = get()
        // Duplicate hata do pehle
        const filtered = recentSongs.filter((s) => s.id !== song.id)
        // Naya song top pe add karo, max 20 rakhna
        set({
          recentSongs: [song, ...filtered].slice(0, MAX_RECENT),
        })
      },

      clearRecent: () => set({ recentSongs: [] }),
    }),
    { name: 'spotify-recently-played' }
  )
)

export default useRecentlyPlayedStore