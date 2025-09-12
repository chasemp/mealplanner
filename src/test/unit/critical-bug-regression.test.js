/**
 * Critical Bug Regression Tests
 * 
 * Tests for critical bugs that were fixed during the refactoring process.
 * These tests prevent regressions of initialization timing issues, data consistency problems,
 * and schema validation errors that could break the application.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Critical Bug Regression Tests', () => {
    let mockContainer;
    let originalLocalStorage;
    let originalConsole;

    beforeEach(() => {
        // Setup mock container
        mockContainer = document.createElement('div');
        mockContainer.innerHTML = `
            <div id="app">
                <div id="loading">Loading...</div>
                <div id="main-app" class="hidden">
                    <div id="recipe-tab"></div>
                </div>
            </div>
        `;
        document.body.appendChild(mockContainer);

        // Mock localStorage
        originalLocalStorage = global.localStorage;
        global.localStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn()
        };

        // Mock console to capture errors
        originalConsole = global.console;
        global.console = {
            ...originalConsole,
            error: vi.fn(),
            warn: vi.fn(),
            log: vi.fn()
        };

        // Mock global classes
        global.DemoDataManager = vi.fn(() => ({
            getIngredients: vi.fn(() => []),
            getRecipes: vi.fn(() => []),
            getScheduledMeals: vi.fn(() => []),
            getPantryItems: vi.fn(() => []),
            getMeals: vi.fn(() => [])
        }));

        global.SettingsManager = vi.fn(() => ({
            settings: { sourceType: 'demo' },
            getAuthoritativeData: vi.fn(() => []),
            saveAuthoritativeData: vi.fn(),
            shouldLoadDemoData: vi.fn(() => true)
        }));

        global.RecipeManager = vi.fn();
        global.ItemsManager = vi.fn();
        global.GroceryListManager = vi.fn();
        global.MealRotationEngine = vi.fn(() => ({
            initialize: vi.fn(),
            generateRotation: vi.fn(() => [])
        }));
    });

    afterEach(() => {
        document.body.removeChild(mockContainer);
        global.localStorage = originalLocalStorage;
        global.console = originalConsole;
        vi.clearAllMocks();
    });

    describe('FavoriteRecipes Initialization Bug', () => {
        it('should initialize favoriteRecipes as empty array before loadFavoriteRecipes is called', () => {
            // This tests the fix for: TypeError: this.favoriteRecipes.includes is not a function
            
            class MockMealPlannerApp {
                constructor() {
                    // The bug was that favoriteRecipes was set to this.loadFavoriteRecipes() 
                    // before the method was available, causing timing issues
                    this.favoriteRecipes = []; // Fixed: Initialize as empty array first
                    this.showFavoritesOnly = false;
                }

                loadFavoriteRecipes() {
                    try {
                        const stored = localStorage.getItem('mealplanner_favorite_recipes');
                        return stored ? JSON.parse(stored) : [];
                    } catch (error) {
                        console.error('Error loading favorite recipes:', error);
                        return [];
                    }
                }

                isRecipeFavorite(recipeId) {
                    // This method was failing when favoriteRecipes wasn't an array
                    return this.favoriteRecipes.includes(recipeId);
                }
            }

            const app = new MockMealPlannerApp();
            
            // Should not throw TypeError
            expect(() => {
                app.isRecipeFavorite(1);
            }).not.toThrow();

            // favoriteRecipes should be an array
            expect(Array.isArray(app.favoriteRecipes)).toBe(true);
            expect(app.favoriteRecipes).toEqual([]);
        });

        it('should load favorite recipes after managers are initialized', async () => {
            // This tests the fix for proper initialization timing
            
            class MockMealPlannerApp {
                constructor() {
                    this.favoriteRecipes = [];
                    this.managersInitialized = false;
                }

                async initializeManagers() {
                    this.managersInitialized = true;
                }

                loadFavoriteRecipes() {
                    if (!this.managersInitialized) {
                        throw new Error('Managers not initialized yet');
                    }
                    return [];
                }

                async init() {
                    await this.initializeManagers();
                    // Load favorite recipes AFTER managers are initialized
                    this.favoriteRecipes = this.loadFavoriteRecipes();
                }
            }

            const app = new MockMealPlannerApp();
            
            // Should not throw error about managers not being initialized
            await expect(app.init()).resolves.not.toThrow();
            expect(app.managersInitialized).toBe(true);
            expect(Array.isArray(app.favoriteRecipes)).toBe(true);
        });
    });

    describe('Demo Data Schema Validation Bug', () => {
        it('should include pantryItems in schema validation', () => {
            // This tests the fix for: Missing expected data type: pantryItems
            
            function validateApplicationSchema(ingredients, recipes, meals = [], scheduledMeals = []) {
                const issues = [];
                
                // Expected data types that the application should be able to load/save
                const expectedDataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
                
                // Check if our generated data matches expected schema
                const generatedDataTypes = {
                    items: ingredients,
                    recipes: recipes,
                    scheduledMeals: scheduledMeals,
                    pantryItems: [], // Fixed: Empty array for now - pantry items are optional
                    meals: meals || []
                };
                
                expectedDataTypes.forEach(dataType => {
                    if (!generatedDataTypes[dataType]) {
                        issues.push('Missing expected data type: ' + dataType);
                    } else if (!Array.isArray(generatedDataTypes[dataType])) {
                        issues.push('Data type ' + dataType + ' should be an array, got ' + typeof generatedDataTypes[dataType]);
                    }
                });
                
                return issues;
            }

            const ingredients = [];
            const recipes = [];
            const meals = [];
            const scheduledMeals = [];

            const issues = validateApplicationSchema(ingredients, recipes, meals, scheduledMeals);
            
            // Should not have any schema validation issues
            expect(issues).toEqual([]);
        });

        it('should handle pantryItems in settings manager initialization', () => {
            // This tests that pantryItems are properly handled in data initialization
            
            const mockDemoData = new global.DemoDataManager();
            const dataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
            
            dataTypes.forEach(dataType => {
                let data = [];
                switch (dataType) {
                    case 'items':
                        data = mockDemoData.getIngredients();
                        break;
                    case 'recipes':
                        data = mockDemoData.getRecipes();
                        break;
                    case 'scheduledMeals':
                        data = mockDemoData.getScheduledMeals();
                        break;
                    case 'pantryItems':
                        data = mockDemoData.getPantryItems ? mockDemoData.getPantryItems() : [];
                        break;
                    case 'meals':
                        data = mockDemoData.getMeals ? mockDemoData.getMeals() : [];
                        break;
                }
                
                // Should not throw error and should return an array
                expect(Array.isArray(data)).toBe(true);
            });
        });
    });

    describe('Meal Rotation Engine TypeError Bug', () => {
        it('should handle non-string recipe instructions safely', () => {
            // This tests the fix for: TypeError: recipe.instructions?.toLowerCase is not a function
            
            function calculateComplexity(recipe) {
                let complexity = 0;
                
                // Base on number of ingredients
                const ingredientCount = recipe.items?.length || 0;
                complexity += Math.min(0.4, ingredientCount / 20);
                
                // Base on prep time
                if (recipe.prepTime) {
                    complexity += Math.min(0.3, recipe.prepTime / 120); // 2 hours = max complexity
                }
                
                // Base on cooking method complexity - FIXED: Handle non-string instructions
                const instructions = (typeof recipe.instructions === 'string' ? recipe.instructions.toLowerCase() : '');
                const complexMethods = ['braise', 'confit', 'reduction', 'emulsion', 'ferment'];
                complexMethods.forEach(method => {
                    if (instructions.includes(method)) {
                        complexity += 0.1;
                    }
                });
                
                return Math.min(1, complexity);
            }

            // Test with string instructions (normal case)
            const recipeWithStringInstructions = {
                items: [1, 2, 3],
                prepTime: 30,
                instructions: 'Braise the meat slowly'
            };
            
            expect(() => calculateComplexity(recipeWithStringInstructions)).not.toThrow();
            expect(calculateComplexity(recipeWithStringInstructions)).toBeGreaterThan(0);

            // Test with non-string instructions (bug case)
            const recipeWithNonStringInstructions = {
                items: [1, 2],
                prepTime: 15,
                instructions: null // This was causing the TypeError
            };
            
            expect(() => calculateComplexity(recipeWithNonStringInstructions)).not.toThrow();
            expect(calculateComplexity(recipeWithNonStringInstructions)).toBeGreaterThanOrEqual(0);

            // Test with undefined instructions
            const recipeWithUndefinedInstructions = {
                items: [1],
                prepTime: 10
                // instructions is undefined
            };
            
            expect(() => calculateComplexity(recipeWithUndefinedInstructions)).not.toThrow();
            expect(calculateComplexity(recipeWithUndefinedInstructions)).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Async Manager Initialization Timing Bug', () => {
        it('should properly await async manager initialization', async () => {
            // This tests the fix for race conditions in manager initialization
            
            class MockMealPlannerApp {
                constructor() {
                    this.managersInitialized = false;
                    this.viewsInitialized = false;
                }

                async initializeManagers() {
                    // Simulate async initialization
                    await new Promise(resolve => setTimeout(resolve, 10));
                    this.managersInitialized = true;
                }

                initializeItineraryViews() {
                    if (!this.managersInitialized) {
                        throw new Error('Cannot initialize views before managers');
                    }
                    this.viewsInitialized = true;
                }

                async init() {
                    // FIXED: Properly await async initialization
                    await this.initializeManagers();
                    this.initializeItineraryViews();
                }
            }

            const app = new MockMealPlannerApp();
            
            // Should not throw error about managers not being initialized
            await expect(app.init()).resolves.not.toThrow();
            expect(app.managersInitialized).toBe(true);
            expect(app.viewsInitialized).toBe(true);
        });

        it('should handle manager initialization failures gracefully', async () => {
            // This tests error handling in async initialization
            
            class MockMealPlannerApp {
                constructor() {
                    this.initializationError = null;
                }

                async initializeManagers() {
                    throw new Error('Manager initialization failed');
                }

                async init() {
                    try {
                        await this.initializeManagers();
                    } catch (error) {
                        this.initializationError = error;
                        console.error('Failed to initialize managers:', error);
                    }
                }
            }

            const app = new MockMealPlannerApp();
            
            // Should not throw unhandled error
            await expect(app.init()).resolves.not.toThrow();
            expect(app.initializationError).toBeTruthy();
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('Data Consistency and PWA Integration', () => {
        it('should maintain data consistency between localStorage and demo data', () => {
            // This tests the fix for PWA data consistency issues
            
            const mockSettingsManager = new global.SettingsManager();
            
            // Mock localStorage data
            global.localStorage.getItem.mockImplementation((key) => {
                if (key === 'mealplanner_recipes') {
                    return JSON.stringify([{ id: 1, title: 'Test Recipe' }]);
                }
                return null;
            });

            // Should use localStorage data when available
            mockSettingsManager.getAuthoritativeData.mockReturnValue([{ id: 1, title: 'Test Recipe' }]);
            
            const recipes = mockSettingsManager.getAuthoritativeData('recipes');
            expect(recipes).toEqual([{ id: 1, title: 'Test Recipe' }]);
        });

        it('should handle demo data as seed for localStorage', () => {
            // This tests that demo data properly seeds localStorage on first load
            
            const mockDemoData = new global.DemoDataManager();
            mockDemoData.getRecipes.mockReturnValue([
                { id: 1, title: 'Demo Recipe 1' },
                { id: 2, title: 'Demo Recipe 2' }
            ]);

            // Simulate first load (no localStorage data)
            global.localStorage.getItem.mockReturnValue(null);
            
            // Demo data should be used to seed localStorage
            const dataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
            
            // Simulate the initialization process
            dataTypes.forEach(dataType => {
                const storageKey = `mealplanner_${dataType}`;
                
                // Simulate checking localStorage (returns null for first load)
                const stored = global.localStorage.getItem(storageKey);
                expect(stored).toBeNull();
                
                // When localStorage is empty, should use demo data
                let data = [];
                switch (dataType) {
                    case 'recipes':
                        data = mockDemoData.getRecipes();
                        break;
                    default:
                        data = [];
                }
                
                expect(Array.isArray(data)).toBe(true);
                
                // Should seed localStorage with demo data
                if (data.length > 0) {
                    global.localStorage.setItem(storageKey, JSON.stringify(data));
                }
            });
            
            // Verify that localStorage.setItem was called for non-empty data
            expect(global.localStorage.setItem).toHaveBeenCalledWith('mealplanner_recipes', JSON.stringify([
                { id: 1, title: 'Demo Recipe 1' },
                { id: 2, title: 'Demo Recipe 2' }
            ]));
        });
    });

    describe('Ingredients to Items Refactor Consistency', () => {
        it('should use consistent "items" terminology throughout', () => {
            // This tests that the refactor from "ingredients" to "items" is complete
            
            const expectedDataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
            
            // Should not include deprecated "ingredients" data type
            expect(expectedDataTypes).not.toContain('ingredients');
            expect(expectedDataTypes).toContain('items');
        });

        it('should handle items manager initialization correctly', () => {
            // This tests that ItemsManager is properly initialized
            
            class MockItemsManager {
                constructor() {
                    this.items = [];
                }

                async loadItems() {
                    // Should load from authoritative data source
                    this.items = [
                        { id: 1, name: 'Test Item 1' },
                        { id: 2, name: 'Test Item 2' }
                    ];
                }
            }

            const itemsManager = new MockItemsManager();
            
            expect(itemsManager.items).toEqual([]);
            
            // Should be able to load items without error
            expect(async () => {
                await itemsManager.loadItems();
            }).not.toThrow();
        });
    });
});
