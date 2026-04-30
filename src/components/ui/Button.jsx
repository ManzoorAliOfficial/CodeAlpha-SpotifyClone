import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer select-none'

  const variants = {
    primary: 'bg-sp-green text-black hover:bg-sp-green-light hover:scale-105 active:scale-100',
    outline: 'border border-sp-faint text-white hover:border-white bg-transparent',
    ghost: 'text-sp-muted hover:text-white bg-transparent',
    white: 'bg-white text-black hover:bg-gray-200',
  }

  const sizes = {
    xs: 'text-xs px-3 py-1',
    sm: 'text-sm px-4 py-1.5',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  }

  const roundedMap = {
    full: 'rounded-full',
    lg: 'rounded-lg',
    md: 'rounded-md',
    none: 'rounded-none',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${roundedMap[rounded]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button