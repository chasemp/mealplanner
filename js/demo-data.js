// Demo Data for MealPlanner
// Generated on 2025-09-29T13:07:34.845Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 50 ingredients across 7 categories
// - 33 recipes (18 regular, 15 combo)
// - 0 meals combining multiple recipes
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
        // Comprehensive ingredient list (50 items)
        this.ingredients = [
        {
                "id": 1,
                "name": "Chicken Breast",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 20,
                        "carbs": 50,
                        "fat": 10,
                        "calories": 109
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 22,
                        "fat": 1,
                        "calories": 181
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
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 3,
                        "carbs": 30,
                        "fat": 2,
                        "calories": 199
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 16,
                        "fat": 3,
                        "calories": 126
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 11,
                        "carbs": 31,
                        "fat": 13,
                        "calories": 151
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 1,
                        "carbs": 53,
                        "fat": 8,
                        "calories": 152
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 12,
                        "carbs": 27,
                        "fat": 10,
                        "calories": 73
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
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 13,
                        "carbs": 14,
                        "fat": 15,
                        "calories": 119
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 18,
                        "fat": 7,
                        "calories": 80
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 52,
                        "fat": 15,
                        "calories": 105
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 16,
                        "fat": 6,
                        "calories": 135
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
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 11,
                        "carbs": 22,
                        "fat": 6,
                        "calories": 236
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
                        "protein": 20,
                        "carbs": 16,
                        "fat": 5,
                        "calories": 70
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 51,
                        "fat": 6,
                        "calories": 77
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
                "default_unit": "lbs",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 42,
                        "fat": 7,
                        "calories": 109
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
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 3,
                        "carbs": 46,
                        "fat": 9,
                        "calories": 69
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 8,
                        "carbs": 50,
                        "fat": 2,
                        "calories": 117
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 4,
                        "carbs": 5,
                        "fat": 10,
                        "calories": 158
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 30,
                        "fat": 3,
                        "calories": 198
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 48,
                        "fat": 9,
                        "calories": 84
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 15,
                        "carbs": 41,
                        "fat": 4,
                        "calories": 76
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 12,
                        "carbs": 22,
                        "fat": 4,
                        "calories": 230
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 17,
                        "fat": 15,
                        "calories": 130
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 17,
                        "carbs": 10,
                        "fat": 10,
                        "calories": 235
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 28,
                        "fat": 10,
                        "calories": 83
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 7,
                        "carbs": 5,
                        "fat": 5,
                        "calories": 131
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 22,
                        "fat": 10,
                        "calories": 230
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 5,
                        "fat": 8,
                        "calories": 95
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 4,
                        "carbs": 19,
                        "fat": 8,
                        "calories": 151
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 18,
                        "carbs": 26,
                        "fat": 14,
                        "calories": 224
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 31,
                "name": "Tortillas",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 11,
                        "carbs": 10,
                        "fat": 15,
                        "calories": 108
                },
                "labels": [
                        "wrap",
                        "mexican",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 32,
                "name": "Pita Bread",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 3,
                        "carbs": 42,
                        "fat": 7,
                        "calories": 139
                },
                "labels": [
                        "bread",
                        "mediterranean",
                        "pocket"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 33,
                "name": "Potato Chips",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 14,
                        "carbs": 22,
                        "fat": 9,
                        "calories": 122
                },
                "labels": [
                        "snack",
                        "crispy",
                        "salty"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 34,
                "name": "Tortilla Chips",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 12,
                        "carbs": 30,
                        "fat": 2,
                        "calories": 111
                },
                "labels": [
                        "snack",
                        "mexican",
                        "crunchy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 35,
                "name": "Crackers",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 50,
                        "fat": 10,
                        "calories": 227
                },
                "labels": [
                        "snack",
                        "crispy",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 36,
                "name": "Pretzels",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 31,
                        "fat": 10,
                        "calories": 228
                },
                "labels": [
                        "snack",
                        "salty",
                        "crunchy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 37,
                "name": "Ketchup",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 35,
                        "fat": 9,
                        "calories": 60
                },
                "labels": [
                        "condiment",
                        "tomato",
                        "sweet"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 38,
                "name": "Mustard",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 28,
                        "fat": 10,
                        "calories": 67
                },
                "labels": [
                        "condiment",
                        "tangy",
                        "spicy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 39,
                "name": "Mayonnaise",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 26,
                        "fat": 10,
                        "calories": 211
                },
                "labels": [
                        "condiment",
                        "creamy",
                        "rich"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 40,
                "name": "Salsa",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 6,
                        "fat": 11,
                        "calories": 164
                },
                "labels": [
                        "sauce",
                        "mexican",
                        "spicy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 41,
                "name": "BBQ Sauce",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 16,
                        "fat": 15,
                        "calories": 185
                },
                "labels": [
                        "sauce",
                        "smoky",
                        "sweet"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 42,
                "name": "Frozen Pizza",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 16,
                        "carbs": 35,
                        "fat": 12,
                        "calories": 83
                },
                "labels": [
                        "convenience",
                        "quick",
                        "comfort"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 43,
                "name": "Frozen Vegetables",
                "category": "frozen",
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 19,
                        "carbs": 51,
                        "fat": 14,
                        "calories": 87
                },
                "labels": [
                        "vegetable",
                        "convenient",
                        "healthy"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 44,
                "name": "Ice Cream",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 8,
                        "carbs": 39,
                        "fat": 1,
                        "calories": 202
                },
                "labels": [
                        "dessert",
                        "sweet",
                        "cold"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 45,
                "name": "Orange Juice",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 44,
                        "fat": 3,
                        "calories": 84
                },
                "labels": [
                        "beverage",
                        "vitamin-c",
                        "breakfast"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 46,
                "name": "Coffee",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 6,
                        "fat": 4,
                        "calories": 60
                },
                "labels": [
                        "beverage",
                        "caffeine",
                        "morning"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 47,
                "name": "Soda",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 17,
                        "carbs": 41,
                        "fat": 10,
                        "calories": 95
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 26,
                        "fat": 1,
                        "calories": 123
                },
                "labels": [
                        "protein",
                        "fiber",
                        "convenient"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 49,
                "name": "Canned Tomatoes",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 37,
                        "fat": 9,
                        "calories": 108
                },
                "labels": [
                        "vegetable",
                        "sauce-base",
                        "versatile"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        },
        {
                "id": 50,
                "name": "Chicken Broth",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 14,
                        "fat": 9,
                        "calories": 60
                },
                "labels": [
                        "liquid",
                        "flavor-base",
                        "cooking"
                ],
                "recipe_count": 0,
                "total_quantity": 0,
                "avg_quantity": 0
        }
];

        // Comprehensive recipe list (33 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-05-31T23:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "use_step_instructions": true,
                "labels": [
                        "comfort",
                        "side-dish",
                        "Dinner",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-04T18:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "use_step_instructions": true,
                "labels": [
                        "comfort",
                        "crispy",
                        "protein",
                        "Dinner",
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 3,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-09T08:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "use_step_instructions": true,
                "labels": [
                        "healthy",
                        "vegetable",
                        "side-dish",
                        "Dinner",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 25,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 32,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 4,
                "title": "Garlic Bread",
                "description": "Toasted bread with garlic and herbs",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-13T01:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "use_step_instructions": true,
                "labels": [
                        "bread",
                        "side-dish",
                        "garlic",
                        "Dinner",
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-16T10:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "use_step_instructions": false,
                "labels": [
                        "salad",
                        "fresh",
                        "classic",
                        "Lunch",
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 6,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-20T22:45:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "use_step_instructions": false,
                "labels": [
                        "sweet",
                        "fluffy",
                        "Breakfast",
                        "hearty",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 50,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ],
                "favorite": true
        },
        {
                "id": 7,
                "title": "Bacon",
                "description": "Crispy breakfast bacon",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-24T21:00:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "use_step_instructions": false,
                "labels": [
                        "protein",
                        "crispy",
                        "Breakfast",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 31,
                                "quantity": 2,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 8,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-29T01:30:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "use_step_instructions": false,
                "labels": [
                        "crispy",
                        "potato",
                        "Breakfast",
                        "fresh",
                        "savory",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1.75,
                                "unit": "bunches"
                        }
                ],
                "favorite": true
        },
        {
                "id": 9,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-07-02T06:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "use_step_instructions": true,
                "labels": [
                        "healthy",
                        "fresh",
                        "salad",
                        "Lunch",
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 10,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 0,
                "created_at": "2025-07-06T13:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "use_step_instructions": true,
                "labels": [
                        "energy",
                        "healthy",
                        "no-bake",
                        "Snack",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 11,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 30,
                "created_at": "2025-07-10T13:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "use_step_instructions": false,
                "labels": [
                        "healthy",
                        "crispy",
                        "baked",
                        "Snack",
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 15,
                                "quantity": 1,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 12,
                "title": "Loaded Nachos",
                "description": "Crispy tortilla chips loaded with cheese and toppings",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-14T02:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "use_step_instructions": false,
                "labels": [
                        "snack",
                        "mexican",
                        "quick",
                        "Snack",
                        "quick",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 7,
                                "quantity": 1.5,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 13,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-18T00:45:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "use_step_instructions": true,
                "labels": [
                        "crispy",
                        "potato",
                        "Breakfast",
                        "quick",
                        "spicy",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-22T15:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "use_step_instructions": true,
                "labels": [
                        "healthy",
                        "vegetable",
                        "side-dish",
                        "Dinner",
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 15,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 25,
                "created_at": "2025-07-25T15:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "use_step_instructions": true,
                "labels": [
                        "roasted",
                        "savory",
                        "healthy",
                        "Snack",
                        "easy",
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 16,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 0,
                "created_at": "2025-07-29T14:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "use_step_instructions": false,
                "labels": [
                        "energy",
                        "healthy",
                        "no-bake",
                        "Snack",
                        "fresh",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ],
                "favorite": false
        },
        {
                "id": 17,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 25,
                "created_at": "2025-08-02T22:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "use_step_instructions": true,
                "labels": [
                        "roasted",
                        "savory",
                        "healthy",
                        "Snack",
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ],
                "favorite": false
        },
        {
                "id": 18,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 0,
                "created_at": "2025-08-07T04:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "use_step_instructions": false,
                "labels": [
                        "energy",
                        "healthy",
                        "no-bake",
                        "Snack",
                        "hearty",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.25,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 19,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 35,
                "cook_time": 25,
                "created_at": "2025-08-10T03:00:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "sunday-dinner",
                        "comfort-food"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 8,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 4.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 23,
                                "quantity": 3.25,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 10,
                "created_at": "2025-08-14T07:30:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "italian",
                        "complete"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 9,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.75,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 17,
                "cook_time": 15,
                "created_at": "2025-08-17T20:00:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "american",
                        "hearty"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 6,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 7,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 50,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 25,
                                "quantity": 3,
                                "unit": "heads"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 31,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 7,
                                "quantity": 1.5,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 22,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 35,
                "cook_time": 0,
                "created_at": "2025-08-22T00:15:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "healthy",
                        "seafood"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 16,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 10,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 3.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 10,
                "created_at": "2025-08-26T16:30:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "greek",
                        "mediterranean"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 9,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.75,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 35,
                "cook_time": 25,
                "created_at": "2025-08-30T15:00:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "vegetarian",
                        "healthy"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 17,
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 15,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 3.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 15,
                "created_at": "2025-09-02T21:30:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "brunch",
                        "weekend"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 8,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-09-07T12:00:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "use_step_instructions": true,
                "labels": [
                        "Recipe Combo",
                        "light",
                        "fresh"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1580411700?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-09-05T13:07:34.838Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "italian",
                        "Recipe Combo",
                        "Lunch"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 28,
                "title": "American Family Dinner",
                "description": "A hearty family dinner with american favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1593329963?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-09-02T13:07:34.838Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "american",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 4,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 0.58,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 0.58,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.33,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.17,
                                "unit": "packages"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.17,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 1,
                                "quantity": 0.63,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.13,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 29,
                "title": "American Lunch Combo",
                "description": "Perfect american lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1583993646?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-09-21T13:07:34.838Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "american",
                        "Recipe Combo",
                        "Lunch"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 0.38,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 0.63,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.13,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 30,
                "title": "Asian Night",
                "description": "Classic asian meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1508666045?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 21,
                "cook_time": 49,
                "created_at": "2025-09-02T13:07:34.838Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "asian",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 0.63,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.3,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.13,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.83,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.67,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.33,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 31,
                "title": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1517139652?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-09-27T13:07:34.839Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "italian",
                        "Recipe Combo",
                        "Lunch"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 0.38,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 0.63,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.13,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 32,
                "title": "American Family Dinner",
                "description": "A hearty family dinner with american favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1503135623?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 70,
                "created_at": "2025-09-29T13:07:34.839Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "american",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 14,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1.92,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.17,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 1.08,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.83,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.33,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.33,
                                "unit": "containers"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.08,
                                "unit": "packages"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.08,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 17,
                                "quantity": 0.88,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 0.88,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 33,
                "title": "Quick Healthy Breakfast",
                "description": "Fast and delicious healthy breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1563034476?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 7,
                "cook_time": 17,
                "created_at": "2025-08-31T13:07:34.839Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "healthy",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 6,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 50,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        }
];

        // Demo meals that combine multiple recipes (0 items)
        this.meals = [];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 7,
                "recipe_id": 6,
                "date": "2025-09-29",
                "scheduled_date": "2025-09-29",
                "servings": 4,
                "notes": "Scheduled Pancakes",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 4
                        }
                ],
                "recipe_name": "Pancakes",
                "meal_type": "breakfast",
                "total_time": 25,
                "created_at": "2025-09-29T13:07:34.840Z"
        },
        {
                "id": 4,
                "recipe_id": 12,
                "date": "2025-09-30",
                "scheduled_date": "2025-09-30",
                "servings": 4,
                "notes": "Scheduled Loaded Nachos",
                "recipes": [
                        {
                                "recipeId": 12,
                                "servings": 4
                        }
                ],
                "recipe_name": "Loaded Nachos",
                "meal_type": "snack",
                "total_time": 15,
                "created_at": "2025-09-29T13:07:34.839Z"
        },
        {
                "id": 1,
                "recipe_id": 13,
                "date": "2025-10-01",
                "scheduled_date": "2025-10-01",
                "servings": 4,
                "notes": "Scheduled Hash Browns",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "recipe_name": "Hash Browns",
                "meal_type": "breakfast",
                "total_time": 25,
                "created_at": "2025-09-29T13:07:34.839Z"
        },
        {
                "id": 6,
                "recipe_id": 16,
                "date": "2025-10-03",
                "scheduled_date": "2025-10-03",
                "servings": 4,
                "notes": "Scheduled Energy Chicken Breast Bites",
                "recipes": [
                        {
                                "recipeId": 16,
                                "servings": 4
                        }
                ],
                "recipe_name": "Energy Chicken Breast Bites",
                "meal_type": "snack",
                "total_time": 20,
                "created_at": "2025-09-29T13:07:34.840Z"
        },
        {
                "id": 5,
                "recipe_id": 14,
                "date": "2025-10-07",
                "scheduled_date": "2025-10-07",
                "servings": 4,
                "notes": "Scheduled Green Beans",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 4
                        }
                ],
                "recipe_name": "Green Beans",
                "meal_type": "dinner",
                "total_time": 15,
                "created_at": "2025-09-29T13:07:34.839Z"
        },
        {
                "id": 3,
                "recipe_id": 3,
                "date": "2025-10-08",
                "scheduled_date": "2025-10-08",
                "servings": 6,
                "notes": "Scheduled Green Beans",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 6
                        }
                ],
                "recipe_name": "Green Beans",
                "meal_type": "dinner",
                "total_time": 15,
                "created_at": "2025-09-29T13:07:34.839Z"
        },
        {
                "id": 2,
                "recipe_id": 31,
                "date": "2025-10-18",
                "scheduled_date": "2025-10-18",
                "servings": 2,
                "notes": "Scheduled Italian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 31,
                                "servings": 2
                        }
                ],
                "recipe_name": "Italian Lunch Combo",
                "meal_type": "lunch",
                "total_time": 10,
                "created_at": "2025-09-29T13:07:34.839Z"
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
            items: this.ingredients,
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
            if (recipe.items) {
                recipe.items.forEach(recipeIng => {
                    const ingredient = this.ingredients.find(ing => ing.id === (recipeIng.item_id || recipeIng.ingredient_id));
                    if (!ingredient) {
                        issues.push(`Recipe "${recipe.title}" references non-existent ingredient ID ${recipeIng.item_id || recipeIng.ingredient_id}`);
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
        const today = new Date();
        // Create timezone-neutral date to avoid parsing issues
        const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        baseDate.setDate(baseDate.getDate() + daysFromToday);
        return baseDate.toISOString().split('T')[0];
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