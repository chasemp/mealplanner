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
                title: 'Scrambled Eggs with {side}',
                description: 'Simple breakfast with fluffy scrambled eggs and {side}',
                meal_type: 'breakfast',
                prep_time: [5, 10],
                cook_time: [10, 15],
                servings: [2, 4],
                base_ingredients: ['Eggs', 'Butter', 'Salt', 'side'],
                labels: ['breakfast', 'quick', 'protein']
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
        
        for (let i = 0; i < count; i++) {
            const template = this.getRandomElement(this.recipeTemplates);
            const recipe = this.generateRecipeFromTemplate(template, ingredients, i + 1);
            
            // Add realistic creation timestamp
            recipe.created_at = this.generateTimestamp(startDate, endDate, i, count);
            
            recipes.push(recipe);
        }
        
        return recipes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
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
        
        return {
            id,
            title,
            description,
            type: 'basic',
            image_url: this.generateImageUrl(),
            servings: this.getRandomElement(template.servings),
            meal_type: template.meal_type,
            prep_time: this.getRandomElement(template.prep_time),
            cook_time: this.getRandomElement(template.cook_time),
            instructions: this.generateInstructions(template, selectedIngredients),
            labels: [...template.labels, ...this.generateRecipeLabels()],
            ingredients: this.generateRecipeIngredients(selectedIngredients)
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
            pantry: [0.1, 0.5],
            frozen: [0.5, 1],
            bakery: [1, 2]
        };
        
        const [min, max] = ranges[category] || [0.5, 1];
        return Math.round((Math.random() * (max - min) + min) * 4) / 4; // Round to nearest 0.25
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
    
    validateData(ingredients, recipes) {
        const errors = [];
        
        // Validate ingredients
        ingredients.forEach((ingredient, index) => {
            if (!ingredient.id || !ingredient.name || !ingredient.category) {
                errors.push(`Ingredient ${index}: Missing required fields`);
            }
            if (!this.ingredientCategories.includes(ingredient.category)) {
                errors.push(`Ingredient ${index}: Invalid category ${ingredient.category}`);
            }
        });
        
        // Validate recipes
        recipes.forEach((recipe, index) => {
            if (!recipe.id || !recipe.title || !recipe.meal_type) {
                errors.push(`Recipe ${index}: Missing required fields`);
            }
            if (!this.mealTypes.includes(recipe.meal_type)) {
                errors.push(`Recipe ${index}: Invalid meal_type ${recipe.meal_type}`);
            }
            if (!recipe.created_at || isNaN(new Date(recipe.created_at))) {
                errors.push(`Recipe ${index}: Invalid or missing created_at`);
            }
            
            // Validate ingredient references
            recipe.ingredients?.forEach(recipeIng => {
                const ingredient = ingredients.find(ing => ing.id === recipeIng.ingredient_id);
                if (!ingredient) {
                    errors.push(`Recipe ${index}: References non-existent ingredient ${recipeIng.ingredient_id}`);
                }
            });
        });
        
        return errors;
    }
    
    generateFileContent(ingredients, recipes) {
        return `// Demo Data for MealPlanner
// Generated on ${new Date().toISOString()}
// This file contains realistic demo data that validates the expected schema

class DemoDataManager {
    constructor() {
        console.log('📱 DemoDataManager constructor called');
        this.initializeRawData();
    }

    initializeRawData() {
        // Comprehensive ingredient list
        this.ingredients = ${JSON.stringify(ingredients, null, 12)};

        // Comprehensive recipe list that uses the ingredients above
        this.recipes = ${JSON.stringify(recipes, null, 12)};
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
    console.log(`📊 Generating ${options.ingredients} ingredients and ${options.recipes} recipes`);
    
    const generator = new DemoDataGenerator();
    
    // Generate data
    const ingredients = generator.generateIngredients(options.ingredients);
    const recipes = generator.generateRecipes(ingredients, options.recipes);
    
    console.log(`✅ Generated ${ingredients.length} ingredients and ${recipes.length} recipes`);
    
    // Validate if requested
    if (options.validate) {
        console.log('🔍 Validating generated data...');
        const errors = generator.validateData(ingredients, recipes);
        
        if (errors.length > 0) {
            console.error('❌ Validation errors:');
            errors.forEach(error => console.error(`  - ${error}`));
            process.exit(1);
        } else {
            console.log('✅ Data validation passed');
        }
    }
    
    // Generate file content
    const content = generator.generateFileContent(ingredients, recipes);
    
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
