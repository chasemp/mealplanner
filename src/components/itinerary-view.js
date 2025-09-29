// Itinerary View Component for Meal Planning
export class ItineraryView {
    constructor(container, mealPlanData = {}) {
        this.container = container
        this.mealPlanData = mealPlanData
        this.expandedWeeks = new Set()
        this.startDate = new Date()
        this.weeksToShow = 4
    }

    render() {
        this.container.innerHTML = `
            <div class="itinerary-view">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h2 class="text-xl font-semibold">Meal Plan Itinerary</h2>
                        <p class="text-gray-600 text-sm">
                            ${this.formatDateRange()} • ${this.weeksToShow} weeks
                        </p>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                        <select id="weeks-select" class="form-select text-sm">
                            <option value="1">1 Week</option>
                            <option value="2">2 Weeks</option>
                            <option value="4" selected>4 Weeks</option>
                            <option value="8">8 Weeks</option>
                        </select>
                        <button id="view-calendar" class="btn-secondary text-sm">Calendar View</button>
                        <button id="generate-plan" class="btn-primary text-sm">Auto-Generate Plan</button>
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
                        <div class="text-sm text-gray-600">Est. Grocery Cost</div>
                    </div>
                </div>

                <!-- Week-by-Week Breakdown -->
                <div class="space-y-4">
                    ${this.renderWeeks()}
                </div>

                <!-- Optimization Suggestions -->
                <div class="mt-8 bg-blue-50 rounded-lg p-6">
                    <h3 class="font-semibold text-blue-900 mb-3">🧠 Smart Suggestions</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${this.renderOptimizationSuggestions()}
                    </div>
                </div>
            </div>
        `
        
        this.attachEventListeners()
    }

    renderWeeks() {
        const weeks = []
        const currentDate = new Date(this.startDate)
        
        for (let weekNum = 1; weekNum <= this.weeksToShow; weekNum++) {
            const weekStart = new Date(currentDate)
            const weekEnd = new Date(currentDate)
            weekEnd.setDate(weekEnd.getDate() + 6)
            
            const weekData = this.getWeekData(weekStart, weekEnd)
            const isExpanded = this.expandedWeeks.has(weekNum)
            
            weeks.push(`
                <div class="week-section bg-white rounded-lg shadow">
                    <!-- Week Header -->
                    <div class="week-header p-4 border-b cursor-pointer hover:bg-gray-50" 
                         data-week="${weekNum}">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-3">
                                <button class="expand-btn">
                                    <svg class="w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}" 
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                <div>
                                    <h3 class="font-semibold">Week ${weekNum}</h3>
                                    <p class="text-sm text-gray-600">
                                        ${this.formatWeekRange(weekStart, weekEnd)}
                                    </p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-4">
                                <div class="text-sm text-gray-600">
                                    ${weekData.totalMeals} meals • ${weekData.uniqueRecipes} recipes
                                </div>
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800 text-sm">
                                        📋 Grocery List
                                    </button>
                                    <button class="text-green-600 hover:text-green-800 text-sm">
                                        🔄 Optimize
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Week Details -->
                    <div class="week-details ${isExpanded ? '' : 'hidden'}" data-week-content="${weekNum}">
                        ${this.renderWeekDetails(weekStart, weekData)}
                    </div>
                </div>
            `)
            
            currentDate.setDate(currentDate.getDate() + 7)
        }
        
        return weeks.join('')
    }

    renderWeekDetails(weekStart, weekData) {
        const days = []
        const currentDate = new Date(weekStart)
        
        for (let i = 0; i < 7; i++) {
            const dateKey = this.getDateKey(currentDate)
            const dayMeals = this.mealPlanData[dateKey] || []
            const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
            const dayDate = currentDate.getDate()
            
            days.push(`
                <div class="day-section border-b last:border-b-0">
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h4 class="font-medium">${dayName}</h4>
                                <p class="text-sm text-gray-600">${currentDate.toLocaleDateString()}</p>
                            </div>
                            <button class="add-meal-btn text-blue-600 hover:text-blue-800 text-sm">
                                + Add Meal
                            </button>
                        </div>
                        
                        ${dayMeals.length === 0 ? `
                            <div class="text-gray-400 text-sm italic">No meals planned</div>
                        ` : `
                            <div class="space-y-2">
                                ${dayMeals.map(meal => this.renderMealItem(meal)).join('')}
                            </div>
                        `}
                    </div>
                </div>
            `)
            
            currentDate.setDate(currentDate.getDate() + 1)
        }
        
        return `
            <div class="week-content">
                ${days.join('')}
                
                <!-- Week Summary -->
                <div class="p-4 bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <h5 class="font-medium mb-2">🛒 Key Ingredients</h5>
                            <div class="space-y-1">
                                ${weekData.keyIngredients.map(ing => `
                                    <div class="flex justify-between">
                                        <span>${ing.name}</span>
                                        <span class="text-gray-600">${ing.totalAmount} ${ing.unit}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div>
                            <h5 class="font-medium mb-2">⚖️ Balance Check</h5>
                            <div class="space-y-1">
                                <div class="flex justify-between">
                                    <span>Protein meals:</span>
                                    <span class="text-green-600">${weekData.proteinMeals}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Vegetarian:</span>
                                    <span class="text-green-600">${weekData.vegetarianMeals}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Repeated recipes:</span>
                                    <span class="${weekData.repeatedRecipes > 2 ? 'text-orange-600' : 'text-green-600'}">${weekData.repeatedRecipes}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h5 class="font-medium mb-2">💰 Cost Breakdown</h5>
                            <div class="space-y-1">
                                <div class="flex justify-between">
                                    <span>Produce:</span>
                                    <span>$${weekData.costs.produce}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Proteins:</span>
                                    <span>$${weekData.costs.proteins}</span>
                                </div>
                                <div class="flex justify-between font-medium">
                                    <span>Total:</span>
                                    <span>$${weekData.costs.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    renderMealItem(meal) {
        const typeColors = {
            breakfast: 'bg-blue-100 text-blue-800',
            lunch: 'bg-green-100 text-green-800',
            dinner: 'bg-orange-100 text-orange-800'
        }
        
        return `
            <div class="meal-item flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        ${meal.image ? `<img src="${meal.image}" class="w-full h-full object-cover rounded-lg">` : '🍽️'}
                    </div>
                    <div>
                        <h5 class="font-medium">${window.scheduleManager ? window.scheduleManager.getRecipeName(meal) : meal.meal_name || 'Unknown Recipe'}</h5>
                        <div class="flex items-center space-x-2 text-sm">
                            <span class="px-2 py-1 rounded-full ${typeColors[meal.type] || 'bg-gray-100 text-gray-800'} capitalize">
                                ${meal.type}
                            </span>
                            <span class="text-gray-600">Serves ${meal.serving_count || 4}</span>
                            ${meal.prep_time ? `<span class="text-gray-600">${meal.prep_time + (meal.cook_time || 0)} min</span>` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button class="text-gray-400 hover:text-gray-600" title="Move meal">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                        </svg>
                    </button>
                    <button class="text-blue-600 hover:text-blue-800" title="Edit meal">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button class="text-red-600 hover:text-red-800" title="Remove meal">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `
    }

    renderOptimizationSuggestions() {
        const suggestions = [
            {
                type: 'ingredient',
                title: 'Ingredient Optimization',
                message: 'Use chicken breast in 3 recipes this week to buy in bulk and save $8',
                action: 'Apply Suggestion'
            },
            {
                type: 'variety',
                title: 'Recipe Variety',
                message: 'You have pasta 4 times this month. Try rice or quinoa alternatives?',
                action: 'Show Alternatives'
            },
            {
                type: 'prep',
                title: 'Prep Time Optimization',
                message: 'Schedule slow-cooker meals on busy weekdays (Tue, Thu)',
                action: 'Auto-Schedule'
            },
            {
                type: 'nutrition',
                title: 'Nutritional Balance',
                message: 'Add 2 more vegetarian meals to meet your weekly goal',
                action: 'Find Recipes'
            }
        ]
        
        return suggestions.map(suggestion => `
            <div class="suggestion-item p-4 bg-white rounded-lg border border-blue-200">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium text-blue-900">${suggestion.title}</h4>
                        <p class="text-sm text-gray-700 mt-1">${suggestion.message}</p>
                    </div>
                    <button class="btn-primary text-xs ml-3">${suggestion.action}</button>
                </div>
            </div>
        `).join('')
    }

    attachEventListeners() {
        // Week expansion
        document.querySelectorAll('.week-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const weekNum = parseInt(header.dataset.week)
                const content = document.querySelector(`[data-week-content="${weekNum}"]`)
                const expandBtn = header.querySelector('.expand-btn svg')
                
                if (this.expandedWeeks.has(weekNum)) {
                    this.expandedWeeks.delete(weekNum)
                    content.classList.add('hidden')
                    expandBtn.classList.remove('rotate-90')
                } else {
                    this.expandedWeeks.add(weekNum)
                    content.classList.remove('hidden')
                    expandBtn.classList.add('rotate-90')
                }
            })
        })
        
        // Weeks selector
        document.getElementById('weeks-select')?.addEventListener('change', (e) => {
            this.weeksToShow = parseInt(e.target.value)
            this.render()
        })
        
        // View switching
        document.getElementById('view-calendar')?.addEventListener('click', () => {
            this.container.dispatchEvent(new CustomEvent('switchView', { 
                detail: { view: 'calendar' } 
            }))
        })
    }

    // Utility methods
    getDateKey(date) {
        return date.toISOString().split('T')[0]
    }

    formatDateRange() {
        const endDate = new Date(this.startDate)
        endDate.setDate(endDate.getDate() + (this.weeksToShow * 7) - 1)
        
        return `${this.startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    }

    formatWeekRange(start, end) {
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    }

    getWeekData(weekStart, weekEnd) {
        // This would analyze the week's meals and return statistics
        return {
            totalMeals: 15,
            uniqueRecipes: 12,
            keyIngredients: [
                { name: 'Chicken Breast', totalAmount: '2', unit: 'lbs' },
                { name: 'Rice', totalAmount: '3', unit: 'cups' },
                { name: 'Onions', totalAmount: '4', unit: 'pieces' }
            ],
            proteinMeals: 8,
            vegetarianMeals: 4,
            repeatedRecipes: 1,
            costs: {
                produce: '25.50',
                proteins: '35.00',
                total: '78.25'
            }
        }
    }

    getTotalMeals() {
        return Object.values(this.mealPlanData).reduce((count, meals) => count + meals.length, 0)
    }

    getUniqueRecipes() {
        const recipes = new Set()
        Object.values(this.mealPlanData).forEach(meals => {
            meals.forEach(meal => recipes.add(meal.recipe_id))
        })
        return recipes.size
    }

    getSharedIngredients() {
        // This would calculate ingredients used across multiple recipes
        return 23
    }

    getEstimatedCost() {
        // This would calculate based on ingredient costs
        return '156.75'
    }
}
