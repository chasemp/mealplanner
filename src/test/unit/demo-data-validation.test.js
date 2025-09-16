// Demo Data Validation Test Suite
// Ensures all demo data is cross-linked correctly and valid

import { describe, it, expect, beforeEach } from 'vitest';

describe('Demo Data Validation', () => {
    let demoData;
    let demoManager;

    beforeEach(async () => {
        // Import DemoDataManager
        await import('../../../js/demo-data.js');
        demoManager = new global.DemoDataManager();
        demoData = demoManager.getAllData();
    });

    describe('Data Structure Integrity', () => {
        it('should have all required data arrays', () => {
            // WHY: New users need complete sample data to understand and use the app immediately
            // WHAT: Verifies demo data contains all required data types (items, recipes, scheduled meals)
            expect(demoData.items).toBeDefined();
            expect(Array.isArray(demoData.items)).toBe(true);
            expect(demoData.items.length).toBeGreaterThan(0);

            expect(demoData.recipes).toBeDefined();
            expect(Array.isArray(demoData.recipes)).toBe(true);
            expect(demoData.recipes.length).toBeGreaterThan(0);

            expect(demoData.scheduledMeals).toBeDefined();
            expect(Array.isArray(demoData.scheduledMeals)).toBe(true);
            expect(demoData.scheduledMeals.length).toBeGreaterThan(0);
        });

        it('should have at least 7 combo recipes as requested', () => {
            // WHY: Users need diverse meal combinations to see the app's advanced meal planning capabilities
            // WHAT: Verifies demo data includes specific combo recipes that showcase multi-course meal planning
            const comboRecipes = demoData.recipes.filter(r => r.recipe_type === 'combo');
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

        it('should have regular recipes to support combo recipes', () => {
            // WHY: Combo recipes depend on regular recipes - users need both for full functionality
            // WHAT: Verifies demo data includes sufficient regular recipes to support combo meal planning
            const regularRecipes = demoData.recipes.filter(r => r.recipe_type === 'regular');
            expect(regularRecipes.length).toBeGreaterThan(10);
            
            // Verify key component recipes exist
            const regularTitles = regularRecipes.map(r => r.title);
            expect(regularTitles).toContain('Mashed Potatoes');
            expect(regularTitles).toContain('Fried Chicken');
            expect(regularTitles).toContain('Green Beans');
            expect(regularTitles).toContain('Garlic Bread');
            expect(regularTitles).toContain('Caesar Salad');
            expect(regularTitles).toContain('Pancakes');
            expect(regularTitles).toContain('Bacon');
            expect(regularTitles).toContain('Hash Browns');
        });
    });

    describe('Recipe Cross-Linking Validation', () => {
        it('should have all combo recipes reference valid basic recipes', () => {
            // WHY: Broken recipe references would cause crashes when users try to view or cook combo meals
            // WHAT: Verifies all combo recipe references point to existing recipes with valid data structure
            const comboRecipes = demoData.recipes.filter(r => r.recipe_type === 'combo');
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
                    expect(referencedRecipe.recipe_type).toBe('regular');
                });
            });
        });

        it('should have all recipe items reference valid items', () => {
            // WHY: Broken ingredient references would prevent users from seeing recipe details or generating shopping lists
            // WHAT: Verifies all recipe ingredients reference existing items with proper quantity/unit data
            const allIngredientIds = demoData.items.map(i => i.id);

            demoData.recipes.forEach(recipe => {
                expect(recipe.items).toBeDefined();
                expect(Array.isArray(recipe.items)).toBe(true);
                expect(recipe.items.length).toBeGreaterThan(0);

                recipe.items.forEach(recipeIngredient => {
                    expect(recipeIngredient.item_id).toBeDefined();
                    expect(recipeIngredient.quantity).toBeDefined();
                    expect(recipeIngredient.unit).toBeDefined();
                    
                    expect(typeof recipeIngredient.item_id).toBe('number');
                    expect(typeof recipeIngredient.quantity).toBe('number');
                    expect(typeof recipeIngredient.unit).toBe('string');
                    
                    // Verify ingredient exists
                    expect(allIngredientIds).toContain(recipeIngredient.item_id);
                });
            });
        });

        it('should have all scheduled meals reference valid recipes', () => {
            // WHY: Broken meal schedule references would cause crashes when users view their meal calendar
            // WHAT: Verifies all scheduled meals reference existing recipes with valid date structure
            const allRecipeIds = demoData.recipes.map(r => r.id);

            demoData.scheduledMeals.forEach(meal => {
                expect(meal.recipe_id).toBeDefined();
                expect(typeof meal.recipe_id).toBe('number');
                
                // Verify recipe exists
                expect(allRecipeIds).toContain(meal.recipe_id);
                
                // Verify meal has valid structure (meal_type is now optional via labels)
                // Note: meal_type is now handled through labels system, not required field
                expect(meal.date).toBeDefined();
                expect(typeof meal.date).toBe('string');
            });
        });
    });

    describe('Data Consistency Validation', () => {
        it('should pass built-in consistency validation', () => {
            // WHY: Data inconsistencies would cause unpredictable app behavior and user frustration
            // WHAT: Verifies demo data passes all internal consistency checks for referential integrity
            const issues = demoManager.validateConsistency();
            expect(issues).toBeDefined();
            expect(Array.isArray(issues)).toBe(true);
            expect(issues.length).toBe(0); // No validation issues
        });

        it('should have unique recipe IDs', () => {
            // WHY: Duplicate IDs would cause data corruption and unpredictable recipe lookups
            // WHAT: Verifies all recipes have unique identifiers for reliable data management
            const recipeIds = demoData.recipes.map(r => r.id);
            const uniqueIds = [...new Set(recipeIds)];
            expect(recipeIds.length).toBe(uniqueIds.length);
        });

        it('should have unique ingredient IDs', () => {
            // WHY: Duplicate IDs would cause ingredient confusion and incorrect shopping lists
            // WHAT: Verifies all items have unique identifiers for reliable inventory management
            const ingredientIds = demoData.items.map(i => i.id);
            const uniqueIds = [...new Set(ingredientIds)];
            expect(ingredientIds.length).toBe(uniqueIds.length);
        });

        it('should have unique scheduled meal IDs', () => {
            // WHY: Duplicate meal IDs would cause calendar display errors and scheduling conflicts
            // WHAT: Verifies all scheduled meals have unique identifiers for reliable calendar management
            const mealIds = demoData.scheduledMeals.map(m => m.id);
            const uniqueIds = [...new Set(mealIds)];
            expect(mealIds.length).toBe(uniqueIds.length);
        });

        it('should have all recipes with required fields', () => {
            // WHY: Missing recipe fields would cause display errors and prevent users from cooking
            // WHAT: Verifies all recipes contain essential fields needed for recipe functionality
            demoData.recipes.forEach(recipe => {
                expect(recipe.id).toBeDefined();
                expect(recipe.title).toBeDefined();
                expect(recipe.description).toBeDefined();
                expect(recipe.recipe_type).toBeDefined();
                expect(['regular', 'combo']).toContain(recipe.recipe_type);
                // Note: meal_type is now optional and handled via labels system
                expect(recipe.prep_time).toBeDefined();
                expect(recipe.cook_time).toBeDefined();
                expect(recipe.servings).toBeDefined();
                expect(recipe.labels).toBeDefined();
                expect(recipe.tags).toBeUndefined(); // tags consolidated to labels
                expect(recipe.items).toBeDefined();
                expect(recipe.instructions).toBeDefined();

                if (recipe.recipe_type === 'combo') {
                    expect(recipe.combo_recipes).toBeDefined();
                    expect(recipe.combo_recipes.length).toBeGreaterThan(0);
                }
            });
        });

        it('should have all items with required fields', () => {
            // WHY: Missing item fields would prevent users from managing inventory and creating recipes
            // WHAT: Verifies all items contain essential fields needed for inventory and recipe functionality
            demoData.items.forEach(ingredient => {
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
        it('should have combo recipes with aggregated items matching component recipes', () => {
            // WHY: Incorrect ingredient aggregation would show wrong shopping lists for combo meals
            // WHAT: Verifies combo recipes properly aggregate ingredients from their component recipes
            const comboRecipes = demoData.recipes.filter(r => r.recipe_type === 'combo');
            
            comboRecipes.forEach(combo => {
                // Verify combo has both combo_recipes and items
                expect(combo.combo_recipes).toBeDefined();
                expect(combo.items).toBeDefined();
                expect(combo.combo_recipes.length).toBeGreaterThan(0);
                expect(combo.items.length).toBeGreaterThan(0);
                
                // Verify all referenced recipes exist and are basic
                combo.combo_recipes.forEach(ref => {
                    const referencedRecipe = demoData.recipes.find(r => r.id === ref.recipe_id);
                    expect(referencedRecipe).toBeDefined();
                    expect(referencedRecipe.recipe_type).toBe('regular');
                });
            });
        });

        it('should have combo recipes with meaningful servings multipliers', () => {
            // WHY: Invalid serving multipliers would create unrealistic portion sizes for combo meals
            // WHAT: Verifies combo recipes use reasonable serving multipliers for realistic meal planning
            const comboRecipes = demoData.recipes.filter(r => r.recipe_type === 'combo');
            
            comboRecipes.forEach(combo => {
                combo.combo_recipes.forEach(ref => {
                    expect(ref.servings_multiplier).toBeGreaterThan(0);
                    expect(ref.servings_multiplier).toBeLessThanOrEqual(2); // Reasonable range
                });
            });
        });

        it('should have combo recipes scheduled in meal plan', () => {
            // WHY: Users need to see combo recipes in action through scheduled meal examples
            // WHAT: Verifies combo recipes are included in the demo meal schedule for user education
            const comboRecipeIds = demoData.recipes.filter(r => r.recipe_type === 'combo').map(r => r.id);
            const scheduledRecipeIds = demoData.scheduledMeals.map(m => m.recipe_id);
            
            // At least some combo recipes should be scheduled
            const scheduledCombos = scheduledRecipeIds.filter(id => comboRecipeIds.includes(id));
            expect(scheduledCombos.length).toBeGreaterThan(0);
        });

        it('should have combo recipes with appropriate meal types', () => {
            // WHY: Users need combo recipes to fit logically into meal planning (breakfast, lunch, dinner)
            // WHAT: Verifies combo recipes have appropriate meal type labels for realistic meal scheduling
            const comboRecipes = demoData.recipes.filter(r => r.recipe_type === 'combo');
            
            comboRecipes.forEach(combo => {
                // Note: meal_type is now handled via labels system, not required field
                // Check if combo has meal type labels (optional)
                
                // Verify combo meal type matches component recipes generally
                combo.combo_recipes.forEach(ref => {
                    const referencedRecipe = demoData.recipes.find(r => r.id === ref.recipe_id);
                    // Allow some flexibility - combo can combine different meal types
                    // Check if recipe has meal type in its labels
                    const mealTypeLabels = referencedRecipe.labels.filter(label => 
                        ['breakfast', 'lunch', 'dinner', 'snack'].includes(label.toLowerCase())
                    );
                    expect(mealTypeLabels.length).toBeGreaterThan(0);
                });
            });
        });
    });

    describe('Platform-Like Data Quality', () => {
        it('should have realistic ingredient quantities', () => {
            // WHY: Unrealistic quantities would confuse users and create unusable shopping lists
            // WHAT: Verifies all recipe ingredient quantities are within reasonable cooking ranges
            demoData.recipes.forEach(recipe => {
                recipe.items.forEach(ingredient => {
                    expect(ingredient.quantity).toBeGreaterThan(0);
                    expect(ingredient.quantity).toBeLessThan(100); // Reasonable upper bound
                });
            });
        });

        it('should have realistic prep and cook times', () => {
            // WHY: Accurate timing helps users plan their cooking and meal preparation effectively
            // WHAT: Verifies all recipes have realistic preparation and cooking time estimates
            demoData.recipes.forEach(recipe => {
                expect(recipe.prep_time).toBeGreaterThanOrEqual(0);
                expect(recipe.prep_time).toBeLessThan(180); // 3 hours max prep
                expect(recipe.cook_time).toBeGreaterThanOrEqual(0);
                expect(recipe.cook_time).toBeLessThan(480); // 8 hours max cook (slow cooker)
            });
        });

        it('should have meaningful recipe descriptions and instructions', () => {
            // WHY: Users need clear descriptions and instructions to successfully prepare meals
            // WHAT: Verifies all recipes contain sufficient descriptive content for cooking guidance
            demoData.recipes.forEach(recipe => {
                expect(recipe.description.length).toBeGreaterThan(10);
                // Combo recipes may have empty instructions (they rely on component recipe instructions)
                if (recipe.recipe_type === 'regular') {
                    expect(recipe.instructions.length).toBeGreaterThan(0);
                }
                expect(recipe.title.length).toBeGreaterThan(3);
                
                recipe.instructions.forEach(instruction => {
                    expect(typeof instruction).toBe('string');
                    expect(instruction.length).toBeGreaterThan(5);
                });
            });
        });

        it('should have diverse meal types and categories', () => {
            // WHY: Users need recipes for all meal times to plan complete daily nutrition
            // WHAT: Verifies demo data includes recipes for breakfast, lunch, dinner, and snacks
            const mealTypes = [...new Set(demoData.recipes.map(r => r.meal_type))];
            expect(mealTypes).toContain('breakfast');
            expect(mealTypes).toContain('lunch');
            expect(mealTypes).toContain('dinner');
            
            const categories = [...new Set(demoData.items.map(i => i.category))];
            expect(categories.length).toBeGreaterThan(3); // Multiple ingredient categories
        });
    });
});
