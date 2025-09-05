// SQLite storage management using IndexedDB for persistence
import initSqlJs from 'sql.js'

const DB_NAME = 'MealPlannerDB'
const DB_VERSION = 1
const STORE_NAME = 'sqlite_data'
const DB_KEY = 'meal_planner.db'

class SQLiteStorage {
    constructor() {
        this.db = null
        this.SQL = null
        this.isInitialized = false
    }

    /**
     * Initialize SQLite and load existing database from IndexedDB
     */
    async initialize() {
        try {
            console.log('Initializing SQLite storage...')
            
            // Initialize sql.js WASM
            this.SQL = await initSqlJs({
                locateFile: file => `https://sql.js.org/dist/${file}`
            })
            
            // Try to load existing database from IndexedDB
            const existingData = await this.loadFromIndexedDB()
            
            if (existingData) {
                console.log('Loading existing database from storage')
                this.db = new this.SQL.Database(existingData)
            } else {
                console.log('Creating new database')
                this.db = new this.SQL.Database()
                
                // Initialize schema for new database
                const { initializeDatabase } = await import('./schema.js')
                initializeDatabase(this.db)
                
                // Save the new database
                await this.saveToIndexedDB()
            }
            
            this.isInitialized = true
            console.log('SQLite storage initialized successfully')
            
            // Set up auto-save on changes
            this.setupAutoSave()
            
            return true
        } catch (error) {
            console.error('Failed to initialize SQLite storage:', error)
            return false
        }
    }

    /**
     * Load SQLite database file from IndexedDB
     */
    async loadFromIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)
            
            request.onerror = () => reject(request.error)
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME)
                }
            }
            
            request.onsuccess = (event) => {
                const db = event.target.result
                const transaction = db.transaction([STORE_NAME], 'readonly')
                const store = transaction.objectStore(STORE_NAME)
                const getRequest = store.get(DB_KEY)
                
                getRequest.onsuccess = () => {
                    resolve(getRequest.result)
                }
                
                getRequest.onerror = () => reject(getRequest.error)
            }
        })
    }

    /**
     * Save SQLite database file to IndexedDB
     */
    async saveToIndexedDB() {
        if (!this.db) {
            throw new Error('No database to save')
        }

        const data = this.db.export()
        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)
            
            request.onerror = () => reject(request.error)
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME)
                }
            }
            
            request.onsuccess = (event) => {
                const db = event.target.result
                const transaction = db.transaction([STORE_NAME], 'readwrite')
                const store = transaction.objectStore(STORE_NAME)
                const putRequest = store.put(data, DB_KEY)
                
                putRequest.onsuccess = () => {
                    console.log('Database saved to IndexedDB')
                    resolve()
                }
                
                putRequest.onerror = () => reject(putRequest.error)
            }
        })
    }

    /**
     * Set up automatic saving after database changes
     */
    setupAutoSave() {
        // Save database after any modification
        // We'll implement a debounced save to avoid too frequent saves
        this.saveTimeout = null
        this.needsSave = false
        
        // Override exec method to trigger saves
        const originalExec = this.db.exec.bind(this.db)
        this.db.exec = (sql) => {
            const result = originalExec(sql)
            this.markForSave()
            return result
        }
    }

    /**
     * Mark database for saving (debounced)
     */
    markForSave() {
        this.needsSave = true
        
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout)
        }
        
        this.saveTimeout = setTimeout(async () => {
            if (this.needsSave) {
                await this.saveToIndexedDB()
                this.needsSave = false
                
                // Notify service worker of database change
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'DATABASE_UPDATED',
                        timestamp: Date.now()
                    })
                }
            }
        }, 1000) // Save 1 second after last change
    }

    /**
     * Export database as file for user download
     */
    exportDatabase() {
        if (!this.db) {
            throw new Error('No database to export')
        }
        
        const data = this.db.export()
        const blob = new Blob([data], { type: 'application/x-sqlite3' })
        const url = URL.createObjectURL(blob)
        
        const a = document.createElement('a')
        a.href = url
        a.download = `meal-planner-${new Date().toISOString().split('T')[0]}.db`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    /**
     * Import database from file
     */
    async importDatabase(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            
            reader.onload = async (event) => {
                try {
                    const arrayBuffer = event.target.result
                    const data = new Uint8Array(arrayBuffer)
                    
                    // Close existing database
                    if (this.db) {
                        this.db.close()
                    }
                    
                    // Create new database from imported data
                    this.db = new this.SQL.Database(data)
                    
                    // Save to IndexedDB
                    await this.saveToIndexedDB()
                    
                    // Set up auto-save for new database
                    this.setupAutoSave()
                    
                    console.log('Database imported successfully')
                    resolve()
                } catch (error) {
                    console.error('Failed to import database:', error)
                    reject(error)
                }
            }
            
            reader.onerror = () => reject(reader.error)
            reader.readAsArrayBuffer(file)
        })
    }

    /**
     * Get database instance
     */
    getDatabase() {
        if (!this.isInitialized || !this.db) {
            throw new Error('Database not initialized')
        }
        return this.db
    }

    /**
     * Check if database is ready
     */
    isReady() {
        return this.isInitialized && this.db !== null
    }

    /**
     * Force save current database state
     */
    async forceSave() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout)
        }
        await this.saveToIndexedDB()
        this.needsSave = false
    }

    /**
     * Create a new empty database (clears all data)
     */
    async createNewDatabase() {
        try {
            console.log('Creating new database...')
            
            // Close existing database
            if (this.db) {
                this.db.close()
            }
            
            // Create new empty database
            this.db = new this.SQL.Database()
            
            // Initialize schema (but not sample data)
            const { DATABASE_SCHEMA } = await import('./schema.js')
            this.db.exec(DATABASE_SCHEMA)
            
            // Save the new empty database
            await this.saveToIndexedDB()
            
            // Set up auto-save for new database
            this.setupAutoSave()
            
            console.log('New database created successfully')
            return true
        } catch (error) {
            console.error('Failed to create new database:', error)
            return false
        }
    }

    /**
     * Clear all data and reset to empty database with just ingredients
     */
    async resetDatabase() {
        try {
            console.log('Resetting database...')
            
            // Clear all user data but keep ingredients
            const clearDataSQL = `
                DELETE FROM scheduled_meals;
                DELETE FROM grocery_lists;
                DELETE FROM meal_plans;
                DELETE FROM recipe_ingredients;
                DELETE FROM recipes;
                DELETE FROM pantry_items;
            `
            
            this.db.exec(clearDataSQL)
            
            // Save the reset database
            await this.saveToIndexedDB()
            
            console.log('Database reset successfully')
            return true
        } catch (error) {
            console.error('Failed to reset database:', error)
            return false
        }
    }

    /**
     * Get database statistics
     */
    getStats() {
        if (!this.db) return null
        
        try {
            const stats = {}
            
            // Get table counts
            const tables = ['recipes', 'ingredients', 'meal_plans', 'scheduled_meals']
            for (const table of tables) {
                const result = this.db.exec(`SELECT COUNT(*) as count FROM ${table}`)
                stats[table] = result[0]?.values[0][0] || 0
            }
            
            // Get database size
            const data = this.db.export()
            stats.size = data.length
            stats.sizeFormatted = this.formatBytes(data.length)
            
            return stats
        } catch (error) {
            console.error('Error getting database stats:', error)
            return null
        }
    }

    /**
     * Format bytes for display
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
}

// Create singleton instance
export const sqliteStorage = new SQLiteStorage()

// Initialize on module load
export async function initializeStorage() {
    return await sqliteStorage.initialize()
}
