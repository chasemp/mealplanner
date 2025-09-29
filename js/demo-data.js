// Demo Data for MealPlanner
// Generated on 2025-09-29T23:58:32.307Z
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
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 16,
                        "carbs": 26,
                        "fat": 9,
                        "calories": 121
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
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 31,
                        "fat": 6,
                        "calories": 159
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
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 11,
                        "carbs": 36,
                        "fat": 10,
                        "calories": 107
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
                "default_unit": "blocks",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 16,
                        "carbs": 44,
                        "fat": 1,
                        "calories": 165
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
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 12,
                        "carbs": 26,
                        "fat": 14,
                        "calories": 190
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 28,
                        "fat": 14,
                        "calories": 122
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
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 3,
                        "carbs": 46,
                        "fat": 3,
                        "calories": 214
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
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 14,
                        "fat": 11,
                        "calories": 209
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
                        "protein": 18,
                        "carbs": 46,
                        "fat": 2,
                        "calories": 86
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 17,
                        "carbs": 25,
                        "fat": 5,
                        "calories": 213
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
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 54,
                        "fat": 2,
                        "calories": 142
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 14,
                        "carbs": 27,
                        "fat": 3,
                        "calories": 93
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
                        "protein": 8,
                        "carbs": 10,
                        "fat": 4,
                        "calories": 68
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
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 51,
                        "fat": 1,
                        "calories": 121
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 7,
                        "carbs": 38,
                        "fat": 4,
                        "calories": 77
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 18,
                        "fat": 4,
                        "calories": 79
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
                        "protein": 2,
                        "carbs": 13,
                        "fat": 9,
                        "calories": 96
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 53,
                        "fat": 3,
                        "calories": 136
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 39,
                        "fat": 12,
                        "calories": 163
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 19,
                        "fat": 11,
                        "calories": 82
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 15,
                        "carbs": 24,
                        "fat": 15,
                        "calories": 242
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
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 14,
                        "carbs": 12,
                        "fat": 3,
                        "calories": 73
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
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 11,
                        "carbs": 39,
                        "fat": 1,
                        "calories": 198
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
                        "protein": 9,
                        "carbs": 21,
                        "fat": 14,
                        "calories": 115
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
                        "protein": 2,
                        "carbs": 32,
                        "fat": 15,
                        "calories": 93
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
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 1,
                        "carbs": 41,
                        "fat": 5,
                        "calories": 61
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
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 28,
                        "fat": 14,
                        "calories": 229
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
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 10,
                        "fat": 4,
                        "calories": 137
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
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 11,
                        "carbs": 7,
                        "fat": 3,
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
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 8,
                        "carbs": 45,
                        "fat": 15,
                        "calories": 231
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
                "default_unit": "loaves",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 3,
                        "carbs": 44,
                        "fat": 8,
                        "calories": 63
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
                "default_unit": "loaves",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 14,
                        "carbs": 21,
                        "fat": 8,
                        "calories": 186
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 25,
                        "fat": 2,
                        "calories": 82
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 20,
                        "carbs": 16,
                        "fat": 3,
                        "calories": 165
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 17,
                        "fat": 5,
                        "calories": 188
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 49,
                        "fat": 1,
                        "calories": 58
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
                        "protein": 18,
                        "carbs": 10,
                        "fat": 14,
                        "calories": 128
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
                        "protein": 1,
                        "carbs": 48,
                        "fat": 14,
                        "calories": 229
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 39,
                        "fat": 12,
                        "calories": 223
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 36,
                        "fat": 6,
                        "calories": 81
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 8,
                        "fat": 14,
                        "calories": 72
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
                        "protein": 3,
                        "carbs": 11,
                        "fat": 5,
                        "calories": 67
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
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 10,
                        "carbs": 18,
                        "fat": 9,
                        "calories": 160
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
                        "protein": 10,
                        "carbs": 45,
                        "fat": 15,
                        "calories": 132
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
                        "protein": 18,
                        "carbs": 9,
                        "fat": 2,
                        "calories": 58
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
                        "protein": 11,
                        "carbs": 36,
                        "fat": 3,
                        "calories": 166
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 33,
                        "fat": 14,
                        "calories": 170
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 8,
                        "fat": 13,
                        "calories": 150
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 47,
                        "fat": 3,
                        "calories": 239
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 15,
                        "carbs": 51,
                        "fat": 7,
                        "calories": 187
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T16:45:00.000Z",
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
                        "easy",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "heads"
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-05T14:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "comfort",
                        "crispy",
                        "protein",
                        "Dinner",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ],
                "favorite": true
        },
        {
                "id": 3,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-09T17:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
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
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ],
                "favorite": false
        },
        {
                "id": 4,
                "title": "Garlic Bread",
                "description": "Toasted bread with garlic and herbs",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-12T18:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "bread",
                        "side-dish",
                        "garlic",
                        "Dinner",
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 3,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ],
                "favorite": true
        },
        {
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-17T02:00:00.000Z",
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
                        "Lunch",
                        "quick",
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-20T20:15:00.000Z",
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
                        "quick",
                        "fresh",
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 31,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-24T10:30:00.000Z",
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
                        "comfort",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 15,
                                "quantity": 1,
                                "unit": "cups"
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-28T15:00:00.000Z",
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
                        "hearty",
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 9,
                "title": "Chicken Wrap",
                "description": "Grilled chicken wrapped in a soft tortilla",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-02T08:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "wrap",
                        "protein",
                        "portable",
                        "Lunch",
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 10,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-05T21:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "snack",
                        "party",
                        "quick",
                        "Snack",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 8,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.5,
                                "unit": "gallons"
                        }
                ],
                "favorite": true
        },
        {
                "id": 11,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-10T18:15:00.000Z",
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
                        "party",
                        "quick",
                        "Snack",
                        "fresh",
                        "easy",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 9,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "lbs"
                        }
                ],
                "favorite": true
        },
        {
                "id": 12,
                "title": "Quick Pizza Night",
                "description": "Easy frozen pizza enhanced with fresh toppings",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 12,
                "created_at": "2025-07-14T05:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "convenience",
                        "quick",
                        "comfort",
                        "Dinner",
                        "hearty",
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 8,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "heads"
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-18T12:30:00.000Z",
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
                        "fresh",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 32,
                                "quantity": 1.25,
                                "unit": "loaves"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 20,
                "cook_time": 35,
                "created_at": "2025-07-22T10:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "comfort",
                        "soup",
                        "warming",
                        "Lunch",
                        "quick",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 7,
                                "quantity": 2,
                                "unit": "bunches"
                        }
                ],
                "favorite": true
        },
        {
                "id": 15,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-07-25T13:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "comfort",
                        "soup",
                        "warming",
                        "Lunch",
                        "healthy",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "bottles"
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
                "servings": 8,
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-07-29T22:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "energy",
                        "healthy",
                        "no-bake",
                        "Snack",
                        "fresh",
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "blocks"
                        }
                ],
                "favorite": true
        },
        {
                "id": 17,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 5,
                "created_at": "2025-08-03T05:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "healthy",
                        "fresh",
                        "salad",
                        "Lunch",
                        "quick",
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        }
                ],
                "favorite": false
        },
        {
                "id": 18,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-07T06:15:00.000Z",
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
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.5,
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
                "id": 19,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 8,
                "prep_time": 40,
                "cook_time": 25,
                "created_at": "2025-08-10T09:00:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "Recipe Combo",
                        "sunday-dinner",
                        "comfort-food"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
                                "servings": 8,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 2,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "blocks"
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
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-14T20:45:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "Recipe Combo",
                        "italian",
                        "complete"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 12,
                "cook_time": 15,
                "created_at": "2025-08-18T14:00:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
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
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 31,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 15,
                                "quantity": 1,
                                "unit": "cups"
                        }
                ]
        },
        {
                "id": 22,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 12,
                "created_at": "2025-08-22T16:15:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "Recipe Combo",
                        "healthy",
                        "seafood"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 11,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 2.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 9,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 42,
                                "quantity": 1.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 8,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 10,
                "created_at": "2025-08-25T23:30:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
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
                                "recipe_id": 17,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 3,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 8,
                "prep_time": 35,
                "cook_time": 35,
                "created_at": "2025-08-29T16:30:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
                "labels": [
                        "Recipe Combo",
                        "vegetarian",
                        "healthy"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 16,
                                "servings": 8,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 14,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 41,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 7,
                                "quantity": 2,
                                "unit": "bunches"
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
                "prep_time": 35,
                "cook_time": 25,
                "created_at": "2025-09-03T08:45:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
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
                                "recipe_id": 9,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 15,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 9,
                                "quantity": 2.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 6,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "bottles"
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
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-09-06T14:45:00.000Z",
                "instructions": [
                        "Prepare all component recipes according to their individual instructions",
                        "Coordinate cooking times to serve everything together",
                        "Plate and serve as a complete meal"
                ],
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
                        },
                        {
                                "recipe_id": 13,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 5.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 3,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 32,
                                "quantity": 1.25,
                                "unit": "loaves"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Mexican Family Dinner",
                "description": "A hearty family dinner with mexican favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1563497447?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 71,
                "created_at": "2025-08-31T23:58:32.294Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "mexican",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 12,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 8,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 11,
                                "quantity": 2.13,
                                "unit": "heads"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.76,
                                "unit": "containers"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 25,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.63,
                                "unit": "packages"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.13,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.38,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 28,
                "title": "American Night",
                "description": "Classic american meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1524467579?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-09-09T23:58:32.294Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "american",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.63,
                                "unit": "containers"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 25,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 29,
                "title": "Quick Comfort Food Breakfast",
                "description": "Fast and delicious comfort food breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1500076126?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 35,
                "created_at": "2025-09-03T23:58:32.294Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "comfort-food",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 13,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 8,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 2.31,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.69,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.88,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 32,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.19,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.38,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 30,
                "title": "American Night",
                "description": "Classic american meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1579722396?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 18,
                "cook_time": 43,
                "created_at": "2025-09-20T23:58:32.294Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "american",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 1,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.46,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.08,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.08,
                                "unit": "containers"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.33,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.33,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 11,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 0.88,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.38,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 30,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.13,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 8,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 31,
                "title": "American Family Dinner",
                "description": "A hearty family dinner with american favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1567826090?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 13,
                "cook_time": 31,
                "created_at": "2025-09-03T23:58:32.294Z",
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
                                "recipe_id": 1,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 0.67,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 0.58,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.38,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 30,
                                "quantity": 0.33,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 3,
                                "quantity": 0.67,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.08,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.13,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.13,
                                "unit": "containers"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.38,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.38,
                                "unit": "heads"
                        }
                ],
                "favorite": false
        },
        {
                "id": 32,
                "title": "Asian Family Dinner",
                "description": "A hearty family dinner with asian favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1595109052?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 30,
                "cook_time": 70,
                "created_at": "2025-09-21T23:58:32.295Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "asian",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.38,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.83,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.46,
                                "unit": "containers"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.25,
                                "unit": "bags"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.38,
                                "unit": "bags"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 0.88,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.96,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.38,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 30,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.13,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 25,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.08,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.33,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.25,
                                "unit": "heads"
                        }
                ],
                "favorite": true
        },
        {
                "id": 33,
                "title": "Healthy Night",
                "description": "Classic healthy meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1556938320?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 21,
                "cook_time": 49,
                "created_at": "2025-09-05T23:58:32.295Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "healthy",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1.33,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.58,
                                "unit": "containers"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.08,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.08,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.33,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.25,
                                "unit": "heads"
                        }
                ],
                "favorite": true
        }
];

        // Demo meals that combine multiple recipes (0 items)
        this.meals = [];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 5,
                "recipe_id": 10,
                "date": "2025-09-30",
                "servings": 6,
                "notes": "Scheduled Chips and Salsa",
                "meal_type": "snack",
                "created_at": "2025-09-29T23:58:32.295Z"
        },
        {
                "id": 3,
                "recipe_id": 4,
                "date": "2025-10-01",
                "servings": 6,
                "notes": "Scheduled Garlic Bread",
                "meal_type": "dinner",
                "created_at": "2025-09-29T23:58:32.295Z"
        },
        {
                "id": 2,
                "recipe_id": 17,
                "date": "2025-10-06",
                "servings": 2,
                "notes": "Scheduled Chicken Breast Lunch Salad",
                "meal_type": "lunch",
                "created_at": "2025-09-29T23:58:32.295Z"
        },
        {
                "id": 4,
                "recipe_id": 10,
                "date": "2025-10-12",
                "servings": 6,
                "notes": "Scheduled Chips and Salsa",
                "meal_type": "snack",
                "created_at": "2025-09-29T23:58:32.295Z"
        },
        {
                "id": 1,
                "recipe_id": 18,
                "date": "2025-10-14",
                "servings": 4,
                "notes": "Scheduled Hash Browns",
                "meal_type": "breakfast",
                "created_at": "2025-09-29T23:58:32.295Z"
        },
        {
                "id": 7,
                "recipe_id": 6,
                "date": "2025-10-17",
                "servings": 4,
                "notes": "Scheduled Pancakes",
                "meal_type": "breakfast",
                "created_at": "2025-09-29T23:58:32.299Z"
        },
        {
                "id": 6,
                "recipe_id": 1,
                "date": "2025-10-19",
                "servings": 6,
                "notes": "Scheduled Mashed Potatoes",
                "meal_type": "dinner",
                "created_at": "2025-09-29T23:58:32.299Z"
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