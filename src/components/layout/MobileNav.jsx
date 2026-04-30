import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Search, Library } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Home', exact: true },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/library', icon: Library, label: 'Library' },
]

const MobileNav = () => (
  <nav className="md:hidden flex items-center justify-around bg-sp-black border-t border-sp-border h-16 flex-shrink-0">
    {tabs.map(({ to, icon: Icon, label, exact }) => (
      <NavLink
        key={to}
        to={to}
        end={exact}
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 px-4 py-2 transition-colors ${
            isActive ? 'text-white' : 'text-sp-faint'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-semibold">{label}</span>
          </>
        )}
      </NavLink>
    ))}
  </nav>
)

export default MobileNav