// Signup page component
// Public route: "/signup"
// Features:
// - Registration form
// - Input validation
// - Error handling
// - Automatic login after signup

'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/context/AuthContext'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  
  const formRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    // Stagger animation for elements
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })

    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await signup({ name, email, password })
    } catch (err) {
      setError('Failed to create account')
    }
  }

  return (
    <div className="min-h-screen bg-[url('/textures/wood-bg.jpg')] bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 max-w-md mx-auto">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-4xl font-bold text-amber-50 font-serif">
            Join Our Kitchen
          </h2>
          <p className="mt-2 text-amber-100">
            Start your culinary adventure today!
          </p>
        </div>

        {/* Form Section */}
        <div 
          ref={formRef}
          className="bg-[url('/textures/light-wood.jpg')] bg-cover rounded-lg p-8 shadow-2xl"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/40 backdrop-blur-sm text-red-100 p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-amber-50 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-amber-50/10 border border-amber-200/20 rounded-lg 
                           text-amber-50 placeholder-amber-200/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent
                           transition duration-200"
                  placeholder="John Doe"
                />
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="block text-amber-50 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/login"
                className="text-amber-200 hover:text-amber-100 text-sm transition-colors duration-200"
              >
                Already have an account? Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
