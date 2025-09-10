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
 *   --output <file>     Output file (default: js/demo-data-generated.js)
 *   --recipes <count>   Number of recipes to generate (default: 26)
 *   --ingredients <count> Number of ingredients to generate (default: 30)
 *   --validate          Validate generated data against schema
 *   --help              Show this help
 */

const fs = require('fs');
const path = require('path');

class DemoDataGenerator {
    constructor() {
        this.ingredientCategories = [
            'produce', 'meat', 'dairy', 'pantry', 'frozen', 'bakery'
        ];
        
        this.mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        
        this.labelTypes = {
            default: ['healthy', 'quick', 'easy', 'comfort', 'spicy', 'sweet', 'savory', 'fresh', 'hearty'],
            recipe_type: ['Recipe Combo', 'basic', 'advanced', 'beginner']
        };
        
        this.units = {
            produce: ['lbs', 'pieces', 'bunches', 'heads'],
            meat: ['lbs', 'pieces', 'packages'],
            dairy: ['gallons', 'containers', 'packages', 'blocks'],
            pantry: ['containers', 'bottles', 'packages', 'boxes'],
            frozen: ['packages', 'bags'],
            bakery: ['loaves', 'packages', 'pieces']
        };
        
        // Base ingredients that recipes will use
        this.baseIngredients = [
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
            { name: 'Rice', category: 'pantry', labels: ['grain', 'staple', 'filling'] },
            { name: 'Pasta', category: 'pantry', labels: ['grain', 'italian', 'comfort'] },
            { name: 'Bread', category: 'bakery', labels: ['grain', 'breakfast', 'sandwich'] },
            { name: 'Olive Oil', category: 'pantry', labels: ['fat', 'healthy', 'cooking'] },
            { name: 'Salt', category: 'pantry', labels: ['seasoning', 'essential', 'flavor'] },
            { name: 'Black Pepper', category: 'pantry', labels: ['seasoning', 'spice', 'flavor'] },
            { name: 'Butter', category: 'dairy', labels: ['fat', 'flavor', 'baking'] },
            { name: 'Cheese', category: 'dairy', labels: ['protein', 'calcium', 'flavor'] }
        ];
        
        // Recipe templates for generating realistic recipes
        this.recipeTemplates = [
            // Dinner recipes
            {
                title: 'Grilled {protein} with {vegetable}',
                description: 'Healthy grilled {protein} served with roasted {vegetable}',
                meal_type: 'dinner',
                prep_time: [15, 20, 25],
                cook_time: [20, 25, 30],
                servings: [4, 6],
                base_ingredients: ['protein', 'vegetable', 'Olive Oil', 'Salt', 'Black Pepper'],
                labels: ['healthy', 'protein', 'grilled']
            },
            {
                title: '{protein} Stir Fry',
                description: 'Quick and healthy stir-fried {protein} with mixed vegetables',
                meal_type: 'dinner',
                prep_time: [10, 15],
                cook_time: [15, 20],
                servings: [4, 6],
                base_ingredients: ['protein', 'Bell Peppers', 'Onions', 'Garlic', 'Olive Oil'],
                labels: ['quick', 'healthy', 'asian']
            },
            {
                title: 'Baked {protein} Dinner',
                description: 'Hearty baked {protein} with seasonal vegetables and herbs',
                meal_type: 'dinner',
                prep_time: [20, 25],
                cook_time: [35, 45],
                servings: [4, 6],
                base_ingredients: ['protein', 'vegetable', 'Olive Oil', 'Salt', 'Black Pepper'],
                labels: ['comfort', 'hearty', 'baked']
            },
            // Breakfast recipes
            {
                title: 'Scrambled Eggs with {side}',
                description: 'Simple breakfast with fluffy scrambled eggs and {side}',
                meal_type: 'breakfast',
                prep_time: [5, 10],
                cook_time: [10, 15],
                servings: [2, 4],
                base_ingredients: ['Eggs', 'Butter', 'Salt', 'side'],
                labels: ['breakfast', 'quick', 'protein']
            },
            {
                title: '{protein} Breakfast Bowl',
                description: 'Nutritious breakfast bowl with {protein} and fresh ingredients',
                meal_type: 'breakfast',
                prep_time: [10, 15],
                cook_time: [5, 10],
                servings: [2, 3],
                base_ingredients: ['protein', 'Eggs', 'vegetable', 'Salt'],
                labels: ['breakfast', 'healthy', 'bowl']
            },
            {
                title: 'Morning {side} Stack',
                description: 'Delicious morning stack with {side} and breakfast favorites',
                meal_type: 'breakfast',
                prep_time: [15, 20],
                cook_time: [10, 15],
                servings: [2, 4],
                base_ingredients: ['side', 'Eggs', 'Butter'],
                labels: ['breakfast', 'comfort', 'sweet']
            },
            // Lunch recipes
            {
                title: '{protein} Lunch Salad',
                description: 'Fresh and satisfying lunch salad with {protein} and crisp vegetables',
                meal_type: 'lunch',
                prep_time: [10, 15],
                cook_time: [5, 10],
                servings: [2, 4],
                base_ingredients: ['protein', 'vegetable', 'Olive Oil', 'Salt'],
                labels: ['lunch', 'healthy', 'fresh', 'salad']
            },
            {
                title: '{vegetable} Soup with {protein}',
                description: 'Warming soup featuring {vegetable} and tender {protein}',
                meal_type: 'lunch',
                prep_time: [15, 20],
                cook_time: [25, 35],
                servings: [4, 6],
                base_ingredients: ['vegetable', 'protein', 'Onions', 'Garlic', 'Salt'],
                labels: ['lunch', 'comfort', 'soup', 'warming']
            },
            {
                title: 'Quick {protein} Wrap',
                description: 'Fast and flavorful wrap with {protein} and fresh vegetables',
                meal_type: 'lunch',
                prep_time: [5, 10],
                cook_time: [5, 10],
                servings: [2, 3],
                base_ingredients: ['protein', 'vegetable', 'side'],
                labels: ['lunch', 'quick', 'portable', 'wrap']
            },
            // Snack recipes
            {
                title: '{vegetable} Chips',
                description: 'Crispy baked {vegetable} chips seasoned to perfection',
                meal_type: 'snack',
                prep_time: [10, 15],
                cook_time: [20, 30],
                servings: [2, 4],
                base_ingredients: ['vegetable', 'Olive Oil', 'Salt'],
                labels: ['snack', 'healthy', 'crispy', 'baked']
            },
            {
                title: 'Energy {protein} Bites',
                description: 'Nutritious energy bites with {protein} and natural sweeteners',
                meal_type: 'snack',
                prep_time: [15, 20],
                cook_time: [0, 5],
                servings: [4, 8],
                base_ingredients: ['protein', 'side'],
                labels: ['snack', 'energy', 'healthy', 'no-bake']
            },
            {
                title: 'Roasted {vegetable} Mix',
                description: 'Savory roasted {vegetable} mix perfect for snacking',
                meal_type: 'snack',
                prep_time: [5, 10],
                cook_time: [15, 25],
                servings: [2, 6],
                base_ingredients: ['vegetable', 'Olive Oil', 'Salt', 'Black Pepper'],
                labels: ['snack', 'roasted', 'savory', 'healthy']
            }
        ];
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
            breakfast: this.recipeTemplates.filter(t => t.meal_type === 'breakfast'),
            lunch: this.recipeTemplates.filter(t => t.meal_type === 'lunch'),
            dinner: this.recipeTemplates.filter(t => t.meal_type === 'dinner'),
            snack: this.recipeTemplates.filter(t => t.meal_type === 'snack')
        };
        
        // Generate at least 2 recipes per meal type first
        let recipeId = 1;
        Object.entries(mealTypeTemplates).forEach(([mealType, templates]) => {
            for (let i = 0; i < 2 && recipeId <= count; i++) {
                const template = this.getRandomElement(templates);
                const recipe = this.generateRecipeFromTemplate(template, ingredients, recipeId);
                recipe.created_at = this.generateTimestamp(startDate, endDate, recipeId - 1, count);
                recipes.push(recipe);
                recipeId++;
            }
        });
        
        // Fill remaining slots with random recipes
        for (let i = recipeId; i <= count; i++) {
            const template = this.getRandomElement(this.recipeTemplates);
            if (!template) {
                console.error(`❌ No template found for recipe ${i}, available templates:`, this.recipeTemplates.length);
                continue;
            }
            const recipe = this.generateRecipeFromTemplate(template, ingredients, i);
            recipe.created_at = this.generateTimestamp(startDate, endDate, i - 1, count);
            recipes.push(recipe);
        }
        
        return recipes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    
    generateMeals(recipes, count = 7) {
        const meals = [];
        
        // Ensure we have enough recipes for meaningful meals
        if (recipes.length < 2) {
            console.warn('⚠️  Not enough recipes to generate meaningful meals');
            return meals;
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
            breakfast: recipes.filter(r => r.meal_type === 'breakfast'),
            lunch: recipes.filter(r => r.meal_type === 'lunch'),
            dinner: recipes.filter(r => r.meal_type === 'dinner'),
            snack: recipes.filter(r => r.meal_type === 'snack')
        };
        
        for (let i = 0; i < count; i++) {
            const template = this.getRandomElement(mealTemplates);
            const theme = this.getRandomElement(themes);
            const recipeCount = this.getRandomElement(template.recipeCount);
            
            // Select recipes that match the meal type when possible
            let availableRecipes = recipesByMealType[template.preferredMealType] || [];
            
            // If not enough recipes of preferred type, use all recipes
            if (availableRecipes.length < recipeCount) {
                availableRecipes = [...recipes];
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
            
            meals.push({
                id: i + 1,
                name: template.name.replace('{theme}', theme),
                description: template.description.replace('{theme}', theme.toLowerCase()),
                recipes: selectedRecipes,
                totalServings: maxServings,
                mealTypes: template.mealTypes,
                labels: [...template.labels, theme.toLowerCase().replace(' ', '-')],
                tags: this.generateMealTags(),
                estimatedTime: totalTime,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString()
            });
        }
        
        return meals;
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
        
        for (let i = 0; i < count; i++) {
            // Schedule meals over the next 3 weeks, avoiding conflicts
            let scheduledDate;
            let attempts = 0;
            
            do {
                const daysFromNow = Math.floor(Math.random() * 21); // 3 weeks
                scheduledDate = new Date(today);
                scheduledDate.setDate(today.getDate() + daysFromNow);
                attempts++;
            } while (usedDates.has(scheduledDate.toISOString().split('T')[0]) && attempts < 50);
            
            const dateString = scheduledDate.toISOString().split('T')[0];
            usedDates.add(dateString);
            
            // Prefer meals over individual recipes (70% meals, 30% recipes)
            const useMeal = Math.random() > 0.3 && meals.length > 0;
            
            if (useMeal) {
                const meal = this.getRandomElement(meals);
                
                // Validate that all recipes in the meal exist
                const validRecipes = meal.recipes.filter(r => 
                    recipes.find(recipe => recipe.id === r.recipeId)
                );
                
                if (validRecipes.length === 0) {
                    console.warn(`⚠️  Meal ${meal.name} has no valid recipe references, skipping`);
                    continue;
                }
                
                scheduledMeals.push({
                    id: i + 1,
                    meal_id: meal.id,
                    scheduled_date: dateString,
                    meal_type: this.getRandomElement(meal.mealTypes),
                    servings: meal.totalServings,
                    notes: `Scheduled ${meal.name}`,
                    recipes: validRecipes, // Only include valid recipes
                    recipe_id: validRecipes[0]?.recipeId, // For backward compatibility
                    total_time: meal.estimatedTime,
                    created_at: new Date().toISOString()
                });
            } else if (recipes.length > 0) {
                const recipe = this.getRandomElement(recipes);
                scheduledMeals.push({
                    id: i + 1,
                    recipe_id: recipe.id,
                    scheduled_date: dateString,
                    meal_type: recipe.meal_type,
                    servings: recipe.servings,
                    notes: `Scheduled ${recipe.title}`,
                    recipes: [{ recipeId: recipe.id, servings: recipe.servings }],
                    total_time: (recipe.prep_time || 0) + (recipe.cook_time || 0),
                    created_at: new Date().toISOString()
                });
            }
        }
        
        return scheduledMeals.sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));
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
        
        const recipe = {
            id,
            title,
            description,
            type: 'basic',
            image_url: this.generateImageUrl(),
            servings: this.getRandomElement(template.servings),
            meal_type: template.meal_type,
            prep_time: this.getRandomElement(template.prep_time),
            cook_time: this.getRandomElement(template.cook_time),
            created_at: '', // Will be set by caller
            instructions: this.generateInstructions(template, selectedIngredients),
            labels: [...template.labels, ...this.generateRecipeLabels()],
            ingredients: this.generateRecipeIngredients(selectedIngredients)
        };
        
        
        return recipe;
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
    
    generateRecipeIngredients(selectedIngredients) {
        return selectedIngredients.map(ingredient => ({
            ingredient_id: ingredient.id,
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
        if (template.meal_type === 'breakfast') {
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
    
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    validateData(ingredients, recipes, meals = [], scheduledMeals = []) {
        const errors = [];
        
        // Test requirement: At least 20 ingredients
        if (ingredients.length < 20) {
            errors.push(`Insufficient ingredients: ${ingredients.length} (need at least 20 for tests)`);
        }
        
        // Test requirement: At least 10 basic recipes
        const basicRecipes = recipes.filter(r => r.type === 'basic');
        if (basicRecipes.length < 10) {
            errors.push(`Insufficient basic recipes: ${basicRecipes.length} (need at least 10 for tests)`);
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
            breakfast: recipes.filter(r => r.meal_type === 'breakfast').length,
            lunch: recipes.filter(r => r.meal_type === 'lunch').length,
            dinner: recipes.filter(r => r.meal_type === 'dinner').length,
            snack: recipes.filter(r => r.meal_type === 'snack').length
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
            if (!recipe.id || !recipe.title || !recipe.meal_type) {
                errors.push(`Recipe ${index}: Missing required fields (id, title, meal_type)`);
            }
            if (!recipe.description || !recipe.type || !recipe.prep_time || recipe.cook_time === undefined || !recipe.servings) {
                errors.push(`Recipe ${index}: Missing required fields (description, type, prep_time, cook_time, servings)`);
            }
            if (!recipe.labels || !recipe.ingredients || !recipe.instructions) {
                errors.push(`Recipe ${index}: Missing required fields (labels, ingredients, instructions)`);
            }
            
            // Test requirement: No tags property (consolidated to labels)
            if (recipe.tags !== undefined) {
                errors.push(`Recipe ${index}: Should not have tags property (use labels instead)`);
            }
            
            // Test requirement: Valid meal type
            if (!this.mealTypes.includes(recipe.meal_type)) {
                errors.push(`Recipe ${index}: Invalid meal_type ${recipe.meal_type}`);
            }
            
            // Test requirement: Valid type
            if (!['basic', 'combo'].includes(recipe.type)) {
                errors.push(`Recipe ${index}: Invalid type ${recipe.type} (must be 'basic' or 'combo')`);
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
            if (recipe.ingredients) {
                recipe.ingredients.forEach((recipeIng, ingIndex) => {
                    const ingredient = ingredients.find(ing => ing.id === recipeIng.ingredient_id);
                    if (!ingredient) {
                        errors.push(`Recipe ${index}: References non-existent ingredient ${recipeIng.ingredient_id} at index ${ingIndex}`);
                    }
                    if (!recipeIng.quantity || recipeIng.quantity <= 0) {
                        errors.push(`Recipe ${index}: Invalid quantity for ingredient ${recipeIng.ingredient_id}`);
                    }
                });
            }
            
            // Validate combo recipes if type is combo
            if (recipe.type === 'combo') {
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
            if (!scheduled.id || !scheduled.scheduled_date) {
                errors.push(`Scheduled meal ${index}: Missing required fields (id, scheduled_date)`);
            }
            
            // Validate date format
            if (scheduled.scheduled_date && isNaN(new Date(scheduled.scheduled_date))) {
                errors.push(`Scheduled meal ${index}: Invalid scheduled_date format`);
            }
            
            // Validate references
            if (scheduled.meal_id) {
                const meal = meals.find(m => m.id === scheduled.meal_id);
                if (!meal) {
                    errors.push(`Scheduled meal ${index}: References non-existent meal ${scheduled.meal_id}`);
                }
            }
            
            if (scheduled.recipe_id) {
                const recipe = recipes.find(r => r.id === scheduled.recipe_id);
                if (!recipe) {
                    errors.push(`Scheduled meal ${index}: References non-existent recipe ${scheduled.recipe_id}`);
                }
            }
        });
        
        return errors;
    }
    
    generateFileContent(ingredients, recipes, meals = [], scheduledMeals = []) {
        return `// Demo Data for MealPlanner
// Generated on ${new Date().toISOString()}
// This file contains realistic demo data that validates the expected schema
// 
// Data Summary:
// - ${ingredients.length} ingredients across ${new Set(ingredients.map(i => i.category)).size} categories
// - ${recipes.length} recipes (${recipes.filter(r => r.type === 'basic').length} basic, ${recipes.filter(r => r.type === 'combo').length} combo)
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
                        issues.push(\`Recipe "\${recipe.title}" references non-existent ingredient ID \${recipeIng.ingredient_id}\`);
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
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    console.log('📱 Making DemoDataManager globally available...');
    window.DemoDataManager = DemoDataManager;
    console.log('📱 window.DemoDataManager set:', !!window.DemoDataManager);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DemoDataGenerator };
}`;
    }
}

// CLI handling
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        output: 'js/demo-data-generated.js',
        recipes: 26,
        ingredients: 30,
        meals: 7,
        scheduledMeals: 7,
        validate: false,
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
            case '--ingredients':
                options.ingredients = parseInt(args[++i]);
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
  --output <file>       Output file (default: js/demo-data-generated.js)
  --recipes <count>     Number of recipes to generate (default: 26)
  --ingredients <count> Number of ingredients to generate (default: 30)
  --validate            Validate generated data against schema
  --help                Show this help

Examples:
  node scripts/generate-demo-data.cjs
  node scripts/generate-demo-data.cjs --recipes 50 --ingredients 40
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
    console.log(`📊 Generating ${options.ingredients} ingredients, ${options.recipes} recipes, ${options.meals} meals, ${options.scheduledMeals} scheduled meals`);
    
    const generator = new DemoDataGenerator();
    
    // Generate data
    const ingredients = generator.generateIngredients(options.ingredients);
    const recipes = generator.generateRecipes(ingredients, options.recipes);
    const meals = generator.generateMeals(recipes, options.meals);
    const scheduledMeals = generator.generateScheduledMeals(meals, recipes, options.scheduledMeals);
    
    console.log(`✅ Generated ${ingredients.length} ingredients, ${recipes.length} recipes, ${meals.length} meals, ${scheduledMeals.length} scheduled meals`);
    
    // Validate if requested
    if (options.validate) {
        console.log('🔍 Validating generated data...');
        const errors = generator.validateData(ingredients, recipes, meals, scheduledMeals);
        
        if (errors.length > 0) {
            console.error('❌ Validation errors:');
            errors.forEach(error => console.error(`  - ${error}`));
            process.exit(1);
        } else {
            console.log('✅ Data validation passed');
        }
    }
    
    // Generate file content
    const content = generator.generateFileContent(ingredients, recipes, meals, scheduledMeals);
    
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
