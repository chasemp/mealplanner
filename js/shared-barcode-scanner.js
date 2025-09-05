// Shared Barcode Scanner Modal Component
class SharedBarcodeScanner {
    constructor() {
        this.isOpen = false;
        this.scanner = null;
        this.productDatabase = null;
        this.onProductFound = null;
        this.onError = null;
        this.currentContext = null; // 'ingredients' or 'recipe'
        
        this.init();
    }

    async init() {
        // Initialize scanner and product database
        if (typeof window.BarcodeScanner !== 'undefined') {
            this.scanner = new window.BarcodeScanner();
            this.productDatabase = new window.ProductDatabase();
            
            const supported = window.BarcodeScanner.isSupported();
            console.log('📱 Shared barcode scanner support:', supported);
            
            if (!supported.supported) {
                console.warn('⚠️ Barcode scanning not supported on this device');
            }
        } else {
            console.warn('⚠️ BarcodeScanner class not available');
        }
        
        this.createModal();
    }

    createModal() {
        // Remove existing modal if present
        const existing = document.getElementById('shared-barcode-scanner-modal');
        if (existing) {
            existing.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'shared-barcode-scanner-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center';
        
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Scan Product Barcode</h3>
                    <button id="close-shared-scanner-btn" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div id="shared-scanner-content">
                    <div id="shared-scanner-status" class="text-center mb-4">
                        <p class="text-gray-600 dark:text-gray-400">Click "Start Scanning" to begin</p>
                    </div>
                    
                    <div id="shared-camera-container" class="relative bg-black rounded-lg overflow-hidden mb-4 hidden" style="aspect-ratio: 4/3;">
                        <video id="shared-scanner-video" class="w-full h-full object-cover" autoplay muted playsinline></video>
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div class="border-2 border-blue-500 w-48 h-32 rounded-lg opacity-70">
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="text-blue-500 text-xs font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                                        Align barcode here
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex gap-2 mb-4">
                        <button id="shared-start-scanner-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Start Scanning
                        </button>
                        <button id="shared-stop-scanner-btn" class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors hidden">
                            Stop Scanning
                        </button>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Or enter barcode manually (for testing):
                        </label>
                        <div class="flex gap-2">
                            <input type="text" id="manual-barcode-input" 
                                   placeholder="Enter barcode number..." 
                                   class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <button id="manual-barcode-submit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Lookup
                            </button>
                        </div>
                    </div>
                    
                    <div id="shared-scanner-error" class="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hidden mb-4">
                        <p class="text-sm"></p>
                    </div>
                    
                    <div id="shared-scanner-result" class="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hidden mb-4">
                        <p class="text-sm font-medium">Barcode detected!</p>
                        <p id="shared-barcode-value" class="text-xs mt-1 font-mono"></p>
                        <p class="text-xs mt-2">Looking up product information...</p>
                    </div>
                    
                    <!-- Product Information Display -->
                    <div id="product-info" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hidden">
                        <div class="flex items-start gap-3">
                            <div id="product-image" class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 hidden">
                                <img class="w-full h-full object-cover rounded-lg" alt="Product">
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 id="product-name" class="font-medium text-gray-900 dark:text-white text-sm"></h4>
                                <p id="product-brand" class="text-xs text-gray-500 dark:text-gray-400 mt-1"></p>
                                <p id="product-category" class="text-xs text-blue-600 dark:text-blue-400 mt-1"></p>
                            </div>
                        </div>
                        
                        <div class="mt-4 flex gap-2">
                            <button id="add-product-btn" class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                Add to <span id="add-context">Ingredients</span>
                            </button>
                            <button id="scan-another-btn" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                Scan Another
                            </button>
                        </div>
                    </div>
                    
                    <!-- Manual Entry Option -->
                    <div class="text-center mt-4">
                        <button id="manual-entry-btn" class="text-blue-500 hover:text-blue-600 text-sm underline">
                            Can't scan? Enter barcode manually
                        </button>
                    </div>
                    
                    <!-- Manual Entry Form -->
                    <div id="manual-entry-form" class="mt-4 hidden">
                        <div class="flex gap-2">
                            <input type="text" id="manual-barcode-input" placeholder="Enter barcode number" 
                                   class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
                            <button id="lookup-manual-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                Lookup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.attachEventListeners();
    }

    attachEventListeners() {
        const modal = document.getElementById('shared-barcode-scanner-modal');
        
        // Close button
        const closeBtn = modal.querySelector('#close-shared-scanner-btn');
        closeBtn.addEventListener('click', () => this.close());
        
        // Start scanning
        const startBtn = modal.querySelector('#shared-start-scanner-btn');
        startBtn.addEventListener('click', () => this.startScanning());
        
        // Stop scanning
        const stopBtn = modal.querySelector('#shared-stop-scanner-btn');
        stopBtn.addEventListener('click', () => this.stopScanning());
        
        // Add product
        const addBtn = modal.querySelector('#add-product-btn');
        addBtn.addEventListener('click', () => this.addProduct());
        
        // Scan another
        const scanAnotherBtn = modal.querySelector('#scan-another-btn');
        scanAnotherBtn.addEventListener('click', () => this.resetForNewScan());
        
        // Manual entry toggle
        const manualBtn = modal.querySelector('#manual-entry-btn');
        manualBtn.addEventListener('click', () => this.toggleManualEntry());
        
        // Manual lookup
        const lookupBtn = modal.querySelector('#lookup-manual-btn');
        lookupBtn.addEventListener('click', () => this.lookupManualBarcode());
        
        // Manual input enter key
        const manualInput = modal.querySelector('#manual-barcode-input');
        manualInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.lookupManualBarcode();
            }
        });
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });
    }

    show(context = 'ingredients', onProductFound = null, onError = null) {
        this.currentContext = context;
        this.onProductFound = onProductFound;
        this.onError = onError;
        this.isOpen = true;
        
        // Update context text
        const contextSpan = document.getElementById('add-context');
        if (contextSpan) {
            contextSpan.textContent = context === 'recipe' ? 'Recipe' : 'Ingredients';
        }
        
        // Reset state
        this.resetForNewScan();
        
        // Show modal
        const modal = document.getElementById('shared-barcode-scanner-modal');
        modal.classList.remove('hidden');
        
        console.log(`📱 Barcode scanner opened for ${context} context`);
    }

    close() {
        if (!this.isOpen) return;
        
        this.stopScanning();
        this.isOpen = false;
        
        const modal = document.getElementById('shared-barcode-scanner-modal');
        modal.classList.add('hidden');
        
        console.log('📱 Barcode scanner closed');
    }

    async startScanning() {
        if (!this.scanner) {
            this.showError('Barcode scanner not available');
            return;
        }

        const video = document.getElementById('shared-scanner-video');
        const cameraContainer = document.getElementById('shared-camera-container');
        const startBtn = document.getElementById('shared-start-scanner-btn');
        const stopBtn = document.getElementById('shared-stop-scanner-btn');
        const status = document.getElementById('shared-scanner-status');
        
        try {
            status.innerHTML = '<p class="text-blue-600 dark:text-blue-400">Starting camera...</p>';
            
            const success = await this.scanner.startScanning(
                video,
                (barcode, format) => this.onBarcodeDetected(barcode, format),
                (error) => this.showError(error.message)
            );
            
            if (success) {
                cameraContainer.classList.remove('hidden');
                startBtn.classList.add('hidden');
                stopBtn.classList.remove('hidden');
                status.innerHTML = '<p class="text-green-600 dark:text-green-400">Scanning... Point camera at barcode</p>';
            } else {
                this.showError('Failed to start camera');
            }
        } catch (error) {
            this.showError(`Camera error: ${error.message}`);
        }
    }

    stopScanning() {
        if (this.scanner) {
            this.scanner.stopScanning();
        }
        
        const cameraContainer = document.getElementById('shared-camera-container');
        const startBtn = document.getElementById('shared-start-scanner-btn');
        const stopBtn = document.getElementById('shared-stop-scanner-btn');
        const status = document.getElementById('shared-scanner-status');
        
        cameraContainer.classList.add('hidden');
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        status.innerHTML = '<p class="text-gray-600 dark:text-gray-400">Click "Start Scanning" to begin</p>';
    }

    async onBarcodeDetected(barcode, format) {
        console.log(`🎯 Barcode detected: ${barcode} (${format})`);
        
        this.stopScanning();
        
        // Show barcode result
        const resultDiv = document.getElementById('shared-scanner-result');
        const barcodeValue = document.getElementById('shared-barcode-value');
        
        resultDiv.classList.remove('hidden');
        barcodeValue.textContent = `${barcode} (${format})`;
        
        // Look up product information
        await this.lookupProduct(barcode);
    }

    async lookupProduct(barcode) {
        if (!this.productDatabase) {
            this.showError('Product database not available');
            return;
        }
        
        try {
            const product = await this.productDatabase.lookupProduct(barcode);
            
            if (product) {
                this.displayProduct(product);
            } else {
                this.showError('Product not found in database');
            }
        } catch (error) {
            console.error('Product lookup error:', error);
            this.showError(`Product lookup failed: ${error.message}`);
        }
    }

    displayProduct(product) {
        const productInfo = document.getElementById('product-info');
        const productName = document.getElementById('product-name');
        const productBrand = document.getElementById('product-brand');
        const productCategory = document.getElementById('product-category');
        const productImage = document.getElementById('product-image');
        
        productName.textContent = product.name;
        productBrand.textContent = product.brand || 'Unknown brand';
        productCategory.textContent = `Category: ${product.category}`;
        
        // Handle product image
        if (product.image) {
            const img = productImage.querySelector('img');
            img.src = product.image;
            img.onerror = () => productImage.classList.add('hidden');
            productImage.classList.remove('hidden');
        } else {
            productImage.classList.add('hidden');
        }
        
        productInfo.classList.remove('hidden');
        
        // Store product for adding
        this.currentProduct = product;
        
        console.log('✅ Product displayed:', product.name);
    }

    async addProduct() {
        if (!this.currentProduct) {
            this.showError('No product selected');
            return;
        }
        
        // Convert product to ingredient format
        const ingredient = this.convertProductToIngredient(this.currentProduct);
        
        // If we're in recipe context, ensure ingredient exists in database
        if (this.currentContext === 'recipe') {
            await this.ensureIngredientInDatabase(ingredient);
        }
        
        if (this.onProductFound) {
            this.onProductFound(ingredient, this.currentContext);
        }
        
        this.close();
    }

    convertProductToIngredient(product) {
        return {
            id: Date.now(), // Temporary ID, will be replaced when saved
            name: product.name,
            category: product.category,
            default_unit: this.guessDefaultUnit(product),
            cost_per_unit: 0, // Will need to be set manually
            storage_notes: product.packaging || '',
            nutrition: {
                calories: product.nutrition.energy || 0,
                protein: product.nutrition.protein || 0,
                carbs: product.nutrition.carbs || 0,
                fat: product.nutrition.fat || 0,
                fiber: product.nutrition.fiber || 0,
                sodium: product.nutrition.sodium || 0
            },
            barcode: product.barcode,
            brand: product.brand,
            image_url: product.image,
            source: 'barcode_scan',
            created_at: new Date().toISOString()
        };
    }

    guessDefaultUnit(product) {
        const quantity = (product.quantity || '').toLowerCase();
        
        if (quantity.includes('ml') || quantity.includes('l')) return 'ml';
        if (quantity.includes('g') || quantity.includes('kg')) return 'g';
        if (quantity.includes('oz') || quantity.includes('lb')) return 'oz';
        if (quantity.includes('cup')) return 'cups';
        if (quantity.includes('tsp') || quantity.includes('tbsp')) return 'tsp';
        
        // Default based on category
        const categoryDefaults = {
            'dairy': 'ml',
            'produce': 'pieces',
            'meat': 'lbs',
            'grains': 'cups',
            'pantry': 'g',
            'beverages': 'ml'
        };
        
        return categoryDefaults[product.category] || 'pieces';
    }

    async ensureIngredientInDatabase(ingredient) {
        // Check if ingredient already exists by name or barcode
        const existingIngredient = await this.findExistingIngredient(ingredient);
        
        if (!existingIngredient) {
            // Add to ingredients database
            await this.addIngredientToDatabase(ingredient);
            console.log(`✅ Added new ingredient to database: ${ingredient.name}`);
        } else {
            console.log(`📋 Ingredient already exists in database: ${existingIngredient.name}`);
            // Update the ingredient with the existing ID
            ingredient.id = existingIngredient.id;
        }
        
        return ingredient;
    }

    async findExistingIngredient(ingredient) {
        // This would normally query the actual database
        // For now, check the demo data or ingredients manager
        if (window.ingredientsManager && window.ingredientsManager.ingredients) {
            return window.ingredientsManager.ingredients.find(existing => 
                existing.name.toLowerCase() === ingredient.name.toLowerCase() ||
                (existing.barcode && existing.barcode === ingredient.barcode)
            );
        }
        
        // Check demo data
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            const demoIngredients = demoData.getIngredients();
            return demoIngredients.find(existing => 
                existing.name.toLowerCase() === ingredient.name.toLowerCase()
            );
        }
        
        return null;
    }

    async addIngredientToDatabase(ingredient) {
        // Add to ingredients manager if available
        if (window.ingredientsManager) {
            // Generate a proper ID
            const maxId = Math.max(0, ...window.ingredientsManager.ingredients.map(i => i.id || 0));
            ingredient.id = maxId + 1;
            
            // Add to the ingredients array
            window.ingredientsManager.ingredients.push(ingredient);
            
            // Refresh the ingredients view if it's currently displayed
            if (window.ingredientsManager.container && !window.ingredientsManager.container.classList.contains('hidden')) {
                window.ingredientsManager.applyFilters();
                window.ingredientsManager.render();
            }
            
            // Show notification
            this.showNotification(`Added "${ingredient.name}" to ingredients database`, 'success');
        }
        
        // In a real app, this would also save to the backend/database
        console.log('💾 Ingredient added to database:', ingredient);
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

    resetForNewScan() {
        // Hide all result/error states
        document.getElementById('shared-scanner-result').classList.add('hidden');
        document.getElementById('shared-scanner-error').classList.add('hidden');
        document.getElementById('product-info').classList.add('hidden');
        document.getElementById('manual-entry-form').classList.add('hidden');
        
        // Reset status
        document.getElementById('shared-scanner-status').innerHTML = 
            '<p class="text-gray-600 dark:text-gray-400">Click "Start Scanning" to begin</p>';
        
        // Clear current product
        this.currentProduct = null;
        
        // Clear manual input
        document.getElementById('manual-barcode-input').value = '';
    }

    toggleManualEntry() {
        const form = document.getElementById('manual-entry-form');
        const input = document.getElementById('manual-barcode-input');
        
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden');
            input.focus();
        } else {
            form.classList.add('hidden');
        }
    }

    async lookupManualBarcode() {
        const input = document.getElementById('manual-barcode-input');
        const barcode = input.value.trim();
        
        if (!barcode) {
            this.showError('Please enter a barcode number');
            return;
        }
        
        if (!/^\d+$/.test(barcode)) {
            this.showError('Barcode must contain only numbers');
            return;
        }
        
        // Show as detected barcode
        const resultDiv = document.getElementById('shared-scanner-result');
        const barcodeValue = document.getElementById('shared-barcode-value');
        
        resultDiv.classList.remove('hidden');
        barcodeValue.textContent = `${barcode} (manual entry)`;
        
        // Look up product
        await this.lookupProduct(barcode);
    }

    showError(message) {
        const errorDiv = document.getElementById('shared-scanner-error');
        const errorText = errorDiv.querySelector('p');
        
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
        
        console.error('📱 Scanner error:', message);
        
        if (this.onError) {
            this.onError(new Error(message));
        }
    }

    // Static method to get or create shared instance
    static getInstance() {
        if (!window.sharedBarcodeScanner) {
            window.sharedBarcodeScanner = new SharedBarcodeScanner();
        }
        return window.sharedBarcodeScanner;
    }
}

// Make available globally
window.SharedBarcodeScanner = SharedBarcodeScanner;

// For testing
if (typeof global !== 'undefined') {
    global.SharedBarcodeScanner = SharedBarcodeScanner;
}
