// Demo Data for MealPlanner
// Generated on 2025-09-10T23:08:53.147Z
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - 50 ingredients across 7 categories
// - 30 recipes (22 basic, 8 combo)
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
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 41,
                        "fat": 6,
                        "calories": 170
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 16,
                "total_quantity": 27.25,
                "avg_quantity": 1.703125
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 8,
                        "carbs": 15,
                        "fat": 2,
                        "calories": 78
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ],
                "recipe_count": 5,
                "total_quantity": 10.25,
                "avg_quantity": 2.05
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 5,
                        "carbs": 16,
                        "fat": 12,
                        "calories": 83
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 5,
                "total_quantity": 8.75,
                "avg_quantity": 1.75
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 13,
                        "carbs": 13,
                        "fat": 7,
                        "calories": 221
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 11,
                "total_quantity": 7.5,
                "avg_quantity": 0.6818181818181818
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 12,
                        "carbs": 9,
                        "fat": 10,
                        "calories": 198
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 6,
                "total_quantity": 3.5,
                "avg_quantity": 0.5833333333333334
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 5,
                        "carbs": 42,
                        "fat": 12,
                        "calories": 133
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 4,
                "total_quantity": 6.5,
                "avg_quantity": 1.625
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 12,
                        "carbs": 22,
                        "fat": 9,
                        "calories": 177
                },
                "labels": [
                        "vegetable",
                        "sweet",
                        "vitamin-a"
                ],
                "recipe_count": 3,
                "total_quantity": 3.75,
                "avg_quantity": 1.25
        },
        {
                "id": 8,
                "name": "Bell Peppers",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 25,
                        "fat": 2,
                        "calories": 176
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 4,
                "total_quantity": 6,
                "avg_quantity": 1.5
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 50,
                        "fat": 9,
                        "calories": 160
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 12,
                "total_quantity": 13.25,
                "avg_quantity": 1.1041666666666667
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 12,
                        "fat": 2,
                        "calories": 149
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 9,
                "total_quantity": 8.75,
                "avg_quantity": 0.9722222222222222
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 14,
                        "carbs": 51,
                        "fat": 15,
                        "calories": 236
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 5,
                "total_quantity": 4,
                "avg_quantity": 0.8
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 23,
                        "fat": 14,
                        "calories": 101
                },
                "labels": [
                        "leafy-green",
                        "iron",
                        "healthy"
                ],
                "recipe_count": 4,
                "total_quantity": 5.75,
                "avg_quantity": 1.4375
        },
        {
                "id": 13,
                "name": "Rice",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 3,
                        "carbs": 51,
                        "fat": 4,
                        "calories": 129
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 2,
                "total_quantity": 1.5,
                "avg_quantity": 0.75
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 8,
                        "fat": 11,
                        "calories": 147
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
                        "protein": 7,
                        "carbs": 30,
                        "fat": 4,
                        "calories": 94
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 53,
                        "fat": 12,
                        "calories": 244
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
                        "protein": 12,
                        "carbs": 39,
                        "fat": 1,
                        "calories": 126
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 13,
                "total_quantity": 24,
                "avg_quantity": 1.8461538461538463
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 21,
                        "fat": 13,
                        "calories": 89
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 7,
                "total_quantity": 2.25,
                "avg_quantity": 0.32142857142857145
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 20,
                        "carbs": 49,
                        "fat": 13,
                        "calories": 130
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 15,
                "total_quantity": 6.75,
                "avg_quantity": 0.45
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 6,
                        "carbs": 31,
                        "fat": 4,
                        "calories": 87
                },
                "labels": [
                        "seasoning",
                        "spice",
                        "flavor"
                ],
                "recipe_count": 4,
                "total_quantity": 2,
                "avg_quantity": 0.5
        },
        {
                "id": 21,
                "name": "Butter",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 7,
                        "fat": 4,
                        "calories": 224
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 15,
                "total_quantity": 12.75,
                "avg_quantity": 0.85
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 11,
                        "carbs": 30,
                        "fat": 5,
                        "calories": 79
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 9,
                "total_quantity": 4.25,
                "avg_quantity": 0.4722222222222222
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 18,
                        "fat": 5,
                        "calories": 157
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 7,
                "total_quantity": 7.25,
                "avg_quantity": 1.0357142857142858
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 12,
                        "carbs": 47,
                        "fat": 2,
                        "calories": 143
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 12,
                "total_quantity": 10,
                "avg_quantity": 0.8333333333333334
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 8,
                        "carbs": 16,
                        "fat": 10,
                        "calories": 163
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 4,
                "total_quantity": 3.25,
                "avg_quantity": 0.8125
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 13,
                        "carbs": 30,
                        "fat": 11,
                        "calories": 154
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 10,
                "total_quantity": 8.25,
                "avg_quantity": 0.825
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 12,
                        "carbs": 32,
                        "fat": 4,
                        "calories": 201
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 6,
                "total_quantity": 10,
                "avg_quantity": 1.6666666666666667
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 1,
                        "carbs": 5,
                        "fat": 14,
                        "calories": 100
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 4,
                "total_quantity": 2,
                "avg_quantity": 0.5
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 12,
                        "carbs": 52,
                        "fat": 13,
                        "calories": 243
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 4,
                "total_quantity": 7.25,
                "avg_quantity": 1.8125
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 3,
                        "carbs": 23,
                        "fat": 2,
                        "calories": 55
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 2,
                "total_quantity": 3.25,
                "avg_quantity": 1.625
        },
        {
                "id": 31,
                "name": "Tortillas",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 5,
                        "carbs": 35,
                        "fat": 10,
                        "calories": 100
                },
                "labels": [
                        "wrap",
                        "mexican",
                        "versatile"
                ],
                "recipe_count": 2,
                "total_quantity": 2.75,
                "avg_quantity": 1.375
        },
        {
                "id": 32,
                "name": "Pita Bread",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 4,
                        "carbs": 42,
                        "fat": 7,
                        "calories": 211
                },
                "labels": [
                        "bread",
                        "mediterranean",
                        "pocket"
                ],
                "recipe_count": 7,
                "total_quantity": 11,
                "avg_quantity": 1.5714285714285714
        },
        {
                "id": 33,
                "name": "Potato Chips",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 48,
                        "fat": 4,
                        "calories": 182
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
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 26,
                        "fat": 2,
                        "calories": 241
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 17,
                        "carbs": 47,
                        "fat": 7,
                        "calories": 129
                },
                "labels": [
                        "snack",
                        "crispy",
                        "versatile"
                ],
                "recipe_count": 3,
                "total_quantity": 0.75,
                "avg_quantity": 0.25
        },
        {
                "id": 36,
                "name": "Pretzels",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 31,
                        "fat": 13,
                        "calories": 176
                },
                "labels": [
                        "snack",
                        "salty",
                        "crunchy"
                ],
                "recipe_count": 3,
                "total_quantity": 1.5,
                "avg_quantity": 0.5
        },
        {
                "id": 37,
                "name": "Ketchup",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 15,
                        "carbs": 33,
                        "fat": 2,
                        "calories": 192
                },
                "labels": [
                        "condiment",
                        "tomato",
                        "sweet"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 38,
                "name": "Mustard",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 1,
                        "carbs": 44,
                        "fat": 13,
                        "calories": 66
                },
                "labels": [
                        "condiment",
                        "tangy",
                        "spicy"
                ],
                "recipe_count": 5,
                "total_quantity": 1.25,
                "avg_quantity": 0.25
        },
        {
                "id": 39,
                "name": "Mayonnaise",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 52,
                        "fat": 3,
                        "calories": 176
                },
                "labels": [
                        "condiment",
                        "creamy",
                        "rich"
                ],
                "recipe_count": 4,
                "total_quantity": 1.25,
                "avg_quantity": 0.3125
        },
        {
                "id": 40,
                "name": "Salsa",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 49,
                        "fat": 8,
                        "calories": 152
                },
                "labels": [
                        "sauce",
                        "mexican",
                        "spicy"
                ],
                "recipe_count": 3,
                "total_quantity": 1,
                "avg_quantity": 0.3333333333333333
        },
        {
                "id": 41,
                "name": "BBQ Sauce",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 14,
                        "fat": 5,
                        "calories": 123
                },
                "labels": [
                        "sauce",
                        "smoky",
                        "sweet"
                ],
                "recipe_count": 6,
                "total_quantity": 1.75,
                "avg_quantity": 0.2916666666666667
        },
        {
                "id": 42,
                "name": "Frozen Pizza",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 17,
                        "carbs": 21,
                        "fat": 15,
                        "calories": 123
                },
                "labels": [
                        "convenience",
                        "quick",
                        "comfort"
                ],
                "recipe_count": 5,
                "total_quantity": 4.25,
                "avg_quantity": 0.85
        },
        {
                "id": 43,
                "name": "Frozen Vegetables",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 16,
                        "carbs": 31,
                        "fat": 7,
                        "calories": 84
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
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 10,
                        "carbs": 28,
                        "fat": 7,
                        "calories": 63
                },
                "labels": [
                        "dessert",
                        "sweet",
                        "cold"
                ],
                "recipe_count": 2,
                "total_quantity": 1.5,
                "avg_quantity": 0.75
        },
        {
                "id": 45,
                "name": "Orange Juice",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 12,
                        "carbs": 31,
                        "fat": 14,
                        "calories": 204
                },
                "labels": [
                        "beverage",
                        "vitamin-c",
                        "breakfast"
                ],
                "recipe_count": 4,
                "total_quantity": 3,
                "avg_quantity": 0.75
        },
        {
                "id": 46,
                "name": "Coffee",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 3,
                        "carbs": 49,
                        "fat": 13,
                        "calories": 142
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
                        "protein": 12,
                        "carbs": 18,
                        "fat": 10,
                        "calories": 231
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 2,
                "total_quantity": 1,
                "avg_quantity": 0.5
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 27,
                        "fat": 6,
                        "calories": 246
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 6,
                        "carbs": 13,
                        "fat": 4,
                        "calories": 62
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 18,
                        "fat": 10,
                        "calories": 117
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

        // Comprehensive recipe list (30 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T07:45:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-04T19:45:00.000Z",
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
                        "sweet",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "bags"
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
                "created_at": "2025-06-07T16:30:00.000Z",
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
                        "comfort",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.5,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Garlic Bread",
                "description": "Toasted bread with garlic and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-11T09:30:00.000Z",
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
                        "savory",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-14T15:30:00.000Z",
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
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 6,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-18T05:30:00.000Z",
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
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
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
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-21T11:45:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.5,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 8,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-25T05:15:00.000Z",
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
                        "savory",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Chicken Wrap",
                "description": "Grilled chicken wrapped in a soft tortilla",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-28T07:45:00.000Z",
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
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 10,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 15,
                "created_at": "2025-07-02T04:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "roasted",
                        "savory",
                        "healthy",
                        "Snack",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 2,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 11,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 8,
                "prep_time": 20,
                "cook_time": 5,
                "created_at": "2025-07-04T16:00:00.000Z",
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
                        "easy",
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 12,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-07-08T22:15:00.000Z",
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
                        "healthy",
                        "easy",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "cups"
                        }
                ]
        },
        {
                "id": 13,
                "title": "Classic Hamburger",
                "description": "Juicy hamburger with all the fixings",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-12T10:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "grilling",
                        "comfort",
                        "american",
                        "Dinner",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 14,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-07-15T10:45:00.000Z",
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
                        "spicy",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 0.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 15,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-18T19:30:00.000Z",
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
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.25,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 16,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-07-22T03:15:00.000Z",
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
                        "healthy",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 17,
                "title": "Grilled Chicken Breast with Broccoli",
                "description": "Healthy grilled chicken breast served with roasted broccoli",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 20,
                "created_at": "2025-07-25T11:00:00.000Z",
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
                        "healthy",
                        "hearty",
                        "fresh"
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
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 18,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-07-29T05:30:00.000Z",
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
                        "fresh",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 19,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 5,
                "created_at": "2025-08-01T09:00:00.000Z",
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
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.5,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-04T03:15:00.000Z",
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
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Chicken Breast Stir Fry",
                "description": "Quick and healthy stir-fried chicken breast with mixed vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-08T08:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "quick",
                        "healthy",
                        "asian",
                        "Dinner",
                        "fresh",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 22,
                "title": "Chicken Wrap",
                "description": "Grilled chicken wrapped in a soft tortilla",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-11T17:00:00.000Z",
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
                        "spicy",
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 40,
                "cook_time": 25,
                "created_at": "2025-08-14T14:45:00.000Z",
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
                                "recipe_id": 17,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 3.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 8,
                "prep_time": 30,
                "cook_time": 5,
                "created_at": "2025-08-18T03:15:00.000Z",
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
                                "ingredient_id": 1,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 17,
                "cook_time": 15,
                "created_at": "2025-08-21T07:15:00.000Z",
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
                                "recipe_id": 15,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 2.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 2.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-25T06:15:00.000Z",
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
                                "recipe_id": 12,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 18,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 0.75,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-28T10:45:00.000Z",
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
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 28,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 8,
                "prep_time": 30,
                "cook_time": 20,
                "created_at": "2025-08-31T21:45:00.000Z",
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
                                "recipe_id": 1,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 11,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 29,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-09-04T12:45:00.000Z",
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
                                "recipe_id": 15,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1.25,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 30,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-09-07T19:45:00.000Z",
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
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "pieces"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Asian Lunch Combo",
                "description": "Perfect asian lunch combination",
                "recipes": [
                        {
                                "recipeId": 16,
                                "servings": 3
                        },
                        {
                                "recipeId": 14,
                                "servings": 4
                        },
                        {
                                "recipeId": 5,
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
                        "asian"
                ],
                "tags": [
                        "comfort",
                        "crowd-pleaser"
                ],
                "estimatedTime": 65,
                "createdAt": "2025-09-04T23:08:53.145Z",
                "updatedAt": "2025-09-07T23:08:53.145Z"
        },
        {
                "id": 2,
                "name": "Mexican Family Dinner",
                "description": "A hearty family dinner with mexican favorites",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 2
                        },
                        {
                                "recipeId": 17,
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
                        "mexican"
                ],
                "tags": [
                        "crowd-pleaser"
                ],
                "estimatedTime": 50,
                "createdAt": "2025-08-31T23:08:53.145Z",
                "updatedAt": "2025-09-10T23:08:53.145Z"
        },
        {
                "id": 3,
                "name": "Quick Healthy Breakfast",
                "description": "Fast and delicious healthy breakfast",
                "recipes": [
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
                        "healthy"
                ],
                "tags": [
                        "crowd-pleaser"
                ],
                "estimatedTime": 10,
                "createdAt": "2025-08-14T23:08:53.145Z",
                "updatedAt": "2025-09-09T23:08:53.145Z"
        },
        {
                "id": 4,
                "name": "Asian Night",
                "description": "Classic asian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
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
                        "asian"
                ],
                "tags": [
                        "weekend"
                ],
                "estimatedTime": 50,
                "createdAt": "2025-09-07T23:08:53.146Z",
                "updatedAt": "2025-09-05T23:08:53.146Z"
        },
        {
                "id": 5,
                "name": "Mexican Family Dinner",
                "description": "A hearty family dinner with mexican favorites",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 4
                        },
                        {
                                "recipeId": 12,
                                "servings": 2
                        }
                ],
                "totalServings": 4,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "mexican"
                ],
                "tags": [
                        "weeknight"
                ],
                "estimatedTime": 55,
                "createdAt": "2025-09-04T23:08:53.146Z",
                "updatedAt": "2025-09-05T23:08:53.146Z"
        },
        {
                "id": 6,
                "name": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipes": [
                        {
                                "recipeId": 22,
                                "servings": 4
                        },
                        {
                                "recipeId": 14,
                                "servings": 3
                        },
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
                        "italian"
                ],
                "tags": [
                        "family-friendly"
                ],
                "estimatedTime": 95,
                "createdAt": "2025-08-25T23:08:53.146Z",
                "updatedAt": "2025-09-07T23:08:53.146Z"
        },
        {
                "id": 7,
                "name": "American Family Dinner",
                "description": "A hearty family dinner with american favorites",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 12,
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
                        "american"
                ],
                "tags": [
                        "date-night"
                ],
                "estimatedTime": 125,
                "createdAt": "2025-08-25T23:08:53.146Z",
                "updatedAt": "2025-09-04T23:08:53.146Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 5,
                "recipe_id": 26,
                "date": "2025-09-10",
                "scheduled_date": "2025-09-10",
                "servings": 4,
                "notes": "Scheduled Grilled Salmon Dinner Combo",
                "recipes": [
                        {
                                "recipeId": 26,
                                "servings": 4
                        }
                ],
                "total_time": 50,
                "created_at": "2025-09-10T23:08:53.146Z"
        },
        {
                "id": 4,
                "meal_id": 7,
                "date": "2025-09-14",
                "scheduled_date": "2025-09-14",
                "servings": 4,
                "notes": "Scheduled American Family Dinner",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 12,
                                "servings": 4
                        }
                ],
                "recipe_id": 1,
                "total_time": 125,
                "created_at": "2025-09-10T23:08:53.146Z"
        },
        {
                "id": 1,
                "recipe_id": 6,
                "date": "2025-09-15",
                "scheduled_date": "2025-09-15",
                "servings": 4,
                "notes": "Scheduled Pancakes",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 4
                        }
                ],
                "total_time": 25,
                "created_at": "2025-09-10T23:08:53.146Z"
        },
        {
                "id": 7,
                "meal_id": 7,
                "date": "2025-09-17",
                "scheduled_date": "2025-09-17",
                "servings": 4,
                "notes": "Scheduled American Family Dinner",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 3
                        },
                        {
                                "recipeId": 12,
                                "servings": 4
                        }
                ],
                "recipe_id": 1,
                "total_time": 125,
                "created_at": "2025-09-10T23:08:53.146Z"
        },
        {
                "id": 6,
                "recipe_id": 10,
                "date": "2025-09-18",
                "scheduled_date": "2025-09-18",
                "servings": 2,
                "notes": "Scheduled Roasted Broccoli Mix",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 2
                        }
                ],
                "total_time": 20,
                "created_at": "2025-09-10T23:08:53.146Z"
        },
        {
                "id": 2,
                "recipe_id": 5,
                "date": "2025-09-24",
                "scheduled_date": "2025-09-24",
                "servings": 4,
                "notes": "Scheduled Caesar Salad",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 4
                        }
                ],
                "total_time": 10,
                "created_at": "2025-09-10T23:08:53.146Z"
        },
        {
                "id": 3,
                "meal_id": 5,
                "date": "2025-09-26",
                "scheduled_date": "2025-09-26",
                "servings": 4,
                "notes": "Scheduled Mexican Family Dinner",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 4
                        },
                        {
                                "recipeId": 12,
                                "servings": 2
                        }
                ],
                "recipe_id": 3,
                "total_time": 55,
                "created_at": "2025-09-10T23:08:53.146Z"
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