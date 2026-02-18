import React, { useState, useEffect, useMemo, useRef } from 'react'
import '../styles/A-main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../styles/ScrollFloat.css';
import '../styles/SpotlightCard.css';

gsap.registerPlugin(ScrollTrigger);

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

  const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef(null);

  const handleMouseMove = e => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
};



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
      <ScrollFloat //scroll float component
         animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
      >
        Find new Media
      </ScrollFloat> 
      <section className="media-section">
        <div className="spotlight-grid">
          <SpotlightCard className="spotlight-card-item" spotlightColor="rgba(255, 0, 166, 0.4)">
            <div className="card-inner">
              <h3>Community</h3>
              <p>Discover what others are discussing</p>
            </div>
          </SpotlightCard>
          
          <SpotlightCard className="spotlight-card-item" spotlightColor="rgba(0, 229, 255, 0.4)">
            <div className="card-inner">
              <h3>Live Chat</h3>
              <p>Chat with other users in real-time</p>
            </div>
          </SpotlightCard>
          
          <SpotlightCard className="spotlight-card-item" spotlightColor="rgba(255, 215, 0, 0.4)">
            <div className="card-inner">
              <h3>Album Reviews</h3>
              <p>Find out what other's think, and share your own opinions</p>
            </div>
          </SpotlightCard>
          
          <SpotlightCard className="spotlight-card-item" spotlightColor="rgba(147, 51, 234, 0.4)">
            <div className="card-inner">
              <h3>News</h3>
              <p>Find out whats new in the world of Music</p>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </div>
  )
}

export default HomeA;

