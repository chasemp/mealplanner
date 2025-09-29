/**
 * Recipe Manager Info Box Regression Tests
 * 
 * These tests specifically target the info box update functionality that was
 * missing from our original test suite, causing regressions to go undetected.
 * 
 * CRITICAL AREAS TESTED:
 * 1. Info box updates during search filtering
 * 2. Info box updates during label filtering  
 * 3. Info box updates when toggling favorites
 * 4. Info box updates when modifying recipe attributes
 * 5. updateRecipeDisplay() method functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Enhanced Mock RecipeManager with info box functionality
class MockRecipeManagerWithInfoBox {
    constructor(container) {
        this.container = container;
        this.recipes = [];
        this.searchTerm = '';
        this.selectedLabels = [];
        this.showFavoritesOnly = false;
        this.sortBy = 'name';
        this.sortAscending = true;
    }

    init() {
        this.loadDemoData();
        this.render();
        this.attachEventListeners();
    }

    loadDemoData() {
        this.recipes = [
            {
                id: 1,
                title: 'Chicken Stir Fry',
                description: 'Quick and healthy chicken stir fry',
                prep_time: 15,
                cook_time: 20,
                serving_count: 4,
                favorite: true,
                labels: ['protein-rich', 'low-carb', 'Dinner'],
                ingredients: [
                    { ingredient_id: 1, quantity: 1, unit: 'lb', name: 'Chicken Breast' }
                ]
            },
            {
                id: 2,
                title: 'Vegetable Pasta',
                description: 'Delicious vegetable pasta',
                prep_time: 10,
                cook_time: 15,
                serving_count: 2,
                favorite: false,
                labels: ['vegetarian', 'Lunch'],
                ingredients: [
                    { ingredient_id: 2, quantity: 1, unit: 'lb', name: 'Pasta' }
                ]
            },
            {
                id: 3,
                title: 'Chocolate Cake',
                description: 'Rich chocolate cake',
                prep_time: 30,
                cook_time: 45,
                serving_count: 8,
                favorite: true,
                labels: ['dessert', 'sweet'],
                ingredients: [
                    { ingredient_id: 3, quantity: 2, unit: 'cups', name: 'Flour' }
                ]
            }
        ];
    }

    render() {
        this.container.innerHTML = `
            <div id="recipe-tab">
                <input id="recipe-search" type="text" value="${this.searchTerm}">
                <button id="favorites-filter-btn">Favorites</button>
                
                <!-- Info Bar -->
                <div class="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4 text-sm font-bold text-gray-800 dark:text-white">
                                <div class="flex items-center space-x-1">
                                    <span><strong id="recipe-count">0</strong> recipes</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span><strong id="label-count">0</strong> labels</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span><strong id="favorite-count">0</strong> favs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="recipes-grid"></div>
                <div id="empty-state" class="hidden"></div>
            </div>
        `;
        
        // Initial info bar update
        this.updateRecipeDisplay();
    }

    getFilteredRecipes() {
        let filtered = this.recipes;
        
        // Apply search filter
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(term) ||
                recipe.description.toLowerCase().includes(term)
            );
        }
        
        // Apply label filter
        if (this.selectedLabels.length > 0) {
            filtered = filtered.filter(recipe =>
                this.selectedLabels.some(label =>
                    recipe.labels && recipe.labels.includes(label)
                )
            );
        }
        
        // Apply favorites filter
        if (this.showFavoritesOnly) {
            filtered = filtered.filter(recipe => recipe.favorite === true);
        }
        
        return filtered;
    }

    getFilteredLabels() {
        const filteredRecipes = this.getFilteredRecipes();
        const allLabels = new Set();
        
        filteredRecipes.forEach(recipe => {
            if (recipe.labels) {
                recipe.labels.forEach(label => allLabels.add(label));
            }
            // Include "Favorite" as a label when recipe is favorited
            if (recipe.favorite === true) {
                allLabels.add('Favorite');
            }
        });
        
        return Array.from(allLabels);
    }

    updateRecipeDisplay() {
        console.log('🔄 updateRecipeDisplay called');
        
        const recipeGrid = this.container.querySelector('#recipes-grid');
        const emptyState = this.container.querySelector('#empty-state');
        const infoBar = this.container.querySelector('.bg-gray-50');
        
        if (recipeGrid && emptyState && infoBar) {
            const filteredRecipes = this.getFilteredRecipes();
            
            // Update recipe grid
            recipeGrid.innerHTML = this.renderRecipeCards(filteredRecipes);
            
            // Update empty state
            if (filteredRecipes.length > 0) {
                emptyState.classList.add('hidden');
            } else {
                emptyState.classList.remove('hidden');
            }
            
            // Update info bar
            this.updateInfoBar(infoBar);
        }
    }

    updateInfoBar(infoBar) {
        const filteredRecipes = this.getFilteredRecipes();
        const filteredLabels = this.getFilteredLabels();
        const filteredFavorites = filteredRecipes.filter(recipe => recipe.favorite === true);
        
        console.log('📊 Info bar update:', {
            recipes: filteredRecipes.length,
            labels: filteredLabels.length,
            favorites: filteredFavorites.length
        });
        
        // Update counts in the info bar
        const recipeCount = infoBar.querySelector('#recipe-count');
        const labelCount = infoBar.querySelector('#label-count');
        const favoriteCount = infoBar.querySelector('#favorite-count');
        
        if (recipeCount) recipeCount.textContent = filteredRecipes.length;
        if (labelCount) labelCount.textContent = filteredLabels.length;
        if (favoriteCount) favoriteCount.textContent = filteredFavorites.length;
    }

    renderRecipeCards(recipes) {
        return recipes.map(recipe => `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <button class="toggle-favorite" data-recipe-id="${recipe.id}">
                    ${recipe.favorite ? '★' : '☆'}
                </button>
            </div>
        `).join('');
    }

    toggleFavorite(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            recipe.favorite = !recipe.favorite;
            this.updateRecipeDisplay(); // This should update the info bar
        }
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#recipe-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.updateRecipeDisplay(); // This should update the info bar
            });
        }

        // Favorites button
        const favoritesBtn = this.container.querySelector('#favorites-filter-btn');
        if (favoritesBtn) {
            favoritesBtn.addEventListener('click', () => {
                this.showFavoritesOnly = !this.showFavoritesOnly;
                this.updateRecipeDisplay(); // This should update the info bar
            });
        }

        // Favorite toggle buttons
        this.container.querySelectorAll('.toggle-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(btn.dataset.recipeId);
                this.toggleFavorite(recipeId);
            });
        });
    }
}

describe('Recipe Manager Info Box Updates', () => {
    let dom;
    let container;
    let recipeManager;

    beforeEach(() => {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <div id="recipe-container"></div>
                </body>
            </html>
        `);
        
        global.window = dom.window;
        global.document = dom.window.document;
        global.console = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };
        
        container = dom.window.document.getElementById('recipe-container');
        recipeManager = new MockRecipeManagerWithInfoBox(container);
    });

    describe('Info Bar Initial State', () => {
        it('should display correct counts on initial load', () => {
            recipeManager.init();
            
            const recipeCount = container.querySelector('#recipe-count');
            const labelCount = container.querySelector('#label-count');
            const favoriteCount = container.querySelector('#favorite-count');
            
            expect(recipeCount.textContent).toBe('3'); // All 3 recipes
            expect(labelCount.textContent).toBe('8'); // All unique labels (protein-rich, low-carb, Dinner, vegetarian, Lunch, dessert, sweet) + Favorite
            expect(favoriteCount.textContent).toBe('2'); // 2 favorites
        });

        it('should have info bar element present', () => {
            recipeManager.init();
            
            const infoBar = container.querySelector('.bg-gray-50');
            expect(infoBar).toBeTruthy();
        });
    });

    describe('Search Filtering Info Bar Updates', () => {
        beforeEach(() => {
            recipeManager.init();
        });

        it('should update info bar when searching', () => {
            // Search for "chicken"
            recipeManager.searchTerm = 'chicken';
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            const labelCount = container.querySelector('#label-count');
            const favoriteCount = container.querySelector('#favorite-count');
            
            expect(recipeCount.textContent).toBe('1'); // Only chicken recipe
            expect(labelCount.textContent).toBe('4'); // Labels from chicken recipe + Favorite
            expect(favoriteCount.textContent).toBe('1'); // Chicken is favorite
        });

        it('should update info bar when search returns no results', () => {
            recipeManager.searchTerm = 'nonexistent';
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            const labelCount = container.querySelector('#label-count');
            const favoriteCount = container.querySelector('#favorite-count');
            
            expect(recipeCount.textContent).toBe('0');
            expect(labelCount.textContent).toBe('0');
            expect(favoriteCount.textContent).toBe('0');
        });

        it('should update info bar when clearing search', () => {
            // First search
            recipeManager.searchTerm = 'chicken';
            recipeManager.updateRecipeDisplay();
            
            // Then clear search
            recipeManager.searchTerm = '';
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            expect(recipeCount.textContent).toBe('3'); // Back to all recipes
        });

        it('should trigger info bar update via search input event', () => {
            const searchInput = container.querySelector('#recipe-search');
            const updateSpy = vi.spyOn(recipeManager, 'updateRecipeDisplay');
            
            // Simulate typing in search
            searchInput.value = 'pasta';
            searchInput.dispatchEvent(new dom.window.Event('input'));
            
            expect(updateSpy).toHaveBeenCalled();
            expect(recipeManager.searchTerm).toBe('pasta');
        });
    });

    describe('Label Filtering Info Bar Updates', () => {
        beforeEach(() => {
            recipeManager.init();
        });

        it('should update info bar when filtering by labels', () => {
            recipeManager.selectedLabels = ['vegetarian'];
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            const labelCount = container.querySelector('#label-count');
            const favoriteCount = container.querySelector('#favorite-count');
            
            expect(recipeCount.textContent).toBe('1'); // Only vegetarian recipe
            expect(labelCount.textContent).toBe('2'); // Labels from vegetarian recipe
            expect(favoriteCount.textContent).toBe('0'); // Vegetarian recipe is not favorite
        });

        it('should update info bar when filtering by multiple labels', () => {
            recipeManager.selectedLabels = ['Dinner', 'protein-rich'];
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            expect(recipeCount.textContent).toBe('1'); // Only chicken recipe has both labels
        });
    });

    describe('Favorites Filtering Info Bar Updates', () => {
        beforeEach(() => {
            recipeManager.init();
        });

        it('should update info bar when showing favorites only', () => {
            recipeManager.showFavoritesOnly = true;
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            const favoriteCount = container.querySelector('#favorite-count');
            
            expect(recipeCount.textContent).toBe('2'); // Only favorite recipes
            expect(favoriteCount.textContent).toBe('2'); // All displayed are favorites
        });

        it('should trigger info bar update via favorites button click', () => {
            const favoritesBtn = container.querySelector('#favorites-filter-btn');
            const updateSpy = vi.spyOn(recipeManager, 'updateRecipeDisplay');
            
            favoritesBtn.click();
            
            expect(updateSpy).toHaveBeenCalled();
            expect(recipeManager.showFavoritesOnly).toBe(true);
        });
    });

    describe('Recipe Modification Info Bar Updates', () => {
        beforeEach(() => {
            recipeManager.init();
        });

        it('should update info bar when toggling favorite status', () => {
            // Initially 2 favorites
            let favoriteCount = container.querySelector('#favorite-count');
            expect(favoriteCount.textContent).toBe('2');
            
            // Toggle favorite on non-favorite recipe (Vegetable Pasta)
            recipeManager.toggleFavorite(2);
            
            favoriteCount = container.querySelector('#favorite-count');
            expect(favoriteCount.textContent).toBe('3'); // Now 3 favorites
        });

        it('should update info bar when removing favorite status', () => {
            // Toggle favorite off on favorite recipe (Chicken Stir Fry)
            recipeManager.toggleFavorite(1);
            
            const favoriteCount = container.querySelector('#favorite-count');
            expect(favoriteCount.textContent).toBe('1'); // Now 1 favorite
        });

        it('should trigger info bar update via favorite button click', () => {
            const updateSpy = vi.spyOn(recipeManager, 'updateRecipeDisplay');
            
            // Click favorite button on first recipe
            const favoriteBtn = container.querySelector('.toggle-favorite[data-recipe-id="1"]');
            favoriteBtn.click();
            
            expect(updateSpy).toHaveBeenCalled();
        });
    });

    describe('Combined Filtering Info Bar Updates', () => {
        beforeEach(() => {
            recipeManager.init();
        });

        it('should update info bar with search + favorites filter', () => {
            recipeManager.searchTerm = 'c'; // Matches "Chicken" and "Chocolate"
            recipeManager.showFavoritesOnly = true; // Both are favorites
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            const favoriteCount = container.querySelector('#favorite-count');
            
            expect(recipeCount.textContent).toBe('2'); // Chicken + Chocolate
            expect(favoriteCount.textContent).toBe('2'); // Both are favorites
        });

        it('should update info bar with search + labels filter', () => {
            recipeManager.searchTerm = 'e'; // Matches "Vegetable" and "Chocolate"
            recipeManager.selectedLabels = ['vegetarian']; // Only Vegetable Pasta
            recipeManager.updateRecipeDisplay();
            
            const recipeCount = container.querySelector('#recipe-count');
            expect(recipeCount.textContent).toBe('1'); // Only Vegetable Pasta
        });
    });

    describe('updateRecipeDisplay Method', () => {
        beforeEach(() => {
            recipeManager.init();
        });

        it('should call updateInfoBar when updateRecipeDisplay is called', () => {
            const updateInfoBarSpy = vi.spyOn(recipeManager, 'updateInfoBar');
            
            recipeManager.updateRecipeDisplay();
            
            expect(updateInfoBarSpy).toHaveBeenCalled();
        });

        it('should handle missing info bar element gracefully', () => {
            // Remove info bar element
            const infoBar = container.querySelector('.bg-gray-50');
            infoBar.remove();
            
            // Should not throw error
            expect(() => {
                recipeManager.updateRecipeDisplay();
            }).not.toThrow();
        });

        it('should update recipe grid and info bar in same call', () => {
            recipeManager.searchTerm = 'chicken';
            recipeManager.updateRecipeDisplay();
            
            // Check recipe grid updated
            const recipeCards = container.querySelectorAll('.recipe-card');
            expect(recipeCards).toHaveLength(1);
            
            // Check info bar updated
            const recipeCount = container.querySelector('#recipe-count');
            expect(recipeCount.textContent).toBe('1');
        });
    });

    describe('Info Bar Selector Robustness', () => {
        beforeEach(() => {
            recipeManager.init();
        });

        it('should find info bar with specific selector', () => {
            const infoBar = container.querySelector('.border-t.border-gray-200 .bg-gray-50');
            expect(infoBar).toBeTruthy();
        });

        it('should find info bar with rounded selector', () => {
            const infoBar = container.querySelector('.bg-gray-50.rounded-lg');
            expect(infoBar).toBeTruthy();
        });

        it('should find info bar with generic selector', () => {
            const infoBar = container.querySelector('.bg-gray-50');
            expect(infoBar).toBeTruthy();
        });
    });
});
