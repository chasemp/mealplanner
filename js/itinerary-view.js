/**
 * ItineraryView - Manages the display and interaction of scheduled meals in itinerary format
 * 
 * CRITICAL CACHE SYNCHRONIZATION AND UI REFRESH FIXES:
 * 
 * This class implements several critical fixes for data consistency and UI refresh issues:
 * 
 * 1. SCHEDULE MANAGER CACHE SYNC:
 *    - The scheduleManager maintains a cached copy of scheduledMeals for performance
 *    - When meals are added/removed/moved, both localStorage AND the cache must be updated
 *    - Without cache sync, forceRefresh() loads stale cached data instead of updated localStorage data
 *    - All meal operations (add/remove/move) now update both data sources immediately
 * 
 * 2. CROSS-PAGE DATA CONSISTENCY:
 *    - Scheduling meals from Recipe page must update Plan tab's itinerary view
 *    - This requires cache synchronization in RecipeManager.scheduleRecipeForSpecificDate()
 *    - Without this fix, scheduled meals don't appear until page refresh
 * 
 * 3. UI REFRESH TIMING:
 *    - forceRefresh() uses 100ms setTimeout to ensure data writes complete before UI updates
 *    - DOM container is cleared and reloaded to prevent visual artifacts
 *    - Forced DOM reflow (offsetHeight) ensures visual changes are applied immediately
 *    - expandedWeeks state is cleared to prevent stale UI state
 * 
 * 4. AUTHORITATIVE DATA SOURCE:
 *    - loadScheduledMeals() always loads from mealPlannerSettings (localStorage) not cache
 *    - This ensures UI always reflects the most current data state
 *    - Cache is updated after loading to keep it in sync for other components
 * 
 * These fixes resolve the "UI not updating immediately" issues reported by users.
 */
class ItineraryView {
    constructor(container, mealType = 'dinner', mealPlanData = {}) {
        this.container = container;
        this.mealType = mealType;
        this.mealPlanData = mealPlanData;
        this.expandedWeeks = new Set();
        
        // Initialize start date to Sunday of current week (to match renderWeekOptions logic)
        const today = new Date();
        this.startDate = new Date(today);
        this.startDate.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
        
        this.weeksToShow = 1;
        this.currentView = 'itinerary';
        this.scheduledMeals = [];
        
        // Listen for schedule manager events to keep data in sync
        this.setupScheduleEventListeners();
    }

    loadScheduledMeals() {
        try {
            // PLAN VS MENU ARCHITECTURE: Plan tab shows prospective schedule, other tabs show committed schedule
            let allMeals = [];
            if (this.mealType === 'plan') {
                // Plan tab shows prospective schedule from planScheduledMeals
                allMeals = window.mealPlannerSettings?.getAuthoritativeData('planScheduledMeals') || [];
                console.log(`📅 Plan tab loading ${allMeals.length} meals from PLAN storage (prospective schedule)`);
            } else {
                // Other meal type tabs show committed schedule from menuScheduledMeals
                allMeals = window.mealPlannerSettings?.getAuthoritativeData('menuScheduledMeals') || [];
                console.log(`📅 ${this.mealType} tab loading ${allMeals.length} meals from MENU storage (committed schedule)`);
            }
            
            if (this.mealType === 'plan') {
                // For plan tab, show all scheduled meals regardless of type
                this.scheduledMeals = allMeals;
            } else {
                // For specific meal types, filter by type
                this.scheduledMeals = allMeals.filter(meal => meal.meal_type === this.mealType);
            }
            
            console.log(`📅 Loaded ${this.scheduledMeals.length} ${this.mealType === 'plan' ? 'total' : this.mealType} meals for itinerary:`, this.scheduledMeals);
            
            // Debug: Check what the schedule manager has vs authoritative source
            const scheduleManagerData = window.scheduleManager?.scheduledMeals || [];
            console.log(`🔍 DEBUG loadScheduledMeals - Authoritative source has ${allMeals.length} meals`);
            console.log(`🔍 DEBUG loadScheduledMeals - Schedule manager cache has ${scheduleManagerData.length} meals`);
            
            // CACHE SYNC FIX: Update the schedule manager's cache to keep it in sync with authoritative data
            // This prevents scenarios where scheduleManager has stale cached data that differs from localStorage
            if (window.scheduleManager && window.scheduleManager.scheduledMeals) {
                window.scheduleManager.scheduledMeals = allMeals;
                console.log(`🔄 Updated schedule manager cache with ${allMeals.length} meals`);
            }
        } catch (error) {
            console.error('Error loading scheduled meals:', error);
            this.scheduledMeals = [];
        }
    }

    setupScheduleEventListeners() {
        // Listen for meal scheduling events to refresh the view
        document.addEventListener('mealScheduled', (event) => {
            if (this.mealType === 'plan') {
                // Plan tab shows all meals, so refresh for any meal scheduled
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal scheduled`);
                this.render();
            } else if (event.detail.scheduledMeal && event.detail.scheduledMeal.meal_type === this.mealType) {
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal scheduled`);
                this.render();
            }
        });

        document.addEventListener('mealUnscheduled', (event) => {
            if (this.mealType === 'plan') {
                // Plan tab shows all meals, so refresh for any meal unscheduled
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal unscheduled`);
                this.render();
            } else if (event.detail.scheduledMeal && event.detail.scheduledMeal.meal_type === this.mealType) {
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal unscheduled`);
                this.render();
            }
        });

        document.addEventListener('mealUpdated', (event) => {
            if (this.mealType === 'plan') {
                // Plan tab shows all meals, so refresh for any meal updated
                console.log(`🔄 Refreshing ${this.mealType} itinerary due to meal updated`);
                this.render();
            } else if (event.detail.scheduledMeal && event.detail.scheduledMeal.meal_type === this.mealType) {
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
        try {
            // Load current scheduled meals
            this.loadScheduledMeals();
            
            // Debug logging
            console.log(`🔍 ItineraryView.render() called for ${this.mealType}`);
            console.log(`🔍 Container:`, this.container);
            console.log(`🔍 Scheduled meals:`, this.scheduledMeals);
            console.log(`🔍 Weeks to show:`, this.weeksToShow);
            
            if (!this.container) {
                console.error(`❌ No container found for ${this.mealType} itinerary view`);
                return;
            }
            
            // Clear any fallback content first
            const fallbackContent = this.container.querySelector('.fallback-content');
            if (fallbackContent) {
                console.log(`🧹 Removing fallback content for ${this.mealType} itinerary view`);
                fallbackContent.remove();
            }
            
            console.log(`📝 Setting innerHTML for ${this.mealType} itinerary view`);
            this.container.innerHTML = `
            <div class="itinerary-view">
                <!-- Auto Plan Controls (only for plan tab) -->
                ${this.mealType === 'plan' ? `
                <div class="mb-6 space-y-4">
                    <!-- Meals per Week Control -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label for="meals-per-week" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Meals per Week
                        </label>
                        <div class="flex items-center space-x-4">
                            <input type="range" 
                                   id="meals-per-week" 
                                   min="1" 
                                   max="7" 
                                   value="7" 
                                   class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600">
                            <span id="meals-per-week-value" class="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">7</span>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>1</span>
                            <span>7</span>
                        </div>
                    </div>

                    <!-- Meal Spacing Control -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label for="meal-spacing" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Minimum Days Between Same Meal
                        </label>
                        <div class="flex items-center space-x-4">
                            <input type="range" 
                                   id="meal-spacing" 
                                   min="1" 
                                   max="14" 
                                   value="3" 
                                   class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600">
                            <span id="meal-spacing-value" class="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">3</span>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>1</span>
                            <span>14</span>
                        </div>
                    </div>
                </div>
                ` : ''}

                <!-- Header -->
                   <div class="mb-6">
                       <div class="flex-1">
                           <h3 class="text-lg font-semibold">Meals</h3>
                           <div class="text-gray-600 text-sm">
                               <div>${this.formatDateRange()}</div>
                               <div>${this.weeksToShow} weeks</div>
                           </div>
                       </div>
                       
                       <div class="flex items-center mt-3">
                           <select id="weeks-select-${this.mealType}" class="text-sm border border-gray-300 rounded px-2 py-1 min-w-0">
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

            console.log(`✅ ${this.mealType} itinerary view HTML set successfully`);
            
            this.attachEventListeners();
            
            // Initialize auto-plan controls for plan tab
            console.log(`🔍 Checking if mealType is 'plan': ${this.mealType} === 'plan' ? ${this.mealType === 'plan'}`);
            if (this.mealType === 'plan') {
                console.log(`🎛️ Calling initializeAutoPlanControls for ${this.mealType}`);
                this.initializeAutoPlanControls();
            }
            
            // Listen for meal move events from calendar view
            this.listenForMealMoves();
            
            console.log(`✅ ${this.mealType} itinerary view render completed successfully`);
        } catch (error) {
            console.error(`❌ Error rendering ${this.mealType} itinerary view:`, error);
            console.error('Stack trace:', error.stack);
            
            // Fallback: show a simple error message
            if (this.container) {
                this.container.innerHTML = `
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-red-800">Error Loading Meals</h3>
                        <p class="text-red-600">There was an error loading the meals section. Please refresh the page.</p>
                        <p class="text-sm text-red-500 mt-2">Error: ${error.message}</p>
                    </div>
                `;
            }
        }
    }

    formatDateRange() {
        const endDate = new Date(this.startDate);
        endDate.setDate(endDate.getDate() + (this.weeksToShow * 7) - 1);
        
        const options = { month: 'short', day: 'numeric' };
        return `${this.startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    }

    getTotalMeals() {
        // Return actual count of scheduled meals for this meal type within the selected timeframe
        const mealsInRange = this.getScheduledMealsInTimeframe();
        console.log(`🔢 getTotalMeals() for ${this.mealType}:`, {
            totalScheduledMeals: this.scheduledMeals.length,
            mealsInRange: mealsInRange.length,
            startDate: this.startDate,
            weeksToShow: this.weeksToShow,
            mealsInRangeData: mealsInRange
        });
        return mealsInRange.length;
    }

    getUniqueRecipes() {
        // Count unique recipe names in scheduled meals within the selected timeframe
        const mealsInRange = this.getScheduledMealsInTimeframe();
        const uniqueRecipes = new Set(mealsInRange.map(meal => meal.meal_name || meal.recipe_name || meal.name));
        console.log(`🔢 getUniqueRecipes() for ${this.mealType}:`, {
            mealsInRange: mealsInRange.length,
            uniqueRecipes: uniqueRecipes.size,
            recipeNames: Array.from(uniqueRecipes)
        });
        return uniqueRecipes.size;
    }

    getScheduledMealsInTimeframe() {
        // Filter scheduled meals to only include those within the selected date range
        const endDate = new Date(this.startDate);
        endDate.setDate(endDate.getDate() + (this.weeksToShow * 7) - 1);
        
        console.log(`🔍 getScheduledMealsInTimeframe() for ${this.mealType}:`, {
            startDate: this.startDate,
            endDate: endDate,
            weeksToShow: this.weeksToShow,
            totalMeals: this.scheduledMeals.length
        });
        console.log(`📅 Plan date range: ${this.startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
        
        const filteredMeals = this.scheduledMeals.filter(meal => {
            if (!meal.date) {
                console.log(`❌ Meal ${meal.id} has no date property:`, meal);
                return false;
            }
            
            const mealDate = new Date(meal.date);
            // Normalize dates to avoid timezone issues
            const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
            const startDateNormalized = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
            const endDateNormalized = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
            
            const inRange = mealDateNormalized >= startDateNormalized && mealDateNormalized <= endDateNormalized;
            
            console.log(`📅 Meal ${meal.id} (${meal.date}):`, {
                mealDate: mealDate,
                inRange: inRange,
                startDate: this.startDate,
                endDate: endDate
            });
            
            return inRange;
        });
        
        console.log(`✅ Filtered to ${filteredMeals.length} meals in timeframe:`, filteredMeals);
        
        // Debug: Detailed meal analysis
        console.log(`🔍 DETAILED MEAL ANALYSIS for ${this.mealType}:`);
        console.log(`📊 Total scheduled meals loaded: ${this.scheduledMeals.length}`);
        console.log(`📊 Meals in current timeframe: ${filteredMeals.length}`);
        console.log(`📅 Date range: ${this.startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
        
        filteredMeals.forEach((meal, index) => {
            console.log(`  ${index + 1}. ${meal.name || meal.recipe_name || meal.meal_name || 'Unknown'} on ${new Date(meal.date).toLocaleDateString()} (ID: ${meal.id})`);
        });
        
        return filteredMeals;
    }

    getSharedIngredients() {
        // Calculate shared ingredients across scheduled meals
        // For now, estimate based on unique recipes (can be enhanced later)
        return Math.floor(this.getUniqueRecipes() * 0.6);
    }

    getEstimatedCost() {
        // Calculate estimated cost based on scheduled meals within the selected timeframe
        // For now, use average cost per meal (can be enhanced with real ingredient costs)
        return (this.getTotalMeals() * 8.50).toFixed(2);
    }

    getRecipeById(recipeId) {
        // Look up recipe from authoritative source
        if (window.mealPlannerSettings) {
            const recipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            return recipes.find(recipe => recipe.id === recipeId);
        } else if (window.recipeManager && window.recipeManager.recipes) {
            return window.recipeManager.recipes.find(recipe => recipe.id === recipeId);
        }
        return null;
    }

    getScheduledMealForDate(date) {
        // Find a scheduled meal for the given date
        const dateStr = date.toDateString();
        console.log(`🔍 Looking for meal on ${dateStr}`);
        
        // Normalize the target date to avoid timezone issues
        const targetDateNormalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        const foundMeal = this.scheduledMeals.find(meal => {
            if (!meal.date) {
                console.warn(`⚠️ Scheduled meal ${meal.id} missing date property:`, meal);
                return false;
            }
            const mealDate = new Date(meal.date);
            // Normalize meal date to avoid timezone issues
            const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
            const matches = mealDateNormalized.getTime() === targetDateNormalized.getTime();
            
            console.log(`  Checking meal ${meal.id}: ${mealDate.toDateString()} === ${dateStr} ? ${matches} (normalized comparison)`);
            return matches;
        }) || null;
        
        console.log(`🔍 Found meal for ${dateStr}:`, foundMeal ? `${foundMeal.name || foundMeal.recipe_name || foundMeal.meal_name} (ID: ${foundMeal.id})` : 'None');
        return foundMeal;
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
            
            // Get meal name and timing from scheduled meal data
            let mealName = null;
            let mealTiming = "Ready in 30 min"; // Default fallback
            if (hasMeal) {
                // Use meal_name from modern schema, with fallbacks for legacy data
                mealName = scheduledMeal.meal_name || scheduledMeal.recipe_name || scheduledMeal.name;
                
                // Use total_time from modern schema, with fallback to recipe lookup
                if (scheduledMeal.total_time && scheduledMeal.total_time > 0) {
                    mealTiming = `Ready in ${scheduledMeal.total_time} min`;
                } else if (scheduledMeal.recipe_id) {
                    // Fallback: look up recipe for legacy data
                    const recipe = this.getRecipeById(scheduledMeal.recipe_id);
                    if (recipe) {
                        if (!mealName) mealName = recipe.title;
                        const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
                        if (totalTime > 0) {
                            mealTiming = `Ready in ${totalTime} min`;
                        }
                    } else if (!mealName) {
                        mealName = `Recipe ${scheduledMeal.recipe_id}`;
                    }
                }
            }
            const dateStr = date.toDateString();
            
            daysHtml += `
                <div class="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 drop-zone" 
                     data-date="${dateStr}"
                     ondragover="event.preventDefault(); this.classList.add('bg-blue-50', 'border-blue-200')"
                     ondragleave="this.classList.remove('bg-blue-50', 'border-blue-200')"
                     ondrop="window.itineraryViews['${this.mealType}'].handleDrop(event, '${dateStr}')">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="text-center">
                                <div class="text-sm font-medium text-gray-900">${dayName}</div>
                                <div class="text-xs text-gray-500">${monthName} ${dayNumber}</div>
                            </div>
                            <div class="flex-1">
                                ${hasMeal ? `
                                    <div class="flex items-center space-x-2 draggable-meal cursor-pointer" 
                                         draggable="true"
                                         data-meal-id="${scheduledMeal?.id || ''}"
                                         data-meal-name="${mealName}"
                                         data-original-date="${dateStr}"
                                         data-recipe-id="${scheduledMeal?.recipe_id || ''}"
                                         onclick="window.itineraryViews['${this.mealType}'].openRecipeView('${scheduledMeal?.recipe_id || ''}')"
                                         ondragstart="window.itineraryViews['${this.mealType}'].handleDragStart(event)"
                                         ondragend="window.itineraryViews['${this.mealType}'].handleDragEnd(event)">
                                        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span class="text-xs">🍽️</span>
                                        </div>
                                        <div>
                                            <div class="font-medium text-gray-900">${mealName}</div>
                                            <div class="text-xs text-gray-500">${mealTiming}</div>
                                        </div>
                                        <div class="ml-2 text-gray-400">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                                            </svg>
                                        </div>
                                    </div>
                                ` : `
                                    <div class="text-gray-400 text-sm">No meal planned</div>
                                `}
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            ${hasMeal ? `
                                <button class="text-red-600 hover:text-red-800 text-sm" onclick="window.itineraryViews['${this.mealType}'].removeMeal('${scheduledMeal?.id || ''}', '${dateStr}')" title="Remove meal">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            ` : `
                                <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" onclick="window.itineraryViews['${this.mealType}'].addMealForDate('${dateStr}')">
                                    Add
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
                
                // Update start date to match the week range calculation (Sunday start)
                const today = new Date();
                this.startDate = new Date(today);
                this.startDate.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
                
                this.render();
            });
        }

    }

    removeMeal(mealId, dateStr) {
        console.log(`🗑️ Removing meal ${mealId} from ${dateStr}`);
        
        try {
            // Get current scheduled meals from authoritative source
            let scheduledMeals = window.mealPlannerSettings?.getAuthoritativeData('scheduledMeals') || [];
            
            // Find and remove the meal (handle both string and number IDs)
            console.log(`🔍 Looking for meal ID: ${mealId} (type: ${typeof mealId})`);
            console.log(`🔍 Available meal IDs:`, scheduledMeals.map(m => ({ id: m.id, type: typeof m.id, name: m.name })));
            
            const mealIndex = scheduledMeals.findIndex(meal => {
                const match = meal.id == mealId || meal.id === parseInt(mealId) || meal.id === String(mealId);
                console.log(`🔍 Comparing meal ${meal.id} (${typeof meal.id}) with ${mealId} (${typeof mealId}): ${match}`);
                return match;
            });
            
            if (mealIndex !== -1) {
                const removedMeal = scheduledMeals[mealIndex];
                
                // Debug: Check what properties the meal actually has
                console.log(`🔍 Removed meal object:`, removedMeal);
                
                // Get meal name from available properties (could be name, recipe_name, or meal_name)
                const mealName = removedMeal.name || removedMeal.recipe_name || removedMeal.meal_name || `meal ${removedMeal.id}`;
                
                console.log(`🔍 Before removal - scheduledMeals count: ${scheduledMeals.length}`);
                scheduledMeals.splice(mealIndex, 1);
                console.log(`🔍 After removal - scheduledMeals count: ${scheduledMeals.length}`);
                
                // Save back to authoritative source
                if (window.mealPlannerSettings) {
                    window.mealPlannerSettings.saveAuthoritativeData('scheduledMeals', scheduledMeals);
                    console.log(`💾 Saved updated scheduledMeals to authoritative source`);
                    
                    // CRITICAL CACHE SYNC: Update the schedule manager's cache immediately after saving
                    // This prevents UI refresh issues where forceRefresh() loads stale cached data
                    // instead of the updated data that was just saved to localStorage
                    if (window.scheduleManager && window.scheduleManager.scheduledMeals) {
                        window.scheduleManager.scheduledMeals = scheduledMeals;
                        console.log(`🔄 Updated schedule manager cache after removal with ${scheduledMeals.length} meals`);
                    }
                    
                    // Verify the save worked
                    const verifyData = window.mealPlannerSettings.getAuthoritativeData('scheduledMeals');
                    console.log(`🔍 Verification - authoritative data now has ${verifyData.length} meals`);
                    
                    // Double-check that the removed meal is actually gone
                    const stillExists = verifyData.find(m => m.id == mealId || m.id === parseInt(mealId) || m.id === String(mealId));
                    console.log(`🔍 Double-check - removed meal still exists in data: ${!!stillExists}`);
                }
                
                // Force a complete refresh to ensure UI updates
                this.forceRefresh();
                
                // Dispatch event for other components to update
                window.dispatchEvent(new CustomEvent('mealUnscheduled', {
                    detail: { 
                        scheduledMeal: removedMeal,
                        mealId: mealId,
                        date: dateStr,
                        mealType: this.mealType
                    }
                }));
                
                // Show user notification
                if (window.mealPlannerApp && window.mealPlannerApp.showNotification) {
                    window.mealPlannerApp.showNotification(
                        `Removed "${mealName}" from ${new Date(dateStr).toLocaleDateString()}`, 
                        'success'
                    );
                }
                
                console.log(`✅ Removed meal "${mealName}" from ${dateStr}`);
            } else {
                console.warn(`⚠️ Meal ${mealId} not found in scheduled meals`);
            }
        } catch (error) {
            console.error('❌ Error removing meal:', error);
        }
    }

    editMeal(mealId, dateStr) {
        console.log(`✏️ Editing meal ${mealId} on ${dateStr}`);
        
        // Find the current meal from authoritative source
        const scheduledMeals = window.mealPlannerSettings?.getAuthoritativeData('scheduledMeals') || [];
        const currentMeal = scheduledMeals.find(meal => meal.id === mealId);
        if (!currentMeal) {
            console.error('Meal not found:', mealId);
            return;
        }
        
        // For now, show a simple confirmation to delete or keep
        const recipes = window.mealPlannerSettings?.getAuthoritativeData('recipes') || [];
        const currentRecipe = recipes.find(r => r.id === currentMeal.recipe_id);
        const action = confirm(`Current meal: ${currentRecipe?.title || 'Unknown'}\n\nClick OK to delete this meal, or Cancel to keep it.`);
        
        if (action) {
            this.deleteMeal(mealId);
        }
    }

    deleteMeal(mealId) {
        console.log(`🗑️ Deleting meal ${mealId}`);
        
        // Get current scheduled meals from authoritative source
        let scheduledMeals = window.mealPlannerSettings?.getAuthoritativeData('scheduledMeals') || [];
        
        // Find and remove the meal
        const mealIndex = scheduledMeals.findIndex(meal => meal.id === mealId);
        if (mealIndex === -1) {
            console.error('Meal not found for deletion:', mealId);
            return;
        }
        
        const deletedMeal = scheduledMeals[mealIndex];
        scheduledMeals.splice(mealIndex, 1);
        
        // Save back to authoritative source
        if (window.mealPlannerSettings) {
            window.mealPlannerSettings.saveAuthoritativeData('scheduledMeals', scheduledMeals);
        }
        
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
        // Get recipes from authoritative data source
        if (window.mealPlannerSettings) {
            const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes') || [];
            return allRecipes.filter(recipe => 
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
        
        // Get the recipe details from authoritative data source
        let recipe = null;
        if (window.mealPlannerSettings) {
            const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes') || [];
            recipe = allRecipes.find(r => r.id === recipeId);
        }
        
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
        
        // Save to authoritative data source
        if (window.mealPlannerSettings) {
            const currentMeals = window.mealPlannerSettings.getAuthoritativeData('scheduledMeals') || [];
            currentMeals.push(newMeal);
            window.mealPlannerSettings.saveAuthoritativeData('scheduledMeals', currentMeals);
            
            // CACHE SYNC FIX: Update schedule manager cache after adding new meals
            // This prevents the UI from showing stale data when forceRefresh() is called
            if (window.scheduleManager && window.scheduleManager.scheduledMeals) {
                window.scheduleManager.scheduledMeals = currentMeals;
                console.log(`🔄 Updated schedule manager cache after add with ${currentMeals.length} meals`);
            }
        }
        
        // UI REFRESH FIX: Use forceRefresh() instead of render() for immediate UI updates
        // This ensures the new meal appears immediately without requiring a page refresh
        this.forceRefresh();
        
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

    // Force a complete refresh of the itinerary view
    forceRefresh() {
        console.log(`🔄 Force refreshing ${this.mealType} itinerary view...`);

        // UI REFRESH TIMING FIX: Clear the container completely to ensure fresh render
        // This prevents visual artifacts from previous render states
        if (this.container) {
            this.container.innerHTML = '<div class="text-center py-4">Loading...</div>';
            console.log(`🧹 Container cleared for ${this.mealType} itinerary view`);
        }

        // TIMING FIX: Use setTimeout to ensure DOM updates and data saves are fully processed
        // This prevents race conditions where UI updates before data is fully committed
        setTimeout(() => {
            // Force reload data from authoritative source (not cached data)
            this.loadScheduledMeals();
            console.log(`📊 After reload: ${this.scheduledMeals.length} meals loaded for ${this.mealType}`);

            // Clear any cached state that might interfere with fresh rendering
            this.expandedWeeks.clear();

            // Re-render with fresh data
            this.render();

            // VISUAL UPDATE FIX: Force a DOM reflow to ensure visual update is applied immediately
            // This prevents scenarios where data is updated but UI doesn't reflect changes
            if (this.container) {
                this.container.offsetHeight; // Trigger reflow
                console.log(`🔄 Forced DOM reflow for ${this.mealType} itinerary view`);
            }

            console.log(`✅ Force refresh completed for ${this.mealType} itinerary view`);
        }, 100); // 100ms delay ensures all localStorage writes and cache updates are processed
    }

    // Drag and Drop functionality
    handleDragStart(event) {
        const mealElement = event.target.closest('.draggable-meal');
        if (!mealElement) return;

        const mealId = mealElement.dataset.mealId;
        const mealName = mealElement.dataset.mealName;
        const originalDate = mealElement.dataset.originalDate;

        console.log(`🖱️ Started dragging meal: ${mealName} (${mealId}) from ${originalDate}`);
        
        // Debug: Find the actual meal in scheduledMeals to check its real date
        const actualMeal = this.scheduledMeals.find(m => m.id == mealId || m.id === parseInt(mealId));
        if (actualMeal) {
            console.log(`🔍 Actual meal data:`, {
                id: actualMeal.id,
                name: actualMeal.name,
                date: actualMeal.date,
                elementDate: originalDate
            });
        } else {
            console.warn(`⚠️ Could not find meal ${mealId} in scheduledMeals during drag start`);
        }

        // Store drag data
        event.dataTransfer.setData('text/plain', JSON.stringify({
            mealId: mealId,
            mealName: mealName,
            originalDate: originalDate,
            mealType: this.mealType
        }));

        // Add visual feedback
        mealElement.classList.add('opacity-50');
    }

    handleDragEnd(event) {
        const mealElement = event.target.closest('.draggable-meal');
        if (mealElement) {
            mealElement.classList.remove('opacity-50');
        }
        
        // Remove drag feedback from all drop zones
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('bg-blue-50', 'border-blue-200');
        });
    }

    handleDrop(event, targetDateStr) {
        event.preventDefault();
        
        try {
            const dragData = JSON.parse(event.dataTransfer.getData('text/plain'));
            const { mealId, mealName, originalDate } = dragData;
            
            // Don't do anything if dropped on the same date
            if (originalDate === targetDateStr) {
                console.log(`📍 Meal dropped on same date, no action needed`);
                return;
            }
            
            console.log(`📍 Dropping meal: ${mealName} from ${originalDate} to ${targetDateStr}`);
            
            // Get current scheduled meals
            let scheduledMeals = window.mealPlannerSettings?.getAuthoritativeData('scheduledMeals') || [];
            
            // Find the meal to move (handle both string and number IDs)
            console.log(`🔍 Looking for meal ID to move: ${mealId} (type: ${typeof mealId})`);
            console.log(`🔍 Available meal IDs:`, scheduledMeals.map(m => ({ id: m.id, type: typeof m.id, name: m.name })));
            
            const mealIndex = scheduledMeals.findIndex(meal => {
                const match = meal.id == mealId || meal.id === parseInt(mealId) || meal.id === String(mealId);
                console.log(`🔍 Comparing meal ${meal.id} (${typeof meal.id}) with ${mealId} (${typeof mealId}): ${match}`);
                return match;
            });
            
            if (mealIndex === -1) {
                console.error('Meal not found for moving:', mealId);
                console.error('Available meals:', scheduledMeals);
                return;
            }
            
            // Update the meal's date
            const meal = scheduledMeals[mealIndex];
            const newDate = new Date(targetDateStr);
            meal.date = newDate.toISOString();
            
            // Save back to authoritative source
            if (window.mealPlannerSettings) {
                window.mealPlannerSettings.saveAuthoritativeData('scheduledMeals', scheduledMeals);
                
                // CACHE SYNC FIX: Update schedule manager cache after drag & drop operations
                // This ensures that subsequent UI operations see the updated meal positions
                if (window.scheduleManager && window.scheduleManager.scheduledMeals) {
                    window.scheduleManager.scheduledMeals = scheduledMeals;
                    console.log(`🔄 Updated schedule manager cache after move with ${scheduledMeals.length} meals`);
                }
            }
            
            // Check if the moved meal is now outside the current viewing range
            const movedMealDate = new Date(targetDateStr);
            const currentEndDate = new Date(this.startDate);
            currentEndDate.setDate(currentEndDate.getDate() + (this.weeksToShow * 7) - 1);
            
            // If meal was moved outside current range, expand the view to include it
            if (movedMealDate > currentEndDate) {
                // Calculate how many additional weeks we need
                const daysDiff = Math.ceil((movedMealDate - currentEndDate) / (1000 * 60 * 60 * 24));
                const additionalWeeks = Math.ceil(daysDiff / 7);
                this.weeksToShow += additionalWeeks;
                console.log(`📅 Expanded view to ${this.weeksToShow} weeks to include moved meal`);
                
                // Show notification about view expansion
                if (window.mealPlannerApp && window.mealPlannerApp.showNotification) {
                    window.mealPlannerApp.showNotification(
                        `View expanded to ${this.weeksToShow} weeks to show moved meal.`, 
                        'info'
                    );
                }
            } else if (movedMealDate < this.startDate) {
                // If meal was moved before current start date, adjust start date
                const daysDiff = Math.ceil((this.startDate - movedMealDate) / (1000 * 60 * 60 * 24));
                const weeksBack = Math.ceil(daysDiff / 7);
                
                // Move start date back to include the meal
                this.startDate = new Date(movedMealDate);
                this.startDate.setDate(this.startDate.getDate() - (this.startDate.getDay())); // Align to Sunday
                this.weeksToShow += weeksBack;
                
                console.log(`📅 Adjusted start date and expanded view to include moved meal`);
                
                // Show notification about view adjustment
                if (window.mealPlannerApp && window.mealPlannerApp.showNotification) {
                    window.mealPlannerApp.showNotification(
                        `View adjusted to show moved meal.`, 
                        'info'
                    );
                }
            }
            
            // Force a complete refresh to ensure UI updates
            this.forceRefresh();
            
            // Dispatch event for other components to update
            window.dispatchEvent(new CustomEvent('mealMoved', {
                detail: { 
                    meal: meal,
                    fromDate: originalDate,
                    toDate: targetDateStr,
                    mealType: this.mealType
                }
            }));
            
            console.log(`✅ Moved meal "${mealName}" from ${originalDate} to ${targetDateStr}`);
            
        } catch (error) {
            console.error('❌ Error handling drop:', error);
        }
        
        // Clean up visual feedback
        event.target.closest('.drop-zone')?.classList.remove('bg-blue-50', 'border-blue-200');
    }

    addMealForDate(dateStr) {
        console.log(`📅 Adding meal for date: ${dateStr}`);
        
        // Store the target date and meal type globally for the recipe manager to use
        window.schedulingContext = {
            targetDate: dateStr,
            mealType: this.mealType,
            returnTab: 'plan'
        };
        
        // Switch to recipes tab
        if (window.mealPlannerApp && window.mealPlannerApp.switchTab) {
            window.mealPlannerApp.switchTab('recipes');
        } else if (window.app && window.app.switchTab) {
            window.app.switchTab('recipes');
        } else {
            // Fallback: trigger mobile navigation
            const recipesTab = document.querySelector('[data-tab="recipes"]');
            if (recipesTab) {
                recipesTab.click();
            }
        }
        
        // Show scheduling banner in recipes tab
        this.showSchedulingBanner(dateStr);
    }

    openRecipeView(recipeId) {
        console.log(`🍳 Opening recipe view for recipe ID: ${recipeId}`);
        
        if (!recipeId) {
            console.error('❌ No recipe ID provided to openRecipeView');
            return;
        }
        
        // Check if recipe manager is available
        if (!window.recipeManager) {
            console.error('❌ Recipe manager not available');
            return;
        }
        
        // Store navigation context for return to menu
        window.navigationContext = {
            returnTab: 'menu',
            returnMealType: this.mealType
        };
        
        // Switch to recipes tab first
        if (window.mealPlannerApp && window.mealPlannerApp.switchTab) {
            window.mealPlannerApp.switchTab('recipes');
        } else if (window.app && window.app.switchTab) {
            window.app.switchTab('recipes');
        } else {
            // Fallback: trigger mobile navigation
            const recipesTab = document.querySelector('[data-tab="recipes"]');
            if (recipesTab) {
                recipesTab.click();
            }
        }
        
        // Wait for tab switch, then open recipe view
        setTimeout(() => {
            if (window.recipeManager && window.recipeManager.showRecipeDetail) {
                console.log(`🍳 Calling showRecipeDetail for recipe ${recipeId}`);
                window.recipeManager.showRecipeDetail(parseInt(recipeId));
            } else {
                console.error('❌ Recipe manager or showRecipeDetail method not available');
            }
        }, 100);
    }
    
    showSchedulingBanner(dateStr) {
        // Wait a moment for tab switch, then add banner
        setTimeout(() => {
            const recipesContainer = document.getElementById('recipes-tab');
            if (!recipesContainer) return;
            
            // Remove any existing banner
            const existingBanner = recipesContainer.querySelector('.scheduling-banner');
            if (existingBanner) {
                existingBanner.remove();
            }
            
            // Create new banner
            const date = new Date(dateStr);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            const banner = document.createElement('div');
            banner.className = 'scheduling-banner bg-blue-100 border-l-4 border-blue-500 p-4 mb-4';
            banner.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <div>
                            <p class="text-blue-800 font-medium">📅 Scheduling meal for ${dayName}, ${monthDay}</p>
                            <p class="text-blue-600 text-sm">Click "Schedule" on any recipe to add it to this day</p>
                        </div>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove(); window.schedulingContext = null;" class="text-blue-500 hover:text-blue-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `;
            
            // Insert banner at the top of recipes content
            const recipesContent = recipesContainer.querySelector('.recipes-content') || recipesContainer;
            recipesContent.insertBefore(banner, recipesContent.firstChild);
            
        }, 100);
    }
    
    initializeAutoPlanControls() {
        console.log('🎛️ Initializing auto-plan controls...');
        
        // Initialize meals per week slider
        const mealsPerWeekSlider = document.getElementById('meals-per-week');
        const mealsPerWeekValue = document.getElementById('meals-per-week-value');
        
        if (mealsPerWeekSlider && mealsPerWeekValue) {
            // Update display value when slider changes
            mealsPerWeekSlider.addEventListener('input', (e) => {
                mealsPerWeekValue.textContent = e.target.value;
            });
            
            // Initialize display value
            mealsPerWeekValue.textContent = mealsPerWeekSlider.value;
        }
        
        // Initialize meal spacing slider
        const mealSpacingSlider = document.getElementById('meal-spacing');
        const mealSpacingValue = document.getElementById('meal-spacing-value');
        
        if (mealSpacingSlider && mealSpacingValue) {
            // Update display value when slider changes
            mealSpacingSlider.addEventListener('input', (e) => {
                mealSpacingValue.textContent = e.target.value;
            });
            
            // Initialize display value
            mealSpacingValue.textContent = mealSpacingSlider.value;
        }
        
        console.log('✅ Auto-plan controls initialized');
    }
}

// Global registry for itinerary views
window.itineraryViews = window.itineraryViews || {};
