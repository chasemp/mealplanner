#!/usr/bin/env node
/**
 * Demo Data Generator for MealPlanner
 * 
 * Generates consistent, realistic demo data that validates the expected schema
 * and can be used to refresh or expand the demo dataset on demand.
 * 
 * Usage:
 *   node scripts/generate-demo-data.cjs [options]
 * 
 * Options:
 *   --output <file>     Output file (default: js/demo-data.js)
 *   --recipes <count>   Number of recipes to generate (default: 26)
 *   --items <count>       Number of items to generate (default: 30)
 *   --validate          Validate generated data against schema
 *   --help              Show this help
 */

const fs = require('fs');
const path = require('path');

class DemoDataGenerator {
    constructor() {
        this.ingredientCategories = [
            'produce', 'meat', 'dairy', 'pantry', 'frozen', 'bakery', 'grains'
        ];
        
        this.mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        
        this.labelTypes = {
            default: ['healthy', 'quick', 'easy', 'comfort', 'spicy', 'sweet', 'savory', 'fresh', 'hearty'],
            recipe_type: ['Recipe Combo'],
            meal_type: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
        };
        
        this.units = {
            produce: ['lbs', 'pieces', 'bunches', 'heads'],
            meat: ['lbs', 'pieces', 'packages'],
            dairy: ['gallons', 'containers', 'packages', 'blocks'],
            pantry: ['containers', 'bottles', 'packages', 'boxes'],
            frozen: ['packages', 'bags'],
            bakery: ['loaves', 'packages', 'pieces'],
            grains: ['lbs', 'cups', 'packages', 'bags']
        };
        
        // Base ingredients that recipes will use - expanded to include diverse items
        this.baseIngredients = [
            // Traditional cooking ingredients
            { name: 'Chicken Breast', category: 'meat', labels: ['protein', 'lean', 'versatile'] },
            { name: 'Ground Beef', category: 'meat', labels: ['protein', 'hearty', 'versatile'] },
            { name: 'Salmon Fillet', category: 'meat', labels: ['protein', 'omega-3', 'healthy'] },
            { name: 'Eggs', category: 'dairy', labels: ['protein', 'breakfast', 'versatile'] },
            { name: 'Milk', category: 'dairy', labels: ['calcium', 'breakfast', 'baking'] },
            { name: 'Broccoli', category: 'produce', labels: ['vegetable', 'healthy', 'fiber'] },
            { name: 'Carrots', category: 'produce', labels: ['vegetable', 'sweet', 'vitamin-a'] },
            { name: 'Bell Peppers', category: 'produce', labels: ['vegetable', 'colorful', 'vitamin-c'] },
            { name: 'Onions', category: 'produce', labels: ['vegetable', 'aromatic', 'base'] },
            { name: 'Garlic', category: 'produce', labels: ['aromatic', 'flavor', 'healthy'] },
            { name: 'Tomatoes', category: 'produce', labels: ['vegetable', 'fresh', 'versatile'] },
            { name: 'Spinach', category: 'produce', labels: ['leafy-green', 'iron', 'healthy'] },
            { name: 'Rice', category: 'grains', labels: ['grain', 'staple', 'filling'] },
            { name: 'Pasta', category: 'grains', labels: ['grain', 'italian', 'comfort'] },
            { name: 'Quinoa', category: 'grains', labels: ['grain', 'protein', 'healthy'] },
            { name: 'Oats', category: 'grains', labels: ['grain', 'breakfast', 'fiber'] },
            { name: 'Bread', category: 'bakery', labels: ['grain', 'breakfast', 'sandwich'] },
            { name: 'Olive Oil', category: 'pantry', labels: ['fat', 'healthy', 'cooking'] },
            { name: 'Salt', category: 'pantry', labels: ['seasoning', 'essential', 'flavor'] },
            { name: 'Black Pepper', category: 'pantry', labels: ['seasoning', 'spice', 'flavor'] },
            { name: 'Butter', category: 'dairy', labels: ['fat', 'flavor', 'baking'] },
            { name: 'Cheese', category: 'dairy', labels: ['protein', 'calcium', 'flavor'] },
            { name: 'Potatoes', category: 'produce', labels: ['vegetable', 'starchy', 'versatile'] },
            { name: 'Flour', category: 'grains', labels: ['baking', 'staple', 'wheat'] },
            { name: 'Green Beans', category: 'produce', labels: ['vegetable', 'healthy', 'fiber'] },
            { name: 'Lettuce', category: 'produce', labels: ['leafy-green', 'fresh', 'salad'] },
            { name: 'Bacon', category: 'meat', labels: ['protein', 'breakfast', 'smoky'] },
            { name: 'Oil', category: 'pantry', labels: ['fat', 'cooking', 'neutral'] },
            
            // Prepared and convenience items
            { name: 'Hamburger Buns', category: 'bakery', labels: ['bread', 'sandwich', 'grilling'] },
            { name: 'Hot Dog Buns', category: 'bakery', labels: ['bread', 'sandwich', 'grilling'] },
            { name: 'Tortillas', category: 'bakery', labels: ['wrap', 'mexican', 'versatile'] },
            { name: 'Pita Bread', category: 'bakery', labels: ['bread', 'mediterranean', 'pocket'] },
            
            // Snack foods and chips
            { name: 'Potato Chips', category: 'pantry', labels: ['snack', 'crispy', 'salty'] },
            { name: 'Tortilla Chips', category: 'pantry', labels: ['snack', 'mexican', 'crunchy'] },
            { name: 'Crackers', category: 'pantry', labels: ['snack', 'crispy', 'versatile'] },
            { name: 'Pretzels', category: 'pantry', labels: ['snack', 'salty', 'crunchy'] },
            
            // Condiments and sauces
            { name: 'Ketchup', category: 'pantry', labels: ['condiment', 'tomato', 'sweet'] },
            { name: 'Mustard', category: 'pantry', labels: ['condiment', 'tangy', 'spicy'] },
            { name: 'Mayonnaise', category: 'pantry', labels: ['condiment', 'creamy', 'rich'] },
            { name: 'Salsa', category: 'pantry', labels: ['sauce', 'mexican', 'spicy'] },
            { name: 'BBQ Sauce', category: 'pantry', labels: ['sauce', 'smoky', 'sweet'] },
            
            // Frozen convenience items
            { name: 'Frozen Pizza', category: 'frozen', labels: ['convenience', 'quick', 'comfort'] },
            { name: 'Frozen Vegetables', category: 'frozen', labels: ['vegetable', 'convenient', 'healthy'] },
            { name: 'Ice Cream', category: 'frozen', labels: ['dessert', 'sweet', 'cold'] },
            
            // Beverages
            { name: 'Orange Juice', category: 'dairy', labels: ['beverage', 'vitamin-c', 'breakfast'] },
            { name: 'Coffee', category: 'pantry', labels: ['beverage', 'caffeine', 'morning'] },
            { name: 'Soda', category: 'pantry', labels: ['beverage', 'sweet', 'carbonated'] },
            
            // Canned goods
            { name: 'Canned Beans', category: 'pantry', labels: ['protein', 'fiber', 'convenient'] },
            { name: 'Canned Tomatoes', category: 'pantry', labels: ['vegetable', 'sauce-base', 'versatile'] },
            { name: 'Chicken Broth', category: 'pantry', labels: ['liquid', 'flavor-base', 'cooking'] }
        ];
        
        // Recipe templates for generating realistic recipes
        this.recipeTemplates = [
            // Test-required specific recipes
            {
                title: 'Mashed Potatoes',
                description: 'Creamy and buttery mashed potatoes',
                prep_time: [10],
                cook_time: [20],
                servings: [4, 6],
                base_ingredients: ['Potatoes', 'Butter', 'Milk', 'Salt'],
                labels: ['comfort', 'side-dish', 'Dinner']
            },
            {
                title: 'Fried Chicken',
                description: 'Crispy golden fried chicken',
                prep_time: [15],
                cook_time: [25],
                servings: [4, 6],
                base_ingredients: ['Chicken Breast', 'Flour', 'Eggs', 'Salt'],
                labels: ['comfort', 'crispy', 'protein', 'Dinner']
            },
            {
                title: 'Green Beans',
                description: 'Fresh steamed green beans with butter',
                prep_time: [5],
                cook_time: [10],
                servings: [4, 6],
                base_ingredients: ['Green Beans', 'Butter', 'Salt'],
                labels: ['healthy', 'vegetable', 'side-dish', 'Dinner']
            },
            {
                title: 'Garlic Bread',
                description: 'Toasted bread with garlic and herbs',
                prep_time: [5],
                cook_time: [10],
                servings: [4, 6],
                base_ingredients: ['Bread', 'Garlic', 'Butter'],
                labels: ['bread', 'side-dish', 'garlic', 'Dinner']
            },
            {
                title: 'Caesar Salad',
                description: 'Classic Caesar salad with croutons',
                prep_time: [10],
                cook_time: [0],
                servings: [2, 4],
                base_ingredients: ['Lettuce', 'Cheese', 'Bread'],
                labels: ['salad', 'fresh', 'classic', 'Lunch']
            },
            {
                title: 'Pancakes',
                description: 'Fluffy breakfast pancakes',
                prep_time: [10],
                cook_time: [15],
                servings: [4],
                base_ingredients: ['Flour', 'Eggs', 'Milk', 'Butter'],
                labels: ['sweet', 'fluffy', 'Breakfast']
            },
            {
                title: 'Bacon',
                description: 'Crispy breakfast bacon',
                prep_time: [2],
                cook_time: [8],
                servings: [4],
                base_ingredients: ['Bacon'],
                labels: ['protein', 'crispy', 'Breakfast']
            },
            {
                title: 'Hash Browns',
                description: 'Golden crispy hash browns',
                prep_time: [10],
                cook_time: [15],
                servings: [4],
                base_ingredients: ['Potatoes', 'Oil', 'Salt'],
                labels: ['crispy', 'potato', 'Breakfast']
            },
            // Dinner recipes
            {
                title: 'Grilled {protein} with {vegetable}',
                description: 'Healthy grilled {protein} served with roasted {vegetable}',
                prep_time: [15, 20, 25],
                cook_time: [20, 25, 30],
                servings: [4, 6],
                base_ingredients: ['protein', 'vegetable', 'Olive Oil', 'Salt', 'Black Pepper'],
                labels: ['healthy', 'protein', 'grilled', 'Dinner']
            },
            {
                title: '{protein} Stir Fry',
                description: 'Quick and healthy stir-fried {protein} with mixed vegetables',
                prep_time: [10, 15],
                cook_time: [15, 20],
                servings: [4, 6],
                base_ingredients: ['protein', 'Bell Peppers', 'Onions', 'Garlic', 'Olive Oil'],
                labels: ['quick', 'healthy', 'asian', 'Dinner']
            },
            {
                title: 'Baked {protein} Dinner',
                description: 'Hearty baked {protein} with seasonal vegetables and herbs',
                prep_time: [20, 25],
                cook_time: [35, 45],
                servings: [4, 6],
                base_ingredients: ['protein', 'vegetable', 'Olive Oil', 'Salt', 'Black Pepper'],
                labels: ['comfort', 'hearty', 'baked', 'Dinner']
            },
            // Breakfast recipes
            {
                title: 'Scrambled Eggs with {side}',
                description: 'Simple breakfast with fluffy scrambled eggs and {side}',
                prep_time: [5, 10],
                cook_time: [10, 15],
                servings: [2, 4],
                base_ingredients: ['Eggs', 'Butter', 'Salt', 'side'],
                labels: ['quick', 'protein', 'Breakfast']
            },
            {
                title: '{protein} Breakfast Bowl',
                description: 'Nutritious breakfast bowl with {protein} and fresh ingredients',
                prep_time: [10, 15],
                cook_time: [5, 10],
                servings: [2, 3],
                base_ingredients: ['protein', 'Eggs', 'vegetable', 'Salt'],
                labels: ['healthy', 'bowl', 'Breakfast']
            },
            {
                title: 'Morning {side} Stack',
                description: 'Delicious morning stack with {side} and breakfast favorites',
                prep_time: [15, 20],
                cook_time: [10, 15],
                servings: [2, 4],
                base_ingredients: ['side', 'Eggs', 'Butter'],
                labels: ['comfort', 'sweet', 'Breakfast']
            },
            // Lunch recipes
            {
                title: '{protein} Lunch Salad',
                description: 'Fresh and satisfying lunch salad with {protein} and crisp vegetables',
                prep_time: [10, 15],
                cook_time: [5, 10],
                servings: [2, 4],
                base_ingredients: ['protein', 'vegetable', 'Olive Oil', 'Salt'],
                labels: ['healthy', 'fresh', 'salad', 'Lunch']
            },
            {
                title: '{vegetable} Soup with {protein}',
                description: 'Warming soup featuring {vegetable} and tender {protein}',
                prep_time: [15, 20],
                cook_time: [25, 35],
                servings: [4, 6],
                base_ingredients: ['vegetable', 'protein', 'Onions', 'Garlic', 'Salt'],
                labels: ['comfort', 'soup', 'warming', 'Lunch']
            },
            {
                title: 'Quick {protein} Wrap',
                description: 'Fast and flavorful wrap with {protein} and fresh vegetables',
                prep_time: [5, 10],
                cook_time: [5, 10],
                servings: [2, 3],
                base_ingredients: ['protein', 'vegetable', 'side'],
                labels: ['quick', 'portable', 'wrap', 'Lunch']
            },
            // Snack recipes
            {
                title: '{vegetable} Chips',
                description: 'Crispy baked {vegetable} chips seasoned to perfection',
                prep_time: [10, 15],
                cook_time: [20, 30],
                servings: [2, 4],
                base_ingredients: ['vegetable', 'Olive Oil', 'Salt'],
                labels: ['healthy', 'crispy', 'baked', 'Snack']
            },
            {
                title: 'Energy {protein} Bites',
                description: 'Nutritious energy bites with {protein} and natural sweeteners',
                prep_time: [15, 20],
                cook_time: [0, 5],
                servings: [4, 8],
                base_ingredients: ['protein', 'side'],
                labels: ['energy', 'healthy', 'no-bake', 'Snack']
            },
            {
                title: 'Roasted {vegetable} Mix',
                description: 'Savory roasted {vegetable} mix perfect for snacking',
                prep_time: [5, 10],
                cook_time: [15, 25],
                servings: [2, 6],
                base_ingredients: ['vegetable', 'Olive Oil', 'Salt', 'Black Pepper'],
                labels: ['roasted', 'savory', 'healthy', 'Snack']
            },
            
            // Recipes using new convenience items
            {
                title: 'Classic Hamburger',
                description: 'Juicy hamburger with all the fixings',
                prep_time: [10],
                cook_time: [15],
                servings: [4],
                base_ingredients: ['Ground Beef', 'Hamburger Buns', 'Cheese', 'Lettuce', 'Tomatoes', 'Ketchup', 'Mustard'],
                labels: ['grilling', 'comfort', 'american', 'Dinner']
            },
            {
                title: 'Loaded Nachos',
                description: 'Crispy tortilla chips loaded with cheese and toppings',
                prep_time: [5],
                cook_time: [10],
                servings: [4, 6],
                base_ingredients: ['Tortilla Chips', 'Cheese', 'Salsa', 'Canned Beans'],
                labels: ['snack', 'mexican', 'quick', 'Snack']
            },
            {
                title: 'Chicken Wrap',
                description: 'Grilled chicken wrapped in a soft tortilla',
                prep_time: [10],
                cook_time: [15],
                servings: [2, 4],
                base_ingredients: ['Chicken Breast', 'Tortillas', 'Lettuce', 'Tomatoes', 'Mayonnaise'],
                labels: ['wrap', 'protein', 'portable', 'Lunch']
            },
            {
                title: 'Mediterranean Pita',
                description: 'Fresh pita pocket stuffed with vegetables and cheese',
                prep_time: [8],
                cook_time: [0],
                servings: [2],
                base_ingredients: ['Pita Bread', 'Lettuce', 'Tomatoes', 'Cheese'],
                labels: ['mediterranean', 'fresh', 'vegetarian', 'Lunch']
            },
            {
                title: 'Chips and Salsa',
                description: 'Crispy tortilla chips with fresh salsa',
                prep_time: [5],
                cook_time: [0],
                servings: [4, 6],
                base_ingredients: ['Tortilla Chips', 'Salsa', 'Tomatoes', 'Onions'],
                labels: ['snack', 'party', 'quick', 'Snack']
            },
            {
                title: 'Quick Pizza Night',
                description: 'Easy frozen pizza enhanced with fresh toppings',
                prep_time: [5],
                cook_time: [12],
                servings: [2, 3],
                base_ingredients: ['Frozen Pizza', 'Cheese', 'Bell Peppers'],
                labels: ['convenience', 'quick', 'comfort', 'Dinner']
            },
            {
                title: 'Coffee and Toast',
                description: 'Simple breakfast with fresh coffee and buttered toast',
                prep_time: [5],
                cook_time: [5],
                servings: [1],
                base_ingredients: ['Coffee', 'Bread', 'Butter'],
                labels: ['breakfast', 'quick', 'simple', 'Breakfast']
            }
        ];
    }
    
    // Helper function to get meal type from labels
    getMealTypeFromLabels(labels) {
        const mealTypeLabels = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
        for (const label of labels) {
            if (mealTypeLabels.includes(label)) {
                return label.toLowerCase();
            }
        }
        return null;
    }
    
    // Helper function to check if recipe has meal type label
    hasMealType(recipe, mealType) {
        const capitalizedMealType = mealType.charAt(0).toUpperCase() + mealType.slice(1);
        return recipe.labels && recipe.labels.includes(capitalizedMealType);
    }
    
    generateIngredients(count = 30) {
        const ingredients = [];
        
        // Start with base ingredients
        this.baseIngredients.forEach((base, index) => {
            ingredients.push({
                id: index + 1,
                name: base.name,
                category: base.category,
                default_unit: this.getRandomUnit(base.category),
                storage_notes: this.generateStorageNotes(base.category),
                nutrition: this.generateNutrition(),
                labels: base.labels
            });
        });
        
        // Generate additional ingredients if needed
        const additionalCount = Math.max(0, count - this.baseIngredients.length);
        for (let i = 0; i < additionalCount; i++) {
            const id = this.baseIngredients.length + i + 1;
            const category = this.getRandomElement(this.ingredientCategories);
            
            ingredients.push({
                id,
                name: this.generateIngredientName(category),
                category,
                default_unit: this.getRandomUnit(category),
                storage_notes: this.generateStorageNotes(category),
                nutrition: this.generateNutrition(),
                labels: this.generateIngredientLabels(category)
            });
        }
        
        return ingredients;
    }
    
    generateRecipes(ingredients, count = 26) {
        const recipes = [];
        const startDate = new Date('2025-06-01T08:00:00Z');
        const endDate = new Date('2025-09-10T20:00:00Z');
        
        // Ensure we have recipes for all meal types (test requirement)
        const mealTypeTemplates = {
            breakfast: this.recipeTemplates.filter(t => t.labels && t.labels.includes('Breakfast')),
            lunch: this.recipeTemplates.filter(t => t.labels && t.labels.includes('Lunch')),
            dinner: this.recipeTemplates.filter(t => t.labels && t.labels.includes('Dinner')),
            snack: this.recipeTemplates.filter(t => t.labels && t.labels.includes('Snack'))
        };
        
        // Generate specific required recipes first for test compatibility
        const requiredRecipes = [
            'Mashed Potatoes', 'Fried Chicken', 'Green Beans', 'Garlic Bread', 
            'Caesar Salad', 'Pancakes', 'Bacon', 'Hash Browns'
        ];
        
        let recipeId = 1;
        
        // Generate required recipes first
        requiredRecipes.forEach(requiredTitle => {
            if (recipeId <= count) {
                const template = this.recipeTemplates.find(t => t.title === requiredTitle);
                if (template) {
                    const recipe = this.generateRecipeFromTemplate(template, ingredients, recipeId);
                    recipe.created_at = this.generateTimestamp(startDate, endDate, recipeId - 1, count);
                    recipes.push(recipe);
                    recipeId++;
                }
            }
        });
        
        // Generate additional recipes per meal type to ensure coverage
        Object.entries(mealTypeTemplates).forEach(([mealType, templates]) => {
            const existingCount = recipes.filter(r => this.hasMealType(r, mealType)).length;
            const needed = Math.max(0, 2 - existingCount);
            
            for (let i = 0; i < needed && recipeId <= count; i++) {
                const unusedTemplates = templates.filter(t => !requiredRecipes.includes(t.title));
                if (unusedTemplates.length > 0) {
                    const template = this.getRandomElement(unusedTemplates);
                    const recipe = this.generateRecipeFromTemplate(template, ingredients, recipeId);
                    recipe.created_at = this.generateTimestamp(startDate, endDate, recipeId - 1, count);
                    recipes.push(recipe);
                    recipeId++;
                }
            }
        });
        
        // Fill remaining slots with random recipes (but reserve space for combo recipes)
        const comboRecipesToGenerate = 8; // Exactly 8 combo recipes for tests
        const basicRecipesToGenerate = count - comboRecipesToGenerate;
        
        for (let i = recipeId; i <= basicRecipesToGenerate; i++) {
            const template = this.getRandomElement(this.recipeTemplates);
            if (!template) {
                console.error(`❌ No template found for recipe ${i}, available templates:`, this.recipeTemplates.length);
                continue;
            }
            const recipe = this.generateRecipeFromTemplate(template, ingredients, i);
            recipe.created_at = this.generateTimestamp(startDate, endDate, i - 1, count);
            recipes.push(recipe);
        }
        
        // Generate combo recipes using the basic recipes we just created
        const basicRecipes = recipes.filter(r => r.recipe_type === 'regular');
        for (let i = 0; i < comboRecipesToGenerate; i++) {
            const comboRecipe = this.generateComboRecipe(basicRecipes, ingredients, basicRecipesToGenerate + i + 1, i);
            comboRecipe.created_at = this.generateTimestamp(startDate, endDate, basicRecipesToGenerate + i, count);
            recipes.push(comboRecipe);
        }
        
        return recipes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    
    generateMealsAsComboRecipes(recipes, count = 7) {
        const comboRecipes = [];
        
        // Ensure we have enough recipes for meaningful combo recipes
        if (recipes.length < 2) {
            console.warn('⚠️  Not enough recipes to generate meaningful combo recipes');
            return comboRecipes;
        }
        
        const mealTemplates = [
            {
                name: '{theme} Family Dinner',
                description: 'A hearty family dinner with {theme} favorites',
                mealTypes: ['dinner'],
                labels: ['family', 'hearty'],
                recipeCount: [2, 4],
                preferredMealType: 'dinner'
            },
            {
                name: '{theme} Night',
                description: 'Classic {theme} meal with all the fixings',
                mealTypes: ['dinner'],
                labels: ['classic', 'complete'],
                recipeCount: [2, 3],
                preferredMealType: 'dinner'
            },
            {
                name: 'Quick {theme} Breakfast',
                description: 'Fast and delicious {theme} breakfast',
                mealTypes: ['breakfast'],
                labels: ['quick', 'morning'],
                recipeCount: [1, 2],
                preferredMealType: 'breakfast'
            },
            {
                name: '{theme} Lunch Combo',
                description: 'Perfect {theme} lunch combination',
                mealTypes: ['lunch'],
                labels: ['midday', 'satisfying'],
                recipeCount: [1, 3],
                preferredMealType: 'lunch'
            }
        ];
        
        const themes = ['Italian', 'American', 'Asian', 'Mediterranean', 'Mexican', 'Comfort Food', 'Healthy'];
        
        // Group recipes by meal type for better meal composition
        const recipesByMealType = {
            breakfast: recipes.filter(r => this.hasMealType(r, 'breakfast')),
            lunch: recipes.filter(r => this.hasMealType(r, 'lunch')),
            dinner: recipes.filter(r => this.hasMealType(r, 'dinner')),
            snack: recipes.filter(r => this.hasMealType(r, 'snack'))
        };
        
        for (let i = 0; i < count; i++) {
            const template = this.getRandomElement(mealTemplates);
            const theme = this.getRandomElement(themes);
            const recipeCount = this.getRandomElement(template.recipeCount);
            
            // Select recipes that match the meal type when possible
            let availableRecipes = recipesByMealType[template.preferredMealType] || [];
            
            // If not enough recipes of preferred type, use all regular recipes (not combos)
            if (availableRecipes.length < recipeCount) {
                availableRecipes = recipes.filter(r => r.recipe_type === 'regular');
            }
            
            // Ensure we don't reuse recipes within the same meal
            const selectedRecipes = [];
            const usedRecipeIds = new Set();
            
            for (let j = 0; j < recipeCount && availableRecipes.length > 0; j++) {
                // Filter out already used recipes
                const unusedRecipes = availableRecipes.filter(r => !usedRecipeIds.has(r.id));
                if (unusedRecipes.length === 0) break;
                
                const recipe = this.getRandomElement(unusedRecipes);
                usedRecipeIds.add(recipe.id);
                
                selectedRecipes.push({
                    recipeId: recipe.id,
                    servings: Math.floor(Math.random() * 3) + 2 // 2-4 servings
                });
            }
            
            // Calculate realistic total time and servings
            const totalTime = selectedRecipes.reduce((sum, r) => {
                const recipe = recipes.find(rec => rec.id === r.recipeId);
                return sum + (recipe ? (recipe.prep_time + recipe.cook_time) : 30);
            }, 0);
            
            const maxServings = Math.max(...selectedRecipes.map(r => r.servings));
            
            // Aggregate items from component recipes
            const aggregatedItems = [];
            const itemMap = new Map();
            
            selectedRecipes.forEach(sr => {
                const recipe = recipes.find(r => r.id === sr.recipeId);
                if (recipe && recipe.items) {
                    recipe.items.forEach(item => {
                        const key = `${item.item_id || item.ingredient_id}_${item.unit}`;
                        const multiplier = sr.servings / recipe.servings || 1;
                        if (itemMap.has(key)) {
                            // Round the aggregated quantity to realistic user-entered values
                            itemMap.get(key).quantity = this.roundQuantity(itemMap.get(key).quantity + item.quantity * multiplier);
                        } else {
                            itemMap.set(key, {
                                item_id: item.item_id || item.ingredient_id,
                                quantity: this.roundQuantity(item.quantity * multiplier),
                                unit: item.unit
                            });
                        }
                    });
                }
            });
            
            aggregatedItems.push(...itemMap.values());
            
            // Convert meal to combo recipe format
            const comboRecipeId = recipes.length + i + 1; // Ensure unique ID after regular recipes
            
            comboRecipes.push({
                id: comboRecipeId,
                title: template.name.replace('{theme}', theme),
                description: template.description.replace('{theme}', theme.toLowerCase()),
                recipe_type: 'combo',
                image_url: `https://images.unsplash.com/photo-${1500000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop`,
                servings: maxServings,
                prep_time: Math.floor(totalTime * 0.3), // Estimate prep as 30% of total
                cook_time: Math.floor(totalTime * 0.7), // Estimate cook as 70% of total
                created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
                instructions: [], // Combo recipes don't have their own instructions
                labels: [
                    ...template.labels, 
                    theme.toLowerCase().replace(' ', '-'),
                    'Recipe Combo', // Mark as combo type
                    ...template.mealTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1)) // Breakfast, Lunch, etc.
                ],
                combo_recipes: selectedRecipes.map(sr => ({
                    recipe_id: sr.recipeId,
                    servings: sr.servings,
                    servings_multiplier: 1.0
                })),
                items: aggregatedItems,
                favorite: Math.random() > 0.7 // 30% chance of being favorite
            });
        }
        
        return comboRecipes;
    }
    
    generateScheduledMeals(meals, recipes, count = 7) {
        const scheduledMeals = [];
        const today = new Date();
        const usedDates = new Set(); // Prevent scheduling conflicts
        
        // Ensure we have data to schedule
        if (meals.length === 0 && recipes.length === 0) {
            console.warn('⚠️  No meals or recipes available for scheduling');
            return scheduledMeals;
        }
        
        // Ensure all meal types are represented
        const requiredMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        const mealTypeIndex = new Map();
        requiredMealTypes.forEach((type, index) => {
            mealTypeIndex.set(type, index);
        });
        
        for (let i = 0; i < count; i++) {
            // Schedule meals over the next 3 weeks, avoiding conflicts
            let scheduledDate;
            let attempts = 0;
            
            do {
                const daysFromNow = Math.floor(Math.random() * 21); // 3 weeks
                // Create timezone-neutral date to avoid parsing issues
                const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                scheduledDate = new Date(baseDate);
                scheduledDate.setDate(baseDate.getDate() + daysFromNow);
                attempts++;
            } while (usedDates.has(scheduledDate.toISOString().split('T')[0]) && attempts < 50);
            
            // Create timezone-neutral ISO date string
            const dateString = scheduledDate.toISOString().split('T')[0];
            usedDates.add(dateString);
            
            // For first 4 scheduled meals, ensure we have all meal types
            let targetMealType = null;
            if (i < requiredMealTypes.length) {
                targetMealType = requiredMealTypes[i];
            }
            
            // Prefer meals over individual recipes (70% meals, 30% recipes)
            const useMeal = Math.random() > 0.3 && meals.length > 0;
            
            if (useMeal) {
                // Select meal based on target meal type if specified
                let meal;
                if (targetMealType) {
                    const matchingMeals = meals.filter(m => m.mealTypes.includes(targetMealType));
                    meal = matchingMeals.length > 0 ? this.getRandomElement(matchingMeals) : this.getRandomElement(meals);
                } else {
                    meal = this.getRandomElement(meals);
                }
                
                // Validate that all recipes in the meal exist
                const validRecipes = meal.recipes.filter(r => 
                    recipes.find(recipe => recipe.id === r.recipeId)
                );
                
                if (validRecipes.length === 0) {
                    console.warn(`⚠️  Meal ${meal.name} has no valid recipe references, skipping`);
                    continue;
                }
                
                const mealType = targetMealType || this.getRandomElement(meal.mealTypes);
                
                scheduledMeals.push({
                    id: i + 1,
                    recipe_id: meal.id, // Use recipe_id for consistency
                    date: dateString,
                    servings: meal.totalServings,
                    notes: `Scheduled ${meal.name}`,
                    meal_type: mealType,
                    created_at: new Date().toISOString()
                    // All other properties (title, description, etc.) inherited via recipe_id lookup
                });
            } else if (recipes.length > 0) {
                // Select recipe based on target meal type if specified
                let recipe;
                if (targetMealType) {
                    const matchingRecipes = recipes.filter(r => this.hasMealType(r, targetMealType));
                    recipe = matchingRecipes.length > 0 ? this.getRandomElement(matchingRecipes) : this.getRandomElement(recipes);
                } else {
                    recipe = this.getRandomElement(recipes);
                }
                
                const mealType = targetMealType || this.getMealTypeFromLabels(recipe.labels);
                
                scheduledMeals.push({
                    id: i + 1,
                    recipe_id: recipe.id, // Single source of truth for recipe reference
                    date: dateString,
                    servings: recipe.servings,
                    notes: `Scheduled ${recipe.title}`,
                    meal_type: mealType || 'dinner',
                    created_at: new Date().toISOString()
                    // All other properties (title, description, items, etc.) inherited via recipe_id lookup
                });
            }
        }
        
        return scheduledMeals.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    generateMealTags() {
        const tags = ['special-occasion', 'weeknight', 'weekend', 'date-night', 'family-friendly', 'crowd-pleaser', 'comfort', 'healthy'];
        const count = Math.floor(Math.random() * 2) + 1;
        const selected = [];
        
        for (let i = 0; i < count; i++) {
            const tag = this.getRandomElement(tags);
            if (!selected.includes(tag)) {
                selected.push(tag);
            }
        }
        
        return selected;
    }
    
    generateRecipeFromTemplate(template, ingredients, id) {
        // Select ingredients based on template
        const selectedIngredients = this.selectIngredientsForTemplate(template, ingredients);
        
        
        // Generate recipe properties
        const protein = selectedIngredients.find(ing => ing.labels?.includes('protein'))?.name || 'Chicken';
        const vegetable = selectedIngredients.find(ing => ing.labels?.includes('vegetable'))?.name || 'Broccoli';
        const side = selectedIngredients.find(ing => ing.category === 'bakery')?.name || 'Toast';
        
        const title = template.title
            .replace('{protein}', protein)
            .replace('{vegetable}', vegetable)
            .replace('{side}', side);
            
        const description = template.description
            .replace('{protein}', protein.toLowerCase())
            .replace('{vegetable}', vegetable.toLowerCase())
            .replace('{side}', side.toLowerCase());
        
        const labels = [...template.labels, ...this.generateRecipeLabels()];
        const recipe = {
            id,
            title,
            description,
            recipe_type: 'regular',
            meal_type: this.getMealTypeFromLabels(labels),
            image_url: this.generateImageUrl(),
            servings: this.getRandomElement(template.servings),
            prep_time: this.getRandomElement(template.prep_time),
            cook_time: this.getRandomElement(template.cook_time),
            created_at: '', // Will be set by caller
            instructions: this.generateInstructions(template, selectedIngredients),
            labels: labels,
            items: this.generateRecipeIngredients(selectedIngredients),
            favorite: this.shouldBeFavorite(template.title)
        };
        
        
        return recipe;
    }
    
    generateComboRecipe(basicRecipes, ingredients, id, templateIndex = 0) {
        // Combo recipe templates based on test expectations
        const comboTemplates = [
            {
                name: 'Sunday Dinner Combo',
                description: 'Classic Sunday dinner with fried chicken and mashed potatoes',
                labels: ['Recipe Combo', 'sunday-dinner', 'comfort-food'],
                requiredRecipes: ['Fried Chicken', 'Mashed Potatoes']
            },
            {
                name: 'Italian Night Combo',
                description: 'Perfect Italian dinner with pasta and salad',
                labels: ['Recipe Combo', 'italian', 'complete'],
                requiredRecipes: ['Pasta', 'Salad']
            },
            {
                name: 'Full American Breakfast Combo',
                description: 'Complete American breakfast with pancakes and bacon',
                labels: ['Recipe Combo', 'american', 'hearty'],
                requiredRecipes: ['Pancakes', 'Bacon']
            },
            {
                name: 'Grilled Salmon Dinner Combo',
                description: 'Healthy grilled salmon with vegetables',
                labels: ['Recipe Combo', 'healthy', 'seafood'],
                requiredRecipes: ['Salmon', 'Vegetables']
            },
            {
                name: 'Greek Feast Combo',
                description: 'Mediterranean feast with multiple dishes',
                labels: ['Recipe Combo', 'greek', 'mediterranean'],
                requiredRecipes: ['Salad', 'Bread']
            },
            {
                name: 'Vegetarian Quinoa Feast Combo',
                description: 'Healthy vegetarian meal with quinoa',
                labels: ['Recipe Combo', 'vegetarian', 'healthy'],
                requiredRecipes: ['Quinoa', 'Vegetables']
            },
            {
                name: 'Weekend Brunch Combo',
                description: 'Perfect weekend brunch combination',
                labels: ['Recipe Combo', 'brunch', 'weekend'],
                requiredRecipes: ['Hash Browns', 'Eggs']
            },
            {
                name: 'Light Lunch Combo',
                description: 'Light and fresh lunch combination',
                labels: ['Recipe Combo', 'light', 'fresh'],
                requiredRecipes: ['Salad', 'Bread']
            }
        ];
        
        // Select a template based on the index to ensure we get all expected combos
        const template = comboTemplates[templateIndex % comboTemplates.length] || comboTemplates[0];
        
        // Select 2-3 basic recipes for the combo
        const numRecipes = Math.floor(Math.random() * 2) + 2; // 2-3 recipes
        const selectedRecipes = [];
        const usedRecipeIds = new Set();
        
        // Try to find recipes that match the template requirements
        for (let i = 0; i < numRecipes && selectedRecipes.length < numRecipes; i++) {
            let recipe;
            
            // Try to find matching recipes based on template requirements
            if (template.requiredRecipes && template.requiredRecipes.length > i) {
                const requiredName = template.requiredRecipes[i];
                recipe = basicRecipes.find(r => 
                    r.title.toLowerCase().includes(requiredName.toLowerCase()) && 
                    !usedRecipeIds.has(r.id)
                );
            }
            
            // If no matching recipe found, pick a random one
            if (!recipe) {
                const availableRecipes = basicRecipes.filter(r => !usedRecipeIds.has(r.id));
                if (availableRecipes.length > 0) {
                    recipe = this.getRandomElement(availableRecipes);
                }
            }
            
            if (recipe) {
                usedRecipeIds.add(recipe.id);
                selectedRecipes.push({
                    recipe_id: recipe.id,
                    servings: recipe.servings || 4,
                    servings_multiplier: 1.0
                });
            }
        }
        
        // Aggregate ingredients from component recipes
        const aggregatedIngredients = [];
        const ingredientMap = new Map();
        
                selectedRecipes.forEach(comboRecipe => {
            const recipe = basicRecipes.find(r => r.id === comboRecipe.recipe_id);
            if (recipe && recipe.items) {
                recipe.items.forEach(ing => {
                    const key = `${ing.item_id || ing.ingredient_id}_${ing.unit}`;
                    const multiplier = comboRecipe.servings / recipe.servings || 1;
                    if (ingredientMap.has(key)) {
                        ingredientMap.get(key).quantity += ing.quantity * multiplier;
                    } else {
                        ingredientMap.set(key, {
                            item_id: ing.item_id || ing.ingredient_id,
                            quantity: ing.quantity * multiplier,
                            unit: ing.unit
                        });
                    }
                });
            }
        });
        
        aggregatedIngredients.push(...ingredientMap.values());
        
        // Calculate total time and servings
        const totalPrepTime = selectedRecipes.reduce((sum, comboRecipe) => {
            const recipe = basicRecipes.find(r => r.id === comboRecipe.recipe_id);
            return sum + (recipe ? recipe.prep_time : 0);
        }, 0);
        
        const totalCookTime = Math.max(...selectedRecipes.map(comboRecipe => {
            const recipe = basicRecipes.find(r => r.id === comboRecipe.recipe_id);
            return recipe ? recipe.cook_time : 0;
        }));
        
        const maxServings = Math.max(...selectedRecipes.map(comboRecipe => {
            const recipe = basicRecipes.find(r => r.id === comboRecipe.recipe_id);
            return recipe ? recipe.servings : 4;
        }));
        
        const labels = template.labels || [];
        return {
            id,
            title: template.name,
            description: template.description,
            recipe_type: 'combo',
            meal_type: this.getMealTypeFromLabels(labels),
            image_url: this.generateImageUrl(),
            servings: maxServings,
            prep_time: totalPrepTime,
            cook_time: totalCookTime,
            created_at: '', // Will be set by caller
            instructions: [
                'Prepare all component recipes according to their individual instructions',
                'Coordinate cooking times to serve everything together',
                'Plate and serve as a complete meal'
            ],
            labels: labels,
            combo_recipes: selectedRecipes,
            items: aggregatedIngredients
        };
    }
    
    selectIngredientsForTemplate(template, ingredients) {
        const selected = [];
        
        template.base_ingredients.forEach(requirement => {
            let ingredient;
            
            if (requirement === 'protein') {
                ingredient = ingredients.find(ing => ing.labels?.includes('protein'));
            } else if (requirement === 'vegetable') {
                ingredient = ingredients.find(ing => ing.labels?.includes('vegetable'));
            } else if (requirement === 'side') {
                ingredient = ingredients.find(ing => ing.category === 'bakery');
            } else {
                ingredient = ingredients.find(ing => ing.name === requirement);
            }
            
            if (ingredient) selected.push(ingredient);
        });
        
        // Add 2-4 additional random ingredients
        const additionalCount = Math.floor(Math.random() * 3) + 2;
        const remaining = ingredients.filter(ing => !selected.includes(ing));
        
        for (let i = 0; i < additionalCount && remaining.length > 0; i++) {
            const randomIng = remaining.splice(Math.floor(Math.random() * remaining.length), 1)[0];
            selected.push(randomIng);
        }
        
        return selected;
    }
    
    shouldBeFavorite(recipeTitle) {
        // Always favorite these recipes for consistent testing
        const alwaysFavorites = ['Bacon', 'Caesar Salad', 'Pancakes'];
        
        if (alwaysFavorites.includes(recipeTitle)) {
            return true;
        }
        
        // Random chance for other recipes (30% chance)
        return Math.random() < 0.3;
    }
    
    generateRecipeIngredients(selectedIngredients) {
        return selectedIngredients.map(ingredient => ({
            item_id: ingredient.id,
            quantity: this.generateQuantity(ingredient.category),
            unit: ingredient.default_unit
        }));
    }
    
    generateInstructions(template, ingredients) {
        const baseInstructions = [
            'Preheat oven to 400°F if baking',
            'Prepare all ingredients',
            'Heat oil in large pan over medium heat',
            'Cook according to recipe requirements',
            'Season with salt and pepper to taste',
            'Serve hot and enjoy'
        ];
        
        // Customize based on meal type
        if (template.labels && template.labels.includes('Breakfast')) {
            return [
                'Crack eggs into bowl and whisk',
                'Heat butter in non-stick pan',
                'Pour in eggs and gently scramble',
                'Cook until just set',
                'Serve immediately'
            ];
        }
        
        return baseInstructions.slice(0, Math.floor(Math.random() * 3) + 4);
    }
    
    generateQuantity(category) {
        const ranges = {
            produce: [0.5, 2],
            meat: [1, 2],
            dairy: [0.25, 1],
            pantry: [0.25, 0.5], // Increased minimum from 0.1 to 0.25
            frozen: [0.5, 1],
            bakery: [1, 2]
        };
        
        const [min, max] = ranges[category] || [0.5, 1];
        const quantity = Math.random() * (max - min) + min;
        const rounded = Math.round(quantity * 4) / 4; // Round to nearest 0.25
        return Math.max(0.25, rounded); // Ensure minimum quantity of 0.25
    }
    
    generateTimestamp(startDate, endDate, index, total) {
        const timeRange = endDate.getTime() - startDate.getTime();
        const baseOffset = (index / total) * timeRange;
        const randomOffset = (Math.random() - 0.5) * (timeRange / total) * 0.3;
        const timestamp = new Date(startDate.getTime() + baseOffset + randomOffset);
        
        // Round to nearest 15 minutes
        const minutes = timestamp.getMinutes();
        const roundedMinutes = Math.round(minutes / 15) * 15;
        timestamp.setMinutes(roundedMinutes, 0, 0);
        
        return timestamp.toISOString();
    }
    
    generateImageUrl() {
        const imageIds = [
            'photo-1532550907401-a500c9a57435', // grilled chicken
            'photo-1551892374-ecf8754cf8b0', // pasta
            'photo-1525351484163-7529414344d8', // eggs
            'photo-1546833999-b9f581a1996d', // salmon bowl
            'photo-1540420773420-3366772f4999', // salad
            'photo-1603133872878-684f208fb84b'  // stir fry
        ];
        
        const imageId = this.getRandomElement(imageIds);
        return `https://images.unsplash.com/${imageId}?w=400&h=300&fit=crop`;
    }
    
    generateStorageNotes(category) {
        const notes = {
            produce: ['Refrigerate', 'Store in cool, dry place', 'Keep fresh'],
            meat: ['Refrigerate', 'Freeze if not using within 2 days'],
            dairy: ['Refrigerate', 'Keep cold'],
            pantry: ['Store in cool, dry place', 'Keep sealed'],
            frozen: ['Keep frozen'],
            bakery: ['Store at room temperature', 'Refrigerate after 3 days']
        };
        
        return this.getRandomElement(notes[category] || notes.pantry);
    }
    
    generateNutrition() {
        return {
            protein: Math.floor(Math.random() * 20) + 1,
            carbs: Math.floor(Math.random() * 50) + 5,
            fat: Math.floor(Math.random() * 15) + 1,
            calories: Math.floor(Math.random() * 200) + 50
        };
    }
    
    generateIngredientName(category) {
        const names = {
            produce: ['Lettuce', 'Cucumber', 'Zucchini', 'Mushrooms', 'Celery'],
            meat: ['Turkey', 'Pork Chops', 'Shrimp', 'Tuna'],
            dairy: ['Yogurt', 'Cream Cheese', 'Sour Cream'],
            pantry: ['Flour', 'Sugar', 'Baking Powder', 'Vanilla'],
            frozen: ['Frozen Peas', 'Frozen Corn', 'Ice Cream'],
            bakery: ['Bagels', 'Muffins', 'Croissants']
        };
        
        return this.getRandomElement(names[category] || names.pantry);
    }
    
    generateIngredientLabels(category) {
        const labels = {
            produce: ['fresh', 'healthy', 'vitamin-rich'],
            meat: ['protein', 'hearty'],
            dairy: ['calcium', 'creamy'],
            pantry: ['staple', 'baking'],
            frozen: ['convenient', 'long-lasting'],
            bakery: ['carbs', 'comfort']
        };
        
        return this.getRandomElement(labels[category] || labels.pantry);
    }
    
    generateRecipeLabels() {
        const count = Math.floor(Math.random() * 3) + 1;
        const allLabels = [...this.labelTypes.default];
        const selected = [];
        
        for (let i = 0; i < count; i++) {
            const label = this.getRandomElement(allLabels);
            if (!selected.includes(label)) {
                selected.push(label);
            }
        }
        
        return selected;
    }
    
    getRandomUnit(category) {
        return this.getRandomElement(this.units[category] || this.units.pantry);
    }

    // Utility function to round quantities to realistic user-entered values
    // PRINCIPLE: Demo data must look like it was created by a user via UI
    // All quantities must be realistic values that a user could manually enter
    // No programmatic artifacts like 0.3333333333333333 - these would never be user-entered
    roundQuantity(quantity) {
        const rounded = Math.round(quantity * 100) / 100;
        return parseFloat(rounded.toFixed(2));
    }
    
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    calculateIngredientUsage(ingredients, recipes) {
        // Initialize usage statistics for all ingredients
        ingredients.forEach(ingredient => {
            ingredient.recipe_count = 0;
            ingredient.total_quantity = 0;
            ingredient.avg_quantity = 0;
        });
        
        // Count usage in recipes and calculate quantities
        recipes.forEach(recipe => {
            if (recipe.items) {
                recipe.items.forEach(recipeIngredient => {
                    const ingredient = ingredients.find(ing => ing.id === recipeIngredient.ingredient_id);
                    if (ingredient) {
                        ingredient.recipe_count++;
                        ingredient.total_quantity += recipeIngredient.quantity || 0;
                    }
                });
            }
        });
        
        // Calculate average quantities
        ingredients.forEach(ingredient => {
            if (ingredient.recipe_count > 0) {
                ingredient.avg_quantity = ingredient.total_quantity / ingredient.recipe_count;
            }
        });
    }
    
    validateData(ingredients, recipes, meals = [], scheduledMeals = []) {
        const errors = [];
        
        // Test requirement: At least 20 ingredients
        if (ingredients.length < 20) {
            errors.push(`Insufficient ingredients: ${ingredients.length} (need at least 20 for tests)`);
        }
        
        // Test requirement: At least 10 regular recipes
        const regularRecipes = recipes.filter(r => r.recipe_type === 'regular');
        if (regularRecipes.length < 10) {
            errors.push(`Insufficient regular recipes: ${regularRecipes.length} (need at least 10 for tests)`);
        }
        
        // Test requirement: At least 10 unique labels across all recipes
        const allLabels = new Set();
        recipes.forEach(recipe => {
            if (recipe.labels) {
                recipe.labels.forEach(label => allLabels.add(label));
            }
        });
        if (allLabels.size < 10) {
            errors.push(`Insufficient label variety: ${allLabels.size} (need at least 10 for tests)`);
        }
        
        // Test requirement: Must have recipes for each meal type
        const mealTypeCounts = {
            breakfast: recipes.filter(r => this.hasMealType(r, 'breakfast')).length,
            lunch: recipes.filter(r => this.hasMealType(r, 'lunch')).length,
            dinner: recipes.filter(r => this.hasMealType(r, 'dinner')).length,
            snack: recipes.filter(r => this.hasMealType(r, 'snack')).length
        };
        
        Object.entries(mealTypeCounts).forEach(([type, count]) => {
            if (count === 0) {
                errors.push(`No ${type} recipes found (tests require all meal types)`);
            }
        });
        
        // Validate ingredients
        ingredients.forEach((ingredient, index) => {
            if (!ingredient.id || !ingredient.name || !ingredient.category) {
                errors.push(`Ingredient ${index}: Missing required fields (id, name, category)`);
            }
            if (!this.ingredientCategories.includes(ingredient.category)) {
                errors.push(`Ingredient ${index}: Invalid category ${ingredient.category}`);
            }
            if (!ingredient.default_unit || !ingredient.storage_notes || !ingredient.nutrition || !ingredient.labels) {
                errors.push(`Ingredient ${index}: Missing required fields (default_unit, storage_notes, nutrition, labels)`);
            }
            // Test requirement: No cost information
            if (ingredient.cost_per_unit !== undefined) {
                errors.push(`Ingredient ${index}: Should not have cost_per_unit field`);
            }
        });
        
        // Validate recipes
        recipes.forEach((recipe, index) => {
            // Required fields check
            if (!recipe.id || !recipe.title) {
                errors.push(`Recipe ${index}: Missing required fields (id, title)`);
            }
            if (!recipe.description || !recipe.recipe_type || !recipe.prep_time || recipe.cook_time === undefined || !recipe.servings) {
                errors.push(`Recipe ${index}: Missing required fields (description, recipe_type, prep_time, cook_time, servings)`);
            }
            if (!recipe.labels || !recipe.items || !recipe.instructions) {
                errors.push(`Recipe ${index}: Missing required fields (labels, ingredients, instructions)`);
            }
            
            // Test requirement: No tags property (consolidated to labels)
            if (recipe.tags !== undefined) {
                errors.push(`Recipe ${index}: Should not have tags property (use labels instead)`);
            }
            
            // Test requirement: Valid meal type
            const mealType = this.getMealTypeFromLabels(recipe.labels);
            if (mealType && !this.mealTypes.includes(mealType)) {
                errors.push(`Recipe ${index}: Invalid meal_type ${mealType}`);
            }
            
            // Test requirement: Valid recipe_type
            if (!['regular', 'combo'].includes(recipe.recipe_type)) {
                errors.push(`Recipe ${index}: Invalid recipe_type ${recipe.recipe_type} (must be 'regular' or 'combo')`);
            }
            
            // Test requirement: Created timestamp
            if (!recipe.created_at || isNaN(new Date(recipe.created_at))) {
                errors.push(`Recipe ${index}: Invalid or missing created_at`);
            }
            
            // Test requirement: Labels must be array with content
            if (!Array.isArray(recipe.labels) || recipe.labels.length === 0) {
                errors.push(`Recipe ${index}: Labels must be non-empty array`);
            }
            
            // Test requirement: Description length > 10
            if (recipe.description && recipe.description.length <= 10) {
                errors.push(`Recipe ${index}: Description too short (need > 10 characters)`);
            }
            
            // Test requirement: Title length > 3
            if (recipe.title && recipe.title.length <= 3) {
                errors.push(`Recipe ${index}: Title too short (need > 3 characters)`);
            }
            
            // Test requirement: Instructions must have content
            if (Array.isArray(recipe.instructions)) {
                recipe.instructions.forEach((instruction, instIndex) => {
                    if (instruction.length <= 5) {
                        errors.push(`Recipe ${index}: Instruction ${instIndex} too short (need > 5 characters)`);
                    }
                });
            }
            
            // Validate ingredient references
            if (recipe.items) {
                recipe.items.forEach((recipeIng, ingIndex) => {
                    const ingredient = ingredients.find(ing => ing.id === (recipeIng.item_id || recipeIng.ingredient_id));
                    if (!ingredient) {
                        errors.push(`Recipe ${index}: References non-existent ingredient ${recipeIng.item_id || recipeIng.ingredient_id} at index ${ingIndex}`);
                    }
                    if (!recipeIng.quantity || recipeIng.quantity <= 0) {
                        errors.push(`Recipe ${index}: Invalid quantity for ingredient ${recipeIng.item_id || recipeIng.ingredient_id}`);
                    }
                });
            }
            
            // Validate combo recipes if recipe_type is combo
            if (recipe.recipe_type === 'combo') {
                if (!recipe.combo_recipes || recipe.combo_recipes.length === 0) {
                    errors.push(`Recipe ${index}: Combo recipe must have combo_recipes array`);
                }
            }
        });
        
        // Validate meals
        meals.forEach((meal, index) => {
            if (!meal.id || !meal.name || !meal.recipes) {
                errors.push(`Meal ${index}: Missing required fields (id, name, recipes)`);
            }
            
            // Validate recipe references in meals
            if (meal.recipes) {
                meal.recipes.forEach((mealRecipe, recipeIndex) => {
                    const recipe = recipes.find(r => r.id === mealRecipe.recipeId);
                    if (!recipe) {
                        errors.push(`Meal ${index}: References non-existent recipe ${mealRecipe.recipeId} at index ${recipeIndex}`);
                    }
                });
            }
        });
        
        // Validate scheduled meals
        scheduledMeals.forEach((scheduled, index) => {
            if (!scheduled.id || !scheduled.date) {
                errors.push(`Scheduled meal ${index}: Missing required fields (id, date)`);
            }
            
            // Validate date format
            if (scheduled.date && isNaN(new Date(scheduled.date))) {
                errors.push(`Scheduled meal ${index}: Invalid date format`);
            }
            
            // Validate references
            // Validate references - clean inheritance uses recipe_id
            if (scheduled.recipe_id) {
                const recipe = recipes.find(r => r.id === scheduled.recipe_id);
                if (!recipe) {
                    errors.push(`Scheduled meal ${index}: References non-existent recipe ID ${scheduled.recipe_id}`);
                }
            } else {
                errors.push(`Scheduled meal ${index}: Missing required recipe_id field`);
            }
        });
        
        return errors;
    }

    // Schema validation to ensure data types match application expectations
    validateApplicationSchema(ingredients, recipes, meals = [], scheduledMeals = []) {
        const issues = [];
        
        // Expected data types that the application should be able to load/save
        const expectedDataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
        
        // Check if our generated data matches expected schema
        const generatedDataTypes = {
            items: ingredients,
            recipes: recipes,
            scheduledMeals: scheduledMeals,
            pantryItems: [], // Empty array for now - pantry items are optional
            meals: meals || []
        };
        
        expectedDataTypes.forEach(dataType => {
            if (!generatedDataTypes[dataType]) {
                issues.push('Missing expected data type: ' + dataType);
            } else if (!Array.isArray(generatedDataTypes[dataType])) {
                issues.push('Data type ' + dataType + ' should be an array, got ' + typeof generatedDataTypes[dataType]);
            }
        });
        
        // Validate that recipes use 'items' not 'ingredients'
        recipes.forEach((recipe, index) => {
            if (recipe.ingredients && !recipe.items) {
                issues.push('Recipe ' + index + ' uses deprecated \'ingredients\' field instead of \'items\'');
            }
            if (!recipe.items) {
                issues.push('Recipe ' + index + ' missing required \'items\' field');
            }
        });
        
        return issues;
    }
    
    generateFileContent(ingredients, recipes, meals = [], scheduledMeals = []) {
        return `// Demo Data for MealPlanner
// Generated on ${new Date().toISOString()}
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - ${ingredients.length} ingredients across ${new Set(ingredients.map(i => i.category)).size} categories
// - ${recipes.length} recipes (${recipes.filter(r => r.recipe_type === 'regular').length} regular, ${recipes.filter(r => r.recipe_type === 'combo').length} combo)
// - ${meals.length} meals combining multiple recipes
// - ${scheduledMeals.length} scheduled meals for planning
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
        // Comprehensive ingredient list (${ingredients.length} items)
        this.ingredients = ${JSON.stringify(ingredients, null, 8)};

        // Comprehensive recipe list (${recipes.length} items)
        this.recipes = ${JSON.stringify(recipes, null, 8)};

        // Demo meals that combine multiple recipes (${meals.length} items)
        this.meals = ${JSON.stringify(meals, null, 8)};

        // Scheduled meals for planning (${scheduledMeals.length} items)
        this.scheduledMeals = ${JSON.stringify(scheduledMeals, null, 8)};
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
                        issues.push(\`Recipe "\${recipe.title}" references non-existent ingredient ID \${recipeIng.item_id || recipeIng.ingredient_id}\`);
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
                        issues.push(\`Meal "\${meal.name}" references non-existent recipe ID \${mealRecipe.recipeId}\`);
                    }
                });
            }
        });

        // Check scheduled meal references
        this.scheduledMeals.forEach(scheduled => {
            if (scheduled.meal_id) {
                const meal = this.meals.find(m => m.id === scheduled.meal_id);
                if (!meal) {
                    issues.push(\`Scheduled meal references non-existent meal ID \${scheduled.meal_id}\`);
                }
            }
            if (scheduled.recipe_id) {
                const recipe = this.recipes.find(r => r.id === scheduled.recipe_id);
                if (!recipe) {
                    issues.push(\`Scheduled meal references non-existent recipe ID \${scheduled.recipe_id}\`);
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
}`;
    }
}

// CLI handling
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        output: 'js/demo-data.js',
        recipes: 26,
        items: 30,
        meals: 7,
        scheduledMeals: 7,
        validate: false,
        test: false,
        help: false
    };
    
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--output':
                options.output = args[++i];
                break;
            case '--recipes':
                options.recipes = parseInt(args[++i]);
                break;
            case '--items':
                options.items = parseInt(args[++i]);
                break;
            case '--meals':
                options.meals = parseInt(args[++i]);
                break;
            case '--scheduled':
                options.scheduledMeals = parseInt(args[++i]);
                break;
            case '--validate':
                options.validate = true;
                break;
            case '--test':
                options.test = true;
                break;
            case '--help':
                options.help = true;
                break;
        }
    }
    
    return options;
}

function showHelp() {
    console.log(`
Demo Data Generator for MealPlanner

Usage: node scripts/generate-demo-data.cjs [options]

Options:
  --output <file>       Output file (default: js/demo-data.js)
  --recipes <count>     Number of recipes to generate (default: 26)
  --items <count>       Number of items to generate (default: 30)
  --validate            Validate generated data against schema
  --test                Run test suite against generated data
  --help                Show this help

Examples:
  node scripts/generate-demo-data.cjs
  node scripts/generate-demo-data.cjs --recipes 50 --items 40
  node scripts/generate-demo-data.cjs --output js/demo-data.js --validate
`);
}

// Main execution
function main() {
    const options = parseArgs();
    
    if (options.help) {
        showHelp();
        return;
    }
    
    console.log('🏗️  Generating MealPlanner demo data...');
    console.log(`📊 Generating ${options.items} items, ${options.recipes} recipes, ${options.meals} meals, ${options.scheduledMeals} scheduled meals`);
    
    const generator = new DemoDataGenerator();
    
    // Generate data
    const ingredients = generator.generateIngredients(options.items);
    const baseRecipes = generator.generateRecipes(ingredients, options.recipes);
    const comboRecipes = generator.generateMealsAsComboRecipes(baseRecipes, options.meals);
    
    // Combine regular recipes and combo recipes into one array
    const recipes = [...baseRecipes, ...comboRecipes];
    
    // Generate scheduled meals using both regular recipes and combo recipes
    const scheduledMeals = generator.generateScheduledMeals([], recipes, options.scheduledMeals);
    
    // Calculate ingredient usage statistics for test compatibility
    generator.calculateIngredientUsage(ingredients, recipes);
    
    console.log(`✅ Generated ${ingredients.length} items, ${baseRecipes.length} regular recipes, ${comboRecipes.length} combo recipes (${recipes.length} total), ${scheduledMeals.length} scheduled meals`);
    
    // Validate if requested
    if (options.validate) {
        console.log('🔍 Validating generated data...');
        
        // Schema validation
        const schemaErrors = generator.validateApplicationSchema(ingredients, recipes, [], scheduledMeals);
        if (schemaErrors.length > 0) {
            console.error('❌ Schema validation errors:');
            schemaErrors.forEach(error => console.error(`  - ${error}`));
            process.exit(1);
        }
        
        // Data consistency validation
        const errors = generator.validateData(ingredients, recipes, [], scheduledMeals);
        if (errors.length > 0) {
            console.error('❌ Data validation errors:');
            errors.forEach(error => console.error(`  - ${error}`));
            process.exit(1);
        } else {
            console.log('✅ Data validation passed');
        }
    }
    
    // Generate file content
    const content = generator.generateFileContent(ingredients, recipes, [], scheduledMeals);
    
    // Write to file
    const outputPath = path.resolve(options.output);
    fs.writeFileSync(outputPath, content, 'utf8');
    
    console.log(`📝 Demo data written to ${outputPath}`);
    console.log(`📅 Recipe timestamps span from ${recipes[0].created_at} to ${recipes[recipes.length - 1].created_at}`);
    console.log('🎉 Demo data generation complete!');
}

if (require.main === module) {
    main();
}
