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

    render() {
        console.log(`🎨 Recipe Manager rendered with ${this.recipes.length} recipes`)
    }
}

class MockIngredientsManager {
    constructor() {
        this.ingredients = []
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

    render() {
        console.log(`🎨 Ingredients Manager rendered with ${this.ingredients.length} ingredients`)
    }
}

// Mock DemoDataManager
class MockDemoDataManager {
    getRecipes() {
        return [
            { id: 1, title: 'Demo Recipe 1' },
            { id: 2, title: 'Demo Recipe 2' }
        ]
    }

    getIngredients() {
        return [
            { id: 1, name: 'Demo Ingredient 1' },
            { id: 2, name: 'Demo Ingredient 2' }
        ]
    }
}

describe('Database Source Switching', () => {
    let dom
    let settingsManager
    let recipeManager
    let ingredientsManager
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

        // Make settings globally available
        window.mealPlannerSettings = settingsManager
        window.DemoDataManager = MockDemoDataManager

        // Mock app with managers
        window.app = {
            recipeManager,
            ingredientsManager,
            refreshAllComponents: vi.fn()
        }
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
