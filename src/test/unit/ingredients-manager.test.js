// Unit tests for IngredientsManager class
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { IngredientsManager } from '../../components/ingredients-manager.js'

// Mock database
const createMockDatabase = () => ({
  exec: vi.fn(),
  close: vi.fn()
})

// Mock DOM
const createMockDOM = () => {
  document.body.innerHTML = `
    <div id="ingredients-grid"></div>
    <input id="ingredient-search" />
    <select id="category-filter"></select>
    <button id="add-ingredient-btn"></button>
    <button id="scan-barcode-btn"></button>
    <button id="bulk-import-btn"></button>
    <div id="modal-container"></div>
  `
}

describe('IngredientsManager', () => {
  let ingredientsManager
  let mockDb

  beforeEach(() => {
    createMockDOM()
    mockDb = createMockDatabase()
    ingredientsManager = new IngredientsManager(mockDb)
  })

  describe('Initialization', () => {
    it('should initialize with empty ingredients array', () => {
      expect(ingredientsManager.ingredients).toEqual([])
      expect(ingredientsManager.filteredIngredients).toEqual([])
    })

    it('should initialize with default filter state', () => {
      expect(ingredientsManager.currentFilter).toEqual({
        search: '',
        category: ''
      })
    })
  })

  describe('loadIngredients', () => {
    it('should load ingredients from database successfully', async () => {
      const mockResult = [{
        columns: ['id', 'name', 'category', 'default_unit', 'recipe_count'],
        values: [
          [1, 'Red Onion', 'produce', 'pieces', 5],
          [2, 'Chicken Breast', 'meat', 'lbs', 3],
          [3, 'Milk', 'dairy', 'cups', 2]
        ]
      }]
      
      mockDb.exec.mockReturnValue(mockResult)
      
      await ingredientsManager.loadIngredients()
      
      expect(mockDb.exec).toHaveBeenCalledWith(expect.stringContaining('SELECT i.*'))
      expect(ingredientsManager.ingredients).toHaveLength(3)
      expect(ingredientsManager.ingredients[0].name).toBe('Red Onion')
      expect(ingredientsManager.ingredients[1].name).toBe('Chicken Breast')
    })

    it('should handle empty database result', async () => {
      mockDb.exec.mockReturnValue([])
      
      await ingredientsManager.loadIngredients()
      
      expect(ingredientsManager.ingredients).toEqual([])
      expect(ingredientsManager.filteredIngredients).toEqual([])
    })

    it('should handle database errors gracefully', async () => {
      mockDb.exec.mockImplementation(() => {
        throw new Error('Database error')
      })
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      await ingredientsManager.loadIngredients()
      
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load ingredients:', expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe('applyFilters', () => {
    beforeEach(() => {
      ingredientsManager.ingredients = [
        { id: 1, name: 'Red Onion', category: 'produce' },
        { id: 2, name: 'Chicken Breast', category: 'meat' },
        { id: 3, name: 'Yellow Onion', category: 'produce' },
        { id: 4, name: 'Milk', category: 'dairy' }
      ]
    })

    it('should filter by search term', () => {
      ingredientsManager.currentFilter.search = 'onion'
      ingredientsManager.applyFilters()
      
      expect(ingredientsManager.filteredIngredients).toHaveLength(2)
      expect(ingredientsManager.filteredIngredients[0].name).toBe('Red Onion')
      expect(ingredientsManager.filteredIngredients[1].name).toBe('Yellow Onion')
    })

    it('should filter by category', () => {
      ingredientsManager.currentFilter.category = 'produce'
      ingredientsManager.applyFilters()
      
      expect(ingredientsManager.filteredIngredients).toHaveLength(2)
      expect(ingredientsManager.filteredIngredients.every(ing => ing.category === 'produce')).toBe(true)
    })

    it('should filter by both search and category', () => {
      ingredientsManager.currentFilter.search = 'red'
      ingredientsManager.currentFilter.category = 'produce'
      ingredientsManager.applyFilters()
      
      expect(ingredientsManager.filteredIngredients).toHaveLength(1)
      expect(ingredientsManager.filteredIngredients[0].name).toBe('Red Onion')
    })

    it('should return all ingredients when no filters applied', () => {
      ingredientsManager.applyFilters()
      
      expect(ingredientsManager.filteredIngredients).toHaveLength(4)
    })

    it('should be case insensitive for search', () => {
      ingredientsManager.currentFilter.search = 'CHICKEN'
      ingredientsManager.applyFilters()
      
      expect(ingredientsManager.filteredIngredients).toHaveLength(1)
      expect(ingredientsManager.filteredIngredients[0].name).toBe('Chicken Breast')
    })
  })

  describe('createIngredientCard', () => {
    it('should create ingredient card with all details', () => {
      const ingredient = {
        id: 1,
        name: 'Red Onion',
        category: 'produce',
        default_unit: 'pieces',
        recipe_count: 5,
        cost_per_unit: 0.75,
        nutrition_per_100g: JSON.stringify({ calories: 40, protein: 1.1 })
      }
      
      const cardHTML = ingredientsManager.createIngredientCard(ingredient)
      
      expect(cardHTML).toContain('Red Onion')
      expect(cardHTML).toContain('produce')
      expect(cardHTML).toContain('pieces')
      expect(cardHTML).toContain('5')
      expect(cardHTML).toContain('$0.75')
      expect(cardHTML).toContain('40')
      expect(cardHTML).toContain('data-ingredient-id="1"')
    })

    it('should handle missing optional fields', () => {
      const ingredient = {
        id: 2,
        name: 'Basic Ingredient',
        category: null,
        default_unit: 'pieces',
        recipe_count: 0
      }
      
      const cardHTML = ingredientsManager.createIngredientCard(ingredient)
      
      expect(cardHTML).toContain('Basic Ingredient')
      expect(cardHTML).toContain('Other') // default category
      expect(cardHTML).not.toContain('$') // no cost
    })
  })

  describe('saveIngredient', () => {
    let mockModal

    beforeEach(() => {
      mockModal = {
        remove: vi.fn()
      }
      
      // Mock form elements
      document.body.innerHTML += `
        <input id="ingredient-name" value="Test Ingredient" />
        <select id="ingredient-category"><option value="produce" selected>Produce</option></select>
        <select id="ingredient-unit"><option value="pieces" selected>pieces</option></select>
        <input id="ingredient-cost" value="1.50" />
        <textarea id="ingredient-storage">Store in cool place</textarea>
        <input id="nutrition-calories" value="25" />
        <input id="nutrition-protein" value="1.2" />
        <input id="nutrition-carbs" value="5.8" />
        <input id="nutrition-fat" value="0.3" />
      `
    })

    it('should save new ingredient successfully', async () => {
      mockDb.exec.mockImplementation(() => {})
      ingredientsManager.loadIngredients = vi.fn()
      window.app = { showNotification: vi.fn() }
      
      await ingredientsManager.saveIngredient(null, mockModal)
      
      expect(mockDb.exec).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO ingredients'),
        expect.arrayContaining(['Test Ingredient', 'produce', 'pieces'])
      )
      expect(mockModal.remove).toHaveBeenCalled()
      expect(ingredientsManager.loadIngredients).toHaveBeenCalled()
      expect(window.app.showNotification).toHaveBeenCalledWith(
        'Ingredient added successfully',
        'success'
      )
    })

    it('should update existing ingredient', async () => {
      mockDb.exec.mockImplementation(() => {})
      ingredientsManager.loadIngredients = vi.fn()
      window.app = { showNotification: vi.fn() }
      
      await ingredientsManager.saveIngredient(123, mockModal)
      
      expect(mockDb.exec).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE ingredients'),
        expect.arrayContaining([expect.anything(), expect.anything(), expect.anything(), expect.anything(), expect.anything(), expect.anything(), 123])
      )
      expect(window.app.showNotification).toHaveBeenCalledWith(
        'Ingredient updated successfully',
        'success'
      )
    })

    it('should validate required fields', async () => {
      document.getElementById('ingredient-name').value = ''
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      await ingredientsManager.saveIngredient(null, mockModal)
      
      expect(alertSpy).toHaveBeenCalledWith('Please enter an ingredient name')
      expect(mockDb.exec).not.toHaveBeenCalled()
      expect(mockModal.remove).not.toHaveBeenCalled()
      
      alertSpy.mockRestore()
    })

    it('should handle database errors', async () => {
      mockDb.exec.mockImplementation(() => {
        throw new Error('Database error')
      })
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      await ingredientsManager.saveIngredient(null, mockModal)
      
      expect(consoleSpy).toHaveBeenCalledWith('Failed to save ingredient:', expect.any(Error))
      expect(alertSpy).toHaveBeenCalledWith('Failed to save ingredient. Please try again.')
      
      alertSpy.mockRestore()
      consoleSpy.mockRestore()
    })
  })

  describe('deleteIngredient', () => {
    beforeEach(() => {
      ingredientsManager.ingredients = [
        { id: 1, name: 'Red Onion', category: 'produce' }
      ]
    })

    it('should delete ingredient after confirmation', async () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
      mockDb.exec.mockImplementation(() => {})
      ingredientsManager.loadIngredients = vi.fn()
      window.app = { showNotification: vi.fn() }
      
      await ingredientsManager.deleteIngredient(1)
      
      expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete "Red Onion"? This action cannot be undone.')
      expect(mockDb.exec).toHaveBeenCalledWith('DELETE FROM ingredients WHERE id = ?', [1])
      expect(ingredientsManager.loadIngredients).toHaveBeenCalled()
      expect(window.app.showNotification).toHaveBeenCalledWith('Ingredient deleted successfully', 'success')
      
      confirmSpy.mockRestore()
    })

    it('should not delete if user cancels', async () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)
      
      await ingredientsManager.deleteIngredient(1)
      
      expect(mockDb.exec).not.toHaveBeenCalled()
      
      confirmSpy.mockRestore()
    })

    it('should handle deletion errors', async () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
      mockDb.exec.mockImplementation(() => {
        throw new Error('Foreign key constraint')
      })
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      await ingredientsManager.deleteIngredient(1)
      
      expect(consoleSpy).toHaveBeenCalledWith('Failed to delete ingredient:', expect.any(Error))
      expect(alertSpy).toHaveBeenCalledWith('Failed to delete ingredient. It may be used in recipes.')
      
      confirmSpy.mockRestore()
      alertSpy.mockRestore()
      consoleSpy.mockRestore()
    })
  })

  describe('Barcode Scanning', () => {
    it('should show barcode scanner modal', () => {
      ingredientsManager.showBarcodeScannerModal()
      
      const modal = document.querySelector('.modal-overlay')
      expect(modal).toBeTruthy()
      expect(modal.innerHTML).toContain('Scan Barcode')
      expect(modal.innerHTML).toContain('Start Camera')
    })

    it('should handle product lookup', async () => {
      const mockProduct = {
        name: 'Organic Tomatoes',
        brand: 'Fresh Farm',
        category: 'produce',
        nutrition: { calories: 18, protein: 0.9 }
      }
      
      ingredientsManager.lookupProduct = vi.fn().mockResolvedValue(mockProduct)
      ingredientsManager.showIngredientModal = vi.fn()
      
      // Mock DOM for barcode result
      document.body.innerHTML += `
        <div id="scanner-result" class="hidden"></div>
        <div id="product-info"></div>
      `
      
      await ingredientsManager.handleBarcodeDetected('123456789012')
      
      expect(ingredientsManager.lookupProduct).toHaveBeenCalledWith('123456789012')
      
      const resultDiv = document.getElementById('scanner-result')
      const productInfo = document.getElementById('product-info')
      
      expect(resultDiv.classList.contains('hidden')).toBe(false)
      expect(productInfo.innerHTML).toContain('Organic Tomatoes')
      expect(productInfo.innerHTML).toContain('Fresh Farm')
    })

    it('should handle product not found', async () => {
      ingredientsManager.lookupProduct = vi.fn().mockResolvedValue(null)
      
      document.body.innerHTML += `
        <div id="scanner-result" class="hidden"></div>
        <div id="product-info"></div>
      `
      
      await ingredientsManager.handleBarcodeDetected('999999999999')
      
      const productInfo = document.getElementById('product-info')
      expect(productInfo.innerHTML).toContain('Product not found in database')
      expect(productInfo.innerHTML).toContain('Add Manually')
    })
  })

  describe('Event Listeners', () => {
    it('should set up search event listener', () => {
      const searchInput = document.getElementById('ingredient-search')
      ingredientsManager.setupEventListeners()
      
      // Simulate search input
      searchInput.value = 'test'
      searchInput.dispatchEvent(new Event('input'))
      
      expect(ingredientsManager.currentFilter.search).toBe('test')
    })

    it('should set up category filter event listener', () => {
      const categoryFilter = document.getElementById('category-filter')
      ingredientsManager.setupEventListeners()
      
      // Simulate category change
      categoryFilter.value = 'produce'
      categoryFilter.dispatchEvent(new Event('change'))
      
      expect(ingredientsManager.currentFilter.category).toBe('produce')
    })
  })
})
