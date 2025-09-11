// Demo Data for MealPlanner
// Generated on 2025-09-11T15:35:00.761Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 50 ingredients across 7 categories
// - 26 recipes (18 basic, 8 combo)
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
        // Comprehensive ingredient list (50 items)
        this.ingredients = [
        {
                "id": 1,
                "name": "Chicken Breast",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 11,
                        "carbs": 8,
                        "fat": 6,
                        "calories": 88
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 8,
                "total_quantity": 12.5,
                "avg_quantity": 1.5625
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 20,
                        "carbs": 22,
                        "fat": 4,
                        "calories": 150
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 2,
                        "carbs": 46,
                        "fat": 3,
                        "calories": 54
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 1,
                "total_quantity": 1,
                "avg_quantity": 1
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 19,
                        "carbs": 48,
                        "fat": 10,
                        "calories": 131
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 6,
                "total_quantity": 4.25,
                "avg_quantity": 0.7083333333333334
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 7,
                        "fat": 11,
                        "calories": 208
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 8,
                "total_quantity": 4.5,
                "avg_quantity": 0.5625
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 19,
                        "carbs": 16,
                        "fat": 7,
                        "calories": 224
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 5,
                "total_quantity": 5.25,
                "avg_quantity": 1.05
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 36,
                        "fat": 8,
                        "calories": 140
                },
                "labels": [
                        "vegetable",
                        "sweet",
                        "vitamin-a"
                ],
                "recipe_count": 2,
                "total_quantity": 1.25,
                "avg_quantity": 0.625
        },
        {
                "id": 8,
                "name": "Bell Peppers",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 39,
                        "fat": 6,
                        "calories": 84
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 5,
                "total_quantity": 6.75,
                "avg_quantity": 1.35
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 9,
                        "carbs": 54,
                        "fat": 10,
                        "calories": 224
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 4,
                "total_quantity": 4,
                "avg_quantity": 1
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 21,
                        "fat": 10,
                        "calories": 210
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 6,
                "total_quantity": 5.5,
                "avg_quantity": 0.9166666666666666
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 4,
                        "carbs": 22,
                        "fat": 12,
                        "calories": 137
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 4,
                "total_quantity": 5.25,
                "avg_quantity": 1.3125
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 6,
                        "carbs": 53,
                        "fat": 7,
                        "calories": 58
                },
                "labels": [
                        "leafy-green",
                        "iron",
                        "healthy"
                ],
                "recipe_count": 3,
                "total_quantity": 3.5,
                "avg_quantity": 1.1666666666666667
        },
        {
                "id": 13,
                "name": "Rice",
                "category": "grains",
                "default_unit": "lbs",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 19,
                        "carbs": 7,
                        "fat": 13,
                        "calories": 148
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 3,
                "total_quantity": 2.25,
                "avg_quantity": 0.75
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 10,
                        "fat": 7,
                        "calories": 238
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 8,
                        "fat": 10,
                        "calories": 187
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
                        "protein": 17,
                        "carbs": 30,
                        "fat": 9,
                        "calories": 231
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 4,
                "total_quantity": 3.75,
                "avg_quantity": 0.9375
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 10,
                        "carbs": 21,
                        "fat": 1,
                        "calories": 196
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 7,
                "total_quantity": 14.75,
                "avg_quantity": 2.107142857142857
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 51,
                        "fat": 5,
                        "calories": 138
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 3,
                "total_quantity": 1,
                "avg_quantity": 0.3333333333333333
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 35,
                        "fat": 3,
                        "calories": 161
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 14,
                "total_quantity": 6.25,
                "avg_quantity": 0.44642857142857145
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 10,
                        "fat": 9,
                        "calories": 104
                },
                "labels": [
                        "seasoning",
                        "spice",
                        "flavor"
                ],
                "recipe_count": 6,
                "total_quantity": 3,
                "avg_quantity": 0.5
        },
        {
                "id": 21,
                "name": "Butter",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 14,
                        "carbs": 50,
                        "fat": 3,
                        "calories": 182
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 10,
                "total_quantity": 9,
                "avg_quantity": 0.9
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 2,
                        "carbs": 23,
                        "fat": 6,
                        "calories": 96
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 10,
                "total_quantity": 4.5,
                "avg_quantity": 0.45
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 14,
                        "carbs": 18,
                        "fat": 2,
                        "calories": 175
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 5,
                "total_quantity": 9,
                "avg_quantity": 1.8
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 13,
                        "carbs": 49,
                        "fat": 8,
                        "calories": 150
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 7,
                "total_quantity": 4.75,
                "avg_quantity": 0.6785714285714286
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 20,
                        "fat": 1,
                        "calories": 206
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 3,
                "total_quantity": 1.75,
                "avg_quantity": 0.5833333333333334
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 8,
                        "carbs": 24,
                        "fat": 3,
                        "calories": 166
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 6,
                "total_quantity": 4.5,
                "avg_quantity": 0.75
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 44,
                        "fat": 11,
                        "calories": 215
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 7,
                "total_quantity": 10.25,
                "avg_quantity": 1.4642857142857142
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 25,
                        "fat": 1,
                        "calories": 114
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 4,
                "total_quantity": 1.25,
                "avg_quantity": 0.3125
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 11,
                        "carbs": 24,
                        "fat": 11,
                        "calories": 133
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 2,
                "total_quantity": 2.5,
                "avg_quantity": 1.25
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 8,
                        "carbs": 34,
                        "fat": 9,
                        "calories": 158
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
                        "carbs": 9,
                        "fat": 7,
                        "calories": 53
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
                        "protein": 4,
                        "carbs": 27,
                        "fat": 7,
                        "calories": 209
                },
                "labels": [
                        "bread",
                        "mediterranean",
                        "pocket"
                ],
                "recipe_count": 6,
                "total_quantity": 8.75,
                "avg_quantity": 1.4583333333333333
        },
        {
                "id": 33,
                "name": "Potato Chips",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 30,
                        "fat": 14,
                        "calories": 109
                },
                "labels": [
                        "snack",
                        "crispy",
                        "salty"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 34,
                "name": "Tortilla Chips",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 8,
                        "carbs": 9,
                        "fat": 1,
                        "calories": 92
                },
                "labels": [
                        "snack",
                        "mexican",
                        "crunchy"
                ],
                "recipe_count": 5,
                "total_quantity": 2,
                "avg_quantity": 0.4
        },
        {
                "id": 35,
                "name": "Crackers",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 1,
                        "carbs": 42,
                        "fat": 13,
                        "calories": 201
                },
                "labels": [
                        "snack",
                        "crispy",
                        "versatile"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 36,
                "name": "Pretzels",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 6,
                        "carbs": 22,
                        "fat": 15,
                        "calories": 76
                },
                "labels": [
                        "snack",
                        "salty",
                        "crunchy"
                ],
                "recipe_count": 7,
                "total_quantity": 1.75,
                "avg_quantity": 0.25
        },
        {
                "id": 37,
                "name": "Ketchup",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 16,
                        "fat": 8,
                        "calories": 68
                },
                "labels": [
                        "condiment",
                        "tomato",
                        "sweet"
                ],
                "recipe_count": 3,
                "total_quantity": 0.75,
                "avg_quantity": 0.25
        },
        {
                "id": 38,
                "name": "Mustard",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 4,
                        "carbs": 23,
                        "fat": 4,
                        "calories": 144
                },
                "labels": [
                        "condiment",
                        "tangy",
                        "spicy"
                ],
                "recipe_count": 2,
                "total_quantity": 0.5,
                "avg_quantity": 0.25
        },
        {
                "id": 39,
                "name": "Mayonnaise",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 32,
                        "fat": 2,
                        "calories": 238
                },
                "labels": [
                        "condiment",
                        "creamy",
                        "rich"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 40,
                "name": "Salsa",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 20,
                        "carbs": 40,
                        "fat": 13,
                        "calories": 191
                },
                "labels": [
                        "sauce",
                        "mexican",
                        "spicy"
                ],
                "recipe_count": 8,
                "total_quantity": 3,
                "avg_quantity": 0.375
        },
        {
                "id": 41,
                "name": "BBQ Sauce",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 39,
                        "fat": 4,
                        "calories": 56
                },
                "labels": [
                        "sauce",
                        "smoky",
                        "sweet"
                ],
                "recipe_count": 2,
                "total_quantity": 0.5,
                "avg_quantity": 0.25
        },
        {
                "id": 42,
                "name": "Frozen Pizza",
                "category": "frozen",
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 8,
                        "carbs": 44,
                        "fat": 11,
                        "calories": 229
                },
                "labels": [
                        "convenience",
                        "quick",
                        "comfort"
                ],
                "recipe_count": 9,
                "total_quantity": 9,
                "avg_quantity": 1
        },
        {
                "id": 43,
                "name": "Frozen Vegetables",
                "category": "frozen",
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 2,
                        "carbs": 48,
                        "fat": 13,
                        "calories": 175
                },
                "labels": [
                        "vegetable",
                        "convenient",
                        "healthy"
                ],
                "recipe_count": 3,
                "total_quantity": 2.75,
                "avg_quantity": 0.9166666666666666
        },
        {
                "id": 44,
                "name": "Ice Cream",
                "category": "frozen",
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 2,
                        "carbs": 47,
                        "fat": 6,
                        "calories": 69
                },
                "labels": [
                        "dessert",
                        "sweet",
                        "cold"
                ],
                "recipe_count": 1,
                "total_quantity": 1,
                "avg_quantity": 1
        },
        {
                "id": 45,
                "name": "Orange Juice",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 5,
                        "carbs": 34,
                        "fat": 11,
                        "calories": 187
                },
                "labels": [
                        "beverage",
                        "vitamin-c",
                        "breakfast"
                ],
                "recipe_count": 5,
                "total_quantity": 3,
                "avg_quantity": 0.6
        },
        {
                "id": 46,
                "name": "Coffee",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 7,
                        "fat": 8,
                        "calories": 204
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
                        "carbs": 39,
                        "fat": 2,
                        "calories": 55
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 4,
                "total_quantity": 1,
                "avg_quantity": 0.25
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 32,
                        "fat": 3,
                        "calories": 243
                },
                "labels": [
                        "protein",
                        "fiber",
                        "convenient"
                ],
                "recipe_count": 1,
                "total_quantity": 0.25,
                "avg_quantity": 0.25
        },
        {
                "id": 49,
                "name": "Canned Tomatoes",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 4,
                        "carbs": 42,
                        "fat": 8,
                        "calories": 169
                },
                "labels": [
                        "vegetable",
                        "sauce-base",
                        "versatile"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 50,
                "name": "Chicken Broth",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 16,
                        "fat": 14,
                        "calories": 76
                },
                "labels": [
                        "liquid",
                        "flavor-base",
                        "cooking"
                ],
                "recipe_count": 2,
                "total_quantity": 0.5,
                "avg_quantity": 0.25
        }
];

        // Comprehensive recipe list (26 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T00:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "comfort",
                        "side-dish",
                        "Dinner",
                        "spicy",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "containers"
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
                                "ingredient_id": 25,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.5,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-05T08:30:00.000Z",
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
                        "hearty",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "containers"
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
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 3,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-08T21:15:00.000Z",
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
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 4,
                "title": "Garlic Bread",
                "description": "Toasted bread with garlic and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-13T12:30:00.000Z",
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
                        "healthy",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-17T03:00:00.000Z",
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
                        "hearty",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": true
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
                "created_at": "2025-06-21T05:15:00.000Z",
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
                        "fresh",
                        "sweet",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 7,
                "title": "Bacon",
                "description": "Crispy breakfast bacon",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-25T07:00:00.000Z",
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
                        "sweet",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ],
                "favorite": false
        },
        {
                "id": 8,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-28T22:00:00.000Z",
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
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 9,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 10,
                "cook_time": 5,
                "created_at": "2025-07-02T02:45:00.000Z",
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
                        "portable",
                        "wrap",
                        "Lunch",
                        "healthy"
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
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 24,
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
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 30,
                "created_at": "2025-07-05T22:00:00.000Z",
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
                        "savory",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 11,
                "title": "Loaded Nachos",
                "description": "Crispy tortilla chips loaded with cheese and toppings",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-09T21:15:00.000Z",
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
                        "mexican",
                        "quick",
                        "Snack",
                        "healthy",
                        "hearty",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ],
                "favorite": false
        },
        {
                "id": 12,
                "title": "Mediterranean Pita",
                "description": "Fresh pita pocket stuffed with vegetables and cheese",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 8,
                "cook_time": 0,
                "created_at": "2025-07-14T06:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "mediterranean",
                        "fresh",
                        "vegetarian",
                        "Lunch",
                        "sweet",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 32,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 13,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-07-18T12:30:00.000Z",
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
                        "savory",
                        "sweet",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Quick Pizza Night",
                "description": "Easy frozen pizza enhanced with fresh toppings",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 12,
                "created_at": "2025-07-22T10:00:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 15,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-07-25T21:45:00.000Z",
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
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 16,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-29T11:45:00.000Z",
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
                        "comfort",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 17,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-08-02T12:00:00.000Z",
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
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 18,
                "title": "Mediterranean Pita",
                "description": "Fresh pita pocket stuffed with vegetables and cheese",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 8,
                "cook_time": 0,
                "created_at": "2025-08-06T17:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "mediterranean",
                        "fresh",
                        "vegetarian",
                        "Lunch",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 1,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 19,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 27,
                "cook_time": 25,
                "created_at": "2025-08-10T03:15:00.000Z",
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
                                "recipe_id": 7,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 1.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-08-14T17:00:00.000Z",
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
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 12,
                "cook_time": 15,
                "created_at": "2025-08-18T08:00:00.000Z",
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
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 42,
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
                "id": 22,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 30,
                "created_at": "2025-08-22T08:45:00.000Z",
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
                                "recipe_id": 10,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-25T23:15:00.000Z",
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
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-30T11:00:00.000Z",
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
                                "recipe_id": 15,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 14,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 3,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-09-03T04:45:00.000Z",
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
                                "recipe_id": 14,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-09-06T21:00:00.000Z",
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
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Healthy Night",
                "description": "Classic healthy meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 4
                        },
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "healthy"
                ],
                "tags": [
                        "family-friendly",
                        "comfort"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-19T15:35:00.760Z",
                "updatedAt": "2025-09-07T15:35:00.760Z"
        },
        {
                "id": 2,
                "name": "American Lunch Combo",
                "description": "Perfect american lunch combination",
                "recipes": [
                        {
                                "recipeId": 12,
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
                        "american"
                ],
                "tags": [
                        "family-friendly",
                        "crowd-pleaser"
                ],
                "estimatedTime": 8,
                "createdAt": "2025-08-25T15:35:00.760Z",
                "updatedAt": "2025-09-08T15:35:00.760Z"
        },
        {
                "id": 3,
                "name": "Mexican Night",
                "description": "Classic mexican meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "classic",
                        "complete",
                        "mexican"
                ],
                "tags": [
                        "special-occasion",
                        "weekend"
                ],
                "estimatedTime": 110,
                "createdAt": "2025-08-24T15:35:00.760Z",
                "updatedAt": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 4,
                "name": "Quick Comfort Food Breakfast",
                "description": "Fast and delicious comfort food breakfast",
                "recipes": [
                        {
                                "recipeId": 6,
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
                        "comfort-food"
                ],
                "tags": [
                        "crowd-pleaser"
                ],
                "estimatedTime": 25,
                "createdAt": "2025-09-04T15:35:00.760Z",
                "updatedAt": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 5,
                "name": "Quick American Breakfast",
                "description": "Fast and delicious american breakfast",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 2
                        },
                        {
                                "recipeId": 7,
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
                        "american"
                ],
                "tags": [
                        "family-friendly",
                        "healthy"
                ],
                "estimatedTime": 35,
                "createdAt": "2025-09-01T15:35:00.760Z",
                "updatedAt": "2025-09-10T15:35:00.760Z"
        },
        {
                "id": 6,
                "name": "Quick Mediterranean Breakfast",
                "description": "Fast and delicious mediterranean breakfast",
                "recipes": [
                        {
                                "recipeId": 6,
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
                        "mediterranean"
                ],
                "tags": [
                        "weekend",
                        "family-friendly"
                ],
                "estimatedTime": 25,
                "createdAt": "2025-08-31T15:35:00.760Z",
                "updatedAt": "2025-09-05T15:35:00.760Z"
        },
        {
                "id": 7,
                "name": "Quick American Breakfast",
                "description": "Fast and delicious american breakfast",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 2
                        },
                        {
                                "recipeId": 7,
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
                        "american"
                ],
                "tags": [
                        "weekend",
                        "comfort"
                ],
                "estimatedTime": 35,
                "createdAt": "2025-08-15T15:35:00.760Z",
                "updatedAt": "2025-09-05T15:35:00.760Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 2,
                "meal_id": 2,
                "date": "2025-09-15",
                "scheduled_date": "2025-09-15",
                "servings": 2,
                "notes": "Scheduled American Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 12,
                                "servings": 2
                        }
                ],
                "recipe_id": 12,
                "total_time": 8,
                "created_at": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 6,
                "meal_id": 6,
                "date": "2025-09-21",
                "scheduled_date": "2025-09-21",
                "servings": 3,
                "notes": "Scheduled Quick Mediterranean Breakfast",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 3
                        }
                ],
                "recipe_id": 6,
                "total_time": 25,
                "created_at": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 1,
                "meal_id": 6,
                "date": "2025-09-22",
                "scheduled_date": "2025-09-22",
                "servings": 3,
                "notes": "Scheduled Quick Mediterranean Breakfast",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 3
                        }
                ],
                "recipe_id": 6,
                "total_time": 25,
                "created_at": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 3,
                "meal_id": 3,
                "date": "2025-09-23",
                "scheduled_date": "2025-09-23",
                "servings": 4,
                "notes": "Scheduled Mexican Night",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "recipe_id": 1,
                "total_time": 110,
                "created_at": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 4,
                "meal_id": 5,
                "date": "2025-09-24",
                "scheduled_date": "2025-09-24",
                "servings": 3,
                "notes": "Scheduled Quick American Breakfast",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 2
                        },
                        {
                                "recipeId": 7,
                                "servings": 3
                        }
                ],
                "recipe_id": 6,
                "total_time": 35,
                "created_at": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 5,
                "recipe_id": 8,
                "date": "2025-09-26",
                "scheduled_date": "2025-09-26",
                "servings": 4,
                "notes": "Scheduled Hash Browns",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        }
                ],
                "total_time": 25,
                "created_at": "2025-09-11T15:35:00.760Z"
        },
        {
                "id": 7,
                "meal_id": 3,
                "date": "2025-09-28",
                "scheduled_date": "2025-09-28",
                "servings": 4,
                "notes": "Scheduled Mexican Night",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "recipe_id": 1,
                "total_time": 110,
                "created_at": "2025-09-11T15:35:00.760Z"
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