import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/fill-a-verse.css'

const mockVerseRequests = {
  vocals: [
    { id: 1, title: "Soulful Chorus Needed", artist: "BeatsbyJake", genre: "Soul", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 2, title: "R&B Hook", artist: "ProducerPro", genre: "R&B", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 3, title: "Jazz Vocals", artist: "SynthWave", genre: "Jazz", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 4, title: "Pop Melody", artist: "KeysMaster", genre: "Pop", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 5, title: "Gospel Harmony", artist: "DrumKing", genre: "Gospel", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 6, title: "Indie Vocals", artist: "StringTheory", genre: "Indie", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 7, title: "Electronic Vocals", artist: "BassBoosted", genre: "Electronic", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 8, title: "Ambient Vocals", artist: "RhythmNation", genre: "Ambient", artwork: "assets/emptyMediaIcon.jpeg" },
  ],
  rap: [
    { id: 9, title: "Drill Verse", artist: "RapperX", genre: "Drill", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 10, title: "Trap 16 Bars", artist: "TrapKing", genre: "Trap", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 11, title: "Boom Bap Bars", artist: "OldSchool", genre: "Hip Hop", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 12, title: "Melodic Rap", artist: "ModernFlow", genre: "Melodic Rap", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 13, title: "Fast Flow Needed", artist: "SpeedyMC", genre: "Rap", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 14, title: "Conscious Rap", artist: "DeepThoughts", genre: "Conscious", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 15, title: "UK Drill Verse", artist: "LondonVibes", genre: "UK Drill", artwork: "assets/emptyMediaIcon.jpeg" },
    { id: 16, title: "Aggressive Bars", artist: "HardHitter", genre: "Hardcore", artwork: "assets/emptyMediaIcon.jpeg" },
  ]
}

const VerseCard = ({ verse }) => (
  <div className="verse-card" onClick={() => console.log('View verse', verse.id)}>
    <img src={verse.artwork} alt={verse.title} className="verse-card-artwork" />
    <div className="verse-card-title">{verse.title}</div>
  </div>
)

const FillAVerse = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-text">
          <h1>Share your track to find a feature.</h1>
          <p>Artists may choose from one of the below tracks for a potential feature.</p>
        </div>
        <Link to="/upload-verse" className="add-verse-btn">
          <span className="plus-icon">+</span>
        </Link>
      </div>

      {/* Vocals Section */}
      <div className="verse-category">
        <div className="category-header">
          <h2>Vocals</h2>
        </div>
        <div className="cards-container">
          {mockVerseRequests.vocals.map(verse => (
            <VerseCard key={verse.id} verse={verse} />
          ))}
        </div>
      </div>

      {/* Rap Section */}
      <div className="verse-category">
        <div className="category-header">
          <h2>Rap</h2>
        </div>
        <div className="cards-container">
          {mockVerseRequests.rap.map(verse => (
            <VerseCard key={verse.id} verse={verse} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FillAVerse
