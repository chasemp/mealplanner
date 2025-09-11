// Recipe Management Component
class RecipeManager {
    constructor(container) {
        this.container = container;
        this.recipes = [];
        this.ingredients = [];
        this.currentRecipe = null;
        this.searchTerm = '';
        this.selectedLabels = []; // Changed to array for multi-select
        this.labelSearchTerm = ''; // For typeahead filtering
        this.sortBy = 'name';
        this.sortAscending = true; // New property for sort direction
        this.showFavoritesOnly = false;
        this.init();
    }

    async init() {
        console.log('🍳 Initializing Recipe Manager...');
        await this.loadIngredients();
        await this.loadRecipes();
        this.render();
        this.attachEventListeners();
    }

    async loadIngredients() {
        console.log('📱 Recipe Manager loading ingredients from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            this.ingredients = window.mealPlannerSettings.getAuthoritativeData('ingredients');
            console.log(`✅ Recipe Manager loaded ${this.ingredients.length} ingredients from authoritative source`);
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty ingredients');
            this.ingredients = [];
        }
    }

    async loadRecipes() {
        console.log('📱 Loading recipes from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            this.recipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            console.log(`✅ Recipe Manager loaded ${this.recipes.length} recipes from authoritative source`);
            if (this.recipes.length > 0) {
                console.log('📱 First recipe:', this.recipes[0]);
            }
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty recipes');
            this.recipes = [];
        }
        
        console.log('📱 Final recipes count:', this.recipes.length);
    }

    async saveRecipes() {
        try {
            // Save recipes using the centralized data authority
            if (window.mealPlannerSettings) {
                window.mealPlannerSettings.saveAuthoritativeData('recipes', this.recipes);
            } else {
                console.warn('⚠️ Settings manager not available, falling back to localStorage');
                localStorage.setItem('mealplanner-recipes', JSON.stringify(this.recipes));
            }
            console.log('✅ Recipes saved successfully');
        } catch (error) {
            console.error('❌ Error saving recipes:', error);
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="recipe-manager">
                <!-- Header with Add Button -->
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Recipes</h2>
                    <button id="add-recipe-btn" class="btn-primary flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>Add Recipe</span>
                    </button>
                </div>

                <!-- Search and Filter Controls -->
                <!-- 
                LAYOUT STRATEGY: 5-column layout matching Meals tab exactly
                - Mobile: All inputs stack vertically (grid-cols-1)
                - Desktop: 5-column grid with Search+Sort sharing first column (md:grid-cols-5)
                
                COLUMN DISTRIBUTION:
                1. Search + Sort (side-by-side on same line): Exception grouping
                2. Multi-Label Filter (1 column): Gets its own column  
                3. Clear Filters (1 column): Gets its own column
                4. [Empty/Future expansion]
                
                DESIGN RATIONALE:
                - Compact 4-column layout after removing meal type dropdown
                - Search + Sort share first column (side-by-side on same line)
                - Multi-label filter handles meal types as orange labels
                - Each other filter gets individual column for clarity
                -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
                    <!-- Row 1: Search + Sort (side-by-side on same line) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <!-- Search Input (left side) -->
                        <div>
                            <label for="recipe-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Recipes</label>
                            <div class="relative">
                                <input type="text" id="recipe-search" 
                                       placeholder="Search by name..." 
                                       value="${this.searchTerm}"
                                       class="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400">
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <!-- Sort + Direction (right side) -->
                        <div>
                            <label for="recipe-sort" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort</label>
                            <!-- Sort dropdown + Direction button in flex layout -->
                            <div class="flex gap-2">
                                <select id="recipe-sort" class="w-full md:w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                    <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>Name</option>
                                    <option value="date" ${this.sortBy === 'date' ? 'selected' : ''}>Created</option>
                                    <option value="prep_time" ${this.sortBy === 'prep_time' ? 'selected' : ''}>Total Time</option>
                                    <option value="serving_count" ${this.sortBy === 'serving_count' ? 'selected' : ''}>Servings</option>
                                    <option value="label_type" ${this.sortBy === 'label_type' ? 'selected' : ''}>Label Type</option>
                                </select>
                                <button id="sort-direction-btn" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors" title="${this.sortAscending ? 'Sort Ascending' : 'Sort Descending'}">
                                    ${this.sortAscending ? 
                                        '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>' : 
                                        '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Row 2: Multi-Label Filter -->
                    <div class="mb-4">
                        <label for="recipe-labels" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Labels</label>
                        <!-- Multi-select label input with typeahead and chips -->
                        <div class="relative">
                            <div id="recipe-labels-container" class="w-full min-h-[42px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-text flex flex-wrap gap-1 items-center">
                                ${this.selectedLabels.map(label => {
                                    const labelType = this.inferLabelType(label);
                                    const icon = window.labelTypes ? window.labelTypes.getIcon(labelType) : '';
                                    const colors = window.labelTypes ? window.labelTypes.getColorClasses(labelType) : 
                                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                                    const buttonColors = this.getLabelButtonColors(labelType);
                                    return `
                                    <span class="inline-flex items-center px-2 py-1 text-xs font-bold ${colors} rounded-full">
                                        ${icon}${label}
                                        <button type="button" class="ml-1 ${buttonColors}" onclick="window.recipeManager.removeLabel('${label}')">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </span>
                                    `;
                                }).join('')}
                                <input 
                                    type="text" 
                                    id="recipe-labels-input" 
                                    class="flex-1 min-w-[120px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400" 
                                    placeholder="${this.selectedLabels.length > 0 ? 'Type to add more...' : 'Type to search labels...'}"
                                    autocomplete="off"
                                />
                            </div>
                            <div id="recipe-labels-dropdown" class="absolute z-40 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg hidden max-h-48 overflow-y-auto">
                                <!-- Dropdown options will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Row 3: Clear Filters Button -->
                    <div>
                        <button id="clear-recipe-filters-btn" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition-colors">
                            Clear Filters
                        </button>
                    </div>
                    
                    <!-- Recipe Results Info Bar (enhanced with more emphasis) -->
                    <div class="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                            <div class="flex items-center justify-between">
                                <!-- Left side: Results summary -->
                                <div class="flex items-center space-x-4 text-sm font-bold text-gray-800 dark:text-white" style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">
                                <div class="flex items-center space-x-1">
                                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                    <span><strong>${this.getFilteredRecipes().length}</strong> recipes</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                    </svg>
                                    <span><strong>${this.getFilteredLabels().length}</strong> labels</span>
                                </div>
                                ${this.getFilteredComboRecipes().length > 0 ? `
                                    <div class="flex items-center space-x-1">
                                        <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                        </svg>
                                        <span><strong>${this.getFilteredComboRecipes().length}</strong> combos</span>
                                    </div>
                                ` : ''}
                            </div>

                            <!-- Right side: Filter indicators and actions -->
                            <div class="flex items-center space-x-3">
                                ${this.hasActiveFilters() ? `
                                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        <svg class="w-3 h-3 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                                        </svg>
                                        <span class="hidden sm:inline">Filtered</span>
                                    </span>
                                ` : ''}
                                <button id="favorites-filter-btn" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${this.showFavoritesOnly ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-yellow-50 hover:text-yellow-700'}" title="${this.showFavoritesOnly ? 'Show all recipes' : `Filter to ${this.getFavoriteRecipes().length} favorites`}">
                                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    ${this.showFavoritesOnly ? `Showing ${this.getFilteredRecipes().length}` : `${this.getFavoriteRecipes().length} Favorites`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <!-- Recipe Grid -->
                <div id="recipes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.renderRecipeCards()}
                </div>

                <!-- Empty State -->
                <div id="empty-state" class="${this.getFilteredRecipes().length === 0 ? '' : 'hidden'}">
                    ${this.getFilteredRecipes().length === 0 ? this.renderEmptyState() : ''}
                </div>
            </div>
        `;
        
        // Re-attach event listeners after rendering
        this.attachEventListeners();
    }

    updateRecipeDisplay() {
        // Update only the recipe cards, info bar, and empty state without re-rendering entire component
        const recipeGrid = this.container.querySelector('#recipes-grid');
        const emptyState = this.container.querySelector('#empty-state');
        const infoBar = this.container.querySelector('.bg-gray-50.dark\\:bg-gray-700');
        
        if (recipeGrid && emptyState) {
            const filteredRecipes = this.getFilteredRecipes();
            recipeGrid.innerHTML = this.renderRecipeCards();
            
            // Re-attach event listeners to the new recipe cards
            this.attachRecipeCardListeners();
            
            // Update empty state visibility
            if (filteredRecipes.length > 0) {
                emptyState.classList.add('hidden');
            } else {
                emptyState.classList.remove('hidden');
            }
            
            // Update info bar content
            if (infoBar) {
                this.updateInfoBar(infoBar);
            }
        }
    }

    updateInfoBar(infoBar) {
        // Get current filtered data for accurate counts
        const filteredRecipes = this.getFilteredRecipes();
        const filteredLabels = this.getFilteredLabels();
        const filteredComboRecipes = this.getFilteredComboRecipes();
        const favoriteRecipes = this.getFavoriteRecipes();
        
        console.log('📊 Info bar update:', {
            totalRecipes: this.recipes.length,
            filteredRecipes: filteredRecipes.length,
            filteredLabels: filteredLabels.length,
            filteredCombos: filteredComboRecipes.length,
            favoriteRecipes: favoriteRecipes.length,
            showFavoritesOnly: this.showFavoritesOnly
        });
        
        // Update the left side stats
        const leftSide = infoBar.querySelector('.flex.items-center.space-x-6');
        if (leftSide) {
            leftSide.innerHTML = `
                <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span><strong>${filteredRecipes.length}</strong> recipes</span>
                </div>
                <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <span><strong>${filteredLabels.length}</strong> labels</span>
                </div>
                ${filteredComboRecipes.length > 0 ? `
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <span><strong>${filteredComboRecipes.length}</strong> combos</span>
                    </div>
                ` : ''}
            `;
        }

        // Update the right side actions
        const rightSide = infoBar.querySelector('.flex.items-center.space-x-3');
        if (rightSide) {
            rightSide.innerHTML = `
                ${this.hasActiveFilters() ? `
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <svg class="w-3 h-3 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        <span class="hidden sm:inline">Filtered</span>
                    </span>
                ` : ''}
                <button id="favorites-filter-btn" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${this.showFavoritesOnly ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-yellow-50 hover:text-yellow-700'}" title="${this.showFavoritesOnly ? 'Show all recipes' : `Filter to ${favoriteRecipes.length} favorites`}">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    ${this.showFavoritesOnly ? `Showing ${filteredRecipes.length}` : `${favoriteRecipes.length} Favorites`}
                </button>
            `;
            
            // Re-attach the favorites button event listener
            const favoritesBtn = rightSide.querySelector('#favorites-filter-btn');
            if (favoritesBtn) {
                favoritesBtn.addEventListener('click', () => {
                    this.showFavoritesOnly = !this.showFavoritesOnly;
                    this.updateRecipeDisplay();
                });
            }
        }
    }

    attachRecipeCardListeners() {
        // Attach event listeners specifically for recipe cards
        // Toggle favorite buttons
        this.container.querySelectorAll('.toggle-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(btn.dataset.recipeId);
                this.toggleFavorite(recipeId);
            });
        });

        // Edit recipe buttons
        this.container.querySelectorAll('.edit-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(btn.dataset.recipeId);
                this.editRecipe(recipeId);
            });
        });

        // Delete recipe buttons
        this.container.querySelectorAll('.delete-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(btn.dataset.recipeId);
                this.deleteRecipe(recipeId);
            });
        });

        // Recipe card click (for viewing details)
        this.container.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on action buttons
                if (!e.target.closest('.toggle-favorite, .edit-recipe, .delete-recipe')) {
                    const recipeId = parseInt(card.dataset.recipeId);
                    this.showRecipeDetail(recipeId);
                }
            });
        });
    }

    renderRecipeCards() {
        const filteredRecipes = this.getFilteredRecipes();
        
        return filteredRecipes.map(recipe => `
            <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer recipe-card ${recipe.type === 'combo' ? 'border-l-4 border-purple-500' : ''}" 
                 data-recipe-id="${recipe.id}" data-recipe-type="${recipe.type || 'basic'}">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            ${recipe.type === 'combo' ? `
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                    COMBO
                                </span>
                            ` : ''}
                            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${recipe.title}</h3>
                        </div>
                        <div class="flex items-center space-x-1 ml-2">
                            <button class="hover:text-yellow-500 toggle-favorite" data-recipe-id="${recipe.id}" title="${recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}">
                                <svg class="w-4 h-4 ${recipe.favorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}" fill="${recipe.favorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                </svg>
                            </button>
                            <button class="text-gray-400 hover:text-blue-600 edit-recipe" data-recipe-id="${recipe.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600 delete-recipe" data-recipe-id="${recipe.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${recipe.description}</p>
                    
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div class="flex items-center space-x-4">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                ${recipe.prep_time + recipe.cook_time}min
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                ${recipe.serving_count || recipe.servings || 'N/A'} servings
                            </span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex flex-wrap gap-1">
                            ${recipe.favorite ? `
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    Favorite
                                </span>
                            ` : ''}
                            ${this.renderLabelChips(recipe.labels || [], recipe.favorite ? 1 : 2)}
                            ${(recipe.labels || []).length > (recipe.favorite ? 1 : 2) ? `<span class="text-xs text-gray-500">+${(recipe.labels || []).length - (recipe.favorite ? 1 : 2)} more</span>` : ''}
                        </div>
                        <div class="text-xs text-gray-400">
                            ${recipe.type === 'combo' ? 
                                `${recipe.combo_recipes ? recipe.combo_recipes.length : 0} recipes` : 
                                `${recipe.ingredients.length} ingredients`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderEmptyState() {
        return `
            <div class="col-span-full flex flex-col items-center justify-center py-12">
                <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13v13"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                <p class="text-gray-500 text-center mb-4">
                    ${this.searchTerm || this.selectedLabels.length > 0
                        ? 'Try adjusting your search or filters' 
                        : 'Get started by adding your first recipe'}
                </p>
                <button id="add-first-recipe" class="btn-primary">Add Your First Recipe</button>
            </div>
        `;
    }

    getFilteredRecipes() {
        let filtered = this.recipes;

        // Filter by search term
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(recipe => 
                recipe.title.toLowerCase().includes(term) ||
                recipe.description.toLowerCase().includes(term) ||
                (recipe.labels && this.extractLabelNames(recipe.labels).some(label => label.toLowerCase().includes(term)))
            );
        }

        // Note: Meal type filtering is now handled through the multi-label system


        // Filter by labels (AND logic - recipe must have ALL selected labels)
        if (this.selectedLabels.length > 0) {
            filtered = filtered.filter(recipe => {
                const recipeLabels = this.extractLabelNames(recipe.labels || []).map(label => label.toLowerCase());
                return this.selectedLabels.every(selectedLabel => 
                    recipeLabels.includes(selectedLabel.toLowerCase())
                );
            });
        }

        // Filter by favorites
        if (this.showFavoritesOnly) {
            filtered = filtered.filter(recipe => recipe.favorite === true);
        }

        // Sort recipes
        filtered.sort((a, b) => {
            let result = 0;
            
            switch (this.sortBy) {
                case 'name':
                    result = a.title.localeCompare(b.title);
                    break;
                case 'date':
                    // Sort by creation date
                    result = new Date(b.created_at || 0) - new Date(a.created_at || 0);
                    break;
                case 'prep_time':
                    // Sort by total time (prep + cook)
                    const aTotalTime = (a.prep_time || 0) + (a.cook_time || 0);
                    const bTotalTime = (b.prep_time || 0) + (b.cook_time || 0);
                    result = aTotalTime - bTotalTime;
                    break;
                case 'serving_count':
                    // Use 'servings' field from actual data structure
                    result = (b.servings || 0) - (a.servings || 0);
                    break;
                case 'label_type':
                    // Sort by primary label type, then by name within each type
                    const aType = this.getPrimaryLabelType(a.labels || []);
                    const bType = this.getPrimaryLabelType(b.labels || []);
                    
                    // First sort by label type priority (recipe_type first, then default)
                    const typePriority = { 'recipe_type': 0, 'default': 1 };
                    const aPriority = typePriority[aType] ?? 2;
                    const bPriority = typePriority[bType] ?? 2;
                    
                    if (aPriority !== bPriority) {
                        result = aPriority - bPriority;
                    } else {
                        // If same type priority, sort by name
                        result = a.title.localeCompare(b.title);
                    }
                    break;
                default:
                    result = 0;
            }
            
            // Apply sort direction (flip result if descending)
            return this.sortAscending ? result : -result;
        });

        return filtered;
    }

    getUniqueLabels() {
        const labels = new Set();
        this.recipes.forEach(recipe => {
            if (recipe.labels && Array.isArray(recipe.labels)) {
                const labelNames = this.extractLabelNames(recipe.labels);
                labelNames.forEach(label => labels.add(label));
            }
            // Also include tags as labels for backward compatibility
            if (recipe.tags && Array.isArray(recipe.tags)) {
                recipe.tags.forEach(tag => labels.add(tag));
            }
        });
        return Array.from(labels);
    }

    getFilteredLabels() {
        // Get labels only from currently filtered recipes
        const labels = new Set();
        const filteredRecipes = this.getFilteredRecipes();
        filteredRecipes.forEach(recipe => {
            if (recipe.labels && Array.isArray(recipe.labels)) {
                const labelNames = this.extractLabelNames(recipe.labels);
                labelNames.forEach(label => labels.add(label));
            }
            // Also include tags as labels for backward compatibility
            if (recipe.tags && Array.isArray(recipe.tags)) {
                recipe.tags.forEach(tag => labels.add(tag));
            }
        });
        return Array.from(labels);
    }

    // Extract label names from typed labels (handles both old and new format)
    extractLabelNames(labels) {
        if (!Array.isArray(labels)) return [];
        
        return labels.map(label => {
            if (typeof label === 'string') return label;
            if (label && typeof label === 'object' && label.name) return label.name;
            return String(label);
        });
    }

    // Process user-entered labels and convert them to typed format
    processUserLabels(labelStrings) {
        if (!Array.isArray(labelStrings)) return [];
        
        // Use labelTypes system if available
        if (window.labelTypes) {
            return window.labelTypes.convertToTypedLabels(labelStrings);
        }
        
        // Fallback: return as strings (backward compatibility)
        return labelStrings;
    }

    // Render label chips with appropriate colors based on type
    renderLabelChips(labels, maxCount = null) {
        if (!Array.isArray(labels)) return '';
        
        const labelsToShow = maxCount ? labels.slice(0, maxCount) : labels;
        
        return labelsToShow.map(label => {
            const labelName = typeof label === 'string' ? label : (label.name || String(label));
            const labelType = typeof label === 'object' && label.type ? label.type : this.inferLabelType(labelName);
            const colorClasses = this.getLabelColorClasses(labelType);
            const icon = window.labelTypes ? window.labelTypes.getIcon(labelType) : '';
            
            return `<span class="inline-flex items-center px-2 py-1 ${colorClasses} rounded-full text-xs">${icon}${labelName}</span>`;
        }).join('');
    }

    // Infer label type from label name (uses global labelTypes if available)
    inferLabelType(labelName) {
        if (window.labelTypes) {
            return window.labelTypes.inferLabelType(labelName);
        }
        return 'default';
    }

    // Get the primary label type for a recipe (prioritizes recipe_type over default)
    getPrimaryLabelType(labels) {
        if (!Array.isArray(labels) || labels.length === 0) {
            return 'default';
        }

        // Check if any labels are recipe_type
        for (const label of labels) {
            const labelName = typeof label === 'string' ? label : (label.name || String(label));
            const labelType = typeof label === 'object' && label.type ? label.type : this.inferLabelType(labelName);
            
            if (labelType === 'recipe_type') {
                return 'recipe_type';
            }
        }

        // If no recipe_type labels found, return default
        return 'default';
    }

    // Get color classes for a label type
    getLabelColorClasses(labelType) {
        if (window.labelTypes) {
            return window.labelTypes.getColorClasses(labelType);
        }
        // Fallback colors with high contrast dark mode support
        switch (labelType) {
            case 'recipe_type':
                return 'bg-blue-100 text-blue-800 dark:!bg-blue-200 dark:!text-blue-900';
            default:
                return 'bg-green-100 text-green-800 dark:!bg-green-200 dark:!text-green-900';
        }
    }

    // Get button colors that match the label type
    getLabelButtonColors(labelType) {
        switch (labelType) {
            case 'recipe_type':
                return 'text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100';
            case 'meal_type':
                return 'text-orange-600 dark:text-orange-300 hover:text-orange-800 dark:hover:text-orange-100';
            case 'default':
            default:
                return 'text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100';
        }
    }

    getFavoriteRecipes() {
        return this.recipes.filter(recipe => recipe.favorite === true);
    }

    getComboRecipes() {
        return this.recipes.filter(recipe => recipe.type === 'combo');
    }

    getFilteredComboRecipes() {
        return this.getFilteredRecipes().filter(recipe => recipe.type === 'combo');
    }

    hasActiveFilters() {
        return this.searchTerm !== '' || 
               this.selectedLabels.length > 0 ||
               this.showFavoritesOnly;
    }

    getAllLabels() {
        // Get all available labels from current recipes and ingredients
        const recipeLabels = this.getUniqueLabels();
        const ingredientLabels = this.getUniqueIngredientLabels();
        
        // Only show predefined labels if we're in demo mode
        let predefinedLabels = [];
        if (window.mealPlannerSettings && window.mealPlannerSettings.getCurrentDatabaseSource() === 'demo') {
            // Use the new LabelTypes system for predefined labels
            if (window.labelTypes) {
                predefinedLabels = window.labelTypes.getAllPredefinedLabels();
            } else {
                // Fallback to hardcoded list if labelTypes not available
                predefinedLabels = [
                    'combo', // Include combo for recipe_type
                    'quick', 'healthy', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
                    'comfort-food', 'spicy', 'sweet', 'savory', 'protein-rich', 'low-carb',
                    'kid-friendly', 'party', 'holiday', 'summer', 'winter', 'easy', 'advanced'
                ];
            }
        }
        
        // Combine and deduplicate
        const allLabels = [...new Set([...recipeLabels, ...ingredientLabels, ...predefinedLabels])];
        return allLabels.sort();
    }

    getUniqueIngredientLabels() {
        const allLabels = new Set();
        this.ingredients.forEach(ingredient => {
            if (ingredient.labels && Array.isArray(ingredient.labels)) {
                ingredient.labels.forEach(label => allLabels.add(label));
            }
        });
        return Array.from(allLabels);
    }

    getIngredientById(id) {
        return this.ingredients.find(ingredient => ingredient.id === id);
    }

    getIngredientNameById(id) {
        const ingredient = this.getIngredientById(id);
        return ingredient ? ingredient.name : 'Unknown Ingredient';
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#recipe-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.updateRecipeDisplay();
            });
        }

        // Note: Meal type filtering is now handled through the multi-label system


        // Multi-select label filter with typeahead
        const labelInput = this.container.querySelector('#recipe-labels-input');
        const labelContainer = this.container.querySelector('#recipe-labels-container');
        const labelDropdown = this.container.querySelector('#recipe-labels-dropdown');
        
        if (labelInput && labelContainer && labelDropdown) {
            // Show dropdown and focus input when clicking container
            labelContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                labelInput.focus();
                labelDropdown.classList.remove('hidden');
                this.updateLabelsDropdown();
            });

            // Handle typing in the input
            labelInput.addEventListener('input', (e) => {
                this.labelSearchTerm = e.target.value;
                labelDropdown.classList.remove('hidden');
                this.updateLabelsDropdown();
            });

            // Handle keyboard navigation
            labelInput.addEventListener('keydown', (e) => {
                const dropdown = this.container.querySelector('#recipe-labels-dropdown');
                const options = dropdown.querySelectorAll('[data-label]');
                const highlighted = dropdown.querySelector('.bg-gray-50, .dark\\:bg-gray-700');
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        if (options.length > 0) {
                            if (highlighted) {
                                highlighted.classList.remove('bg-gray-50', 'dark:bg-gray-700');
                                const next = highlighted.nextElementSibling;
                                if (next && next.hasAttribute('data-label')) {
                                    next.classList.add('bg-gray-50', 'dark:bg-gray-700');
                                } else {
                                    options[0].classList.add('bg-gray-50', 'dark:bg-gray-700');
                                }
                            } else {
                                options[0].classList.add('bg-gray-50', 'dark:bg-gray-700');
                            }
                        }
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        if (options.length > 0) {
                            if (highlighted) {
                                highlighted.classList.remove('bg-gray-50', 'dark:bg-gray-700');
                                const prev = highlighted.previousElementSibling;
                                if (prev && prev.hasAttribute('data-label')) {
                                    prev.classList.add('bg-gray-50', 'dark:bg-gray-700');
                                } else {
                                    options[options.length - 1].classList.add('bg-gray-50', 'dark:bg-gray-700');
                                }
                            } else {
                                options[options.length - 1].classList.add('bg-gray-50', 'dark:bg-gray-700');
                            }
                        }
                        break;
                        
                    case 'Enter':
                        e.preventDefault();
                        if (highlighted) {
                            const label = highlighted.getAttribute('data-label');
                            if (label) {
                                this.addLabel(label);
                                labelInput.focus(); // Keep focus for more selections
                            }
                        }
                        break;
                        
                    case 'Escape':
                        labelDropdown.classList.add('hidden');
                        labelInput.blur();
                        break;
                }
            });

            // Handle focus events
            labelInput.addEventListener('focus', () => {
                labelDropdown.classList.remove('hidden');
                this.updateLabelsDropdown();
            });

            // Hide dropdown when clicking outside
            const handleDocumentClick = (e) => {
                if (!labelContainer.contains(e.target) && !labelDropdown.contains(e.target)) {
                    labelDropdown.classList.add('hidden');
                    labelInput.value = ''; // Clear search when closing
                    this.labelSearchTerm = '';
                }
            };
            
            // Store reference for cleanup
            if (this.documentClickHandler) {
                document.removeEventListener('click', this.documentClickHandler);
            }
            this.documentClickHandler = handleDocumentClick;
            document.addEventListener('click', handleDocumentClick);
        }

        // Sort selector
        const sortSelect = this.container.querySelector('#recipe-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.updateRecipeDisplay();
            });
        }

        // Sort direction button
        const sortDirectionBtn = this.container.querySelector('#sort-direction-btn');
        if (sortDirectionBtn) {
            sortDirectionBtn.addEventListener('click', () => {
                this.sortAscending = !this.sortAscending;
                // Need to re-render for sort direction button to update its icon
                this.render();
            });
        }

        // Clear filters button
        const clearFiltersBtn = this.container.querySelector('#clear-recipe-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.searchTerm = '';
                this.selectedLabels = []; // Reset multi-select labels
                this.labelSearchTerm = ''; // Reset label search
                this.sortBy = 'name';
                this.sortAscending = true; // Reset sort direction
                this.showFavoritesOnly = false;
                this.render();
            });
        }

        // Favorites filter button
        const favoritesFilterBtn = this.container.querySelector('#favorites-filter-btn');
        if (favoritesFilterBtn) {
            favoritesFilterBtn.addEventListener('click', () => {
                this.showFavoritesOnly = !this.showFavoritesOnly;
                this.updateRecipeDisplay();
            });
        }

        // Attach recipe card listeners (favorites, edit, delete, click)
        this.attachRecipeCardListeners();

        // Add recipe button
        const addBtn = this.container.querySelector('#add-recipe-btn, #add-first-recipe');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showRecipeForm();
            });
        }
    }

    showRecipeForm(recipe = null) {
        console.log('Opening recipe form...', recipe ? 'Edit mode' : 'Add mode');
        
        const isEdit = recipe !== null;
        const modalId = 'recipe-form-modal';
        
        // Remove existing modal if present
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-4xl max-h-[98vh] sm:max-h-[90vh] flex flex-col mx-1 sm:mx-4 md:mx-0">
                <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                        ${isEdit ? 'Edit Recipe' : 'Add New Recipe'}
                    </h2>
                    <button id="close-recipe-form" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="overflow-y-auto flex-1">
                    <form id="recipe-form" class="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
                    <!-- Basic Information -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="recipe-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Recipe Title *
                            </label>
                            <input type="text" id="recipe-title" name="title" required
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                                   placeholder="Enter recipe title"
                                   value="${isEdit ? recipe.title : ''}">
                        </div>
                        
                        <div class="sm:col-span-2">
                            <label for="recipe-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea id="recipe-description" name="description" rows="2"
                                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                                      placeholder="Brief description of the recipe">${isEdit ? recipe.description : ''}</textarea>
                        </div>
                        
                        <div>
                            <label for="recipe-servings" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Servings *
                            </label>
                            <input type="number" id="recipe-servings" name="serving_count" required min="1" max="20"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                                   value="${isEdit ? recipe.serving_count : '4'}">
                        </div>
                        
                        <div>
                            <label for="recipe-prep-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Prep Time (minutes)
                            </label>
                            <input type="number" id="recipe-prep-time" name="prep_time" min="0" max="480"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                                   value="${isEdit ? recipe.prep_time : '15'}">
                        </div>
                        
                        <div>
                            <label for="recipe-cook-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cook Time (minutes)
                            </label>
                            <input type="number" id="recipe-cook-time" name="cook_time" min="0" max="480"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                                   value="${isEdit ? recipe.cook_time : '30'}">
                        </div>
                    </div>
                    
                    <!-- Items Section -->
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Items</h3>
                            <div class="flex gap-2">
                                <button type="button" id="scan-ingredient-barcode" class="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition-colors flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h5m3 0h6m-9 4h2m3 0h2M9 20h2m3 0h2"></path>
                                    </svg>
                                    <span class="hidden sm:inline">Scan</span>
                                </button>
                                <button type="button" id="add-ingredient-row" class="btn-secondary text-xs sm:text-sm">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    <span class="hidden sm:inline">Add Item</span>
                                    <span class="sm:hidden">Add</span>
                                </button>
                            </div>
                        </div>
                        
                        <div id="ingredients-container" class="space-y-3">
                            ${this.renderIngredientRows(isEdit ? recipe.ingredients : [])}
                        </div>
                    </div>
                    
                    <!-- Instructions Section -->
                    <div>
                        <label for="recipe-instructions" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Instructions *
                        </label>
                        <textarea id="recipe-instructions" name="instructions" required rows="6" 
                                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                                  placeholder="Enter step-by-step cooking instructions...">${isEdit ? recipe.instructions : ''}</textarea>
                        <p class="text-xs text-gray-500 mt-1">Tip: Number your steps (1., 2., 3.) for better readability</p>
                    </div>
                    
                    <!-- Labels Section -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Labels
                        </label>
                        <div class="space-y-3">
                            <!-- Label Input -->
                            <div class="flex gap-2">
                                <input type="text" id="recipe-tags" name="labels"
                                       class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                                       placeholder="Add labels (e.g., healthy, quick, vegetarian)"
                                       value="${isEdit && recipe.labels ? recipe.labels.join(', ') : ''}"
                                <button type="button" id="add-label-btn" class="px-2 sm:px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs sm:text-sm">
                                    Add
                                </button>
                            </div>
                            
                            <!-- Popular Labels -->
                            <div>
                                <div class="text-xs text-gray-500 mb-2">Popular labels:</div>
                                <div class="flex flex-wrap gap-1">
                                    ${this.getAllLabels().slice(0, 12).map(label => `
                                        <button type="button" class="popular-label-btn px-2 py-1 text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 rounded-full border" data-label="${label}">
                                            ${label}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <!-- Selected Labels Display -->
                            <div id="selected-labels-display" class="min-h-[2rem] p-2 border border-gray-200 rounded-md bg-gray-50">
                                <div class="text-xs text-gray-500 mb-1">Selected labels:</div>
                                <div id="selected-labels-container" class="flex flex-wrap gap-1">
                                    <!-- Selected labels will be displayed here -->
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                
                <!-- Form Actions -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button type="button" id="cancel-recipe-form" class="btn-secondary w-full sm:w-auto order-2 sm:order-1">
                        Cancel
                    </button>
                    <button type="submit" form="recipe-form" class="btn-primary w-full sm:w-auto order-1 sm:order-2">
                        ${isEdit ? 'Update Recipe' : 'Save Recipe'}
                    </button>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Attach event listeners
        this.attachRecipeFormListeners(modal, recipe);
        
        // Focus on title input
        setTimeout(() => {
            const titleInput = modal.querySelector('#recipe-title');
            if (titleInput) titleInput.focus();
        }, 100);
    }

    renderIngredientRows(ingredients = []) {
        if (ingredients.length === 0) {
            ingredients = [{ ingredient_id: '', name: '', quantity: '', unit: '', notes: '' }];
        }
        
        return ingredients.map((ingredient, index) => `
            <div class="ingredient-row grid grid-cols-12 gap-2 items-end">
                <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ingredient ${index === 0 ? '*' : ''}
                    </label>
                    <select class="ingredient-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][ingredient_id]" ${index === 0 ? 'required' : ''}>
                        <option value="">Select ingredient...</option>
                        ${this.ingredients.map(ing => `
                            <option value="${ing.id}" data-unit="${ing.default_unit}" 
                                    ${ingredient.ingredient_id == ing.id ? 'selected' : ''}>
                                ${ing.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity ${index === 0 ? '*' : ''}
                    </label>
                    <input type="number" step="0.25" min="0" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][quantity]" 
                           value="${ingredient.quantity}"
                           placeholder="1.5" ${index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit
                    </label>
                    <select class="unit-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][unit]">
                        <option value="pieces" ${ingredient.unit === 'pieces' ? 'selected' : ''}>pieces</option>
                        <option value="cups" ${ingredient.unit === 'cups' ? 'selected' : ''}>cups</option>
                        <option value="tbsp" ${ingredient.unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                        <option value="tsp" ${ingredient.unit === 'tsp' ? 'selected' : ''}>tsp</option>
                        <option value="lbs" ${ingredient.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                        <option value="oz" ${ingredient.unit === 'oz' ? 'selected' : ''}>oz</option>
                        <option value="cloves" ${ingredient.unit === 'cloves' ? 'selected' : ''}>cloves</option>
                        <option value="slices" ${ingredient.unit === 'slices' ? 'selected' : ''}>slices</option>
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                    </label>
                    <input type="text" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][notes]" 
                           value="${ingredient.notes || ''}"
                           placeholder="optional">
                </div>
                
                <div class="col-span-1">
                    ${ingredients.length > 1 || index > 0 ? `
                        <button type="button" class="remove-ingredient w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
                            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    ` : `
                        <div class="w-full p-2"></div>
                    `}
                </div>
            </div>
        `).join('');
    }

    renderSingleIngredientRow(ingredient, index, showRemoveButton = false) {
        return `
            <div class="ingredient-row grid grid-cols-12 gap-2 items-end">
                <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ingredient ${index === 0 ? '*' : ''}
                    </label>
                    <select class="ingredient-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][ingredient_id]" ${index === 0 ? 'required' : ''}>
                        <option value="">Select ingredient...</option>
                        ${this.ingredients.map(ing => `
                            <option value="${ing.id}" data-unit="${ing.default_unit}" 
                                    ${ingredient.ingredient_id == ing.id ? 'selected' : ''}>
                                ${ing.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity ${index === 0 ? '*' : ''}
                    </label>
                    <input type="number" step="0.25" min="0" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][quantity]" 
                           value="${ingredient.quantity}"
                           placeholder="1.5" ${index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit
                    </label>
                    <select class="unit-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][unit]">
                        <option value="pieces" ${ingredient.unit === 'pieces' ? 'selected' : ''}>pieces</option>
                        <option value="cups" ${ingredient.unit === 'cups' ? 'selected' : ''}>cups</option>
                        <option value="tbsp" ${ingredient.unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                        <option value="tsp" ${ingredient.unit === 'tsp' ? 'selected' : ''}>tsp</option>
                        <option value="lbs" ${ingredient.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                        <option value="oz" ${ingredient.unit === 'oz' ? 'selected' : ''}>oz</option>
                        <option value="cloves" ${ingredient.unit === 'cloves' ? 'selected' : ''}>cloves</option>
                        <option value="slices" ${ingredient.unit === 'slices' ? 'selected' : ''}>slices</option>
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                    </label>
                    <input type="text" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][notes]" 
                           value="${ingredient.notes || ''}"
                           placeholder="optional">
                </div>
                
                <div class="col-span-1">
                    ${showRemoveButton || index > 0 ? `
                        <button type="button" class="remove-ingredient w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
                            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    ` : `
                        <div class="w-full p-2"></div>
                    `}
                </div>
            </div>
        `;
    }

    attachRecipeFormListeners(modal, recipe) {
        const form = modal.querySelector('#recipe-form');
        const closeBtn = modal.querySelector('#close-recipe-form');
        const cancelBtn = modal.querySelector('#cancel-recipe-form');
        const addIngredientBtn = modal.querySelector('#add-ingredient-row');
        const scanBarcodeBtn = modal.querySelector('#scan-ingredient-barcode');
        const ingredientsContainer = modal.querySelector('#ingredients-container');

        // Close modal handlers
        const closeModal = () => {
            // If we were editing from mobile recipe view, return to that view
            if (this.editingFromMobileView && this.editingRecipe) {
                console.log('Returning to mobile recipe view after cancel');
                modal.remove();
                this.showMobileRecipePage(this.editingRecipe);
                this.editingFromMobileView = false;
                this.editingRecipe = null;
            } else {
                // Normal desktop modal close
                modal.remove();
            }
        };

        closeBtn?.addEventListener('click', closeModal);
        cancelBtn?.addEventListener('click', closeModal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Add ingredient row
        addIngredientBtn?.addEventListener('click', () => {
            const currentRows = ingredientsContainer.querySelectorAll('.ingredient-row').length;
            const newRowHtml = this.renderSingleIngredientRow({ ingredient_id: '', name: '', quantity: '', unit: '', notes: '' }, currentRows, true);
            
            ingredientsContainer.insertAdjacentHTML('beforeend', newRowHtml);
            
            // Attach listeners to new row
            this.attachIngredientRowListeners(ingredientsContainer.lastElementChild);
        });

        // Scan barcode for ingredient
        scanBarcodeBtn?.addEventListener('click', () => {
            this.showBarcodeScanner(ingredientsContainer);
        });

        // Attach listeners to existing ingredient rows
        ingredientsContainer.querySelectorAll('.ingredient-row').forEach(row => {
            this.attachIngredientRowListeners(row);
        });

        // Form submission
        form?.addEventListener('submit', (e) => {
            console.log('🔥 Form submit event triggered', { form, recipe });
            e.preventDefault();
            this.handleRecipeFormSubmit(form, recipe);
        });
    }

    attachIngredientRowListeners(row) {
        // Ingredient selection handler
        const ingredientSelect = row.querySelector('.ingredient-select');
        const unitSelect = row.querySelector('.unit-select');
        
        ingredientSelect?.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            const defaultUnit = selectedOption?.dataset.unit;
            
            if (defaultUnit && unitSelect) {
                unitSelect.value = defaultUnit;
            }
        });

        // Remove ingredient handler
        const removeBtn = row.querySelector('.remove-ingredient');
        removeBtn?.addEventListener('click', () => {
            row.remove();
        });
    }

    async handleRecipeFormSubmit(form, existingRecipe) {
        try {
            // Collect form data
            const formData = new FormData(form);
            const recipeData = {
                title: formData.get('title').trim(),
                description: formData.get('description').trim(),
                serving_count: parseInt(formData.get('serving_count')),
                prep_time: parseInt(formData.get('prep_time')) || 0,
                cook_time: parseInt(formData.get('cook_time')) || 0,
                instructions: formData.get('instructions').trim(),
                tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            };

            // Validate required fields
            if (!recipeData.title) {
                this.showNotification('Recipe title is required', 'error');
                return;
            }

            if (!recipeData.instructions) {
                this.showNotification('Instructions are required', 'error');
                return;
            }

            // Collect ingredients
            const ingredients = [];
            const ingredientRows = form.querySelectorAll('.ingredient-row');
            
            ingredientRows.forEach((row, index) => {
                const ingredientId = row.querySelector(`[name="ingredients[${index}][ingredient_id]"]`)?.value;
                const quantity = row.querySelector(`[name="ingredients[${index}][quantity]"]`)?.value;
                const unit = row.querySelector(`[name="ingredients[${index}][unit]"]`)?.value;
                const notes = row.querySelector(`[name="ingredients[${index}][notes]"]`)?.value;

                if (ingredientId && quantity) {
                    const ingredient = this.ingredients.find(ing => ing.id == ingredientId);
                    if (ingredient) {
                        ingredients.push({
                            ingredient_id: parseInt(ingredientId),
                            name: ingredient.name,
                            quantity: parseFloat(quantity),
                            unit: unit || ingredient.default_unit,
                            notes: notes || ''
                        });
                    }
                }
            });

            // Add ingredients to recipe data
            recipeData.ingredients = ingredients;
            
            // Add labels (convert from tags for now)
            recipeData.labels = recipeData.tags || [];
            delete recipeData.tags;
            
            // Add created_at timestamp if new recipe
            if (!existingRecipe) {
                recipeData.created_at = new Date().toISOString();
            }

            // Save recipe
            let savedRecipe;
            if (existingRecipe) {
                // Update existing recipe
                savedRecipe = await this.updateRecipe(existingRecipe.id, recipeData);
                this.showNotification('Recipe updated successfully!', 'success');
            } else {
                // Create new recipe
                savedRecipe = await this.createRecipe(recipeData);
                this.showNotification('Recipe created successfully!', 'success');
            }

            // Handle post-save navigation
            if (this.editingFromMobileView && this.editingRecipe) {
                // Update the editing recipe with latest data and return to mobile view
                this.editingRecipe = savedRecipe;
                this.showMobileRecipePage(this.editingRecipe);
                this.editingFromMobileView = false;
                this.editingRecipe = null;
            } else {
                // Close modal and refresh recipe list
                const modal = form.closest('.fixed');
                if (modal) modal.remove();
                this.render();
            }
            
        } catch (error) {
            console.error('Error handling recipe form:', error);
            this.showNotification('Error saving recipe', 'error');
        }
    }

    async createRecipe(recipeData) {
        // Generate new ID
        const newId = Math.max(...this.recipes.map(r => r.id), 0) + 1;
        
        const newRecipe = {
            id: newId,
            ...recipeData
        };
        
        // Add to recipes array
        this.recipes.push(newRecipe);
        
        // Save to storage
        await this.saveRecipes();
        
        return newRecipe;
    }

    async updateRecipe(recipeId, recipeData) {
        const recipeIndex = this.recipes.findIndex(r => r.id === recipeId);
        if (recipeIndex === -1) {
            throw new Error('Recipe not found');
        }
        
        // Update recipe while preserving ID
        const updatedRecipe = {
            ...this.recipes[recipeIndex],
            ...recipeData,
            id: recipeId // Ensure ID is preserved
        };
        
        this.recipes[recipeIndex] = updatedRecipe;
        
        // Save to storage
        await this.saveRecipes();
        
        return updatedRecipe;
    }

    async saveRecipes() {
        // Save to localStorage or other storage
        if (window.storageManager) {
            await window.storageManager.saveData('recipes', this.recipes);
        }
    }

    cleanup() {
        // Clean up document-level event listeners
        if (this.documentClickHandler) {
            document.removeEventListener('click', this.documentClickHandler);
            this.documentClickHandler = null;
        }
        
        // Reset mobile recipe state
        this.isShowingMobileRecipe = false;
        this.editingFromMobileView = false;
        this.editingRecipe = null;
        this.previousView = null;
    }

    showBarcodeScanner(ingredientsContainer) {
        // Use the shared barcode scanner component
        const sharedScanner = window.SharedBarcodeScanner?.getInstance();
        if (!sharedScanner) {
            console.error('Barcode scanner not available');
            return;
        }

        // Show the scanner with recipe context
        sharedScanner.show('recipe', 
            (ingredient, context) => {
                console.log('Product scanned for recipe:', ingredient);
                
                // Add a new ingredient row with the scanned ingredient
                const currentRows = ingredientsContainer.querySelectorAll('.ingredient-row').length;
                const newRowHtml = this.renderSingleIngredientRow({
                    ingredient_id: ingredient.id,
                    name: ingredient.name,
                    quantity: '1',
                    unit: ingredient.default_unit || 'pieces',
                    notes: ''
                }, currentRows, true);
                
                ingredientsContainer.insertAdjacentHTML('beforeend', newRowHtml);
                
                // Attach listeners to new row
                this.attachIngredientRowListeners(ingredientsContainer.lastElementChild);
                
                // Show success message
                this.showNotification(`Added "${ingredient.name}" to recipe ingredients`, 'success');
            },
            (error) => {
                console.error('Barcode scanner error:', error);
                this.showNotification(`Scanner error: ${error.message}`, 'error');
            }
        );
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 text-white ${
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    handleRecipeFormSubmit(form, existingRecipe) {
        console.log('🔥 handleRecipeFormSubmit called', { form, existingRecipe });
        // Get form data manually to avoid FormData issues in tests
        const titleInput = form.querySelector('input[name="title"]');
        const descriptionInput = form.querySelector('textarea[name="description"]');
        const servingsInput = form.querySelector('input[name="servings"]');
        const prepTimeInput = form.querySelector('input[name="prep_time"]');
        const cookTimeInput = form.querySelector('input[name="cook_time"]');
        const instructionsInput = form.querySelector('textarea[name="instructions"]');
        const tagsInput = form.querySelector('input[name="tags"]');
        const difficultyInput = form.querySelector('select[name="difficulty"]');
        const cuisineInput = form.querySelector('input[name="cuisine"]');
        
        // Get basic recipe data
        const recipeData = {
            title: titleInput ? titleInput.value.trim() : '',
            description: descriptionInput ? descriptionInput.value.trim() : '',
            serving_count: servingsInput ? parseInt(servingsInput.value) || 1 : 1,
            prep_time: prepTimeInput ? parseInt(prepTimeInput.value) || 0 : 0,
            cook_time: cookTimeInput ? parseInt(cookTimeInput.value) || 0 : 0,
            instructions: instructionsInput ? instructionsInput.value.trim() : '',
            labels: this.processUserLabels(tagsInput ? tagsInput.value.trim().split(',').map(tag => tag.trim()).filter(tag => tag) : []),
            difficulty: difficultyInput ? difficultyInput.value || 'easy' : 'easy',
            cuisine: cuisineInput ? cuisineInput.value.trim() : '',
        };

        // Validate required fields
        if (!recipeData.title) {
            this.showNotification('Recipe title is required', 'error');
            return;
        }

        if (!recipeData.instructions) {
            this.showNotification('Instructions are required', 'error');
            return;
        }

        // Collect ingredients
        const ingredientRows = form.querySelectorAll('.ingredient-row');
        const ingredients = [];
        
        ingredientRows.forEach(row => {
            const ingredientId = row.querySelector('.ingredient-select')?.value;
            const quantity = row.querySelector('input[name*="[quantity]"]')?.value;
            const unit = row.querySelector('select[name*="[unit]"]')?.value;
            const notes = row.querySelector('input[name*="[notes]"]')?.value;
            
            if (ingredientId && quantity) {
                const ingredient = this.getIngredientById(parseInt(ingredientId));
                if (ingredient) {
                    ingredients.push({
                        ingredient_id: parseInt(ingredientId),
                        name: ingredient.name,
                        quantity: this.roundQuantity(parseFloat(quantity)),
                        unit: unit || ingredient.default_unit,
                        notes: notes || ''
                    });
                }
            }
        });

        if (ingredients.length === 0) {
            this.showNotification('At least one ingredient is required', 'error');
            return;
        }

        recipeData.ingredients = ingredients;

        try {
            // Save recipe
            if (existingRecipe) {
                // Update existing recipe
                recipeData.id = existingRecipe.id;
                const index = this.recipes.findIndex(r => r.id === existingRecipe.id);
                if (index !== -1) {
                    this.recipes[index] = { ...this.recipes[index], ...recipeData };
                }
                this.showNotification(`"${recipeData.title}" has been updated!`, 'success');
            } else {
                // Add new recipe
                recipeData.id = Math.max(0, ...this.recipes.map(r => r.id)) + 1;
                recipeData.created_date = new Date().toISOString().split('T')[0];
                this.recipes.push(recipeData);
                this.showNotification(`"${recipeData.title}" has been added!`, 'success');
            }

            // Save to localStorage and refresh view
            this.saveRecipes();
            
            // Close modal and refresh view
            document.getElementById('recipe-form-modal')?.remove();
            
            // If we were editing from mobile recipe view, return to that view
            if (this.editingFromMobileView && this.editingRecipe) {
                console.log('📱 Returning to mobile recipe view after save');
                // Update the recipe reference with the saved data
                this.editingRecipe = this.recipes.find(r => r.id === this.editingRecipe.id) || this.editingRecipe;
                this.showMobileRecipePage(this.editingRecipe);
                this.editingFromMobileView = false;
                this.editingRecipe = null;
            } else {
                this.render();
            }

        } catch (error) {
            console.error('Error saving recipe:', error);
            this.showNotification('Error saving recipe. Please try again.', 'error');
        }
    }

    showRecipeDetail(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) {
            console.error('❌ Recipe not found:', recipeId);
            return;
        }

        console.log('Showing recipe detail:', recipe.title);
        
        // Check if we're on mobile - use different approach
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            this.showMobileRecipePage(recipe);
        } else {
            this.showDesktopRecipeModal(recipe);
        }
    }

    showMobileRecipePage(recipe) {
        // Prevent multiple calls
        if (this.isShowingMobileRecipe) {
            console.log('📱 Already showing mobile recipe, ignoring duplicate call');
            return;
        }
        
        this.isShowingMobileRecipe = true;
        
        // Store current state for back navigation
        this.previousView = {
            container: this.container.innerHTML,
            scrollPosition: window.scrollY
        };
        
        console.log('📱 Stored previous view, container length:', this.previousView.container.length);
        console.log('📱 Previous view preview:', this.previousView.container.substring(0, 200) + '...');

        // Replace entire container with mobile recipe page
        this.container.innerHTML = this.generateMobileRecipeHTML(recipe);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Add event listeners immediately (DOM is ready since we just set innerHTML)
        this.attachMobileRecipeEventListeners(recipe);
        
        console.log('📱 Mobile recipe page HTML set, container innerHTML length:', this.container.innerHTML.length);
    }

    attachMobileRecipeEventListeners(recipe) {
        console.log('📱 Attaching mobile recipe page event listeners');
        
        // Add back button handler
        const backBtn = this.container.querySelector('#mobile-recipe-back');
        console.log('📱 Back button found:', !!backBtn);
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Back button clicked');
                this.returnFromMobileRecipe();
            });
        }
        
        // Add close button handler
        const closeBtn = this.container.querySelector('#mobile-recipe-close');
        console.log('📱 Close button found:', !!closeBtn);
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Close button clicked');
                this.returnFromMobileRecipe();
            });
        }
        
        // Add edit button handler
        const editBtn = this.container.querySelector('#mobile-recipe-edit');
        console.log('📱 Edit button found:', !!editBtn);
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Edit button clicked');
                
                // Store that we're editing from mobile recipe view
                this.editingFromMobileView = true;
                this.editingRecipe = recipe;
                
                this.showRecipeForm(recipe);
            });
        }
    }

    returnFromMobileRecipe() {
        console.log('📱 Returning from mobile recipe view');
        console.log('📱 previousView exists:', !!this.previousView);
        
        if (this.previousView) {
            console.log('📱 Restoring previous view, container length:', this.previousView.container.length);
            
            this.container.innerHTML = this.previousView.container;
            window.scrollTo(0, this.previousView.scrollPosition);
            
            // Reattach all event listeners
            this.attachEventListeners();
            
            // Force mobile navigation to update its state
            if (window.mobileNavigation) {
                window.mobileNavigation.updateActiveTab('recipes');
            }
            
            this.previousView = null;
            this.isShowingMobileRecipe = false; // Reset flag
            console.log('📱 Successfully returned to recipe list, new container length:', this.container.innerHTML.length);
        } else {
            console.log('❌ No previousView to restore - already returned or not set');
            this.isShowingMobileRecipe = false; // Reset flag even if no previousView
        }
    }

    generateMobileRecipeHTML(recipe) {
        const labels = recipe.labels || recipe.tags || [];
        
        console.log('📱 Generating mobile recipe HTML for:', recipe.title);
        console.log('📱 Recipe ingredients count:', recipe.ingredients?.length);
        
        const html = `
            <div class="min-h-screen bg-white dark:bg-gray-900">
                <!-- Mobile Header -->
                <div class="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10">
                    <div class="flex items-center justify-between">
                        <button id="mobile-recipe-back" class="flex items-center text-blue-600 dark:text-blue-400">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                            Back
                        </button>
                        <div class="flex gap-2">
                            <button id="mobile-recipe-close" class="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">
                                Close
                            </button>
                            <button id="mobile-recipe-edit" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Recipe Content -->
                <div class="p-4 space-y-6">
                    <!-- Title -->
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${recipe.title}</h1>
                        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${recipe.description || 'No description available'}</p>
                    </div>

                    <!-- Recipe Stats -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                            <div class="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">Prep Time</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${recipe.prep_time || 'N/A'} min</div>
                        </div>
                        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                            <div class="text-red-600 dark:text-red-400 text-sm font-medium mb-1">Cook Time</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${recipe.cook_time || 'N/A'} min</div>
                        </div>
                        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                            <div class="text-green-600 dark:text-green-400 text-sm font-medium mb-1">Serves</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${recipe.serving_count || recipe.servings || 'N/A'}</div>
                        </div>
                        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                            <div class="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">Items</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${recipe.ingredients?.length || 0}</div>
                        </div>
                    </div>

                    <!-- Items -->
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Items (${recipe.ingredients?.length || 0})</h2>
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                            ${recipe.ingredients?.map(ingredient => {
                                const ingredientName = this.getIngredientNameById(ingredient.ingredient_id) || 'Unknown ingredient';
                                return `
                                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                        <span class="font-medium text-gray-900 dark:text-white">${ingredientName}</span>
                                        <span class="text-gray-600 dark:text-gray-400 font-medium">
                                            ${ingredient.quantity} ${ingredient.unit}
                                        </span>
                                    </div>
                                `;
                            }).join('') || '<div class="text-gray-500 dark:text-gray-400">No items available</div>'}
                        </div>
                    </div>

                    <!-- Instructions -->
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Instructions</h2>
                        <div class="space-y-4">
                            ${(() => {
                                if (recipe.instructions && typeof recipe.instructions === 'string') {
                                    return recipe.instructions.split(',').map((step, index) => `
                                        <div class="flex gap-4">
                                            <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">${index + 1}</div>
                                            <div class="flex-1 text-gray-900 dark:text-white leading-relaxed pt-1">${step.trim()}</div>
                                        </div>
                                    `).join('');
                                } else if (Array.isArray(recipe.instructions)) {
                                    return recipe.instructions.map((step, index) => `
                                        <div class="flex gap-4">
                                            <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">${index + 1}</div>
                                            <div class="flex-1 text-gray-900 dark:text-white leading-relaxed pt-1">${step}</div>
                                        </div>
                                    `).join('');
                                } else {
                                    return '<div class="text-gray-500 dark:text-gray-400">No instructions available</div>';
                                }
                            })()}
                        </div>
                    </div>

                    <!-- Labels -->
                    ${labels.length > 0 ? `
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Labels</h2>
                            <div class="flex flex-wrap gap-2">
                                ${this.renderLabelChips(labels)}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        console.log('📱 Generated mobile recipe HTML length:', html.length);
        return html;
    }

    showDesktopRecipeModal(recipe) {
        
        // Remove existing modal if present
        const existingModal = document.getElementById('recipe-detail-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal HTML
        const modal = document.createElement('div');
        modal.id = 'recipe-detail-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-1 sm:p-4';
        
        // Format labels/tags
        const labels = recipe.labels || recipe.tags || [];

        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-4xl h-[90vh] sm:max-h-[90vh] flex flex-col mx-1 sm:mx-4 md:mx-0">
                <!-- Header -->
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white pr-2">${recipe.title}</h2>
                        <div class="flex items-center justify-end space-x-2 sm:space-x-3 flex-shrink-0">
                            <button id="edit-recipe-detail" class="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors text-sm sm:text-base">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                <span class="hidden sm:inline">Edit</span>
                            </button>
                            <button id="close-recipe-detail" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-6 min-h-0">
                    <!-- Recipe Image (if available) -->
                    ${recipe.image_url ? `
                        <div class="mb-4 sm:mb-6 flex justify-center">
                            <img src="${recipe.image_url}" alt="${recipe.title}" class="w-full sm:w-3/5 h-32 sm:h-40 object-cover rounded-lg">
                        </div>
                    ` : ''}

                    <!-- Description -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                        <p class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">${recipe.description || 'No description available'}</p>
                    </div>

                    <!-- Recipe Info - Mobile Optimized -->
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                            <div class="flex items-center justify-center mb-1">
                                <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">Prep</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">${recipe.prep_time || 'N/A'} min</span>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                            <div class="flex items-center justify-center mb-1">
                                <svg class="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                                </svg>
                                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">Cook</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">${recipe.cook_time || 'N/A'} min</span>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                            <div class="flex items-center justify-center mb-1">
                                <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">Serves</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">${recipe.serving_count || recipe.servings || 'N/A'}</span>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                            <div class="flex items-center justify-center mb-1">
                                <svg class="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"></path>
                                </svg>
                                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">Items</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">${recipe.ingredients.length}</span>
                        </div>
                    </div>

                    <!-- Items -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Items (${recipe.ingredients.length})</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 space-y-2">
                            ${(() => {
                                if (!recipe.ingredients || recipe.ingredients.length === 0) {
                                    return '<div class="text-xs text-gray-500 dark:text-gray-400">No ingredients available</div>';
                                }
                                return recipe.ingredients.map(ingredient => {
                                    const ingredientName = this.getIngredientNameById(ingredient.ingredient_id) || 'Unknown ingredient';
                                    return `
                                        <div class="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                                            <span class="text-xs font-medium text-gray-900 dark:text-white flex-1">${ingredientName}</span>
                                            <span class="text-xs text-gray-600 dark:text-gray-300 ml-2 flex-shrink-0">
                                                ${ingredient.quantity} ${ingredient.unit}
                                            </span>
                                        </div>
                                    `;
                                }).join('');
                            })()}
                        </div>
                    </div>

                    <!-- Instructions -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Instructions</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 space-y-3">
                            ${(() => {
                                if (recipe.instructions && typeof recipe.instructions === 'string') {
                                    return recipe.instructions.split(',').map((step, index) => `
                                        <div class="flex gap-2">
                                            <span class="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${index + 1}</span>
                                            <span class="text-xs text-gray-900 dark:text-white leading-relaxed">${step.trim()}</span>
                                        </div>
                                    `).join('');
                                } else if (Array.isArray(recipe.instructions)) {
                                    return recipe.instructions.map((step, index) => `
                                        <div class="flex gap-2">
                                            <span class="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${index + 1}</span>
                                            <span class="text-xs text-gray-900 dark:text-white leading-relaxed">${step}</span>
                                        </div>
                                    `).join('');
                                } else {
                                    return '<div class="text-xs text-gray-500 dark:text-gray-400">No instructions available</div>';
                                }
                            })()}
                        </div>
                    </div>

                    <!-- Labels/Tags -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Labels</h3>
                        <div class="flex flex-wrap gap-1">
                            ${labels.length > 0 ? 
                                this.renderLabelChips(labels).replace(/text-xs/g, 'text-xs').replace(/px-2 py-1/g, 'px-2 py-1') :
                                '<span class="text-xs text-gray-500 dark:text-gray-400">No labels</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        const closeBtn = modal.querySelector('#close-recipe-detail');
        const editBtn = modal.querySelector('#edit-recipe-detail');
        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        editBtn.addEventListener('click', () => {
            closeModal();
            this.showRecipeForm(recipe);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    editRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            this.showRecipeForm(recipe);
        }
    }

    async deleteRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe && confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
            // In real app, this would delete from database
            this.recipes = this.recipes.filter(r => r.id !== recipeId);
            this.render();
            this.showNotification(`"${recipe.title}" has been deleted`, 'success');
        }
    }

    toggleFavorite(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            const wasLiked = recipe.favorite;
            recipe.favorite = !recipe.favorite;
            
            console.log(`⭐ Toggled favorite for "${recipe.title}": ${wasLiked} → ${recipe.favorite}`);
            console.log(`📊 Total favorites now: ${this.getFavoriteRecipes().length}`);
            
            // Save to storage using the centralized data authority
            this.saveRecipes();
            
            // Update display without full re-render to preserve input focus
            this.updateRecipeDisplay();
            
            this.showNotification(
                `"${recipe.title}" ${recipe.favorite ? 'added to' : 'removed from'} favorites`, 
                'success'
            );
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Utility function to round quantities to 2 decimal places and remove trailing zeros
    roundQuantity(quantity) {
        const rounded = Math.round(quantity * 100) / 100;
        return parseFloat(rounded.toFixed(2));
    }

    // Multi-select label methods
    addLabel(label) {
        if (!this.selectedLabels.includes(label)) {
            this.selectedLabels.push(label);
            this.labelSearchTerm = ''; // Clear search after selection
            this.render(); // Need full render to update label chips
        }
    }

    removeLabel(label) {
        this.selectedLabels = this.selectedLabels.filter(l => l !== label);
        this.render();
    }

    clearAllLabels() {
        this.selectedLabels = [];
        this.labelSearchTerm = '';
        this.render();
    }

    // Get filtered labels for dropdown based on search term
    getFilteredLabelsForDropdown() {
        const availableLabels = this.getAllLabels().filter(label => !this.selectedLabels.includes(label));
        
        if (!this.labelSearchTerm) {
            return availableLabels;
        }
        
        return availableLabels.filter(label => 
            label.toLowerCase().includes(this.labelSearchTerm.toLowerCase())
        );
    }

    // Update dropdown content based on current search
    updateLabelsDropdown() {
        const dropdown = this.container.querySelector('#recipe-labels-dropdown');
        if (!dropdown) return;

        const filteredLabels = this.getFilteredLabelsForDropdown();
        
        if (filteredLabels.length === 0) {
            dropdown.innerHTML = `
                <div class="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    ${this.labelSearchTerm ? `No labels found matching "${this.labelSearchTerm}"` : 'No more labels available'}
                </div>
            `;
        } else {
            dropdown.innerHTML = filteredLabels.map((label, index) => {
                const labelType = this.inferLabelType(label);
                const icon = window.labelTypes ? window.labelTypes.getIcon(labelType) : '';
                const colorClasses = this.getLabelColorClasses(labelType);
                
                return `
                <div class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-gray-100 ${index === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}" 
                     data-label="${label}" 
                     onclick="window.recipeManager.addLabel('${label}')">
                    <div class="flex items-center space-x-2">
                        ${icon && labelType !== 'default' ? `<span class="flex-shrink-0">${icon}</span>` : ''}
                        <span class="font-bold flex-1">${label}</span>
                        <span class="inline-flex items-center px-2 py-1 ${colorClasses} rounded-full text-xs flex-shrink-0">
                            ${labelType !== 'default' ? labelType.replace('_', ' ') : 'label'}
                        </span>
                    </div>
                </div>
                `;
            }).join('');
        }
    }

    async clearAllData() {
        console.log('🗑️ Clearing all recipes data...');
        this.recipes = [];
        this.filteredRecipes = [];
        
        // Reset all filter state variables
        this.searchTerm = '';
        this.selectedLabels = []; // Reset multi-select labels
        this.labelSearchTerm = ''; // Reset label search
        this.sortBy = 'name';
        this.sortAscending = true; // Reset sort direction
        this.showFavoritesOnly = false;
        
        // Clear from localStorage
        localStorage.removeItem('mealplanner_recipes');
        
        // Re-render to show empty state
        this.render();
        
        console.log('✅ All recipes data cleared');
    }
}

// Make RecipeManager globally available for testing
if (typeof window !== 'undefined') {
    window.RecipeManager = RecipeManager;
}
if (typeof global !== 'undefined') {
    global.RecipeManager = RecipeManager;
}

// Global registry for recipe manager
window.recipeManager = null;
