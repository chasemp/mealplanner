// Demo Data for MealPlanner
// Generated on 2025-09-10T12:58:34.332Z
// This file contains realistic demo data that validates the expected schema

class DemoDataManager {
    constructor() {
        console.log('📱 DemoDataManager constructor called');
        this.initializeRawData();
    }

    initializeRawData() {
        // Comprehensive ingredient list
        this.ingredients = [
          {
                    "id": 1,
                    "name": "Chicken Breast",
                    "category": "meat",
                    "default_unit": "lbs",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 8,
                              "carbs": 45,
                              "fat": 8,
                              "calories": 86
                    },
                    "labels": [
                              "protein",
                              "lean",
                              "versatile"
                    ]
          },
          {
                    "id": 2,
                    "name": "Ground Beef",
                    "category": "meat",
                    "default_unit": "packages",
                    "storage_notes": "Freeze if not using within 2 days",
                    "nutrition": {
                              "protein": 11,
                              "carbs": 13,
                              "fat": 6,
                              "calories": 87
                    },
                    "labels": [
                              "protein",
                              "hearty",
                              "versatile"
                    ]
          },
          {
                    "id": 3,
                    "name": "Salmon Fillet",
                    "category": "meat",
                    "default_unit": "pieces",
                    "storage_notes": "Freeze if not using within 2 days",
                    "nutrition": {
                              "protein": 9,
                              "carbs": 29,
                              "fat": 11,
                              "calories": 186
                    },
                    "labels": [
                              "protein",
                              "omega-3",
                              "healthy"
                    ]
          },
          {
                    "id": 4,
                    "name": "Eggs",
                    "category": "dairy",
                    "default_unit": "containers",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 12,
                              "carbs": 17,
                              "fat": 7,
                              "calories": 132
                    },
                    "labels": [
                              "protein",
                              "breakfast",
                              "versatile"
                    ]
          },
          {
                    "id": 5,
                    "name": "Milk",
                    "category": "dairy",
                    "default_unit": "gallons",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 19,
                              "carbs": 29,
                              "fat": 1,
                              "calories": 234
                    },
                    "labels": [
                              "calcium",
                              "breakfast",
                              "baking"
                    ]
          },
          {
                    "id": 6,
                    "name": "Broccoli",
                    "category": "produce",
                    "default_unit": "pieces",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 18,
                              "carbs": 27,
                              "fat": 10,
                              "calories": 217
                    },
                    "labels": [
                              "vegetable",
                              "healthy",
                              "fiber"
                    ]
          },
          {
                    "id": 7,
                    "name": "Carrots",
                    "category": "produce",
                    "default_unit": "lbs",
                    "storage_notes": "Keep fresh",
                    "nutrition": {
                              "protein": 8,
                              "carbs": 50,
                              "fat": 11,
                              "calories": 224
                    },
                    "labels": [
                              "vegetable",
                              "sweet",
                              "vitamin-a"
                    ]
          },
          {
                    "id": 8,
                    "name": "Bell Peppers",
                    "category": "produce",
                    "default_unit": "bunches",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 17,
                              "carbs": 37,
                              "fat": 13,
                              "calories": 160
                    },
                    "labels": [
                              "vegetable",
                              "colorful",
                              "vitamin-c"
                    ]
          },
          {
                    "id": 9,
                    "name": "Onions",
                    "category": "produce",
                    "default_unit": "bunches",
                    "storage_notes": "Keep fresh",
                    "nutrition": {
                              "protein": 16,
                              "carbs": 50,
                              "fat": 4,
                              "calories": 50
                    },
                    "labels": [
                              "vegetable",
                              "aromatic",
                              "base"
                    ]
          },
          {
                    "id": 10,
                    "name": "Garlic",
                    "category": "produce",
                    "default_unit": "pieces",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 6,
                              "carbs": 23,
                              "fat": 1,
                              "calories": 133
                    },
                    "labels": [
                              "aromatic",
                              "flavor",
                              "healthy"
                    ]
          },
          {
                    "id": 11,
                    "name": "Tomatoes",
                    "category": "produce",
                    "default_unit": "pieces",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 8,
                              "carbs": 54,
                              "fat": 12,
                              "calories": 87
                    },
                    "labels": [
                              "vegetable",
                              "fresh",
                              "versatile"
                    ]
          },
          {
                    "id": 12,
                    "name": "Spinach",
                    "category": "produce",
                    "default_unit": "heads",
                    "storage_notes": "Keep fresh",
                    "nutrition": {
                              "protein": 12,
                              "carbs": 41,
                              "fat": 2,
                              "calories": 215
                    },
                    "labels": [
                              "leafy-green",
                              "iron",
                              "healthy"
                    ]
          },
          {
                    "id": 13,
                    "name": "Rice",
                    "category": "pantry",
                    "default_unit": "packages",
                    "storage_notes": "Keep sealed",
                    "nutrition": {
                              "protein": 15,
                              "carbs": 52,
                              "fat": 3,
                              "calories": 137
                    },
                    "labels": [
                              "grain",
                              "staple",
                              "filling"
                    ]
          },
          {
                    "id": 14,
                    "name": "Pasta",
                    "category": "pantry",
                    "default_unit": "boxes",
                    "storage_notes": "Keep sealed",
                    "nutrition": {
                              "protein": 5,
                              "carbs": 22,
                              "fat": 13,
                              "calories": 176
                    },
                    "labels": [
                              "grain",
                              "italian",
                              "comfort"
                    ]
          },
          {
                    "id": 15,
                    "name": "Bread",
                    "category": "bakery",
                    "default_unit": "packages",
                    "storage_notes": "Store at room temperature",
                    "nutrition": {
                              "protein": 5,
                              "carbs": 42,
                              "fat": 8,
                              "calories": 130
                    },
                    "labels": [
                              "grain",
                              "breakfast",
                              "sandwich"
                    ]
          },
          {
                    "id": 16,
                    "name": "Olive Oil",
                    "category": "pantry",
                    "default_unit": "containers",
                    "storage_notes": "Store in cool, dry place",
                    "nutrition": {
                              "protein": 3,
                              "carbs": 13,
                              "fat": 5,
                              "calories": 146
                    },
                    "labels": [
                              "fat",
                              "healthy",
                              "cooking"
                    ]
          },
          {
                    "id": 17,
                    "name": "Salt",
                    "category": "pantry",
                    "default_unit": "containers",
                    "storage_notes": "Keep sealed",
                    "nutrition": {
                              "protein": 5,
                              "carbs": 41,
                              "fat": 4,
                              "calories": 170
                    },
                    "labels": [
                              "seasoning",
                              "essential",
                              "flavor"
                    ]
          },
          {
                    "id": 18,
                    "name": "Black Pepper",
                    "category": "pantry",
                    "default_unit": "boxes",
                    "storage_notes": "Keep sealed",
                    "nutrition": {
                              "protein": 16,
                              "carbs": 24,
                              "fat": 11,
                              "calories": 136
                    },
                    "labels": [
                              "seasoning",
                              "spice",
                              "flavor"
                    ]
          },
          {
                    "id": 19,
                    "name": "Butter",
                    "category": "dairy",
                    "default_unit": "containers",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 2,
                              "carbs": 48,
                              "fat": 8,
                              "calories": 182
                    },
                    "labels": [
                              "fat",
                              "flavor",
                              "baking"
                    ]
          },
          {
                    "id": 20,
                    "name": "Cheese",
                    "category": "dairy",
                    "default_unit": "gallons",
                    "storage_notes": "Refrigerate",
                    "nutrition": {
                              "protein": 13,
                              "carbs": 28,
                              "fat": 11,
                              "calories": 70
                    },
                    "labels": [
                              "protein",
                              "calcium",
                              "flavor"
                    ]
          }
];

        // Comprehensive recipe list that uses the ingredients above
        this.recipes = [
          {
                    "id": 1,
                    "title": "Chicken Breast Stir Fry",
                    "description": "Quick and healthy stir-fried chicken breast with mixed vegetables",
                    "type": "basic",
                    "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                    "servings": 4,
                    "meal_type": "dinner",
                    "prep_time": 10,
                    "cook_time": 15,
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
                              "spicy"
                    ],
                    "ingredients": [
                              {
                                        "ingredient_id": 1,
                                        "quantity": 1.75,
                                        "unit": "lbs"
                              },
                              {
                                        "ingredient_id": 8,
                                        "quantity": 1.75,
                                        "unit": "bunches"
                              },
                              {
                                        "ingredient_id": 9,
                                        "quantity": 1.5,
                                        "unit": "bunches"
                              },
                              {
                                        "ingredient_id": 10,
                                        "quantity": 0.75,
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 16,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 19,
                                        "quantity": 0.75,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 4,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 14,
                                        "quantity": 0.25,
                                        "unit": "boxes"
                              },
                              {
                                        "ingredient_id": 15,
                                        "quantity": 1.75,
                                        "unit": "packages"
                              }
                    ],
                    "created_at": "2025-05-30T12:15:00.000Z"
          },
          {
                    "id": 2,
                    "title": "Grilled Chicken Breast with Broccoli",
                    "description": "Healthy grilled chicken breast served with roasted broccoli",
                    "type": "basic",
                    "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
                    "servings": 4,
                    "meal_type": "dinner",
                    "prep_time": 15,
                    "cook_time": 20,
                    "instructions": [
                              "Preheat oven to 400°F if baking",
                              "Prepare all ingredients",
                              "Heat oil in large pan over medium heat",
                              "Cook according to recipe requirements",
                              "Season with salt and pepper to taste"
                    ],
                    "labels": [
                              "healthy",
                              "protein",
                              "grilled",
                              "hearty",
                              "spicy"
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
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 16,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 17,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 18,
                                        "quantity": 0.5,
                                        "unit": "boxes"
                              },
                              {
                                        "ingredient_id": 15,
                                        "quantity": 1.5,
                                        "unit": "packages"
                              },
                              {
                                        "ingredient_id": 8,
                                        "quantity": 0.75,
                                        "unit": "bunches"
                              },
                              {
                                        "ingredient_id": 20,
                                        "quantity": 1,
                                        "unit": "gallons"
                              }
                    ],
                    "created_at": "2025-06-17T05:30:00.000Z"
          },
          {
                    "id": 3,
                    "title": "Scrambled Eggs with Bread",
                    "description": "Simple breakfast with fluffy scrambled eggs and bread",
                    "type": "basic",
                    "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                    "servings": 2,
                    "meal_type": "breakfast",
                    "prep_time": 10,
                    "cook_time": 10,
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
                              "protein",
                              "quick",
                              "spicy",
                              "comfort"
                    ],
                    "ingredients": [
                              {
                                        "ingredient_id": 4,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 19,
                                        "quantity": 0.25,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 17,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 15,
                                        "quantity": 2,
                                        "unit": "packages"
                              },
                              {
                                        "ingredient_id": 18,
                                        "quantity": 0.25,
                                        "unit": "boxes"
                              },
                              {
                                        "ingredient_id": 6,
                                        "quantity": 1,
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 1,
                                        "quantity": 1.5,
                                        "unit": "lbs"
                              }
                    ],
                    "created_at": "2025-06-30T16:30:00.000Z"
          },
          {
                    "id": 4,
                    "title": "Grilled Chicken Breast with Broccoli",
                    "description": "Healthy grilled chicken breast served with roasted broccoli",
                    "type": "basic",
                    "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                    "servings": 6,
                    "meal_type": "dinner",
                    "prep_time": 15,
                    "cook_time": 20,
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
                              "spicy",
                              "hearty",
                              "healthy"
                    ],
                    "ingredients": [
                              {
                                        "ingredient_id": 1,
                                        "quantity": 1.75,
                                        "unit": "lbs"
                              },
                              {
                                        "ingredient_id": 6,
                                        "quantity": 1.25,
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 16,
                                        "quantity": 0.25,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 17,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 18,
                                        "quantity": 0.25,
                                        "unit": "boxes"
                              },
                              {
                                        "ingredient_id": 10,
                                        "quantity": 1,
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 5,
                                        "quantity": 0.75,
                                        "unit": "gallons"
                              }
                    ],
                    "created_at": "2025-07-14T13:45:00.000Z"
          },
          {
                    "id": 5,
                    "title": "Grilled Chicken Breast with Broccoli",
                    "description": "Healthy grilled chicken breast served with roasted broccoli",
                    "type": "basic",
                    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                    "servings": 4,
                    "meal_type": "dinner",
                    "prep_time": 15,
                    "cook_time": 30,
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
                              "fresh",
                              "quick"
                    ],
                    "ingredients": [
                              {
                                        "ingredient_id": 1,
                                        "quantity": 1,
                                        "unit": "lbs"
                              },
                              {
                                        "ingredient_id": 6,
                                        "quantity": 1.75,
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 16,
                                        "quantity": 0.25,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 17,
                                        "quantity": 0.25,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 18,
                                        "quantity": 0.25,
                                        "unit": "boxes"
                              },
                              {
                                        "ingredient_id": 8,
                                        "quantity": 0.5,
                                        "unit": "bunches"
                              },
                              {
                                        "ingredient_id": 20,
                                        "quantity": 0.5,
                                        "unit": "gallons"
                              },
                              {
                                        "ingredient_id": 4,
                                        "quantity": 0.75,
                                        "unit": "containers"
                              }
                    ],
                    "created_at": "2025-07-30T14:15:00.000Z"
          },
          {
                    "id": 6,
                    "title": "Scrambled Eggs with Bread",
                    "description": "Simple breakfast with fluffy scrambled eggs and bread",
                    "type": "basic",
                    "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                    "servings": 2,
                    "meal_type": "breakfast",
                    "prep_time": 10,
                    "cook_time": 15,
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
                              "protein",
                              "fresh"
                    ],
                    "ingredients": [
                              {
                                        "ingredient_id": 4,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 19,
                                        "quantity": 0.75,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 17,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 15,
                                        "quantity": 1.75,
                                        "unit": "packages"
                              },
                              {
                                        "ingredient_id": 20,
                                        "quantity": 0.5,
                                        "unit": "gallons"
                              },
                              {
                                        "ingredient_id": 18,
                                        "quantity": 0.5,
                                        "unit": "boxes"
                              }
                    ],
                    "created_at": "2025-08-12T13:15:00.000Z"
          },
          {
                    "id": 7,
                    "title": "Scrambled Eggs with Bread",
                    "description": "Simple breakfast with fluffy scrambled eggs and bread",
                    "type": "basic",
                    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                    "servings": 2,
                    "meal_type": "breakfast",
                    "prep_time": 5,
                    "cook_time": 10,
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
                              "protein",
                              "hearty",
                              "easy"
                    ],
                    "ingredients": [
                              {
                                        "ingredient_id": 4,
                                        "quantity": 0.25,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 19,
                                        "quantity": 0.5,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 17,
                                        "quantity": 0.25,
                                        "unit": "containers"
                              },
                              {
                                        "ingredient_id": 15,
                                        "quantity": 1.25,
                                        "unit": "packages"
                              },
                              {
                                        "ingredient_id": 3,
                                        "quantity": 1.25,
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 2,
                                        "quantity": 1.5,
                                        "unit": "packages"
                              },
                              {
                                        "ingredient_id": 6,
                                        "quantity": 1.5,
                                        "unit": "pieces"
                              },
                              {
                                        "ingredient_id": 10,
                                        "quantity": 1.25,
                                        "unit": "pieces"
                              }
                    ],
                    "created_at": "2025-08-25T14:30:00.000Z"
          }
];
    }

    // ... rest of the DemoDataManager methods would go here
    // (keeping existing methods for getIngredients, getRecipes, etc.)
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.DemoDataManager = DemoDataManager;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemoDataManager;
}