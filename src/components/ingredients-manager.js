// Ingredients Management Component with Barcode Scanning
export class IngredientsManager {
    constructor(database) {
        this.db = database
        this.ingredients = []
        this.filteredIngredients = []
        this.currentFilter = { search: '', category: '' }
        this.scanner = null
    }

    async loadIngredients() {
        try {
            const result = this.db.exec(`
                SELECT i.*, 
                       COUNT(ri.recipe_id) as recipe_count,
                       AVG(ri.quantity) as avg_quantity
                FROM ingredients i
                LEFT JOIN recipe_ingredients ri ON i.id = ri.ingredient_id
                GROUP BY i.id
                ORDER BY i.name ASC
            `)
            
            if (result.length > 0) {
                this.ingredients = result[0].values.map(row => {
                    const columns = result[0].columns
                    const ingredient = {}
                    columns.forEach((col, index) => {
                        ingredient[col] = row[index]
                    })
                    return ingredient
                })
            } else {
                this.ingredients = []
            }
            
            this.applyFilters()
            this.render()
        } catch (error) {
            console.error('Failed to load ingredients:', error)
        }
    }

    applyFilters() {
        this.filteredIngredients = this.ingredients.filter(ingredient => {
            const matchesSearch = !this.currentFilter.search || 
                ingredient.name.toLowerCase().includes(this.currentFilter.search.toLowerCase())
            const matchesCategory = !this.currentFilter.category || 
                ingredient.category === this.currentFilter.category
            
            return matchesSearch && matchesCategory
        })
    }

    render() {
        const container = document.getElementById('ingredients-grid')
        if (!container) return

        if (this.filteredIngredients.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-gray-400 text-6xl mb-4">🥕</div>
                    <p class="text-gray-500 text-lg">No ingredients found</p>
                    <p class="text-gray-400 mt-2">
                        ${this.currentFilter.search || this.currentFilter.category 
                            ? 'Try adjusting your search or filters' 
                            : 'Add your first ingredient to get started!'}
                    </p>
                </div>
            `
            return
        }

        container.innerHTML = this.filteredIngredients.map(ingredient => 
            this.createIngredientCard(ingredient)
        ).join('')
    }

    createIngredientCard(ingredient) {
        const categoryColors = {
            produce: 'bg-green-100 text-green-800',
            dairy: 'bg-blue-100 text-blue-800',
            meat: 'bg-red-100 text-red-800',
            pantry: 'bg-yellow-100 text-yellow-800',
            grains: 'bg-orange-100 text-orange-800'
        }

        const categoryEmojis = {
            produce: '🥬',
            dairy: '🥛',
            meat: '🥩',
            pantry: '🏺',
            grains: '🌾'
        }

        return `
            <div class="ingredient-card bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                <div class="p-4">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl">${categoryEmojis[ingredient.category] || '🍽️'}</span>
                            <div>
                                <h3 class="font-medium text-gray-900">${ingredient.name}</h3>
                                <span class="inline-block px-2 py-1 text-xs rounded-full ${categoryColors[ingredient.category] || 'bg-gray-100 text-gray-800'}">
                                    ${ingredient.category || 'Other'}
                                </span>
                            </div>
                        </div>
                        <div class="flex space-x-1">
                            <button class="edit-ingredient-btn text-gray-400 hover:text-blue-600" 
                                    data-ingredient-id="${ingredient.id}" title="Edit">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button class="delete-ingredient-btn text-gray-400 hover:text-red-600" 
                                    data-ingredient-id="${ingredient.id}" title="Delete">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-2 text-sm text-gray-600">
                        <div class="flex justify-between">
                            <span>Default unit:</span>
                            <span class="font-medium">${ingredient.default_unit || 'pieces'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Used in recipes:</span>
                            <span class="font-medium">${ingredient.recipe_count || 0}</span>
                        </div>
                        ${ingredient.nutrition_per_100g ? `
                            <div class="pt-2 border-t">
                                <div class="text-xs text-gray-500">Per 100g:</div>
                                <div class="flex justify-between">
                                    <span>Calories:</span>
                                    <span>${JSON.parse(ingredient.nutrition_per_100g).calories || 'N/A'}</span>
                                </div>
                            </div>
                        ` : ''}
                        ${ingredient.cost_per_unit ? `
                            <div class="flex justify-between">
                                <span>Est. cost:</span>
                                <span class="font-medium text-green-600">$${ingredient.cost_per_unit}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `
    }

    setupEventListeners() {
        // Search and filter
        document.getElementById('ingredient-search')?.addEventListener('input', (e) => {
            this.currentFilter.search = e.target.value
            this.applyFilters()
            this.render()
        })

        document.getElementById('category-filter')?.addEventListener('change', (e) => {
            this.currentFilter.category = e.target.value
            this.applyFilters()
            this.render()
        })

        // Add ingredient
        document.getElementById('add-ingredient-btn')?.addEventListener('click', () => {
            this.showIngredientModal()
        })

        // Barcode scanning
        document.getElementById('scan-barcode-btn')?.addEventListener('click', () => {
            this.startBarcodeScanning()
        })

        // Bulk import
        document.getElementById('bulk-import-btn')?.addEventListener('click', () => {
            this.showBulkImportModal()
        })

        // Card actions (using event delegation)
        document.getElementById('ingredients-grid')?.addEventListener('click', (e) => {
            if (e.target.closest('.edit-ingredient-btn')) {
                const id = e.target.closest('.edit-ingredient-btn').dataset.ingredientId
                this.editIngredient(parseInt(id))
            } else if (e.target.closest('.delete-ingredient-btn')) {
                const id = e.target.closest('.delete-ingredient-btn').dataset.ingredientId
                this.deleteIngredient(parseInt(id))
            }
        })
    }

    showIngredientModal(ingredient = null) {
        const isEdit = ingredient !== null
        const modal = document.createElement('div')
        modal.className = 'modal-overlay'
        modal.innerHTML = `
            <div class="modal-content max-w-2xl">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-4">
                        ${isEdit ? 'Edit Ingredient' : 'Add New Ingredient'}
                    </h2>
                    
                    <form id="ingredient-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input type="text" id="ingredient-name" required
                                       value="${ingredient?.name || ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select id="ingredient-category" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option value="produce" ${ingredient?.category === 'produce' ? 'selected' : ''}>Produce</option>
                                    <option value="dairy" ${ingredient?.category === 'dairy' ? 'selected' : ''}>Dairy</option>
                                    <option value="meat" ${ingredient?.category === 'meat' ? 'selected' : ''}>Meat & Protein</option>
                                    <option value="pantry" ${ingredient?.category === 'pantry' ? 'selected' : ''}>Pantry</option>
                                    <option value="grains" ${ingredient?.category === 'grains' ? 'selected' : ''}>Grains</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Default Unit</label>
                                <select id="ingredient-unit" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option value="pieces" ${ingredient?.default_unit === 'pieces' ? 'selected' : ''}>pieces</option>
                                    <option value="cups" ${ingredient?.default_unit === 'cups' ? 'selected' : ''}>cups</option>
                                    <option value="tbsp" ${ingredient?.default_unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                                    <option value="tsp" ${ingredient?.default_unit === 'tsp' ? 'selected' : ''}>tsp</option>
                                    <option value="lbs" ${ingredient?.default_unit === 'lbs' ? 'selected' : ''}>lbs</option>
                                    <option value="oz" ${ingredient?.default_unit === 'oz' ? 'selected' : ''}>oz</option>
                                    <option value="grams" ${ingredient?.default_unit === 'grams' ? 'selected' : ''}>grams</option>
                                    <option value="ml" ${ingredient?.default_unit === 'ml' ? 'selected' : ''}>ml</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Cost per Unit ($)</label>
                                <input type="number" id="ingredient-cost" step="0.01" min="0"
                                       value="${ingredient?.cost_per_unit || ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Storage Notes</label>
                            <textarea id="ingredient-storage" rows="2"
                                      placeholder="e.g., Store in refrigerator, use within 5 days"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">${ingredient?.storage_notes || ''}</textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Calories (per 100g)</label>
                                <input type="number" id="nutrition-calories" min="0"
                                       value="${ingredient?.nutrition_per_100g ? JSON.parse(ingredient.nutrition_per_100g).calories || '' : ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                                <input type="number" id="nutrition-protein" step="0.1" min="0"
                                       value="${ingredient?.nutrition_per_100g ? JSON.parse(ingredient.nutrition_per_100g).protein || '' : ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                                <input type="number" id="nutrition-carbs" step="0.1" min="0"
                                       value="${ingredient?.nutrition_per_100g ? JSON.parse(ingredient.nutrition_per_100g).carbs || '' : ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                                <input type="number" id="nutrition-fat" step="0.1" min="0"
                                       value="${ingredient?.nutrition_per_100g ? JSON.parse(ingredient.nutrition_per_100g).fat || '' : ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" id="cancel-ingredient" class="btn-secondary">Cancel</button>
                            <button type="submit" class="btn-primary">
                                ${isEdit ? 'Update' : 'Add'} Ingredient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `
        
        document.getElementById('modal-container').appendChild(modal)
        
        // Event listeners
        document.getElementById('cancel-ingredient').addEventListener('click', () => modal.remove())
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove()
        })
        
        document.getElementById('ingredient-form').addEventListener('submit', (e) => {
            e.preventDefault()
            this.saveIngredient(ingredient?.id, modal)
        })
        
        // Focus on name field
        document.getElementById('ingredient-name').focus()
    }

    async saveIngredient(ingredientId, modal) {
        try {
            const formData = {
                name: document.getElementById('ingredient-name').value.trim(),
                category: document.getElementById('ingredient-category').value,
                default_unit: document.getElementById('ingredient-unit').value,
                storage_notes: document.getElementById('ingredient-storage').value.trim() || null,
                nutrition_per_100g: JSON.stringify({
                    calories: document.getElementById('nutrition-calories').value || null,
                    protein: document.getElementById('nutrition-protein').value || null,
                    carbs: document.getElementById('nutrition-carbs').value || null,
                    fat: document.getElementById('nutrition-fat').value || null
                })
            }
            
            if (!formData.name) {
                alert('Please enter an ingredient name')
                return
            }
            
            if (ingredientId) {
                // Update existing ingredient
                this.db.exec(`
                    UPDATE ingredients 
                    SET name = ?, category = ?, default_unit = ?, 
                        storage_notes = ?, nutrition_per_100g = ?
                    WHERE id = ?
                `, [formData.name, formData.category, formData.default_unit,
                    formData.storage_notes, formData.nutrition_per_100g, ingredientId])
            } else {
                // Add new ingredient
                this.db.exec(`
                    INSERT INTO ingredients (name, category, default_unit, storage_notes, nutrition_per_100g)
                    VALUES (?, ?, ?, ?, ?)
                `, [formData.name, formData.category, formData.default_unit,
                    formData.storage_notes, formData.nutrition_per_100g])
            }
            
            modal.remove()
            await this.loadIngredients()
            
            // Show success notification
            window.app?.showNotification(
                ingredientId ? 'Ingredient updated successfully' : 'Ingredient added successfully',
                'success'
            )
            
        } catch (error) {
            console.error('Failed to save ingredient:', error)
            alert('Failed to save ingredient. Please try again.')
        }
    }

    async editIngredient(id) {
        const ingredient = this.ingredients.find(ing => ing.id === id)
        if (ingredient) {
            this.showIngredientModal(ingredient)
        }
    }

    async deleteIngredient(id) {
        const ingredient = this.ingredients.find(ing => ing.id === id)
        if (!ingredient) return
        
        if (confirm(`Are you sure you want to delete "${ingredient.name}"? This action cannot be undone.`)) {
            try {
                this.db.exec('DELETE FROM ingredients WHERE id = ?', [id])
                await this.loadIngredients()
                
                window.app?.showNotification('Ingredient deleted successfully', 'success')
            } catch (error) {
                console.error('Failed to delete ingredient:', error)
                alert('Failed to delete ingredient. It may be used in recipes.')
            }
        }
    }

    async startBarcodeScanning() {
        try {
            // Check if camera is available
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('Camera access is not available in this browser')
                return
            }
            
            this.showBarcodeScannerModal()
            
        } catch (error) {
            console.error('Failed to start barcode scanning:', error)
            alert('Failed to access camera. Please check permissions.')
        }
    }

    showBarcodeScannerModal() {
        const modal = document.createElement('div')
        modal.className = 'modal-overlay'
        modal.innerHTML = `
            <div class="modal-content max-w-lg">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-4">Scan Barcode</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-gray-100 rounded-lg p-8 text-center">
                            <div id="scanner-container" class="relative">
                                <video id="scanner-video" class="w-full rounded-lg hidden"></video>
                                <div id="scanner-placeholder" class="text-gray-500">
                                    <div class="text-4xl mb-2">📱</div>
                                    <p>Click "Start Camera" to begin scanning</p>
                                </div>
                                <div id="scanner-overlay" class="absolute inset-0 border-2 border-red-500 rounded-lg hidden">
                                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 border-2 border-red-500"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="scanner-result" class="hidden">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 class="font-medium text-green-800 mb-2">Product Found!</h3>
                                <div id="product-info"></div>
                            </div>
                        </div>
                        
                        <div class="flex justify-between">
                            <button id="start-camera" class="btn-primary">Start Camera</button>
                            <button id="stop-scanner" class="btn-secondary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        
        document.getElementById('modal-container').appendChild(modal)
        
        // Event listeners
        document.getElementById('start-camera').addEventListener('click', () => {
            this.initializeCamera()
        })
        
        document.getElementById('stop-scanner').addEventListener('click', () => {
            this.stopCamera()
            modal.remove()
        })
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.stopCamera()
                modal.remove()
            }
        })
    }

    async initializeCamera() {
        try {
            const video = document.getElementById('scanner-video')
            const placeholder = document.getElementById('scanner-placeholder')
            const overlay = document.getElementById('scanner-overlay')
            
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' } // Use back camera if available
            })
            
            video.srcObject = stream
            video.play()
            
            placeholder.classList.add('hidden')
            video.classList.remove('hidden')
            overlay.classList.remove('hidden')
            
            // Note: In a real implementation, you would integrate a barcode scanning library here
            // such as QuaggaJS, ZXing-js, or use the experimental BarcodeDetector API
            this.simulateBarcodeDetection()
            
        } catch (error) {
            console.error('Failed to access camera:', error)
            alert('Failed to access camera. Please check permissions.')
        }
    }

    simulateBarcodeDetection() {
        // Simulate barcode detection for demo purposes
        setTimeout(() => {
            const mockBarcode = '123456789012'
            this.handleBarcodeDetected(mockBarcode)
        }, 3000)
    }

    async handleBarcodeDetected(barcode) {
        try {
            // In a real implementation, you would call a product database API
            // such as OpenFoodFacts, UPC Database, or similar
            const productInfo = await this.lookupProduct(barcode)
            
            const resultDiv = document.getElementById('scanner-result')
            const productInfoDiv = document.getElementById('product-info')
            
            if (productInfo) {
                productInfoDiv.innerHTML = `
                    <div class="space-y-2">
                        <p><strong>Name:</strong> ${productInfo.name}</p>
                        <p><strong>Brand:</strong> ${productInfo.brand || 'Unknown'}</p>
                        <p><strong>Category:</strong> ${productInfo.category || 'Unknown'}</p>
                        <button id="add-scanned-product" class="btn-primary mt-3">
                            Add to Ingredients
                        </button>
                    </div>
                `
                
                document.getElementById('add-scanned-product').addEventListener('click', () => {
                    this.addScannedProduct(productInfo)
                })
            } else {
                productInfoDiv.innerHTML = `
                    <p class="text-red-600">Product not found in database</p>
                    <button id="add-manual-barcode" class="btn-secondary mt-3">
                        Add Manually
                    </button>
                `
                
                document.getElementById('add-manual-barcode').addEventListener('click', () => {
                    this.showIngredientModal({ barcode })
                })
            }
            
            resultDiv.classList.remove('hidden')
            
        } catch (error) {
            console.error('Failed to lookup product:', error)
        }
    }

    async lookupProduct(barcode) {
        // Mock product lookup - in reality, you'd call an API like OpenFoodFacts
        const mockProducts = {
            '123456789012': {
                name: 'Organic Tomatoes',
                brand: 'Fresh Farm',
                category: 'produce',
                nutrition: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 }
            }
        }
        
        return mockProducts[barcode] || null
    }

    addScannedProduct(productInfo) {
        // Pre-fill the ingredient form with scanned product data
        this.showIngredientModal({
            name: productInfo.name,
            category: productInfo.category,
            nutrition_per_100g: JSON.stringify(productInfo.nutrition || {})
        })
    }

    stopCamera() {
        const video = document.getElementById('scanner-video')
        if (video && video.srcObject) {
            const tracks = video.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        }
    }

    showBulkImportModal() {
        // Implementation for bulk importing ingredients from CSV, grocery lists, etc.
        alert('Bulk import feature coming soon!')
    }
}
