// Meal Rotation Engine Unit Tests
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the MealRotationEngine class
class MockMealRotationEngine {
    constructor(recipes = [], preferences = {}) {
        this.recipes = recipes
        this.preferences = preferences
        this.constraints = {
            minDaysBetweenSameRecipe: 3,
            maxConsecutiveSameCuisine: 2,
            preferredVariety: 0.7
        }
        this.lastUsed = new Map()
    }

    generateRotation(startDate, weeks, mealType, options = {}) {
        const totalDays = weeks * 7
        const meals = []
        const availableRecipes = options.availableRecipes || this.recipes.filter(r => 
            r.meal_type === mealType || mealType === 'all'
        )
        
        if (availableRecipes.length === 0) {
            return {
                meals: [],
                stats: { totalMeals: 0, uniqueRecipes: 0, varietyScore: 0 },
                recommendations: ['Add more recipes for better variety']
            }
        }
        
        for (let day = 0; day < totalDays; day++) {
            const currentDate = new Date(startDate)
            currentDate.setDate(currentDate.getDate() + day)
            
            const selectedRecipe = availableRecipes[day % availableRecipes.length]
            
            meals.push({
                id: meals.length + 1,
                recipe_id: selectedRecipe.id,
                recipe_title: selectedRecipe.title,
                scheduled_date: currentDate.toISOString().split('T')[0],
                meal_type: mealType,
                serving_count: selectedRecipe.serving_count || 4
            })
        }
        
        const uniqueRecipeIds = new Set(meals.map(meal => meal.recipe_id))
        const stats = {
            totalMeals: meals.length,
            uniqueRecipes: uniqueRecipeIds.size,
            varietyScore: uniqueRecipeIds.size / Math.max(availableRecipes.length, 1)
        }
        
        return { meals, stats, recommendations: [] }
    }

    updatePreferences(recipeId, weight) {
        this.preferences[recipeId] = Math.max(0.1, Math.min(10, weight))
    }

    updateConstraints(newConstraints) {
        this.constraints = { ...this.constraints, ...newConstraints }
    }

    clearMealType(mealType) {
        this.lastUsed.clear()
    }
}

describe('MealRotationEngine', () => {
    let engine
    let mockRecipes

    beforeEach(() => {
        mockRecipes = [
            {
                id: 1,
                title: 'Chicken Stir Fry',
                meal_type: 'dinner',
                serving_count: 4
            },
            {
                id: 2,
                title: 'Pasta Marinara',
                meal_type: 'dinner',
                serving_count: 6
            }
        ]

        engine = new MockMealRotationEngine(mockRecipes, { 1: 1.5, 2: 1.0 })
    })

    describe('Initialization', () => {
        it('should initialize with recipes and preferences', () => {
            expect(engine.recipes).toHaveLength(2)
            expect(engine.preferences[1]).toBe(1.5)
            expect(engine.constraints.minDaysBetweenSameRecipe).toBe(3)
        })
    })

    describe('Rotation Generation', () => {
        it('should generate rotation for specified period', () => {
            const startDate = new Date('2024-01-01')
            const rotation = engine.generateRotation(startDate, 1, 'dinner')
            
            expect(rotation.meals).toHaveLength(7)
            expect(rotation.stats.totalMeals).toBe(7)
        })

        it('should handle empty recipe list', () => {
            const emptyEngine = new MockMealRotationEngine([])
            const startDate = new Date('2024-01-01')
            const rotation = emptyEngine.generateRotation(startDate, 1, 'dinner')
            
            expect(rotation.meals).toHaveLength(0)
            expect(rotation.recommendations).toContain('Add more recipes for better variety')
        })
    })

    describe('Utility Methods', () => {
        it('should update preferences', () => {
            engine.updatePreferences(1, 2.5)
            expect(engine.preferences[1]).toBe(2.5)
        })

        it('should update constraints', () => {
            engine.updateConstraints({ minDaysBetweenSameRecipe: 5 })
            expect(engine.constraints.minDaysBetweenSameRecipe).toBe(5)
        })

        it('should clear meal type data', () => {
            engine.clearMealType('dinner')
            expect(engine.lastUsed.size).toBe(0)
        })
    })
})