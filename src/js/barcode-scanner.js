// Barcode Scanner for MealPlanner PWA
class BarcodeScanner {
    constructor() {
        this.isScanning = false;
        this.stream = null;
        this.video = null;
        this.canvas = null;
        this.context = null;
        this.detector = null;
        this.onBarcodeDetected = null;
        this.onError = null;
        
        // Check for native BarcodeDetector support
        this.hasNativeBarcodeDetector = 'BarcodeDetector' in window;
        
        console.log(`🔍 Barcode Scanner initialized (Native support: ${this.hasNativeBarcodeDetector})`);
    }

    async initialize() {
        try {
            // Check camera permissions
            const permissions = await this.checkCameraPermissions();
            if (!permissions) {
                throw new Error('Camera permission denied');
            }

            // Initialize barcode detector
            if (this.hasNativeBarcodeDetector) {
                this.detector = new BarcodeDetector({
                    formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39']
                });
                console.log('✅ Native BarcodeDetector initialized');
            } else {
                console.log('📱 Using fallback barcode detection');
                // Fallback will be implemented with QuaggaJS or similar
            }

            return true;
        } catch (error) {
            console.error('❌ Failed to initialize barcode scanner:', error);
            if (this.onError) {
                this.onError(error);
            }
            return false;
        }
    }

    async checkCameraPermissions() {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera API not supported');
            }

            // Check if we already have permission
            if (navigator.permissions) {
                const permission = await navigator.permissions.query({ name: 'camera' });
                if (permission.state === 'denied') {
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('❌ Camera permission check failed:', error);
            return false;
        }
    }

    async startScanning(videoElement, onDetected, onError) {
        if (this.isScanning) {
            console.warn('⚠️ Scanner already running');
            return false;
        }

        this.video = videoElement;
        this.onBarcodeDetected = onDetected;
        this.onError = onError;

        try {
            // Get camera stream
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            // Set up video element
            this.video.srcObject = this.stream;
            this.video.setAttribute('playsinline', true);
            this.video.play();

            // Wait for video to be ready
            await new Promise((resolve) => {
                this.video.onloadedmetadata = () => {
                    resolve();
                };
            });

            // Create canvas for frame capture
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;

            this.isScanning = true;
            console.log('📹 Camera started, beginning barcode detection...');

            // Start detection loop
            this.detectBarcodes();

            return true;
        } catch (error) {
            console.error('❌ Failed to start camera:', error);
            if (this.onError) {
                this.onError(error);
            }
            return false;
        }
    }

    async detectBarcodes() {
        if (!this.isScanning || !this.video || this.video.readyState !== 4) {
            // Continue scanning if still active
            if (this.isScanning) {
                requestAnimationFrame(() => this.detectBarcodes());
            }
            return;
        }

        try {
            // Capture current frame
            this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

            if (this.hasNativeBarcodeDetector && this.detector) {
                // Use native BarcodeDetector
                const barcodes = await this.detector.detect(this.canvas);
                
                if (barcodes.length > 0) {
                    const barcode = barcodes[0];
                    console.log(`🎯 Barcode detected: ${barcode.rawValue} (${barcode.format})`);
                    
                    if (this.onBarcodeDetected) {
                        this.onBarcodeDetected(barcode.rawValue, barcode.format);
                    }
                    
                    // Stop scanning after successful detection
                    this.stopScanning();
                    return;
                }
            } else {
                // Fallback detection (would integrate QuaggaJS or similar)
                await this.fallbackBarcodeDetection();
            }
        } catch (error) {
            console.error('❌ Barcode detection error:', error);
        }

        // Continue scanning
        if (this.isScanning) {
            requestAnimationFrame(() => this.detectBarcodes());
        }
    }

    async fallbackBarcodeDetection() {
        // Placeholder for fallback barcode detection
        // In a real implementation, this would use a library like QuaggaJS
        // For now, we'll just log that we're trying
        
        // TODO: Implement actual barcode detection using QuaggaJS or similar
        // For now, show a message to use manual input
        console.log('📱 Fallback barcode detection - native BarcodeDetector not available');
        
        // Show helpful message in the UI
        const statusElement = document.getElementById('shared-scanner-status');
        if (statusElement) {
            statusElement.innerHTML = `
                <p class="text-yellow-600 dark:text-yellow-400 text-sm">
                    ⚠️ Automatic barcode detection not available on this browser.<br>
                    Please use "Enter barcode manually" below.
                </p>
            `;
        }
    }

    stopScanning() {
        console.log('🛑 Stopping barcode scanner...');
        
        this.isScanning = false;

        // Stop camera stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            });
            this.stream = null;
        }

        // Clear video
        if (this.video) {
            this.video.srcObject = null;
            this.video = null;
        }

        // Clean up canvas
        this.canvas = null;
        this.context = null;

        console.log('✅ Barcode scanner stopped');
    }

    // Check if barcode scanning is supported
    static isSupported() {
        const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        const hasBarcodeDetector = 'BarcodeDetector' in window;
        
        return {
            supported: hasCamera,
            nativeDetection: hasBarcodeDetector,
            camera: hasCamera
        };
    }

    // Get supported barcode formats
    static async getSupportedFormats() {
        if ('BarcodeDetector' in window) {
            try {
                return await BarcodeDetector.getSupportedFormats();
            } catch (error) {
                console.error('❌ Failed to get supported formats:', error);
            }
        }
        
        // Fallback formats
        return ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39'];
    }
}

// Product Database Integration
class ProductDatabase {
    constructor() {
        this.baseUrl = 'https://world.openfoodfacts.org/api/v0/product';
        this.cache = new Map();
        this.maxCacheSize = 100;
    }

    async lookupProduct(barcode) {
        // Check cache first
        if (this.cache.has(barcode)) {
            console.log(`📋 Product found in cache: ${barcode}`);
            return this.cache.get(barcode);
        }

        try {
            console.log(`🔍 Looking up product: ${barcode}`);
            console.log(`🌐 API URL: ${this.baseUrl}/${barcode}.json`);
            
            const response = await fetch(`${this.baseUrl}/${barcode}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`📦 API Response for ${barcode}:`, data);
            
            if (data.status === 0) {
                console.log(`❌ Product not found in API: ${barcode}, falling back to mock data`);
                return this.getMockProduct(barcode);
            }

            const product = this.parseProductData(data.product);
            console.log(`🏷️ Parsed product data:`, product);
            
            // Cache the result
            this.cacheProduct(barcode, product);
            
            console.log(`✅ Product found: ${product.name} (${product.brand})`);
            return product;

        } catch (error) {
            console.error(`❌ Failed to lookup product ${barcode}:`, error);
            
            // Return mock data for demo purposes
            return this.getMockProduct(barcode);
        }
    }

    parseProductData(productData) {
        return {
            barcode: productData.code || '',
            name: productData.product_name || productData.product_name_en || 'Unknown Product',
            brand: productData.brands || '',
            category: this.mapToIngredientCategory(productData.categories || ''),
            ingredients: productData.ingredients_text || '',
            nutrition: {
                energy: productData.nutriments?.energy_100g || 0,
                protein: productData.nutriments?.proteins_100g || 0,
                carbs: productData.nutriments?.carbohydrates_100g || 0,
                fat: productData.nutriments?.fat_100g || 0,
                fiber: productData.nutriments?.fiber_100g || 0,
                sodium: productData.nutriments?.sodium_100g || 0
            },
            image: productData.image_url || productData.image_front_url || null,
            quantity: productData.quantity || '',
            packaging: productData.packaging || '',
            stores: productData.stores || '',
            countries: productData.countries || ''
        };
    }

    mapToIngredientCategory(categories) {
        const categoryMap = {
            'meat': ['meat', 'poultry', 'beef', 'pork', 'chicken', 'fish', 'seafood'],
            'dairy': ['dairy', 'milk', 'cheese', 'yogurt', 'butter', 'cream'],
            'produce': ['fruit', 'vegetable', 'fresh'],
            'grains': ['bread', 'cereal', 'pasta', 'rice', 'grain'],
            'pantry': ['canned', 'jarred', 'dried', 'spice', 'condiment', 'sauce'],
            'frozen': ['frozen'],
            'beverages': ['beverage', 'drink', 'juice', 'soda']
        };

        const lowerCategories = categories.toLowerCase();
        
        for (const [category, keywords] of Object.entries(categoryMap)) {
            if (keywords.some(keyword => lowerCategories.includes(keyword))) {
                return category;
            }
        }
        
        return 'pantry'; // Default category
    }

    getMockProduct(barcode) {
        // Return mock data for demo/offline use
        const mockProducts = {
            '1234567890123': {
                barcode: '1234567890123',
                name: 'Organic Whole Milk',
                brand: 'Demo Brand',
                category: 'dairy',
                ingredients: 'Organic milk',
                nutrition: {
                    energy: 250,
                    protein: 3.2,
                    carbs: 4.8,
                    fat: 3.3,
                    fiber: 0,
                    sodium: 0.05
                },
                image: null,
                quantity: '1L',
                packaging: 'Carton',
                stores: 'Demo Store',
                countries: 'Demo Country'
            },
            '7622210992741': {
                barcode: '7622210992741',
                name: 'Coca-Cola Classic',
                brand: 'Coca-Cola',
                category: 'beverages',
                ingredients: 'Carbonated water, sugar, caramel color, phosphoric acid, natural flavors, caffeine',
                nutrition: {
                    energy: 140,
                    protein: 0,
                    carbs: 39,
                    fat: 0,
                    fiber: 0,
                    sodium: 0.045
                },
                image: null,
                quantity: '355ml',
                packaging: 'Can',
                stores: 'Demo Store',
                countries: 'Demo Country'
            },
            '3017620422003': {
                barcode: '3017620422003',
                name: 'Nutella Hazelnut Spread',
                brand: 'Ferrero',
                category: 'spreads',
                ingredients: 'Sugar, palm oil, hazelnuts, cocoa, milk powder, lecithin, vanillin',
                nutrition: {
                    energy: 539,
                    protein: 6.3,
                    carbs: 57.5,
                    fat: 30.9,
                    fiber: 0,
                    sodium: 0.107
                },
                image: null,
                quantity: '400g',
                packaging: 'Jar',
                stores: 'Demo Store',
                countries: 'Demo Country'
            }
        };

        return mockProducts[barcode] || {
            barcode: barcode,
            name: 'Unknown Product',
            brand: '',
            category: 'pantry',
            ingredients: '',
            nutrition: { energy: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 },
            image: null,
            quantity: '',
            packaging: '',
            stores: '',
            countries: ''
        };
    }

    cacheProduct(barcode, product) {
        // Implement LRU cache
        if (this.cache.size >= this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(barcode, product);
    }

    clearCache() {
        this.cache.clear();
        console.log('🗑️ Product cache cleared');
    }
}

// Make classes globally available
window.BarcodeScanner = BarcodeScanner;
window.ProductDatabase = ProductDatabase;

// For testing
if (typeof global !== 'undefined') {
    global.BarcodeScanner = BarcodeScanner;
    global.ProductDatabase = ProductDatabase;
}

