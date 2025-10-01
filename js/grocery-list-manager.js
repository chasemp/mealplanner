// Grocery List Management Component
class GroceryListManager {
    constructor(container) {
        this.container = container;
        this.groceryLists = [];
        this.currentList = null;
        this.pantryItems = [];
        this.scheduledMeals = [];
        this.recipes = [];
        this.items = [];
        this.currentWeek = this.getCurrentWeek();
        this.displayMode = 'week'; // 'week' or 'meal'
        this.editMode = false; // false = view mode, true = edit mode
        this.groceryItems = []; // For storing generated grocery items
        this.pantryAdjustments = {}; // Store pantry quantities per ingredient (ingredient-centric)
        this.init();
    }

    async init() {
        console.log('🛒 Initializing Grocery List Manager...');
        await this.loadData();
        this.render();
        this.attachEventListeners();
    }

    async loadData() {
        // Mock data - in real app this would query the database
        await this.loadItems();
        await this.loadRecipes();
        await this.loadScheduledMeals();
        await this.loadPantryItems();
        await this.loadGroceryLists();
        this.loadPantryAdjustments();
    }

    async loadItems() {
        console.log('📱 Grocery List Manager loading items from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            this.items = window.mealPlannerSettings.getAuthoritativeData('items');
            console.log(`✅ Grocery List Manager loaded ${this.items.length} items from authoritative source`);
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty items');
            this.items = [];
        }
    }

    async loadRecipes() {
        console.log('📱 Grocery List Manager loading recipes from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            this.recipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            console.log(`✅ Grocery List Manager loaded ${this.recipes.length} recipes from authoritative source`);
            
            // CRITICAL DEBUG: Log recipe IDs for grocery list troubleshooting
            if (this.recipes && this.recipes.length > 0) {
                console.log('🛒 DEBUG: Loaded recipe IDs:', this.recipes.map(r => ({ id: r.id, title: r.title })));
            } else {
                console.log('🚨 CRITICAL: Grocery List Manager has no recipes after loading from authoritative source!');
            }
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty recipes');
            this.recipes = [];
        }
    }

    async loadScheduledMeals() {
        console.log('📱 Grocery List Manager loading scheduled meals from authoritative data source...');
        
        // SHOPPING LIST SYNC FIX: Load from menuScheduledMeals (committed schedule) instead of legacy scheduledMeals
        // The grocery list should be based on the committed meals in the Menu tab, not the legacy storage
        if (window.mealPlannerSettings) {
            // Load from both menuScheduledMeals (committed) and planScheduledMeals (prospective)
            const menuMeals = window.mealPlannerSettings.getAuthoritativeData('menuScheduledMeals') || [];
            const planMeals = window.mealPlannerSettings.getAuthoritativeData('planScheduledMeals') || [];
            console.log('🛒 DEBUG: Loaded menuScheduledMeals:', menuMeals.length, 'meals');
            console.log('🛒 DEBUG: Loaded planScheduledMeals:', planMeals.length, 'meals');
            console.log('🛒 DEBUG: Menu meals:', menuMeals.map(m => ({ id: m.id, recipe_id: m.recipe_id, name: window.app ? window.app.getMealDisplayName(m) : 'Unknown Recipe', date: m.date })));
            console.log('🛒 DEBUG: Plan meals:', planMeals.map(m => ({ id: m.id, recipe_id: m.recipe_id, name: window.app ? window.app.getMealDisplayName(m) : 'Unknown Recipe', date: m.date })));
            
            // Combine both sources for comprehensive grocery list and deduplicate by ID
            const combinedMeals = [...menuMeals, ...planMeals];
            const allMeals = combinedMeals.filter((meal, index, arr) => 
                arr.findIndex(m => m.id === meal.id) === index
            );
            console.log('🛒 DEBUG: Combined meals before dedup:', combinedMeals.length);
            console.log('🛒 DEBUG: Combined meals after dedup:', allMeals.length);
            
            // Filter meals by date range if endDate is set (from unified selector)
            if (this.endDate) {
                console.log('🛒 DEBUG: Filtering with endDate:', this.endDate);
                console.log('🛒 DEBUG: currentWeek:', this.currentWeek);
                this.scheduledMeals = allMeals.filter(meal => {
                    const mealDate = new Date(meal.date);
                    // Normalize dates to ignore time component for proper comparison
                    const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
                    const startDateNormalized = new Date(this.currentWeek.getFullYear(), this.currentWeek.getMonth(), this.currentWeek.getDate());
                    const endDateNormalized = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
                    const inRange = mealDateNormalized >= startDateNormalized && mealDateNormalized <= endDateNormalized;
                    console.log(`🛒 DEBUG: Meal ${meal.id} date ${meal.date} -> ${mealDate} normalized: ${mealDateNormalized} in range: ${inRange}`);
                    return inRange;
                });
                console.log(`✅ Grocery List Manager loaded ${this.scheduledMeals.length} scheduled meals (filtered by date range) from authoritative source`);
            } else {
                // Default to current week if no range specified
                const weekEnd = this.addDays(this.currentWeek, 6);
                console.log('🛒 DEBUG: Filtering with current week range:', this.currentWeek, 'to', weekEnd);
                this.scheduledMeals = allMeals.filter(meal => {
                    const mealDate = new Date(meal.date);
                    // Normalize dates to ignore time component for proper comparison
                    const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
                    const startDateNormalized = new Date(this.currentWeek.getFullYear(), this.currentWeek.getMonth(), this.currentWeek.getDate());
                    const endDateNormalized = new Date(weekEnd.getFullYear(), weekEnd.getMonth(), weekEnd.getDate());
                    const inRange = mealDateNormalized >= startDateNormalized && mealDateNormalized <= endDateNormalized;
                    console.log(`🛒 DEBUG: Meal ${meal.id} date ${meal.date} -> ${mealDate} normalized: ${mealDateNormalized} in range: ${inRange}`);
                    return inRange;
                });
                console.log(`✅ Grocery List Manager loaded ${this.scheduledMeals.length} scheduled meals (current week) from authoritative source`);
            }
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty scheduled meals');
            this.scheduledMeals = [];
        }
    }

    async loadPantryItems() {
        console.log('📱 Grocery List Manager loading pantry items from items with pantry category...');
        
        // Get all items and filter for pantry category
        if (window.mealPlannerSettings) {
            const allItems = window.mealPlannerSettings.getAuthoritativeData('items') || [];
            this.pantryItems = allItems.filter(item => item.category === 'pantry');
            console.log(`✅ Grocery List Manager loaded ${this.pantryItems.length} pantry items from items data`);
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty pantry items');
            this.pantryItems = [];
        }
    }

    async loadGroceryLists() {
        this.groceryLists = [
            {
                id: 1,
                week_start_date: this.formatDate(this.currentWeek),
                generated_at: new Date().toISOString(),
                items: []
            }
        ];
    }

    getCurrentWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - dayOfWeek);
        weekStart.setHours(0, 0, 0, 0);
        return weekStart;
    }

    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    render() {
        this.container.innerHTML = `
            <div class="grocery-list-manager">
                <!-- Header -->
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Grocery Lists</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">
                            Generate shopping lists from your meal plans
                        </p>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <!-- Copy Action -->
                        <div class="flex items-center space-x-2">
                            <button id="copy-list-btn" class="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none" title="Copy to clipboard">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                                <span class="hidden sm:inline">Copy</span>
                            </button>
                        </div>
                        
                        <!-- Pantry Management -->
                        <div class="flex items-center space-x-2 mt-2 sm:mt-0">
                            <button id="clear-pantry-btn" class="btn-secondary text-xs flex items-center justify-center space-x-1 px-3 py-2" title="Clear all pantry adjustments">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                <span class="hidden sm:inline">Clear Pantry</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Removed duplicative This Week's Meals section - meals are already shown in main Scheduled Meals section -->

                <!-- Grocery List -->
                <div class="grid grid-cols-1 gap-6">
                    <!-- Generated List -->
                    <div>
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                                <!-- Title and Action Buttons Row -->
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-semibold text-gray-900 dark:text-white">Shopping List</h4>
                                        <button id="share-list-btn" class="flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors" title="Share shopping list">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Control Toggles Row -->
                                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <!-- Display Mode Toggle (Single Button) -->
                                    <button id="shopping-list-display-mode-toggle" class="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors min-h-[44px] touch-manipulation" title="Toggle between Meal and Week grouping">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                        </svg>
                                        <span id="display-mode-text">${this.displayMode === 'meal' ? 'Meal' : 'Week'}</span>
                                        <svg class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    
                                    <!-- Edit Mode Toggle (Single Button) -->
                                    <button id="shopping-list-edit-mode-toggle" class="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors min-h-[44px] touch-manipulation" title="Toggle between View and Edit modes">
                                        <span id="edit-mode-icon">${this.editMode ? '✏️' : '📋'}</span>
                                        <span id="edit-mode-text">${this.editMode ? 'Edit' : 'View'}</span>
                                        <svg class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    
                                    <!-- Edit Mode Helper Text -->
                                    ${this.editMode ? `
                                        <div class="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded flex-shrink-0">
                                            Tap +/- to adjust quantities
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="p-6">
                                ${this.renderGroceryList()}
                            </div>
                        </div>
                    </div>

                    <!-- Pantry items are now just items with category='pantry' - managed in Items tab -->
                </div>
            </div>
        `;
        
        // Re-attach event listeners after rendering
        this.attachEventListeners();
    }

    // Method called by unified Menu tab date selector
    updateDateRange(startDate, endDate) {
        console.log(`🛒 Grocery list updating date range: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
        
        // Update the current week to match the start date
        this.currentWeek = new Date(startDate);
        
        // Store the end date for filtering
        this.endDate = new Date(endDate);
        
        // Reload data and automatically generate grocery list
        this.loadScheduledMeals().then(() => {
            // AUTO-GENERATE GROCERY LIST: Generate grocery list from scheduled meals when date range updates
            // This ensures the grocery list is always up-to-date with the current Menu tab meals
            this.generateFromScheduledMeals();
            console.log('🛒 Grocery list updated with new date range and auto-generated from scheduled meals');
        });
    }

    renderWeekOptions() {
        // This method is no longer used since we removed the week selector
        // Keeping it for backward compatibility but it won't be called
        const options = [];
        for (let i = -1; i <= 3; i++) {
            const weekStart = this.addDays(this.currentWeek, i * 7);
            const weekEnd = this.addDays(weekStart, 6);
            const label = i === 0 ? 'This Week' : 
                         i === 1 ? 'Next Week' :
                         i === -1 ? 'Last Week' :
                         `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
            
            options.push(`
                <option value="${this.formatDate(weekStart)}" ${i === 0 ? 'selected' : ''}>
                    ${label} (${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                </option>
            `);
        }
        return options.join('');
    }

    renderScheduledMeals() {
        if (this.scheduledMeals.length === 0) return '';

        return this.scheduledMeals.map(meal => {
            const recipe = this.recipes.find(r => r.id === meal.recipeId);
            if (!recipe) return '';

            if (!meal.date) {
                console.warn(`⚠️ Scheduled meal ${meal.id} missing date property:`, meal);
                return '';
            }
            const date = new Date(meal.date);
            return `
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-900">${recipe.title}</span>
                        <span class="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">${meal.meal_type}</span>
                    </div>
                    <div class="text-xs text-gray-500">
                        ${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div class="text-xs text-gray-400 mt-1">
                        ${recipe.items ? recipe.items.length : 0} items
                    </div>
                </div>
            `;
        }).join('');
    }

    renderGroceryList() {
        if (this.displayMode === 'meal') {
            return this.renderMealModeList();
        } else {
            return this.renderWeekModeList();
        }
    }

    renderMealModeList() {
        // Group items by meal/recipe
        const mealGroups = this.groupIngredientsByMeal();
        
        if (mealGroups.length === 0) {
            return this.renderEmptyState();
        }

        return mealGroups.map(mealGroup => `
            <div class="mb-6 last:mb-0">
                <div class="flex items-center justify-between mb-3">
                    <h5 class="font-medium text-gray-900 dark:text-white">${mealGroup.recipeName}</h5>
                    <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        ${mealGroup.date}
                    </span>
                </div>
                <div class="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                    ${mealGroup.items.map(item => this.renderGroceryItem(item)).join('')}
                </div>
            </div>
        `).join('');
    }

    renderWeekModeList() {
        const groceryItems = this.generateGroceryItems();
        
        if (groceryItems.length === 0) {
            return this.renderEmptyState();
        }

        // Group by category and date range
        const groupedItems = this.groupItemsByCategory(groceryItems);
        
        return Object.entries(groupedItems).map(([category, items]) => `
            <div class="mb-6 last:mb-0">
                <h5 class="font-medium text-gray-900 dark:text-white mb-3 capitalize">${category}</h5>
                <div class="space-y-2">
                    ${items.map(item => this.renderGroceryItem(item)).join('')}
                </div>
            </div>
        `).join('');
    }

    renderEmptyState() {
        return `
            <div class="text-center py-8">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"></path>
                </svg>
                <p class="text-gray-500 dark:text-gray-400">No grocery list generated</p>
                <p class="text-sm text-gray-400 dark:text-gray-500">Add some scheduled meals to generate a shopping list</p>
            </div>
        `;
    }

    renderGroceryItem(item, showQuantityControls = null) {
        // Use editMode if showQuantityControls not explicitly set
        // In view mode, never show quantity controls
        if (showQuantityControls === null) {
            showQuantityControls = this.editMode;
        }
        const itemId = item.item_id || item.id || Math.random().toString(36).substr(2, 9);
        const adjustedQuantity = item.adjusted_quantity || item.quantity;
        
        return `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 ${showQuantityControls ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-700'} rounded-lg gap-3">
                <div class="flex items-center space-x-3 flex-1 min-w-0">
                    <input type="checkbox" 
                           class="grocery-item-checkbox w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0" 
                           data-item-id="${itemId}"
                           ${item.checked ? 'checked' : ''}>
                    <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 dark:text-white ${item.checked ? 'line-through text-gray-500 dark:text-gray-400' : ''} flex items-center gap-2">
                            ${item.name}
                            ${showQuantityControls ? '<span class="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5 rounded" title="Editable in edit mode">✏️</span>' : ''}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            ${showQuantityControls ? '' : 
                                item.pantry_quantity > 0 ? `
                                    <span class="line-through text-gray-400 dark:text-gray-500">${item.quantity} ${item.unit}</span>
                                    <span class="text-green-600 dark:text-green-400 font-medium"> → ${item.adjusted_quantity} ${item.unit} needed</span>
                                ` : `${item.quantity} ${item.unit}`
                            }
                            ${item.pantry_quantity > 0 ? `
                                <div class="text-xs text-green-600 dark:text-green-400 mt-1">
                                    ✓ Have ${item.pantry_quantity} ${item.pantry_unit} in pantry
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                ${showQuantityControls ? `
                    <div class="flex items-center space-x-3">
                        <button class="quantity-decrease w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 rounded-full text-gray-600 dark:text-gray-300 transition-all duration-150 touch-manipulation select-none" data-item-id="${itemId}" title="Decrease quantity">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                            </svg>
                        </button>
                        <div class="text-center min-w-[100px] px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                            ${item.pantry_quantity > 0 ? `
                                <div class="text-xs text-gray-400 dark:text-gray-500 line-through">${item.quantity}</div>
                                <div class="text-lg font-semibold text-green-600 dark:text-green-400">${adjustedQuantity}</div>
                            ` : `
                                <div class="text-lg font-semibold text-gray-900 dark:text-white">${adjustedQuantity}</div>
                            `}
                            <div class="text-xs text-gray-500 dark:text-gray-400">${item.unit}</div>
                        </div>
                        <button class="quantity-increase w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 rounded-full text-gray-600 dark:text-gray-300 transition-all duration-150 touch-manipulation select-none" data-item-id="${itemId}" title="Increase quantity">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </button>
                    </div>
                ` : `
                    <div class="text-right">
                        ${adjustedQuantity !== item.quantity ? `
                            <div class="text-sm">
                                <span class="line-through text-gray-400 dark:text-gray-500">${item.quantity}</span>
                                <span class="font-medium text-green-600 dark:text-green-400">${adjustedQuantity}</span>
                            </div>
                        ` : `
                            <div class="text-sm font-medium text-gray-900 dark:text-white">${item.quantity}</div>
                        `}
                        <div class="text-xs text-gray-400 dark:text-gray-500">${item.unit}</div>
                    </div>
                `}
            </div>
        `;
    }

    groupIngredientsByMeal() {
        console.log(`🛒 [Meal Mode] Grouping ingredients by meal for ${this.scheduledMeals.length} scheduled meals`);
        const mealGroups = [];
        
        // Get scheduled meals in the current date range
        const filteredMeals = this.scheduledMeals.filter(meal => {
            const mealDate = new Date(meal.date);
            const startDate = new Date(this.currentWeek);
            const endDate = this.endDate || new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            
            // Normalize dates to ignore time component for proper comparison
            const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
            const startDateNormalized = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const endDateNormalized = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
            
            return mealDateNormalized >= startDateNormalized && mealDateNormalized <= endDateNormalized;
        });

        console.log(`🛒 [Meal Mode] Filtered to ${filteredMeals.length} meals in date range`);

        filteredMeals.forEach(meal => {
                // CRITICAL FIX: Use recipe_id (snake_case) instead of recipeId (camelCase)
                const recipeId = meal.recipe_id || meal.recipeId;
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (!recipe) return;

            const mealDate = new Date(meal.date);
            const formattedDate = mealDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });

            let allItems = [];

            // Handle combo recipes differently
            if (recipe.recipe_type === 'combo') {
                console.log('🛒 [By Meal] Processing COMBO recipe:', recipe.title);
                
                // Get items from sub-recipes in the combo
                const recipeRefs = recipe.recipes || recipe.combo_recipes || [];
                
                recipeRefs.forEach(recipeRef => {
                    const subRecipe = this.recipes.find(r => r.id === parseInt(recipeRef.recipe_id));
                    if (!subRecipe || !subRecipe.items) return;
                    
                    const portions = recipeRef.servings || 1;
                    
                    (subRecipe.items || []).forEach(item => {
                        const itemData = this.items.find(i => i.id === item.item_id);
                        const adjustedQuantity = (item.quantity || 0) * portions;
                        
                        allItems.push({
                            id: item.item_id,
                            item_id: item.item_id,
                            name: itemData ? itemData.name : 'Unknown Item',
                            quantity: adjustedQuantity,
                            unit: item.unit || '',
                            category: this.getItemCategory(item.item_id),
                            checked: false,
                            pantry_quantity: 0,
                            adjusted_quantity: adjustedQuantity,
                            source: `${subRecipe.title} (${portions}x)`
                        });
                    });
                });

                // Add any additional items from the combo itself
                if (recipe.items && recipe.items.length > 0) {
                    recipe.items.forEach(item => {
                        const itemData = this.items.find(i => i.id === item.item_id);
                        allItems.push({
                            id: ingredient.item_id,
                            ingredient_id: ingredient.item_id,
                            name: ingredientData ? ingredientData.name : 'Unknown Ingredient',
                            quantity: ingredient.quantity || 0,
                            unit: ingredient.unit || '',
                            category: this.getItemCategory(ingredient.item_id),
                            checked: false,
                            pantry_quantity: 0,
                            adjusted_quantity: ingredient.quantity || 0,
                            source: 'Additional'
                        });
                    });
                }
            } else {
                // Handle regular recipes
                if (recipe.items && recipe.items.length > 0) {
                    allItems = recipe.items.map(ingredient => {
                        const ingredientData = this.items.find(i => i.id === ingredient.item_id);
                        return {
                            id: ingredient.item_id,
                            ingredient_id: ingredient.item_id,
                            name: ingredientData ? ingredientData.name : 'Unknown Ingredient',
                            quantity: ingredient.quantity || 0,
                            unit: ingredient.unit || '',
                            category: this.getItemCategory(ingredient.item_id),
                            checked: false,
                            pantry_quantity: 0,
                            adjusted_quantity: ingredient.quantity || 0
                        };
                    });
                }
            }

            if (allItems.length > 0) {
                mealGroups.push({
                    recipeName: recipe.title || 'Unknown Recipe',
                    date: formattedDate,
                    items: allItems,
                    recipeType: recipe.recipe_type || 'recipe'
                });
            }
        });

        console.log(`🛒 [Meal Mode] Generated ${mealGroups.length} meal groups`);
        return mealGroups;
    }

    renderPantryItems() {
        if (this.pantryItems.length === 0) {
            return `
                <div class="text-center py-8">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    <p class="text-gray-500 text-sm">No pantry items</p>
                </div>
            `;
        }

        return `
            <div class="space-y-3">
                ${this.pantryItems.map(item => `
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-medium text-gray-900">${item.name}</div>
                            <div class="text-sm text-gray-500">${item.notes || 'In stock'}</div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium">${item.quantity}</div>
                            <div class="text-xs text-gray-400">${item.unit}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Utility function to round quantities to 2 decimal places and remove trailing zeros
    // PRINCIPLE: All quantities must be realistic values that a user could manually enter via UI
    // No programmatic artifacts like 0.3333333333333333 - these would never be user-entered
    roundQuantity(quantity) {
        const rounded = Math.round(quantity * 100) / 100;
        return parseFloat(rounded.toFixed(2));
    }

    generateGroceryItems() {
        const items = [];
        const ingredientTotals = {};
        const ingredientMealContributions = {}; // Track which meals contribute to each item

        console.log('🛒 generateGroceryItems called with', this.scheduledMeals.length, 'scheduled meals');
        
        // CRITICAL FIX: Ensure recipes are loaded before processing
        if (!this.recipes || this.recipes.length === 0) {
            console.log('🚨 CRITICAL: No recipes available in grocery list manager, attempting to reload...');
            if (window.mealPlannerSettings) {
                this.recipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
                console.log('🛒 Emergency reload: Now have', this.recipes?.length || 0, 'recipes');
            }
        }

        // CRITICAL FIX: Ensure items are loaded before processing
        if (!this.items || this.items.length === 0) {
            console.log('🚨 CRITICAL: No items available in grocery list manager, attempting to reload...');
            if (window.mealPlannerSettings) {
                this.items = window.mealPlannerSettings.getAuthoritativeData('items');
                console.log('🛒 Emergency reload: Now have', this.items?.length || 0, 'items');
            }
        }
        
        console.log('🛒 Processing with', this.recipes?.length || 0, 'available recipes and', this.items?.length || 0, 'available items');

            // Aggregate ingredients from all scheduled meals
            this.scheduledMeals.forEach(meal => {
                // CRITICAL FIX: Use recipe_id (snake_case) instead of recipeId (camelCase)
                const recipeId = meal.recipe_id || meal.recipeId;
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (!recipe) {
                    console.log('🚨 Recipe not found for meal:', meal);
                    console.log('🛒 Looking for recipe ID:', recipeId, 'from meal property:', meal.recipe_id || meal.recipeId);
                    console.log('🛒 Available recipe IDs:', this.recipes.map(r => r.id));
                    return;
                }

            console.log('🛒 Processing recipe:', recipe.title, 'Type:', recipe.recipe_type);

            // Handle combo recipes differently
            if (recipe.recipe_type === 'combo') {
                console.log('🛒 Processing COMBO recipe:', recipe.title);
                
                // Get items from sub-recipes in the combo
                const recipeRefs = recipe.recipes || recipe.combo_recipes || [];
                console.log('🛒 Combo has', recipeRefs.length, 'sub-recipes');
                
                recipeRefs.forEach(recipeRef => {
                    const subRecipe = this.recipes.find(r => r.id === parseInt(recipeRef.recipe_id));
                    if (!subRecipe || !subRecipe.items) {
                        console.log('🚨 Sub-recipe not found or has no items:', recipeRef.recipe_id);
                        return;
                    }
                    
                    console.log('🛒 Processing sub-recipe:', subRecipe.title, 'with', subRecipe.items.length, 'items');
                    const portions = recipeRef.servings || 1;
                    
                    (subRecipe.items || []).forEach(ingredient => {
                        const key = `${ingredient.item_id}-${ingredient.unit}`;
                        if (!ingredientTotals[key]) {
                            // Look up ingredient name from items database
                            const ingredientData = this.items.find(i => i.id === ingredient.item_id);
                            let ingredientName;
                            if (ingredientData) {
                                ingredientName = ingredientData.name;
                            } else if (ingredient.name) {
                                ingredientName = ingredient.name;
                            } else {
                                // More descriptive fallback
                                ingredientName = `Unknown Item (ID: ${ingredient.item_id})`;
                                console.warn('🚨 Item not found in database:', ingredient.item_id, 'Available items:', this.items.map(i => i.id));
                            }
                            
                            ingredientTotals[key] = {
                                ingredient_id: ingredient.item_id,
                                item_id: ingredient.item_id,
                                name: ingredientName,
                                quantity: 0,
                                unit: ingredient.unit,
                                category: this.getItemCategory(ingredient.item_id)
                            };
                            
                            // Initialize meal contributions tracking
                            ingredientMealContributions[key] = [];
                        }
                        
                        // Track this meal's contribution
                        ingredientMealContributions[key].push({
                            mealId: meal.id,
                            mealDate: meal.date,
                            quantity: (ingredient.quantity || 0) * portions,
                            recipeTitle: recipe.title
                        });
                        const adjustedQuantity = (ingredient.quantity || 0) * portions;
                        ingredientTotals[key].quantity = this.roundQuantity(
                            ingredientTotals[key].quantity + adjustedQuantity
                        );
                        console.log('🛒 Added ingredient:', ingredientTotals[key].name, adjustedQuantity, ingredient.unit);
                    });
                });
                
                // Also add the combo's own additional items
                const additionalItems = recipe.items || [];
                console.log('🛒 Combo has', additionalItems.length, 'additional items');
                additionalItems.forEach(ingredient => {
                    const key = `${ingredient.item_id}-${ingredient.unit}`;
                    if (!ingredientTotals[key]) {
                        // Look up ingredient name from items database
                        const ingredientData = this.items.find(i => i.id === ingredient.item_id);
                        let ingredientName;
                        if (ingredientData) {
                            ingredientName = ingredientData.name;
                        } else if (ingredient.name) {
                            ingredientName = ingredient.name;
                        } else {
                            // More descriptive fallback
                            ingredientName = `Unknown Item (ID: ${ingredient.item_id})`;
                            console.warn('🚨 Item not found in database:', ingredient.item_id, 'Available items:', this.items.map(i => i.id));
                        }
                        
                        ingredientTotals[key] = {
                            ingredient_id: ingredient.item_id,
                            item_id: ingredient.item_id,
                            name: ingredientName,
                            quantity: 0,
                            unit: ingredient.unit,
                            category: this.getItemCategory(ingredient.item_id)
                        };
                        
                        // Initialize meal contributions tracking
                        ingredientMealContributions[key] = [];
                    }
                    
                    // Track this meal's contribution
                    ingredientMealContributions[key].push({
                        mealId: meal.id,
                        mealDate: meal.date,
                        quantity: ingredient.quantity || 0,
                        recipeTitle: recipe.title
                    });
                    ingredientTotals[key].quantity = this.roundQuantity(
                        ingredientTotals[key].quantity + (ingredient.quantity || 0)
                    );
                    console.log('🛒 Added additional item:', ingredientTotals[key].name, ingredient.quantity, ingredient.unit);
                });
                
            } else {
                // Handle regular recipes
                console.log('🛒 Processing REGULAR recipe:', recipe.title, 'with', (recipe.items || []).length, 'items');
                (recipe.items || []).forEach(ingredient => {
                    const key = `${ingredient.item_id}-${ingredient.unit}`;
                    if (!ingredientTotals[key]) {
                        // Look up ingredient name from items database
                        const ingredientData = this.items.find(i => i.id === ingredient.item_id);
                        let ingredientName;
                        if (ingredientData) {
                            ingredientName = ingredientData.name;
                        } else if (ingredient.name) {
                            ingredientName = ingredient.name;
                        } else {
                            // More descriptive fallback
                            ingredientName = `Unknown Item (ID: ${ingredient.item_id})`;
                            console.warn('🚨 Item not found in database:', ingredient.item_id, 'Available items:', this.items.map(i => i.id));
                        }
                        
                        ingredientTotals[key] = {
                            ingredient_id: ingredient.item_id,
                            name: ingredientName,
                            quantity: 0,
                            unit: ingredient.unit,
                            category: this.getItemCategory(ingredient.item_id)
                        };
                    }
                    ingredientTotals[key].quantity = this.roundQuantity(
                        ingredientTotals[key].quantity + (ingredient.quantity || 0)
                    );
                    console.log('🛒 Added ingredient:', ingredientTotals[key].name, ingredient.quantity, ingredient.unit);
                });
            }
        });

        console.log('🛒 Final ingredient totals:', Object.keys(ingredientTotals).length, 'unique ingredients');
        console.log('🛒 Ingredient totals:', ingredientTotals);

        // Convert to grocery items and apply ingredient-centric pantry adjustments
        Object.values(ingredientTotals).forEach((item, index) => {
            const itemId = item.item_id || item.ingredient_id;
            const pantryAdjustment = this.pantryAdjustments[itemId];
            const pantryQuantity = pantryAdjustment ? pantryAdjustment.pantryQuantity : 0;
            
            // Calculate how much we still need to buy after pantry reduction
            const adjustedQuantity = this.roundQuantity(Math.max(0, item.quantity - pantryQuantity));

            items.push({
                id: index + 1,
                ingredient_id: item.ingredient_id,
                item_id: itemId,
                name: item.name,
                quantity: item.quantity, // Original total needed
                adjusted_quantity: adjustedQuantity, // What we need to buy
                unit: item.unit,
                category: item.category,
                pantry_quantity: pantryQuantity, // What we have in pantry
                pantry_unit: item.unit,
                checked: false,
                mealContributions: ingredientMealContributions[`${itemId}-${item.unit}`] || []
            });
        });

        // Return all items (including those with 0 adjusted quantity for display purposes)
        return items;
    }

    getItemCategory(itemId) {
        const item = this.items.find(i => i.id === itemId);
        return item ? item.category : 'other';
    }

    // Generate grocery list from current scheduled meals (called when meals change)
    async generateFromScheduledMeals() {
        console.log('🛒 Regenerating grocery list from scheduled meals...');
        
        // CRITICAL FIX: Await scheduled meals loading before generating grocery items
        // This prevents the forEach error when scheduledMeals is undefined/empty
        await this.loadScheduledMeals();
        
        // Regenerate grocery items
        this.groceryItems = this.generateGroceryItems();
        
        // Re-render the grocery list
        this.render();
        
        console.log(`✅ Generated grocery list with ${this.groceryItems.length} items`);
    }

    groupItemsByCategory(items) {
        const grouped = {};
        items.forEach(item => {
            const category = item.category || 'other';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(item);
        });

        // Sort categories in a logical shopping order
        const categoryOrder = ['produce', 'meat', 'dairy', 'grains', 'pantry', 'other'];
        const sortedGrouped = {};
        categoryOrder.forEach(category => {
            if (grouped[category]) {
                sortedGrouped[category] = grouped[category];
            }
        });

        return sortedGrouped;
    }

    attachEventListeners() {
        console.log('🛒 Attaching grocery list event listeners...');
        
        // SHOPPING LIST AUTO-UPDATE: Listen for meal changes to automatically update grocery list
        document.addEventListener('mealScheduled', (event) => {
            console.log('🛒 Meal scheduled event received - updating grocery list', event.detail);
            this.generateFromScheduledMeals();
        });

        document.addEventListener('mealUnscheduled', (event) => {
            console.log('🛒 Meal unscheduled event received - updating grocery list', event.detail);
            this.generateFromScheduledMeals();
        });

        document.addEventListener('mealUpdated', (event) => {
            console.log('🛒 Meal updated event received - updating grocery list', event.detail);
            this.generateFromScheduledMeals();
        });
        
        console.log('✅ Grocery list event listeners attached');

        // Copy list button
        const copyBtn = this.container.querySelector('#copy-list-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyGroceryList();
            });
        }

        // Share list button
        const shareBtn = this.container.querySelector('#share-list-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareGroceryList();
            });
        }

        // Clear pantry adjustments button
        const clearPantryBtn = this.container.querySelector('#clear-pantry-btn');
        if (clearPantryBtn) {
            clearPantryBtn.addEventListener('click', () => {
                if (confirm('Clear all pantry adjustments? This will reset all shopping list quantities to their original values.')) {
                    this.clearAllPantryAdjustments();
                }
            });
        }

        // Note: Week selector removed - now controlled by unified Menu tab selector

        // Manage pantry button
        const managePantryBtn = this.container.querySelector('#manage-pantry-btn');
        if (managePantryBtn) {
            managePantryBtn.addEventListener('click', () => {
                this.managePantry();
            });
        }

        // Display mode toggle button (single button that cycles)
        const displayModeToggleBtn = this.container.querySelector('#shopping-list-display-mode-toggle');
        
        console.log('🛒 DEBUG: Looking for display mode toggle button...');
        console.log('🛒 DEBUG: displayModeToggleBtn found:', !!displayModeToggleBtn, displayModeToggleBtn);
        
        if (displayModeToggleBtn) {
            displayModeToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🛒 DEBUG: Display mode toggle button clicked!');
                // Toggle between 'meal' and 'week'
                const newMode = this.displayMode === 'meal' ? 'week' : 'meal';
                this.setDisplayMode(newMode);
            });
            console.log('🛒 DEBUG: Display mode toggle event listener attached');
        } else {
            console.warn('🛒 WARNING: Display mode toggle button not found!');
        }

        // Edit mode toggle button (single button that cycles)
        const editModeToggleBtn = this.container.querySelector('#shopping-list-edit-mode-toggle');
        
        console.log('🛒 DEBUG: Looking for edit mode toggle button...');
        console.log('🛒 DEBUG: editModeToggleBtn found:', !!editModeToggleBtn, editModeToggleBtn);
        
        if (editModeToggleBtn) {
            editModeToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🛒 DEBUG: Edit mode toggle button clicked!');
                // Toggle between view and edit modes
                this.setEditMode(!this.editMode);
            });
            console.log('🛒 DEBUG: Edit mode toggle event listener attached');
        } else {
            console.warn('🛒 WARNING: Edit mode toggle button not found!');
        }

        // Grocery item checkboxes
        this.container.querySelectorAll('.grocery-item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleGroceryItem(e.target.dataset.itemId, e.target.checked);
            });
        });

        // Quantity control buttons (only in edit mode)
        this.container.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.editMode) {
                    this.adjustQuantity(e.target.closest('button').dataset.itemId, -0.25);
                    // Add visual feedback
                    button.classList.add('scale-95');
                    setTimeout(() => button.classList.remove('scale-95'), 150);
                }
            });
        });

        this.container.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.editMode) {
                    this.adjustQuantity(e.target.closest('button').dataset.itemId, 0.25);
                    // Add visual feedback
                    button.classList.add('scale-95');
                    setTimeout(() => button.classList.remove('scale-95'), 150);
                }
            });
        });
    }

    setDisplayMode(mode) {
        console.log(`🛒 Switching display mode from ${this.displayMode} to ${mode}`);
        this.displayMode = mode;
        this.updateToggleButtons();
        this.render();
        console.log(`✅ Display mode switched to ${mode}`);
    }

    setEditMode(editMode) {
        console.log(`🛒 Setting edit mode to ${editMode}`);
        this.editMode = editMode;
        this.updateToggleButtons();
        this.render();
        console.log(`✅ Edit mode switched to ${editMode ? 'edit' : 'display'}`);
    }

    updateToggleButtons() {
        // Update display mode toggle button text
        const displayModeText = this.container.querySelector('#display-mode-text');
        if (displayModeText) {
            displayModeText.textContent = this.displayMode === 'meal' ? 'Meal' : 'Week';
        }

        // Update edit mode toggle button text and icon
        const editModeIcon = this.container.querySelector('#edit-mode-icon');
        const editModeText = this.container.querySelector('#edit-mode-text');
        if (editModeIcon) {
            editModeIcon.textContent = this.editMode ? '✏️' : '📋';
        }
        if (editModeText) {
            editModeText.textContent = this.editMode ? 'Edit' : 'View';
        }
    }

    adjustQuantity(itemId, adjustment) {
        // Adjust pantry quantity for an ingredient (ingredient-centric approach)
        if (!this.groceryItems) return;
        
        const item = this.groceryItems.find(item => 
            (item.ingredient_id && item.ingredient_id.toString() === itemId.toString()) ||
            (item.id && item.id.toString() === itemId.toString()) ||
            (item.item_id && item.item_id.toString() === itemId.toString())
        );
        
        if (item) {
            const actualItemId = item.item_id || item.ingredient_id || item.id;
            const unit = item.unit;
            
            // Initialize pantry adjustment for this ingredient if needed
            if (!this.pantryAdjustments[actualItemId]) {
                this.pantryAdjustments[actualItemId] = {
                    pantryQuantity: 0,
                    unit: unit,
                    lastUpdated: new Date().toISOString()
                };
            }
            
            const pantryData = this.pantryAdjustments[actualItemId];
            
            // Adjust pantry quantity (what we have in pantry)
            const newPantryQuantity = Math.max(0, pantryData.pantryQuantity + adjustment);
            
            pantryData.pantryQuantity = this.roundQuantity(newPantryQuantity);
            pantryData.lastUpdated = new Date().toISOString();
            
            // Save adjustments to localStorage
            this.savePantryAdjustments();
            
            // Re-render to show the updated display
            this.render();
        }
    }

    savePantryAdjustments() {
        localStorage.setItem('mealplanner_pantry_adjustments', JSON.stringify(this.pantryAdjustments));
    }

    loadPantryAdjustments() {
        const saved = localStorage.getItem('mealplanner_pantry_adjustments');
        if (saved) {
            try {
                this.pantryAdjustments = JSON.parse(saved);
            } catch (error) {
                console.warn('Error loading pantry adjustments:', error);
                this.pantryAdjustments = {};
            }
        }
    }

    clearAllPantryAdjustments() {
        this.pantryAdjustments = {};
        this.savePantryAdjustments();
        this.render();
        this.showNotification('All pantry adjustments cleared', 'success');
    }

    generateGroceryList() {
        console.log('Generating grocery list for week:', this.formatDate(this.currentWeek));
        this.render();
        this.showNotification('Grocery list generated successfully!', 'success');
    }

    exportGroceryList() {
        // Show export options modal
        this.showExportModal();
    }

    async shareGroceryList() {
        const groceryItems = this.generateGroceryItems();
        const text = this.formatGroceryListForExport(groceryItems);
        const title = `Shopping List - ${this.formatDate(this.currentWeek)}`;
        
        // Check if Web Share API is supported (mobile browsers)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: window.location.href
                });
                this.showNotification('Shopping list shared!', 'success');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    this.fallbackShare(text, title);
                }
            }
        } else {
            // Fallback for desktop browsers
            this.fallbackShare(text, title);
        }
    }

    fallbackShare(text, title) {
        // Copy to clipboard as fallback
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Shopping list copied to clipboard!', 'success');
            }).catch(() => {
                this.showExportModal();
            });
        } else {
            this.showExportModal();
        }
    }

    showExportModal() {
        // Remove existing modal if present
        const existingModal = document.getElementById('export-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'export-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Export Grocery List</h3>
                    <button id="close-export-modal" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="space-y-3">
                    <button id="export-text" class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Export as Text File
                    </button>
                    
                    <button id="export-pdf" class="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        Export as PDF
                    </button>
                    
                    <button id="export-email" class="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Send via Email
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        const closeBtn = modal.querySelector('#close-export-modal');
        const exportTextBtn = modal.querySelector('#export-text');
        const exportPdfBtn = modal.querySelector('#export-pdf');
        const exportEmailBtn = modal.querySelector('#export-email');

        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        exportTextBtn.addEventListener('click', () => {
            this.exportAsText();
            closeModal();
        });
        exportPdfBtn.addEventListener('click', () => {
            this.exportAsPDF();
            closeModal();
        });
        exportEmailBtn.addEventListener('click', () => {
            this.exportViaEmail();
            closeModal();
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    exportAsText() {
        const groceryItems = this.generateGroceryItems();
        const text = this.formatGroceryListForExport(groceryItems);
        
        // Create and download text file
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `grocery-list-${this.formatDate(this.currentWeek)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Grocery list exported as text!', 'success');
    }

    exportAsPDF() {
        // Create a printable HTML version and use browser's print-to-PDF
        const printWindow = window.open('', '_blank');
        const groceryHTML = this.generateGroceryListHTML();
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Grocery List - ${this.formatDate(this.currentWeek)}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .category {
                        margin-bottom: 20px;
                        break-inside: avoid;
                    }
                    .category-title {
                        font-weight: bold;
                        font-size: 1.2em;
                        color: #333;
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 5px;
                        margin-bottom: 10px;
                    }
                    .item {
                        display: flex;
                        justify-content: space-between;
                        padding: 5px 0;
                        border-bottom: 1px dotted #ccc;
                    }
                    .item:last-child {
                        border-bottom: none;
                    }
                    .checkbox {
                        width: 15px;
                        height: 15px;
                        border: 1px solid #333;
                        display: inline-block;
                        margin-right: 10px;
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                ${groceryHTML}
                <div class="no-print" style="text-align: center; margin-top: 30px;">
                    <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px;">Print as PDF</button>
                    <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; margin-left: 10px;">Close</button>
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Auto-trigger print dialog after a short delay
        setTimeout(() => {
            printWindow.print();
        }, 500);
        
        this.showNotification('Grocery list opened for PDF export!', 'success');
    }

    exportViaEmail() {
        const groceryItems = this.generateGroceryItems();
        const text = this.formatGroceryListForExport(groceryItems);
        const subject = `Grocery List - ${this.formatDate(this.currentWeek)}`;
        const body = encodeURIComponent(text);
        
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Try to open email client
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.click();
        
        this.showNotification('Email client opened with grocery list!', 'success');
    }

    generateGroceryListHTML() {
        const weekStart = this.formatDate(this.currentWeek);
        const weekEnd = this.formatDate(new Date(this.currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000));
        const groceryItems = this.generateGroceryItems();
        const groupedItems = this.groupItemsByCategory(groceryItems);
        
        let html = `
            <div class="header">
                <h1>Grocery List</h1>
                <p>Week of ${weekStart} - ${weekEnd}</p>
                <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
        `;
        
        for (const [category, items] of Object.entries(groupedItems)) {
            html += `
                <div class="category">
                    <div class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
            `;
            
            items.forEach(item => {
                html += `
                    <div class="item">
                        <div>
                            <span class="checkbox"></span>
                            ${item.name}
                        </div>
                        <div>${item.quantity} ${item.unit}</div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        return html;
    }

    printGroceryList() {
        const groceryItems = this.generateGroceryItems();
        const printContent = this.formatGroceryListForPrint(groceryItems);
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
        
        this.showNotification('Opening print dialog...', 'info');
    }

    formatGroceryListForExport(items) {
        const grouped = this.groupItemsByCategory(items);
        let text = `Grocery List - Week of ${this.currentWeek.toLocaleDateString()}\n`;
        text += '=' .repeat(50) + '\n\n';
        
        Object.entries(grouped).forEach(([category, categoryItems]) => {
            text += `${category.toUpperCase()}\n`;
            text += '-'.repeat(category.length) + '\n';
            categoryItems.forEach(item => {
                text += `☐ ${item.name} - ${item.adjusted_quantity} ${item.unit}\n`;
            });
            text += '\n';
        });
        
        return text;
    }

    formatGroceryListForPrint(items) {
        const grouped = this.groupItemsByCategory(items);
        let html = `
            <html>
            <head>
                <title>Grocery List</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #333; border-bottom: 2px solid #333; }
                    h2 { color: #666; margin-top: 20px; }
                    .item { margin: 5px 0; }
                    .checkbox { margin-right: 10px; }
                </style>
            </head>
            <body>
                <h1>Grocery List - Week of ${this.currentWeek.toLocaleDateString()}</h1>
        `;
        
        Object.entries(grouped).forEach(([category, categoryItems]) => {
            html += `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
            categoryItems.forEach(item => {
                html += `<div class="item">☐ ${item.name} - ${item.adjusted_quantity} ${item.unit}</div>`;
            });
        });
        
        html += '</body></html>';
        return html;
    }

    managePantry() {
        this.showNotification('Pantry management would open here', 'info');
    }

    toggleGroceryItem(itemId, checked) {
        console.log(`Toggling grocery item ${itemId}: ${checked}`);
        // In real app, this would update the database
        this.showNotification(checked ? 'Item checked off' : 'Item unchecked', 'info');
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

    async clearAllData() {
        console.log('🗑️ Clearing all grocery list data...');
        this.groceryList = [];
        
        // Clear from localStorage
        localStorage.removeItem('mealplanner_grocery_list');
        
        // Re-render to show empty state
        this.render();
        
        console.log('✅ All grocery list data cleared');
    }
}

// Global registry for grocery list manager
window.groceryListManager = null;
