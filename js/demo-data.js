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
            { id: 1, name: 'Chicken Breast', category: 'meat', default_unit: 'lbs', storage_notes: 'Refrigerate, use within 3 days', nutrition: { protein: 31, carbs: 0, fat: 3.6, calories: 165 }, labels: ['protein', 'lean', 'versatile', 'popular'] },
            { id: 2, name: 'Ground Beef', category: 'meat', default_unit: 'lbs', storage_notes: 'Refrigerate, use within 2 days', nutrition: { protein: 26, carbs: 0, fat: 15, calories: 250 }, labels: ['protein', 'hearty', 'comfort-food', 'versatile'] },
            { id: 3, name: 'Salmon Fillet', category: 'meat', default_unit: 'lbs', storage_notes: 'Refrigerate, use within 2 days', nutrition: { protein: 25, carbs: 0, fat: 11, calories: 206 }, labels: ['protein', 'omega-3', 'healthy-fats', 'premium', 'fish'] },
            { id: 4, name: 'Eggs', category: 'dairy', default_unit: 'dozen', storage_notes: 'Refrigerate', nutrition: { protein: 6, carbs: 0.6, fat: 5, calories: 70 }, labels: ['protein', 'breakfast', 'versatile', 'affordable'] },
            { id: 5, name: 'Tofu', category: 'meat', default_unit: 'lbs', storage_notes: 'Refrigerate after opening', nutrition: { protein: 8, carbs: 2, fat: 4, calories: 70 }, labels: ['protein', 'vegan', 'vegetarian', 'soy', 'healthy'] },

            // Vegetables
            { id: 6, name: 'Broccoli', category: 'produce', default_unit: 'lbs', storage_notes: 'Refrigerate', nutrition: { protein: 3, carbs: 6, fat: 0.4, calories: 25 }, labels: ['vegetable', 'healthy', 'vitamin-c', 'fiber', 'green'] },
            { id: 7, name: 'Carrots', category: 'produce', default_unit: 'lbs', storage_notes: 'Refrigerate', nutrition: { protein: 0.9, carbs: 10, fat: 0.2, calories: 41 }, labels: ['vegetable', 'healthy', 'vitamin-a', 'sweet', 'orange', 'affordable'] },
            { id: 8, name: 'Bell Peppers', category: 'produce', default_unit: 'pieces', storage_notes: 'Refrigerate', nutrition: { protein: 1, carbs: 7, fat: 0.3, calories: 31 }, labels: ['vegetable', 'colorful', 'vitamin-c', 'crunchy', 'versatile'] },
            { id: 9, name: 'Onions', category: 'produce', default_unit: 'lbs', storage_notes: 'Store in cool, dry place', nutrition: { protein: 1.1, carbs: 9.3, fat: 0.1, calories: 40 }, labels: ['vegetable', 'flavor-base', 'aromatic', 'versatile', 'affordable', 'staple'] },
            { id: 10, name: 'Garlic', category: 'produce', default_unit: 'pieces', storage_notes: 'Store in cool, dry place', nutrition: { protein: 0.6, carbs: 3, fat: 0, calories: 13 }, labels: ['aromatic', 'flavor-base', 'medicinal', 'staple', 'pungent'] },
            { id: 11, name: 'Spinach', category: 'produce', default_unit: 'lbs', storage_notes: 'Refrigerate', nutrition: { protein: 2.9, carbs: 3.6, fat: 0.4, calories: 23 }, labels: ['leafy-green', 'healthy', 'iron', 'vitamin-k', 'versatile'] },
            { id: 12, name: 'Tomatoes', category: 'produce', default_unit: 'lbs', storage_notes: 'Store at room temperature', nutrition: { protein: 0.9, carbs: 3.9, fat: 0.2, calories: 18 }, labels: ['vegetable', 'fruit', 'umami', 'versatile', 'lycopene'] },

            // Grains & Starches
            { id: 13, name: 'Rice', category: 'grains', default_unit: 'lbs', storage_notes: 'Store in airtight container', nutrition: { protein: 2.7, carbs: 28, fat: 0.3, calories: 130 }, labels: ['grain', 'staple', 'carbs', 'gluten-free', 'versatile', 'affordable'] },
            { id: 14, name: 'Pasta', category: 'grains', default_unit: 'lbs', storage_notes: 'Store in cool, dry place', nutrition: { protein: 5, carbs: 31, fat: 0.9, calories: 131 }, labels: ['grain', 'carbs', 'italian', 'comfort-food', 'versatile'] },
            { id: 15, name: 'Bread', category: 'grains', default_unit: 'loaves', storage_notes: 'Store at room temperature', nutrition: { protein: 3.6, carbs: 12, fat: 1.2, calories: 69 }, labels: ['grain', 'carbs', 'breakfast', 'staple', 'comfort-food'] },
            { id: 16, name: 'Potatoes', category: 'produce', default_unit: 'lbs', storage_notes: 'Store in cool, dark place', nutrition: { protein: 2, carbs: 17, fat: 0.1, calories: 77 }, labels: ['starch', 'carbs', 'versatile', 'comfort-food', 'affordable', 'filling'] },
            { id: 17, name: 'Quinoa', category: 'grains', default_unit: 'lbs', storage_notes: 'Store in airtight container', nutrition: { protein: 4.4, carbs: 22, fat: 1.9, calories: 120 }, labels: ['grain', 'superfood', 'protein', 'gluten-free', 'healthy', 'premium'] },

            // Dairy
            { id: 18, name: 'Milk', category: 'dairy', default_unit: 'gallons', storage_notes: 'Refrigerate', nutrition: { protein: 3.4, carbs: 5, fat: 3.3, calories: 61 } },
            { id: 19, name: 'Cheese', category: 'dairy', default_unit: 'lbs', storage_notes: 'Refrigerate', nutrition: { protein: 25, carbs: 1, fat: 33, calories: 402 } },
            { id: 20, name: 'Yogurt', category: 'dairy', default_unit: 'containers', storage_notes: 'Refrigerate', nutrition: { protein: 10, carbs: 12, fat: 4, calories: 100 } },
            { id: 21, name: 'Butter', category: 'dairy', default_unit: 'lbs', storage_notes: 'Refrigerate', nutrition: { protein: 0.9, carbs: 0.1, fat: 81, calories: 717 } },

            // Pantry Items
            { id: 22, name: 'Olive Oil', category: 'pantry', default_unit: 'bottles', storage_notes: 'Store in cool, dark place', nutrition: { protein: 0, carbs: 0, fat: 14, calories: 119 }, labels: ['oil', 'healthy-fats', 'mediterranean', 'cooking', 'premium'] },
            { id: 23, name: 'Salt', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in dry place', nutrition: { protein: 0, carbs: 0, fat: 0, calories: 0 }, labels: ['seasoning', 'essential', 'mineral', 'preservative', 'staple'] },
            { id: 24, name: 'Black Pepper', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in cool, dry place', nutrition: { protein: 0.1, carbs: 0.6, fat: 0, calories: 3 }, labels: ['spice', 'seasoning', 'pungent', 'staple', 'aromatic'] },
            { id: 25, name: 'Soy Sauce', category: 'pantry', default_unit: 'bottles', storage_notes: 'Store at room temperature', nutrition: { protein: 1.3, carbs: 0.8, fat: 0, calories: 8 }, labels: ['sauce', 'umami', 'asian', 'salty', 'fermented'] },
            { id: 26, name: 'Lemon', category: 'produce', default_unit: 'pieces', storage_notes: 'Refrigerate', nutrition: { protein: 0.6, carbs: 5.4, fat: 0.2, calories: 17 }, labels: ['citrus', 'vitamin-c', 'acidic', 'fresh', 'aromatic'] },

            // Herbs & Spices
            { id: 27, name: 'Basil', category: 'produce', default_unit: 'bunches', storage_notes: 'Refrigerate', nutrition: { protein: 3.2, carbs: 2.6, fat: 0.6, calories: 22 } },
            { id: 28, name: 'Parsley', category: 'produce', default_unit: 'bunches', storage_notes: 'Refrigerate', nutrition: { protein: 3, carbs: 6.3, fat: 0.8, calories: 36 } },
            { id: 29, name: 'Oregano', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in cool, dry place', nutrition: { protein: 9, carbs: 69, fat: 4.3, calories: 265 } },
            { id: 30, name: 'Thyme', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in cool, dry place', nutrition: { protein: 5.6, carbs: 24, fat: 1.7, calories: 101 } }
        ];

        // Comprehensive recipe list that uses the ingredients above
        this.recipes = [
            {
                id: 1,
                title: 'Grilled Chicken with Vegetables',
                description: 'Healthy grilled chicken breast served with roasted vegetables',
                type: 'basic', // Standard individual recipe
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
                tags: ['healthy', 'protein', 'low-carb', 'chicken'],
                labels: ['healthy', 'protein', 'low-carb', 'chicken'],
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
                type: 'basic',
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
                tags: ['italian', 'comfort-food', 'pasta', 'beef'],
                labels: ['italian', 'comfort-food', 'pasta', 'beef'],
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
                type: 'basic',
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
                labels: ['breakfast', 'quick', 'easy'],
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
                type: 'basic',
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
                labels: ['healthy', 'asian', 'fish'],
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
                type: 'basic',
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
                labels: ['healthy', 'vegetarian', 'mediterranean'],
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
                type: 'basic',
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
                tags: ['quick', 'healthy', 'asian', 'chicken'],
                labels: ['quick', 'healthy', 'asian', 'chicken'],
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
                type: 'basic',
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
                labels: ['healthy', 'vegetarian', 'quinoa'],
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
                type: 'basic',
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
                tags: ['comfort-food', 'stew', 'hearty', 'beef'],
                labels: ['comfort-food', 'stew', 'hearty', 'beef'],
                ingredients: [
                    { ingredient_id: 2, quantity: 1.5, unit: 'lbs' },
                    { ingredient_id: 16, quantity: 1, unit: 'lbs' },
                    { ingredient_id: 7, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 9, quantity: 0.5, unit: 'lbs' },
                    { ingredient_id: 10, quantity: 3, unit: 'pieces' },
                    { ingredient_id: 30, quantity: 0.1, unit: 'containers' },
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' }
                ]
            },
            
            // Individual component recipes for combo recipes
            {
                id: 9,
                title: 'Mashed Potatoes',
                description: 'Creamy, buttery mashed potatoes',
                type: 'basic', // New field to distinguish recipe types
                image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 10,
                cook_time: 20,
                instructions: [
                    'Peel and cube potatoes',
                    'Boil in salted water until tender (15-20 minutes)',
                    'Drain and mash with butter and milk',
                    'Season with salt and pepper to taste'
                ],
                tags: ['side-dish', 'comfort-food', 'vegetarian'],
                labels: ['side-dish', 'comfort-food', 'vegetarian'],
                ingredients: [
                    { ingredient_id: 16, quantity: 2, unit: 'lbs' }, // Potatoes
                    { ingredient_id: 21, quantity: 0.25, unit: 'lbs' }, // Butter
                    { ingredient_id: 18, quantity: 0.5, unit: 'gallons' }, // Milk
                    { ingredient_id: 23, quantity: 0.1, unit: 'containers' }, // Salt
                    { ingredient_id: 24, quantity: 0.05, unit: 'containers' } // Black Pepper
                ]
            },
            {
                id: 10,
                title: 'Fried Chicken',
                description: 'Crispy, golden fried chicken pieces',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 20,
                cook_time: 15,
                instructions: [
                    'Season chicken with salt and pepper',
                    'Dredge in flour seasoned with spices',
                    'Heat oil to 350°F',
                    'Fry chicken pieces until golden brown and cooked through',
                    'Drain on paper towels'
                ],
                tags: ['comfort-food', 'crispy', 'main-dish'],
                labels: ['comfort-food', 'crispy', 'main-dish'],
                ingredients: [
                    { ingredient_id: 1, quantity: 2, unit: 'lbs' }, // Chicken Breast
                    { ingredient_id: 23, quantity: 0.1, unit: 'containers' }, // Salt
                    { ingredient_id: 24, quantity: 0.1, unit: 'containers' }, // Black Pepper
                    { ingredient_id: 22, quantity: 0.5, unit: 'bottles' } // Olive Oil (for frying)
                ]
            },
            {
                id: 11,
                title: 'Green Beans',
                description: 'Simple sautéed green beans with garlic',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1609501676725-7186f734b2b0?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 5,
                cook_time: 10,
                instructions: [
                    'Trim ends of green beans',
                    'Heat olive oil in pan',
                    'Add minced garlic and sauté briefly',
                    'Add green beans and cook until tender-crisp',
                    'Season with salt and pepper'
                ],
                tags: ['vegetable', 'healthy', 'side-dish'],
                labels: ['vegetable', 'healthy', 'side-dish'],
                ingredients: [
                    { ingredient_id: 6, quantity: 1, unit: 'lbs' }, // Using Broccoli as green beans substitute
                    { ingredient_id: 10, quantity: 3, unit: 'pieces' }, // Garlic
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.05, unit: 'containers' }, // Salt
                    { ingredient_id: 24, quantity: 0.05, unit: 'containers' } // Black Pepper
                ]
            },
            
            // COMBO RECIPES - Recipes that contain other recipes
            {
                id: 12,
                title: 'Sunday Dinner Combo',
                description: 'Classic Sunday dinner with fried chicken, mashed potatoes, and green beans',
                type: 'combo', // New field indicating this is a combo recipe
                image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 35, // Sum of component prep times
                cook_time: 30, // Max of component cook times
                instructions: [
                    'This combo recipe combines three dishes:',
                    '1. Prepare Fried Chicken (Recipe #10)',
                    '2. Prepare Mashed Potatoes (Recipe #9)', 
                    '3. Prepare Green Beans (Recipe #11)',
                    'Coordinate timing so all dishes finish together',
                    'Serve family-style on large platters'
                ],
                tags: ['combo', 'sunday-dinner', 'comfort-food', 'family-meal'],
                labels: ['combo', 'sunday-dinner', 'comfort-food', 'family-meal'],
                // For combo recipes, we reference other recipes instead of individual ingredients
                combo_recipes: [
                    { recipe_id: 10, servings_multiplier: 1 }, // Fried Chicken
                    { recipe_id: 9, servings_multiplier: 1 },  // Mashed Potatoes
                    { recipe_id: 11, servings_multiplier: 1 }  // Green Beans
                ],
                // We still include ingredients for grocery list generation (aggregated from component recipes)
                ingredients: [
                    // Aggregated from all component recipes
                    { ingredient_id: 1, quantity: 2, unit: 'lbs' }, // Chicken Breast
                    { ingredient_id: 16, quantity: 2, unit: 'lbs' }, // Potatoes
                    { ingredient_id: 6, quantity: 1, unit: 'lbs' }, // Broccoli (green beans substitute)
                    { ingredient_id: 21, quantity: 0.25, unit: 'lbs' }, // Butter
                    { ingredient_id: 18, quantity: 0.5, unit: 'gallons' }, // Milk
                    { ingredient_id: 10, quantity: 3, unit: 'pieces' }, // Garlic
                    { ingredient_id: 22, quantity: 0.6, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.25, unit: 'containers' }, // Salt
                    { ingredient_id: 24, quantity: 0.2, unit: 'containers' } // Black Pepper
                ]
            },
            {
                id: 13,
                title: 'Italian Night Combo',
                description: 'Pasta with garlic bread and side salad',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 25,
                cook_time: 20,
                instructions: [
                    'This combo includes:',
                    '1. Cook pasta with tomato sauce',
                    '2. Prepare garlic bread',
                    '3. Make fresh side salad',
                    'Serve together for complete Italian meal'
                ],
                tags: ['combo', 'italian', 'pasta', 'family-meal'],
                labels: ['combo', 'italian', 'pasta', 'family-meal'],
                combo_recipes: [
                    // Note: These would reference actual pasta/bread recipes when implemented
                    // For now, we'll use existing recipes as placeholders
                    { recipe_id: 2, servings_multiplier: 1 }, // Using existing recipe as placeholder
                    { recipe_id: 3, servings_multiplier: 0.5 } // Using existing recipe as placeholder
                ],
                ingredients: [
                    { ingredient_id: 14, quantity: 1, unit: 'lbs' }, // Pasta
                    { ingredient_id: 12, quantity: 2, unit: 'lbs' }, // Tomatoes
                    { ingredient_id: 15, quantity: 1, unit: 'loaves' }, // Bread
                    { ingredient_id: 10, quantity: 4, unit: 'pieces' }, // Garlic
                    { ingredient_id: 22, quantity: 0.3, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 19, quantity: 0.5, unit: 'lbs' } // Cheese
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
