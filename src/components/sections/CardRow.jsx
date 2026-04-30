import React from 'react'
import SectionHeader from './SectionHeader'

const CardRow = ({ title, children, onShowAll, cols = 5 }) => {
  const colsMap = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  }

  return (
    <section className="mb-8">
      <SectionHeader title={title} onShowAll={onShowAll} />
      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {React.Children.map(children, (child) => (
          <div className="flex-shrink-0 w-36 xs:w-40">{child}</div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className={`hidden md:grid ${colsMap[cols]} gap-4 lg:gap-6`}>
        {children}
      </div>
    </section>
  )
}

export default CardRow