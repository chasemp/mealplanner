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
            { id: 18, name: 'Milk', category: 'dairy', default_unit: 'gallons', storage_notes: 'Refrigerate', nutrition: { protein: 3.4, carbs: 5, fat: 3.3, calories: 61 }, labels: ['dairy', 'protein', 'calcium', 'breakfast', 'cooking', 'staple'] },
            { id: 19, name: 'Cheese', category: 'dairy', default_unit: 'lbs', storage_notes: 'Refrigerate', nutrition: { protein: 25, carbs: 1, fat: 33, calories: 402 }, labels: ['dairy', 'protein', 'calcium', 'flavor', 'melts', 'versatile'] },
            { id: 20, name: 'Yogurt', category: 'dairy', default_unit: 'containers', storage_notes: 'Refrigerate', nutrition: { protein: 10, carbs: 12, fat: 4, calories: 100 }, labels: ['dairy', 'protein', 'probiotics', 'healthy', 'breakfast', 'snack'] },
            { id: 21, name: 'Butter', category: 'dairy', default_unit: 'lbs', storage_notes: 'Refrigerate', nutrition: { protein: 0.9, carbs: 0.1, fat: 81, calories: 717 }, labels: ['dairy', 'fat', 'cooking', 'baking', 'flavor', 'rich'] },

            // Pantry Items
            { id: 22, name: 'Olive Oil', category: 'pantry', default_unit: 'bottles', storage_notes: 'Store in cool, dark place', nutrition: { protein: 0, carbs: 0, fat: 14, calories: 119 }, labels: ['oil', 'healthy-fats', 'mediterranean', 'cooking', 'premium'] },
            { id: 23, name: 'Salt', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in dry place', nutrition: { protein: 0, carbs: 0, fat: 0, calories: 0 }, labels: ['seasoning', 'essential', 'mineral', 'preservative', 'staple'] },
            { id: 24, name: 'Black Pepper', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in cool, dry place', nutrition: { protein: 0.1, carbs: 0.6, fat: 0, calories: 3 }, labels: ['spice', 'seasoning', 'pungent', 'staple', 'aromatic'] },
            { id: 25, name: 'Soy Sauce', category: 'pantry', default_unit: 'bottles', storage_notes: 'Store at room temperature', nutrition: { protein: 1.3, carbs: 0.8, fat: 0, calories: 8 }, labels: ['sauce', 'umami', 'asian', 'salty', 'fermented'] },
            { id: 26, name: 'Lemon', category: 'produce', default_unit: 'pieces', storage_notes: 'Refrigerate', nutrition: { protein: 0.6, carbs: 5.4, fat: 0.2, calories: 17 }, labels: ['citrus', 'vitamin-c', 'acidic', 'fresh', 'aromatic'] },

            // Herbs & Spices
            { id: 27, name: 'Basil', category: 'produce', default_unit: 'bunches', storage_notes: 'Refrigerate', nutrition: { protein: 3.2, carbs: 2.6, fat: 0.6, calories: 22 }, labels: ['herb', 'aromatic', 'italian', 'fresh', 'mediterranean', 'flavorful'] },
            { id: 28, name: 'Parsley', category: 'produce', default_unit: 'bunches', storage_notes: 'Refrigerate', nutrition: { protein: 3, carbs: 6.3, fat: 0.8, calories: 36 }, labels: ['herb', 'fresh', 'garnish', 'vitamin-k', 'aromatic', 'versatile'] },
            { id: 29, name: 'Oregano', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in cool, dry place', nutrition: { protein: 9, carbs: 69, fat: 4.3, calories: 265 }, labels: ['herb', 'dried', 'mediterranean', 'pizza', 'aromatic', 'staple'] },
            { id: 30, name: 'Thyme', category: 'pantry', default_unit: 'containers', storage_notes: 'Store in cool, dry place', nutrition: { protein: 5.6, carbs: 24, fat: 1.7, calories: 101 }, labels: ['herb', 'dried', 'aromatic', 'earthy', 'versatile', 'cooking'] }
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
                labels: ['vegetable', 'healthy', 'side-dish'],
                ingredients: [
                    { ingredient_id: 6, quantity: 1, unit: 'lbs' }, // Using Broccoli as green beans substitute
                    { ingredient_id: 10, quantity: 3, unit: 'pieces' }, // Garlic
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.05, unit: 'containers' }, // Salt
                    { ingredient_id: 24, quantity: 0.05, unit: 'containers' } // Black Pepper
                ]
            },
            {
                id: 14,
                title: 'Garlic Bread',
                description: 'Crispy garlic bread with herbs',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 10,
                cook_time: 15,
                instructions: [
                    'Slice bread lengthwise',
                    'Mix butter with minced garlic and herbs',
                    'Spread garlic butter on bread',
                    'Bake at 375°F for 10-15 minutes until golden'
                ],
                labels: ['side-dish', 'bread', 'garlic'],
                ingredients: [
                    { ingredient_id: 15, quantity: 1, unit: 'loaves' }, // Bread
                    { ingredient_id: 21, quantity: 0.25, unit: 'lbs' }, // Butter
                    { ingredient_id: 10, quantity: 4, unit: 'pieces' }, // Garlic
                    { ingredient_id: 29, quantity: 0.05, unit: 'containers' } // Oregano
                ]
            },
            {
                id: 15,
                title: 'Caesar Salad',
                description: 'Fresh romaine lettuce with caesar dressing and croutons',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'lunch',
                prep_time: 15,
                cook_time: 0,
                instructions: [
                    'Wash and chop romaine lettuce',
                    'Make caesar dressing with garlic, lemon, and parmesan',
                    'Toss lettuce with dressing',
                    'Top with croutons and extra parmesan'
                ],
                labels: ['salad', 'fresh', 'vegetarian'],
                ingredients: [
                    { ingredient_id: 13, quantity: 2, unit: 'heads' }, // Lettuce
                    { ingredient_id: 19, quantity: 0.5, unit: 'lbs' }, // Cheese
                    { ingredient_id: 10, quantity: 2, unit: 'pieces' }, // Garlic
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' } // Olive Oil
                ]
            },
            {
                id: 16,
                title: 'Pancakes',
                description: 'Fluffy buttermilk pancakes',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'breakfast',
                prep_time: 10,
                cook_time: 15,
                instructions: [
                    'Mix dry ingredients in large bowl',
                    'Whisk together wet ingredients',
                    'Combine wet and dry ingredients until just mixed',
                    'Cook on griddle until bubbles form, then flip'
                ],
                labels: ['breakfast', 'fluffy', 'sweet'],
                ingredients: [
                    { ingredient_id: 18, quantity: 1, unit: 'gallons' }, // Milk
                    { ingredient_id: 17, quantity: 3, unit: 'pieces' }, // Eggs
                    { ingredient_id: 21, quantity: 0.25, unit: 'lbs' }, // Butter
                    { ingredient_id: 23, quantity: 0.05, unit: 'containers' } // Salt
                ]
            },
            {
                id: 17,
                title: 'Bacon',
                description: 'Crispy breakfast bacon',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1528607929212-2636ec44b957?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'breakfast',
                prep_time: 5,
                cook_time: 10,
                instructions: [
                    'Arrange bacon strips in cold pan',
                    'Cook over medium heat, turning occasionally',
                    'Cook until desired crispiness',
                    'Drain on paper towels'
                ],
                labels: ['breakfast', 'crispy', 'meat'],
                ingredients: [
                    { ingredient_id: 2, quantity: 1, unit: 'lbs' } // Beef (using as bacon substitute)
                ]
            },
            {
                id: 18,
                title: 'Hash Browns',
                description: 'Crispy golden hash brown potatoes',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'breakfast',
                prep_time: 15,
                cook_time: 20,
                instructions: [
                    'Grate potatoes and squeeze out excess moisture',
                    'Season with salt and pepper',
                    'Heat oil in large skillet',
                    'Cook until golden brown and crispy on both sides'
                ],
                labels: ['breakfast', 'crispy', 'potatoes'],
                ingredients: [
                    { ingredient_id: 16, quantity: 2, unit: 'lbs' }, // Potatoes
                    { ingredient_id: 22, quantity: 0.2, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.1, unit: 'containers' }, // Salt
                    { ingredient_id: 24, quantity: 0.05, unit: 'containers' } // Black Pepper
                ]
            },
            {
                id: 19,
                title: 'Grilled Vegetables',
                description: 'Mixed grilled vegetables with herbs',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 15,
                cook_time: 20,
                instructions: [
                    'Cut vegetables into uniform pieces',
                    'Toss with olive oil and seasonings',
                    'Grill over medium-high heat',
                    'Cook until tender and lightly charred'
                ],
                labels: ['vegetable', 'healthy', 'grilled'],
                ingredients: [
                    { ingredient_id: 6, quantity: 1, unit: 'lbs' }, // Broccoli
                    { ingredient_id: 7, quantity: 1, unit: 'lbs' }, // Carrots
                    { ingredient_id: 8, quantity: 2, unit: 'pieces' }, // Bell Peppers
                    { ingredient_id: 22, quantity: 0.2, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.05, unit: 'containers' }, // Salt
                    { ingredient_id: 29, quantity: 0.05, unit: 'containers' } // Oregano
                ]
            },
            {
                id: 20,
                title: 'Rice Pilaf',
                description: 'Fluffy seasoned rice with herbs',
                type: 'basic',
                image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 5,
                cook_time: 25,
                instructions: [
                    'Sauté rice in oil until lightly toasted',
                    'Add broth and seasonings',
                    'Bring to boil, then simmer covered',
                    'Let stand 5 minutes, then fluff with fork'
                ],
                labels: ['side-dish', 'rice', 'fluffy'],
                ingredients: [
                    { ingredient_id: 14, quantity: 1, unit: 'lbs' }, // Pasta (using as rice substitute)
                    { ingredient_id: 22, quantity: 0.1, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.05, unit: 'containers' }, // Salt
                    { ingredient_id: 30, quantity: 0.05, unit: 'containers' } // Thyme
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
                description: 'Spaghetti Bolognese with garlic bread and Caesar salad',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 25,
                cook_time: 20,
                instructions: [
                    'This combo includes:',
                    '1. Prepare Spaghetti Bolognese (Recipe #2)',
                    '2. Make Garlic Bread (Recipe #14)',
                    '3. Prepare Caesar Salad (Recipe #15)',
                    'Serve together for complete Italian meal'
                ],
                labels: ['combo', 'italian', 'pasta', 'family-meal'],
                combo_recipes: [
                    { recipe_id: 2, servings_multiplier: 1 }, // Spaghetti Bolognese
                    { recipe_id: 14, servings_multiplier: 1 }, // Garlic Bread
                    { recipe_id: 15, servings_multiplier: 1 } // Caesar Salad
                ],
                ingredients: [
                    // Aggregated from Spaghetti Bolognese + Garlic Bread + Caesar Salad
                    { ingredient_id: 14, quantity: 1, unit: 'lbs' }, // Pasta
                    { ingredient_id: 2, quantity: 1, unit: 'lbs' }, // Beef
                    { ingredient_id: 12, quantity: 2, unit: 'lbs' }, // Tomatoes
                    { ingredient_id: 15, quantity: 1, unit: 'loaves' }, // Bread
                    { ingredient_id: 13, quantity: 2, unit: 'heads' }, // Lettuce
                    { ingredient_id: 10, quantity: 6, unit: 'pieces' }, // Garlic (combined)
                    { ingredient_id: 22, quantity: 0.4, unit: 'bottles' }, // Olive Oil (combined)
                    { ingredient_id: 19, quantity: 1, unit: 'lbs' }, // Cheese (combined)
                    { ingredient_id: 21, quantity: 0.25, unit: 'lbs' }, // Butter
                    { ingredient_id: 29, quantity: 0.1, unit: 'containers' } // Oregano
                ]
            },
            {
                id: 21,
                title: 'Full American Breakfast Combo',
                description: 'Complete breakfast with pancakes, bacon, and hash browns',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'breakfast',
                prep_time: 30,
                cook_time: 25,
                instructions: [
                    'This hearty breakfast combo includes:',
                    '1. Make fluffy Pancakes (Recipe #16)',
                    '2. Cook crispy Bacon (Recipe #17)',
                    '3. Prepare golden Hash Browns (Recipe #18)',
                    'Serve hot with maple syrup and butter'
                ],
                labels: ['combo', 'breakfast', 'hearty', 'american'],
                combo_recipes: [
                    { recipe_id: 16, servings_multiplier: 1 }, // Pancakes
                    { recipe_id: 17, servings_multiplier: 1 }, // Bacon
                    { recipe_id: 18, servings_multiplier: 1 } // Hash Browns
                ],
                ingredients: [
                    // Aggregated from all breakfast components
                    { ingredient_id: 18, quantity: 1, unit: 'gallons' }, // Milk
                    { ingredient_id: 17, quantity: 3, unit: 'pieces' }, // Eggs
                    { ingredient_id: 21, quantity: 0.5, unit: 'lbs' }, // Butter (combined)
                    { ingredient_id: 2, quantity: 1, unit: 'lbs' }, // Beef (bacon substitute)
                    { ingredient_id: 16, quantity: 2, unit: 'lbs' }, // Potatoes
                    { ingredient_id: 22, quantity: 0.2, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.15, unit: 'containers' }, // Salt (combined)
                    { ingredient_id: 24, quantity: 0.05, unit: 'containers' } // Black Pepper
                ]
            },
            {
                id: 22,
                title: 'Grilled Salmon Dinner Combo',
                description: 'Salmon teriyaki bowl with grilled vegetables and rice pilaf',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 25,
                cook_time: 30,
                instructions: [
                    'This healthy dinner combo includes:',
                    '1. Prepare Salmon Teriyaki Bowl (Recipe #4)',
                    '2. Make Grilled Vegetables (Recipe #19)',
                    '3. Cook Rice Pilaf (Recipe #20)',
                    'Arrange beautifully on plates for elegant presentation'
                ],
                labels: ['combo', 'healthy', 'salmon', 'elegant'],
                combo_recipes: [
                    { recipe_id: 4, servings_multiplier: 1 }, // Salmon Teriyaki Bowl
                    { recipe_id: 19, servings_multiplier: 1 }, // Grilled Vegetables
                    { recipe_id: 20, servings_multiplier: 1 } // Rice Pilaf
                ],
                ingredients: [
                    // Aggregated from all components
                    { ingredient_id: 3, quantity: 1.5, unit: 'lbs' }, // Salmon
                    { ingredient_id: 14, quantity: 1, unit: 'lbs' }, // Pasta (rice substitute)
                    { ingredient_id: 6, quantity: 1, unit: 'lbs' }, // Broccoli
                    { ingredient_id: 7, quantity: 1, unit: 'lbs' }, // Carrots
                    { ingredient_id: 8, quantity: 2, unit: 'pieces' }, // Bell Peppers
                    { ingredient_id: 22, quantity: 0.3, unit: 'bottles' }, // Olive Oil (combined)
                    { ingredient_id: 23, quantity: 0.1, unit: 'containers' }, // Salt
                    { ingredient_id: 29, quantity: 0.05, unit: 'containers' }, // Oregano
                    { ingredient_id: 30, quantity: 0.05, unit: 'containers' } // Thyme
                ]
            },
            {
                id: 23,
                title: 'Greek Feast Combo',
                description: 'Greek salad with chicken stir fry and garlic bread',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 30,
                cook_time: 25,
                instructions: [
                    'This Mediterranean combo includes:',
                    '1. Prepare fresh Greek Salad (Recipe #5)',
                    '2. Make Chicken Stir Fry (Recipe #6)',
                    '3. Serve with warm Garlic Bread (Recipe #14)',
                    'Perfect for a Mediterranean-inspired dinner'
                ],
                labels: ['combo', 'mediterranean', 'greek', 'fresh'],
                combo_recipes: [
                    { recipe_id: 5, servings_multiplier: 1 }, // Greek Salad
                    { recipe_id: 6, servings_multiplier: 1 }, // Chicken Stir Fry
                    { recipe_id: 14, servings_multiplier: 1 } // Garlic Bread
                ],
                ingredients: [
                    // Aggregated from all components
                    { ingredient_id: 1, quantity: 1.5, unit: 'lbs' }, // Chicken Breast
                    { ingredient_id: 12, quantity: 2, unit: 'lbs' }, // Tomatoes
                    { ingredient_id: 9, quantity: 1, unit: 'lbs' }, // Onions
                    { ingredient_id: 19, quantity: 0.75, unit: 'lbs' }, // Cheese
                    { ingredient_id: 15, quantity: 1, unit: 'loaves' }, // Bread
                    { ingredient_id: 6, quantity: 1, unit: 'lbs' }, // Broccoli
                    { ingredient_id: 7, quantity: 0.5, unit: 'lbs' }, // Carrots
                    { ingredient_id: 10, quantity: 6, unit: 'pieces' }, // Garlic (combined)
                    { ingredient_id: 22, quantity: 0.4, unit: 'bottles' }, // Olive Oil (combined)
                    { ingredient_id: 21, quantity: 0.25, unit: 'lbs' }, // Butter
                    { ingredient_id: 29, quantity: 0.1, unit: 'containers' } // Oregano
                ]
            },
            {
                id: 24,
                title: 'Vegetarian Quinoa Feast Combo',
                description: 'Quinoa bowl with beef stew and grilled vegetables',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'dinner',
                prep_time: 35,
                cook_time: 45,
                instructions: [
                    'This hearty vegetarian combo includes:',
                    '1. Prepare Vegetable Quinoa Bowl (Recipe #7)',
                    '2. Make Beef and Potato Stew (Recipe #8) - vegetarian version',
                    '3. Add Grilled Vegetables (Recipe #19)',
                    'A complete plant-based meal with rich flavors'
                ],
                labels: ['combo', 'vegetarian', 'quinoa', 'hearty'],
                combo_recipes: [
                    { recipe_id: 7, servings_multiplier: 1 }, // Vegetable Quinoa Bowl
                    { recipe_id: 8, servings_multiplier: 0.5 }, // Beef Stew (reduced portion)
                    { recipe_id: 19, servings_multiplier: 1 } // Grilled Vegetables
                ],
                ingredients: [
                    // Aggregated from all components
                    { ingredient_id: 14, quantity: 1, unit: 'lbs' }, // Pasta (quinoa substitute)
                    { ingredient_id: 2, quantity: 0.5, unit: 'lbs' }, // Beef (reduced)
                    { ingredient_id: 16, quantity: 2, unit: 'lbs' }, // Potatoes
                    { ingredient_id: 6, quantity: 2, unit: 'lbs' }, // Broccoli (combined)
                    { ingredient_id: 7, quantity: 1.5, unit: 'lbs' }, // Carrots (combined)
                    { ingredient_id: 8, quantity: 2, unit: 'pieces' }, // Bell Peppers
                    { ingredient_id: 9, quantity: 1, unit: 'lbs' }, // Onions
                    { ingredient_id: 10, quantity: 3, unit: 'pieces' }, // Garlic
                    { ingredient_id: 22, quantity: 0.3, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 29, quantity: 0.1, unit: 'containers' }, // Oregano
                    { ingredient_id: 30, quantity: 0.1, unit: 'containers' } // Thyme
                ]
            },
            {
                id: 25,
                title: 'Weekend Brunch Combo',
                description: 'Scrambled eggs with toast, bacon, and hash browns',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'breakfast',
                prep_time: 25,
                cook_time: 20,
                instructions: [
                    'This perfect brunch combo includes:',
                    '1. Make Scrambled Eggs with Toast (Recipe #3)',
                    '2. Cook crispy Bacon (Recipe #17)',
                    '3. Prepare golden Hash Browns (Recipe #18)',
                    'Ideal for leisurely weekend mornings'
                ],
                labels: ['combo', 'brunch', 'weekend', 'eggs'],
                combo_recipes: [
                    { recipe_id: 3, servings_multiplier: 1 }, // Scrambled Eggs with Toast
                    { recipe_id: 17, servings_multiplier: 1 }, // Bacon
                    { recipe_id: 18, servings_multiplier: 1 } // Hash Browns
                ],
                ingredients: [
                    // Aggregated from all components
                    { ingredient_id: 17, quantity: 6, unit: 'pieces' }, // Eggs (combined)
                    { ingredient_id: 15, quantity: 1, unit: 'loaves' }, // Bread
                    { ingredient_id: 2, quantity: 1, unit: 'lbs' }, // Beef (bacon substitute)
                    { ingredient_id: 16, quantity: 2, unit: 'lbs' }, // Potatoes
                    { ingredient_id: 21, quantity: 0.5, unit: 'lbs' }, // Butter (combined)
                    { ingredient_id: 18, quantity: 0.5, unit: 'gallons' }, // Milk
                    { ingredient_id: 22, quantity: 0.2, unit: 'bottles' }, // Olive Oil
                    { ingredient_id: 23, quantity: 0.15, unit: 'containers' }, // Salt (combined)
                    { ingredient_id: 24, quantity: 0.1, unit: 'containers' } // Black Pepper (combined)
                ]
            },
            {
                id: 26,
                title: 'Light Lunch Combo',
                description: 'Caesar salad with garlic bread and grilled chicken',
                type: 'combo',
                image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
                servings: 4,
                meal_type: 'lunch',
                prep_time: 20,
                cook_time: 15,
                instructions: [
                    'This light lunch combo includes:',
                    '1. Prepare fresh Caesar Salad (Recipe #15)',
                    '2. Grill chicken from Grilled Chicken with Vegetables (Recipe #1)',
                    '3. Serve with warm Garlic Bread (Recipe #14)',
                    'Perfect for a satisfying yet light midday meal'
                ],
                labels: ['combo', 'lunch', 'light', 'salad'],
                combo_recipes: [
                    { recipe_id: 15, servings_multiplier: 1 }, // Caesar Salad
                    { recipe_id: 1, servings_multiplier: 0.5 }, // Grilled Chicken (reduced portion)
                    { recipe_id: 14, servings_multiplier: 1 } // Garlic Bread
                ],
                ingredients: [
                    // Aggregated from all components
                    { ingredient_id: 13, quantity: 2, unit: 'heads' }, // Lettuce
                    { ingredient_id: 1, quantity: 0.75, unit: 'lbs' }, // Chicken Breast (reduced)
                    { ingredient_id: 15, quantity: 1, unit: 'loaves' }, // Bread
                    { ingredient_id: 19, quantity: 0.5, unit: 'lbs' }, // Cheese
                    { ingredient_id: 10, quantity: 6, unit: 'pieces' }, // Garlic (combined)
                    { ingredient_id: 21, quantity: 0.25, unit: 'lbs' }, // Butter
                    { ingredient_id: 22, quantity: 0.2, unit: 'bottles' }, // Olive Oil (combined)
                    { ingredient_id: 23, quantity: 0.1, unit: 'containers' }, // Salt
                    { ingredient_id: 24, quantity: 0.1, unit: 'containers' }, // Black Pepper
                    { ingredient_id: 29, quantity: 0.05, unit: 'containers' } // Oregano
                ]
            }
        ];

        // Scheduled meals that reference the recipes above (using modern ScheduleManager schema)
        this.scheduledMeals = this.generateScheduledMealsWithSchema();

        // Update ingredient usage counts based on recipes
        this.updateIngredientUsage();
    }

    // Helper method to get date strings relative to today
    getDateString(daysFromToday) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday);
        return date.toISOString().split('T')[0];
    }

    // Generate scheduled meals with proper ScheduleManager schema
    generateScheduledMealsWithSchema() {
        const scheduledMealsData = [
            // This week - Mix of basic and combo recipes
            { id: 1, recipe_id: 25, meal_type: 'breakfast', date: this.getDateString(0), notes: 'Weekend Brunch Combo' },
            { id: 2, recipe_id: 26, meal_type: 'lunch', date: this.getDateString(0), notes: 'Light Lunch Combo' },
            { id: 3, recipe_id: 12, meal_type: 'dinner', date: this.getDateString(0), notes: 'Sunday Dinner Combo' },
            
            { id: 4, recipe_id: 16, meal_type: 'breakfast', date: this.getDateString(1), notes: 'Basic pancakes' },
            { id: 5, recipe_id: 15, meal_type: 'lunch', date: this.getDateString(1), notes: 'Caesar salad' },
            { id: 6, recipe_id: 13, meal_type: 'dinner', date: this.getDateString(1), notes: 'Italian Night Combo' },
            
            { id: 7, recipe_id: 21, meal_type: 'breakfast', date: this.getDateString(2), notes: 'Full American Breakfast Combo' },
            { id: 8, recipe_id: 5, meal_type: 'lunch', date: this.getDateString(2), notes: 'Greek salad' },
            { id: 9, recipe_id: 22, meal_type: 'dinner', date: this.getDateString(2), notes: 'Grilled Salmon Dinner Combo' },
            
            // Next few days - More variety
            { id: 10, recipe_id: 3, meal_type: 'breakfast', date: this.getDateString(3), notes: 'Scrambled eggs with toast' },
            { id: 11, recipe_id: 7, meal_type: 'lunch', date: this.getDateString(3), notes: 'Vegetable quinoa bowl' },
            { id: 12, recipe_id: 23, meal_type: 'dinner', date: this.getDateString(3), notes: 'Greek Feast Combo' },
            
            { id: 13, recipe_id: 17, meal_type: 'breakfast', date: this.getDateString(4), notes: 'Bacon' },
            { id: 14, recipe_id: 6, meal_type: 'lunch', date: this.getDateString(4), notes: 'Chicken stir fry' },
            { id: 15, recipe_id: 24, meal_type: 'dinner', date: this.getDateString(4), notes: 'Vegetarian Quinoa Feast Combo' },
            
            // Extended schedule with more combo recipes
            { id: 16, recipe_id: 21, meal_type: 'breakfast', date: this.getDateString(5), notes: 'Full American Breakfast Combo' },
            { id: 17, recipe_id: 14, meal_type: 'lunch', date: this.getDateString(5), notes: 'Garlic bread' },
            { id: 18, recipe_id: 1, meal_type: 'dinner', date: this.getDateString(5), notes: 'Grilled chicken with vegetables' },
            
            { id: 19, recipe_id: 18, meal_type: 'breakfast', date: this.getDateString(6), notes: 'Hash browns' },
            { id: 20, recipe_id: 26, meal_type: 'lunch', date: this.getDateString(6), notes: 'Light Lunch Combo' },
            { id: 21, recipe_id: 8, meal_type: 'dinner', date: this.getDateString(6), notes: 'Beef and potato stew' }
        ];

        // Convert to modern ScheduleManager schema
        return scheduledMealsData.map(mealData => {
            const recipe = this.recipes.find(r => r.id === mealData.recipe_id);
            if (!recipe) {
                console.warn(`Recipe ${mealData.recipe_id} not found for scheduled meal ${mealData.id}`);
                return null;
            }

            return {
                id: mealData.id,
                meal_id: `demo-meal-${mealData.id}`, // Generate meal ID for compatibility
                meal_name: recipe.title, // Use recipe title as meal name
                meal_type: mealData.meal_type,
                date: mealData.date,
                servings: 4, // Default servings
                notes: mealData.notes || '',
                recipes: [recipe], // Single recipe in array format
                recipe_id: mealData.recipe_id, // Keep for backward compatibility
                total_time: (recipe.prep_time || 0) + (recipe.cook_time || 0),
                created_at: new Date().toISOString()
            };
        }).filter(meal => meal !== null); // Remove any null entries
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

        // Calculate averages with proper rounding
        this.ingredients.forEach(ingredient => {
            if (ingredient.recipe_count > 0) {
                const avgQuantity = ingredient.avg_quantity / ingredient.recipe_count;
                ingredient.avg_quantity = Math.round(avgQuantity * 100) / 100;
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
