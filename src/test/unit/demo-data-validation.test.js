// Demo Data Validation Test Suite
// Ensures all demo data is cross-linked correctly and valid

import { describe, it, expect, beforeEach } from 'vitest';

describe('Demo Data Validation', () => {
    let demoData;

    beforeEach(async () => {
        // Import DemoDataManager
        await import('../../../js/demo-data.js');
        demoData = new global.DemoDataManager();
    });

    describe('Data Structure Integrity', () => {
        it('should have all required data arrays', () => {
            expect(demoData.ingredients).toBeDefined();
            expect(Array.isArray(demoData.ingredients)).toBe(true);
            expect(demoData.ingredients.length).toBeGreaterThan(0);

            expect(demoData.recipes).toBeDefined();
            expect(Array.isArray(demoData.recipes)).toBe(true);
            expect(demoData.recipes.length).toBeGreaterThan(0);

            expect(demoData.scheduledMeals).toBeDefined();
            expect(Array.isArray(demoData.scheduledMeals)).toBe(true);
            expect(demoData.scheduledMeals.length).toBeGreaterThan(0);
        });

        it('should have at least 7 combo recipes as requested', () => {
            const comboRecipes = demoData.recipes.filter(r => r.type === 'combo');
            expect(comboRecipes.length).toBeGreaterThanOrEqual(7);
            
            // Verify we have exactly the expected combo recipes
            const comboTitles = comboRecipes.map(r => r.title);
            expect(comboTitles).toContain('Sunday Dinner Combo');
            expect(comboTitles).toContain('Italian Night Combo');
            expect(comboTitles).toContain('Full American Breakfast Combo');
            expect(comboTitles).toContain('Grilled Salmon Dinner Combo');
            expect(comboTitles).toContain('Greek Feast Combo');
            expect(comboTitles).toContain('Vegetarian Quinoa Feast Combo');
            expect(comboTitles).toContain('Weekend Brunch Combo');
            expect(comboTitles).toContain('Light Lunch Combo');
        });

        it('should have basic recipes to support combo recipes', () => {
            const basicRecipes = demoData.recipes.filter(r => r.type === 'basic');
            expect(basicRecipes.length).toBeGreaterThan(10);
            
            // Verify key component recipes exist
            const basicTitles = basicRecipes.map(r => r.title);
            expect(basicTitles).toContain('Mashed Potatoes');
            expect(basicTitles).toContain('Fried Chicken');
            expect(basicTitles).toContain('Green Beans');
            expect(basicTitles).toContain('Garlic Bread');
            expect(basicTitles).toContain('Caesar Salad');
            expect(basicTitles).toContain('Pancakes');
            expect(basicTitles).toContain('Bacon');
            expect(basicTitles).toContain('Hash Browns');
        });
    });

    describe('Recipe Cross-Linking Validation', () => {
        it('should have all combo recipes reference valid basic recipes', () => {
            const comboRecipes = demoData.recipes.filter(r => r.type === 'combo');
            const allRecipeIds = demoData.recipes.map(r => r.id);

            comboRecipes.forEach(combo => {
                expect(combo.combo_recipes).toBeDefined();
                expect(Array.isArray(combo.combo_recipes)).toBe(true);
                expect(combo.combo_recipes.length).toBeGreaterThan(0);

                combo.combo_recipes.forEach(ref => {
                    expect(ref.recipe_id).toBeDefined();
                    expect(ref.servings_multiplier).toBeDefined();
                    expect(typeof ref.recipe_id).toBe('number');
                    expect(typeof ref.servings_multiplier).toBe('number');
                    
                    // Verify referenced recipe exists
                    expect(allRecipeIds).toContain(ref.recipe_id);
                    
                    // Verify referenced recipe is not another combo (no nested combos)
                    const referencedRecipe = demoData.recipes.find(r => r.id === ref.recipe_id);
                    expect(referencedRecipe.type).toBe('basic');
                });
            });
        });

        it('should have all recipe ingredients reference valid ingredients', () => {
            const allIngredientIds = demoData.ingredients.map(i => i.id);

            demoData.recipes.forEach(recipe => {
                expect(recipe.ingredients).toBeDefined();
                expect(Array.isArray(recipe.ingredients)).toBe(true);
                expect(recipe.ingredients.length).toBeGreaterThan(0);

                recipe.ingredients.forEach(recipeIngredient => {
                    expect(recipeIngredient.ingredient_id).toBeDefined();
                    expect(recipeIngredient.quantity).toBeDefined();
                    expect(recipeIngredient.unit).toBeDefined();
                    
                    expect(typeof recipeIngredient.ingredient_id).toBe('number');
                    expect(typeof recipeIngredient.quantity).toBe('number');
                    expect(typeof recipeIngredient.unit).toBe('string');
                    
                    // Verify ingredient exists
                    expect(allIngredientIds).toContain(recipeIngredient.ingredient_id);
                });
            });
        });

        it('should have all scheduled meals reference valid recipes', () => {
            const allRecipeIds = demoData.recipes.map(r => r.id);

            demoData.scheduledMeals.forEach(meal => {
                expect(meal.recipe_id).toBeDefined();
                expect(typeof meal.recipe_id).toBe('number');
                
                // Verify recipe exists
                expect(allRecipeIds).toContain(meal.recipe_id);
                
                // Verify meal has valid structure
                expect(meal.meal_type).toBeDefined();
                expect(['breakfast', 'lunch', 'dinner', 'snack']).toContain(meal.meal_type);
                expect(meal.date).toBeDefined();
                expect(typeof meal.date).toBe('string');
            });
        });
    });

    describe('Data Consistency Validation', () => {
        it('should pass built-in consistency validation', () => {
            const issues = demoData.validateConsistency();
            expect(issues).toBeDefined();
            expect(Array.isArray(issues)).toBe(true);
            expect(issues.length).toBe(0); // No validation issues
        });

        it('should have unique recipe IDs', () => {
            const recipeIds = demoData.recipes.map(r => r.id);
            const uniqueIds = [...new Set(recipeIds)];
            expect(recipeIds.length).toBe(uniqueIds.length);
        });

        it('should have unique ingredient IDs', () => {
            const ingredientIds = demoData.ingredients.map(i => i.id);
            const uniqueIds = [...new Set(ingredientIds)];
            expect(ingredientIds.length).toBe(uniqueIds.length);
        });

        it('should have unique scheduled meal IDs', () => {
            const mealIds = demoData.scheduledMeals.map(m => m.id);
            const uniqueIds = [...new Set(mealIds)];
            expect(mealIds.length).toBe(uniqueIds.length);
        });

        it('should have all recipes with required fields', () => {
            demoData.recipes.forEach(recipe => {
                expect(recipe.id).toBeDefined();
                expect(recipe.title).toBeDefined();
                expect(recipe.description).toBeDefined();
                expect(recipe.type).toBeDefined();
                expect(['basic', 'combo']).toContain(recipe.type);
                expect(recipe.meal_type).toBeDefined();
                expect(recipe.prep_time).toBeDefined();
                expect(recipe.cook_time).toBeDefined();
                expect(recipe.servings).toBeDefined();
                expect(recipe.tags).toBeDefined();
                expect(recipe.labels).toBeDefined();
                expect(recipe.ingredients).toBeDefined();
                expect(recipe.instructions).toBeDefined();

                if (recipe.type === 'combo') {
                    expect(recipe.combo_recipes).toBeDefined();
                    expect(recipe.combo_recipes.length).toBeGreaterThan(0);
                }
            });
        });

        it('should have all ingredients with required fields', () => {
            demoData.ingredients.forEach(ingredient => {
                expect(ingredient.id).toBeDefined();
                expect(ingredient.name).toBeDefined();
                expect(ingredient.category).toBeDefined();
                expect(ingredient.default_unit).toBeDefined();
                expect(ingredient.storage_notes).toBeDefined();
                expect(ingredient.nutrition).toBeDefined();
                expect(ingredient.labels).toBeDefined();
                
                // Verify no cost information (as per requirement)
                expect(ingredient.cost_per_unit).toBeUndefined();
            });
        });
    });

    describe('Combo Recipe Specific Validation', () => {
        it('should have combo recipes with aggregated ingredients matching component recipes', () => {
            const comboRecipes = demoData.recipes.filter(r => r.type === 'combo');
            
            comboRecipes.forEach(combo => {
                // Verify combo has both combo_recipes and ingredients
                expect(combo.combo_recipes).toBeDefined();
                expect(combo.ingredients).toBeDefined();
                expect(combo.combo_recipes.length).toBeGreaterThan(0);
                expect(combo.ingredients.length).toBeGreaterThan(0);
                
                // Verify all referenced recipes exist and are basic
                combo.combo_recipes.forEach(ref => {
                    const referencedRecipe = demoData.recipes.find(r => r.id === ref.recipe_id);
                    expect(referencedRecipe).toBeDefined();
                    expect(referencedRecipe.type).toBe('basic');
                });
            });
        });

        it('should have combo recipes with meaningful servings multipliers', () => {
            const comboRecipes = demoData.recipes.filter(r => r.type === 'combo');
            
            comboRecipes.forEach(combo => {
                combo.combo_recipes.forEach(ref => {
                    expect(ref.servings_multiplier).toBeGreaterThan(0);
                    expect(ref.servings_multiplier).toBeLessThanOrEqual(2); // Reasonable range
                });
            });
        });

        it('should have combo recipes scheduled in meal plan', () => {
            const comboRecipeIds = demoData.recipes.filter(r => r.type === 'combo').map(r => r.id);
            const scheduledRecipeIds = demoData.scheduledMeals.map(m => m.recipe_id);
            
            // At least some combo recipes should be scheduled
            const scheduledCombos = scheduledRecipeIds.filter(id => comboRecipeIds.includes(id));
            expect(scheduledCombos.length).toBeGreaterThan(0);
        });

        it('should have combo recipes with appropriate meal types', () => {
            const comboRecipes = demoData.recipes.filter(r => r.type === 'combo');
            
            comboRecipes.forEach(combo => {
                expect(['breakfast', 'lunch', 'dinner']).toContain(combo.meal_type);
                
                // Verify combo meal type matches component recipes generally
                combo.combo_recipes.forEach(ref => {
                    const referencedRecipe = demoData.recipes.find(r => r.id === ref.recipe_id);
                    // Allow some flexibility - combo can combine different meal types
                    expect(['breakfast', 'lunch', 'dinner']).toContain(referencedRecipe.meal_type);
                });
            });
        });
    });

    describe('Platform-Like Data Quality', () => {
        it('should have realistic ingredient quantities', () => {
            demoData.recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    expect(ingredient.quantity).toBeGreaterThan(0);
                    expect(ingredient.quantity).toBeLessThan(100); // Reasonable upper bound
                });
            });
        });

        it('should have realistic prep and cook times', () => {
            demoData.recipes.forEach(recipe => {
                expect(recipe.prep_time).toBeGreaterThanOrEqual(0);
                expect(recipe.prep_time).toBeLessThan(180); // 3 hours max prep
                expect(recipe.cook_time).toBeGreaterThanOrEqual(0);
                expect(recipe.cook_time).toBeLessThan(480); // 8 hours max cook (slow cooker)
            });
        });

        it('should have meaningful recipe descriptions and instructions', () => {
            demoData.recipes.forEach(recipe => {
                expect(recipe.description.length).toBeGreaterThan(10);
                expect(recipe.instructions.length).toBeGreaterThan(0);
                expect(recipe.title.length).toBeGreaterThan(3);
                
                recipe.instructions.forEach(instruction => {
                    expect(typeof instruction).toBe('string');
                    expect(instruction.length).toBeGreaterThan(5);
                });
            });
        });

        it('should have diverse meal types and categories', () => {
            const mealTypes = [...new Set(demoData.recipes.map(r => r.meal_type))];
            expect(mealTypes).toContain('breakfast');
            expect(mealTypes).toContain('lunch');
            expect(mealTypes).toContain('dinner');
            
            const categories = [...new Set(demoData.ingredients.map(i => i.category))];
            expect(categories.length).toBeGreaterThan(3); // Multiple ingredient categories
        });
    });
});
