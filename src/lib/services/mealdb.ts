const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export interface MealDBRecipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  strTags: string
  strYoutube: string
  strSource: string
}

export const mealDBService = {
  searchRecipes: async (query: string) => {
    const response = await fetch(`${MEALDB_BASE_URL}/search.php?s=${query}`)
    const data = await response.json()
    return data.meals || []
  },

  getRandomRecipes: async () => {
    // Fetch more than needed to ensure uniqueness
    const recipes = await Promise.all(
      Array(8).fill(null).map(async () => {
        const response = await fetch(`${MEALDB_BASE_URL}/random.php`)
        const data = await response.json()
        return data.meals[0]
      })
    )
    
    // Remove duplicates and limit to 6
    return Array.from(
      new Map(recipes.map(recipe => [recipe.idMeal, recipe])).values()
    ).slice(0, 6)
  },

  getRecipesByCategory: async (category: string) => {
    const response = await fetch(`${MEALDB_BASE_URL}/filter.php?c=${category}`)
    const data = await response.json()
    return data.meals || []
  },

  getCategories: async () => {
    const response = await fetch(`${MEALDB_BASE_URL}/categories.php`)
    const data = await response.json()
    return data.categories || []
  },

  getRecipeById: async (id: string) => {
    const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`)
    const data = await response.json()
    return data.meals?.[0]
  },
} 