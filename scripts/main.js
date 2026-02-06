
const newSongs = [
    {
        id: 1,
        title: "Midnight Vibes",
        artist: "DJ Pulse",
        plays: "125K",
        likes: "8.2K",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        title: "Urban Flow",
        artist: "BeatMaker Pro",
        plays: "98K",
        likes: "6.5K",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        title: "Neon Dreams",
        artist: "SynthWave",
        plays: "87K",
        likes: "5.9K",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        title: "Cosmic Journey",
        artist: "Space Beats",
        plays: "54K",
        likes: "3.8K",
        gradient: "linear-gradient(135deg, #fa8bff 0%, #2bd2ff 100%)"
    }
];

// =============== MOCK DATA - TRENDING SONGS ===============
// Sample data for trending/popular songs section
// Includes a 'trending' flag for visual badge display
const trendingSongs = [
    {
        id: 5,
        title: "Bass Drop",
        artist: "LowFreq",
        plays: "456K",
        likes: "32.3K",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        trending: true
    },
    {
        id: 6,
        title: "Trap Nation",
        artist: "808 King",
        plays: "503K",
        likes: "45.7K",
        gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        trending: true
    },
    {
        id: 7,
        title: "Lo-Fi Beats",
        artist: "Chill Hop",
        plays: "378K",
        likes: "28.2K",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        trending: true
    },
    {
        id: 8,
        title: "EDM Anthem",
        artist: "Festival Vibes",
        plays: "645K",
        likes: "51.9K",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        trending: true
    }
];

/**
 * Initialize the page when DOM is ready
 * Sets up all dynamic content and event listeners
 */
document.addEventListener('DOMContentLoaded', () => {    renderSongs();              // Render all song cards
    renderVerseRequests();      // Render verse request cards
    initializeEventListeners(); // Set up navigation and interactions
});


// Render songs in both sections
function renderSongs() {
    const newSongsContainer = document.getElementById('newSongs');
    const trendingSongsContainer = document.getElementById('trendingSongs');
    
    // Guard clause: exit if containers don't exist on this page
    if (!newSongsContainer || !trendingSongsContainer) return;
    
    // ===== Use DocumentFragment for performance =====
    // DocumentFragments allow building DOM off-screen before inserting
    // This reduces reflows and improves rendering performance
    const newFragment = document.createDocumentFragment();
    const trendingFragment = document.createDocumentFragment();
    
    // Create temporary container for HTML string parsing
    const tempDiv = document.createElement('div');
    
    // ===== Render new songs =====
    tempDiv.innerHTML = newSongs.map(song => createSongCard(song, false)).join('');
    while (tempDiv.firstChild) {
        newFragment.appendChild(tempDiv.firstChild);
    }
    
    // Render trending songs
    tempDiv.innerHTML = trendingSongs.map(song => createSongCard(song, true)).join('');
    while (tempDiv.firstChild) {
        trendingFragment.appendChild(tempDiv.firstChild);
    }
    
    // Single DOM update per container
    newSongsContainer.innerHTML = '';
    newSongsContainer.appendChild(newFragment);
    
    trendingSongsContainer.innerHTML = '';
    trendingSongsContainer.appendChild(trendingFragment);
    
    // Render popular samples
    renderPopularSamples();
}

/**
 * Create HTML markup for a single song card
 * 
 * @param {Object} song - Song object with title, artist, plays, likes, etc.
 * @param {boolean} isTrending - Whether to show trending badge
 * @returns {string} HTML string for the song card
 */
function createSongCard(song, isTrending) {
    return `
        <div class="song-card" onclick="playSong(${song.id})">
            ${isTrending ? '<div class="trending-badge"> Trending</div>' : ''}
            <div class="song-artwork">
                <div class="play-overlay">
                    <div class="play-btn">▶</div>
                </div>
            </div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-stats">
                <div class="stat">
                    <span>▶</span>
                    <span>${song.plays}</span>
                </div>
                <div class="stat">
                    <span>❤</span>
                    <span>${song.likes}</span>
                </div>
            </div>
        </div>
    `;
}

// =============== MOCK DATA - POPULAR SAMPLES ===============
// Sample audio clips from various artists
// These represent short audio samples that can be used in productions
const popularSamples = [
    {
        id: 1,
        artist: "JazzMaster",
        likes: "1.2K",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        artist: "BassKing",
        likes: "2.8K",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        artist: "LoFiBeats",
        likes: "1.5K",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        artist: "KeysPlayer",
        likes: "892",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: 5,
        artist: "DrumPro",
        likes: "3.1K",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 6,
        artist: "SynthWave",
        likes: "654",
        gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    },
    {
        id: 7,
        artist: "VocalFX",
        likes: "2.3K",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
        id: 8,
        artist: "RockStar",
        likes: "1.7K",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    }
];

// =============== MOCK DATA - VERSE REQUESTS ===============
// Open collaboration requests from producers seeking vocalists/rappers
// Each request includes song info, genre, and description of what's needed
const verseRequests = [
    { 
        id: 1,
        title: "Midnight Dreams", 
        artist: "NightOwl", 
        genre: "R&B",
        description: "Need a smooth verse for the second part. Looking for soulful vocals.",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    { 
        id: 2,
        title: "Street Anthem", 
        artist: "UrbanKing", 
        genre: "Hip-Hop",
        description: "Looking for a hard-hitting verse with strong delivery.",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    { 
        id: 3,
        title: "Summer Vibes", 
        artist: "CoastLine", 
        genre: "Pop",
        description: "Need a catchy hook and verse. Beach vibes and good energy.",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    { 
        id: 4,
        title: "Lost in Space", 
        artist: "CosmicBeats", 
        genre: "Electronic",
        description: "Futuristic trap beat needs melodic verse with auto-tune.",
        gradient: "linear-gradient(135deg, #fa8bff 0%, #2bd2ff 100%)",
    },
    { 
        id: 5,
        title: "Heartbreak Hotel", 
        artist: "EmoBoy", 
        genre: "Alternative",
        description: "Emotional verse needed. Raw and vulnerable lyrics preferred.",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    { 
        id: 6,
        title: "Rise Up", 
        artist: "Motivator", 
        genre: "Rap",
        description: "Inspirational verse needed. Message about overcoming obstacles.",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    }
];

/**
 * Render popular audio samples section
 * Displays circular avatar-style samples from various artists
 * Uses DocumentFragment for efficient rendering
 */
function renderPopularSamples() {
    const samplesContainer = document.getElementById('popularSamples');
    if (!samplesContainer) return;
    
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');
    
    tempDiv.innerHTML = popularSamples.map(sample => `
        <div class="sample-item" onclick="playSample(${sample.id})">
            <div class="sample-cover">
                <div class="play-icon">▶</div>
            </div>
            <div class="sample-info">
                <div class="sample-artist">${sample.artist}</div>
                <div class="sample-likes">❤ ${sample.likes}</div>
            </div>
        </div>
    `).join('');
    
    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
    }
    
    // Append to existing content (keep browse card)
    samplesContainer.appendChild(fragment);
}

/**
 * Render verse collaboration requests
 * Shows open requests from producers looking for vocalists/rappers
 * Cards are clickable and navigate to detailed view page
 */
function renderVerseRequests() {
    const verseContainer = document.getElementById('verseRequests');
    if (!verseContainer) return;
    
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');
    
    tempDiv.innerHTML = verseRequests.map(request => `
        <div class="verse-request-item" onclick="window.location.href='fill-verse.html?id=${request.id}'">
            <div class="verse-card-wrapper">
                <div class="verse-request-cover">
                    <div class="verse-request-genre">${request.genre}</div>
                    ${request.icon}
                </div>
                <div class="verse-expanded-content" style="background: ${request.gradient}">
                    <div class="verse-expanded-title">${request.title}</div>
                    <div class="verse-expanded-artist">${request.artist}</div>
                    <div class="verse-expanded-desc">${request.description}</div>
                </div>
            </div>
            <div class="verse-request-title">${request.title}</div>
        </div>
    `).join('');
    
    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
    }
    
    verseContainer.innerHTML = '';
    verseContainer.appendChild(fragment);
}
/**
 * Close the verse request modal and restore page scrolling
 */
function closeVerseModal() {
    const verseModal = document.getElementById('verseModal');
    if (verseModal) {
        verseModal.classList.remove('active');
    }
    document.body.style.overflow = '';
    
    // Reset comments section
    const commentsSection = document.getElementById('commentsSection');
    if (commentsSection) {
        commentsSection.style.display = 'none';
    }
}

// Toggle comments section
function toggleComments() {
    const commentsSection = document.getElementById('commentsSection');
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
    } else {
        commentsSection.style.display = 'none';
    }
}

// Close modal on background click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('verseModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVerseModal();
            }
        });
    }
    
    // Optimize scroll containers with passive listeners for better performance
    const scrollContainers = document.querySelectorAll('.horizontal-scroll-container, .samples-scroll, .verse-right');
    scrollContainers.forEach(container => {
        // Add passive scroll listener
        container.addEventListener('scroll', () => {
            // Scroll events handled passively for better performance
        }, { passive: true });
        
        // Add touch event listeners as passive for smoother scrolling on mobile
        container.addEventListener('touchstart', () => {}, { passive: true });
        container.addEventListener('touchmove', () => {}, { passive: true });
    });
});

// =============== PLAYBACK FUNCTIONS ===============
// These are placeholder functions for media playback
// In production, these would integrate with an actual audio player

/**
 * Play a sample audio clip
 * @param {number} sampleId - ID of the sample to play
 */
function playSample(sampleId) {
    const sample = popularSamples.find(s => s.id === sampleId);
    if (sample) {
        console.log(`Playing sample by: ${sample.artist}`);
        showNotification(`Playing sample`);
    }
}

/**
 * Play a verse request audio preview
 * @param {number} verseId - ID of the verse request to play
 */
function playVerse(verseId) {
    const verse = verseRequests.find(v => v.id === verseId);
    if (verse) {
        console.log(`Playing: ${verse.title} by ${verse.artist}`);
        showNotification(`Playing: ${verse.title}`);
    }
}

/**
 * Play a full song
 * @param {number} songId - ID of the song to play
 */
function playSong(songId) {
    const allSongs = [...newSongs, ...trendingSongs];
    const song = allSongs.find(s => s.id === songId);
    if (song) {
        console.log(`Playing: ${song.title} by ${song.artist}`);
        showNotification(`Now playing: ${song.title}`);
    }
}

// =============== NOTIFICATION SYSTEM ===============

/**
 * Display a toast-style notification
 * Slides in from the right, displays for 3 seconds, then slides out
 * 
 * @param {string} message - The message to display
 */
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--border-color);
        z-index: 10000;
        opacity: 0;
        transform: translate3d(400px, 0, 0);
        transition: opacity 0.3s ease, transform 0.3s ease;
        will-change: transform, opacity;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation with requestAnimationFrame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translate3d(0, 0, 0)';
        });
    });
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate3d(400px, 0, 0)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =============== EVENT LISTENER SETUP ===============

/**
 * Initialize navigation and interaction event listeners
 * - Sets active state on current page's nav icon
 * - Could be extended with additional interaction handlers
 */
function initializeEventListeners() {
    // Add active state to nav icons
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        if (icon.getAttribute('href') === window.location.pathname || 
            (window.location.pathname === '/' && icon.getAttribute('href') === 'index.html')) {
            icon.classList.add('active');
        }
    });
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translate3d(400px, 0, 0);
            opacity: 0;
        }
        to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
        to {
            transform: translate3d(400px, 0, 0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
