// Ingredients Management Component
class IngredientsManager {
    constructor(container) {
        this.container = container;
        this.ingredients = [];
        this.filteredIngredients = [];
        this.currentFilter = { search: '', category: '' };
        this.init();
    }

    async init() {
        console.log('🥕 Initializing Ingredients Manager...');
        await this.loadIngredients();
        this.render();
        this.attachEventListeners();
    }

    async loadIngredients() {
        // Load from centralized demo data for consistency
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.ingredients = demoData.getIngredients();
            console.log(`✅ Loaded ${this.ingredients.length} consistent ingredients from demo data`);
        } else {
            // Fallback to empty array if demo data not available
            this.ingredients = [];
            console.warn('⚠️ Demo data manager not available, using empty ingredients list');
        }
        
        this.applyFilters();
    }

    applyFilters() {
        this.filteredIngredients = this.ingredients.filter(ingredient => {
            const matchesSearch = !this.currentFilter.search || 
                ingredient.name.toLowerCase().includes(this.currentFilter.search.toLowerCase());
            const matchesCategory = !this.currentFilter.category || 
                ingredient.category === this.currentFilter.category;
            
            return matchesSearch && matchesCategory;
        });
    }

    render() {
        const categories = [...new Set(this.ingredients.map(i => i.category))];
        
        this.container.innerHTML = `
            <div class="space-y-6">
                <!-- Header with controls -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Ingredients</h2>
                    <div class="flex flex-wrap gap-3">
                        <button id="scan-barcode-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h5m3 0h6m-9 4h2m3 0h2M9 20h2m3 0h2"></path>
                            </svg>
                            <span>Scan Barcode</span>
                        </button>
                        <button id="add-ingredient-btn" class="btn-primary flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span>Add Ingredient</span>
                        </button>
                    </div>
                </div>

                <!-- Search and Filter Controls -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label for="ingredient-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Ingredients
                            </label>
                            <input type="text" id="ingredient-search" 
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
                        
                        <div class="flex items-end">
                            <button id="clear-filters-btn" class="btn-secondary w-full">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Ingredients Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.filteredIngredients.length}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Total Ingredients</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${categories.length}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-purple-600">${this.getActiveIngredients()}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">In Recipes</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-orange-600">$${this.getTotalValue().toFixed(2)}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Estimated Value</div>
                    </div>
                </div>

                <!-- Ingredients Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.filteredIngredients.length > 0 ? 
                        this.filteredIngredients.map(ingredient => this.createIngredientCard(ingredient)).join('') :
                        '<div class="col-span-full text-center py-12"><p class="text-gray-500 dark:text-gray-400">No ingredients found matching your criteria.</p></div>'
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

    createIngredientCard(ingredient) {
        const nutrition = typeof ingredient.nutrition_per_100g === 'string' ? 
            JSON.parse(ingredient.nutrition_per_100g) : ingredient.nutrition_per_100g;
        
        // Calculate recipe usage
        const recipeUsage = this.getIngredientRecipeUsage(ingredient.id);
        
        return `
            <div class="ingredient-card bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow p-6" data-ingredient-id="${ingredient.id}">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${ingredient.name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">${ingredient.category}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button class="edit-ingredient text-blue-600 hover:text-blue-800 p-1" data-ingredient-id="${ingredient.id}" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-ingredient text-red-600 hover:text-red-800 p-1" data-ingredient-id="${ingredient.id}" title="Delete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Default Unit:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${ingredient.default_unit}</span>
                    </div>
                    
                    ${ingredient.cost_per_unit ? `
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600 dark:text-gray-400">Cost per Unit:</span>
                            <span class="font-medium text-gray-900 dark:text-white">$${ingredient.cost_per_unit}</span>
                        </div>
                    ` : ''}
                    
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Used in Recipes:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${ingredient.recipe_count || 0}</span>
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
                    
                    ${ingredient.storage_notes ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Storage:</p>
                            <p class="text-xs text-gray-700 dark:text-gray-300">${ingredient.storage_notes}</p>
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
                </div>
            </div>
        `;
    }

    getActiveIngredients() {
        return this.ingredients.filter(i => (i.recipe_count || 0) > 0).length;
    }

    getTotalValue() {
        return this.ingredients.reduce((total, ingredient) => {
            return total + ((ingredient.cost_per_unit || 0) * (ingredient.avg_quantity || 1));
        }, 0);
    }

    getIngredientRecipeUsage(ingredientId) {
        const recipes = [];
        
        // Get recipes from recipe manager or demo data
        let allRecipes = [];
        
        if (window.recipeManager && window.recipeManager.recipes) {
            allRecipes = window.recipeManager.recipes;
        } else if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            allRecipes = demoData.getRecipes();
        }
        
        // Find recipes that use this ingredient
        allRecipes.forEach(recipe => {
            if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
                const ingredientUsage = recipe.ingredients.find(ing => {
                    // Match by ID or name (for flexibility)
                    return ing.ingredient_id === ingredientId || 
                           (ing.name && ing.name.toLowerCase() === this.getIngredientName(ingredientId).toLowerCase());
                });
                
                if (ingredientUsage) {
                    recipes.push({
                        recipeId: recipe.id,
                        recipeName: recipe.title || recipe.name,
                        quantity: ingredientUsage.quantity || 0,
                        unit: ingredientUsage.unit || 'units',
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

    getIngredientName(ingredientId) {
        const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
        return ingredient ? ingredient.name : '';
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#ingredient-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter.search = e.target.value;
                this.applyFilters();
                this.render();
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

        // Clear filters
        const clearFiltersBtn = this.container.querySelector('#clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.currentFilter = { search: '', category: '' };
                this.applyFilters();
                this.render();
            });
        }

        // Add ingredient button
        const addBtn = this.container.querySelector('#add-ingredient-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showIngredientForm();
            });
        }

        // Barcode scanner button
        const scanBtn = this.container.querySelector('#scan-barcode-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', () => this.showBarcodeScanner());
        }

        // Scanner modal event listeners
        this.attachScannerEventListeners();

        // Edit ingredient buttons
        this.container.querySelectorAll('.edit-ingredient').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const ingredientId = parseInt(btn.dataset.ingredientId);
                this.editIngredient(ingredientId);
            });
        });

        // Delete ingredient buttons
        this.container.querySelectorAll('.delete-ingredient').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const ingredientId = parseInt(btn.dataset.ingredientId);
                this.deleteIngredient(ingredientId);
            });
        });
    }

    showIngredientForm(ingredient = null) {
        console.log('Opening ingredient form...', ingredient ? 'Edit mode' : 'Add mode');
        
        const isEdit = ingredient !== null;
        const modalId = 'ingredient-form-modal';
        
        // Remove existing modal if present
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                            ${isEdit ? 'Edit Ingredient' : 'Add New Ingredient'}
                        </h2>
                        <button id="close-ingredient-form" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <form id="ingredient-form" class="p-6 space-y-6">
                    <!-- Basic Information -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label for="ingredient-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Ingredient Name *
                            </label>
                            <input type="text" id="ingredient-name" name="name" required
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   placeholder="Enter ingredient name"
                                   value="${isEdit ? ingredient.name : ''}">
                        </div>
                        
                        <div>
                            <label for="ingredient-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category *
                            </label>
                            <select id="ingredient-category" name="category" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="">Select category...</option>
                                <option value="produce" ${isEdit && ingredient.category === 'produce' ? 'selected' : ''}>Produce</option>
                                <option value="meat" ${isEdit && ingredient.category === 'meat' ? 'selected' : ''}>Meat</option>
                                <option value="dairy" ${isEdit && ingredient.category === 'dairy' ? 'selected' : ''}>Dairy</option>
                                <option value="pantry" ${isEdit && ingredient.category === 'pantry' ? 'selected' : ''}>Pantry</option>
                                <option value="grains" ${isEdit && ingredient.category === 'grains' ? 'selected' : ''}>Grains</option>
                                <option value="spices" ${isEdit && ingredient.category === 'spices' ? 'selected' : ''}>Spices</option>
                                <option value="beverages" ${isEdit && ingredient.category === 'beverages' ? 'selected' : ''}>Beverages</option>
                                <option value="frozen" ${isEdit && ingredient.category === 'frozen' ? 'selected' : ''}>Frozen</option>
                                <option value="other" ${isEdit && ingredient.category === 'other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="ingredient-unit" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Default Unit *
                            </label>
                            <select id="ingredient-unit" name="default_unit" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="">Select unit...</option>
                                <option value="pieces" ${isEdit && ingredient.default_unit === 'pieces' ? 'selected' : ''}>pieces</option>
                                <option value="cups" ${isEdit && ingredient.default_unit === 'cups' ? 'selected' : ''}>cups</option>
                                <option value="tbsp" ${isEdit && ingredient.default_unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                                <option value="tsp" ${isEdit && ingredient.default_unit === 'tsp' ? 'selected' : ''}>tsp</option>
                                <option value="lbs" ${isEdit && ingredient.default_unit === 'lbs' ? 'selected' : ''}>lbs</option>
                                <option value="oz" ${isEdit && ingredient.default_unit === 'oz' ? 'selected' : ''}>oz</option>
                                <option value="cloves" ${isEdit && ingredient.default_unit === 'cloves' ? 'selected' : ''}>cloves</option>
                                <option value="slices" ${isEdit && ingredient.default_unit === 'slices' ? 'selected' : ''}>slices</option>
                                <option value="grams" ${isEdit && ingredient.default_unit === 'grams' ? 'selected' : ''}>grams</option>
                                <option value="ml" ${isEdit && ingredient.default_unit === 'ml' ? 'selected' : ''}>ml</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="ingredient-cost" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cost per Unit ($)
                            </label>
                            <input type="number" id="ingredient-cost" name="cost_per_unit" step="0.01" min="0"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   placeholder="0.00"
                                   value="${isEdit ? ingredient.cost_per_unit || '' : ''}">
                        </div>
                        
                        <div>
                            <label for="ingredient-storage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Storage Notes
                            </label>
                            <input type="text" id="ingredient-storage" name="storage_notes"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   placeholder="Storage instructions"
                                   value="${isEdit ? ingredient.storage_notes || '' : ''}">
                        </div>
                    </div>
                    
                    <!-- Nutritional Information -->
                    <div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nutritional Information (per 100g)</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label for="nutrition-calories" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Calories
                                </label>
                                <input type="number" id="nutrition-calories" name="calories" min="0"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                       placeholder="0"
                                       value="${isEdit && ingredient.nutrition_per_100g?.calories ? ingredient.nutrition_per_100g.calories : ''}">
                            </div>
                            
                            <div>
                                <label for="nutrition-protein" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Protein (g)
                                </label>
                                <input type="number" id="nutrition-protein" name="protein" step="0.1" min="0"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                       placeholder="0.0"
                                       value="${isEdit && ingredient.nutrition_per_100g?.protein ? ingredient.nutrition_per_100g.protein : ''}">
                            </div>
                            
                            <div>
                                <label for="nutrition-carbs" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Carbs (g)
                                </label>
                                <input type="number" id="nutrition-carbs" name="carbs" step="0.1" min="0"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                       placeholder="0.0"
                                       value="${isEdit && ingredient.nutrition_per_100g?.carbs ? ingredient.nutrition_per_100g.carbs : ''}">
                            </div>
                            
                            <div>
                                <label for="nutrition-fat" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Fat (g)
                                </label>
                                <input type="number" id="nutrition-fat" name="fat" step="0.1" min="0"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                       placeholder="0.0"
                                       value="${isEdit && ingredient.nutrition_per_100g?.fat ? ingredient.nutrition_per_100g.fat : ''}">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Form Actions -->
                    <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" id="cancel-ingredient-form" class="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" class="btn-primary">
                            ${isEdit ? 'Update Ingredient' : 'Save Ingredient'}
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Attach event listeners
        this.attachIngredientFormListeners(modal, ingredient);
        
        // Focus on name input
        setTimeout(() => {
            const nameInput = modal.querySelector('#ingredient-name');
            if (nameInput) nameInput.focus();
        }, 100);
    }

    attachIngredientFormListeners(modal, ingredient) {
        const form = modal.querySelector('#ingredient-form');
        const closeBtn = modal.querySelector('#close-ingredient-form');
        const cancelBtn = modal.querySelector('#cancel-ingredient-form');

        // Close modal handlers
        const closeModal = () => {
            modal.remove();
        };

        closeBtn?.addEventListener('click', closeModal);
        cancelBtn?.addEventListener('click', closeModal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Form submission
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleIngredientFormSubmit(form, ingredient);
        });
    }

    async handleIngredientFormSubmit(form, existingIngredient) {
        try {
            // Collect form data
            const formData = new FormData(form);
            const ingredientData = {
                name: formData.get('name').trim(),
                category: formData.get('category'),
                default_unit: formData.get('default_unit'),
                cost_per_unit: parseFloat(formData.get('cost_per_unit')) || null,
                storage_notes: formData.get('storage_notes').trim() || null,
                nutrition_per_100g: {
                    calories: parseInt(formData.get('calories')) || null,
                    protein: parseFloat(formData.get('protein')) || null,
                    carbs: parseFloat(formData.get('carbs')) || null,
                    fat: parseFloat(formData.get('fat')) || null
                }
            };

            // Validate required fields
            if (!ingredientData.name) {
                this.showNotification('Ingredient name is required', 'error');
                return;
            }

            if (!ingredientData.category) {
                this.showNotification('Category is required', 'error');
                return;
            }

            if (!ingredientData.default_unit) {
                this.showNotification('Default unit is required', 'error');
                return;
            }

            // Check for duplicate names (excluding current ingredient when editing)
            const duplicateIngredient = this.ingredients.find(ing => 
                ing.name.toLowerCase() === ingredientData.name.toLowerCase() && 
                (!existingIngredient || ing.id !== existingIngredient.id)
            );

            if (duplicateIngredient) {
                this.showNotification('An ingredient with this name already exists', 'error');
                return;
            }

            // Save ingredient
            if (existingIngredient) {
                // Update existing ingredient
                ingredientData.id = existingIngredient.id;
                const index = this.ingredients.findIndex(ing => ing.id === existingIngredient.id);
                if (index !== -1) {
                    this.ingredients[index] = { ...this.ingredients[index], ...ingredientData };
                }
                this.showNotification(`"${ingredientData.name}" has been updated!`, 'success');
            } else {
                // Add new ingredient
                ingredientData.id = Math.max(0, ...this.ingredients.map(ing => ing.id)) + 1;
                ingredientData.recipe_count = 0;
                ingredientData.avg_quantity = 0;
                this.ingredients.push(ingredientData);
                this.showNotification(`"${ingredientData.name}" has been added!`, 'success');
            }

            // Close modal and refresh view
            document.getElementById('ingredient-form-modal')?.remove();
            this.applyFilters();
            this.render();

        } catch (error) {
            console.error('Error saving ingredient:', error);
            this.showNotification('Error saving ingredient. Please try again.', 'error');
        }
    }

    editIngredient(ingredientId) {
        const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
        if (ingredient) {
            this.showIngredientForm(ingredient);
        }
    }

    async deleteIngredient(ingredientId) {
        const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
        if (ingredient && confirm(`Are you sure you want to delete "${ingredient.name}"?`)) {
            // In real app, this would delete from database
            this.ingredients = this.ingredients.filter(ing => ing.id !== ingredientId);
            this.applyFilters();
            this.render();
            this.showNotification(`"${ingredient.name}" has been deleted`, 'success');
        }
    }

    handleBarcodeScanning() {
        // Check if app is installed as PWA
        if (!this.isInstalled()) {
            this.showNotification('Barcode scanning requires the app to be installed. Please install the app first.', 'info');
            return;
        }

        // Check if camera is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showNotification('Camera access is not available on this device', 'error');
            return;
        }

        this.showNotification('Barcode scanning feature coming soon!', 'info');
        // TODO: Implement barcode scanning functionality
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
}

// Make IngredientsManager globally available for testing
if (typeof window !== 'undefined') {
    window.IngredientsManager = IngredientsManager;
}
if (typeof global !== 'undefined') {
    global.IngredientsManager = IngredientsManager;
}

// Global registry for ingredients manager
window.ingredientsManager = null;
