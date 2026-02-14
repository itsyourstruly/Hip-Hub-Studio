import React, { useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/auth.css'

const ProfileMenu = ({ onClose }) => {
  const { currentUser, logout } = useAuth()
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleLogout = () => {
    logout()
    onClose()
  }

  const getUserInitial = () => {
    return currentUser?.username?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <div className="profile-menu" ref={menuRef}>
      <div className="profile-menu-header">
        <div className="profile-avatar-large">
          <span>{getUserInitial()}</span>
        </div>
        <div className="profile-info">
          <h3>{currentUser?.username || 'User'}</h3>
          <p>{currentUser?.email || 'user@example.com'}</p>
        </div>
      </div>
      <div className="profile-menu-divider"></div>
      <a href="#" className="profile-menu-item">
        <span>Profile Settings</span>
      </a>
      <a href="#" className="profile-menu-item">
        <span>My Uploads</span>
      </a>
      <a href="#" className="profile-menu-item">
        <span>Favorites</span>
      </a>
      <div className="profile-menu-divider"></div>
      <a href="#" className="profile-menu-item logout" onClick={handleLogout}>
        <span>Logout</span>
      </a>
    </div>
  )
}

export default ProfileMenu
