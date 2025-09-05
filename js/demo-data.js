// Centralized Demo Data for MealPlanner
// Ensures consistency between recipes, ingredients, and scheduled meals

console.log('📱 Demo Data Script Loading...');

class DemoDataManager {
    constructor() {
        console.log('📱 DemoDataManager constructor called');
        this.initializeData();
    }

    initializeData() {
        // Comprehensive ingredient list
        this.ingredients = [
            // Proteins
            { id: 1, name: 'Chicken Breast', category: 'meat', default_unit: 'lbs', cost_per_unit: 6.99, storage_notes: 'Refrigerate, use within 3 days', nutrition: { protein: 31, carbs: 0, fat: 3.6, calories: 165 }, labels: ['protein', 'lean', 'versatile', 'popular'] },
            { id: 2, name: 'Ground Beef', category: 'meat', default_unit: 'lbs', cost_per_unit: 5.49, storage_notes: 'Refrigerate, use within 2 days', nutrition: { protein: 26, carbs: 0, fat: 15, calories: 250 }, labels: ['protein', 'hearty', 'comfort-food', 'versatile'] },
            { id: 3, name: 'Salmon Fillet', category: 'meat', default_unit: 'lbs', cost_per_unit: 12.99, storage_notes: 'Refrigerate, use within 2 days', nutrition: { protein: 25, carbs: 0, fat: 11, calories: 206 }, labels: ['protein', 'omega-3', 'healthy-fats', 'premium', 'fish'] },
            { id: 4, name: 'Eggs', category: 'dairy', default_unit: 'dozen', cost_per_unit: 3.49, storage_notes: 'Refrigerate', nutrition: { protein: 6, carbs: 0.6, fat: 5, calories: 70 }, labels: ['protein', 'breakfast', 'versatile', 'affordable'] },
            { id: 5, name: 'Tofu', category: 'meat', default_unit: 'lbs', cost_per_unit: 3.99, storage_notes: 'Refrigerate after opening', nutrition: { protein: 8, carbs: 2, fat: 4, calories: 70 }, labels: ['protein', 'vegan', 'vegetarian', 'soy', 'healthy'] },

            // Vegetables
            { id: 6, name: 'Broccoli', category: 'produce', default_unit: 'lbs', cost_per_unit: 2.99, storage_notes: 'Refrigerate', nutrition: { protein: 3, carbs: 6, fat: 0.4, calories: 25 }, labels: ['vegetable', 'healthy', 'vitamin-c', 'fiber', 'green'] },
            { id: 7, name: 'Carrots', category: 'produce', default_unit: 'lbs', cost_per_unit: 1.49, storage_notes: 'Refrigerate', nutrition: { protein: 0.9, carbs: 10, fat: 0.2, calories: 41 }, labels: ['vegetable', 'healthy', 'vitamin-a', 'sweet', 'orange', 'affordable'] },
            { id: 8, name: 'Bell Peppers', category: 'produce', default_unit: 'pieces', cost_per_unit: 1.99, storage_notes: 'Refrigerate', nutrition: { protein: 1, carbs: 7, fat: 0.3, calories: 31 }, labels: ['vegetable', 'colorful', 'vitamin-c', 'crunchy', 'versatile'] },
            { id: 9, name: 'Onions', category: 'produce', default_unit: 'lbs', cost_per_unit: 1.29, storage_notes: 'Store in cool, dry place', nutrition: { protein: 1.1, carbs: 9.3, fat: 0.1, calories: 40 }, labels: ['vegetable', 'flavor-base', 'aromatic', 'versatile', 'affordable', 'staple'] },
            { id: 10, name: 'Garlic', category: 'produce', default_unit: 'pieces', cost_per_unit: 0.99, storage_notes: 'Store in cool, dry place', nutrition: { protein: 0.6, carbs: 3, fat: 0, calories: 13 }, labels: ['aromatic', 'flavor-base', 'medicinal', 'staple', 'pungent'] },
            { id: 11, name: 'Spinach', category: 'produce', default_unit: 'lbs', cost_per_unit: 3.99, storage_notes: 'Refrigerate', nutrition: { protein: 2.9, carbs: 3.6, fat: 0.4, calories: 23 }, labels: ['leafy-green', 'healthy', 'iron', 'vitamin-k', 'versatile'] },
            { id: 12, name: 'Tomatoes', category: 'produce', default_unit: 'lbs', cost_per_unit: 2.49, storage_notes: 'Store at room temperature', nutrition: { protein: 0.9, carbs: 3.9, fat: 0.2, calories: 18 }, labels: ['vegetable', 'fruit', 'umami', 'versatile', 'lycopene'] },

            // Grains & Starches
            { id: 13, name: 'Rice', category: 'grains', default_unit: 'lbs', cost_per_unit: 2.99, storage_notes: 'Store in airtight container', nutrition: { protein: 2.7, carbs: 28, fat: 0.3, calories: 130 }, labels: ['grain', 'staple', 'carbs', 'gluten-free', 'versatile', 'affordable'] },
            { id: 14, name: 'Pasta', category: 'grains', default_unit: 'lbs', cost_per_unit: 1.99, storage_notes: 'Store in cool, dry place', nutrition: { protein: 5, carbs: 31, fat: 0.9, calories: 131 }, labels: ['grain', 'carbs', 'italian', 'comfort-food', 'versatile'] },
            { id: 15, name: 'Bread', category: 'grains', default_unit: 'loaves', cost_per_unit: 2.49, storage_notes: 'Store at room temperature', nutrition: { protein: 3.6, carbs: 12, fat: 1.2, calories: 69 }, labels: ['grain', 'carbs', 'breakfast', 'staple', 'comfort-food'] },
            { id: 16, name: 'Potatoes', category: 'produce', default_unit: 'lbs', cost_per_unit: 1.99, storage_notes: 'Store in cool, dark place', nutrition: { protein: 2, carbs: 17, fat: 0.1, calories: 77 }, labels: ['starch', 'carbs', 'versatile', 'comfort-food', 'affordable', 'filling'] },
            { id: 17, name: 'Quinoa', category: 'grains', default_unit: 'lbs', cost_per_unit: 5.99, storage_notes: 'Store in airtight container', nutrition: { protein: 4.4, carbs: 22, fat: 1.9, calories: 120 }, labels: ['grain', 'superfood', 'protein', 'gluten-free', 'healthy', 'premium'] },

            // Dairy
            { id: 18, name: 'Milk', category: 'dairy', default_unit: 'gallons', cost_per_unit: 3.99, storage_notes: 'Refrigerate', nutrition: { protein: 3.4, carbs: 5, fat: 3.3, calories: 61 } },
            { id: 19, name: 'Cheese', category: 'dairy', default_unit: 'lbs', cost_per_unit: 6.99, storage_notes: 'Refrigerate', nutrition: { protein: 25, carbs: 1, fat: 33, calories: 402 } },
            { id: 20, name: 'Yogurt', category: 'dairy', default_unit: 'containers', cost_per_unit: 4.99, storage_notes: 'Refrigerate', nutrition: { protein: 10, carbs: 12, fat: 4, calories: 100 } },
            { id: 21, name: 'Butter', category: 'dairy', default_unit: 'lbs', cost_per_unit: 4.49, storage_notes: 'Refrigerate', nutrition: { protein: 0.9, carbs: 0.1, fat: 81, calories: 717 } },

            // Pantry Items
            { id: 22, name: 'Olive Oil', category: 'pantry', default_unit: 'bottles', cost_per_unit: 7.99, storage_notes: 'Store in cool, dark place', nutrition: { protein: 0, carbs: 0, fat: 14, calories: 119 }, labels: ['oil', 'healthy-fats', 'mediterranean', 'cooking', 'premium'] },
            { id: 23, name: 'Salt', category: 'pantry', default_unit: 'containers', cost_per_unit: 1.99, storage_notes: 'Store in dry place', nutrition: { protein: 0, carbs: 0, fat: 0, calories: 0 }, labels: ['seasoning', 'essential', 'mineral', 'preservative', 'staple'] },
            { id: 24, name: 'Black Pepper', category: 'pantry', default_unit: 'containers', cost_per_unit: 3.99, storage_notes: 'Store in cool, dry place', nutrition: { protein: 0.1, carbs: 0.6, fat: 0, calories: 3 }, labels: ['spice', 'seasoning', 'pungent', 'staple', 'aromatic'] },
            { id: 25, name: 'Soy Sauce', category: 'pantry', default_unit: 'bottles', cost_per_unit: 2.99, storage_notes: 'Store at room temperature', nutrition: { protein: 1.3, carbs: 0.8, fat: 0, calories: 8 }, labels: ['sauce', 'umami', 'asian', 'salty', 'fermented'] },
            { id: 26, name: 'Lemon', category: 'produce', default_unit: 'pieces', cost_per_unit: 0.79, storage_notes: 'Refrigerate', nutrition: { protein: 0.6, carbs: 5.4, fat: 0.2, calories: 17 }, labels: ['citrus', 'vitamin-c', 'acidic', 'fresh', 'aromatic'] },

            // Herbs & Spices
            { id: 27, name: 'Basil', category: 'produce', default_unit: 'bunches', cost_per_unit: 2.49, storage_notes: 'Refrigerate', nutrition: { protein: 3.2, carbs: 2.6, fat: 0.6, calories: 22 } },
            { id: 28, name: 'Parsley', category: 'produce', default_unit: 'bunches', cost_per_unit: 1.99, storage_notes: 'Refrigerate', nutrition: { protein: 3, carbs: 6.3, fat: 0.8, calories: 36 } },
            { id: 29, name: 'Oregano', category: 'pantry', default_unit: 'containers', cost_per_unit: 2.99, storage_notes: 'Store in cool, dry place', nutrition: { protein: 9, carbs: 69, fat: 4.3, calories: 265 } },
            { id: 30, name: 'Thyme', category: 'pantry', default_unit: 'containers', cost_per_unit: 3.49, storage_notes: 'Store in cool, dry place', nutrition: { protein: 5.6, carbs: 24, fat: 1.7, calories: 101 } }
        ];

        // Comprehensive recipe list that uses the ingredients above
        this.recipes = [
            {
                id: 1,
                title: 'Grilled Chicken with Vegetables',
                description: 'Healthy grilled chicken breast served with roasted vegetables',
                image_url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 15,
                cook_time: 25,
                instructions: [
                    'Preheat grill to medium-high heat',
                    'Season chicken breasts with salt, pepper, and olive oil',
                    'Cut vegetables into uniform pieces',
                    'Grill chicken for 6-7 minutes per side until cooked through',
                    'Roast vegetables in oven at 400°F for 20 minutes',
                    'Serve hot'
                ],
                tags: ['healthy', 'protein', 'low-carb'],
                ingredients: [
                    { ingredient_id: 1, quantity: 1.5, unit: 'lbs' },
                    { ingredient_id: 6, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 7, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 8, quantity: 2, unit: 'pieces' },
                    { ingredient_id: 22, quantity: 0.25, unit: 'bottles' },
                    { ingredient_id: 23, quantity: 0.1, unit: 'containers' },
                    { ingredient_id: 24, quantity: 0.1, unit: 'containers' }
                ]
            },
            {
                id: 2,
                title: 'Spaghetti Bolognese',
                description: 'Classic Italian pasta with rich meat sauce',
                image_url: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
                servings: 6,
                meal_type: 'dinner',
                prep_time: 20,
                cook_time: 45,
                instructions: [
                    'Heat olive oil in large pan',
                    'Sauté onions and garlic until fragrant',
                    'Add ground beef and cook until browned',
                    'Add tomatoes and simmer for 30 minutes',
                    'Cook pasta according to package directions',
                    'Serve sauce over pasta with cheese'
                ],
                tags: ['italian', 'comfort-food', 'pasta'],
                ingredients: [
                    { ingredient_id: 2, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 14, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 9, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 10, quantity: 3, unit: 'pieces' },
                    { ingredient_id: 12, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 19, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 22, quantity: 0.25, unit: 'bottles' },
                    { ingredient_id: 27, quantity: 1, unit: 'bunches' }
                ]
            },
            {
                id: 3,
                title: 'Scrambled Eggs with Toast',
                description: 'Simple and delicious breakfast with eggs and buttered toast',
                image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
                servings: 2,
                meal_type: 'breakfast',
                prep_time: 5,
                cook_time: 10,
                instructions: [
                    'Crack eggs into bowl and whisk',
                    'Heat butter in non-stick pan',
                    'Pour in eggs and gently scramble',
                    'Toast bread slices',
                    'Butter toast and serve with eggs'
                ],
                tags: ['breakfast', 'quick', 'easy'],
                ingredients: [
                    { ingredient_id: 4, quantity: 0.5, unit: 'dozen' },
                    { ingredient_id: 15, quantity: 0.25, unit: 'loaves' },
                    { ingredient_id: 21, quantity: 0.1, unit: 'lbs' },
                    { ingredient_id: 23, quantity: 0.05, unit: 'containers' },
                    { ingredient_id: 24, quantity: 0.05, unit: 'containers' }
                ]
            },
            {
                id: 4,
                title: 'Salmon Teriyaki Bowl',
                description: 'Grilled salmon with rice and vegetables in teriyaki sauce',
                image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 20,
                cook_time: 30,
                instructions: [
                    'Cook rice according to package directions',
                    'Season salmon with salt and pepper',
                    'Grill salmon for 4-5 minutes per side',
                    'Steam broccoli until tender',
                    'Prepare teriyaki sauce',
                    'Serve salmon over rice with vegetables'
                ],
                tags: ['healthy', 'asian', 'fish'],
                ingredients: [
                    { ingredient_id: 3, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 13, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 6, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 25, quantity: 0.5, unit: 'bottles' },
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' }
                ]
            },
            {
                id: 5,
                title: 'Greek Salad',
                description: 'Fresh Mediterranean salad with vegetables and cheese',
                image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'lunch',
                prep_time: 15,
                cook_time: 0,
                instructions: [
                    'Chop tomatoes, onions, and bell peppers',
                    'Add spinach leaves to large bowl',
                    'Combine vegetables in bowl',
                    'Drizzle with olive oil and lemon juice',
                    'Season with oregano, salt, and pepper',
                    'Top with cheese and serve'
                ],
                tags: ['healthy', 'vegetarian', 'mediterranean'],
                ingredients: [
                    { ingredient_id: 11, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 12, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 9, quantity: 0.25, unit: 'lbs' },
                    { ingredient_id: 8, quantity: 1, unit: 'pieces' },
                    { ingredient_id: 19, quantity: 0.25, unit: 'lbs' },
                    { ingredient_id: 22, quantity: 0.2, unit: 'bottles' },
                    { ingredient_id: 26, quantity: 2, unit: 'pieces' },
                    { ingredient_id: 29, quantity: 0.05, unit: 'containers' }
                ]
            },
            {
                id: 6,
                title: 'Chicken Stir Fry',
                description: 'Quick and healthy stir fry with chicken and vegetables',
                image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 15,
                cook_time: 15,
                instructions: [
                    'Cut chicken into bite-sized pieces',
                    'Heat oil in wok or large pan',
                    'Stir fry chicken until cooked through',
                    'Add vegetables and stir fry for 3-4 minutes',
                    'Add soy sauce and seasonings',
                    'Serve over rice'
                ],
                tags: ['quick', 'healthy', 'asian'],
                ingredients: [
                    { ingredient_id: 1, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 6, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 7, quantity: 0.25, unit: 'lbs' },
                    { ingredient_id: 8, quantity: 2, unit: 'pieces' },
                    { ingredient_id: 13, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 25, quantity: 0.25, unit: 'bottles' },
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' }
                ]
            },
            {
                id: 7,
                title: 'Vegetable Quinoa Bowl',
                description: 'Nutritious quinoa bowl with roasted vegetables',
                image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'lunch',
                prep_time: 20,
                cook_time: 30,
                instructions: [
                    'Cook quinoa according to package directions',
                    'Roast vegetables in oven at 400°F',
                    'Prepare lemon vinaigrette',
                    'Combine quinoa and vegetables in bowl',
                    'Drizzle with dressing',
                    'Garnish with herbs and serve'
                ],
                tags: ['healthy', 'vegetarian', 'quinoa'],
                ingredients: [
                    { ingredient_id: 17, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 6, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 7, quantity: 0.25, unit: 'lbs' },
                    { ingredient_id: 8, quantity: 1, unit: 'pieces' },
                    { ingredient_id: 22, quantity: 0.2, unit: 'bottles' },
                    { ingredient_id: 26, quantity: 2, unit: 'pieces' },
                    { ingredient_id: 28, quantity: 1, unit: 'bunches' }
                ]
            },
            {
                id: 8,
                title: 'Beef and Potato Stew',
                description: 'Hearty comfort food stew with beef and vegetables',
                image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
                servings: 6,
                meal_type: 'dinner',
                prep_time: 25,
                cook_time: 90,
                instructions: [
                    'Brown beef in large pot',
                    'Add onions and garlic, cook until soft',
                    'Add potatoes, carrots, and broth',
                    'Simmer for 1.5 hours until tender',
                    'Season with herbs and spices',
                    'Serve hot with bread'
                ],
                tags: ['comfort-food', 'stew', 'hearty'],
                ingredients: [
                    { ingredient_id: 2, quantity: 1.5, unit: 'lbs' },
                    { ingredient_id: 16, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 7, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 9, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 10, quantity: 3, unit: 'pieces' },
                    { ingredient_id: 30, quantity: 0.1, unit: 'containers' },
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' }
                ]
            }
        ];

        // Scheduled meals that reference the recipes above
        this.scheduledMeals = [
            // This week
            { id: 1, recipe_id: 3, meal_type: 'breakfast', date: this.getDateString(0), notes: '' },
            { id: 2, recipe_id: 5, meal_type: 'lunch', date: this.getDateString(0), notes: '' },
            { id: 3, recipe_id: 1, meal_type: 'dinner', date: this.getDateString(0), notes: '' },
            
            { id: 4, recipe_id: 3, meal_type: 'breakfast', date: this.getDateString(1), notes: '' },
            { id: 5, recipe_id: 7, meal_type: 'lunch', date: this.getDateString(1), notes: '' },
            { id: 6, recipe_id: 2, meal_type: 'dinner', date: this.getDateString(1), notes: '' },
            
            { id: 7, recipe_id: 3, meal_type: 'breakfast', date: this.getDateString(2), notes: '' },
            { id: 8, recipe_id: 5, meal_type: 'lunch', date: this.getDateString(2), notes: '' },
            { id: 9, recipe_id: 6, meal_type: 'dinner', date: this.getDateString(2), notes: '' },
            
            // Next few days
            { id: 10, recipe_id: 3, meal_type: 'breakfast', date: this.getDateString(3), notes: '' },
            { id: 11, recipe_id: 7, meal_type: 'lunch', date: this.getDateString(3), notes: '' },
            { id: 12, recipe_id: 4, meal_type: 'dinner', date: this.getDateString(3), notes: '' },
            
            { id: 13, recipe_id: 3, meal_type: 'breakfast', date: this.getDateString(4), notes: '' },
            { id: 14, recipe_id: 5, meal_type: 'lunch', date: this.getDateString(4), notes: '' },
            { id: 15, recipe_id: 8, meal_type: 'dinner', date: this.getDateString(4), notes: '' }
        ];

        // Update ingredient usage counts based on recipes
        this.updateIngredientUsage();
    }

    // Helper method to get date strings relative to today
    getDateString(daysFromToday) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday);
        return date.toISOString().split('T')[0];
    }

    // Update ingredient usage statistics based on recipes
    updateIngredientUsage() {
        // Reset usage counts
        this.ingredients.forEach(ingredient => {
            ingredient.recipe_count = 0;
            ingredient.avg_quantity = 0;
        });

        // Count usage in recipes
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(recipeIngredient => {
                const ingredient = this.ingredients.find(ing => ing.id === recipeIngredient.ingredient_id);
                if (ingredient) {
                    ingredient.recipe_count = (ingredient.recipe_count || 0) + 1;
                    ingredient.avg_quantity = (ingredient.avg_quantity || 0) + recipeIngredient.quantity;
                }
            });
        });

        // Calculate averages
        this.ingredients.forEach(ingredient => {
            if (ingredient.recipe_count > 0) {
                ingredient.avg_quantity = ingredient.avg_quantity / ingredient.recipe_count;
            }
        });
    }

    // Get all data
    getAllData() {
        return {
            ingredients: this.ingredients,
            recipes: this.recipes,
            scheduledMeals: this.scheduledMeals
        };
    }

    // Get ingredients
    getIngredients() {
        return this.ingredients;
    }

    // Get recipes
    getRecipes() {
        return this.recipes;
    }

    // Get scheduled meals
    getScheduledMeals() {
        return this.scheduledMeals;
    }

    // Validate data consistency
    validateConsistency() {
        const issues = [];

        // Check that all scheduled meals reference existing recipes
        this.scheduledMeals.forEach(meal => {
            const recipe = this.recipes.find(r => r.id === meal.recipe_id);
            if (!recipe) {
                issues.push(`Scheduled meal ${meal.id} references non-existent recipe ${meal.recipe_id}`);
            }
        });

        // Check that all recipe ingredients reference existing ingredients
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(recipeIngredient => {
                const ingredient = this.ingredients.find(ing => ing.id === recipeIngredient.ingredient_id);
                if (!ingredient) {
                    issues.push(`Recipe "${recipe.title}" references non-existent ingredient ${recipeIngredient.ingredient_id}`);
                }
            });
        });

        return issues;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    console.log('📱 Making DemoDataManager globally available...');
    window.DemoDataManager = DemoDataManager;
    console.log('📱 window.DemoDataManager set:', !!window.DemoDataManager);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemoDataManager;
}
