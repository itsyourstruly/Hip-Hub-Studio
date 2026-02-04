
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
];

// Track currently displayed samples and active filters
let currentSamples = [...mockSamples];           // Currently filtered/searched samples
let selectedIntendedGenres = new Set();          // Active genre filters
let selectedStyles = new Set();                  // Active style filters

// Cache frequently accessed DOM elements
const samplesGrid = document.getElementById('samplesGrid');
const searchInput = document.getElementById('searchInput');
const intendedGenreFilters = document.getElementById('intendedGenreFilters');
const styleFilters = document.getElementById('styleFilters');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');


/**
 * Setup event listeners for filter buttons
 * Toggles button selection and updates filtered results
 * Uses Set data structure for efficient filter management
 */
function setupFilterButtons() {
    // ===== Intended Genre filters =====
    const genreButtons = intendedGenreFilters.querySelectorAll('.filter-tag');
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle button selected state
            button.classList.toggle('selected');
            const genre = button.dataset.genre;
            
            // Update filter set
            if (button.classList.contains('selected')) {
                selectedIntendedGenres.add(genre);
            } else {
                selectedIntendedGenres.delete(genre);
            }
            
            // Re-filter and render samples
            handleSearch();
        });
    });
    
    // ===== Style filters =====
    const styleButtons = styleFilters.querySelectorAll('.filter-tag');
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle button selected state
            button.classList.toggle('selected');
            const style = button.dataset.style;
            
            // Update filter set
            if (button.classList.contains('selected')) {
                selectedStyles.add(style);
            } else {
                selectedStyles.delete(style);
            }
            
            // Re-filter and render samples
            handleSearch();
        });
    });
}

function renderSamples(samples) {
    samplesGrid.innerHTML = '';
    
    if (samples.length === 0) {
        showEmptyState();
        return;
    }
    
    hideEmptyState();
    
    const fragment = document.createDocumentFragment();
    
    samples.forEach(sample => {
        const card = document.createElement('div');
        card.className = 'sample-card';
        card.onclick = (event) => handleSampleClick(sample, event);
        
        card.innerHTML = `
            <img src="${sample.artwork}" alt="${sample.title}" class="sample-card-artwork">
            <div class="sample-card-content">
                <div class="sample-card-header">
                    <div class="sample-card-title">${sample.title}</div>
                    <div class="sample-card-tags">
                        <span class="sample-card-genre">${sample.intendedGenre}</span>
                        <span class="sample-card-style">${sample.style}</span>
                    </div>
                </div>
                <div class="sample-card-artist">${sample.artist}</div>
                <div class="sample-card-footer">
                    <span class="sample-card-duration">${sample.duration}</span>
                </div>
            </div>
        `;
        
        fragment.appendChild(card);
    });
    
    samplesGrid.appendChild(fragment);
}

/**
 * Handle click on a sample card
 * Triggers card expansion animation before showing detail view
 * 
 * @param {Object} sample - The sample object that was clicked
 * @param {Event} event - The click event
 */
function handleSampleClick(sample, event) {
    const clickedCard = event.currentTarget;
    expandCardAndShowDetail(clickedCard, sample);
}

function expandCardAndShowDetail(card, sample) {
    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';
    
    // Get card's current position
    const rect = card.getBoundingClientRect();
    
    // Clone the card for animation
    const animatingCard = card.cloneNode(true);
    animatingCard.classList.add('expanding');
    
    // Set initial position to match original card
    animatingCard.style.position = 'fixed';
    animatingCard.style.top = `${rect.top}px`;
    animatingCard.style.left = `${rect.left}px`;
    animatingCard.style.width = `${rect.width}px`;
    animatingCard.style.height = `${rect.height}px`;
    animatingCard.style.margin = '0';
    animatingCard.style.zIndex = '10000';
    
    // Append to body
    document.body.appendChild(animatingCard);
    
    // Hide original card
    card.style.opacity = '0';
    
    // Force reflow
    animatingCard.offsetHeight;
    
    // Expand to fullscreen after a tiny delay
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            animatingCard.style.top = '0';
            animatingCard.style.left = '0';
            animatingCard.style.width = '100vw';
            animatingCard.style.height = '100vh';
            animatingCard.style.borderRadius = '0';
            
            // Fade out content immediately as expansion starts
            animatingCard.classList.add('fade-content');
            
            // Transition background color to match page
            setTimeout(() => {
                animatingCard.classList.add('transition-bg');
            }, 50);
        });
    });
    
    // Show detail view before animation completes (at 60% through)
    setTimeout(() => {
        showSampleDetail(sample);
    }, 180);
    
    // After expansion completes, cleanup
    setTimeout(() => {
        // Remove animating card
        animatingCard.remove();
        
        // Reset original card (in case user goes back)
        card.style.opacity = '1';
    }, 350);
}

function showSampleDetail(sample) {
    // Create detail overlay
    const overlay = document.createElement('div');
    overlay.className = 'sample-detail-overlay';
    overlay.innerHTML = `
        <button class="close-detail-btn" onclick="closeSampleDetail()">←</button>
        <div class="sample-detail-content">
            <div class="sample-detail-header">
                <div class="sample-detail-top">
                    <div class="sample-detail-left">
                        <img src="${sample.artwork}" alt="${sample.title}" class="sample-detail-artwork">
                        <div class="sample-detail-main-info">
                            <h1 class="sample-detail-title">${sample.title}</h1>
                            <p class="sample-detail-artist">${sample.artist}</p>
                        </div>
                    </div>
                    <div class="sample-detail-info">
                        <div class="sample-detail-meta">
                            <div class="sample-detail-meta-item">
                                <span class="sample-detail-meta-label">Intended Genre:</span>
                                <span class="sample-detail-genre">${sample.intendedGenre}</span>
                            </div>
                            <div class="sample-detail-meta-item">
                                <span class="sample-detail-meta-label">Style:</span>
                                <span class="sample-detail-style">${sample.style}</span>
                            </div>
                            <div class="sample-detail-meta-item">
                                <span class="sample-detail-meta-label">Duration:</span>
                                <span class="sample-detail-duration">${sample.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sample-waveform-section">
                <div class="sample-waveform-container">
                    <div class="waveform-placeholder">Audio waveform visualization and cropping tool will appear here</div>
                    <div class="sample-detail-actions">
                        <button class="play-btn-icon" title="Play">▶</button>
                        <button class="download-btn-icon" title="Download">↓</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger animation
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
}

window.closeSampleDetail = function() {
    const overlay = document.querySelector('.sample-detail-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let filteredSamples = mockSamples;
    
    // Apply intended genre filters
    if (selectedIntendedGenres.size > 0) {
        filteredSamples = filteredSamples.filter(sample => 
            selectedIntendedGenres.has(sample.intendedGenre)
        );
    }
    
    // Apply style filters
    if (selectedStyles.size > 0) {
        filteredSamples = filteredSamples.filter(sample => 
            selectedStyles.has(sample.style)
        );
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredSamples = filteredSamples.filter(sample =>
            sample.title.toLowerCase().includes(searchTerm) ||
            sample.artist.toLowerCase().includes(searchTerm) ||
            sample.intendedGenre.toLowerCase().includes(searchTerm) ||
            sample.style.toLowerCase().includes(searchTerm)
        );
    }
    
    currentSamples = filteredSamples;
    renderSamples(currentSamples);
}

// =============== UI STATE FUNCTIONS ===============

/**
 * Show loading spinner, hide content
 */
function showLoading() {
    loadingState.style.display = 'flex';
    samplesGrid.style.display = 'none';
    emptyState.style.display = 'none';
}

function hideLoading() {
    loadingState.style.display = 'none';
    samplesGrid.style.display = 'grid';
}

// Show/hide empty state
function showEmptyState() {
    emptyState.style.display = 'block';
    samplesGrid.style.display = 'none';
}

function hideEmptyState() {
    emptyState.style.display = 'none';
    samplesGrid.style.display = 'grid';
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translate3d(0, 0, 0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate3d(20px, 0, 0)';
        
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 3000);
}

function setupEventListeners() {
    // ===== Search input with debounce =====
    // Debouncing prevents excessive re-renders while user is typing
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(handleSearch, 300);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

/**
 * Initialize the sample catalog page
 * Called when DOM is fully loaded
 */
function init() {
    setupFilterButtons();
    setupEventListeners();
    renderSamples(currentSamples);
    hideLoading();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}