import React, { useState } from 'react'
import Container from '../container'
import Logo from '../logo'
import LogoutBtn from './logout'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', id: '/', active: true },
    { name: 'Login', id: '/login', active: !authStatus },
    { name: 'Signup', id: '/signup', active: !authStatus },
    { name: 'All Posts', id: '/all-posts', active: authStatus },
    { name: 'Add Post', id: '/add-post', active: authStatus },
  ]

  const handleNavigate = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          <Link to='/' className='shrink-0'>
            <Logo width='70px' />
          </Link>

          {/* Desktop nav */}
          <ul className='hidden md:flex items-center gap-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.id)}
                    className='px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='ml-2'>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile menu toggle */}
          <button
            className='md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile nav */}
        {menuOpen && (
          <ul className='md:hidden flex flex-col gap-1 pb-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className='w-full text-left px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='px-4'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  )
}

export default Header