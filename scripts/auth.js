// =====================================================
// AUTHENTICATION SYSTEM
// =====================================================
// This module handles user authentication, login/signup flows,
// and session management using browser localStorage.
// In a production environment, this would be replaced with a
// secure backend authentication service.
// =====================================================

// =============== CONSTANTS ===============
// Storage keys for persisting user data in localStorage
const USERS_KEY = 'beatlink_users';           // Key for array of all registered users
const CURRENT_USER_KEY = 'beatlink_current_user'; // Key for currently logged-in user

// =============== USER STORAGE FUNCTIONS ===============

/**
 * Retrieves all registered users from localStorage
 * @returns {Array} Array of user objects, or empty array if none exist
 */
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

/**
 * Saves the complete list of users to localStorage
 * @param {Array} users - Array of user objects to save
 */
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Retrieves the currently logged-in user from localStorage
 * @returns {Object|null} User object without password, or null if no user is logged in
 */
function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

/**
 * Saves the current logged-in user to localStorage
 * This should only store user data without the password for security
 * @param {Object} user - User object (without password field)
 */
function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

/**
 * Logs out the current user by removing their session data
 */
function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

// =============== INITIALIZATION ===============

/**
 * Sets up the authentication system when the DOM is ready
 * This is the main entry point for the auth module
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});

/**
 * Initializes the authentication system by:
 * 1. Getting DOM element references
 * 2. Checking if a user is already logged in
 * 3. Setting up event listeners for auth actions
 * 4. Configuring the auth modal and forms
 */
function initializeAuth() {
    // ===== Get DOM element references =====
    const modal = document.getElementById('authModal');
    const profileBtn = document.getElementById('profileBtn');
    const closeModal = document.getElementById('closeModal');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginFormElement');
    const signupForm = document.getElementById('signupFormElement');
    
    // ===== Check authentication state =====
    // On page load, check if a user is already logged in and update UI accordingly
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateProfileButton(true);
    }
    
    // ===== Profile button event handler =====
    // Shows different UI based on authentication state:
    // - Logged in: Display profile menu with user info and logout option
    // - Not logged in: Show login/signup modal
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentUser = getCurrentUser();
            if (currentUser) {
                // User is logged in - show profile options
                showProfileMenu();
            } else {
                // User not logged in - show auth modal
                showAuthModal('login');
            }
        });
    }
    
    // ===== Modal close handlers =====
    // Allow users to close the auth modal via the X button
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    // Close modal when clicking the backdrop (outside the modal content)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // ===== Auth form navigation =====
    // Handle switching between login and signup forms
    
    // "Sign up" link - redirects to dedicated signup page
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            // Redirect to signup page for better user experience
            window.location.href = 'signup.html';
        });
    }
    
    // "Log in" link - switches back to login form
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    // ===== Form submission handlers =====
    // Process login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            handleLogin();
        });
    }
    
    // Process signup form submission (if modal includes signup form)
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            handleSignup();
        });
    }
}

/**
 * Opens the authentication modal
 * @param {string} type - Type of form to show ('login' or 'signup')
 */
function showAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    modal.classList.add('show');
}


function handleLogin() {
    // Get form input values
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Look up user in stored users list
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        
        // Remove password before storing in session for security
        // We never store passwords in the current user session
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        saveCurrentUser(userWithoutPassword);
        
        // Update UI to reflect logged-in state
        document.getElementById('authModal').classList.remove('show');
        updateProfileButton(true);
        showNotification(`Welcome back, ${user.artistName || user.username}!`);
        
        // Reset form for next time
        document.getElementById('loginFormElement').reset();
    } else {
        // ===== Failure: Invalid credentials =====
        showNotification('Invalid username or password', 'error');
    }
}

/**
 * Updates the profile button appearance based on authentication state
 * @param {boolean} isLoggedIn - Whether user is currently logged in
 */
function updateProfileButton(isLoggedIn) {
    const profileBtn = document.getElementById('profileBtn');
    if (isLoggedIn) {
        // Add visual indicator that user is logged in
        profileBtn.classList.add('logged-in');
    } else {
        // Remove logged-in indicator
        profileBtn.classList.remove('logged-in');
    }
}


function showProfileMenu() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // ===== Create profile menu element =====
    const menu = document.createElement('div');
    
    // Apply inline styles for positioning and appearance
    // Using inline styles here for dynamic menu creation
    menu.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(18, 18, 18, 0.98) 100%);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 1rem;
        min-width: 200px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        z-index: 1500;
        opacity: 0;
        transform: translate3d(0, -10px, 0);
        transition: opacity 0.3s ease, transform 0.3s ease;
        will-change: transform, opacity;
    `;
    
    // ===== Build menu content =====
    menu.innerHTML = `
        <div style="padding-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="font-weight: 600; color: #fff;">${currentUser.artistName || currentUser.username}</div>
            <div style="font-size: 0.85rem; color: #b3b3b3;">@${currentUser.username}</div>
            ${currentUser.talent ? `<div style="font-size: 0.8rem; color: #1DB954; margin-top: 0.25rem;">${currentUser.talent}</div>` : ''}
        </div>
        <button id="logoutBtn" style="
            width: 100%;
            padding: 0.75rem;
            margin-top: 1rem;
            background: rgba(255, 59, 48, 0.1);
            color: #ff3b30;
            border: 1px solid rgba(255, 59, 48, 0.3);
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.2s ease, border-color 0.2s ease;
        ">Logout</button>
    `;
    
    document.body.appendChild(menu);
    
    // ===== Animate menu entrance =====
    // Use requestAnimationFrame for smooth, performant animation
    // Double RAF ensures the transition actually fires
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            menu.style.opacity = '1';
            menu.style.transform = 'translate3d(0, 0, 0)';
        });
    });
    
    // ===== Logout button handler =====
    document.getElementById('logoutBtn').addEventListener('click', () => {
        clearCurrentUser();              // Remove user session
        updateProfileButton(false);      // Update UI
        showNotification('Logged out successfully');
        menu.remove();                   // Remove menu from DOM
    });
    
    // ===== Click-outside to close =====
    // Close menu when user clicks anywhere outside of it
    const closeMenu = (e) => {
        if (!menu.contains(e.target) && e.target.id !== 'profileBtn') {
            // Animate out
            menu.style.opacity = '0';
            menu.style.transform = 'translate3d(0, -10px, 0)';
            setTimeout(() => {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }, 300);
        }
    };
    
    // Add listener after a short delay to prevent immediate closing
    // (because the click that opened the menu would also close it)
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 100);
}

// =============== NOTIFICATION SYSTEM ===============

/**
 * Displays a temporary notification message to the user
 * Creates a toast-style notification that slides in from the right,
 * displays for 3 seconds, then slides out
 * 
 * @param {string} message - The text message to display
 * @param {string} type - Type of notification ('success' or 'error')
 *                       Determines the color scheme
 */
function showNotification(message, type = 'success') {
    // ===== Create notification element =====
    const notification = document.createElement('div');
    
    // Dynamic styling based on notification type
    // Error notifications use red, success use default card background
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? 'rgba(255, 59, 48, 0.95)' : 'var(--card-bg)'};
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        border: 1px solid ${type === 'error' ? 'rgba(255, 59, 48, 0.5)' : 'var(--border-color)'};
        z-index: 10000;
        max-width: 300px;
        opacity: 0;
        transform: translate3d(400px, 0, 0);
        transition: opacity 0.3s ease, transform 0.3s ease;
        will-change: transform, opacity;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // ===== Animate entrance =====
    // Use requestAnimationFrame for smooth, hardware-accelerated animation
    // Double RAF ensures styles are applied before animation starts
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translate3d(0, 0, 0)';
        });
    });
    
    // ===== Auto-dismiss after 3 seconds =====
    setTimeout(() => {
        // Animate out
        notification.style.opacity = '0';
        notification.style.transform = 'translate3d(400px, 0, 0)';
        // Remove from DOM after animation completes
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
