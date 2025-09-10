// Demo Data for MealPlanner
// Generated on 2025-09-10T13:13:18.321Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 25 ingredients across 5 categories
// - 12 recipes (12 basic, 0 combo)
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
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 5,
                        "carbs": 19,
                        "fat": 9,
                        "calories": 228
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
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 6,
                        "carbs": 44,
                        "fat": 8,
                        "calories": 170
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
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 1,
                        "carbs": 15,
                        "fat": 4,
                        "calories": 149
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
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 16,
                        "carbs": 52,
                        "fat": 3,
                        "calories": 124
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
                "default_unit": "packages",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 16,
                        "carbs": 42,
                        "fat": 7,
                        "calories": 116
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
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 3,
                        "carbs": 7,
                        "fat": 9,
                        "calories": 51
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
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 27,
                        "fat": 7,
                        "calories": 178
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
                        "protein": 13,
                        "carbs": 17,
                        "fat": 14,
                        "calories": 61
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
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 1,
                        "carbs": 52,
                        "fat": 7,
                        "calories": 68
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 17,
                        "carbs": 48,
                        "fat": 13,
                        "calories": 176
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
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 1,
                        "carbs": 36,
                        "fat": 15,
                        "calories": 149
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 11,
                        "carbs": 22,
                        "fat": 5,
                        "calories": 221
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
                        "protein": 15,
                        "carbs": 26,
                        "fat": 11,
                        "calories": 228
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 13,
                        "carbs": 31,
                        "fat": 3,
                        "calories": 227
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
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 13,
                        "carbs": 27,
                        "fat": 7,
                        "calories": 194
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 51,
                        "fat": 8,
                        "calories": 116
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
                        "protein": 7,
                        "carbs": 23,
                        "fat": 6,
                        "calories": 115
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
                        "protein": 10,
                        "carbs": 45,
                        "fat": 6,
                        "calories": 53
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
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 11,
                        "carbs": 23,
                        "fat": 15,
                        "calories": 148
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
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 31,
                        "fat": 1,
                        "calories": 192
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ]
        },
        {
                "id": 21,
                "name": "Croissants",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 16,
                        "carbs": 50,
                        "fat": 7,
                        "calories": 104
                },
                "labels": "comfort"
        },
        {
                "id": 22,
                "name": "Turkey",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 8,
                        "carbs": 28,
                        "fat": 12,
                        "calories": 109
                },
                "labels": "protein"
        },
        {
                "id": 23,
                "name": "Sugar",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 4,
                        "carbs": 47,
                        "fat": 13,
                        "calories": 207
                },
                "labels": "staple"
        },
        {
                "id": 24,
                "name": "Tuna",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 18,
                        "carbs": 28,
                        "fat": 7,
                        "calories": 170
                },
                "labels": "hearty"
        },
        {
                "id": 25,
                "name": "Croissants",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 13,
                        "carbs": 43,
                        "fat": 4,
                        "calories": 129
                },
                "labels": "carbs"
        }
];

        // Comprehensive recipe list (12 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-05-31T16:00:00.000Z",
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
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "cook_time": 10,
                "created_at": "2025-06-10T05:30:00.000Z",
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
                        "savory",
                        "hearty",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 15,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-06-17T12:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "lunch",
                        "healthy",
                        "fresh",
                        "salad",
                        "savory",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "heads"
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
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "lunch",
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-06-27T02:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "lunch",
                        "healthy",
                        "fresh",
                        "salad",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
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
                                "ingredient_id": 8,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Chicken Breast Stir Fry",
                "description": "Quick and healthy stir-fried chicken breast with mixed vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "dinner",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-06T05:15:00.000Z",
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
                        "fresh",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 25,
                "cook_time": 45,
                "created_at": "2025-07-13T08:30:00.000Z",
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
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
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
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 7,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-21T13:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "snack",
                        "roasted",
                        "savory",
                        "healthy",
                        "comfort",
                        "fresh",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
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
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-07-30T02:30:00.000Z",
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
                        "savory",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
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
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 2,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "breakfast",
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-08T04:30:00.000Z",
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
                        "savory",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 15,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.75,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-16T12:15:00.000Z",
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
                        "easy",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 11,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "lunch",
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-08-23T20:00:00.000Z",
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
                        "quick",
                        "healthy",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 12,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "lunch",
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-09-03T00:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "lunch",
                        "comfort",
                        "soup",
                        "warming",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "boxes"
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
                                "ingredient_id": 25,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Quick Asian Breakfast",
                "description": "Fast and delicious asian breakfast",
                "recipes": [
                        {
                                "recipeId": 2,
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
                        "asian"
                ],
                "tags": [
                        "weeknight"
                ],
                "estimatedTime": 25,
                "createdAt": "2025-08-24T13:13:18.321Z",
                "updatedAt": "2025-09-04T13:13:18.321Z"
        },
        {
                "id": 2,
                "name": "American Family Dinner",
                "description": "A hearty family dinner with american favorites",
                "recipes": [
                        {
                                "recipeId": 11,
                                "servings": 2
                        },
                        {
                                "recipeId": 9,
                                "servings": 3
                        },
                        {
                                "recipeId": 4,
                                "servings": 2
                        },
                        {
                                "recipeId": 2,
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
                        "american"
                ],
                "tags": [
                        "weeknight"
                ],
                "estimatedTime": 110,
                "createdAt": "2025-08-20T13:13:18.321Z",
                "updatedAt": "2025-09-08T13:13:18.321Z"
        },
        {
                "id": 3,
                "name": "Quick Mediterranean Breakfast",
                "description": "Fast and delicious mediterranean breakfast",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 2,
                                "servings": 2
                        }
                ],
                "totalServings": 2,
                "mealTypes": [
                        "breakfast"
                ],
                "labels": [
                        "quick",
                        "morning",
                        "mediterranean"
                ],
                "tags": [
                        "special-occasion"
                ],
                "estimatedTime": 50,
                "createdAt": "2025-09-08T13:13:18.321Z",
                "updatedAt": "2025-09-10T13:13:18.321Z"
        },
        {
                "id": 4,
                "name": "Comfort Food Family Dinner",
                "description": "A hearty family dinner with comfort food favorites",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 4
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "comfort-food"
                ],
                "tags": [
                        "healthy",
                        "special-occasion"
                ],
                "estimatedTime": 95,
                "createdAt": "2025-08-22T13:13:18.321Z",
                "updatedAt": "2025-09-04T13:13:18.321Z"
        },
        {
                "id": 5,
                "name": "Quick Mexican Breakfast",
                "description": "Fast and delicious mexican breakfast",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 3
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "breakfast"
                ],
                "labels": [
                        "quick",
                        "morning",
                        "mexican"
                ],
                "tags": [
                        "date-night",
                        "comfort"
                ],
                "estimatedTime": 25,
                "createdAt": "2025-08-26T13:13:18.321Z",
                "updatedAt": "2025-09-07T13:13:18.321Z"
        },
        {
                "id": 6,
                "name": "Italian Night",
                "description": "Classic italian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 4
                        },
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
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
                        "italian"
                ],
                "tags": [
                        "date-night"
                ],
                "estimatedTime": 115,
                "createdAt": "2025-09-08T13:13:18.321Z",
                "updatedAt": "2025-09-05T13:13:18.321Z"
        },
        {
                "id": 7,
                "name": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
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
                        "healthy",
                        "special-occasion"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-31T13:13:18.321Z",
                "updatedAt": "2025-09-06T13:13:18.321Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 4,
                "recipe_id": 10,
                "scheduled_date": "2025-09-16",
                "meal_type": "breakfast",
                "servings": 2,
                "notes": "Scheduled Scrambled Eggs with Bread",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 2
                        }
                ],
                "total_time": 25,
                "created_at": "2025-09-10T13:13:18.321Z"
        },
        {
                "id": 3,
                "meal_id": 6,
                "scheduled_date": "2025-09-18",
                "meal_type": "dinner",
                "servings": 4,
                "notes": "Scheduled Italian Night",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 4
                        },
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 3
                        }
                ],
                "recipe_id": 6,
                "total_time": 115,
                "created_at": "2025-09-10T13:13:18.321Z"
        },
        {
                "id": 2,
                "recipe_id": 10,
                "scheduled_date": "2025-09-20",
                "meal_type": "breakfast",
                "servings": 2,
                "notes": "Scheduled Scrambled Eggs with Bread",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 2
                        }
                ],
                "total_time": 25,
                "created_at": "2025-09-10T13:13:18.321Z"
        },
        {
                "id": 1,
                "recipe_id": 4,
                "scheduled_date": "2025-09-22",
                "meal_type": "lunch",
                "servings": 2,
                "notes": "Scheduled Chicken Breast Lunch Salad",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 2
                        }
                ],
                "total_time": 20,
                "created_at": "2025-09-10T13:13:18.321Z"
        },
        {
                "id": 5,
                "recipe_id": 2,
                "scheduled_date": "2025-09-23",
                "meal_type": "breakfast",
                "servings": 4,
                "notes": "Scheduled Morning Bread Stack",
                "recipes": [
                        {
                                "recipeId": 2,
                                "servings": 4
                        }
                ],
                "total_time": 25,
                "created_at": "2025-09-10T13:13:18.321Z"
        },
        {
                "id": 6,
                "meal_id": 1,
                "scheduled_date": "2025-09-24",
                "meal_type": "breakfast",
                "servings": 4,
                "notes": "Scheduled Quick Asian Breakfast",
                "recipes": [
                        {
                                "recipeId": 2,
                                "servings": 4
                        }
                ],
                "recipe_id": 2,
                "total_time": 25,
                "created_at": "2025-09-10T13:13:18.321Z"
        },
        {
                "id": 7,
                "meal_id": 7,
                "scheduled_date": "2025-09-29",
                "meal_type": "lunch",
                "servings": 4,
                "notes": "Scheduled Mediterranean Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
                                "servings": 2
                        }
                ],
                "recipe_id": 4,
                "total_time": 85,
                "created_at": "2025-09-10T13:13:18.321Z"
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