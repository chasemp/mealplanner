import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Demo Data Manager', () => {
    let dom;
    let DemoDataManager;
    let demoData;

    beforeEach(async () => {
        // Setup DOM
        dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, { url: 'http://localhost' });
        global.window = dom.window;
        global.document = dom.window.document;

        // Load the DemoDataManager
        const { default: DDM } = await import('../../../js/demo-data.js');
        DemoDataManager = DDM;
        demoData = new DemoDataManager();
    });

    describe('Data Structure', () => {
        it('should initialize with comprehensive ingredient list', () => {
            // WHY: New users need sample ingredients to understand the app and start cooking
            // WHAT: Verifies demo data provides sufficient ingredients for meaningful meal planning
            const ingredients = demoData.getIngredients();
            
            expect(ingredients).toBeDefined();
            expect(ingredients.length).toBeGreaterThan(20); // Should have substantial ingredient list
            
            // Check required properties
            ingredients.forEach(ingredient => {
                expect(ingredient).toHaveProperty('id');
                expect(ingredient).toHaveProperty('name');
                expect(ingredient).toHaveProperty('category');
                expect(ingredient).toHaveProperty('default_unit');
                expect(ingredient).toHaveProperty('storage_notes');
                expect(ingredient).toHaveProperty('nutrition');
            });
        });

        it('should have diverse ingredient categories', () => {
            // WHY: Users need ingredients from all food groups to create balanced, realistic meals
            // WHAT: Verifies demo data includes major food categories for comprehensive meal planning
            const ingredients = demoData.getIngredients();
            const categories = [...new Set(ingredients.map(ing => ing.category))];
            
            expect(categories).toContain('meat');
            expect(categories).toContain('produce');
            expect(categories).toContain('dairy');
            expect(categories).toContain('grains');
            expect(categories).toContain('pantry');
            expect(categories.length).toBeGreaterThanOrEqual(5);
        });

        it('should initialize with comprehensive recipe list', () => {
            const recipes = demoData.getRecipes();
            
            expect(recipes).toBeDefined();
            expect(recipes.length).toBeGreaterThanOrEqual(8); // Should have good variety
            
            // Check required properties
            recipes.forEach(recipe => {
                expect(recipe).toHaveProperty('id');
                expect(recipe).toHaveProperty('title');
                expect(recipe).toHaveProperty('description');
                expect(recipe).toHaveProperty('servings');
                // meal_type is now handled via labels system, not a separate property
                expect(recipe).toHaveProperty('prep_time');
                expect(recipe).toHaveProperty('cook_time');
                expect(recipe).toHaveProperty('instructions');
                expect(recipe).toHaveProperty('items');
                expect(recipe.items).toBeInstanceOf(Array);
            });
        });

        it('should have recipes for different meal types', () => {
            const recipes = demoData.getRecipes();
            const mealTypes = [...new Set(recipes.map(recipe => recipe.meal_type))];
            
            expect(mealTypes).toContain('breakfast');
            expect(mealTypes).toContain('lunch');
            expect(mealTypes).toContain('dinner');
        });

        it('should initialize with scheduled meals', () => {
            const scheduledMeals = demoData.getScheduledMeals();
            
            expect(scheduledMeals).toBeDefined();
            expect(scheduledMeals.length).toBeGreaterThan(0);
            
            // Check required properties
            scheduledMeals.forEach(meal => {
                expect(meal).toHaveProperty('id');
                expect(meal).toHaveProperty('recipe_id');
                expect(meal).toHaveProperty('meal_type');
                expect(meal).toHaveProperty('date');
            });
        });
    });

    describe('Data Consistency', () => {
        it('should have all scheduled meals reference existing recipes', () => {
            const recipes = demoData.getRecipes();
            const scheduledMeals = demoData.getScheduledMeals();
            const recipeIds = recipes.map(r => r.id);
            
            scheduledMeals.forEach(meal => {
                expect(recipeIds).toContain(meal.recipe_id);
            });
        });

        it('should have all recipe items reference existing items', () => {
            const items = demoData.getIngredients(); // Still called getIngredients for backward compatibility
            const recipes = demoData.getRecipes();
            const itemIds = items.map(item => item.id);
            
            recipes.forEach(recipe => {
                if (recipe.items) {
                    recipe.items.forEach(recipeItem => {
                        expect(itemIds).toContain(recipeItem.item_id);
                    });
                }
            });
        });

        it('should validate consistency without issues', () => {
            const issues = demoData.validateConsistency();
            expect(issues).toEqual([]);
        });

        it('should have proper item usage in recipes', () => {
            const items = demoData.getIngredients();
            const recipes = demoData.getRecipes();
            
            // Some items should be used in recipes
            const usedItemIds = new Set();
            recipes.forEach(recipe => {
                if (recipe.items) {
                    recipe.items.forEach(recipeItem => {
                        usedItemIds.add(recipeItem.item_id);
                    });
                }
            });
            
            expect(usedItemIds.size).toBeGreaterThan(0);
            
            // Verify used items exist in items list
            const itemIds = items.map(item => item.id);
            usedItemIds.forEach(usedId => {
                expect(itemIds).toContain(usedId);
            });
        });
    });

    describe('Recipe Ingredient Relationships', () => {
        it('should have recipes with proper item quantities', () => {
            const recipes = demoData.getRecipes();
            
            recipes.forEach(recipe => {
                if (recipe.items) {
                    expect(recipe.items.length).toBeGreaterThan(0);
                    
                    recipe.items.forEach(recipeItem => {
                        expect(recipeItem).toHaveProperty('item_id');
                        expect(recipeItem).toHaveProperty('quantity');
                        expect(recipeItem).toHaveProperty('unit');
                        expect(recipeItem.quantity).toBeGreaterThan(0);
                    });
                }
            });
        });

        it('should have realistic serving sizes', () => {
            const recipes = demoData.getRecipes();
            
            recipes.forEach(recipe => {
                expect(recipe.servings).toBeGreaterThan(0);
                expect(recipe.servings).toBeLessThanOrEqual(10); // Reasonable family size
            });
        });

        it('should have reasonable prep and cook times', () => {
            const recipes = demoData.getRecipes();
            
            recipes.forEach(recipe => {
                expect(recipe.prep_time).toBeGreaterThanOrEqual(0);
                expect(recipe.cook_time).toBeGreaterThanOrEqual(0);
                expect(recipe.prep_time).toBeLessThan(180); // Less than 3 hours prep
                expect(recipe.cook_time).toBeLessThan(300); // Less than 5 hours cook
            });
        });
    });

    describe('Scheduled Meals', () => {
        it('should have meals scheduled for multiple days', () => {
            const scheduledMeals = demoData.getScheduledMeals();
            const dates = [...new Set(scheduledMeals.map(meal => meal.date))];
            
            expect(dates.length).toBeGreaterThan(1);
        });

        it('should have meals for different meal types', () => {
            const scheduledMeals = demoData.getScheduledMeals();
            const mealTypes = [...new Set(scheduledMeals.map(meal => meal.meal_type))];
            
            expect(mealTypes).toContain('breakfast');
            expect(mealTypes).toContain('lunch');
            expect(mealTypes).toContain('dinner');
        });

        it('should have valid date formats', () => {
            const scheduledMeals = demoData.getScheduledMeals();
            
            scheduledMeals.forEach(meal => {
                // Should be in YYYY-MM-DD format
                expect(meal.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
                
                // Should be a valid date
                const date = new Date(meal.date);
                expect(date.toString()).not.toBe('Invalid Date');
            });
        });
    });

    describe('Nutritional Data', () => {
        it('should have nutritional information for ingredients', () => {
            const ingredients = demoData.getIngredients();
            
            ingredients.forEach(ingredient => {
                expect(ingredient.nutrition).toBeDefined();
                expect(ingredient.nutrition).toHaveProperty('protein');
                expect(ingredient.nutrition).toHaveProperty('carbs');
                expect(ingredient.nutrition).toHaveProperty('fat');
                expect(ingredient.nutrition).toHaveProperty('calories');
                
                // Nutritional values should be non-negative
                expect(ingredient.nutrition.protein).toBeGreaterThanOrEqual(0);
                expect(ingredient.nutrition.carbs).toBeGreaterThanOrEqual(0);
                expect(ingredient.nutrition.fat).toBeGreaterThanOrEqual(0);
                expect(ingredient.nutrition.calories).toBeGreaterThanOrEqual(0);
            });
        });
    });

    describe('Data Utility Methods', () => {
        it('should provide getAllData method', () => {
            const allData = demoData.getAllData();
            
            expect(allData).toHaveProperty('items');
            expect(allData).toHaveProperty('recipes');
            expect(allData).toHaveProperty('scheduledMeals');
            
            expect(allData.items).toBeInstanceOf(Array);
            expect(allData.recipes).toBeInstanceOf(Array);
            expect(allData.scheduledMeals).toBeInstanceOf(Array);
        });

        it('should generate proper date strings', () => {
            const today = demoData.getDateString(0);
            const tomorrow = demoData.getDateString(1);
            
            expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(tomorrow).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            
            // Tomorrow should be one day after today
            const todayDate = new Date(today);
            const tomorrowDate = new Date(tomorrow);
            const dayDiff = (tomorrowDate - todayDate) / (1000 * 60 * 60 * 24);
            expect(dayDiff).toBe(1);
        });
    });

    describe('Search Functionality Support', () => {
        it('should have ingredients with searchable names', () => {
            const ingredients = demoData.getIngredients();
            
            // Test case-insensitive search
            const chickenIngredients = ingredients.filter(ing => 
                ing.name.toLowerCase().includes('chicken')
            );
            expect(chickenIngredients.length).toBeGreaterThan(0);
            
            // Test category filtering
            const produceIngredients = ingredients.filter(ing => 
                ing.category === 'produce'
            );
            expect(produceIngredients.length).toBeGreaterThan(0);
        });

        it('should support recipe filtering by meal type', () => {
            const recipes = demoData.getRecipes();
            
            const breakfastRecipes = recipes.filter(recipe => 
                recipe.meal_type === 'breakfast'
            );
            const dinnerRecipes = recipes.filter(recipe => 
                recipe.meal_type === 'dinner'
            );
            
            expect(breakfastRecipes.length).toBeGreaterThan(0);
            expect(dinnerRecipes.length).toBeGreaterThan(0);
        });
    });
});
