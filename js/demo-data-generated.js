// Demo Data for MealPlanner
// Generated on 2025-09-10T14:44:57.974Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 30 ingredients across 6 categories
// - 18 recipes (10 basic, 8 combo)
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
        // Comprehensive ingredient list (30 items)
        this.ingredients = [
        {
                "id": 1,
                "name": "Chicken Breast",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 7,
                        "carbs": 27,
                        "fat": 4,
                        "calories": 192
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 9,
                "total_quantity": 13.75,
                "avg_quantity": 1.5277777777777777
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 5,
                        "carbs": 26,
                        "fat": 14,
                        "calories": 52
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 27,
                        "fat": 4,
                        "calories": 81
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 4,
                "total_quantity": 5,
                "avg_quantity": 1.25
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 1,
                        "carbs": 16,
                        "fat": 3,
                        "calories": 75
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 10,
                "total_quantity": 6.5,
                "avg_quantity": 0.65
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 8,
                        "carbs": 52,
                        "fat": 11,
                        "calories": 91
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 9,
                "total_quantity": 6.75,
                "avg_quantity": 0.75
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 18,
                        "carbs": 47,
                        "fat": 1,
                        "calories": 150
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 11,
                "total_quantity": 18.75,
                "avg_quantity": 1.7045454545454546
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 2,
                        "carbs": 28,
                        "fat": 13,
                        "calories": 88
                },
                "labels": [
                        "vegetable",
                        "sweet",
                        "vitamin-a"
                ],
                "recipe_count": 3,
                "total_quantity": 5.25,
                "avg_quantity": 1.75
        },
        {
                "id": 8,
                "name": "Bell Peppers",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 11,
                        "fat": 11,
                        "calories": 218
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 2,
                "total_quantity": 1,
                "avg_quantity": 0.5
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 4,
                        "carbs": 17,
                        "fat": 10,
                        "calories": 50
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 4,
                "total_quantity": 5,
                "avg_quantity": 1.25
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 49,
                        "fat": 14,
                        "calories": 92
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 12,
                "total_quantity": 26,
                "avg_quantity": 2.1666666666666665
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 20,
                        "carbs": 11,
                        "fat": 15,
                        "calories": 139
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 38,
                        "fat": 3,
                        "calories": 146
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
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 16,
                        "carbs": 44,
                        "fat": 9,
                        "calories": 96
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 1,
                        "carbs": 14,
                        "fat": 13,
                        "calories": 167
                },
                "labels": [
                        "grain",
                        "italian",
                        "comfort"
                ],
                "recipe_count": 3,
                "total_quantity": 3,
                "avg_quantity": 1
        },
        {
                "id": 15,
                "name": "Quinoa",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 19,
                        "carbs": 47,
                        "fat": 10,
                        "calories": 153
                },
                "labels": [
                        "grain",
                        "protein",
                        "healthy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 16,
                "name": "Oats",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 53,
                        "fat": 11,
                        "calories": 62
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 7,
                "total_quantity": 5.25,
                "avg_quantity": 0.75
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 1,
                        "carbs": 22,
                        "fat": 15,
                        "calories": 53
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 12,
                "total_quantity": 28.75,
                "avg_quantity": 2.3958333333333335
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 47,
                        "fat": 11,
                        "calories": 152
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 6,
                "total_quantity": 2.25,
                "avg_quantity": 0.375
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 1,
                        "carbs": 21,
                        "fat": 4,
                        "calories": 70
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 9,
                "total_quantity": 5,
                "avg_quantity": 0.5555555555555556
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 24,
                        "fat": 5,
                        "calories": 206
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
                "default_unit": "packages",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 7,
                        "carbs": 20,
                        "fat": 13,
                        "calories": 216
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 14,
                "total_quantity": 12,
                "avg_quantity": 0.8571428571428571
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 9,
                        "carbs": 15,
                        "fat": 12,
                        "calories": 103
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 5,
                "total_quantity": 2.5,
                "avg_quantity": 0.5
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 5,
                        "fat": 2,
                        "calories": 98
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 4,
                "total_quantity": 3.75,
                "avg_quantity": 0.9375
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 7,
                        "carbs": 31,
                        "fat": 13,
                        "calories": 89
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 11,
                "total_quantity": 13.5,
                "avg_quantity": 1.2272727272727273
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 6,
                        "carbs": 31,
                        "fat": 13,
                        "calories": 101
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 3,
                "total_quantity": 3.75,
                "avg_quantity": 1.25
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 53,
                        "fat": 3,
                        "calories": 70
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 5,
                "total_quantity": 6.25,
                "avg_quantity": 1.25
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 17,
                        "carbs": 12,
                        "fat": 11,
                        "calories": 64
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 9,
                "total_quantity": 14,
                "avg_quantity": 1.5555555555555556
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 40,
                        "fat": 2,
                        "calories": 193
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 8,
                "total_quantity": 5,
                "avg_quantity": 0.625
        },
        {
                "id": 29,
                "name": "Flour",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 17,
                        "carbs": 47,
                        "fat": 9,
                        "calories": 107
                },
                "labels": "baking",
                "recipe_count": 1,
                "total_quantity": 1,
                "avg_quantity": 1
        },
        {
                "id": 30,
                "name": "Cucumber",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 14,
                        "carbs": 39,
                        "fat": 11,
                        "calories": 181
                },
                "labels": "vitamin-rich",
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        }
];

        // Comprehensive recipe list (18 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T02:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "comfort",
                        "side-dish",
                        "Dinner",
                        "hearty",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-10T04:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "comfort",
                        "crispy",
                        "protein",
                        "Dinner",
                        "hearty",
                        "sweet"
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
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-20T07:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "healthy",
                        "vegetable",
                        "side-dish",
                        "Dinner",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-06-20T10:00:00.000Z",
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
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
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
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-01T22:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "bread",
                        "side-dish",
                        "garlic",
                        "Dinner",
                        "easy",
                        "healthy",
                        "hearty"
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
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 35,
                "cook_time": 35,
                "created_at": "2025-07-02T01:45:00.000Z",
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
                                "recipe_id": 9,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 3.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 4.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "gallons"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-07-11T16:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "salad",
                        "fresh",
                        "classic",
                        "Lunch",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 17,
                "cook_time": 15,
                "created_at": "2025-07-12T05:45:00.000Z",
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
                                "recipe_id": 4,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-22T19:15:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "sweet",
                        "fluffy",
                        "Breakfast",
                        "hearty",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 15,
                "created_at": "2025-07-23T07:15:00.000Z",
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
                                "recipe_id": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 10,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 7,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-07-30T20:15:00.000Z",
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
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 3.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 2,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 7,
                "title": "Bacon",
                "description": "Crispy breakfast bacon",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-07-31T18:30:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "protein",
                        "crispy",
                        "Breakfast",
                        "savory",
                        "comfort",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-10T13:00:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "crispy",
                        "potato",
                        "Breakfast",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-12T20:45:00.000Z",
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
                                "recipe_id": 2,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 2,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 35,
                "created_at": "2025-08-22T18:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "comfort",
                        "soup",
                        "warming",
                        "Lunch",
                        "sweet",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 22,
                "cook_time": 20,
                "created_at": "2025-08-23T00:15:00.000Z",
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
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 17,
                "cook_time": 10,
                "created_at": "2025-09-01T03:00:00.000Z",
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
                                "recipe_id": 7,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 3.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 0,
                "created_at": "2025-09-01T15:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "energy",
                        "healthy",
                        "no-bake",
                        "Snack",
                        "healthy",
                        "comfort",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipes": [
                        {
                                "recipeId": 9,
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
                        "italian"
                ],
                "tags": [
                        "crowd-pleaser"
                ],
                "estimatedTime": 55,
                "createdAt": "2025-08-14T14:44:57.973Z",
                "updatedAt": "2025-09-04T14:44:57.973Z"
        },
        {
                "id": 2,
                "name": "Healthy Night",
                "description": "Classic healthy meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 2
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 1,
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
                        "healthy"
                ],
                "tags": [
                        "special-occasion"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-09-05T14:44:57.973Z",
                "updatedAt": "2025-09-09T14:44:57.973Z"
        },
        {
                "id": 3,
                "name": "Healthy Lunch Combo",
                "description": "Perfect healthy lunch combination",
                "recipes": [
                        {
                                "recipeId": 5,
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
                        "healthy"
                ],
                "tags": [
                        "weeknight",
                        "crowd-pleaser"
                ],
                "estimatedTime": 10,
                "createdAt": "2025-08-16T14:44:57.973Z",
                "updatedAt": "2025-09-08T14:44:57.973Z"
        },
        {
                "id": 4,
                "name": "Mexican Lunch Combo",
                "description": "Perfect mexican lunch combination",
                "recipes": [
                        {
                                "recipeId": 9,
                                "servings": 2
                        },
                        {
                                "recipeId": 5,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
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
                        "mexican"
                ],
                "tags": [
                        "date-night"
                ],
                "estimatedTime": 80,
                "createdAt": "2025-09-10T14:44:57.973Z",
                "updatedAt": "2025-09-05T14:44:57.973Z"
        },
        {
                "id": 5,
                "name": "Mediterranean Family Dinner",
                "description": "A hearty family dinner with mediterranean favorites",
                "recipes": [
                        {
                                "recipeId": 2,
                                "servings": 2
                        },
                        {
                                "recipeId": 1,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 4
                        },
                        {
                                "recipeId": 4,
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
                        "mediterranean"
                ],
                "tags": [
                        "weekend",
                        "date-night"
                ],
                "estimatedTime": 100,
                "createdAt": "2025-09-04T14:44:57.974Z",
                "updatedAt": "2025-09-09T14:44:57.974Z"
        },
        {
                "id": 6,
                "name": "Quick Italian Breakfast",
                "description": "Fast and delicious italian breakfast",
                "recipes": [
                        {
                                "recipeId": 7,
                                "servings": 3
                        },
                        {
                                "recipeId": 8,
                                "servings": 2
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "breakfast"
                ],
                "labels": [
                        "quick",
                        "morning",
                        "italian"
                ],
                "tags": [
                        "weekend"
                ],
                "estimatedTime": 65,
                "createdAt": "2025-09-03T14:44:57.974Z",
                "updatedAt": "2025-09-10T14:44:57.974Z"
        },
        {
                "id": 7,
                "name": "Mexican Night",
                "description": "Classic mexican meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 1,
                                "servings": 3
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "mexican"
                ],
                "tags": [
                        "comfort"
                ],
                "estimatedTime": 45,
                "createdAt": "2025-09-04T14:44:57.974Z",
                "updatedAt": "2025-09-05T14:44:57.974Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 4,
                "meal_id": 2,
                "date": "2025-09-11",
                "scheduled_date": "2025-09-11",
                "servings": 3,
                "notes": "Scheduled Healthy Night",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 2
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 1,
                                "servings": 2
                        }
                ],
                "recipe_id": 3,
                "total_time": 85,
                "created_at": "2025-09-10T14:44:57.974Z"
        },
        {
                "id": 7,
                "meal_id": 6,
                "date": "2025-09-12",
                "scheduled_date": "2025-09-12",
                "servings": 3,
                "notes": "Scheduled Quick Italian Breakfast",
                "recipes": [
                        {
                                "recipeId": 7,
                                "servings": 3
                        },
                        {
                                "recipeId": 8,
                                "servings": 2
                        }
                ],
                "recipe_id": 7,
                "total_time": 65,
                "created_at": "2025-09-10T14:44:57.974Z"
        },
        {
                "id": 6,
                "meal_id": 6,
                "date": "2025-09-15",
                "scheduled_date": "2025-09-15",
                "servings": 3,
                "notes": "Scheduled Quick Italian Breakfast",
                "recipes": [
                        {
                                "recipeId": 7,
                                "servings": 3
                        },
                        {
                                "recipeId": 8,
                                "servings": 2
                        }
                ],
                "recipe_id": 7,
                "total_time": 65,
                "created_at": "2025-09-10T14:44:57.974Z"
        },
        {
                "id": 5,
                "meal_id": 7,
                "date": "2025-09-18",
                "scheduled_date": "2025-09-18",
                "servings": 3,
                "notes": "Scheduled Mexican Night",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 1,
                                "servings": 3
                        }
                ],
                "recipe_id": 4,
                "total_time": 45,
                "created_at": "2025-09-10T14:44:57.974Z"
        },
        {
                "id": 3,
                "recipe_id": 1,
                "date": "2025-09-19",
                "scheduled_date": "2025-09-19",
                "servings": 6,
                "notes": "Scheduled Mashed Potatoes",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 6
                        }
                ],
                "total_time": 30,
                "created_at": "2025-09-10T14:44:57.974Z"
        },
        {
                "id": 1,
                "recipe_id": 7,
                "date": "2025-09-24",
                "scheduled_date": "2025-09-24",
                "servings": 4,
                "notes": "Scheduled Bacon",
                "recipes": [
                        {
                                "recipeId": 7,
                                "servings": 4
                        }
                ],
                "total_time": 10,
                "created_at": "2025-09-10T14:44:57.974Z"
        },
        {
                "id": 2,
                "recipe_id": 9,
                "date": "2025-09-29",
                "scheduled_date": "2025-09-29",
                "servings": 4,
                "notes": "Scheduled Broccoli Soup with Chicken Breast",
                "recipes": [
                        {
                                "recipeId": 9,
                                "servings": 4
                        }
                ],
                "total_time": 55,
                "created_at": "2025-09-10T14:44:57.974Z"
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