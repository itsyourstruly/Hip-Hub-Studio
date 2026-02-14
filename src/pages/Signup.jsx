import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/signup.css'

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    artistName: '',
    bio: ''
  })
  const [error, setError] = useState('')

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = (step) => {
    setError('')
    
    // Validation
    if (step === 2 && formData.username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }
    if (step === 3 && formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setCurrentStep(step)
    updateProgress(step)
  }

  const prevStep = (step) => {
    setError('')
    setCurrentStep(step)
    updateProgress(step)
  }

  const updateProgress = (step) => {
    const progress = (step / 4) * 100
    // Progress bar would update here
  }

  const handleSubmit = () => {
    const result = signup({
      username: formData.username,
      password: formData.password,
      artistName: formData.artistName || formData.username,
      bio: formData.bio || '',
      email: `${formData.username}@example.com`
    })

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div>
      {/* Animated Background */}
      <div className="signup-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="music-notes">
          <span className="note">♪</span>
          <span className="note">♫</span>
          <span className="note">♪</span>
          <span className="note">♫</span>
          <span className="note">♪</span>
        </div>
      </div>

      {/* Signup Container */}
      <div className="signup-container">
        {/* Progress Indicator */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>

        {/* Logo */}
        <div className="signup-logo">🎵 BeatLink</div>

        {error && <div className="error-message">{error}</div>}

        {/* Step 1: Username */}
        <div className={`signup-step ${currentStep === 1 ? 'active' : ''}`}>
          <div className="step-content">
            <h1 className="step-title">Choose your username</h1>
            <p className="step-subtitle">This is how others will find you</p>

            <div className="input-wrapper">
              <input
                type="text"
                className="step-input"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                autoComplete="off"
              />
              <div className="input-hint">Minimum 3 characters</div>
            </div>

            <button className="next-btn" onClick={() => nextStep(2)}>
              <span>Next</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>

        {/* Step 2: Password */}
        <div className={`signup-step ${currentStep === 2 ? 'active' : ''}`}>
          <div className="step-content">
            <h1 className="step-title">Create a password</h1>
            <p className="step-subtitle">Keep your account secure</p>

            <div className="input-wrapper">
              <input
                type="password"
                className="step-input"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                autoComplete="off"
              />
              <div className="input-hint">Minimum 6 characters</div>
            </div>

            <div className="nav-buttons">
              <button className="back-btn" onClick={() => prevStep(1)}>
                <span className="arrow">←</span>
                <span>Back</span>
              </button>
              <button className="next-btn" onClick={() => nextStep(3)}>
                <span>Next</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Artist Name */}
        <div className={`signup-step ${currentStep === 3 ? 'active' : ''}`}>
          <div className="step-content">
            <h1 className="step-title">What's your artist name?</h1>
            <p className="step-subtitle">Optional - You can use your username</p>

            <div className="input-wrapper">
              <input
                type="text"
                className="step-input"
                placeholder="Enter artist name (optional)"
                value={formData.artistName}
                onChange={(e) => updateField('artistName', e.target.value)}
                autoComplete="off"
              />
              <div className="input-hint">Leave blank to use your username</div>
            </div>

            <div className="nav-buttons">
              <button className="back-btn" onClick={() => prevStep(2)}>
                <span className="arrow">←</span>
                <span>Back</span>
              </button>
              <button className="next-btn" onClick={() => nextStep(4)}>
                <span>Next</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 4: Bio */}
        <div className={`signup-step ${currentStep === 4 ? 'active' : ''}`}>
          <div className="step-content">
            <h1 className="step-title">Tell us about yourself</h1>
            <p className="step-subtitle">Optional - Share your musical journey</p>

            <div className="input-wrapper">
              <textarea
                className="step-input bio-input"
                placeholder="Your bio (optional)"
                value={formData.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                rows="4"
              />
              <div className="input-hint">This will appear on your profile</div>
            </div>

            <div className="nav-buttons">
              <button className="back-btn" onClick={() => prevStep(3)}>
                <span className="arrow">←</span>
                <span>Back</span>
              </button>
              <button className="complete-btn" onClick={handleSubmit}>
                <span>Complete</span>
                <span className="arrow">✓</span>
              </button>
            </div>
          </div>
        </div>

        {/* Already have account link */}
        <p className="auth-switch">
          Already have an account?{' '}
          <a href="/" onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}>
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
