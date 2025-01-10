'use client'
import { useState } from 'react'
import Image from 'next/image'

interface RecipeModalProps {
  recipe: {
    idMeal: string
    strMeal: string
    strMealThumb: string
    strCategory: string
    strArea: string
    strInstructions: string
    strYoutube?: string
    strSource?: string
    strIngredient1?: string
    strMeasure1?: string
    // ... other ingredients and measures
  }
  onClose: () => void
}

const getDifficulty = (instructions: string) => {
  const steps = instructions.split('\r\n').filter(step => step.trim().length > 0)
  if (steps.length <= 5) return { level: 'Easy', color: 'bg-green-500' }
  if (steps.length <= 8) return { level: 'Medium', color: 'bg-yellow-500' }
  return { level: 'Hard', color: 'bg-red-500' }
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients')
  const difficulty = getDifficulty(recipe.strInstructions)

  // Get all ingredients and measurements (improved filtering)
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}` as keyof typeof recipe]
    const measure = recipe[`strMeasure${i + 1}` as keyof typeof recipe]
    if (ingredient && ingredient.trim() && measure && measure.trim()) {
      return { ingredient, measure }
    }
    return null
  }).filter(Boolean)

  const youtubeId = recipe.strYoutube?.split('v=')[1]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-start justify-center">
        <div className="bg-[url('/textures/light-wood.jpg')] bg-cover rounded-lg max-w-4xl w-full relative mt-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg">
            {/* Header */}
            <div className="p-6 border-b border-amber-500/20">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-serif text-amber-50 mb-2">{recipe.strMeal}</h2>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-amber-100">{recipe.strCategory}</span>
                    <span className="text-amber-100">{recipe.strArea} Cuisine</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${difficulty.color}`}>
                      {difficulty.level}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-amber-100 hover:text-amber-50 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Media Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={400}
                  height={300}
                  className="rounded-lg w-full"
                />
                {youtubeId && (
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="sticky top-0 flex gap-4 mb-6 bg-black/20 p-2 rounded-lg">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'ingredients'
                      ? 'bg-amber-500 text-amber-950'
                      : 'text-amber-100 hover:text-amber-50'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'instructions'
                      ? 'bg-amber-500 text-amber-950'
                      : 'text-amber-100 hover:text-amber-50'
                  }`}
                >
                  Instructions
                </button>
              </div>

              {/* Content */}
              <div className="text-amber-50 pb-6">
                {activeTab === 'ingredients' ? (
                  <div className="bg-black/20 rounded-lg p-6">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ingredients.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 p-2 hover:bg-black/20 rounded">
                          <span className="text-amber-500 text-lg">•</span>
                          <span className="font-medium">{item?.measure}</span>
                          <span>{item?.ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-black/20 rounded-lg p-6">
                    <ol className="space-y-6">
                      {recipe.strInstructions
                        .split(/\r\n|\n|\r/)
                        .filter(step => step.trim().length > 0)
                        .map((step, index) => (
                          <li key={index} className="flex gap-4 p-4 hover:bg-black/20 rounded">
                            <span className="text-amber-500 font-bold text-lg min-w-[1.5rem]">
                              {index + 1}.
                            </span>
                            <span>{step.trim()}</span>
                          </li>
                        ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Source Link */}
              {recipe.strSource && (
                <div className="mt-4 text-sm text-amber-200">
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-100 underline"
                  >
                    View Original Recipe
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 