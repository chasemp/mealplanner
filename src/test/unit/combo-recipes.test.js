// Combo Recipe Functionality Test Suite
// Tests the combo recipe feature that allows recipes to contain other recipes

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Combo Recipe Functionality', () => {
    let dom;
    let container;
    let window;
    let document;
    let recipeManager;

    beforeEach(async () => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>MealPlanner Test</title>
            </head>
            <body>
                <div id="recipe-manager-container">
                    <!-- Recipe manager will be rendered here -->
                </div>
            </body>
            </html>
        `);
        window = dom.window;
        document = window.document;
        container = document.getElementById('recipe-manager-container');

        // Mock global objects
        global.window = window;
        global.document = document;

        // Mock DemoDataManager with combo recipes
        global.window.DemoDataManager = class MockDemoDataManager {
            getIngredients() {
                return [
                    { id: 1, name: 'Chicken Breast', category: 'meat', default_unit: 'lbs' },
                    { id: 16, name: 'Potatoes', category: 'produce', default_unit: 'lbs' },
                    { id: 6, name: 'Broccoli', category: 'produce', default_unit: 'lbs' }
                ];
            }
            
            getRecipes() {
                return [
                    // Basic recipes
                    {
                        id: 9,
                        title: 'Mashed Potatoes',
                        description: 'Creamy, buttery mashed potatoes',
                        type: 'basic',
                        meal_type: 'dinner',
                        prep_time: 10,
                        cook_time: 20,
                        tags: ['side-dish', 'comfort-food'],
                        labels: ['side-dish', 'comfort-food'],
                        ingredients: [
                            { ingredient_id: 16, quantity: 2, unit: 'lbs' }
                        ]
                    },
                    {
                        id: 10,
                        title: 'Fried Chicken',
                        description: 'Crispy, golden fried chicken pieces',
                        type: 'basic',
                        meal_type: 'dinner',
                        prep_time: 20,
                        cook_time: 15,
                        tags: ['comfort-food', 'main-dish'],
                        labels: ['comfort-food', 'main-dish'],
                        ingredients: [
                            { ingredient_id: 1, quantity: 2, unit: 'lbs' }
                        ]
                    },
                    // Combo recipe
                    {
                        id: 12,
                        title: 'Sunday Dinner Combo',
                        description: 'Classic Sunday dinner with fried chicken and mashed potatoes',
                        type: 'combo',
                        meal_type: 'dinner',
                        prep_time: 35,
                        cook_time: 30,
                        tags: ['combo', 'sunday-dinner', 'comfort-food'],
                        labels: ['combo', 'sunday-dinner', 'comfort-food'],
                        combo_recipes: [
                            { recipe_id: 10, servings_multiplier: 1 }, // Fried Chicken
                            { recipe_id: 9, servings_multiplier: 1 }   // Mashed Potatoes
                        ],
                        ingredients: [
                            { ingredient_id: 1, quantity: 2, unit: 'lbs' }, // Chicken
                            { ingredient_id: 16, quantity: 2, unit: 'lbs' } // Potatoes
                        ]
                    }
                ];
            }
        };

        // Mock SettingsManager to provide demo data via centralized authority
        global.window.mealPlannerSettings = {
            getCurrentDatabaseSource() {
                return 'demo';
            },
            shouldLoadDemoData() {
                return true;
            },
            getAuthoritativeData(dataType) {
                const demoData = new global.window.DemoDataManager();
                switch (dataType) {
                    case 'ingredients':
                        return demoData.getIngredients();
                    case 'recipes':
                        return demoData.getRecipes();
                    default:
                        return [];
                }
            },
            saveAuthoritativeData(dataType, data) {
                // Mock save - do nothing in tests
                console.log(`Mock save: ${dataType} with ${data.length} items`);
            }
        };

        // Import RecipeManager after DOM setup
        await import('../../../js/recipe-manager.js');
        const RecipeManager = global.RecipeManager;
        recipeManager = new RecipeManager(container);
        await recipeManager.init();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        dom.window.close();
    });

    describe('Combo Recipe Display', () => {
        it('should display combo recipes with special styling', () => {
            const comboRecipeCard = container.querySelector('[data-recipe-type="combo"]');
            expect(comboRecipeCard).toBeTruthy();
            
            // Should have purple border for combo recipes
            expect(comboRecipeCard.classList.contains('border-l-4')).toBe(true);
            expect(comboRecipeCard.classList.contains('border-purple-500')).toBe(true);
        });

        it('should show COMBO badge for combo recipes', () => {
            const comboRecipeCard = container.querySelector('[data-recipe-type="combo"]');
            expect(comboRecipeCard).toBeTruthy();
            
            const comboBadge = comboRecipeCard.querySelector('.bg-purple-100');
            expect(comboBadge).toBeTruthy();
            expect(comboBadge.textContent.trim()).toContain('COMBO');
        });

        it('should show recipe count instead of ingredient count for combo recipes', () => {
            const comboRecipeCard = container.querySelector('[data-recipe-type="combo"]');
            expect(comboRecipeCard).toBeTruthy();
            
            // Should show "2 recipes" instead of ingredient count
            expect(comboRecipeCard.textContent).toContain('2 recipes');
            expect(comboRecipeCard.textContent).not.toContain('ingredients');
        });

        it('should display basic recipes without combo styling', () => {
            const basicRecipeCards = container.querySelectorAll('[data-recipe-type="basic"]');
            expect(basicRecipeCards.length).toBeGreaterThan(0);
            
            basicRecipeCards.forEach(card => {
                // Should not have combo styling
                expect(card.classList.contains('border-purple-500')).toBe(false);
                expect(card.querySelector('.bg-purple-100')).toBeFalsy();
                expect(card.textContent).toContain('ingredients');
            });
        });
    });

    describe('Recipe Type Filtering', () => {
        it('should have recipe type filter dropdown', () => {
            const typeFilter = container.querySelector('#recipe-type');
            expect(typeFilter).toBeTruthy();
            
            const options = typeFilter.querySelectorAll('option');
            expect(options.length).toBe(3); // All Types, Basic Recipes, Combo Recipes
            
            expect(options[0].value).toBe('all');
            expect(options[1].value).toBe('basic');
            expect(options[2].value).toBe('combo');
        });

        it('should filter to show only basic recipes', () => {
            const typeFilter = container.querySelector('#recipe-type');
            typeFilter.value = 'basic';
            typeFilter.dispatchEvent(new Event('change'));
            
            const visibleCards = container.querySelectorAll('.recipe-card');
            visibleCards.forEach(card => {
                expect(card.getAttribute('data-recipe-type')).toBe('basic');
            });
        });

        it('should filter to show only combo recipes', () => {
            const typeFilter = container.querySelector('#recipe-type');
            typeFilter.value = 'combo';
            typeFilter.dispatchEvent(new Event('change'));
            
            const visibleCards = container.querySelectorAll('.recipe-card');
            visibleCards.forEach(card => {
                expect(card.getAttribute('data-recipe-type')).toBe('combo');
            });
            
            // Should have at least one combo recipe
            expect(visibleCards.length).toBeGreaterThan(0);
        });

        it('should show all recipes when filter is set to all', () => {
            // First filter to combo only
            const typeFilter = container.querySelector('#recipe-type');
            typeFilter.value = 'combo';
            typeFilter.dispatchEvent(new Event('change'));
            
            // Then reset to all
            typeFilter.value = 'all';
            typeFilter.dispatchEvent(new Event('change'));
            
            const basicCards = container.querySelectorAll('[data-recipe-type="basic"]');
            const comboCards = container.querySelectorAll('[data-recipe-type="combo"]');
            
            expect(basicCards.length).toBeGreaterThan(0);
            expect(comboCards.length).toBeGreaterThan(0);
        });

        it('should reset recipe type filter when clear filters is clicked', () => {
            const typeFilter = container.querySelector('#recipe-type');
            const clearBtn = container.querySelector('#clear-recipe-filters-btn');
            
            // Set filter to combo
            typeFilter.value = 'combo';
            typeFilter.dispatchEvent(new Event('change'));
            
            // Verify it was set
            expect(recipeManager.selectedType).toBe('combo');
            
            // Clear filters
            clearBtn.click();
            
            // Should be reset to 'all' in internal state
            expect(recipeManager.selectedType).toBe('all');
            
            // And the DOM should reflect this after render
            const updatedTypeFilter = container.querySelector('#recipe-type');
            expect(updatedTypeFilter.value).toBe('all');
        });
    });

    describe('Combo Recipe Data Structure', () => {
        it('should have combo_recipes field for combo recipes', () => {
            expect(recipeManager.recipes).toBeDefined();
            
            const comboRecipe = recipeManager.recipes.find(r => r.type === 'combo');
            expect(comboRecipe).toBeTruthy();
            expect(comboRecipe.combo_recipes).toBeDefined();
            expect(Array.isArray(comboRecipe.combo_recipes)).toBe(true);
            expect(comboRecipe.combo_recipes.length).toBeGreaterThan(0);
        });

        it('should have recipe_id and servings_multiplier in combo_recipes', () => {
            const comboRecipe = recipeManager.recipes.find(r => r.type === 'combo');
            expect(comboRecipe).toBeTruthy();
            
            comboRecipe.combo_recipes.forEach(comboRef => {
                expect(comboRef.recipe_id).toBeDefined();
                expect(typeof comboRef.recipe_id).toBe('number');
                expect(comboRef.servings_multiplier).toBeDefined();
                expect(typeof comboRef.servings_multiplier).toBe('number');
            });
        });

        it('should still have ingredients field for grocery list generation', () => {
            const comboRecipe = recipeManager.recipes.find(r => r.type === 'combo');
            expect(comboRecipe).toBeTruthy();
            expect(comboRecipe.ingredients).toBeDefined();
            expect(Array.isArray(comboRecipe.ingredients)).toBe(true);
            expect(comboRecipe.ingredients.length).toBeGreaterThan(0);
        });

        it('should have type field set to combo', () => {
            const comboRecipe = recipeManager.recipes.find(r => r.type === 'combo');
            expect(comboRecipe).toBeTruthy();
            expect(comboRecipe.type).toBe('combo');
        });

        it('should have basic recipes with type field set to basic', () => {
            const basicRecipes = recipeManager.recipes.filter(r => r.type === 'basic');
            expect(basicRecipes.length).toBeGreaterThan(0);
            
            basicRecipes.forEach(recipe => {
                expect(recipe.type).toBe('basic');
            });
        });
    });

    describe('Integration with Existing Features', () => {
        it('should work with search functionality', () => {
            const searchInput = container.querySelector('#recipe-search');
            searchInput.value = 'Sunday';
            searchInput.dispatchEvent(new Event('input'));
            
            const visibleCards = container.querySelectorAll('.recipe-card');
            expect(visibleCards.length).toBe(1);
            expect(visibleCards[0].getAttribute('data-recipe-type')).toBe('combo');
        });

        it('should work with meal type filtering', () => {
            const categoryFilter = container.querySelector('#recipe-category');
            categoryFilter.value = 'dinner';
            categoryFilter.dispatchEvent(new Event('change'));
            
            const visibleCards = container.querySelectorAll('.recipe-card');
            visibleCards.forEach(card => {
                expect(card.textContent).toContain('dinner');
            });
            
            // Should include both basic and combo recipes
            const basicCards = container.querySelectorAll('[data-recipe-type="basic"]');
            const comboCards = container.querySelectorAll('[data-recipe-type="combo"]');
            expect(basicCards.length).toBeGreaterThan(0);
            expect(comboCards.length).toBeGreaterThan(0);
        });

        it('should work with label filtering', () => {
            const labelFilter = container.querySelector('#recipe-label');
            labelFilter.value = 'comfort-food';
            labelFilter.dispatchEvent(new Event('change'));
            
            const visibleCards = container.querySelectorAll('.recipe-card');
            expect(visibleCards.length).toBeGreaterThan(0);
            
            // Should include both basic and combo recipes with comfort-food label
            const basicCards = container.querySelectorAll('[data-recipe-type="basic"]');
            const comboCards = container.querySelectorAll('[data-recipe-type="combo"]');
            expect(basicCards.length).toBeGreaterThan(0);
            expect(comboCards.length).toBeGreaterThan(0);
        });
    });
});
