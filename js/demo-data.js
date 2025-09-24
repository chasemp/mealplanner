// Demo Data for MealPlanner
// Generated on 2025-09-19T04:35:52.788Z
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
                        "protein": 12,
                        "carbs": 29,
                        "fat": 10,
                        "calories": 98
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
                "default_unit": "pieces",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 19,
                        "carbs": 12,
                        "fat": 3,
                        "calories": 138
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
                "storage_notes": "Freeze if not using within 2 days",
                "nutrition": {
                        "protein": 6,
                        "carbs": 10,
                        "fat": 1,
                        "calories": 88
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
                        "protein": 18,
                        "carbs": 44,
                        "fat": 9,
                        "calories": 210
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
                "default_unit": "blocks",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 12,
                        "carbs": 30,
                        "fat": 11,
                        "calories": 242
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
                        "protein": 20,
                        "carbs": 49,
                        "fat": 7,
                        "calories": 193
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
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 15,
                        "carbs": 51,
                        "fat": 13,
                        "calories": 132
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
                        "protein": 3,
                        "carbs": 12,
                        "fat": 2,
                        "calories": 148
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
                        "protein": 15,
                        "carbs": 35,
                        "fat": 2,
                        "calories": 121
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
                "default_unit": "heads",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 6,
                        "carbs": 7,
                        "fat": 11,
                        "calories": 248
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
                        "protein": 15,
                        "carbs": 45,
                        "fat": 12,
                        "calories": 227
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
                "default_unit": "bunches",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 1,
                        "carbs": 9,
                        "fat": 15,
                        "calories": 148
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 19,
                        "carbs": 42,
                        "fat": 2,
                        "calories": 218
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 10,
                        "fat": 1,
                        "calories": 51
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
                "default_unit": "lbs",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 11,
                        "carbs": 9,
                        "fat": 8,
                        "calories": 86
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
                        "protein": 13,
                        "carbs": 13,
                        "fat": 9,
                        "calories": 133
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
                        "protein": 3,
                        "carbs": 51,
                        "fat": 5,
                        "calories": 223
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
                "default_unit": "bottles",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 5,
                        "carbs": 45,
                        "fat": 7,
                        "calories": 147
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
                "default_unit": "packages",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 9,
                        "carbs": 40,
                        "fat": 12,
                        "calories": 230
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 13,
                        "carbs": 37,
                        "fat": 11,
                        "calories": 208
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
                "storage_notes": "Keep cold",
                "nutrition": {
                        "protein": 4,
                        "carbs": 16,
                        "fat": 6,
                        "calories": 161
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
                "default_unit": "containers",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 19,
                        "carbs": 16,
                        "fat": 14,
                        "calories": 62
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
                "default_unit": "heads",
                "storage_notes": "Keep fresh",
                "nutrition": {
                        "protein": 18,
                        "carbs": 18,
                        "fat": 6,
                        "calories": 218
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 6,
                        "carbs": 47,
                        "fat": 11,
                        "calories": 193
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 39,
                        "fat": 10,
                        "calories": 58
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
                "default_unit": "heads",
                "storage_notes": "Refrigerate",
                "nutrition": {
                        "protein": 2,
                        "carbs": 51,
                        "fat": 11,
                        "calories": 230
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
                        "carbs": 44,
                        "fat": 9,
                        "calories": 222
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
                        "protein": 8,
                        "carbs": 18,
                        "fat": 6,
                        "calories": 158
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
                        "protein": 4,
                        "carbs": 7,
                        "fat": 1,
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
                "id": 30,
                "name": "Hot Dog Buns",
                "category": "bakery",
                "default_unit": "packages",
                "storage_notes": "Store at room temperature",
                "nutrition": {
                        "protein": 16,
                        "carbs": 47,
                        "fat": 5,
                        "calories": 195
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
                "default_unit": "pieces",
                "storage_notes": "Refrigerate after 3 days",
                "nutrition": {
                        "protein": 2,
                        "carbs": 18,
                        "fat": 13,
                        "calories": 58
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
                        "protein": 15,
                        "carbs": 19,
                        "fat": 10,
                        "calories": 165
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
                        "protein": 5,
                        "carbs": 10,
                        "fat": 10,
                        "calories": 112
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 7,
                        "carbs": 29,
                        "fat": 7,
                        "calories": 88
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 52,
                        "fat": 2,
                        "calories": 245
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
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 14,
                        "carbs": 5,
                        "fat": 5,
                        "calories": 186
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
                        "protein": 20,
                        "carbs": 49,
                        "fat": 11,
                        "calories": 147
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
                        "protein": 13,
                        "carbs": 19,
                        "fat": 8,
                        "calories": 84
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
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 17,
                        "carbs": 5,
                        "fat": 8,
                        "calories": 106
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
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 4,
                        "carbs": 18,
                        "fat": 3,
                        "calories": 65
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
                "default_unit": "boxes",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 5,
                        "carbs": 10,
                        "fat": 14,
                        "calories": 231
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
                        "protein": 9,
                        "carbs": 10,
                        "fat": 7,
                        "calories": 152
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
                        "protein": 18,
                        "carbs": 7,
                        "fat": 6,
                        "calories": 77
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
                        "protein": 20,
                        "carbs": 39,
                        "fat": 11,
                        "calories": 195
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
                        "protein": 19,
                        "carbs": 44,
                        "fat": 8,
                        "calories": 197
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
                "default_unit": "containers",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 10,
                        "carbs": 28,
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
                "default_unit": "packages",
                "storage_notes": "Store in cool, dry place",
                "nutrition": {
                        "protein": 1,
                        "carbs": 50,
                        "fat": 6,
                        "calories": 178
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
                "default_unit": "containers",
                "storage_notes": "Keep sealed",
                "nutrition": {
                        "protein": 10,
                        "carbs": 18,
                        "fat": 6,
                        "calories": 161
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
                        "protein": 7,
                        "carbs": 50,
                        "fat": 14,
                        "calories": 110
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
                        "protein": 9,
                        "carbs": 22,
                        "fat": 7,
                        "calories": 127
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
                "servings": 4,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-06-01T02:45:00.000Z",
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
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
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
                "servings": 4,
                "prep_time": 15,
                "cook_time": 25,
                "created_at": "2025-06-05T03:00:00.000Z",
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
                        "quick",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
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
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
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
                "servings": 6,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-09T04:00:00.000Z",
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
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.25,
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
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 5,
                "cook_time": 10,
                "created_at": "2025-06-12T19:15:00.000Z",
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
                        "spicy",
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 26,
                                "quantity": 0.5,
                                "unit": "heads"
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
                "servings": 2,
                "prep_time": 10,
                "cook_time": 0,
                "created_at": "2025-06-17T04:00:00.000Z",
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
                        "comfort",
                        "hearty",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
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
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-20T10:00:00.000Z",
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
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1,
                                "unit": "lbs"
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-06-24T13:00:00.000Z",
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
                        "savory",
                        "hearty"
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "packages"
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
                "id": 8,
                "title": "Hash Browns",
                "description": "Golden crispy hash browns",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-06-28T15:15:00.000Z",
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
                        "healthy",
                        "hearty",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.75,
                                "unit": "pieces"
                        }
                ],
                "favorite": true
        },
        {
                "id": 9,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-07-02T04:00:00.000Z",
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
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 50,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 11,
                                "quantity": 1.75,
                                "unit": "bunches"
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
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 20,
                "created_at": "2025-07-06T19:30:00.000Z",
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
                        "healthy",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 0.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.5,
                                "unit": "containers"
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
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-09T20:15:00.000Z",
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
                        "easy",
                        "sweet"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 12,
                "title": "Broccoli Soup with Chicken Breast",
                "description": "Warming soup featuring broccoli and tender chicken breast",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 15,
                "cook_time": 35,
                "created_at": "2025-07-14T03:15:00.000Z",
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
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 13,
                "title": "Morning Bread Stack",
                "description": "Delicious morning stack with bread and breakfast favorites",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 20,
                "cook_time": 15,
                "created_at": "2025-07-18T05:15:00.000Z",
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
                        "easy"
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 1.25,
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
                                "unit": "packages"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 14,
                "title": "Roasted Broccoli Mix",
                "description": "Savory roasted broccoli mix perfect for snacking",
                "recipe_type": "regular",
                "meal_type": "snack",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 15,
                "created_at": "2025-07-22T10:45:00.000Z",
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
                        "savory"
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
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 32,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.25,
                                "unit": "bottles"
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
                "id": 15,
                "title": "Quick Chicken Breast Wrap",
                "description": "Fast and flavorful wrap with chicken breast and fresh vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-07-26T05:30:00.000Z",
                "instructions": [
                        "Preheat oven to 400°F if baking",
                        "Prepare all ingredients",
                        "Heat oil in large pan over medium heat",
                        "Cook according to recipe requirements"
                ],
                "labels": [
                        "quick",
                        "portable",
                        "wrap",
                        "Lunch",
                        "savory",
                        "quick"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "lbs"
                        }
                ],
                "favorite": true
        },
        {
                "id": 16,
                "title": "Chicken Breast Lunch Salad",
                "description": "Fresh and satisfying lunch salad with chicken breast and crisp vegetables",
                "recipe_type": "regular",
                "meal_type": "lunch",
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 10,
                "cook_time": 10,
                "created_at": "2025-07-30T02:30:00.000Z",
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
                        "healthy",
                        "savory"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.75,
                                "unit": "bags"
                        }
                ],
                "favorite": true
        },
        {
                "id": 17,
                "title": "Baked Chicken Breast Dinner",
                "description": "Hearty baked chicken breast with seasonal vegetables and herbs",
                "recipe_type": "regular",
                "meal_type": "dinner",
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 45,
                "created_at": "2025-08-03T03:15:00.000Z",
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
                        "healthy"
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1,
                                "unit": "heads"
                        }
                ],
                "favorite": false
        },
        {
                "id": 18,
                "title": "Bacon",
                "description": "Crispy breakfast bacon",
                "recipe_type": "regular",
                "meal_type": "breakfast",
                "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 2,
                "cook_time": 8,
                "created_at": "2025-08-06T21:30:00.000Z",
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
                        "fresh"
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 2,
                                "unit": "packages"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 25,
                                "quantity": 0.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.25,
                                "unit": "containers"
                        }
                ],
                "favorite": true
        },
        {
                "id": 19,
                "title": "Sunday Dinner Combo",
                "description": "Classic Sunday dinner with fried chicken and mashed potatoes",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 25,
                "created_at": "2025-08-10T21:30:00.000Z",
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
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
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
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 0.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
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
                "prep_time": 25,
                "cook_time": 15,
                "created_at": "2025-08-14T03:15:00.000Z",
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
                                "recipe_id": 4,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 5,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 6,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.75,
                                "unit": "bunches"
                        }
                ]
        },
        {
                "id": 21,
                "title": "Full American Breakfast Combo",
                "description": "Complete American breakfast with pancakes and bacon",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 22,
                "cook_time": 15,
                "created_at": "2025-08-17T23:45:00.000Z",
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
                                "recipe_id": 15,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 24,
                                "quantity": 0.75,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.25,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 21,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 12,
                                "quantity": 0.75,
                                "unit": "bunches"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.5,
                                "unit": "bags"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
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
                "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 20,
                "cook_time": 10,
                "created_at": "2025-08-22T10:15:00.000Z",
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
                                "recipe_id": 16,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.25,
                                "unit": "heads"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 0.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.75,
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
                "servings": 4,
                "prep_time": 15,
                "cook_time": 10,
                "created_at": "2025-08-25T16:15:00.000Z",
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
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 26,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.25,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 24,
                "title": "Vegetarian Quinoa Feast Combo",
                "description": "Healthy vegetarian meal with quinoa",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 22,
                "cook_time": 10,
                "created_at": "2025-08-30T03:15:00.000Z",
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
                                "recipe_id": 7,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 16,
                                "servings": 2,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 15,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 14,
                                "quantity": 1,
                                "unit": "packages"
                        },
                        {
                                "item_id": 37,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 3.5,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 2.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.5,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 16,
                                "quantity": 1.25,
                                "unit": "bags"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.75,
                                "unit": "lbs"
                        }
                ]
        },
        {
                "id": 25,
                "title": "Weekend Brunch Combo",
                "description": "Perfect weekend brunch combination",
                "recipe_type": "combo",
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 25,
                "cook_time": 35,
                "created_at": "2025-09-03T05:00:00.000Z",
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
                                "recipe_id": 12,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 28,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 25,
                                "quantity": 2.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.75,
                                "unit": "bags"
                        },
                        {
                                "item_id": 31,
                                "quantity": 1.75,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.5,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 1,
                                "quantity": 1.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 9,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.5,
                                "unit": "heads"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.5,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
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
                "meal_type": null,
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 40,
                "cook_time": 45,
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
                                "item_id": 26,
                                "quantity": 1.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 46,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 2.75,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 18,
                                "quantity": 0.25,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 3,
                                "quantity": 1.25,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 23,
                                "quantity": 1,
                                "unit": "heads"
                        }
                ]
        },
        {
                "id": 27,
                "title": "Quick Mexican Breakfast",
                "description": "Fast and delicious mexican breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1511663512?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 3,
                "cook_time": 7,
                "created_at": "2025-09-05T04:35:52.787Z",
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
                                "recipe_id": 18,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.38,
                                "unit": "containers"
                        },
                        {
                                "item_id": 25,
                                "quantity": 0.56,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.19,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 28,
                "title": "Mediterranean Night",
                "description": "Classic mediterranean meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1577993666?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 16,
                "cook_time": 38,
                "created_at": "2025-08-29T04:35:52.787Z",
                "instructions": [],
                "labels": [
                        "classic",
                        "complete",
                        "mediterranean",
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
                                "recipe_id": 4,
                                "servings": 4,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 3,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
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
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 27,
                                "quantity": 1.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 2,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.25,
                                "unit": "packages"
                        },
                        {
                                "item_id": 30,
                                "quantity": 1.75,
                                "unit": "packages"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 29,
                "title": "Italian Lunch Combo",
                "description": "Perfect italian lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1553370353?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 27,
                "cook_time": 62,
                "created_at": "2025-08-31T04:35:52.787Z",
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
                                "recipe_id": 15,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 12,
                                "servings": 3,
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
                                "item_id": 1,
                                "quantity": 7.14,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 4.46,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 2.33,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 2,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 16,
                                "quantity": 2.17,
                                "unit": "bags"
                        },
                        {
                                "item_id": 25,
                                "quantity": 3.08,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 8,
                                "quantity": 2.33,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 9,
                                "quantity": 0.94,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1.13,
                                "unit": "heads"
                        },
                        {
                                "item_id": 19,
                                "quantity": 1.19,
                                "unit": "packages"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.38,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 40,
                                "quantity": 0.38,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 1.69,
                                "unit": "containers"
                        },
                        {
                                "item_id": 18,
                                "quantity": 1,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 33,
                                "quantity": 0.5,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 30,
                "title": "Quick American Breakfast",
                "description": "Fast and delicious american breakfast",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1560007392?w=400&h=300&fit=crop",
                "servings": 3,
                "prep_time": 10,
                "cook_time": 24,
                "created_at": "2025-08-21T04:35:52.787Z",
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
                                "recipe_id": 13,
                                "servings": 3,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 17,
                                "quantity": 0.94,
                                "unit": "packages"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.56,
                                "unit": "containers"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.56,
                                "unit": "packages"
                        },
                        {
                                "item_id": 44,
                                "quantity": 0.38,
                                "unit": "bags"
                        },
                        {
                                "item_id": 35,
                                "quantity": 0.19,
                                "unit": "bottles"
                        },
                        {
                                "item_id": 20,
                                "quantity": 0.19,
                                "unit": "containers"
                        }
                ],
                "favorite": false
        },
        {
                "id": 31,
                "title": "Mexican Lunch Combo",
                "description": "Perfect mexican lunch combination",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1536491058?w=400&h=300&fit=crop",
                "servings": 2,
                "prep_time": 6,
                "cook_time": 14,
                "created_at": "2025-08-30T04:35:52.787Z",
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
                                "recipe_id": 15,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 1.17,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 6,
                                "quantity": 1.17,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 17,
                                "quantity": 1.17,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 16,
                                "quantity": 0.33,
                                "unit": "bags"
                        },
                        {
                                "item_id": 25,
                                "quantity": 1.17,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 8,
                                "quantity": 1.17,
                                "unit": "lbs"
                        }
                ],
                "favorite": false
        },
        {
                "id": 32,
                "title": "American Night",
                "description": "Classic american meal with all the fixings",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1568459217?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 13,
                "cook_time": 31,
                "created_at": "2025-09-05T04:35:52.787Z",
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
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.38,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 19,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 17,
                                "quantity": 0.63,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 30,
                                "quantity": 0.88,
                                "unit": "packages"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
                                "unit": "containers"
                        },
                        {
                                "item_id": 1,
                                "quantity": 0.63,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 26,
                                "quantity": 0.25,
                                "unit": "heads"
                        }
                ],
                "favorite": false
        },
        {
                "id": 33,
                "title": "Italian Family Dinner",
                "description": "A hearty family dinner with italian favorites",
                "recipe_type": "combo",
                "image_url": "https://images.unsplash.com/photo-1573778756?w=400&h=300&fit=crop",
                "servings": 4,
                "prep_time": 30,
                "cook_time": 70,
                "created_at": "2025-08-28T04:35:52.787Z",
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
                                "recipe_id": 2,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 1,
                                "servings": 4,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 3,
                                "servings": 3,
                                "servings_multiplier": 1
                        },
                        {
                                "recipe_id": 4,
                                "servings": 2,
                                "servings_multiplier": 1
                        }
                ],
                "items": [
                        {
                                "item_id": 1,
                                "quantity": 2.38,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 24,
                                "quantity": 0.5,
                                "unit": "cups"
                        },
                        {
                                "item_id": 4,
                                "quantity": 0.5,
                                "unit": "containers"
                        },
                        {
                                "item_id": 19,
                                "quantity": 1.13,
                                "unit": "packages"
                        },
                        {
                                "item_id": 29,
                                "quantity": 1.25,
                                "unit": "pieces"
                        },
                        {
                                "item_id": 47,
                                "quantity": 0.5,
                                "unit": "packages"
                        },
                        {
                                "item_id": 26,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 27,
                                "quantity": 2.38,
                                "unit": "packages"
                        },
                        {
                                "item_id": 23,
                                "quantity": 0.75,
                                "unit": "heads"
                        },
                        {
                                "item_id": 21,
                                "quantity": 0.76,
                                "unit": "packages"
                        },
                        {
                                "item_id": 5,
                                "quantity": 0.75,
                                "unit": "blocks"
                        },
                        {
                                "item_id": 22,
                                "quantity": 0.75,
                                "unit": "containers"
                        },
                        {
                                "item_id": 38,
                                "quantity": 0.25,
                                "unit": "boxes"
                        },
                        {
                                "item_id": 45,
                                "quantity": 0.75,
                                "unit": "gallons"
                        },
                        {
                                "item_id": 25,
                                "quantity": 0.88,
                                "unit": "lbs"
                        },
                        {
                                "item_id": 36,
                                "quantity": 0.13,
                                "unit": "containers"
                        },
                        {
                                "item_id": 17,
                                "quantity": 0.63,
                                "unit": "packages"
                        },
                        {
                                "item_id": 10,
                                "quantity": 1,
                                "unit": "heads"
                        },
                        {
                                "item_id": 30,
                                "quantity": 0.88,
                                "unit": "packages"
                        },
                        {
                                "item_id": 48,
                                "quantity": 0.25,
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
                "id": 7,
                "recipe_id": 8,
                "date": "2025-09-18",
                "scheduled_date": "2025-09-18",
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
                "created_at": "2025-09-19T04:35:52.787Z"
        },
        {
                "id": 1,
                "recipe_id": 18,
                "date": "2025-09-22",
                "scheduled_date": "2025-09-22",
                "servings": 4,
                "notes": "Scheduled Bacon",
                "recipes": [
                        {
                                "recipeId": 18,
                                "servings": 4
                        }
                ],
                "recipe_name": "Bacon",
                "meal_type": "breakfast",
                "total_time": 10,
                "created_at": "2025-09-19T04:35:52.787Z"
        },
        {
                "id": 4,
                "recipe_id": 10,
                "date": "2025-09-27",
                "scheduled_date": "2025-09-27",
                "servings": 2,
                "notes": "Scheduled Broccoli Chips",
                "recipes": [
                        {
                                "recipeId": 10,
                                "servings": 2
                        }
                ],
                "recipe_name": "Broccoli Chips",
                "meal_type": "snack",
                "total_time": 30,
                "created_at": "2025-09-19T04:35:52.787Z"
        },
        {
                "id": 5,
                "recipe_id": 13,
                "date": "2025-09-28",
                "scheduled_date": "2025-09-28",
                "servings": 4,
                "notes": "Scheduled Morning Bread Stack",
                "recipes": [
                        {
                                "recipeId": 13,
                                "servings": 4
                        }
                ],
                "recipe_name": "Morning Bread Stack",
                "meal_type": "breakfast",
                "total_time": 35,
                "created_at": "2025-09-19T04:35:52.787Z"
        },
        {
                "id": 6,
                "recipe_id": 26,
                "date": "2025-10-03",
                "scheduled_date": "2025-10-03",
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
                "total_time": 85,
                "created_at": "2025-09-19T04:35:52.787Z"
        },
        {
                "id": 2,
                "recipe_id": 29,
                "date": "2025-10-04",
                "scheduled_date": "2025-10-04",
                "servings": 4,
                "notes": "Scheduled Italian Lunch Combo",
                "recipes": [
                        {
                                "recipeId": 29,
                                "servings": 4
                        }
                ],
                "recipe_name": "Italian Lunch Combo",
                "meal_type": "lunch",
                "total_time": 89,
                "created_at": "2025-09-19T04:35:52.787Z"
        },
        {
                "id": 3,
                "recipe_id": 33,
                "date": "2025-10-05",
                "scheduled_date": "2025-10-05",
                "servings": 4,
                "notes": "Scheduled Italian Family Dinner",
                "recipes": [
                        {
                                "recipeId": 33,
                                "servings": 4
                        }
                ],
                "recipe_name": "Italian Family Dinner",
                "meal_type": "dinner",
                "total_time": 100,
                "created_at": "2025-09-19T04:35:52.787Z"
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