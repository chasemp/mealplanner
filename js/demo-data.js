// Demo Data for MealPlanner
// Generated on 2025-09-10T13:32:52.699Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 28 ingredients across 6 categories
// - 20 recipes (12 basic, 8 combo)
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
        // Comprehensive ingredient list (28 items)
        this.ingredients = [
        {
                "id": 1,
                "name": "Chicken Breast",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 17,
                        "carbs": 11,
                        "fat": 5,
                        "calories": 228
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 14,
                "total_quantity": 27,
                "avg_quantity": 1.9285714285714286
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 15,
                        "carbs": 37,
                        "fat": 14,
                        "calories": 50
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ],
                "recipe_count": 9,
                "total_quantity": 11.5,
                "avg_quantity": 1.2777777777777777
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 18,
                        "carbs": 9,
                        "fat": 5,
                        "calories": 165
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 4,
                "total_quantity": 7,
                "avg_quantity": 1.75
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 43,
                        "fat": 11,
                        "calories": 77
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 10,
                "total_quantity": 6.75,
                "avg_quantity": 0.675
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 8,
                        "carbs": 17,
                        "fat": 7,
                        "calories": 228
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 7,
                "total_quantity": 5.25,
                "avg_quantity": 0.75
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 7,
                        "carbs": 25,
                        "fat": 14,
                        "calories": 101
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 9,
                "total_quantity": 16.75,
                "avg_quantity": 1.8611111111111112
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 2,
                        "carbs": 14,
                        "fat": 3,
                        "calories": 206
                },
                "labels": [
                        "vegetable",
                        "sweet",
                        "vitamin-a"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 8,
                "name": "Bell Peppers",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 2,
                        "carbs": 24,
                        "fat": 7,
                        "calories": 200
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 7,
                "total_quantity": 9.25,
                "avg_quantity": 1.3214285714285714
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 20,
                        "fat": 2,
                        "calories": 188
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 8,
                "total_quantity": 14,
                "avg_quantity": 1.75
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 15,
                        "carbs": 43,
                        "fat": 3,
                        "calories": 202
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 7,
                "total_quantity": 10.5,
                "avg_quantity": 1.5
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 12,
                        "fat": 3,
                        "calories": 157
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 2,
                "total_quantity": 1.5,
                "avg_quantity": 0.75
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 6,
                        "fat": 4,
                        "calories": 149
                },
                "labels": [
                        "leafy-green",
                        "iron",
                        "healthy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 13,
                "name": "Rice",
                "category": "grains",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 18,
                        "carbs": 21,
                        "fat": 15,
                        "calories": 162
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 4,
                "total_quantity": 4.5,
                "avg_quantity": 1.125
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 32,
                        "fat": 1,
                        "calories": 229
                },
                "labels": [
                        "grain",
                        "italian",
                        "comfort"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 15,
                "name": "Quinoa",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 33,
                        "fat": 10,
                        "calories": 226
                },
                "labels": [
                        "grain",
                        "protein",
                        "healthy"
                ],
                "recipe_count": 5,
                "total_quantity": 2.5,
                "avg_quantity": 0.5
        },
        {
                "id": 16,
                "name": "Oats",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 5,
                        "fat": 3,
                        "calories": 147
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 3,
                "total_quantity": 2,
                "avg_quantity": 0.6666666666666666
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 13,
                        "carbs": 5,
                        "fat": 12,
                        "calories": 202
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 11,
                "total_quantity": 27,
                "avg_quantity": 2.4545454545454546
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 12,
                        "carbs": 13,
                        "fat": 11,
                        "calories": 84
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 5,
                "total_quantity": 2,
                "avg_quantity": 0.4
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 29,
                        "fat": 1,
                        "calories": 248
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 15,
                "total_quantity": 6.25,
                "avg_quantity": 0.4166666666666667
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 43,
                        "fat": 14,
                        "calories": 214
                },
                "labels": [
                        "seasoning",
                        "spice",
                        "flavor"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 21,
                "name": "Butter",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 6,
                        "carbs": 51,
                        "fat": 3,
                        "calories": 99
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 13,
                "total_quantity": 12.5,
                "avg_quantity": 0.9615384615384616
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 26,
                        "fat": 8,
                        "calories": 126
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 7,
                "total_quantity": 3.5,
                "avg_quantity": 0.5
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 4,
                        "carbs": 19,
                        "fat": 4,
                        "calories": 135
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 12,
                "total_quantity": 10,
                "avg_quantity": 0.8333333333333334
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "lbs",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 31,
                        "fat": 5,
                        "calories": 184
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 10,
                "total_quantity": 7.5,
                "avg_quantity": 0.75
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 50,
                        "fat": 1,
                        "calories": 66
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 3,
                "total_quantity": 4,
                "avg_quantity": 1.3333333333333333
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 12,
                        "carbs": 32,
                        "fat": 6,
                        "calories": 218
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 7,
                "total_quantity": 7,
                "avg_quantity": 1
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 14,
                        "carbs": 21,
                        "fat": 1,
                        "calories": 233
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 6,
                "total_quantity": 7,
                "avg_quantity": 1.1666666666666667
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 48,
                        "fat": 4,
                        "calories": 139
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 7,
                "total_quantity": 3,
                "avg_quantity": 0.42857142857142855
        }
];

        // Comprehensive recipe list (20 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T12:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "comfort",
                        "side-dish",
                        "savory",
                        "healthy",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-06T20:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "comfort",
                        "crispy",
                        "protein",
                        "sweet",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-12T00:15:00.000Z",
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
                        "vegetable",
                        "side-dish",
                        "sweet",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Garlic Bread",
                "description": "Toasted bread with garlic and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-16T23:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "bread",
                        "side-dish",
                        "garlic",
                        "hearty",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "meal_type": "lunch",
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-21T04:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "salad",
                        "fresh",
                        "classic",
                        "easy",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-26T10:00:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "breakfast",
                        "sweet",
                        "fluffy",
                        "quick",
                        "healthy",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 7,
                "title": "Bacon",
                "description": "Crispy breakfast bacon",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-07-01T17:45:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "breakfast",
                        "protein",
                        "crispy",
                        "spicy",
                        "quick",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-07T11:00:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "breakfast",
                        "crispy",
                        "potato",
                        "hearty",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 20,
                "cook_time": 35,
                "created_at": "2025-07-12T12:00:00.000Z",
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
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 8,
                "meal_type": "snack",
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-07-16T09:15:00.000Z",
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
                        "energy",
                        "healthy",
                        "no-bake",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 11,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "snack",
                "prep_time": 15,
                "cook_time": 30,
                "created_at": "2025-07-22T08:30:00.000Z",
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
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 12,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "breakfast",
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-27T15:00:00.000Z",
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
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 13,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 35,
                "cook_time": 25,
                "created_at": "2025-08-01T09:30:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "sunday-dinner",
                        "comfort-food"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 8,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 14,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "dinner",
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-08-06T18:15:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "italian",
                        "complete"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 8,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 15,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "breakfast",
                "prep_time": 22,
                "cook_time": 20,
                "created_at": "2025-08-10T16:45:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "american",
                        "hearty"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 7,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 2.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 16,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 15,
                "cook_time": 20,
                "created_at": "2025-08-16T22:15:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "healthy",
                        "seafood"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 17,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "dinner",
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-08-20T23:30:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "greek",
                        "mediterranean"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 6,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 5.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 18,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "meal_type": "lunch",
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-08-26T05:45:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "vegetarian",
                        "healthy"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 19,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 8,
                "meal_type": "breakfast",
                "prep_time": 35,
                "cook_time": 15,
                "created_at": "2025-08-31T16:15:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "brunch",
                        "weekend"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 8,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 10,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "meal_type": "lunch",
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-09-06T06:00:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "combo",
                        "light",
                        "fresh"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 3.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 2,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Healthy Lunch Combo",
                "description": "Perfect healthy lunch combination",
                "recipes": [
                        {
                                "recipeId": 20,
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
                        "healthy"
                ],
                "tags": [
                        "healthy"
                ],
                "estimatedTime": 40,
                "createdAt": "2025-09-09T13:32:52.698Z",
                "updatedAt": "2025-09-04T13:32:52.698Z"
        },
        {
                "id": 2,
                "name": "Asian Lunch Combo",
                "description": "Perfect asian lunch combination",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 2
                        },
                        {
                                "recipeId": 9,
                                "servings": 2
                        },
                        {
                                "recipeId": 18,
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
                        "asian"
                ],
                "tags": [
                        "special-occasion",
                        "weeknight"
                ],
                "estimatedTime": 100,
                "createdAt": "2025-08-12T13:32:52.698Z",
                "updatedAt": "2025-09-09T13:32:52.698Z"
        },
        {
                "id": 3,
                "name": "American Night",
                "description": "Classic american meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 2
                        },
                        {
                                "recipeId": 14,
                                "servings": 2
                        }
                ],
                "totalServings": 2,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "american"
                ],
                "tags": [
                        "weeknight"
                ],
                "estimatedTime": 95,
                "createdAt": "2025-09-06T13:32:52.698Z",
                "updatedAt": "2025-09-07T13:32:52.698Z"
        },
        {
                "id": 4,
                "name": "Italian Night",
                "description": "Classic italian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 3
                        },
                        {
                                "recipeId": 17,
                                "servings": 3
                        },
                        {
                                "recipeId": 16,
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
                        "weeknight",
                        "healthy"
                ],
                "estimatedTime": 110,
                "createdAt": "2025-09-03T13:32:52.698Z",
                "updatedAt": "2025-09-07T13:32:52.698Z"
        },
        {
                "id": 5,
                "name": "Healthy Lunch Combo",
                "description": "Perfect healthy lunch combination",
                "recipes": [
                        {
                                "recipeId": 20,
                                "servings": 4
                        },
                        {
                                "recipeId": 9,
                                "servings": 3
                        },
                        {
                                "recipeId": 5,
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
                        "healthy"
                ],
                "tags": [
                        "weeknight"
                ],
                "estimatedTime": 105,
                "createdAt": "2025-08-19T13:32:52.698Z",
                "updatedAt": "2025-09-06T13:32:52.698Z"
        },
        {
                "id": 6,
                "name": "Mexican Lunch Combo",
                "description": "Perfect mexican lunch combination",
                "recipes": [
                        {
                                "recipeId": 20,
                                "servings": 2
                        },
                        {
                                "recipeId": 5,
                                "servings": 4
                        },
                        {
                                "recipeId": 18,
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
                        "mexican"
                ],
                "tags": [
                        "weekend",
                        "family-friendly"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-09-10T13:32:52.698Z",
                "updatedAt": "2025-09-09T13:32:52.698Z"
        },
        {
                "id": 7,
                "name": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 2
                        },
                        {
                                "recipeId": 20,
                                "servings": 2
                        },
                        {
                                "recipeId": 18,
                                "servings": 2
                        }
                ],
                "totalServings": 2,
                "mealTypes": [
                        "lunch"
                ],
                "labels": [
                        "midday",
                        "satisfying",
                        "mediterranean"
                ],
                "tags": [
                        "comfort"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-24T13:32:52.698Z",
                "updatedAt": "2025-09-06T13:32:52.698Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 7,
                "meal_id": 5,
                "date": "2025-09-13",
                "scheduled_date": "2025-09-13",
                "meal_type": "lunch",
                "servings": 4,
                "notes": "Scheduled Healthy Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 20,
                                "servings": 4
                        },
                        {
                                "recipeId": 9,
                                "servings": 3
                        },
                        {
                                "recipeId": 5,
                                "servings": 2
                        }
                ],
                "recipe_id": 20,
                "total_time": 105,
                "created_at": "2025-09-10T13:32:52.698Z"
        },
        {
                "id": 2,
                "meal_id": 2,
                "date": "2025-09-17",
                "scheduled_date": "2025-09-17",
                "meal_type": "lunch",
                "servings": 3,
                "notes": "Scheduled Asian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 2
                        },
                        {
                                "recipeId": 9,
                                "servings": 2
                        },
                        {
                                "recipeId": 18,
                                "servings": 3
                        }
                ],
                "recipe_id": 5,
                "total_time": 100,
                "created_at": "2025-09-10T13:32:52.698Z"
        },
        {
                "id": 5,
                "recipe_id": 10,
                "date": "2025-09-20",
                "scheduled_date": "2025-09-20",
                "meal_type": "snack",
                "servings": 8,
                "notes": "Scheduled Energy Chicken Breast Bites",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 8
                        }
                ],
                "total_time": 20,
                "created_at": "2025-09-10T13:32:52.698Z"
        },
        {
                "id": 6,
                "meal_id": 4,
                "date": "2025-09-22",
                "scheduled_date": "2025-09-22",
                "meal_type": "dinner",
                "servings": 3,
                "notes": "Scheduled Italian Night",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 3
                        },
                        {
                                "recipeId": 17,
                                "servings": 3
                        },
                        {
                                "recipeId": 16,
                                "servings": 2
                        }
                ],
                "recipe_id": 14,
                "total_time": 110,
                "created_at": "2025-09-10T13:32:52.698Z"
        },
        {
                "id": 3,
                "meal_id": 3,
                "date": "2025-09-27",
                "scheduled_date": "2025-09-27",
                "meal_type": "dinner",
                "servings": 2,
                "notes": "Scheduled American Night",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 2
                        },
                        {
                                "recipeId": 14,
                                "servings": 2
                        }
                ],
                "recipe_id": 13,
                "total_time": 95,
                "created_at": "2025-09-10T13:32:52.698Z"
        },
        {
                "id": 4,
                "meal_id": 3,
                "date": "2025-09-29",
                "scheduled_date": "2025-09-29",
                "meal_type": "snack",
                "servings": 2,
                "notes": "Scheduled American Night",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 2
                        },
                        {
                                "recipeId": 14,
                                "servings": 2
                        }
                ],
                "recipe_id": 13,
                "total_time": 95,
                "created_at": "2025-09-10T13:32:52.698Z"
        },
        {
                "id": 1,
                "meal_id": 3,
                "date": "2025-09-30",
                "scheduled_date": "2025-09-30",
                "meal_type": "breakfast",
                "servings": 2,
                "notes": "Scheduled American Night",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 2
                        },
                        {
                                "recipeId": 14,
                                "servings": 2
                        }
                ],
                "recipe_id": 13,
                "total_time": 95,
                "created_at": "2025-09-10T13:32:52.698Z"
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
    
    // Utility method for generating date strings (test compatibility)
    getDateString(daysFromToday = 0) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday);
        return date.toISOString().split('T')[0];
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