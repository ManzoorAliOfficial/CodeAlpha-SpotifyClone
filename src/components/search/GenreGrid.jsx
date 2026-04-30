import React from 'react'
import GenreCard from '../cards/GenreCard'
import { GENRE_CARDS } from '../../constants/mockSongs'

const GenreGrid = ({ onGenreClick }) => (
  <section>
    <h2 className="text-xl font-bold text-white mb-4">Browse all</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {GENRE_CARDS.map((genre) => (
        <GenreCard key={genre.id} genre={genre} onClick={onGenreClick} />
      ))}
    </div>
  </section>
)

export default GenreGrid