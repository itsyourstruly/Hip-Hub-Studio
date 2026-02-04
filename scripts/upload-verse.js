// Upload Verse JavaScript

let currentStep = 1;
let uploadData = {
    title: '',
    coverArt: null,
    audioFile: null,
    genre: '',
    descriptions: []
};

let descriptionBoxCount = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updatePreview();
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('beatlink_current_user') || '{}');
    const artistName = currentUser.artistName || currentUser.username || 'Anonymous';
    
    // Set artist preview
    const artistPreview = document.getElementById('artistPreview').querySelector('.preview-value');
    artistPreview.textContent = artistName;
    document.getElementById('artistPreview').classList.add('show');
});

function setupEventListeners() {
    // Song title input with live preview
    const titleInput = document.getElementById('songTitle');
    titleInput.addEventListener('input', (e) => {
        uploadData.title = e.target.value;
        updatePreview();
    });

    // Description textarea with live preview (using event delegation)
    const descContainer = document.getElementById('descriptionBoxesContainer');
    descContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('verse-description')) {
            updateDescriptions();
            updatePreview();
        }
    });

    // Image upload
    const imageInput = document.getElementById('imageInput');
    const imageUploadBtn = document.getElementById('imageUploadBtn');
    imageUploadBtn.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', handleImageSelect);

    // Audio upload
    const audioInput = document.getElementById('audioInput');
    const audioUploadBtn = document.getElementById('audioUploadBtn');
    audioUploadBtn.addEventListener('click', () => audioInput.click());
    audioInput.addEventListener('change', handleAudioSelect);

    // Genre selection
    const genrePills = document.querySelectorAll('.genre-pill');
    genrePills.forEach(pill => {
        pill.addEventListener('click', () => {
            genrePills.forEach(p => p.classList.remove('selected'));
            pill.classList.add('selected');
            uploadData.genre = pill.dataset.genre;
            updatePreview();
        });
    });
}

function addDescriptionBox() {
    const container = document.getElementById('descriptionBoxesContainer');
    const wrapper = document.createElement('div');
    wrapper.className = 'description-box-wrapper smaller';
    
    const textarea = document.createElement('textarea');
    textarea.className = 'verse-description';
    textarea.setAttribute('data-index', descriptionBoxCount);
    textarea.setAttribute('placeholder', 'Describe another verse you need...');
    textarea.setAttribute('maxlength', '200');
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-description-btn';
    removeBtn.textContent = '-';
    removeBtn.onclick = (e) => {
        e.preventDefault();
        removeDescriptionBox(wrapper);
    };
    
    wrapper.appendChild(textarea);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);
    
    // Make all boxes smaller
    const allWrappers = container.querySelectorAll('.description-box-wrapper');
    allWrappers.forEach(w => w.classList.add('smaller'));
    
    // Add remove buttons to all boxes if there's more than one
    updateRemoveButtons();
    
    descriptionBoxCount++;
}

function removeDescriptionBox(wrapper) {
    wrapper.classList.add('removing');
    setTimeout(() => {
        wrapper.remove();
        updateRemoveButtons();
        updateDescriptions();
        updatePreview();
        
        // If only one box left, make it full size
        const container = document.getElementById('descriptionBoxesContainer');
        const remainingBoxes = container.querySelectorAll('.description-box-wrapper');
        if (remainingBoxes.length === 1) {
            remainingBoxes[0].classList.remove('smaller');
        }
    }, 300);
}

function updateRemoveButtons() {
    const container = document.getElementById('descriptionBoxesContainer');
    const wrappers = container.querySelectorAll('.description-box-wrapper');
    
    wrappers.forEach(wrapper => {
        const existingBtn = wrapper.querySelector('.remove-description-btn');
        if (wrappers.length > 1 && !existingBtn) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-description-btn';
            removeBtn.textContent = '-';
            removeBtn.onclick = (e) => {
                e.preventDefault();
                removeDescriptionBox(wrapper);
            };
            wrapper.appendChild(removeBtn);
        } else if (wrappers.length === 1 && existingBtn) {
            existingBtn.remove();
        }
    });
}

function updateDescriptions() {
    const textareas = document.querySelectorAll('.verse-description');
    uploadData.descriptions = Array.from(textareas)
        .map(ta => ta.value.trim())
        .filter(desc => desc.length > 0);
}

function updatePreview() {
    // Update track name
    const trackPreview = document.getElementById('trackPreview');
    const trackValue = trackPreview.querySelector('.preview-value');
    if (uploadData.title) {
        trackValue.textContent = uploadData.title;
        trackPreview.classList.add('show');
    } else {
        trackValue.textContent = '';
        trackPreview.classList.remove('show');
    }

    // Update genre
    const genrePreview = document.getElementById('genrePreview');
    const genreValue = genrePreview.querySelector('.preview-value');
    if (uploadData.genre) {
        genreValue.textContent = uploadData.genre;
        genrePreview.classList.add('show');
    } else {
        genreValue.textContent = '';
        genrePreview.classList.remove('show');
    }

    // Update description
    const descriptionPreview = document.getElementById('descriptionPreview');
    const descValue = descriptionPreview.querySelector('.preview-value');
    if (uploadData.descriptions.length > 0) {
        const descriptionsText = uploadData.descriptions.map(d => `"${d}"`).join(' + ');
        descValue.textContent = descriptionsText;
        descriptionPreview.classList.add('show');
    } else {
        descValue.textContent = '';
        descriptionPreview.classList.remove('show');
    }
}

function goToStep(stepNumber) {
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Show new step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update step indicator
    currentStep = stepNumber;
    document.getElementById('currentStep').textContent = stepNumber;
}

function validateStep(step) {
    // All fields are optional now
    return true;
}

function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
    }

    // Read and display image
    const reader = new FileReader();
    reader.onload = (e) => {
        const coverImage = document.getElementById('coverImage');
        coverImage.src = e.target.result;
        coverImage.style.display = 'block';
        
        document.querySelector('.preview-placeholder').style.display = 'none';
        document.getElementById('coverPreview').classList.add('show');
        document.getElementById('imageFileName').textContent = file.name;
        
        uploadData.coverArt = file;
    };
    reader.readAsDataURL(file);
}

function handleAudioSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('audio/')) {
        alert('Please select an audio file');
        return;
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
        alert('Audio file must be less than 50MB');
        return;
    }

    // Display audio info
    document.getElementById('audioFileName').textContent = file.name;
    
    uploadData.audioFile = file;
}

function submitRequest() {
    // Collect all descriptions
    updateDescriptions();
    
    // Save to localStorage
    const verses = JSON.parse(localStorage.getItem('beatlink_verses') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('beatlink_current_user') || '{}');
    
    const newVerse = {
        id: Date.now(),
        title: uploadData.title || 'Untitled',
        artist: currentUser.artistName || currentUser.username || 'Anonymous',
        genre: uploadData.genre || 'Unspecified',
        description: uploadData.descriptions.length > 0 ? uploadData.descriptions.join(' + ') : 'No description provided',
        descriptions: uploadData.descriptions,
        coverArt: uploadData.coverArt ? uploadData.coverArt.name : null,
        audioFile: uploadData.audioFile ? uploadData.audioFile.name : null,
        timestamp: new Date().toISOString(),
        likes: 0,
        submissions: 0
    };

    verses.push(newVerse);
    localStorage.setItem('beatlink_verses', JSON.stringify(verses));

    // Show success and redirect
    showSuccessAndRedirect();
}

function showSuccessAndRedirect() {
    // Hide all steps
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`step${i}`).classList.remove('active');
    }
    
    // Show success screen
    document.getElementById('stepSuccess').style.display = 'block';
    document.getElementById('stepSuccess').classList.add('active');
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}
