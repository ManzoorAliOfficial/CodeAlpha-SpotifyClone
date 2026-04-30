import React, { useRef } from 'react'
import { Search, X } from 'lucide-react'

const SearchBar = ({ value, onChange, placeholder = 'What do you want to listen to?' }) => {
  const inputRef = useRef(null)

  return (
    <div className="relative flex items-center w-full max-w-[364px]">
      <Search size={16} className="absolute left-3 text-black" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white text-black placeholder-[#606060] text-sm rounded-full py-2.5 pl-9 pr-9 outline-none focus:ring-2 focus:ring-white font-medium"
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus() }}
          className="absolute right-3 text-black/60 hover:text-black"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar