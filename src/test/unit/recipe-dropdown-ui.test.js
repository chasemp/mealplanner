import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock RecipeManager for UI testing
class MockRecipeManagerUI {
    constructor(container) {
        this.container = container;
        this.recipes = [
            {
                id: 1,
                title: 'Grilled Chicken with Vegetables',
                meal_type: 'dinner',
                labels: ['healthy', 'protein', 'chicken'],
                tags: ['healthy', 'protein', 'chicken'],
                servings: 4,
                favorite: false
            },
            {
                id: 2,
                title: 'Scrambled Eggs and Toast',
                meal_type: 'breakfast',
                labels: ['breakfast', 'quick', 'easy'],
                tags: ['breakfast', 'quick', 'easy'],
                servings: 2,
                favorite: true
            },
            {
                id: 3,
                title: 'Greek Salad',
                meal_type: 'lunch',
                labels: ['healthy', 'vegetarian'],
                tags: ['healthy', 'vegetarian'],
                servings: 4,
                favorite: false
            }
        ];
        this.searchTerm = '';
        this.selectedCategory = 'all';
        this.selectedLabel = 'all';
        this.sortBy = 'name';
        this.showFavoritesOnly = false;
    }

    getFilteredRecipes() {
        let filtered = this.recipes;

        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(recipe => 
                recipe.title.toLowerCase().includes(term) ||
                (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(term))) ||
                (recipe.labels && recipe.labels.some(label => label.toLowerCase().includes(term)))
            );
        }

        if (this.selectedCategory !== 'all') {
            filtered = filtered.filter(recipe => recipe.meal_type === this.selectedCategory);
        }

        if (this.selectedLabel !== 'all') {
            filtered = filtered.filter(recipe => {
                const recipeLabels = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ];
                return recipeLabels.some(label => label.toLowerCase() === this.selectedLabel.toLowerCase());
            });
        }

        if (this.showFavoritesOnly) {
            filtered = filtered.filter(recipe => recipe.favorite === true);
        }

        filtered.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'serving_count':
                    return (b.servings || 0) - (a.servings || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    getAllLabels() {
        const labels = new Set();
        this.recipes.forEach(recipe => {
            if (recipe.labels) recipe.labels.forEach(label => labels.add(label));
            if (recipe.tags) recipe.tags.forEach(tag => labels.add(tag));
        });
        return Array.from(labels).sort();
    }

    getUniqueLabels() {
        const filteredRecipes = this.getFilteredRecipes();
        const labels = new Set();
        filteredRecipes.forEach(recipe => {
            if (recipe.labels) recipe.labels.forEach(label => labels.add(label));
            if (recipe.tags) recipe.tags.forEach(tag => labels.add(tag));
        });
        return Array.from(labels);
    }

    getFavoriteRecipes() {
        return this.recipes.filter(recipe => recipe.favorite === true);
    }

    render() {
        this.container.innerHTML = `
            <div class="recipe-manager">
                <!-- Header with Search and Filters -->
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                    <div class="flex-1 max-w-lg">
                        <div class="relative">
                            <input type="text" id="recipe-search" 
                                   placeholder="Search recipes..." 
                                   value="${this.searchTerm}"
                                   class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <!-- Filter Controls -->
                        <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-1">
                            <select id="recipe-category" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full sm:w-40">
                                <option value="all" ${this.selectedCategory === 'all' ? 'selected' : ''}>All Meal Types</option>
                                <option value="breakfast" ${this.selectedCategory === 'breakfast' ? 'selected' : ''}>Breakfast</option>
                                <option value="lunch" ${this.selectedCategory === 'lunch' ? 'selected' : ''}>Lunch</option>
                                <option value="dinner" ${this.selectedCategory === 'dinner' ? 'selected' : ''}>Dinner</option>
                                <option value="snack" ${this.selectedCategory === 'snack' ? 'selected' : ''}>Snack</option>
                            </select>
                            
                            <select id="recipe-label" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full sm:w-36">
                                <option value="all" ${this.selectedLabel === 'all' ? 'selected' : ''}>All Labels</option>
                                ${this.getAllLabels().map(label => `
                                    <option value="${label}" ${this.selectedLabel === label ? 'selected' : ''}>${label}</option>
                                `).join('')}
                            </select>
                            
                            <select id="recipe-sort" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full sm:w-44">
                                <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>Sort by Name</option>
                                <option value="date" ${this.sortBy === 'date' ? 'selected' : ''}>Sort by Date</option>
                                <option value="prep_time" ${this.sortBy === 'prep_time' ? 'selected' : ''}>Sort by Prep Time</option>
                                <option value="serving_count" ${this.sortBy === 'serving_count' ? 'selected' : ''}>Sort by Servings</option>
                            </select>
                            
                            <!-- Clear Filters Button -->
                            <button id="clear-recipe-filters-btn" class="border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors w-full sm:w-32">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Recipe Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.getFilteredRecipes().length}</div>
                        <div class="text-sm text-gray-600">Total Recipes</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${this.getUniqueLabels().length}</div>
                        <div class="text-sm text-gray-600">Labels</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50 transition-colors ${this.showFavoritesOnly ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}" id="favorites-filter-btn">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-2xl font-bold text-purple-600">${this.getFavoriteRecipes().length}</div>
                                <div class="text-sm text-gray-600">Favorites ${this.showFavoritesOnly ? '(Active)' : ''}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recipe Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.getFilteredRecipes().map(recipe => `
                        <div class="bg-white rounded-lg shadow-md recipe-card" data-recipe-id="${recipe.id}">
                            <div class="p-6">
                                <h3 class="text-lg font-semibold text-gray-900">${recipe.title}</h3>
                                <p class="text-sm text-gray-600">${recipe.meal_type}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#recipe-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.render();
            });
        }

        // Category filter
        const categorySelect = this.container.querySelector('#recipe-category');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.selectedCategory = e.target.value;
                this.render();
            });
        }

        // Label filter
        const labelSelect = this.container.querySelector('#recipe-label');
        if (labelSelect) {
            labelSelect.addEventListener('change', (e) => {
                this.selectedLabel = e.target.value;
                this.render();
            });
        }

        // Sort selector
        const sortSelect = this.container.querySelector('#recipe-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.render();
            });
        }

        // Clear filters button
        const clearFiltersBtn = this.container.querySelector('#clear-recipe-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.searchTerm = '';
                this.selectedCategory = 'all';
                this.selectedLabel = 'all';
                this.sortBy = 'name';
                this.showFavoritesOnly = false;
                this.render();
            });
        }

        // Favorites filter button
        const favoritesBtn = this.container.querySelector('#favorites-filter-btn');
        if (favoritesBtn) {
            favoritesBtn.addEventListener('click', () => {
                this.showFavoritesOnly = !this.showFavoritesOnly;
                this.render();
            });
        }
    }
}

describe('Recipe Dropdown UI Tests', () => {
    let dom;
    let container;
    let recipeManager;

    beforeEach(() => {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <div id="recipe-container"></div>
            </body>
            </html>
        `);
        
        global.document = dom.window.document;
        global.window = dom.window;
        
        container = document.getElementById('recipe-container');
        recipeManager = new MockRecipeManagerUI(container);
        recipeManager.render();
    });

    describe('Dropdown Responsiveness', () => {
        it('should have proper width classes for desktop display', () => {
            const categorySelect = container.querySelector('#recipe-category');
            const labelSelect = container.querySelector('#recipe-label');
            const sortSelect = container.querySelector('#recipe-sort');
            const clearBtn = container.querySelector('#clear-recipe-filters-btn');
            
            expect(categorySelect.className).toContain('sm:w-40');
            expect(labelSelect.className).toContain('sm:w-36');
            expect(sortSelect.className).toContain('sm:w-44');
            expect(clearBtn.className).toContain('sm:w-32');
            
            // Should be full width on mobile
            expect(categorySelect.className).toContain('w-full');
            expect(labelSelect.className).toContain('w-full');
            expect(sortSelect.className).toContain('w-full');
            expect(clearBtn.className).toContain('w-full');
        });

        it('should have proper spacing and layout classes', () => {
            const filterContainer = container.querySelector('.flex.flex-col.sm\\:flex-row.items-stretch.sm\\:items-center');
            
            expect(filterContainer).toBeTruthy();
            expect(filterContainer.className).toContain('space-y-2');
            expect(filterContainer.className).toContain('sm:space-y-0');
            expect(filterContainer.className).toContain('sm:space-x-4');
        });
    });

    describe('Dropdown Event Handling', () => {
        it('should handle meal type dropdown changes', () => {
            const categorySelect = container.querySelector('#recipe-category');
            
            // Change to breakfast
            categorySelect.value = 'breakfast';
            categorySelect.dispatchEvent(new dom.window.Event('change'));
            
            expect(recipeManager.selectedCategory).toBe('breakfast');
            
            // Check that only breakfast recipes are shown
            const recipeCards = container.querySelectorAll('.recipe-card');
            expect(recipeCards).toHaveLength(1);
            expect(recipeCards[0].textContent).toContain('Scrambled Eggs and Toast');
        });

        it('should handle label dropdown changes', () => {
            const labelSelect = container.querySelector('#recipe-label');
            
            // Change to healthy
            labelSelect.value = 'healthy';
            labelSelect.dispatchEvent(new dom.window.Event('change'));
            
            expect(recipeManager.selectedLabel).toBe('healthy');
            
            // Check that only healthy recipes are shown
            const recipeCards = container.querySelectorAll('.recipe-card');
            expect(recipeCards.length).toBeGreaterThan(0);
            
            // All shown recipes should have healthy label
            recipeCards.forEach(card => {
                const recipeId = parseInt(card.getAttribute('data-recipe-id'));
                const recipe = recipeManager.recipes.find(r => r.id === recipeId);
                const hasHealthyLabel = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ].includes('healthy');
                expect(hasHealthyLabel).toBe(true);
            });
        });

        it('should handle sort dropdown changes', () => {
            const sortSelect = container.querySelector('#recipe-sort');
            
            // Change to servings
            sortSelect.value = 'serving_count';
            sortSelect.dispatchEvent(new dom.window.Event('change'));
            
            expect(recipeManager.sortBy).toBe('serving_count');
            
            // Check that recipes are sorted by servings (descending)
            const recipeCards = container.querySelectorAll('.recipe-card');
            const titles = Array.from(recipeCards).map(card => 
                card.querySelector('h3').textContent
            );
            
            // Should be sorted by servings (descending): Both Grilled Chicken (4) and Greek Salad (4) first, then Scrambled Eggs (2)
            // Since both have 4 servings, order may vary, so just check the last one
            expect(titles[titles.length - 1]).toBe('Scrambled Eggs and Toast');
        });

        it('should handle search input changes', () => {
            const searchInput = container.querySelector('#recipe-search');
            
            // Search for "chicken"
            searchInput.value = 'chicken';
            searchInput.dispatchEvent(new dom.window.Event('input'));
            
            expect(recipeManager.searchTerm).toBe('chicken');
            
            // Check that only chicken recipes are shown
            const recipeCards = container.querySelectorAll('.recipe-card');
            expect(recipeCards).toHaveLength(1);
            expect(recipeCards[0].textContent).toContain('Grilled Chicken with Vegetables');
        });

        it('should handle clear filters button', () => {
            // Set some filters
            recipeManager.searchTerm = 'test';
            recipeManager.selectedCategory = 'dinner';
            recipeManager.selectedLabel = 'healthy';
            recipeManager.sortBy = 'serving_count';
            recipeManager.showFavoritesOnly = true;
            
            const clearBtn = container.querySelector('#clear-recipe-filters-btn');
            clearBtn.click();
            
            // All filters should be reset
            expect(recipeManager.searchTerm).toBe('');
            expect(recipeManager.selectedCategory).toBe('all');
            expect(recipeManager.selectedLabel).toBe('all');
            expect(recipeManager.sortBy).toBe('name');
            expect(recipeManager.showFavoritesOnly).toBe(false);
        });

        it('should handle favorites filter button', () => {
            const favoritesBtn = container.querySelector('#favorites-filter-btn');
            
            // Initially not showing favorites only
            expect(recipeManager.showFavoritesOnly).toBe(false);
            
            // Click to show favorites only
            favoritesBtn.click();
            expect(recipeManager.showFavoritesOnly).toBe(true);
            
            // Check that only favorite recipes are shown
            const recipeCards = container.querySelectorAll('.recipe-card');
            expect(recipeCards).toHaveLength(1);
            expect(recipeCards[0].textContent).toContain('Scrambled Eggs and Toast');
        });
    });

    describe('Statistics Updates', () => {
        it('should update recipe count when filtering', () => {
            // Filter by breakfast
            recipeManager.selectedCategory = 'breakfast';
            recipeManager.render();
            
            const recipeCountElement = container.querySelector('.text-2xl.font-bold.text-blue-600');
            expect(recipeCountElement.textContent).toBe('1');
        });

        it('should update label count when filtering', () => {
            // Filter by breakfast
            recipeManager.selectedCategory = 'breakfast';
            recipeManager.render();
            
            const labelCountElement = container.querySelector('.text-2xl.font-bold.text-green-600');
            const labelCount = parseInt(labelCountElement.textContent);
            
            // Should show fewer labels when filtered
            expect(labelCount).toBeLessThan(recipeManager.getAllLabels().length);
        });

        it('should show favorites count correctly', () => {
            const favoritesCountElement = container.querySelector('.text-2xl.font-bold.text-purple-600');
            expect(favoritesCountElement.textContent).toBe('1');
        });
    });

    describe('Dropdown Options Generation', () => {
        it('should populate label dropdown with all available labels', () => {
            const labelSelect = container.querySelector('#recipe-label');
            const options = labelSelect.querySelectorAll('option');
            
            // Should have "All Labels" plus all unique labels
            expect(options.length).toBeGreaterThan(1);
            expect(options[0].textContent).toBe('All Labels');
            
            // Should contain expected labels
            const optionTexts = Array.from(options).map(opt => opt.textContent);
            expect(optionTexts).toContain('healthy');
            expect(optionTexts).toContain('breakfast');
            expect(optionTexts).toContain('vegetarian');
        });

        it('should have correct selected states for dropdowns', () => {
            // Set some filters
            recipeManager.selectedCategory = 'dinner';
            recipeManager.selectedLabel = 'healthy';
            recipeManager.sortBy = 'serving_count';
            recipeManager.render();
            
            const categorySelect = container.querySelector('#recipe-category');
            const labelSelect = container.querySelector('#recipe-label');
            const sortSelect = container.querySelector('#recipe-sort');
            
            expect(categorySelect.value).toBe('dinner');
            expect(labelSelect.value).toBe('healthy');
            expect(sortSelect.value).toBe('serving_count');
        });
    });
});
