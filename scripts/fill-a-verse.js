const mockVerseRequests = {
    // Vocal-focused verse requests (singing, melodies, hooks)
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
    // Rap-focused verse requests (bars, flows, rap verses)
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
};

// =============== DOM ELEMENTS ===============
// Get references to container elements for each category
const vocalsContainer = document.getElementById('vocalsContainer');
const rapContainer = document.getElementById('rapContainer');

// =============== INITIALIZATION ===============

/**
 * Initialize the page by rendering verse cards
 * Called when DOM is fully loaded
 */
function init() {
    renderVerseCards(mockVerseRequests.vocals, vocalsContainer);
    renderVerseCards(mockVerseRequests.rap, rapContainer);
}

// =============== RENDERING FUNCTIONS ===============

/**
 * Render verse request cards into a container
 * Creates clickable cards for each verse request
 * 
 * @param {Array} verses - Array of verse request objects
 * @param {HTMLElement} container - DOM element to render cards into
 */
function renderVerseCards(verses, container) {
    // Clear existing content
    container.innerHTML = '';
    
    // Use DocumentFragment for efficient batch DOM insertion
    const fragment = document.createDocumentFragment();
    
    verses.forEach(verse => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'verse-card';
        card.onclick = () => handleVerseClick(verse);
        
        // Build card HTML
        card.innerHTML = `
            <img src="${verse.artwork}" alt="${verse.title}" class="verse-card-artwork">
            <div class="verse-card-title">${verse.title}</div>
        `;
        
        fragment.appendChild(card);
    });
    
    // Single DOM insertion for better performance
    container.appendChild(fragment);
}

// =============== EVENT HANDLERS ===============

/**
 * Handle click on a verse request card
 * TODO: Navigate to detailed view or open modal
 * 
 * @param {Object} verse - The verse request object that was clicked
 */
function handleVerseClick(verse) {
    console.log('Clicked verse:', verse);
    // TODO: Open detailed view or modal
    // For now, showing a simple alert
    alert(`View details for: ${verse.title}`);}

// =============== INITIALIZATION ===============
// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
