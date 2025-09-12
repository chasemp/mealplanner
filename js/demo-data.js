// Demo Data for MealPlanner
// Generated on 2025-09-12T13:10:13.583Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 50 ingredients across 7 categories
// - 26 recipes (18 regular, 8 combo)
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
                "default_unit": "lbs",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 11,
                        "carbs": 14,
                        "fat": 14,
                        "calories": 208
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 5,
                "total_quantity": 7.5,
                "avg_quantity": 1.5
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 17,
                        "carbs": 31,
                        "fat": 4,
                        "calories": 129
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ],
                "recipe_count": 2,
                "total_quantity": 3.5,
                "avg_quantity": 1.75
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 22,
                        "fat": 7,
                        "calories": 99
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 1,
                "total_quantity": 1.25,
                "avg_quantity": 1.25
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 42,
                        "fat": 14,
                        "calories": 190
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 4,
                "total_quantity": 2.5,
                "avg_quantity": 0.625
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 31,
                        "fat": 2,
                        "calories": 244
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 4,
                "total_quantity": 2,
                "avg_quantity": 0.5
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 7,
                        "carbs": 25,
                        "fat": 11,
                        "calories": 63
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 9,
                "total_quantity": 10.25,
                "avg_quantity": 1.1388888888888888
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 51,
                        "fat": 13,
                        "calories": 185
                },
                "labels": [
                        "vegetable",
                        "sweet",
                        "vitamin-a"
                ],
                "recipe_count": 2,
                "total_quantity": 3.5,
                "avg_quantity": 1.75
        },
        {
                "id": 8,
                "name": "Bell Peppers",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 37,
                        "fat": 14,
                        "calories": 159
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 3,
                "total_quantity": 3.25,
                "avg_quantity": 1.0833333333333333
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 8,
                        "carbs": 16,
                        "fat": 9,
                        "calories": 121
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 9,
                "total_quantity": 11.75,
                "avg_quantity": 1.3055555555555556
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 17,
                        "carbs": 26,
                        "fat": 6,
                        "calories": 160
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 7,
                "total_quantity": 9,
                "avg_quantity": 1.2857142857142858
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 14,
                        "carbs": 27,
                        "fat": 12,
                        "calories": 114
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 8,
                "total_quantity": 9,
                "avg_quantity": 1.125
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 3,
                        "carbs": 21,
                        "fat": 4,
                        "calories": 69
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
                        "protein": 14,
                        "carbs": 50,
                        "fat": 8,
                        "calories": 161
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 1,
                "total_quantity": 1,
                "avg_quantity": 1
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 18,
                        "carbs": 27,
                        "fat": 10,
                        "calories": 217
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
                        "protein": 9,
                        "carbs": 18,
                        "fat": 9,
                        "calories": 183
                },
                "labels": [
                        "grain",
                        "protein",
                        "healthy"
                ],
                "recipe_count": 4,
                "total_quantity": 3,
                "avg_quantity": 0.75
        },
        {
                "id": 16,
                "name": "Oats",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 7,
                        "fat": 7,
                        "calories": 94
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 2,
                "total_quantity": 2,
                "avg_quantity": 1
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 4,
                        "carbs": 19,
                        "fat": 2,
                        "calories": 136
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 8,
                "total_quantity": 14.25,
                "avg_quantity": 1.78125
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 49,
                        "fat": 5,
                        "calories": 155
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 4,
                "total_quantity": 1,
                "avg_quantity": 0.25
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 7,
                        "carbs": 19,
                        "fat": 9,
                        "calories": 213
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 17,
                "total_quantity": 7.5,
                "avg_quantity": 0.4411764705882353
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 11,
                        "fat": 3,
                        "calories": 121
                },
                "labels": [
                        "seasoning",
                        "spice",
                        "flavor"
                ],
                "recipe_count": 7,
                "total_quantity": 2.25,
                "avg_quantity": 0.32142857142857145
        },
        {
                "id": 21,
                "name": "Butter",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 10,
                        "carbs": 38,
                        "fat": 4,
                        "calories": 122
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 8,
                "total_quantity": 6.75,
                "avg_quantity": 0.84375
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 27,
                        "fat": 13,
                        "calories": 220
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 13,
                "total_quantity": 9.25,
                "avg_quantity": 0.7115384615384616
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 6,
                        "fat": 9,
                        "calories": 50
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 4,
                "total_quantity": 3,
                "avg_quantity": 0.75
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 23,
                        "fat": 4,
                        "calories": 160
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 5,
                "total_quantity": 5,
                "avg_quantity": 1
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 11,
                        "fat": 11,
                        "calories": 205
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 5,
                "total_quantity": 6.5,
                "avg_quantity": 1.3
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 7,
                        "carbs": 8,
                        "fat": 8,
                        "calories": 113
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 9,
                "total_quantity": 12.75,
                "avg_quantity": 1.4166666666666667
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 6,
                        "carbs": 44,
                        "fat": 11,
                        "calories": 152
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 5,
                "total_quantity": 6.5,
                "avg_quantity": 1.3
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 45,
                        "fat": 5,
                        "calories": 194
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 2,
                "total_quantity": 0.5,
                "avg_quantity": 0.25
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 4,
                        "carbs": 52,
                        "fat": 5,
                        "calories": 183
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 7,
                "total_quantity": 10.5,
                "avg_quantity": 1.5
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 10,
                        "carbs": 44,
                        "fat": 1,
                        "calories": 113
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
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 16,
                        "carbs": 5,
                        "fat": 2,
                        "calories": 175
                },
                "labels": [
                        "wrap",
                        "mexican",
                        "versatile"
                ],
                "recipe_count": 3,
                "total_quantity": 6,
                "avg_quantity": 2
        },
        {
                "id": 32,
                "name": "Pita Bread",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 10,
                        "carbs": 18,
                        "fat": 15,
                        "calories": 78
                },
                "labels": [
                        "bread",
                        "mediterranean",
                        "pocket"
                ],
                "recipe_count": 5,
                "total_quantity": 6,
                "avg_quantity": 1.2
        },
        {
                "id": 33,
                "name": "Potato Chips",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 19,
                        "fat": 5,
                        "calories": 68
                },
                "labels": [
                        "snack",
                        "crispy",
                        "salty"
                ],
                "recipe_count": 4,
                "total_quantity": 1.75,
                "avg_quantity": 0.4375
        },
        {
                "id": 34,
                "name": "Tortilla Chips",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 8,
                        "carbs": 34,
                        "fat": 7,
                        "calories": 224
                },
                "labels": [
                        "snack",
                        "mexican",
                        "crunchy"
                ],
                "recipe_count": 7,
                "total_quantity": 3,
                "avg_quantity": 0.42857142857142855
        },
        {
                "id": 35,
                "name": "Crackers",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 16,
                        "carbs": 8,
                        "fat": 5,
                        "calories": 66
                },
                "labels": [
                        "snack",
                        "crispy",
                        "versatile"
                ],
                "recipe_count": 2,
                "total_quantity": 1,
                "avg_quantity": 0.5
        },
        {
                "id": 36,
                "name": "Pretzels",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 13,
                        "carbs": 22,
                        "fat": 1,
                        "calories": 78
                },
                "labels": [
                        "snack",
                        "salty",
                        "crunchy"
                ],
                "recipe_count": 6,
                "total_quantity": 1.5,
                "avg_quantity": 0.25
        },
        {
                "id": 37,
                "name": "Ketchup",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 17,
                        "fat": 13,
                        "calories": 83
                },
                "labels": [
                        "condiment",
                        "tomato",
                        "sweet"
                ],
                "recipe_count": 5,
                "total_quantity": 2.5,
                "avg_quantity": 0.5
        },
        {
                "id": 38,
                "name": "Mustard",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 8,
                        "carbs": 6,
                        "fat": 3,
                        "calories": 123
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
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 47,
                        "fat": 9,
                        "calories": 87
                },
                "labels": [
                        "condiment",
                        "creamy",
                        "rich"
                ],
                "recipe_count": 2,
                "total_quantity": 1,
                "avg_quantity": 0.5
        },
        {
                "id": 40,
                "name": "Salsa",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 27,
                        "fat": 1,
                        "calories": 218
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 17,
                        "carbs": 5,
                        "fat": 9,
                        "calories": 100
                },
                "labels": [
                        "sauce",
                        "smoky",
                        "sweet"
                ],
                "recipe_count": 1,
                "total_quantity": 0.25,
                "avg_quantity": 0.25
        },
        {
                "id": 42,
                "name": "Frozen Pizza",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 18,
                        "carbs": 51,
                        "fat": 4,
                        "calories": 123
                },
                "labels": [
                        "convenience",
                        "quick",
                        "comfort"
                ],
                "recipe_count": 1,
                "total_quantity": 0.75,
                "avg_quantity": 0.75
        },
        {
                "id": 43,
                "name": "Frozen Vegetables",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 19,
                        "carbs": 25,
                        "fat": 10,
                        "calories": 164
                },
                "labels": [
                        "vegetable",
                        "convenient",
                        "healthy"
                ],
                "recipe_count": 2,
                "total_quantity": 2,
                "avg_quantity": 1
        },
        {
                "id": 44,
                "name": "Ice Cream",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 10,
                        "carbs": 30,
                        "fat": 1,
                        "calories": 195
                },
                "labels": [
                        "dessert",
                        "sweet",
                        "cold"
                ],
                "recipe_count": 1,
                "total_quantity": 0.75,
                "avg_quantity": 0.75
        },
        {
                "id": 45,
                "name": "Orange Juice",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 48,
                        "fat": 12,
                        "calories": 197
                },
                "labels": [
                        "beverage",
                        "vitamin-c",
                        "breakfast"
                ],
                "recipe_count": 2,
                "total_quantity": 2,
                "avg_quantity": 1
        },
        {
                "id": 46,
                "name": "Coffee",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 14,
                        "fat": 2,
                        "calories": 180
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
                        "protein": 17,
                        "carbs": 36,
                        "fat": 2,
                        "calories": 249
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 6,
                "total_quantity": 1.75,
                "avg_quantity": 0.2916666666666667
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 1,
                        "carbs": 26,
                        "fat": 1,
                        "calories": 73
                },
                "labels": [
                        "protein",
                        "fiber",
                        "convenient"
                ],
                "recipe_count": 4,
                "total_quantity": 1,
                "avg_quantity": 0.25
        },
        {
                "id": 49,
                "name": "Canned Tomatoes",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 10,
                        "fat": 9,
                        "calories": 145
                },
                "labels": [
                        "vegetable",
                        "sauce-base",
                        "versatile"
                ],
                "recipe_count": 2,
                "total_quantity": 1,
                "avg_quantity": 0.5
        },
        {
                "id": 50,
                "name": "Chicken Broth",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 31,
                        "fat": 11,
                        "calories": 63
                },
                "labels": [
                        "liquid",
                        "flavor-base",
                        "cooking"
                ],
                "recipe_count": 7,
                "total_quantity": 3.25,
                "avg_quantity": 0.4642857142857143
        }
];

        // Comprehensive recipe list (26 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T17:15:00.000Z",
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
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-04T16:30:00.000Z",
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
                        "quick",
                        "spicy",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 3,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-09T10:45:00.000Z",
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
                        "hearty",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 4,
                "title": "Garlic Bread",
                "description": "Toasted bread with garlic and herbs",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-13T00:00:00.000Z",
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
                        "sweet",
                        "hearty",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-17T04:00:00.000Z",
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
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ],
                "favorite": true
        },
        {
                "id": 6,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-20T10:30:00.000Z",
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
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1,
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-25T05:00:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-29T02:00:00.000Z",
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
                        "comfort",
                        "fresh",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 9,
                "title": "Mediterranean Pita",
                "description": "Fresh pita pocket stuffed with vegetables and cheese",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 8,
                "cook_time": 0,
                "created_at": "2025-07-02T12:15:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ],
                "favorite": true
        },
        {
                "id": 10,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-06T04:15:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.25,
                                "unit": "loaves"
                        }
                ],
                "favorite": false
        },
        {
                "id": 11,
                "title": "Chips and Salsa",
                "description": "Crispy tortilla chips with fresh salsa",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-10T18:45:00.000Z",
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
                        "savory",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
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
                "id": 12,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-07-14T12:15:00.000Z",
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
                        "savory",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "bunches"
                        }
                ],
                "favorite": true
        },
        {
                "id": 13,
                "title": "Quick Pizza Night",
                "description": "Easy frozen pizza enhanced with fresh toppings",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 12,
                "created_at": "2025-07-17T22:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "convenience",
                        "quick",
                        "comfort",
                        "Dinner",
                        "healthy",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-07-21T22:30:00.000Z",
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
                        "easy",
                        "healthy",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 15,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 45,
                "created_at": "2025-07-26T03:30:00.000Z",
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
                        "Dinner",
                        "hearty",
                        "easy",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 16,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 35,
                "created_at": "2025-07-29T18:45:00.000Z",
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
                        "Dinner",
                        "easy",
                        "comfort",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 17,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-02T05:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
                ],
                "labels": [
                        "roasted",
                        "savory",
                        "healthy",
                        "Snack",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 18,
                "title": "Classic Hamburger",
                "description": "Juicy hamburger with all the fixings",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-06T13:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "grilling",
                        "comfort",
                        "american",
                        "Dinner",
                        "spicy",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "packages"
                        }
                ],
                "favorite": false
        },
        {
                "id": 19,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-10T09:15:00.000Z",
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
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 0,
                "created_at": "2025-08-15T02:15:00.000Z",
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
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 22,
                "cook_time": 15,
                "created_at": "2025-08-18T19:15:00.000Z",
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
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 7,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 17,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 22,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-08-21T18:00:00.000Z",
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
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 18,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 2.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-26T06:45:00.000Z",
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
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 0,
                "created_at": "2025-08-30T11:45:00.000Z",
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
                                "recipe_id": 11,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-09-02T22:30:00.000Z",
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
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 3,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 10,
                "created_at": "2025-09-07T00:45:00.000Z",
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
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 50,
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
                "name": "Comfort Food Lunch Combo",
                "description": "Perfect comfort food lunch combination",
                "recipes": [
                        {
                                "recipeId": 5,
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
                        "comfort-food"
                ],
                "tags": [
                        "comfort",
                        "healthy"
                ],
                "estimatedTime": 10,
                "createdAt": "2025-08-14T13:10:13.582Z",
                "updatedAt": "2025-09-06T13:10:13.582Z"
        },
        {
                "id": 2,
                "name": "American Lunch Combo",
                "description": "Perfect american lunch combination",
                "recipes": [
                        {
                                "recipeId": 9,
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
                        "american"
                ],
                "tags": [
                        "crowd-pleaser"
                ],
                "estimatedTime": 8,
                "createdAt": "2025-09-09T13:10:13.582Z",
                "updatedAt": "2025-09-08T13:10:13.582Z"
        },
        {
                "id": 3,
                "name": "Mediterranean Family Dinner",
                "description": "A hearty family dinner with mediterranean favorites",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 13,
                                "servings": 4
                        },
                        {
                                "recipeId": 18,
                                "servings": 3
                        },
                        {
                                "recipeId": 3,
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
                        "comfort",
                        "date-night"
                ],
                "estimatedTime": 87,
                "createdAt": "2025-08-14T13:10:13.582Z",
                "updatedAt": "2025-09-09T13:10:13.582Z"
        },
        {
                "id": 4,
                "name": "American Night",
                "description": "Classic american meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 3,
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
                        "american"
                ],
                "tags": [
                        "date-night"
                ],
                "estimatedTime": 55,
                "createdAt": "2025-09-11T13:10:13.582Z",
                "updatedAt": "2025-09-08T13:10:13.582Z"
        },
        {
                "id": 5,
                "name": "Mexican Night",
                "description": "Classic mexican meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 2
                        },
                        {
                                "recipeId": 13,
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
                        "weeknight"
                ],
                "estimatedTime": 62,
                "createdAt": "2025-08-22T13:10:13.582Z",
                "updatedAt": "2025-09-08T13:10:13.582Z"
        },
        {
                "id": 6,
                "name": "Quick Asian Breakfast",
                "description": "Fast and delicious asian breakfast",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 3
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
                        "healthy",
                        "crowd-pleaser"
                ],
                "estimatedTime": 50,
                "createdAt": "2025-08-25T13:10:13.582Z",
                "updatedAt": "2025-09-06T13:10:13.582Z"
        },
        {
                "id": 7,
                "name": "Italian Family Dinner",
                "description": "A hearty family dinner with italian favorites",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 3
                        },
                        {
                                "recipeId": 18,
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
                        "comfort",
                        "weekend"
                ],
                "estimatedTime": 42,
                "createdAt": "2025-08-30T13:10:13.582Z",
                "updatedAt": "2025-09-11T13:10:13.582Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 5,
                "meal_id": 6,
                "date": "2025-09-16",
                "scheduled_date": "2025-09-16",
                "servings": 4,
                "notes": "Scheduled Quick Asian Breakfast",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 3
                        }
                ],
                "recipe_id": 8,
                "total_time": 50,
                "created_at": "2025-09-12T13:10:13.582Z"
        },
        {
                "id": 3,
                "meal_id": 4,
                "date": "2025-09-17",
                "scheduled_date": "2025-09-17",
                "servings": 3,
                "notes": "Scheduled American Night",
                "recipes": [
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 3,
                                "servings": 3
                        }
                ],
                "recipe_id": 2,
                "total_time": 55,
                "created_at": "2025-09-12T13:10:13.582Z"
        },
        {
                "id": 1,
                "meal_id": 6,
                "date": "2025-09-20",
                "scheduled_date": "2025-09-20",
                "servings": 4,
                "notes": "Scheduled Quick Asian Breakfast",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 3
                        }
                ],
                "recipe_id": 8,
                "total_time": 50,
                "created_at": "2025-09-12T13:10:13.582Z"
        },
        {
                "id": 4,
                "meal_id": 7,
                "date": "2025-09-22",
                "scheduled_date": "2025-09-22",
                "servings": 3,
                "notes": "Scheduled Italian Family Dinner",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 3
                        },
                        {
                                "recipeId": 18,
                                "servings": 3
                        }
                ],
                "recipe_id": 13,
                "total_time": 42,
                "created_at": "2025-09-12T13:10:13.582Z"
        },
        {
                "id": 7,
                "meal_id": 6,
                "date": "2025-09-26",
                "scheduled_date": "2025-09-26",
                "servings": 4,
                "notes": "Scheduled Quick Asian Breakfast",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 3
                        }
                ],
                "recipe_id": 8,
                "total_time": 50,
                "created_at": "2025-09-12T13:10:13.582Z"
        },
        {
                "id": 6,
                "meal_id": 6,
                "date": "2025-09-30",
                "scheduled_date": "2025-09-30",
                "servings": 4,
                "notes": "Scheduled Quick Asian Breakfast",
                "recipes": [
                        {
                                "recipeId": 8,
                                "servings": 4
                        },
                        {
                                "recipeId": 6,
                                "servings": 3
                        }
                ],
                "recipe_id": 8,
                "total_time": 50,
                "created_at": "2025-09-12T13:10:13.582Z"
        },
        {
                "id": 2,
                "meal_id": 1,
                "date": "2025-10-01",
                "scheduled_date": "2025-10-01",
                "servings": 4,
                "notes": "Scheduled Comfort Food Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 4
                        }
                ],
                "recipe_id": 5,
                "total_time": 10,
                "created_at": "2025-09-12T13:10:13.582Z"
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