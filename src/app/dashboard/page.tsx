// Dashboard page component
// Protected route: "/dashboard"
// Features:
// - Recipe listing
// - Search and filtering
// - Collection management
// - User profile section

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import Navbar from '@/components/layout/Navbar'

interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchLatestRecipes()
  }, [])

  const fetchLatestRecipes = async () => {
    try {
      const response = await fetch('/api/recipes/latest')
      const data = await response.json()
      setRecipes(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[url('/textures/wood-bg.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Navbar with signout */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-amber-50 mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-amber-100">
            Discover new recipes or check your saved favorites
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <button
            onClick={() => router.push('/dashboard/saved')}
            className="p-6 rounded-lg bg-[url('/textures/light-wood.jpg')] bg-cover
                     hover:transform hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center">
              <span className="text-lg font-medium text-amber-50">Saved Recipes</span>
            </div>
          </button>
          <button
            onClick={() => router.push('/dashboard/browse')}
            className="p-6 rounded-lg bg-[url('/textures/light-wood.jpg')] bg-cover
                     hover:transform hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center">
              <span className="text-lg font-medium text-amber-50">Browse All</span>
            </div>
          </button>
        </div>

        {/* Latest Recipes */}
        <div>
          <h2 className="text-3xl font-serif text-amber-50 mb-6">Latest Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-amber-50/10 rounded-lg h-72"
                />
              ))
            ) : (
              recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card rounded-lg overflow-hidden bg-[url('/textures/light-wood.jpg')] bg-cover"
                >
                  <div className="bg-black/40 backdrop-blur-sm p-4">
                    <h3 className="text-xl font-medium text-amber-50 mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-amber-100">
                      <span>{recipe.readyInMinutes} mins</span>
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
