import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Setup DOM environment
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        <div id="recipe-manager-container"></div>
    </body>
    </html>
`);
global.window = dom.window;
global.document = dom.window.document;

// Mock localStorage
global.localStorage = {
    data: {},
    getItem(key) { return this.data[key] || null; },
    setItem(key, value) { this.data[key] = value; },
    removeItem(key) { delete this.data[key]; },
    clear() { this.data = {}; }
};

// Mock DemoDataManager
global.window.DemoDataManager = class MockDemoDataManager {
    getIngredients() {
        return [
            { id: 1, name: 'Ground Beef', category: 'meat', default_unit: 'lbs', labels: ['protein', 'meat'] },
            { id: 2, name: 'Onion', category: 'produce', default_unit: 'pieces', labels: ['vegetable', 'produce'] },
            { id: 3, name: 'Tomato', category: 'produce', default_unit: 'pieces', labels: ['vegetable', 'produce'] }
        ];
    }
    
    getRecipes() {
        return [];
    }
};

// Import RecipeManager after DOM setup
await import('../../../js/recipe-manager.js');
const RecipeManager = global.RecipeManager;

describe('Add Recipe Functionality', () => {
    let recipeManager;
    let container;

    beforeEach(async () => {
        // Reset DOM
        document.body.innerHTML = '<div id="recipe-manager-container"></div>';
        container = document.getElementById('recipe-manager-container');
        
        // Create RecipeManager instance
        recipeManager = new RecipeManager(container);
        
        // Wait for initialization
        await new Promise(resolve => setTimeout(resolve, 100));
    });

    afterEach(() => {
        // Clean up any modals
        document.querySelectorAll('#recipe-form-modal').forEach(modal => modal.remove());
    });

    describe('Recipe Form Modal', () => {
        it('should open add recipe form when Add Recipe button is clicked', () => {
            const addBtn = container.querySelector('#add-recipe-btn');
            expect(addBtn).toBeTruthy();
            
            addBtn.click();
            
            const modal = document.getElementById('recipe-form-modal');
            expect(modal).toBeTruthy();
            expect(modal.textContent).toContain('Add New Recipe');
        });

        it('should open edit recipe form when editing existing recipe', () => {
            const mockRecipe = {
                id: 1,
                title: 'Test Recipe',
                description: 'Test description',
                serving_count: 4,
                meal_type: 'dinner',
                prep_time: 15,
                cook_time: 30,
                instructions: 'Test instructions',
                tags: ['test', 'recipe'],
                ingredients: [
                    { ingredient_id: 1, name: 'Chicken Breast', quantity: 1, unit: 'lbs', notes: '' }
                ]
            };
            
            recipeManager.showRecipeForm(mockRecipe);
            
            const modal = document.getElementById('recipe-form-modal');
            expect(modal).toBeTruthy();
            expect(modal.textContent).toContain('Edit Recipe');
            
            const titleInput = modal.querySelector('#recipe-title');
            expect(titleInput.value).toBe('Test Recipe');
        });

        it('should close modal when close button is clicked', () => {
            recipeManager.showRecipeForm();
            
            const modal = document.getElementById('recipe-form-modal');
            const closeBtn = modal.querySelector('#close-recipe-form');
            
            closeBtn.click();
            
            expect(document.getElementById('recipe-form-modal')).toBeFalsy();
        });

        it('should close modal when cancel button is clicked', () => {
            recipeManager.showRecipeForm();
            
            const modal = document.getElementById('recipe-form-modal');
            const cancelBtn = modal.querySelector('#cancel-recipe-form');
            
            cancelBtn.click();
            
            expect(document.getElementById('recipe-form-modal')).toBeFalsy();
        });

        it('should close modal when clicking backdrop', () => {
            recipeManager.showRecipeForm();
            
            const modal = document.getElementById('recipe-form-modal');
            
            // Simulate backdrop click
            modal.click();
            
            expect(document.getElementById('recipe-form-modal')).toBeFalsy();
        });
    });

    describe('Form Fields', () => {
        beforeEach(() => {
            recipeManager.showRecipeForm();
        });

        it('should have all required form fields', () => {
            const modal = document.getElementById('recipe-form-modal');
            
            expect(modal.querySelector('#recipe-title')).toBeTruthy();
            expect(modal.querySelector('#recipe-description')).toBeTruthy();
            expect(modal.querySelector('#recipe-servings')).toBeTruthy();
            expect(modal.querySelector('#recipe-meal-type')).toBeTruthy();
            expect(modal.querySelector('#recipe-prep-time')).toBeTruthy();
            expect(modal.querySelector('#recipe-cook-time')).toBeTruthy();
            expect(modal.querySelector('#recipe-instructions')).toBeTruthy();
            expect(modal.querySelector('#recipe-tags')).toBeTruthy();
        });

        it('should have default values for new recipe', () => {
            const modal = document.getElementById('recipe-form-modal');
            
            expect(modal.querySelector('#recipe-servings').value).toBe('4');
            expect(modal.querySelector('#recipe-prep-time').value).toBe('15');
            expect(modal.querySelector('#recipe-cook-time').value).toBe('30');
            expect(modal.querySelector('#recipe-meal-type').value).toBe('dinner');
        });

        it('should focus on title input when modal opens', async () => {
            await new Promise(resolve => setTimeout(resolve, 150));
            
            const modal = document.getElementById('recipe-form-modal');
            const titleInput = modal.querySelector('#recipe-title');
            
            expect(document.activeElement).toBe(titleInput);
        });
    });

    describe('Ingredient Management', () => {
        beforeEach(() => {
            recipeManager.showRecipeForm();
        });

        it('should render initial ingredient row', () => {
            const modal = document.getElementById('recipe-form-modal');
            const ingredientRows = modal.querySelectorAll('.ingredient-row');
            
            expect(ingredientRows).toHaveLength(1);
            
            const firstRow = ingredientRows[0];
            expect(firstRow.querySelector('.ingredient-select')).toBeTruthy();
            expect(firstRow.querySelector('input[name*="quantity"]')).toBeTruthy();
            expect(firstRow.querySelector('.unit-select')).toBeTruthy();
            expect(firstRow.querySelector('input[name*="notes"]')).toBeTruthy();
        });

        it('should add new ingredient row when Add Ingredient button is clicked', () => {
            const modal = document.getElementById('recipe-form-modal');
            const addBtn = modal.querySelector('#add-ingredient-row');
            
            addBtn.click();
            
            const ingredientRows = modal.querySelectorAll('.ingredient-row');
            expect(ingredientRows).toHaveLength(2);
        });

        it('should remove ingredient row when remove button is clicked', () => {
            const modal = document.getElementById('recipe-form-modal');
            const addBtn = modal.querySelector('#add-ingredient-row');
            
            // Add a second row
            addBtn.click();
            
            let ingredientRows = modal.querySelectorAll('.ingredient-row');
            expect(ingredientRows).toHaveLength(2);
            
            // Remove the second row (first row doesn't have remove button)
            const removeBtn = ingredientRows[1].querySelector('.remove-ingredient');
            expect(removeBtn).toBeTruthy(); // Ensure remove button exists
            removeBtn.click();
            
            ingredientRows = modal.querySelectorAll('.ingredient-row');
            expect(ingredientRows).toHaveLength(1);
        });

        it('should auto-select default unit when ingredient is selected', () => {
            const modal = document.getElementById('recipe-form-modal');
            const ingredientSelect = modal.querySelector('.ingredient-select');
            const unitSelect = modal.querySelector('.unit-select');
            
            // Select Ground Beef (should have default unit 'lbs')
            ingredientSelect.value = '1';
            ingredientSelect.dispatchEvent(new Event('change'));
            
            expect(unitSelect.value).toBe('lbs');
        });

        it('should populate ingredient options from available ingredients', () => {
            const modal = document.getElementById('recipe-form-modal');
            const ingredientSelect = modal.querySelector('.ingredient-select');
            const options = ingredientSelect.querySelectorAll('option');
            
            // Should have placeholder + all ingredients
            expect(options.length).toBeGreaterThan(1);
            expect(options[0].value).toBe(''); // Placeholder
            expect(options[0].textContent).toContain('Select ingredient');
        });
    });

    describe('Form Validation', () => {
        beforeEach(() => {
            recipeManager.showRecipeForm();
        });

        it('should show error for empty title', async () => {
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            const showNotificationSpy = vi.spyOn(recipeManager, 'showNotification');
            
            // Submit form with empty title
            form.dispatchEvent(new Event('submit'));
            
            expect(showNotificationSpy).toHaveBeenCalledWith('Recipe title is required', 'error');
        });

        it('should show error for empty instructions', async () => {
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            const titleInput = modal.querySelector('#recipe-title');
            const showNotificationSpy = vi.spyOn(recipeManager, 'showNotification');
            
            // Fill title but leave instructions empty
            titleInput.value = 'Test Recipe';
            
            form.dispatchEvent(new Event('submit'));
            
            expect(showNotificationSpy).toHaveBeenCalledWith('Instructions are required', 'error');
        });

        it('should show error for no ingredients', async () => {
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            const titleInput = modal.querySelector('#recipe-title');
            const instructionsInput = modal.querySelector('#recipe-instructions');
            const showNotificationSpy = vi.spyOn(recipeManager, 'showNotification');
            
            // Fill required fields but no ingredients
            titleInput.value = 'Test Recipe';
            instructionsInput.value = 'Test instructions';
            
            form.dispatchEvent(new Event('submit'));
            
            expect(showNotificationSpy).toHaveBeenCalledWith('At least one ingredient is required', 'error');
        });

        it('should validate serving count range', () => {
            const modal = document.getElementById('recipe-form-modal');
            const servingsInput = modal.querySelector('#recipe-servings');
            
            expect(servingsInput.min).toBe('1');
            expect(servingsInput.max).toBe('20');
        });

        it('should validate time inputs', () => {
            const modal = document.getElementById('recipe-form-modal');
            const prepTimeInput = modal.querySelector('#recipe-prep-time');
            const cookTimeInput = modal.querySelector('#recipe-cook-time');
            
            expect(prepTimeInput.min).toBe('0');
            expect(prepTimeInput.max).toBe('480');
            expect(cookTimeInput.min).toBe('0');
            expect(cookTimeInput.max).toBe('480');
        });
    });

    describe('Recipe Saving', () => {
        beforeEach(() => {
            recipeManager.showRecipeForm();
        });

        it('should save new recipe with valid data', async () => {
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            
            // Fill form with valid data
            modal.querySelector('#recipe-title').value = 'New Test Recipe';
            modal.querySelector('#recipe-description').value = 'Test description';
            modal.querySelector('#recipe-servings').value = '6';
            modal.querySelector('#recipe-meal-type').value = 'lunch';
            modal.querySelector('#recipe-prep-time').value = '20';
            modal.querySelector('#recipe-cook-time').value = '45';
            modal.querySelector('#recipe-instructions').value = '1. Step one\n2. Step two';
            modal.querySelector('#recipe-tags').value = 'healthy, quick';
            
            // Fill ingredient
            const ingredientSelect = modal.querySelector('.ingredient-select');
            const quantityInput = modal.querySelector('input[name*="quantity"]');
            ingredientSelect.value = '1'; // Chicken Breast
            quantityInput.value = '2';
            
            const initialRecipeCount = recipeManager.recipes.length;
            const showNotificationSpy = vi.spyOn(recipeManager, 'showNotification');
            
            // Submit form
            form.dispatchEvent(new Event('submit'));
            
            expect(recipeManager.recipes).toHaveLength(initialRecipeCount + 1);
            
            const newRecipe = recipeManager.recipes[recipeManager.recipes.length - 1];
            expect(newRecipe.title).toBe('New Test Recipe');
            expect(newRecipe.description).toBe('Test description');
            expect(newRecipe.serving_count).toBe(6);
            expect(newRecipe.meal_type).toBe('lunch');
            expect(newRecipe.prep_time).toBe(20);
            expect(newRecipe.cook_time).toBe(45);
            expect(newRecipe.instructions).toBe('1. Step one\n2. Step two');
            expect(newRecipe.tags).toEqual(['healthy', 'quick']);
            expect(newRecipe.ingredients).toHaveLength(1);
            expect(newRecipe.ingredients[0].ingredient_id).toBe(1);
            expect(newRecipe.ingredients[0].quantity).toBe(2);
            
            expect(showNotificationSpy).toHaveBeenCalledWith('"New Test Recipe" has been added!', 'success');
        });

        it('should update existing recipe', async () => {
            const existingRecipe = recipeManager.recipes[0];
            const originalTitle = existingRecipe.title;
            
            recipeManager.showRecipeForm(existingRecipe);
            
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            const titleInput = modal.querySelector('#recipe-title');
            
            // Update title
            titleInput.value = 'Updated Recipe Title';
            
            const showNotificationSpy = vi.spyOn(recipeManager, 'showNotification');
            
            // Submit form
            form.dispatchEvent(new Event('submit'));
            
            const updatedRecipe = recipeManager.recipes.find(r => r.id === existingRecipe.id);
            expect(updatedRecipe.title).toBe('Updated Recipe Title');
            expect(showNotificationSpy).toHaveBeenCalledWith('"Updated Recipe Title" has been updated!', 'success');
        });

        it('should close modal after successful save', async () => {
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            
            // Fill minimum required data
            modal.querySelector('#recipe-title').value = 'Test Recipe';
            modal.querySelector('#recipe-instructions').value = 'Test instructions';
            
            const ingredientSelect = modal.querySelector('.ingredient-select');
            const quantityInput = modal.querySelector('input[name*="quantity"]');
            ingredientSelect.value = '1';
            quantityInput.value = '1';
            
            // Submit form
            form.dispatchEvent(new Event('submit'));
            
            expect(document.getElementById('recipe-form-modal')).toBeFalsy();
        });

        it('should generate unique ID for new recipe', async () => {
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            
            // Fill minimum required data
            modal.querySelector('#recipe-title').value = 'Test Recipe';
            modal.querySelector('#recipe-instructions').value = 'Test instructions';
            
            const ingredientSelect = modal.querySelector('.ingredient-select');
            const quantityInput = modal.querySelector('input[name*="quantity"]');
            ingredientSelect.value = '1';
            quantityInput.value = '1';
            
            const maxId = Math.max(...recipeManager.recipes.map(r => r.id));
            
            // Submit form
            form.dispatchEvent(new Event('submit'));
            
            const newRecipe = recipeManager.recipes[recipeManager.recipes.length - 1];
            expect(newRecipe.id).toBe(maxId + 1);
            expect(newRecipe.created_date).toBeTruthy();
        });
    });

    describe('Data Processing', () => {
        it('should parse tags correctly', () => {
            recipeManager.showRecipeForm();
            
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            
            // Fill form with tags
            modal.querySelector('#recipe-title').value = 'Test Recipe';
            modal.querySelector('#recipe-instructions').value = 'Test instructions';
            modal.querySelector('#recipe-tags').value = 'healthy, quick,vegetarian, ';
            
            const ingredientSelect = modal.querySelector('.ingredient-select');
            const quantityInput = modal.querySelector('input[name*="quantity"]');
            ingredientSelect.value = '1';
            quantityInput.value = '1';
            
            form.dispatchEvent(new Event('submit'));
            
            const newRecipe = recipeManager.recipes[recipeManager.recipes.length - 1];
            expect(newRecipe.labels).toEqual(['healthy', 'quick', 'vegetarian']);
        });

        it('should handle multiple ingredients correctly', () => {
            recipeManager.showRecipeForm();
            
            const modal = document.getElementById('recipe-form-modal');
            const addBtn = modal.querySelector('#add-ingredient-row');
            
            // Add second ingredient row
            addBtn.click();
            
            const form = modal.querySelector('#recipe-form');
            
            // Fill form data
            modal.querySelector('#recipe-title').value = 'Multi-Ingredient Recipe';
            modal.querySelector('#recipe-instructions').value = 'Test instructions';
            
            // Fill first ingredient
            const ingredientRows = modal.querySelectorAll('.ingredient-row');
            const firstRow = ingredientRows[0];
            firstRow.querySelector('.ingredient-select').value = '1'; // Chicken
            firstRow.querySelector('input[name*="quantity"]').value = '2';
            firstRow.querySelector('.unit-select').value = 'lbs';
            
            // Fill second ingredient
            const secondRow = ingredientRows[1];
            secondRow.querySelector('.ingredient-select').value = '2'; // Red Onion
            secondRow.querySelector('input[name*="quantity"]').value = '1';
            secondRow.querySelector('.unit-select').value = 'pieces';
            secondRow.querySelector('input[name*="notes"]').value = 'diced';
            
            form.dispatchEvent(new Event('submit'));
            
            const newRecipe = recipeManager.recipes[recipeManager.recipes.length - 1];
            expect(newRecipe.ingredients).toHaveLength(2);
            
            expect(newRecipe.ingredients[0].ingredient_id).toBe(1);
            expect(newRecipe.ingredients[0].quantity).toBe(2);
            expect(newRecipe.ingredients[0].unit).toBe('lbs');
            
            expect(newRecipe.ingredients[1].ingredient_id).toBe(2);
            expect(newRecipe.ingredients[1].quantity).toBe(1);
            expect(newRecipe.ingredients[1].unit).toBe('pieces');
            expect(newRecipe.ingredients[1].notes).toBe('diced');
        });

        it('should skip empty ingredient rows', () => {
            recipeManager.showRecipeForm();
            
            const modal = document.getElementById('recipe-form-modal');
            const addBtn = modal.querySelector('#add-ingredient-row');
            
            // Add second ingredient row but leave it empty
            addBtn.click();
            
            const form = modal.querySelector('#recipe-form');
            
            // Fill form data
            modal.querySelector('#recipe-title').value = 'Test Recipe';
            modal.querySelector('#recipe-instructions').value = 'Test instructions';
            
            // Fill only first ingredient
            const firstRow = modal.querySelector('.ingredient-row');
            firstRow.querySelector('.ingredient-select').value = '1';
            firstRow.querySelector('input[name*="quantity"]').value = '1';
            
            form.dispatchEvent(new Event('submit'));
            
            const newRecipe = recipeManager.recipes[recipeManager.recipes.length - 1];
            expect(newRecipe.ingredients).toHaveLength(1);
        });
    });

    describe('Error Handling', () => {
        it('should handle form submission errors gracefully', async () => {
            recipeManager.showRecipeForm(); // Open modal first
            
            const modal = document.getElementById('recipe-form-modal');
            const form = modal.querySelector('#recipe-form');
            
            // Mock console.error
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            const showNotificationSpy = vi.spyOn(recipeManager, 'showNotification');
            
            // Force an error by mocking FormData to throw
            const originalFormData = global.FormData;
            global.FormData = vi.fn(() => {
                throw new Error('FormData error');
            });
            
            form.dispatchEvent(new Event('submit'));
            
            expect(consoleError).toHaveBeenCalledWith('Error saving recipe:', expect.any(Error));
            expect(showNotificationSpy).toHaveBeenCalledWith('Error saving recipe. Please try again.', 'error');
            
            // Restore
            global.FormData = originalFormData;
            consoleError.mockRestore();
        });
    });
});
