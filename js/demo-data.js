// Demo Data for MealPlanner
// Generated on 2025-09-10T13:14:48.496Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 25 ingredients across 6 categories
// - 20 recipes (20 basic, 0 combo)
// - 7 meals combining multiple recipes
// - 7 scheduled meals for planning
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
        // Comprehensive ingredient list (25 items)
        this.ingredients = [
        {
                "id": 1,
                "name": "Chicken Breast",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 17,
                        "carbs": 29,
                        "fat": 9,
                        "calories": 61
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ]
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 20,
                        "carbs": 50,
                        "fat": 7,
                        "calories": 232
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ]
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 15,
                        "carbs": 38,
                        "fat": 3,
                        "calories": 115
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ]
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 6,
                        "carbs": 36,
                        "fat": 2,
                        "calories": 233
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ]
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 9,
                        "carbs": 36,
                        "fat": 10,
                        "calories": 96
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ]
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 18,
                        "fat": 15,
                        "calories": 208
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ]
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 24,
                        "fat": 15,
                        "calories": 237
                },
                "labels": [
                        "vegetable",
                        "sweet",
                        "vitamin-a"
                ]
        },
        {
                "id": 8,
                "name": "Bell Peppers",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 28,
                        "fat": 14,
                        "calories": 142
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ]
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 9,
                        "fat": 10,
                        "calories": 187
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ]
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 12,
                        "carbs": 20,
                        "fat": 3,
                        "calories": 84
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ]
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 18,
                        "carbs": 40,
                        "fat": 14,
                        "calories": 225
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ]
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 46,
                        "fat": 10,
                        "calories": 188
                },
                "labels": [
                        "leafy-green",
                        "iron",
                        "healthy"
                ]
        },
        {
                "id": 13,
                "name": "Rice",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 18,
                        "fat": 5,
                        "calories": 238
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ]
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 48,
                        "fat": 3,
                        "calories": 142
                },
                "labels": [
                        "grain",
                        "italian",
                        "comfort"
                ]
        },
        {
                "id": 15,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 8,
                        "carbs": 6,
                        "fat": 6,
                        "calories": 75
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ]
        },
        {
                "id": 16,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 4,
                        "carbs": 12,
                        "fat": 12,
                        "calories": 164
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ]
        },
        {
                "id": 17,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 3,
                        "carbs": 12,
                        "fat": 7,
                        "calories": 128
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ]
        },
        {
                "id": 18,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 40,
                        "fat": 4,
                        "calories": 83
                },
                "labels": [
                        "seasoning",
                        "spice",
                        "flavor"
                ]
        },
        {
                "id": 19,
                "name": "Butter",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 18,
                        "carbs": 48,
                        "fat": 15,
                        "calories": 191
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ]
        },
        {
                "id": 20,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 41,
                        "fat": 12,
                        "calories": 160
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ]
        },
        {
                "id": 21,
                "name": "Ice Cream",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 19,
                        "carbs": 53,
                        "fat": 12,
                        "calories": 85
                },
                "labels": "long-lasting"
        },
        {
                "id": 22,
                "name": "Flour",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 28,
                        "fat": 14,
                        "calories": 144
                },
                "labels": "baking"
        },
        {
                "id": 23,
                "name": "Yogurt",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 18,
                        "carbs": 16,
                        "fat": 9,
                        "calories": 176
                },
                "labels": "calcium"
        },
        {
                "id": 24,
                "name": "Frozen Corn",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 17,
                        "carbs": 14,
                        "fat": 3,
                        "calories": 223
                },
                "labels": "convenient"
        },
        {
                "id": 25,
                "name": "Shrimp",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 14,
                        "carbs": 54,
                        "fat": 4,
                        "calories": 126
                },
                "labels": "hearty"
        }
];

        // Comprehensive recipe list (20 items)
        this.recipes = [
            {
                "id": 1,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-05-31T22:15:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "breakfast",
                        "comfort",
                        "sweet",
                        "quick",
                        "sweet",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 15,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 2,
                "title": "Chicken Breast Breakfast Bowl",
                "description": "Nutritious breakfast bowl with chicken breast and fresh ingredients",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 3,
                "meal_type": "breakfast",
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-06-05T18:15:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "breakfast",
                        "healthy",
                        "bowl",
                        "healthy",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 3,
                "meal_type": "lunch",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-06-11T12:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "lunch",
                        "quick",
                        "portable",
                        "wrap",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "lunch",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-06-16T03:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "lunch",
                        "quick",
                        "portable",
                        "wrap",
                        "healthy",
                        "fresh",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 25,
                "cook_time": 45,
                "created_at": "2025-06-21T02:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "comfort",
                        "hearty",
                        "baked",
                        "spicy",
                        "comfort",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 20,
                "cook_time": 35,
                "created_at": "2025-06-26T20:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "comfort",
                        "hearty",
                        "baked",
                        "spicy",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 7,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-01T14:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "snack",
                        "roasted",
                        "savory",
                        "healthy",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "snack",
                "prep_time": 20,
                "cook_time": 0,
                "created_at": "2025-07-07T12:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "snack",
                        "energy",
                        "healthy",
                        "no-bake",
                        "quick",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "breakfast",
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-11T10:15:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "breakfast",
                        "quick",
                        "protein",
                        "savory",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "lunch",
                "prep_time": 20,
                "cook_time": 35,
                "created_at": "2025-07-16T20:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "lunch",
                        "comfort",
                        "soup",
                        "warming",
                        "easy",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 11,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-07-22T01:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "lunch",
                        "healthy",
                        "fresh",
                        "salad",
                        "spicy",
                        "hearty",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 12,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-27T21:15:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "breakfast",
                        "quick",
                        "protein",
                        "fresh",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 13,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-31T17:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "snack",
                        "roasted",
                        "savory",
                        "healthy",
                        "savory",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 14,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 8,
                "meal_type": "snack",
                "prep_time": 20,
                "cook_time": 0,
                "created_at": "2025-08-06T12:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "snack",
                        "energy",
                        "healthy",
                        "no-bake",
                        "sweet",
                        "savory",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 15,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 30,
                "created_at": "2025-08-10T21:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "snack",
                        "healthy",
                        "crispy",
                        "baked",
                        "sweet",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 16,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-15T23:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "snack",
                        "roasted",
                        "savory",
                        "healthy",
                        "comfort",
                        "savory",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.25,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 17,
                "title": "Chicken Breast Stir Fry",
                "description": "Quick and healthy stir-fried chicken breast with mixed vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-21T18:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "quick",
                        "healthy",
                        "asian",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.75,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 18,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 15,
                "cook_time": 35,
                "created_at": "2025-08-26T22:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "lunch",
                        "comfort",
                        "soup",
                        "warming",
                        "savory",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 19,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "dinner",
                "prep_time": 25,
                "cook_time": 45,
                "created_at": "2025-08-31T07:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "comfort",
                        "hearty",
                        "baked",
                        "savory",
                        "fresh",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "snack",
                "prep_time": 5,
                "cook_time": 15,
                "created_at": "2025-09-06T09:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "snack",
                        "roasted",
                        "savory",
                        "healthy",
                        "easy",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "lbs"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Asian Family Dinner",
                "description": "A hearty family dinner with asian favorites",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 3
                        },
                        {
                                "recipeId": 17,
                                "servings": 2
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "asian"
                ],
                "tags": [
                        "comfort",
                        "weekend"
                ],
                "estimatedTime": 80,
                "createdAt": "2025-08-20T13:14:48.495Z",
                "updatedAt": "2025-09-07T13:14:48.495Z"
        },
        {
                "id": 2,
                "name": "Asian Night",
                "description": "Classic asian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 4
                        },
                        {
                                "recipeId": 19,
                                "servings": 3
                        },
                        {
                                "recipeId": 17,
                                "servings": 3
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "asian"
                ],
                "tags": [
                        "weekend"
                ],
                "estimatedTime": 150,
                "createdAt": "2025-08-24T13:14:48.495Z",
                "updatedAt": "2025-09-10T13:14:48.495Z"
        },
        {
                "id": 3,
                "name": "Mexican Lunch Combo",
                "description": "Perfect mexican lunch combination",
                "recipes": [
                        {
                                "recipeId": 18,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 10,
                                "servings": 3
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "lunch"
                ],
                "labels": [
                        "midday",
                        "satisfying",
                        "mexican"
                ],
                "tags": [
                        "crowd-pleaser",
                        "weekend"
                ],
                "estimatedTime": 125,
                "createdAt": "2025-08-18T13:14:48.495Z",
                "updatedAt": "2025-09-06T13:14:48.495Z"
        },
        {
                "id": 4,
                "name": "Mediterranean Family Dinner",
                "description": "A hearty family dinner with mediterranean favorites",
                "recipes": [
                        {
                                "recipeId": 19,
                                "servings": 3
                        },
                        {
                                "recipeId": 5,
                                "servings": 3
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        },
                        {
                                "recipeId": 17,
                                "servings": 3
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "mediterranean"
                ],
                "tags": [
                        "healthy"
                ],
                "estimatedTime": 220,
                "createdAt": "2025-08-24T13:14:48.495Z",
                "updatedAt": "2025-09-06T13:14:48.495Z"
        },
        {
                "id": 5,
                "name": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
                "recipes": [
                        {
                                "recipeId": 18,
                                "servings": 4
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "lunch"
                ],
                "labels": [
                        "midday",
                        "satisfying",
                        "mediterranean"
                ],
                "tags": [
                        "weekend"
                ],
                "estimatedTime": 50,
                "createdAt": "2025-08-15T13:14:48.495Z",
                "updatedAt": "2025-09-05T13:14:48.495Z"
        },
        {
                "id": 6,
                "name": "Quick Mexican Breakfast",
                "description": "Fast and delicious mexican breakfast",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
                                "servings": 4
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "breakfast"
                ],
                "labels": [
                        "quick",
                        "morning",
                        "mexican"
                ],
                "tags": [
                        "family-friendly"
                ],
                "estimatedTime": 40,
                "createdAt": "2025-08-12T13:14:48.495Z",
                "updatedAt": "2025-09-07T13:14:48.495Z"
        },
        {
                "id": 7,
                "name": "Italian Family Dinner",
                "description": "A hearty family dinner with italian favorites",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 2
                        },
                        {
                                "recipeId": 19,
                                "servings": 3
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "italian"
                ],
                "tags": [
                        "weekend"
                ],
                "estimatedTime": 95,
                "createdAt": "2025-08-16T13:14:48.495Z",
                "updatedAt": "2025-09-04T13:14:48.495Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 5,
                "meal_id": 1,
                "scheduled_date": "2025-09-12",
                "meal_type": "dinner",
                "servings": 3,
                "notes": "Scheduled Asian Family Dinner",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 3
                        },
                        {
                                "recipeId": 17,
                                "servings": 2
                        }
                ],
                "recipe_id": 6,
                "total_time": 80,
                "created_at": "2025-09-10T13:14:48.495Z"
        },
        {
                "id": 7,
                "meal_id": 4,
                "scheduled_date": "2025-09-13",
                "meal_type": "dinner",
                "servings": 3,
                "notes": "Scheduled Mediterranean Family Dinner",
                "recipes": [
                        {
                                "recipeId": 19,
                                "servings": 3
                        },
                        {
                                "recipeId": 5,
                                "servings": 3
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        },
                        {
                                "recipeId": 17,
                                "servings": 3
                        }
                ],
                "recipe_id": 19,
                "total_time": 220,
                "created_at": "2025-09-10T13:14:48.495Z"
        },
        {
                "id": 4,
                "meal_id": 6,
                "scheduled_date": "2025-09-14",
                "meal_type": "breakfast",
                "servings": 4,
                "notes": "Scheduled Quick Mexican Breakfast",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
                                "servings": 4
                        }
                ],
                "recipe_id": 1,
                "total_time": 40,
                "created_at": "2025-09-10T13:14:48.495Z"
        },
        {
                "id": 1,
                "meal_id": 1,
                "scheduled_date": "2025-09-17",
                "meal_type": "dinner",
                "servings": 3,
                "notes": "Scheduled Asian Family Dinner",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 3
                        },
                        {
                                "recipeId": 17,
                                "servings": 2
                        }
                ],
                "recipe_id": 6,
                "total_time": 80,
                "created_at": "2025-09-10T13:14:48.495Z"
        },
        {
                "id": 3,
                "meal_id": 7,
                "scheduled_date": "2025-09-24",
                "meal_type": "dinner",
                "servings": 3,
                "notes": "Scheduled Italian Family Dinner",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 2
                        },
                        {
                                "recipeId": 19,
                                "servings": 3
                        }
                ],
                "recipe_id": 17,
                "total_time": 95,
                "created_at": "2025-09-10T13:14:48.495Z"
        },
        {
                "id": 2,
                "meal_id": 7,
                "scheduled_date": "2025-09-25",
                "meal_type": "dinner",
                "servings": 3,
                "notes": "Scheduled Italian Family Dinner",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 2
                        },
                        {
                                "recipeId": 19,
                                "servings": 3
                        }
                ],
                "recipe_id": 17,
                "total_time": 95,
                "created_at": "2025-09-10T13:14:48.495Z"
        },
        {
                "id": 6,
                "meal_id": 6,
                "scheduled_date": "2025-09-28",
                "meal_type": "breakfast",
                "servings": 4,
                "notes": "Scheduled Quick Mexican Breakfast",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
                                "servings": 4
                        }
                ],
                "recipe_id": 1,
                "total_time": 40,
                "created_at": "2025-09-10T13:14:48.495Z"
        }
];
    }

    // Migration method for label types (placeholder - implement as needed)
    migrateToLabelTypes() {
        // Label type migration logic would go here
        console.log('📱 Label types migration completed');
    }

    // Get all data
    getAllData() {
        return {
            ingredients: this.ingredients,
            recipes: this.recipes,
            meals: this.meals,
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

    // Get meals
    getMeals() {
        return this.meals;
    }

    // Get scheduled meals
    getScheduledMeals() {
        return this.scheduledMeals;
    }

    // Validation method to ensure data consistency
    validateConsistency() {
        const issues = [];

        // Check recipe-ingredient references
        this.recipes.forEach(recipe => {
            if (recipe.ingredients) {
                recipe.ingredients.forEach(recipeIng => {
                    const ingredient = this.ingredients.find(ing => ing.id === recipeIng.ingredient_id);
                    if (!ingredient) {
                        issues.push(`Recipe "${recipe.title}" references non-existent ingredient ID ${recipeIng.ingredient_id}`);
                    }
                });
            }
        });

        // Check meal-recipe references
        this.meals.forEach(meal => {
            if (meal.recipes) {
                meal.recipes.forEach(mealRecipe => {
                    const recipe = this.recipes.find(r => r.id === mealRecipe.recipeId);
                    if (!recipe) {
                        issues.push(`Meal "${meal.name}" references non-existent recipe ID ${mealRecipe.recipeId}`);
                    }
                });
            }
        });

        // Check scheduled meal references
        this.scheduledMeals.forEach(scheduled => {
            if (scheduled.meal_id) {
                const meal = this.meals.find(m => m.id === scheduled.meal_id);
                if (!meal) {
                    issues.push(`Scheduled meal references non-existent meal ID ${scheduled.meal_id}`);
                }
            }
            if (scheduled.recipe_id) {
                const recipe = this.recipes.find(r => r.id === scheduled.recipe_id);
                if (!recipe) {
                    issues.push(`Scheduled meal references non-existent recipe ID ${scheduled.recipe_id}`);
                }
            }
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