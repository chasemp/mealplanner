// Main application entry point
import { initializeStorage, sqliteStorage } from './database/storage.js'
import { IngredientsManager } from './components/ingredients-manager.js'
import { CalendarView } from './components/calendar-view.js'
import { SimpleCalendar } from './components/simple-calendar.js'

class MealPlannerApp {
    constructor() {
        this.isInitialized = false
        this.currentTab = 'recipes'
        this.ingredientsManager = null
        this.calendarViews = {
            breakfast: null,
            lunch: null,
            dinner: null
        }
        this.simpleCalendars = {
            breakfast: null,
            lunch: null,
            dinner: null
        }
    }

    async init() {
        try {
            console.log('Initializing MealPlanner app...')
            
            // Show loading state
            this.showLoading(true)
            
            // Register service worker
            await this.registerServiceWorker()
            
            // Initialize SQLite storage
            const storageInitialized = await initializeStorage()
            if (!storageInitialized) {
                throw new Error('Failed to initialize database storage')
            }
            
            // Initialize components
            this.ingredientsManager = new IngredientsManager(sqliteStorage.getDatabase())
            
            // Set up UI event listeners
            this.setupEventListeners()
            
            // Load initial data
            await this.loadInitialData()
            
            // Hide loading state and show app
            this.showLoading(false)
            this.showApp()
            
            this.isInitialized = true
            console.log('MealPlanner app initialized successfully')
            
            // Add test identifier for E2E tests
            document.body.setAttribute('data-testid', 'app-initialized')
            
        } catch (error) {
            console.error('Failed to initialize app:', error)
            this.showError('Failed to initialize the application. Please refresh the page.')
        }
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/MealPlanner/sw.js')
                console.log('Service Worker registered:', registration)
                
                // Listen for service worker messages
                navigator.serviceWorker.addEventListener('message', (event) => {
                    this.handleServiceWorkerMessage(event.data)
                })
                
                // Handle service worker updates
                registration.addEventListener('updatefound', () => {
                    console.log('Service Worker update found')
                    const newWorker = registration.installing
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker is available
                            this.showUpdateAvailable()
                        }
                    })
                })
                
            } catch (error) {
                console.error('Service Worker registration failed:', error)
            }
        }
    }

    handleServiceWorkerMessage(data) {
        const { type } = data
        
        switch (type) {
            case 'SYNC_COMPLETE':
                console.log('Sync completed:', data.success ? 'success' : 'failed')
                if (data.success) {
                    this.showNotification('Data synced successfully', 'success')
                    // Reload data if needed
                    this.loadInitialData()
                } else {
                    this.showNotification('Sync failed: ' + data.error, 'error')
                }
                break
                
            default:
                console.log('Unknown service worker message:', type)
        }
    }

    showUpdateAvailable() {
        const updateBanner = document.createElement('div')
        updateBanner.className = 'fixed top-0 left-0 right-0 bg-blue-500 text-white p-2 text-center z-50'
        updateBanner.innerHTML = `
            <span>A new version is available!</span>
            <button id="update-app" class="ml-4 bg-blue-700 px-3 py-1 rounded text-sm">Update</button>
            <button id="dismiss-update" class="ml-2 text-blue-200">×</button>
        `
        
        document.body.insertBefore(updateBanner, document.body.firstChild)
        
        document.getElementById('update-app').addEventListener('click', () => {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })
            }
            window.location.reload()
        })
        
        document.getElementById('dismiss-update').addEventListener('click', () => {
            updateBanner.remove()
        })
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab
                this.switchTab(tabName)
            })
        })
        
        // Database import/export/new
        document.getElementById('new-db-btn').addEventListener('click', () => {
            this.showNewDatabaseModal()
        })
        
        document.getElementById('export-db-btn').addEventListener('click', () => {
            this.exportDatabase()
        })
        
        document.getElementById('import-db-btn').addEventListener('click', () => {
            document.getElementById('db-file-input').click()
        })
        
        document.getElementById('db-file-input').addEventListener('change', (e) => {
            const file = e.target.files[0]
            if (file) {
                this.importDatabase(file)
            }
        })
        
        // Add recipe button
        document.getElementById('add-recipe-btn').addEventListener('click', () => {
            this.showAddRecipeModal()
        })
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault()
                        this.forceSaveDatabase()
                        break
                    case 'e':
                        e.preventDefault()
                        this.exportDatabase()
                        break
                }
            }
        })
        
        // Handle app visibility changes (for data refresh)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isInitialized) {
                // App became visible, check for data updates
                this.checkForDataUpdates()
            }
        })
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active')
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active')
            }
        })
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden')
        })
        
        const targetTab = document.getElementById(`${tabName}-tab`)
        if (targetTab) {
            targetTab.classList.remove('hidden')
        }
        
        this.currentTab = tabName
        
        // Load tab-specific data
        this.loadTabData(tabName)
    }

    async loadTabData(tabName) {
        switch (tabName) {
            case 'recipes':
                await this.loadRecipes()
                break
            case 'ingredients':
                await this.loadIngredients()
                break
            case 'breakfast':
            case 'lunch':
            case 'dinner':
                await this.loadMealPlan(tabName)
                break
            case 'grocery':
                await this.loadGroceryList()
                break
        }
    }

    async loadInitialData() {
        // Load data for the current tab
        await this.loadTabData(this.currentTab)
        
        // Load database stats
        this.updateDatabaseStats()
    }

    async loadRecipes() {
        try {
            const db = sqliteStorage.getDatabase()
            const result = db.exec(`
                SELECT r.*, COUNT(ri.id) as ingredient_count
                FROM recipes r
                LEFT JOIN recipe_items ri ON r.id = ri.recipe_id
                GROUP BY r.id
                ORDER BY r.updated_at DESC
            `)
            
            const recipesList = document.getElementById('recipes-list')
            
            if (!result.length || !result[0].values.length) {
                recipesList.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-gray-500 text-lg">No recipes found.</p>
                        <p class="text-gray-400 mt-2">Add your first recipe to get started!</p>
                    </div>
                `
                return
            }
            
            const recipes = result[0].values.map(row => {
                const columns = result[0].columns
                const recipe = {}
                columns.forEach((col, index) => {
                    recipe[col] = row[index]
                })
                return recipe
            })
            
            recipesList.innerHTML = recipes.map(recipe => this.createRecipeCard(recipe)).join('')
            
        } catch (error) {
            console.error('Failed to load recipes:', error)
            this.showError('Failed to load recipes')
        }
    }

    createRecipeCard(recipe) {
        const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)
        const timeText = totalTime > 0 ? `${totalTime} min` : 'Time not set'
        
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                ${recipe.image_data ? `
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="${recipe.image_data}" alt="${recipe.title}" class="w-full h-48 object-cover">
                    </div>
                ` : ''}
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${recipe.title}</h3>
                    ${recipe.description ? `
                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${recipe.description}</p>
                    ` : ''}
                    <div class="flex justify-between items-center text-sm text-gray-500">
                        <span>Serves ${recipe.serving_count}</span>
                        <span>${timeText}</span>
                        <span>${recipe.ingredient_count} ingredients</span>
                    </div>
                    <div class="mt-3 flex space-x-2">
                        <button class="btn-primary text-xs px-3 py-1" onclick="app.editRecipe(${recipe.id})">
                            Edit
                        </button>
                        <button class="btn-secondary text-xs px-3 py-1" onclick="app.viewRecipe(${recipe.id})">
                            View
                        </button>
                    </div>
                </div>
            </div>
        `
    }

    async loadMealPlan(mealType) {
        try {
            console.log(`Loading ${mealType} meal plan`)
            
            // Use simple calendar for now (working implementation)
            if (!this.simpleCalendars[mealType]) {
                const containerId = `${mealType}-calendar-container`
                const container = document.getElementById(containerId)
                
                if (container) {
                    // Create calendar container div with unique ID
                    const calendarId = `simple-calendar-${mealType}`
                    container.innerHTML = `<div id="${calendarId}"></div>`
                    
                    // Initialize simple calendar (using already imported class)
                    this.simpleCalendars[mealType] = new SimpleCalendar(calendarId, mealType)
                    this.simpleCalendars[mealType].render()
                    
                    console.log(`Simple calendar created and rendered for ${mealType}`)
                } else {
                    console.error(`Container ${containerId} not found`)
                }
            } else {
                // Re-render existing calendar
                this.simpleCalendars[mealType].render()
                console.log(`Simple calendar re-rendered for ${mealType}`)
            }
        } catch (error) {
            console.error(`Failed to load ${mealType} meal plan:`, error)
        }
    }

    async loadIngredients() {
        if (this.ingredientsManager) {
            await this.ingredientsManager.loadIngredients()
            this.ingredientsManager.setupEventListeners()
        }
    }

    async loadGroceryList() {
        // Placeholder for grocery list loading
        console.log('Loading grocery list')
    }

    showAddRecipeModal() {
        // Placeholder for add recipe modal
        console.log('Show add recipe modal')
        this.showNotification('Add recipe modal coming soon!', 'info')
    }

    async exportDatabase() {
        try {
            sqliteStorage.exportDatabase()
            this.showNotification('Database exported successfully', 'success')
        } catch (error) {
            console.error('Failed to export database:', error)
            this.showNotification('Failed to export database', 'error')
        }
    }

    async importDatabase(file) {
        try {
            this.showLoading(true, 'Importing database...')
            
            await sqliteStorage.importDatabase(file)
            
            // Reload current tab data
            await this.loadTabData(this.currentTab)
            this.updateDatabaseStats()
            
            this.showLoading(false)
            this.showNotification('Database imported successfully', 'success')
            
        } catch (error) {
            console.error('Failed to import database:', error)
            this.showLoading(false)
            this.showNotification('Failed to import database', 'error')
        }
    }

    async forceSaveDatabase() {
        try {
            await sqliteStorage.forceSave()
            this.showNotification('Database saved', 'success')
        } catch (error) {
            console.error('Failed to save database:', error)
            this.showNotification('Failed to save database', 'error')
        }
    }

    async checkForDataUpdates() {
        // Check if database has been updated (e.g., by background sync)
        console.log('Checking for data updates...')
        
        // This would compare timestamps or version numbers
        // For now, just refresh the current tab
        await this.loadTabData(this.currentTab)
    }

    updateDatabaseStats() {
        const stats = sqliteStorage.getStats()
        if (stats) {
            console.log('Database stats:', stats)
            // Could display stats in UI if needed
        }
    }

    showLoading(show, message = 'Loading MealPlanner...') {
        const loading = document.getElementById('loading')
        const loadingText = loading.querySelector('p')
        
        if (show) {
            loadingText.textContent = message
            loading.classList.remove('hidden')
        } else {
            loading.classList.add('hidden')
        }
    }

    showApp() {
        document.getElementById('main-app').classList.remove('hidden')
    }

    showError(message) {
        const errorDiv = document.createElement('div')
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50'
        errorDiv.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button class="ml-4 text-red-200 hover:text-white" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `
        document.body.appendChild(errorDiv)
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove()
            }
        }, 5000)
    }

    showNotification(message, type = 'info') {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        }
        
        const notification = document.createElement('div')
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full`
        notification.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button class="ml-4 opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `
        
        document.body.appendChild(notification)
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full')
        }, 100)
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('translate-x-full')
                setTimeout(() => notification.remove(), 300)
            }
        }, 4000)
    }

    showNewDatabaseModal() {
        const modal = document.createElement('div')
        modal.className = 'modal-overlay'
        modal.innerHTML = `
            <div class="modal-content p-6">
                <h2 class="text-xl font-bold mb-4">Create New Database</h2>
                <p class="text-gray-600 mb-6">Choose how you want to start your new database:</p>
                
                <div class="space-y-4">
                    <button id="create-empty-db" class="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50">
                        <div class="font-medium">Empty Database</div>
                        <div class="text-sm text-gray-500">Start completely fresh with no recipes or data</div>
                    </button>
                    
                    <button id="create-reset-db" class="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50">
                        <div class="font-medium">Reset Current Database</div>
                        <div class="text-sm text-gray-500">Clear all recipes but keep ingredient list</div>
                    </button>
                </div>
                
                <div class="flex justify-end space-x-3 mt-6">
                    <button id="cancel-new-db" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `
        
        document.getElementById('modal-container').appendChild(modal)
        
        // Event listeners
        document.getElementById('create-empty-db').addEventListener('click', () => {
            this.createNewDatabase(true)
            modal.remove()
        })
        
        document.getElementById('create-reset-db').addEventListener('click', () => {
            this.createNewDatabase(false)
            modal.remove()
        })
        
        document.getElementById('cancel-new-db').addEventListener('click', () => {
            modal.remove()
        })
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove()
            }
        })
    }

    async createNewDatabase(completelyEmpty = false) {
        try {
            this.showLoading(true, 'Creating new database...')
            
            let success
            if (completelyEmpty) {
                success = await sqliteStorage.createNewDatabase()
            } else {
                success = await sqliteStorage.resetDatabase()
            }
            
            if (success) {
                // Reload current tab data
                await this.loadTabData(this.currentTab)
                this.updateDatabaseStats()
                
                this.showLoading(false)
                this.showNotification(
                    completelyEmpty ? 'New empty database created' : 'Database reset successfully', 
                    'success'
                )
            } else {
                throw new Error('Failed to create new database')
            }
            
        } catch (error) {
            console.error('Failed to create new database:', error)
            this.showLoading(false)
            this.showNotification('Failed to create new database', 'error')
        }
    }

    // Recipe management methods (placeholders)
    editRecipe(id) {
        console.log('Edit recipe:', id)
        this.showNotification('Edit recipe feature coming soon!', 'info')
    }

    viewRecipe(id) {
        console.log('View recipe:', id)
        this.showNotification('View recipe feature coming soon!', 'info')
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MealPlannerApp()
    window.app.init()
})

// Handle app installation prompt
let deferredPrompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    
    // Show install button or banner
    console.log('PWA install prompt available')
})

// Export for global access
export { MealPlannerApp }
