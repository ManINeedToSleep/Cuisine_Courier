// Login page component
// Public route: "/login"
// Features:
// - Login form
// - Email/password validation
// - Error handling
// - Redirect to dashboard on success

'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/context/AuthContext'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('Attempting login...')
      await login({ email, password })
      console.log('Login successful, should redirect...')
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-[url('/textures/wood-bg.jpg')] bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 max-w-md mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-amber-50 font-serif">
            Welcome Back
          </h2>
          <p className="mt-2 text-amber-100">
            Sign in to continue your culinary journey
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-[url('/textures/light-wood.jpg')] bg-cover rounded-lg p-8 shadow-2xl animate-slide-up">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/40 backdrop-blur-sm text-red-100 p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-amber-50 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-amber-50/10 border border-amber-200/20 rounded-lg 
                           text-amber-50 placeholder-amber-200/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent
                           transition duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-amber-50 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-amber-50/10 border border-amber-200/20 rounded-lg 
                           text-amber-50 placeholder-amber-200/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent
                           transition duration-200"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 
                         text-amber-50 rounded-lg transition-colors duration-200
                         focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/signup"
                className="text-amber-200 hover:text-amber-100 text-sm transition-colors duration-200"
              >
                Need an account? Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}