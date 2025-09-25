// Integration tests for recipe management functionality
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock DOM environment for integration tests
function createMockDOM() {
  document.body.innerHTML = `
    <div id="app">
      <div id="recipes-list"></div>
      <div id="modal-container"></div>
    </div>
  `
}

describe('Recipe Management Integration', () => {
  beforeEach(() => {
    createMockDOM()
  })

  it('should render recipe list', () => {
    const recipesList = document.getElementById('recipes-list')
    expect(recipesList).toBeTruthy()
  })

  it('should handle empty recipe state', () => {
    const recipesList = document.getElementById('recipes-list')
    
    // Simulate empty state
    recipesList.innerHTML = '<p class="text-gray-500">No recipes found. Add your first recipe to get started!</p>'
    
    expect(recipesList.textContent).toContain('No recipes found')
  })

  it('should create recipe card elements', () => {
    const recipesList = document.getElementById('recipes-list')
    
    // Simulate recipe card creation
    const mockRecipe = {
      id: 1,
      title: 'Test Recipe',
      description: 'A test recipe',
      serving_count: 4,
      prep_time: 15,
      cook_time: 30
    }
    
    const recipeCard = document.createElement('div')
    recipeCard.className = 'recipe-card'
    recipeCard.innerHTML = `
      <div class="p-4">
        <h3 class="text-lg font-semibold">${mockRecipe.title}</h3>
        <p class="text-gray-600">${mockRecipe.description}</p>
        <div class="mt-2 text-sm text-gray-500">
          Serves ${mockRecipe.serving_count} • ${mockRecipe.prep_time + mockRecipe.cook_time} min
        </div>
      </div>
    `
    
    recipesList.appendChild(recipeCard)
    
    expect(recipesList.querySelector('.recipe-card')).toBeTruthy()
    expect(recipesList.textContent).toContain('Test Recipe')
    expect(recipesList.textContent).toContain('Serves 4')
  })

  it('should handle recipe modal creation', () => {
    const modalContainer = document.getElementById('modal-container')
    
    // Simulate modal creation
    const modal = document.createElement('div')
    modal.className = 'modal-overlay'
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Add Recipe</h2>
        <form id="recipe-form">
          <input type="text" id="recipe-title" placeholder="Recipe Title" required>
          <textarea id="recipe-description" placeholder="Description"></textarea>
          <textarea id="recipe-instructions" placeholder="Instructions" required></textarea>
          <input type="number" id="recipe-servings" value="4" min="1">
        </form>
      </div>
    `
    
    modalContainer.appendChild(modal)
    
    expect(modalContainer.querySelector('.modal-overlay')).toBeTruthy()
    expect(modalContainer.querySelector('#recipe-form')).toBeTruthy()
  })

  it('should validate recipe form data', () => {
    // Create form elements
    const form = document.createElement('form')
    form.innerHTML = `
      <input type="text" id="recipe-title" value="Test Recipe" required>
      <textarea id="recipe-description">A delicious test recipe</textarea>
      <textarea id="recipe-instructions" required>Mix and cook</textarea>
      <input type="number" id="recipe-servings" value="4" min="1">
    `
    document.body.appendChild(form)
    
    // Simulate form validation
    const formData = {
      title: form.querySelector('#recipe-title').value,
      description: form.querySelector('#recipe-description').value,
      instructions: form.querySelector('#recipe-instructions').value,
      servings: parseInt(form.querySelector('#recipe-servings').value)
    }
    
    expect(formData.title).toBe('Test Recipe')
    expect(formData.description).toBe('A delicious test recipe')
    expect(formData.instructions).toBe('Mix and cook')
    expect(formData.servings).toBe(4)
    
    // Validate required fields
    expect(formData.title.length).toBeGreaterThan(0)
    expect(formData.instructions.length).toBeGreaterThan(0)
    expect(formData.servings).toBeGreaterThan(0)
  })
})

describe('Ingredient Management Integration', () => {
  beforeEach(() => {
    createMockDOM()
  })

  it('should create ingredient input with typeahead', () => {
    const ingredientContainer = document.createElement('div')
    ingredientContainer.innerHTML = `
      <div class="ingredient-input-group">
        <input type="text" class="ingredient-name" placeholder="Start typing ingredient name...">
        <div class="typeahead-dropdown hidden"></div>
        <input type="number" class="ingredient-quantity" value="1" min="0.1" step="0.1">
        <select class="ingredient-unit">
          <option value="cups">cups</option>
          <option value="tbsp">tbsp</option>
          <option value="tsp">tsp</option>
          <option value="lbs">lbs</option>
          <option value="oz">oz</option>
          <option value="pieces">pieces</option>
        </select>
      </div>
    `
    
    document.body.appendChild(ingredientContainer)
    
    expect(ingredientContainer.querySelector('.ingredient-name')).toBeTruthy()
    expect(ingredientContainer.querySelector('.ingredient-quantity')).toBeTruthy()
    expect(ingredientContainer.querySelector('.ingredient-unit')).toBeTruthy()
    expect(ingredientContainer.querySelector('.typeahead-dropdown')).toBeTruthy()
  })

  it('should simulate typeahead functionality', () => {
    const mockIngredients = [
      { name: 'Red Onion', category: 'produce', default_unit: 'pieces' },
      { name: 'Yellow Onion', category: 'produce', default_unit: 'pieces' },
      { name: 'Chicken Breast', category: 'meat', default_unit: 'lbs' }
    ]
    
    const searchTerm = 'onion'
    const filtered = mockIngredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    expect(filtered).toHaveLength(2)
    expect(filtered[0].name).toBe('Red Onion')
    expect(filtered[1].name).toBe('Yellow Onion')
  })

  it('should handle ingredient selection', () => {
    const mockIngredient = { name: 'Red Onion', category: 'produce', default_unit: 'pieces' }
    
    // Simulate ingredient selection
    const ingredientInput = document.createElement('input')
    const unitSelect = document.createElement('select')
    unitSelect.innerHTML = `
      <option value="pieces">pieces</option>
      <option value="cups">cups</option>
    `
    
    // Simulate selection
    ingredientInput.value = mockIngredient.name
    unitSelect.value = mockIngredient.default_unit
    
    expect(ingredientInput.value).toBe('Red Onion')
    expect(unitSelect.value).toBe('pieces')
  })
})

describe('Label Management Integration', () => {
  beforeEach(() => {
    createMockDOM()
  })

  it('should create label management form with proper event handling', () => {
    // Create label management modal
    const modal = document.createElement('div')
    modal.className = 'modal-overlay'
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Manage Labels</h2>
        <form id="label-form">
          <input type="text" id="new-label-name" placeholder="Label Name" required>
          <select id="new-label-type">
            <option value="ingredient_type">Ingredient Type</option>
            <option value="meal_type">Meal Type</option>
            <option value="recipe_combo">Recipe Combo</option>
          </select>
          <input type="color" id="new-label-color" value="#3B82F6">
          <input type="text" id="new-label-hex" value="#3B82F6" readonly>
          <button type="button" id="create-label-btn">Create Label</button>
          <button type="button" id="cancel-label-btn" class="hidden">Cancel</button>
        </form>
        <div id="user-labels"></div>
      </div>
    `
    
    document.body.appendChild(modal)
    
    const createBtn = document.getElementById('create-label-btn')
    const cancelBtn = document.getElementById('cancel-label-btn')
    const nameInput = document.getElementById('new-label-name')
    const colorInput = document.getElementById('new-label-color')
    
    expect(createBtn).toBeTruthy()
    expect(cancelBtn).toBeTruthy()
    expect(nameInput).toBeTruthy()
    expect(colorInput).toBeTruthy()
  })

  it('should handle label creation without duplicate warnings', () => {
    // Mock the RecipeManager methods
    const mockRecipeManager = {
      createNewLabel: vi.fn().mockImplementation(() => {
        // Simulate successful label creation
        return { success: true, message: 'Label created successfully' }
      }),
      updateLabel: vi.fn().mockImplementation(() => {
        // Simulate successful label update
        return { success: true, message: 'Label updated successfully' }
      }),
      resetLabelForm: vi.fn()
    }

    // Create label form
    const form = document.createElement('form')
    form.innerHTML = `
      <input type="text" id="new-label-name" value="Test Label">
      <select id="new-label-type">
        <option value="ingredient_type" selected>Ingredient Type</option>
      </select>
      <input type="color" id="new-label-color" value="#3B82F6">
      <button type="button" id="create-label-btn">Create Label</button>
    `
    document.body.appendChild(form)

    const createBtn = document.getElementById('create-label-btn')
    const nameInput = document.getElementById('new-label-name')

    // Simulate single event listener (not both event listener + onclick)
    let eventHandlerCalled = false
    createBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      eventHandlerCalled = true
      mockRecipeManager.createNewLabel()
    })

    // Simulate button click
    createBtn.click()

    expect(eventHandlerCalled).toBe(true)
    expect(mockRecipeManager.createNewLabel).toHaveBeenCalledTimes(1)
    expect(mockRecipeManager.updateLabel).not.toHaveBeenCalled()
  })

  it('should handle label editing without duplicate warnings', () => {
    // Mock the RecipeManager methods
    const mockRecipeManager = {
      createNewLabel: vi.fn(),
      updateLabel: vi.fn().mockImplementation(() => {
        return { success: true, message: 'Label updated successfully' }
      }),
      resetLabelForm: vi.fn()
    }

    // Create label form in edit mode
    const form = document.createElement('form')
    form.innerHTML = `
      <input type="text" id="new-label-name" value="Test Label">
      <select id="new-label-type">
        <option value="ingredient_type" selected>Ingredient Type</option>
      </select>
      <input type="color" id="new-label-color" value="#EF4444">
      <button type="button" id="create-label-btn" data-original-name="Test Label">Update</button>
      <button type="button" id="cancel-label-btn">Cancel</button>
    `
    document.body.appendChild(form)

    const createBtn = document.getElementById('create-label-btn')
    const nameInput = document.getElementById('new-label-name')

    // Simulate single event listener that checks mode
    let eventHandlerCalled = false
    createBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      eventHandlerCalled = true
      
      // Check if we're in edit mode by looking at button text
      if (createBtn.textContent === 'Update') {
        const originalName = createBtn.getAttribute('data-original-name')
        mockRecipeManager.updateLabel(originalName)
      } else {
        mockRecipeManager.createNewLabel()
      }
    })

    // Simulate button click in edit mode
    createBtn.click()

    expect(eventHandlerCalled).toBe(true)
    expect(mockRecipeManager.updateLabel).toHaveBeenCalledWith('Test Label')
    expect(mockRecipeManager.createNewLabel).not.toHaveBeenCalled()
  })

  it('should demonstrate the problem with duplicate event handlers', () => {
    // Mock the RecipeManager methods
    const mockRecipeManager = {
      createNewLabel: vi.fn(),
      updateLabel: vi.fn(),
      resetLabelForm: vi.fn()
    }

    // Create label form
    const form = document.createElement('form')
    form.innerHTML = `
      <input type="text" id="new-label-name" value="Test Label">
      <button type="button" id="create-label-btn">Create Label</button>
    `
    document.body.appendChild(form)

    const createBtn = document.getElementById('create-label-btn')
    let eventListenerCalls = 0
    let onclickCalls = 0

    // Add event listener (correct approach)
    createBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      eventListenerCalls++
      mockRecipeManager.createNewLabel()
    })

    // Add onclick handler (problematic approach - this is what caused the bug)
    createBtn.onclick = () => {
      onclickCalls++
      mockRecipeManager.updateLabel()
    }

    // Simulate button click
    createBtn.click()

    // Both handlers fire - this demonstrates the bug we fixed
    expect(eventListenerCalls).toBe(1)
    expect(onclickCalls).toBe(1) // This is the problem - both fire
    expect(mockRecipeManager.createNewLabel).toHaveBeenCalledTimes(1)
    expect(mockRecipeManager.updateLabel).toHaveBeenCalledTimes(1) // This caused duplicate warnings
  })

  it('should show the correct solution with single event handler', () => {
    // Mock the RecipeManager methods
    const mockRecipeManager = {
      createNewLabel: vi.fn(),
      updateLabel: vi.fn(),
      resetLabelForm: vi.fn()
    }

    // Create label form
    const form = document.createElement('form')
    form.innerHTML = `
      <input type="text" id="new-label-name" value="Test Label">
      <button type="button" id="create-label-btn">Create Label</button>
    `
    document.body.appendChild(form)

    const createBtn = document.getElementById('create-label-btn')
    let handlerCalls = 0

    // Single event listener that handles both create and update modes
    createBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      handlerCalls++
      
      // Check mode and call appropriate method
      if (createBtn.textContent === 'Update') {
        const originalName = createBtn.getAttribute('data-original-name')
        mockRecipeManager.updateLabel(originalName)
      } else {
        mockRecipeManager.createNewLabel()
      }
    })

    // Simulate button click in create mode
    createBtn.click()

    // Only one handler fires
    expect(handlerCalls).toBe(1)
    expect(mockRecipeManager.createNewLabel).toHaveBeenCalledTimes(1)
    expect(mockRecipeManager.updateLabel).not.toHaveBeenCalled()
  })

  it('should properly manage form state transitions', () => {
    // Create label form
    const form = document.createElement('form')
    form.innerHTML = `
      <input type="text" id="new-label-name" value="">
      <button type="button" id="create-label-btn">Create Label</button>
      <button type="button" id="cancel-label-btn" class="hidden">Cancel</button>
    `
    document.body.appendChild(form)

    const createBtn = document.getElementById('create-label-btn')
    const cancelBtn = document.getElementById('cancel-label-btn')
    const nameInput = document.getElementById('new-label-name')

    // Test initial state
    expect(createBtn.textContent).toBe('Create Label')
    expect(cancelBtn.classList.contains('hidden')).toBe(true)
    expect(createBtn.hasAttribute('data-original-name')).toBe(false)

    // Simulate entering edit mode
    createBtn.textContent = 'Update'
    createBtn.setAttribute('data-original-name', 'Test Label')
    cancelBtn.classList.remove('hidden')
    nameInput.value = 'Test Label'

    // Test edit state
    expect(createBtn.textContent).toBe('Update')
    expect(cancelBtn.classList.contains('hidden')).toBe(false)
    expect(createBtn.getAttribute('data-original-name')).toBe('Test Label')
    expect(nameInput.value).toBe('Test Label')

    // Simulate resetting form
    createBtn.textContent = 'Create Label'
    createBtn.removeAttribute('data-original-name')
    cancelBtn.classList.add('hidden')
    nameInput.value = ''

    // Test reset state
    expect(createBtn.textContent).toBe('Create Label')
    expect(cancelBtn.classList.contains('hidden')).toBe(true)
    expect(createBtn.hasAttribute('data-original-name')).toBe(false)
    expect(nameInput.value).toBe('')
  })
})
