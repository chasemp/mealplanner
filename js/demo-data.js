// Demo Data for MealPlanner
// Generated on 2025-09-15T23:02:34.615Z
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
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 5,
                        "carbs": 34,
                        "fat": 5,
                        "calories": 114
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
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 49,
                        "fat": 13,
                        "calories": 223
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
                        "protein": 2,
                        "carbs": 21,
                        "fat": 5,
                        "calories": 58
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
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 20,
                        "carbs": 31,
                        "fat": 7,
                        "calories": 54
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
                        "protein": 5,
                        "carbs": 46,
                        "fat": 4,
                        "calories": 78
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
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 40,
                        "fat": 1,
                        "calories": 53
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 41,
                        "fat": 8,
                        "calories": 162
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
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 17,
                        "carbs": 45,
                        "fat": 4,
                        "calories": 162
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
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 15,
                        "carbs": 36,
                        "fat": 7,
                        "calories": 151
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
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 11,
                        "carbs": 5,
                        "fat": 4,
                        "calories": 134
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
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 27,
                        "fat": 3,
                        "calories": 120
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
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 5,
                        "carbs": 42,
                        "fat": 13,
                        "calories": 120
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 3,
                        "carbs": 14,
                        "fat": 6,
                        "calories": 106
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
                        "protein": 11,
                        "carbs": 54,
                        "fat": 9,
                        "calories": 247
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
                "default_unit": "bags",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 14,
                        "fat": 11,
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
                "default_unit": "bags",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 36,
                        "fat": 15,
                        "calories": 74
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
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 14,
                        "carbs": 27,
                        "fat": 3,
                        "calories": 219
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
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 29,
                        "fat": 7,
                        "calories": 81
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
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 10,
                        "fat": 1,
                        "calories": 240
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 20,
                        "fat": 10,
                        "calories": 218
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
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 18,
                        "carbs": 26,
                        "fat": 7,
                        "calories": 191
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
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 12,
                        "carbs": 15,
                        "fat": 6,
                        "calories": 67
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
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 3,
                        "carbs": 11,
                        "fat": 14,
                        "calories": 52
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
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 18,
                        "carbs": 49,
                        "fat": 3,
                        "calories": 85
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
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 20,
                        "carbs": 43,
                        "fat": 3,
                        "calories": 158
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 34,
                        "fat": 14,
                        "calories": 226
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
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 12,
                        "carbs": 16,
                        "fat": 11,
                        "calories": 149
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
                        "protein": 1,
                        "carbs": 24,
                        "fat": 5,
                        "calories": 100
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
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 15,
                        "carbs": 34,
                        "fat": 15,
                        "calories": 209
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
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 16,
                        "carbs": 24,
                        "fat": 11,
                        "calories": 180
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
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 5,
                        "carbs": 38,
                        "fat": 9,
                        "calories": 225
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
                        "protein": 12,
                        "carbs": 42,
                        "fat": 2,
                        "calories": 222
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
                        "protein": 19,
                        "carbs": 8,
                        "fat": 12,
                        "calories": 141
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 7,
                        "fat": 3,
                        "calories": 155
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 14,
                        "carbs": 39,
                        "fat": 11,
                        "calories": 229
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 19,
                        "carbs": 46,
                        "fat": 13,
                        "calories": 136
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 18,
                        "carbs": 22,
                        "fat": 4,
                        "calories": 87
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 37,
                        "fat": 1,
                        "calories": 209
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 26,
                        "fat": 15,
                        "calories": 60
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
                        "carbs": 15,
                        "fat": 8,
                        "calories": 149
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 49,
                        "fat": 6,
                        "calories": 144
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
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 1,
                        "carbs": 18,
                        "fat": 5,
                        "calories": 168
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
                        "protein": 7,
                        "carbs": 12,
                        "fat": 12,
                        "calories": 79
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
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 1,
                        "carbs": 8,
                        "fat": 15,
                        "calories": 196
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
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 19,
                        "carbs": 41,
                        "fat": 8,
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 23,
                        "fat": 7,
                        "calories": 184
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 7,
                        "fat": 11,
                        "calories": 140
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
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 4,
                        "carbs": 9,
                        "fat": 10,
                        "calories": 124
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
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 4,
                        "carbs": 14,
                        "fat": 3,
                        "calories": 139
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 5,
                        "fat": 10,
                        "calories": 202
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
                "created_at": "2025-06-01T03:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "comfort",
                        "side-dish",
                        "Dinner",
                        "healthy",
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 7,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
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
                "created_at": "2025-06-05T01:00:00.000Z",
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
                        "Dinner",
                        "healthy",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 29,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-09T12:45:00.000Z",
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
                        "sweet",
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 25,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-12T20:15:00.000Z",
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
                        "Dinner",
                        "quick",
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 7,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 32,
                                "quantity": 1.5,
                                "unit": "loaves"
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-17T09:30:00.000Z",
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
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-20T18:00:00.000Z",
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
                        "savory",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.5,
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-25T01:30:00.000Z",
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
                        "quick",
                        "fresh",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
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
                "created_at": "2025-06-28T11:30:00.000Z",
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
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 9,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-07-02T14:00:00.000Z",
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
                        "fresh",
                        "salad",
                        "Lunch",
                        "easy",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 10,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 20,
                "created_at": "2025-07-06T21:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "healthy",
                        "crispy",
                        "baked",
                        "Snack",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 11,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-09T20:45:00.000Z",
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
                        "easy",
                        "healthy",
                        "hearty"
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
                                "unit": "containers"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 7,
                                "quantity": 1.75,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 12,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 20,
                "cook_time": 10,
                "created_at": "2025-07-14T02:00:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "comfort",
                        "sweet",
                        "Breakfast",
                        "spicy",
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1,
                                "unit": "lbs"
                        }
                ],
                "favorite": true
        },
        {
                "id": 13,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 20,
                "cook_time": 20,
                "created_at": "2025-07-18T08:30:00.000Z",
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
                        "Dinner",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-07-21T18:30:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "comfort",
                        "sweet",
                        "Breakfast",
                        "easy",
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 15,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-25T09:45:00.000Z",
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
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 16,
                "title": "Coffee and Toast",
                "description": "Simple breakfast with fresh coffee and buttered toast",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 1,
                "prep_time": 5,
                "cook_time": 5,
                "created_at": "2025-07-29T20:15:00.000Z",
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
                        "simple",
                        "Breakfast",
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 46,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        }
                ],
                "favorite": false
        },
        {
                "id": 17,
                "title": "Chicken Wrap",
                "description": "Grilled chicken wrapped in a soft tortilla",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-03T06:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "wrap",
                        "protein",
                        "portable",
                        "Lunch",
                        "savory",
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "lbs"
                        }
                ],
                "favorite": true
        },
        {
                "id": 18,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-08-06T14:45:00.000Z",
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
                        "Dinner",
                        "comfort",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 45,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1.75,
                                "unit": "lbs"
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-10T02:30:00.000Z",
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
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 29,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 7,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 40,
                "cook_time": 20,
                "created_at": "2025-08-14T06:45:00.000Z",
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
                                "recipe_id": 17,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 13,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 3.25,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 11,
                                "quantity": 3.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "bottles"
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
                "servings": 6,
                "prep_time": 22,
                "cook_time": 20,
                "created_at": "2025-08-17T21:00:00.000Z",
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
                        },
                        {
                                "recipe_id": 1,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 1.25,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 7,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 20,
                "cook_time": 20,
                "created_at": "2025-08-22T01:00:00.000Z",
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
                                "recipe_id": 10,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
                                "servings": 1,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-25T16:45:00.000Z",
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
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 7,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 32,
                                "quantity": 1.5,
                                "unit": "loaves"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-08-30T16:45:00.000Z",
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
                                "recipe_id": 15,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 14,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-09-03T09:30:00.000Z",
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
                                "recipe_id": 14,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "item_id": 17,
                                "quantity": 4,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-09-06T09:45:00.000Z",
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
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 7,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 32,
                                "quantity": 1.5,
                                "unit": "loaves"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Quick Asian Breakfast",
                "description": "Fast and delicious asian breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1516209695?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 10,
                "cook_time": 24,
                "created_at": "2025-08-17T23:02:34.614Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "asian",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 16,
                                "servings": 3,
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
                                "item_id": 46,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 6,
                                "unit": "packages"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 13,
                                "quantity": 2.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 33,
                                "quantity": 1.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 14,
                                "quantity": 2.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 43,
                                "quantity": 3.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.38,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.38,
                                "unit": "boxes"
                        }
                ],
                "favorite": true
        },
        {
                "id": 28,
                "title": "Healthy Lunch Combo",
                "description": "Perfect healthy lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1571377414?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-09-09T23:02:34.614Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "healthy",
                        "Recipe Combo",
                        "Lunch"
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
                        },
                        {
                                "recipe_id": 17,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 2.13,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 3.63,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.88,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.13,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 29,
                                "quantity": 0.88,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.88,
                                "unit": "packages"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.38,
                                "unit": "packages"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.38,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1.13,
                                "unit": "bags"
                        }
                ],
                "favorite": false
        },
        {
                "id": 29,
                "title": "Healthy Lunch Combo",
                "description": "Perfect healthy lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1592778226?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-08-26T23:02:34.614Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "healthy",
                        "Recipe Combo",
                        "Lunch"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 17,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 9,
                                "servings": 3,
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
                                "quantity": 3.19,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.88,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 2.13,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 11,
                                "quantity": 3.63,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.38,
                                "unit": "packages"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.38,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1.13,
                                "unit": "bags"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.19,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.38,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.31,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        }
                ],
                "favorite": true
        },
        {
                "id": 30,
                "title": "Quick Asian Breakfast",
                "description": "Fast and delicious asian breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1501020769?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 9,
                "cook_time": 21,
                "created_at": "2025-08-23T23:02:34.614Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "asian",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 14,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 31,
                "title": "Asian Lunch Combo",
                "description": "Perfect asian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1589008573?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-09-13T23:02:34.614Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "asian",
                        "Recipe Combo",
                        "Lunch"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 5,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 9,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 17,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 2.25,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.56,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3.44,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1.56,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 3.81,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.56,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 10,
                                "quantity": 0.94,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 1,
                                "quantity": 3.94,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.19,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.38,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.31,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 31,
                                "quantity": 2.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 39,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1.5,
                                "unit": "bags"
                        }
                ],
                "favorite": true
        },
        {
                "id": 32,
                "title": "Quick American Breakfast",
                "description": "Fast and delicious american breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1574239750?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 9,
                "cook_time": 21,
                "created_at": "2025-08-27T23:02:34.614Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "american",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 14,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.56,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.19,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.38,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.94,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.19,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.38,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 33,
                "title": "Quick Italian Breakfast",
                "description": "Fast and delicious italian breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1521726429?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-08-28T23:02:34.614Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "italian",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 8,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 14,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.38,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.38,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.56,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.19,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.38,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.94,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.19,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.38,
                                "unit": "containers"
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
                "id": 5,
                "recipe_id": 9,
                "date": "2025-09-19",
                "scheduled_date": "2025-09-19",
                "servings": 4,
                "notes": "Scheduled Chicken Breast Lunch Salad",
                "recipes": [
                        {
                                "recipeId": 9,
                                "servings": 4
                        }
                ],
                "recipe_name": "Chicken Breast Lunch Salad",
                "meal_type": "lunch",
                "total_time": 20,
                "created_at": "2025-09-15T23:02:34.614Z"
        },
        {
                "id": 4,
                "recipe_id": 11,
                "date": "2025-09-21",
                "scheduled_date": "2025-09-21",
                "servings": 4,
                "notes": "Scheduled Chips and Salsa",
                "recipes": [
                        {
                                "recipeId": 11,
                                "servings": 4
                        }
                ],
                "recipe_name": "Chips and Salsa",
                "meal_type": "snack",
                "total_time": 5,
                "created_at": "2025-09-15T23:02:34.614Z"
        },
        {
                "id": 2,
                "recipe_id": 31,
                "date": "2025-09-23",
                "scheduled_date": "2025-09-23",
                "servings": 4,
                "notes": "Scheduled Asian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 31,
                                "servings": 4
                        }
                ],
                "recipe_name": "Asian Lunch Combo",
                "meal_type": "lunch",
                "total_time": 54,
                "created_at": "2025-09-15T23:02:34.614Z"
        },
        {
                "id": 6,
                "recipe_id": 9,
                "date": "2025-09-24",
                "scheduled_date": "2025-09-24",
                "servings": 4,
                "notes": "Scheduled Chicken Breast Lunch Salad",
                "recipes": [
                        {
                                "recipeId": 9,
                                "servings": 4
                        }
                ],
                "recipe_name": "Chicken Breast Lunch Salad",
                "meal_type": "lunch",
                "total_time": 20,
                "created_at": "2025-09-15T23:02:34.614Z"
        },
        {
                "id": 7,
                "recipe_id": 14,
                "date": "2025-09-26",
                "scheduled_date": "2025-09-26",
                "servings": 4,
                "notes": "Scheduled Morning Bread Stack",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 4
                        }
                ],
                "recipe_name": "Morning Bread Stack",
                "meal_type": "breakfast",
                "total_time": 30,
                "created_at": "2025-09-15T23:02:34.614Z"
        },
        {
                "id": 3,
                "recipe_id": 13,
                "date": "2025-09-27",
                "scheduled_date": "2025-09-27",
                "servings": 6,
                "notes": "Scheduled Grilled Chicken Breast with Broccoli",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 6
                        }
                ],
                "recipe_name": "Grilled Chicken Breast with Broccoli",
                "meal_type": "dinner",
                "total_time": 40,
                "created_at": "2025-09-15T23:02:34.614Z"
        },
        {
                "id": 1,
                "recipe_id": 7,
                "date": "2025-10-02",
                "scheduled_date": "2025-10-02",
                "servings": 4,
                "notes": "Scheduled Bacon",
                "recipes": [
                        {
                                "recipeId": 7,
                                "servings": 4
                        }
                ],
                "recipe_name": "Bacon",
                "meal_type": "breakfast",
                "total_time": 10,
                "created_at": "2025-09-15T23:02:34.614Z"
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