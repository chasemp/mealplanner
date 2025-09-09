// Schedule Manager - Bridge between Meals and Calendar/Itinerary Views
class ScheduleManager {
    constructor() {
        this.scheduledMeals = [];
        this.loadScheduledMeals();
    }

    /**
     * Load scheduled meals from storage
     */
    loadScheduledMeals() {
        try {
            // Use the same storage key as main app for consistency
            const stored = localStorage.getItem('mealplanner_scheduled_meals');
            if (stored) {
                this.scheduledMeals = JSON.parse(stored);
            } else {
                this.scheduledMeals = [];
                // Initialize with demo data if no stored data (but not during tests)
                if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
                    this.initializeDemoSchedule();
                }
            }
        } catch (error) {
            console.error('Error loading scheduled meals:', error);
            this.scheduledMeals = [];
        }
    }

    /**
     * Save scheduled meals to storage
     */
    saveScheduledMeals() {
        try {
            // Use the same storage key as main app for consistency
            localStorage.setItem('mealplanner_scheduled_meals', JSON.stringify(this.scheduledMeals));
            console.log(`💾 ScheduleManager saved ${this.scheduledMeals.length} scheduled meals`);
        } catch (error) {
            console.error('Error saving scheduled meals:', error);
        }
    }

    /**
     * Schedule a meal (from MealManager) to a specific date
     * @param {Object} meal - Meal object from MealManager
     * @param {string} date - Date string (YYYY-MM-DD)
     * @param {Object} options - Additional options (servings, notes)
     */
    scheduleMeal(meal, date, options = {}) {
        const scheduledMeal = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            meal_id: meal.id,
            meal_name: meal.name,
            meal_type: meal.meal_type, // This comes from the meal, not individual recipes
            date: date,
            servings: options.servings || meal.servings || 4,
            notes: options.notes || '',
            recipes: meal.recipes, // Store the recipe composition
            total_time: meal.total_time,
            created_at: new Date().toISOString()
        };

        this.scheduledMeals.push(scheduledMeal);
        this.saveScheduledMeals();

        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('mealScheduled', {
            detail: { scheduledMeal, meal }
        }));

        return scheduledMeal;
    }

    /**
     * Schedule an individual recipe (legacy support for existing calendar/itinerary)
     * @param {Object} recipe - Recipe object
     * @param {string} mealType - breakfast, lunch, dinner
     * @param {string} date - Date string
     * @param {Object} options - Additional options
     */
    scheduleRecipe(recipe, mealType, date, options = {}) {
        // Create a temporary meal from the recipe
        const tempMeal = {
            id: `recipe-${recipe.id}-${Date.now()}`,
            name: recipe.title,
            meal_type: mealType,
            recipes: [{
                recipe_id: recipe.id,
                servings: options.servings || recipe.servings || 4
            }],
            servings: options.servings || recipe.servings || 4,
            total_time: (recipe.prep_time || 0) + (recipe.cook_time || 0)
        };

        return this.scheduleMeal(tempMeal, date, options);
    }

    /**
     * Get scheduled meals for a specific meal type
     * @param {string} mealType - breakfast, lunch, dinner
     */
    getScheduledMealsByType(mealType) {
        return this.scheduledMeals.filter(meal => meal.meal_type === mealType);
    }

    /**
     * Get scheduled meals for a specific date
     * @param {string} date - Date string (YYYY-MM-DD)
     */
    getScheduledMealsByDate(date) {
        return this.scheduledMeals.filter(meal => meal.date === date);
    }

    /**
     * Get scheduled meals for a date range
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     */
    getScheduledMealsInRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return this.scheduledMeals.filter(meal => {
            const mealDate = new Date(meal.date);
            return mealDate >= start && mealDate <= end;
        });
    }

    /**
     * Remove a scheduled meal
     * @param {number} scheduledMealId - ID of scheduled meal to remove
     */
    removeScheduledMeal(scheduledMealId) {
        const index = this.scheduledMeals.findIndex(meal => meal.id === scheduledMealId);
        if (index !== -1) {
            const removedMeal = this.scheduledMeals.splice(index, 1)[0];
            this.saveScheduledMeals();
            
            // Dispatch event
            document.dispatchEvent(new CustomEvent('mealUnscheduled', {
                detail: { scheduledMeal: removedMeal }
            }));
            
            return removedMeal;
        }
        return null;
    }

    /**
     * Update a scheduled meal
     * @param {number} scheduledMealId - ID of scheduled meal to update
     * @param {Object} updates - Updates to apply
     */
    updateScheduledMeal(scheduledMealId, updates) {
        const meal = this.scheduledMeals.find(meal => meal.id === scheduledMealId);
        if (meal) {
            Object.assign(meal, updates);
            meal.updated_at = new Date().toISOString();
            this.saveScheduledMeals();
            
            // Dispatch event
            document.dispatchEvent(new CustomEvent('mealUpdated', {
                detail: { scheduledMeal: meal }
            }));
            
            return meal;
        }
        return null;
    }

    /**
     * Get all scheduled meals
     */
    getAllScheduledMeals() {
        return [...this.scheduledMeals];
    }

    /**
     * Clear all scheduled meals
     */
    clearAllScheduledMeals() {
        this.scheduledMeals = [];
        this.saveScheduledMeals();
    }

    /**
     * Initialize with demo schedule data
     */
    initializeDemoSchedule() {
        // Get demo meals from MealManager if available
        const demoMeals = this.getDemoMeals();
        const today = new Date();
        
        // Schedule some demo meals over the next week
        demoMeals.forEach((meal, index) => {
            const scheduleDate = new Date(today);
            scheduleDate.setDate(today.getDate() + index);
            
            this.scheduleMeal(meal, scheduleDate.toISOString().split('T')[0], {
                notes: `Demo scheduled meal ${index + 1}`
            });
        });
    }

    /**
     * Get demo meals for initialization
     */
    getDemoMeals() {
        // Return some basic demo meals if MealManager not available
        return [
            {
                id: 'demo-breakfast-1',
                name: 'Classic Breakfast',
                meal_type: 'breakfast',
                recipes: [{ recipe_id: 3, servings: 2 }, { recipe_id: 16, servings: 2 }],
                servings: 2,
                total_time: 25
            },
            {
                id: 'demo-lunch-1', 
                name: 'Light Lunch',
                meal_type: 'lunch',
                recipes: [{ recipe_id: 5, servings: 4 }],
                servings: 4,
                total_time: 15
            },
            {
                id: 'demo-dinner-1',
                name: 'Sunday Dinner',
                meal_type: 'dinner', 
                recipes: [{ recipe_id: 1, servings: 4 }, { recipe_id: 4, servings: 4 }],
                servings: 4,
                total_time: 65
            }
        ];
    }

    /**
     * Convert scheduled meal to legacy format for existing calendar/itinerary views
     * @param {Object} scheduledMeal - New format scheduled meal
     */
    toLegacyFormat(scheduledMeal) {
        return {
            id: scheduledMeal.id,
            recipe_id: scheduledMeal.recipes?.[0]?.recipe_id || scheduledMeal.meal_id,
            meal_type: scheduledMeal.meal_type,
            date: scheduledMeal.date,
            notes: scheduledMeal.meal_name || scheduledMeal.notes
        };
    }

    /**
     * Get scheduled meals in legacy format for backward compatibility
     * @param {string} mealType - Optional meal type filter
     */
    getScheduledMealsLegacyFormat(mealType = null) {
        let meals = this.scheduledMeals;
        if (mealType) {
            meals = meals.filter(meal => meal.meal_type === mealType);
        }
        return meals.map(meal => this.toLegacyFormat(meal));
    }
}

// Make available globally
window.ScheduleManager = ScheduleManager;
