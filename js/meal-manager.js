// Meal Management Component
// Handles creation and management of meals composed of multiple recipes

class MealManager {
    constructor(container) {
        this.container = container;
        this.meals = [];
        this.recipes = [];
        this.currentMeal = null;
        this.searchTerm = '';
        this.selectedMealType = 'all';
        this.selectedLabel = 'all';
        this.sortBy = 'name';
        this.init();
    }

    async init() {
        console.log('🍽️ Initializing Meal Manager...');
        await this.loadRecipes();
        await this.loadMeals();
        this.render();
        this.attachEventListeners();
    }

    async loadRecipes() {
        console.log('📱 Meal Manager loading recipes from authoritative data source...');
        
        // Get data from centralized authority
        if (window.mealPlannerSettings) {
            this.recipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            console.log(`✅ Meal Manager loaded ${this.recipes.length} recipes from authoritative source`);
        } else {
            // Fallback if settings not available
            console.warn('⚠️ Settings manager not available, using empty recipes');
            this.recipes = [];
        }
    }

    async loadMeals() {
        try {
            const saved = localStorage.getItem('mealplanner-meals');
            if (saved) {
                this.meals = JSON.parse(saved);
                console.log(`✅ Loaded ${this.meals.length} saved meals`);
            } else {
                this.meals = [];
                console.log('📝 No saved meals found, starting with empty list');
            }
        } catch (error) {
            console.error('❌ Failed to load meals:', error);
            this.meals = [];
        }
    }

    async saveMeals() {
        try {
            // Save meals using the centralized data authority
            if (window.mealPlannerSettings) {
                window.mealPlannerSettings.saveAuthoritativeData('meals', this.meals);
            } else {
                console.warn('⚠️ Settings manager not available, falling back to localStorage');
                localStorage.setItem('mealplanner-meals', JSON.stringify(this.meals));
            }
            console.log('✅ Meals saved successfully');
        } catch (error) {
            console.error('❌ Failed to save meals:', error);
        }
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="meal-manager">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Meal Planner</h2>
                    <button id="add-meal-btn" class="btn-primary">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Create Meal
                    </button>
                </div>

                <!-- Filters -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label for="meal-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Meals</label>
                            <div class="relative">
                                <input type="text" id="meal-search" placeholder="Search by name..." 
                                       value="${this.searchTerm}"
                                       class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="meal-type-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meal Type</label>
                            <select id="meal-type-filter" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="all" ${this.selectedMealType === 'all' ? 'selected' : ''}>All Types</option>
                                <option value="breakfast" ${this.selectedMealType === 'breakfast' ? 'selected' : ''}>Breakfast</option>
                                <option value="lunch" ${this.selectedMealType === 'lunch' ? 'selected' : ''}>Lunch</option>
                                <option value="dinner" ${this.selectedMealType === 'dinner' ? 'selected' : ''}>Dinner</option>
                                <option value="snack" ${this.selectedMealType === 'snack' ? 'selected' : ''}>Snack</option>
                            </select>
                        </div>
                        <div>
                            <label for="meal-label-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Label</label>
                            <select id="meal-label-filter" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="all" ${this.selectedLabel === 'all' ? 'selected' : ''}>All Labels</option>
                                ${this.getAllLabels().map(label => `
                                    <option value="${label}" ${this.selectedLabel === label ? 'selected' : ''}>${label}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div>
                            <label for="meal-sort" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                            <select id="meal-sort" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>Name</option>
                                <option value="created" ${this.sortBy === 'created' ? 'selected' : ''}>Date Created</option>
                                <option value="servings" ${this.sortBy === 'servings' ? 'selected' : ''}>Servings</option>
                                <option value="time" ${this.sortBy === 'time' ? 'selected' : ''}>Total Time</option>
                            </select>
                        </div>
                        <div class="flex items-end">
                            <button id="clear-meal-filters-btn" class="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition-colors">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Meals Grid -->
                <div id="meals-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.renderMealCards()}
                </div>

                <!-- Empty State -->
                <div id="empty-state" class="text-center py-12 ${this.getFilteredMeals().length > 0 ? 'hidden' : ''}">
                    <div class="text-gray-400 mb-4">
                        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No meals found</h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-4">Create your first meal by combining recipes</p>
                    <button class="btn-primary" onclick="document.getElementById('add-meal-btn').click()">
                        Create Your First Meal
                    </button>
                </div>
            </div>
        `;
    }

    renderMealCards() {
        const filteredMeals = this.getFilteredMeals();
        
        return filteredMeals.map(meal => `
            <div class="meal-card bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border">
                <div class="p-4">
                    <!-- Header -->
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                            <h3 class="font-medium text-gray-900 dark:text-white mb-1">${meal.name}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">${meal.description || 'No description'}</p>
                        </div>
                        <div class="flex space-x-1 ml-2">
                            <button class="schedule-meal-btn text-gray-400 hover:text-green-600" 
                                    data-meal-id="${meal.id}" title="Schedule Meal">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </button>
                            <button class="edit-meal-btn text-gray-400 hover:text-blue-600" 
                                    data-meal-id="${meal.id}" title="Edit Meal">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button class="delete-meal-btn text-gray-400 hover:text-red-600" 
                                    data-meal-id="${meal.id}" title="Delete Meal">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Meal Types -->
                    <div class="flex flex-wrap gap-1 mb-3">
                        ${meal.mealTypes.map(type => `
                            <span class="inline-block px-2 py-1 text-xs rounded-full ${this.getMealTypeBadgeClass(type)}">
                                ${this.getMealTypeIcon(type)} ${type}
                            </span>
                        `).join('')}
                    </div>

                    <!-- Labels and Tags -->
                    ${(meal.labels && meal.labels.length > 0) || (meal.tags && meal.tags.length > 0) ? `
                        <div class="flex flex-wrap gap-1 mb-3">
                            ${(meal.labels || []).map(label => `
                                <span class="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                                    🏷️ ${label}
                                </span>
                            `).join('')}
                            ${(meal.tags || []).map(tag => `
                                <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full">
                                    #${tag}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Recipes -->
                    <div class="mb-3">
                        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Recipes (${meal.recipes.length})
                        </h4>
                        <div class="space-y-1">
                            ${meal.recipes.slice(0, 3).map(recipe => {
                                const recipeData = this.getRecipeById(recipe.recipeId);
                                return `
                                    <div class="flex items-center justify-between text-sm">
                                        <span class="text-gray-600 dark:text-gray-400">
                                            ${recipeData ? recipeData.title : 'Unknown Recipe'}
                                        </span>
                                        <span class="text-gray-500 text-xs">
                                            ${recipe.servings} servings
                                        </span>
                                    </div>
                                `;
                            }).join('')}
                            ${meal.recipes.length > 3 ? `
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    +${meal.recipes.length - 3} more recipes
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span>🍽️ ${meal.totalServings} servings</span>
                        <span>⏱️ ${meal.estimatedTime} min</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getFilteredMeals() {
        let filtered = [...this.meals];

        // Apply search filter
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(meal => 
                meal.name.toLowerCase().includes(term) ||
                meal.description?.toLowerCase().includes(term) ||
                (meal.tags && meal.tags.some(tag => tag.toLowerCase().includes(term))) ||
                (meal.labels && meal.labels.some(label => label.toLowerCase().includes(term)))
            );
        }

        // Apply meal type filter
        if (this.selectedMealType !== 'all') {
            filtered = filtered.filter(meal => 
                meal.mealTypes && meal.mealTypes.includes(this.selectedMealType)
            );
        }

        // Apply label filter
        if (this.selectedLabel !== 'all') {
            filtered = filtered.filter(meal => {
                const mealLabels = [
                    ...(meal.labels || []),
                    ...(meal.tags || [])
                ];
                return mealLabels.some(label => label.toLowerCase() === this.selectedLabel.toLowerCase());
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'created':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'servings':
                    return b.totalServings - a.totalServings;
                case 'time':
                    return a.estimatedTime - b.estimatedTime;
                default:
                    return 0;
            }
        });

        return filtered;
    }

    getAllLabels() {
        // Get labels from both meals and recipes to create a unified label system
        const labels = new Set();
        
        // Add labels from meals
        this.meals.forEach(meal => {
            (meal.labels || []).forEach(label => labels.add(label));
            (meal.tags || []).forEach(tag => labels.add(tag));
        });
        
        // Add labels from recipes to create shared label system
        this.recipes.forEach(recipe => {
            (recipe.labels || []).forEach(label => labels.add(label));
            (recipe.tags || []).forEach(tag => labels.add(tag));
        });
        
        // Only show predefined labels if we're in demo mode (consistent with RecipeManager)
        if (window.mealPlannerSettings && window.mealPlannerSettings.getCurrentDatabaseSource() === 'demo') {
            const predefinedLabels = [
                'quick', 'healthy', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
                'comfort-food', 'spicy', 'sweet', 'savory', 'protein-rich', 'low-carb',
                'kid-friendly', 'party', 'holiday', 'summer', 'winter', 'easy', 'advanced'
            ];
            predefinedLabels.forEach(label => labels.add(label));
        }
        
        return Array.from(labels).sort();
    }

    getRecipeById(recipeId) {
        return this.recipes.find(recipe => recipe.id === recipeId);
    }

    getMealTypeBadgeClass(type) {
        const classes = {
            breakfast: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            lunch: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            dinner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            snack: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
        };
        return classes[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }

    getMealTypeIcon(type) {
        const icons = {
            breakfast: '🍳',
            lunch: '🥪',
            dinner: '🍽️',
            snack: '🍿'
        };
        return icons[type] || '🍽️';
    }

    attachEventListeners() {
        // Add meal button
        const addBtn = document.getElementById('add-meal-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.showMealForm());
        }

        // Search input
        const searchInput = document.getElementById('meal-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.render();
            });
        }

        // Meal type filter
        const typeFilter = document.getElementById('meal-type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.selectedMealType = e.target.value;
                this.render();
            });
        }

        // Label filter
        const labelFilter = document.getElementById('meal-label-filter');
        if (labelFilter) {
            labelFilter.addEventListener('change', (e) => {
                this.selectedLabel = e.target.value;
                this.render();
            });
        }

        // Sort selector
        const sortSelect = document.getElementById('meal-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.render();
            });
        }

        // Clear filters button
        const clearFiltersBtn = document.getElementById('clear-meal-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.searchTerm = '';
                this.selectedMealType = 'all';
                this.selectedLabel = 'all';
                this.sortBy = 'name';
                this.render();
            });
        }

        // Schedule, edit and delete buttons
        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.schedule-meal-btn')) {
                const mealId = parseInt(e.target.closest('.schedule-meal-btn').dataset.mealId);
                const meal = this.meals.find(m => m.id === mealId);
                if (meal) this.showScheduleModal(meal);
            }

            if (e.target.closest('.edit-meal-btn')) {
                const mealId = parseInt(e.target.closest('.edit-meal-btn').dataset.mealId);
                const meal = this.meals.find(m => m.id === mealId);
                if (meal) this.showMealForm(meal);
            }

            if (e.target.closest('.delete-meal-btn')) {
                const mealId = parseInt(e.target.closest('.delete-meal-btn').dataset.mealId);
                this.deleteMeal(mealId);
            }
        });
    }

    showMealForm(meal = null) {
        const isEditing = meal !== null;
        this.currentMeal = meal;

        const modal = document.createElement('div');
        modal.id = 'meal-form-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        ${isEditing ? 'Edit Meal' : 'Create New Meal'}
                    </h3>
                    <button id="close-meal-modal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Form -->
                <div class="p-6 overflow-y-auto flex-1">
                    <form id="meal-form" class="space-y-6">
                        <!-- Basic Info -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="meal-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meal Name *</label>
                                <input type="text" id="meal-name" required
                                       value="${isEditing ? meal.name : ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                       placeholder="e.g., Sunday Family Dinner">
                            </div>
                            <div>
                                <label for="meal-servings" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Servings</label>
                                <input type="number" id="meal-servings" min="1" max="20"
                                       value="${isEditing ? meal.totalServings : 4}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label for="meal-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea id="meal-description" rows="3"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                      placeholder="Describe this meal...">${isEditing ? meal.description || '' : ''}</textarea>
                        </div>

                        <!-- Meal Times -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meal Times</label>
                            <div class="flex flex-wrap gap-3">
                                ${['breakfast', 'lunch', 'dinner', 'snack'].map(type => `
                                    <label class="flex items-center">
                                        <input type="checkbox" name="meal-types" value="${type}"
                                               ${isEditing && meal.mealTypes.includes(type) ? 'checked' : ''}
                                               class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                            ${this.getMealTypeIcon(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}
                                        </span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Recipe Selection -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recipes</label>
                            <div id="meal-recipes-container">
                                ${this.renderRecipeSelection(isEditing ? meal.recipes : [])}
                            </div>
                            <button type="button" id="add-recipe-to-meal" class="mt-3 btn-secondary">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Add Recipe
                            </button>
                        </div>

                        <!-- Labels and Tags -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="meal-labels" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Labels</label>
                                <input type="text" id="meal-labels"
                                       value="${isEditing ? (meal.labels || []).join(', ') : ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                       placeholder="e.g., vegetarian, quick, healthy">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate labels with commas</p>
                            </div>
                            <div>
                                <label for="meal-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                                <input type="text" id="meal-tags"
                                       value="${isEditing ? (meal.tags || []).join(', ') : ''}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                       placeholder="e.g., family, comfort food, special occasion">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate tags with commas</p>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button type="button" id="cancel-meal-form" class="btn-secondary">Cancel</button>
                    <button type="submit" form="meal-form" class="btn-primary">
                        ${isEditing ? 'Update Meal' : 'Create Meal'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.attachMealFormListeners();

        // Focus on name input
        setTimeout(() => {
            document.getElementById('meal-name')?.focus();
        }, 100);
    }

    renderRecipeSelection(selectedRecipes = []) {
        return `
            <div class="space-y-3">
                ${selectedRecipes.map((recipe, index) => this.renderRecipeRow(recipe, index)).join('')}
                ${selectedRecipes.length === 0 ? '<p class="text-gray-500 dark:text-gray-400 text-sm">No recipes added yet</p>' : ''}
            </div>
        `;
    }

    renderRecipeRow(recipe, index) {
        const recipeData = this.getRecipeById(recipe.recipeId);
        return `
            <div class="recipe-row flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex-1">
                    <select class="recipe-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                        <option value="">Select a recipe...</option>
                        ${this.recipes.map(r => `
                            <option value="${r.id}" ${r.id === recipe.recipeId ? 'selected' : ''}>
                                ${r.title} ${r.type === 'combo' ? '(Combo)' : ''}
                            </option>
                        `).join('')}
                    </select>
                </div>
                <div class="w-24">
                    <input type="number" class="recipe-servings w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                           placeholder="Servings" min="1" max="20" value="${recipe.servings}">
                </div>
                <button type="button" class="remove-recipe text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `;
    }

    attachMealFormListeners() {
        const modal = document.getElementById('meal-form-modal');
        const form = document.getElementById('meal-form');
        const closeBtn = document.getElementById('close-meal-modal');
        const cancelBtn = document.getElementById('cancel-meal-form');
        const addRecipeBtn = document.getElementById('add-recipe-to-meal');
        const recipesContainer = document.getElementById('meal-recipes-container');

        // Close modal handlers
        [closeBtn, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => modal.remove());
            }
        });

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Add recipe button
        if (addRecipeBtn) {
            addRecipeBtn.addEventListener('click', () => {
                // Get current recipes from the form
                const currentRecipes = this.getCurrentFormRecipes();
                
                // Add a new empty recipe
                const newRecipe = { recipeId: '', servings: 4, notes: '' };
                currentRecipes.push(newRecipe);
                
                // Re-render the recipe selection with all recipes
                recipesContainer.innerHTML = this.renderRecipeSelection(currentRecipes);
                
                // Re-attach event listeners for the new recipe rows
                this.attachRecipeRowListeners(recipesContainer);
            });
        }

        // Initial recipe row listeners
        this.attachRecipeRowListeners(recipesContainer);

        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMeal();
            });
        }
    }

    attachRecipeRowListeners(container) {
        if (!container) return;
        
        // Remove existing listeners to avoid duplicates
        const existingListener = container._removeRecipeListener;
        if (existingListener) {
            container.removeEventListener('click', existingListener);
        }
        
        // Create new listener
        const removeRecipeListener = (e) => {
            if (e.target.closest('.remove-recipe')) {
                const recipeRow = e.target.closest('.recipe-row');
                recipeRow.remove();
            }
        };
        
        // Store reference and add listener
        container._removeRecipeListener = removeRecipeListener;
        container.addEventListener('click', removeRecipeListener);
    }

    getCurrentFormRecipes() {
        const recipeRows = document.querySelectorAll('#meal-recipes-container .recipe-row');
        return Array.from(recipeRows).map(row => {
            const select = row.querySelector('.recipe-select');
            const servingsInput = row.querySelector('.recipe-servings');
            return {
                recipeId: select && select.value ? parseInt(select.value) : '',
                servings: servingsInput && servingsInput.value ? parseInt(servingsInput.value) : 4,
                notes: ''
            };
        });
    }

    async saveMeal() {
        const form = document.getElementById('meal-form');
        if (!form) {
            console.error('Meal form not found');
            return;
        }

        try {
            // Get form data manually to avoid FormData issues in tests
            const nameInput = document.getElementById('meal-name');
            const descriptionInput = document.getElementById('meal-description');
            const servingsInput = document.getElementById('meal-servings');
            const labelsInput = document.getElementById('meal-labels');
            const tagsInput = document.getElementById('meal-tags');
            const mealTypeInputs = document.querySelectorAll('input[name="meal-types"]:checked');

            const mealData = {
                id: this.currentMeal ? this.currentMeal.id : Date.now(),
                name: nameInput ? nameInput.value.trim() : '',
                description: descriptionInput ? descriptionInput.value.trim() : '',
                recipes: this.getCurrentFormRecipes(),
                totalServings: servingsInput ? parseInt(servingsInput.value) || 4 : 4,
                mealTypes: Array.from(mealTypeInputs).map(input => input.value),
                labels: labelsInput ? labelsInput.value.split(',').map(label => label.trim()).filter(label => label) : [],
                tags: tagsInput ? tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
                estimatedTime: 0, // Will be calculated from recipes
                createdAt: this.currentMeal ? this.currentMeal.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Validation
            if (!mealData.name) {
                alert('Please enter a meal name');
                return;
            }

            if (mealData.recipes.length === 0) {
                alert('Please add at least one recipe');
                return;
            }

            if (mealData.mealTypes.length === 0) {
                alert('Please select at least one meal type');
                return;
            }

            // Calculate estimated time from recipes
            mealData.estimatedTime = this.calculateMealTime(mealData.recipes);

            // Save meal
            if (this.currentMeal) {
                // Update existing meal
                const index = this.meals.findIndex(m => m.id === this.currentMeal.id);
                if (index !== -1) {
                    this.meals[index] = mealData;
                }
            } else {
                // Add new meal
                this.meals.push(mealData);
            }

            await this.saveMeals();
            this.render();
            document.getElementById('meal-form-modal').remove();
            
            this.showNotification(`Meal "${mealData.name}" ${this.currentMeal ? 'updated' : 'created'} successfully!`, 'success');

        } catch (error) {
            console.error('Error saving meal:', error);
            this.showNotification('Failed to save meal. Please try again.', 'error');
        }
    }

    calculateMealTime(recipes) {
        let totalTime = 0;
        recipes.forEach(recipe => {
            const recipeData = this.getRecipeById(recipe.recipeId);
            if (recipeData) {
                totalTime += (recipeData.prep_time || 0) + (recipeData.cook_time || 0);
            }
        });
        return totalTime;
    }

    async deleteMeal(mealId) {
        const meal = this.meals.find(m => m.id === mealId);
        if (!meal) return;

        if (confirm(`Are you sure you want to delete "${meal.name}"?`)) {
            this.meals = this.meals.filter(m => m.id !== mealId);
            await this.saveMeals();
            this.render();
            this.showNotification(`Meal "${meal.name}" deleted successfully!`, 'success');
        }
    }

    showScheduleModal(meal) {
        // Create schedule modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        📅 Schedule "${meal.name}"
                    </h3>
                    <button id="close-schedule-modal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <form id="schedule-form" class="p-6">
                    <div class="space-y-4">
                        <div>
                            <label for="schedule-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date *</label>
                            <input type="date" id="schedule-date" required
                                   min="${new Date().toISOString().split('T')[0]}"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        </div>
                        
                        <div>
                            <label for="schedule-meal-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meal Type *</label>
                            <select id="schedule-meal-type" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                ${meal.mealTypes.map(type => `<option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div>
                            <label for="schedule-servings" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Servings</label>
                            <input type="number" id="schedule-servings" min="1" max="20" value="${meal.totalServings || 4}"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        </div>
                        
                        <div>
                            <label for="schedule-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes (Optional)</label>
                            <textarea id="schedule-notes" rows="2"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                      placeholder="Any special notes for this scheduled meal..."></textarea>
                        </div>
                    </div>
                </form>
                
                <div class="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" id="cancel-schedule-form" class="btn-secondary">Cancel</button>
                    <button type="submit" form="schedule-form" class="btn-primary">📅 Schedule Meal</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Set up event listeners
        const closeModal = () => {
            modal.remove();
        };

        modal.querySelector('#close-schedule-modal').addEventListener('click', closeModal);
        modal.querySelector('#cancel-schedule-form').addEventListener('click', closeModal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Handle form submission
        modal.querySelector('#schedule-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const date = modal.querySelector('#schedule-date').value;
            const mealType = modal.querySelector('#schedule-meal-type').value;
            const servings = parseInt(modal.querySelector('#schedule-servings').value);
            const notes = modal.querySelector('#schedule-notes').value;

            if (!date || !mealType) {
                this.showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Schedule the meal using the Schedule Manager
            if (window.scheduleManager) {
                try {
                    // Create a meal object compatible with Schedule Manager
                    const mealToSchedule = {
                        id: meal.id,
                        name: meal.name,
                        meal_type: mealType,
                        recipes: meal.recipes,
                        servings: servings,
                        total_time: meal.totalTime || this.calculateMealTime(meal.recipes)
                    };

                    const scheduledMeal = window.scheduleManager.scheduleMeal(mealToSchedule, date, {
                        servings: servings,
                        notes: notes
                    });

                    this.showNotification(`"${meal.name}" scheduled for ${mealType} on ${new Date(date).toLocaleDateString()}`, 'success');
                    closeModal();
                    
                    // Optionally switch to the appropriate meal type tab
                    this.switchToMealTypeTab(mealType);
                    
                } catch (error) {
                    console.error('Error scheduling meal:', error);
                    this.showNotification('Failed to schedule meal. Please try again.', 'error');
                }
            } else {
                this.showNotification('Schedule Manager not available. Please refresh the page.', 'error');
            }
        });
    }

    switchToMealTypeTab(mealType) {
        // Switch to the appropriate meal type tab (breakfast, lunch, dinner)
        const tabButton = document.querySelector(`[data-tab="${mealType}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    async clearAllData() {
        console.log('🗑️ Clearing all meals data...');
        this.meals = [];
        this.recipes = [];
        this.filteredMeals = [];
        this.searchTerm = '';
        this.selectedMealType = 'all';
        this.selectedLabel = 'all';
        this.sortBy = 'name';
        
        // Clear from localStorage
        localStorage.removeItem('mealplanner_meals');
        
        // Re-render to show empty state
        this.render();
        
        console.log('✅ All meals data cleared');
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.MealManager = MealManager;
}

// Export for Node.js/testing environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MealManager;
}
