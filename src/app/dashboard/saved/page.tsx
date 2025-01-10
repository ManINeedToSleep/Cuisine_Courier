'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'

interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
}

interface SavedRecipe extends Recipe {
  savedAt: string
}

export default function SavedRecipesPage() {
  const router = useRouter()
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSavedRecipes()
  }, [])

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch('/api/recipes/saved')
      const data = await response.json()
      setSavedRecipes(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching saved recipes:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[url('/textures/wood-bg.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="mr-4 text-amber-100 hover:text-amber-50 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-serif text-amber-50">Saved Recipes</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-amber-50/10 rounded-lg h-72"
              />
            ))
          ) : savedRecipes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-amber-100">
                No saved recipes yet. Start exploring to save your favorites!
              </p>
            </div>
          ) : (
            savedRecipes.map((recipe) => (
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
                  <div className="mt-4 text-sm text-amber-200">
                    Saved on {new Date(recipe.savedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
} 