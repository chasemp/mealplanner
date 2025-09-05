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
        // Mock implementation - in real app this would query the database
        this.ingredients = [
            { id: 1, name: 'Chicken Breast', category: 'meat', default_unit: 'lbs' },
            { id: 2, name: 'Red Onion', category: 'produce', default_unit: 'pieces' },
            { id: 3, name: 'Garlic', category: 'produce', default_unit: 'cloves' },
            { id: 4, name: 'Olive Oil', category: 'pantry', default_unit: 'tbsp' },
            { id: 5, name: 'Salt', category: 'pantry', default_unit: 'tsp' },
            { id: 6, name: 'Black Pepper', category: 'pantry', default_unit: 'tsp' },
            { id: 7, name: 'Rice', category: 'grains', default_unit: 'cups' },
            { id: 8, name: 'Cheddar Cheese', category: 'dairy', default_unit: 'oz' }
        ];
    }

    async loadRecipes() {
        // Mock implementation - in real app this would query the database
        this.recipes = [
            {
                id: 1,
                title: 'Grilled Chicken with Rice',
                description: 'Simple and healthy grilled chicken served with seasoned rice',
                instructions: '1. Season chicken with salt and pepper\n2. Grill chicken for 6-8 minutes per side\n3. Cook rice according to package directions\n4. Serve chicken over rice',
                serving_count: 4,
                prep_time: 15,
                cook_time: 25,
                meal_type: 'dinner',
                tags: ['healthy', 'easy', 'gluten-free'],
                ingredients: [
                    { ingredient_id: 1, name: 'Chicken Breast', quantity: 1.5, unit: 'lbs', notes: '' },
                    { ingredient_id: 7, name: 'Rice', quantity: 1, unit: 'cups', notes: '' },
                    { ingredient_id: 5, name: 'Salt', quantity: 1, unit: 'tsp', notes: '' },
                    { ingredient_id: 6, name: 'Black Pepper', quantity: 0.5, unit: 'tsp', notes: '' }
                ],
                created_at: '2024-12-01'
            },
            {
                id: 2,
                title: 'Cheesy Garlic Rice',
                description: 'Creamy rice dish with garlic and melted cheese',
                instructions: '1. Sauté garlic in olive oil\n2. Add rice and cook until golden\n3. Add broth and simmer\n4. Stir in cheese until melted',
                serving_count: 6,
                prep_time: 10,
                cook_time: 20,
                meal_type: 'dinner',
                tags: ['vegetarian', 'comfort-food'],
                ingredients: [
                    { ingredient_id: 7, name: 'Rice', quantity: 1.5, unit: 'cups', notes: '' },
                    { ingredient_id: 3, name: 'Garlic', quantity: 4, unit: 'cloves', notes: 'minced' },
                    { ingredient_id: 4, name: 'Olive Oil', quantity: 2, unit: 'tbsp', notes: '' },
                    { ingredient_id: 8, name: 'Cheddar Cheese', quantity: 8, unit: 'oz', notes: 'shredded' }
                ],
                created_at: '2024-12-02'
            }
        ];
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
        // This would open a modal or navigate to a form page
        // For now, show a simple notification
        this.showNotification(recipe ? 'Edit recipe form would open here' : 'Add recipe form would open here', 'info');
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

// Global registry for recipe manager
window.recipeManager = null;
