import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_PLAYLISTS, MOCK_SONGS } from '../constants/mockSongs'

const useLibraryStore = create(
  persist(
    (set, get) => ({
      playlists: MOCK_PLAYLISTS,
      likedSongs: MOCK_SONGS.filter((s) => s.liked),

      toggleLikeSong: (song) => {
        const { likedSongs } = get()
        const exists = likedSongs.find((s) => s.id === song.id)
        if (exists) {
          set({ likedSongs: likedSongs.filter((s) => s.id !== song.id) })
        } else {
          set({ likedSongs: [{ ...song, liked: true }, ...likedSongs] })
        }
      },

      isLiked: (songId) => {
        return get().likedSongs.some((s) => s.id === songId)
      },

      addPlaylist: (playlist) =>
        set((s) => ({ playlists: [...s.playlists, playlist] })),

      removePlaylist: (id) =>
        set((s) => ({ playlists: s.playlists.filter((p) => p.id !== id) })),
    }),
    {
      name: 'spotify-library',
    }
  )
)

export default useLibraryStore