/**
 * Manager Initialization Order Tests
 * 
 * These tests ensure that managers are initialized in the correct order
 * to prevent the critical bug where ingredients/grocery managers couldn't
 * access window.mealPlannerSettings because it wasn't initialized yet.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock the managers to track initialization order
const mockManagers = {
    initOrder: [],
    settingsManagerReady: false
};

// Mock Settings Manager
class MockSettingsManager {
    constructor() {
        mockManagers.initOrder.push('SettingsManager');
        mockManagers.settingsManagerReady = true;
        // Make it globally available like the real one
        global.window.mealPlannerSettings = this;
    }
    
    getAuthoritativeData(dataType) {
        return dataType === 'items' || dataType === 'ingredients' ? [] : {};
    }
}

// Mock Items Manager
class MockItemsManager {
    constructor() {
        mockManagers.initOrder.push('ItemsManager');
        
        // This is the critical check - settings manager must be ready
        if (!global.window.mealPlannerSettings) {
            throw new Error('Settings Manager not available during Items Manager initialization');
        }
        
        // Try to access authoritative data like the real manager does
        this.items = global.window.mealPlannerSettings.getAuthoritativeData('items') || [];
    }
}

// Mock Recipe Manager
class MockRecipeManager {
    constructor() {
        mockManagers.initOrder.push('RecipeManager');
        
        if (!global.window.mealPlannerSettings) {
            throw new Error('Settings Manager not available during Recipe Manager initialization');
        }
    }
}

// Mock Grocery List Manager
class MockGroceryListManager {
    constructor() {
        mockManagers.initOrder.push('GroceryListManager');
        
        if (!global.window.mealPlannerSettings) {
            throw new Error('Settings Manager not available during Grocery List Manager initialization');
        }
    }
}

// Mock MealPlanner class with initialization methods
class MockMealPlanner {
    constructor() {
        this.managers = {};
    }
    
    // Simulate the CORRECT initialization order (Settings first)
    initializeCorrectOrder() {
        mockManagers.initOrder = [];
        mockManagers.settingsManagerReady = false;
        
        this.initializeSettingsManager();
        this.initializeRecipeManager();
        this.initializeItemsManager();
        this.initializeGroceryListManager();
    }
    
    // Simulate the INCORRECT initialization order (Settings last)
    initializeIncorrectOrder() {
        mockManagers.initOrder = [];
        mockManagers.settingsManagerReady = false;
        
        this.initializeRecipeManager();
        this.initializeItemsManager();
        this.initializeGroceryListManager();
        this.initializeSettingsManager();
    }
    
    initializeSettingsManager() {
        this.managers.settings = new MockSettingsManager();
    }
    
    initializeRecipeManager() {
        this.managers.recipe = new MockRecipeManager();
    }
    
    initializeItemsManager() {
        this.managers.items = new MockItemsManager();
    }
    
    initializeGroceryListManager() {
        this.managers.groceryList = new MockGroceryListManager();
    }
}

describe('Manager Initialization Order', () => {
    beforeEach(() => {
        // Setup JSDOM environment
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
            url: 'http://localhost:8080'
        });
        global.window = dom.window;
        global.document = dom.window.document;
        
        // Clear any existing global state
        global.window.mealPlannerSettings = null;
        mockManagers.initOrder = [];
        mockManagers.settingsManagerReady = false;
    });

    describe('Correct Initialization Order', () => {
        it('should initialize Settings Manager first', () => {
            const app = new MockMealPlanner();
            
            expect(() => {
                app.initializeCorrectOrder();
            }).not.toThrow();
            
            // Verify Settings Manager was initialized first
            expect(mockManagers.initOrder[0]).toBe('SettingsManager');
            expect(mockManagers.settingsManagerReady).toBe(true);
        });

        it('should make Settings Manager globally available before other managers initialize', () => {
            const app = new MockMealPlanner();
            app.initializeCorrectOrder();
            
            // All managers should have been able to access window.mealPlannerSettings
            expect(mockManagers.initOrder).toEqual([
                'SettingsManager',
                'RecipeManager', 
                'ItemsManager',
                'GroceryListManager'
            ]);
        });

        it('should allow Items Manager to access authoritative data', () => {
            const app = new MockMealPlanner();
            app.initializeCorrectOrder();
            
            // Items Manager should have successfully loaded data
            expect(app.managers.items.items).toBeDefined();
            expect(Array.isArray(app.managers.items.items)).toBe(true);
        });
    });

    describe('Incorrect Initialization Order Prevention', () => {
        it('should fail when Settings Manager initializes after other managers', () => {
            const app = new MockMealPlanner();
            
            expect(() => {
                app.initializeIncorrectOrder();
            }).toThrow('Settings Manager not available during Recipe Manager initialization');
        });

        it('should specifically fail for Items Manager without Settings Manager', () => {
            const app = new MockMealPlanner();
            
            expect(() => {
                // Try to initialize Items Manager without Settings Manager
                app.initializeItemsManager();
            }).toThrow('Settings Manager not available during Items Manager initialization');
        });

        it('should fail for Grocery List Manager without Settings Manager', () => {
            const app = new MockMealPlanner();
            
            expect(() => {
                // Try to initialize Grocery List Manager without Settings Manager
                app.initializeGroceryListManager();
            }).toThrow('Settings Manager not available during Grocery List Manager initialization');
        });
    });

    describe('Real-world Scenario Simulation', () => {
        it('should prevent the "No ingredients found" bug', () => {
            // This simulates the exact bug that was fixed:
            // Ingredients Manager trying to load data before Settings Manager exists
            
            const app = new MockMealPlanner();
            
            // Correct order should work
            expect(() => {
                app.initializeCorrectOrder();
            }).not.toThrow();
            
            // Items should be accessible (may be empty array but should be defined)
            expect(app.managers.items.items).toBeDefined();
            expect(Array.isArray(app.managers.items.items)).toBe(true);
        });

        it('should prevent the "Unknown Ingredient" bug in grocery lists', () => {
            // This simulates the grocery list manager needing settings manager
            // to resolve ingredient names via getAuthoritativeData
            
            const app = new MockMealPlanner();
            app.initializeCorrectOrder();
            
            // Grocery List Manager should have access to settings
            expect(global.window.mealPlannerSettings).toBeDefined();
            expect(typeof global.window.mealPlannerSettings.getAuthoritativeData).toBe('function');
        });
    });

    describe('Integration with Real MealPlanner Class', () => {
        it('should verify the actual initialization order in main.js', async () => {
            // This test reads the actual main.js file to verify the order
            const fs = await import('fs/promises');
            const path = await import('path');
            
            const mainJsPath = path.resolve(process.cwd(), 'js/main.js');
            const mainJsContent = await fs.readFile(mainJsPath, 'utf-8');
            
            // Find the initialization section
            const initSection = mainJsContent.match(/\/\/ Initialize managers[\s\S]*?this\.initializeAutoPlanControls\(\);/);
            expect(initSection).toBeTruthy();
            
            const initCode = initSection[0];
            
            // Verify Settings Manager is initialized first
            const settingsIndex = initCode.indexOf('initializeSettingsManager');
            const itemsIndex = initCode.indexOf('initializeItemsManager');
            const groceryIndex = initCode.indexOf('initializeGroceryListManager');
            
            expect(settingsIndex).toBeGreaterThan(-1);
            expect(itemsIndex).toBeGreaterThan(-1);
            expect(groceryIndex).toBeGreaterThan(-1);
            
            // Settings Manager must come before other managers
            expect(settingsIndex).toBeLessThan(itemsIndex);
            expect(settingsIndex).toBeLessThan(groceryIndex);
        });
    });
});
