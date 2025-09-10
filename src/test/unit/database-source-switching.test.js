// Unit tests for database source switching functionality
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock SettingsManager with database source switching
class MockSettingsManager {
    constructor() {
        this.settings = {
            sourceType: 'demo',
            localDbPath: '',
            githubRepo: '',
            githubReadOnly: false,
            showBreakfast: false,
            showLunch: false,
            showDinner: true,
            calendarManagedMode: false,
            calendarNotifications: false
        }
    }

    getCurrentDatabaseSource() {
        return this.settings.sourceType
    }

    shouldLoadDemoData() {
        return this.settings.sourceType === 'demo'
    }

    async reloadAllManagers() {
        console.log('🔄 Reloading all managers due to database source change...')
        
        if (window.app) {
            // Reload recipe manager
            if (window.app.recipeManager) {
                await window.app.recipeManager.loadRecipes()
                window.app.recipeManager.render()
            }
            
            // Reload ingredients manager
            if (window.app.ingredientsManager) {
                await window.app.ingredientsManager.loadIngredients()
                window.app.ingredientsManager.render()
            }
            
            // Reload meal manager
            if (window.app.mealManager) {
                await window.app.mealManager.loadRecipes()
                await window.app.mealManager.loadMeals()
                window.app.mealManager.render()
            }
            
            // Reload grocery list manager
            if (window.app.groceryListManager) {
                await window.app.groceryListManager.loadData()
                window.app.groceryListManager.render()
            }
            
            // Reload schedule manager
            if (window.app.scheduleManager) {
                window.app.scheduleManager.loadScheduledMeals()
            }
            
            // Refresh all meal planning views
            window.app.refreshAllComponents()
        }
    }

    updateDatabaseSourceIndicator() {
        const indicator = document.getElementById('database-source-indicator')
        if (!indicator) return

        const sourceNames = {
            'demo': 'Demo Data',
            'memory': 'In Memory',
            'local': 'Local File',
            'github': 'GitHub Sync'
        }

        const sourceName = sourceNames[this.settings.sourceType] || 'Unknown'
        indicator.textContent = sourceName
        console.log(`📊 Updated database source indicator: ${sourceName}`)
    }
}

// Mock managers that respect database source
class MockRecipeManager {
    constructor() {
        this.recipes = []
        this.filteredRecipes = []
        this.searchTerm = ''
        this.selectedCategory = 'all'
        this.selectedType = 'all'
        this.selectedLabel = 'all'
        this.sortBy = 'name'
        this.showFavoritesOnly = false
    }

    async loadRecipes() {
        const shouldLoadDemo = window.mealPlannerSettings?.shouldLoadDemoData() ?? true
        const currentSource = window.mealPlannerSettings?.getCurrentDatabaseSource() ?? 'demo'
        
        console.log(`📊 Recipe Manager - Database source: ${currentSource}, should load demo: ${shouldLoadDemo}`)
        
        if (shouldLoadDemo && window.DemoDataManager) {
            const demoData = new window.DemoDataManager()
            this.recipes = demoData.getRecipes()
            console.log(`✅ Recipe Manager loaded ${this.recipes.length} recipes from demo data`)
        } else {
            this.recipes = []
            console.log(`✅ Recipe Manager initialized with empty data (source: ${currentSource})`)
        }
    }

    getAllLabels() {
        // Get all available labels from current recipes
        const recipeLabels = new Set()
        this.recipes.forEach(recipe => {
            (recipe.labels || []).forEach(label => recipeLabels.add(label))
        })
        
        // Only show predefined labels if we're in demo mode
        let predefinedLabels = []
        if (window.mealPlannerSettings && window.mealPlannerSettings.getCurrentDatabaseSource() === 'demo') {
            predefinedLabels = [
                'quick', 'healthy', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
                'comfort-food', 'spicy', 'sweet', 'savory', 'protein-rich', 'low-carb',
                'kid-friendly', 'party', 'holiday', 'summer', 'winter', 'easy', 'advanced'
            ]
        }
        
        // Combine and deduplicate
        const allLabels = [...new Set([...recipeLabels, ...predefinedLabels])]
        return allLabels.sort()
    }

    async clearAllData() {
        console.log('🗑️ Clearing all recipes data...')
        this.recipes = []
        this.filteredRecipes = []
        
        // Reset all filter state variables
        this.searchTerm = ''
        this.selectedCategory = 'all'
        this.selectedType = 'all'
        this.selectedLabel = 'all'
        this.sortBy = 'name'
        this.showFavoritesOnly = false
        console.log('✅ All recipes data cleared')
    }

    render() {
        console.log(`🎨 Recipe Manager rendered with ${this.recipes.length} recipes`)
    }
}

class MockIngredientsManager {
    constructor() {
        this.ingredients = []
        this.filteredIngredients = []
        this.currentFilter = { search: '', category: '', label: '' }
    }

    async loadIngredients() {
        const shouldLoadDemo = window.mealPlannerSettings?.shouldLoadDemoData() ?? true
        const currentSource = window.mealPlannerSettings?.getCurrentDatabaseSource() ?? 'demo'
        
        console.log(`📊 Ingredients Manager - Database source: ${currentSource}, should load demo: ${shouldLoadDemo}`)
        
        if (shouldLoadDemo && window.DemoDataManager) {
            const demoData = new window.DemoDataManager()
            this.ingredients = demoData.getIngredients()
            console.log(`✅ Ingredients Manager loaded ${this.ingredients.length} ingredients from demo data`)
        } else {
            this.ingredients = []
            console.log(`✅ Ingredients Manager initialized with empty data (source: ${currentSource})`)
        }
    }

    async clearAllData() {
        console.log('🗑️ Clearing all ingredients data...')
        this.ingredients = []
        this.filteredIngredients = []
        this.currentFilter = { search: '', category: '', label: '' }
        console.log('✅ All ingredients data cleared')
    }

    render() {
        console.log(`🎨 Ingredients Manager rendered with ${this.ingredients.length} ingredients`)
    }
}

// Mock MealPlannerApp with clearAllData functionality
class MockMealPlannerApp {
    constructor() {
        this.selectedRecipes = { breakfast: [], lunch: [], dinner: [] }
        this.favoriteRecipes = new Set()
        this.recipeManager = null
        this.ingredientsManager = null
        this.mealManager = null
        this.scheduleManager = null
        this.groceryListManager = null
        this.mealRotationEngine = null
    }

    async clearAllData() {
        console.log('🗑️ Clearing ALL application data for in-memory mode...')
        
        // Clear all manager data
        if (this.ingredientsManager) {
            await this.ingredientsManager.clearAllData()
        }
        if (this.recipeManager) {
            await this.recipeManager.clearAllData()
        }
        if (this.mealManager) {
            await this.mealManager.clearAllData()
        }
        if (this.scheduleManager) {
            await this.scheduleManager.clearAllScheduledMeals()
        }
        if (this.groceryListManager) {
            await this.groceryListManager.clearAllData()
        }
        if (this.mealRotationEngine) {
            this.mealRotationEngine.clearAllData()
        }
        
        // Clear local app state
        this.selectedRecipes = { breakfast: [], lunch: [], dinner: [] }
        this.favoriteRecipes = new Set()
        
        console.log('✅ All application data cleared successfully')
    }

    renderRecipeSelection(mealType) {
        // Mock the dinner tab recipe selection logic
        const shouldLoadDemo = window.mealPlannerSettings?.shouldLoadDemoData() ?? true
        const currentSource = window.mealPlannerSettings?.getCurrentDatabaseSource() ?? 'demo'
        
        console.log(`🍽️ Dinner tab - Database source: ${currentSource}, should load demo: ${shouldLoadDemo}`)
        
        let recipes = []
        if (shouldLoadDemo && window.DemoDataManager) {
            const demoData = new window.DemoDataManager()
            recipes = demoData.getRecipes().filter(recipe => 
                recipe.meal_type === mealType || recipe.meal_type === 'dinner'
            )
            console.log(`✅ Dinner tab loaded ${recipes.length} recipes from demo data`)
        } else {
            recipes = []
            console.log(`✅ Dinner tab initialized with empty recipes (source: ${currentSource})`)
        }
        
        return recipes
    }

    refreshAllComponents() {
        console.log('🔄 Refreshing all components...')
    }
}

// Mock DemoDataManager
class MockDemoDataManager {
    getRecipes() {
        return [
            { id: 1, title: 'Demo Recipe 1', meal_type: 'dinner' },
            { id: 2, title: 'Demo Recipe 2', meal_type: 'dinner' }
        ]
    }

    getIngredients() {
        return [
            { id: 1, name: 'Demo Ingredient 1' },
            { id: 2, name: 'Demo Ingredient 2' }
        ]
    }
}

// Mock additional managers
class MockMealManager {
    constructor() {
        this.meals = []
        this.recipes = []
        this.searchTerm = ''
        this.selectedMealType = 'all'
        this.selectedLabel = 'all'
        this.sortBy = 'name'
    }

    async loadRecipes() {
        const shouldLoadDemo = window.mealPlannerSettings?.shouldLoadDemoData() ?? true
        const currentSource = window.mealPlannerSettings?.getCurrentDatabaseSource() ?? 'demo'
        
        if (shouldLoadDemo && window.DemoDataManager) {
            const demoData = new window.DemoDataManager()
            this.recipes = demoData.getRecipes()
        } else {
            this.recipes = []
        }
    }

    async loadMeals() {
        const shouldLoadDemo = window.mealPlannerSettings?.shouldLoadDemoData() ?? true
        const currentSource = window.mealPlannerSettings?.getCurrentDatabaseSource() ?? 'demo'
        
        if (shouldLoadDemo && window.DemoDataManager) {
            const demoData = new window.DemoDataManager()
            this.meals = demoData.getMeals ? demoData.getMeals() : []
        } else {
            this.meals = []
        }
    }

    getAllLabels() {
        // Get labels from both meals and recipes to create a unified label system
        const labels = new Set()
        
        // Add labels from meals
        this.meals.forEach(meal => {
            (meal.labels || []).forEach(label => labels.add(label))
            (meal.tags || []).forEach(tag => labels.add(tag))
        })
        
        // Add labels from recipes to create shared label system
        this.recipes.forEach(recipe => {
            (recipe.labels || []).forEach(label => labels.add(label))
            (recipe.tags || []).forEach(tag => labels.add(tag))
        })
        
        // Only show predefined labels if we're in demo mode (consistent with RecipeManager)
        if (window.mealPlannerSettings && window.mealPlannerSettings.getCurrentDatabaseSource() === 'demo') {
            const predefinedLabels = [
                'quick', 'healthy', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
                'comfort-food', 'spicy', 'sweet', 'savory', 'protein-rich', 'low-carb',
                'kid-friendly', 'party', 'holiday', 'summer', 'winter', 'easy', 'advanced'
            ]
            predefinedLabels.forEach(label => labels.add(label))
        }
        
        return Array.from(labels).sort()
    }

    render() {
        console.log(`🎨 Meal Manager rendered`)
    }

    async clearAllData() {
        console.log('🗑️ Clearing all meals data...')
        this.meals = []
        this.recipes = []
        this.searchTerm = ''
        this.selectedMealType = 'all'
        this.selectedLabel = 'all'
        this.sortBy = 'name'
    }
}

class MockScheduleManager {
    constructor() {
        this.scheduledMeals = []
    }

    loadScheduledMeals() {
        // Mock scheduled meals loading
        this.scheduledMeals = []
    }

    async clearAllScheduledMeals() {
        console.log('🗑️ Clearing all scheduled meals...')
        this.scheduledMeals = []
    }
}

class MockGroceryListManager {
    constructor() {
        this.groceryList = []
    }

    async loadData() {
        // Mock grocery list data loading
        this.groceryList = []
    }

    render() {
        console.log(`🎨 Grocery List Manager rendered`)
    }

    async clearAllData() {
        console.log('🗑️ Clearing all grocery list data...')
        this.groceryList = []
    }
}

class MockMealRotationEngine {
    clearAllData() {
        console.log('🗑️ Clearing all meal rotation engine data...')
    }
}

describe('Database Source Switching', () => {
    let dom
    let settingsManager
    let recipeManager
    let ingredientsManager
    let mealPlannerApp
    let mockConsole

    beforeEach(() => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <span id="database-source-indicator">Demo Data</span>
                <select id="source-type-select">
                    <option value="demo" selected>Demo Data</option>
                    <option value="memory">In Memory (Clean Slate)</option>
                    <option value="local">Local File</option>
                    <option value="github">GitHub Repo</option>
                </select>
            </body>
            </html>
        `)
        
        global.document = dom.window.document
        global.window = dom.window

        // Mock console methods
        mockConsole = {
            log: vi.fn(),
            warn: vi.fn(),
            error: vi.fn()
        }
        global.console = mockConsole

        // Set up mocks
        settingsManager = new MockSettingsManager()
        recipeManager = new MockRecipeManager()
        ingredientsManager = new MockIngredientsManager()
        mealPlannerApp = new MockMealPlannerApp()

        // Connect managers to app
        mealPlannerApp.recipeManager = recipeManager
        mealPlannerApp.ingredientsManager = ingredientsManager
        mealPlannerApp.mealManager = new MockMealManager()
        mealPlannerApp.scheduleManager = new MockScheduleManager()
        mealPlannerApp.groceryListManager = new MockGroceryListManager()
        mealPlannerApp.mealRotationEngine = new MockMealRotationEngine()

        // Make settings globally available
        window.mealPlannerSettings = settingsManager
        window.DemoDataManager = MockDemoDataManager

        // Mock app with managers
        window.app = mealPlannerApp
    })

    afterEach(() => {
        vi.clearAllMocks()
        delete window.mealPlannerSettings
        delete window.DemoDataManager
        delete window.app
    })

    describe('Database Source Detection', () => {
        it('should return correct database source', () => {
            expect(settingsManager.getCurrentDatabaseSource()).toBe('demo')
            
            settingsManager.settings.sourceType = 'memory'
            expect(settingsManager.getCurrentDatabaseSource()).toBe('memory')
        })

        it('should determine if demo data should be loaded', () => {
            expect(settingsManager.shouldLoadDemoData()).toBe(true)
            
            settingsManager.settings.sourceType = 'memory'
            expect(settingsManager.shouldLoadDemoData()).toBe(false)
            
            settingsManager.settings.sourceType = 'local'
            expect(settingsManager.shouldLoadDemoData()).toBe(false)
        })
    })

    describe('Manager Data Loading Behavior', () => {
        it('should load demo data when source is demo', async () => {
            settingsManager.settings.sourceType = 'demo'
            
            await recipeManager.loadRecipes()
            await ingredientsManager.loadIngredients()
            
            expect(recipeManager.recipes).toHaveLength(2)
            expect(ingredientsManager.ingredients).toHaveLength(2)
            expect(console.log).toHaveBeenCalledWith('📊 Recipe Manager - Database source: demo, should load demo: true')
            expect(console.log).toHaveBeenCalledWith('✅ Recipe Manager loaded 2 recipes from demo data')
        })

        it('should not load demo data when source is memory', async () => {
            settingsManager.settings.sourceType = 'memory'
            
            await recipeManager.loadRecipes()
            await ingredientsManager.loadIngredients()
            
            expect(recipeManager.recipes).toHaveLength(0)
            expect(ingredientsManager.ingredients).toHaveLength(0)
            expect(console.log).toHaveBeenCalledWith('📊 Recipe Manager - Database source: memory, should load demo: false')
            expect(console.log).toHaveBeenCalledWith('✅ Recipe Manager initialized with empty data (source: memory)')
        })

        it('should not load demo data when source is local', async () => {
            settingsManager.settings.sourceType = 'local'
            
            await recipeManager.loadRecipes()
            await ingredientsManager.loadIngredients()
            
            expect(recipeManager.recipes).toHaveLength(0)
            expect(ingredientsManager.ingredients).toHaveLength(0)
            expect(console.log).toHaveBeenCalledWith('📊 Recipe Manager - Database source: local, should load demo: false')
        })
    })

    describe('Database Source Indicator', () => {
        it('should update indicator text for demo source', () => {
            settingsManager.settings.sourceType = 'demo'
            settingsManager.updateDatabaseSourceIndicator()
            
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator.textContent).toBe('Demo Data')
            expect(console.log).toHaveBeenCalledWith('📊 Updated database source indicator: Demo Data')
        })

        it('should update indicator text for memory source', () => {
            settingsManager.settings.sourceType = 'memory'
            settingsManager.updateDatabaseSourceIndicator()
            
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator.textContent).toBe('In Memory')
            expect(console.log).toHaveBeenCalledWith('📊 Updated database source indicator: In Memory')
        })

        it('should handle unknown source type', () => {
            settingsManager.settings.sourceType = 'unknown'
            settingsManager.updateDatabaseSourceIndicator()
            
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator.textContent).toBe('Unknown')
        })

        it('should handle missing indicator element gracefully', () => {
            document.getElementById('database-source-indicator').remove()
            
            expect(() => {
                settingsManager.updateDatabaseSourceIndicator()
            }).not.toThrow()
        })
    })

    describe('Manager Reload System', () => {
        it('should reload all managers when database source changes', async () => {
            const recipeLoadSpy = vi.spyOn(recipeManager, 'loadRecipes')
            const recipeRenderSpy = vi.spyOn(recipeManager, 'render')
            const ingredientsLoadSpy = vi.spyOn(ingredientsManager, 'loadIngredients')
            const ingredientsRenderSpy = vi.spyOn(ingredientsManager, 'render')
            const refreshSpy = vi.spyOn(window.app, 'refreshAllComponents')
            
            await settingsManager.reloadAllManagers()
            
            expect(recipeLoadSpy).toHaveBeenCalled()
            expect(recipeRenderSpy).toHaveBeenCalled()
            expect(ingredientsLoadSpy).toHaveBeenCalled()
            expect(ingredientsRenderSpy).toHaveBeenCalled()
            expect(refreshSpy).toHaveBeenCalled()
            expect(console.log).toHaveBeenCalledWith('🔄 Reloading all managers due to database source change...')
        })

        it('should handle missing managers gracefully', async () => {
            window.app.recipeManager = null
            window.app.ingredientsManager = null
            
            expect(async () => {
                await settingsManager.reloadAllManagers()
            }).not.toThrow()
        })

        it('should handle missing app gracefully', async () => {
            window.app = null
            
            expect(async () => {
                await settingsManager.reloadAllManagers()
            }).not.toThrow()
        })
    })

    describe('Complete Database Source Switching Workflow', () => {
        it('should switch from demo to memory and reload correctly', async () => {
            // Start with demo data
            settingsManager.settings.sourceType = 'demo'
            await recipeManager.loadRecipes()
            expect(recipeManager.recipes).toHaveLength(2)
            
            // Switch to memory
            settingsManager.settings.sourceType = 'memory'
            settingsManager.updateDatabaseSourceIndicator()
            await settingsManager.reloadAllManagers()
            
            // Verify empty state
            expect(recipeManager.recipes).toHaveLength(0)
            expect(ingredientsManager.ingredients).toHaveLength(0)
            
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator.textContent).toBe('In Memory')
        })

        it('should switch from memory to demo and reload correctly', async () => {
            // Start with memory (empty)
            settingsManager.settings.sourceType = 'memory'
            await recipeManager.loadRecipes()
            expect(recipeManager.recipes).toHaveLength(0)
            
            // Switch to demo
            settingsManager.settings.sourceType = 'demo'
            settingsManager.updateDatabaseSourceIndicator()
            await settingsManager.reloadAllManagers()
            
            // Verify demo data loaded
            expect(recipeManager.recipes).toHaveLength(2)
            expect(ingredientsManager.ingredients).toHaveLength(2)
            
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator.textContent).toBe('Demo Data')
        })
    })

    describe('Fallback Behavior', () => {
        it('should default to demo behavior when settings not available', async () => {
            window.mealPlannerSettings = null
            
            await recipeManager.loadRecipes()
            
            expect(recipeManager.recipes).toHaveLength(2)
            expect(console.log).toHaveBeenCalledWith('📊 Recipe Manager - Database source: demo, should load demo: true')
        })

        it('should handle missing DemoDataManager gracefully', async () => {
            window.DemoDataManager = null
            settingsManager.settings.sourceType = 'demo'
            
            await recipeManager.loadRecipes()
            
            expect(recipeManager.recipes).toHaveLength(0)
            expect(console.log).toHaveBeenCalledWith('✅ Recipe Manager initialized with empty data (source: demo)')
        })
    })

    describe('clearAllData Functionality', () => {
        it('should call clearAllData on all managers when switching to memory', async () => {
            // Set up spies
            const recipeClearSpy = vi.spyOn(recipeManager, 'clearAllData')
            const ingredientsClearSpy = vi.spyOn(ingredientsManager, 'clearAllData')
            const mealClearSpy = vi.spyOn(mealPlannerApp.mealManager, 'clearAllData')
            const scheduleClearSpy = vi.spyOn(mealPlannerApp.scheduleManager, 'clearAllScheduledMeals')
            const groceryClearSpy = vi.spyOn(mealPlannerApp.groceryListManager, 'clearAllData')
            const rotationClearSpy = vi.spyOn(mealPlannerApp.mealRotationEngine, 'clearAllData')
            
            // Switch to memory and trigger clearAllData
            settingsManager.settings.sourceType = 'memory'
            await mealPlannerApp.clearAllData()
            
            // Verify all clearAllData methods were called
            expect(recipeClearSpy).toHaveBeenCalled()
            expect(ingredientsClearSpy).toHaveBeenCalled()
            expect(mealClearSpy).toHaveBeenCalled()
            expect(scheduleClearSpy).toHaveBeenCalled()
            expect(groceryClearSpy).toHaveBeenCalled()
            expect(rotationClearSpy).toHaveBeenCalled()
            
            // Verify console logs
            expect(console.log).toHaveBeenCalledWith('🗑️ Clearing ALL application data for in-memory mode...')
            expect(console.log).toHaveBeenCalledWith('✅ All application data cleared successfully')
        })

        it('should clear app state when switching to memory', async () => {
            // Set up initial state
            mealPlannerApp.selectedRecipes.dinner = [1, 2, 3]
            mealPlannerApp.favoriteRecipes.add(1)
            mealPlannerApp.favoriteRecipes.add(2)
            
            expect(mealPlannerApp.selectedRecipes.dinner).toHaveLength(3)
            expect(mealPlannerApp.favoriteRecipes.size).toBe(2)
            
            // Clear all data
            await mealPlannerApp.clearAllData()
            
            // Verify state is cleared
            expect(mealPlannerApp.selectedRecipes.dinner).toHaveLength(0)
            expect(mealPlannerApp.favoriteRecipes.size).toBe(0)
        })

        it('should clear individual manager data correctly', async () => {
            // Load demo data first
            await recipeManager.loadRecipes()
            await ingredientsManager.loadIngredients()
            
            expect(recipeManager.recipes).toHaveLength(2)
            expect(ingredientsManager.ingredients).toHaveLength(2)
            
            // Clear data
            await recipeManager.clearAllData()
            await ingredientsManager.clearAllData()
            
            // Verify data is cleared
            expect(recipeManager.recipes).toHaveLength(0)
            expect(recipeManager.filteredRecipes).toHaveLength(0)
            expect(recipeManager.searchTerm).toBe('')
            expect(recipeManager.selectedCategory).toBe('all')
            expect(recipeManager.selectedType).toBe('all')
            expect(recipeManager.selectedLabel).toBe('all')
            expect(recipeManager.sortBy).toBe('name')
            expect(recipeManager.showFavoritesOnly).toBe(false)
            
            expect(ingredientsManager.ingredients).toHaveLength(0)
            expect(ingredientsManager.filteredIngredients).toHaveLength(0)
        })
    })

    describe('Dinner Tab Recipe Selection Consistency', () => {
        it('should show recipes when database source is demo', () => {
            settingsManager.settings.sourceType = 'demo'
            
            const recipes = mealPlannerApp.renderRecipeSelection('dinner')
            
            expect(recipes).toHaveLength(2)
            expect(console.log).toHaveBeenCalledWith('🍽️ Dinner tab - Database source: demo, should load demo: true')
            expect(console.log).toHaveBeenCalledWith('✅ Dinner tab loaded 2 recipes from demo data')
        })

        it('should show empty recipes when database source is memory', () => {
            settingsManager.settings.sourceType = 'memory'
            
            const recipes = mealPlannerApp.renderRecipeSelection('dinner')
            
            expect(recipes).toHaveLength(0)
            expect(console.log).toHaveBeenCalledWith('🍽️ Dinner tab - Database source: memory, should load demo: false')
            expect(console.log).toHaveBeenCalledWith('✅ Dinner tab initialized with empty recipes (source: memory)')
        })

        it('should be consistent with recipe manager data loading', async () => {
            // Test demo mode consistency
            settingsManager.settings.sourceType = 'demo'
            
            await recipeManager.loadRecipes()
            const dinnerRecipes = mealPlannerApp.renderRecipeSelection('dinner')
            
            expect(recipeManager.recipes).toHaveLength(2)
            expect(dinnerRecipes).toHaveLength(2)
            
            // Test memory mode consistency
            settingsManager.settings.sourceType = 'memory'
            
            await recipeManager.loadRecipes()
            const emptyDinnerRecipes = mealPlannerApp.renderRecipeSelection('dinner')
            
            expect(recipeManager.recipes).toHaveLength(0)
            expect(emptyDinnerRecipes).toHaveLength(0)
        })
    })

    describe('Complete In-Memory Database Source Workflow', () => {
        it('should perform complete demo to memory transition', async () => {
            // Start with demo data
            settingsManager.settings.sourceType = 'demo'
            await recipeManager.loadRecipes()
            await ingredientsManager.loadIngredients()
            
            expect(recipeManager.recipes).toHaveLength(2)
            expect(ingredientsManager.ingredients).toHaveLength(2)
            
            // Switch to memory and clear all data
            settingsManager.settings.sourceType = 'memory'
            settingsManager.updateDatabaseSourceIndicator()
            await mealPlannerApp.clearAllData()
            await settingsManager.reloadAllManagers()
            
            // Verify complete clean state
            expect(recipeManager.recipes).toHaveLength(0)
            expect(ingredientsManager.ingredients).toHaveLength(0)
            expect(mealPlannerApp.selectedRecipes.dinner).toHaveLength(0)
            expect(mealPlannerApp.favoriteRecipes.size).toBe(0)
            
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator.textContent).toBe('In Memory')
            
            // Verify dinner tab shows empty state
            const dinnerRecipes = mealPlannerApp.renderRecipeSelection('dinner')
            expect(dinnerRecipes).toHaveLength(0)
        })

        it('should perform complete memory to demo transition', async () => {
            // Start with memory (empty)
            settingsManager.settings.sourceType = 'memory'
            await recipeManager.loadRecipes()
            await ingredientsManager.loadIngredients()
            
            expect(recipeManager.recipes).toHaveLength(0)
            expect(ingredientsManager.ingredients).toHaveLength(0)
            
            // Switch to demo
            settingsManager.settings.sourceType = 'demo'
            settingsManager.updateDatabaseSourceIndicator()
            await settingsManager.reloadAllManagers()
            
            // Verify demo data loaded
            expect(recipeManager.recipes).toHaveLength(2)
            expect(ingredientsManager.ingredients).toHaveLength(2)
            
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator.textContent).toBe('Demo Data')
            
            // Verify dinner tab shows demo recipes
            const dinnerRecipes = mealPlannerApp.renderRecipeSelection('dinner')
            expect(dinnerRecipes).toHaveLength(2)
        })
    })

    describe('Label System Data Source Consistency', () => {
        it('should clear label filter states when switching data sources', async () => {
            // Start with demo data and set label filters
            settingsManager.settings.sourceType = 'demo'
            await recipeManager.loadRecipes()
            await mealPlannerApp.mealManager.loadRecipes()
            await mealPlannerApp.mealManager.loadMeals()
            
            // Set label filters to non-default values
            recipeManager.selectedLabel = 'vegetarian'
            mealPlannerApp.mealManager.selectedLabel = 'healthy'
            
            // Verify filters are set
            expect(recipeManager.selectedLabel).toBe('vegetarian')
            expect(mealPlannerApp.mealManager.selectedLabel).toBe('healthy')
            
            // Switch to memory and clear all data
            settingsManager.settings.sourceType = 'memory'
            await mealPlannerApp.clearAllData()
            
            // Verify label filters are reset to default
            expect(recipeManager.selectedLabel).toBe('all')
            expect(mealPlannerApp.mealManager.selectedLabel).toBe('all')
        })

        it('should show predefined labels only in demo mode', () => {
            // Test RecipeManager in demo mode
            settingsManager.settings.sourceType = 'demo'
            const demoLabels = recipeManager.getAllLabels()
            expect(demoLabels).toContain('vegetarian')
            expect(demoLabels).toContain('healthy')
            expect(demoLabels).toContain('quick')
            
            // Test MealManager in demo mode
            const demoMealLabels = mealPlannerApp.mealManager.getAllLabels()
            expect(demoMealLabels).toContain('vegetarian')
            expect(demoMealLabels).toContain('healthy')
            expect(demoMealLabels).toContain('quick')
            
            // Switch to memory mode
            settingsManager.settings.sourceType = 'memory'
            
            // Clear data to ensure empty state
            recipeManager.recipes = []
            mealPlannerApp.mealManager.meals = []
            mealPlannerApp.mealManager.recipes = []
            
            // Test that predefined labels are not shown in memory mode
            const memoryLabels = recipeManager.getAllLabels()
            const memoryMealLabels = mealPlannerApp.mealManager.getAllLabels()
            
            // Should not contain predefined labels when no data exists
            expect(memoryLabels).not.toContain('vegetarian')
            expect(memoryLabels).not.toContain('healthy')
            expect(memoryMealLabels).not.toContain('vegetarian')
            expect(memoryMealLabels).not.toContain('healthy')
        })

        it('should maintain label consistency between recipe and meal managers', () => {
            // Set demo mode
            settingsManager.settings.sourceType = 'demo'
            
            // Both managers should have access to the same predefined labels
            const recipeLabels = recipeManager.getAllLabels()
            const mealLabels = mealPlannerApp.mealManager.getAllLabels()
            
            // Check that both contain the same predefined labels
            const commonPredefinedLabels = ['vegetarian', 'healthy', 'quick', 'comfort-food']
            commonPredefinedLabels.forEach(label => {
                expect(recipeLabels).toContain(label)
                expect(mealLabels).toContain(label)
            })
        })
    })

    describe('Integration with DOM Elements', () => {
        it('should have correct select options', () => {
            const select = document.getElementById('source-type-select')
            const options = Array.from(select.options).map(opt => opt.value)
            
            expect(options).toContain('demo')
            expect(options).toContain('memory')
            expect(options).toContain('local')
            expect(options).toContain('github')
        })

        it('should have database source indicator element', () => {
            const indicator = document.getElementById('database-source-indicator')
            expect(indicator).toBeTruthy()
            expect(indicator.textContent).toBe('Demo Data')
        })
    })
})
