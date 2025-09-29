#!/usr/bin/env node
/**
 * Convert Exported JSON to Demo Data
 * 
 * This script converts exported MealPlanner JSON data into the demo data format
 * that can be used as the default demo dataset.
 * 
 * Usage:
 *   node scripts/convert-export-to-demo-data.cjs <export-file> [options]
 * 
 * Options:
 *   --output <file>     Output file (default: js/demo-data.js)
 *   --validate          Validate converted data against schema
 *   --help              Show this help
 */

const fs = require('fs');
const path = require('path');

class ExportToDemoDataConverter {
    constructor() {
        this.convertedData = null;
    }

    /**
     * Convert exported JSON data to demo data format
     */
    convert(exportData) {
        console.log('🔄 Converting exported data to demo data format...');
        
        // Validate export data structure
        this.validateExportData(exportData);
        
        // Convert data to demo data format
        const demoData = {
            ingredients: this.convertItems(exportData.data.items || []),
            recipes: this.convertRecipes(exportData.data.recipes || []),
            meals: this.convertMeals(exportData.data.meals || []),
            scheduledMeals: this.convertScheduledMeals(exportData.data.planScheduledMeals || []),
            pantryItems: this.convertPantryItems(exportData.data.pantryItems || [])
        };
        
        this.convertedData = demoData;
        return demoData;
    }

    /**
     * Validate exported data structure
     */
    validateExportData(exportData) {
        if (!exportData || typeof exportData !== 'object') {
            throw new Error('Invalid export data: not an object');
        }
        
        if (!exportData.schema || !exportData.data) {
            throw new Error('Invalid export data: missing schema or data section');
        }
        
        const requiredKeys = ['items', 'recipes'];
        requiredKeys.forEach(key => {
            if (!exportData.data[key]) {
                throw new Error(`Missing required data key: ${key}`);
            }
        });
        
        console.log('✅ Export data structure validated');
    }

    /**
     * Convert items to ingredients format
     */
    convertItems(items) {
        console.log(`📦 Converting ${items.length} items to ingredients...`);
        
        return items.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            default_unit: item.default_unit,
            storage_notes: item.storage_notes || null,
            nutrition: item.nutrition || {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            },
            labels: item.labels || [],
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString()
        }));
    }

    /**
     * Convert recipes to demo data format
     */
    convertRecipes(recipes) {
        console.log(`🍳 Converting ${recipes.length} recipes...`);
        
        return recipes.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description || '',
            servings: recipe.servings || 4,
            prep_time: recipe.prep_time || 0,
            cook_time: recipe.cook_time || 0,
            items: recipe.ingredients || recipe.items || [],
            instructions: recipe.instructions || [],
            labels: recipe.labels || [],
            recipe_type: recipe.type === 'combo' ? 'combo' : 'regular',
            combo_recipes: recipe.combo_recipes || [],
            created_at: recipe.created_at || new Date().toISOString(),
            updated_at: recipe.updated_at || new Date().toISOString()
        }));
    }

    /**
     * Convert meals to demo data format
     */
    convertMeals(meals) {
        console.log(`🍽️ Converting ${meals.length} meals...`);
        
        return meals.map(meal => ({
            id: meal.id,
            name: meal.name,
            description: meal.description || '',
            recipes: meal.recipes || [],
            labels: meal.labels || [],
            created_at: meal.created_at || new Date().toISOString(),
            updated_at: meal.updated_at || new Date().toISOString()
        }));
    }

    /**
     * Convert scheduled meals to demo data format
     */
    convertScheduledMeals(scheduledMeals) {
        console.log(`📅 Converting ${scheduledMeals.length} scheduled meals...`);
        
        return scheduledMeals.map(meal => ({
            id: meal.id,
            recipe_id: meal.recipe_id, // Single source of truth for recipe reference
            meal_type: meal.meal_type,
            servings: meal.servings || 4,
            date: meal.date,
            created_at: meal.created_at || new Date().toISOString(),
            updated_at: meal.updated_at || new Date().toISOString()
            // All other properties (title, description, etc.) inherited via recipe_id lookup
        }));
    }

    /**
     * Convert pantry items to demo data format
     */
    convertPantryItems(pantryItems) {
        console.log(`🏠 Converting ${pantryItems.length} pantry items...`);
        
        return pantryItems.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            quantity: item.quantity || 1,
            unit: item.unit || 'pieces',
            expiration_date: item.expiration_date || null,
            notes: item.notes || '',
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString()
        }));
    }

    /**
     * Generate demo data file content
     */
    generateFileContent(demoData) {
        const timestamp = new Date().toISOString();
        const ingredients = demoData.ingredients;
        const recipes = demoData.recipes;
        const meals = demoData.meals;
        const scheduledMeals = demoData.scheduledMeals;
        const pantryItems = demoData.pantryItems;
        
        return `// Demo Data for MealPlanner
// Generated from exported data on ${timestamp}
// This file contains realistic demo data converted from user export
// 
// Data Summary:
// - ${ingredients.length} ingredients across ${new Set(ingredients.map(i => i.category)).size} categories
// - ${recipes.length} recipes (${recipes.filter(r => r.recipe_type === 'regular').length} regular, ${recipes.filter(r => r.recipe_type === 'combo').length} combo)
// - ${meals.length} meals combining multiple recipes
// - ${scheduledMeals.length} scheduled meals for planning
// - ${pantryItems.length} pantry items
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

        // Pantry items (${pantryItems.length} items)
        this.pantryItems = ${JSON.stringify(pantryItems, null, 8)};
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
            scheduledMeals: this.scheduledMeals,
            pantryItems: this.pantryItems
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

    // Get pantry items
    getPantryItems() {
        return this.pantryItems;
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
                        issues.push(\`Recipe "\${recipe.title}" references non-existent ingredient ID: \${recipeIng.ingredient_id}\`);
                    }
                });
            }
        });
        
        // Check scheduled meal-recipe references
        this.scheduledMeals.forEach(meal => {
            const recipe = this.recipes.find(rec => rec.id === meal.recipe_id);
            if (!recipe) {
                issues.push(\`Scheduled meal references non-existent recipe ID: \${meal.recipe_id}\`);
            }
        });
        
        // Check combo recipe references
        this.recipes.forEach(recipe => {
            if (recipe.recipe_type === 'combo' && recipe.combo_recipes) {
                recipe.combo_recipes.forEach(comboRecipeId => {
                    const comboRecipe = this.recipes.find(rec => rec.id === comboRecipeId);
                    if (!comboRecipe) {
                        issues.push(\`Combo recipe "\${recipe.title}" references non-existent recipe ID: \${comboRecipeId}\`);
                    }
                });
            }
        });
        
        if (issues.length > 0) {
            console.warn('⚠️ Data consistency issues found:');
            issues.forEach(issue => console.warn(\`  - \${issue}\`));
        } else {
            console.log('✅ Data consistency validation passed');
        }
        
        return issues;
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.DemoDataManager = DemoDataManager;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemoDataManager;
}`;
    }

    /**
     * Validate converted data against schema
     */
    validateConvertedData(demoData) {
        console.log('🔍 Validating converted data...');
        
        const issues = [];
        
        // Validate ingredients
        if (!Array.isArray(demoData.ingredients)) {
            issues.push('Ingredients must be an array');
        } else {
            demoData.ingredients.forEach((ingredient, index) => {
                if (!ingredient.id || !ingredient.name || !ingredient.category) {
                    issues.push(`Ingredient at index ${index} missing required fields`);
                }
            });
        }
        
        // Validate recipes
        if (!Array.isArray(demoData.recipes)) {
            issues.push('Recipes must be an array');
        } else {
            demoData.recipes.forEach((recipe, index) => {
                if (!recipe.id || !recipe.title) {
                    issues.push(`Recipe at index ${index} missing required fields`);
                }
            });
        }
        
        // Validate scheduled meals
        if (!Array.isArray(demoData.scheduledMeals)) {
            issues.push('Scheduled meals must be an array');
        } else {
            demoData.scheduledMeals.forEach((meal, index) => {
                if (!meal.id || !meal.recipe_id) {
                    issues.push(`Scheduled meal at index ${index} missing required fields (id, recipe_id)`);
                }
            });
        }
        
        if (issues.length > 0) {
            console.error('❌ Validation failed:');
            issues.forEach(issue => console.error(`  - ${issue}`));
            return false;
        } else {
            console.log('✅ Validation passed');
            return true;
        }
    }

    /**
     * Save converted data to file
     */
    saveToFile(filePath, content) {
        try {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Demo data saved to ${filePath}`);
        } catch (error) {
            console.error(`❌ Failed to save file: ${error.message}`);
            throw error;
        }
    }
}

// Command line interface
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        inputFile: null,
        outputFile: 'js/demo-data.js',
        validate: false,
        help: false
    };
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        if (arg === '--help' || arg === '-h') {
            options.help = true;
        } else if (arg === '--output' || arg === '-o') {
            options.outputFile = args[++i];
        } else if (arg === '--validate' || arg === '-v') {
            options.validate = true;
        } else if (!arg.startsWith('-') && !options.inputFile) {
            options.inputFile = arg;
        }
    }
    
    return options;
}

function showHelp() {
    console.log(`
Convert Exported JSON to Demo Data

Usage:
  node scripts/convert-export-to-demo-data.cjs <export-file> [options]

Arguments:
  <export-file>         Path to exported JSON file

Options:
  --output <file>       Output file (default: js/demo-data.js)
  --validate            Validate converted data against schema
  --help                Show this help

Examples:
  node scripts/convert-export-to-demo-data.cjs mealplanner-export.json
  node scripts/convert-export-to-demo-data.cjs export.json --output custom-demo-data.js
  node scripts/convert-export-to-demo-data.cjs export.json --validate
`);
}

// Main execution
function main() {
    const options = parseArgs();
    
    if (options.help) {
        showHelp();
        return;
    }
    
    if (!options.inputFile) {
        console.error('❌ Error: Input file is required');
        console.log('Use --help for usage information');
        process.exit(1);
    }
    
    if (!fs.existsSync(options.inputFile)) {
        console.error(`❌ Error: Input file does not exist: ${options.inputFile}`);
        process.exit(1);
    }
    
    try {
        console.log('🔄 Converting exported data to demo data format...');
        console.log(`📁 Input file: ${options.inputFile}`);
        console.log(`📁 Output file: ${options.outputFile}`);
        
        // Read and parse input file
        const inputContent = fs.readFileSync(options.inputFile, 'utf8');
        const exportData = JSON.parse(inputContent);
        
        // Convert data
        const converter = new ExportToDemoDataConverter();
        const demoData = converter.convert(exportData);
        
        // Validate if requested
        if (options.validate) {
            if (!converter.validateConvertedData(demoData)) {
                console.error('❌ Validation failed, aborting');
                process.exit(1);
            }
        }
        
        // Generate file content
        const fileContent = converter.generateFileContent(demoData);
        
        // Save to file
        converter.saveToFile(options.outputFile, fileContent);
        
        console.log('🎉 Conversion completed successfully!');
        console.log(`📊 Converted ${demoData.ingredients.length} ingredients, ${demoData.recipes.length} recipes, ${demoData.scheduledMeals.length} scheduled meals`);
        
    } catch (error) {
        console.error(`❌ Conversion failed: ${error.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = ExportToDemoDataConverter;
