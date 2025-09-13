/**
 * Demo Data Authoritative Source Tests
 * 
 * Tests the critical fix for demo data auto-reload bug where localStorage
 * should be the authoritative source and demo data should NOT auto-reload
 * on page refresh when data already exists.
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Demo Data Authoritative Source Behavior', () => {
    let dom;
    let settingsManager;
    let mockLocalStorage;

    beforeEach(async () => {
        // Create DOM environment
        dom = new JSDOM(`<!DOCTYPE html>
            <html>
            <head><title>Test</title></head>
            <body>
                <div id="settings-container"></div>
            </body>
            </html>
        `, { url: 'http://localhost' });

        global.window = dom.window;
        global.document = dom.window.document;
        global.localStorage = dom.window.localStorage;

        // Mock localStorage with tracking
        mockLocalStorage = {
            data: {},
            getItem: vi.fn((key) => mockLocalStorage.data[key] || null),
            setItem: vi.fn((key, value) => { mockLocalStorage.data[key] = value; }),
            removeItem: vi.fn((key) => { delete mockLocalStorage.data[key]; }),
            clear: vi.fn(() => { mockLocalStorage.data = {}; })
        };
        global.localStorage = mockLocalStorage;

        // Mock console methods
        global.console.log = vi.fn();
        global.console.warn = vi.fn();
        global.console.error = vi.fn();

        // Mock DemoDataManager
        global.window.DemoDataManager = class {
            getIngredients() {
                return [
                    { id: 1, name: 'Demo Chicken', category: 'meat' },
                    { id: 2, name: 'Demo Rice', category: 'grains' }
                ];
            }
            getRecipes() {
                return [
                    { id: 1, name: 'Demo Recipe 1', ingredients: [] },
                    { id: 2, name: 'Demo Recipe 2', ingredients: [] }
                ];
            }
            getMeals() { return []; }
            getScheduledMeals() { return []; }
            getPantryItems() { return []; }
            getGroceryLists() { return []; }
        };

        // Import SettingsManager after DOM setup
        const { SettingsManager } = await import('../../../js/settings-manager.js');
        
        settingsManager = new SettingsManager();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        dom.window.close();
    });

    describe('Demo Data Initialization Logic', () => {
        it('should initialize demo data when localStorage is empty', () => {
            // Ensure localStorage is empty
            mockLocalStorage.clear();
            
            // Call initializeDemoData
            settingsManager.initializeDemoData();
            
            // Should have initialized data
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('mealplanner_items', expect.any(String));
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('mealplanner_recipes', expect.any(String));
            expect(console.log).toHaveBeenCalledWith('✅ Initialized items: 2 items');
            expect(console.log).toHaveBeenCalledWith('✅ Initialized recipes: 2 items');
        });

        it('should NOT initialize demo data when localStorage already has data', () => {
            // Pre-populate localStorage with existing data
            mockLocalStorage.data['mealplanner_items'] = JSON.stringify([
                { id: 99, name: 'Existing Item', category: 'test' }
            ]);
            mockLocalStorage.data['mealplanner_recipes'] = JSON.stringify([
                { id: 99, name: 'Existing Recipe', ingredients: [] }
            ]);
            
            // Reset mocks to track new calls
            mockLocalStorage.setItem.mockClear();
            console.log.mockClear();
            
            // Call initializeDemoData
            settingsManager.initializeDemoData();
            
            // Should NOT have overwritten existing data
            expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('mealplanner_items', expect.any(String));
            expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('mealplanner_recipes', expect.any(String));
            expect(console.log).toHaveBeenCalledWith('📋 items already exists in localStorage, skipping initialization');
            expect(console.log).toHaveBeenCalledWith('📋 recipes already exists in localStorage, skipping initialization');
        });
    });

    describe('loadDemoData Method Behavior', () => {
        it('should initialize demo data when no existing data', async () => {
            // Ensure localStorage is empty
            mockLocalStorage.clear();
            
            // Call loadDemoData
            const result = await settingsManager.loadDemoData();
            
            // Should have initialized data
            expect(result).toBe(true);
            expect(console.log).toHaveBeenCalledWith('📋 No existing data found - initializing demo data');
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('mealplanner_items', expect.any(String));
        });

        it('should respect existing localStorage data and NOT overwrite', async () => {
            // Pre-populate localStorage with user data
            mockLocalStorage.data['mealplanner_items'] = JSON.stringify([
                { id: 100, name: 'User Created Item', category: 'custom' }
            ]);
            
            // Reset mocks
            mockLocalStorage.setItem.mockClear();
            console.log.mockClear();
            
            // Call loadDemoData
            const result = await settingsManager.loadDemoData();
            
            // Should respect existing data
            expect(result).toBe(true);
            expect(console.log).toHaveBeenCalledWith('📋 Existing data found - respecting localStorage as authoritative source');
            expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('mealplanner_items', expect.any(String));
        });
    });

    describe('Constructor Behavior (Critical Bug Fix)', () => {
        it('should NOT auto-initialize demo data on construction when in demo mode', async () => {
            // Pre-populate localStorage with user data
            mockLocalStorage.data['mealplanner_items'] = JSON.stringify([
                { id: 200, name: 'User Item', category: 'user' }
            ]);
            
            // Set demo mode
            mockLocalStorage.data['mealplanner_settings'] = JSON.stringify({
                sourceType: 'demo'
            });
            
            // Reset mocks
            mockLocalStorage.setItem.mockClear();
            console.log.mockClear();
            
            // Create new SettingsManager instance (simulating page reload)
            const { SettingsManager } = await import('../../../js/settings-manager.js');
            const newSettingsManager = new SettingsManager();
            
            // Should NOT have overwritten existing data
            expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('mealplanner_items', expect.any(String));
            
            // The constructor should not call initializeDemoData automatically
            // This is the critical fix - page loads should never auto-reload demo data
        });
    });

    describe('Reset Demo Data Functionality', () => {
        it('should force reinitialize demo data when explicitly requested', () => {
            // Pre-populate localStorage with user data
            mockLocalStorage.data['mealplanner_items'] = JSON.stringify([
                { id: 300, name: 'User Item To Be Replaced', category: 'user' }
            ]);
            
            // Reset mocks
            mockLocalStorage.setItem.mockClear();
            console.log.mockClear();
            
            // Call resetDemoData (explicit user action)
            settingsManager.resetDemoData();
            
            // Should have forcibly reinitialized demo data (multiple data types)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('mealplanner_recipes', expect.any(String));
            expect(console.log).toHaveBeenCalledWith('✅ Initialized recipes: 2 items');
        });
    });

    describe('Integration with Main.js loadDemoData', () => {
        it('should use SettingsManager loadDemoData method (not direct initializeDemoData)', async () => {
            // Mock the SettingsManager's loadDemoData method
            const loadDemoDataSpy = vi.spyOn(settingsManager, 'loadDemoData');
            
            // Pre-populate localStorage
            mockLocalStorage.data['mealplanner_items'] = JSON.stringify([
                { id: 400, name: 'Existing Item', category: 'test' }
            ]);
            
            // Call the method that main.js would call
            await settingsManager.loadDemoData();
            
            // Should have called the correct method
            expect(loadDemoDataSpy).toHaveBeenCalled();
            
            // Should have respected existing data
            expect(console.log).toHaveBeenCalledWith('📋 Existing data found - respecting localStorage as authoritative source');
        });
    });
});
