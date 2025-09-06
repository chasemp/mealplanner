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
    }

    loadScheduledMeals() {
        try {
            // Try to get from main app first
            if (window.app && window.app.getScheduledMeals) {
                this.scheduledMeals = window.app.getScheduledMeals().filter(meal => meal.meal_type === this.mealType);
            } else {
                // Fallback to localStorage
                const stored = localStorage.getItem('mealplanner_scheduled_meals');
                if (stored) {
                    const allMeals = JSON.parse(stored);
                    this.scheduledMeals = allMeals.filter(meal => meal.meal_type === this.mealType);
                } else if (window.DemoDataManager) {
                    // Final fallback to demo data
                    const demoData = new window.DemoDataManager();
                    this.scheduledMeals = demoData.getScheduledMeals().filter(meal => meal.meal_type === this.mealType);
                }
            }
            
            console.log(`📅 Loaded ${this.scheduledMeals.length} ${this.mealType} meals for itinerary`);
        } catch (error) {
            console.error('Error loading scheduled meals:', error);
            this.scheduledMeals = [];
        }
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
                            <option value="1">1 Week</option>
                            <option value="2">2 Weeks</option>
                            <option value="4" selected>4 Weeks</option>
                            <option value="8">8 Weeks</option>
                        </select>
                    </div>
                </div>

                <!-- Planning Summary -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.getTotalMeals()}</div>
                        <div class="text-sm text-gray-600">Total Meals</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-green-600">${this.getUniqueRecipes()}</div>
                        <div class="text-sm text-gray-600">Unique Recipes</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-orange-600">${this.getSharedIngredients()}</div>
                        <div class="text-sm text-gray-600">Shared Ingredients</div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-purple-600">$${this.getEstimatedCost()}</div>
                        <div class="text-sm text-gray-600">Estimated Cost</div>
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
        // Mock data for now
        const planned = Math.floor(Math.random() * 4) + 3;
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
        // TODO: Implement meal editing functionality
        alert('Edit meal functionality coming soon!');
    }

    addMeal(dateStr) {
        console.log(`➕ Adding meal on ${dateStr}`);
        // TODO: Implement add meal functionality
        alert('Add meal functionality coming soon!');
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
