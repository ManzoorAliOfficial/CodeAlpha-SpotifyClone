import React from 'react'

const SectionHeader = ({ title, onShowAll }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-white">{title}</h2>
    {onShowAll && (
      <button
        onClick={onShowAll}
        className="text-xs font-bold text-sp-muted hover:text-white transition-colors uppercase tracking-wider"
      >
        Show all
      </button>
    )}
  </div>
)

export default SectionHeader