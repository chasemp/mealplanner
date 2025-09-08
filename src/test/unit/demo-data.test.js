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
                expect(recipe).toHaveProperty('meal_type');
                expect(recipe).toHaveProperty('prep_time');
                expect(recipe).toHaveProperty('cook_time');
                expect(recipe).toHaveProperty('instructions');
                expect(recipe).toHaveProperty('ingredients');
                expect(recipe.ingredients).toBeInstanceOf(Array);
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

        it('should have all recipe ingredients reference existing ingredients', () => {
            const ingredients = demoData.getIngredients();
            const recipes = demoData.getRecipes();
            const ingredientIds = ingredients.map(ing => ing.id);
            
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(recipeIngredient => {
                    expect(ingredientIds).toContain(recipeIngredient.ingredient_id);
                });
            });
        });

        it('should validate consistency without issues', () => {
            const issues = demoData.validateConsistency();
            expect(issues).toEqual([]);
        });

        it('should have proper ingredient usage statistics', () => {
            const ingredients = demoData.getIngredients();
            
            // Some ingredients should be used in recipes
            const usedIngredients = ingredients.filter(ing => ing.recipe_count > 0);
            expect(usedIngredients.length).toBeGreaterThan(0);
            
            // Check that usage counts are reasonable
            usedIngredients.forEach(ingredient => {
                expect(ingredient.recipe_count).toBeGreaterThan(0);
                expect(ingredient.avg_quantity).toBeGreaterThan(0);
            });
        });
    });

    describe('Recipe Ingredient Relationships', () => {
        it('should have recipes with proper ingredient quantities', () => {
            const recipes = demoData.getRecipes();
            
            recipes.forEach(recipe => {
                expect(recipe.ingredients.length).toBeGreaterThan(0);
                
                recipe.ingredients.forEach(ingredient => {
                    expect(ingredient).toHaveProperty('ingredient_id');
                    expect(ingredient).toHaveProperty('quantity');
                    expect(ingredient).toHaveProperty('unit');
                    expect(ingredient.quantity).toBeGreaterThan(0);
                });
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
            
            expect(allData).toHaveProperty('ingredients');
            expect(allData).toHaveProperty('recipes');
            expect(allData).toHaveProperty('scheduledMeals');
            
            expect(allData.ingredients).toBeInstanceOf(Array);
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
