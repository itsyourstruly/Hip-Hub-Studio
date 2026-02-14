import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import AuthModal from '../AuthModal/AuthModal'
import '../../styles/B-main.css'
import '../../styles/A-main.css'
import '../../styles/auth.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [side, setSide] = useState('B')
  
  // Determine side based on current route
  useEffect(() => {
    if (location.pathname.includes('/side-a')) {
      setSide('A')
      document.body.classList.add('side-a')
      document.body.classList.remove('side-b')
    } else {
      setSide('B')
      document.body.classList.add('side-b')
      document.body.classList.remove('side-a')
    }
  }, [location.pathname])

  const handleVinylFlip = () => {
    const newSide = side === 'B' ? 'A' : 'B'
    const transitionClass = newSide === 'A' ? 'transitioning-to-light' : 'transitioning-to-dark'
    
    document.body.classList.add(transitionClass)
    setTimeout(() => {
      document.body.classList.remove(transitionClass)
      setSide(newSide)
      navigate(newSide === 'A' ? '/side-a' : '/')
    }, 800)
  }

  const handleProfileClick = () => {
    if (currentUser) {
      setShowProfileMenu(!showProfileMenu)
    } else {
      setShowAuthModal(true)
    }
  }

  const getUserInitial = () => {
    if (currentUser?.username) {
      return currentUser.username.charAt(0).toUpperCase()
    }
    return 'U'
  }

  const isSideA = side === 'A'
  
  return (
    <>
      <nav className="top-nav">
        <Link to={isSideA ? "/side-a" : "/"} className="nav-brand">Hip Hub</Link>
        
        <div className="nav-links nav-links-left">
          {isSideA ? (
            <>
              <a href="#community" className="nav-link">Community</a>
              <a href="#discovery" className="nav-link">Discovery</a>
            </>
          ) : (
            <>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
              <Link to="/sample-catalog" className={`nav-link ${location.pathname === '/sample-catalog' ? 'active' : ''}`}>
                Sample Catalog
              </Link>
            </>
          )}
        </div>

        <div className="nav-center">
          <div className="vinyl-container">
            <div className="vinyl-record clickable" onClick={handleVinylFlip}>
              <div className="vinyl-center-image"></div>
            </div>
          </div>
          <span className="vinyl-label">Side {side}</span>
        </div>

        <div className="nav-links nav-links-right">
          {isSideA ? (
            <>
              <a href="#media" className="nav-link">Media</a>
              <Link to="/side-a" className={`nav-link ${location.pathname === '/side-a' ? 'active' : ''}`}>
                Home
              </Link>
            </>
          ) : (
            <>
              <Link to="/fill-a-verse" className={`nav-link ${location.pathname === '/fill-a-verse' ? 'active' : ''}`}>
                Fill a Verse
              </Link>
              <Link to="/upload-sample" className="nav-link">
                Upload Sample
              </Link>
            </>
          )}
        </div>

        <div className="nav-actions">
          <button 
            className="profile-btn" 
            onClick={handleProfileClick}
            title="Profile" 
            aria-label="Profile"
          >
            {getUserInitial()}
          </button>
        </div>
      </nav>

      {showProfileMenu && (
        <ProfileMenu 
          onClose={() => setShowProfileMenu(false)} 
        />
      )}

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </>
  )
}

export default Navbar
