'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import { type MealDBRecipe } from '@/lib/services/mealdb'
import RecipeModal from '@/components/recipe/RecipeModal'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

type FavoriteRecipe = {
  userId: string;
  recipeId: string;
  recipe: MealDBRecipe;
  createdAt: string;
}

export default function SavedRecipesPage() {
  const router = useRouter()
  const [savedRecipes, setSavedRecipes] = useState<FavoriteRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecipe, setSelectedRecipe] = useState<MealDBRecipe | null>(null)

  useEffect(() => {
    fetchSavedRecipes()
  }, [])

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch('/api/favorites')
      const data = await response.json()
      setSavedRecipes(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching saved recipes:', error)
      setLoading(false)
    }
  }

  const removeFavorite = async (recipe: MealDBRecipe) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe }),
      })

      if (response.ok) {
        setSavedRecipes(prev => 
          prev.filter(fav => fav.recipeId !== recipe.idMeal)
        )
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
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
            savedRecipes.map(({ recipe, createdAt }) => (
              <div
                key={recipe.idMeal}
                className="recipe-card rounded-lg overflow-hidden bg-[url('/textures/light-wood.jpg')] bg-cover relative group"
              >
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                    priority={false}
                    unoptimized={false}
                  />
                  <div className="bg-black/40 backdrop-blur-sm p-4">
                    <h3 className="text-xl font-medium text-amber-50 mb-2">
                      {recipe.strMeal}
                    </h3>
                    <div className="flex items-center justify-between text-amber-100">
                      <span>{recipe.strCategory}</span>
                      <span>{recipe.strArea}</span>
                    </div>
                    <div className="mt-4 text-sm text-amber-200">
                      Saved on {new Date(createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFavorite(recipe)
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/50 
                           hover:bg-black/70 transition-colors z-10"
                >
                  <HeartSolid className="w-6 h-6 text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
} 