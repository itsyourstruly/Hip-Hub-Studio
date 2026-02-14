import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/upload-sample.css'

const UploadSample = () => {
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    style: '',
    image: null,
    audio: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [audioInfo, setAudioInfo] = useState(null)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const selectGenre = (genre) => {
    updateField('genre', genre)
  }

  const selectStyle = (style) => {
    updateField('style', style)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      updateField('image', file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleAudioSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      updateField('audio', file)
      setAudioInfo({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Upload sample:', formData)
    // TODO: Handle actual upload
    alert('Sample uploaded successfully!')
    navigate('/')
  }

  const goToSection = (section) => {
    setCurrentSection(section)
  }

  return (
    <div>
      {/* Animated Background */}
      <div className="upload-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="wave-lines">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/')}>
        <span className="arrow">←</span>
        <span>Back to Home</span>
      </button>

      {/* Upload Container */}
      <div className="upload-container">
        <div className="upload-header">
          <h1>Upload Your Sample</h1>
          <p>Share your sounds with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Sample Title */}
          <div className={`form-section ${currentSection === 1 ? 'active' : ''}`}>
            <div className="section-icon">
              <div className="icon-circle">T</div>
            </div>
            <h2>Sample Title</h2>
            <p className="section-subtitle">Give your sample a catchy name</p>

            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Smooth Jazz Loop, Heavy 808 Bass..."
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                required
              />
              <div className="input-underline"></div>
            </div>

            <button type="button" className="continue-btn" onClick={() => goToSection(2)}>
              <span>Continue</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>

          {/* Intended Genre */}
          <div className={`form-section ${currentSection === 2 ? 'active' : ''}`}>
            <div className="section-icon">
              <div className="icon-circle">G</div>
            </div>
            <h2>Intended Genre</h2>
            <p className="section-subtitle">What genre is this sample best suited for?</p>

            <div className="genre-selection">
              {['Rap', 'Hiphop', 'Soul', 'Electronic', 'Experimental'].map(genre => (
                <button
                  key={genre}
                  type="button"
                  className={`genre-option ${formData.genre === genre ? 'selected' : ''}`}
                  onClick={() => selectGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="nav-buttons">
              <button type="button" className="secondary-btn" onClick={() => goToSection(1)}>
                <span className="btn-arrow">←</span>
                <span>Back</span>
              </button>
              <button type="button" className="continue-btn" onClick={() => goToSection(3)}>
                <span>Continue</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Style */}
          <div className={`form-section ${currentSection === 3 ? 'active' : ''}`}>
            <div className="section-icon">
              <div className="icon-circle">S</div>
            </div>
            <h2>Style</h2>
            <p className="section-subtitle">What musical style does this sample have?</p>

            <div className="genre-selection">
              {['Blues', 'Jazz', 'Classical', 'Other'].map(style => (
                <button
                  key={style}
                  type="button"
                  className={`genre-option ${formData.style === style ? 'selected' : ''}`}
                  onClick={() => selectStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="nav-buttons">
              <button type="button" className="secondary-btn" onClick={() => goToSection(2)}>
                <span className="btn-arrow">←</span>
                <span>Back</span>
              </button>
              <button type="button" className="continue-btn" onClick={() => goToSection(4)}>
                <span>Continue</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Cover Art */}
          <div className={`form-section ${currentSection === 4 ? 'active' : ''}`}>
            <div className="section-icon">
              <div className="icon-circle">I</div>
            </div>
            <h2>Cover Art</h2>
            <p className="section-subtitle">Optional - Add a visual to your sample</p>

            <div className="image-upload-area">
              <input
                type="file"
                id="sampleImage"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageSelect}
              />
              {!imagePreview ? (
                <div className="upload-placeholder" onClick={() => document.getElementById('sampleImage').click()}>
                  <div className="placeholder-icon">+</div>
                  <p>Click to upload image</p>
                  <span className="file-hint">PNG, JPG up to 5MB</span>
                </div>
              ) : (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button type="button" className="remove-image" onClick={() => {
                    setImagePreview(null)
                    updateField('image', null)
                  }}>×</button>
                </div>
              )}
            </div>

            <div className="nav-buttons">
              <button type="button" className="secondary-btn" onClick={() => goToSection(3)}>
                <span className="btn-arrow">←</span>
                <span>Back</span>
              </button>
              <button type="button" className="continue-btn" onClick={() => goToSection(5)}>
                <span>Continue</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Audio File */}
          <div className={`form-section ${currentSection === 5 ? 'active' : ''}`}>
            <div className="section-icon">
              <div className="icon-circle">A</div>
            </div>
            <h2>Audio File</h2>
            <p className="section-subtitle">Upload your sample file</p>

            <div className="audio-upload-area">
              <input
                type="file"
                id="sampleAudio"
                accept="audio/*"
                required
                style={{ display: 'none' }}
                onChange={handleAudioSelect}
              />
              {!audioInfo ? (
                <div className="upload-placeholder" onClick={() => document.getElementById('sampleAudio').click()}>
                  <div className="placeholder-icon audio-icon">♪</div>
                  <p>Click to upload audio</p>
                  <span className="file-hint">MP3, WAV, FLAC up to 50MB</span>
                </div>
              ) : (
                <div className="audio-info">
                  <div className="audio-icon-small">♪</div>
                  <div className="audio-details">
                    <div className="audio-name">{audioInfo.name}</div>
                    <div className="audio-size">{audioInfo.size}</div>
                  </div>
                  <button type="button" className="remove-audio" onClick={() => {
                    setAudioInfo(null)
                    updateField('audio', null)
                  }}>×</button>
                </div>
              )}
            </div>

            <div className="nav-buttons">
              <button type="button" className="secondary-btn" onClick={() => goToSection(4)}>
                <span className="btn-arrow">←</span>
                <span>Back</span>
              </button>
              <button type="submit" className="submit-btn">
                <span>Upload Sample</span>
                <span className="btn-arrow">✓</span>
              </button>
            </div>
          </div>
        </form>

        {/* Progress Indicator */}
        <div className="progress-dots">
          {[1, 2, 3, 4, 5].map(section => (
            <div
              key={section}
              className={`dot ${currentSection === section ? 'active' : ''}`}
              onClick={() => goToSection(section)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UploadSample
