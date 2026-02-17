import React, { useState, useEffect } from 'react'
import '../styles/A-main.css';

const slides = [
  {
    title: "Welcome to Hip Hub",
    description: "Test"
  },
  {
    title: "Community chat",
    description: "Chat with other listeners"
  },
  {
    title: "Review Albums",
    description: "Make your own Album Reviews"
  },
  {
    title: "Up and Coming",
    description: "Up and coming artists and albums"
  }
]


const HomeA = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const showSlide = (index) => {
    if (index >= slides.length) index = 0
    if (index < 0) index = slides.length - 1
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const nextSlide = () => showSlide(currentSlide + 1)
  const prevSlide = () => showSlide(currentSlide - 1)

  return (
    <div className="hero">
      {/* Slideshow Section */}
      <section className="slideshow-section">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button className="slide-arrow slide-arrow-left" onClick={prevSlide}>
            <span>‹</span>
          </button>
          <button className="slide-arrow slide-arrow-right" onClick={nextSlide}>
            <span>›</span>
          </button>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => showSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeA;

