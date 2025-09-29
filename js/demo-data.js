// Demo Data for MealPlanner
// Generated on 2025-09-29T13:34:08.695Z
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
                        "protein": 13,
                        "carbs": 18,
                        "fat": 6,
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
                "default_unit": "packages",
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 1,
                        "carbs": 34,
                        "fat": 7,
                        "calories": 186
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
                "default_unit": "lbs",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 17,
                        "carbs": 39,
                        "fat": 6,
                        "calories": 141
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
                        "protein": 10,
                        "carbs": 19,
                        "fat": 12,
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
                "default_unit": "gallons",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 14,
                        "carbs": 17,
                        "fat": 15,
                        "calories": 187
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
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 15,
                        "carbs": 27,
                        "fat": 15,
                        "calories": 219
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
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 48,
                        "fat": 3,
                        "calories": 60
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 3,
                        "carbs": 19,
                        "fat": 4,
                        "calories": 93
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
                        "protein": 3,
                        "carbs": 5,
                        "fat": 9,
                        "calories": 242
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 28,
                        "fat": 13,
                        "calories": 173
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
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 19,
                        "carbs": 46,
                        "fat": 15,
                        "calories": 52
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
                        "protein": 7,
                        "carbs": 33,
                        "fat": 15,
                        "calories": 54
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
                "default_unit": "bags",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 50,
                        "fat": 5,
                        "calories": 176
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
                        "protein": 17,
                        "carbs": 12,
                        "fat": 11,
                        "calories": 215
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
                        "protein": 16,
                        "carbs": 39,
                        "fat": 6,
                        "calories": 168
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
                        "carbs": 11,
                        "fat": 12,
                        "calories": 155
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
                        "protein": 20,
                        "carbs": 31,
                        "fat": 1,
                        "calories": 193
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
                        "carbs": 33,
                        "fat": 6,
                        "calories": 182
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 13,
                        "carbs": 43,
                        "fat": 5,
                        "calories": 128
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 7,
                        "carbs": 35,
                        "fat": 14,
                        "calories": 207
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
                        "carbs": 10,
                        "fat": 3,
                        "calories": 207
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 10,
                        "carbs": 34,
                        "fat": 13,
                        "calories": 174
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
                        "protein": 13,
                        "carbs": 43,
                        "fat": 7,
                        "calories": 249
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
                "default_unit": "cups",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 12,
                        "carbs": 54,
                        "fat": 3,
                        "calories": 124
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
                "default_unit": "pieces",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 20,
                        "carbs": 6,
                        "fat": 8,
                        "calories": 222
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
                "default_unit": "lbs",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 13,
                        "carbs": 50,
                        "fat": 15,
                        "calories": 186
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
                        "protein": 11,
                        "carbs": 8,
                        "fat": 8,
                        "calories": 107
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 11,
                        "carbs": 12,
                        "fat": 10,
                        "calories": 185
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
                        "protein": 16,
                        "carbs": 26,
                        "fat": 5,
                        "calories": 94
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
                        "protein": 5,
                        "carbs": 28,
                        "fat": 11,
                        "calories": 191
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
                        "protein": 20,
                        "carbs": 23,
                        "fat": 7,
                        "calories": 215
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
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 6,
                        "carbs": 19,
                        "fat": 10,
                        "calories": 211
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
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 38,
                        "fat": 2,
                        "calories": 77
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 16,
                        "carbs": 34,
                        "fat": 8,
                        "calories": 140
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
                        "carbs": 41,
                        "fat": 9,
                        "calories": 56
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 22,
                        "fat": 11,
                        "calories": 190
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 9,
                        "fat": 10,
                        "calories": 164
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 8,
                        "carbs": 22,
                        "fat": 15,
                        "calories": 87
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 7,
                        "carbs": 11,
                        "fat": 2,
                        "calories": 127
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
                "default_unit": "bottles",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 15,
                        "carbs": 23,
                        "fat": 12,
                        "calories": 245
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 12,
                        "carbs": 27,
                        "fat": 10,
                        "calories": 171
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
                        "protein": 12,
                        "carbs": 15,
                        "fat": 6,
                        "calories": 171
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
                        "protein": 5,
                        "carbs": 29,
                        "fat": 7,
                        "calories": 95
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
                        "protein": 9,
                        "carbs": 27,
                        "fat": 10,
                        "calories": 224
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
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 16,
                        "carbs": 15,
                        "fat": 10,
                        "calories": 120
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
                        "protein": 6,
                        "carbs": 41,
                        "fat": 11,
                        "calories": 141
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
                "default_unit": "boxes",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 3,
                        "carbs": 38,
                        "fat": 14,
                        "calories": 174
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 51,
                        "fat": 8,
                        "calories": 197
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
                        "protein": 1,
                        "carbs": 43,
                        "fat": 7,
                        "calories": 66
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 46,
                        "fat": 5,
                        "calories": 166
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-05-31T23:30:00.000Z",
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
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-05T08:15:00.000Z",
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
                        "quick",
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "created_at": "2025-06-08T19:45:00.000Z",
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
                "items": [
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 30,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-12T22:30:00.000Z",
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
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.5,
                                "unit": "heads"
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-17T07:00:00.000Z",
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
                        "hearty",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 37,
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
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-20T19:00:00.000Z",
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
                        "fresh",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 42,
                                "quantity": 1,
                                "unit": "bags"
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-24T17:45:00.000Z",
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
                        "easy",
                        "spicy",
                        "comfort"
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-28T10:45:00.000Z",
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
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 27,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.25,
                                "unit": "gallons"
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
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-07-02T02:15:00.000Z",
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
                        "hearty",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 0,
                "created_at": "2025-07-06T22:00:00.000Z",
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
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 15,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ],
                "favorite": false
        },
        {
                "id": 11,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 5,
                "cook_time": 25,
                "created_at": "2025-07-10T00:00:00.000Z",
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
                        "comfort",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.5,
                                "unit": "boxes"
                        }
                ],
                "favorite": false
        },
        {
                "id": 12,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 5,
                "cook_time": 5,
                "created_at": "2025-07-14T13:30:00.000Z",
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
                        "quick",
                        "spicy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
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
                "id": 13,
                "title": "Pancakes",
                "description": "Fluffy breakfast pancakes",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-18T12:45:00.000Z",
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
                        "sweet",
                        "easy",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 7,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1,
                                "unit": "cups"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.75,
                                "unit": "packages"
                        }
                ],
                "favorite": true
        },
        {
                "id": 14,
                "title": "Loaded Nachos",
                "description": "Crispy tortilla chips loaded with cheese and toppings",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-07-22T09:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste"
                ],
                "labels": [
                        "snack",
                        "mexican",
                        "quick",
                        "Snack",
                        "sweet",
                        "easy",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.25,
                                "unit": "bunches"
                        }
                ],
                "favorite": false
        },
        {
                "id": 15,
                "title": "Energy Chicken Breast Bites",
                "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 0,
                "created_at": "2025-07-26T10:30:00.000Z",
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
                        "spicy",
                        "easy",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 16,
                "title": "Classic Hamburger",
                "description": "Juicy hamburger with all the fixings",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-30T07:00:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements",
                        "Season with salt and pepper to taste",
                        "Serve hot and enjoy"
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
                                "item_id": 2,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ],
                "favorite": true
        },
        {
                "id": 17,
                "title": "Bacon",
                "description": "Crispy breakfast bacon",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-08-02T10:15:00.000Z",
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
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.5,
                                "unit": "pieces"
                        }
                ],
                "favorite": true
        },
        {
                "id": 18,
                "title": "Scrambled Eggs with Bread",
                "description": "Simple breakfast with fluffy scrambled eggs and bread",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-08-06T17:45:00.000Z",
                "instructions": [
                        "Crack eggs into bowl and whisk",
                        "Heat butter in non-stick pan",
                        "Pour in eggs and gently scramble",
                        "Cook until just set",
                        "Serve immediately"
                ],
                "labels": [
                        "quick",
                        "protein",
                        "Breakfast",
                        "quick",
                        "healthy",
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 12,
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-10T18:30:00.000Z",
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
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 1,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 15,
                "created_at": "2025-08-15T01:15:00.000Z",
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
                                "recipe_id": 8,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings": 2,
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
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 27,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 26,
                                "quantity": 2.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 17,
                "cook_time": 15,
                "created_at": "2025-08-17T21:15:00.000Z",
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
                                "recipe_id": 10,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 1.25,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 11,
                                "quantity": 2.5,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 42,
                                "quantity": 1,
                                "unit": "bags"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 15,
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
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 15,
                "created_at": "2025-08-22T21:15:00.000Z",
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
                                "recipe_id": 5,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 8,
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
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 27,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 35,
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
                "prep_time": 20,
                "cook_time": 10,
                "created_at": "2025-08-26T18:45:00.000Z",
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
                        },
                        {
                                "recipe_id": 14,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.5,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 3.5,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 34,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.25,
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 35,
                "cook_time": 25,
                "created_at": "2025-08-30T11:15:00.000Z",
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
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 9,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 2,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 37,
                                "quantity": 1.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 1,
                                "quantity": 4,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 1,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "loaves"
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
                "servings": 6,
                "prep_time": 35,
                "cook_time": 25,
                "created_at": "2025-09-02T19:30:00.000Z",
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
                                "recipe_id": 18,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 6,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 1.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 27,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 1.5,
                                "unit": "cups"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 4,
                                "quantity": 1.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.5,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.75,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 12,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 37,
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 6,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-09-06T18:15:00.000Z",
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
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "lbs"
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
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.5,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Asian Lunch Combo",
                "description": "Perfect asian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1524656056?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-09-28T13:34:08.688Z",
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
                                "recipe_id": 12,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 0.67,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.17,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 8,
                                "quantity": 0.83,
                                "unit": "heads"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.33,
                                "unit": "gallons"
                        }
                ],
                "favorite": false
        },
        {
                "id": 28,
                "title": "Mexican Family Dinner",
                "description": "A hearty family dinner with mexican favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1502814069?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-09-24T13:34:08.688Z",
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
                                "recipe_id": 3,
                                "servings": 2,
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
                                "item_id": 25,
                                "quantity": 0.88,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.3,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 0.67,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.25,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.17,
                                "unit": "containers"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.08,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 0.42,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.17,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 29,
                "title": "Quick Mexican Breakfast",
                "description": "Fast and delicious mexican breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1512547149?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 7,
                "cook_time": 17,
                "created_at": "2025-09-02T13:34:08.688Z",
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
                                "recipe_id": 6,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.25,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.38,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.88,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.13,
                                "unit": "containers"
                        },
                        {
                                "item_id": 42,
                                "quantity": 0.5,
                                "unit": "bags"
                        }
                ],
                "favorite": false
        },
        {
                "id": 30,
                "title": "Quick Healthy Breakfast",
                "description": "Fast and delicious healthy breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1597990181?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-09-15T13:34:08.688Z",
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
                                "recipe_id": 17,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1.13,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.19,
                                "unit": "packages"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.38,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.13,
                                "unit": "pieces"
                        }
                ],
                "favorite": false
        },
        {
                "id": 31,
                "title": "Italian Family Dinner",
                "description": "A hearty family dinner with italian favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1551420590?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 33,
                "cook_time": 77,
                "created_at": "2025-09-16T13:34:08.688Z",
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
                                "recipe_id": 1,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 2,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
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
                                "item_id": 23,
                                "quantity": 0.58,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.17,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.67,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 43,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.71,
                                "unit": "cups"
                        },
                        {
                                "item_id": 13,
                                "quantity": 0.17,
                                "unit": "bags"
                        },
                        {
                                "item_id": 49,
                                "quantity": 0.17,
                                "unit": "packages"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.13,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 17,
                                "quantity": 0.63,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.63,
                                "unit": "containers"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 30,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 2,
                                "quantity": 1.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.31,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.56,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 26,
                                "quantity": 0.94,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 11,
                                "quantity": 0.56,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.19,
                                "unit": "packages"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.56,
                                "unit": "packages"
                        },
                        {
                                "item_id": 14,
                                "quantity": 0.56,
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
                "image_url": "https://images.unsplash.com/photo-1534084726?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 12,
                "cook_time": 28,
                "created_at": "2025-09-08T13:34:08.688Z",
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
                                "recipe_id": 12,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 9,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 4.33,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 3.13,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 4.08,
                                "unit": "loaves"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.67,
                                "unit": "heads"
                        },
                        {
                                "item_id": 44,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.42,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 18,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.75,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 37,
                                "quantity": 1,
                                "unit": "containers"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.5,
                                "unit": "lbs"
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
                "id": 33,
                "title": "Quick Comfort Food Breakfast",
                "description": "Fast and delicious comfort food breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1509471368?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-09-11T13:34:08.688Z",
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
                                "recipe_id": 7,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.19,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.56,
                                "unit": "cups"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.38,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.56,
                                "unit": "blocks"
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
                "recipe_id": 23,
                "recipe": {
                        "id": 23,
                        "title": "Greek Feast Combo",
                        "description": "Mediterranean feast with multiple dishes",
                        "recipe_type": "combo",
                        "meal_type": null,
                        "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                        "servings": 6,
                        "prep_time": 20,
                        "cook_time": 10,
                        "created_at": "2025-08-26T18:45:00.000Z",
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
                                },
                                {
                                        "recipe_id": 14,
                                        "servings": 4,
                                        "servings_multiplier": 1
                                }
                        ],
                        "items": [
                                {
                                        "item_id": 26,
                                        "quantity": 1.5,
                                        "unit": "lbs"
                                },
                                {
                                        "item_id": 22,
                                        "quantity": 1.5,
                                        "unit": "gallons"
                                },
                                {
                                        "item_id": 17,
                                        "quantity": 3.5,
                                        "unit": "loaves"
                                },
                                {
                                        "item_id": 18,
                                        "quantity": 0.25,
                                        "unit": "packages"
                                },
                                {
                                        "item_id": 10,
                                        "quantity": 2.75,
                                        "unit": "lbs"
                                },
                                {
                                        "item_id": 37,
                                        "quantity": 0.25,
                                        "unit": "containers"
                                },
                                {
                                        "item_id": 21,
                                        "quantity": 1,
                                        "unit": "blocks"
                                },
                                {
                                        "item_id": 19,
                                        "quantity": 0.5,
                                        "unit": "bottles"
                                },
                                {
                                        "item_id": 42,
                                        "quantity": 0.75,
                                        "unit": "bags"
                                },
                                {
                                        "item_id": 8,
                                        "quantity": 1.5,
                                        "unit": "heads"
                                },
                                {
                                        "item_id": 34,
                                        "quantity": 0.25,
                                        "unit": "boxes"
                                },
                                {
                                        "item_id": 40,
                                        "quantity": 0.25,
                                        "unit": "bottles"
                                },
                                {
                                        "item_id": 48,
                                        "quantity": 0.5,
                                        "unit": "packages"
                                },
                                {
                                        "item_id": 30,
                                        "quantity": 1.5,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 36,
                                        "quantity": 0.25,
                                        "unit": "packages"
                                },
                                {
                                        "item_id": 11,
                                        "quantity": 1.25,
                                        "unit": "bunches"
                                }
                        ]
                },
                "meal_name": "Greek Feast Combo",
                "date": "2025-09-29",
                "scheduled_date": "2025-09-29",
                "servings": 6,
                "notes": "Scheduled Greek Feast Combo",
                "meal_type": "dinner",
                "total_time": 30,
                "created_at": "2025-09-29T13:34:08.689Z"
        },
        {
                "id": 4,
                "recipe_id": 15,
                "recipe": {
                        "id": 15,
                        "title": "Energy Chicken Breast Bites",
                        "description": "Nutritious energy bites with chicken breast and natural sweeteners",
                        "recipe_type": "regular",
                        "meal_type": "snack",
                        "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                        "servings": 4,
                        "prep_time": 15,
                        "cook_time": 0,
                        "created_at": "2025-07-26T10:30:00.000Z",
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
                                "spicy",
                                "easy",
                                "quick"
                        ],
                        "items": [
                                {
                                        "item_id": 1,
                                        "quantity": 1.25,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 17,
                                        "quantity": 1.75,
                                        "unit": "loaves"
                                },
                                {
                                        "item_id": 36,
                                        "quantity": 0.25,
                                        "unit": "packages"
                                },
                                {
                                        "item_id": 26,
                                        "quantity": 1,
                                        "unit": "lbs"
                                }
                        ],
                        "favorite": false
                },
                "meal_name": "Energy Chicken Breast Bites",
                "date": "2025-10-03",
                "scheduled_date": "2025-10-03",
                "servings": 4,
                "notes": "Scheduled Energy Chicken Breast Bites",
                "meal_type": "snack",
                "total_time": 15,
                "created_at": "2025-09-29T13:34:08.689Z"
        },
        {
                "id": 3,
                "recipe_id": 3,
                "recipe": {
                        "id": 3,
                        "title": "Green Beans",
                        "description": "Fresh steamed green beans with butter",
                        "recipe_type": "regular",
                        "meal_type": "dinner",
                        "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                        "servings": 4,
                        "prep_time": 5,
                        "cook_time": 10,
                        "created_at": "2025-06-08T19:45:00.000Z",
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
                        "items": [
                                {
                                        "item_id": 25,
                                        "quantity": 1.75,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 21,
                                        "quantity": 0.5,
                                        "unit": "blocks"
                                },
                                {
                                        "item_id": 19,
                                        "quantity": 0.25,
                                        "unit": "bottles"
                                },
                                {
                                        "item_id": 30,
                                        "quantity": 2,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 45,
                                        "quantity": 0.5,
                                        "unit": "containers"
                                }
                        ],
                        "favorite": true
                },
                "meal_name": "Green Beans",
                "date": "2025-10-04",
                "scheduled_date": "2025-10-04",
                "servings": 4,
                "notes": "Scheduled Green Beans",
                "meal_type": "dinner",
                "total_time": 15,
                "created_at": "2025-09-29T13:34:08.689Z"
        },
        {
                "id": 1,
                "recipe_id": 7,
                "recipe": {
                        "id": 7,
                        "title": "Bacon",
                        "description": "Crispy breakfast bacon",
                        "recipe_type": "regular",
                        "meal_type": "breakfast",
                        "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                        "servings": 4,
                        "prep_time": 2,
                        "cook_time": 8,
                        "created_at": "2025-06-24T17:45:00.000Z",
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
                                "easy",
                                "spicy",
                                "comfort"
                        ],
                        "items": [
                                {
                                        "item_id": 27,
                                        "quantity": 1,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 47,
                                        "quantity": 0.25,
                                        "unit": "boxes"
                                },
                                {
                                        "item_id": 24,
                                        "quantity": 0.75,
                                        "unit": "cups"
                                },
                                {
                                        "item_id": 22,
                                        "quantity": 0.5,
                                        "unit": "gallons"
                                },
                                {
                                        "item_id": 21,
                                        "quantity": 0.75,
                                        "unit": "blocks"
                                }
                        ],
                        "favorite": true
                },
                "meal_name": "Bacon",
                "date": "2025-10-08",
                "scheduled_date": "2025-10-08",
                "servings": 4,
                "notes": "Scheduled Bacon",
                "meal_type": "breakfast",
                "total_time": 10,
                "created_at": "2025-09-29T13:34:08.689Z"
        },
        {
                "id": 6,
                "recipe_id": 11,
                "recipe": {
                        "id": 11,
                        "title": "Roasted Broccoli Mix",
                        "description": "Savory roasted broccoli mix perfect for snacking",
                        "recipe_type": "regular",
                        "meal_type": "snack",
                        "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                        "servings": 2,
                        "prep_time": 5,
                        "cook_time": 25,
                        "created_at": "2025-07-10T00:00:00.000Z",
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
                                "comfort",
                                "hearty"
                        ],
                        "items": [
                                {
                                        "item_id": 6,
                                        "quantity": 1.5,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 18,
                                        "quantity": 0.25,
                                        "unit": "packages"
                                },
                                {
                                        "item_id": 19,
                                        "quantity": 0.5,
                                        "unit": "bottles"
                                },
                                {
                                        "item_id": 20,
                                        "quantity": 0.5,
                                        "unit": "containers"
                                },
                                {
                                        "item_id": 11,
                                        "quantity": 0.75,
                                        "unit": "bunches"
                                },
                                {
                                        "item_id": 47,
                                        "quantity": 0.5,
                                        "unit": "boxes"
                                }
                        ],
                        "favorite": false
                },
                "meal_name": "Roasted Broccoli Mix",
                "date": "2025-10-12",
                "scheduled_date": "2025-10-12",
                "servings": 2,
                "notes": "Scheduled Roasted Broccoli Mix",
                "meal_type": "snack",
                "total_time": 30,
                "created_at": "2025-09-29T13:34:08.689Z"
        },
        {
                "id": 7,
                "recipe_id": 19,
                "recipe": {
                        "id": 19,
                        "title": "Sunday Dinner Combo",
                        "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                        "recipe_type": "combo",
                        "meal_type": null,
                        "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                        "servings": 6,
                        "prep_time": 25,
                        "cook_time": 25,
                        "created_at": "2025-08-10T18:30:00.000Z",
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
                                        "quantity": 2,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 24,
                                        "quantity": 1.75,
                                        "unit": "cups"
                                },
                                {
                                        "item_id": 4,
                                        "quantity": 0.5,
                                        "unit": "containers"
                                },
                                {
                                        "item_id": 19,
                                        "quantity": 1,
                                        "unit": "bottles"
                                },
                                {
                                        "item_id": 40,
                                        "quantity": 0.25,
                                        "unit": "bottles"
                                },
                                {
                                        "item_id": 17,
                                        "quantity": 1.25,
                                        "unit": "loaves"
                                },
                                {
                                        "item_id": 37,
                                        "quantity": 0.5,
                                        "unit": "containers"
                                },
                                {
                                        "item_id": 23,
                                        "quantity": 1.75,
                                        "unit": "bunches"
                                },
                                {
                                        "item_id": 21,
                                        "quantity": 0.75,
                                        "unit": "blocks"
                                },
                                {
                                        "item_id": 5,
                                        "quantity": 0.5,
                                        "unit": "gallons"
                                },
                                {
                                        "item_id": 43,
                                        "quantity": 0.75,
                                        "unit": "packages"
                                },
                                {
                                        "item_id": 13,
                                        "quantity": 0.5,
                                        "unit": "bags"
                                },
                                {
                                        "item_id": 49,
                                        "quantity": 0.5,
                                        "unit": "packages"
                                }
                        ]
                },
                "meal_name": "Sunday Dinner Combo",
                "date": "2025-10-15",
                "scheduled_date": "2025-10-15",
                "servings": 6,
                "notes": "Scheduled Sunday Dinner Combo",
                "meal_type": "dinner",
                "total_time": 50,
                "created_at": "2025-09-29T13:34:08.689Z"
        },
        {
                "id": 2,
                "recipe_id": 27,
                "recipe": {
                        "id": 27,
                        "title": "Asian Lunch Combo",
                        "description": "Perfect asian lunch combination",
                        "recipe_type": "combo",
                        "image_url": "https://images.unsplash.com/photo-1524656056?w=400&h=300&fit=crop",
                        "servings": 2,
                        "prep_time": 3,
                        "cook_time": 7,
                        "created_at": "2025-09-28T13:34:08.688Z",
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
                                        "recipe_id": 12,
                                        "servings": 2,
                                        "servings_multiplier": 1
                                }
                        ],
                        "items": [
                                {
                                        "item_id": 1,
                                        "quantity": 0.67,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 6,
                                        "quantity": 1,
                                        "unit": "pieces"
                                },
                                {
                                        "item_id": 17,
                                        "quantity": 1.17,
                                        "unit": "loaves"
                                },
                                {
                                        "item_id": 8,
                                        "quantity": 0.83,
                                        "unit": "heads"
                                },
                                {
                                        "item_id": 44,
                                        "quantity": 0.5,
                                        "unit": "packages"
                                },
                                {
                                        "item_id": 22,
                                        "quantity": 0.33,
                                        "unit": "gallons"
                                }
                        ],
                        "favorite": false
                },
                "meal_name": "Asian Lunch Combo",
                "date": "2025-10-17",
                "scheduled_date": "2025-10-17",
                "servings": 2,
                "notes": "Scheduled Asian Lunch Combo",
                "meal_type": "lunch",
                "total_time": 10,
                "created_at": "2025-09-29T13:34:08.689Z"
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