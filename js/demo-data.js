// Demo Data for MealPlanner
// Generated on 2025-09-12T17:05:04.139Z
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
                        "protein": 3,
                        "carbs": 54,
                        "fat": 4,
                        "calories": 192
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 14,
                "total_quantity": 27.25,
                "avg_quantity": 1.9464285714285714
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 40,
                        "fat": 13,
                        "calories": 238
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ],
                "recipe_count": 1,
                "total_quantity": 1.25,
                "avg_quantity": 1.25
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 17,
                        "carbs": 15,
                        "fat": 4,
                        "calories": 150
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 7,
                "total_quantity": 11.25,
                "avg_quantity": 1.6071428571428572
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 18,
                        "carbs": 44,
                        "fat": 7,
                        "calories": 198
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 9,
                "total_quantity": 7.25,
                "avg_quantity": 0.8055555555555556
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 13,
                        "carbs": 14,
                        "fat": 11,
                        "calories": 145
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 8,
                "total_quantity": 5.5,
                "avg_quantity": 0.6875
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 15,
                        "carbs": 6,
                        "fat": 9,
                        "calories": 97
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 10,
                "total_quantity": 17,
                "avg_quantity": 1.7
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 49,
                        "fat": 9,
                        "calories": 156
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 47,
                        "fat": 11,
                        "calories": 181
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 6,
                "total_quantity": 11.5,
                "avg_quantity": 1.9166666666666667
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 41,
                        "fat": 3,
                        "calories": 79
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 2,
                "total_quantity": 3.5,
                "avg_quantity": 1.75
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 16,
                        "carbs": 15,
                        "fat": 12,
                        "calories": 61
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 3,
                "total_quantity": 6,
                "avg_quantity": 2
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 2,
                        "carbs": 51,
                        "fat": 10,
                        "calories": 137
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 7,
                "total_quantity": 9.5,
                "avg_quantity": 1.3571428571428572
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 9,
                        "carbs": 28,
                        "fat": 4,
                        "calories": 95
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 52,
                        "fat": 6,
                        "calories": 238
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 3,
                "total_quantity": 1.5,
                "avg_quantity": 0.5
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 5,
                        "carbs": 25,
                        "fat": 11,
                        "calories": 131
                },
                "labels": [
                        "grain",
                        "italian",
                        "comfort"
                ],
                "recipe_count": 4,
                "total_quantity": 3,
                "avg_quantity": 0.75
        },
        {
                "id": 15,
                "name": "Quinoa",
                "category": "grains",
                "default_unit": "lbs",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 17,
                        "carbs": 31,
                        "fat": 6,
                        "calories": 84
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
                        "protein": 6,
                        "carbs": 26,
                        "fat": 9,
                        "calories": 116
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 2,
                "total_quantity": 1,
                "avg_quantity": 0.5
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 12,
                        "carbs": 10,
                        "fat": 13,
                        "calories": 131
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 5,
                "total_quantity": 8.75,
                "avg_quantity": 1.75
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 53,
                        "fat": 8,
                        "calories": 63
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 12,
                "total_quantity": 4.75,
                "avg_quantity": 0.3958333333333333
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 32,
                        "fat": 15,
                        "calories": 102
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 19,
                "total_quantity": 8,
                "avg_quantity": 0.42105263157894735
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 14,
                        "fat": 7,
                        "calories": 94
                },
                "labels": [
                        "seasoning",
                        "spice",
                        "flavor"
                ],
                "recipe_count": 6,
                "total_quantity": 2.75,
                "avg_quantity": 0.4583333333333333
        },
        {
                "id": 21,
                "name": "Butter",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 13,
                        "carbs": 51,
                        "fat": 11,
                        "calories": 145
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 8,
                "total_quantity": 6.25,
                "avg_quantity": 0.78125
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 20,
                        "carbs": 19,
                        "fat": 11,
                        "calories": 243
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 7,
                "total_quantity": 6.5,
                "avg_quantity": 0.9285714285714286
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 31,
                        "fat": 7,
                        "calories": 94
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 8,
                "total_quantity": 11.5,
                "avg_quantity": 1.4375
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 4,
                        "carbs": 26,
                        "fat": 13,
                        "calories": 236
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 6,
                "total_quantity": 4.5,
                "avg_quantity": 0.75
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 47,
                        "fat": 13,
                        "calories": 77
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 3,
                "total_quantity": 4.5,
                "avg_quantity": 1.5
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 4,
                        "carbs": 20,
                        "fat": 12,
                        "calories": 84
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 9,
                "total_quantity": 12.5,
                "avg_quantity": 1.3888888888888888
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 40,
                        "fat": 9,
                        "calories": 81
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 2,
                "total_quantity": 4,
                "avg_quantity": 2
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 8,
                        "carbs": 39,
                        "fat": 12,
                        "calories": 230
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 7,
                "total_quantity": 2.5,
                "avg_quantity": 0.35714285714285715
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 10,
                        "carbs": 52,
                        "fat": 5,
                        "calories": 215
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 1,
                "total_quantity": 1.75,
                "avg_quantity": 1.75
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 18,
                        "carbs": 50,
                        "fat": 7,
                        "calories": 143
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
                        "protein": 10,
                        "carbs": 30,
                        "fat": 9,
                        "calories": 105
                },
                "labels": [
                        "wrap",
                        "mexican",
                        "versatile"
                ],
                "recipe_count": 2,
                "total_quantity": 3.5,
                "avg_quantity": 1.75
        },
        {
                "id": 32,
                "name": "Pita Bread",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 20,
                        "carbs": 28,
                        "fat": 6,
                        "calories": 91
                },
                "labels": [
                        "bread",
                        "mediterranean",
                        "pocket"
                ],
                "recipe_count": 11,
                "total_quantity": 16,
                "avg_quantity": 1.4545454545454546
        },
        {
                "id": 33,
                "name": "Potato Chips",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 40,
                        "fat": 5,
                        "calories": 152
                },
                "labels": [
                        "snack",
                        "crispy",
                        "salty"
                ],
                "recipe_count": 6,
                "total_quantity": 2,
                "avg_quantity": 0.3333333333333333
        },
        {
                "id": 34,
                "name": "Tortilla Chips",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 11,
                        "fat": 11,
                        "calories": 135
                },
                "labels": [
                        "snack",
                        "mexican",
                        "crunchy"
                ],
                "recipe_count": 5,
                "total_quantity": 1.25,
                "avg_quantity": 0.25
        },
        {
                "id": 35,
                "name": "Crackers",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 4,
                        "carbs": 35,
                        "fat": 12,
                        "calories": 165
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
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 4,
                        "carbs": 35,
                        "fat": 4,
                        "calories": 244
                },
                "labels": [
                        "snack",
                        "salty",
                        "crunchy"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 37,
                "name": "Ketchup",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 11,
                        "fat": 9,
                        "calories": 143
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 14,
                        "fat": 7,
                        "calories": 236
                },
                "labels": [
                        "condiment",
                        "tangy",
                        "spicy"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 39,
                "name": "Mayonnaise",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 52,
                        "fat": 2,
                        "calories": 224
                },
                "labels": [
                        "condiment",
                        "creamy",
                        "rich"
                ],
                "recipe_count": 3,
                "total_quantity": 1.5,
                "avg_quantity": 0.5
        },
        {
                "id": 40,
                "name": "Salsa",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 3,
                        "carbs": 52,
                        "fat": 3,
                        "calories": 54
                },
                "labels": [
                        "sauce",
                        "mexican",
                        "spicy"
                ],
                "recipe_count": 4,
                "total_quantity": 1,
                "avg_quantity": 0.25
        },
        {
                "id": 41,
                "name": "BBQ Sauce",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 34,
                        "fat": 13,
                        "calories": 219
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
                        "protein": 1,
                        "carbs": 27,
                        "fat": 12,
                        "calories": 118
                },
                "labels": [
                        "convenience",
                        "quick",
                        "comfort"
                ],
                "recipe_count": 2,
                "total_quantity": 1.5,
                "avg_quantity": 0.75
        },
        {
                "id": 43,
                "name": "Frozen Vegetables",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 2,
                        "carbs": 38,
                        "fat": 8,
                        "calories": 113
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
                        "carbs": 39,
                        "fat": 5,
                        "calories": 201
                },
                "labels": [
                        "dessert",
                        "sweet",
                        "cold"
                ],
                "recipe_count": 3,
                "total_quantity": 2,
                "avg_quantity": 0.6666666666666666
        },
        {
                "id": 45,
                "name": "Orange Juice",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 12,
                        "carbs": 32,
                        "fat": 12,
                        "calories": 81
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 13,
                        "carbs": 49,
                        "fat": 12,
                        "calories": 226
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
                        "protein": 9,
                        "carbs": 50,
                        "fat": 11,
                        "calories": 174
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 4,
                "total_quantity": 1.5,
                "avg_quantity": 0.375
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 50,
                        "fat": 6,
                        "calories": 79
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 6,
                        "fat": 8,
                        "calories": 193
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
                        "protein": 10,
                        "carbs": 28,
                        "fat": 13,
                        "calories": 178
                },
                "labels": [
                        "liquid",
                        "flavor-base",
                        "cooking"
                ],
                "recipe_count": 6,
                "total_quantity": 2.5,
                "avg_quantity": 0.4166666666666667
        }
];

        // Comprehensive recipe list (33 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T19:30:00.000Z",
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
                        "savory",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.75,
                                "unit": "loaves"
                        }
                ],
                "favorite": false
        },
        {
                "id": 2,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-05T13:45:00.000Z",
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
                        "savory",
                        "spicy",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-08T16:45:00.000Z",
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
                        "savory",
                        "quick",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 36,
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
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-13T03:45:00.000Z",
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
                        "fresh",
                        "savory",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 20,
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
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-16T12:15:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-20T23:45:00.000Z",
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
                        "comfort",
                        "hearty"
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 7,
                "title": "Bacon",
                "description": "Crispy breakfast bacon",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-24T05:00:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 27,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 8,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "recipe_type": "regular",
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
                        "quick",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "lbs"
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
                "created_at": "2025-07-02T17:15:00.000Z",
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
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 40,
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-05T22:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "snack",
                        "party",
                        "quick",
                        "Snack",
                        "spicy",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 11,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-07-10T09:00:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 12,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-07-14T05:00:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ],
                "favorite": true
        },
        {
                "id": 13,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-17T19:00:00.000Z",
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
                        "quick"
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
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.5,
                                "unit": "lbs"
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
                "id": 14,
                "title": "Chicken Breast Breakfast Bowl",
                "description": "Nutritious breakfast bowl with chicken breast and fresh ingredients",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-07-22T05:00:00.000Z",
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
                        "fresh",
                        "spicy",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 15,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 15,
                "created_at": "2025-07-25T12:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "roasted",
                        "savory",
                        "healthy",
                        "Snack",
                        "healthy",
                        "fresh",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 16,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-07-30T09:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "healthy",
                        "fresh",
                        "salad",
                        "Lunch",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "pieces"
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 17,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-02T12:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "healthy",
                        "fresh",
                        "salad",
                        "Lunch",
                        "quick",
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 18,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "recipe_type": "regular",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 45,
                "created_at": "2025-08-06T20:00:00.000Z",
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
                        "hearty",
                        "baked",
                        "Dinner",
                        "easy",
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 19,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 40,
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
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 14,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 3.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 2.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 33,
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 40,
                "cook_time": 10,
                "created_at": "2025-08-14T16:45:00.000Z",
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
                                "recipe_id": 14,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
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
                                "quantity": 3.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 2.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 27,
                "cook_time": 25,
                "created_at": "2025-08-18T01:30:00.000Z",
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
                                "recipe_id": 12,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 1.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.75,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 22,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 18,
                "cook_time": 15,
                "created_at": "2025-08-22T10:30:00.000Z",
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
                                "recipe_id": 9,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 13,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 2.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1.25,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
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
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 35,
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-08-26T00:00:00.000Z",
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
                        },
                        {
                                "recipe_id": 15,
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
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 45,
                "cook_time": 45,
                "created_at": "2025-08-30T16:30:00.000Z",
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
                                "recipe_id": 14,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 10,
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
                                "quantity": 3,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 3.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 3.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.75,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 45,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-09-03T12:15:00.000Z",
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
                                "recipe_id": 2,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-09-07T10:15:00.000Z",
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
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 27,
                "title": "American Night",
                "description": "Classic american meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1561968527?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 59,
                "created_at": "2025-08-28T17:05:04.138Z",
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
                                "recipe_id": 18,
                                "servings": 3
                        },
                        {
                                "recipe_id": 3,
                                "servings": 4
                        }
                ],
                "ingredients": [],
                "favorite": true
        },
        {
                "id": 28,
                "title": "Quick Mexican Breakfast",
                "description": "Fast and delicious mexican breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1520218260?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 24,
                "created_at": "2025-08-21T17:05:04.138Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "mexican",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 7,
                                "servings": 2
                        },
                        {
                                "recipe_id": 13,
                                "servings": 2
                        }
                ],
                "ingredients": [],
                "favorite": false
        },
        {
                "id": 29,
                "title": "Italian Family Dinner",
                "description": "A hearty family dinner with italian favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1580201822?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 70,
                "created_at": "2025-09-10T17:05:04.138Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "italian",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 18,
                                "servings": 3
                        },
                        {
                                "recipe_id": 1,
                                "servings": 4
                        }
                ],
                "ingredients": [],
                "favorite": true
        },
        {
                "id": 30,
                "title": "Asian Lunch Combo",
                "description": "Perfect asian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1536535865?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 7,
                "cook_time": 17,
                "created_at": "2025-08-24T17:05:04.138Z",
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
                                "recipe_id": 17,
                                "servings": 2
                        }
                ],
                "ingredients": [],
                "favorite": false
        },
        {
                "id": 31,
                "title": "Asian Family Dinner",
                "description": "A hearty family dinner with asian favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1584881138?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 30,
                "cook_time": 70,
                "created_at": "2025-08-27T17:05:04.138Z",
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
                                "recipe_id": 12,
                                "servings": 2
                        },
                        {
                                "recipe_id": 3,
                                "servings": 3
                        },
                        {
                                "recipe_id": 1,
                                "servings": 3
                        },
                        {
                                "recipe_id": 4,
                                "servings": 2
                        }
                ],
                "ingredients": [],
                "favorite": false
        },
        {
                "id": 32,
                "title": "Comfort Food Night",
                "description": "Classic comfort food meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1557736258?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 24,
                "cook_time": 56,
                "created_at": "2025-08-16T17:05:04.138Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "comfort-food",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 12,
                                "servings": 4
                        },
                        {
                                "recipe_id": 2,
                                "servings": 4
                        }
                ],
                "ingredients": [],
                "favorite": true
        },
        {
                "id": 33,
                "title": "Italian Night",
                "description": "Classic italian meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1529786480?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 21,
                "cook_time": 49,
                "created_at": "2025-08-18T17:05:04.138Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "italian",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 2,
                                "servings": 3
                        },
                        {
                                "recipe_id": 1,
                                "servings": 3
                        }
                ],
                "ingredients": [],
                "favorite": false
        }
];

        // Demo meals that combine multiple recipes (0 items)
        this.meals = [];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 1,
                "recipe_id": 13,
                "date": "2025-09-14",
                "scheduled_date": "2025-09-14",
                "servings": 4,
                "notes": "Scheduled Hash Browns",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "total_time": 25,
                "created_at": "2025-09-12T17:05:04.138Z"
        },
        {
                "id": 2,
                "recipe_id": 30,
                "date": "2025-09-19",
                "scheduled_date": "2025-09-19",
                "servings": 2,
                "notes": "Scheduled Asian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 30,
                                "servings": 2
                        }
                ],
                "total_time": 24,
                "created_at": "2025-09-12T17:05:04.138Z"
        },
        {
                "id": 3,
                "recipe_id": 4,
                "date": "2025-09-20",
                "scheduled_date": "2025-09-20",
                "servings": 4,
                "notes": "Scheduled Garlic Bread",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 4
                        }
                ],
                "total_time": 15,
                "created_at": "2025-09-12T17:05:04.138Z"
        },
        {
                "id": 7,
                "recipe_id": 3,
                "date": "2025-09-24",
                "scheduled_date": "2025-09-24",
                "servings": 4,
                "notes": "Scheduled Green Beans",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 4
                        }
                ],
                "total_time": 15,
                "created_at": "2025-09-12T17:05:04.138Z"
        },
        {
                "id": 4,
                "recipe_id": 11,
                "date": "2025-09-29",
                "scheduled_date": "2025-09-29",
                "servings": 4,
                "notes": "Scheduled Broccoli Chips",
                "recipes": [
                        {
                                "recipeId": 11,
                                "servings": 4
                        }
                ],
                "total_time": 30,
                "created_at": "2025-09-12T17:05:04.138Z"
        },
        {
                "id": 6,
                "recipe_id": 28,
                "date": "2025-09-30",
                "scheduled_date": "2025-09-30",
                "servings": 2,
                "notes": "Scheduled Quick Mexican Breakfast",
                "recipes": [
                        {
                                "recipeId": 28,
                                "servings": 2
                        }
                ],
                "total_time": 34,
                "created_at": "2025-09-12T17:05:04.138Z"
        },
        {
                "id": 5,
                "recipe_id": 3,
                "date": "2025-10-02",
                "scheduled_date": "2025-10-02",
                "servings": 4,
                "notes": "Scheduled Green Beans",
                "recipes": [
                        {
                                "recipeId": 3,
                                "servings": 4
                        }
                ],
                "total_time": 15,
                "created_at": "2025-09-12T17:05:04.138Z"
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