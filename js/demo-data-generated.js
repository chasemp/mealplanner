// Demo Data for MealPlanner
// Generated on 2025-09-10T23:04:27.496Z
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
                        "protein": 19,
                        "carbs": 7,
                        "fat": 9,
                        "calories": 103
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 14,
                "total_quantity": 21,
                "avg_quantity": 1.5
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 12,
                        "carbs": 46,
                        "fat": 9,
                        "calories": 162
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
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 45,
                        "fat": 10,
                        "calories": 173
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 4,
                "total_quantity": 6.25,
                "avg_quantity": 1.5625
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 35,
                        "fat": 11,
                        "calories": 175
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 9,
                "total_quantity": 5.5,
                "avg_quantity": 0.6111111111111112
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 13,
                        "carbs": 51,
                        "fat": 7,
                        "calories": 178
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 5,
                "total_quantity": 3,
                "avg_quantity": 0.6
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 12,
                        "fat": 6,
                        "calories": 52
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 13,
                "total_quantity": 14.75,
                "avg_quantity": 1.1346153846153846
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 17,
                        "carbs": 27,
                        "fat": 15,
                        "calories": 211
                },
                "labels": [
                        "vegetable",
                        "sweet",
                        "vitamin-a"
                ],
                "recipe_count": 2,
                "total_quantity": 1.5,
                "avg_quantity": 0.75
        },
        {
                "id": 8,
                "name": "Bell Peppers",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 1,
                        "carbs": 11,
                        "fat": 14,
                        "calories": 155
                },
                "labels": [
                        "vegetable",
                        "colorful",
                        "vitamin-c"
                ],
                "recipe_count": 6,
                "total_quantity": 9,
                "avg_quantity": 1.5
        },
        {
                "id": 9,
                "name": "Onions",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 14,
                        "carbs": 15,
                        "fat": 12,
                        "calories": 101
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 5,
                "total_quantity": 6.25,
                "avg_quantity": 1.25
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 4,
                        "carbs": 35,
                        "fat": 2,
                        "calories": 220
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 6,
                "total_quantity": 7.5,
                "avg_quantity": 1.25
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 4,
                        "carbs": 28,
                        "fat": 3,
                        "calories": 100
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 8,
                "total_quantity": 11,
                "avg_quantity": 1.375
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 18,
                        "carbs": 45,
                        "fat": 7,
                        "calories": 228
                },
                "labels": [
                        "leafy-green",
                        "iron",
                        "healthy"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 13,
                "name": "Rice",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 2,
                        "carbs": 28,
                        "fat": 6,
                        "calories": 99
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 4,
                "total_quantity": 2.75,
                "avg_quantity": 0.6875
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 16,
                        "carbs": 34,
                        "fat": 14,
                        "calories": 141
                },
                "labels": [
                        "grain",
                        "italian",
                        "comfort"
                ],
                "recipe_count": 3,
                "total_quantity": 1.5,
                "avg_quantity": 0.5
        },
        {
                "id": 15,
                "name": "Quinoa",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 18,
                        "carbs": 49,
                        "fat": 6,
                        "calories": 189
                },
                "labels": [
                        "grain",
                        "protein",
                        "healthy"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 16,
                "name": "Oats",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 38,
                        "fat": 9,
                        "calories": 213
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 1,
                "total_quantity": 0.75,
                "avg_quantity": 0.75
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 18,
                        "carbs": 34,
                        "fat": 7,
                        "calories": 182
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 9,
                "total_quantity": 13.25,
                "avg_quantity": 1.4722222222222223
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 49,
                        "fat": 15,
                        "calories": 159
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 9,
                "total_quantity": 3.75,
                "avg_quantity": 0.4166666666666667
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 1,
                        "carbs": 44,
                        "fat": 10,
                        "calories": 105
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 21,
                "total_quantity": 10.75,
                "avg_quantity": 0.5119047619047619
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 48,
                        "fat": 10,
                        "calories": 156
                },
                "labels": [
                        "seasoning",
                        "spice",
                        "flavor"
                ],
                "recipe_count": 3,
                "total_quantity": 2,
                "avg_quantity": 0.6666666666666666
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
                        "fat": 13,
                        "calories": 189
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 15,
                "total_quantity": 10.5,
                "avg_quantity": 0.7
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 18,
                        "carbs": 27,
                        "fat": 6,
                        "calories": 178
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 7,
                "total_quantity": 5.5,
                "avg_quantity": 0.7857142857142857
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 42,
                        "fat": 4,
                        "calories": 215
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 11,
                "total_quantity": 15,
                "avg_quantity": 1.3636363636363635
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 20,
                        "carbs": 47,
                        "fat": 13,
                        "calories": 115
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 11,
                "total_quantity": 9.25,
                "avg_quantity": 0.8409090909090909
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "pieces",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 23,
                        "fat": 12,
                        "calories": 233
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 2,
                "total_quantity": 2,
                "avg_quantity": 1
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 30,
                        "fat": 15,
                        "calories": 171
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 6,
                "total_quantity": 6.5,
                "avg_quantity": 1.0833333333333333
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 9,
                        "carbs": 49,
                        "fat": 3,
                        "calories": 183
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 14,
                        "fat": 4,
                        "calories": 178
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 4,
                "total_quantity": 1,
                "avg_quantity": 0.25
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 8,
                        "carbs": 8,
                        "fat": 2,
                        "calories": 90
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 4,
                "total_quantity": 5.75,
                "avg_quantity": 1.4375
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 12,
                        "carbs": 11,
                        "fat": 1,
                        "calories": 225
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
                "id": 31,
                "name": "Tortillas",
                "category": "bakery",
                "default_unit": "pieces",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 18,
                        "carbs": 23,
                        "fat": 4,
                        "calories": 94
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
                        "protein": 10,
                        "carbs": 22,
                        "fat": 3,
                        "calories": 73
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 7,
                        "carbs": 41,
                        "fat": 2,
                        "calories": 195
                },
                "labels": [
                        "snack",
                        "crispy",
                        "salty"
                ],
                "recipe_count": 4,
                "total_quantity": 2,
                "avg_quantity": 0.5
        },
        {
                "id": 34,
                "name": "Tortilla Chips",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 12,
                        "carbs": 14,
                        "fat": 9,
                        "calories": 60
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
                        "protein": 4,
                        "carbs": 47,
                        "fat": 8,
                        "calories": 55
                },
                "labels": [
                        "snack",
                        "crispy",
                        "versatile"
                ],
                "recipe_count": 5,
                "total_quantity": 1.5,
                "avg_quantity": 0.3
        },
        {
                "id": 36,
                "name": "Pretzels",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 6,
                        "carbs": 11,
                        "fat": 8,
                        "calories": 245
                },
                "labels": [
                        "snack",
                        "salty",
                        "crunchy"
                ],
                "recipe_count": 3,
                "total_quantity": 0.75,
                "avg_quantity": 0.25
        },
        {
                "id": 37,
                "name": "Ketchup",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 17,
                        "carbs": 29,
                        "fat": 9,
                        "calories": 83
                },
                "labels": [
                        "condiment",
                        "tomato",
                        "sweet"
                ],
                "recipe_count": 2,
                "total_quantity": 1,
                "avg_quantity": 0.5
        },
        {
                "id": 38,
                "name": "Mustard",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 12,
                        "carbs": 53,
                        "fat": 15,
                        "calories": 202
                },
                "labels": [
                        "condiment",
                        "tangy",
                        "spicy"
                ],
                "recipe_count": 11,
                "total_quantity": 3.75,
                "avg_quantity": 0.3409090909090909
        },
        {
                "id": 39,
                "name": "Mayonnaise",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 47,
                        "fat": 15,
                        "calories": 138
                },
                "labels": [
                        "condiment",
                        "creamy",
                        "rich"
                ],
                "recipe_count": 6,
                "total_quantity": 2.5,
                "avg_quantity": 0.4166666666666667
        },
        {
                "id": 40,
                "name": "Salsa",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 8,
                        "fat": 15,
                        "calories": 125
                },
                "labels": [
                        "sauce",
                        "mexican",
                        "spicy"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 41,
                "name": "BBQ Sauce",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 3,
                        "carbs": 10,
                        "fat": 9,
                        "calories": 195
                },
                "labels": [
                        "sauce",
                        "smoky",
                        "sweet"
                ],
                "recipe_count": 3,
                "total_quantity": 1.5,
                "avg_quantity": 0.5
        },
        {
                "id": 42,
                "name": "Frozen Pizza",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 18,
                        "carbs": 32,
                        "fat": 4,
                        "calories": 243
                },
                "labels": [
                        "convenience",
                        "quick",
                        "comfort"
                ],
                "recipe_count": 5,
                "total_quantity": 5.75,
                "avg_quantity": 1.15
        },
        {
                "id": 43,
                "name": "Frozen Vegetables",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 17,
                        "carbs": 54,
                        "fat": 12,
                        "calories": 78
                },
                "labels": [
                        "vegetable",
                        "convenient",
                        "healthy"
                ],
                "recipe_count": 2,
                "total_quantity": 1.5,
                "avg_quantity": 0.75
        },
        {
                "id": 44,
                "name": "Ice Cream",
                "category": "frozen",
                "default_unit": "packages",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 4,
                        "carbs": 26,
                        "fat": 13,
                        "calories": 145
                },
                "labels": [
                        "dessert",
                        "sweet",
                        "cold"
                ],
                "recipe_count": 9,
                "total_quantity": 6.25,
                "avg_quantity": 0.6944444444444444
        },
        {
                "id": 45,
                "name": "Orange Juice",
                "category": "dairy",
                "default_unit": "gallons",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 5,
                        "carbs": 12,
                        "fat": 1,
                        "calories": 188
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
                        "carbs": 10,
                        "fat": 14,
                        "calories": 74
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
                        "protein": 5,
                        "carbs": 46,
                        "fat": 9,
                        "calories": 139
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 11,
                        "fat": 6,
                        "calories": 180
                },
                "labels": [
                        "protein",
                        "fiber",
                        "convenient"
                ],
                "recipe_count": 3,
                "total_quantity": 0.75,
                "avg_quantity": 0.25
        },
        {
                "id": 49,
                "name": "Canned Tomatoes",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 20,
                        "carbs": 54,
                        "fat": 8,
                        "calories": 98
                },
                "labels": [
                        "vegetable",
                        "sauce-base",
                        "versatile"
                ],
                "recipe_count": 5,
                "total_quantity": 1.5,
                "avg_quantity": 0.3
        },
        {
                "id": 50,
                "name": "Chicken Broth",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 7,
                        "carbs": 51,
                        "fat": 11,
                        "calories": 183
                },
                "labels": [
                        "liquid",
                        "flavor-base",
                        "cooking"
                ],
                "recipe_count": 1,
                "total_quantity": 0.25,
                "avg_quantity": 0.25
        }
];

        // Comprehensive recipe list (30 items)
        this.recipes = [
        {
                "id": 1,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T18:30:00.000Z",
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
                        "sweet",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        }
                ]
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
                "created_at": "2025-06-04T23:30:00.000Z",
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
                        "hearty"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 3,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-07T23:30:00.000Z",
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
                        "healthy",
                        "comfort",
                        "hearty"
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
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 50,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.5,
                                "unit": "cups"
                        }
                ]
        },
        {
                "id": 4,
                "title": "Garlic Bread",
                "description": "Toasted bread with garlic and herbs",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-11T13:15:00.000Z",
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
                        "sweet",
                        "easy",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "bags"
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
                "created_at": "2025-06-14T21:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "salad",
                        "fresh",
                        "classic",
                        "Lunch",
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 35,
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
                "id": 6,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-18T00:15:00.000Z",
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
                        "healthy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
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
                "created_at": "2025-06-21T13:00:00.000Z",
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
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "packages"
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
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-25T01:30:00.000Z",
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
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "cups"
                        }
                ]
        },
        {
                "id": 9,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-28T14:30:00.000Z",
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
                        "hearty",
                        "healthy",
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "packages"
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
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-01T13:30:00.000Z",
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
                        "comfort"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 11,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 25,
                "created_at": "2025-07-05T06:00:00.000Z",
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
                        "comfort",
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
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 12,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-08T12:00:00.000Z",
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
                        "fresh",
                        "healthy",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 13,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-07-11T21:15:00.000Z",
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
                        "savory",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 14,
                "title": "Fried Chicken",
                "description": "Crispy golden fried chicken",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-07-15T08:00:00.000Z",
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
                        "fresh"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 15,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-07-18T18:00:00.000Z",
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
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 16,
                "title": "Green Beans",
                "description": "Fresh steamed green beans with butter",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-22T13:15:00.000Z",
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
                        "savory"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 17,
                "title": "Chicken Breast Stir Fry",
                "description": "Quick and healthy stir-fried chicken breast with mixed vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 15,
                "created_at": "2025-07-25T09:30:00.000Z",
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
                        "healthy",
                        "asian",
                        "Dinner",
                        "comfort",
                        "easy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 18,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-07-28T19:30:00.000Z",
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
                        "healthy",
                        "quick"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "cups"
                        }
                ]
        },
        {
                "id": 19,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-08-01T06:15:00.000Z",
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
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 20,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 30,
                "created_at": "2025-08-04T09:15:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "healthy",
                        "crispy",
                        "baked",
                        "Snack",
                        "sweet"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 40,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-08T09:15:00.000Z",
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
                "ingredients": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.5,
                                "unit": "bottles"
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
                "title": "Chicken Wrap",
                "description": "Grilled chicken wrapped in a soft tortilla",
                "type": "basic",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-08-11T11:15:00.000Z",
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
                        "spicy"
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 23,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-14T11:30:00.000Z",
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
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 42,
                                "quantity": 2,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Italian Night Combo",
                "description": "Perfect Italian dinner with pasta and salad",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 15,
                "created_at": "2025-08-17T19:15:00.000Z",
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
                                "recipe_id": 18,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 22,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 1,
                                "quantity": 3,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 2.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 7,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 12,
                "cook_time": 15,
                "created_at": "2025-08-21T05:00:00.000Z",
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
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 20,
                "cook_time": 25,
                "created_at": "2025-08-24T16:15:00.000Z",
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
                                "recipe_id": 10,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 11,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 6,
                                "quantity": 2.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 1,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 20,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 8,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Greek Feast Combo",
                "description": "Mediterranean feast with multiple dishes",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-27T22:15:00.000Z",
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
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "bags"
                        }
                ]
        },
        {
                "id": 28,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 32,
                "cook_time": 25,
                "created_at": "2025-09-01T02:45:00.000Z",
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
                                "recipe_id": 7,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 13,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 14,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.75,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 29,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 35,
                "cook_time": 25,
                "created_at": "2025-09-04T02:30:00.000Z",
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
                                "recipe_id": 6,
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
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 1.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1.25,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 41,
                                "quantity": 0.5,
                                "unit": "bottles"
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
                                "ingredient_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.25,
                                "unit": "pieces"
                        }
                ]
        },
        {
                "id": 30,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "type": "combo",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-09-07T03:45:00.000Z",
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
                                "recipe_id": 8,
                                "servings_multiplier": 1
                        }
                ],
                "ingredients": [
                        {
                                "ingredient_id": 26,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.25,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 2.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 49,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "cups"
                        }
                ]
        }
];

        // Demo meals that combine multiple recipes (7 items)
        this.meals = [
        {
                "id": 1,
                "name": "Comfort Food Family Dinner",
                "description": "A hearty family dinner with comfort food favorites",
                "recipes": [
                        {
                                "recipeId": 16,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
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
                        "comfort-food"
                ],
                "tags": [
                        "date-night"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-18T23:04:27.494Z",
                "updatedAt": "2025-09-04T23:04:27.494Z"
        },
        {
                "id": 2,
                "name": "American Family Dinner",
                "description": "A hearty family dinner with american favorites",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 1,
                                "servings": 4
                        },
                        {
                                "recipeId": 2,
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
                        "american"
                ],
                "tags": [
                        "weekend",
                        "family-friendly"
                ],
                "estimatedTime": 125,
                "createdAt": "2025-08-23T23:04:27.495Z",
                "updatedAt": "2025-09-08T23:04:27.495Z"
        },
        {
                "id": 3,
                "name": "Asian Night",
                "description": "Classic asian meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 1,
                                "servings": 2
                        },
                        {
                                "recipeId": 2,
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
                        "asian"
                ],
                "tags": [
                        "weekend",
                        "crowd-pleaser"
                ],
                "estimatedTime": 85,
                "createdAt": "2025-08-16T23:04:27.495Z",
                "updatedAt": "2025-09-10T23:04:27.495Z"
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
                "createdAt": "2025-09-08T23:04:27.495Z",
                "updatedAt": "2025-09-08T23:04:27.495Z"
        },
        {
                "id": 5,
                "name": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
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
                        "mediterranean"
                ],
                "tags": [
                        "crowd-pleaser"
                ],
                "estimatedTime": 15,
                "createdAt": "2025-08-27T23:04:27.495Z",
                "updatedAt": "2025-09-09T23:04:27.495Z"
        },
        {
                "id": 6,
                "name": "Comfort Food Night",
                "description": "Classic comfort food meal with all the fixings",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 2
                        },
                        {
                                "recipeId": 3,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
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
                        "comfort-food"
                ],
                "tags": [
                        "crowd-pleaser",
                        "special-occasion"
                ],
                "estimatedTime": 70,
                "createdAt": "2025-09-10T23:04:27.495Z",
                "updatedAt": "2025-09-07T23:04:27.495Z"
        },
        {
                "id": 7,
                "name": "Mexican Family Dinner",
                "description": "A hearty family dinner with mexican favorites",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 2
                        }
                ],
                "totalServings": 3,
                "mealTypes": [
                        "dinner"
                ],
                "labels": [
                        "family",
                        "hearty",
                        "mexican"
                ],
                "tags": [
                        "healthy"
                ],
                "estimatedTime": 70,
                "createdAt": "2025-09-10T23:04:27.495Z",
                "updatedAt": "2025-09-07T23:04:27.495Z"
        }
];

        // Scheduled meals for planning (7 items)
        this.scheduledMeals = [
        {
                "id": 3,
                "recipe_id": 4,
                "date": "2025-09-14",
                "scheduled_date": "2025-09-14",
                "servings": 4,
                "notes": "Scheduled Garlic Bread",
                "recipes": [
                        {
                                "recipeId": 4,
                                "servings": 4
                        }
                ],
                "total_time": 15,
                "created_at": "2025-09-10T23:04:27.495Z"
        },
        {
                "id": 6,
                "recipe_id": 6,
                "date": "2025-09-21",
                "scheduled_date": "2025-09-21",
                "servings": 4,
                "notes": "Scheduled Pancakes",
                "recipes": [
                        {
                                "recipeId": 6,
                                "servings": 4
                        }
                ],
                "total_time": 25,
                "created_at": "2025-09-10T23:04:27.495Z"
        },
        {
                "id": 1,
                "meal_id": 1,
                "date": "2025-09-22",
                "scheduled_date": "2025-09-22",
                "servings": 4,
                "notes": "Scheduled Comfort Food Family Dinner",
                "recipes": [
                        {
                                "recipeId": 16,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 2
                        }
                ],
                "recipe_id": 16,
                "total_time": 85,
                "created_at": "2025-09-10T23:04:27.495Z"
        },
        {
                "id": 5,
                "meal_id": 7,
                "date": "2025-09-23",
                "scheduled_date": "2025-09-23",
                "servings": 3,
                "notes": "Scheduled Mexican Family Dinner",
                "recipes": [
                        {
                                "recipeId": 17,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 2
                        }
                ],
                "recipe_id": 17,
                "total_time": 70,
                "created_at": "2025-09-10T23:04:27.495Z"
        },
        {
                "id": 4,
                "meal_id": 2,
                "date": "2025-09-24",
                "scheduled_date": "2025-09-24",
                "servings": 4,
                "notes": "Scheduled American Family Dinner",
                "recipes": [
                        {
                                "recipeId": 14,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 1,
                                "servings": 4
                        },
                        {
                                "recipeId": 2,
                                "servings": 2
                        }
                ],
                "recipe_id": 14,
                "total_time": 125,
                "created_at": "2025-09-10T23:04:27.495Z"
        },
        {
                "id": 7,
                "meal_id": 1,
                "date": "2025-09-26",
                "scheduled_date": "2025-09-26",
                "servings": 4,
                "notes": "Scheduled Comfort Food Family Dinner",
                "recipes": [
                        {
                                "recipeId": 16,
                                "servings": 2
                        },
                        {
                                "recipeId": 4,
                                "servings": 3
                        },
                        {
                                "recipeId": 2,
                                "servings": 4
                        },
                        {
                                "recipeId": 3,
                                "servings": 2
                        }
                ],
                "recipe_id": 16,
                "total_time": 85,
                "created_at": "2025-09-10T23:04:27.495Z"
        },
        {
                "id": 2,
                "meal_id": 5,
                "date": "2025-09-27",
                "scheduled_date": "2025-09-27",
                "servings": 3,
                "notes": "Scheduled Mediterranean Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 9,
                                "servings": 3
                        }
                ],
                "recipe_id": 9,
                "total_time": 15,
                "created_at": "2025-09-10T23:04:27.495Z"
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