
let currentSection = 1;

// Store upload data as user progresses through steps
let uploadData = {
    title: '',        // Sample title (required, min 3 chars)
    image: null,      // Base64 encoded image data
    imageFile: null,  // File object for image upload
    audio: null,      // Audio file name (for display)
    audioFile: null,  // File object for audio upload (required)
    intendedGenre: '', // Target genre for the sample
    style: ''         // Musical style classification
};


function goToSection(sectionNum) {
    // ===== Validation =====
    // Only validate when moving forward, allow free backward navigation
    if (sectionNum > currentSection && !validateSection(currentSection)) {
        return;
    }
    
    const currentEl = document.getElementById(`section${currentSection}`);
    const nextEl = document.getElementById(`section${sectionNum}`);
    
    // Animate out current section
    currentEl.classList.remove('active');
    currentEl.classList.add('exit');
    
    setTimeout(() => {
        currentEl.classList.remove('exit');
    }, 600);
    
    // Animate in next section
    setTimeout(() => {
        nextEl.classList.add('active');
        currentSection = sectionNum;
        updateProgressDots();
    }, 300);
}

// Validate section
function validateSection(section) {
    switch(section) {
        case 1:
            const title = document.getElementById('sampleTitle').value.trim();
            if (title.length < 3) {
                showNotification('Please enter a sample title (at least 3 characters)', 'error');
                return false;
            }
            uploadData.title = title;
            return true;
            
        case 2:
            if (!uploadData.intendedGenre) {
                showNotification('Please select an intended genre', 'error');
                return false;
            }
            return true;
            
        case 3:
            if (!uploadData.style) {
                showNotification('Please select a style', 'error');
                return false;
            }
            return true;
            
        case 4:
            // Image is optional
            return true;
            
        case 5:
            // Audio validation happens in form submit
            return true;
            
        default:
            return true;
    }
}

// Update progress dots
function updateProgressDots() {
    const dots = document.querySelectorAll('.progress-dots .dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Handle image selection
function handleImageSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size must be less than 5MB', 'error');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
    }
    
    uploadData.imageFile = file;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadData.image = e.target.result;
        document.getElementById('previewImg').src = e.target.result;
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Remove image
function removeImage() {
    uploadData.image = null;
    uploadData.imageFile = null;
    document.getElementById('sampleImage').value = '';
    document.getElementById('uploadPlaceholder').style.display = 'block';
    document.getElementById('imagePreview').style.display = 'none';
}

// Handle audio selection
function handleAudioSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
        showNotification('Audio file size must be less than 50MB', 'error');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('audio/')) {
        showNotification('Please select a valid audio file', 'error');
        return;
    }
    
    uploadData.audioFile = file;
    
    // Show audio info
    const fileName = file.name;
    const fileSize = formatFileSize(file.size);
    
    document.getElementById('audioName').textContent = fileName;
    document.getElementById('audioSize').textContent = fileSize;
    document.getElementById('audioPlaceholder').style.display = 'none';
    document.getElementById('audioInfo').style.display = 'flex';
}

// Remove audio
function removeAudio() {
    uploadData.audio = null;
    uploadData.audioFile = null;
    document.getElementById('sampleAudio').value = '';
    document.getElementById('audioPlaceholder').style.display = 'block';
    document.getElementById('audioInfo').style.display = 'none';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate audio file
    if (!uploadData.audioFile) {
        showNotification('Please select an audio file', 'error');
        return;
    }
    
    // In a real application, you would upload to a server here
    // For now, we'll save to localStorage and redirect
    
    const sample = {
        id: Date.now(),
        title: uploadData.title,
        image: uploadData.image,
        audioFileName: uploadData.audioFile.name,
        audioFileSize: formatFileSize(uploadData.audioFile.size),
        uploadedBy: getCurrentUser()?.username || 'Anonymous',
        uploadDate: new Date().toISOString(),
        plays: 0,
        likes: 0
    };
    
    // Save to localStorage
    const samples = getSamples();
    samples.unshift(sample);
    saveSamples(samples);
    
    // Show success and redirect
    showSuccessAndRedirect();
});

// Get samples from storage
function getSamples() {
    const samples = localStorage.getItem('beatlink_samples');
    return samples ? JSON.parse(samples) : [];
}

// Save samples to storage
function saveSamples(samples) {
    localStorage.setItem('beatlink_samples', JSON.stringify(samples));
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('beatlink_current_user');
    return user ? JSON.parse(user) : null;
}

// Show success and redirect
function showSuccessAndRedirect() {
    const container = document.querySelector('.upload-container');
    container.innerHTML = `
        <div class="success-animation">
            <div class="success-checkmark">✓</div>
            <h1 class="success-title">Sample Uploaded!</h1>
            <p class="success-message">Your sample has been added to the library</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .success-animation {
            text-align: center;
            animation: fadeIn 0.5s ease;
        }
        
        .success-checkmark {
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
            background: linear-gradient(135deg, #1DB954, #1ed760);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: #000;
            font-weight: bold;
            animation: checkmarkPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .success-title {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #1DB954 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .success-message {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes checkmarkPop {
            0% {
                transform: scale(0) rotate(-180deg);
            }
            50% {
                transform: scale(1.2) rotate(10deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        window.location.href = 'sample-catalog.html';
    }, 2500);
}

// Select intended genre
function selectGenre(button) {
    // Remove selection from all genre buttons
    const allGenreButtons = document.querySelectorAll('#section2 .genre-option');
    allGenreButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add selection to clicked button
    button.classList.add('selected');
    uploadData.intendedGenre = button.dataset.genre;
}

// Select style
function selectStyle(button) {
    // Remove selection from all style buttons
    const allStyleButtons = document.querySelectorAll('#section3 .genre-option');
    allStyleButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add selection to clicked button
    button.classList.add('selected');
    uploadData.style = button.dataset.style;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? 'rgba(255, 59, 48, 0.95)' : 'rgba(29, 185, 84, 0.95)'};
        backdrop-filter: blur(20px);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Click handlers for upload areas
document.getElementById('imageUploadArea').addEventListener('click', (e) => {
    if (!e.target.closest('.remove-image')) {
        document.getElementById('sampleImage').click();
    }
});

document.getElementById('audioUploadArea').addEventListener('click', (e) => {
    if (!e.target.closest('.remove-audio')) {
        document.getElementById('sampleAudio').click();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateProgressDots();
});
