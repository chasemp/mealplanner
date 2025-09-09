// Grocery List Management Component
class GroceryListManager {
    constructor(container) {
        this.container = container;
        this.groceryLists = [];
        this.currentList = null;
        this.pantryItems = [];
        this.scheduledMeals = [];
        this.recipes = [];
        this.ingredients = [];
        this.currentWeek = this.getCurrentWeek();
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
        await this.loadIngredients();
        await this.loadRecipes();
        await this.loadScheduledMeals();
        await this.loadPantryItems();
        await this.loadGroceryLists();
    }

    async loadIngredients() {
        // Check database source setting
        const shouldLoadDemo = window.mealPlannerSettings?.shouldLoadDemoData() ?? true;
        const currentSource = window.mealPlannerSettings?.getCurrentDatabaseSource() ?? 'demo';
        
        console.log(`📊 Grocery List Manager - Database source: ${currentSource}, should load demo: ${shouldLoadDemo}`);
        
        // Only load demo data if database source is 'demo'
        if (shouldLoadDemo && window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.ingredients = demoData.getIngredients();
            console.log(`✅ Grocery List Manager loaded ${this.ingredients.length} consistent ingredients from demo data`);
        } else {
            // Use empty array for in-memory or other sources
            this.ingredients = [];
            console.log(`✅ Grocery List Manager initialized with empty ingredients (source: ${currentSource})`);
        }
    }

    async loadRecipes() {
        // Check database source setting
        const shouldLoadDemo = window.mealPlannerSettings?.shouldLoadDemoData() ?? true;
        const currentSource = window.mealPlannerSettings?.getCurrentDatabaseSource() ?? 'demo';
        
        // Only load demo data if database source is 'demo'
        if (shouldLoadDemo && window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.recipes = demoData.getRecipes();
            console.log(`✅ Grocery List Manager loaded ${this.recipes.length} consistent recipes from demo data`);
        } else {
            // Use empty array for in-memory or other sources
            this.recipes = [];
            console.log(`✅ Grocery List Manager initialized with empty recipes (source: ${currentSource})`);
        }
    }

    async loadScheduledMeals() {
        // Load from centralized demo data for consistency
        // Load scheduled meals from app storage (real data) or demo data as fallback
        if (window.app && window.app.getScheduledMeals) {
            this.scheduledMeals = window.app.getScheduledMeals();
            console.log(`✅ Grocery List Manager loaded ${this.scheduledMeals.length} scheduled meals from app storage`);
        } else {
            // Fallback to demo data if app not available
            if (window.DemoDataManager) {
                const demoData = new window.DemoDataManager();
                this.scheduledMeals = demoData.getScheduledMeals();
                console.log(`✅ Grocery List Manager loaded ${this.scheduledMeals.length} scheduled meals from demo data (fallback)`);
            } else {
                this.scheduledMeals = [];
                console.warn('⚠️ No scheduled meals source available');
            }
        }
    }

    async loadPantryItems() {
        this.pantryItems = [
            { ingredient_id: 5, name: 'Salt', quantity: 1, unit: 'container', notes: 'Full container' },
            { ingredient_id: 6, name: 'Black Pepper', quantity: 1, unit: 'container', notes: 'Half full' },
            { ingredient_id: 4, name: 'Olive Oil', quantity: 0.5, unit: 'bottle', notes: 'Nearly empty' }
        ];
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
                        <h3 class="text-lg font-semibold text-gray-900">Grocery Lists</h3>
                        <p class="text-gray-600 text-sm">
                            Generate shopping lists from your meal plans
                        </p>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <select id="week-selector" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
                            ${this.renderWeekOptions()}
                        </select>
                        
                        <!-- Export Actions -->
                        <div class="flex items-center space-x-2">
                            <button id="copy-list-btn" class="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none" title="Copy to clipboard">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                                <span class="hidden sm:inline">Copy</span>
                            </button>
                            
                            <button id="export-list-btn" class="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none" title="Export as file">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span class="hidden sm:inline">Export</span>
                            </button>
                            
                            <button id="share-list-btn" class="btn-primary flex items-center justify-center space-x-2 flex-1 sm:flex-none" title="Share list">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                </svg>
                                <span class="hidden sm:inline">Share</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Week Overview -->
                <div class="bg-white rounded-lg shadow p-6 mb-6">
                    <h4 class="font-semibold text-gray-900 mb-4">This Week's Meals</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${this.renderScheduledMeals()}
                    </div>
                    ${this.scheduledMeals.length === 0 ? `
                        <div class="text-center py-8">
                            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13v13"></path>
                            </svg>
                            <p class="text-gray-500">No meals scheduled for this week</p>
                            <p class="text-sm text-gray-400">Go to meal planning to schedule some meals first</p>
                        </div>
                    ` : ''}
                </div>

                <!-- Grocery List -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Generated List -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow">
                            <div class="p-6 border-b border-gray-200">
                                <div class="flex items-center justify-between">
                                    <h4 class="font-semibold text-gray-900">Shopping List</h4>
                                    <div class="flex items-center space-x-2">
                                        <button id="export-list-btn" class="text-sm text-blue-600 hover:text-blue-800">
                                            Export
                                        </button>
                                        <button id="print-list-btn" class="text-sm text-blue-600 hover:text-blue-800">
                                            Print
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="p-6">
                                ${this.renderGroceryList()}
                            </div>
                        </div>
                    </div>

                    <!-- Pantry Items -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="p-6 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <h4 class="font-semibold text-gray-900">Pantry Items</h4>
                                <button id="manage-pantry-btn" class="text-sm text-blue-600 hover:text-blue-800">
                                    Manage
                                </button>
                            </div>
                        </div>
                        <div class="p-6">
                            ${this.renderPantryItems()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderWeekOptions() {
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
            const recipe = this.recipes.find(r => r.id === meal.recipe_id);
            if (!recipe) return '';

            const date = new Date(meal.scheduled_date);
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
                        ${recipe.ingredients.length} ingredients
                    </div>
                </div>
            `;
        }).join('');
    }

    renderGroceryList() {
        const groceryItems = this.generateGroceryItems();
        
        if (groceryItems.length === 0) {
            return `
                <div class="text-center py-8">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"></path>
                    </svg>
                    <p class="text-gray-500">No grocery list generated</p>
                    <p class="text-sm text-gray-400">Click "Generate List" to create a shopping list from your meal plan</p>
                </div>
            `;
        }

        // Group by category
        const groupedItems = this.groupItemsByCategory(groceryItems);
        
        return Object.entries(groupedItems).map(([category, items]) => `
            <div class="mb-6 last:mb-0">
                <h5 class="font-medium text-gray-900 mb-3 capitalize">${category}</h5>
                <div class="space-y-2">
                    ${items.map(item => `
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <input type="checkbox" 
                                       class="grocery-item-checkbox" 
                                       data-item-id="${item.id}"
                                       ${item.checked ? 'checked' : ''}>
                                <div class="flex-1">
                                    <div class="font-medium text-gray-900 ${item.checked ? 'line-through text-gray-500' : ''}">
                                        ${item.name}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        ${item.quantity} ${item.unit}
                                        ${item.pantry_quantity > 0 ? `
                                            <span class="text-green-600">
                                                (have ${item.pantry_quantity} ${item.pantry_unit})
                                            </span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                ${item.adjusted_quantity !== item.quantity ? `
                                    <div class="text-sm">
                                        <span class="line-through text-gray-400">${item.quantity}</span>
                                        <span class="font-medium text-green-600">${item.adjusted_quantity}</span>
                                    </div>
                                ` : `
                                    <div class="text-sm font-medium">${item.quantity}</div>
                                `}
                                <div class="text-xs text-gray-400">${item.unit}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
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

    generateGroceryItems() {
        const items = [];
        const ingredientTotals = {};

        // Aggregate ingredients from all scheduled meals
        this.scheduledMeals.forEach(meal => {
            const recipe = this.recipes.find(r => r.id === meal.recipe_id);
            if (!recipe) return;

            recipe.ingredients.forEach(ingredient => {
                const key = `${ingredient.ingredient_id}-${ingredient.unit}`;
                if (!ingredientTotals[key]) {
                    // Look up ingredient name from ingredients database
                    const ingredientData = this.ingredients.find(i => i.id === ingredient.ingredient_id);
                    const ingredientName = ingredientData ? ingredientData.name : ingredient.name || 'Unknown Ingredient';
                    
                    ingredientTotals[key] = {
                        ingredient_id: ingredient.ingredient_id,
                        name: ingredientName,
                        quantity: 0,
                        unit: ingredient.unit,
                        category: this.getIngredientCategory(ingredient.ingredient_id)
                    };
                }
                ingredientTotals[key].quantity += ingredient.quantity;
            });
        });

        // Convert to grocery items and adjust for pantry
        Object.values(ingredientTotals).forEach((item, index) => {
            const pantryItem = this.pantryItems.find(p => p.ingredient_id === item.ingredient_id);
            const pantryQuantity = pantryItem ? pantryItem.quantity : 0;
            const adjustedQuantity = Math.max(0, item.quantity - pantryQuantity);

            items.push({
                id: index + 1,
                ingredient_id: item.ingredient_id,
                name: item.name,
                quantity: item.quantity,
                adjusted_quantity: adjustedQuantity,
                unit: item.unit,
                category: item.category,
                pantry_quantity: pantryQuantity,
                pantry_unit: pantryItem ? pantryItem.unit : item.unit,
                checked: false
            });
        });

        return items.filter(item => item.adjusted_quantity > 0);
    }

    getIngredientCategory(ingredientId) {
        const ingredient = this.ingredients.find(i => i.id === ingredientId);
        return ingredient ? ingredient.category : 'other';
    }

    // Generate grocery list from current scheduled meals (called when meals change)
    generateFromScheduledMeals() {
        console.log('🛒 Regenerating grocery list from scheduled meals...');
        
        // Reload scheduled meals from app storage
        this.loadScheduledMeals();
        
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
        // Copy list button
        const copyBtn = this.container.querySelector('#copy-list-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyGroceryList();
            });
        }

        // Export list button
        const exportBtn = this.container.querySelector('#export-list-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportGroceryList();
            });
        }

        // Share list button
        const shareBtn = this.container.querySelector('#share-list-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareGroceryList();
            });
        }

        // Week selector
        const weekSelector = this.container.querySelector('#week-selector');
        if (weekSelector) {
            weekSelector.addEventListener('change', (e) => {
                this.currentWeek = new Date(e.target.value);
                this.loadScheduledMeals().then(() => this.render());
            });
        }

        // Export and print buttons
        const exportBtn2 = this.container.querySelector('#export-list-btn');
        if (exportBtn2) {
            exportBtn2.addEventListener('click', () => {
                this.exportGroceryList();
            });
        }

        const printBtn = this.container.querySelector('#print-list-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                this.printGroceryList();
            });
        }

        // Manage pantry button
        const managePantryBtn = this.container.querySelector('#manage-pantry-btn');
        if (managePantryBtn) {
            managePantryBtn.addEventListener('click', () => {
                this.managePantry();
            });
        }

        // Grocery item checkboxes
        this.container.querySelectorAll('.grocery-item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleGroceryItem(parseInt(e.target.dataset.itemId), e.target.checked);
            });
        });
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
