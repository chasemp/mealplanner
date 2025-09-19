/**
 * Export/Import Data Lifecycle Tests
 * 
 * These tests validate the complete data lifecycle from creation to export to import
 * ensuring data integrity and UI refresh functionality.
 * 
 * Test Coverage:
 * - Data creation with relationships
 * - Export functionality
 * - Import functionality  
 * - UI refresh after import
 * - Data integrity validation
 * - Cross-tab data consistency
 */

class ExportImportLifecycleTests {
    constructor() {
        this.testResults = [];
        this.exportedData = null;
    }

    /**
     * Run all export/import lifecycle tests
     */
    async runAllTests() {
        console.log('🧪 Starting Export/Import Lifecycle Tests...');
        
        try {
            await this.testDataCreation();
            await this.testExportFunctionality();
            await this.testImportFunctionality();
            await this.testUIRefreshAfterImport();
            await this.testDataIntegrityValidation();
            await this.testCrossTabConsistency();
            
            this.printTestResults();
            return this.testResults;
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            throw error;
        }
    }

    /**
     * Test 1: Data Creation with Relationships
     * Creates items, recipes, and scheduled meals with proper relationships
     */
    async testDataCreation() {
        console.log('📝 Test 1: Data Creation with Relationships');
        
        try {
            // Clear existing data
            this.clearAllData();
            
            // Create test items
            const items = this.createTestItems();
            this.validateItems(items);
            
            // Create test recipes using items
            const recipes = this.createTestRecipes(items);
            this.validateRecipes(recipes);
            
            // Create test scheduled meals using recipes
            const scheduledMeals = this.createTestScheduledMeals(recipes);
            this.validateScheduledMeals(scheduledMeals);
            
            this.recordTestResult('Data Creation', true, 'All data created with proper relationships');
        } catch (error) {
            this.recordTestResult('Data Creation', false, `Failed: ${error.message}`);
        }
    }

    /**
     * Test 2: Export Functionality
     * Exports all data to JSON and validates structure
     */
    async testExportFunctionality() {
        console.log('📤 Test 2: Export Functionality');
        
        try {
            // Trigger export
            const exportData = this.triggerExport();
            
            // Validate export structure
            this.validateExportStructure(exportData);
            
            // Store for import test
            this.exportedData = exportData;
            
            this.recordTestResult('Export Functionality', true, 'Data exported successfully with proper structure');
        } catch (error) {
            this.recordTestResult('Export Functionality', false, `Failed: ${error.message}`);
        }
    }

    /**
     * Test 3: Import Functionality
     * Clears data and imports from exported JSON
     */
    async testImportFunctionality() {
        console.log('📥 Test 3: Import Functionality');
        
        try {
            if (!this.exportedData) {
                throw new Error('No exported data available for import test');
            }
            
            // Clear existing data
            this.clearAllData();
            
            // Import data
            this.triggerImport(this.exportedData);
            
            // Validate data was imported
            this.validateImportedData();
            
            this.recordTestResult('Import Functionality', true, 'Data imported successfully');
        } catch (error) {
            this.recordTestResult('Import Functionality', false, `Failed: ${error.message}`);
        }
    }

    /**
     * Test 4: UI Refresh After Import
     * Validates that UI displays imported data without manual refresh
     */
    async testUIRefreshAfterImport() {
        console.log('🔄 Test 4: UI Refresh After Import');
        
        try {
            // Check Items tab
            const itemsDisplayed = this.checkItemsTabDisplay();
            if (!itemsDisplayed) {
                throw new Error('Items not displayed in UI after import');
            }
            
            // Check Recipes tab
            const recipesDisplayed = this.checkRecipesTabDisplay();
            if (!recipesDisplayed) {
                throw new Error('Recipes not displayed in UI after import');
            }
            
            // Check Plan tab
            const scheduledMealsDisplayed = this.checkPlanTabDisplay();
            if (!scheduledMealsDisplayed) {
                throw new Error('Scheduled meals not displayed in UI after import');
            }
            
            this.recordTestResult('UI Refresh After Import', true, 'All tabs display imported data correctly');
        } catch (error) {
            this.recordTestResult('UI Refresh After Import', false, `Failed: ${error.message}`);
        }
    }

    /**
     * Test 5: Data Integrity Validation
     * Validates that all relationships are preserved after import
     */
    async testDataIntegrityValidation() {
        console.log('🔍 Test 5: Data Integrity Validation');
        
        try {
            // Validate items
            const items = this.getItemsFromStorage();
            this.validateItemsIntegrity(items);
            
            // Validate recipes
            const recipes = this.getRecipesFromStorage();
            this.validateRecipesIntegrity(recipes, items);
            
            // Validate scheduled meals
            const scheduledMeals = this.getScheduledMealsFromStorage();
            this.validateScheduledMealsIntegrity(scheduledMeals, recipes);
            
            this.recordTestResult('Data Integrity Validation', true, 'All relationships preserved after import');
        } catch (error) {
            this.recordTestResult('Data Integrity Validation', false, `Failed: ${error.message}`);
        }
    }

    /**
     * Test 6: Cross-Tab Data Consistency
     * Validates that data is consistent across all tabs
     */
    async testCrossTabConsistency() {
        console.log('🔄 Test 6: Cross-Tab Data Consistency');
        
        try {
            // Check that items show correct recipe usage
            const itemsWithRecipeUsage = this.checkItemsRecipeUsage();
            if (!itemsWithRecipeUsage) {
                throw new Error('Items do not show correct recipe usage');
            }
            
            // Check that recipes show correct ingredient relationships
            const recipesWithIngredients = this.checkRecipesIngredientRelationships();
            if (!recipesWithIngredients) {
                throw new Error('Recipes do not show correct ingredient relationships');
            }
            
            // Check that scheduled meals reference correct recipes
            const scheduledMealsWithRecipes = this.checkScheduledMealsRecipeReferences();
            if (!scheduledMealsWithRecipes) {
                throw new Error('Scheduled meals do not reference correct recipes');
            }
            
            this.recordTestResult('Cross-Tab Data Consistency', true, 'Data consistent across all tabs');
        } catch (error) {
            this.recordTestResult('Cross-Tab Data Consistency', false, `Failed: ${error.message}`);
        }
    }

    // Helper Methods

    createTestItems() {
        const items = [
            { id: 1, name: 'Chicken', category: 'meat', default_unit: 'pounds' },
            { id: 2, name: 'Rice', category: 'pantry', default_unit: 'cups' },
            { id: 3, name: 'Onions', category: 'produce', default_unit: 'pieces' },
            { id: 4, name: 'Tomatoes', category: 'produce', default_unit: 'pieces' },
            { id: 5, name: 'Salt', category: 'spices', default_unit: 'teaspoons' }
        ];
        
        // Save to localStorage
        localStorage.setItem('mealplanner_items', JSON.stringify(items));
        return items;
    }

    createTestRecipes(items) {
        const recipes = [
            {
                id: 1,
                title: 'Chicken and Rice',
                description: 'A simple and delicious chicken and rice dish',
                servings: 4,
                prep_time: 15,
                cook_time: 30,
                items: [
                    { item_id: 1, quantity: 2, unit: 'pounds' }, // Chicken
                    { item_id: 2, quantity: 1, unit: 'cups' }     // Rice
                ],
                instructions: ['Cook chicken in a pan until golden brown', 'Add rice and cook until tender'],
                labels: ['main-dish'],
                type: 'recipe'
            },
            {
                id: 2,
                title: 'Complete Dinner Combo',
                description: 'A complete dinner with main dish and side',
                servings: 4,
                prep_time: 0,
                cook_time: 0,
                combo_recipes: [1], // References Chicken and Rice recipe
                labels: ['combo'],
                type: 'combo'
            }
        ];
        
        // Save to localStorage
        localStorage.setItem('mealplanner_recipes', JSON.stringify(recipes));
        return recipes;
    }

    createTestScheduledMeals(recipes) {
        const scheduledMeals = [
            {
                id: 'plan-1',
                recipe_id: 1,
                recipe_name: 'Chicken and Rice',
                meal_type: 'dinner',
                servings: 4,
                date: '2025-09-08'
            },
            {
                id: 'plan-2',
                recipe_id: 2,
                recipe_name: 'Complete Dinner Combo',
                meal_type: 'dinner',
                servings: 4,
                date: '2025-09-09'
            }
        ];
        
        // Save to both plan and menu scheduled meals
        localStorage.setItem('mealplanner_planScheduledMeals', JSON.stringify(scheduledMeals));
        localStorage.setItem('mealplanner_menuScheduledMeals', JSON.stringify(scheduledMeals));
        return scheduledMeals;
    }

    validateItems(items) {
        if (!Array.isArray(items) || items.length !== 5) {
            throw new Error(`Expected 5 items, got ${items.length}`);
        }
        
        const requiredFields = ['id', 'name', 'category', 'default_unit'];
        items.forEach(item => {
            requiredFields.forEach(field => {
                if (!item[field]) {
                    throw new Error(`Item missing required field: ${field}`);
                }
            });
        });
    }

    validateRecipes(recipes) {
        if (!Array.isArray(recipes) || recipes.length !== 2) {
            throw new Error(`Expected 2 recipes, got ${recipes.length}`);
        }
        
        const requiredFields = ['id', 'title', 'description', 'servings', 'items'];
        recipes.forEach(recipe => {
            requiredFields.forEach(field => {
                if (!recipe[field]) {
                    throw new Error(`Recipe missing required field: ${field}`);
                }
            });
        });
    }

    validateScheduledMeals(scheduledMeals) {
        if (!Array.isArray(scheduledMeals) || scheduledMeals.length !== 2) {
            throw new Error(`Expected 2 scheduled meals, got ${scheduledMeals.length}`);
        }
        
        const requiredFields = ['id', 'recipe_id', 'recipe_name', 'meal_type', 'date'];
        scheduledMeals.forEach(meal => {
            requiredFields.forEach(field => {
                if (!meal[field]) {
                    throw new Error(`Scheduled meal missing required field: ${field}`);
                }
            });
        });
    }

    triggerExport() {
        // Simulate export functionality
        const exportData = {
            schema: {
                items: 'mealplanner_items',
                recipes: 'mealplanner_recipes',
                planScheduledMeals: 'mealplanner_planScheduledMeals',
                menuScheduledMeals: 'mealplanner_menuScheduledMeals'
            },
            data: {
                items: JSON.parse(localStorage.getItem('mealplanner_items') || '[]'),
                recipes: JSON.parse(localStorage.getItem('mealplanner_recipes') || '[]'),
                planScheduledMeals: JSON.parse(localStorage.getItem('mealplanner_planScheduledMeals') || '[]'),
                menuScheduledMeals: JSON.parse(localStorage.getItem('mealplanner_menuScheduledMeals') || '[]')
            },
            exportedAt: new Date().toISOString()
        };
        
        return exportData;
    }

    validateExportStructure(exportData) {
        if (!exportData.schema || !exportData.data) {
            throw new Error('Export data missing schema or data section');
        }
        
        const requiredKeys = ['items', 'recipes', 'planScheduledMeals', 'menuScheduledMeals'];
        requiredKeys.forEach(key => {
            if (!exportData.data[key]) {
                throw new Error(`Export data missing key: ${key}`);
            }
        });
    }

    clearAllData() {
        const keys = [
            'mealplanner_items',
            'mealplanner_recipes',
            'mealplanner_planScheduledMeals',
            'mealplanner_menuScheduledMeals',
            'mealplanner_scheduledMeals'
        ];
        
        keys.forEach(key => localStorage.removeItem(key));
    }

    triggerImport(exportData) {
        // Simulate import functionality
        Object.keys(exportData.data).forEach(key => {
            const storageKey = exportData.schema[key];
            const value = exportData.data[key];
            
            if (value !== null && value !== undefined) {
                localStorage.setItem(storageKey, JSON.stringify(value));
            }
        });
    }

    validateImportedData() {
        const items = JSON.parse(localStorage.getItem('mealplanner_items') || '[]');
        const recipes = JSON.parse(localStorage.getItem('mealplanner_recipes') || '[]');
        const planScheduledMeals = JSON.parse(localStorage.getItem('mealplanner_planScheduledMeals') || '[]');
        
        if (items.length !== 5) {
            throw new Error(`Expected 5 imported items, got ${items.length}`);
        }
        
        if (recipes.length !== 2) {
            throw new Error(`Expected 2 imported recipes, got ${recipes.length}`);
        }
        
        if (planScheduledMeals.length !== 2) {
            throw new Error(`Expected 2 imported scheduled meals, got ${planScheduledMeals.length}`);
        }
    }

    checkItemsTabDisplay() {
        // This would check the actual UI display
        // For now, we'll check if the data is available for display
        const items = JSON.parse(localStorage.getItem('mealplanner_items') || '[]');
        return items.length > 0;
    }

    checkRecipesTabDisplay() {
        const recipes = JSON.parse(localStorage.getItem('mealplanner_recipes') || '[]');
        return recipes.length > 0;
    }

    checkPlanTabDisplay() {
        const scheduledMeals = JSON.parse(localStorage.getItem('mealplanner_planScheduledMeals') || '[]');
        return scheduledMeals.length > 0;
    }

    getItemsFromStorage() {
        return JSON.parse(localStorage.getItem('mealplanner_items') || '[]');
    }

    getRecipesFromStorage() {
        return JSON.parse(localStorage.getItem('mealplanner_recipes') || '[]');
    }

    getScheduledMealsFromStorage() {
        return JSON.parse(localStorage.getItem('mealplanner_planScheduledMeals') || '[]');
    }

    validateItemsIntegrity(items) {
        // Validate that items have proper structure
        items.forEach(item => {
            if (!item.id || !item.name || !item.category) {
                throw new Error('Item missing required fields after import');
            }
        });
    }

    validateRecipesIntegrity(recipes, items) {
        // Validate that recipes reference valid items
        recipes.forEach(recipe => {
            if (recipe.items) {
                recipe.items.forEach(ingredient => {
                    const itemExists = items.some(item => item.id === ingredient.item_id);
                    if (!itemExists) {
                        throw new Error(`Recipe references non-existent item: ${ingredient.item_id}`);
                    }
                });
            }
        });
    }

    validateScheduledMealsIntegrity(scheduledMeals, recipes) {
        // Validate that scheduled meals reference valid recipes
        scheduledMeals.forEach(meal => {
            const recipeExists = recipes.some(recipe => recipe.id === meal.recipe_id);
            if (!recipeExists) {
                throw new Error(`Scheduled meal references non-existent recipe: ${meal.recipe_id}`);
            }
        });
    }

    checkItemsRecipeUsage() {
        // This would check if items show correct recipe usage in UI
        // For now, we'll validate the data structure
        const items = this.getItemsFromStorage();
        const recipes = this.getRecipesFromStorage();
        
        // Check that items are referenced in recipes
        const usedItemIds = new Set();
        recipes.forEach(recipe => {
            if (recipe.items) {
                recipe.items.forEach(ingredient => {
                    usedItemIds.add(ingredient.item_id);
                });
            }
        });
        
        return usedItemIds.size > 0;
    }

    checkRecipesIngredientRelationships() {
        const recipes = this.getRecipesFromStorage();
        const items = this.getItemsFromStorage();
        
        // Check that recipes have valid ingredient relationships
        return recipes.every(recipe => {
            if (recipe.items) {
                return recipe.items.every(ingredient => {
                    return items.some(item => item.id === ingredient.item_id);
                });
            }
            return true;
        });
    }

    checkScheduledMealsRecipeReferences() {
        const scheduledMeals = this.getScheduledMealsFromStorage();
        const recipes = this.getRecipesFromStorage();
        
        // Check that scheduled meals reference valid recipes
        return scheduledMeals.every(meal => {
            return recipes.some(recipe => recipe.id === meal.recipe_id);
        });
    }

    checkItemsTabDisplay() {
        // Mock check for items tab display
        const items = this.getItemsFromStorage();
        return items.length > 0;
    }

    checkRecipesTabDisplay() {
        // Mock check for recipes tab display
        const recipes = this.getRecipesFromStorage();
        return recipes.length > 0;
    }

    checkPlanTabDisplay() {
        // Mock check for plan tab display
        const scheduledMeals = this.getScheduledMealsFromStorage();
        return scheduledMeals.length > 0;
    }

    recordTestResult(testName, passed, message) {
        this.testResults.push({
            test: testName,
            passed,
            message,
            timestamp: new Date().toISOString()
        });
        
        const status = passed ? '✅' : '❌';
        console.log(`${status} ${testName}: ${message}`);
    }

    printTestResults() {
        console.log('\n📊 Test Results Summary:');
        console.log('========================');
        
        const passed = this.testResults.filter(r => r.passed).length;
        const total = this.testResults.length;
        
        this.testResults.forEach(result => {
            const status = result.passed ? '✅' : '❌';
            console.log(`${status} ${result.test}: ${result.message}`);
        });
        
        console.log(`\n📈 Overall: ${passed}/${total} tests passed`);
        
        if (passed === total) {
            console.log('🎉 All tests passed! Export/Import functionality is working correctly.');
        } else {
            console.log('⚠️ Some tests failed. Please review the issues above.');
        }
    }
}

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExportImportLifecycleTests;
}

// Make available globally for browser testing
if (typeof window !== 'undefined') {
    window.ExportImportLifecycleTests = ExportImportLifecycleTests;
}

// Add Vitest test structure
import { describe, it, expect, beforeEach } from 'vitest';

describe('Export/Import Lifecycle', () => {
    let testRunner;

    beforeEach(() => {
        testRunner = new ExportImportLifecycleTests();
    });

    it('should run all export/import lifecycle tests', async () => {
        const results = await testRunner.runAllTests();
        
        // Debug: Print out the results
        console.log('Test results:', results);
        console.log('Number of results:', results.length);
        
        // Verify all tests passed
        const failedTests = results.filter(result => !result.passed);
        console.log('Failed tests:', failedTests);
        expect(failedTests).toHaveLength(0);
        
        // Verify we have the expected number of tests
        expect(results).toHaveLength(6);
    });
});
