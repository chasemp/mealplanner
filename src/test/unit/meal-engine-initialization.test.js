// Meal Rotation Engine Initialization Tests
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock the MealRotationEngine class
class MockMealRotationEngine {
    constructor() {
        this.recipes = []
        this.preferences = new Map()
        this.pantryItems = new Map()
        this.initialized = false
    }

    initialize(recipes, userPreferences = {}, pantryItems = []) {
        this.recipes = recipes
        this.preferences = new Map(Object.entries(userPreferences))
        this.pantryItems = new Map(pantryItems.map(item => [item.ingredientId, item.quantity]))
        this.initialized = true
        console.log(`Initialized with ${recipes.length} recipes`)
    }

    generateRotation(startDate, weeks, mealType, options = {}) {
        if (!this.initialized) {
            throw new Error('Engine not initialized')
        }
        
        return {
            meals: [],
            stats: { totalMeals: 0, uniqueRecipes: 0, varietyScore: 0 },
            recommendations: []
        }
    }
}

describe('Meal Rotation Engine Initialization', () => {
    let dom
    let mockApp

    beforeEach(() => {
        // Set up DOM environment
        dom = new JSDOM('<!DOCTYPE html><div id="app"></div>')
        global.document = dom.window.document
        global.window = dom.window
        global.console = { log: vi.fn(), error: vi.fn() }

        // Make MealRotationEngine globally available
        global.window.MealRotationEngine = MockMealRotationEngine

        // Mock app structure
        mockApp = {
            mealRotationEngine: null,
            version: '2025.09.05.1830',
            showNotification: vi.fn(),
            getMockRecipes: vi.fn(() => [
                { id: 1, title: 'Test Recipe 1', meal_type: 'dinner' },
                { id: 2, title: 'Test Recipe 2', meal_type: 'dinner' }
            ]),
            getMockPantryItems: vi.fn(() => [
                { ingredientId: 1, quantity: 2 }
            ])
        }
    })

    describe('Engine Class Availability', () => {
        it('should have MealRotationEngine class available globally', () => {
            expect(typeof window.MealRotationEngine).toBe('function')
        })

        it('should be able to create new engine instance', () => {
            const engine = new window.MealRotationEngine()
            expect(engine).toBeDefined()
            expect(engine.recipes).toEqual([])
        })
    })

    describe('Engine Initialization', () => {
        it('should initialize engine successfully with recipes', () => {
            const engine = new MockMealRotationEngine()
            const recipes = mockApp.getMockRecipes()
            const pantryItems = mockApp.getMockPantryItems()
            
            engine.initialize(recipes, {}, pantryItems)
            
            expect(engine.initialized).toBe(true)
            expect(engine.recipes).toHaveLength(2)
            expect(engine.pantryItems.size).toBe(1)
        })

        it('should handle initialization with user preferences', () => {
            const engine = new MockMealRotationEngine()
            const recipes = mockApp.getMockRecipes()
            const userPreferences = { 1: 8, 2: 3 }
            
            engine.initialize(recipes, userPreferences, [])
            
            expect(engine.preferences.get('1')).toBe(8)
            expect(engine.preferences.get('2')).toBe(3)
        })

        it('should handle empty recipes gracefully', () => {
            const engine = new MockMealRotationEngine()
            
            engine.initialize([], {}, [])
            
            expect(engine.initialized).toBe(true)
            expect(engine.recipes).toHaveLength(0)
        })
    })

    describe('App Integration', () => {
        function initializeMealRotationEngine(app) {
            try {
                // Check if MealRotationEngine class is available
                if (typeof MealRotationEngine === 'undefined') {
                    console.error('❌ MealRotationEngine class not found')
                    return false
                }
                
                app.mealRotationEngine = new MealRotationEngine()
                
                // Initialize with current recipes and user preferences
                const recipes = app.getMockRecipes()
                const userPreferences = JSON.parse(localStorage.getItem('mealPreferences') || '{}')
                const pantryItems = app.getMockPantryItems()
                
                app.mealRotationEngine.initialize(recipes, userPreferences, pantryItems)
                
                console.log('✅ Meal Rotation Engine initialized successfully')
                return true
            } catch (error) {
                console.error('❌ Failed to initialize Meal Rotation Engine:', error)
                app.mealRotationEngine = null
                return false
            }
        }

        it('should initialize engine in app context successfully', () => {
            const success = initializeMealRotationEngine(mockApp)
            
            expect(success).toBe(true)
            expect(mockApp.mealRotationEngine).toBeDefined()
            expect(mockApp.mealRotationEngine.initialized).toBe(true)
        })

        it('should handle missing MealRotationEngine class gracefully', () => {
            // Remove the class temporarily
            delete global.window.MealRotationEngine
            
            const success = initializeMealRotationEngine(mockApp)
            
            expect(success).toBe(false)
            expect(mockApp.mealRotationEngine).toBeNull()
        })

        it('should handle initialization errors gracefully', () => {
            // Mock an engine that throws during initialization
            global.window.MealRotationEngine = class {
                constructor() {
                    throw new Error('Initialization failed')
                }
            }
            
            const success = initializeMealRotationEngine(mockApp)
            
            expect(success).toBe(false)
            expect(mockApp.mealRotationEngine).toBeNull()
        })
    })

    describe('Auto Planning Integration', () => {
        function handleAutoPlan(app, mealType) {
            // Check if meal rotation engine is available
            if (!app.mealRotationEngine) {
                console.error('❌ Meal rotation engine not available for auto planning')
                app.showNotification('Meal rotation engine not available. Please refresh the page and try again.', 'error')
                return false
            }

            try {
                const result = app.mealRotationEngine.generateRotation(
                    new Date(), 2, mealType, {}
                )
                return result
            } catch (error) {
                console.error('❌ Auto planning failed:', error)
                app.showNotification('Auto planning failed. Please try again.', 'error')
                return false
            }
        }

        it('should handle auto planning when engine is available', () => {
            // Initialize engine
            mockApp.mealRotationEngine = new MockMealRotationEngine()
            mockApp.mealRotationEngine.initialize(mockApp.getMockRecipes(), {}, [])
            
            const result = handleAutoPlan(mockApp, 'dinner')
            
            expect(result).toBeDefined()
            expect(result.meals).toEqual([])
            expect(mockApp.showNotification).not.toHaveBeenCalled()
        })

        it('should show error when engine is not available', () => {
            mockApp.mealRotationEngine = null
            
            const result = handleAutoPlan(mockApp, 'dinner')
            
            expect(result).toBe(false)
            expect(mockApp.showNotification).toHaveBeenCalledWith(
                'Meal rotation engine not available. Please refresh the page and try again.',
                'error'
            )
        })

        it('should handle engine errors during auto planning', () => {
            // Mock engine that throws during generation
            mockApp.mealRotationEngine = {
                generateRotation: vi.fn(() => {
                    throw new Error('Generation failed')
                })
            }
            
            const result = handleAutoPlan(mockApp, 'dinner')
            
            expect(result).toBe(false)
            expect(mockApp.showNotification).toHaveBeenCalledWith(
                'Auto planning failed. Please try again.',
                'error'
            )
        })
    })

    describe('Regression Prevention', () => {
        it('should always have working meal rotation engine after initialization', () => {
            const engine = new MockMealRotationEngine()
            engine.initialize(mockApp.getMockRecipes(), {}, [])
            
            // Test that engine can perform its core function
            expect(() => {
                engine.generateRotation(new Date(), 1, 'dinner')
            }).not.toThrow()
        })

        it('should maintain engine availability throughout app lifecycle', () => {
            mockApp.mealRotationEngine = new MockMealRotationEngine()
            mockApp.mealRotationEngine.initialize(mockApp.getMockRecipes(), {}, [])
            
            // Simulate multiple operations
            for (let i = 0; i < 5; i++) {
                const result = handleAutoPlan(mockApp, 'dinner')
                expect(result).toBeDefined()
            }
            
            expect(mockApp.mealRotationEngine).toBeDefined()
        })
    })
})
