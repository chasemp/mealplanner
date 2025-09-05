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
        // Load from centralized demo data for consistency
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.ingredients = demoData.getIngredients();
            console.log(`✅ Grocery List Manager loaded ${this.ingredients.length} consistent ingredients from demo data`);
        } else {
            // Fallback to empty array if demo data not available
            this.ingredients = [];
            console.warn('⚠️ Demo data manager not available, using empty ingredients list');
        }
    }

    async loadRecipes() {
        // Load from centralized demo data for consistency
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.recipes = demoData.getRecipes();
            console.log(`✅ Grocery List Manager loaded ${this.recipes.length} consistent recipes from demo data`);
        } else {
            // Fallback to empty array if demo data not available
            this.recipes = [];
            console.warn('⚠️ Demo data manager not available, using empty recipes list');
        }
    }

    async loadScheduledMeals() {
        // Load from centralized demo data for consistency
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.scheduledMeals = demoData.getScheduledMeals();
            console.log(`✅ Grocery List Manager loaded ${this.scheduledMeals.length} consistent scheduled meals from demo data`);
        } else {
            // Fallback to empty array if demo data not available
            this.scheduledMeals = [];
            console.warn('⚠️ Demo data manager not available, using empty scheduled meals list');
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
                    ingredientTotals[key] = {
                        ingredient_id: ingredient.ingredient_id,
                        name: ingredient.name,
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
        const exportBtn = this.container.querySelector('#export-list-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
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
        
        this.showNotification('Grocery list exported!', 'success');
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
}

// Global registry for grocery list manager
window.groceryListManager = null;
