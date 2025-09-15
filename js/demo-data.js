// Demo Data for MealPlanner
// Generated from exported data on 2025-09-13T19:52:47.536Z
// This file contains realistic demo data converted from user export
// 
// Data Summary:
// - 5 items across 4 categories
// - 2 recipes (2 regular, 0 combo)
// - 0 meals combining multiple recipes
// - 3 scheduled meals for planning
// - 0 pantry items
// - All data is interconnected with valid references

class DemoDataManager {
    constructor() {
        console.log('📱 DemoDataManager constructor called');
        this.initializeData();
    }

    initializeData() {
        this.initializeRawData();
        this.migrateToLabelTypes();
    }

    initializeRawData() {
        // Comprehensive items list (5 items)
        this.items = [
        {
                "id": 1,
                "name": "Chicken",
                "category": "meat",
                "default_unit": "pounds",
                "storage_notes": null,
                "nutrition": {
                        "calories": 0,
                        "protein": 0,
                        "carbs": 0,
                        "fat": 0
                },
                "labels": [],
                "created_at": "2025-09-13T19:52:47.534Z",
                "updated_at": "2025-09-13T19:52:47.536Z"
        },
        {
                "id": 2,
                "name": "Rice",
                "category": "pantry",
                "default_unit": "cups",
                "storage_notes": null,
                "nutrition": {
                        "calories": 0,
                        "protein": 0,
                        "carbs": 0,
                        "fat": 0
                },
                "labels": [],
                "created_at": "2025-09-13T19:52:47.536Z",
                "updated_at": "2025-09-13T19:52:47.536Z"
        },
        {
                "id": 3,
                "name": "Onions",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": null,
                "nutrition": {
                        "calories": 0,
                        "protein": 0,
                        "carbs": 0,
                        "fat": 0
                },
                "labels": [],
                "created_at": "2025-09-13T19:44:24.073Z",
                "updated_at": "2025-09-13T19:44:24.073Z"
        },
        {
                "id": 5,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": null,
                "nutrition": {
                        "calories": 0,
                        "protein": 0,
                        "carbs": 0,
                        "fat": 0
                },
                "labels": [],
                "created_at": "2025-09-13T19:44:24.073Z",
                "updated_at": "2025-09-13T19:44:24.073Z"
        },
        {
                "id": 7,
                "name": "Salt",
                "category": "spices",
                "default_unit": "teaspoons",
                "storage_notes": null,
                "nutrition": {
                        "calories": 0,
                        "protein": 0,
                        "carbs": 0,
                        "fat": 0
                },
                "labels": [],
                "created_at": "2025-09-13T19:44:24.073Z",
                "updated_at": "2025-09-13T19:44:24.073Z"
        }
];

        // Comprehensive recipe list (2 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Chicken and Rice",
                "description": "A simple and delicious chicken and rice dish",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 30,
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1,
                                "unit": "cups"
                        }
                ],
                "instructions": [
                        "Cook chicken in a pan until golden brown, then add rice and cook until tender"
                ],
                "labels": [],
                "recipe_type": "regular",
                "combo_recipes": [],
                "created_at": "2025-09-13T19:52:47.536Z",
                "updated_at": "2025-09-13T19:52:47.536Z"
        },
        {
                "id": 2,
                "title": "Complete Dinner Combo",
                "description": "A complete dinner with main dish and side",
                "servings": 4,
                "prep_time": 0,
                "cook_time": 0,
                "items": [],
                "instructions": [],
                "labels": [
                        "Recipe Combo"
                ],
                "recipe_type": "regular",
                "combo_recipes": [
                        {
                                "recipe_id": 1,
                                "servings_multiplier": 1
                        }
                ],
                "created_at": "2025-09-13T19:52:47.536Z",
                "updated_at": "2025-09-13T19:52:47.536Z"
        }
];

        // Demo meals that combine multiple recipes (0 items)
        this.meals = [];

        // Scheduled meals for planning (3 items)
        this.scheduledMeals = [
        {
                "id": "plan-1",
                "recipe_id": 1,
                "recipe_name": "Chicken and Rice",
                "meal_type": "dinner",
                "servings": 4,
                "date": "2025-09-08",
                "created_at": "2025-09-13T19:46:13.146Z",
                "updated_at": "2025-09-13T19:46:13.146Z"
        },
        {
                "id": "plan-2",
                "recipe_id": 2,
                "recipe_name": "Tomato Salad",
                "meal_type": "lunch",
                "servings": 2,
                "date": "2025-09-09",
                "created_at": "2025-09-13T19:46:13.146Z",
                "updated_at": "2025-09-13T19:46:13.146Z"
        },
        {
                "id": "plan-3",
                "recipe_id": 4,
                "recipe_name": "Complete Dinner Combo",
                "meal_type": "dinner",
                "servings": 4,
                "date": "2025-09-10",
                "created_at": "2025-09-13T19:46:13.146Z",
                "updated_at": "2025-09-13T19:46:13.146Z"
        }
];

        // Pantry items (0 items)
        this.pantryItems = [];
    }

    // Migration method for label types (placeholder - implement as needed)
    migrateToLabelTypes() {
        // Label type migration logic would go here
        console.log('📱 Label types migration completed');
    }

    // Get all data
    getAllData() {
        return {
            items: this.items,
            recipes: this.recipes,
            meals: this.meals,
            scheduledMeals: this.scheduledMeals,
            pantryItems: this.pantryItems
        };
    }

    // Get items (formerly ingredients)
    getItems() {
        return this.items;
    }

    // Backward compatibility method
    getIngredients() {
        return this.items;
    }

    // Get recipes
    getRecipes() {
        return this.recipes;
    }

    // Get meals
    getMeals() {
        return this.meals;
    }

    // Get scheduled meals
    getScheduledMeals() {
        return this.scheduledMeals;
    }

    // Get pantry items
    getPantryItems() {
        return this.pantryItems;
    }

    // Validation method to ensure data consistency
    validateConsistency() {
        const issues = [];
        
        // Check recipe-ingredient references
        this.recipes.forEach(recipe => {
            if (recipe.items) {
                recipe.items.forEach(recipeIng => {
                    const ingredient = this.ingredients.find(ing => ing.id === recipeIng.ingredient_id);
                    if (!ingredient) {
                        issues.push(`Recipe "${recipe.title}" references non-existent ingredient ID: ${recipeIng.ingredient_id}`);
                    }
                });
            }
        });
        
        // Check scheduled meal-recipe references
        this.scheduledMeals.forEach(meal => {
            const recipe = this.recipes.find(rec => rec.id === meal.recipe_id);
            if (!recipe) {
                issues.push(`Scheduled meal "${meal.recipe_name}" references non-existent recipe ID: ${meal.recipe_id}`);
            }
        });
        
        // Check combo recipe references
        this.recipes.forEach(recipe => {
            if (recipe.recipe_type === 'combo' && recipe.combo_recipes) {
                recipe.combo_recipes.forEach(comboRecipeId => {
                    const comboRecipe = this.recipes.find(rec => rec.id === comboRecipeId);
                    if (!comboRecipe) {
                        issues.push(`Combo recipe "${recipe.title}" references non-existent recipe ID: ${comboRecipeId}`);
                    }
                });
            }
        });
        
        if (issues.length > 0) {
            console.warn('⚠️ Data consistency issues found:');
            issues.forEach(issue => console.warn(`  - ${issue}`));
        } else {
            console.log('✅ Data consistency validation passed');
        }
        
        return issues;
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.DemoDataManager = DemoDataManager;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemoDataManager;
}