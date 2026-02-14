import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/auth.css'

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(formData.username, formData.password)
    
    if (result.success) {
      onClose()
    } else {
      setError(result.error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        
        {isLogin ? (
          <div className="auth-form">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Login to continue your journey</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
              
              <button type="submit" className="btn-primary">Login</button>
            </form>
            
            <p className="auth-switch">
              Don't have an account?{' '}
              <a href="/signup" onClick={(e) => {
                e.preventDefault()
                window.location.href = '/signup'
              }}>
                Create one
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AuthModal
