// Itinerary View Component for Meal Planning
class ItineraryView {
    constructor(container, mealType = 'dinner', mealPlanData = {}) {
        this.container = container;
        this.mealType = mealType;
        this.mealPlanData = mealPlanData;
        this.expandedWeeks = new Set();
        this.startDate = new Date();
        this.weeksToShow = 4;
        this.currentView = 'itinerary';
        this.scheduledMeals = [];
        
        // Listen for schedule manager events to keep data in sync
        this.setupScheduleEventListeners();
    }

    loadScheduledMeals() {
        try {
            // Use ScheduleManager if available for consistency
            if (window.scheduleManager) {
                this.scheduledMeals = window.scheduleManager.getScheduledMealsByType(this.mealType);
            } else if (window.app && window.app.getScheduledMeals) {
                // Fallback to main app
                this.scheduledMeals = window.app.getScheduledMeals().filter(meal => meal.meal_type === this.mealType);
            } else {
                // Final fallback to localStorage
                const stored = localStorage.getItem('mealplanner_scheduled_meals');
                if (stored) {
                    const allMeals = JSON.parse(stored);
                    this.scheduledMeals = allMeals.filter(meal => meal.meal_type === this.mealType);
                } else {
                    this.scheduledMeals = [];
                }
            }
            
            console.log(`📅 Loaded ${this.scheduledMeals.length} ${this.mealType} meals for itinerary`);
        } catch (error) {
            console.error('Error loading scheduled meals:', error);
            this.scheduledMeals = [];
        }
    }

    setupScheduleEventListeners() {
        // Listen for meal scheduling events to refresh the view
        document.addEventListener('mealScheduled', (event) => {
            if (event.detail.scheduledMeal && event.detail.scheduledMeal.meal_type === this.mealType) {
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal scheduled`);
                this.render();
            }
        });

        document.addEventListener('mealUnscheduled', (event) => {
            if (event.detail.scheduledMeal && event.detail.scheduledMeal.meal_type === this.mealType) {
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal unscheduled`);
                this.render();
            }
        });

        document.addEventListener('mealUpdated', (event) => {
            if (event.detail.scheduledMeal && event.detail.scheduledMeal.meal_type === this.mealType) {
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal updated`);
                this.render();
            }
        });
    }

    renderWeekOptions() {
        const options = [];
        const today = new Date();
        
        // Calculate the start of the current week (Sunday)
        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() - today.getDay());
        
        // Generate options for different week ranges
        const weekRanges = [
            { weeks: 1, label: 'This Week' },
            { weeks: 2, label: '2 Weeks' },
            { weeks: 4, label: '4 Weeks' },
            { weeks: 8, label: '8 Weeks' }
        ];
        
        weekRanges.forEach(range => {
            const endDate = new Date(currentWeekStart);
            endDate.setDate(currentWeekStart.getDate() + (range.weeks * 7) - 1);
            
            const startStr = currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const endStr = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            const isSelected = range.weeks === this.weeksToShow;
            
            options.push(`
                <option value="${range.weeks}" ${isSelected ? 'selected' : ''}>
                    ${range.label} (${startStr} - ${endStr})
                </option>
            `);
        });
        
        return options.join('');
    }

    render() {
        // Load current scheduled meals
        this.loadScheduledMeals();
        
        this.container.innerHTML = `
            <div class="itinerary-view">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-lg font-semibold capitalize">${this.mealType} Plan Itinerary</h3>
                        <p class="text-gray-600 text-sm">
                            ${this.formatDateRange()} • ${this.weeksToShow} weeks
                        </p>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                        <select id="weeks-select-${this.mealType}" class="text-sm border border-gray-300 rounded px-2 py-1">
                            ${this.renderWeekOptions()}
                        </select>
                    </div>
                </div>

                <!-- Planning Summary -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.getTotalMeals()}</div>
                        <div class="text-sm text-gray-600">Total Meals</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${this.getUniqueRecipes()}</div>
                        <div class="text-sm text-gray-600">Unique Recipes</div>
                    </div>
                </div>

                <!-- Weekly Breakdown -->
                <div class="space-y-4">
                    ${this.renderWeeks()}
                </div>
            </div>
        `;

        this.attachEventListeners();
        
        // Listen for meal move events from calendar view
        this.listenForMealMoves();
    }

    formatDateRange() {
        const endDate = new Date(this.startDate);
        endDate.setDate(endDate.getDate() + (this.weeksToShow * 7) - 1);
        
        const options = { month: 'short', day: 'numeric' };
        return `${this.startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    }

    getTotalMeals() {
        // Return actual count of scheduled meals for this meal type
        return this.scheduledMeals.length;
    }

    getUniqueRecipes() {
        // Count unique recipe names in scheduled meals
        const uniqueRecipes = new Set(this.scheduledMeals.map(meal => meal.recipe_name || meal.name));
        return uniqueRecipes.size;
    }

    getSharedIngredients() {
        // Calculate shared ingredients across scheduled meals
        // For now, estimate based on unique recipes (can be enhanced later)
        return Math.floor(this.getUniqueRecipes() * 0.6);
    }

    getEstimatedCost() {
        // Calculate estimated cost based on actual scheduled meals
        // For now, use average cost per meal (can be enhanced with real ingredient costs)
        return (this.getTotalMeals() * 8.50).toFixed(2);
    }

    getScheduledMealForDate(date) {
        // Find a scheduled meal for the given date
        const dateStr = date.toDateString();
        return this.scheduledMeals.find(meal => {
            if (meal.scheduled_date) {
                const mealDate = new Date(meal.scheduled_date);
                return mealDate.toDateString() === dateStr;
            }
            return false;
        }) || null;
    }

    renderWeeks() {
        let weeksHtml = '';
        
        for (let week = 0; week < this.weeksToShow; week++) {
            const weekStart = new Date(this.startDate);
            weekStart.setDate(weekStart.getDate() + (week * 7));
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            const weekId = `week-${week}`;
            const isExpanded = this.expandedWeeks.has(week);
            
            weeksHtml += `
                <div class="bg-white rounded-lg shadow">
                    <div class="p-4 border-b border-gray-200">
                        <button class="flex items-center justify-between w-full text-left" 
                                onclick="window.itineraryViews['${this.mealType}'].toggleWeek(${week})">
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Week ${week + 1}: ${this.formatWeekRange(weekStart, weekEnd)}
                                </h4>
                                <p class="text-sm text-gray-600">
                                    ${this.getWeekSummary(week)}
                                </p>
                            </div>
                            <svg class="w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}" 
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div id="${weekId}" class="week-content ${isExpanded ? '' : 'hidden'}">
                        ${this.renderWeekDays(week)}
                    </div>
                </div>
            `;
        }
        
        return weeksHtml;
    }

    formatWeekRange(start, end) {
        const options = { month: 'short', day: 'numeric' };
        return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
    }

    getWeekSummary(week) {
        // Calculate actual meal count for this week
        const weekStart = new Date(this.startDate);
        weekStart.setDate(weekStart.getDate() + (week * 7));
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        // Count actual scheduled meals for this week
        let planned = 0;
        for (let day = 0; day < 7; day++) {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + day);
            
            const scheduledMeal = this.getScheduledMealForDate(date);
            if (scheduledMeal) {
                planned++;
            }
        }
        
        const total = 7;
        return `${planned}/${total} meals planned`;
    }

    renderWeekDays(week) {
        let daysHtml = '';
        
        for (let day = 0; day < 7; day++) {
            const date = new Date(this.startDate);
            date.setDate(date.getDate() + (week * 7) + day);
            
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = date.getDate();
            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
            
            // Get actual scheduled meal for this date
            const scheduledMeal = this.getScheduledMealForDate(date);
            const hasMeal = scheduledMeal !== null;
            const mealName = hasMeal ? (scheduledMeal.recipe_name || scheduledMeal.name) : null;
            const dateStr = date.toDateString();
            
            daysHtml += `
                <div class="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="text-center">
                                <div class="text-sm font-medium text-gray-900">${dayName}</div>
                                <div class="text-xs text-gray-500">${monthName} ${dayNumber}</div>
                            </div>
                            <div class="flex-1">
                                ${hasMeal ? `
                                    <div class="flex items-center space-x-2">
                                        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span class="text-xs">🍽️</span>
                                        </div>
                                        <div>
                                            <div class="font-medium text-gray-900">${mealName}</div>
                                            <div class="text-xs text-gray-500">Ready in 30 min</div>
                                        </div>
                                    </div>
                                ` : `
                                    <div class="text-gray-400 text-sm">No meal planned</div>
                                `}
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            ${hasMeal ? `
                                <button class="text-blue-600 hover:text-blue-800 text-sm" onclick="window.itineraryViews['${this.mealType}'].editMeal('${scheduledMeal?.id || ''}', '${dateStr}')">Edit</button>
                                <button class="text-red-600 hover:text-red-800 text-sm" onclick="window.itineraryViews['${this.mealType}'].removeMeal('${scheduledMeal?.id || ''}', '${dateStr}')" title="Remove meal">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            ` : `
                                <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" onclick="window.itineraryViews['${this.mealType}'].addMeal('${dateStr}')">
                                    Add Meal
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `;
        }
        
        return daysHtml;
    }

    getMockMealName() {
        const meals = [
            'Grilled Chicken Salad', 'Pasta Primavera', 'Beef Stir Fry', 'Salmon with Rice',
            'Vegetable Curry', 'Turkey Sandwich', 'Mushroom Risotto', 'Chicken Tacos',
            'Greek Salad', 'Pork Chops', 'Veggie Burger', 'Fish and Chips'
        ];
        return meals[Math.floor(Math.random() * meals.length)];
    }

    toggleWeek(weekIndex) {
        if (this.expandedWeeks.has(weekIndex)) {
            this.expandedWeeks.delete(weekIndex);
        } else {
            this.expandedWeeks.add(weekIndex);
        }
        this.render(); // Re-render to update the UI
    }

    attachEventListeners() {
        // Weeks selector
        const weeksSelect = document.getElementById(`weeks-select-${this.mealType}`);
        if (weeksSelect) {
            weeksSelect.addEventListener('change', (e) => {
                this.weeksToShow = parseInt(e.target.value);
                this.render();
            });
        }

    }

    removeMeal(mealId, dateStr) {
        console.log(`🗑️ Removing meal ${mealId} from ${dateStr}`);
        
        if (window.app && window.app.removeMealFromSchedule) {
            window.app.removeMealFromSchedule(mealId, dateStr, this.mealType);
            this.render(); // Re-render to show updated data
        } else {
            console.error('❌ App removeMealFromSchedule method not available');
        }
    }

    editMeal(mealId, dateStr) {
        console.log(`✏️ Editing meal ${mealId} on ${dateStr}`);
        
        // Find the current meal
        const currentMeal = window.demoData?.scheduledMeals.find(meal => meal.id === mealId);
        if (!currentMeal) {
            console.error('Meal not found:', mealId);
            return;
        }
        
        // For now, show a simple confirmation to delete or keep
        const currentRecipe = window.demoData?.getRecipes().find(r => r.id === currentMeal.recipe_id);
        const action = confirm(`Current meal: ${currentRecipe?.title || 'Unknown'}\n\nClick OK to delete this meal, or Cancel to keep it.`);
        
        if (action) {
            this.deleteMeal(mealId);
        }
    }

    deleteMeal(mealId) {
        console.log(`🗑️ Deleting meal ${mealId}`);
        
        // Find and remove the meal
        const mealIndex = window.demoData?.scheduledMeals.findIndex(meal => meal.id === mealId);
        if (mealIndex === -1) {
            console.error('Meal not found for deletion:', mealId);
            return;
        }
        
        const deletedMeal = window.demoData.scheduledMeals[mealIndex];
        window.demoData.scheduledMeals.splice(mealIndex, 1);
        
        // Update the view
        this.render();
        
        // Show success notification
        this.showNotification(`Deleted meal from ${new Date(deletedMeal.date).toLocaleDateString()}`, 'success');
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('mealDeleted', {
            detail: { mealId: mealId, date: deletedMeal.date }
        }));
    }

    addMeal(dateStr) {
        console.log(`➕ Adding meal on ${dateStr}`);
        this.showMealSelectionModal(dateStr);
    }

    showMealSelectionModal(dateStr) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.id = 'meal-selection-modal';
        
        // Get available recipes for this meal type
        const availableRecipes = this.getAvailableRecipes();
        
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4">
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Add ${this.mealType.charAt(0).toUpperCase() + this.mealType.slice(1)} Meal
                        </h2>
                        <button id="close-meal-modal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Select a recipe for ${new Date(dateStr).toLocaleDateString()}
                    </p>
                </div>
                
                <div class="p-6">
                    <!-- Search and Filter -->
                    <div class="mb-4">
                        <input type="text" id="recipe-search" placeholder="Search recipes..." 
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    </div>
                    
                    <!-- Recipe List -->
                    <div id="recipe-list" class="space-y-3 max-h-96 overflow-y-auto">
                        ${this.renderRecipeOptions(availableRecipes)}
                    </div>
                </div>
                
                <div class="sticky bottom-0 bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                    <div class="flex justify-end space-x-3">
                        <button id="cancel-meal-selection" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Cancel
                        </button>
                        <button id="confirm-meal-selection" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50" disabled>
                            Add Meal
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set up event listeners
        this.setupMealSelectionListeners(modal, dateStr);
    }

    getAvailableRecipes() {
        // Get recipes from demo data or database
        if (window.demoData) {
            return window.demoData.getRecipes().filter(recipe => 
                recipe.meal_type === this.mealType || recipe.meal_type === 'any'
            );
        }
        return [];
    }

    renderRecipeOptions(recipes) {
        if (recipes.length === 0) {
            return '<p class="text-gray-500 text-center py-8">No recipes available for this meal type.</p>';
        }
        
        return recipes.map(recipe => `
            <div class="recipe-option border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" 
                 data-recipe-id="${recipe.id}">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-900 dark:text-white">${recipe.title}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${recipe.description || ''}</p>
                        <div class="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                            <span>⏱️ ${recipe.prep_time + recipe.cook_time} min</span>
                            <span>👥 ${recipe.serving_count || 4} servings</span>
                            ${recipe.type === 'combo' ? '<span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">COMBO</span>' : ''}
                        </div>
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${(recipe.labels || []).slice(0, 3).map(label => 
                                `<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${label}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="w-4 h-4 border-2 border-gray-300 rounded-full recipe-checkbox"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupMealSelectionListeners(modal, dateStr) {
        let selectedRecipeId = null;
        
        // Close modal handlers
        const closeModal = () => modal.remove();
        modal.querySelector('#close-meal-modal').addEventListener('click', closeModal);
        modal.querySelector('#cancel-meal-selection').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Recipe selection
        const recipeOptions = modal.querySelectorAll('.recipe-option');
        const confirmButton = modal.querySelector('#confirm-meal-selection');
        
        recipeOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Clear previous selection
                recipeOptions.forEach(opt => {
                    opt.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900');
                    opt.querySelector('.recipe-checkbox').classList.remove('bg-blue-500', 'border-blue-500');
                });
                
                // Select current option
                option.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900');
                const checkbox = option.querySelector('.recipe-checkbox');
                checkbox.classList.add('bg-blue-500', 'border-blue-500');
                checkbox.innerHTML = '<svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
                
                selectedRecipeId = parseInt(option.dataset.recipeId);
                confirmButton.disabled = false;
            });
        });
        
        // Search functionality
        const searchInput = modal.querySelector('#recipe-search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            recipeOptions.forEach(option => {
                const title = option.querySelector('h3').textContent.toLowerCase();
                const description = option.querySelector('p').textContent.toLowerCase();
                const labels = Array.from(option.querySelectorAll('.bg-blue-100')).map(el => el.textContent.toLowerCase()).join(' ');
                
                const matches = title.includes(searchTerm) || description.includes(searchTerm) || labels.includes(searchTerm);
                option.style.display = matches ? 'block' : 'none';
            });
        });
        
        // Confirm selection
        confirmButton.addEventListener('click', () => {
            if (selectedRecipeId) {
                this.scheduleMeal(selectedRecipeId, dateStr);
                closeModal();
            }
        });
    }

    scheduleMeal(recipeId, dateStr) {
        console.log(`📅 Scheduling meal: Recipe ${recipeId} for ${dateStr} (${this.mealType})`);
        
        // Get the recipe details
        const recipe = window.demoData?.getRecipes().find(r => r.id === recipeId);
        if (!recipe) {
            console.error('Recipe not found:', recipeId);
            return;
        }
        
        // Create new scheduled meal
        const newMeal = {
            id: Date.now() + Math.floor(Math.random() * 1000), // Generate unique ID
            recipe_id: recipeId,
            meal_type: this.mealType,
            date: dateStr,
            notes: recipe.title
        };
        
        // Add to demo data (in a real app, this would save to database)
        if (window.demoData) {
            window.demoData.scheduledMeals.push(newMeal);
        }
        
        // Update the view
        this.render();
        
        // Show success notification
        this.showNotification(`Added ${recipe.title} to ${this.mealType} on ${new Date(dateStr).toLocaleDateString()}`, 'success');
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('mealScheduled', {
            detail: { meal: newMeal, recipe: recipe }
        }));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    listenForMealMoves() {
        // Listen for meal move events from calendar view
        document.addEventListener('mealMoved', (e) => {
            const { mealId, mealName, mealType, originalDate, newDate } = e.detail;
            
            // Only respond to moves for our meal type
            if (mealType === this.mealType) {
                console.log(`🔄 Itinerary view updating for ${mealType} meal move:`, mealName);
                
                // Update our local data if we have it
                this.updateMealData(mealId, newDate);
                
                // Re-render to show the updated schedule
                this.render();
                
                // Show notification
                this.showMoveNotification(mealName, newDate);
            }
        });
    }

    updateMealData(mealId, newDate) {
        // Update meal data in our local storage
        // This would typically sync with the database
        console.log(`📅 Updating meal ${mealId} to ${newDate}`);
        
        // In a real implementation, this would update the database
        // For now, we'll just log the change
    }

    showMoveNotification(mealName, newDate) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>🔄</span>
                <span>Itinerary updated: ${mealName} moved to ${new Date(newDate).toLocaleDateString()}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    generateMealPlan() {
        // Mock implementation for now
        console.log(`Generating ${this.mealType} meal plan for ${this.weeksToShow} weeks...`);
        
        // Show a simple notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
        notification.textContent = `${this.mealType.charAt(0).toUpperCase() + this.mealType.slice(1)} meal plan generated!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // Re-render with new data
        this.render();
    }
}

// Global registry for itinerary views
window.itineraryViews = window.itineraryViews || {};
