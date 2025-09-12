// Demo Data for MealPlanner
// Generated on 2025-09-12T22:29:24.708Z
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
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 10,
                        "carbs": 13,
                        "fat": 7,
                        "calories": 124
                },
                "labels": [
                        "protein",
                        "lean",
                        "versatile"
                ],
                "recipe_count": 11,
                "total_quantity": 16.416666666666668,
                "avg_quantity": 1.4924242424242424
        },
        {
                "id": 2,
                "name": "Ground Beef",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 23,
                        "fat": 6,
                        "calories": 212
                },
                "labels": [
                        "protein",
                        "hearty",
                        "versatile"
                ],
                "recipe_count": 7,
                "total_quantity": 8.1875,
                "avg_quantity": 1.1696428571428572
        },
        {
                "id": 3,
                "name": "Salmon Fillet",
                "category": "meat",
                "default_unit": "pieces",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 17,
                        "carbs": 32,
                        "fat": 9,
                        "calories": 230
                },
                "labels": [
                        "protein",
                        "omega-3",
                        "healthy"
                ],
                "recipe_count": 3,
                "total_quantity": 3.875,
                "avg_quantity": 1.2916666666666667
        },
        {
                "id": 4,
                "name": "Eggs",
                "category": "dairy",
                "default_unit": "packages",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 38,
                        "fat": 14,
                        "calories": 243
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "versatile"
                ],
                "recipe_count": 8,
                "total_quantity": 4.708333333333333,
                "avg_quantity": 0.5885416666666666
        },
        {
                "id": 5,
                "name": "Milk",
                "category": "dairy",
                "default_unit": "blocks",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 3,
                        "carbs": 45,
                        "fat": 4,
                        "calories": 110
                },
                "labels": [
                        "calcium",
                        "breakfast",
                        "baking"
                ],
                "recipe_count": 12,
                "total_quantity": 5.624999999999999,
                "avg_quantity": 0.46874999999999994
        },
        {
                "id": 6,
                "name": "Broccoli",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 7,
                        "carbs": 41,
                        "fat": 14,
                        "calories": 166
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 8,
                "total_quantity": 7.625,
                "avg_quantity": 0.953125
        },
        {
                "id": 7,
                "name": "Carrots",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 18,
                        "carbs": 7,
                        "fat": 1,
                        "calories": 224
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
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 9,
                        "carbs": 20,
                        "fat": 15,
                        "calories": 235
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 12,
                        "fat": 10,
                        "calories": 72
                },
                "labels": [
                        "vegetable",
                        "aromatic",
                        "base"
                ],
                "recipe_count": 2,
                "total_quantity": 2.625,
                "avg_quantity": 1.3125
        },
        {
                "id": 10,
                "name": "Garlic",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 5,
                        "carbs": 53,
                        "fat": 12,
                        "calories": 245
                },
                "labels": [
                        "aromatic",
                        "flavor",
                        "healthy"
                ],
                "recipe_count": 13,
                "total_quantity": 21.229166666666668,
                "avg_quantity": 1.6330128205128207
        },
        {
                "id": 11,
                "name": "Tomatoes",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 6,
                        "carbs": 48,
                        "fat": 5,
                        "calories": 196
                },
                "labels": [
                        "vegetable",
                        "fresh",
                        "versatile"
                ],
                "recipe_count": 11,
                "total_quantity": 15.25,
                "avg_quantity": 1.3863636363636365
        },
        {
                "id": 12,
                "name": "Spinach",
                "category": "produce",
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 2,
                        "carbs": 52,
                        "fat": 1,
                        "calories": 118
                },
                "labels": [
                        "leafy-green",
                        "iron",
                        "healthy"
                ],
                "recipe_count": 8,
                "total_quantity": 5.75,
                "avg_quantity": 0.71875
        },
        {
                "id": 13,
                "name": "Rice",
                "category": "grains",
                "default_unit": "cups",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 28,
                        "fat": 5,
                        "calories": 78
                },
                "labels": [
                        "grain",
                        "staple",
                        "filling"
                ],
                "recipe_count": 6,
                "total_quantity": 5.75,
                "avg_quantity": 0.9583333333333334
        },
        {
                "id": 14,
                "name": "Pasta",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 8,
                        "carbs": 26,
                        "fat": 2,
                        "calories": 180
                },
                "labels": [
                        "grain",
                        "italian",
                        "comfort"
                ],
                "recipe_count": 8,
                "total_quantity": 5.625,
                "avg_quantity": 0.703125
        },
        {
                "id": 15,
                "name": "Quinoa",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 4,
                        "carbs": 9,
                        "fat": 8,
                        "calories": 124
                },
                "labels": [
                        "grain",
                        "protein",
                        "healthy"
                ],
                "recipe_count": 6,
                "total_quantity": 4.5,
                "avg_quantity": 0.75
        },
        {
                "id": 16,
                "name": "Oats",
                "category": "grains",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 30,
                        "fat": 3,
                        "calories": 78
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "fiber"
                ],
                "recipe_count": 6,
                "total_quantity": 4.3125,
                "avg_quantity": 0.71875
        },
        {
                "id": 17,
                "name": "Bread",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 1,
                        "carbs": 34,
                        "fat": 13,
                        "calories": 215
                },
                "labels": [
                        "grain",
                        "breakfast",
                        "sandwich"
                ],
                "recipe_count": 16,
                "total_quantity": 28.25,
                "avg_quantity": 1.765625
        },
        {
                "id": 18,
                "name": "Olive Oil",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 16,
                        "carbs": 28,
                        "fat": 15,
                        "calories": 189
                },
                "labels": [
                        "fat",
                        "healthy",
                        "cooking"
                ],
                "recipe_count": 10,
                "total_quantity": 4,
                "avg_quantity": 0.4
        },
        {
                "id": 19,
                "name": "Salt",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 8,
                        "carbs": 39,
                        "fat": 4,
                        "calories": 56
                },
                "labels": [
                        "seasoning",
                        "essential",
                        "flavor"
                ],
                "recipe_count": 17,
                "total_quantity": 6.416666666666667,
                "avg_quantity": 0.37745098039215685
        },
        {
                "id": 20,
                "name": "Black Pepper",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 14,
                        "carbs": 33,
                        "fat": 8,
                        "calories": 88
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
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 3,
                        "carbs": 20,
                        "fat": 11,
                        "calories": 202
                },
                "labels": [
                        "fat",
                        "flavor",
                        "baking"
                ],
                "recipe_count": 21,
                "total_quantity": 16.125,
                "avg_quantity": 0.7678571428571429
        },
        {
                "id": 22,
                "name": "Cheese",
                "category": "dairy",
                "default_unit": "containers",
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 4,
                        "carbs": 54,
                        "fat": 1,
                        "calories": 216
                },
                "labels": [
                        "protein",
                        "calcium",
                        "flavor"
                ],
                "recipe_count": 15,
                "total_quantity": 8.874999999999998,
                "avg_quantity": 0.5916666666666666
        },
        {
                "id": 23,
                "name": "Potatoes",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 20,
                        "carbs": 18,
                        "fat": 9,
                        "calories": 103
                },
                "labels": [
                        "vegetable",
                        "starchy",
                        "versatile"
                ],
                "recipe_count": 12,
                "total_quantity": 9.999999999999998,
                "avg_quantity": 0.8333333333333331
        },
        {
                "id": 24,
                "name": "Flour",
                "category": "grains",
                "default_unit": "bags",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 39,
                        "fat": 15,
                        "calories": 109
                },
                "labels": [
                        "baking",
                        "staple",
                        "wheat"
                ],
                "recipe_count": 8,
                "total_quantity": 6.395833333333333,
                "avg_quantity": 0.7994791666666666
        },
        {
                "id": 25,
                "name": "Green Beans",
                "category": "produce",
                "default_unit": "bunches",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 1,
                        "carbs": 36,
                        "fat": 4,
                        "calories": 53
                },
                "labels": [
                        "vegetable",
                        "healthy",
                        "fiber"
                ],
                "recipe_count": 5,
                "total_quantity": 5.75,
                "avg_quantity": 1.15
        },
        {
                "id": 26,
                "name": "Lettuce",
                "category": "produce",
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 3,
                        "carbs": 22,
                        "fat": 11,
                        "calories": 231
                },
                "labels": [
                        "leafy-green",
                        "fresh",
                        "salad"
                ],
                "recipe_count": 10,
                "total_quantity": 13.5,
                "avg_quantity": 1.35
        },
        {
                "id": 27,
                "name": "Bacon",
                "category": "meat",
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 13,
                        "carbs": 24,
                        "fat": 5,
                        "calories": 197
                },
                "labels": [
                        "protein",
                        "breakfast",
                        "smoky"
                ],
                "recipe_count": 8,
                "total_quantity": 14.0625,
                "avg_quantity": 1.7578125
        },
        {
                "id": 28,
                "name": "Oil",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 27,
                        "fat": 12,
                        "calories": 114
                },
                "labels": [
                        "fat",
                        "cooking",
                        "neutral"
                ],
                "recipe_count": 3,
                "total_quantity": 2,
                "avg_quantity": 0.6666666666666666
        },
        {
                "id": 29,
                "name": "Hamburger Buns",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 3,
                        "carbs": 15,
                        "fat": 15,
                        "calories": 60
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 14,
                "total_quantity": 23.499999999999996,
                "avg_quantity": 1.6785714285714284
        },
        {
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 10,
                        "carbs": 48,
                        "fat": 4,
                        "calories": 60
                },
                "labels": [
                        "bread",
                        "sandwich",
                        "grilling"
                ],
                "recipe_count": 2,
                "total_quantity": 2.25,
                "avg_quantity": 1.125
        },
        {
                "id": 31,
                "name": "Tortillas",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 20,
                        "carbs": 23,
                        "fat": 15,
                        "calories": 159
                },
                "labels": [
                        "wrap",
                        "mexican",
                        "versatile"
                ],
                "recipe_count": 1,
                "total_quantity": 1.75,
                "avg_quantity": 1.75
        },
        {
                "id": 32,
                "name": "Pita Bread",
                "category": "bakery",
                "default_unit": "loaves",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 15,
                        "carbs": 51,
                        "fat": 2,
                        "calories": 152
                },
                "labels": [
                        "bread",
                        "mediterranean",
                        "pocket"
                ],
                "recipe_count": 7,
                "total_quantity": 9.5,
                "avg_quantity": 1.3571428571428572
        },
        {
                "id": 33,
                "name": "Potato Chips",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 5,
                        "fat": 11,
                        "calories": 165
                },
                "labels": [
                        "snack",
                        "crispy",
                        "salty"
                ],
                "recipe_count": 4,
                "total_quantity": 1.375,
                "avg_quantity": 0.34375
        },
        {
                "id": 34,
                "name": "Tortilla Chips",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 18,
                        "carbs": 37,
                        "fat": 14,
                        "calories": 169
                },
                "labels": [
                        "snack",
                        "mexican",
                        "crunchy"
                ],
                "recipe_count": 6,
                "total_quantity": 2.3125,
                "avg_quantity": 0.3854166666666667
        },
        {
                "id": 35,
                "name": "Crackers",
                "category": "pantry",
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 47,
                        "fat": 1,
                        "calories": 103
                },
                "labels": [
                        "snack",
                        "crispy",
                        "versatile"
                ],
                "recipe_count": 3,
                "total_quantity": 1.5,
                "avg_quantity": 0.5
        },
        {
                "id": 36,
                "name": "Pretzels",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 41,
                        "fat": 11,
                        "calories": 90
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 18,
                        "carbs": 21,
                        "fat": 9,
                        "calories": 146
                },
                "labels": [
                        "condiment",
                        "tomato",
                        "sweet"
                ],
                "recipe_count": 8,
                "total_quantity": 4.625,
                "avg_quantity": 0.578125
        },
        {
                "id": 38,
                "name": "Mustard",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 15,
                        "carbs": 26,
                        "fat": 7,
                        "calories": 144
                },
                "labels": [
                        "condiment",
                        "tangy",
                        "spicy"
                ],
                "recipe_count": 6,
                "total_quantity": 1.6875,
                "avg_quantity": 0.28125
        },
        {
                "id": 39,
                "name": "Mayonnaise",
                "category": "pantry",
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 16,
                        "carbs": 41,
                        "fat": 4,
                        "calories": 193
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 37,
                        "fat": 4,
                        "calories": 236
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
                        "protein": 7,
                        "carbs": 46,
                        "fat": 11,
                        "calories": 137
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
                        "protein": 7,
                        "carbs": 43,
                        "fat": 2,
                        "calories": 94
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
                        "protein": 13,
                        "carbs": 34,
                        "fat": 1,
                        "calories": 65
                },
                "labels": [
                        "vegetable",
                        "convenient",
                        "healthy"
                ],
                "recipe_count": 4,
                "total_quantity": 4,
                "avg_quantity": 1
        },
        {
                "id": 44,
                "name": "Ice Cream",
                "category": "frozen",
                "default_unit": "bags",
                "storage_notes": "Keep frozen",
                "nutrition": {
                        "protein": 4,
                        "carbs": 12,
                        "fat": 11,
                        "calories": 200
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
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 3,
                        "carbs": 50,
                        "fat": 5,
                        "calories": 134
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 15,
                        "carbs": 14,
                        "fat": 7,
                        "calories": 89
                },
                "labels": [
                        "beverage",
                        "caffeine",
                        "morning"
                ],
                "recipe_count": 1,
                "total_quantity": 0.5,
                "avg_quantity": 0.5
        },
        {
                "id": 47,
                "name": "Soda",
                "category": "pantry",
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 54,
                        "fat": 6,
                        "calories": 129
                },
                "labels": [
                        "beverage",
                        "sweet",
                        "carbonated"
                ],
                "recipe_count": 5,
                "total_quantity": 1.875,
                "avg_quantity": 0.375
        },
        {
                "id": 48,
                "name": "Canned Beans",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 17,
                        "fat": 5,
                        "calories": 64
                },
                "labels": [
                        "protein",
                        "fiber",
                        "convenient"
                ],
                "recipe_count": 8,
                "total_quantity": 4,
                "avg_quantity": 0.5
        },
        {
                "id": 49,
                "name": "Canned Tomatoes",
                "category": "pantry",
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 45,
                        "fat": 1,
                        "calories": 166
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
                        "protein": 17,
                        "carbs": 30,
                        "fat": 6,
                        "calories": 206
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
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
                        "savory"
                ],
                "items": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-05T05:30:00.000Z",
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
                        "sweet",
                        "fresh"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
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
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "healthy",
                        "vegetable",
                        "side-dish",
                        "Dinner",
                        "easy",
                        "spicy"
                ],
                "items": [
                        {
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "bunches"
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
                                "ingredient_id": 12,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 34,
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
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-12T23:45:00.000Z",
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
                        "hearty"
                ],
                "items": [
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
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
                "id": 5,
                "title": "Caesar Salad",
                "description": "Classic Caesar salad with croutons",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-16T16:00:00.000Z",
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
                        "hearty",
                        "quick"
                ],
                "items": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
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
                "created_at": "2025-06-21T06:45:00.000Z",
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
                        "sweet",
                        "fresh"
                ],
                "items": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-24T09:30:00.000Z",
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
                        "fresh",
                        "comfort"
                ],
                "items": [
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-28T04:00:00.000Z",
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
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 9,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 35,
                "created_at": "2025-07-02T22:15:00.000Z",
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
                        "sweet",
                        "quick"
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 1.25,
                                "unit": "pieces"
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 8,
                "prep_time": 20,
                "cook_time": 0,
                "created_at": "2025-07-06T20:45:00.000Z",
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
                        "sweet"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 11,
                "title": "Broccoli Chips",
                "description": "Crispy baked broccoli chips seasoned to perfection",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 20,
                "created_at": "2025-07-10T00:30:00.000Z",
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
                        "healthy"
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ],
                "favorite": true
        },
        {
                "id": 12,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 0,
                "created_at": "2025-07-14T00:15:00.000Z",
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
                        "quick"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 13,
                "title": "Chicken Wrap",
                "description": "Grilled chicken wrapped in a soft tortilla",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-17T21:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "wrap",
                        "protein",
                        "portable",
                        "Lunch",
                        "quick",
                        "spicy"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 31,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 39,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 25,
                                "quantity": 1.25,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-21T21:45:00.000Z",
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
                        "sweet"
                ],
                "items": [
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 15,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 5,
                "created_at": "2025-07-26T02:45:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "energy",
                        "healthy",
                        "no-bake",
                        "Snack",
                        "spicy",
                        "quick"
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 16,
                "title": "Classic Hamburger",
                "description": "Juicy hamburger with all the fixings",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-29T10:15:00.000Z",
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
                        "comfort"
                ],
                "items": [
                        {
                                "ingredient_id": 2,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 17,
                "title": "Mashed Potatoes",
                "description": "Creamy and buttery mashed potatoes",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-08-02T14:30:00.000Z",
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
                        "healthy",
                        "hearty"
                ],
                "items": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 18,
                "title": "Coffee and Toast",
                "description": "Simple breakfast with fresh coffee and buttered toast",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 1,
                "prep_time": 5,
                "cook_time": 5,
                "created_at": "2025-08-06T07:30:00.000Z",
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
                        "comfort",
                        "sweet",
                        "savory"
                ],
                "items": [
                        {
                                "ingredient_id": 46,
                                "quantity": 0.5,
                                "unit": "boxes"
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
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 2,
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
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-10T19:00:00.000Z",
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
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 1,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.75,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
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
                "servings": 4,
                "prep_time": 25,
                "cook_time": 20,
                "created_at": "2025-08-14T23:30:00.000Z",
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
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 27,
                "cook_time": 20,
                "created_at": "2025-08-18T03:15:00.000Z",
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
                                "recipe_id": 11,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 35,
                                "quantity": 0.5,
                                "unit": "bottles"
                        }
                ]
        },
        {
                "id": 22,
                "title": "Grilled Salmon Dinner Combo",
                "description": "Healthy grilled salmon with vegetables",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 22,
                "cook_time": 10,
                "created_at": "2025-08-22T09:45:00.000Z",
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
                                "recipe_id": 4,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 15,
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
                                "ingredient_id": 17,
                                "quantity": 2.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-26T04:45:00.000Z",
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
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 17,
                "cook_time": 15,
                "created_at": "2025-08-30T16:00:00.000Z",
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
                                "recipe_id": 3,
                                "servings": 6,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
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
                                "ingredient_id": 25,
                                "quantity": 1.5,
                                "unit": "bunches"
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
                                "ingredient_id": 12,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 2,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 16,
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 8,
                "prep_time": 30,
                "cook_time": 15,
                "created_at": "2025-09-03T11:15:00.000Z",
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
                                "recipe_id": 10,
                                "servings": 8,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 23,
                                "quantity": 1,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 28,
                                "quantity": 1,
                                "unit": "bottles"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 43,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 2.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 2,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 1.25,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 26,
                "title": "Light Lunch Combo",
                "description": "Light and fresh lunch combination",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 17,
                "cook_time": 10,
                "created_at": "2025-09-07T00:00:00.000Z",
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
                                "ingredient_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 27,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Quick Comfort Food Breakfast",
                "description": "Fast and delicious comfort food breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1536392412?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 7,
                "cook_time": 17,
                "created_at": "2025-08-24T22:29:24.707Z",
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
                                "recipe_id": 6,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 24,
                                "quantity": 0.5625,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.375,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.375,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.375,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 1.125,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 28,
                "title": "Comfort Food Family Dinner",
                "description": "A hearty family dinner with comfort food favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1525022190?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 59,
                "created_at": "2025-08-18T22:29:24.707Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "comfort-food",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 3,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 25,
                                "quantity": 0.5,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 1.4166666666666665,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.29166666666666663,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.25,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.35416666666666663,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.25,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.125,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.375,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.3125,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2.8125,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 3.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.875,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 0.9375,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.375,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1.5,
                                "unit": "loaves"
                        }
                ],
                "favorite": false
        },
        {
                "id": 29,
                "title": "American Night",
                "description": "Classic american meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1545316462?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 13,
                "cook_time": 31,
                "created_at": "2025-09-01T22:29:24.707Z",
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
                                "recipe_id": 3,
                                "servings": 4,
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
                                "ingredient_id": 25,
                                "quantity": 1,
                                "unit": "bunches"
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
                                "ingredient_id": 12,
                                "quantity": 0.5,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.3333333333333333,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 23,
                                "quantity": 0.6666666666666666,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.3333333333333333,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.16666666666666666,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 0.8333333333333333,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.3333333333333333,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 30,
                "title": "Mediterranean Lunch Combo",
                "description": "Perfect mediterranean lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1551118993?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 15,
                "cook_time": 35,
                "created_at": "2025-08-28T22:29:24.707Z",
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
                                "recipe_id": 9,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 6,
                                "quantity": 0.375,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 9,
                                "quantity": 0.875,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.625,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.125,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 33,
                                "quantity": 0.125,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 30,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 3,
                                "quantity": 0.625,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 31,
                "title": "Mediterranean Family Dinner",
                "description": "A hearty family dinner with mediterranean favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1532531834?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 21,
                "cook_time": 49,
                "created_at": "2025-09-08T22:29:24.707Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "mediterranean",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 17,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "ingredient_id": 23,
                                "quantity": 0.6666666666666666,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.6666666666666666,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.3333333333333333,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.3333333333333333,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.16666666666666666,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 0.8333333333333333,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.3333333333333333,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 1,
                                "quantity": 0.6666666666666666,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 0.3333333333333333,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.3333333333333333,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 0.6666666666666666,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 6,
                                "quantity": 0.5,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 32,
                "title": "Mediterranean Family Dinner",
                "description": "A hearty family dinner with mediterranean favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1507878349?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 70,
                "created_at": "2025-08-25T22:29:24.707Z",
                "instructions": [],
                "labels": [
                        "family",
                        "hearty",
                        "mediterranean",
                        "Recipe Combo",
                        "Dinner"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 1,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 17,
                                "servings": 4,
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
                                "ingredient_id": 23,
                                "quantity": 1.1666666666666665,
                                "unit": "bunches"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 2.1666666666666665,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.5833333333333333,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 19,
                                "quantity": 0.41666666666666663,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 11,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 14,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 38,
                                "quantity": 0.375,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 10,
                                "quantity": 2.375,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 29,
                                "quantity": 3.583333333333333,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 15,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 37,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 22,
                                "quantity": 0.6666666666666666,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 18,
                                "quantity": 0.3333333333333333,
                                "unit": "containers"
                        },
                        {
                                "ingredient_id": 2,
                                "quantity": 0.625,
                                "unit": "pieces"
                        },
                        {
                                "ingredient_id": 26,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "ingredient_id": 47,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 32,
                                "quantity": 1,
                                "unit": "loaves"
                        },
                        {
                                "ingredient_id": 34,
                                "quantity": 0.125,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 33,
                "title": "Quick Mediterranean Breakfast",
                "description": "Fast and delicious mediterranean breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1500931471?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 24,
                "created_at": "2025-09-07T22:29:24.707Z",
                "instructions": [],
                "labels": [
                        "quick",
                        "morning",
                        "mediterranean",
                        "Recipe Combo",
                        "Breakfast"
                ],
                "combo_recipes": [
                        {
                                "recipe_id": 7,
                                "servings": 3,
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
                                "ingredient_id": 27,
                                "quantity": 1.3125,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 13,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "ingredient_id": 16,
                                "quantity": 0.5625,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 24,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "ingredient_id": 4,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "ingredient_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "ingredient_id": 12,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "ingredient_id": 36,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "ingredient_id": 17,
                                "quantity": 1.75,
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
                "recipe_id": 7,
                "date": "2025-09-12",
                "scheduled_date": "2025-09-12",
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
                "created_at": "2025-09-12T22:29:24.707Z"
        },
        {
                "id": 4,
                "recipe_id": 10,
                "date": "2025-09-13",
                "scheduled_date": "2025-09-13",
                "servings": 8,
                "notes": "Scheduled Energy Chicken Breast Bites",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 8
                        }
                ],
                "recipe_name": "Energy Chicken Breast Bites",
                "meal_type": "snack",
                "total_time": 20,
                "created_at": "2025-09-12T22:29:24.707Z"
        },
        {
                "id": 2,
                "recipe_id": 5,
                "date": "2025-09-15",
                "scheduled_date": "2025-09-15",
                "servings": 4,
                "notes": "Scheduled Caesar Salad",
                "recipes": [
                        {
                                "recipeId": 5,
                                "servings": 4
                        }
                ],
                "recipe_name": "Caesar Salad",
                "meal_type": "lunch",
                "total_time": 10,
                "created_at": "2025-09-12T22:29:24.707Z"
        },
        {
                "id": 5,
                "recipe_id": 1,
                "date": "2025-09-16",
                "scheduled_date": "2025-09-16",
                "servings": 4,
                "notes": "Scheduled Mashed Potatoes",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 4
                        }
                ],
                "recipe_name": "Mashed Potatoes",
                "meal_type": "dinner",
                "total_time": 30,
                "created_at": "2025-09-12T22:29:24.707Z"
        },
        {
                "id": 1,
                "recipe_id": 8,
                "date": "2025-09-19",
                "scheduled_date": "2025-09-19",
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
                "created_at": "2025-09-12T22:29:24.707Z"
        },
        {
                "id": 3,
                "recipe_id": 1,
                "date": "2025-09-20",
                "scheduled_date": "2025-09-20",
                "servings": 4,
                "notes": "Scheduled Mashed Potatoes",
                "recipes": [
                        {
                                "recipeId": 1,
                                "servings": 4
                        }
                ],
                "recipe_name": "Mashed Potatoes",
                "meal_type": "dinner",
                "total_time": 30,
                "created_at": "2025-09-12T22:29:24.707Z"
        },
        {
                "id": 7,
                "recipe_id": 26,
                "date": "2025-09-29",
                "scheduled_date": "2025-09-29",
                "servings": 4,
                "notes": "Scheduled Light Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 26,
                                "servings": 4
                        }
                ],
                "recipe_name": "Light Lunch Combo",
                "meal_type": "dinner",
                "total_time": 27,
                "created_at": "2025-09-12T22:29:24.707Z"
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