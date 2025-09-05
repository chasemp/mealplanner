// Recipe Management Component
class RecipeManager {
    constructor(container) {
        this.container = container;
        this.recipes = [];
        this.ingredients = [];
        this.currentRecipe = null;
        this.searchTerm = '';
        this.selectedCategory = 'all';
        this.sortBy = 'name';
        this.init();
    }

    async init() {
        console.log('🍳 Initializing Recipe Manager...');
        await this.loadIngredients();
        await this.loadRecipes();
        this.render();
        this.attachEventListeners();
    }

    async loadIngredients() {
        // Load from centralized demo data for consistency
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.ingredients = demoData.getIngredients();
            console.log(`✅ Recipe Manager loaded ${this.ingredients.length} consistent ingredients from demo data`);
        } else {
            // Fallback to empty array if demo data not available
            this.ingredients = [];
            console.warn('⚠️ Demo data manager not available, using empty ingredients list');
        }
    }

    async loadRecipes() {
        // Load from centralized demo data for consistency
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            this.recipes = demoData.getRecipes();
            console.log(`✅ Recipe Manager loaded ${this.recipes.length} consistent recipes from demo data`);
        } else {
            // Fallback to empty array if demo data not available
            this.recipes = [];
            console.warn('⚠️ Demo data manager not available, using empty recipes list');
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="recipe-manager">
                <!-- Header with Search and Filters -->
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                    <div class="flex-1 max-w-lg">
                        <div class="relative">
                            <input type="text" id="recipe-search" 
                                   placeholder="Search recipes..." 
                                   value="${this.searchTerm}"
                                   class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <select id="recipe-category" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Meal Types</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="snack">Snack</option>
                        </select>
                        
                        <select id="recipe-sort" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                            <option value="name">Sort by Name</option>
                            <option value="date">Sort by Date</option>
                            <option value="prep_time">Sort by Prep Time</option>
                            <option value="serving_count">Sort by Servings</option>
                        </select>
                        
                        <button id="add-recipe-btn" class="btn-primary flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span>Add Recipe</span>
                        </button>
                    </div>
                </div>

                <!-- Recipe Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.getFilteredRecipes().length}</div>
                        <div class="text-sm text-gray-600">Total Recipes</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${this.getAverageServings()}</div>
                        <div class="text-sm text-gray-600">Avg Servings</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-orange-600">${this.getAveragePrepTime()}</div>
                        <div class="text-sm text-gray-600">Avg Prep (min)</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-purple-600">${this.getUniqueIngredients()}</div>
                        <div class="text-sm text-gray-600">Unique Ingredients</div>
                    </div>
                </div>

                <!-- Recipe Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.renderRecipeCards()}
                </div>

                <!-- Empty State -->
                ${this.getFilteredRecipes().length === 0 ? this.renderEmptyState() : ''}
            </div>
        `;
    }

    renderRecipeCards() {
        const filteredRecipes = this.getFilteredRecipes();
        
        return filteredRecipes.map(recipe => `
            <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer recipe-card" 
                 data-recipe-id="${recipe.id}">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-3">
                        <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${recipe.title}</h3>
                        <div class="flex items-center space-x-1 ml-2">
                            <button class="text-gray-400 hover:text-blue-600 edit-recipe" data-recipe-id="${recipe.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button class="text-gray-400 hover:text-red-600 delete-recipe" data-recipe-id="${recipe.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${recipe.description}</p>
                    
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div class="flex items-center space-x-4">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                ${recipe.prep_time + recipe.cook_time}min
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                ${recipe.serving_count} servings
                            </span>
                        </div>
                        <span class="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">${recipe.meal_type}</span>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex flex-wrap gap-1">
                            ${recipe.tags.slice(0, 2).map(tag => `
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${tag}</span>
                            `).join('')}
                            ${recipe.tags.length > 2 ? `<span class="text-xs text-gray-500">+${recipe.tags.length - 2} more</span>` : ''}
                        </div>
                        <div class="text-xs text-gray-400">
                            ${recipe.ingredients.length} ingredients
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderEmptyState() {
        return `
            <div class="col-span-full flex flex-col items-center justify-center py-12">
                <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13v13"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                <p class="text-gray-500 text-center mb-4">
                    ${this.searchTerm || this.selectedCategory !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'Get started by adding your first recipe'}
                </p>
                <button id="add-first-recipe" class="btn-primary">Add Your First Recipe</button>
            </div>
        `;
    }

    getFilteredRecipes() {
        let filtered = this.recipes;

        // Filter by search term
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(recipe => 
                recipe.title.toLowerCase().includes(term) ||
                recipe.description.toLowerCase().includes(term) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }

        // Filter by category
        if (this.selectedCategory !== 'all') {
            filtered = filtered.filter(recipe => recipe.meal_type === this.selectedCategory);
        }

        // Sort recipes
        filtered.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'date':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'prep_time':
                    return (a.prep_time + a.cook_time) - (b.prep_time + b.cook_time);
                case 'serving_count':
                    return b.serving_count - a.serving_count;
                default:
                    return 0;
            }
        });

        return filtered;
    }

    getAverageServings() {
        if (this.recipes.length === 0) return 0;
        const total = this.recipes.reduce((sum, recipe) => sum + recipe.serving_count, 0);
        return Math.round(total / this.recipes.length);
    }

    getAveragePrepTime() {
        if (this.recipes.length === 0) return 0;
        const total = this.recipes.reduce((sum, recipe) => sum + recipe.prep_time + recipe.cook_time, 0);
        return Math.round(total / this.recipes.length);
    }

    getUniqueIngredients() {
        const ingredientIds = new Set();
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                ingredientIds.add(ingredient.ingredient_id);
            });
        });
        return ingredientIds.size;
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#recipe-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.render();
            });
        }

        // Category filter
        const categorySelect = this.container.querySelector('#recipe-category');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.selectedCategory = e.target.value;
                this.render();
            });
        }

        // Sort selector
        const sortSelect = this.container.querySelector('#recipe-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.render();
            });
        }

        // Add recipe button
        const addBtn = this.container.querySelector('#add-recipe-btn, #add-first-recipe');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showRecipeForm();
            });
        }

        // Recipe card clicks
        this.container.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.edit-recipe, .delete-recipe')) {
                    const recipeId = parseInt(card.dataset.recipeId);
                    this.showRecipeDetail(recipeId);
                }
            });
        });

        // Edit recipe buttons
        this.container.querySelectorAll('.edit-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(btn.dataset.recipeId);
                this.editRecipe(recipeId);
            });
        });

        // Delete recipe buttons
        this.container.querySelectorAll('.delete-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(btn.dataset.recipeId);
                this.deleteRecipe(recipeId);
            });
        });
    }

    showRecipeForm(recipe = null) {
        console.log('Opening recipe form...', recipe ? 'Edit mode' : 'Add mode');
        
        const isEdit = recipe !== null;
        const modalId = 'recipe-form-modal';
        
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
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                            ${isEdit ? 'Edit Recipe' : 'Add New Recipe'}
                        </h2>
                        <button id="close-recipe-form" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <form id="recipe-form" class="p-6 space-y-6">
                    <!-- Basic Information -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label for="recipe-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Recipe Title *
                            </label>
                            <input type="text" id="recipe-title" name="title" required
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   placeholder="Enter recipe title"
                                   value="${isEdit ? recipe.title : ''}">
                        </div>
                        
                        <div class="md:col-span-2">
                            <label for="recipe-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea id="recipe-description" name="description" rows="2"
                                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                      placeholder="Brief description of the recipe">${isEdit ? recipe.description : ''}</textarea>
                        </div>
                        
                        <div>
                            <label for="recipe-servings" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Servings *
                            </label>
                            <input type="number" id="recipe-servings" name="serving_count" required min="1" max="20"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   value="${isEdit ? recipe.serving_count : '4'}">
                        </div>
                        
                        <div>
                            <label for="recipe-meal-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Meal Type
                            </label>
                            <select id="recipe-meal-type" name="meal_type"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="breakfast" ${isEdit && recipe.meal_type === 'breakfast' ? 'selected' : ''}>Breakfast</option>
                                <option value="lunch" ${isEdit && recipe.meal_type === 'lunch' ? 'selected' : ''}>Lunch</option>
                                <option value="dinner" ${isEdit && recipe.meal_type === 'dinner' ? 'selected' : 'selected'}>Dinner</option>
                                <option value="snack" ${isEdit && recipe.meal_type === 'snack' ? 'selected' : ''}>Snack</option>
                                <option value="dessert" ${isEdit && recipe.meal_type === 'dessert' ? 'selected' : ''}>Dessert</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="recipe-prep-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Prep Time (minutes)
                            </label>
                            <input type="number" id="recipe-prep-time" name="prep_time" min="0" max="480"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   value="${isEdit ? recipe.prep_time : '15'}">
                        </div>
                        
                        <div>
                            <label for="recipe-cook-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cook Time (minutes)
                            </label>
                            <input type="number" id="recipe-cook-time" name="cook_time" min="0" max="480"
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                   value="${isEdit ? recipe.cook_time : '30'}">
                        </div>
                    </div>
                    
                    <!-- Ingredients Section -->
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Ingredients</h3>
                            <div class="flex gap-2">
                                <button type="button" id="scan-ingredient-barcode" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h5m3 0h6m-9 4h2m3 0h2M9 20h2m3 0h2"></path>
                                    </svg>
                                    Scan
                                </button>
                                <button type="button" id="add-ingredient-row" class="btn-secondary text-sm">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add Ingredient
                                </button>
                            </div>
                        </div>
                        
                        <div id="ingredients-container" class="space-y-3">
                            ${this.renderIngredientRows(isEdit ? recipe.ingredients : [])}
                        </div>
                    </div>
                    
                    <!-- Instructions Section -->
                    <div>
                        <label for="recipe-instructions" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Instructions *
                        </label>
                        <textarea id="recipe-instructions" name="instructions" required rows="8"
                                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="Enter step-by-step cooking instructions...">${isEdit ? recipe.instructions : ''}</textarea>
                        <p class="text-xs text-gray-500 mt-1">Tip: Number your steps (1., 2., 3.) for better readability</p>
                    </div>
                    
                    <!-- Tags Section -->
                    <div>
                        <label for="recipe-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tags
                        </label>
                        <input type="text" id="recipe-tags" name="tags"
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                               placeholder="Enter tags separated by commas (e.g., healthy, quick, vegetarian)"
                               value="${isEdit ? recipe.tags.join(', ') : ''}">
                    </div>
                    
                    <!-- Form Actions -->
                    <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" id="cancel-recipe-form" class="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" class="btn-primary">
                            ${isEdit ? 'Update Recipe' : 'Save Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Attach event listeners
        this.attachRecipeFormListeners(modal, recipe);
        
        // Focus on title input
        setTimeout(() => {
            const titleInput = modal.querySelector('#recipe-title');
            if (titleInput) titleInput.focus();
        }, 100);
    }

    renderIngredientRows(ingredients = []) {
        if (ingredients.length === 0) {
            ingredients = [{ ingredient_id: '', name: '', quantity: '', unit: '', notes: '' }];
        }
        
        return ingredients.map((ingredient, index) => `
            <div class="ingredient-row grid grid-cols-12 gap-2 items-end">
                <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ingredient ${index === 0 ? '*' : ''}
                    </label>
                    <select class="ingredient-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][ingredient_id]" ${index === 0 ? 'required' : ''}>
                        <option value="">Select ingredient...</option>
                        ${this.ingredients.map(ing => `
                            <option value="${ing.id}" data-unit="${ing.default_unit}" 
                                    ${ingredient.ingredient_id == ing.id ? 'selected' : ''}>
                                ${ing.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity ${index === 0 ? '*' : ''}
                    </label>
                    <input type="number" step="0.25" min="0" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][quantity]" 
                           value="${ingredient.quantity}"
                           placeholder="1.5" ${index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit
                    </label>
                    <select class="unit-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][unit]">
                        <option value="pieces" ${ingredient.unit === 'pieces' ? 'selected' : ''}>pieces</option>
                        <option value="cups" ${ingredient.unit === 'cups' ? 'selected' : ''}>cups</option>
                        <option value="tbsp" ${ingredient.unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                        <option value="tsp" ${ingredient.unit === 'tsp' ? 'selected' : ''}>tsp</option>
                        <option value="lbs" ${ingredient.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                        <option value="oz" ${ingredient.unit === 'oz' ? 'selected' : ''}>oz</option>
                        <option value="cloves" ${ingredient.unit === 'cloves' ? 'selected' : ''}>cloves</option>
                        <option value="slices" ${ingredient.unit === 'slices' ? 'selected' : ''}>slices</option>
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                    </label>
                    <input type="text" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][notes]" 
                           value="${ingredient.notes || ''}"
                           placeholder="optional">
                </div>
                
                <div class="col-span-1">
                    ${ingredients.length > 1 || index > 0 ? `
                        <button type="button" class="remove-ingredient w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
                            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    ` : `
                        <div class="w-full p-2"></div>
                    `}
                </div>
            </div>
        `).join('');
    }

    renderSingleIngredientRow(ingredient, index, showRemoveButton = false) {
        return `
            <div class="ingredient-row grid grid-cols-12 gap-2 items-end">
                <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ingredient ${index === 0 ? '*' : ''}
                    </label>
                    <select class="ingredient-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][ingredient_id]" ${index === 0 ? 'required' : ''}>
                        <option value="">Select ingredient...</option>
                        ${this.ingredients.map(ing => `
                            <option value="${ing.id}" data-unit="${ing.default_unit}" 
                                    ${ingredient.ingredient_id == ing.id ? 'selected' : ''}>
                                ${ing.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity ${index === 0 ? '*' : ''}
                    </label>
                    <input type="number" step="0.25" min="0" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][quantity]" 
                           value="${ingredient.quantity}"
                           placeholder="1.5" ${index === 0 ? 'required' : ''}>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit
                    </label>
                    <select class="unit-select w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            name="ingredients[${index}][unit]">
                        <option value="pieces" ${ingredient.unit === 'pieces' ? 'selected' : ''}>pieces</option>
                        <option value="cups" ${ingredient.unit === 'cups' ? 'selected' : ''}>cups</option>
                        <option value="tbsp" ${ingredient.unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                        <option value="tsp" ${ingredient.unit === 'tsp' ? 'selected' : ''}>tsp</option>
                        <option value="lbs" ${ingredient.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                        <option value="oz" ${ingredient.unit === 'oz' ? 'selected' : ''}>oz</option>
                        <option value="cloves" ${ingredient.unit === 'cloves' ? 'selected' : ''}>cloves</option>
                        <option value="slices" ${ingredient.unit === 'slices' ? 'selected' : ''}>slices</option>
                    </select>
                </div>
                
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                    </label>
                    <input type="text" 
                           class="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                           name="ingredients[${index}][notes]" 
                           value="${ingredient.notes || ''}"
                           placeholder="optional">
                </div>
                
                <div class="col-span-1">
                    ${showRemoveButton || index > 0 ? `
                        <button type="button" class="remove-ingredient w-full p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-md">
                            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    ` : `
                        <div class="w-full p-2"></div>
                    `}
                </div>
            </div>
        `;
    }

    attachRecipeFormListeners(modal, recipe) {
        const form = modal.querySelector('#recipe-form');
        const closeBtn = modal.querySelector('#close-recipe-form');
        const cancelBtn = modal.querySelector('#cancel-recipe-form');
        const addIngredientBtn = modal.querySelector('#add-ingredient-row');
        const ingredientsContainer = modal.querySelector('#ingredients-container');

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

        // Add ingredient row
        addIngredientBtn?.addEventListener('click', () => {
            const currentRows = ingredientsContainer.querySelectorAll('.ingredient-row').length;
            const newRowHtml = this.renderSingleIngredientRow({ ingredient_id: '', name: '', quantity: '', unit: '', notes: '' }, currentRows, true);
            
            ingredientsContainer.insertAdjacentHTML('beforeend', newRowHtml);
            
            // Attach listeners to new row
            this.attachIngredientRowListeners(ingredientsContainer.lastElementChild);
        });

        // Attach listeners to existing ingredient rows
        ingredientsContainer.querySelectorAll('.ingredient-row').forEach(row => {
            this.attachIngredientRowListeners(row);
        });

        // Form submission
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRecipeFormSubmit(form, recipe);
        });
    }

    attachIngredientRowListeners(row) {
        // Ingredient selection handler
        const ingredientSelect = row.querySelector('.ingredient-select');
        const unitSelect = row.querySelector('.unit-select');
        
        ingredientSelect?.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            const defaultUnit = selectedOption?.dataset.unit;
            
            if (defaultUnit && unitSelect) {
                unitSelect.value = defaultUnit;
            }
        });

        // Remove ingredient handler
        const removeBtn = row.querySelector('.remove-ingredient');
        removeBtn?.addEventListener('click', () => {
            row.remove();
        });
    }

    async handleRecipeFormSubmit(form, existingRecipe) {
        try {
            // Collect form data
            const formData = new FormData(form);
            const recipeData = {
                title: formData.get('title').trim(),
                description: formData.get('description').trim(),
                serving_count: parseInt(formData.get('serving_count')),
                meal_type: formData.get('meal_type'),
                prep_time: parseInt(formData.get('prep_time')) || 0,
                cook_time: parseInt(formData.get('cook_time')) || 0,
                instructions: formData.get('instructions').trim(),
                tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            };

            // Validate required fields
            if (!recipeData.title) {
                this.showNotification('Recipe title is required', 'error');
                return;
            }

            if (!recipeData.instructions) {
                this.showNotification('Instructions are required', 'error');
                return;
            }

            // Collect ingredients
            const ingredients = [];
            const ingredientRows = form.querySelectorAll('.ingredient-row');
            
            ingredientRows.forEach((row, index) => {
                const ingredientId = row.querySelector(`[name="ingredients[${index}][ingredient_id]"]`)?.value;
                const quantity = row.querySelector(`[name="ingredients[${index}][quantity]"]`)?.value;
                const unit = row.querySelector(`[name="ingredients[${index}][unit]"]`)?.value;
                const notes = row.querySelector(`[name="ingredients[${index}][notes]"]`)?.value;

                if (ingredientId && quantity) {
                    const ingredient = this.ingredients.find(ing => ing.id == ingredientId);
                    if (ingredient) {
                        ingredients.push({
                            ingredient_id: parseInt(ingredientId),
                            name: ingredient.name,
                            quantity: parseFloat(quantity),
                            unit: unit || ingredient.default_unit,
                            notes: notes || ''
                        });
                    }
                }
            });

            if (ingredients.length === 0) {
                this.showNotification('At least one ingredient is required', 'error');
                return;
            }

            recipeData.ingredients = ingredients;

            // Save recipe
            if (existingRecipe) {
                // Update existing recipe
                recipeData.id = existingRecipe.id;
                const index = this.recipes.findIndex(r => r.id === existingRecipe.id);
                if (index !== -1) {
                    this.recipes[index] = { ...this.recipes[index], ...recipeData };
                }
                this.showNotification(`"${recipeData.title}" has been updated!`, 'success');
            } else {
                // Add new recipe
                recipeData.id = Math.max(0, ...this.recipes.map(r => r.id)) + 1;
                recipeData.created_date = new Date().toISOString().split('T')[0];
                this.recipes.push(recipeData);
                this.showNotification(`"${recipeData.title}" has been added!`, 'success');
            }

            // Close modal and refresh view
            document.getElementById('recipe-form-modal')?.remove();
            this.render();

        } catch (error) {
            console.error('Error saving recipe:', error);
            this.showNotification('Error saving recipe. Please try again.', 'error');
        }
    }

    showRecipeDetail(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            console.log('Showing recipe detail:', recipe.title);
            // This would open a detailed view modal or page
            this.showNotification(`Recipe detail for "${recipe.title}" would open here`, 'info');
        }
    }

    editRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            this.showRecipeForm(recipe);
        }
    }

    async deleteRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe && confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
            // In real app, this would delete from database
            this.recipes = this.recipes.filter(r => r.id !== recipeId);
            this.render();
            this.showNotification(`"${recipe.title}" has been deleted`, 'success');
        }
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

// Make RecipeManager globally available for testing
if (typeof window !== 'undefined') {
    window.RecipeManager = RecipeManager;
}
if (typeof global !== 'undefined') {
    global.RecipeManager = RecipeManager;
}

// Global registry for recipe manager
window.recipeManager = null;
