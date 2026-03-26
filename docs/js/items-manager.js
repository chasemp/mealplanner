// Items Management Component
class ItemsManager {
    constructor(container) {
        this.container = container;
        this.items = [];
        this.filteredItems = [];
        this.currentFilter = { search: '' };
        this.selectedLabels = []; // Multi-label filter selection
        this.searchTerm = ''; // For label dropdown search
        // Initialize navigation stack for complex page navigation like RecipeManager
        this.navigationStack = [];
        this.init();
    }

    async init() {
        console.log('🥕 Initializing Items Manager...');
        // Make globally accessible for onclick handlers
        window.itemsManager = this;
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
        this.render(); // IMPORT/EXPORT FIX: Render after loading data to ensure UI updates
    }

    applyFilters() {
        console.log('🔍 Applying filters:', this.currentFilter, 'Selected labels:', this.selectedLabels);
        console.log('📦 Total items:', this.items.length);
        
        this.filteredItems = this.items.filter(item => {
            // Search filter
            const matchesSearch = !this.currentFilter.search || 
                item.name.toLowerCase().includes(this.currentFilter.search.toLowerCase());
            
            // Label filter (includes category labels)
            let matchesLabels = true;
            if (this.selectedLabels.length > 0) {
                matchesLabels = this.selectedLabels.every(selectedLabel => {
                    // Check if it's a category label (matches item.category)
                    const categoryLabels = window.labelTypes ? window.labelTypes.getCategoryLabels() : [];
                    const isCategoryLabel = categoryLabels.some(cat => 
                        cat.toLowerCase() === selectedLabel.toLowerCase()
                    );
                    
                    if (isCategoryLabel) {
                        // Match against item category
                        return item.category && 
                               item.category.toLowerCase() === selectedLabel.toLowerCase().replace(/ & /g, ' ').replace(/\s+/g, '_');
                    } else {
                        // Match against item labels
                        return item.labels && 
                               Array.isArray(item.labels) && 
                               item.labels.some(label => label.toLowerCase() === selectedLabel.toLowerCase());
                    }
                });
            }
            
            const matches = matchesSearch && matchesLabels;
            
            if (this.currentFilter.search) {
                console.log(`🔍 "${item.name}" matches search "${this.currentFilter.search}": ${matchesSearch}`);
            }
            
            return matches;
        });
        
        console.log('✅ Filtered items:', this.filteredItems.length);
    }

    getAllLabels() {
        const allLabels = new Set();
        
        // Add category labels (system labels)
        if (window.labelTypes) {
            const categoryLabels = window.labelTypes.getCategoryLabels();
            categoryLabels.forEach(label => allLabels.add(label));
        }
        
        // Add item-specific labels from items
        this.items.forEach(item => {
            if (item.labels && Array.isArray(item.labels)) {
                item.labels.forEach(label => allLabels.add(label));
            }
        });
        
        // Add shared labels (TODO: implement shared label storage)
        const sharedLabels = JSON.parse(localStorage.getItem('mealplanner_shared_labels') || '[]');
        sharedLabels.forEach(labelObj => {
            if (labelObj.name) {
                allLabels.add(labelObj.name);
            }
        });
        
        // Add user-created item labels
        const itemLabels = JSON.parse(localStorage.getItem('mealplanner_item_labels') || '[]');
        itemLabels.forEach(labelObj => {
            if (labelObj.name) {
                allLabels.add(labelObj.name);
            }
        });
        
        return Array.from(allLabels).sort();
    }

    render() {
        const categories = [...new Set(this.items.map(i => i.category))];
        
        this.container.innerHTML = `
            <div class="space-y-6">
                <!-- Header with Labels and Add Buttons -->
                <div class="flex justify-between items-center mb-4">
                    <!-- Left side: Labels button -->
                    <button id="manage-item-labels-btn" class="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-teal-400 dark:border-teal-500 bg-teal-50 dark:bg-teal-900 hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors shadow-sm text-teal-700 dark:text-teal-200" title="Manage Item Labels">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                        <span class="hidden sm:inline">Labels</span>
                    </button>
                    
                    <!-- Right side: Add button -->
                    <button id="add-item-btn" class="btn-primary flex items-center space-x-2">
                        <span>Add Item</span>
                        <span>🥕</span>
                    </button>
                </div>

                <!-- Search and Filter Controls -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <!-- Search input -->
                        <div>
                            <label for="item-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Items
                            </label>
                            <div class="relative">
                                <input type="text" id="item-search" 
                                       placeholder="Search by name..." 
                                       value="${this.currentFilter.search}"
                                       class="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400">
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Multi-select label filter -->
                        <div>
                            <label for="item-labels-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Labels
                            </label>
                            <div class="relative">
                                <div id="item-labels-container" class="w-full min-h-[42px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-text flex flex-wrap gap-1 items-center">
                                    ${this.selectedLabels.map(label => {
                                        const labelType = window.labelTypes ? window.labelTypes.inferItemLabelType(label) : 'item_default';
                                        const colors = window.labelTypes ? window.labelTypes.getColorClasses(labelType) : 'bg-teal-100 text-teal-800 dark:!bg-teal-200 dark:!text-teal-900';
                                        const icon = window.labelTypes ? window.labelTypes.getIcon(labelType) : '';
                                        return `
                                        <span class="inline-flex items-center px-2 py-1 text-xs ${colors} rounded-full">
                                            ${icon}${label}
                                            <button type="button" class="ml-1 hover:opacity-75 remove-item-label" data-label="${label}">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </span>
                                        `;
                                    }).join('')}
                                    <input 
                                        type="text" 
                                        id="item-labels-input" 
                                        class="flex-1 min-w-[120px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400" 
                                        placeholder="${this.selectedLabels.length > 0 ? 'Type to add more...' : 'Type to search labels...'}"
                                        autocomplete="off"
                                    />
                                </div>
                                <div id="item-labels-dropdown" class="absolute z-40 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg hidden max-h-48 overflow-y-auto">
                                    <!-- Dropdown options will be populated by JavaScript -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Items Info Bar -->
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                                <span class="font-semibold text-teal-700 dark:text-teal-300">${this.filteredItems.length}</span>
                                <span class="text-gray-600 dark:text-gray-400">${this.filteredItems.length === 1 ? 'item' : 'items'}</span>
                            </div>
                            
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                </svg>
                                <span class="font-semibold text-purple-700 dark:text-purple-300">${categories.length}</span>
                                <span class="text-gray-600 dark:text-gray-400">${categories.length === 1 ? 'category' : 'categories'}</span>
                            </div>
                            
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                                <span class="font-semibold text-blue-700 dark:text-blue-300">${this.getActiveItems()}</span>
                                <span class="text-gray-600 dark:text-gray-400">in recipes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Items Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.filteredItems.length > 0 ? 
                        this.filteredItems.map(item => this.createItemCard(item)).join('') :
                        '<div class="col-span-full text-center py-12"><p class="text-gray-500 dark:text-gray-300">No items found matching your criteria.</p></div>'
                    }
                </div>
            </div>
            
            <!-- Barcode Scanner Modal -->
            <div id="barcode-scanner-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center">
                <div class="bg-white dark:bg-[#b8a890] rounded-lg p-6 w-full max-w-md mx-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Scan Barcode</h3>
                        <button id="close-scanner-btn" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div id="scanner-content">
                        <div id="scanner-status" class="text-center mb-4">
                            <p class="text-gray-600 dark:text-gray-300">Click "Start Scanning" to begin</p>
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
            <div class="item-card bg-white dark:bg-[#48726f] rounded-lg shadow hover:shadow-md transition-shadow p-6" data-item-id="${item.id}">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${item.name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300 capitalize">${item.category}</p>
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
                        <span class="text-gray-600 dark:text-gray-300">Default Unit:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${item.default_unit}</span>
                    </div>
                    
                    
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600 dark:text-gray-300">Used in Recipes:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${item.recipe_count || 0}</span>
                    </div>
                    
                    ${nutrition && nutrition.calories ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-[#5a4343]">
                            <p class="text-xs text-gray-500 dark:text-gray-300 mb-2">Nutrition per 100g:</p>
                            <div class="grid grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-300">
                                <div>Calories: ${nutrition.calories}</div>
                                <div>Protein: ${nutrition.protein}g</div>
                                <div>Carbs: ${nutrition.carbs}g</div>
                                <div>Fat: ${nutrition.fat}g</div>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${item.storage_notes ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-[#5a4343]">
                            <p class="text-xs text-gray-500 dark:text-gray-300 mb-1">Storage:</p>
                            <p class="text-xs text-gray-700 dark:text-gray-300">${item.storage_notes}</p>
                        </div>
                    ` : ''}
                    
                    ${recipeUsage.recipes.length > 0 ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-[#5a4343]">
                            <p class="text-xs text-gray-500 dark:text-gray-300 mb-2">Used in ${recipeUsage.recipes.length} recipe${recipeUsage.recipes.length !== 1 ? 's' : ''}:</p>
                            <div class="space-y-1">
                                ${recipeUsage.recipes.slice(0, 3).map(usage => `
                                    <div class="flex justify-between items-center text-xs">
                                        <span class="text-gray-700 dark:text-gray-300 truncate">${usage.recipeName}</span>
                                        <span class="text-gray-500 dark:text-gray-300 ml-2 flex-shrink-0">${usage.quantity} ${usage.unit}</span>
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
                        <div class="pt-2 border-t border-gray-200 dark:border-[#5a4343]">
                            <p class="text-xs text-gray-500 dark:text-gray-300">Not used in any recipes yet</p>
                        </div>
                    `}
                    
                    <!-- Labels Section -->
                    ${item.labels && Array.isArray(item.labels) && item.labels.length > 0 ? `
                        <div class="pt-2 border-t border-gray-200 dark:border-[#5a4343]">
                            <p class="text-xs text-gray-500 dark:text-gray-300 mb-2">Labels:</p>
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

    getActiveItems() {
        return this.items.filter(i => (i.recipe_count || 0) > 0).length;
    }

    getTotalItems() {
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
            // MIGRATION: Support both 'items' (new) and 'ingredients' (legacy) during transition
            const recipeItems = recipe.items || recipe.ingredients || [];
            if (Array.isArray(recipeItems)) {
                const itemUsage = recipeItems.find(ing => {
                    // Match by ID or name (for flexibility)
                    return ing.item_id === itemId || ing.ingredient_id === itemId ||
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

        // Multi-select label filter with typeahead
        const labelInput = this.container.querySelector('#item-labels-input');
        const labelContainer = this.container.querySelector('#item-labels-container');
        const labelDropdown = this.container.querySelector('#item-labels-dropdown');
        
        if (labelInput && labelContainer && labelDropdown) {
            // Show dropdown and focus input when clicking container
            labelContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                labelInput.focus();
                labelDropdown.classList.remove('hidden');
                this.updateLabelDropdown();
            });

            // Handle typing in the input
            labelInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                labelDropdown.classList.remove('hidden');
                this.updateLabelDropdown();
            });

            // Handle focus events
            labelInput.addEventListener('focus', () => {
                labelDropdown.classList.remove('hidden');
                this.updateLabelDropdown();
            });

            // Hide dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!labelContainer.contains(e.target) && !labelDropdown.contains(e.target)) {
                    labelDropdown.classList.add('hidden');
                    labelInput.value = '';
                    this.searchTerm = '';
                }
            });

            // Handle remove label buttons
            this.container.querySelectorAll('.remove-item-label').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const label = btn.dataset.label;
                    this.removeLabel(label);
                });
            });
        }

        // Manage labels button
        const manageLabelsBtn = this.container.querySelector('#manage-item-labels-btn');
        if (manageLabelsBtn) {
            manageLabelsBtn.addEventListener('click', () => {
                console.log('🏷️ Item Labels button clicked');
                this.showLabelManagement();
            });
        }

        // Clickable labels on item cards
        this.container.querySelectorAll('.item-label').forEach(labelSpan => {
            labelSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                const label = labelSpan.dataset.label;
                if (!this.selectedLabels.includes(label)) {
                    this.addLabel(label);
                }
            });
        });

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

    // Multi-label filter methods
    addLabel(label) {
        if (!this.selectedLabels.includes(label)) {
            this.selectedLabels.push(label);
            this.applyFilters();
            this.render();
        }
    }

    removeLabel(label) {
        this.selectedLabels = this.selectedLabels.filter(l => l !== label);
        this.applyFilters();
        this.render();
    }

    updateLabelDropdown() {
        const dropdown = this.container.querySelector('#item-labels-dropdown');
        if (!dropdown) return;

        const availableLabels = this.getAllLabels().filter(label => !this.selectedLabels.includes(label));
        const filteredLabels = !this.searchTerm ? availableLabels : 
            availableLabels.filter(label => label.toLowerCase().includes(this.searchTerm.toLowerCase()));

        if (filteredLabels.length === 0) {
            dropdown.innerHTML = `
                <div class="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    ${this.searchTerm ? `No labels found matching "${this.searchTerm}"` : 'No more labels available'}
                </div>
            `;
        } else {
            dropdown.innerHTML = filteredLabels.map((label, index) => {
                const labelType = window.labelTypes ? window.labelTypes.inferItemLabelType(label) : 'item_default';
                const icon = window.labelTypes ? window.labelTypes.getIcon(labelType) : '';
                const colors = window.labelTypes ? window.labelTypes.getColorClasses(labelType) : 'bg-teal-100 text-teal-800 dark:!bg-teal-200 dark:!text-teal-900';
                
                return `
                <div class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-gray-100 ${index === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}" 
                     data-label="${label}" 
                     onclick="window.itemsManager.addLabel('${label}')">
                    <div class="flex items-center space-x-2">
                        ${icon && labelType !== 'item_default' ? `<span class="flex-shrink-0">${icon}</span>` : ''}
                        <span class="inline-flex items-center px-2 py-0.5 text-xs ${colors} rounded-full">${label}</span>
                    </div>
                </div>
                `;
            }).join('');
        }

        const input = this.container.querySelector('#item-labels-input');
        if (input && this.searchTerm === '') {
            input.value = '';
        }
    }

    showLabelManagement() {
        console.log('🏷️ Opening item label management interface...');
        
        // Store current content for restoration
        this.originalContent = this.container.innerHTML;
        
        // Replace content with label management UI
        this.container.innerHTML = this.generateLabelManagementHTML();
        
        // Attach event listeners
        this.attachLabelManagementListeners();
        
        // Load and display existing labels
        this.loadLabelsForManagement();
    }

    generateLabelManagementHTML() {
        const presetColors = [
            '#14B8A6', '#10B981', '#22C55E', '#84CC16', '#EAB308', '#F59E0B',
            '#F97316', '#EF4444', '#EC4899', '#A855F7', '#8B5CF6', '#6366F1'
        ];

        return `
            <div class="bg-white dark:bg-gray-800 w-full min-h-screen flex flex-col">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
                    <div class="flex items-center gap-3">
                        <button id="back-to-items-from-labels" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors md:hidden">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Item Label Management</h2>
                            <p class="text-gray-600 dark:text-gray-400 mt-1">Create, edit, and manage item labels</p>
                        </div>
                    </div>
                    <button id="close-label-management" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Main Content -->
                <div class="flex-grow overflow-y-auto p-4 md:p-6">
                    <!-- Create/Edit Label Form -->
                    <section class="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create/Edit Label</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="new-label-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label Name</label>
                                <input type="text" id="new-label-name" placeholder="e.g., Organic, Local, Seasonal"
                                       class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white">
                            </div>
                            <div>
                                <label for="new-label-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                <select id="new-label-type"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white">
                                    <option value="item_default">Item Label</option>
                                    <option value="item_category">Category (System)</option>
                                </select>
                            </div>
                            <div class="md:col-span-2">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" id="label-is-shared" 
                                           class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700">
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                        </svg>
                                        Shared Label (available for both Items and Recipes)
                                    </span>
                                </label>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                                <div class="flex items-center gap-2 mb-2">
                                    <div id="color-preview" class="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600" style="background-color: #14B8A6;"></div>
                                    <input type="color" id="new-label-color" value="#14B8A6" class="w-12 h-8 p-0 border-0 rounded-md overflow-hidden cursor-pointer">
                                </div>
                                <div id="preset-colors" class="flex flex-wrap gap-2 mb-4">
                                    ${presetColors.map(color => `
                                        <button class="preset-color-btn w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-teal-500 transition-all"
                                                style="background-color: ${color};" data-color="${color}" title="${color}">
                                        </button>
                                    `).join('')}
                                </div>
                                <div class="flex justify-between items-center mt-4">
                                    <div class="flex items-center gap-2">
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Hex:</label>
                                        <input type="text" id="new-label-color-text" value="#14B8A6"
                                               class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white uppercase">
                                    </div>
                                    <div class="flex gap-2">
                                        <button id="cancel-label-btn"
                                                class="px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors hidden">
                                            Cancel
                                        </button>
                                        <button id="create-label-btn"
                                                class="px-5 py-2 bg-teal-600 text-white font-medium rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Labels (Categories)</h3>
                        <div id="system-labels-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- System labels will be rendered here -->
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    attachLabelManagementListeners() {
        // Close/Back buttons
        const closeBtn = document.querySelector('#close-label-management');
        const backBtn = document.querySelector('#back-to-items-from-labels');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLabelManagement());
        }
        if (backBtn) {
            backBtn.addEventListener('click', () => this.closeLabelManagement());
        }

        // Color picker sync
        const colorInput = document.querySelector('#new-label-color');
        const colorText = document.querySelector('#new-label-color-text');
        const colorPreview = document.querySelector('#color-preview');

        if (colorInput && colorText && colorPreview) {
            colorInput.addEventListener('input', (e) => {
                colorText.value = e.target.value.toUpperCase();
                colorPreview.style.backgroundColor = e.target.value;
            });

            colorText.addEventListener('input', (e) => {
                const hex = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(hex)) {
                    colorInput.value = hex;
                    colorPreview.style.backgroundColor = hex;
                }
            });
        }

        // Preset color buttons
        document.querySelectorAll('.preset-color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                if (colorInput) colorInput.value = color;
                if (colorText) colorText.value = color;
                if (colorPreview) colorPreview.style.backgroundColor = color;
            });
        });

        // Create/Update label button
        const createBtn = document.querySelector('#create-label-btn');
        if (createBtn) {
            createBtn.addEventListener('click', () => this.handleCreateOrUpdateLabel());
        }

        // Cancel button
        const cancelBtn = document.querySelector('#cancel-label-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.resetLabelForm());
        }
    }

    loadLabelsForManagement() {
        // Load user labels
        const userLabels = this.getUserItemLabels();
        const userLabelsList = document.querySelector('#user-labels-list');
        const noUserLabels = document.querySelector('#no-user-labels');

        if (userLabels.length === 0) {
            if (noUserLabels) noUserLabels.classList.remove('hidden');
            if (userLabelsList) userLabelsList.classList.add('hidden');
        } else {
            if (noUserLabels) noUserLabels.classList.add('hidden');
            if (userLabelsList) {
                userLabelsList.classList.remove('hidden');
                userLabelsList.innerHTML = userLabels.map(label => this.renderLabelCard(label)).join('');
            }
        }

        // Load system labels (categories)
        const systemLabels = this.getSystemItemLabels();
        const systemLabelsList = document.querySelector('#system-labels-list');
        if (systemLabelsList) {
            systemLabelsList.innerHTML = systemLabels.map(label => this.renderLabelCard(label, true)).join('');
        }

        // Attach label card listeners
        this.attachLabelCardListeners();
    }

    renderLabelCard(label, isSystem = false) {
        const sharedBadge = label.isShared ? `
            <span class="inline-flex items-center px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
                Shared
            </span>
        ` : '';

        return `
            <div class="label-card p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow" data-label-id="${label.id}">
                <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" style="background-color: ${label.color};"></div>
                        <span class="font-medium text-gray-900 dark:text-white">${label.name}</span>
                    </div>
                    ${!isSystem ? `
                    <div class="flex gap-1">
                        <button class="edit-label-btn p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400" data-label-id="${label.id}" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-label-btn p-1 text-red-600 hover:text-red-700 dark:text-red-400" data-label-id="${label.id}" title="Delete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                    ` : '<span class="text-xs text-gray-500 dark:text-gray-400">System</span>'}
                </div>
                ${sharedBadge}
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Type: ${label.type === 'item_category' ? 'Category' : 'Item Label'}</p>
            </div>
        `;
    }

    attachLabelCardListeners() {
        // Edit buttons
        document.querySelectorAll('.edit-label-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const labelId = btn.dataset.labelId;
                this.editLabel(labelId);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-label-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const labelId = btn.dataset.labelId;
                this.deleteLabel(labelId);
            });
        });
    }

    getUserItemLabels() {
        return JSON.parse(localStorage.getItem('mealplanner_item_labels') || '[]');
    }

    getSystemItemLabels() {
        if (!window.labelTypes) return [];
        const categories = window.labelTypes.getCategoryLabels();
        return categories.map((cat, index) => ({
            id: `system_category_${index}`,
            name: cat,
            type: 'item_category',
            color: window.labelTypes.getColorClasses('item_category').match(/#[0-9A-F]{6}/i)?.[0] || '#A855F7',
            isSystem: true,
            isShared: false
        }));
    }

    handleCreateOrUpdateLabel() {
        const nameInput = document.querySelector('#new-label-name');
        const typeSelect = document.querySelector('#new-label-type');
        const colorInput = document.querySelector('#new-label-color');
        const sharedCheckbox = document.querySelector('#label-is-shared');
        const createBtn = document.querySelector('#create-label-btn');

        if (!nameInput || !typeSelect || !colorInput || !sharedCheckbox) return;

        const name = nameInput.value.trim();
        const type = typeSelect.value;
        const color = colorInput.value;
        const isShared = sharedCheckbox.checked;

        if (!name) {
            this.showNotification('Label name is required', 'error');
            return;
        }

        const labelData = {
            name,
            type,
            color,
            isShared
        };

        // Check if editing
        const editingId = createBtn.dataset.editingId;
        if (editingId) {
            this.updateItemLabel(editingId, labelData);
        } else {
            this.createItemLabel(labelData);
        }
    }

    createItemLabel(labelData) {
        const userLabels = this.getUserItemLabels();
        
        const newLabel = {
            id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...labelData,
            created_at: new Date().toISOString()
        };

        userLabels.push(newLabel);
        localStorage.setItem('mealplanner_item_labels', JSON.stringify(userLabels));

        // If shared, also add to shared labels
        if (labelData.isShared) {
            this.addToSharedLabels(newLabel);
        }

        this.showNotification(`Label "${labelData.name}" created successfully!`, 'success');
        this.resetLabelForm();
        this.loadLabelsForManagement();
    }

    updateItemLabel(labelId, labelData) {
        const userLabels = this.getUserItemLabels();
        const index = userLabels.findIndex(l => l.id === labelId);

        if (index !== -1) {
            userLabels[index] = {
                ...userLabels[index],
                ...labelData,
                updated_at: new Date().toISOString()
            };
            localStorage.setItem('mealplanner_item_labels', JSON.stringify(userLabels));

            // Update shared labels if needed
            if (labelData.isShared) {
                this.addToSharedLabels(userLabels[index]);
            } else {
                this.removeFromSharedLabels(labelId);
            }

            this.showNotification(`Label "${labelData.name}" updated successfully!`, 'success');
            this.resetLabelForm();
            this.loadLabelsForManagement();
        }
    }

    editLabel(labelId) {
        const userLabels = this.getUserItemLabels();
        const label = userLabels.find(l => l.id === labelId);

        if (!label) return;

        const nameInput = document.querySelector('#new-label-name');
        const typeSelect = document.querySelector('#new-label-type');
        const colorInput = document.querySelector('#new-label-color');
        const colorText = document.querySelector('#new-label-color-text');
        const colorPreview = document.querySelector('#color-preview');
        const sharedCheckbox = document.querySelector('#label-is-shared');
        const createBtn = document.querySelector('#create-label-btn');
        const cancelBtn = document.querySelector('#cancel-label-btn');

        if (nameInput) nameInput.value = label.name;
        if (typeSelect) typeSelect.value = label.type;
        if (colorInput) colorInput.value = label.color;
        if (colorText) colorText.value = label.color;
        if (colorPreview) colorPreview.style.backgroundColor = label.color;
        if (sharedCheckbox) sharedCheckbox.checked = label.isShared || false;
        if (createBtn) {
            createBtn.textContent = 'Update Label';
            createBtn.dataset.editingId = labelId;
        }
        if (cancelBtn) cancelBtn.classList.remove('hidden');

        // Scroll to form
        document.querySelector('#new-label-name')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    deleteLabel(labelId) {
        if (!confirm('Are you sure you want to delete this label?')) return;

        const userLabels = this.getUserItemLabels();
        const filtered = userLabels.filter(l => l.id !== labelId);
        localStorage.setItem('mealplanner_item_labels', JSON.stringify(filtered));

        // Remove from shared labels if applicable
        this.removeFromSharedLabels(labelId);

        this.showNotification('Label deleted successfully', 'success');
        this.loadLabelsForManagement();
    }

    resetLabelForm() {
        const nameInput = document.querySelector('#new-label-name');
        const typeSelect = document.querySelector('#new-label-type');
        const colorInput = document.querySelector('#new-label-color');
        const colorText = document.querySelector('#new-label-color-text');
        const colorPreview = document.querySelector('#color-preview');
        const sharedCheckbox = document.querySelector('#label-is-shared');
        const createBtn = document.querySelector('#create-label-btn');
        const cancelBtn = document.querySelector('#cancel-label-btn');

        if (nameInput) nameInput.value = '';
        if (typeSelect) typeSelect.value = 'item_default';
        if (colorInput) colorInput.value = '#14B8A6';
        if (colorText) colorText.value = '#14B8A6';
        if (colorPreview) colorPreview.style.backgroundColor = '#14B8A6';
        if (sharedCheckbox) sharedCheckbox.checked = false;
        if (createBtn) {
            createBtn.textContent = 'Create Label';
            delete createBtn.dataset.editingId;
        }
        if (cancelBtn) cancelBtn.classList.add('hidden');
    }

    addToSharedLabels(label) {
        const sharedLabels = JSON.parse(localStorage.getItem('mealplanner_shared_labels') || '[]');
        const existing = sharedLabels.find(l => l.sourceId === label.id);
        
        if (!existing) {
            sharedLabels.push({
                id: `shared_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                sourceId: label.id,
                name: label.name,
                color: label.color,
                type: 'shared',
                created_at: new Date().toISOString()
            });
            localStorage.setItem('mealplanner_shared_labels', JSON.stringify(sharedLabels));
        }
    }

    removeFromSharedLabels(labelId) {
        const sharedLabels = JSON.parse(localStorage.getItem('mealplanner_shared_labels') || '[]');
        const filtered = sharedLabels.filter(l => l.sourceId !== labelId);
        localStorage.setItem('mealplanner_shared_labels', JSON.stringify(filtered));
    }

    closeLabelManagement() {
        console.log('🏷️ Closing label management');
        if (this.originalContent) {
            this.container.innerHTML = this.originalContent;
        }
        this.render();
        this.attachEventListeners();
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
            <div class="min-h-screen bg-gray-50 dark:bg-[#b8a890]">
                <!-- Header -->
                <div class="bg-white dark:bg-[#b8a890] shadow-sm border-b border-gray-200 dark:border-[#a09080]">
                    <div class="max-w-4xl mx-auto px-4 py-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <button id="back-to-items" class="p-2 text-gray-600 dark:text-gray-800 hover:text-gray-900 dark:hover:text-black rounded-md hover:bg-gray-100 dark:hover:bg-[#c8b4a0]">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    ${isEdit ? 'Edit Item' : 'Add New Item'}
                                </h1>
                            </div>
                            <div class="flex items-center space-x-3">
                                <button type="button" id="cancel-fullpage-item-form" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md font-medium transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" form="fullpage-item-form" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
                                    ${isEdit ? 'Update' : 'Save'}
                                </button>
                                ${!isEdit ? `
                                <button type="button" id="save-and-add-another-btn" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
                                    Save+
                                </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Content -->
                <div class="max-w-4xl mx-auto px-4 py-6">
                    <form id="fullpage-item-form" class="space-y-6">
                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-[#5a3838] rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label for="item-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Item Name *
                                    </label>
                        <input type="text" id="item-name" name="name" required
                               class="w-full px-3 py-2 border border-gray-300 dark:border-[#a09080] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#d4c4b0] dark:text-gray-900"
                                           placeholder="Enter item name"
                                           value="${isEdit ? item.name || '' : ''}">
                                </div>
                                
                                <div>
                                    <label for="item-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Category
                                    </label>
                                    <select id="item-category" name="category"
                                            class="w-full px-3 py-2 border border-gray-300 dark:border-[#a09080] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#d4c4b0] dark:text-gray-900">
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
                                            class="w-full px-3 py-2 border border-gray-300 dark:border-[#a09080] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#d4c4b0] dark:text-gray-900">
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
                        <div class="bg-white dark:bg-[#b8a890] rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nutrition Information (per 100g)</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label for="nutrition-calories" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Calories
                                    </label>
                                    <input type="number" id="nutrition-calories" name="calories" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-[#a09080] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#d4c4b0] dark:text-gray-900"
                                           placeholder="0.0"
                                           value="${isEdit && item.nutrition_per_100g?.calories ? item.nutrition_per_100g.calories : ''}">
                                </div>
                                
                                <div>
                                    <label for="nutrition-protein" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Protein (g)
                                    </label>
                                    <input type="number" id="nutrition-protein" name="protein" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-[#a09080] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#d4c4b0] dark:text-gray-900"
                                           placeholder="0.0"
                                           value="${isEdit && item.nutrition_per_100g?.protein ? item.nutrition_per_100g.protein : ''}">
                                </div>
                                
                                <div>
                                    <label for="nutrition-carbs" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Carbs (g)
                                    </label>
                                    <input type="number" id="nutrition-carbs" name="carbs" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-[#a09080] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#d4c4b0] dark:text-gray-900"
                                           placeholder="0.0"
                                           value="${isEdit && item.nutrition_per_100g?.carbs ? item.nutrition_per_100g.carbs : ''}">
                                </div>
                                
                                <div>
                                    <label for="nutrition-fat" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Fat (g)
                                    </label>
                                    <input type="number" id="nutrition-fat" name="fat" step="0.1" min="0"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-[#a09080] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#d4c4b0] dark:text-gray-900"
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
        
        // Add handler for "Save + Add Another" button (only appears on new items)
        const saveAndAddBtn = document.querySelector('#save-and-add-another-btn');
        if (saveAndAddBtn) {
            saveAndAddBtn.addEventListener('click', async () => {
                await this.handleSaveAndAddAnother();
            });
        }
    }

    async handleSaveAndAddAnother() {
        console.log('💾 Save + Add Another clicked');
        const form = document.querySelector('#fullpage-item-form');
        if (!form) {
            console.error('Form not found');
            return;
        }
        
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

            // Check for duplicate names
            const duplicateIngredient = this.items.find(ing => 
                ing.name.toLowerCase() === itemData.name.toLowerCase()
            );

            if (duplicateIngredient) {
                this.showNotification('An ingredient with this name already exists', 'error');
                return;
            }

            // Add new item
            itemData.id = Math.max(0, ...this.items.map(ing => ing.id)) + 1;
            itemData.recipe_count = 0;
            itemData.avg_quantity = 0;
            this.items.push(itemData);

            // Save to persistent storage
            this.saveItems();
            
            // Reload data from authoritative source to ensure consistency
            await this.loadItems();

            // Notify other managers to refresh
            if (window.recipeManager && window.recipeManager.loadItems) {
                await window.recipeManager.loadItems();
            }
            if (window.groceryListManager && window.groceryListManager.loadItems) {
                await window.groceryListManager.loadItems();
            }

            // Show success notification
            this.showNotification(`"${itemData.name}" has been added!`, 'success');

            // CRITICAL: Clear navigation stack so that Cancel/Save from the next form
            // goes back to items tab, not to the previous form
            console.log('🔄 Clearing navigation stack for chained add');
            this.navigationStack = [];
            
            // Open a fresh add form
            console.log('➕ Opening fresh add form');
            this.showFullPageItemForm(null, this.onSaveCallback, this.onCancelCallback);
            
        } catch (error) {
            console.error('Error saving item:', error);
            this.showNotification('Error saving item. Please try again.', 'error');
        }
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

            // CRITICAL FIX: Notify RecipeManager to refresh its items when items change
            // This prevents demo data pollution in recipe forms after adding/updating items
            if (window.recipeManager && window.recipeManager.loadItems) {
                console.log('🔄 ITEMS CHANGED: Refreshing RecipeManager items...');
                await window.recipeManager.loadItems();
                console.log('✅ RecipeManager items refreshed successfully');
            }

            // GROCERY LIST SYNC FIX: Notify GroceryListManager to refresh its items when items change
            // This prevents "unknown" items in grocery list until page refresh
            if (window.groceryListManager && window.groceryListManager.loadItems) {
                console.log('🔄 ITEMS CHANGED: Refreshing GroceryListManager items...');
                await window.groceryListManager.loadItems();
                console.log('✅ GroceryListManager items refreshed successfully');
            }

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

            // CRITICAL FIX: Notify RecipeManager to refresh its items when items change
            // This prevents demo data pollution in recipe forms after adding/updating items
            if (window.recipeManager && window.recipeManager.loadItems) {
                console.log('🔄 ITEMS CHANGED: Refreshing RecipeManager items...');
                await window.recipeManager.loadItems();
                console.log('✅ RecipeManager items refreshed successfully');
            }

            // GROCERY LIST SYNC FIX: Notify GroceryListManager to refresh its items when items change
            // This prevents "unknown" items in grocery list until page refresh
            if (window.groceryListManager && window.groceryListManager.loadItems) {
                console.log('🔄 ITEMS CHANGED: Refreshing GroceryListManager items...');
                await window.groceryListManager.loadItems();
                console.log('✅ GroceryListManager items refreshed successfully');
            }
            
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
            
            // Instead of restoring old HTML, render fresh UI with updated data
            this.render();
            window.scrollTo(0, previousView.scrollPosition || 0);
            
            console.log('🥕 Successfully rendered updated items list view');
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
            
            // CRITICAL FIX: Notify RecipeManager to refresh its items when items are deleted
            // This prevents stale ingredient references in recipe forms
            if (window.recipeManager && window.recipeManager.loadItems) {
                console.log('🔄 ITEM DELETED: Refreshing RecipeManager items...');
                await window.recipeManager.loadItems();
                console.log('✅ RecipeManager items refreshed after deletion');
            }
            
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
        this.filteredItems = [];
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

// Browser-only: No exports needed - classes are available as global variables
// Tests should use src/components/ versions which are proper ES6 modules
