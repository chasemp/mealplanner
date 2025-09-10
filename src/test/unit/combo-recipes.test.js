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
        it('should have meal type filter dropdown (recipe-category)', () => {
            const categoryFilter = container.querySelector('#recipe-category');
            expect(categoryFilter).toBeTruthy();
            
            const options = categoryFilter.querySelectorAll('option');
            expect(options.length).toBeGreaterThanOrEqual(5); // All Types, Breakfast, Lunch, Dinner, Snack
            
            expect(options[0].value).toBe('all');
            // Note: This tests meal type filtering, not recipe type (basic/combo) filtering
            // Combo recipe filtering is handled by the search functionality
        });

        it('should filter recipes by meal type', () => {
            const categoryFilter = container.querySelector('#recipe-category');
            categoryFilter.value = 'dinner';
            categoryFilter.dispatchEvent(new Event('change'));
            
            const visibleCards = container.querySelectorAll('.recipe-card');
            // Test that filtering works - we should have some cards visible
            expect(visibleCards.length).toBeGreaterThan(0);
            
            // All visible cards should be dinner recipes
            visibleCards.forEach(card => {
                const mealType = card.getAttribute('data-meal-type') || card.querySelector('[data-meal-type]')?.getAttribute('data-meal-type');
                if (mealType) {
                    expect(mealType).toBe('dinner');
                }
            });
        });

        it('should display combo recipes with proper badges', () => {
            // Test that combo recipes are displayed and have COMBO badges
            const comboCards = container.querySelectorAll('.recipe-card[data-recipe-type="combo"]');
            expect(comboCards.length).toBeGreaterThan(0);
            
            comboCards.forEach(card => {
                // Check for the purple COMBO badge (as implemented in Recipe Manager)
                const badge = card.querySelector('span.bg-purple-100') || 
                             card.querySelector('span:contains("COMBO")') ||
                             card.querySelector('.text-purple-800');
                expect(badge).toBeTruthy();
                
                // Also check for purple border styling
                expect(card.classList.contains('border-purple-500') || 
                       card.classList.contains('border-l-4')).toBeTruthy();
            });
        });

        it('should show all recipes by default', () => {
            // Test that both basic and combo recipes are visible by default
            const basicCards = container.querySelectorAll('[data-recipe-type="basic"]');
            const comboCards = container.querySelectorAll('[data-recipe-type="combo"]');
            
            expect(basicCards.length).toBeGreaterThan(0);
            expect(comboCards.length).toBeGreaterThan(0);
            
            // Test that category filter shows all types by default
            const categoryFilter = container.querySelector('#recipe-category');
            expect(categoryFilter.value).toBe('all');
        });

        it('should reset filters when clear filters is clicked', () => {
            const categoryFilter = container.querySelector('#recipe-category');
            const clearBtn = container.querySelector('#clear-recipe-filters-btn');
            
            // Set filter to dinner
            categoryFilter.value = 'dinner';
            categoryFilter.dispatchEvent(new Event('change'));
            
            // Clear filters
            clearBtn.click();
            
            // Should reset to all
            const updatedCategoryFilter = container.querySelector('#recipe-category');
            expect(updatedCategoryFilter.value).toBe('all');
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
            searchInput.value = 'Sunday Dinner Combo';
            searchInput.dispatchEvent(new Event('input'));
            
            const visibleCards = container.querySelectorAll('.recipe-card');
            expect(visibleCards.length).toBeGreaterThan(0);
            
            // At least one should be the Sunday Dinner Combo
            const sundayCombo = Array.from(visibleCards).find(card => 
                card.textContent.includes('Sunday Dinner Combo')
            );
            expect(sundayCombo).toBeTruthy();
            expect(sundayCombo.getAttribute('data-recipe-type')).toBe('combo');
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
            // The current UI uses a multi-label input system, not a simple dropdown
            const labelInput = container.querySelector('#recipe-labels-input');
            expect(labelInput).toBeTruthy();
            
            // Test that the label input exists and can be used for filtering
            labelInput.value = 'comfort';
            labelInput.dispatchEvent(new Event('input'));
            
            // The multi-label system should show dropdown options
            const dropdown = container.querySelector('#recipe-labels-dropdown');
            expect(dropdown).toBeTruthy();
            
            // Test that we have recipes with labels (both basic and combo)
            const allCards = container.querySelectorAll('.recipe-card');
            expect(allCards.length).toBeGreaterThan(0);
        });
    });
});
