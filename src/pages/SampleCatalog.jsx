import React, { useState } from 'react'
import '../styles/sample-catalog.css'

// Mock data
const mockSamples = [
  { id: 1, title: "Lo-Fi Hip Hop Beat", artist: "BeatsbyJake", duration: "2:34", intendedGenre: "Hiphop", style: "Jazz", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 2, title: "Trap 808 Loop", artist: "ProducerPro", duration: "1:45", intendedGenre: "Rap", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 3, title: "Ambient Pad", artist: "SynthWave", duration: "3:12", intendedGenre: "Electronic", style: "Classical", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 4, title: "Jazz Piano Riff", artist: "KeysMaster", duration: "2:01", intendedGenre: "Soul", style: "Jazz", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 5, title: "Drill Drums", artist: "DrumKing", duration: "1:30", intendedGenre: "Rap", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 6, title: "R&B Guitar Loop", artist: "StringTheory", duration: "2:45", intendedGenre: "Soul", style: "Blues", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 7, title: "House Bass Line", artist: "BassBoosted", duration: "2:20", intendedGenre: "Electronic", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 8, title: "Experimental Noise", artist: "RhythmNation", duration: "1:55", intendedGenre: "Experimental", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 9, title: "Blues Guitar Riff", artist: "RiffMaster", duration: "2:10", intendedGenre: "Soul", style: "Blues", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 10, title: "Pop Synth Melody", artist: "PopProducer", duration: "2:30", intendedGenre: "Electronic", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 11, title: "Soulful Vocals", artist: "AfroVibes", duration: "2:15", intendedGenre: "Soul", style: "Jazz", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 12, title: "Techno Kick Pattern", artist: "TechnoWarrior", duration: "1:40", intendedGenre: "Electronic", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 13, title: "Classical Strings", artist: "NashvilleSound", duration: "2:50", intendedGenre: "Experimental", style: "Classical", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 14, title: "Heavy Bass Drop", artist: "WobbleMaker", duration: "1:35", intendedGenre: "Electronic", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 15, title: "Soul Vocal Sample", artist: "SoulSinger", duration: "2:05", intendedGenre: "Soul", style: "Jazz", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 16, title: "Hip Hop Drums", artist: "LatinGroove", duration: "2:25", intendedGenre: "Hiphop", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 17, title: "EDM Lead Synth", artist: "EDMProducer", duration: "2:40", intendedGenre: "Electronic", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 18, title: "Experimental Beat", artist: "FolkArtist", duration: "3:00", intendedGenre: "Experimental", style: "Other", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 19, title: "Orchestral Strings", artist: "SymphonyPro", duration: "3:30", intendedGenre: "Experimental", style: "Classical", artwork: "assets/emptyMediaIcon.jpeg" },
  { id: 20, title: "Rap Beat", artist: "FunkMaster", duration: "2:18", intendedGenre: "Rap", style: "Blues", artwork: "assets/emptyMediaIcon.jpeg" }
]

const SampleCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState(new Set())
  const [selectedStyles, setSelectedStyles] = useState(new Set())

  const toggleGenre = (genre) => {
    const newSet = new Set(selectedGenres)
    if (newSet.has(genre)) {
      newSet.delete(genre)
    } else {
      newSet.add(genre)
    }
    setSelectedGenres(newSet)
  }

  const toggleStyle = (style) => {
    const newSet = new Set(selectedStyles)
    if (newSet.has(style)) {
      newSet.delete(style)
    } else {
      newSet.add(style)
    }
    setSelectedStyles(newSet)
  }

  const filteredSamples = mockSamples.filter(sample => {
    const matchesSearch = sample.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sample.artist.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesGenre = selectedGenres.size === 0 || selectedGenres.has(sample.intendedGenre)
    const matchesStyle = selectedStyles.size === 0 || selectedStyles.has(sample.style)
    
    return matchesSearch && matchesGenre && matchesStyle
  })

  return (
    <div className="container">
      <div className="page-header">
        <h1>Sample Catalog</h1>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search samples by name, artist, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Intended Genre</span>
          <div className="filter-options">
            {['Rap', 'Hiphop', 'Soul', 'Electronic', 'Experimental'].map(genre => (
              <button
                key={genre}
                className={`filter-tag ${selectedGenres.has(genre) ? 'selected' : ''}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Style</span>
          <div className="filter-options">
            {['Jazz', 'Blues', 'Classical', 'Other'].map(style => (
              <button
                key={style}
                className={`filter-tag ${selectedStyles.has(style) ? 'selected' : ''}`}
                onClick={() => toggleStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Samples Grid */}
      <div className="samples-grid" id="samplesGrid">
        {filteredSamples.length > 0 ? (
          filteredSamples.map(sample => (
            <div key={sample.id} className="sample-card" onClick={() => console.log('Play sample', sample.id)}>
              <img src={sample.artwork} alt={sample.title} className="sample-card-artwork" />
              <div className="sample-card-content">
                <div className="sample-card-header">
                  <div className="sample-card-title">{sample.title}</div>
                  <button className="favorite-btn">♡</button>
                </div>
                <div className="sample-card-artist">{sample.artist}</div>
                <div className="sample-card-meta">
                  <span className="sample-duration">⏱ {sample.duration}</span>
                  <span className="sample-genre-badge">{sample.intendedGenre}</span>
                </div>
                <div className="sample-card-actions">
                  <button className="play-sample-btn">▶ Play</button>
                  <button className="download-btn">⬇ Download</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No samples found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleCatalog
