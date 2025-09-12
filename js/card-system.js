// Universal Card System for MealPlanner
// Handles recipes, combos, and future card types with a single, authoritative approach

class CardSystem {
    constructor() {
        this.cardTypes = {
            'recipe': {
                name: 'Recipe',
                icon: '📖',
                colorClass: 'border-blue-500',
                badgeClass: 'bg-blue-100 text-blue-800'
            },
            'combo': {
                name: 'Combo',
                icon: '🥙',
                colorClass: 'border-purple-500',
                badgeClass: 'bg-purple-100 text-purple-800'
            },
            'meal': {
                name: 'Meal',
                icon: '🍽️',
                colorClass: 'border-green-500',
                badgeClass: 'bg-green-100 text-green-800'
            }
        };
    }

    // Single source of truth for determining card type
    getCardType(item) {
        if (item.recipe_type === 'combo') return 'combo';
        if (item.recipe_type === 'regular' || item.recipe_type === 'basic') return 'recipe';
        if (item.type === 'combo') return 'combo';
        if (item.type === 'basic' || item.type === 'recipe') return 'recipe';
        
        // Fallback: check for combo-specific fields
        if (item.combo_recipes || item.recipes) return 'combo';
        
        // Default to recipe
        return 'recipe';
    }

    // Get card configuration
    getCardConfig(item) {
        const cardType = this.getCardType(item);
        return {
            type: cardType,
            ...this.cardTypes[cardType]
        };
    }

    // Generate card HTML based on type
    generateCardHTML(item, config) {
        const cardConfig = config || this.getCardConfig(item);
        
        return `
            <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer recipe-card ${cardConfig.colorClass ? 'border-l-4 ' + cardConfig.colorClass : ''}" 
                 data-recipe-id="${item.id}" data-card-type="${cardConfig.type}">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            ${cardConfig.badgeClass ? `
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${cardConfig.badgeClass}">
                                    ${cardConfig.icon} ${cardConfig.name.toUpperCase()}
                                </span>
                            ` : ''}
                            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${item.title}</h3>
                        </div>
                    </div>
                    ${this.generateCardContent(item, cardConfig)}
                </div>
            </div>
        `;
    }

    // Generate type-specific card content
    generateCardContent(item, cardConfig) {
        switch (cardConfig.type) {
            case 'combo':
                return this.generateComboCardContent(item);
            case 'recipe':
                return this.generateRecipeCardContent(item);
            case 'meal':
                return this.generateMealCardContent(item);
            default:
                return this.generateRecipeCardContent(item);
        }
    }

    generateComboCardContent(item) {
        const recipes = item.combo_recipes || item.recipes || [];
        const additionalItems = item.ingredients || [];
        
        return `
            <p class="text-gray-600 mb-3 line-clamp-2">${item.description || ''}</p>
            <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>${recipes.length} recipes</span>
                <span>${additionalItems.length} additional items</span>
            </div>
        `;
    }

    generateRecipeCardContent(item) {
        const ingredients = item.ingredients || [];
        
        return `
            <p class="text-gray-600 mb-3 line-clamp-2">${item.description || ''}</p>
            <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>${ingredients.length} items</span>
                <span>${item.servings || 4} servings</span>
            </div>
            <div class="flex items-center text-xs text-gray-400">
                ${item.prep_time ? `<span>⏱️ ${item.prep_time}min</span>` : ''}
                ${item.cook_time ? `<span class="ml-2">🔥 ${item.cook_time}min</span>` : ''}
            </div>
        `;
    }

    generateMealCardContent(item) {
        return `
            <p class="text-gray-600 mb-3 line-clamp-2">${item.description || ''}</p>
        `;
    }

    // Generate mobile view based on card type
    generateMobileView(item) {
        const cardConfig = this.getCardConfig(item);
        
        switch (cardConfig.type) {
            case 'combo':
                return this.generateComboMobileView(item);
            case 'recipe':
                return this.generateRecipeMobileView(item);
            case 'meal':
                return this.generateMealMobileView(item);
            default:
                return this.generateRecipeMobileView(item);
        }
    }

    generateComboMobileView(recipe) {
        const recipes = recipe.combo_recipes || recipe.recipes || [];
        const additionalItems = recipe.ingredients || [];
        
        return `
            <!-- Recipes in Combo -->
            <div class="mb-4">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recipes (${recipes.length})</h3>
                <div class="space-y-3">
                    ${recipes.length === 0 ? 
                        '<div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">No recipes added</div>' :
                        recipes.map(recipeRef => {
                            const foundRecipe = window.recipeManager.recipes.find(r => r.id === parseInt(recipeRef.recipe_id));
                            if (!foundRecipe) return '';
                            
                            const portions = recipeRef.servings_multiplier || 1;
                            const totalServings = portions * (foundRecipe.servings || 1);
                            
                            return `
                                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" 
                                     onclick="window.recipeManager.showRecipeDetail(${foundRecipe.id})">
                                    <div class="flex justify-between items-start mb-2">
                                        <h4 class="font-medium text-gray-900 dark:text-white">${foundRecipe.title}</h4>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">
                                            ${portions} portions • ${totalServings} servings
                                        </div>
                                    </div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${foundRecipe.description || ''}</p>
                                    <div class="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        ${foundRecipe.prep_time ? `<span>Prep: ${foundRecipe.prep_time}min</span>` : ''}
                                        ${foundRecipe.cook_time ? `<span>Cook: ${foundRecipe.cook_time}min</span>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')
                    }
                </div>
            </div>

            <!-- Additional Items -->
            ${additionalItems.length > 0 ? `
                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Additional Items (${additionalItems.length})</h3>
                    <div class="space-y-2">
                        ${additionalItems.map(ing => {
                            const ingredient = window.itemsManager.ingredients.find(i => i.id === ing.ingredient_id);
                            return `
                                <div class="flex justify-between items-center py-1">
                                    <span class="text-gray-900 dark:text-white">${ingredient ? ingredient.name : 'Unknown Item'}</span>
                                    <span class="text-gray-600 dark:text-gray-400">${ing.quantity} ${ing.unit || ''}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    generateRecipeMobileView(recipe) {
        const ingredients = recipe.ingredients || [];
        
        return `
            <div class="mb-4">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Items (${ingredients.length})</h3>
                <div class="space-y-2">
                    ${ingredients.map(ing => {
                        const ingredient = window.itemsManager.ingredients.find(i => i.id === ing.ingredient_id);
                        return `
                            <div class="flex justify-between items-center py-1">
                                <span class="text-gray-900 dark:text-white">${ingredient ? ingredient.name : 'Unknown Item'}</span>
                                <span class="text-gray-600 dark:text-gray-400">${ing.quantity} ${ing.unit || ''}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    generateMealMobileView(meal) {
        return this.generateRecipeMobileView(meal);
    }
}

// Global instance
window.cardSystem = new CardSystem();
