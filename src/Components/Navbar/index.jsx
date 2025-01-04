import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { ShoppingCartContext } from '../../Context'
import PropTypes from 'prop-types'

// Separate navigation config
const NAV_LINKS = [
    { 
      to: '/', 
      label: 'All', 
      category: ''
    },
    { 
      to: '/clothes', 
      label: 'Clothes', 
      category: 'clothes'
    },
    { 
      to: '/electronics', 
      label: 'Electronics', 
      category: 'electronics'
    },
    { 
      to: '/furnitures', 
      label: 'Furnitures', 
      category: 'furnitures'
    },
    { 
      to: '/toys', 
      label: 'Toys', 
      category: 'toys'
    },
    { 
      to: '/others', 
      label: 'Others', 
      category: 'others'
    }
  ]
  
  const ACCOUNT_LINKS = [
    { to: '/my-orders', label: 'My Orders' },
    { to: '/my-account', label: 'My Account' },
    { to: '/sign-in', label: 'Sign out', isSignOut: true }
  ]



const NavItem = ({ to, label, onClick, className }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${isActive ? 'underline underline-offset-4' : ''} ${className || ''}`
      }
    >
      {label}
    </NavLink>
  )
  
  NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
  }
  const isHidden = JSON.parse(localStorage.getItem('sign-out'))
  console.log(isHidden)

  const CartIcon = ({ count, onClick }) => {
    const context = useContext(ShoppingCartContext)
    
    return (
      <div className={`flex items-center gap-2 cursor-pointer ${context.signOut ? 'hidden' : 'flex'}`}
           onClick={onClick}>
        <ShoppingCart size={24} />
        <span>{count}</span>
      </div>
    )
  }
  
  CartIcon.propTypes = {
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  }

  const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  
    // Sign Out check
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut
  
    const handleSignOut = () => {
      localStorage.setItem('sign-out', JSON.stringify(true))
      context.setSignOut(true)
    }
  
    const handleCategoryClick = (category) => {
      context.setSearchByCategory(category)
      if (category === '') {
        context.setSearchByTitle('')
      }
      setIsMenuOpen(false)
    }
  
    return (
      <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-xl font-light bg-white'>
        {/* Logo - Always visible */}
        <NavLink to='/' className='font-semibold text-2xl'>
          Shopi
        </NavLink>
  
        {isUserSignOut ? (
          // Signed Out State
          <>
            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center gap-3'>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => handleCategoryClick(link.category)}
                    className={({ isActive }) =>
                      isActive ? 'underline underline-offset-4' : undefined
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    isActive ? 'underline underline-offset-4' : undefined
                  }
                >
                  Sign in
                </NavLink>
              </li>
            </ul>
  
            {/* Mobile Menu Button - Signed Out */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-gray-700 focus:outline-none'
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
  
            {/* Mobile Menu - Signed Out */}
            {isMenuOpen && (
              <div className='md:hidden fixed inset-0 bg-white z-20 flex flex-col'>
                <div className='flex justify-between items-center p-8'>
                  <NavLink to='/' className='font-semibold text-2xl'>
                    Shopi
                  </NavLink>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className='text-gray-700 focus:outline-none'
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className='flex flex-col items-center space-y-4'>
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => {
                        handleCategoryClick(link.category)
                        setIsMenuOpen(false)
                      }}
                      className={({ isActive }) =>
                        `${isActive ? 'underline underline-offset-4' : ''} text-xl`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      `${isActive ? 'underline underline-offset-4' : ''} text-xl`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </NavLink>
                </div>
              </div>
            )}
          </>
        ) : (
          // Signed In State
          <>
            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center gap-3'>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => handleCategoryClick(link.category)}
                    className={({ isActive }) =>
                      isActive ? 'underline underline-offset-4' : undefined
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
  
            {/* Mobile Menu Button - Signed In */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-gray-700 focus:outline-none'
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
  
            {/* Desktop Right Side Menu */}
            <ul className='hidden md:flex items-center gap-3'>
              <li className='text-black/60'>
                {context.account?.email || 'Guest'}
              </li>
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? 'underline underline-offset-4' : undefined
                    }
                    onClick={link.isSignOut ? handleSignOut : undefined}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
  
            {/* Mobile Menu - Signed In */}
            {isMenuOpen && (
              <div className='md:hidden fixed inset-0 bg-white z-20 flex flex-col'>
                <div className='flex justify-between items-center p-8'>
                  <NavLink to='/' className='font-semibold text-2xl'>
                    Shopi
                  </NavLink>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className='text-gray-700 focus:outline-none'
                  >
                    <X size={24} />
                  </button>
                </div>
  
                <div className='flex flex-col items-center space-y-6 mt-10'>
                  <div className='text-center'>
                    <p className='text-black/60 mb-4'>
                      {context.account?.email || 'Guest'}
                    </p>
                  </div>
  
                  <div className='flex flex-col items-center space-y-4'>
                    {NAV_LINKS.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => {
                          handleCategoryClick(link.category)
                          setIsMenuOpen(false)
                        }}
                        className={({ isActive }) =>
                          `${isActive ? 'underline underline-offset-4' : ''} text-xl`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                    {ACCOUNT_LINKS.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => {
                          if (link.isSignOut) {
                            handleSignOut()
                          }
                          setIsMenuOpen(false)
                        }}
                        className={({ isActive }) =>
                          `${isActive ? 'underline underline-offset-4' : ''} text-xl`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <CartIcon 
        onClick={() => context.setIsCheckoutSideMenuOpen(!context.isCheckoutSideMenuOpen)}
        count={context.count}
        />
      </nav>
    )
  }
  
  export default Navbar