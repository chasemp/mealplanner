// Pantry Management Component
class PantryManager {
    constructor(container) {
        this.container = container;
        this.pantryItems = [];
        this.ingredients = [];
        this.currentFilter = {
            search: '',
            category: 'all',
            expiring: false
        };
        this.init();
    }

    init() {
        this.loadPantryItems();
        this.loadIngredients();
        this.render();
        this.attachEventListeners();
    }

    loadPantryItems() {
        // Load from localStorage or initialize with demo data
        const stored = localStorage.getItem('mealplanner_pantry_items');
        if (stored) {
            try {
                this.pantryItems = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading pantry items:', error);
                this.pantryItems = this.getDefaultPantryItems();
            }
        } else {
            this.pantryItems = this.getDefaultPantryItems();
        }
    }

    loadIngredients() {
        // Load ingredients from demo data or database
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.ingredients = demoData.getIngredients();
        }
    }

    getDefaultPantryItems() {
        return [
            {
                id: 1,
                ingredient_id: 1,
                name: 'Olive Oil',
                quantity: 1,
                unit: 'bottle',
                category: 'pantry',
                expiration_date: this.addDays(new Date(), 365),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                ingredient_id: 2,
                name: 'Salt',
                quantity: 1,
                unit: 'container',
                category: 'pantry',
                expiration_date: null, // No expiration
                updated_at: new Date().toISOString()
            },
            {
                id: 3,
                ingredient_id: 3,
                name: 'Milk',
                quantity: 1,
                unit: 'gallon',
                category: 'dairy',
                expiration_date: this.addDays(new Date(), 7),
                updated_at: new Date().toISOString()
            }
        ];
    }

    render() {
        if (!this.container) return;

        const filteredItems = this.getFilteredItems();
        const expiringItems = this.getExpiringItems();

        this.container.innerHTML = `
            <div class="pantry-manager">
                <!-- Header -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Pantry Management</h2>
                        <p class="text-gray-600 dark:text-gray-400">Track ingredients you have on hand</p>
                    </div>
                    <button id="add-pantry-item-btn" class="btn-primary flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>Add Item</span>
                    </button>
                </div>

                <!-- Filters -->
                <div class="flex flex-col sm:flex-row gap-4 mb-6">
                    <div class="flex-1">
                        <input type="text" id="pantry-search" placeholder="Search pantry items..." 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               value="${this.currentFilter.search}">
                    </div>
                    <select id="pantry-category" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="all">All Categories</option>
                        <option value="produce" ${this.currentFilter.category === 'produce' ? 'selected' : ''}>Produce</option>
                        <option value="meat" ${this.currentFilter.category === 'meat' ? 'selected' : ''}>Meat</option>
                        <option value="dairy" ${this.currentFilter.category === 'dairy' ? 'selected' : ''}>Dairy</option>
                        <option value="pantry" ${this.currentFilter.category === 'pantry' ? 'selected' : ''}>Pantry</option>
                        <option value="frozen" ${this.currentFilter.category === 'frozen' ? 'selected' : ''}>Frozen</option>
                    </select>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" id="expiring-filter" ${this.currentFilter.expiring ? 'checked' : ''}>
                        <span>Expiring Soon</span>
                    </label>
                </div>

                <!-- Expiring Items Alert -->
                ${expiringItems.length > 0 ? `
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                            <div>
                                <h3 class="text-yellow-800 font-medium">Items Expiring Soon</h3>
                                <p class="text-yellow-700 text-sm">${expiringItems.length} items expire within 3 days</p>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Pantry Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.pantryItems.length}</div>
                        <div class="text-sm text-gray-600">Total Items</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${this.getUniqueCategories().length}</div>
                        <div class="text-sm text-gray-600">Categories</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-orange-600">${expiringItems.length}</div>
                        <div class="text-sm text-gray-600">Expiring Soon</div>
                    </div>
                </div>

                <!-- Pantry Items Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${filteredItems.map(item => this.createPantryItemCard(item)).join('')}
                </div>

                ${filteredItems.length === 0 ? `
                    <div class="text-center py-12">
                        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No pantry items found</h3>
                        <p class="text-gray-600 dark:text-gray-400">Add some items to start tracking your pantry</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    createPantryItemCard(item) {
        const isExpiring = this.isExpiringSoon(item.expiration_date);
        const expirationText = item.expiration_date 
            ? this.formatExpirationDate(item.expiration_date)
            : 'No expiration';

        return `
            <div class="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 ${isExpiring ? 'border-l-4 border-yellow-500' : ''}">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-medium text-gray-900">${item.name}</h3>
                    <div class="flex space-x-1">
                        <button class="edit-pantry-item text-blue-600 hover:text-blue-800" data-item-id="${item.id}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-pantry-item text-red-600 hover:text-red-800" data-item-id="${item.id}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="text-sm text-gray-600 mb-2">
                    <span class="font-medium">${item.quantity} ${item.unit}</span>
                    <span class="mx-2">•</span>
                    <span class="capitalize">${item.category}</span>
                </div>
                
                <div class="text-xs ${isExpiring ? 'text-yellow-700 font-medium' : 'text-gray-500'}">
                    ${expirationText}
                </div>
            </div>
        `;
    }

    getFilteredItems() {
        let filtered = [...this.pantryItems];

        // Filter by search term
        if (this.currentFilter.search) {
            const term = this.currentFilter.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(term)
            );
        }

        // Filter by category
        if (this.currentFilter.category !== 'all') {
            filtered = filtered.filter(item => item.category === this.currentFilter.category);
        }

        // Filter by expiring soon
        if (this.currentFilter.expiring) {
            filtered = filtered.filter(item => this.isExpiringSoon(item.expiration_date));
        }

        return filtered.sort((a, b) => {
            // Sort expiring items first
            const aExpiring = this.isExpiringSoon(a.expiration_date);
            const bExpiring = this.isExpiringSoon(b.expiration_date);
            
            if (aExpiring && !bExpiring) return -1;
            if (!aExpiring && bExpiring) return 1;
            
            return a.name.localeCompare(b.name);
        });
    }

    getExpiringItems() {
        return this.pantryItems.filter(item => this.isExpiringSoon(item.expiration_date));
    }

    getUniqueCategories() {
        return [...new Set(this.pantryItems.map(item => item.category))];
    }

    isExpiringSoon(expirationDate, days = 3) {
        if (!expirationDate) return false;
        
        const expDate = new Date(expirationDate);
        const today = new Date();
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays <= days && diffDays >= 0;
    }

    formatExpirationDate(expirationDate) {
        if (!expirationDate) return 'No expiration';
        
        const expDate = new Date(expirationDate);
        const today = new Date();
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return `Expired ${Math.abs(diffDays)} days ago`;
        } else if (diffDays === 0) {
            return 'Expires today';
        } else if (diffDays === 1) {
            return 'Expires tomorrow';
        } else if (diffDays <= 7) {
            return `Expires in ${diffDays} days`;
        } else {
            return `Expires ${expDate.toLocaleDateString()}`;
        }
    }

    attachEventListeners() {
        // Search functionality
        const searchInput = this.container.querySelector('#pantry-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter.search = e.target.value;
                this.render();
            });
        }

        // Category filter
        const categorySelect = this.container.querySelector('#pantry-category');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.currentFilter.category = e.target.value;
                this.render();
            });
        }

        // Expiring filter
        const expiringFilter = this.container.querySelector('#expiring-filter');
        if (expiringFilter) {
            expiringFilter.addEventListener('change', (e) => {
                this.currentFilter.expiring = e.target.checked;
                this.render();
            });
        }

        // Add item button
        const addBtn = this.container.querySelector('#add-pantry-item-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showPantryItemForm();
            });
        }

        // Edit and delete buttons
        this.container.querySelectorAll('.edit-pantry-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.itemId);
                this.editPantryItem(itemId);
            });
        });

        this.container.querySelectorAll('.delete-pantry-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.itemId);
                this.deletePantryItem(itemId);
            });
        });
    }

    showPantryItemForm(item = null) {
        const isEdit = !!item;
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    ${isEdit ? 'Edit' : 'Add'} Pantry Item
                </h3>
                
                <form id="pantry-item-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ingredient Name
                        </label>
                        <input type="text" id="item-name" required
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                               value="${item ? item.name : ''}"
                               placeholder="Enter ingredient name">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Quantity
                            </label>
                            <input type="number" id="item-quantity" required min="0" step="0.1"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value="${item ? item.quantity : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Unit
                            </label>
                            <select id="item-unit" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select unit</option>
                                <option value="pieces" ${item && item.unit === 'pieces' ? 'selected' : ''}>Pieces</option>
                                <option value="lbs" ${item && item.unit === 'lbs' ? 'selected' : ''}>Pounds</option>
                                <option value="oz" ${item && item.unit === 'oz' ? 'selected' : ''}>Ounces</option>
                                <option value="cups" ${item && item.unit === 'cups' ? 'selected' : ''}>Cups</option>
                                <option value="tbsp" ${item && item.unit === 'tbsp' ? 'selected' : ''}>Tablespoons</option>
                                <option value="tsp" ${item && item.unit === 'tsp' ? 'selected' : ''}>Teaspoons</option>
                                <option value="gallons" ${item && item.unit === 'gallons' ? 'selected' : ''}>Gallons</option>
                                <option value="bottles" ${item && item.unit === 'bottles' ? 'selected' : ''}>Bottles</option>
                                <option value="containers" ${item && item.unit === 'containers' ? 'selected' : ''}>Containers</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category
                        </label>
                        <select id="item-category" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select category</option>
                            <option value="produce" ${item && item.category === 'produce' ? 'selected' : ''}>Produce</option>
                            <option value="meat" ${item && item.category === 'meat' ? 'selected' : ''}>Meat</option>
                            <option value="dairy" ${item && item.category === 'dairy' ? 'selected' : ''}>Dairy</option>
                            <option value="pantry" ${item && item.category === 'pantry' ? 'selected' : ''}>Pantry</option>
                            <option value="frozen" ${item && item.category === 'frozen' ? 'selected' : ''}>Frozen</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiration Date (Optional)
                        </label>
                        <input type="date" id="item-expiration"
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                               value="${item && item.expiration_date ? item.expiration_date.split('T')[0] : ''}">
                    </div>
                    
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            ${isEdit ? 'Update' : 'Add'} Item
                        </button>
                        <button type="button" id="cancel-btn" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        const form = modal.querySelector('#pantry-item-form');
        const cancelBtn = modal.querySelector('#cancel-btn');

        const closeModal = () => {
            modal.remove();
        };

        cancelBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: form.querySelector('#item-name').value,
                quantity: parseFloat(form.querySelector('#item-quantity').value),
                unit: form.querySelector('#item-unit').value,
                category: form.querySelector('#item-category').value,
                expiration_date: form.querySelector('#item-expiration').value || null
            };

            if (isEdit) {
                this.updatePantryItem(item.id, formData);
            } else {
                this.addPantryItem(formData);
            }

            closeModal();
        });
    }

    addPantryItem(itemData) {
        const newItem = {
            id: this.generateId(),
            ingredient_id: this.findIngredientId(itemData.name),
            ...itemData,
            updated_at: new Date().toISOString()
        };

        this.pantryItems.push(newItem);
        this.savePantryItems();
        this.render();
        
        console.log('Added pantry item:', newItem.name);
    }

    updatePantryItem(itemId, itemData) {
        const index = this.pantryItems.findIndex(item => item.id === itemId);
        if (index !== -1) {
            this.pantryItems[index] = {
                ...this.pantryItems[index],
                ...itemData,
                updated_at: new Date().toISOString()
            };
            
            this.savePantryItems();
            this.render();
            
            console.log('Updated pantry item:', this.pantryItems[index].name);
        }
    }

    editPantryItem(itemId) {
        const item = this.pantryItems.find(item => item.id === itemId);
        if (item) {
            this.showPantryItemForm(item);
        }
    }

    deletePantryItem(itemId) {
        const item = this.pantryItems.find(item => item.id === itemId);
        if (item && confirm(`Are you sure you want to remove "${item.name}" from your pantry?`)) {
            this.pantryItems = this.pantryItems.filter(item => item.id !== itemId);
            this.savePantryItems();
            this.render();
            
            console.log('Deleted pantry item:', item.name);
        }
    }

    generateId() {
        return this.pantryItems.length > 0 ? Math.max(...this.pantryItems.map(item => item.id)) + 1 : 1;
    }

    findIngredientId(name) {
        const ingredient = this.ingredients.find(ing => 
            ing.name.toLowerCase() === name.toLowerCase()
        );
        return ingredient ? ingredient.id : null;
    }

    savePantryItems() {
        try {
            localStorage.setItem('mealplanner_pantry_items', JSON.stringify(this.pantryItems));
        } catch (error) {
            console.error('Error saving pantry items:', error);
        }
    }

    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString();
    }

    // Public API for other components
    getPantryItems() {
        return this.pantryItems;
    }

    getAvailableQuantity(ingredientId) {
        const pantryItem = this.pantryItems.find(item => item.ingredient_id === ingredientId);
        return pantryItem ? pantryItem.quantity : 0;
    }

    consumeIngredient(ingredientId, quantity) {
        const pantryItem = this.pantryItems.find(item => item.ingredient_id === ingredientId);
        if (pantryItem && pantryItem.quantity >= quantity) {
            pantryItem.quantity -= quantity;
            pantryItem.updated_at = new Date().toISOString();
            
            // Remove item if quantity reaches zero
            if (pantryItem.quantity <= 0) {
                this.pantryItems = this.pantryItems.filter(item => item.id !== pantryItem.id);
            }
            
            this.savePantryItems();
            return true;
        }
        return false;
    }
}
