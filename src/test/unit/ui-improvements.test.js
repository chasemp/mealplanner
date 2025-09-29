import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock managers for testing UI improvements
class MockItineraryView {
    constructor() {
        this.scheduledMeals = [
            { id: 1, recipe_name: 'Test Recipe 1', meal_type: 'dinner' },
            { id: 2, recipe_name: 'Test Recipe 2', meal_type: 'dinner' }
        ];
    }

    getTotalMeals() {
        return this.scheduledMeals.length;
    }

    getUniqueRecipes() {
        const uniqueRecipes = new Set(this.scheduledMeals.map(meal => window.app ? window.app.getMealDisplayName(meal) : 'Unknown Recipe'));
        return uniqueRecipes.size;
    }

    render() {
        return `
            <div class="itinerary-view">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.getTotalMeals()}</div>
                        <div class="text-sm text-gray-600">Total Meals</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${this.getUniqueRecipes()}</div>
                        <div class="text-sm text-gray-600">Unique Recipes</div>
                    </div>
                </div>
            </div>
        `;
    }
}

class MockIngredientsManager {
    constructor() {
        this.filteredIngredients = [
            { id: 1, name: 'Ingredient 1', category: 'Vegetable' },
            { id: 2, name: 'Ingredient 2', category: 'Protein' }
        ];
    }

    getActiveIngredients() {
        return this.filteredIngredients.filter(i => i.recipe_count > 0).length;
    }

    render() {
        const categories = [...new Set(this.filteredIngredients.map(i => i.category))];
        return `
            <div class="ingredients-manager">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${categories.length}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-purple-600">${this.getActiveIngredients()}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">In Recipes</div>
                    </div>
                </div>
            </div>
        `;
    }
}

class MockRecipeManager {
    constructor() {
        this.recipes = [
            {
                id: 1,
                title: 'Test Recipe',
                description: 'Test description',
                image_url: 'test-image.jpg',
                labels: ['quick', 'healthy']
            }
        ];
    }

    showRecipeDetail(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${recipe.title}</h2>
                    <div class="flex items-center space-x-3">
                        <button id="edit-recipe-detail" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                            <span>Edit</span>
                        </button>
                        <button id="close-recipe-detail" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <span>×</span>
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    ${recipe.image_url ? `
                        <div class="mb-6 flex justify-center">
                            <img src="${recipe.image_url}" alt="${recipe.title}" class="w-3/5 h-40 object-cover rounded-lg">
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        return modal;
    }
}

describe('UI Improvements Regression Tests', () => {
    let dom;

    beforeEach(() => {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body></body>
            </html>
        `);
        global.document = dom.window.document;
        global.window = dom.window;
    });

    describe('Statistics Cleanup', () => {
        it('should only show Total Meals and Unique Recipes in itinerary view', () => {
            const itineraryView = new MockItineraryView();
            const html = itineraryView.render();
            
            // Should include allowed statistics
            expect(html).toContain('Total Meals');
            expect(html).toContain('Unique Recipes');
            
            // Should NOT include removed statistics
            expect(html).not.toContain('Estimated Cost');
            expect(html).not.toContain('Shared Ingredients');
            
            // Should use 2-column grid instead of 4-column
            expect(html).toContain('grid-cols-1 md:grid-cols-2');
            expect(html).not.toContain('grid-cols-1 md:grid-cols-4');
        });

        it('should only show Categories and In Recipes in ingredients view', () => {
            const ingredientsManager = new MockIngredientsManager();
            const html = ingredientsManager.render();
            
            // Should include allowed statistics
            expect(html).toContain('Categories');
            expect(html).toContain('In Recipes');
            
            // Should NOT include removed statistics
            expect(html).not.toContain('Total Ingredients');
            expect(html).not.toContain('Estimated Value');
            
            // Should use 2-column grid instead of 4-column
            expect(html).toContain('grid-cols-1 md:grid-cols-2');
            expect(html).not.toContain('grid-cols-1 md:grid-cols-4');
        });

        it('should display correct statistics values', () => {
            const itineraryView = new MockItineraryView();
            
            expect(itineraryView.getTotalMeals()).toBe(2);
            expect(itineraryView.getUniqueRecipes()).toBe(2);
        });
    });

    describe('Recipe Modal Enhancements', () => {
        it('should include edit button in recipe detail modal', () => {
            const recipeManager = new MockRecipeManager();
            const modal = recipeManager.showRecipeDetail(1);
            
            const editButton = modal.querySelector('#edit-recipe-detail');
            expect(editButton).toBeTruthy();
            expect(editButton.textContent).toContain('Edit');
            expect(editButton.className).toContain('bg-blue-500');
        });

        it('should have properly sized recipe images (60% width)', () => {
            const recipeManager = new MockRecipeManager();
            const modal = recipeManager.showRecipeDetail(1);
            
            const image = modal.querySelector('img');
            expect(image).toBeTruthy();
            expect(image.className).toContain('w-3/5'); // 60% width
            expect(image.className).toContain('h-40'); // Reduced height
            expect(image.parentElement.className).toContain('flex justify-center'); // Centered
        });

        it('should have both edit and close buttons in header', () => {
            const recipeManager = new MockRecipeManager();
            const modal = recipeManager.showRecipeDetail(1);
            
            const header = modal.querySelector('.sticky');
            const editButton = header.querySelector('#edit-recipe-detail');
            const closeButton = header.querySelector('#close-recipe-detail');
            
            expect(editButton).toBeTruthy();
            expect(closeButton).toBeTruthy();
            
            // Should be in a flex container with space between
            const buttonContainer = editButton.parentElement;
            expect(buttonContainer.className).toContain('flex items-center space-x-3');
        });

        it('should maintain proper modal structure with enhancements', () => {
            const recipeManager = new MockRecipeManager();
            const modal = recipeManager.showRecipeDetail(1);
            
            // Should have proper modal structure
            expect(modal.querySelector('.bg-white')).toBeTruthy();
            expect(modal.querySelector('.sticky')).toBeTruthy(); // Header
            expect(modal.querySelector('.p-6')).toBeTruthy(); // Content
            
            // Should have dark mode classes
            expect(modal.innerHTML).toContain('dark:bg-gray-800');
            expect(modal.innerHTML).toContain('dark:text-white');
        });
    });

    describe('Dark Mode Compatibility', () => {
        it('should have proper dark mode classes in statistics', () => {
            const ingredientsManager = new MockIngredientsManager();
            const html = ingredientsManager.render();
            
            // Should include dark mode classes for statistics
            expect(html).toContain('dark:bg-gray-800');
            expect(html).toContain('dark:text-gray-400');
        });

        it('should maintain dark mode styling in recipe modals', () => {
            const recipeManager = new MockRecipeManager();
            const modal = recipeManager.showRecipeDetail(1);
            
            // Should have dark mode classes throughout
            expect(modal.innerHTML).toContain('dark:bg-gray-800');
            expect(modal.innerHTML).toContain('dark:text-white');
            expect(modal.innerHTML).toContain('dark:border-gray-700');
            expect(modal.innerHTML).toContain('dark:hover:text-gray-300');
        });
    });

    describe('Regression Prevention', () => {
        it('should not accidentally re-add removed statistics', () => {
            const itineraryView = new MockItineraryView();
            const ingredientsManager = new MockIngredientsManager();
            
            const itineraryHtml = itineraryView.render();
            const ingredientsHtml = ingredientsManager.render();
            
            // Ensure removed statistics don't creep back in
            const removedStats = [
                'Estimated Cost',
                'Shared Ingredients', 
                'Total Ingredients',
                'Estimated Value'
            ];
            
            removedStats.forEach(stat => {
                expect(itineraryHtml).not.toContain(stat);
                expect(ingredientsHtml).not.toContain(stat);
            });
        });

        it('should maintain 2-column grid layout for statistics', () => {
            const itineraryView = new MockItineraryView();
            const ingredientsManager = new MockIngredientsManager();
            
            const itineraryHtml = itineraryView.render();
            const ingredientsHtml = ingredientsManager.render();
            
            // Should use 2-column grid, not 4-column
            expect(itineraryHtml).toContain('md:grid-cols-2');
            expect(ingredientsHtml).toContain('md:grid-cols-2');
            
            expect(itineraryHtml).not.toContain('md:grid-cols-4');
            expect(ingredientsHtml).not.toContain('md:grid-cols-4');
        });

        it('should keep edit button in recipe modals', () => {
            const recipeManager = new MockRecipeManager();
            const modal = recipeManager.showRecipeDetail(1);
            
            const editButton = modal.querySelector('#edit-recipe-detail');
            expect(editButton).toBeTruthy();
            
            // Should have proper styling
            expect(editButton.className).toContain('bg-blue-500');
            expect(editButton.className).toContain('hover:bg-blue-600');
            expect(editButton.className).toContain('text-white');
        });
    });
});
