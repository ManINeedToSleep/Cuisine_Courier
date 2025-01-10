import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For testing, return mock data until DB is setup
    const mockRecipes = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        image: "/images/carbonara.jpg",
        readyInMinutes: 30,
        servings: 4
      },
      {
        id: 2,
        title: "Classic Burger",
        image: "/images/burger.jpg",
        readyInMinutes: 25,
        servings: 2
      },
      // Add more mock recipes as needed
    ]

    return NextResponse.json(mockRecipes)
  } catch (error) {
    console.error('Error fetching latest recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
} 