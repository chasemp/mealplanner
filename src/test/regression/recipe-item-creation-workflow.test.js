/**
 * Recipe Item Creation Workflow Regression Test
 * 
 * This test covers the critical workflow where users create new items
 * from within the recipe creation form and ensures:
 * 1. Newly created items appear in the ingredient selection dropdown
 * 2. Created items are automatically added to the recipe form
 * 
 * This is a regression test for the issues reported where:
 * - New items didn't appear in the dropdown after creation
 * - Created items weren't automatically added to the recipe
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem: vi.fn((key) => localStorageMock.store[key] || null),
  setItem: vi.fn((key, value) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  })
};

describe('Recipe Item Creation Workflow Regression Test', () => {
  let dom;
  let window;
  let document;
  let RecipeManager;
  let ItemsManager;
  let SettingsManager;

  beforeEach(async () => {
    // Reset localStorage mock
    localStorageMock.store = {};
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();

    // Create DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <div id="recipe-container"></div>
          <div id="items-container"></div>
        </body>
      </html>
    `, {
      url: 'http://localhost:5173',
      pretendToBeVisual: true,
      resources: 'usable'
    });

    window = dom.window;
    document = window.document;
    
    // Mock global objects
    global.window = window;
    global.document = document;
    global.localStorage = localStorageMock;
    global.console = { log: vi.fn(), error: vi.fn(), warn: vi.fn() };

    // Setup initial demo data
    localStorageMock.store['mealplanner_items'] = JSON.stringify([
      { id: '1', name: 'rice', category: 'pantry', default_unit: 'pieces' },
      { id: '2', name: 'cheese', category: 'dairy', default_unit: 'pieces' },
      { id: '3', name: 'salsa', category: 'produce', default_unit: 'pieces' },
      { id: '4', name: 'tortilla', category: 'bakery', default_unit: 'pieces' },
      { id: '5', name: 'sour cream', category: 'dairy', default_unit: 'pieces' }
    ]);

    // Import and initialize managers
    const { default: RecipeManagerClass } = await import('../../js/recipe-manager.js');
    const { default: ItemsManagerClass } = await import('../../js/items-manager.js');
    const { default: SettingsManagerClass } = await import('../../js/settings-manager.js');
    
    RecipeManager = RecipeManagerClass;
    ItemsManager = ItemsManagerClass;
    SettingsManager = SettingsManagerClass;
  });

  it('should refresh ingredient dropdown when new items are created', async () => {
    // Initialize managers
    const settingsManager = new SettingsManager();
    const recipeContainer = document.getElementById('recipe-container');
    const itemsContainer = document.getElementById('items-container');
    
    const recipeManager = new RecipeManager(recipeContainer);
    const itemsManager = new ItemsManager(itemsContainer);
    
    // Mock the managers being available globally
    window.settingsManager = settingsManager;
    window.itemsManager = itemsManager;
    
    // Load initial items
    await recipeManager.loadItems();
    
    // Verify initial items count
    expect(recipeManager.items).toHaveLength(5);
    expect(recipeManager.items.map(i => i.name)).toContain('rice');
    expect(recipeManager.items.map(i => i.name)).toContain('cheese');
    
    // Open recipe form
    recipeManager.showRecipeForm();
    
    // Get the initial dropdown options
    const initialDropdown = document.querySelector('.ingredient-select');
    expect(initialDropdown).toBeTruthy();
    
    const initialOptions = Array.from(initialDropdown.options).map(opt => opt.textContent);
    expect(initialOptions).toContain('rice');
    expect(initialOptions).toContain('cheese');
    expect(initialOptions).not.toContain('Test Tomato');
    
    // Simulate creating a new item
    const newItem = {
      id: '6',
      name: 'Test Tomato',
      category: 'produce',
      default_unit: 'pieces'
    };
    
    // Add the new item to storage (simulating item creation)
    const currentItems = JSON.parse(localStorageMock.store['mealplanner_items']);
    currentItems.push(newItem);
    localStorageMock.store['mealplanner_items'] = JSON.stringify(currentItems);
    
    // Simulate the addIngredientToRecipeForm method being called
    const ingredientsContainer = document.querySelector('#items-container') || 
                                document.createElement('div');
    
    // Add the new item to the recipe manager's items array
    recipeManager.items.push(newItem);
    
    // Call the method that should refresh the dropdown
    recipeManager.refreshIngredientDropdowns(ingredientsContainer);
    
    // Verify the dropdown was refreshed with the new item
    const updatedOptions = Array.from(initialDropdown.options).map(opt => opt.textContent);
    expect(updatedOptions).toContain('rice');
    expect(updatedOptions).toContain('cheese');
    expect(updatedOptions).toContain('Test Tomato');
    
    // Verify the items count increased
    expect(recipeManager.items).toHaveLength(6);
  });

  it('should automatically add created items to the recipe form', async () => {
    // Initialize managers
    const settingsManager = new SettingsManager();
    const recipeContainer = document.getElementById('recipe-container');
    const itemsContainer = document.getElementById('items-container');
    
    const recipeManager = new RecipeManager(recipeContainer);
    const itemsManager = new ItemsManager(itemsContainer);
    
    // Mock the managers being available globally
    window.settingsManager = settingsManager;
    window.itemsManager = itemsManager;
    
    // Load initial items
    await recipeManager.loadItems();
    
    // Open recipe form
    recipeManager.showRecipeForm();
    
    // Create a mock ingredients container with an empty row
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.innerHTML = `
      <div class="item-row">
        <select class="ingredient-select">
          <option value="">Select item...</option>
          <option value="1">rice</option>
          <option value="2">cheese</option>
        </select>
        <input type="number" class="ingredient-quantity" value="">
        <select class="unit-select">
          <option value="pieces">pieces</option>
        </select>
      </div>
    `;
    
    // Simulate creating a new item
    const newItem = {
      id: '6',
      name: 'Test Onion',
      category: 'produce',
      default_unit: 'pieces'
    };
    
    // Call the method that should add the item to the form
    recipeManager.addIngredientToRecipeForm(newItem, ingredientsContainer);
    
    // Verify the item was added to the recipe manager's items
    expect(recipeManager.items.map(i => i.name)).toContain('Test Onion');
    
    // Verify the dropdown was refreshed
    const select = ingredientsContainer.querySelector('.ingredient-select');
    const options = Array.from(select.options).map(opt => opt.textContent);
    expect(options).toContain('Test Onion');
    
    // Verify the item was selected in the dropdown
    expect(select.value).toBe('6');
    
    // Verify the quantity was set
    const quantityInput = ingredientsContainer.querySelector('.ingredient-quantity');
    expect(quantityInput.value).toBe('1');
    
    // Verify the unit was set
    const unitSelect = ingredientsContainer.querySelector('.unit-select');
    expect(unitSelect.value).toBe('pieces');
  });

  it('should handle the complete workflow from recipe form to item creation and back', async () => {
    // Initialize managers
    const settingsManager = new SettingsManager();
    const recipeContainer = document.getElementById('recipe-container');
    const itemsContainer = document.getElementById('items-container');
    
    const recipeManager = new RecipeManager(recipeContainer);
    const itemsManager = new ItemsManager(itemsContainer);
    
    // Mock the managers being available globally
    window.settingsManager = settingsManager;
    window.itemsManager = itemsManager;
    
    // Load initial items
    await recipeManager.loadItems();
    const initialItemCount = recipeManager.items.length;
    
    // Open recipe form
    recipeManager.showRecipeForm();
    
    // Create a mock ingredients container
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.innerHTML = `
      <div class="item-row">
        <select class="ingredient-select">
          <option value="">Select item...</option>
          ${recipeManager.items.map(item => 
            `<option value="${item.id}">${item.name}</option>`
          ).join('')}
        </select>
        <input type="number" class="ingredient-quantity" value="">
        <select class="unit-select">
          <option value="pieces">pieces</option>
        </select>
      </div>
    `;
    
    // Verify initial state
    const initialSelect = ingredientsContainer.querySelector('.ingredient-select');
    const initialOptions = Array.from(initialSelect.options).map(opt => opt.textContent);
    expect(initialOptions).not.toContain('Test Carrot');
    
    // Simulate the complete workflow
    const newItem = {
      id: '7',
      name: 'Test Carrot',
      category: 'produce',
      default_unit: 'pieces'
    };
    
    // Step 1: Save the new item to storage (simulating item creation)
    const currentItems = JSON.parse(localStorageMock.store['mealplanner_items']);
    currentItems.push(newItem);
    localStorageMock.store['mealplanner_items'] = JSON.stringify(currentItems);
    
    // Step 2: Call the callback that handles returning from item creation
    recipeManager.addIngredientToRecipeForm(newItem, ingredientsContainer);
    
    // Verify the complete workflow worked
    expect(recipeManager.items).toHaveLength(initialItemCount + 1);
    expect(recipeManager.items.map(i => i.name)).toContain('Test Carrot');
    
    // Verify dropdown was refreshed
    const updatedOptions = Array.from(initialSelect.options).map(opt => opt.textContent);
    expect(updatedOptions).toContain('Test Carrot');
    
    // Verify item was automatically selected
    expect(initialSelect.value).toBe('7');
    
    // Verify form was populated
    const quantityInput = ingredientsContainer.querySelector('.ingredient-quantity');
    expect(quantityInput.value).toBe('1');
  });

  it('should handle edge cases gracefully', async () => {
    // Initialize managers
    const settingsManager = new SettingsManager();
    const recipeContainer = document.getElementById('recipe-container');
    const itemsContainer = document.getElementById('items-container');
    
    const recipeManager = new RecipeManager(recipeContainer);
    
    // Mock the managers being available globally
    window.settingsManager = settingsManager;
    
    // Load initial items
    await recipeManager.loadItems();
    
    // Test with empty ingredients container
    const emptyContainer = document.createElement('div');
    
    const newItem = {
      id: '8',
      name: 'Test Pepper',
      category: 'produce',
      default_unit: 'pieces'
    };
    
    // Should not throw error with empty container
    expect(() => {
      recipeManager.addIngredientToRecipeForm(newItem, emptyContainer);
    }).not.toThrow();
    
    // Should still add item to the items array
    expect(recipeManager.items.map(i => i.name)).toContain('Test Pepper');
    
    // Test with duplicate item
    const duplicateItem = {
      id: '8',
      name: 'Test Pepper',
      category: 'produce',
      default_unit: 'pieces'
    };
    
    const initialLength = recipeManager.items.length;
    
    // Should not add duplicate
    recipeManager.addIngredientToRecipeForm(duplicateItem, emptyContainer);
    expect(recipeManager.items).toHaveLength(initialLength);
  });
});
