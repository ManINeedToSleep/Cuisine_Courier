'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import type { AuthResponse, UserLogin, UserRegistration } from '../types/auth'

interface AuthContextType {
  user: AuthResponse['user'] | null
  loading: boolean
  login: (credentials: UserLogin) => Promise<void>
  signup: (credentials: UserRegistration) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: UserLogin) => {
    try {
      console.log('Sending login request...')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Login response:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setUser(data.user)
      
      // Add a small delay before navigation
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 100)
      
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (credentials: UserRegistration) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      // After signup, log the user in
      await login({
        email: credentials.email,
        password: credentials.password,
      })
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      setUser(null)
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 