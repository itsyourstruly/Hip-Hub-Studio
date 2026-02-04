// =====================================================
// SIGNUP FLOW LOGIC
// =====================================================
// Multi-step signup wizard that guides new users through
// account creation with progressive disclosure of information.
// Steps: Username → Password → Artist Name → Specialty → Talent
// =====================================================

// =============== CONSTANTS ===============
// Storage keys must match those in auth.js for consistency
const USERS_KEY = 'beatlink_users';           // Key for all registered users
const CURRENT_USER_KEY = 'beatlink_current_user'; // Key for current session

// =============== STATE MANAGEMENT ===============
// Track current step in the multi-step wizard (1-5)
let currentStep = 1;

// Store user data as they progress through signup
// This object accumulates data from each step
let userData = {
    username: '',    // Required: Unique identifier for login
    password: '',    // Required: User's password (min 6 chars)
    artistName: '',  // Optional: Display name (defaults to username)
    specialty: '',   // Optional: Music specialty (Producer/Artist/etc)
    talent: ''       // Optional: Specific musical talent
};

// =============== INITIALIZATION ===============

/**
 * Initialize signup page when DOM is ready
 * Sets up interactive elements and keyboard shortcuts
 */
document.addEventListener('DOMContentLoaded', () => {
    setupFloatingOptions();    // Configure specialty/talent selection buttons
    setupEnterKeyHandlers();   // Enable Enter key to advance steps
});

// =============== SETUP FUNCTIONS ===============

/**
 * Configure floating option buttons for specialty and talent selection
 * These buttons use a radio-button style selection (only one can be active)
 * Stores selected values in the userData object
 */
function setupFloatingOptions() {
    const specialtyOptions = document.querySelectorAll('#specialtyOptions .floating-option');
    const talentOptions = document.querySelectorAll('#talentOptions .floating-option');
    
    // ===== Specialty options (Producer, Artist, Engineer, etc.) =====
    specialtyOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Deselect all other options (radio button behavior)
            specialtyOptions.forEach(opt => opt.classList.remove('selected'));
            // Select clicked option
            option.classList.add('selected');
            // Store selection from data attribute
            userData.specialty = option.dataset.value;
        });
    });
    
    // ===== Talent options (Vocals, Rap, Instruments, etc.) =====
    talentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Deselect all other options (radio button behavior)
            talentOptions.forEach(opt => opt.classList.remove('selected'));
            // Select clicked option
            option.classList.add('selected');
            // Store selection from data attribute
            userData.talent = option.dataset.value;
        });
    });
}

/**
 * Setup Enter key handlers for text input fields
 * Allows users to press Enter to advance to next step
 * Improves UX by enabling keyboard-only navigation
 */
function setupEnterKeyHandlers() {
    // Username field (Step 1) → advance to Step 2
    document.getElementById('username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') nextStep(2);
    });
    
    // Password field (Step 2) → advance to Step 3
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') nextStep(3);
    });
    
    // Artist name field (Step 3) → advance to Step 4
    document.getElementById('artistName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') nextStep(4);
    });
}

// =============== NAVIGATION FUNCTIONS ===============

/**
 * Advance to the next step in the signup flow
 * Features:
 * - Validates current step before proceeding
 * - Updates progress bar
 * - Animates transition between steps
 * - Auto-focuses input fields in new step
 * 
 * @param {number} stepNum - The step number to navigate to (1-5)
 */
function nextStep(stepNum) {
    // ===== Validation =====
    // Don't proceed if current step has invalid data
    if (!validateStep(currentStep)) {
        return;
    }
    
    // ===== Update progress bar =====
    const progressFill = document.getElementById('progressFill');
    const progressWidth = (stepNum / 5) * 100; // Calculate percentage
    progressFill.style.width = progressWidth + '%';
    
    // ===== Animate transition =====
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const nextStepEl = document.getElementById(`step${stepNum}`);
    
    // Slide current step out to the left
    currentStepEl.classList.remove('active');
    currentStepEl.classList.add('exit-left');
    
    // Clean up animation class after transition completes
    setTimeout(() => {
        currentStepEl.classList.remove('exit-left');
    }, 600);
    
    // Slide new step in from the right
    nextStepEl.classList.add('active');
    
    // Update state
    currentStep = stepNum;
    
    // ===== Auto-focus input =====
    // Automatically focus the input field in the new step
    // Improves UX by allowing immediate typing
    setTimeout(() => {
        const input = nextStepEl.querySelector('.step-input');
        if (input) input.focus();
    }, 300);
}

/**
 * Navigate back to a previous step in the signup flow
 * Similar to nextStep but without validation (going back always allowed)
 * 
 * @param {number} stepNum - The step number to navigate back to
 */
function prevStep(stepNum) {
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const progressWidth = (stepNum / 5) * 100;
    progressFill.style.width = progressWidth + '%';
    
    // Get DOM elements for current and previous steps
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const prevStepEl = document.getElementById(`step${stepNum}`);
    
    // Hide current step
    currentStepEl.classList.remove('active');
    // Show previous step
    prevStepEl.classList.add('active');
    
    // Update state
    currentStep = stepNum;
    
    // Auto-focus input field in previous step
    setTimeout(() => {
        const input = prevStepEl.querySelector('.step-input');
        if (input) input.focus();
    }, 300);
}

// =============== VALIDATION ===============

/**
 * Validates the current step before allowing navigation
 * Each step has different validation requirements:
 * - Step 1 (Username): Must be at least 3 characters
 * - Step 2 (Password): Must be at least 6 characters
 * - Steps 3-5: Optional fields, always pass validation
 * 
 * @param {number} step - The step number to validate
 * @returns {boolean} True if validation passes, false otherwise
 */
function validateStep(step) {
    switch(step) {
        case 1:
            // Username validation
            const username = document.getElementById('username').value.trim();
            if (username.length < 3) {
                showError('Username must be at least 3 characters');
                return false;
            }
            userData.username = username;
            return true;
            
        case 2:
            // Password validation
            const password = document.getElementById('password').value;
            if (password.length < 6) {
                showError('Password must be at least 6 characters');
                return false;
            }
            userData.password = password;
            return true;
            
        case 3:
            // Artist name (optional, defaults to username if empty)
            const artistName = document.getElementById('artistName').value.trim();
            userData.artistName = artistName || userData.username;
            return true;
            
        case 4:
            // Specialty is optional
            return true;
            
        case 5:
            // Talent is optional
            return true;
            
        default:
            return true;
    }
}

// =============== ACCOUNT CREATION ===============

/**
 * Complete the signup process by:
 * 1. Checking for duplicate usernames
 * 2. Creating new user account
 * 3. Auto-logging in the new user
 * 4. Showing success animation
 * 5. Redirecting to home page
 */
function completeSignup() {
    // ===== Check for duplicate username =====
    const users = getUsers();
    if (users.find(u => u.username === userData.username)) {
        showError('Username already exists. Please go back and choose another.');
        return;
    }
    
    // ===== Create user account =====
    const newUser = {
        username: userData.username,
        password: userData.password,
        artistName: userData.artistName,
        specialty: userData.specialty,
        talent: userData.talent,
        createdAt: new Date().toISOString() // Timestamp for record keeping
    };
    
    // Add to users array and save
    users.push(newUser);
    saveUsers(users);
    
    // ===== Auto-login =====
    // Log the user in immediately after signup
    // Remove password before storing in session for security
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    saveCurrentUser(userWithoutPassword);
    
    // ===== Show success and redirect =====
    showSuccessAndRedirect();
}

// =============== SUCCESS ANIMATION ===============

/**
 * Replace signup form with success animation
 * Shows:
 * - Animated checkmark icon
 * - Welcome message
 * - Loading dots animation
 * Then redirects to home page after 2 seconds
 */
function showSuccessAndRedirect() {
    const container = document.querySelector('.signup-container');
    
    // Replace entire container content with success message
    container.innerHTML = `
        <div class="success-message">
            <div class="success-icon">✓</div>
            <h1 class="success-title">Welcome to BeatLink!</h1>
            <p class="success-subtitle">Your account has been created</p>
            <div class="loading-dots">
                <span>.</span><span>.</span><span>.</span>
            </div>
        </div>
    `;
    
    // Add success styles
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            text-align: center;
            animation: successFadeIn 0.6s ease;
        }
        
        .success-icon {
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            background: #1DB954;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: #000;
            font-weight: bold;
            animation: successPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
        
        .success-subtitle {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 2rem;
        }
        
        .loading-dots {
            font-size: 2rem;
            color: #1DB954;
        }
        
        .loading-dots span {
            animation: dotPulse 1.4s infinite ease-in-out;
        }
        
        .loading-dots span:nth-child(1) {
            animation-delay: 0s;
        }
        
        .loading-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .loading-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes successFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes successPop {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes dotPulse {
            0%, 60%, 100% {
                opacity: 0.3;
                transform: translateY(0);
            }
            30% {
                opacity: 1;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== Auto-redirect =====
    // Navigate to home page after showing success message
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// =============== ERROR HANDLING ===============

/**
 * Display an error notification to the user
 * Shows at the top of the page with a shake animation
 * Auto-dismisses after 3 seconds
 * 
 * @param {string} message - The error message to display
 */
function showError(message) {
    const notification = document.createElement('div');
    // Position at top center of page
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 59, 48, 0.95);
        backdrop-filter: blur(20px);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(255, 59, 48, 0.3);
        z-index: 10000;
        animation: errorShake 0.5s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add shake animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes errorShake {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            25% { transform: translateX(-50%) translateY(-5px); }
            75% { transform: translateX(-50%) translateY(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-dismiss notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =============== STORAGE FUNCTIONS ===============
// These mirror the functions in auth.js to maintain consistency

/**
 * Retrieve all registered users from localStorage
 * @returns {Array} Array of user objects
 */
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

/**
 * Save all users to localStorage
 * @param {Array} users - Array of user objects to save
 */
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Save the currently logged-in user to localStorage
 * @param {Object} user - User object (without password)
 */
function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}
