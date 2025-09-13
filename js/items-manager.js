// Items Management Component
class ItemsManager {
    constructor(container) {
        this.container = container;
        this.items = [];
        this.filteredIngredients = [];
        this.currentFilter = { search: '', category: '', label: '' };
        // Initialize navigation stack for complex page navigation like RecipeManager
        this.navigationStack = [];
        this.init();
    }

    async init() {
        console.log('🥕 Initializing Items Manager...');
        await this.loadItems();
        this.render();
        this.attachEventListeners();
    }

    async loadItems() {
        console.log('📱 Loading items from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            this.items = window.mealPlannerSettings.getAuthoritativeData('items');
            console.log(`✅ Items Manager loaded ${this.items.length} items from authoritative source`);
            if (this.items.length > 0) {
                console.log('📱 First item:', this.items[0]);
            }
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty items');
            this.items = [];
        }
        
        console.log('📱 Final items count:', this.items.length);
        this.applyFilters();
    }

    applyFilters() {
        console.log('🔍 Applying filters:', this.currentFilter);
        console.log('📦 Total items:', this.items.length);
        
        this.filteredIngredients = this.items.filter(item => {
            const matchesSearch = !this.currentFilter.search || 
                item.name.toLowerCase().includes(this.currentFilter.search.toLowerCase());
            const matchesCategory = !this.currentFilter.category || 
                item.category === this.currentFilter.category;
            const matchesLabel = !this.currentFilter.label || 
                (item.labels && Array.isArray(item.labels) && item.labels.includes(this.currentFilter.label));
            
            const matches = matchesSearch && matchesCategory && matchesLabel;
            
            if (this.currentFilter.search) {
                console.log(`🔍 "${item.name}" matches search "${this.currentFilter.search}": ${matchesSearch}`);
            }
            
            return matches;
        });
        
        console.log('✅ Filtered items:', this.filteredIngredients.length);
    }

    getAllLabels() {
        const allLabels = new Set();
        this.items.forEach(item => {
            if (item.labels && Array.isArray(item.labels)) {
                item.labels.forEach(label => allLabels.add(label));
            }
        });
        return Array.from(allLabels).sort();
    }

    render() {
        const categories = [...new Set(this.items.map(i => i.category))];
        
        this.container.innerHTML = `
            <div class="space-y-6">
                <!-- Header with controls -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Items</h2>
                    <div class="flex flex-wrap gap-3">
                        <button id="add-item-btn" class="btn-primary flex items-center space-x-2">
                            <span>Add Item</span>
                            <span>🥕</span>
                        </button>
                    </div>
                </div>

                <!-- Search and Filter Controls -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label for="item-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Items
                            </label>
                            <input type="text" id="item-search" 
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   placeholder="Search by name..."
                                   value="${this.currentFilter.search}">
                        </div>
                        
                        <div>
                            <label for="category-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Category
                            </label>
                            <select id="category-filter" 
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="">All Categories</option>
                                ${categories.map(cat => `
                                    <option value="${cat}" ${this.currentFilter.category === cat ? 'selected' : ''}>
                                        ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div>
                            <label for="item-label-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Label
                            </label>
                            <select id="item-label-filter" 
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="">All Labels</option>
                                ${this.getAllLabels().map(label => `
                                    <option value="${label}" ${this.currentFilter.label === label ? 'selected' : ''}>
                                        ${label}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div class="flex items-end">
                            <button id="clear-filters-btn" class="btn-secondary w-full">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Items Stats -->
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

                <!-- Items Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.filteredIngredients.length > 0 ? 
                        this.filteredIngredients.map(item => this.createItemCard(item)).join('') :
                        '<div class="col-span-full text-center py-12"><p class="text-gray-500 dark:text-gray-400">No items found matching your criteria.</p></div>'
                    }
                </div>
            </div>
            
            <!-- Barcode Scanner Modal -->
            <div id="barcode-scanner-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Scan Barcode</h3>
                        <button id="close-scanner-btn" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div id="scanner-content">
                        <div id="scanner-status" class="text-center mb-4">
                            <p class="text-gray-600 dark:text-gray-400">Click "Start Scanning" to begin</p>
                        </div>
                        
                        <div id="camera-container" class="relative bg-black rounded-lg overflow-hidden mb-4 hidden" style="aspect-ratio: 4/3;">
                            <video id="scanner-video" class="w-full h-full object-cover" autoplay muted playsinline></video>
                            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div class="border-2 border-blue-500 w-48 h-32 rounded-lg opacity-70"></div>
                            </div>
                        </div>
                        
                        <div class="flex gap-2">
                            <button id="start-scanner-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                                Start Scanning
                            </button>
                            <button id="stop-scanner-btn" class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors hidden">
                                Stop Scanning
                            </button>
                        </div>
                        
                        <div id="scanner-error" class="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hidden">
                            <p class="text-sm"></p>
                        </div>
                        
                        <div id="scanner-result" class="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hidden">
                            <p class="text-sm font-medium">Barcode detected!</p>
                            <p id="barcode-value" class="text-xs mt-1"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Re-attach event listeners after rendering (critical for static PWAs)
        this.attachEventListeners();
        
        // Initialize barcode scanner
        this.initializeBarcodeScanner();
    }

    async initializeBarcodeScanner() {
        if (typeof window.BarcodeScanner === 'undefined') {
            console.warn('⚠️ BarcodeScanner not available');
            return;
        }

        this.barcodeScanner = new window.BarcodeScanner();
        this.productDatabase = new window.ProductDatabase();
        
        const supported = window.BarcodeScanner.isSupported();
        console.log('📱 Barcode scanner support:', supported);
        
        if (!supported.supported) {
            // Hide scan button if not supported
            const scanBtn = document.getElementById('scan-barcode-btn');
            if (scanBtn) {
                scanBtn.style.display = 'none';
            }
        }
    }

    createItemCard(item) {
        const nutrition = typeof item.nutrition_per_100g === 'string' ? 
            JSON.parse(item.nutrition_per_100g) : item.nutrition_per_100g;
        
        // Calculate recipe usage
        const recipeUsage = this.getItemRecipeUsage(item.id);
        
        return `
            <div class="item-card bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow p-6" data-item-id="${item.id}">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${item.name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">${item.category}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button class="edit-item text-blue-600 hover:text-blue-800 p-1" data-item-id="${item.id}" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-item text-red-600 hover:text-red-800 p-1" data-item-id="${item.id}" title="Delete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Default Unit:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${item.default_unit}</span>
                    </div>
                    
                    
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Used in Recipes:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${item.recipe_count || 0}</span>
                    </div>
                    
                    ${nutrition && nutrition.calories ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Nutrition per 100g:</p>
                            <div class="grid grid-cols-2 gap-2 text-xs">
                                <div>Calories: ${nutrition.calories}</div>
                                <div>Protein: ${nutrition.protein}g</div>
                                <div>Carbs: ${nutrition.carbs}g</div>
                                <div>Fat: ${nutrition.fat}g</div>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${item.storage_notes ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Storage:</p>
                            <p class="text-xs text-gray-700 dark:text-gray-300">${item.storage_notes}</p>
                        </div>
                    ` : ''}
                    
                    ${recipeUsage.recipes.length > 0 ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Used in ${recipeUsage.recipes.length} recipe${recipeUsage.recipes.length !== 1 ? 's' : ''}:</p>
                            <div class="space-y-1">
                                ${recipeUsage.recipes.slice(0, 3).map(usage => `
                                    <div class="flex justify-between items-center text-xs">
                                        <span class="text-gray-700 dark:text-gray-300 truncate">${usage.recipeName}</span>
                                        <span class="text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">${usage.quantity} ${usage.unit}</span>
                                    </div>
                                `).join('')}
                                ${recipeUsage.recipes.length > 3 ? `
                                    <div class="text-xs text-blue-600 dark:text-blue-400">
                                        +${recipeUsage.recipes.length - 3} more recipes
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    ` : `
                        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-xs text-gray-500 dark:text-gray-400">Not used in any recipes yet</p>
                        </div>
                    `}
                    
                    <!-- Labels Section -->
                    ${item.labels && Array.isArray(item.labels) && item.labels.length > 0 ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Labels:</p>
                            <div class="flex flex-wrap gap-1">
                                ${item.labels.map(label => `
                                    <span class="item-label inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-green-200 dark:hover:bg-green-800 transition-colors" data-label="${label}">
                                        ${label}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getActiveIngredients() {
        return this.items.filter(i => (i.recipe_count || 0) > 0).length;
    }

    getTotalIngredients() {
        return this.items.length;
    }

    getItemRecipeUsage(itemId) {
        const recipes = [];
        
        // Get recipes from authoritative data source
        const allRecipes = window.mealPlannerSettings?.getAuthoritativeData('recipes') || [];
        
        if (!window.mealPlannerSettings) {
            console.error('❌ Settings manager not available - cannot get recipes');
            return recipes;
        }
        
        // Find recipes that use this item
        allRecipes.forEach(recipe => {
            if (recipe.items && Array.isArray(recipe.items)) {
                const itemUsage = recipe.items.find(ing => {
                    // Match by ID or name (for flexibility)
                    return ing.item_id === itemId || 
                           (ing.name && ing.name.toLowerCase() === this.getIngredientName(itemId).toLowerCase());
                });
                
                if (itemUsage) {
                    recipes.push({
                        recipeId: recipe.id,
                        recipeName: recipe.title || recipe.name,
                        quantity: itemUsage.quantity || 0,
                        unit: itemUsage.unit || 'units',
                        mealType: recipe.meal_type || 'unknown'
                    });
                }
            }
        });
        
        return {
            recipes: recipes,
            totalRecipes: recipes.length,
            totalQuantityNeeded: recipes.reduce((sum, r) => sum + (parseFloat(r.quantity) || 0), 0)
        };
    }

    getIngredientName(itemId) {
        const item = this.items.find(ing => ing.id === itemId);
        return item ? item.name : '';
    }

    attachEventListeners() {
        // Search input with debouncing
        const searchInput = this.container.querySelector('#item-search');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                // Clear previous timeout
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }
                
                // Set new timeout for debounced search
                searchTimeout = setTimeout(() => {
                    this.currentFilter.search = e.target.value;
                    this.applyFilters();
                    this.render();
                }, 300); // 300ms delay
            });
        }

        // Category filter
        const categoryFilter = this.container.querySelector('#category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilter.category = e.target.value;
                this.applyFilters();
                this.render();
            });
        }

        // Label filter
        const labelFilter = this.container.querySelector('#item-label-filter');
        if (labelFilter) {
            labelFilter.addEventListener('change', (e) => {
                this.currentFilter.label = e.target.value;
                this.applyFilters();
                this.render();
            });
        }

        // Clickable labels
        this.container.querySelectorAll('.item-label').forEach(labelSpan => {
            labelSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                const label = labelSpan.dataset.label;
                this.currentFilter.label = label;
                this.applyFilters();
                this.render();
            });
        });

        // Clear filters with centralized logic
        const clearFiltersBtn = this.container.querySelector('#clear-filters-btn');
        if (clearFiltersBtn) {
            const clearCallback = () => {
                // Clear all filters logic (without confirmation/double press - that's handled by the centralized handler)
                this.currentFilter = { search: '', category: '', label: '' };
                this.applyFilters();
                this.render();
            };
            
            // Use settings manager for clear filters with fallback
            const clearHandler = (window.mealPlannerSettings?.createClearFiltersHandler || 
                                window.settingsManager?.createClearFiltersHandler || 
                                ((callback) => callback))
                                (clearCallback, '#clear-filters-btn', this);
            
            clearFiltersBtn.addEventListener('click', clearHandler);
        }

        // Add item button
        const addBtn = this.container.querySelector('#add-item-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showItemForm();
            });
        }

        // Edit item buttons
        this.container.querySelectorAll('.edit-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.itemId);
                this.editItem(itemId);
            });
        });

        // Delete item buttons
        this.container.querySelectorAll('.delete-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.itemId);
                this.deleteItem(itemId);
            });
        });
    }

    showItemForm(item = null, onSaveCallback = null, onCancelCallback = null) {
        console.log('Opening item form...', item ? 'Edit mode' : 'Add mode');
        
        // Use full-page form for consistency across desktop and mobile
        this.showFullPageItemForm(item, onSaveCallback, onCancelCallback);
    }

    showFullPageItemForm(item = null, onSaveCallback = null, onCancelCallback = null) {
        console.log('🥕 showFullPageItemForm called', { item, hasCallback: !!onSaveCallback, hasCancelCallback: !!onCancelCallback });
        console.log('🥕 ItemsManager container:', this.container);
        
        const isEdit = item !== null;
        
        // Store current view in navigation stack for restoration (like RecipeManager)
        if (!this.navigationStack) {
            this.navigationStack = [];
        }
        
        const currentView = {
            container: this.container.innerHTML,
            scrollPosition: window.scrollY
        };
        
        this.navigationStack.push(currentView);
        this.onSaveCallback = onSaveCallback;
        this.onCancelCallback = onCancelCallback;
        
        console.log('🥕 Pushed to navigation stack, stack size:', this.navigationStack.length);
        console.log('🥕 Current view container length:', currentView.container.length);
        
        // Generate full-page form HTML
        console.log('🥕 Setting container innerHTML...');
        this.container.innerHTML = this.generateFullPageItemFormHTML(item);
        console.log('🥕 Container innerHTML set, new length:', this.container.innerHTML.length);
        
        // Attach event listeners
        console.log('🥕 Attaching form listeners...');
        this.attachFullPageItemFormListeners(item);
        
        // Focus on name input
        setTimeout(() => {
            const nameInput = document.querySelector('#item-name');
            if (nameInput) nameInput.focus();
        }, 100);
    }

    generateFullPageItemFormHTML(item = null) {
        const isEdit = item !== null;
        
        return `
            <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
                <!-- Header -->
                <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div class="max-w-4xl mx-auto px-4 py-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <button id="back-to-items" class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    ${isEdit ? 'Edit Item' : 'Add New Item'}
                                </h1>
                            </div>
                            <div class="flex items-center space-x-3">
                                <button type="button" id="cancel-fullpage-item-form" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-4 py-2 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" form="fullpage-item-form" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
                                    ${isEdit ? 'Update Item' : 'Save Item'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Content -->
                <div class="max-w-4xl mx-auto px-4 py-6">
                    <form id="fullpage-item-form" class="space-y-6">
                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label for="item-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Item Name *
                                    </label>
                                    <input type="text" id="item-name" name="name" required
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                           placeholder="Enter item name"
                                           value="${isEdit ? item.name || '' : ''}">
                                </div>
                                
                                <div>
                                    <label for="item-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Category
                                    </label>
                                    <select id="item-category" name="category"
                                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                        <option value="">Select category</option>
                                        <option value="produce" ${isEdit && item.category === 'produce' ? 'selected' : ''}>Produce</option>
                                        <option value="dairy" ${isEdit && item.category === 'dairy' ? 'selected' : ''}>Dairy</option>
                                        <option value="meat" ${isEdit && item.category === 'meat' ? 'selected' : ''}>Meat & Poultry</option>
                                        <option value="seafood" ${isEdit && item.category === 'seafood' ? 'selected' : ''}>Seafood</option>
                                        <option value="pantry" ${isEdit && item.category === 'pantry' ? 'selected' : ''}>Pantry</option>
                                        <option value="spices" ${isEdit && item.category === 'spices' ? 'selected' : ''}>Spices & Herbs</option>
                                        <option value="beverages" ${isEdit && item.category === 'beverages' ? 'selected' : ''}>Beverages</option>
                                        <option value="frozen" ${isEdit && item.category === 'frozen' ? 'selected' : ''}>Frozen</option>
                                        <option value="bakery" ${isEdit && item.category === 'bakery' ? 'selected' : ''}>Bakery</option>
                                        <option value="other" ${isEdit && item.category === 'other' ? 'selected' : ''}>Other</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label for="item-default-unit" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Default Unit
                                    </label>
                                    <select id="item-default-unit" name="default_unit"
                                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                        <option value="">Select unit</option>
                                        <option value="pieces" ${isEdit && item.default_unit === 'pieces' ? 'selected' : ''}>Pieces</option>
                                        <option value="cups" ${isEdit && item.default_unit === 'cups' ? 'selected' : ''}>Cups</option>
                                        <option value="tablespoons" ${isEdit && item.default_unit === 'tablespoons' ? 'selected' : ''}>Tablespoons</option>
                                        <option value="teaspoons" ${isEdit && item.default_unit === 'teaspoons' ? 'selected' : ''}>Teaspoons</option>
                                        <option value="pounds" ${isEdit && item.default_unit === 'pounds' ? 'selected' : ''}>Pounds</option>
                                        <option value="ounces" ${isEdit && item.default_unit === 'ounces' ? 'selected' : ''}>Ounces</option>
                                        <option value="grams" ${isEdit && item.default_unit === 'grams' ? 'selected' : ''}>Grams</option>
                                        <option value="kilograms" ${isEdit && item.default_unit === 'kilograms' ? 'selected' : ''}>Kilograms</option>
                                        <option value="liters" ${isEdit && item.default_unit === 'liters' ? 'selected' : ''}>Liters</option>
                                        <option value="milliliters" ${isEdit && item.default_unit === 'milliliters' ? 'selected' : ''}>Milliliters</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Nutrition Information (Optional) -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nutrition Information (per 100g)</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label for="nutrition-calories" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Calories
                                    </label>
                                    <input type="number" id="nutrition-calories" name="calories" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                           placeholder="0.0"
                                           value="${isEdit && item.nutrition_per_100g?.calories ? item.nutrition_per_100g.calories : ''}">
                                </div>
                                
                                <div>
                                    <label for="nutrition-protein" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Protein (g)
                                    </label>
                                    <input type="number" id="nutrition-protein" name="protein" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                           placeholder="0.0"
                                           value="${isEdit && item.nutrition_per_100g?.protein ? item.nutrition_per_100g.protein : ''}">
                                </div>
                                
                                <div>
                                    <label for="nutrition-carbs" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Carbs (g)
                                    </label>
                                    <input type="number" id="nutrition-carbs" name="carbs" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                           placeholder="0.0"
                                           value="${isEdit && item.nutrition_per_100g?.carbs ? item.nutrition_per_100g.carbs : ''}">
                                </div>
                                
                                <div>
                                    <label for="nutrition-fat" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Fat (g)
                                    </label>
                                    <input type="number" id="nutrition-fat" name="fat" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                           placeholder="0.0"
                                           value="${isEdit && item.nutrition_per_100g?.fat ? item.nutrition_per_100g.fat : ''}">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    attachSharedItemFormListeners(item, config) {
        const form = document.querySelector(config.form);
        const backBtn = document.querySelector(config.backBtn);
        const cancelBtn = document.querySelector(config.cancelBtn);
        const closeBtn = config.closeBtn ? document.querySelector(config.closeBtn) : null;

        if (!form) {
            console.warn('Ingredient form not found:', config.form);
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
            if (hasUnsavedChanges) {
                const confirmed = confirm('You have unsaved changes. Are you sure you want to cancel?');
                if (!confirmed) {
                    return; // Don't close if user cancels
                }
            }
            
            // If we have a cancel callback (came from recipe form), use it
            if (this.onCancelCallback) {
                console.log('🥕 Using cancel callback to return to recipe form');
                this.onCancelCallback();
                this.onCancelCallback = null;
                this.onSaveCallback = null;
                return;
            }
            
            if (config.isFullPage) {
                // Full-page form: restore previous view (items tab)
                // Return to previous view using navigation stack
                this.returnFromItemForm();
            } else {
                // Modal form: remove modal
                const modal = form.closest('.fixed');
                modal?.remove();
            }
            
            // Clear callbacks
            this.onSaveCallback = null;
            this.onCancelCallback = null;
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

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (config.isFullPage) {
                this.handleFullPageItemFormSubmit(form, item);
            } else {
                this.handleItemFormSubmit(form, item);
            }
        });
    }

    attachFullPageItemFormListeners(item) {
        // Use shared form logic with full-page specific selectors
        this.attachSharedItemFormListeners(item, {
            form: '#fullpage-item-form',
            backBtn: '#back-to-items',
            cancelBtn: '#cancel-fullpage-item-form',
            isFullPage: true
        });
    }

    async handleFullPageItemFormSubmit(form, existingItem) {
        console.log('🔥 DEBUG: handleFullPageItemFormSubmit called!');
        try {
            const formData = new FormData(form);
            
            const itemData = {
                name: formData.get('name').trim(),
                category: formData.get('category'),
                default_unit: formData.get('default_unit'),
                storage_notes: formData.get('storage_notes')?.trim() || null,
                nutrition_per_100g: {
                    calories: parseInt(formData.get('calories')) || null,
                    protein: parseFloat(formData.get('protein')) || null,
                    carbs: parseFloat(formData.get('carbs')) || null,
                    fat: parseFloat(formData.get('fat')) || null
                }
            };

            // Validate required fields
            if (!itemData.name) {
                this.showNotification('Ingredient name is required', 'error');
                return;
            }

            if (!itemData.category) {
                this.showNotification('Category is required', 'error');
                return;
            }

            if (!itemData.default_unit) {
                this.showNotification('Default unit is required', 'error');
                return;
            }

            // Check for duplicate names (excluding current item when editing)
            const duplicateIngredient = this.items.find(ing => 
                ing.name.toLowerCase() === itemData.name.toLowerCase() && 
                (!existingItem || ing.id !== existingItem.id)
            );

            if (duplicateIngredient) {
                this.showNotification('An ingredient with this name already exists', 'error');
                return;
            }

            let savedIngredient;
            if (existingItem) {
                // Update existing item
                itemData.id = existingItem.id;
                const index = this.items.findIndex(ing => ing.id === existingItem.id);
                if (index !== -1) {
                    this.items[index] = { ...this.items[index], ...itemData };
                    savedIngredient = this.items[index];
                }
            } else {
                // Add new item
                itemData.id = Math.max(0, ...this.items.map(ing => ing.id)) + 1;
                itemData.recipe_count = 0;
                itemData.avg_quantity = 0;
                this.items.push(itemData);
                savedIngredient = itemData;
            }

            // Save to persistent storage
            this.saveItems();
            
            // Reload data from authoritative source to ensure consistency
            await this.loadItems();

            // Show success notification
            if (existingItem) {
                this.showNotification(`"${savedIngredient.name}" has been updated!`, 'success');
            } else {
                this.showNotification(`"${savedIngredient.name}" has been added to your ingredients!`, 'success');
            }

            // Call the callback if provided (e.g., to add to recipe)
            if (this.onSaveCallback && savedIngredient) {
                this.onSaveCallback(savedIngredient);
            }

            // Go back to previous view using navigation stack
            console.log('🔥 DEBUG: About to call returnFromItemForm');
            this.returnFromItemForm();
            console.log('🔥 DEBUG: returnFromItemForm completed');
            
            // Clear callback
            this.onSaveCallback = null;
        } catch (error) {
            console.error('Error saving item:', error);
            this.showNotification('Error saving item. Please try again.', 'error');
        }
    }

    attachItemFormListeners(modal, item) {
        // Use shared form logic with modal specific selectors
        this.attachSharedItemFormListeners(item, {
            form: '#item-form',
            closeBtn: '#close-item-form',
            cancelBtn: '#cancel-item-form',
            isFullPage: false
        });
    }

    async handleItemFormSubmit(form, existingItem) {
        try {
            // Collect form data
            const formData = new FormData(form);
            const itemData = {
                name: formData.get('name').trim(),
                category: formData.get('category'),
                default_unit: formData.get('default_unit'),
                storage_notes: formData.get('storage_notes').trim() || null,
                nutrition_per_100g: {
                    calories: parseInt(formData.get('calories')) || null,
                    protein: parseFloat(formData.get('protein')) || null,
                    carbs: parseFloat(formData.get('carbs')) || null,
                    fat: parseFloat(formData.get('fat')) || null
                }
            };

            // Validate required fields
            if (!itemData.name) {
                this.showNotification('Ingredient name is required', 'error');
                return;
            }

            if (!itemData.category) {
                this.showNotification('Category is required', 'error');
                return;
            }

            if (!itemData.default_unit) {
                this.showNotification('Default unit is required', 'error');
                return;
            }

            // Check for duplicate names (excluding current item when editing)
            const duplicateIngredient = this.items.find(ing => 
                ing.name.toLowerCase() === itemData.name.toLowerCase() && 
                (!existingIngredient || ing.id !== existingIngredient.id)
            );

            if (duplicateIngredient) {
                this.showNotification('An item with this name already exists', 'error');
                return;
            }

            // Save item
            if (existingIngredient) {
                // Update existing item
                itemData.id = existingIngredient.id;
                const index = this.items.findIndex(ing => ing.id === existingIngredient.id);
                if (index !== -1) {
                    this.items[index] = { ...this.items[index], ...itemData };
                }
                this.showNotification(`"${itemData.name}" has been updated!`, 'success');
            } else {
                // Add new item
                itemData.id = Math.max(0, ...this.items.map(ing => ing.id)) + 1;
                itemData.recipe_count = 0;
                itemData.avg_quantity = 0;
                this.items.push(itemData);
                this.showNotification(`"${itemData.name}" has been added!`, 'success');
            }

            // Save to persistent storage
            this.saveItems();
            
            // Reload data from authoritative source to ensure consistency
            await this.loadItems();
            
            // Return to items list view after successful save using navigation stack
            console.log('🔄 Attempting to return to items list view...');
            this.returnFromItemForm();

        } catch (error) {
            console.error('Error saving item:', error);
            this.showNotification('Error saving item. Please try again.', 'error');
        }
    }

    saveItems() {
        // Save items using the centralized data authority
        if (window.mealPlannerSettings) {
            window.mealPlannerSettings.saveAuthoritativeData('items', this.items);
        } else {
            console.warn('⚠️ Settings manager not available, falling back to localStorage');
            localStorage.setItem('mealplanner_items', JSON.stringify(this.items));
        }
    }

    returnFromItemForm() {
        console.log('🥕 Returning from item form');
        console.log('🥕 Navigation stack size:', this.navigationStack ? this.navigationStack.length : 0);
        
        if (this.navigationStack && this.navigationStack.length > 0) {
            const previousView = this.navigationStack.pop();
            console.log('🥕 Popped from navigation stack, remaining:', this.navigationStack.length);
            console.log('🥕 Restoring view, container length:', previousView.container.length);
            
            this.container.innerHTML = previousView.container;
            window.scrollTo(0, previousView.scrollPosition || 0);
            
            // Reattach event listeners for the items list
            this.attachEventListeners();
            
            console.log('🥕 Successfully restored items list view, new container length:', this.container.innerHTML.length);
        } else {
            console.log('❌ No navigation stack to restore - using fallback render');
            // Fallback: render the items list
            this.render();
        }
    }

    editItem(itemId) {
        const item = this.items.find(ing => ing.id === itemId);
        if (item) {
            this.showItemForm(item);
        }
    }

    async deleteItem(itemId) {
        const item = this.items.find(ing => ing.id === itemId);
        if (item && confirm(`Are you sure you want to delete "${item.name}"?`)) {
            // Remove from items array
            this.items = this.items.filter(ing => ing.id !== itemId);
            
            // Save to persistent storage
            this.saveItems();
            
            this.applyFilters();
            this.render();
            this.showNotification(`"${item.name}" has been deleted`, 'success');
        }
    }

    showBarcodeScanner() {
        // Use the shared barcode scanner component
        const sharedScanner = window.SharedBarcodeScanner?.getInstance();
        if (!sharedScanner) {
            this.showNotification('Barcode scanner not available', 'error');
            return;
        }

        // Show the scanner with items context
        sharedScanner.show('items', 
            (item, context) => {
                console.log('Product scanned for items:', item);
                this.showNotification(`Added "${item.name}" to items`, 'success');
                // Refresh the items view
                this.applyFilters();
                this.render();
            },
            (error) => {
                console.error('Barcode scanner error:', error);
                this.showNotification(`Scanner error: ${error.message}`, 'error');
            }
        );
    }

    handleBarcodeScanning() {
        // Legacy method - redirect to new implementation
        this.showBarcodeScanner();
    }

    isInstalled() {
        // Check if running as PWA
        return window.matchMedia('(display-mode: standalone)').matches || 
               window.navigator.standalone === true;
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
    
    hasActiveFilters() {
        return this.currentFilter.search !== '' || 
               this.currentFilter.category !== '' || 
               this.currentFilter.label !== '';
    }

    async clearAllData() {
        console.log('🗑️ Clearing all items data...');
        this.items = [];
        this.filteredIngredients = [];
        this.currentFilter = {
            search: '',
            category: '',
            label: ''
        };
        
        // Clear from localStorage
        localStorage.removeItem('mealplanner_items');
        
        // Re-render to show empty state
        this.render();
        
        console.log('✅ All items data cleared');
    }
}

// Make ItemsManager globally available for testing
if (typeof window !== 'undefined') {
    window.ItemsManager = ItemsManager;
    // Keep old reference for backward compatibility during transition
    window.IngredientsManager = ItemsManager;
}
if (typeof global !== 'undefined') {
    global.ItemsManager = ItemsManager;
    // Keep old reference for backward compatibility during transition
    global.IngredientsManager = ItemsManager;
}

// Global registry for items manager
window.itemsManager = null;
