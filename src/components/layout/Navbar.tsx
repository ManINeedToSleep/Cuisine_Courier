'use client'
import { useAuth } from '@/lib/context/AuthContext'

export default function Navbar() {
  const { logout } = useAuth()

  const handleSignOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <nav className="bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-amber-50 text-xl font-serif">Cuisine Courier</div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleSignOut}
              className="text-amber-100 hover:text-amber-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 