// Demo Data for MealPlanner
// Generated on 2025-09-10T13:11:42.370Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 25 ingredients across 6 categories
// - 15 recipes (15 basic, 0 combo)
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
                        "protein": 1,
                        "carbs": 43,
                        "fat": 9,
                        "calories": 194
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
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 10,
                        "carbs": 40,
                        "fat": 3,
                        "calories": 168
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
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 11,
                        "carbs": 5,
                        "fat": 11,
                        "calories": 98
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
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 52,
                        "fat": 3,
                        "calories": 209
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 2,
                        "carbs": 7,
                        "fat": 15,
                        "calories": 235
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 6,
                        "fat": 13,
                        "calories": 155
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
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 18,
                        "carbs": 38,
                        "fat": 7,
                        "calories": 242
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
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 43,
                        "fat": 4,
                        "calories": 152
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 11,
                        "fat": 10,
                        "calories": 180
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 5,
                        "fat": 8,
                        "calories": 199
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 42,
                        "fat": 2,
                        "calories": 190
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
                        "protein": 15,
                        "carbs": 37,
                        "fat": 13,
                        "calories": 150
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 37,
                        "fat": 3,
                        "calories": 229
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 13,
                        "carbs": 24,
                        "fat": 8,
                        "calories": 117
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
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 2,
                        "carbs": 24,
                        "fat": 10,
                        "calories": 100
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 4,
                        "carbs": 49,
                        "fat": 7,
                        "calories": 95
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 30,
                        "fat": 5,
                        "calories": 99
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 44,
                        "fat": 8,
                        "calories": 237
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
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 16,
                        "carbs": 43,
                        "fat": 5,
                        "calories": 227
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
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 2,
                        "carbs": 22,
                        "fat": 2,
                        "calories": 189
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ]
        },
        {
                "id": 21,
                "name": "Vanilla",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 19,
                        "carbs": 48,
                        "fat": 3,
                        "calories": 73
                },
                "labels": "baking"
        },
        {
                "id": 22,
                "name": "Mushrooms",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 2,
                        "carbs": 22,
                        "fat": 3,
                        "calories": 172
                },
                "labels": "vitamin-rich"
        },
        {
                "id": 23,
                "name": "Flour",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 21,
                        "fat": 15,
                        "calories": 144
                },
                "labels": "staple"
        },
        {
                "id": 24,
                "name": "Frozen Corn",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 10,
                        "carbs": 51,
                        "fat": 14,
                        "calories": 200
                },
                "labels": "convenient"
        },
        {
                "id": 25,
                "name": "Zucchini",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 29,
                        "fat": 10,
                        "calories": 231
                },
                "labels": "healthy"
        }
];

        // Comprehensive recipe list (15 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-06-01T14:15:00.000Z",
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
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 2,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-06-07T12:00:00.000Z",
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
                        "easy",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "lunch",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-06-15T14:45:00.000Z",
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
                        "savory",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-06-22T03:15:00.000Z",
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
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-06-29T04:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "healthy",
                        "protein",
                        "grilled",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "dinner",
                "prep_time": 20,
                "cook_time": 20,
                "created_at": "2025-07-05T18:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "healthy",
                        "protein",
                        "grilled",
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
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 2,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 7,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 25,
                "created_at": "2025-07-12T03:30:00.000Z",
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
                        "hearty",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 25,
                "created_at": "2025-07-18T13:30:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-07-24T14:00:00.000Z",
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
                        "comfort",
                        "easy",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 15,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-01T16:45:00.000Z",
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
                        "quick",
                        "comfort",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 11,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 20,
                "cook_time": 20,
                "created_at": "2025-08-07T17:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "healthy",
                        "protein",
                        "grilled",
                        "quick"
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
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 12,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "lunch",
                "prep_time": 10,
                "cook_time": 5,
                "created_at": "2025-08-14T22:45:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 13,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "snack",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-20T17:15:00.000Z",
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
                        "savory"
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 14,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-29T03:00:00.000Z",
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
                        "sweet",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 15,
                "title": "Chicken Breast Breakfast Bowl",
                "description": "Nutritious breakfast bowl with chicken breast and fresh ingredients",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 3,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-09-04T02:45:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
                                "servings": 3
                        },
                        {
                                "recipeId": 4,
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
                        "mediterranean"
                ],
                "tags": [
                        "weeknight"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-25T13:11:42.369Z",
                "updatedAt": "2025-09-04T13:11:42.369Z"
        },
        {
                "id": 2,
                "name": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 2
                        },
                        {
                                "recipeId": 3,
                                "servings": 4
                        },
                        {
                                "recipeId": 12,
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
                        "date-night"
                ],
                "estimatedTime": 80,
                "createdAt": "2025-09-05T13:11:42.369Z",
                "updatedAt": "2025-09-05T13:11:42.369Z"
        },
        {
                "id": 3,
                "name": "Italian Night",
                "description": "Classic italian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 3
                        },
                        {
                                "recipeId": 11,
                                "servings": 2
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "italian"
                ],
                "tags": [
                        "special-occasion"
                ],
                "estimatedTime": 80,
                "createdAt": "2025-08-16T13:11:42.369Z",
                "updatedAt": "2025-09-06T13:11:42.369Z"
        },
        {
                "id": 4,
                "name": "Healthy Family Dinner",
                "description": "A hearty family dinner with healthy favorites",
                "recipes": [
                        {
                                "recipeId": 11,
                                "servings": 2
                        },
                        {
                                "recipeId": 5,
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
                        "healthy"
                ],
                "tags": [
                        "weeknight"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-22T13:11:42.369Z",
                "updatedAt": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 5,
                "name": "Italian Family Dinner",
                "description": "A hearty family dinner with italian favorites",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 2
                        },
                        {
                                "recipeId": 5,
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
                        "special-occasion"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-20T13:11:42.369Z",
                "updatedAt": "2025-09-05T13:11:42.369Z"
        },
        {
                "id": 6,
                "name": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipes": [
                        {
                                "recipeId": 12,
                                "servings": 2
                        },
                        {
                                "recipeId": 10,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
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
                        "italian"
                ],
                "tags": [
                        "weekend"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-09-04T13:11:42.369Z",
                "updatedAt": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 7,
                "name": "Italian Night",
                "description": "Classic italian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 11,
                                "servings": 3
                        },
                        {
                                "recipeId": 6,
                                "servings": 2
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "italian"
                ],
                "tags": [
                        "crowd-pleaser"
                ],
                "estimatedTime": 80,
                "createdAt": "2025-08-22T13:11:42.369Z",
                "updatedAt": "2025-09-07T13:11:42.369Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 6,
                "recipe_id": 12,
                "scheduled_date": "2025-09-11",
                "meal_type": "lunch",
                "servings": 2,
                "notes": "Scheduled Quick Chicken Breast Wrap",
                "recipes": [
                        {
                                "recipeId": 12,
                                "servings": 2
                        }
                ],
                "total_time": 15,
                "created_at": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 3,
                "meal_id": 2,
                "scheduled_date": "2025-09-12",
                "meal_type": "lunch",
                "servings": 4,
                "notes": "Scheduled Italian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 2
                        },
                        {
                                "recipeId": 3,
                                "servings": 4
                        },
                        {
                                "recipeId": 12,
                                "servings": 3
                        }
                ],
                "recipe_id": 4,
                "total_time": 80,
                "created_at": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 7,
                "meal_id": 2,
                "scheduled_date": "2025-09-19",
                "meal_type": "lunch",
                "servings": 4,
                "notes": "Scheduled Italian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 2
                        },
                        {
                                "recipeId": 3,
                                "servings": 4
                        },
                        {
                                "recipeId": 12,
                                "servings": 3
                        }
                ],
                "recipe_id": 4,
                "total_time": 80,
                "created_at": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 4,
                "meal_id": 3,
                "scheduled_date": "2025-09-22",
                "meal_type": "dinner",
                "servings": 3,
                "notes": "Scheduled Italian Night",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 3
                        },
                        {
                                "recipeId": 11,
                                "servings": 2
                        }
                ],
                "recipe_id": 6,
                "total_time": 80,
                "created_at": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 5,
                "meal_id": 1,
                "scheduled_date": "2025-09-23",
                "meal_type": "lunch",
                "servings": 3,
                "notes": "Scheduled Mediterranean Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
                                "servings": 3
                        },
                        {
                                "recipeId": 4,
                                "servings": 2
                        }
                ],
                "recipe_id": 10,
                "total_time": 85,
                "created_at": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 2,
                "recipe_id": 3,
                "scheduled_date": "2025-09-26",
                "meal_type": "lunch",
                "servings": 2,
                "notes": "Scheduled Quick Chicken Breast Wrap",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 2
                        }
                ],
                "total_time": 20,
                "created_at": "2025-09-10T13:11:42.369Z"
        },
        {
                "id": 1,
                "meal_id": 1,
                "scheduled_date": "2025-09-27",
                "meal_type": "lunch",
                "servings": 3,
                "notes": "Scheduled Mediterranean Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 2
                        },
                        {
                                "recipeId": 12,
                                "servings": 3
                        },
                        {
                                "recipeId": 4,
                                "servings": 2
                        }
                ],
                "recipe_id": 10,
                "total_time": 85,
                "created_at": "2025-09-10T13:11:42.369Z"
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