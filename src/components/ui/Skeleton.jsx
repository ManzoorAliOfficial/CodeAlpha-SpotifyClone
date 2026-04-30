import React from 'react'

const Skeleton = ({ className = '', rounded = 'md' }) => {
  const roundedMap = {
    full: 'rounded-full',
    lg: 'rounded-lg',
    md: 'rounded-md',
    sm: 'rounded-sm',
    none: 'rounded-none',
  }
  return (
    <div
      className={`bg-sp-elevated skeleton-pulse ${roundedMap[rounded]} ${className}`}
    />
  )
}

export const CardSkeleton = () => (
  <div className="bg-sp-surface rounded-xl p-4 space-y-3">
    <Skeleton className="w-full aspect-square" rounded="lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
)

export const SongRowSkeleton = () => (
  <div className="flex items-center gap-4 px-4 py-2">
    <Skeleton className="w-10 h-10 flex-shrink-0" rounded="sm" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-32" />
    </div>
    <Skeleton className="h-3 w-12" />
  </div>
)

export default Skeleton