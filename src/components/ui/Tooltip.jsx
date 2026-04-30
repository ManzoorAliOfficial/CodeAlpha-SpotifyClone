import React, { useState } from 'react'

const Tooltip = ({ children, content, position = 'top' }) => {
  const [visible, setVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <div
          className={`absolute ${positions[position]} z-50 px-2 py-1 bg-[#282828] text-white text-xs rounded whitespace-nowrap pointer-events-none shadow-lg`}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip