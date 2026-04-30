import React from 'react'
import PlaylistItem from './PlaylistItem'
import useLibraryStore from '../../store/useLibraryStore'

const LibraryList = () => {
  const { playlists } = useLibraryStore()

  return (
    <div className="space-y-1">
      {playlists.map((pl) => (
        <PlaylistItem key={pl.id} playlist={pl} />
      ))}
    </div>
  )
}

export default LibraryList