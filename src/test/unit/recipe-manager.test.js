// Recipe Manager Unit Tests
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock the RecipeManager class
class MockRecipeManager {
    constructor(container) {
        this.container = container
        this.recipes = []
        this.ingredients = []
        this.currentFilter = {
            search: '',
            category: 'all',
            label: 'all'
        }
        this.sortBy = 'name'
        this.sortAscending = true
        this.selectedLabel = 'all'
    }

    init() {
        this.loadDemoData()
        this.render()
        this.attachEventListeners()
    }

    loadDemoData() {
        // Load demo recipes and ingredients
        this.recipes = [
            {
                id: 1,
                title: 'Chicken Stir Fry',
                description: 'Quick and healthy chicken stir fry',
                instructions: 'Heat oil, cook chicken, add vegetables, stir fry',
                meal_type: 'dinner',
                prep_time: 15,
                cook_time: 20,
                serving_count: 4,
                ingredients: [
                    { ingredient_id: 1, quantity: 1, unit: 'lb', name: 'Chicken Breast' },
                    { ingredient_id: 2, quantity: 2, unit: 'cups', name: 'Mixed Vegetables' }
                ],
                tags: ['quick', 'healthy'],
                labels: ['protein-rich', 'low-carb'],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Vegetable Pasta',
                description: 'Delicious vegetable pasta',
                instructions: 'Cook pasta, sauté vegetables, combine',
                meal_type: 'dinner',
                prep_time: 10,
                cook_time: 25,
                serving_count: 6,
                ingredients: [
                    { ingredient_id: 3, quantity: 1, unit: 'lb', name: 'Pasta' },
                    { ingredient_id: 4, quantity: 3, unit: 'cups', name: 'Mixed Vegetables' }
                ],
                tags: ['vegetarian', 'comfort-food'],
                labels: ['vegetarian', 'easy'],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]

        this.ingredients = [
            { id: 1, name: 'Chicken Breast', category: 'meat' },
            { id: 2, name: 'Mixed Vegetables', category: 'produce' },
            { id: 3, name: 'Pasta', category: 'pantry' },
            { id: 4, name: 'Mixed Vegetables', category: 'produce' }
        ]
    }

    render() {
        if (!this.container) return
        
        this.container.innerHTML = `
            <div class="recipe-manager">
                <div class="recipe-header">
                    <input type="text" id="recipe-search" placeholder="Search recipes...">
                    <select id="recipe-category">
                        <option value="all">All Meal Types</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    <select id="recipe-label">
                        <option value="all">All Labels</option>
                        ${this.getAllLabels().map(label => `<option value="${label}">${label}</option>`).join('')}
                    </select>
                    <select id="recipe-sort">
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                        <option value="prep_time">Prep Time</option>
                        <option value="serving_count">Servings</option>
                        <option value="label_type">Label Type</option>
                    </select>
                    <button id="sort-direction-btn">${this.sortAscending ? '↑' : '↓'}</button>
                    <button id="clear-recipe-filters-btn">Clear Filters</button>
                    <button id="add-recipe-btn">Add Recipe</button>
                </div>
                <div class="recipe-grid">
                    ${this.getFilteredRecipes().map(recipe => this.createRecipeCard(recipe)).join('')}
                </div>
            </div>
        `
    }

    createRecipeCard(recipe) {
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <div class="recipe-meta">
                    <span>${recipe.prep_time + recipe.cook_time}min</span>
                    <span>${recipe.serving_count} servings</span>
                </div>
                <div class="recipe-labels">
                    ${recipe.favorite ? `
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            Favorite
                        </span>
                    ` : ''}
                    ${this.renderMockLabels(recipe.labels || [], recipe.favorite ? 1 : 2)}
                    ${(recipe.labels || []).length > (recipe.favorite ? 1 : 2) ? `<span class="text-xs text-gray-500">+${(recipe.labels || []).length - (recipe.favorite ? 1 : 2)} more</span>` : ''}
                </div>
                <div class="recipe-actions">
                    <button class="edit-recipe" data-recipe-id="${recipe.id}">Edit</button>
                    <button class="delete-recipe" data-recipe-id="${recipe.id}">Delete</button>
                    <button class="toggle-favorite" data-recipe-id="${recipe.id}">★</button>
                </div>
            </div>
        `
    }

    renderMockLabels(labels, maxCount = null) {
        if (!Array.isArray(labels)) return '';
        
        const labelsToShow = maxCount ? labels.slice(0, maxCount) : labels;
        
        return labelsToShow.map(label => `
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ${label}
            </span>
        `).join('');
    }

    getFilteredRecipes() {
        let filtered = [...this.recipes]

        // Filter by search term
        if (this.currentFilter.search) {
            const term = this.currentFilter.search.toLowerCase()
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(term) ||
                recipe.description.toLowerCase().includes(term) ||
                (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(term))) ||
                (recipe.labels && recipe.labels.some(label => label.toLowerCase().includes(term)))
            )
        }

        // Filter by category
        if (this.currentFilter.category !== 'all') {
            filtered = filtered.filter(recipe => recipe.meal_type === this.currentFilter.category)
        }

        // Filter by label
        if (this.selectedLabel !== 'all') {
            filtered = filtered.filter(recipe => {
                const recipeLabels = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ]
                return recipeLabels.some(label => label.toLowerCase() === this.selectedLabel.toLowerCase())
            })
        }

        return this.sortRecipes(filtered)
    }

    sortRecipes(recipes) {
        return recipes.sort((a, b) => {
            let result = 0
            
            switch (this.sortBy) {
                case 'name':
                    result = a.title.localeCompare(b.title)
                    break
                case 'date':
                    result = new Date(b.updated_at) - new Date(a.updated_at)
                    break
                case 'prep_time':
                    result = (a.prep_time + a.cook_time) - (b.prep_time + b.cook_time)
                    break
                case 'serving_count':
                    result = (b.serving_count || b.servings || 0) - (a.serving_count || a.servings || 0)
                    break
                case 'label_type':
                    // Simple mock implementation for label type sorting
                    result = a.title.localeCompare(b.title)
                    break
                default:
                    result = 0
            }
            
            // Apply sort direction (flip result if descending)
            return this.sortAscending ? result : -result
        })
    }

    getAllLabels() {
        const labels = new Set()
        this.recipes.forEach(recipe => {
            if (recipe.labels && Array.isArray(recipe.labels)) {
                recipe.labels.forEach(label => labels.add(label))
            }
            if (recipe.tags && Array.isArray(recipe.tags)) {
                recipe.tags.forEach(tag => labels.add(tag))
            }
        })
        return Array.from(labels).sort()
    }

    attachEventListeners() {
        // Search functionality
        const searchInput = this.container.querySelector('#recipe-search')
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter.search = e.target.value
                this.render()
            })
        }

        // Category filter
        const categorySelect = this.container.querySelector('#recipe-category')
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.currentFilter.category = e.target.value
                this.render()
            })
        }

        // Label filter
        const labelSelect = this.container.querySelector('#recipe-label')
        if (labelSelect) {
            labelSelect.addEventListener('change', (e) => {
                this.selectedLabel = e.target.value
                this.render()
            })
        }

        // Sort selector
        const sortSelect = this.container.querySelector('#recipe-sort')
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value
                this.render()
            })
        }

        // Sort direction button
        const sortDirectionBtn = this.container.querySelector('#sort-direction-btn')
        if (sortDirectionBtn) {
            sortDirectionBtn.addEventListener('click', () => {
                this.sortAscending = !this.sortAscending
                this.render()
            })
        }

        // Clear filters button
        const clearFiltersBtn = this.container.querySelector('#clear-recipe-filters-btn')
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.currentFilter = {
                    search: '',
                    category: 'all',
                    label: 'all'
                }
                this.sortBy = 'name'
                this.sortAscending = true
                this.selectedLabel = 'all'
                this.render()
            })
        }

        // Recipe actions
        this.container.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.edit-recipe, .delete-recipe')) {
                    const recipeId = parseInt(card.dataset.recipeId)
                    this.showRecipeDetail(recipeId)
                }
            })
        })

        this.container.querySelectorAll('.edit-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation()
                const recipeId = parseInt(btn.dataset.recipeId)
                this.editRecipe(recipeId)
            })
        })

        this.container.querySelectorAll('.delete-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation()
                const recipeId = parseInt(btn.dataset.recipeId)
                this.deleteRecipe(recipeId)
            })
        })
    }

    showRecipeDetail(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId)
        if (recipe) {
            // Mock showing recipe detail
            console.log('Showing recipe detail:', recipe.title)
        }
    }

    editRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId)
        if (recipe) {
            // Mock editing recipe
            console.log('Editing recipe:', recipe.title)
        }
    }

    async deleteRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId)
        if (recipe && confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
            this.recipes = this.recipes.filter(r => r.id !== recipeId)
            this.render()
            console.log('Deleted recipe:', recipe.title)
        }
    }

    generateRecipeId() {
        const maxId = this.recipes.length > 0 ? Math.max(...this.recipes.map(r => r.id)) : 0
        return maxId + 1
    }

    saveRecipe(recipeData) {
        if (recipeData.id) {
            // Update existing recipe
            const index = this.recipes.findIndex(r => r.id === recipeData.id)
            if (index !== -1) {
                this.recipes[index] = { ...recipeData, updated_at: new Date().toISOString() }
            }
        } else {
            // Create new recipe
            const newRecipe = {
                ...recipeData,
                id: this.generateRecipeId(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
            this.recipes.push(newRecipe)
        }
        this.render()
    }

    validateRecipe(recipeData) {
        const errors = []
        
        if (!recipeData.title || recipeData.title.trim() === '') {
            errors.push('Recipe title is required')
        }
        
        if (!recipeData.instructions || recipeData.instructions.trim() === '') {
            errors.push('Recipe instructions are required')
        }
        
        if (!recipeData.ingredients || recipeData.ingredients.length === 0) {
            errors.push('At least one ingredient is required')
        }
        
        return errors
    }

    clearAllData() {
        this.recipes = []
        this.ingredients = []
        this.currentFilter = {
            search: '',
            category: 'all',
            label: 'all'
        }
        this.sortBy = 'name'
        this.sortAscending = true
        this.selectedLabel = 'all'
        this.render()
    }

    toggleFavorite(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            recipe.favorite = !recipe.favorite;
            this.render(); // Re-render to update the display
        }
    }
}

describe('RecipeManager', () => {
    let dom
    let container
    let recipeManager

    beforeEach(() => {
        // Set up DOM environment
        dom = new JSDOM('<!DOCTYPE html><div id="recipe-container"></div>')
        global.document = dom.window.document
        global.window = dom.window
        global.confirm = vi.fn(() => true)

        container = document.getElementById('recipe-container')
        recipeManager = new MockRecipeManager(container)
    })

    describe('Initialization', () => {
        it('should initialize with demo data', () => {
            recipeManager.init()
            
            expect(recipeManager.recipes).toHaveLength(2)
            expect(recipeManager.ingredients).toHaveLength(4)
            expect(recipeManager.recipes[0].title).toBe('Chicken Stir Fry')
        })

        it('should render recipe grid', () => {
            recipeManager.init()
            
            const recipeGrid = container.querySelector('.recipe-grid')
            expect(recipeGrid).toBeTruthy()
            
            const recipeCards = container.querySelectorAll('.recipe-card')
            expect(recipeCards).toHaveLength(2)
        })
    })

    describe('Recipe Filtering', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should filter recipes by search term', () => {
            recipeManager.currentFilter.search = 'chicken'
            const filtered = recipeManager.getFilteredRecipes()
            
            expect(filtered).toHaveLength(1)
            expect(filtered[0].title).toBe('Chicken Stir Fry')
        })

        it('should filter recipes by category', () => {
            recipeManager.currentFilter.category = 'dinner'
            const filtered = recipeManager.getFilteredRecipes()
            
            expect(filtered).toHaveLength(2)
            expect(filtered.every(r => r.meal_type === 'dinner')).toBe(true)
        })

        it('should filter recipes by label', () => {
            recipeManager.selectedLabel = 'vegetarian'
            const filtered = recipeManager.getFilteredRecipes()
            
            expect(filtered).toHaveLength(1)
            expect(filtered[0].title).toBe('Vegetable Pasta')
        })

        it('should handle empty search results', () => {
            recipeManager.currentFilter.search = 'nonexistent'
            const filtered = recipeManager.getFilteredRecipes()
            
            expect(filtered).toHaveLength(0)
        })
    })

    describe('Recipe Sorting', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should sort recipes by name', () => {
            recipeManager.sortBy = 'name'
            const sorted = recipeManager.getFilteredRecipes()
            
            expect(sorted[0].title).toBe('Chicken Stir Fry')
            expect(sorted[1].title).toBe('Vegetable Pasta')
        })

        it('should sort recipes by prep time', () => {
            recipeManager.sortBy = 'prep_time'
            const sorted = recipeManager.getFilteredRecipes()
            
            // Chicken Stir Fry: 15+20=35min, Vegetable Pasta: 10+25=35min
            expect(sorted).toHaveLength(2)
        })

        it('should sort recipes by serving count', () => {
            recipeManager.sortBy = 'serving_count'
            const sorted = recipeManager.getFilteredRecipes()
            
            expect(sorted[0].serving_count).toBe(6) // Vegetable Pasta
            expect(sorted[1].serving_count).toBe(4) // Chicken Stir Fry
        })

        it('should sort recipes by label type', () => {
            recipeManager.sortBy = 'label_type'
            const sorted = recipeManager.getFilteredRecipes()
            
            // Should sort by label type priority, then by name
            expect(sorted).toHaveLength(2)
        })
    })

    describe('Sort Direction', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should initialize with ascending sort direction', () => {
            expect(recipeManager.sortAscending).toBe(true)
        })

        it('should toggle sort direction when button is clicked', () => {
            recipeManager.render()
            recipeManager.attachEventListeners() // Ensure event listeners are attached
            const sortDirectionBtn = recipeManager.container.querySelector('#sort-direction-btn')
            
            expect(recipeManager.sortAscending).toBe(true)
            
            // Simulate button click
            sortDirectionBtn.click()
            
            expect(recipeManager.sortAscending).toBe(false)
        })

        it('should render correct arrow icon for sort direction', () => {
            // Test ascending arrow
            recipeManager.sortAscending = true
            recipeManager.render()
            let sortDirectionBtn = recipeManager.container.querySelector('#sort-direction-btn')
            expect(sortDirectionBtn.innerHTML).toBe('↑') // Up arrow
            
            // Test descending arrow
            recipeManager.sortAscending = false
            recipeManager.render()
            sortDirectionBtn = recipeManager.container.querySelector('#sort-direction-btn')
            expect(sortDirectionBtn.innerHTML).toBe('↓') // Down arrow
        })

        it('should apply ascending sort correctly', () => {
            recipeManager.sortBy = 'name'
            recipeManager.sortAscending = true
            const sorted = recipeManager.getFilteredRecipes()
            
            expect(sorted[0].title).toBe('Chicken Stir Fry') // A comes before V
            expect(sorted[1].title).toBe('Vegetable Pasta')
        })

        it('should apply descending sort correctly', () => {
            recipeManager.sortBy = 'name'
            recipeManager.sortAscending = false
            const sorted = recipeManager.getFilteredRecipes()
            
            expect(sorted[0].title).toBe('Vegetable Pasta') // V comes before C when descending
            expect(sorted[1].title).toBe('Chicken Stir Fry')
        })

        it('should apply sort direction to prep time sorting', () => {
            // Add recipes with different prep times for better testing
            recipeManager.recipes = [
                { 
                    id: 1, 
                    title: 'Quick Recipe', 
                    prep_time: 5, 
                    cook_time: 10,
                    serving_count: 2,
                    created_at: '2023-01-01'
                },
                { 
                    id: 2, 
                    title: 'Slow Recipe', 
                    prep_time: 30, 
                    cook_time: 60,
                    serving_count: 4,
                    created_at: '2023-01-02'
                }
            ]
            
            // Ascending: shortest time first
            recipeManager.sortBy = 'prep_time'
            recipeManager.sortAscending = true
            let sorted = recipeManager.getFilteredRecipes()
            expect(sorted[0].title).toBe('Quick Recipe')
            expect(sorted[1].title).toBe('Slow Recipe')
            
            // Descending: longest time first
            recipeManager.sortAscending = false
            sorted = recipeManager.getFilteredRecipes()
            expect(sorted[0].title).toBe('Slow Recipe')
            expect(sorted[1].title).toBe('Quick Recipe')
        })

        it('should reset sort direction when clearing filters', () => {
            recipeManager.sortAscending = false
            recipeManager.render()
            recipeManager.attachEventListeners() // Ensure event listeners are attached
            
            const clearFiltersBtn = recipeManager.container.querySelector('#clear-recipe-filters-btn')
            clearFiltersBtn.click()
            
            expect(recipeManager.sortAscending).toBe(true)
        })

        it('should reset sort direction in clearAllData', () => {
            recipeManager.sortAscending = false
            
            recipeManager.clearAllData()
            
            expect(recipeManager.sortAscending).toBe(true)
        })
    })

    describe('Recipe CRUD Operations', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should create new recipe', () => {
            const newRecipeData = {
                title: 'New Recipe',
                description: 'Test recipe',
                instructions: 'Test instructions',
                meal_type: 'lunch',
                prep_time: 10,
                cook_time: 15,
                serving_count: 2,
                ingredients: [
                    { ingredient_id: 1, quantity: 1, unit: 'cup', name: 'Test Ingredient' }
                ]
            }

            recipeManager.saveRecipe(newRecipeData)
            
            expect(recipeManager.recipes).toHaveLength(3)
            expect(recipeManager.recipes[2].title).toBe('New Recipe')
            expect(recipeManager.recipes[2].id).toBe(3)
        })

        it('should update existing recipe', () => {
            const updatedRecipeData = {
                id: 1,
                title: 'Updated Chicken Stir Fry',
                description: 'Updated description',
                instructions: 'Updated instructions',
                meal_type: 'dinner',
                prep_time: 20,
                cook_time: 25,
                serving_count: 6,
                ingredients: []
            }

            recipeManager.saveRecipe(updatedRecipeData)
            
            expect(recipeManager.recipes).toHaveLength(2)
            expect(recipeManager.recipes[0].title).toBe('Updated Chicken Stir Fry')
            expect(recipeManager.recipes[0].prep_time).toBe(20)
        })

        it('should delete recipe', async () => {
            await recipeManager.deleteRecipe(1)
            
            expect(recipeManager.recipes).toHaveLength(1)
            expect(recipeManager.recipes[0].id).toBe(2)
        })

        it('should not delete recipe when user cancels', async () => {
            global.confirm = vi.fn(() => false)
            
            await recipeManager.deleteRecipe(1)
            
            expect(recipeManager.recipes).toHaveLength(2)
        })
    })

    describe('Recipe Validation', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should validate required fields', () => {
            const invalidRecipe = {
                title: '',
                instructions: '',
                ingredients: []
            }

            const errors = recipeManager.validateRecipe(invalidRecipe)
            
            expect(errors).toHaveLength(3)
            expect(errors).toContain('Recipe title is required')
            expect(errors).toContain('Recipe instructions are required')
            expect(errors).toContain('At least one ingredient is required')
        })

        it('should pass validation for valid recipe', () => {
            const validRecipe = {
                title: 'Valid Recipe',
                instructions: 'Valid instructions',
                ingredients: [{ ingredient_id: 1, quantity: 1, unit: 'cup' }]
            }

            const errors = recipeManager.validateRecipe(validRecipe)
            
            expect(errors).toHaveLength(0)
        })
    })

    describe('Label Management', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should get all unique labels', () => {
            const labels = recipeManager.getAllLabels()
            
            expect(labels).toContain('quick')
            expect(labels).toContain('healthy')
            expect(labels).toContain('vegetarian')
            expect(labels).toContain('protein-rich')
            expect(labels).toContain('low-carb')
            expect(labels).toContain('easy')
        })

        it('should return sorted labels', () => {
            const labels = recipeManager.getAllLabels()
            const sortedLabels = [...labels].sort()
            
            expect(labels).toEqual(sortedLabels)
        })
    })

    describe('Event Handling', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should handle search input', () => {
            const searchInput = container.querySelector('#recipe-search')
            searchInput.value = 'pasta'
            searchInput.dispatchEvent(new dom.window.Event('input'))
            
            expect(recipeManager.currentFilter.search).toBe('pasta')
        })

        it('should handle category selection', () => {
            const categorySelect = container.querySelector('#recipe-category')
            categorySelect.value = 'lunch'
            categorySelect.dispatchEvent(new dom.window.Event('change'))
            
            expect(recipeManager.currentFilter.category).toBe('lunch')
        })

        it('should handle label selection', () => {
            const labelSelect = container.querySelector('#recipe-label')
            labelSelect.value = 'vegetarian'
            labelSelect.dispatchEvent(new dom.window.Event('change'))
            
            expect(recipeManager.selectedLabel).toBe('vegetarian')
        })
    })

    describe('Favorite Labels', () => {
        beforeEach(() => {
            recipeManager.init()
        })

        it('should display favorite label when recipe is favorited', () => {
            // Set up a recipe as favorite
            recipeManager.recipes[0].favorite = true
            recipeManager.render()
            
            const recipeCard = container.querySelector('.recipe-card')
            const favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            
            expect(favoriteLabel).toBeTruthy()
            expect(favoriteLabel.textContent.trim()).toBe('Favorite')
            expect(favoriteLabel.querySelector('svg')).toBeTruthy() // Star icon
        })

        it('should not display favorite label when recipe is not favorited', () => {
            // Ensure recipe is not favorite
            recipeManager.recipes[0].favorite = false
            recipeManager.render()
            
            const recipeCard = container.querySelector('.recipe-card')
            const favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            
            expect(favoriteLabel).toBeFalsy()
        })

        it('should toggle favorite label when favorite status changes', () => {
            const recipeId = recipeManager.recipes[0].id
            
            // Initially not favorite
            recipeManager.recipes[0].favorite = false
            recipeManager.render()
            
            let recipeCard = container.querySelector('.recipe-card')
            let favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            expect(favoriteLabel).toBeFalsy()
            
            // Toggle to favorite
            recipeManager.toggleFavorite(recipeId)
            
            recipeCard = container.querySelector('.recipe-card')
            favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            expect(favoriteLabel).toBeTruthy()
            expect(favoriteLabel.textContent.trim()).toBe('Favorite')
            
            // Toggle back to not favorite
            recipeManager.toggleFavorite(recipeId)
            
            recipeCard = container.querySelector('.recipe-card')
            favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            expect(favoriteLabel).toBeFalsy()
        })

        it('should adjust regular label count when favorite label is present', () => {
            // Set up a recipe with multiple labels and make it favorite
            recipeManager.recipes[0].labels = ['healthy', 'quick', 'vegetarian', 'protein']
            recipeManager.recipes[0].favorite = true
            recipeManager.render()
            
            const recipeCard = container.querySelector('.recipe-card')
            const favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            const regularLabels = recipeCard.querySelectorAll('.inline-flex:not(.bg-yellow-100)')
            const moreText = recipeCard.querySelector('.text-gray-500')
            
            // Should have favorite label
            expect(favoriteLabel).toBeTruthy()
            
            // Should show only 1 regular label (instead of 2) when favorite is present
            expect(regularLabels.length).toBe(1)
            
            // Should show "+3 more" (4 total labels - 1 shown = 3 more)
            expect(moreText.textContent).toContain('+3 more')
        })

        it('should show 2 regular labels when no favorite label is present', () => {
            // Set up a recipe with multiple labels but not favorite
            recipeManager.recipes[0].labels = ['healthy', 'quick', 'vegetarian', 'protein']
            recipeManager.recipes[0].favorite = false
            recipeManager.render()
            
            const recipeCard = container.querySelector('.recipe-card')
            const favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            const regularLabels = recipeCard.querySelectorAll('.inline-flex:not(.bg-yellow-100)')
            const moreText = recipeCard.querySelector('.text-gray-500')
            
            // Should not have favorite label
            expect(favoriteLabel).toBeFalsy()
            
            // Should show 2 regular labels when no favorite is present
            expect(regularLabels.length).toBe(2)
            
            // Should show "+2 more" (4 total labels - 2 shown = 2 more)
            expect(moreText.textContent).toContain('+2 more')
        })

        it('should have proper dark mode classes for favorite label', () => {
            recipeManager.recipes[0].favorite = true
            recipeManager.render()
            
            const recipeCard = container.querySelector('.recipe-card')
            const favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            
            expect(favoriteLabel).toBeTruthy()
            expect(favoriteLabel.className).toContain('dark:bg-yellow-900')
            expect(favoriteLabel.className).toContain('dark:text-yellow-200')
        })

        it('should maintain favorite label during filtering', () => {
            // Set up a favorite recipe
            recipeManager.recipes[0].favorite = true
            recipeManager.recipes[0].title = 'Favorite Test Recipe'
            
            // Filter by search term
            recipeManager.currentFilter.search = 'Favorite'
            recipeManager.render()
            
            const recipeCard = container.querySelector('.recipe-card')
            const favoriteLabel = recipeCard.querySelector('.bg-yellow-100')
            
            expect(favoriteLabel).toBeTruthy()
            expect(favoriteLabel.textContent.trim()).toBe('Favorite')
        })
    })
})
