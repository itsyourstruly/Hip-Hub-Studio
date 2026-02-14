import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Storage keys
const USERS_KEY = 'beatlink_users'
const CURRENT_USER_KEY = 'beatlink_current_user'

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize: Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem(CURRENT_USER_KEY)
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setIsLoading(false)
  }, [])

  // Get all users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  // Login function
  const login = (username, password) => {
    const users = getUsers()
    const user = users.find(
      u => u.username === username && u.password === password
    )

    if (user) {
      // Don't store password in current user
      const { password, ...userWithoutPassword } = user
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
      setCurrentUser(userWithoutPassword)
      return { success: true }
    }

    return { success: false, error: 'Invalid username or password' }
  }

  // Signup function
  const signup = (userData) => {
    const users = getUsers()
    
    // Check if username already exists
    if (users.find(u => u.username === userData.username)) {
      return { success: false, error: 'Username already exists' }
    }

    // Add new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    saveUsers(users)

    // Auto-login after signup
    const { password, ...userWithoutPassword } = newUser
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    setCurrentUser(userWithoutPassword)

    return { success: true }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
