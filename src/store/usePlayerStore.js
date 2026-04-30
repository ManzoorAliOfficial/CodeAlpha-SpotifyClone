import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePlayerStore = create(
  persist(
    (set, get) => ({
      // Current track
      currentSong: null,
      isPlaying: false,
      volume: 0.7,
      isMuted: false,
      progress: 0,
      duration: 0,
      shuffle: false,
      repeat: 'off', // 'off' | 'all' | 'one'

      // Queue
      queue: [],
      queueIndex: 0,

      // UI state
      showMobilePlayer: false,

      // Actions
      setCurrentSong: (song) => set({ currentSong: song, progress: 0 }),

      playSong: (song, queue = []) => {
        const q = queue.length > 0 ? queue : [song]
        const idx = q.findIndex((s) => s.id === song.id)
        set({
          currentSong: song,
          isPlaying: true,
          queue: q,
          queueIndex: idx >= 0 ? idx : 0,
          progress: 0,
        })
      },

      togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
      setIsPlaying: (val) => set({ isPlaying: val }),

      setVolume: (vol) => set({ volume: vol, isMuted: vol === 0 }),
      toggleMute: () =>
        set((s) => ({
          isMuted: !s.isMuted,
          volume: s.isMuted ? (s.volume === 0 ? 0.7 : s.volume) : s.volume,
        })),

      setProgress: (val) => set({ progress: val }),
      setDuration: (val) => set({ duration: val }),

      toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
      cycleRepeat: () =>
        set((s) => ({
          repeat: s.repeat === 'off' ? 'all' : s.repeat === 'all' ? 'one' : 'off',
        })),

      playNext: () => {
        const { queue, queueIndex, shuffle, repeat } = get()
        if (!queue.length) return
        let next
        if (shuffle) {
          let rand = Math.floor(Math.random() * queue.length)
          while (rand === queueIndex && queue.length > 1) {
            rand = Math.floor(Math.random() * queue.length)
          }
          next = rand
        } else {
          next = (queueIndex + 1) % queue.length
          if (next === 0 && repeat === 'off') {
            set({ isPlaying: false })
            return
          }
        }
        set({ currentSong: queue[next], queueIndex: next, progress: 0, isPlaying: true })
      },

      playPrev: () => {
        const { queue, queueIndex, progress } = get()
        if (!queue.length) return
        // If more than 3s in, restart current
        if (progress > 3) {
          set({ progress: 0 })
          return
        }
        const prev = queueIndex === 0 ? queue.length - 1 : queueIndex - 1
        set({ currentSong: queue[prev], queueIndex: prev, progress: 0, isPlaying: true })
      },

      setQueue: (songs) => set({ queue: songs }),
      addToQueue: (song) => set((s) => ({ queue: [...s.queue, song] })),

      setShowMobilePlayer: (val) => set({ showMobilePlayer: val }),

      toggleLike: (songId) => {
        const { currentSong } = get()
        if (currentSong?.id === songId) {
          set({ currentSong: { ...currentSong, liked: !currentSong.liked } })
        }
      },
    }),
    {
      name: 'spotify-player',
      partialize: (s) => ({
        volume: s.volume,
        shuffle: s.shuffle,
        repeat: s.repeat,
        queue: s.queue,
        currentSong: s.currentSong,
        queueIndex: s.queueIndex,
      }),
    }
  )
)

export default usePlayerStore