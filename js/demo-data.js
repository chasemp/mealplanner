// Demo Data for MealPlanner
// Generated on 2025-09-13T13:44:10.640Z
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
                        "protein": 17,
                        "carbs": 41,
                        "fat": 6,
                        "calories": 241
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 14,
                "total_quantity": 23.389999999999997,
                "avg_quantity": 1.6707142857142856
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 13,
                        "carbs": 20,
                        "fat": 5,
                        "calories": 221
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ],
                "recipe_count": 4,
                "total_quantity": 9,
                "avg_quantity": 2.25
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 12,
                        "carbs": 20,
                        "fat": 2,
                        "calories": 232
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
                "default_unit": "packages",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 2,
                        "carbs": 10,
                        "fat": 3,
                        "calories": 93
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 12,
                "total_quantity": 8.129999999999999,
                "avg_quantity": 0.6774999999999999
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 20,
                        "carbs": 46,
                        "fat": 6,
                        "calories": 93
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 9,
                "total_quantity": 5.38,
                "avg_quantity": 0.5977777777777777
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 17,
                        "carbs": 21,
                        "fat": 2,
                        "calories": 56
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 13,
                "total_quantity": 21.38,
                "avg_quantity": 1.6446153846153846
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 16,
                        "carbs": 49,
                        "fat": 13,
                        "calories": 107
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
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 20,
                        "carbs": 47,
                        "fat": 4,
                        "calories": 125
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 4,
                "total_quantity": 5.75,
                "avg_quantity": 1.4375
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 42,
                        "fat": 5,
                        "calories": 121
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 1,
                "total_quantity": 0.75,
                "avg_quantity": 0.75
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 5,
                        "carbs": 6,
                        "fat": 7,
                        "calories": 131
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 4,
                "total_quantity": 6.13,
                "avg_quantity": 1.5325
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 7,
                        "carbs": 21,
                        "fat": 8,
                        "calories": 83
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 11,
                "total_quantity": 14.129999999999999,
                "avg_quantity": 1.2845454545454544
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 20,
                        "carbs": 49,
                        "fat": 15,
                        "calories": 180
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
                        "protein": 5,
                        "carbs": 6,
                        "fat": 11,
                        "calories": 65
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 4,
                "total_quantity": 3,
                "avg_quantity": 0.75
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 52,
                        "fat": 14,
                        "calories": 121
                },
                "labels": [
                        "grain",
                        "italian",
                        "comfort"
                ],
                "recipe_count": 2,
                "total_quantity": 1.5,
                "avg_quantity": 0.75
        },
        {
                "id": 15,
                "name": "Quinoa",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 21,
                        "fat": 13,
                        "calories": 85
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
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 54,
                        "fat": 12,
                        "calories": 204
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
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 1,
                        "carbs": 18,
                        "fat": 8,
                        "calories": 244
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 19,
                "total_quantity": 40.510000000000005,
                "avg_quantity": 2.132105263157895
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 48,
                        "fat": 15,
                        "calories": 110
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 8,
                "total_quantity": 4.25,
                "avg_quantity": 0.53125
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 1,
                        "carbs": 53,
                        "fat": 12,
                        "calories": 55
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 22,
                "total_quantity": 12.39,
                "avg_quantity": 0.5631818181818182
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 12,
                        "fat": 2,
                        "calories": 201
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
                        "protein": 8,
                        "carbs": 51,
                        "fat": 4,
                        "calories": 182
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 22,
                "total_quantity": 13.950000000000001,
                "avg_quantity": 0.6340909090909091
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 17,
                        "carbs": 54,
                        "fat": 12,
                        "calories": 189
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 8,
                "total_quantity": 8,
                "avg_quantity": 1
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 5,
                        "carbs": 10,
                        "fat": 2,
                        "calories": 95
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 8,
                "total_quantity": 13.88,
                "avg_quantity": 1.735
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "lbs",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 8,
                        "carbs": 30,
                        "fat": 7,
                        "calories": 224
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 6,
                "total_quantity": 3.63,
                "avg_quantity": 0.605
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 4,
                        "carbs": 19,
                        "fat": 10,
                        "calories": 214
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 7,
                "total_quantity": 11.57,
                "avg_quantity": 1.6528571428571428
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 52,
                        "fat": 9,
                        "calories": 107
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 10,
                "total_quantity": 16.759999999999998,
                "avg_quantity": 1.6759999999999997
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 14,
                        "carbs": 5,
                        "fat": 4,
                        "calories": 152
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 4,
                "total_quantity": 6,
                "avg_quantity": 1.5
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 54,
                        "fat": 3,
                        "calories": 135
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 4,
                "total_quantity": 1.5,
                "avg_quantity": 0.375
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 16,
                        "carbs": 20,
                        "fat": 12,
                        "calories": 198
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 2,
                "total_quantity": 3,
                "avg_quantity": 1.5
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 1,
                        "carbs": 54,
                        "fat": 3,
                        "calories": 136
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 4,
                "total_quantity": 5,
                "avg_quantity": 1.25
        },
        {
                "id": 31,
                "name": "Tortillas",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 19,
                        "carbs": 25,
                        "fat": 2,
                        "calories": 185
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
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 13,
                        "carbs": 5,
                        "fat": 6,
                        "calories": 184
                },
                "labels": [
                        "bread",
                        "mediterranean",
                        "pocket"
                ],
                "recipe_count": 7,
                "total_quantity": 15.25,
                "avg_quantity": 2.1785714285714284
        },
        {
                "id": 33,
                "name": "Potato Chips",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 8,
                        "fat": 9,
                        "calories": 199
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
                        "protein": 11,
                        "carbs": 37,
                        "fat": 3,
                        "calories": 235
                },
                "labels": [
                        "snack",
                        "mexican",
                        "crunchy"
                ],
                "recipe_count": 7,
                "total_quantity": 2.5,
                "avg_quantity": 0.35714285714285715
        },
        {
                "id": 35,
                "name": "Crackers",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 1,
                        "carbs": 49,
                        "fat": 14,
                        "calories": 128
                },
                "labels": [
                        "snack",
                        "crispy",
                        "versatile"
                ],
                "recipe_count": 8,
                "total_quantity": 3.51,
                "avg_quantity": 0.43875
        },
        {
                "id": 36,
                "name": "Pretzels",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 17,
                        "carbs": 44,
                        "fat": 3,
                        "calories": 126
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 16,
                        "carbs": 15,
                        "fat": 6,
                        "calories": 223
                },
                "labels": [
                        "condiment",
                        "tomato",
                        "sweet"
                ],
                "recipe_count": 4,
                "total_quantity": 1.75,
                "avg_quantity": 0.4375
        },
        {
                "id": 38,
                "name": "Mustard",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 27,
                        "fat": 10,
                        "calories": 71
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 12,
                        "fat": 15,
                        "calories": 113
                },
                "labels": [
                        "condiment",
                        "creamy",
                        "rich"
                ],
                "recipe_count": 7,
                "total_quantity": 3,
                "avg_quantity": 0.42857142857142855
        },
        {
                "id": 40,
                "name": "Salsa",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 15,
                        "fat": 5,
                        "calories": 216
                },
                "labels": [
                        "sauce",
                        "mexican",
                        "spicy"
                ],
                "recipe_count": 5,
                "total_quantity": 1.5,
                "avg_quantity": 0.3
        },
        {
                "id": 41,
                "name": "BBQ Sauce",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 26,
                        "fat": 14,
                        "calories": 160
                },
                "labels": [
                        "sauce",
                        "smoky",
                        "sweet"
                ],
                "recipe_count": 4,
                "total_quantity": 2.25,
                "avg_quantity": 0.5625
        },
        {
                "id": 42,
                "name": "Frozen Pizza",
                "category": "frozen",
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 6,
                        "carbs": 33,
                        "fat": 15,
                        "calories": 102
                },
                "labels": [
                        "convenience",
                        "quick",
                        "comfort"
                ],
                "recipe_count": 11,
                "total_quantity": 8.64,
                "avg_quantity": 0.7854545454545455
        },
        {
                "id": 43,
                "name": "Frozen Vegetables",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 11,
                        "carbs": 41,
                        "fat": 10,
                        "calories": 137
                },
                "labels": [
                        "vegetable",
                        "convenient",
                        "healthy"
                ],
                "recipe_count": 11,
                "total_quantity": 9.01,
                "avg_quantity": 0.8190909090909091
        },
        {
                "id": 44,
                "name": "Ice Cream",
                "category": "frozen",
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 3,
                        "carbs": 52,
                        "fat": 2,
                        "calories": 228
                },
                "labels": [
                        "dessert",
                        "sweet",
                        "cold"
                ],
                "recipe_count": 5,
                "total_quantity": 4.25,
                "avg_quantity": 0.85
        },
        {
                "id": 45,
                "name": "Orange Juice",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 3,
                        "carbs": 40,
                        "fat": 2,
                        "calories": 61
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 50,
                        "fat": 8,
                        "calories": 106
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 28,
                        "fat": 15,
                        "calories": 76
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 5,
                "total_quantity": 1.25,
                "avg_quantity": 0.25
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 9,
                        "fat": 12,
                        "calories": 102
                },
                "labels": [
                        "protein",
                        "fiber",
                        "convenient"
                ],
                "recipe_count": 3,
                "total_quantity": 1.5,
                "avg_quantity": 0.5
        },
        {
                "id": 49,
                "name": "Canned Tomatoes",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 15,
                        "fat": 8,
                        "calories": 95
                },
                "labels": [
                        "vegetable",
                        "sauce-base",
                        "versatile"
                ],
                "recipe_count": 6,
                "total_quantity": 3.5,
                "avg_quantity": 0.5833333333333334
        },
        {
                "id": 50,
                "name": "Chicken Broth",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 23,
                        "fat": 13,
                        "calories": 181
                },
                "labels": [
                        "liquid",
                        "flavor-base",
                        "cooking"
                ],
                "recipe_count": 5,
                "total_quantity": 2.5,
                "avg_quantity": 0.5
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-05-31T19:00:00.000Z",
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
                        "comfort"
                ],
                "items": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-05T04:30:00.000Z",
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
                        "savory",
                        "spicy",
                        "easy"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "lbs"
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-09T03:00:00.000Z",
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
                        "healthy",
                        "easy",
                        "savory"
                ],
                "items": [
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "packages"
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
                "created_at": "2025-06-12T17:00:00.000Z",
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
                        "healthy"
                ],
                "items": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "bottles"
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-16T17:45:00.000Z",
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
                        "healthy",
                        "spicy",
                        "fresh"
                ],
                "items": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
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
                "created_at": "2025-06-20T23:15:00.000Z",
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
                        "spicy",
                        "savory"
                ],
                "items": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "bunches"
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
                "created_at": "2025-06-24T16:30:00.000Z",
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
                        "spicy"
                ],
                "items": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
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
                "created_at": "2025-06-29T02:45:00.000Z",
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
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.5,
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-07-02T04:00:00.000Z",
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
                        "easy"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.5,
                                "unit": "packages"
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 30,
                "created_at": "2025-07-06T19:15:00.000Z",
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
                        "healthy",
                        "savory"
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 20,
                "created_at": "2025-07-10T05:30:00.000Z",
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
                        "crispy",
                        "baked",
                        "Snack",
                        "spicy",
                        "comfort",
                        "quick"
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-07-14T18:30:00.000Z",
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
                        "sweet",
                        "savory"
                ],
                "items": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ],
                "favorite": false
        },
        {
                "id": 13,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-17T20:00:00.000Z",
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
                        "quick",
                        "savory",
                        "spicy"
                ],
                "items": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 5,
                "cook_time": 5,
                "created_at": "2025-07-21T15:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "quick",
                        "portable",
                        "wrap",
                        "Lunch",
                        "savory",
                        "healthy",
                        "quick"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 15,
                "title": "Chicken Breast Breakfast Bowl",
                "description": "Nutritious breakfast bowl with chicken breast and fresh ingredients",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-07-25T10:30:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "healthy",
                        "bowl",
                        "Breakfast",
                        "spicy",
                        "healthy"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 16,
                "title": "Mediterranean Pita",
                "description": "Fresh pita pocket stuffed with vegetables and cheese",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 8,
                "cook_time": 0,
                "created_at": "2025-07-30T04:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "mediterranean",
                        "fresh",
                        "vegetarian",
                        "Lunch",
                        "savory"
                ],
                "items": [
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 2,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 17,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-08-02T15:00:00.000Z",
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
                        "Dinner",
                        "spicy",
                        "fresh"
                ],
                "items": [
                        {
                                "ingredient_id": 25,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "packages"
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-06T11:15:00.000Z",
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
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "prep_time": 45,
                "cook_time": 25,
                "created_at": "2025-08-10T04:45:00.000Z",
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
                                "recipe_id": 12,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 3,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
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
                "prep_time": 30,
                "cook_time": 20,
                "created_at": "2025-08-14T09:30:00.000Z",
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
                                "recipe_id": 11,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 17,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "packages"
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
                "created_at": "2025-08-18T07:15:00.000Z",
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
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "pieces"
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
                "prep_time": 17,
                "cook_time": 20,
                "created_at": "2025-08-22T02:30:00.000Z",
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
                                "recipe_id": 7,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-26T13:00:00.000Z",
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
                                "servings": 2,
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
                                "ingredient_id": 26,
                                "quantity": 2.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "bottles"
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
                "servings": 4,
                "prep_time": 22,
                "cook_time": 15,
                "created_at": "2025-08-29T17:15:00.000Z",
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
                                "recipe_id": 12,
                                "servings": 2,
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
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 20,
                "cook_time": 20,
                "created_at": "2025-09-02T11:00:00.000Z",
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
                                "recipe_id": 1,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 23,
                                "quantity": 3.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
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
                "prep_time": 20,
                "cook_time": 10,
                "created_at": "2025-09-06T10:00:00.000Z",
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
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 26,
                                "quantity": 2.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 1,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1586662509?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 11,
                "cook_time": 26,
                "created_at": "2025-09-05T13:44:10.639Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "mediterranean",
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
                                "recipe_id": 16,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 26,
                                "quantity": 2.88,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 4,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1.13,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1.13,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.88,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3.38,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 3.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1.13,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 2,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 28,
                "title": "Mexican Lunch Combo",
                "description": "Perfect mexican lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1518135504?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 8,
                "cook_time": 19,
                "created_at": "2025-09-02T13:44:10.639Z",
                "instructions": [],
                "labels": [
                        "midday",
                        "satisfying",
                        "mexican",
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
                                "recipe_id": 16,
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
                                "ingredient_id": 26,
                                "quantity": 3.38,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 2.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 6.13,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1.13,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1.13,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 2.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2.63,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 3,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 29,
                "title": "Mexican Night",
                "description": "Classic mexican meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1567413224?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 13,
                "cook_time": 31,
                "created_at": "2025-09-10T13:44:10.639Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "mexican",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 4,
                                "servings": 3,
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
                                "ingredient_id": 17,
                                "quantity": 0.63,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.88,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.63,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.13,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.88,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.13,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.13,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 0.63,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.38,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 30,
                "title": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1593020983?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 6,
                "cook_time": 14,
                "created_at": "2025-08-27T13:44:10.639Z",
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
                                "recipe_id": 9,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 31,
                "title": "Asian Lunch Combo",
                "description": "Perfect asian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1558225790?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 11,
                "cook_time": 26,
                "created_at": "2025-09-13T13:44:10.639Z",
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
                                "recipe_id": 9,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 14,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 3,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 3,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 2,
                                "unit": "lbs"
                        }
                ],
                "favorite": true
        },
        {
                "id": 32,
                "title": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1581097140?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-08-16T13:44:10.639Z",
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
                                "recipe_id": 14,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 33,
                "title": "Healthy Night",
                "description": "Classic healthy meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1506506716?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 21,
                "cook_time": 49,
                "created_at": "2025-08-24T13:44:10.639Z",
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
                                "recipe_id": 17,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 25,
                                "quantity": 2.57,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.32,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.76,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.63,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 0.88,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.38,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
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
                "id": 6,
                "recipe_id": 8,
                "date": "2025-09-13",
                "scheduled_date": "2025-09-13",
                "servings": 4,
                "notes": "Scheduled Hash Browns",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        }
                ],
                "recipe_name": "Hash Browns",
                "meal_type": "breakfast",
                "total_time": 25,
                "created_at": "2025-09-13T13:44:10.639Z"
        },
        {
                "id": 4,
                "recipe_id": 11,
                "date": "2025-09-16",
                "scheduled_date": "2025-09-16",
                "servings": 4,
                "notes": "Scheduled Broccoli Chips",
                "recipes": [
                        {
                                "recipeId": 11,
                                "servings": 4
                        }
                ],
                "recipe_name": "Broccoli Chips",
                "meal_type": "snack",
                "total_time": 35,
                "created_at": "2025-09-13T13:44:10.639Z"
        },
        {
                "id": 1,
                "recipe_id": 8,
                "date": "2025-09-20",
                "scheduled_date": "2025-09-20",
                "servings": 4,
                "notes": "Scheduled Hash Browns",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        }
                ],
                "recipe_name": "Hash Browns",
                "meal_type": "breakfast",
                "total_time": 25,
                "created_at": "2025-09-13T13:44:10.639Z"
        },
        {
                "id": 3,
                "recipe_id": 17,
                "date": "2025-09-23",
                "scheduled_date": "2025-09-23",
                "servings": 6,
                "notes": "Scheduled Green Beans",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 6
                        }
                ],
                "recipe_name": "Green Beans",
                "meal_type": "dinner",
                "total_time": 15,
                "created_at": "2025-09-13T13:44:10.639Z"
        },
        {
                "id": 7,
                "recipe_id": 31,
                "date": "2025-09-25",
                "scheduled_date": "2025-09-25",
                "servings": 3,
                "notes": "Scheduled Asian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 31,
                                "servings": 3
                        }
                ],
                "recipe_name": "Asian Lunch Combo",
                "meal_type": "lunch",
                "total_time": 37,
                "created_at": "2025-09-13T13:44:10.639Z"
        },
        {
                "id": 2,
                "recipe_id": 27,
                "date": "2025-09-30",
                "scheduled_date": "2025-09-30",
                "servings": 3,
                "notes": "Scheduled Mediterranean Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 27,
                                "servings": 3
                        }
                ],
                "recipe_name": "Mediterranean Lunch Combo",
                "meal_type": "lunch",
                "total_time": 37,
                "created_at": "2025-09-13T13:44:10.639Z"
        },
        {
                "id": 5,
                "recipe_id": 15,
                "date": "2025-10-03",
                "scheduled_date": "2025-10-03",
                "servings": 2,
                "notes": "Scheduled Chicken Breast Breakfast Bowl",
                "recipes": [
                        {
                                "recipeId": 15,
                                "servings": 2
                        }
                ],
                "recipe_name": "Chicken Breast Breakfast Bowl",
                "meal_type": "breakfast",
                "total_time": 25,
                "created_at": "2025-09-13T13:44:10.639Z"
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
            if (recipe.items) {
                recipe.items.forEach(recipeIng => {
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