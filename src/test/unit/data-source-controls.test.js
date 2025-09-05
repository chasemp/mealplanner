// Unit tests for data source controls functionality
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock the MealPlannerApp class data source methods
class MockMealPlannerApp {
    constructor() {
        this.version = '2025.09.05.0913'
        this.recipeManager = { render: vi.fn() }
        this.groceryListManager = { render: vi.fn() }
        this.itineraryViews = { breakfast: { render: vi.fn() }, lunch: { render: vi.fn() }, dinner: { render: vi.fn() } }
        this.calendarViews = { breakfast: { render: vi.fn() }, lunch: { render: vi.fn() }, dinner: { render: vi.fn() } }
    }

    handleDataSourceChange(sourceType) {
        console.log(`🗄️ Data source changed to: ${sourceType}`)
        
        switch (sourceType) {
            case 'demo':
                this.loadDemoData()
                break
            case 'new':
                this.createNewDatabase()
                break
            case 'existing':
                this.loadExistingDatabase()
                break
            default:
                console.warn('Unknown data source type:', sourceType)
        }
    }

    loadDemoData() {
        console.log('📊 Loading demo data...')
        this.showNotification('Demo data loaded! This includes sample recipes, ingredients, and meal plans.', 'success')
        this.refreshAllComponents()
    }

    createNewDatabase() {
        console.log('🆕 Creating new database...')
        
        if (this.isInstalled()) {
            this.promptForNewDatabasePath()
        } else {
            this.showInstallPrompt()
        }
    }

    loadExistingDatabase() {
        console.log('📂 Loading existing database...')
        
        // Mock file input creation
        const mockFileInput = {
            type: 'file',
            accept: '.db,.sqlite,.sqlite3',
            style: { display: 'none' },
            addEventListener: vi.fn(),
            click: vi.fn(),
            files: []
        }
        
        return mockFileInput
    }

    handleExportDatabase() {
        console.log('💾 Exporting database...')
        
        const dbData = this.getCurrentDatabaseData()
        this.showNotification('Database exported successfully!', 'success')
        return dbData
    }

    isInstalled() {
        // Mock PWA installation check
        return false // Default to not installed for testing
    }

    promptForNewDatabasePath() {
        console.log('Prompting for new database path...')
        return 'mock-modal'
    }

    showInstallPrompt() {
        console.log('Showing install prompt...')
        return 'install-prompt-modal'
    }

    loadDatabaseFile(file) {
        console.log(`📂 Loading database file: ${file.name}`)
        this.showNotification(`Database "${file.name}" loaded successfully!`, 'success')
        this.refreshAllComponents()
    }

    createDatabaseFile(name, path) {
        console.log(`🆕 Creating database: ${name} at ${path}`)
        this.showNotification(`New database "${name}" created successfully!`, 'success')
        this.refreshAllComponents()
    }

    getCurrentDatabaseData() {
        return JSON.stringify({
            version: this.version,
            exported: new Date().toISOString(),
            recipes: [],
            ingredients: [],
            meal_plans: [],
            pantry_items: []
        })
    }

    refreshAllComponents() {
        console.log('🔄 Refreshing all components...')
        
        if (this.recipeManager) this.recipeManager.render()
        if (this.groceryListManager) this.groceryListManager.render()
        
        Object.values(this.itineraryViews).forEach(view => view.render())
        Object.values(this.calendarViews).forEach(view => view.render())
    }

    showNotification(message, type = 'info') {
        console.log(`Notification (${type}): ${message}`)
        return { message, type }
    }
}

describe('Data Source Controls', () => {
    let dom
    let app
    let mockConsole

    beforeEach(() => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <select id="data-source-select">
                    <option value="demo" selected>Demo Data</option>
                    <option value="new">New Database</option>
                    <option value="existing">Existing Database</option>
                </select>
                <button id="export-db-btn">Export</button>
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

        app = new MockMealPlannerApp()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('Data Source Selection', () => {
        it('should handle demo data selection', () => {
            const refreshSpy = vi.spyOn(app, 'refreshAllComponents')
            const notificationSpy = vi.spyOn(app, 'showNotification')
            
            app.handleDataSourceChange('demo')
            
            expect(console.log).toHaveBeenCalledWith('🗄️ Data source changed to: demo')
            expect(console.log).toHaveBeenCalledWith('📊 Loading demo data...')
            expect(notificationSpy).toHaveBeenCalledWith(
                'Demo data loaded! This includes sample recipes, ingredients, and meal plans.', 
                'success'
            )
            expect(refreshSpy).toHaveBeenCalled()
        })

        it('should handle new database selection when not installed', () => {
            const installPromptSpy = vi.spyOn(app, 'showInstallPrompt')
            vi.spyOn(app, 'isInstalled').mockReturnValue(false)
            
            app.handleDataSourceChange('new')
            
            expect(console.log).toHaveBeenCalledWith('🗄️ Data source changed to: new')
            expect(console.log).toHaveBeenCalledWith('🆕 Creating new database...')
            expect(installPromptSpy).toHaveBeenCalled()
        })

        it('should handle new database selection when installed', () => {
            const promptPathSpy = vi.spyOn(app, 'promptForNewDatabasePath')
            vi.spyOn(app, 'isInstalled').mockReturnValue(true)
            
            app.handleDataSourceChange('new')
            
            expect(console.log).toHaveBeenCalledWith('🗄️ Data source changed to: new')
            expect(console.log).toHaveBeenCalledWith('🆕 Creating new database...')
            expect(promptPathSpy).toHaveBeenCalled()
        })

        it('should handle existing database selection', () => {
            const loadExistingSpy = vi.spyOn(app, 'loadExistingDatabase')
            
            app.handleDataSourceChange('existing')
            
            expect(console.log).toHaveBeenCalledWith('🗄️ Data source changed to: existing')
            expect(console.log).toHaveBeenCalledWith('📂 Loading existing database...')
            expect(loadExistingSpy).toHaveBeenCalled()
        })

        it('should handle unknown source type', () => {
            app.handleDataSourceChange('unknown')
            
            expect(console.log).toHaveBeenCalledWith('🗄️ Data source changed to: unknown')
            expect(console.warn).toHaveBeenCalledWith('Unknown data source type:', 'unknown')
        })
    })

    describe('Demo Data Loading', () => {
        it('should load demo data successfully', () => {
            const refreshSpy = vi.spyOn(app, 'refreshAllComponents')
            const notificationSpy = vi.spyOn(app, 'showNotification')
            
            app.loadDemoData()
            
            expect(console.log).toHaveBeenCalledWith('📊 Loading demo data...')
            expect(notificationSpy).toHaveBeenCalledWith(
                'Demo data loaded! This includes sample recipes, ingredients, and meal plans.', 
                'success'
            )
            expect(refreshSpy).toHaveBeenCalled()
        })

        it('should refresh all components when loading demo data', () => {
            app.loadDemoData()
            
            expect(app.recipeManager.render).toHaveBeenCalled()
            expect(app.groceryListManager.render).toHaveBeenCalled()
            expect(app.itineraryViews.breakfast.render).toHaveBeenCalled()
            expect(app.itineraryViews.lunch.render).toHaveBeenCalled()
            expect(app.itineraryViews.dinner.render).toHaveBeenCalled()
            expect(app.calendarViews.breakfast.render).toHaveBeenCalled()
            expect(app.calendarViews.lunch.render).toHaveBeenCalled()
            expect(app.calendarViews.dinner.render).toHaveBeenCalled()
        })
    })

    describe('Database Export', () => {
        it('should export database successfully', () => {
            const notificationSpy = vi.spyOn(app, 'showNotification')
            
            const result = app.handleExportDatabase()
            
            expect(console.log).toHaveBeenCalledWith('💾 Exporting database...')
            expect(notificationSpy).toHaveBeenCalledWith('Database exported successfully!', 'success')
            expect(result).toBeDefined()
        })

        it('should generate correct database data format', () => {
            const dbData = app.getCurrentDatabaseData()
            const parsed = JSON.parse(dbData)
            
            expect(parsed).toHaveProperty('version', app.version)
            expect(parsed).toHaveProperty('exported')
            expect(parsed).toHaveProperty('recipes')
            expect(parsed).toHaveProperty('ingredients')
            expect(parsed).toHaveProperty('meal_plans')
            expect(parsed).toHaveProperty('pantry_items')
            expect(Array.isArray(parsed.recipes)).toBe(true)
            expect(Array.isArray(parsed.ingredients)).toBe(true)
        })
    })

    describe('PWA Installation Detection', () => {
        it('should detect when app is not installed', () => {
            const isInstalled = app.isInstalled()
            expect(isInstalled).toBe(false)
        })

        it('should show install prompt when creating new database and not installed', () => {
            vi.spyOn(app, 'isInstalled').mockReturnValue(false)
            const installPromptSpy = vi.spyOn(app, 'showInstallPrompt')
            
            app.createNewDatabase()
            
            expect(installPromptSpy).toHaveBeenCalled()
        })

        it('should prompt for database path when creating new database and installed', () => {
            vi.spyOn(app, 'isInstalled').mockReturnValue(true)
            const promptPathSpy = vi.spyOn(app, 'promptForNewDatabasePath')
            
            app.createNewDatabase()
            
            expect(promptPathSpy).toHaveBeenCalled()
        })
    })

    describe('File Operations', () => {
        it('should handle database file loading', () => {
            const mockFile = { name: 'test.db', size: 1024 }
            const refreshSpy = vi.spyOn(app, 'refreshAllComponents')
            const notificationSpy = vi.spyOn(app, 'showNotification')
            
            app.loadDatabaseFile(mockFile)
            
            expect(console.log).toHaveBeenCalledWith('📂 Loading database file: test.db')
            expect(notificationSpy).toHaveBeenCalledWith('Database "test.db" loaded successfully!', 'success')
            expect(refreshSpy).toHaveBeenCalled()
        })

        it('should handle database file creation', () => {
            const refreshSpy = vi.spyOn(app, 'refreshAllComponents')
            const notificationSpy = vi.spyOn(app, 'showNotification')
            
            app.createDatabaseFile('my-meals', '/path/to/save/')
            
            expect(console.log).toHaveBeenCalledWith('🆕 Creating database: my-meals at /path/to/save/')
            expect(notificationSpy).toHaveBeenCalledWith('New database "my-meals" created successfully!', 'success')
            expect(refreshSpy).toHaveBeenCalled()
        })

        it('should create file input for existing database selection', () => {
            const fileInput = app.loadExistingDatabase()
            
            expect(fileInput.type).toBe('file')
            expect(fileInput.accept).toBe('.db,.sqlite,.sqlite3')
            expect(fileInput.style.display).toBe('none')
        })
    })

    describe('Component Refresh', () => {
        it('should refresh all components correctly', () => {
            app.refreshAllComponents()
            
            expect(console.log).toHaveBeenCalledWith('🔄 Refreshing all components...')
            expect(app.recipeManager.render).toHaveBeenCalled()
            expect(app.groceryListManager.render).toHaveBeenCalled()
            
            // Check all itinerary views
            Object.values(app.itineraryViews).forEach(view => {
                expect(view.render).toHaveBeenCalled()
            })
            
            // Check all calendar views
            Object.values(app.calendarViews).forEach(view => {
                expect(view.render).toHaveBeenCalled()
            })
        })

        it('should handle missing components gracefully', () => {
            app.recipeManager = null
            app.groceryListManager = null
            
            expect(() => {
                app.refreshAllComponents()
            }).not.toThrow()
        })
    })

    describe('Notifications', () => {
        it('should show success notifications', () => {
            const result = app.showNotification('Test success message', 'success')
            
            expect(result.message).toBe('Test success message')
            expect(result.type).toBe('success')
            expect(console.log).toHaveBeenCalledWith('Notification (success): Test success message')
        })

        it('should show error notifications', () => {
            const result = app.showNotification('Test error message', 'error')
            
            expect(result.message).toBe('Test error message')
            expect(result.type).toBe('error')
            expect(console.log).toHaveBeenCalledWith('Notification (error): Test error message')
        })

        it('should show info notifications by default', () => {
            const result = app.showNotification('Test info message')
            
            expect(result.message).toBe('Test info message')
            expect(result.type).toBe('info')
            expect(console.log).toHaveBeenCalledWith('Notification (info): Test info message')
        })
    })

    describe('DOM Integration', () => {
        it('should have data source select element', () => {
            const select = document.getElementById('data-source-select')
            expect(select).toBeTruthy()
            expect(select.tagName).toBe('SELECT')
        })

        it('should have correct option values', () => {
            const select = document.getElementById('data-source-select')
            const options = Array.from(select.options).map(opt => opt.value)
            
            expect(options).toContain('demo')
            expect(options).toContain('new')
            expect(options).toContain('existing')
        })

        it('should have demo data selected by default', () => {
            const select = document.getElementById('data-source-select')
            expect(select.value).toBe('demo')
        })

        it('should have export button', () => {
            const exportBtn = document.getElementById('export-db-btn')
            expect(exportBtn).toBeTruthy()
            expect(exportBtn.tagName).toBe('BUTTON')
            expect(exportBtn.textContent).toBe('Export')
        })
    })

    describe('Edge Cases', () => {
        it('should handle empty file selection', () => {
            const fileInput = app.loadExistingDatabase()
            
            // Simulate no file selected
            expect(fileInput.files).toEqual([])
            expect(() => {
                // This would normally be handled by the change event listener
                if (fileInput.files.length === 0) {
                    console.log('No file selected')
                }
            }).not.toThrow()
        })

        it('should handle database creation with empty name', () => {
            const refreshSpy = vi.spyOn(app, 'refreshAllComponents')
            
            app.createDatabaseFile('', '/path/')
            
            expect(console.log).toHaveBeenCalledWith('🆕 Creating database:  at /path/')
            expect(refreshSpy).toHaveBeenCalled()
        })

        it('should handle database creation with empty path', () => {
            const refreshSpy = vi.spyOn(app, 'refreshAllComponents')
            
            app.createDatabaseFile('test-db', '')
            
            expect(console.log).toHaveBeenCalledWith('🆕 Creating database: test-db at ')
            expect(refreshSpy).toHaveBeenCalled()
        })
    })
})
