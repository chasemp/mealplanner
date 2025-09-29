// Recipe Management Component
class RecipeManager {
    constructor(container) {
        this.container = container;
        this.recipes = [];
        this.items = [];
        this.currentRecipe = null;
        this.searchTerm = '';
        this.selectedLabels = []; // Changed to array for multi-select
        this.labelSearchTerm = ''; // For typeahead filtering
        this.sortBy = 'name';
        this.sortAscending = true; // New property for sort direction
        this.showFavoritesOnly = false;
        
        // Double press clear filters state
        this.clearFiltersFirstPressTime = null;
        this.clearFiltersTimeout = null;
        this.init();
    }

    async init() {
        console.log('🍳 Initializing Recipe Manager...');
        await this.loadItems();
        await this.loadRecipes();
        this.render();
        this.attachEventListeners();
    }

    async loadItems() {
        console.log('📱 Recipe Manager loading items from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            this.items = window.mealPlannerSettings.getAuthoritativeData('items');
            console.log(`✅ Recipe Manager loaded ${this.items.length} items from authoritative source`);
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty items');
            this.items = [];
        }
        
        // Refresh any existing item dropdowns to reflect the updated items list
        this.refreshAllItemDropdowns();
    }

    async loadRecipes() {
        console.log('📱 Loading recipes from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            const loadedRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            console.log('📱 Raw data from getAuthoritativeData:', loadedRecipes);
            console.log('📱 Type of loaded data:', typeof loadedRecipes, Array.isArray(loadedRecipes));
            this.recipes = loadedRecipes || [];
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
        console.log('📱 this.recipes array:', this.recipes);
        this.render(); // IMPORT/EXPORT FIX: Render after loading data to ensure UI updates
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
            
            // Update recipe counts in items after saving recipes
            this.updateItemRecipeCounts();
            
            console.log('✅ Recipes saved successfully');
        } catch (error) {
            console.error('❌ Error saving recipes:', error);
        }
    }

    /**
     * Updates the recipe_count field in items based on actual recipe usage
     */
    updateItemRecipeCounts() {
        if (!window.itemsManager || !window.itemsManager.items) {
            console.log('🔢 Items manager not available, skipping recipe count update');
            return;
        }

        console.log('🔢 Updating recipe counts for items...');
        
        // Reset all recipe counts to 0
        window.itemsManager.items.forEach(item => {
            item.recipe_count = 0;
        });

        // Count how many recipes each item is used in
        this.recipes.forEach(recipe => {
            if (recipe.items && Array.isArray(recipe.items)) {
                recipe.items.forEach(recipeItem => {
                    const item = window.itemsManager.items.find(i => i.id === recipeItem.item_id);
                    if (item) {
                        item.recipe_count = (item.recipe_count || 0) + 1;
                    }
                });
            }
        });

        // Save updated items
        if (window.itemsManager.saveItems) {
            window.itemsManager.saveItems();
            console.log('✅ Recipe counts updated and saved');
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="recipe-manager">
                <!-- Header with Labels and Add Buttons -->
                <div class="flex justify-between items-center mb-4">
                    <!-- Left side: Labels button -->
                    <button id="manage-labels-btn" class="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors shadow-sm text-blue-700 dark:text-blue-200" title="Manage Labels">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                        <span class="font-medium">Labels</span>
                    </button>
                    
                    <!-- Right side: Add buttons -->
                    <div class="flex gap-4">
                        <button id="add-recipe-btn" class="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm" title="Add Recipe">
                            <svg class="w-4 h-4 text-gray-700 dark:text-gray-300 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </button>
                        <button id="add-combo-btn" class="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-gray-400 dark:border-gray-500 bg-amber-100 dark:bg-gray-700 hover:bg-amber-200 dark:hover:bg-gray-600 transition-colors shadow-sm" title="Add Combo">
                            <svg class="w-4 h-4 text-gray-700 dark:text-gray-300 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24">
                                <!-- Brown bag lunch icon -->
                                <path d="M8 2C8 0.895 8.895 0 10 0H14C15.105 0 16 0.895 16 2V3H18C19.105 3 20 3.895 20 5V21C20 22.105 19.105 23 18 23H6C4.895 23 4 22.105 4 21V5C4 3.895 4.895 3 6 3H8V2ZM10 2V4H14V2H10ZM6 5V21H18V5H16V6C16 6.552 15.552 7 15 7H9C8.448 7 8 6.552 8 6V5H6Z" fill="currentColor"/>
                                <!-- Fold lines on bag - thicker and more visible -->
                                <path d="M7 9H17M7 11H17M7 13H17" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.8"/>
                            </svg>
                        </button>
                    </div>
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
                    <!-- Row 1: Search -->
                    <div class="mb-4">
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
                    
                    <!-- Row 2: Multi-Label Filter -->
                    <div class="mb-4">
                        <label for="recipe-labels" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Labels</label>
                        <!-- Multi-select label input with typeahead and chips -->
                        <div class="relative">
                            <div id="recipe-labels-container" class="w-full min-h-[42px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-text flex flex-wrap gap-1 items-center">
                                ${this.selectedLabels.map(label => {
                                    const displayProps = this.getLabelDisplayProperties(label);
                                    return `
                                    <span class="inline-flex items-center px-2 py-1 text-xs font-bold ${displayProps.colors} rounded-full" ${displayProps.inlineStyle ? `style="${displayProps.inlineStyle}"` : ''}>
                                        ${displayProps.icon}${label}
                                        <button type="button" class="ml-1 ${displayProps.buttonColors}" onclick="window.recipeManager.removeLabel('${label}')">
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
                    
                    <!-- Row 3: Favorites and Clear Filters -->
                    <div class="flex items-center justify-between gap-3">
                        <!-- Left side: Favorites -->
                        <button id="favorites-filter-btn" class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.showFavoritesOnly ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-yellow-100 font-bold border-2 border-yellow-500 shadow-lg shadow-yellow-400/50 dark:border-yellow-400 dark:shadow-yellow-500/50' : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-yellow-100 border-2 border-transparent'}" title="${this.showFavoritesOnly ? 'Show all recipes' : 'Show only favorites'}">
                            ${this.showFavoritesOnly ? 
                                '<svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>' :
                                '<svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>'
                            }
                            <span class="${this.showFavoritesOnly ? 'font-bold' : ''}">${this.showFavoritesOnly ? 'Favorites Only' : 'Favorites'}</span>
                        </button>
                        
                        <!-- Right side: Clear Filters Button -->
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
                                <div class="flex items-center space-x-1">
                                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span><strong>${this.getFilteredRecipes().filter(r => r.favorite === true).length}</strong> favs</span>
                    </div>
                </div>

                            <!-- Right side: Filter indicators -->
                            <div class="flex items-center space-x-3">
                    </div>
                    </div>
                            </div>
                        
                        <!-- Row 4: Sort Controls (Full Width on Mobile) -->
                        <div class="flex items-center gap-3 w-full mt-3">
                            <select id="recipe-sort" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm">
                                <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>Name</option>
                                <option value="date" ${this.sortBy === 'date' ? 'selected' : ''}>Created</option>
                                <option value="prep_time" ${this.sortBy === 'prep_time' ? 'selected' : ''}>Total Time</option>
                                <option value="serving_count" ${this.sortBy === 'serving_count' ? 'selected' : ''}>Servings</option>
                                <option value="label_type" ${this.sortBy === 'label_type' ? 'selected' : ''}>Label Type</option>
                            </select>
                            
                            <button id="sort-direction-btn" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors flex items-center" title="${this.sortAscending ? 'Sort Ascending (A-Z, 1-9)' : 'Sort Descending (Z-A, 9-1)'}">
                                ${this.sortAscending ? 
                                    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>' : 
                                    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>'
                                }
                            </button>
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
        console.log('🔄 updateRecipeDisplay called, showFavoritesOnly:', this.showFavoritesOnly);
        
        // Update only the recipe cards, info bar, and empty state without re-rendering entire component
        const recipeGrid = this.container.querySelector('#recipes-grid');
        const emptyState = this.container.querySelector('#empty-state');
        
        // Use more specific selector for info bar to avoid conflicts with other bg-gray-50 elements
        const infoBar = this.container.querySelector('.border-t.border-gray-200 .bg-gray-50') || 
                       this.container.querySelector('.bg-gray-50.rounded-lg') ||
                       this.container.querySelector('.bg-gray-50');
        
        console.log('🔍 Info bar search:', {
            specificSelector: !!this.container.querySelector('.border-t.border-gray-200 .bg-gray-50'),
            roundedSelector: !!this.container.querySelector('.bg-gray-50.rounded-lg'),
            genericSelector: !!this.container.querySelector('.bg-gray-50'),
            finalInfoBar: !!infoBar
        });
        
        console.log('🔄 Elements found:', {
            recipeGrid: !!recipeGrid,
            emptyState: !!emptyState,
            infoBar: !!infoBar
        });
        
        if (recipeGrid && emptyState) {
            const filteredRecipes = this.getFilteredRecipes();
            console.log('🔄 Filtered recipes count:', filteredRecipes.length);
            
            const newHTML = this.renderRecipeCards();
            console.log('🔄 New HTML length:', newHTML.length, 'characters');
            
            recipeGrid.innerHTML = newHTML;
            console.log('🔄 innerHTML updated');
            
            // Force a reflow to ensure DOM updates are rendered
            recipeGrid.offsetHeight;
            console.log('🔄 Reflow forced');
            
        // Re-attach event listeners to the new recipe cards
        this.attachRecipeCardListeners();
        console.log('🔄 Event listeners reattached');
        
        // Also attach empty state listeners if no recipes
        if (this.recipes.length === 0) {
            this.attachEmptyStateListeners();
        }
            
            // Update empty state visibility
            if (filteredRecipes.length > 0) {
                emptyState.classList.add('hidden');
            } else {
                emptyState.classList.remove('hidden');
                // Re-attach event listener specifically for the empty state button
                this.attachEmptyStateListeners();
            }
            
            // Update info bar content
            if (infoBar) {
                this.updateInfoBar(infoBar);
                console.log('🔄 Info bar updated');
            }
            
            // Update favorites button state
            this.updateFavoritesButton();
            console.log('🔄 Favorites button updated');
            
            // Update labels dropdown to show only labels from filtered recipes
            this.updateLabelsDropdown();
            console.log('🔄 Labels dropdown updated');
        } else {
            console.log('❌ Missing required elements for updateRecipeDisplay');
        }
    }

    updateFavoritesButton() {
        const favoritesBtn = this.container.querySelector('#favorites-filter-btn');
        
        if (favoritesBtn) {
            // Update button appearance and text with better dark mode support
            const newClassName = `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.showFavoritesOnly ? 
                // Active state: yellow background with border and glow - keep original yellow theme
                'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-yellow-100 font-bold border-2 border-yellow-500 shadow-lg shadow-yellow-400/50 dark:border-yellow-400 dark:shadow-yellow-500/50' :
                // Inactive state: same yellow background as before, just no border/glow
                'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-yellow-100 border-2 border-transparent'
            }`;
            favoritesBtn.className = newClassName;
            favoritesBtn.title = this.showFavoritesOnly ? 'Show all recipes' : 'Show only favorites';
            
            // Update button content with correct star icon and intuitive text
            const newInnerHTML = `
                ${this.showFavoritesOnly ? 
                    // Active: filled star + "Favorites Only"
                    '<svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>' :
                    // Inactive: outline star + "Favorites"
                    '<svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>'
                }
                <span class="${this.showFavoritesOnly ? 'font-bold' : ''}">${this.showFavoritesOnly ? 'Favorites Only' : 'Favorites'}</span>
            `;
            favoritesBtn.innerHTML = newInnerHTML;
        }
    }

    updateInfoBar(infoBar) {
        // Get current filtered data for accurate counts
        const filteredRecipes = this.getFilteredRecipes();
        const filteredComboRecipes = this.getFilteredComboRecipes();
        
        // Get labels from filtered recipes only (not all labels in system)
        const filteredLabels = this.getFilteredLabels();
        
        // Count favorites in the currently filtered recipes
        const filteredFavorites = filteredRecipes.filter(recipe => recipe.favorite === true);
        
        console.log('📊 Info bar update:', {
            totalRecipes: this.recipes.length,
            filteredRecipes: filteredRecipes.length,
            filteredLabels: filteredLabels.length,
            filteredCombos: filteredComboRecipes.length,
            filteredFavorites: filteredFavorites.length,
            showFavoritesOnly: this.showFavoritesOnly
        });
        
        // Update the left side stats
        const leftSide = infoBar.querySelector('.flex.items-center.space-x-4');
        if (leftSide) {
            leftSide.innerHTML = `
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span><strong>${filteredRecipes.length}</strong> recipes</span>
                </div>
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <span><strong>${filteredLabels.length}</strong> labels</span>
                </div>
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span><strong>${filteredFavorites.length}</strong> favs</span>
                </div>
            `;
        }

        // Update the right side filter indicators
        const rightSide = infoBar.querySelector('.flex.items-center.space-x-3');
        if (rightSide) {
            rightSide.innerHTML = ``;
        }
    }

    attachEmptyStateListeners() {
        console.log('🔧 attachEmptyStateListeners called');
        
        // Specifically attach event listener for the "Add Your First Recipe" button
        const addFirstRecipeBtn = this.container.querySelector('#add-first-recipe');
        if (addFirstRecipeBtn) {
            console.log('🔧 Found "Add Your First Recipe" button, attaching listener');
            addFirstRecipeBtn.addEventListener('click', () => {
                console.log('🔧 "Add Your First Recipe" button clicked');
                this.showRecipeForm();
            });
        } else {
            console.log('🔧 "Add Your First Recipe" button not found');
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


        // Schedule recipe buttons
        this.container.querySelectorAll('.schedule-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(btn.dataset.recipeId);
                this.scheduleRecipe(recipeId);
            });
        });

        // Recipe card click (for viewing details)
        this.container.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on action buttons
                if (!e.target.closest('.toggle-favorite, .edit-recipe, .schedule-recipe')) {
                    const recipeId = parseInt(card.dataset.recipeId);
                    console.log('🖱️ Recipe card clicked, recipeId:', recipeId);
                    this.showRecipeDetail(recipeId);
                }
            });
        });
    }

    renderRecipeCards() {
        const filteredRecipes = this.getFilteredRecipes();
        console.log('🎨 renderRecipeCards called, filtered count:', filteredRecipes.length);
        console.log('🎨 Sample filtered recipes:', filteredRecipes.slice(0, 3).map(r => r.title));
        
        const html = filteredRecipes.map(recipe => `
            <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer recipe-card ${recipe.recipe_type === 'combo' ? 'border-l-4 border-purple-500' : ''}" 
                 data-recipe-id="${recipe.id}" data-recipe-type="${recipe.recipe_type || 'basic'}">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${recipe.title}</h3>
                        </div>
                        <div class="flex items-center space-x-1 ml-2">
                            <button class="hover:text-yellow-500 toggle-favorite" data-recipe-id="${recipe.id}" title="${recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}">
                                <svg class="w-4 h-4 ${recipe.favorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}" fill="${recipe.favorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                </svg>
                            </button>
                            <button class="text-gray-400 hover:text-blue-600 edit-recipe" data-recipe-id="${recipe.id}" title="Edit recipe">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            ${this.isRecipeQueued(recipe.id) ? 
                                `<button class="text-green-600 opacity-50 cursor-not-allowed" disabled title="Already in planning queue">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </button>` :
                                `<button class="text-gray-400 hover:text-green-600 schedule-recipe" data-recipe-id="${recipe.id}" title="Add to planning queue">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </button>`
                            }
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
                            ${(recipe.recipe_type === 'combo' && ((recipe.recipes && recipe.recipes.length > 0) || (recipe.combo_recipes && recipe.combo_recipes.length > 0))) ? 
                                `${this.getCombinedItemsForCombo(recipe).length} items (from ${recipe.recipes ? recipe.recipes.length : (recipe.combo_recipes ? recipe.combo_recipes.length : 0)} recipes)` : 
                                `${(recipe.items || []).length} items`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        console.log('🎨 Generated HTML length:', html.length, 'characters');
        return html;
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
        console.log('🔍 getFilteredRecipes called, showFavoritesOnly:', this.showFavoritesOnly);
        console.log('🔍 Total recipes:', this.recipes.length);
        
        let filtered = this.recipes;

        // Filter by search term
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(recipe => 
                recipe.title.toLowerCase().includes(term) ||
                recipe.description.toLowerCase().includes(term) ||
                (recipe.labels && this.extractLabelNames(recipe.labels).some(label => label.toLowerCase().includes(term)))
            );
            console.log('🔍 After search filter:', filtered.length);
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
            console.log('🔍 After label filter:', filtered.length);
        }

        // Filter by favorites
        if (this.showFavoritesOnly) {
            console.log('🔍 Filtering by favorites...');
            const beforeFavFilter = filtered.length;
            const favoritesInFiltered = filtered.filter(recipe => recipe.favorite === true);
            console.log('🔍 Recipes with favorite=true in current filtered set:', favoritesInFiltered.length);
            console.log('🔍 Sample favorite recipes:', favoritesInFiltered.slice(0, 3).map(r => ({title: r.title, favorite: r.favorite})));
            
            filtered = filtered.filter(recipe => recipe.favorite === true);
            console.log('🔍 After favorites filter:', filtered.length, 'from', beforeFavFilter);
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
            // Include "Favorite" as a label when recipe is favorited
            if (recipe.favorite === true) {
                labels.add('Favorite');
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
               this.selectedLabels.length > 0;
    }

    getAllLabels() {
        // Get all available labels from current recipes and items
        const recipeLabels = this.getUniqueLabels();
        const itemLabels = this.getUniqueItemLabels();
        
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
        const allLabels = [...new Set([...recipeLabels, ...itemLabels, ...predefinedLabels])];
        return allLabels.sort();
    }

    getUniqueItemLabels() {
        const allLabels = new Set();
        this.items.forEach(item => {
            if (item.labels && Array.isArray(item.labels)) {
                item.labels.forEach(label => allLabels.add(label));
            }
        });
        return Array.from(allLabels);
    }

    getItemById(id) {
        return this.items.find(item => item.id === id);
    }

    getItemNameById(id) {
        const item = this.getItemById(id);
        return item ? item.name : 'Unknown Item';
    }

    // Utility function to round quantities to 2 decimal places and remove trailing zeros
    // PRINCIPLE: All quantities must be realistic values that a user could manually enter via UI
    // Items should be either whole numbers or rounded to hundredths (0.00) for practical use
    // No programmatic artifacts like 0.3333333333333333 - these would never be user-entered
    roundQuantity(quantity) {
        const rounded = Math.round(quantity * 100) / 100;
        return parseFloat(rounded.toFixed(2));
    }

    getCombinedItemsForCombo(comboRecipe) {
        const combinedItems = new Map(); // Use Map to combine quantities of same items
        
        // Get the recipes in this combo and their ingredients
        const recipeRefs = comboRecipe.recipes || comboRecipe.combo_recipes || [];
        
        recipeRefs.forEach(recipeRef => {
            const recipe = this.recipes.find(r => r.id === parseInt(recipeRef.recipe_id));
            if (!recipe || !recipe.items) return;
            
            const portions = recipeRef.servings || 1; // How many portions of this recipe
            
            (recipe.items || []).forEach(item => {
                const itemName = this.getItemNameById(item.item_id || item.ingredient_id) || 'Unknown item';
                const key = `${itemName}_${item.unit}`;
                
                if (combinedItems.has(key)) {
                    // Add to existing quantity and round it
                    const existing = combinedItems.get(key);
                    existing.quantity = this.roundQuantity(existing.quantity + (parseFloat(item.quantity) || 0) * portions);
                } else {
                    // Add new item with rounded quantity
                    combinedItems.set(key, {
                        name: itemName,
                        quantity: this.roundQuantity((parseFloat(item.quantity) || 0) * portions),
                        unit: item.unit || ''
                    });
                }
            });
        });
        
        // ALSO add the combo's own additional items
        const additionalItems = comboRecipe.items || [];
        additionalItems.forEach(item => {
            const itemName = this.getItemNameById(item.item_id || item.ingredient_id) || 'Unknown item';
            const key = `${itemName}_${item.unit}`;
            
            if (combinedItems.has(key)) {
                // Add to existing quantity and round it
                const existing = combinedItems.get(key);
                existing.quantity = this.roundQuantity(existing.quantity + (parseFloat(item.quantity) || 0));
            } else {
                // Add new item with rounded quantity
                combinedItems.set(key, {
                    name: itemName,
                    quantity: this.roundQuantity(parseFloat(item.quantity) || 0),
                    unit: item.unit || ''
                });
            }
        });
        
        // Convert Map to array - quantities are already properly rounded
        return Array.from(combinedItems.values());
    }

    attachEventListeners() {
        console.log('🔧 attachEventListeners called');
        
        try {
        
        // Remove existing event listeners to prevent duplicates
        const existingFavBtn = this.container.querySelector('#favorites-filter-btn');
        if (existingFavBtn) {
            // Clone the element to remove all event listeners
            const newFavBtn = existingFavBtn.cloneNode(true);
            existingFavBtn.parentNode.replaceChild(newFavBtn, existingFavBtn);
            console.log('🔧 Removed existing favorites button listeners');
        }
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
                this.attachEventListeners(); // Reattach event listeners after render
                this.updateFavoritesButton(); // Ensure favorites button maintains correct state after render
                this.updateRecipeDisplay(); // Apply the new sort direction to the recipes
            });
        }

        // Clear filters button with centralized logic
        const clearFiltersBtn = this.container.querySelector('#clear-recipe-filters-btn');
        if (clearFiltersBtn) {
            const clearCallback = () => {
                // Clear all filters logic (without confirmation/double press - that's handled by the centralized handler)
                this.searchTerm = '';
                this.selectedLabels = []; // Reset multi-select labels
                this.labelSearchTerm = ''; // Reset label search
                this.sortBy = 'name';
                this.sortAscending = true; // Reset sort direction
                this.showFavoritesOnly = false;
                this.render();
                this.attachEventListeners(); // Reattach event listeners after render
                this.updateFavoritesButton(); // Ensure favorites button maintains correct state after render
            };
            
            // Use fallback for settings manager access
            const settingsManager = window.mealPlannerSettings || window.settingsManager;
            if (settingsManager && settingsManager.createClearFiltersHandler) {
                clearFiltersBtn.addEventListener('click', 
                    settingsManager.createClearFiltersHandler(clearCallback, '#clear-recipe-filters-btn', this)
                );
            } else {
                // Fallback to simple click handler if settings manager not available
                console.warn('⚠️ Settings manager not available, using simple clear filters');
                clearFiltersBtn.addEventListener('click', clearCallback);
            }
        }

        // Favorites filter button
        const favoritesFilterBtn = this.container.querySelector('#favorites-filter-btn');
        console.log('🔧 Favorites button element found:', !!favoritesFilterBtn, favoritesFilterBtn?.id);
        if (favoritesFilterBtn) {
            console.log('🔧 Adding click listener to favorites button');
            favoritesFilterBtn.addEventListener('click', (e) => {
                console.log('🌟 Favorites button clicked, current state:', this.showFavoritesOnly);
                console.log('🌟 Event target:', e.target, e.currentTarget);
                console.log('🌟 About to toggle state...');
                this.showFavoritesOnly = !this.showFavoritesOnly;
                console.log('🌟 New state:', this.showFavoritesOnly);
                this.updateRecipeDisplay();
                console.log('🌟 updateRecipeDisplay called');
            });
        } else {
            console.log('❌ Favorites button not found!');
        }

        // Attach recipe card listeners (favorites, edit, delete, click)
        console.log('🔧 About to attach recipe card listeners');
        const recipeCards = this.container.querySelectorAll('.recipe-card');
        console.log('🔧 Found recipe cards:', recipeCards.length);
        try {
            this.attachRecipeCardListeners();
            console.log('🔧 attachRecipeCardListeners completed successfully');
        } catch (error) {
            console.error('🔧 Error in attachRecipeCardListeners:', error);
        }

        // Add recipe button
        console.log('🔧 Continuing to Add recipe button section...');
        const addBtn = this.container.querySelector('#add-recipe-btn, #add-first-recipe');
        console.log('🔧 Add recipe button found:', !!addBtn, addBtn?.id);
        if (addBtn) {
            console.log('🔧 Adding click listener to add recipe button');
            addBtn.addEventListener('click', () => {
                console.log('🔧 Add recipe button clicked!');
                this.showRecipeForm();
            });
        }

        // Add combo button
        const addComboBtn = this.container.querySelector('#add-combo-btn');
        if (addComboBtn) {
            addComboBtn.addEventListener('click', () => {
                this.showRecipeForm(null, true); // Pass true for isCombo
            });
        }

        // Manage labels button - remove existing listeners first
        const manageLabelsBtn = this.container.querySelector('#manage-labels-btn');
        if (manageLabelsBtn) {
            // Clone and replace to remove all existing event listeners
            const newManageLabelsBtn = manageLabelsBtn.cloneNode(true);
            manageLabelsBtn.parentNode.replaceChild(newManageLabelsBtn, manageLabelsBtn);
            
            // Add fresh event listener
            newManageLabelsBtn.addEventListener('click', () => {
                console.log('🏷️ Labels button clicked - single event listener');
                this.showLabelManagement();
            });
        }

        // Attach empty state listeners if no recipes
        if (this.recipes.length === 0) {
            console.log('🔧 No recipes found, attaching empty state listeners');
            this.attachEmptyStateListeners();
        }
        
        console.log('🔧 attachEventListeners completed successfully');
        
        } catch (error) {
            console.error('🔧 Error in attachEventListeners:', error);
            console.error('🔧 Stack trace:', error.stack);
        }
    }

    showLabelManagement() {
        console.log('🏷️ Opening label management interface...');
        
        // Prevent multiple calls in rapid succession (aggressive debounce)
        const now = Date.now();
        if (this.lastLabelManagementCall && (now - this.lastLabelManagementCall) < 1000) {
            console.log('🏷️ Label management called too recently, ignoring duplicate call');
            return;
        }
        
        this.lastLabelManagementCall = now;
        this.labelManagementOpen = true;
        
        // Store current recipe content for restoration
        this.originalRecipeContent = this.container.innerHTML;
        
        // Replace the entire recipe tab content with label management (full-page approach)
        this.container.innerHTML = this.generateLabelManagementHTML();
        
        // Attach event listeners for label management
        this.attachLabelManagementListeners();
        
        // Load and display existing labels
        this.loadLabelsForManagement();
    }

    generateLabelManagementHTML() {
        console.log('🏷️ generateLabelManagementHTML called - using MOBILE-OPTIMIZED version');
        
        const presetColors = [
            '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
            '#10B981', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#A855F7'
        ];

        return `
            <!-- MOBILE-OPTIMIZED FULL-PAGE LAYOUT -->
            <div class="bg-white dark:bg-gray-800 w-full min-h-screen flex flex-col">
                <!-- Mobile-first Header with Navigation -->
                <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
                    <div class="flex items-center gap-3">
                        <!-- Back button for mobile (same as recipe forms) -->
                        <button id="back-to-recipes-from-labels" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors md:hidden">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Label Management</h2>
                            <p class="text-gray-600 dark:text-gray-400 mt-1">Create, edit, and manage recipe labels</p>
                        </div>
                    </div>
                    <!-- Close button for desktop and as an alternative on mobile (same as recipe forms) -->
                    <button id="close-label-management" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Main Content Area with Mobile Scrolling -->
                <div class="flex-grow overflow-y-auto p-4 md:p-6">
                    <!-- Create/Edit Label Form -->
                    <section class="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create/Edit Label</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="new-label-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label Name</label>
                                <input type="text" id="new-label-name" placeholder="e.g., Vegetarian, Quick Meal"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                            </div>
                            <div>
                                <label for="new-label-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                <select id="new-label-type"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                    <option value="custom">Custom</option>
                                    <option value="meal_type">Meal Type</option>
                                    <option value="dietary">Dietary</option>
                                    <option value="cuisine">Cuisine</option>
                                    <option value="occasion">Occasion</option>
                                </select>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                                <div class="flex items-center gap-2 mb-2">
                                    <div id="color-preview" class="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600" style="background-color: #3B82F6;"></div>
                                    <input type="color" id="new-label-color" value="#3B82F6"
                                           class="w-12 h-8 p-0 border-0 rounded-md overflow-hidden cursor-pointer hidden">
                                    <button id="toggle-color-mode" class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                        <span class="custom-mode-text">Presets</span><span class="preset-mode-text hidden">Custom</span>
                                    </button>
                                </div>
                                <div id="preset-colors" class="flex flex-wrap gap-2 mb-4">
                                    ${presetColors.map(color => `
                                        <button class="preset-color-btn w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-all"
                                                style="background-color: ${color};" data-color="${color}" title="${color}">
                                            <svg class="w-full h-full text-white opacity-0 flex items-center justify-center" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </button>
                                    `).join('')}
                                </div>
                                <!-- Bottom row with hex input on left and buttons on right -->
                                <div class="flex justify-between items-center mt-4">
                                    <div class="flex items-center gap-2">
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Hex:</label>
                                        <input type="text" id="new-label-color-text" value="#3B82F6"
                                               class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white uppercase">
                                    </div>
                                    <div class="flex gap-2">
                                        <button id="cancel-label-btn"
                                                class="px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors hidden">
                                            Cancel
                                        </button>
                                        <button id="create-label-btn"
                                                class="px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                                            Create Label
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- User Labels List -->
                    <section class="mb-8">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Labels</h3>
                        <div id="user-labels-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- User labels will be rendered here -->
                        </div>
                        <p id="no-user-labels" class="text-gray-500 dark:text-gray-400 text-center py-4 hidden">No user-created labels yet.</p>
                    </section>

                    <!-- System Labels List -->
                    <section>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Labels</h3>
                        <div id="system-labels-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- System labels will be rendered here -->
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    // System Labels Management
    // These labels are persistent and not affected by data clearing
    getSystemLabels() {
        // Get system labels from localStorage (initialized at app startup)
        const systemLabels = JSON.parse(localStorage.getItem('mealplanner_system_labels') || '[]');
        
        // Fallback to default system labels if not found (shouldn't happen in normal operation)
        if (systemLabels.length === 0) {
            console.warn('⚠️ System labels not found in localStorage, using fallback defaults');
            return [
                {
                    id: 'system_recipe_combo',
                    name: 'recipe_combo',
                    type: 'recipe_combo',
                    color: '#F59E0B',
                    description: 'Automatically applied to combo recipes that combine multiple individual recipes',
                    isSystem: true
                },
                {
                    id: 'system_favorites',
                    name: 'favorites',
                    type: 'custom',
                    color: '#EAB308',
                    description: 'Automatically applied to recipes marked as favorites',
                    isSystem: true
                },
                {
                    id: 'system_breakfast',
                    name: 'breakfast',
                    type: 'meal_type',
                    color: '#F97316',
                    description: 'Recipes suitable for breakfast meals',
                    isSystem: true
                },
                {
                    id: 'system_lunch',
                    name: 'lunch',
                    type: 'meal_type',
                    color: '#10B981',
                    description: 'Recipes suitable for lunch meals',
                    isSystem: true
                },
                {
                    id: 'system_dinner',
                    name: 'dinner',
                    type: 'meal_type',
                    color: '#8B5CF6',
                    description: 'Recipes suitable for dinner meals',
                    isSystem: true
                }
            ];
        }
        
        return systemLabels;
    }


    // Get all labels (system + user) - returns label names as strings
    getAllLabels() {
        const systemLabels = this.getSystemLabels();
        const userLabels = JSON.parse(localStorage.getItem('mealplanner_user_labels') || '[]');
        
        // Extract label names from both system and user labels
        const allLabelNames = [
            ...systemLabels.map(label => label.name || label),
            ...userLabels.map(label => label.name || label)
        ];
        
        return [...new Set(allLabelNames)].sort();
    }

    // Get user labels only
    getUserLabels() {
        return JSON.parse(localStorage.getItem('mealplanner_user_labels') || '[]');
    }

    // Get full label object by name (checks both system and user labels)
    getLabelObject(labelName) {
        // Check system labels first
        const systemLabels = this.getSystemLabels();
        const systemLabel = systemLabels.find(label => label.name === labelName);
        if (systemLabel) {
            return systemLabel;
        }

        // Check user labels
        const userLabels = this.getUserLabels();
        const userLabel = userLabels.find(label => label.name === labelName);
        if (userLabel) {
            return userLabel;
        }

        // Return null if not found
        return null;
    }

    // Convert hex color to inline style for background with proper contrast
    getLabelInlineStyle(hexColor) {
        // Calculate if the background is light or dark to determine text color
        const rgb = this.hexToRgb(hexColor);
        if (!rgb) return `background-color: ${hexColor}; color: white;`;
        
        // Calculate relative luminance
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
        
        return `background-color: ${hexColor}; color: ${textColor};`;
    }

    // Helper function to convert hex to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Unified function to get label display properties (colors, icon, etc.)
    getLabelDisplayProperties(labelName) {
        const labelObject = this.getLabelObject(labelName);
        const labelType = labelObject ? labelObject.type : this.inferLabelType(labelName);
        const icon = window.labelTypes ? window.labelTypes.getIcon(labelType) : '';
        
        let colors, inlineStyle = '';
        if (labelObject && labelObject.color) {
            // Use custom color with proper contrast
            inlineStyle = this.getLabelInlineStyle(labelObject.color);
            colors = 'rounded-full'; // Just the rounded class, color comes from inline style
        } else {
            // Use type-based Tailwind classes
            colors = window.labelTypes ? window.labelTypes.getColorClasses(labelType) : 
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        }
        
        const buttonColors = this.getLabelButtonColors(labelType);
        
        return {
            labelType,
            icon,
            colors,
            inlineStyle,
            buttonColors
        };
    }

    // Save user labels
    saveUserLabels(labels) {
        localStorage.setItem('mealplanner_user_labels', JSON.stringify(labels));
        console.log('🏷️ User labels saved:', labels.length);
    }

    // Add a new user label
    addUserLabel(label) {
        const userLabels = this.getUserLabels();
        const newLabel = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: label.name,
            type: label.type,
            color: label.color,
            isSystem: false,
            created_at: new Date().toISOString()
        };
        userLabels.push(newLabel);
        this.saveUserLabels(userLabels);
        return newLabel;
    }

    // Update a user label
    updateUserLabel(labelId, updates) {
        const userLabels = this.getUserLabels();
        const index = userLabels.findIndex(label => label.id === labelId);
        if (index !== -1) {
            userLabels[index] = { ...userLabels[index], ...updates, updated_at: new Date().toISOString() };
            this.saveUserLabels(userLabels);
            return userLabels[index];
        }
        return null;
    }

    // Delete a user label
    deleteUserLabel(labelId) {
        const userLabels = this.getUserLabels();
        const filteredLabels = userLabels.filter(label => label.id !== labelId);
        this.saveUserLabels(filteredLabels);
        return filteredLabels.length < userLabels.length;
    }

    attachLabelManagementListeners() {
        // Back button (same as close)
        const backBtn = document.getElementById('back-to-recipes-from-labels');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.closeLabelManagement();
            });
        }

        // Close button
        const closeBtn = document.getElementById('close-label-management');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeLabelManagement();
            });
        }

        // No click-outside-to-close for full-page approach

        // Dual-mode color picker functionality
        this.setupColorPicker();
        
        // Color picker sync (for custom mode)
        const colorPicker = document.getElementById('new-label-color');
        const colorText = document.getElementById('new-label-color-text');
        
        if (colorPicker && colorText) {
            colorPicker.addEventListener('input', (e) => {
                colorText.value = e.target.value;
                this.updateColorPreview(e.target.value);
            });
            
            colorText.addEventListener('input', (e) => {
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    colorPicker.value = e.target.value;
                    this.updateColorPreview(e.target.value);
                }
            });
        }

        // Create/Update label button - use single handler that checks current mode
        const createBtn = document.getElementById('create-label-btn');
        if (createBtn) {
            createBtn.addEventListener('click', (e) => {
                // Prevent the onclick handler from also firing
                e.preventDefault();
                e.stopPropagation();
                
                // Check if we're in edit mode by looking at button text
                if (createBtn.textContent === 'Update') {
                    // Get the original label name from the button's data attribute
                    const originalName = createBtn.getAttribute('data-original-name');
                    if (originalName) {
                        this.updateLabel(originalName);
                    }
                } else {
                    this.createNewLabel();
                }
            });
        }

        // Enter key to create label
        const nameInput = document.getElementById('new-label-name');
        if (nameInput) {
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.createNewLabel();
                }
            });
        }
    }

    closeLabelManagement() {
        console.log('🏷️ Closing label management interface...');
        
        // Reset the flag to allow opening again
        this.labelManagementOpen = false;
        
        // Restore the original recipe content
        if (this.originalRecipeContent) {
            this.container.innerHTML = this.originalRecipeContent;
            
            // Re-attach event listeners for the restored content
            this.attachEventListeners();
            
            // Clear the stored content
            this.originalRecipeContent = null;
        }
    }

    loadLabelsForManagement() {
        // Load system labels
        this.displaySystemLabels();
        
        // Load user labels
        this.displayUserLabels();
    }

    displaySystemLabels() {
        const container = document.getElementById('system-labels-list');
        if (!container) return;

        const systemLabels = this.getSystemLabels();
        
        container.innerHTML = systemLabels.map(label => `
            <div class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-600 rounded-lg">
                <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full border-2 border-gray-300" style="background-color: ${label.color}"></div>
                    <div>
                        <div class="font-medium text-gray-900 dark:text-white">${label.name}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${label.type} • ${label.description}</div>
                    </div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">SYSTEM</div>
            </div>
        `).join('');
    }

    displayUserLabels() {
        const container = document.getElementById('user-labels-list');
        if (!container) return;

        const userLabels = this.getUserLabels();
        
        if (userLabels.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <p>No user labels created yet</p>
                    <p class="text-sm">Create your first label above to get started</p>
                </div>
            `;
            return;
        }

        container.innerHTML = userLabels.map(label => `
            <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full border-2 border-gray-300" style="background-color: ${label.color}"></div>
                    <div>
                        <div class="font-medium text-gray-900 dark:text-white">${label.name}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${label.type}</div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="window.recipeManager.editLabel('${label.name}')" class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors" title="Edit">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button onclick="window.recipeManager.deleteLabel('${label.name}')" class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors" title="Delete">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    getUserLabels() {
        try {
            const labels = JSON.parse(localStorage.getItem('mealplanner_user_labels') || '[]');
            return labels.filter(label => !label.isSystem);
        } catch (error) {
            console.error('Error loading user labels:', error);
            return [];
        }
    }

    saveUserLabels(labels) {
        try {
            localStorage.setItem('mealplanner_user_labels', JSON.stringify(labels));
            return true;
        } catch (error) {
            console.error('Error saving user labels:', error);
            return false;
        }
    }

    createNewLabel() {
        const nameInput = document.getElementById('new-label-name');
        const typeSelect = document.getElementById('new-label-type');
        const colorInput = document.getElementById('new-label-color');

        if (!nameInput || !typeSelect || !colorInput) return;

        const name = nameInput.value.trim();
        const type = typeSelect.value;
        const color = colorInput.value;

        // Validation
        if (!name) {
            this.showCustomAlert('Label Name Required', 'Please enter a label name before creating.');
            nameInput.focus();
            return;
        }

        // Check for duplicates (including system labels)
        const existingLabels = [...this.getUserLabels(), ...this.getSystemLabels()];
        if (existingLabels.some(label => label.name.toLowerCase() === name.toLowerCase())) {
            this.showCustomAlert('A label with this name already exists', 'Please choose a different name for your label.');
            nameInput.focus();
            return;
        }

        // Create new label
        const newLabel = {
            name: name,
            type: type,
            color: color,
            isSystem: false,
            createdAt: new Date().toISOString()
        };

        // Save to storage
        const userLabels = this.getUserLabels();
        userLabels.push(newLabel);
        
        if (this.saveUserLabels(userLabels)) {
            // Clear form
            nameInput.value = '';
            typeSelect.value = 'ingredient_type';
            colorInput.value = '#3B82F6';
            document.getElementById('new-label-color-text').value = '#3B82F6';
            
            // Refresh display
            this.displayUserLabels();
            
            console.log('✅ Label created successfully:', newLabel);
        } else {
            this.showCustomAlert('Error Creating Label', 'There was an error creating the label. Please try again.');
        }
    }

    editLabel(labelName) {
        const userLabels = this.getUserLabels();
        const label = userLabels.find(l => l.name === labelName);
        
        if (!label) return;

        // Populate form with existing values
        const nameInput = document.getElementById('new-label-name');
        const typeSelect = document.getElementById('new-label-type');
        const colorInput = document.getElementById('new-label-color');
        const colorText = document.getElementById('new-label-color-text');

        if (nameInput && typeSelect && colorInput && colorText) {
            nameInput.value = label.name;
            typeSelect.value = label.type;
            colorInput.value = label.color;
            colorText.value = label.color;
            
            // Update color preview and preset selection
            this.updateColorPreview(label.color);
            this.selectPresetColor(label.color);

            // Change button to update mode and show cancel button
            const createBtn = document.getElementById('create-label-btn');
            const cancelBtn = document.getElementById('cancel-label-btn');
            
            if (createBtn) {
                createBtn.textContent = 'Update';
                createBtn.setAttribute('data-original-name', label.name);
                // Remove any existing onclick handler since we're using the event listener
                createBtn.onclick = null;
            }
            
            if (cancelBtn) {
                cancelBtn.classList.remove('hidden');
                cancelBtn.onclick = () => this.cancelLabelEdit();
            }
        }
    }

    updateLabel(originalName) {
        const nameInput = document.getElementById('new-label-name');
        const typeSelect = document.getElementById('new-label-type');
        const colorInput = document.getElementById('new-label-color');

        if (!nameInput || !typeSelect || !colorInput) return;

        const name = nameInput.value.trim();
        const type = typeSelect.value;
        const color = colorInput.value;

        if (!name) {
            this.showCustomAlert('Label Name Required', 'Please enter a label name before updating.');
            return;
        }

        // No duplicate check needed for updates - user can keep the same name

        // Update label
        const userLabels = this.getUserLabels();
        const labelIndex = userLabels.findIndex(l => l.name === originalName);
        
        if (labelIndex !== -1) {
            userLabels[labelIndex] = {
                ...userLabels[labelIndex],
                name: name,
                type: type,
                color: color,
                updatedAt: new Date().toISOString()
            };

            if (this.saveUserLabels(userLabels)) {
                // Reset form
                this.resetLabelForm();
                
                // Refresh display
                this.displayUserLabels();
                
                console.log('✅ Label updated successfully');
            } else {
                this.showCustomAlert('Error Updating Label', 'There was an error updating the label. Please try again.');
            }
        }
    }

    cancelLabelEdit() {
        // Reset form without saving changes
        this.resetLabelForm();
        console.log('❌ Label edit cancelled');
    }

    showCustomAlert(title, message) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        overlay.id = 'custom-alert-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all';
        modal.innerHTML = `
            <div class="p-6">
                <div class="flex items-center mb-4">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">${title}</h3>
                    </div>
                </div>
                <div class="mb-6">
                    <p class="text-sm text-gray-600 dark:text-gray-300">${message}</p>
                </div>
                <div class="flex justify-end">
                    <button id="custom-alert-ok" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                        OK
                    </button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Add event listener for OK button
        const okButton = document.getElementById('custom-alert-ok');
        const closeModal = () => {
            document.body.removeChild(overlay);
        };
        
        okButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // Focus the OK button for accessibility
        okButton.focus();
        
        // Add escape key listener
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    showCustomConfirm(title, message, onConfirm) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        overlay.id = 'custom-confirm-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all';
        modal.innerHTML = `
            <div class="p-6">
                <div class="flex items-center mb-4">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">${title}</h3>
                    </div>
                </div>
                <div class="mb-6">
                    <p class="text-sm text-gray-600 dark:text-gray-300">${message}</p>
                </div>
                <div class="flex justify-end space-x-3">
                    <button id="custom-confirm-cancel" class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                        Cancel
                    </button>
                    <button id="custom-confirm-ok" class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Add event listeners
        const okButton = document.getElementById('custom-confirm-ok');
        const cancelButton = document.getElementById('custom-confirm-cancel');
        
        const closeModal = () => {
            document.body.removeChild(overlay);
        };
        
        okButton.addEventListener('click', () => {
            closeModal();
            onConfirm();
        });
        
        cancelButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // Focus the cancel button for safety
        cancelButton.focus();
        
        // Add escape key listener
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    deleteLabel(labelName) {
        this.showCustomConfirm(
            'Delete Label',
            `Are you sure you want to delete the label "${labelName}"? This action cannot be undone.`,
            () => {
                this.performLabelDeletion(labelName);
            }
        );
    }

    performLabelDeletion(labelName) {

        const userLabels = this.getUserLabels();
        const filteredLabels = userLabels.filter(l => l.name !== labelName);
        
        if (this.saveUserLabels(filteredLabels)) {
            this.displayUserLabels();
            console.log('✅ Label deleted successfully');
        } else {
            this.showCustomAlert('Error Deleting Label', 'There was an error deleting the label. Please try again.');
        }
    }

    resetLabelForm() {
        const nameInput = document.getElementById('new-label-name');
        const typeSelect = document.getElementById('new-label-type');
        const colorInput = document.getElementById('new-label-color');
        const colorText = document.getElementById('new-label-color-text');
        const createBtn = document.getElementById('create-label-btn');

        if (nameInput) nameInput.value = '';
        if (typeSelect) typeSelect.value = 'ingredient_type';
        if (colorInput) colorInput.value = '#3B82F6';
        if (colorText) colorText.value = '#3B82F6';
        
        // Reset color preview
        this.updateColorPreview('#3B82F6');
        
        // Reset preset color selection
        this.selectPresetColor('#3B82F6');
        
        // Reset buttons
        const cancelBtn = document.getElementById('cancel-label-btn');
        if (cancelBtn) {
            cancelBtn.classList.add('hidden');
        }
        
        if (createBtn) {
            createBtn.textContent = 'Create Label';
            createBtn.removeAttribute('data-original-name');
            createBtn.onclick = null; // Event listener handles the click
        }
    }

    setupColorPicker() {
        // Color mode toggle
        const colorModeToggle = document.getElementById('color-mode-toggle');
        const presetColors = document.getElementById('preset-colors');
        const customColorInputs = document.getElementById('custom-color-inputs');
        
        if (colorModeToggle && presetColors && customColorInputs) {
            colorModeToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    // Custom mode
                    presetColors.classList.add('hidden');
                    customColorInputs.classList.remove('hidden');
                } else {
                    // Preset mode
                    presetColors.classList.remove('hidden');
                    customColorInputs.classList.add('hidden');
                }
            });
        }
        
        // Preset color buttons
        const presetColorButtons = document.querySelectorAll('.preset-color-btn');
        presetColorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const color = e.currentTarget.dataset.color;
                this.selectPresetColor(color);
                this.updateColorPreview(color);
            });
        });
        
        // Initialize with preset mode and default color
        if (colorModeToggle) {
            colorModeToggle.checked = false; // Start in preset mode
        }
        if (customColorInputs) {
            customColorInputs.classList.add('hidden');
        }
        this.selectPresetColor('#3B82F6');
        this.updateColorPreview('#3B82F6');
    }
    
    selectPresetColor(color) {
        // Remove selection from all preset colors
        const presetColorButtons = document.querySelectorAll('.preset-color-btn');
        presetColorButtons.forEach(button => {
            button.classList.remove('ring-4', 'ring-blue-500', 'ring-offset-2');
        });
        
        // Add selection to the chosen color
        const selectedButton = document.querySelector(`.preset-color-btn[data-color="${color}"]`);
        if (selectedButton) {
            selectedButton.classList.add('ring-4', 'ring-blue-500', 'ring-offset-2');
        }
        
        // Update hidden inputs
        const colorInput = document.getElementById('new-label-color');
        const colorText = document.getElementById('new-label-color-text');
        if (colorInput) colorInput.value = color;
        if (colorText) colorText.value = color;
    }
    
    updateColorPreview(color) {
        const preview = document.getElementById('color-preview');
        
        if (preview) {
            preview.style.backgroundColor = color;
        }
    }

    // Method to ensure system labels exist after data reset
    initializeSystemLabels() {
        const systemLabels = this.getSystemLabels();
        const existingLabels = this.getUserLabels();
        
        // This method can be called after data reset to ensure system labels are available
        // For now, system labels are defined in getSystemLabels() and don't need to be stored
        console.log('🏷️ System labels initialized:', systemLabels.length);
    }

    showRecipeForm(recipe = null, isCombo = false) {
        console.log('Opening recipe form...', recipe ? 'Edit mode' : 'Add mode', isCombo ? '(Combo)' : '(Regular)');
        
        const isEdit = recipe !== null;
        
        // Initialize form labels
        this.initFormLabels(recipe);
        
        // Use full-page form for better label container behavior
        // Modal constraints are causing layout issues with the labels container
        this.showFullPageRecipeForm(recipe, isCombo);
        return;
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
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Items</h3>
                        
                        <div id="items-container" class="space-y-3 mb-4">
                            ${this.renderItemRows(isEdit ? recipe.items || recipe.ingredients : [], false)}
                        </div>
                        
                        <!-- Action buttons below the list -->
                        <div class="flex gap-3">
                            <button type="button" id="add-item-row" class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors">
                                <span>Add</span>
                                <span>🥕</span>
                                </button>
                            <button type="button" id="create-new-item" class="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors">
                                <span>Create</span>
                                <span>🥕</span>
                                </button>
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
                        <label for="recipe-form-labels" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Labels</label>
                        <!-- Multi-select label input with typeahead and chips -->
                        <div class="relative">
                            <div id="recipe-form-labels-container" class="w-full h-10 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-text flex items-center gap-1 overflow-x-auto" style="min-height: 2.5rem; max-height: 2.5rem;">
                                ${isEdit && recipe.labels ? recipe.labels.map(label => {
                                    // Extract label name properly
                                    const labelName = typeof label === 'string' ? label : (label.name || String(label));
                                    const displayProps = this.getLabelDisplayProperties(labelName);
                                    
                                    return `
                                    <span class="inline-flex items-center px-1.5 py-0.5 text-xs font-bold ${displayProps.colors}" ${displayProps.inlineStyle ? `style="${displayProps.inlineStyle}"` : ''}>
                                        ${displayProps.icon}${labelName}
                                        <button type="button" class="ml-1 ${displayProps.buttonColors}" onclick="window.recipeManager.removeFormLabel('${labelName}')">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                    </button>
                                    </span>
                                    `;
                                }).join('') : ''}
                                <input 
                                    type="text" 
                                    id="recipe-form-labels-input" 
                                    class="flex-1 min-w-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400" 
                                    placeholder="${isEdit && recipe.labels && recipe.labels.length > 0 ? 'Type to add more...' : 'Type to search labels...'}"
                                    autocomplete="off"
                                />
                            </div>
                            <div id="recipe-form-labels-dropdown" class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg hidden max-h-32 overflow-y-auto">
                                <!-- Dropdown options will be populated by JavaScript -->
                                </div>
                            </div>
                                </div>
                    </form>
                    </div>
                    
                    <!-- Form Actions -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                        <button type="button" id="cancel-recipe-form" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm font-medium min-w-[80px] flex items-center justify-center transition-colors w-full sm:w-auto">
                                Cancel
                            </button>
                        <button type="submit" form="recipe-form" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium min-w-[80px] flex items-center justify-center w-full sm:w-auto">
                                ${isEdit ? 'Update' : (isCombo ? 'Save Combo' : 'Save Recipe')}
                            </button>
                        ${isEdit ? `
                            <button type="button" id="delete-recipe-form" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium min-w-[80px] flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                <span>Delete</span>
                            </button>
                        ` : ''}
                    </div>
                    </div>
            </div>
        `;
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Attach event listeners
        this.attachRecipeFormListeners(modal, recipe);
        
        // Note: Removed automatic focus to prevent mobile keyboard from opening
    }

    /**
     * Renders item rows for recipe/combo forms
     * 
     * TERMINOLOGY NOTE: We use "items" instead of "ingredients" because:
     * - Items are more inclusive: bag of chips, ice cream scoop, napkins, utensils
     * - Ingredients are restrictive: only things you cook/prepare with
     * - Items can be standalone foods, non-edible components, or traditional ingredients
     * 
     * @param {Array} ingredients - Array of item data (keeping variable name for compatibility)
     * @param {boolean} isCombo - If true, additional items are optional; if false (regular recipe), first item is required
     * @returns {string} HTML string for item rows
     */
    renderItemRows(items = [], isCombo = false) {
        if (items.length === 0) {
            items = [{ item_id: '', name: '', quantity: '', unit: '', notes: '' }];
        }

        return items.map((item, index) => `
            <div class="item-row grid grid-cols-10 gap-2 items-end">
                <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Item
                    </label>
                    <select class="item-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="items[${index}][item_id]" ${!isCombo && index === 0 ? 'required' : ''}>
                        <!-- VALIDATION LOGIC: 
                             - Regular recipes: First item is required (at least one item needed)
                             - Combos: All additional items are optional (recipes provide the base) -->
                        <option value="">Select item...</option>
                        ${this.items.map(ing => `
                            <option value="${ing.id}" data-unit="${ing.default_unit}" 
                                    ${(item.item_id == ing.id || item.ingredient_id == ing.id) ? 'selected' : ''}>
                                ${ing.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity
                    </label>
                    <input type="number" step="0.25" min="0" 
                           class="item-quantity w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="items[${index}][quantity]" 
                           value="${item.quantity}"
                           placeholder="1.5" ${!isCombo && index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-3">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit
                    </label>
                    <select class="unit-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="items[${index}][unit]">
                        <option value="pieces" ${item.unit === 'pieces' ? 'selected' : ''}>pieces</option>
                        <option value="cups" ${item.unit === 'cups' ? 'selected' : ''}>cups</option>
                        <option value="tbsp" ${item.unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                        <option value="tsp" ${item.unit === 'tsp' ? 'selected' : ''}>tsp</option>
                        <option value="lbs" ${item.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                        <option value="oz" ${item.unit === 'oz' ? 'selected' : ''}>oz</option>
                        <option value="cloves" ${item.unit === 'cloves' ? 'selected' : ''}>cloves</option>
                        <option value="slices" ${item.unit === 'slices' ? 'selected' : ''}>slices</option>
                    </select>
                </div>
                
                <div class="col-span-1">
                    ${items.length > 1 || index > 0 ? `
                        <button type="button" class="remove-item w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
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

    renderRecipeRows(recipes = []) {
        if (recipes.length === 0) {
            recipes = [{ recipe_id: '', servings: 1 }];
        }
        
        return recipes.map((recipe, index) => `
            <div class="recipe-row grid grid-cols-8 gap-2 items-end">
                <div class="col-span-6">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recipe
                    </label>
                    <select class="recipe-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="recipes[${index}][recipe_id]" ${index === 0 ? 'required' : ''}>
                        <option value="">Select recipe...</option>
                        ${this.recipes.filter(r => r.recipe_type !== 'combo').map(rec => `
                            <option value="${rec.id}" ${recipe.recipe_id == rec.id ? 'selected' : ''}>
                                ${rec.title}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-1">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Servings
                    </label>
                    <input type="number" step="1" min="1" 
                           class="recipe-servings w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="recipes[${index}][servings]" 
                           value="${recipe.servings || recipe.servings_multiplier || 1}"
                           placeholder="1" ${index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-1">
                    ${recipes.length > 1 || index > 0 ? `
                        <button type="button" class="remove-recipe w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
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

    renderRecipeDetails(recipes = []) {
        if (!recipes || recipes.length === 0) {
            return '<div class="text-gray-500 dark:text-gray-400 text-sm italic">No recipes added yet. Add recipes above to see their details here.</div>';
        }

        const recipeDetails = recipes.map(recipeRef => {
            const recipe = this.recipes.find(r => r.id === parseInt(recipeRef.recipe_id));
            if (!recipe) return '';

            const recipeServings = recipe.servings || recipe.serving_count || 4;
            const portions = recipeRef.servings || recipeRef.servings_multiplier || 1;
            const totalServings = portions * recipeServings;
            
            // Get timing information
            const prepTime = recipe.prep_time || 0;
            const cookTime = recipe.cook_time || 0;
            const totalTime = prepTime + cookTime;

            return `
                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div class="flex items-start justify-between mb-2">
                        <h4 class="font-medium text-gray-900 dark:text-white">${recipe.title}</h4>
                        <div class="text-sm text-gray-500 dark:text-gray-400 text-right">
                            <div>${portions} portion${portions !== 1 ? 's' : ''}</div>
                            <div class="font-medium">${totalServings} serving${totalServings !== 1 ? 's' : ''}</div>
                        </div>
                    </div>
                    
                    <!-- Timing Information -->
                    <div class="flex items-center gap-4 mb-2 text-xs text-gray-600 dark:text-gray-400">
                        ${prepTime > 0 ? `<span>⏱️ Prep: ${prepTime}min</span>` : ''}
                        ${cookTime > 0 ? `<span>🔥 Cook: ${cookTime}min</span>` : ''}
                        ${totalTime > 0 ? `<span class="font-medium">⏰ Total: ${totalTime}min</span>` : ''}
                    </div>
                    
                    ${recipe.description ? `
                        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">${recipe.description}</p>
                    ` : `
                        <p class="text-sm text-gray-500 dark:text-gray-400 italic">No description available</p>
                    `}
                </div>
            `;
        }).filter(detail => detail).join('');

        return recipeDetails || '<div class="text-gray-500 dark:text-gray-400 text-sm italic">Recipe details will appear here as you add recipes.</div>';
    }

    renderSingleItemRow(item, index, showRemoveButton = false, isCombo = false) {
        return `
            <div class="item-row grid grid-cols-10 gap-2 items-end">
                <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Item
                    </label>
                    <select class="item-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="items[${index}][item_id]" ${!isCombo && index === 0 ? 'required' : ''}>
                        <option value="">Select item...</option>
                        ${this.items.map(ing => `
                            <option value="${ing.id}" data-unit="${ing.default_unit}" 
                                    ${(item.item_id == ing.id || item.ingredient_id == ing.id) ? 'selected' : ''}>
                                ${ing.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity
                    </label>
                    <input type="number" step="0.25" min="0" 
                           class="item-quantity w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="items[${index}][quantity]" 
                           value="${item.quantity}"
                           placeholder="1.5" ${!isCombo && index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-3">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit
                    </label>
                    <select class="unit-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="items[${index}][unit]">
                        <option value="pieces" ${item.unit === 'pieces' ? 'selected' : ''}>pieces</option>
                        <option value="cups" ${item.unit === 'cups' ? 'selected' : ''}>cups</option>
                        <option value="tbsp" ${item.unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                        <option value="tsp" ${item.unit === 'tsp' ? 'selected' : ''}>tsp</option>
                        <option value="lbs" ${item.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                        <option value="oz" ${item.unit === 'oz' ? 'selected' : ''}>oz</option>
                        <option value="cloves" ${item.unit === 'cloves' ? 'selected' : ''}>cloves</option>
                        <option value="slices" ${item.unit === 'slices' ? 'selected' : ''}>slices</option>
                    </select>
                </div>
                
                <div class="col-span-1">
                    ${showRemoveButton || index > 0 ? `
                        <button type="button" class="remove-item w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
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
        // Use shared form logic with modal specific selectors
        this.attachSharedFormListeners(recipe, {
            form: '#recipe-form',
            closeBtn: '#close-recipe-form',
            cancelBtn: '#cancel-recipe-form',
            isFullPage: false
        });

        // Add delete button listener for edit mode
        const deleteBtn = modal.querySelector('#delete-recipe-form');
        if (deleteBtn && recipe) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDeleteRecipe(recipe, () => {
                    // Close the modal after deletion
                    modal.remove();
                });
            });
        }
    }

    attachItemRowListeners(row) {
        // Item selection handler
        const itemSelect = row.querySelector('.item-select');
        const unitSelect = row.querySelector('.unit-select');
        
        itemSelect?.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            const defaultUnit = selectedOption?.dataset.unit;
            
            if (defaultUnit && unitSelect) {
                unitSelect.value = defaultUnit;
            }
        });

        // Remove item handler
        const removeBtn = row.querySelector('.remove-item');
        removeBtn?.addEventListener('click', () => {
            row.remove();
        });
    }

    attachFormLabelListeners(modal) {
        const labelInput = modal.querySelector('#recipe-form-labels-input');
        const labelContainer = modal.querySelector('#recipe-form-labels-container');
        const labelDropdown = modal.querySelector('#recipe-form-labels-dropdown');

        if (!labelInput || !labelContainer || !labelDropdown) return;

        // Input event for typeahead
        labelInput.addEventListener('input', (e) => {
            this.formLabelSearchTerm = e.target.value;
            this.updateFormLabelDropdown();
        });

        // Focus/blur events for dropdown
        labelInput.addEventListener('focus', () => {
            labelDropdown.classList.remove('hidden');
            this.updateFormLabelDropdown();
        });

        // Click on container to focus input and show dropdown
        labelContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            labelInput.focus();
            labelDropdown.classList.remove('hidden');
            this.updateFormLabelDropdown();
        });

        // Keyboard navigation
        labelInput.addEventListener('keydown', (e) => {
            const dropdown = modal.querySelector('#recipe-form-labels-dropdown');
            const highlighted = dropdown.querySelector('.bg-gray-50, .dark\\:bg-gray-700');
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const firstOption = dropdown.querySelector('[data-label]');
                    if (firstOption) {
                        // Remove existing highlight
                        dropdown.querySelectorAll('[data-label]').forEach(opt => {
                            opt.classList.remove('bg-gray-50', 'dark:bg-gray-700');
                        });
                        // Add highlight to first option
                        firstOption.classList.add('bg-gray-50', 'dark:bg-gray-700');
                    }
                    break;
                    
                case 'Enter':
                    e.preventDefault();
                    if (highlighted) {
                        const label = highlighted.getAttribute('data-label');
                        if (label) {
                            this.addFormLabel(label);
                            labelInput.focus();
                        }
                    }
                    break;
                    
                case 'Escape':
                    labelDropdown.classList.add('hidden');
                    labelInput.blur();
                    break;
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!labelContainer.contains(e.target)) {
                labelDropdown.classList.add('hidden');
            }
        });
    }

    updateFormLabelDropdown() {
        const dropdown = document.querySelector('#recipe-form-labels-dropdown');
        const container = document.querySelector('#recipe-form-labels-container');
        if (!dropdown || !container) return;

        const availableLabels = this.getAllLabels().filter(label => 
            !this.formSelectedLabels.includes(label) &&
            (!this.formLabelSearchTerm || (label.name || label).toLowerCase().includes(this.formLabelSearchTerm.toLowerCase()))
        );

        if (availableLabels.length === 0 || !this.formLabelSearchTerm) {
            dropdown.classList.add('hidden');
            return;
        }

        // Check if dropdown would go off the bottom of the viewport
        const containerRect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 128; // max-h-32 = 128px
        const spaceBelow = viewportHeight - containerRect.bottom;
        const spaceAbove = containerRect.top;

        // Position dropdown above if not enough space below
        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
            dropdown.style.top = 'auto';
            dropdown.style.bottom = '100%';
            dropdown.style.marginBottom = '4px';
            dropdown.style.marginTop = '0';
        } else {
            dropdown.style.top = '100%';
            dropdown.style.bottom = 'auto';
            dropdown.style.marginTop = '4px';
            dropdown.style.marginBottom = '0';
        }

        dropdown.classList.remove('hidden');
        dropdown.innerHTML = availableLabels.slice(0, 10).map((label, index) => {
            const displayProps = this.getLabelDisplayProperties(label);
            
            return `
            <div class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-gray-100 ${index === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}" 
                 data-label="${label}" 
                 onclick="window.recipeManager.addFormLabel('${label}')">
                <div class="flex items-center space-x-2">
                    ${displayProps.icon && displayProps.labelType !== 'default' ? `<span class="flex-shrink-0">${displayProps.icon}</span>` : ''}
                    <span class="font-bold flex-1">${label}</span>
                    <span class="inline-flex items-center px-2 py-1 ${displayProps.colors} rounded-full text-xs flex-shrink-0" ${displayProps.inlineStyle ? `style="${displayProps.inlineStyle}"` : ''}>
                        ${displayProps.labelType !== 'default' ? this.getShortLabelTypeName(displayProps.labelType) : 'label'}
                    </span>
                </div>
            </div>
            `;
        }).join('');
    }

    async handleRecipeFormSubmit(form, existingRecipe) {
        try {
            // Collect form data
            const formData = new FormData(form);
            const recipeData = {
                title: formData.get('title').trim(),
                description: formData.get('description').trim(),
                serving_count: parseInt(formData.get('servings')) || 4,
                prep_time: parseInt(formData.get('prep_time')) || 0,
                cook_time: parseInt(formData.get('cook_time')) || 0,
                instructions: formData.get('instructions').trim(),
                labels: this.formSelectedLabels || []
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

            // Collect items
            const items = [];
            const itemRows = form.querySelectorAll('.item-row');
            
            itemRows.forEach((row, index) => {
                const itemId = row.querySelector(`[name="items[${index}][item_id]"]`)?.value;
                const quantity = row.querySelector(`[name="items[${index}][quantity]"]`)?.value;
                const unit = row.querySelector(`[name="items[${index}][unit]"]`)?.value;
                const notes = row.querySelector(`[name="items[${index}][notes]"]`)?.value;

                if (itemId && quantity) {
                    const item = this.items.find(ing => ing.id == itemId);
                    if (item) {
                        items.push({
                            item_id: parseInt(itemId),
                            ingredient_id: parseInt(itemId), // Backward compatibility
                            name: item.name,
                            quantity: parseFloat(quantity),
                            unit: unit || item.default_unit,
                            notes: notes || ''
                        });
                    }
                }
            });

            // Add items to recipe data (consistent naming)
            recipeData.items = items;
            
            // Labels are already set from this.formSelectedLabels above
            // No need to overwrite them
            
            // Add created_at timestamp if new recipe
            if (!existingRecipe) {
                recipeData.created_at = new Date().toISOString();
            }

            // Save recipe
            let savedRecipe;
            if (existingRecipe) {
                // Update existing recipe
                savedRecipe = await this.updateRecipe(existingRecipe.id, recipeData);
                const itemType = isCombo ? 'Combo' : 'Recipe';
                this.showNotification(`${itemType} updated successfully!`, 'success');
            } else {
                // Create new recipe
                savedRecipe = await this.createRecipe(recipeData);
                const itemType = isCombo ? 'Combo' : 'Recipe';
                this.showNotification(`${itemType} created successfully!`, 'success');
            }

            // Handle post-save navigation
            if (this.editingFromMobileView && this.editingRecipe) {
                // Update the editing recipe with latest data and return to mobile view
                this.editingRecipe = savedRecipe;
                
                // First restore the recipe list view, then show mobile recipe
                this.render(); // Restore recipe list
                
                // Small delay to ensure render is complete, then show mobile recipe
                setTimeout(() => {
                    this.isShowingMobileRecipe = false; // Reset flag
                    this.showMobileRecipePage(this.editingRecipe);
                    this.editingFromMobileView = false;
                    this.editingRecipe = null;
                }, 50);
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
        
        // Automatically apply "Recipe Combo" label if this recipe includes other recipes
        this.ensureRecipeComboLabel(newRecipe);
        
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
        
        // Automatically apply "Recipe Combo" label if this recipe includes other recipes
        this.ensureRecipeComboLabel(updatedRecipe);
        
        this.recipes[recipeIndex] = updatedRecipe;
        
        // Save to storage
        await this.saveRecipes();
        
        return updatedRecipe;
    }

    /**
     * Automatically applies or removes "Recipe Combo" label based on recipe_type
     * @param {Object} recipe - The recipe object to check and update
     */
    ensureRecipeComboLabel(recipe) {
        if (!recipe.labels) {
            recipe.labels = [];
        }

        const isCombo = recipe.recipe_type === 'combo';
        const hasRecipeComboLabel = recipe.labels.some(label => {
            const labelName = typeof label === 'string' ? label : label.name;
            return labelName === 'Recipe Combo';
        });

        if (isCombo && !hasRecipeComboLabel) {
            // Add "Recipe Combo" label for combo recipes
            recipe.labels.push({
                name: 'Recipe Combo',
                type: 'recipe_type'
            });
            console.log(`✅ Auto-applied "Recipe Combo" label to "${recipe.title}"`);
        } else if (!isCombo && hasRecipeComboLabel) {
            // Remove "Recipe Combo" label if recipe is no longer a combo
            recipe.labels = recipe.labels.filter(label => {
                const labelName = typeof label === 'string' ? label : label.name;
                return labelName !== 'Recipe Combo';
            });
            console.log(`🗑️ Auto-removed "Recipe Combo" label from "${recipe.title}"`);
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

    showBarcodeScanner(itemsContainer) {
        // Use the shared barcode scanner component
        const sharedScanner = window.SharedBarcodeScanner?.getInstance();
        if (!sharedScanner) {
            console.error('Barcode scanner not available');
            return;
        }

        // Show the scanner with recipe context
        sharedScanner.show('recipe', 
            (scannedItem, context) => {
                console.log('Product scanned for recipe:', scannedItem);
                
                // Add a new item row with the scanned item
                const currentRows = itemsContainer.querySelectorAll('.item-row').length;
                const newRowHtml = this.renderSingleItemRow({
                    item_id: scannedItem.id,
                    name: scannedItem.name,
                    quantity: '1',
                    unit: scannedItem.default_unit || 'pieces',
                    notes: ''
                }, currentRows, true, false); // false = not a combo
                
                itemsContainer.insertAdjacentHTML('beforeend', newRowHtml);
                
                // Attach listeners to new row
                this.attachItemRowListeners(itemsContainer.lastElementChild);
                
                // Show success message
                this.showNotification(`Added "${scannedItem.name}" to recipe items`, 'success');
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


    showRecipeDetail(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) {
            console.error('❌ Recipe not found:', recipeId);
            return;
        }
        
        console.log('🔍 DEBUG: Full recipe object being viewed:', JSON.stringify(recipe, null, 2));

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
        // Allow navigation between mobile recipe views
        if (this.isShowingMobileRecipe) {
            console.log('📱 Already in mobile view, navigating to different recipe:', recipe.title);
        } else {
            console.log('📱 Entering mobile recipe view for:', recipe.title);
            this.isShowingMobileRecipe = true;
        }
        
        // Store current state for back navigation using a stack
        if (!this.navigationStack) {
            this.navigationStack = [];
        }
        
        const currentView = {
            container: this.container.innerHTML,
            scrollPosition: window.scrollY,
            timestamp: Date.now(),
            recipe: recipe, // Store recipe for event listener reattachment
            isMobileView: true
        };
        
        this.navigationStack.push(currentView);
        console.log('📱 Pushed to navigation stack, stack size:', this.navigationStack.length);
        console.log('📱 Current view container length:', currentView.container.length);
        console.log('📱 Navigation stack:', this.navigationStack.map(v => v.container.length));

        // Replace entire container with mobile recipe page
        const generatedHTML = this.generateMobileRecipeHTML(recipe);
        console.log('🔧 HTML before setting innerHTML, length:', generatedHTML.length);
        console.log('🔧 HTML preview before DOM:', generatedHTML.substring(0, 500) + '...');
        
        this.container.innerHTML = generatedHTML;
        
        console.log('🔧 HTML after setting innerHTML, length:', this.container.innerHTML.length);
        console.log('🔧 HTML preview after DOM:', this.container.innerHTML.substring(0, 500) + '...');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Add event listeners with a small delay to ensure DOM is ready
        setTimeout(() => {
            this.attachMobileRecipeEventListeners(recipe);
        }, 10);
        
        console.log('📱 Mobile recipe page HTML set, container innerHTML length:', this.container.innerHTML.length);
    }

    attachMobileRecipeEventListeners(recipe) {
        console.log('📱 Attaching mobile recipe page event listeners for:', recipe.title);
        console.log('📱 Container has content:', this.container.innerHTML.length > 0);
        console.log('📱 Container element:', this.container);
        console.log('📱 Container innerHTML preview:', this.container.innerHTML.substring(0, 200));
        
        // Add back button handler
        const backBtn = this.container.querySelector('#mobile-recipe-back');
        const allBackBtns = this.container.querySelectorAll('#mobile-recipe-back');
        console.log('📱 Back button found:', !!backBtn);
        console.log('📱 All back buttons count:', allBackBtns.length);
        console.log('📱 Back button element:', backBtn);
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Back button clicked');
                this.returnFromMobileRecipe();
            });
        } else {
            console.warn('⚠️ Back button NOT found in DOM');
        }
        
        // Add close button handler
        const closeBtn = this.container.querySelector('#mobile-recipe-close');
        console.log('📱 Close button found:', !!closeBtn);
        console.log('📱 Close button element:', closeBtn);
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Close button clicked');
                this.returnFromMobileRecipe();
            });
        } else {
            console.warn('⚠️ Close button NOT found in DOM');
        }
        
        // Add edit button handler
        const editBtn = this.container.querySelector('#mobile-recipe-edit');
        console.log('📱 Edit button found:', !!editBtn);
        console.log('📱 Edit button element:', editBtn);
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Edit button clicked');
                
                // Store that we're editing from mobile recipe view
                this.editingFromMobileView = true;
                this.editingRecipe = recipe;
                
                // Check if this is a combo recipe - use reliable recipe_type field
                const isCombo = recipe.recipe_type === 'combo';
                
                console.log('📱 Mobile editing recipe:', recipe.title, 'isCombo:', isCombo);
                this.showRecipeForm(recipe, isCombo);
            });
        } else {
            console.warn('⚠️ Edit button NOT found in DOM');
        }

        // Add schedule button handler
        const scheduleBtn = this.container.querySelector('#mobile-recipe-schedule');
        console.log('📱 Schedule button found:', !!scheduleBtn);
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Schedule button clicked');
                this.scheduleRecipe(recipe.id);
            });
        } else {
            console.warn('⚠️ Schedule button NOT found in DOM');
        }
        
        console.log('📱 Event listener attachment complete');
    }

    returnFromMobileRecipe() {
        console.log('📱 Returning from mobile recipe view');
        console.log('📱 Navigation stack size:', this.navigationStack ? this.navigationStack.length : 0);
        
        if (this.navigationStack && this.navigationStack.length > 0) {
            const previousView = this.navigationStack.pop();
            console.log('📱 Popped from navigation stack, remaining:', this.navigationStack.length);
            console.log('📱 Restoring view, container length:', previousView.container.length);
            
            this.container.innerHTML = previousView.container;
            window.scrollTo(0, previousView.scrollPosition);
            
            // Reattach appropriate event listeners based on view type
            // Check if this is actually a mobile recipe view by looking for mobile buttons in the HTML
            const isMobileRecipeView = previousView.container.includes('mobile-recipe-back');
            
            if (isMobileRecipeView && previousView.recipe) {
                // This is a mobile recipe/combo view, need mobile event listeners
                console.log('📱 Restored mobile recipe view detected, reattaching mobile listeners for:', previousView.recipe.title);
                setTimeout(() => {
                    this.attachMobileRecipeEventListeners(previousView.recipe);
                }, 10);
            } else {
                // This is the main recipe list view
                console.log('📱 Restored main recipe list view, reattaching list listeners');
                this.attachEventListeners();
            }
            
            // Force mobile navigation to update its state
            if (window.mobileNavigation) {
                // Check if we should return to a specific tab
                const returnTab = previousView.returnTab || 'recipes';
                if (returnTab === 'plan') {
                    window.mobileNavigation.updateActiveTab('plan');
                    // Also switch the main app to the plan tab
                    if (window.mealPlannerApp) {
                        window.mealPlannerApp.switchTab('plan');
                    }
                } else if (returnTab === 'menu') {
                    window.mobileNavigation.updateActiveTab('menu');
                    // Also switch the main app to the menu tab
                    if (window.mealPlannerApp) {
                        window.mealPlannerApp.switchTab('menu');
                    }
                } else {
                    window.mobileNavigation.updateActiveTab('recipes');
                }
            }
            
            // Only reset mobile flag if we're back to the main list (stack empty)
            if (this.navigationStack.length === 0) {
                this.isShowingMobileRecipe = false;
                console.log('📱 Returned to main recipe list');
            } else {
                console.log('📱 Returned to previous mobile view, stack remaining:', this.navigationStack.length);
            }
            
            console.log('📱 Successfully restored view, new container length:', this.container.innerHTML.length);
        } else {
            console.log('❌ No navigation stack to restore - already returned or not set');
            this.isShowingMobileRecipe = false; // Reset flag even if no stack
        }
    }

    generateInstructionsSection(recipe) {
        console.log('📝 generateInstructionsSection called for:', recipe.title);
        
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
            return '<div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">No instructions available</div>';
        }
    }

    generateDesktopInstructionsSection(recipe) {
        console.log('🖥️ generateDesktopInstructionsSection called for:', recipe.title);
        
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
    }

    generateRecipeContentSection(recipe) {
        console.log('🔍 generateRecipeContentSection called for:', recipe.title);
        console.log('🔍 Recipe recipe_type:', recipe.recipe_type);
        console.log('🔍 Recipe object keys:', Object.keys(recipe));
        
        const isCombo = recipe.recipe_type === 'combo';
        console.log('🔍 Is combo:', isCombo);
        
        // CRITICAL DEBUG: Log what we're about to return
        if (isCombo) {
            console.log('🎯 COMBO PATH: About to generate combo content');
        } else {
            console.log('🎯 RECIPE PATH: About to generate recipe content');
        }
        
        if (isCombo) {
            // For combo recipes, show both recipes and additional items
            const recipes = recipe.combo_recipes || recipe.recipes || [];
            const additionalItems = recipe.items || [];
            const combinedItems = this.getCombinedItemsForCombo(recipe);
            
            console.log('🔍 Mobile view - Recipes:', recipes, 'Additional items:', additionalItems);
            console.log('🔍 Full recipe data for combo view:', recipe);
            
            const comboHTML = `
                <!-- Recipes in Combo -->
                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recipes (${recipes.length})</h3>
                    <div class="space-y-3">
                        ${recipes.length === 0 ? 
                            '<div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">No recipes added</div>' :
                            recipes.map(recipeRef => {
                                const foundRecipe = this.recipes.find(r => r.id === parseInt(recipeRef.recipe_id));
                                if (!foundRecipe) return '';
                                
                                const portions = recipeRef.servings_multiplier || 1;
                                const totalServings = portions * (foundRecipe.servings || 1);
                                
                                return `
                                    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" 
                                         onclick="window.recipeManager.showRecipeDetail(${foundRecipe.id})">
                                        <div class="flex justify-between items-start mb-2">
                                            <h4 class="font-medium text-gray-900 dark:text-white">${foundRecipe.title}</h4>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                                ${portions} portions • ${totalServings} servings
                                            </div>
                                        </div>
                                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${foundRecipe.description || ''}</p>
                                        <div class="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                                            ${foundRecipe.prep_time ? `<span>Prep: ${foundRecipe.prep_time}min</span>` : ''}
                                            ${foundRecipe.cook_time ? `<span>Cook: ${foundRecipe.cook_time}min</span>` : ''}
                                        </div>
                                    </div>
                                `;
                            }).join('')
                        }
                    </div>
                </div>

                <!-- Additional Items -->
                ${additionalItems.length > 0 ? `
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Additional Items (${additionalItems.length})</h3>
                        <div class="space-y-2">
                            ${additionalItems.map(ing => {
                                const item = window.itemsManager.items.find(i => i.id === (ing.ingredient_id || ing.item_id));
                                return `
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-gray-900 dark:text-white">${item ? item.name : 'Unknown Item'}</span>
                                        <span class="text-gray-600 dark:text-gray-400">${ing.quantity} ${ing.unit || ''}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Combined Items Summary -->
                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">All Items (${combinedItems.size})</h3>
                    <div class="space-y-2">
                        ${Array.from(combinedItems.entries()).map(([itemId, totalQuantity]) => {
                            const item = window.itemsManager.items.find(i => i.id === parseInt(itemId));
                            return `
                                <div class="flex justify-between items-center py-1">
                                    <span class="text-gray-900 dark:text-white">${item ? item.name : 'Unknown Item'}</span>
                                    <span class="text-gray-600 dark:text-gray-400">${totalQuantity}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            console.log('🎯 COMBO HTML GENERATED, length:', comboHTML.length);
            console.log('🎯 COMBO HTML preview:', comboHTML.substring(0, 200) + '...');
            return comboHTML;
        } else {
            // For regular recipes, show items
            const items = recipe.items || [];
            return `
                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Items (${items.length})</h3>
                    <div class="space-y-2">
                        ${items.map(ing => {
                            const item = window.itemsManager.items.find(i => i.id === (ing.ingredient_id || ing.item_id));
                            return `
                                <div class="flex justify-between items-center py-1">
                                    <span class="text-gray-900 dark:text-white">${item ? item.name : 'Unknown Item'}</span>
                                    <span class="text-gray-600 dark:text-gray-400">${ing.quantity} ${ing.unit || ''}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
    }

    generateMobileRecipeHTML(recipe) {
        console.log('📱 Generating mobile recipe HTML for:', recipe.title);
        console.log('📱 Recipe recipe_type:', recipe.recipe_type);
        console.log('📱 Is combo check:', recipe.recipe_type === 'combo');
        
        // Route to appropriate generator
        if (recipe.recipe_type === 'combo') {
            console.log('📱 Using combo-specific generator');
            return this.generateMobileComboHTML(recipe);
        } else {
            console.log('📱 Using recipe-specific generator');
            return this.generateMobileRegularRecipeHTML(recipe);
        }
    }

    generateMobileComboHTML(recipe) {
        console.log('🎯 Generating COMBO mobile HTML for:', recipe.title);
        
        const recipes = recipe.combo_recipes || recipe.recipes || [];
        const additionalItems = recipe.items || [];
        const combinedItems = this.getCombinedItemsForCombo(recipe);
        const labels = recipe.labels || [];
        
        console.log('🎯 Combo recipes:', recipes.length);
        console.log('🎯 Additional items:', additionalItems.length);
        console.log('🎯 Combined items:', combinedItems.length);
        console.log('🎯 Combined items sample:', combinedItems.slice(0, 2));
        
        return `
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
                            <button id="mobile-recipe-schedule" class="bg-green-500 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1" title="Add to planning queue">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
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
                        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                            <div class="text-green-600 dark:text-green-400 text-sm font-medium mb-1">Serves</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${recipe.servings || 4}</div>
                        </div>
                        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                            <div class="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">Total Items</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${combinedItems.length}</div>
                        </div>
                    </div>

                    <!-- Recipes in Combo -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recipes (${recipes.length})</h3>
                        <div class="space-y-3">
                            ${recipes.map(recipeRef => {
                                const foundRecipe = this.recipes.find(r => r.id === parseInt(recipeRef.recipe_id));
                                if (!foundRecipe) return '';
                                
                                const portions = recipeRef.servings_multiplier || 1;
                                const totalServings = portions * (foundRecipe.servings || 1);
                                
                                return `
                                    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" 
                                         onclick="window.recipeManager.showRecipeDetail(${foundRecipe.id})">
                                        <div class="flex justify-between items-start mb-2">
                                            <h4 class="font-medium text-gray-900 dark:text-white">${foundRecipe.title}</h4>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                                ${portions} portions • ${totalServings} servings
                                            </div>
                                        </div>
                                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${foundRecipe.description || ''}</p>
                                        <div class="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                                            ${foundRecipe.prep_time ? `<span>Prep: ${foundRecipe.prep_time}min</span>` : ''}
                                            ${foundRecipe.cook_time ? `<span>Cook: ${foundRecipe.cook_time}min</span>` : ''}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Additional Items -->
                    ${additionalItems.length > 0 ? `
                        <div class="mb-4">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Additional Items (${additionalItems.length})</h3>
                            <div class="space-y-2">
                                ${additionalItems.map(ing => {
                                    const item = window.itemsManager.items.find(i => i.id === (ing.ingredient_id || ing.item_id));
                                    return `
                                        <div class="flex justify-between items-center py-1">
                                            <span class="text-gray-900 dark:text-white">${item ? item.name : 'Unknown Item'}</span>
                                            <span class="text-gray-600 dark:text-gray-400">${ing.quantity} ${ing.unit || ''}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Combined Items Summary -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">All Items (${combinedItems.length})</h3>
                        <div class="space-y-2">
                            ${combinedItems.map(item => {
                                return `
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-gray-900 dark:text-white">${item.name}</span>
                                        <span class="text-gray-600 dark:text-gray-400">${item.quantity} ${item.unit}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Labels -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Labels</h3>
                        <div class="flex flex-wrap gap-1">
                            ${labels.length > 0 ? 
                                this.renderLabelChips(labels) :
                                '<span class="text-xs text-gray-500 dark:text-gray-400">No labels</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        console.log('🎯 Generated COMBO HTML length:', html.length);
        console.log('🎯 COMBO HTML includes "Recipes (":', html.includes('Recipes ('));
        console.log('🎯 COMBO HTML includes "Additional Items":', html.includes('Additional Items'));
        console.log('🎯 COMBO HTML includes "All Items":', html.includes('All Items'));
        return html;
    }

    generateMobileRegularRecipeHTML(recipe) {
        console.log('📖 Generating REGULAR recipe mobile HTML for:', recipe.title);
        const labels = recipe.labels || recipe.tags || [];
        
        // For regular recipes, keep it simple - no complex content generation
        // MIGRATION: Support both 'items' (new) and 'ingredients' (legacy) during transition
        const items = recipe.items || recipe.ingredients || [];
        const itemCount = items.length;
        console.log('📖 Regular recipe items:', itemCount);
        
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
                            <button id="mobile-recipe-schedule" class="bg-green-500 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1" title="Add to planning queue">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
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
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${recipe.servings || 4}</div>
                        </div>
                        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                            <div class="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">Items</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">${itemCount}</div>
                        </div>
                    </div>

                    <!-- Items -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Items (${items.length})</h3>
                        <div class="space-y-2">
                            ${items.length === 0 ? 
                                '<div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">No items added</div>' :
                                items.map(ing => {
                                    const item = window.itemsManager?.items?.find(i => i.id === (ing.ingredient_id || ing.item_id));
                                    return `
                                        <div class="flex justify-between items-center py-1">
                                            <span class="text-gray-900 dark:text-white">${item ? item.name : 'Unknown Item'}</span>
                                            <span class="text-gray-600 dark:text-gray-400">${ing.quantity} ${ing.unit || ''}</span>
                                        </div>
                                    `;
                                }).join('')
                            }
                        </div>
                    </div>

                    <!-- Instructions -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Instructions</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 space-y-3">
                            ${recipe.instructions && recipe.instructions.length > 0 ? 
                                (Array.isArray(recipe.instructions) ? 
                                    recipe.instructions.map((step, index) => `
                                        <div class="flex gap-2">
                                            <span class="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${index + 1}</span>
                                            <span class="text-xs text-gray-900 dark:text-white leading-relaxed">${step}</span>
                                        </div>
                                    `).join('') :
                                    (typeof recipe.instructions === 'string' ? 
                                        recipe.instructions.split(',').map((step, index) => `
                                            <div class="flex gap-2">
                                                <span class="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${index + 1}</span>
                                                <span class="text-xs text-gray-900 dark:text-white leading-relaxed">${step.trim()}</span>
                                            </div>
                                        `).join('') :
                                        '<div class="text-xs text-gray-500 dark:text-gray-400">No instructions available</div>'
                                    )
                                ) :
                                '<div class="text-xs text-gray-500 dark:text-gray-400">No instructions available</div>'
                            }
                        </div>
                    </div>

                    <!-- Labels -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Labels</h3>
                        <div class="flex flex-wrap gap-1">
                            ${labels.length > 0 ? 
                                this.renderLabelChips(labels) :
                                '<span class="text-xs text-gray-500 dark:text-gray-400">No labels</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        console.log('📖 Generated REGULAR recipe HTML length:', html.length);
        console.log('📖 REGULAR recipe includes items:', html.includes('Items ('));
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

        // Format labels/tags and calculate item count
        const labels = recipe.labels || recipe.tags || [];
        // MIGRATION: Support both 'items' (new) and 'ingredients' (legacy) during transition
        const items = recipe.items || recipe.ingredients || [];
        const itemCount = items.length;

        // Generate content sections
        let contentSection = '';
        let instructionsSection = '';

        // Generate items/ingredients section
        if (recipe.recipe_type === 'combo') {
            // For combos, show both recipes and additional items
            const recipes = recipe.combo_recipes || recipe.recipes || [];
            const additionalItems = recipe.items || [];
            
            contentSection = `
                <!-- Combo Recipes -->
                ${recipes.length > 0 ? `
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recipes (${recipes.length})</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 space-y-2">
                            ${recipes.map(r => {
                                // Look up the actual recipe by ID to get the title
                                const foundRecipe = this.recipes.find(recipe => recipe.id === r.recipe_id);
                                const recipeName = foundRecipe ? foundRecipe.title : `Recipe ID ${r.recipe_id}`;
                                return `
                                    <div class="flex justify-between items-center text-xs">
                                        <span class="text-gray-700 dark:text-gray-300">${recipeName}</span>
                                        <span class="text-gray-500 dark:text-gray-400">${r.servings || 1} servings</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Additional Items -->
                ${additionalItems.length > 0 ? `
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Additional Items (${additionalItems.length})</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 space-y-2">
                            ${additionalItems.map(item => {
                                // Look up the actual item by ID to get the name
                                const foundItem = this.items.find(itemData => itemData.id === (item.item_id || item.ingredient_id));
                                const itemName = foundItem ? foundItem.name : `Item ID ${item.item_id || item.ingredient_id}`;
                                return `
                                    <div class="flex justify-between items-center text-xs">
                                        <span class="text-gray-700 dark:text-gray-300">${itemName}</span>
                                        <span class="text-gray-500 dark:text-gray-400">${item.quantity} ${item.unit}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            `;
        } else {
            // For regular recipes, show items
            contentSection = `
                <!-- Items -->
                ${items.length > 0 ? `
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Items (${items.length})</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 space-y-2">
                            ${items.map(item => {
                                // Look up the actual item by ID to get the name
                                const foundItem = this.items.find(itemData => itemData.id === (item.item_id || item.ingredient_id));
                                const itemName = foundItem ? foundItem.name : `Item ID ${item.item_id || item.ingredient_id}`;
                                return `
                                    <div class="flex justify-between items-center text-xs">
                                        <span class="text-gray-700 dark:text-gray-300">${itemName}</span>
                                        <span class="text-gray-500 dark:text-gray-400">${item.quantity} ${item.unit}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            `;
        }

        // Generate instructions section
        const instructions = recipe.instructions || [];
        if (instructions.length > 0) {
            instructionsSection = instructions.map((instruction, index) => `
                <div class="flex items-start space-x-2 text-xs">
                    <span class="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">${index + 1}</span>
                    <span class="text-gray-700 dark:text-gray-300 leading-relaxed">${instruction}</span>
                </div>
            `).join('');
        } else {
            instructionsSection = '<span class="text-xs text-gray-500 dark:text-gray-400">No instructions available</span>';
        }

        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-4xl h-[90vh] sm:max-h-[90vh] flex flex-col mx-1 sm:mx-4 md:mx-0">
                <!-- Header -->
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white pr-2">${recipe.title}</h2>
                        <div class="flex items-center justify-end space-x-2 sm:space-x-3 flex-shrink-0">
                            <button id="close-recipe-detail" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                            <button id="edit-recipe-detail" class="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors text-sm sm:text-base">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                                <span class="hidden sm:inline">Edit</span>
                        </button>
                            <button id="schedule-recipe-detail" class="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors text-sm sm:text-base" title="Add to planning queue">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span class="hidden sm:inline">Schedule</span>
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
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">${itemCount}</span>
                        </div>
                    </div>

                    ${contentSection}

                    <!-- Instructions -->
                    <div class="mb-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Instructions</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 space-y-3">
                            ${instructionsSection}
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
        const scheduleBtn = modal.querySelector('#schedule-recipe-detail');
        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        editBtn.addEventListener('click', () => {
            closeModal();
            
            // Check if this is a combo recipe - use reliable recipe_type field
            const isCombo = recipe.recipe_type === 'combo';
            
            console.log('🖥️ Desktop editing recipe:', recipe.title, 'isCombo:', isCombo);
            this.showRecipeForm(recipe, isCombo);
        });

        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', () => {
                console.log('🖥️ Desktop schedule button clicked');
                this.scheduleRecipe(recipe.id);
            });
        }
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
            // Check if this is a combo recipe - use reliable recipe_type field
            const isCombo = recipe.recipe_type === 'combo';
            
            console.log('🔧 Editing recipe:', recipe.title, 'isCombo:', isCombo);
            this.showRecipeForm(recipe, isCombo);
        }
    }

    showFullPageRecipeForm(recipe = null, isCombo = false) {
        console.log('📄 Opening full-page recipe form...', recipe ? 'Edit mode' : 'Add mode', isCombo ? '(Combo)' : '(Regular)');
        
        // Store current state for back navigation
        this.previousView = {
            container: this.container.innerHTML,
            scrollPosition: window.scrollY
        };
        
        // Replace entire container with full-page recipe form
        this.container.innerHTML = this.generateFullPageRecipeFormHTML(recipe, isCombo);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Attach event listeners
        this.attachFullPageFormListeners(recipe, isCombo);
    }

    generateFullPageRecipeFormHTML(recipe = null, isCombo = false) {
        const isEdit = recipe !== null;
        const recipeType = isCombo ? 'Combo' : 'Recipe';
        
        return `
            <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
                <!-- Header -->
                <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div class="max-w-4xl mx-auto px-4 py-4">
                        <!-- Title Row -->
                        <div class="flex items-center space-x-3 mb-4">
                            <button id="back-to-recipes" class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
                                ${isEdit ? `Edit ${recipeType}` : `Add New ${recipeType}`}
                            </h1>
                        </div>
                        
                        <!-- Action Buttons Row -->
                        <div class="flex items-center justify-end space-x-3">
                            <button type="button" id="cancel-fullpage-form" class="bg-gray-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors font-medium min-w-[80px] flex items-center justify-center">
                                Cancel
                            </button>
                            <button type="submit" form="fullpage-recipe-form" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium min-w-[80px] flex items-center justify-center">
                                ${isEdit ? 'Update' : `Save ${recipeType}`}
                            </button>
                            ${isEdit ? `
                                <button type="button" id="delete-fullpage-form" class="bg-red-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors font-medium min-w-[80px] flex items-center justify-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    <span>Delete</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Form Content -->
                <div class="max-w-4xl mx-auto px-4 py-6">
                    <form id="fullpage-recipe-form" class="space-y-6">
                        <!-- Hidden field for recipe type -->
                        <input type="hidden" name="recipe_type" value="${isCombo ? 'combo' : 'regular'}">
                        
                        <!-- Title -->
                        <div>
                            <label for="recipe-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${isCombo ? 'Recipe Combo Title' : 'Recipe Title'}</label>
                            <input type="text" id="recipe-title" name="title" required
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   placeholder="${isCombo ? 'Enter combo title...' : 'Enter recipe title...'}"
                                   value="${isEdit ? recipe.title || '' : ''}">
                        </div>

                        <!-- Description -->
                        <div>
                            <label for="recipe-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea id="recipe-description" name="description" rows="3"
                                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                      placeholder="Brief description of the recipe...">${isEdit ? recipe.description || '' : ''}</textarea>
                        </div>

                        <!-- Recipe Details -->
                        ${!isCombo ? `
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label for="recipe-servings" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Servings</label>
                                <input type="number" id="recipe-servings" name="servings" min="1" max="20"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                       value="${isEdit ? recipe.servings || recipe.serving_count || '4' : '4'}"
                                       placeholder="4">
                            </div>
                            <div>
                                <label for="recipe-prep-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prep Time (minutes)</label>
                                <input type="number" id="recipe-prep-time" name="prep_time" min="0" max="480"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                       value="${isEdit ? recipe.prep_time || '15' : '15'}"
                                       placeholder="15">
                            </div>
                            <div>
                                <label for="recipe-cook-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cook Time (minutes)</label>
                                <input type="number" id="recipe-cook-time" name="cook_time" min="0" max="480"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                       value="${isEdit ? recipe.cook_time || '30' : '30'}"
                                       placeholder="30">
                            </div>
                        </div>
                        ` : `
                        <!-- Servings only for combo recipes -->
                        <div>
                            <label for="recipe-servings" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Servings</label>
                            <input type="number" id="recipe-servings" name="servings" min="1" max="20"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white md:w-1/3"
                                   value="${isEdit ? recipe.servings || recipe.serving_count || '4' : '4'}"
                                   placeholder="4">
                        </div>
                        `}

                        ${isCombo ? `
                        <!-- Recipes Section for Combo -->
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Recipes</h3>
                            
                            <div id="recipes-container" class="space-y-3 mb-4">
                                ${this.renderRecipeRows(isEdit ? (recipe.combo_recipes || recipe.recipes) : [])}
                            </div>
                            
                            <!-- Recipe Details Section -->
                            <div id="recipe-details-container" class="mb-4">
                                ${this.renderRecipeDetails(isEdit ? (recipe.combo_recipes || recipe.recipes) : [])}
                            </div>
                            
                            <!-- Recipe Action buttons -->
                            <div class="flex gap-3 mb-6">
                                <button type="button" id="add-recipe-row" class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors">
                                    <span>Add Recipe</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Items Section for Combo -->
                        <!-- COMBO ADDITIONAL ITEMS: Optional items beyond the recipes in the combo
                             Examples: bag of chips, ice cream scoop, napkins, beverages, sides
                             These are completely optional - combos work with just recipes -->
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Items</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Add individual items that don't have their own recipe (e.g., watermelon, bread, etc.)</p>
                            
                            <div id="items-container" class="space-y-3 mb-4">
                                ${this.renderItemRows(isEdit ? recipe.items || recipe.ingredients : [], true)}
                            </div>
                            
                            <!-- Item Action buttons -->
                            <div class="flex gap-3">
                                <button type="button" id="add-item-row" class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors">
                                    <span>Add</span>
                                    <span>🥕</span>
                                </button>
                                <button type="button" id="create-new-item" class="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors">
                                    <span>Create</span>
                                    <span>🥕</span>
                                </button>
                            </div>
                        </div>
                        ` : `
                        <!-- Items Section for Regular Recipe -->
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Items</h3>
                            
                            <div id="items-container" class="space-y-3 mb-4">
                                ${this.renderItemRows(isEdit ? recipe.items || recipe.ingredients : [], false)}
                            </div>
                            
                            <!-- Action buttons below the list -->
                            <div class="flex gap-3">
                                <button type="button" id="add-item-row" class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors">
                                    <span>Add</span>
                                    <span>🥕</span>
                                </button>
                                <button type="button" id="create-new-item" class="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors">
                                    <span>Create</span>
                                    <span>🥕</span>
                                </button>
                            </div>
                        </div>
                        `}

                        ${!isCombo ? `
                        <!-- Instructions -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instructions</label>
                            <div id="instructions-container" class="space-y-3">
                                ${this.renderInstructionSteps(isEdit ? recipe.instructions : null)}
                            </div>
                            <button type="button" id="add-instruction-step" class="mt-3 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                + Add Another Step
                            </button>
                        </div>
                        ` : ''}

                        <!-- Labels Section -->
                        <div>
                            <label for="fullpage-recipe-labels" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Labels</label>
                            <div class="relative">
                                <div id="fullpage-recipe-labels-container" class="w-full min-h-[42px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-text flex flex-wrap gap-1 items-center">
                                    ${isEdit && recipe.labels ? recipe.labels.map(label => {
                                        // Extract label name properly
                                        const labelName = typeof label === 'string' ? label : (label.name || String(label));
                                        const displayProps = this.getLabelDisplayProperties(labelName);
                                        
                                        return `
                                        <span class="inline-flex items-center px-1.5 py-0.5 text-xs font-bold ${displayProps.colors}" ${displayProps.inlineStyle ? `style="${displayProps.inlineStyle}"` : ''}>
                                            ${displayProps.icon}${labelName}
                                            <button type="button" class="ml-1 ${displayProps.buttonColors}" onclick="window.recipeManager.removeFormLabel('${labelName}'); window.recipeManager.updateFullPageLabelsDisplay();">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </span>
                                        `;
                                    }).join('') : ''}
                                    <input 
                                        type="text" 
                                        id="fullpage-recipe-labels-input" 
                                        class="flex-1 min-w-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400" 
                                        placeholder="${isEdit && recipe.labels && recipe.labels.length > 0 ? 'Type to search and add existing labels...' : 'Type to search existing labels...'}"
                                        autocomplete="off"
                                    />
                                </div>
                                <div id="fullpage-recipe-labels-dropdown" class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg hidden max-h-32 overflow-y-auto">
                                    <!-- Dropdown options will be populated by JavaScript -->
                                </div>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-lg">
                                ${isEdit ? (isCombo ? 'Update Combo' : 'Update Recipe') : (isCombo ? 'Save Combo' : 'Save Recipe')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    attachSharedFormListeners(recipe, config) {
        const form = document.querySelector(config.form);
        const backBtn = document.querySelector(config.backBtn);
        const cancelBtn = document.querySelector(config.cancelBtn);
        const closeBtn = config.closeBtn ? document.querySelector(config.closeBtn) : null;

        if (!form) {
            console.warn('Form not found:', config.form);
            return;
        }

        // Track form changes
        let hasUnsavedChanges = false;
        const originalFormData = new FormData(form);
        
        // Monitor form changes
        const trackChanges = () => {
            const currentFormData = new FormData(form);
            hasUnsavedChanges = false;
            
            // Compare form data
            for (let [key, value] of currentFormData.entries()) {
                if (originalFormData.get(key) !== value) {
                    hasUnsavedChanges = true;
                    break;
                }
            }
            
            // Also check if original had fields that current doesn't
            if (!hasUnsavedChanges) {
                for (let [key, value] of originalFormData.entries()) {
                    if (currentFormData.get(key) !== value) {
                        hasUnsavedChanges = true;
                        break;
                    }
                }
            }
        };

        // Attach change listeners to form inputs
        form.addEventListener('input', trackChanges);
        form.addEventListener('change', trackChanges);

        // Close/Cancel handlers with confirmation
        const handleClose = () => {
            console.log('🚪 handleClose called, hasUnsavedChanges:', hasUnsavedChanges);
            
            if (hasUnsavedChanges) {
                const confirmed = confirm('You have unsaved changes. Are you sure you want to cancel?');
                console.log('🚪 User confirmed close:', confirmed);
                if (!confirmed) {
                    return; // Don't close if user cancels
                }
            }
            
            console.log('🚪 Proceeding to close, isFullPage:', config.isFullPage);
            console.log('🚪 previousView available:', !!this.previousView);
            
            if (config.isFullPage) {
                // Full-page form: handle mobile vs desktop
                if (this.editingFromMobileView && this.editingRecipe) {
                    console.log('📱 Returning to mobile recipe view after full-page cancel');
                    
                    // First restore the recipe list view, then show mobile recipe
                    this.render(); // Restore recipe list
                    
                    // Small delay to ensure render is complete, then show mobile recipe
                    setTimeout(() => {
                        this.isShowingMobileRecipe = false; // Reset flag
                        this.showMobileRecipePage(this.editingRecipe);
                        this.editingFromMobileView = false;
                        this.editingRecipe = null;
                    }, 50);
                } else {
                    // Normal full-page form: restore previous view
                    if (this.previousView) {
                        console.log('🚪 Restoring previous view');
                        this.container.innerHTML = this.previousView.container;
                        window.scrollTo(0, this.previousView.scrollPosition || 0);
                        
                        // Re-attach main recipe list listeners and re-render to ensure everything is properly initialized
                        setTimeout(() => {
                            this.attachEventListeners();
                            this.render(); // This will ensure all buttons and event listeners are properly set up
                        }, 0);
                        
                        console.log('🚪 Previous view restored successfully');
                    } else {
                        console.error('🚪 No previous view to restore!');
                    }
                }
            } else {
                // Modal form: handle mobile vs desktop
                if (this.editingFromMobileView && this.editingRecipe) {
                    console.log('Returning to mobile recipe view after cancel');
                    const modal = form.closest('.fixed');
                    modal?.remove();
                    
                    // First restore the recipe list view, then show mobile recipe
                    this.render(); // Restore recipe list
                    
                    // Small delay to ensure render is complete, then show mobile recipe
                    setTimeout(() => {
                        this.isShowingMobileRecipe = false; // Reset flag
                        this.showMobileRecipePage(this.editingRecipe);
                        this.editingFromMobileView = false;
                        this.editingRecipe = null;
                    }, 50);
                } else {
                    // Normal desktop modal close
                    const modal = form.closest('.fixed');
                    modal?.remove();
                }
            }
        };

        // Attach close handlers
        backBtn?.addEventListener('click', handleClose);
        cancelBtn?.addEventListener('click', handleClose);
        closeBtn?.addEventListener('click', handleClose);

        // Close on backdrop click for modals
        if (!config.isFullPage) {
            const modal = form.closest('.fixed');
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) handleClose();
            });
        }

        // Shared item listeners
        this.attachSharedItemListeners(config);

        // Instruction step listeners
        this.attachInstructionStepListeners();

        // Form label listeners
        if (config.isFullPage) {
            this.attachFullPageLabelListeners();
        } else {
            this.attachFormLabelListeners(form.closest('.fixed'));
        }

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (config.isFullPage) {
                this.handleFullPageFormSubmit(form, recipe);
            } else {
                this.handleRecipeFormSubmit(form, recipe);
            }
        });
    }

    attachSharedItemListeners(config) {
        const addItemBtn = document.querySelector('#add-item-row');
        const createItemBtn = document.querySelector('#create-new-item');
        const itemsContainer = document.querySelector('#items-container');
        const isCombo = config.isCombo || false; // Get isCombo from config

        console.log('Attaching shared item listeners:', { addItemBtn, createItemBtn, itemsContainer, isCombo });

        // Check if listeners are already attached to prevent duplicates
        if (addItemBtn && addItemBtn.dataset.listenersAttached === 'true') {
            console.log('Add item button listeners already attached, skipping');
            return;
        }

        // Add item row
        addItemBtn?.addEventListener('click', () => {
            console.log('Add item button clicked');
            const currentRows = itemsContainer.querySelectorAll('.item-row').length;
            const newRowHtml = this.renderSingleItemRow({ item_id: '', name: '', quantity: '', unit: '', notes: '' }, currentRows, true, isCombo);
            
            itemsContainer.insertAdjacentHTML('beforeend', newRowHtml);
            
            // Attach listeners to new row
            this.attachItemRowListeners(itemsContainer.lastElementChild);
        });

        // Mark as attached to prevent duplicates
        if (addItemBtn) {
            addItemBtn.dataset.listenersAttached = 'true';
        }

        // Check if create item button listeners are already attached
        if (createItemBtn && createItemBtn.dataset.listenersAttached === 'true') {
            console.log('Create item button listeners already attached, skipping');
            return;
        }

        // Create new item button
        createItemBtn?.addEventListener('click', () => {
            console.log('🥕 Create new item clicked');
            console.log('🥕 window.itemsManager available:', !!window.itemsManager);
            console.log('🥕 itemsContainer:', itemsContainer);
            
            // Open the items manager form with callback to add to recipe
            if (window.itemsManager && window.app) {
                // Store current form data before switching tabs
                const currentForm = document.querySelector('#fullpage-recipe-form');
                let savedFormData = null;
                if (currentForm) {
                    savedFormData = new FormData(currentForm);
                    console.log('🥕 Storing current form data before switching to items');
                }
                
                const onSaveCallback = (savedItem) => {
                    console.log('🥕 New item saved, determining return destination:', savedItem);
                    console.log('🥕 editingFromMobileView:', this.editingFromMobileView);
                    console.log('🥕 editingRecipe:', !!this.editingRecipe);
                    
                    // Switch back to recipes tab
                    window.app.switchTab('recipes');
                    
                    setTimeout(() => {
                        if (this.editingFromMobileView && this.editingRecipe) {
                            // Add item to the existing recipe and return to mobile view
                            console.log('🥕 Adding item to existing recipe and returning to mobile view');
                            
                            // Add item to the recipe data
                            if (!this.editingRecipe.items) {
                                this.editingRecipe.items = [];
                            }
                            this.editingRecipe.items.push({
                                item_id: savedItem.id,
                                quantity: 1,
                                unit: savedItem.default_unit || 'pieces'
                            });
                            
                            // Save the updated recipe
                            this.saveRecipes();
                            
                            // First restore the recipe list view, then show mobile recipe
                            console.log('🥕 Restoring recipe list before showing mobile recipe');
                            this.render(); // Restore recipe list
                            
                            // Small delay to ensure render is complete, then show mobile recipe
                            setTimeout(() => {
                                this.isShowingMobileRecipe = false; // Reset flag
                                this.showMobileRecipePage(this.editingRecipe);
                            }, 50);
                        } else {
                            // Re-open the recipe form and add the item (for new recipes)
                            console.log('🥕 Re-opening recipe form and adding item');
                            this.showRecipeForm(); // Re-open the form
                            setTimeout(() => {
                                // Restore form data if we had it
                                if (savedFormData) {
                                    this.restoreFormData(savedFormData);
                                }
                                
                                const newItemsContainer = document.querySelector('#items-container');
                                if (newItemsContainer) {
                                    this.addItemToRecipeForm(savedItem, newItemsContainer);
                                }
                            }, 100);
                        }
                    }, 100);
                };
                
                const onCancelCallback = () => {
                    console.log('🥕 Item creation cancelled, determining return destination');
                    console.log('🥕 editingFromMobileView:', this.editingFromMobileView);
                    console.log('🥕 editingRecipe:', !!this.editingRecipe);
                    
                    // Switch back to recipes tab
                    window.app.switchTab('recipes');
                    
                    setTimeout(() => {
                        if (this.editingFromMobileView && this.editingRecipe) {
                            // Return to mobile recipe view
                            console.log('🥕 Returning to mobile recipe view after cancel');
                            
                            // First restore the recipe list view, then show mobile recipe
                            this.render(); // Restore recipe list
                            
                            // Small delay to ensure render is complete, then show mobile recipe
                            setTimeout(() => {
                                this.isShowingMobileRecipe = false; // Reset flag
                                this.showMobileRecipePage(this.editingRecipe);
                            }, 50);
                        } else {
                            // Re-open the recipe form (for new recipes or desktop editing)
                            console.log('🥕 Re-opening recipe form');
                            this.showRecipeForm(); // Re-open the form
                            setTimeout(() => {
                                // Restore form data if we had it
                                if (savedFormData) {
                                    this.restoreFormData(savedFormData);
                                }
                            }, 100);
                        }
                    }, 100);
                };
                
                console.log('🥕 Switching to items tab and opening form');
                // Switch to items tab first
                window.app.switchTab('items');
                
                // Then show the form with both callbacks
                setTimeout(() => {
                    window.itemsManager.showItemForm(null, onSaveCallback, onCancelCallback);
                }, 100);
            } else {
                console.error('🥕 ItemsManager or App not available on window object');
                console.log('🥕 Available on window:', Object.keys(window).filter(k => k.includes('items') || k.includes('Items') || k.includes('app')));
            }
        });

        // Mark create item button as attached to prevent duplicates
        if (createItemBtn) {
            createItemBtn.dataset.listenersAttached = 'true';
        }

        // Attach listeners to existing item rows
        itemsContainer?.querySelectorAll('.item-row').forEach(row => {
            this.attachItemRowListeners(row);
        });
    }

    attachFullPageFormListeners(recipe, isCombo = false) {
        // Use shared form logic with full-page specific selectors
        this.attachSharedFormListeners(recipe, {
            form: '#fullpage-recipe-form',
            backBtn: '#back-to-recipes',
            cancelBtn: '#cancel-fullpage-form',
            isFullPage: true,
            isCombo: isCombo
        });

        // Add delete button listener for edit mode
        const deleteBtn = document.querySelector('#delete-fullpage-form');
        if (deleteBtn && recipe) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const recipeType = recipe.recipe_type === 'combo' ? 'combo recipe' : 'recipe';
                if (confirm(`Are you sure you want to delete "${recipe.title}"? This action cannot be undone.`)) {
                    this.deleteRecipe(recipe.id);
                    // Return to recipe list after deletion
                    this.returnFromFullPageForm();
                }
            });
        }

        // Attach combo-specific or item-specific listeners
        if (isCombo) {
            this.attachSharedRecipeListeners();
        } else {
            this.attachSharedItemListeners({
                addIngredientBtn: '#add-item-row',
                createIngredientBtn: '#create-new-ingredient',
                itemsContainer: '#items-container',
                isCombo: isCombo
            });
        }
    }

    attachSharedRecipeListeners() {
        const addRecipeBtn = document.querySelector('#add-recipe-row');
        const recipesContainer = document.querySelector('#recipes-container');

        console.log('Attaching shared recipe listeners:', { addRecipeBtn, recipesContainer });

        // Add recipe row
        addRecipeBtn?.addEventListener('click', () => {
            console.log('Add recipe button clicked');
            const currentRows = recipesContainer.querySelectorAll('.recipe-row').length;
            const newRowHtml = this.renderSingleRecipeRow({ recipe_id: '', servings: 1 }, currentRows, true);
            
            recipesContainer.insertAdjacentHTML('beforeend', newRowHtml);
            
            // Attach listeners to new row
            this.attachRecipeRowListeners(recipesContainer.lastElementChild);
            
            // Refresh details (will show placeholder for empty row)
            this.refreshRecipeDetails();
        });

        // Attach listeners to existing recipe rows
        recipesContainer?.querySelectorAll('.recipe-row').forEach(row => {
            this.attachRecipeRowListeners(row);
        });
    }

    renderSingleRecipeRow(recipe, index, showRemoveButton = false) {
        const selectedRecipe = this.recipes.find(r => r.id === parseInt(recipe.recipe_id));
        const recipeServings = selectedRecipe ? (selectedRecipe.servings || selectedRecipe.serving_count || 4) : 4;
        const portions = recipe.servings || 1;
        const totalServings = portions * recipeServings;

        return `
            <div class="recipe-row grid grid-cols-10 gap-2 items-end">
                <div class="col-span-6">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recipe
                    </label>
                    <select class="recipe-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="recipes[${index}][recipe_id]" ${index === 0 ? 'required' : ''}>
                        <option value="">Select recipe...</option>
                        ${this.recipes.filter(r => r.recipe_type !== 'combo').map(rec => `
                            <option value="${rec.id}" ${recipe.recipe_id == rec.id ? 'selected' : ''}>
                                ${rec.title}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-1">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Portions
                    </label>
                    <input type="number" step="1" min="1" 
                           class="recipe-servings w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="recipes[${index}][servings]" 
                           value="${portions}"
                           placeholder="1" ${index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Servings
                    </label>
                    <input type="text" 
                           class="calculated-servings w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                           value="${selectedRecipe ? totalServings : '—'}"
                           readonly
                           placeholder="—">
                </div>
                
                <div class="col-span-1">
                    ${showRemoveButton || index > 0 ? `
                        <button type="button" class="remove-recipe w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
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

    attachRecipeRowListeners(row) {
        // Remove recipe handler
        const removeBtn = row.querySelector('.remove-recipe');
        removeBtn?.addEventListener('click', () => {
            if (row.parentNode.children.length > 1) {
                row.remove();
                this.refreshRecipeDetails();
            }
        });

        // Recipe selection change handler
        const recipeSelect = row.querySelector('.recipe-select');
        const servingsInput = row.querySelector('.recipe-servings');
        const calculatedServingsInput = row.querySelector('.calculated-servings');
        
        const updateCalculatedServings = () => {
            const selectedRecipeId = recipeSelect?.value;
            const portions = parseInt(servingsInput?.value) || 1;
            
            if (selectedRecipeId && calculatedServingsInput) {
                const selectedRecipe = this.recipes.find(r => r.id === parseInt(selectedRecipeId));
                if (selectedRecipe) {
                    const recipeServings = selectedRecipe.servings || selectedRecipe.serving_count || 4;
                    const totalServings = portions * recipeServings;
                    calculatedServingsInput.value = totalServings;
                } else {
                    calculatedServingsInput.value = '—';
                }
            }
            
            this.refreshRecipeDetails();
        };
        
        recipeSelect?.addEventListener('change', updateCalculatedServings);
        servingsInput?.addEventListener('input', updateCalculatedServings);
    }

    refreshRecipeDetails() {
        const detailsContainer = document.querySelector('#recipe-details-container');
        const recipesContainer = document.querySelector('#recipes-container');
        
        if (!detailsContainer || !recipesContainer) return;

        // Collect current recipe data
        const currentRecipes = [];
        const recipeRows = recipesContainer.querySelectorAll('.recipe-row');
        
        recipeRows.forEach(row => {
            const recipeSelect = row.querySelector('.recipe-select');
            const servingsInput = row.querySelector('.recipe-servings');
            
            const recipeId = recipeSelect?.value;
            const servings = parseInt(servingsInput?.value) || 1;
            
            if (recipeId) {
                currentRecipes.push({
                    recipe_id: recipeId,
                    servings: servings
                });
            }
        });

        // Update the details section
        detailsContainer.innerHTML = this.renderRecipeDetails(currentRecipes);
    }

    restoreFormData(formData) {
        console.log('🥕 Restoring form data...');
        const form = document.querySelector('#fullpage-recipe-form');
        if (!form) {
            console.warn('🥕 Form not found for data restoration');
            return;
        }

        // Restore basic form fields
        for (let [key, value] of formData.entries()) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = value === 'on';
                } else {
                    input.value = value;
                }
            }
        }

        // Restore items - this is more complex as we need to rebuild the item rows
        const itemsContainer = form.querySelector('#items-container');
        if (itemsContainer) {
            // Extract item data from FormData
            const itemData = [];
            let index = 0;
            while (formData.has(`items[${index}][item_id]`)) {
                const item = {
                    item_id: formData.get(`items[${index}][item_id]`),
                    ingredient_id: formData.get(`items[${index}][item_id]`), // Backward compatibility
                    quantity: formData.get(`items[${index}][quantity]`),
                    unit: formData.get(`items[${index}][unit]`)
                };
                if (item.item_id) { // Only add if item is selected
                    itemData.push(item);
                }
                index++;
            }

            // Rebuild item rows
            if (itemData.length > 0) {
                console.log('🥕 Restoring', itemData.length, 'items');
                // Check if this is a combo form by looking for recipe rows
                const isCombo = form.querySelector('.recipe-row') !== null;
                itemsContainer.innerHTML = this.renderItemRows(itemData, isCombo);
                
                // Reattach listeners to item rows
                itemsContainer.querySelectorAll('.item-row').forEach(row => {
                    this.attachItemRowListeners(row);
                });
            }
        }

        console.log('🥕 Form data restoration complete');
    }

    addItemToRecipeForm(savedItem, itemsContainer) {
        console.log('🥕 Adding item to recipe form:', savedItem);
        
        // Add the new item to the items list (for the select dropdown)
        if (!this.items.find(item => item.id === savedItem.id)) {
            this.items.push(savedItem);
            
            // Refresh all item dropdowns in the form to include the new item
            this.refreshItemDropdowns(itemsContainer);
        }
        
        // Check if there's an empty row we can use instead of adding a new one
        const existingRows = itemsContainer.querySelectorAll('.item-row');
        let targetRow = null;
        
        // Look for an empty row (no item selected)
        for (const row of existingRows) {
            const select = row.querySelector('.item-select');
            if (select && (!select.value || select.value === '')) {
                targetRow = row;
                console.log('🥕 Found empty row to populate');
                break;
            }
        }
        
        // If no empty row found, create a new one
        if (!targetRow) {
            console.log('🥕 Creating new item row');
            const currentRows = existingRows.length;
            const newItemRow = {
                item_id: savedItem.id,
                name: savedItem.name,
                quantity: '1',
                unit: savedItem.default_unit || 'pieces',
                notes: ''
            };
            
            const newRowHtml = this.renderSingleItemRow(newItemRow, currentRows, true, false); // false = not a combo
            itemsContainer.insertAdjacentHTML('beforeend', newRowHtml);
            targetRow = itemsContainer.lastElementChild;
            this.attachItemRowListeners(targetRow);
        } else {
            // Populate the existing empty row
            console.log('🥕 Populating existing empty row');
            const select = targetRow.querySelector('.item-select');
            const quantityInput = targetRow.querySelector('.item-quantity');
            const unitSelect = targetRow.querySelector('.unit-select');
            
            if (select) select.value = savedItem.id;
            if (quantityInput) quantityInput.value = '1';
            if (unitSelect) unitSelect.value = savedItem.default_unit || 'pieces';
        }
        
        // Scroll to the Items section
        setTimeout(() => {
            // Find the Items heading
            const headings = document.querySelectorAll('h3');
            let itemsSection = null;
            for (const heading of headings) {
                if (heading.textContent.includes('Items')) {
                    itemsSection = heading;
                    break;
                }
            }
            
            // Fallback to the items container
            if (!itemsSection) {
                itemsSection = itemsContainer.closest('div');
            }
            
            if (itemsSection) {
                console.log('🥕 Scrolling to Items section');
                itemsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Focus on the quantity input for easy editing
            const quantityInput = targetRow.querySelector('.item-quantity');
            if (quantityInput) {
                setTimeout(() => {
                    quantityInput.focus();
                    quantityInput.select();
                }, 300); // Wait for scroll to complete
            }
        }, 100);
    }

    refreshAllItemDropdowns() {
        console.log('🥕 Refreshing all item dropdowns with updated items list');
        
        // Find all item select dropdowns on the page
        const itemSelects = document.querySelectorAll('.item-select');
        
        itemSelects.forEach(select => {
            // Store the current selection
            const currentValue = select.value;
            
            // Clear existing options
            select.innerHTML = '';
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select item...';
            select.appendChild(defaultOption);
            
            // Add all items as options
            this.items.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.setAttribute('data-unit', item.default_unit);
                option.textContent = item.name;
                
                // Restore selection if it matches
                if (item.id === currentValue) {
                    option.selected = true;
                }
                
                select.appendChild(option);
            });
            
            console.log(`🥕 Updated dropdown with ${this.items.length} items, current selection: ${currentValue}`);
        });
    }

    refreshItemDropdowns(itemsContainer) {
        console.log('🥕 Refreshing item dropdowns with updated items list');
        
        // Find all item select dropdowns in the container
        const itemSelects = itemsContainer.querySelectorAll('.item-select');
        
        itemSelects.forEach(select => {
            // Store the current selection
            const currentValue = select.value;
            
            // Clear existing options
            select.innerHTML = '';
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select item...';
            select.appendChild(defaultOption);
            
            // Add all items as options
            this.items.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.setAttribute('data-unit', item.default_unit);
                option.textContent = item.name;
                
                // Restore selection if it matches
                if (item.id === currentValue) {
                    option.selected = true;
                }
                
                select.appendChild(option);
            });
            
            console.log(`🥕 Updated dropdown with ${this.items.length} items, current selection: ${currentValue}`);
        });
    }

    attachFullPageLabelListeners() {
        const labelInput = document.querySelector('#fullpage-recipe-labels-input');
        const labelContainer = document.querySelector('#fullpage-recipe-labels-container');
        const labelDropdown = document.querySelector('#fullpage-recipe-labels-dropdown');

        if (!labelInput || !labelContainer || !labelDropdown) return;

        // Input event for typeahead
        labelInput.addEventListener('input', (e) => {
            this.formLabelSearchTerm = e.target.value;
            this.updateFullPageLabelDropdown();
        });

        // Focus events
        labelInput.addEventListener('focus', () => {
            labelDropdown.classList.remove('hidden');
            this.updateFullPageLabelDropdown();
        });

        // Click on container to focus input and show dropdown
        labelContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            labelInput.focus();
            labelDropdown.classList.remove('hidden');
            this.updateFullPageLabelDropdown();
        });

        // Keyboard navigation
        labelInput.addEventListener('keydown', (e) => {
            const dropdown = document.querySelector('#fullpage-recipe-labels-dropdown');
            const highlighted = dropdown.querySelector('.bg-gray-50, .dark\\:bg-gray-700');
            
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    if (highlighted) {
                        const label = highlighted.getAttribute('data-label');
                        if (label) {
                            this.addFormLabel(label);
                            this.updateFullPageLabelsDisplay();
                            labelInput.focus();
                        }
                    }
                    break;
                    
                case 'Escape':
                    labelDropdown.classList.add('hidden');
                    labelInput.blur();
                    break;
            }
        });
    }

    updateFullPageLabelDropdown() {
        const dropdown = document.querySelector('#fullpage-recipe-labels-dropdown');
        if (!dropdown) return;

        const availableLabels = this.getAllLabels().filter(label => 
            !this.formSelectedLabels.includes(label) &&
            (!this.formLabelSearchTerm || (label.name || label).toLowerCase().includes(this.formLabelSearchTerm.toLowerCase()))
        );

        if (availableLabels.length === 0 || !this.formLabelSearchTerm) {
            dropdown.classList.add('hidden');
            return;
        }

        dropdown.classList.remove('hidden');
        dropdown.innerHTML = availableLabels.slice(0, 10).map((label, index) => {
            const displayProps = this.getLabelDisplayProperties(label);
            
            return `
            <div class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-gray-100 ${index === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}" 
                 data-label="${label}" 
                 onclick="window.recipeManager.addFormLabel('${label}'); window.recipeManager.updateFullPageLabelsDisplay();">
                <div class="flex items-center space-x-2">
                    ${displayProps.icon && displayProps.labelType !== 'default' ? `<span class="flex-shrink-0">${displayProps.icon}</span>` : ''}
                    <span class="font-bold flex-1">${label}</span>
                    <span class="inline-flex items-center px-2 py-1 ${displayProps.colors} rounded-full text-xs flex-shrink-0" ${displayProps.inlineStyle ? `style="${displayProps.inlineStyle}"` : ''}>
                        ${displayProps.labelType !== 'default' ? this.getShortLabelTypeName(displayProps.labelType) : 'label'}
                    </span>
                </div>
            </div>
            `;
        }).join('');
    }

    updateFullPageLabelsDisplay() {
        const container = document.querySelector('#fullpage-recipe-labels-container');
        const input = document.querySelector('#fullpage-recipe-labels-input');
        
        if (!container || !input) return;

        // Clear existing chips (keep the input)
        const existingChips = container.querySelectorAll('span');
        existingChips.forEach(chip => chip.remove());

        // Add chips for selected labels
        this.formSelectedLabels.forEach(label => {
            const displayProps = this.getLabelDisplayProperties(label);
            
            const chip = document.createElement('span');
            chip.className = `inline-flex items-center px-1.5 py-0.5 text-xs font-bold ${displayProps.colors}`;
            if (displayProps.inlineStyle) {
                chip.style.cssText = displayProps.inlineStyle;
            }
            chip.innerHTML = `
                ${displayProps.icon}${label}
                <button type="button" class="ml-1 ${displayProps.buttonColors}" onclick="window.recipeManager.removeFormLabel('${label}'); window.recipeManager.updateFullPageLabelsDisplay();">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            `;
            
            // Insert before the input
            container.insertBefore(chip, input);
        });

        // Update placeholder
        input.placeholder = this.formSelectedLabels.length > 0 ? 'Type to add more...' : 'Type to search labels...';
    }

    async handleFullPageFormSubmit(form, existingRecipe) {
        try {
            const formData = new FormData(form);
            // Collect instruction steps
            const instructionSteps = [];
            const instructionTextareas = form.querySelectorAll('textarea[name^="instructions["]');
            instructionTextareas.forEach(textarea => {
                const step = textarea.value.trim();
                if (step) {
                    instructionSteps.push(step);
                }
            });

            const recipeType = formData.get('recipe_type') || 'regular';
            const isCombo = recipeType === 'combo';

            // Handle labels - only use properly selected labels from dropdown
            // NO FREEFORM TEXT INPUT ALLOWED - labels must be created through proper management interface
            let labels = this.formSelectedLabels || [];
            
            // Validate that all labels exist in the system
            const allAvailableLabels = this.getAllLabels();
            const invalidLabels = labels.filter(label => !allAvailableLabels.includes(label));
            
            if (invalidLabels.length > 0) {
                console.warn('⚠️ Invalid labels detected:', invalidLabels);
                // Remove invalid labels to prevent data corruption
                labels = labels.filter(label => allAvailableLabels.includes(label));
            }

            const recipeData = {
                title: formData.get('title').trim(),
                description: formData.get('description').trim(),
                servings: parseInt(formData.get('servings')) || 4,
                prep_time: parseInt(formData.get('prep_time')) || 0,
                cook_time: parseInt(formData.get('cook_time')) || 0,
                instructions: instructionSteps,
                labels: labels,
                recipe_type: recipeType
            };

            if (isCombo) {
                // Collect recipes for combo
                const recipes = [];
                const recipeRows = form.querySelectorAll('.recipe-row');
                console.log('🍳 Found', recipeRows.length, 'recipe rows to process');
                
                recipeRows.forEach((row, index) => {
                    const recipeSelect = row.querySelector('.recipe-select');
                    const servingsInput = row.querySelector('.recipe-servings');
                    
                    const recipeId = recipeSelect?.value;
                    const servings = parseInt(servingsInput?.value) || 1;
                    
                    console.log('🍳 Processing recipe row:', { recipeId, servings });
                    
                    if (recipeId) {
                        recipes.push({
                            recipe_id: parseInt(recipeId),
                            servings_multiplier: servings
                        });
                    }
                });

                recipeData.combo_recipes = recipes;
                recipeData.recipe_type = 'combo'; // Ensure recipe_type is set
                console.log('🍳 Final recipes array:', recipes);
                console.log('🍳 Final combo recipe data:', recipeData);

                // ALSO collect items for combo (additional items)
                const items = [];
                const itemRows = form.querySelectorAll('.item-row');
                console.log('🥕 Found', itemRows.length, 'item rows to process for combo');
                
                itemRows.forEach((row, index) => {
                    const itemSelect = row.querySelector('.item-select');
                    const quantityInput = row.querySelector('.item-quantity');
                    const unitSelect = row.querySelector('.unit-select');
                    
                    const itemId = itemSelect?.value;
                    const quantity = parseFloat(quantityInput?.value) || 0;
                    const unit = unitSelect?.value || '';
                    
                    console.log('🥕 Processing combo item row:', { itemId, quantity, unit });
                    
                    if (itemId && quantity > 0) {
                        items.push({
                            item_id: parseInt(itemId),
                            quantity: quantity,
                            unit: unit
                        });
                    }
                });

                recipeData.items = items;
                console.log('🥕 Final combo items array:', items);

                // Auto-add Recipe Combo label if not already present
                if (!recipeData.labels.includes('Recipe Combo')) {
                    recipeData.labels.push('Recipe Combo');
                }
            } else {
                // Collect items for regular recipe
                const items = [];
                const itemRows = form.querySelectorAll('.item-row');
                console.log('🥕 Found', itemRows.length, 'item rows to process');
                
                itemRows.forEach((row, index) => {
                    const itemSelect = row.querySelector('.item-select');
                    const quantityInput = row.querySelector('.item-quantity');
                    const unitSelect = row.querySelector('.unit-select');
                    
                    const itemId = itemSelect?.value;
                    const quantity = parseFloat(quantityInput?.value) || 0;
                    const unit = unitSelect?.value || '';
                    
                    console.log('🥕 Processing item row:', { itemId, quantity, unit });
                    
                    if (itemId && quantity > 0) {
                        items.push({
                            item_id: parseInt(itemId),
                            quantity: quantity,
                            unit: unit
                        });
                    }
                });

                recipeData.items = items;
                console.log('🥕 Final items array:', items);
            }

            // Validate required fields
            if (!recipeData.title) {
                this.showNotification('Recipe title is required', 'error');
                return;
            }

            // Only validate instructions for regular recipes, not combos
            if (!isCombo && (!recipeData.instructions || recipeData.instructions.length === 0)) {
                this.showNotification('At least one instruction step is required', 'error');
                return;
            }

            // Save recipe
            let savedRecipe;
            if (existingRecipe) {
                savedRecipe = await this.updateRecipe(existingRecipe.id, recipeData);
                const itemType = isCombo ? 'Combo' : 'Recipe';
                this.showNotification(`${itemType} updated successfully!`, 'success');
            } else {
                savedRecipe = await this.createRecipe(recipeData);
                const itemType = isCombo ? 'Combo' : 'Recipe';
                this.showNotification(`${itemType} created successfully!`, 'success');
            }

            // Handle post-save navigation
            if (this.editingFromMobileView && this.editingRecipe) {
                console.log('📱 Returning to mobile recipe view after full-page form save');
                // Update the editing recipe with latest data and return to mobile view
                this.editingRecipe = savedRecipe;
                
                // First restore the recipe list view, then show mobile recipe
                this.render(); // Restore recipe list
                
                // Small delay to ensure render is complete, then show mobile recipe
                setTimeout(() => {
                    this.isShowingMobileRecipe = false; // Reset flag
                    this.showMobileRecipePage(this.editingRecipe);
                    this.editingFromMobileView = false;
                    this.editingRecipe = null;
                }, 50);
            } else {
                // Return to recipe list
                if (this.previousView) {
                    this.container.innerHTML = this.previousView.container;
                    window.scrollTo(0, this.previousView.scrollPosition || 0);
                    this.attachEventListeners();
                    this.render(); // Refresh to show new/updated recipe
                }
            }

        } catch (error) {
            console.error('Error handling full-page form:', error);
            this.showNotification('Error saving recipe', 'error');
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

    isRecipeQueued(recipeId) {
        const pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
        return pendingRecipes.findIndex(p => parseInt(p.id) === parseInt(recipeId)) !== -1;
    }

    scheduleRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) {
            console.error('Recipe not found:', recipeId);
            return;
        }

        // Check if we're in scheduling context (from itinerary "Add" button)
        if (window.schedulingContext) {
            return this.scheduleRecipeForSpecificDate(recipeId, recipe);
        }

        // Get or create pending recipes list
        let pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
        
        console.log('🔍 Scheduling recipe:', recipeId, 'type:', typeof recipeId);
        console.log('🔍 Current pending recipes:', pendingRecipes);
        console.log('🔍 Pending recipe IDs:', pendingRecipes.map(p => ({ id: p.id, type: typeof p.id })));
        
        // Check if recipe is already in pending list (ensure type consistency)
        const existingIndex = pendingRecipes.findIndex(p => {
            const comparison = parseInt(p.id) === parseInt(recipeId);
            console.log(`🔍 Comparing: ${p.id} (${typeof p.id}) vs ${recipeId} (${typeof recipeId}) -> ${comparison}`);
            return comparison;
        });
        console.log('🔍 Existing index:', existingIndex);
        
        if (existingIndex !== -1) {
            this.showNotification(`${recipe.title} is already in your planning queue`, 'info');
            return;
        }

        // Add recipe to pending list with timestamp
        pendingRecipes.push({
            id: recipe.id,
            title: recipe.title,
            recipe_type: recipe.recipe_type || 'regular',
            addedAt: new Date().toISOString()
        });

        // Save to localStorage
        localStorage.setItem('mealplanner_pending_recipes', JSON.stringify(pendingRecipes));
        
        // Update the planning queue UI counter
        if (window.app && window.app.updatePendingRecipes) {
            window.app.updatePendingRecipes();
        }
        
        // Update the schedule button to show it's queued
        const scheduleButtons = document.querySelectorAll(`.schedule-recipe[data-recipe-id="${recipeId}"]`);
        scheduleButtons.forEach(button => {
            button.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>`;
            button.disabled = true;
            button.classList.remove('text-gray-400', 'hover:text-green-600', 'schedule-recipe');
            button.classList.add('text-green-600', 'opacity-50', 'cursor-not-allowed');
            button.title = 'Already in planning queue';
        });
        
        // Show success notification
        const recipeType = recipe.recipe_type === 'combo' ? 'combo recipe' : 'recipe';
        this.showNotification(`${recipe.title} added to planning queue! Check the Plan tab.`, 'success');
        
        // Update pending recipes display if it exists
        if (window.mealPlannerApp && window.mealPlannerApp.updatePendingRecipes) {
            window.mealPlannerApp.updatePendingRecipes();
        }
        
        console.log(`📅 Added ${recipeType} "${recipe.title}" to planning queue`);
    }

    /**
     * CROSS-PAGE MEAL SCHEDULING FIX:
     * This method handles scheduling meals from the Recipe page to specific dates.
     * Critical fix: Must update both localStorage AND scheduleManager cache to ensure
     * the Plan tab's itinerary view shows the new meal immediately without page refresh.
     */
    scheduleRecipeForSpecificDate(recipeId, recipe) {
        const context = window.schedulingContext;
        console.log(`📅 Scheduling recipe "${recipe.title}" for specific date:`, context.targetDate);
        
        try {
            // SHOPPING LIST SYNC FIX: Use correct storage key based on context
            // Plan tab uses planScheduledMeals (prospective), Menu tab uses menuScheduledMeals (committed)
            const storageKey = context.mealType === 'plan' ? 'planScheduledMeals' : 'menuScheduledMeals';
            console.log(`📅 Using storage key: ${storageKey} for context mealType: ${context.mealType}`);
            
            // Get current scheduled meals
            let scheduledMeals = window.mealPlannerSettings?.getAuthoritativeData(storageKey) || [];
            
            // Create new scheduled meal
            const newMeal = {
                id: Date.now(), // Simple ID generation
                recipe_id: recipe.id,
                recipe_name: recipe.title,
                meal_type: context.mealType, // Use the context mealType directly
                date: new Date(context.targetDate).toISOString(),
                created_at: new Date().toISOString()
            };
            
            // Add to scheduled meals
            scheduledMeals.push(newMeal);
            
            // Save back to authoritative source
            if (window.mealPlannerSettings) {
                window.mealPlannerSettings.saveAuthoritativeData(storageKey, scheduledMeals);
                console.log(`💾 Saved scheduled meal to authoritative data source: ${storageKey}`);
                
                // SHOPPING LIST SYNC FIX: Update grocery list when meals added to Menu tab
                if (storageKey === 'menuScheduledMeals' && window.groceryListManager) {
                    console.log('🛒 Triggering grocery list update after recipe scheduled to Menu');
                    // Get current Menu tab date range and update grocery list
                    if (window.app && typeof window.app.updateMenuMealsDisplay === 'function') {
                        window.app.updateMenuMealsDisplay(); // This will trigger grocery list update
                    }
                }
                
                // CRITICAL CROSS-PAGE CACHE SYNC: Update schedule manager cache after scheduling from Recipe page
                // This fixes the issue where scheduling a meal from Recipe page doesn't update Plan tab itinerary
                // Without this, the Plan tab's forceRefresh() would load stale cached data instead of the new meal
                if (window.scheduleManager && window.scheduleManager.scheduledMeals) {
                    window.scheduleManager.scheduledMeals = scheduledMeals;
                    console.log(`🔄 Updated schedule manager cache after scheduling with ${scheduledMeals.length} meals`);
                }
            }
            
            // Show success notification
            this.showNotification(`${recipe.title} scheduled for ${new Date(context.targetDate).toLocaleDateString()}!`, 'success');
            
            // Remove scheduling banner
            const banner = document.querySelector('.scheduling-banner');
            if (banner) {
                banner.remove();
            }
            
            // Clear scheduling context
            window.schedulingContext = null;
            
            // Switch back to plan tab and refresh itinerary view
            setTimeout(() => {
                if (window.mealPlannerApp && window.mealPlannerApp.switchTab) {
                    window.mealPlannerApp.switchTab('plan');
                } else {
                    const planTab = document.querySelector('[data-tab="plan"]');
                    if (planTab) {
                        planTab.click();
                    }
                }
                
                // UI REFRESH FIX: Force refresh of itinerary views after tab switch
                // This ensures that meals scheduled from Recipe page appear immediately in Plan tab
                setTimeout(() => {
                    if (window.itineraryViews && window.itineraryViews.plan) {
                        console.log('🔄 Force refreshing plan itinerary view after scheduling');
                        window.itineraryViews.plan.forceRefresh();
                    }
                }, 200); // Small delay to ensure tab switch is complete
                
            }, 1000); // Give time for notification to show
            
            // Dispatch event for other components to update
            window.dispatchEvent(new CustomEvent('mealScheduled', {
                detail: { 
                    scheduledMeal: newMeal,
                    recipe: recipe,
                    date: context.targetDate,
                    mealType: context.mealType
                }
            }));
            
            console.log(`✅ Scheduled "${recipe.title}" for ${context.targetDate}`);
            
        } catch (error) {
            console.error('❌ Error scheduling recipe for specific date:', error);
            this.showNotification('Error scheduling recipe. Please try again.', 'error');
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

    // Instruction steps methods
    renderInstructionSteps(instructions = null) {
        let steps = [];
        
        if (instructions) {
            if (Array.isArray(instructions)) {
                steps = instructions;
            } else if (typeof instructions === 'string') {
                // Handle legacy string format - split by newlines or numbered steps
                steps = instructions.split(/\n+|\d+\.\s*/).filter(step => step.trim());
            }
        }
        
        // Ensure at least one step
        if (steps.length === 0) {
            steps = [''];
        }
        
        return steps.map((step, index) => this.renderInstructionStep(step, index + 1)).join('');
    }
    
    renderInstructionStep(content = '', stepNumber = 1) {
        return `
            <div class="instruction-step flex gap-3 items-start">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1">
                    ${stepNumber}
                </div>
                <div class="flex-1">
                    <textarea name="instructions[${stepNumber - 1}]" rows="3" required
                              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm resize-y"
                              placeholder="Enter step ${stepNumber} instructions...">${content}</textarea>
                </div>
                ${stepNumber > 1 ? `
                <button type="button" class="remove-instruction-step flex-shrink-0 p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors mt-1" data-step="${stepNumber}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
                ` : ''}
            </div>
        `;
    }
    
    addInstructionStep() {
        const container = document.getElementById('instructions-container');
        if (!container) return;
        
        const currentSteps = container.querySelectorAll('.instruction-step');
        const nextStepNumber = currentSteps.length + 1;
        
        const newStepHTML = this.renderInstructionStep('', nextStepNumber);
        container.insertAdjacentHTML('beforeend', newStepHTML);
        
        // Attach event listeners to the new step
        this.attachInstructionStepListeners();
        
        // Focus on the new textarea
        const newTextarea = container.querySelector(`textarea[name="instructions[${nextStepNumber - 1}]"]`);
        if (newTextarea) {
            newTextarea.focus();
        }
    }
    
    removeInstructionStep(stepNumber) {
        const container = document.getElementById('instructions-container');
        if (!container) return;
        
        const steps = container.querySelectorAll('.instruction-step');
        if (steps.length <= 1) return; // Don't remove the last step
        
        // Remove the step
        const stepToRemove = Array.from(steps).find(step => {
            const removeBtn = step.querySelector('.remove-instruction-step');
            return removeBtn && removeBtn.dataset.step == stepNumber;
        });
        
        if (stepToRemove) {
            stepToRemove.remove();
            this.renumberInstructionSteps();
        }
    }
    
    renumberInstructionSteps() {
        const container = document.getElementById('instructions-container');
        if (!container) return;
        
        const steps = container.querySelectorAll('.instruction-step');
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            // Update the number circle
            const numberCircle = step.querySelector('.w-8.h-8');
            if (numberCircle) {
                numberCircle.textContent = stepNumber;
            }
            
            // Update the textarea name attribute
            const textarea = step.querySelector('textarea');
            if (textarea) {
                textarea.name = `instructions[${index}]`;
                textarea.placeholder = `Enter step ${stepNumber} instructions...`;
            }
            
            // Update remove button data attribute
            const removeBtn = step.querySelector('.remove-instruction-step');
            if (removeBtn) {
                removeBtn.dataset.step = stepNumber;
            }
        });
    }
    
    attachInstructionStepListeners() {
        // Remove existing listeners to prevent duplicates
        document.querySelectorAll('.remove-instruction-step').forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // Add listeners to remove buttons
        document.querySelectorAll('.remove-instruction-step').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const stepNumber = parseInt(e.currentTarget.dataset.step);
                this.removeInstructionStep(stepNumber);
            });
        });
        
        // Add listener to "Add Another Step" button
        const addBtn = document.getElementById('add-instruction-step');
        if (addBtn) {
            addBtn.replaceWith(addBtn.cloneNode(true));
            document.getElementById('add-instruction-step').addEventListener('click', () => {
                this.addInstructionStep();
            });
        }
    }


    // Multi-select label methods
    addLabel(label) {
        if (!this.selectedLabels.includes(label)) {
            this.selectedLabels.push(label);
            this.labelSearchTerm = ''; // Clear search after selection
            this.render(); // Need full render to update label chips and maintain favorites button state
            this.attachEventListeners(); // Reattach event listeners after render
            this.updateFavoritesButton(); // Ensure favorites button maintains correct state after render
        }
    }

    removeLabel(label) {
        this.selectedLabels = this.selectedLabels.filter(l => l !== label);
        this.render(); // Need full render to update label chips
        this.attachEventListeners(); // Reattach event listeners after render
        this.updateFavoritesButton(); // Ensure favorites button maintains correct state after render
    }

    clearAllLabels() {
        this.selectedLabels = [];
        this.labelSearchTerm = '';
        this.render();
        this.attachEventListeners(); // Reattach event listeners after render
        this.updateFavoritesButton(); // Ensure favorites button maintains correct state after render
    }

    // Form label management methods
    initFormLabels(recipe = null) {
        this.formSelectedLabels = recipe && recipe.labels ? 
            recipe.labels.map(label => typeof label === 'string' ? label : label.name || label) : [];
        this.formLabelSearchTerm = '';
    }

    addFormLabel(label) {
        if (!this.formSelectedLabels.includes(label)) {
            this.formSelectedLabels.push(label);
            this.formLabelSearchTerm = '';
            
            // Clear the input field
            const input = document.querySelector('#recipe-form-labels-input') || 
                         document.querySelector('#fullpage-recipe-labels-input');
            if (input) {
                input.value = '';
            }
            
            // Hide the dropdown
            const dropdown = document.querySelector('#recipe-form-labels-dropdown') || 
                            document.querySelector('#fullpage-recipe-labels-dropdown');
            if (dropdown) {
                dropdown.classList.add('hidden');
            }
            
            this.updateFormLabelsDisplay();
            // Focus back on the input for easy addition of more labels
            if (input) {
                input.focus();
            }
        }
    }

    removeFormLabel(label) {
        this.formSelectedLabels = this.formSelectedLabels.filter(l => l !== label);
        this.updateFormLabelsDisplay();
    }

    updateFormLabelsDisplay() {
        // Try both modal and full-page selectors
        const container = document.querySelector('#recipe-form-labels-container') || 
                         document.querySelector('#fullpage-recipe-labels-container');
        const input = document.querySelector('#recipe-form-labels-input') || 
                     document.querySelector('#fullpage-recipe-labels-input');
        
        if (!container || !input) return;

        // Clear existing chips (keep the input)
        const existingChips = container.querySelectorAll('span');
        existingChips.forEach(chip => chip.remove());

        // Add chips for selected labels
        this.formSelectedLabels.forEach(label => {
            const displayProps = this.getLabelDisplayProperties(label);
            
            const chip = document.createElement('span');
            chip.className = `inline-flex items-center px-1.5 py-0.5 text-xs font-bold ${displayProps.colors}`;
            if (displayProps.inlineStyle) {
                chip.style.cssText = displayProps.inlineStyle;
            }
            chip.innerHTML = `
                ${displayProps.icon}${label}
                <button type="button" class="ml-1 ${displayProps.buttonColors}" onclick="window.recipeManager.removeFormLabel('${label}')">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            `;
            
            // Insert before the input
            container.insertBefore(chip, input);
        });

        // Update placeholder
        input.placeholder = this.formSelectedLabels.length > 0 ? 'Type to add more...' : 'Type to search labels...';
    }

    updateFormLabelDropdown() {
        // Try both modal and full-page selectors
        const dropdown = document.querySelector('#recipe-form-labels-dropdown') || 
                        document.querySelector('#fullpage-recipe-labels-dropdown');
        if (!dropdown) return;

        const availableLabels = this.getAllLabels().filter(label => {
            // Extract label name for filtering (getAllLabels returns strings)
            const labelName = typeof label === 'string' ? label : (label.name || String(label));
            return !this.formSelectedLabels.includes(labelName) &&
                (!this.formLabelSearchTerm || labelName.toLowerCase().includes(this.formLabelSearchTerm.toLowerCase()));
        });

        if (availableLabels.length === 0) {
            dropdown.innerHTML = `
                <div class="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    ${this.formLabelSearchTerm ? `No labels found matching "${this.formLabelSearchTerm}"` : 'No more labels available'}
                </div>
            `;
            dropdown.classList.remove('hidden');
            return;
        }

        dropdown.classList.remove('hidden');
        dropdown.innerHTML = availableLabels.slice(0, 10).map((label, index) => {
            // Extract label name for dropdown display
            const labelName = typeof label === 'string' ? label : (label.name || String(label));
            const labelType = this.inferLabelType(labelName);
            const icon = window.labelTypes ? window.labelTypes.getIcon(labelType) : '';
            const colorClasses = this.getLabelColorClasses(labelType);
            
            return `
            <div class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-gray-100 ${index === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}" 
                 data-label="${labelName}" 
                 onclick="window.recipeManager.addFormLabel('${labelName}')">
                <div class="flex items-center space-x-2">
                    ${icon && labelType !== 'default' ? `<span class="flex-shrink-0">${icon}</span>` : ''}
                    <span class="font-bold flex-1">${labelName}</span>
                    <span class="inline-flex items-center px-2 py-1 ${colorClasses} rounded-full text-xs flex-shrink-0">
                        ${labelType !== 'default' ? this.getShortLabelTypeName(labelType) : 'label'}
                    </span>
                </div>
            </div>
            `;
        }).join('');
    }

    /**
     * Get short, concise names for label types in dropdown
     * @param {string} labelType - The label type (e.g., 'meal_type', 'recipe_type')
     * @returns {string} Short display name
     */
    getShortLabelTypeName(labelType) {
        const shortNames = {
            'meal_type': 'meal',
            'recipe_type': 'combo',
            'ingredient_type': 'ingredient',
            'default': 'label'
        };
        return shortNames[labelType] || labelType.replace('_', ' ');
    }

    // Get filtered labels for dropdown based on search term and current recipe filters
    getFilteredLabelsForDropdown() {
        // Use labels from currently filtered recipes (after search term is applied)
        // This ensures the dropdown only shows labels that exist in the current search results
        const availableLabels = this.getFilteredLabels().filter(label => !this.selectedLabels.includes(label));
        
        let filteredLabels;
        if (!this.labelSearchTerm) {
            filteredLabels = availableLabels;
        } else {
            filteredLabels = availableLabels.filter(label => 
                (label.name || label).toLowerCase().includes(this.labelSearchTerm.toLowerCase())
            );
        }
        
        // Sort labels alphabetically (case-insensitive)
        return filteredLabels.sort((a, b) => (a.name || a).toLowerCase().localeCompare((b.name || b).toLowerCase()));
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
                            ${labelType !== 'default' ? this.getShortLabelTypeName(labelType) : 'label'}
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

// Browser-only: No exports needed - classes are available as global variables
// Tests should use src/components/ versions which are proper ES6 modules
