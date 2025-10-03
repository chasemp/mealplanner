// Unit tests for MealManager class
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Setup DOM environment
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        <div id="meal-manager-container"></div>
    </body>
    </html>
`);

global.window = dom.window;
global.document = dom.window.document;

// Mock localStorage
global.localStorage = {
    data: {},
    getItem(key) { return this.data[key] || null; },
    setItem(key, value) { this.data[key] = value; },
    removeItem(key) { delete this.data[key]; },
    clear() { this.data = {}; }
};

// Mock window.alert and window.confirm
global.window.alert = vi.fn();
global.window.confirm = vi.fn();
global.alert = vi.fn();
global.confirm = vi.fn();

// Mock DemoDataManager
global.window.DemoDataManager = class MockDemoDataManager {
    getRecipes() {
        return [
            {
                id: 1,
                title: 'Spaghetti Bolognese',
                type: 'basic',
                prep_time: 15,
                cook_time: 30,
                servings: 4,
                labels: ['italian', 'pasta', 'comfort']
            },
            {
                id: 2,
                title: 'Caesar Salad',
                type: 'basic',
                prep_time: 10,
                cook_time: 0,
                servings: 4,
                labels: ['salad', 'fresh', 'quick']
            },
            {
                id: 13,
                title: 'Italian Night Combo',
                type: 'combo',
                prep_time: 25,
                cook_time: 30,
                servings: 4,
                labels: ['italian', 'combo', 'complete'],
                combo_recipes: [
                    { recipe_id: 1, servings_multiplier: 1 },
                    { recipe_id: 2, servings_multiplier: 1 }
                ]
            }
        ];
    }
};

// Import MealManager after DOM setup
await import('../../js/meal-manager.js');
const MealManager = global.window.MealManager;

describe('MealManager', () => {
    let mealManager;
    let container;

    beforeEach(async () => {
        // Reset DOM
        document.body.innerHTML = '<div id="meal-manager-container"></div>';
        container = document.getElementById('meal-manager-container');
        
        // Clear localStorage
        localStorage.clear();
        
        // Mock SettingsManager to provide demo data via centralized authority
        global.window.mealPlannerSettings = {
            getCurrentDatabaseSource() {
                return 'demo';
            },
            shouldLoadDemoData() {
                return true;
            },
            getAuthoritativeData(dataType) {
                const demoData = new global.window.DemoDataManager();
                switch (dataType) {
                    case 'recipes':
                        return demoData.getRecipes();
                    case 'meals':
                        return demoData.getMeals ? demoData.getMeals() : [];
                    default:
                        return [];
                }
            },
            saveAuthoritativeData(dataType, data) {
                // Mock save - actually save to localStorage for testing
                localStorage.setItem(`mealplanner_${dataType}`, JSON.stringify(data));
                console.log(`Mock save: ${dataType} with ${data.length} items`);
            }
        };
        
        // Create MealManager instance
        mealManager = new MealManager(container);
        
        // Wait for initialization
        await new Promise(resolve => setTimeout(resolve, 100));
    });

    afterEach(() => {
        // Clean up any modals
        document.querySelectorAll('#meal-form-modal').forEach(modal => modal.remove());
        localStorage.clear();
    });

    describe('Initialization', () => {
        it('should initialize with empty meals array', () => {
            expect(mealManager.meals).toEqual([]);
        });

        it('should load recipes from DemoDataManager', () => {
            expect(mealManager.recipes).toHaveLength(3);
            expect(mealManager.recipes[0].title).toBe('Spaghetti Bolognese');
        });

        it('should render meal manager interface', () => {
            expect(container.querySelector('.meal-manager')).toBeTruthy();
            expect(container.querySelector('#add-meal-btn')).toBeTruthy();
            expect(container.querySelector('#meals-grid')).toBeTruthy();
        });

        it('should show empty state when no meals exist', () => {
            const emptyState = container.querySelector('#empty-state');
            expect(emptyState).toBeTruthy();
            expect(emptyState.classList.contains('hidden')).toBe(false);
        });
    });

    describe('Meal Creation', () => {
        it('should open meal form when Add Meal button is clicked', () => {
            const addBtn = container.querySelector('#add-meal-btn');
            addBtn.click();

            const modal = document.getElementById('meal-form-modal');
            expect(modal).toBeTruthy();
            expect(modal.textContent).toContain('Create New Meal');
        });

        it('should have all required form fields', () => {
            mealManager.showMealForm();
            
            const modal = document.getElementById('meal-form-modal');
            expect(modal.querySelector('#meal-name')).toBeTruthy();
            expect(modal.querySelector('#meal-description')).toBeTruthy();
            expect(modal.querySelector('#meal-servings')).toBeTruthy();
            expect(modal.querySelector('input[name="meal-types"]')).toBeTruthy();
            expect(modal.querySelector('#meal-tags')).toBeTruthy();
        });

        it('should populate recipe options in form', () => {
            mealManager.showMealForm();
            
            // Add a recipe row
            const addRecipeBtn = document.getElementById('add-recipe-to-meal');
            addRecipeBtn.click();
            
            const recipeSelect = document.querySelector('.recipe-select');
            const options = recipeSelect.querySelectorAll('option');
            
            // Should have placeholder + all recipes
            expect(options.length).toBeGreaterThan(1);
            expect(options[0].value).toBe(''); // Placeholder
            expect(options[1].textContent).toContain('Spaghetti Bolognese');
        });

        it('should add recipe rows when Add Recipe button is clicked', () => {
            mealManager.showMealForm();
            
            const addRecipeBtn = document.getElementById('add-recipe-to-meal');
            const recipesContainer = document.getElementById('meal-recipes-container');
            
            // Initially no recipe rows
            expect(recipesContainer.querySelectorAll('.recipe-row')).toHaveLength(0);
            
            // Add first recipe row
            addRecipeBtn.click();
            expect(recipesContainer.querySelectorAll('.recipe-row')).toHaveLength(1);
            
            // Add second recipe row
            addRecipeBtn.click();
            expect(recipesContainer.querySelectorAll('.recipe-row')).toHaveLength(2);
        });

        it('should remove recipe rows when remove button is clicked', () => {
            mealManager.showMealForm();
            
            const addRecipeBtn = document.getElementById('add-recipe-to-meal');
            const recipesContainer = document.getElementById('meal-recipes-container');
            
            // Add two recipe rows
            addRecipeBtn.click();
            addRecipeBtn.click();
            expect(recipesContainer.querySelectorAll('.recipe-row')).toHaveLength(2);
            
            // Remove first row
            const removeBtn = recipesContainer.querySelector('.remove-recipe');
            removeBtn.click();
            expect(recipesContainer.querySelectorAll('.recipe-row')).toHaveLength(1);
        });
    });

    describe('Meal Saving', () => {
        it('should save new meal with valid data', async () => {
            mealManager.showMealForm();
            
            // Fill form
            document.getElementById('meal-name').value = 'Test Meal';
            document.getElementById('meal-description').value = 'A test meal';
            document.getElementById('meal-servings').value = '6';
            document.querySelector('input[name="meal-types"][value="dinner"]').checked = true;
            document.getElementById('meal-tags').value = 'test, family';
            
            // Add a recipe
            document.getElementById('add-recipe-to-meal').click();
            const recipeSelect = document.querySelector('.recipe-select');
            const servingsInput = document.querySelector('.recipe-servings');
            recipeSelect.value = '1';
            servingsInput.value = '4';
            
            const initialMealCount = mealManager.meals.length;
            
            // Submit form
            const form = document.getElementById('meal-form');
            form.dispatchEvent(new Event('submit'));
            
            // Wait for async operation
            await new Promise(resolve => setTimeout(resolve, 100));
            
            expect(mealManager.meals).toHaveLength(initialMealCount + 1);
            
            const newMeal = mealManager.meals[mealManager.meals.length - 1];
            expect(newMeal.name).toBe('Test Meal');
            expect(newMeal.description).toBe('A test meal');
            expect(newMeal.totalServings).toBe(6);
            expect(newMeal.mealTypes).toContain('dinner');
            expect(newMeal.tags).toEqual(['test', 'family']);
            expect(newMeal.recipes).toHaveLength(1);
            expect(newMeal.recipes[0].recipeId).toBe(1);
        });

        it('should validate required fields', async () => {
            const alertSpy = vi.spyOn(global, 'alert').mockImplementation(() => {});
            
            mealManager.showMealForm();
            
            // Submit form without required fields
            const form = document.getElementById('meal-form');
            form.dispatchEvent(new Event('submit'));
            
            expect(alertSpy).toHaveBeenCalledWith('Please enter a meal name');
            
            alertSpy.mockRestore();
        });

        it('should calculate estimated time from recipes', async () => {
            mealManager.showMealForm();
            
            // Fill form
            document.getElementById('meal-name').value = 'Timed Meal';
            document.querySelector('input[name="meal-types"][value="dinner"]').checked = true;
            
            // Add recipe with known prep/cook times
            document.getElementById('add-recipe-to-meal').click();
            const recipeSelect = document.querySelector('.recipe-select');
            recipeSelect.value = '1'; // Spaghetti Bolognese: 15 prep + 30 cook = 45 min
            
            // Submit form
            const form = document.getElementById('meal-form');
            form.dispatchEvent(new Event('submit'));
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const newMeal = mealManager.meals[mealManager.meals.length - 1];
            expect(newMeal.estimatedTime).toBe(45);
        });

        it('should generate unique ID for new meal', async () => {
            mealManager.showMealForm();
            
            // Fill minimal form
            document.getElementById('meal-name').value = 'Unique Meal';
            document.querySelector('input[name="meal-types"][value="dinner"]').checked = true;
            document.getElementById('add-recipe-to-meal').click();
            document.querySelector('.recipe-select').value = '1';
            
            const form = document.getElementById('meal-form');
            form.dispatchEvent(new Event('submit'));
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const newMeal = mealManager.meals[mealManager.meals.length - 1];
            expect(newMeal.id).toBeTruthy();
            expect(typeof newMeal.id).toBe('number');
        });
    });

    describe('Meal Editing', () => {
        beforeEach(async () => {
            // Add a test meal
            const testMeal = {
                id: 1,
                name: 'Test Meal',
                description: 'A test meal',
                recipes: [{ recipeId: 1, servings: 4, notes: '' }],
                totalServings: 4,
                mealTypes: ['dinner'],
                tags: ['test'],
                estimatedTime: 45,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            mealManager.meals.push(testMeal);
            mealManager.render();
        });

        it('should open edit form when edit button is clicked', () => {
            const editBtn = container.querySelector('.edit-meal-btn');
            editBtn.click();

            const modal = document.getElementById('meal-form-modal');
            expect(modal).toBeTruthy();
            expect(modal.textContent).toContain('Edit Meal');
        });

        it('should populate form with existing meal data', () => {
            const editBtn = container.querySelector('.edit-meal-btn');
            editBtn.click();

            expect(document.getElementById('meal-name').value).toBe('Test Meal');
            expect(document.getElementById('meal-description').value).toBe('A test meal');
            expect(document.getElementById('meal-servings').value).toBe('4');
            expect(document.querySelector('input[name="meal-types"][value="dinner"]').checked).toBe(true);
            expect(document.getElementById('meal-tags').value).toBe('test');
        });

        it('should update existing meal', async () => {
            const editBtn = container.querySelector('.edit-meal-btn');
            editBtn.click();

            // Modify form
            document.getElementById('meal-name').value = 'Updated Meal';
            document.getElementById('meal-description').value = 'Updated description';

            const form = document.getElementById('meal-form');
            form.dispatchEvent(new Event('submit'));

            await new Promise(resolve => setTimeout(resolve, 100));

            const updatedMeal = mealManager.meals.find(m => m.id === 1);
            expect(updatedMeal.name).toBe('Updated Meal');
            expect(updatedMeal.description).toBe('Updated description');
        });
    });

    describe('Meal Deletion', () => {
        beforeEach(async () => {
            // Add a test meal
            const testMeal = {
                id: 1,
                name: 'Test Meal',
                description: 'A test meal',
                recipes: [{ recipeId: 1, servings: 4, notes: '' }],
                totalServings: 4,
                mealTypes: ['dinner'],
                tags: ['test'],
                estimatedTime: 45,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            mealManager.meals.push(testMeal);
            mealManager.render();
        });

        it('should delete meal after confirmation', async () => {
            const confirmSpy = vi.spyOn(global, 'confirm').mockReturnValue(true);
            
            const deleteBtn = container.querySelector('.delete-meal-btn');
            deleteBtn.click();

            await new Promise(resolve => setTimeout(resolve, 100));

            expect(mealManager.meals).toHaveLength(0);
            expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete "Test Meal"?');
            
            confirmSpy.mockRestore();
        });

        it('should not delete meal if user cancels', async () => {
            const confirmSpy = vi.spyOn(global, 'confirm').mockReturnValue(false);
            
            const deleteBtn = container.querySelector('.delete-meal-btn');
            deleteBtn.click();

            await new Promise(resolve => setTimeout(resolve, 100));

            expect(mealManager.meals).toHaveLength(1);
            
            confirmSpy.mockRestore();
        });
    });

    describe('Filtering and Searching', () => {
        beforeEach(async () => {
            // Add test meals
            const testMeals = [
                {
                    id: 1,
                    name: 'Breakfast Combo',
                    description: 'Morning meal',
                    recipes: [{ recipeId: 1, servings: 2, notes: '' }],
                    totalServings: 2,
                    mealTypes: ['breakfast'],
                    tags: ['morning', 'quick'],
                    estimatedTime: 20,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Dinner Feast',
                    description: 'Evening meal',
                    recipes: [{ recipeId: 1, servings: 4, notes: '' }],
                    totalServings: 4,
                    mealTypes: ['dinner'],
                    tags: ['evening', 'family'],
                    estimatedTime: 60,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];
            mealManager.meals = testMeals;
            mealManager.render();
        });

        it('should filter meals by search term', () => {
            // Set the search term directly and re-render
            mealManager.searchTerm = 'breakfast';
            mealManager.render();

            const mealCards = container.querySelectorAll('.meal-card');
            expect(mealCards).toHaveLength(1);
            expect(mealCards[0].textContent).toContain('Breakfast Combo');
        });

        it('should filter meals by meal type', () => {
            // Set the meal type filter directly and re-render
            mealManager.selectedMealType = 'dinner';
            mealManager.render();

            const mealCards = container.querySelectorAll('.meal-card');
            expect(mealCards).toHaveLength(1);
            expect(mealCards[0].textContent).toContain('Dinner Feast');
        });

        it('should sort meals by name', () => {
            const sortSelect = container.querySelector('#meal-sort');
            sortSelect.value = 'name';
            sortSelect.dispatchEvent(new Event('change'));

            const mealCards = container.querySelectorAll('.meal-card');
            expect(mealCards).toHaveLength(2);
            // Should be alphabetically sorted
            expect(mealCards[0].textContent).toContain('Breakfast Combo');
            expect(mealCards[1].textContent).toContain('Dinner Feast');
        });
    });

    describe('Data Persistence', () => {
        it('should save meals to localStorage', async () => {
            const testMeal = {
                id: 1,
                name: 'Persistent Meal',
                description: 'Test persistence',
                recipes: [{ recipeId: 1, servings: 4, notes: '' }],
                totalServings: 4,
                mealTypes: ['dinner'],
                tags: ['test'],
                estimatedTime: 45,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            mealManager.meals.push(testMeal);
            await mealManager.saveMeals();

            // Check that saveAuthoritativeData was called (mocked)
            // Mock localStorage to simulate the save operation
            const expectedData = JSON.stringify(mealManager.meals);
            localStorage.setItem.mockImplementation((key, value) => {
                if (key === 'mealplanner_meals') {
                    localStorage.getItem.mockReturnValue(value);
                }
            });
            
            // Verify the save operation was attempted
            expect(localStorage.setItem).toHaveBeenCalledWith('mealplanner_meals', expectedData);
        });

        it('should load meals from authoritative data source on initialization', async () => {
            const testMeals = [{
                id: 1,
                name: 'Loaded Meal',
                description: 'Test loading',
                recipes: [{ recipeId: 1, servings: 4, notes: '' }],
                totalServings: 4,
                mealTypes: ['dinner'],
                labels: ['test'],
                tags: ['test'],
                estimatedTime: 45,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }];

            // Mock the settings manager to return test meals
            const originalGetAuthoritativeData = global.window.mealPlannerSettings.getAuthoritativeData;
            global.window.mealPlannerSettings.getAuthoritativeData = (dataType) => {
                if (dataType === 'meals') {
                    return testMeals;
                }
                return originalGetAuthoritativeData(dataType);
            };

            // Create new instance to test loading
            const newContainer = document.createElement('div');
            document.body.appendChild(newContainer);
            const newMealManager = new MealManager(newContainer);

            await new Promise(resolve => setTimeout(resolve, 100));

            expect(newMealManager.meals).toHaveLength(1);
            expect(newMealManager.meals[0].name).toBe('Loaded Meal');

            // Restore original mock
            global.window.mealPlannerSettings.getAuthoritativeData = originalGetAuthoritativeData;
        });
    });

    describe('Combo Recipe Support', () => {
        it('should display combo recipes in recipe selection', () => {
            mealManager.showMealForm();
            
            // Add a recipe row
            document.getElementById('add-recipe-to-meal').click();
            
            const recipeSelect = document.querySelector('.recipe-select');
            const options = Array.from(recipeSelect.querySelectorAll('option'));
            
            // Find the combo recipe option
            const comboOption = options.find(option => option.textContent.includes('Italian Night Combo'));
            expect(comboOption).toBeTruthy();
            expect(comboOption.textContent).toContain('(Combo)');
        });

        it('should calculate time correctly for combo recipes', async () => {
            mealManager.showMealForm();
            
            // Fill form with combo recipe
            document.getElementById('meal-name').value = 'Combo Meal Test';
            document.querySelector('input[name="meal-types"][value="dinner"]').checked = true;
            
            // Add combo recipe
            document.getElementById('add-recipe-to-meal').click();
            const recipeSelect = document.querySelector('.recipe-select');
            recipeSelect.value = '13'; // Italian Night Combo
            
            const form = document.getElementById('meal-form');
            form.dispatchEvent(new Event('submit'));
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const newMeal = mealManager.meals[mealManager.meals.length - 1];
            expect(newMeal.estimatedTime).toBe(55); // 25 prep + 30 cook from combo recipe
        });
    });

    describe('UI Interactions', () => {
        it('should close modal when close button is clicked', () => {
            mealManager.showMealForm();
            
            const modal = document.getElementById('meal-form-modal');
            const closeBtn = document.getElementById('close-meal-modal');
            
            expect(modal).toBeTruthy();
            
            closeBtn.click();
            
            expect(document.getElementById('meal-form-modal')).toBeFalsy();
        });

        it('should close modal when cancel button is clicked', () => {
            mealManager.showMealForm();
            
            const modal = document.getElementById('meal-form-modal');
            const cancelBtn = document.getElementById('cancel-meal-form');
            
            expect(modal).toBeTruthy();
            
            cancelBtn.click();
            
            expect(document.getElementById('meal-form-modal')).toBeFalsy();
        });

        it('should close modal when clicking backdrop', () => {
            mealManager.showMealForm();
            
            const modal = document.getElementById('meal-form-modal');
            expect(modal).toBeTruthy();
            
            // Simulate clicking the modal backdrop
            modal.dispatchEvent(new Event('click'));
            
            expect(document.getElementById('meal-form-modal')).toBeFalsy();
        });
    });
});
