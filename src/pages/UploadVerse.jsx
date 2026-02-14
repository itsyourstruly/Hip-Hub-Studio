import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/upload-verse.css'

const UploadVerse = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    songTitle: '',
    genre: '',
    description: '',
    image: null,
    audio: null
  })
  const [completedSteps, setCompletedSteps] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [audioFileName, setAudioFileName] = useState('')
  const inputRef = useRef(null)

  const genres = ['Hip-Hop', 'R&B', 'Pop', 'Rock', 'Electronic', 'Rap', 'Alternative', 'Jazz']

  useEffect(() => {
    if (inputRef.current && !showSuccess) {
      inputRef.current.focus()
    }
  }, [currentStep, showSuccess])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleNext()
    }
  }

  const handleNext = () => {
    if (currentStep === 1) {
      setFormData(prev => ({ ...prev, songTitle: inputValue }))
      setCompletedSteps(prev => [...prev, inputValue])
      setInputValue('')
    } else if (currentStep === 3) {
      setFormData(prev => ({ ...prev, description: inputValue }))
      setCompletedSteps(prev => [...prev, inputValue])
      setInputValue('')
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  const handleGenreSelect = (genre) => {
    setFormData(prev => ({ ...prev, genre }))
    setCompletedSteps(prev => [...prev, genre])
    setCurrentStep(3)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
      setCompletedSteps(prev => [...prev, file.name])
      setCurrentStep(5)
    }
  }

  const handleAudioSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, audio: file }))
      setAudioFileName(file.name)
      setCompletedSteps(prev => [...prev, file.name])
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Remove last completed step
      setCompletedSteps(prev => prev.slice(0, -1))
      // Clear input if going back to a text input step
      if (currentStep === 2 || currentStep === 4) {
        setInputValue('')
      }
    }
  }

  const getCurrentPrompt = () => {
    if (currentStep === 1) return 'Track name:'
    if (currentStep === 2) return 'Genre:'
    if (currentStep === 3) return 'What are you looking for?'
    if (currentStep === 4) return 'Album art: (optional)'
    if (currentStep === 5) return 'Upload music file:'
    return ''
  }

  return (
    <div className="upload-verse-page">
      <div className="navigation-buttons">
        <a href="/" onClick={(e) => {
          e.preventDefault()
          navigate('/')
        }} className="home-button" title="Back to home">●</a>
        
        {currentStep > 1 && (
          <button 
            onClick={handleBackStep} 
            className="back-step-button"
            title="Previous step"
          >
            ←
          </button>
        )}
      </div>

      <div className="chat-container">
        {/* Completed Steps - Centered at Top */}
        <div className="completed-steps">
          {completedSteps.map((answer, index) => (
            <div key={index} className="completed-step">
              <div className={`answer-text ${index === 0 ? 'bold' : ''}`}>{answer}</div>
            </div>
          ))}
        </div>

        {/* Current Input */}
        {!showSuccess ? (
          <div className="current-input">
            <div className="prompt-text">{getCurrentPrompt()}</div>
            
            {currentStep === 2 ? (
              <div className="genre-buttons">
                {genres.map(genre => (
                  <button
                    key={genre}
                    className="genre-btn"
                    onClick={() => handleGenreSelect(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            ) : currentStep === 4 ? (
              <div className="file-upload">
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageSelect}
                />
                <button 
                  className="upload-btn"
                  onClick={() => document.getElementById('imageInput').click()}
                >
                  Choose Image
                </button>
                <button 
                  className="skip-btn"
                  onClick={() => setCurrentStep(5)}
                >
                  Skip
                </button>
              </div>
            ) : currentStep === 5 ? (
              <div className="file-upload">
                <input
                  type="file"
                  id="audioInput"
                  accept="audio/*"
                  style={{ display: 'none' }}
                  onChange={handleAudioSelect}
                />
                <button 
                  className="upload-btn"
                  onClick={() => document.getElementById('audioInput').click()}
                >
                  Choose Audio File
                </button>
              </div>
            ) : (
              <div className="input-row">
                <input
                  ref={inputRef}
                  type="text"
                  className="inline-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type here..."
                />
              </div>
            )}
          </div>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <div className="success-text">Posted!</div>
            <div className="success-subtext">Artists can now see your request.</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadVerse

