import { NextResponse } from 'next/server'

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function GET() {
  try {
    // Fetch random recipes
    const recipes = await Promise.all(
      Array(8).fill(null).map(async () => {
        const response = await fetch(`${MEALDB_BASE_URL}/random.php`)
        const data = await response.json()
        return data.meals[0]
      })
    )

    // Remove duplicates using Set and idMeal
    const uniqueRecipes = Array.from(
      new Map(recipes.map(recipe => [recipe.idMeal, recipe])).values()
    ).slice(0, 6)

    // Transform to match our interface
    const formattedRecipes = uniqueRecipes.map(recipe => ({
      id: recipe.idMeal,
      title: recipe.strMeal,
      image: recipe.strMealThumb,
      readyInMinutes: 30,
      servings: 4,
    }))

    return NextResponse.json(formattedRecipes)
  } catch (error) {
    console.error('Error fetching latest recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
} 