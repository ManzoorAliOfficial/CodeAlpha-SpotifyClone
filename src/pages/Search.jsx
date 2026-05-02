import React from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import SearchBar from '../components/search/SearchBar'
import SearchResults from '../components/search/SearchResults'
import GenreGrid from '../components/search/GenreGrid'
import useSearch from '../hooks/useSearch'

const Search = () => {
  const { query, setQuery, results, loading } = useSearch()
  const hasQuery = query.trim().length > 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <div className="ml-3 flex-1 max-w-[364px]">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </Header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 pb-8">
        {loading && (
          <div className="text-sp-muted text-sm animate-pulse mb-4">Searching...</div>
        )}

        {hasQuery ? (
          <SearchResults results={results} />
        ) : (
          <GenreGrid />
        )}
      </div>
    </motion.div>
  )
}

export default Search