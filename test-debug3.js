// Demo Data for MealPlanner
// Generated on 2025-09-10T13:14:25.386Z
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
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 18,
                        "carbs": 10,
                        "fat": 13,
                        "calories": 221
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
                        "protein": 4,
                        "carbs": 9,
                        "fat": 11,
                        "calories": 52
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
                        "protein": 16,
                        "carbs": 38,
                        "fat": 8,
                        "calories": 78
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
                        "protein": 14,
                        "carbs": 23,
                        "fat": 10,
                        "calories": 136
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
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 39,
                        "fat": 9,
                        "calories": 133
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
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 47,
                        "fat": 11,
                        "calories": 149
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
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 3,
                        "carbs": 14,
                        "fat": 1,
                        "calories": 195
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
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 10,
                        "carbs": 54,
                        "fat": 9,
                        "calories": 103
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
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 48,
                        "fat": 12,
                        "calories": 58
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
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 13,
                        "carbs": 36,
                        "fat": 12,
                        "calories": 224
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
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 25,
                        "fat": 7,
                        "calories": 213
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
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 13,
                        "carbs": 9,
                        "fat": 11,
                        "calories": 205
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 9,
                        "fat": 5,
                        "calories": 189
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
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 29,
                        "fat": 13,
                        "calories": 69
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
                        "protein": 9,
                        "carbs": 46,
                        "fat": 4,
                        "calories": 114
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
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 16,
                        "carbs": 17,
                        "fat": 8,
                        "calories": 145
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
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 4,
                        "carbs": 14,
                        "fat": 12,
                        "calories": 211
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
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 27,
                        "fat": 11,
                        "calories": 176
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
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 11,
                        "carbs": 22,
                        "fat": 11,
                        "calories": 205
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
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 32,
                        "fat": 3,
                        "calories": 91
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ]
        },
        {
                "id": 21,
                "name": "Yogurt",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 15,
                        "carbs": 10,
                        "fat": 1,
                        "calories": 158
                },
                "labels": "calcium"
        },
        {
                "id": 22,
                "name": "Frozen Peas",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 10,
                        "carbs": 39,
                        "fat": 12,
                        "calories": 140
                },
                "labels": "convenient"
        },
        {
                "id": 23,
                "name": "Bagels",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 12,
                        "carbs": 29,
                        "fat": 5,
                        "calories": 149
                },
                "labels": "comfort"
        },
        {
                "id": 24,
                "name": "Cucumber",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 50,
                        "fat": 15,
                        "calories": 148
                },
                "labels": "vitamin-rich"
        },
        {
                "id": 25,
                "name": "Frozen Peas",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 8,
                        "carbs": 54,
                        "fat": 13,
                        "calories": 237
                },
                "labels": "convenient"
        }
];

        // Comprehensive recipe list (20 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-06-01T22:45:00.000Z",
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
                        "savory",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 2,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-06-06T16:15:00.000Z",
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
                        "spicy",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 15,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-06-12T04:15:00.000Z",
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
                        "hearty",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "lunch",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-06-15T23:00:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Chicken Breast Stir Fry",
                "description": "Quick and healthy stir-fried chicken breast with mixed vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-22T05:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "quick",
                        "healthy",
                        "asian",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-06-26T09:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "healthy",
                        "protein",
                        "grilled",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 7,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-01T20:15:00.000Z",
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
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-07-06T12:30:00.000Z",
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
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-07-12T06:00:00.000Z",
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
                        "healthy",
                        "crispy",
                        "baked",
                        "savory",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-16T09:30:00.000Z",
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
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 11,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-22T10:45:00.000Z",
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
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 12,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 25,
                "created_at": "2025-07-27T01:15:00.000Z",
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
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 13,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "snack",
                "prep_time": 15,
                "cook_time": 30,
                "created_at": "2025-07-31T17:15:00.000Z",
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
                        "fresh",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 14,
                "title": "Chicken Breast Stir Fry",
                "description": "Quick and healthy stir-fried chicken breast with mixed vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-08-06T05:15:00.000Z",
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
                        "easy",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 15,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "dinner",
                "prep_time": 20,
                "cook_time": 30,
                "created_at": "2025-08-11T06:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "healthy",
                        "protein",
                        "grilled",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 16,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "snack",
                "prep_time": 20,
                "cook_time": 5,
                "created_at": "2025-08-16T00:45:00.000Z",
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
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 17,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-08-22T05:30:00.000Z",
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
                        "spicy",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 18,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-08-26T00:45:00.000Z",
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
                        "healthy",
                        "crispy",
                        "baked",
                        "spicy",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 19,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "snack",
                "prep_time": 5,
                "cook_time": 15,
                "created_at": "2025-09-01T09:45:00.000Z",
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
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 15,
                "cook_time": 30,
                "created_at": "2025-09-06T05:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "snack",
                        "healthy",
                        "crispy",
                        "baked",
                        "hearty",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "gallons"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Healthy Family Dinner",
                "description": "A hearty family dinner with healthy favorites",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 2
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "totalServings": 2,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "healthy"
                ],
                "tags": [
                        "weeknight",
                        "date-night"
                ],
                "estimatedTime": 75,
                "createdAt": "2025-08-18T13:14:25.385Z",
                "updatedAt": "2025-09-05T13:14:25.385Z"
        },
        {
                "id": 2,
                "name": "Mediterranean Family Dinner",
                "description": "A hearty family dinner with mediterranean favorites",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "mediterranean"
                ],
                "tags": [
                        "crowd-pleaser",
                        "family-friendly"
                ],
                "estimatedTime": 75,
                "createdAt": "2025-09-07T13:14:25.385Z",
                "updatedAt": "2025-09-06T13:14:25.385Z"
        },
        {
                "id": 3,
                "name": "Italian Night",
                "description": "Classic italian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 2
                        },
                        {
                                "recipeId": 5,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "italian"
                ],
                "tags": [
                        "date-night",
                        "crowd-pleaser"
                ],
                "estimatedTime": 105,
                "createdAt": "2025-08-21T13:14:25.385Z",
                "updatedAt": "2025-09-07T13:14:25.385Z"
        },
        {
                "id": 4,
                "name": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 4
                        },
                        {
                                "recipeId": 18,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 2
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
                        "family-friendly",
                        "date-night"
                ],
                "estimatedTime": 80,
                "createdAt": "2025-09-09T13:14:25.385Z",
                "updatedAt": "2025-09-05T13:14:25.385Z"
        },
        {
                "id": 5,
                "name": "Comfort Food Lunch Combo",
                "description": "Perfect comfort food lunch combination",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 3
                        },
                        {
                                "recipeId": 9,
                                "servings": 3
                        },
                        {
                                "recipeId": 18,
                                "servings": 2
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "lunch"
                ],
                "labels": [
                        "midday",
                        "satisfying",
                        "comfort-food"
                ],
                "tags": [
                        "healthy"
                ],
                "estimatedTime": 75,
                "createdAt": "2025-09-04T13:14:25.385Z",
                "updatedAt": "2025-09-06T13:14:25.385Z"
        },
        {
                "id": 6,
                "name": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 2
                        },
                        {
                                "recipeId": 2,
                                "servings": 4
                        },
                        {
                                "recipeId": 15,
                                "servings": 3
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "lunch"
                ],
                "labels": [
                        "midday",
                        "satisfying",
                        "italian"
                ],
                "tags": [
                        "special-occasion"
                ],
                "estimatedTime": 100,
                "createdAt": "2025-09-05T13:14:25.385Z",
                "updatedAt": "2025-09-06T13:14:25.385Z"
        },
        {
                "id": 7,
                "name": "Italian Family Dinner",
                "description": "A hearty family dinner with italian favorites",
                "recipes": [
                        {
                                "recipeId": 15,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "italian"
                ],
                "tags": [
                        "healthy",
                        "weekend"
                ],
                "estimatedTime": 95,
                "createdAt": "2025-08-14T13:14:25.385Z",
                "updatedAt": "2025-09-10T13:14:25.385Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 7,
                "meal_id": 4,
                "scheduled_date": "2025-09-10",
                "meal_type": "lunch",
                "servings": 4,
                "notes": "Scheduled Mediterranean Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 4
                        },
                        {
                                "recipeId": 18,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 2
                        }
                ],
                "recipe_id": 14,
                "total_time": 80,
                "created_at": "2025-09-10T13:14:25.385Z"
        },
        {
                "id": 3,
                "recipe_id": 13,
                "scheduled_date": "2025-09-14",
                "meal_type": "snack",
                "servings": 4,
                "notes": "Scheduled Broccoli Chips",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "total_time": 45,
                "created_at": "2025-09-10T13:14:25.385Z"
        },
        {
                "id": 6,
                "meal_id": 7,
                "scheduled_date": "2025-09-20",
                "meal_type": "dinner",
                "servings": 4,
                "notes": "Scheduled Italian Family Dinner",
                "recipes": [
                        {
                                "recipeId": 15,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "recipe_id": 15,
                "total_time": 95,
                "created_at": "2025-09-10T13:14:25.385Z"
        },
        {
                "id": 1,
                "meal_id": 1,
                "scheduled_date": "2025-09-24",
                "meal_type": "dinner",
                "servings": 2,
                "notes": "Scheduled Healthy Family Dinner",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 2
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "recipe_id": 5,
                "total_time": 75,
                "created_at": "2025-09-10T13:14:25.385Z"
        },
        {
                "id": 5,
                "meal_id": 3,
                "scheduled_date": "2025-09-25",
                "meal_type": "dinner",
                "servings": 4,
                "notes": "Scheduled Italian Night",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 2
                        },
                        {
                                "recipeId": 5,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "recipe_id": 14,
                "total_time": 105,
                "created_at": "2025-09-10T13:14:25.385Z"
        },
        {
                "id": 4,
                "meal_id": 2,
                "scheduled_date": "2025-09-28",
                "meal_type": "dinner",
                "servings": 4,
                "notes": "Scheduled Mediterranean Family Dinner",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "recipe_id": 14,
                "total_time": 75,
                "created_at": "2025-09-10T13:14:25.385Z"
        },
        {
                "id": 2,
                "recipe_id": 3,
                "scheduled_date": "2025-09-30",
                "meal_type": "lunch",
                "servings": 4,
                "notes": "Scheduled Chicken Breast Lunch Salad",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 4
                        }
                ],
                "total_time": 20,
                "created_at": "2025-09-10T13:14:25.385Z"
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
    module.exports = { DemoDataGenerator };
}