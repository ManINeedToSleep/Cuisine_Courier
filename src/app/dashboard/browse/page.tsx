'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import { mealDBService, type MealDBRecipe } from '@/lib/services/mealdb'

// MealDB uses these specific category names
const MEAL_CATEGORIES = [
  'Breakfast',
  'Beef',        // Common dinner option
  'Chicken',     // Common lunch/dinner option
  'Pasta',       // Common lunch/dinner option
  'Seafood',     // Common dinner option
  'Vegetarian',  // For dietary preferences
  'Dessert'
]

export default function BrowsePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<MealDBRecipe[]>([])
  const [randomRecipes, setRandomRecipes] = useState<MealDBRecipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRandomRecipes()
  }, [])

  const fetchRandomRecipes = async () => {
    try {
      const recipes = await mealDBService.getRandomRecipes()
      setRandomRecipes(recipes)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching random recipes:', error)
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const results = await mealDBService.searchRecipes(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Error searching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = async (category: string) => {
    try {
      setLoading(true)
      const results = await mealDBService.getRecipesByCategory(category)
      setSearchResults(results)
    } catch (error) {
      console.error('Error fetching category recipes:', error)
    } finally {
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
          <h1 className="text-4xl font-serif text-amber-50">Browse Recipes</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="w-full px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm
                       text-amber-50 placeholder-amber-200/50 border border-amber-100/20
                       focus:outline-none focus:border-amber-100/40"
            />
          </div>
        </form>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif text-amber-50 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-4">
            {MEAL_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-6 py-3 rounded-lg bg-black/40 backdrop-blur-sm
                         text-amber-50 hover:bg-black/60 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results or Random Recipes */}
        <div>
          <h2 className="text-2xl font-serif text-amber-50 mb-6">
            {searchResults.length > 0 ? 'Search Results' : 'Random Recipes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-amber-50/10 rounded-lg h-72"
                />
              ))
            ) : (
              (searchResults.length > 0 ? searchResults : randomRecipes).map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="recipe-card rounded-lg overflow-hidden bg-[url('/textures/light-wood.jpg')] bg-cover"
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