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
    // This fetches from MealDB API, not your database
    const response = await fetch(`${MEALDB_BASE_URL}/random.php`)
    const data = await response.json()
    return data.meals?.[0]
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