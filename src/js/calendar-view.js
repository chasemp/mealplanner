// Calendar View Component for Meal Planning
class CalendarView {
    constructor(container, mealType = 'dinner', mealPlanData = {}) {
        this.container = container;
        this.mealType = mealType;
        this.mealPlanData = mealPlanData;
        this.currentDate = new Date();
        this.viewDate = new Date(); // Date being viewed in calendar
        this.scheduledMeals = [];
        this.loadScheduledMeals();
    }
    
    loadScheduledMeals() {
        try {
            // PLAN VS MENU ARCHITECTURE: Plan tab shows prospective schedule, other tabs show committed schedule
            let allMeals = [];
            if (this.mealType === 'plan') {
                // Plan tab shows prospective schedule from planScheduledMeals
                allMeals = window.mealPlannerSettings?.getAuthoritativeData('planScheduledMeals') || [];
                console.log(`📅 Calendar view loading ${allMeals.length} meals from PLAN storage (prospective schedule)`);
            } else {
                // Other meal type tabs show committed schedule from menuScheduledMeals
                allMeals = window.mealPlannerSettings?.getAuthoritativeData('menuScheduledMeals') || [];
                console.log(`📅 Calendar view loading ${allMeals.length} meals from MENU storage (committed schedule)`);
            }
            
            if (this.mealType === 'plan') {
                // For plan tab, show all scheduled meals regardless of type
                this.scheduledMeals = allMeals;
            } else {
                // For specific meal types, filter by type
                this.scheduledMeals = allMeals.filter(meal => meal.meal_type === this.mealType);
            }
            
            console.log(`📅 Calendar view loaded ${this.scheduledMeals.length} ${this.mealType === 'plan' ? 'total' : this.mealType} meals:`, this.scheduledMeals);
        } catch (error) {
            console.error('Error loading scheduled meals for calendar view:', error);
            this.scheduledMeals = [];
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="calendar-view">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-lg font-semibold capitalize">${this.mealType} Plan Calendar</h3>
                        <p class="text-gray-600 text-sm">
                            ${this.formatMonthYear()} • Calendar View
                        </p>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                        <button id="prev-month-${this.mealType}" class="text-gray-600 hover:text-gray-800 px-2 py-1">
                            ← Previous
                        </button>
                        <button id="today-${this.mealType}" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
                            Today
                        </button>
                        <button id="next-month-${this.mealType}" class="text-gray-600 hover:text-gray-800 px-2 py-1">
                            Next →
                        </button>
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <!-- Calendar Header -->
                    <div class="grid grid-cols-7 bg-gray-50 border-b">
                        <div class="p-3 text-center text-sm font-medium text-gray-700">Sun</div>
                        <div class="p-3 text-center text-sm font-medium text-gray-700">Mon</div>
                        <div class="p-3 text-center text-sm font-medium text-gray-700">Tue</div>
                        <div class="p-3 text-center text-sm font-medium text-gray-700">Wed</div>
                        <div class="p-3 text-center text-sm font-medium text-gray-700">Thu</div>
                        <div class="p-3 text-center text-sm font-medium text-gray-700">Fri</div>
                        <div class="p-3 text-center text-sm font-medium text-gray-700">Sat</div>
                    </div>
                    
                    <!-- Calendar Body -->
                    <div class="grid grid-cols-7">
                        ${this.renderCalendarDays()}
                    </div>
                </div>

                <!-- Meal Legend -->
                <div class="mt-6 bg-white rounded-lg shadow p-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Scheduled Meals</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        ${this.renderMealLegend()}
                    </div>
                </div>
            </div>
        `;
        
        this.attachEventListeners();
    }

    formatMonthYear() {
        return this.viewDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    }

    renderCalendarDays() {
        const year = this.viewDate.getFullYear();
        const month = this.viewDate.getMonth();
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Get previous month's last few days
        const prevMonth = new Date(year, month - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        let daysHtml = '';
        let dayCount = 1;
        let nextMonthDay = 1;
        
        // Generate 6 weeks (42 days) to fill the calendar grid
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const cellIndex = week * 7 + day;
                let cellDate, cellDay, isCurrentMonth, isToday, cellClass;
                
                if (cellIndex < startingDayOfWeek) {
                    // Previous month days
                    cellDay = daysInPrevMonth - startingDayOfWeek + cellIndex + 1;
                    cellDate = new Date(year, month - 1, cellDay);
                    isCurrentMonth = false;
                    cellClass = 'text-gray-400 bg-gray-50';
                } else if (dayCount <= daysInMonth) {
                    // Current month days
                    cellDay = dayCount;
                    cellDate = new Date(year, month, cellDay);
                    isCurrentMonth = true;
                    isToday = this.isToday(cellDate);
                    cellClass = isToday ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-50';
                    dayCount++;
                } else {
                    // Next month days
                    cellDay = nextMonthDay;
                    cellDate = new Date(year, month + 1, cellDay);
                    isCurrentMonth = false;
                    cellClass = 'text-gray-400 bg-gray-50';
                    nextMonthDay++;
                }
                
                // Get meals for this date
                const mealsForDate = this.getMealsForDate(cellDate);
                const mealDisplay = mealsForDate.length > 0 ? this.renderDayMeals(mealsForDate) : '';
                
                daysHtml += `
                    <div class="calendar-day min-h-[100px] border-r border-b ${cellClass} p-2 cursor-pointer transition-colors" 
                         data-date="${this.formatDateKey(cellDate)}"
                         data-meal-type="${this.mealType}"
                         onclick="window.calendarViews['${this.mealType}'].selectDate('${this.formatDateKey(cellDate)}')"
                         ondragover="event.preventDefault(); this.classList.add('drag-over')"
                         ondragleave="this.classList.remove('drag-over')"
                         ondrop="window.calendarViews['${this.mealType}'].handleDrop(event, '${this.formatDateKey(cellDate)}')">
                        <div class="text-sm ${isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'} mb-1">
                            ${cellDay}
                        </div>
                        <div class="meal-container space-y-1">
                            ${mealDisplay}
                        </div>
                        <div class="drop-indicator hidden absolute inset-0 bg-blue-200 dark:bg-blue-800 bg-opacity-50 border-2 border-dashed border-blue-400 rounded flex items-center justify-center">
                            <span class="text-blue-600 dark:text-blue-300 font-medium">Drop meal here</span>
                        </div>
                    </div>
                `;
            }
        }
        
        return daysHtml;
    }

    renderDayMeals(meals) {
        return meals.map(meal => `
            <div class="meal-item text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded truncate cursor-move transition-colors" 
                 title="${meal.name}"
                 draggable="true"
                 data-meal-id="${meal.id}"
                 data-meal-name="${meal.name}"
                 data-meal-type="${meal.mealType}"
                 data-original-date="${this.formatDateKey(meal.date)}">
                <span class="drag-handle">⋮⋮</span>
                <span class="meal-name">${meal.name}</span>
            </div>
        `).join('');
    }

    renderMealLegend() {
        const allMeals = this.getAllScheduledMeals();
        if (allMeals.length === 0) {
            return '<div class="text-gray-500 col-span-3">No meals scheduled this month</div>';
        }
        
        return allMeals.map(meal => `
            <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-blue-500 rounded"></div>
                <span class="text-gray-700">${meal.name}</span>
                <span class="text-gray-500">(${this.formatDate(meal.date)})</span>
            </div>
        `).join('');
    }

    getMealsForDate(date) {
        const dateKey = this.formatDateKey(date);
        return this.scheduledMeals.filter(meal => 
            this.formatDateKey(meal.date) === dateKey && 
            meal.meal_type === this.mealType
        );
    }

    getAllScheduledMeals() {
        const year = this.viewDate.getFullYear();
        const month = this.viewDate.getMonth();
        
        return this.scheduledMeals.filter(meal => {
            const mealDate = new Date(meal.date);
            return mealDate.getFullYear() === year && 
                   mealDate.getMonth() === month &&
                   meal.meal_type === this.mealType;
        });
    }

    getMockScheduledMeals() {
        // Generate mock scheduled meals that match the itinerary view
        const meals = [];
        const today = new Date();
        const mealNames = [
            'Grilled Chicken Salad', 'Pasta Primavera', 'Beef Stir Fry', 'Salmon with Rice',
            'Vegetable Curry', 'Turkey Sandwich', 'Mushroom Risotto', 'Chicken Tacos',
            'Greek Salad', 'Pork Chops', 'Veggie Burger', 'Fish and Chips'
        ];
        
        // Generate meals for the next 4 weeks (28 days)
        for (let i = 0; i < 28; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Add meals for different meal types on different days
            if (this.mealType === 'breakfast' && i % 2 === 0) {
                meals.push({
                    id: `breakfast-${i}`,
                    name: mealNames[i % mealNames.length],
                    date: new Date(date),
                    mealType: 'breakfast'
                });
            } else if (this.mealType === 'lunch' && i % 3 === 0) {
                meals.push({
                    id: `lunch-${i}`,
                    name: mealNames[(i + 1) % mealNames.length],
                    date: new Date(date),
                    mealType: 'lunch'
                });
            } else if (this.mealType === 'dinner' && i % 2 === 1) {
                meals.push({
                    id: `dinner-${i}`,
                    name: mealNames[(i + 2) % mealNames.length],
                    date: new Date(date),
                    mealType: 'dinner'
                });
            }
        }
        
        return meals;
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    formatDateKey(date) {
        // Handle both Date objects and date strings
        if (typeof date === 'string') {
            // If it's already a string, try to parse it first
            const parsed = new Date(date);
            return parsed.toISOString().split('T')[0];
        } else if (date instanceof Date) {
            return date.toISOString().split('T')[0];
        } else {
            console.error('formatDateKey received invalid date:', date);
            return new Date().toISOString().split('T')[0]; // fallback to today
        }
    }

    formatDate(date) {
        // Handle both Date objects and date strings
        let dateObj;
        if (typeof date === 'string') {
            dateObj = new Date(date);
        } else if (date instanceof Date) {
            dateObj = date;
        } else {
            console.error('formatDate received invalid date:', date);
            dateObj = new Date(); // fallback to today
        }
        
        return dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }

    selectDate(dateKey) {
        console.log(`Selected date: ${dateKey} for ${this.mealType}`);
        // Future: Open meal planning modal for this date
    }

    previousMonth() {
        this.viewDate.setMonth(this.viewDate.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.viewDate.setMonth(this.viewDate.getMonth() + 1);
        this.render();
    }

    goToToday() {
        this.viewDate = new Date();
        this.render();
    }

    attachEventListeners() {
        // Previous month button
        const prevBtn = document.getElementById(`prev-month-${this.mealType}`);
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousMonth());
        }

        // Next month button
        const nextBtn = document.getElementById(`next-month-${this.mealType}`);
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextMonth());
        }

        // Today button
        const todayBtn = document.getElementById(`today-${this.mealType}`);
        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }

        // Drag and drop event listeners
        this.attachDragDropListeners();
    }

    attachDragDropListeners() {
        // Add drag event listeners to meal items
        this.container.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('meal-item')) {
                this.handleDragStart(e);
            }
        });

        this.container.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('meal-item')) {
                this.handleDragEnd(e);
            }
        });

        // Add drop zone styling
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const calendarDay = e.target.closest('.calendar-day');
            if (calendarDay) {
                calendarDay.classList.add('drag-over');
                const dropIndicator = calendarDay.querySelector('.drop-indicator');
                if (dropIndicator) {
                    dropIndicator.classList.remove('hidden');
                }
            }
        });

        this.container.addEventListener('dragleave', (e) => {
            const calendarDay = e.target.closest('.calendar-day');
            if (calendarDay && !calendarDay.contains(e.relatedTarget)) {
                calendarDay.classList.remove('drag-over');
                const dropIndicator = calendarDay.querySelector('.drop-indicator');
                if (dropIndicator) {
                    dropIndicator.classList.add('hidden');
                }
            }
        });
    }

    handleDragStart(e) {
        const mealItem = e.target;
        const mealData = {
            id: mealItem.dataset.mealId,
            name: mealItem.dataset.mealName,
            mealType: mealItem.dataset.mealType,
            originalDate: mealItem.dataset.originalDate
        };

        // Store meal data for the drop handler
        e.dataTransfer.setData('application/json', JSON.stringify(mealData));
        e.dataTransfer.effectAllowed = 'move';

        // Add visual feedback
        mealItem.classList.add('dragging');
        mealItem.style.opacity = '0.5';

        console.log('🎯 Drag started:', mealData);
    }

    handleDragEnd(e) {
        const mealItem = e.target;
        
        // Remove visual feedback
        mealItem.classList.remove('dragging');
        mealItem.style.opacity = '1';

        // Clean up all drag-over states
        this.container.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('drag-over');
            const dropIndicator = day.querySelector('.drop-indicator');
            if (dropIndicator) {
                dropIndicator.classList.add('hidden');
            }
        });

        console.log('🎯 Drag ended');
    }

    handleDrop(e, targetDate) {
        e.preventDefault();
        e.stopPropagation();

        const calendarDay = e.target.closest('.calendar-day');
        if (calendarDay) {
            calendarDay.classList.remove('drag-over');
            const dropIndicator = calendarDay.querySelector('.drop-indicator');
            if (dropIndicator) {
                dropIndicator.classList.add('hidden');
            }
        }

        try {
            const mealData = JSON.parse(e.dataTransfer.getData('application/json'));
            
            // Validate the drop
            if (!this.validateDrop(mealData, targetDate)) {
                return;
            }

            // Perform the move
            this.moveMeal(mealData, targetDate);
            
            console.log('🎯 Meal dropped:', mealData, 'to', targetDate);
        } catch (error) {
            console.error('Error handling drop:', error);
            this.showDropError('Failed to move meal. Please try again.');
        }
    }

    validateDrop(mealData, targetDate) {
        // Check if dropping on the same date
        if (mealData.originalDate === targetDate) {
            console.log('🎯 Dropped on same date, no action needed');
            return false;
        }

        // Check if target date already has a meal of the same type
        const targetMeals = this.getMealsForDate(new Date(targetDate));
        const conflictingMeal = targetMeals.find(meal => 
            meal.mealType === mealData.mealType && meal.id !== mealData.id
        );

        if (conflictingMeal) {
            this.showConflictDialog(mealData, conflictingMeal, targetDate);
            return false;
        }

        return true;
    }

    moveMeal(mealData, targetDate) {
        // Find and update the meal in scheduledMeals
        const mealIndex = this.scheduledMeals.findIndex(meal => meal.id === mealData.id);
        if (mealIndex !== -1) {
            this.scheduledMeals[mealIndex].date = new Date(targetDate);
            
            // Re-render the calendar to show the updated meal positions
            this.render();
            
            // Show success notification
            this.showMoveSuccess(mealData.name, targetDate);
            
            // Trigger update event for other components
            this.notifyMealMoved(mealData, targetDate);
        }
    }

    showConflictDialog(draggedMeal, existingMeal, targetDate) {
        const modal = this.createConflictModal(draggedMeal, existingMeal, targetDate);
        document.body.appendChild(modal);
    }

    createConflictModal(draggedMeal, existingMeal, targetDate) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Meal Conflict</h2>
                </div>
                <div class="px-6 py-4">
                    <p class="text-gray-700 dark:text-gray-300 mb-4">
                        There's already a ${existingMeal.mealType} meal scheduled for ${this.formatDate(new Date(targetDate))}:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded mb-4">
                        <strong class="text-gray-900 dark:text-white">${existingMeal.name}</strong>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 mb-4">
                        What would you like to do with <strong>${draggedMeal.name}</strong>?
                    </p>
                </div>
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    <button class="conflict-action px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 rounded" data-action="cancel">
                        Cancel
                    </button>
                    <button class="conflict-action px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded" data-action="swap">
                        Swap Meals
                    </button>
                    <button class="conflict-action px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded" data-action="replace">
                        Replace Existing
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelectorAll('.conflict-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleConflictResolution(action, draggedMeal, existingMeal, targetDate);
                document.body.removeChild(modal);
            });
        });

        return modal;
    }

    handleConflictResolution(action, draggedMeal, existingMeal, targetDate) {
        switch (action) {
            case 'cancel':
                console.log('🎯 Meal move cancelled');
                break;
            case 'swap':
                this.swapMeals(draggedMeal, existingMeal, targetDate);
                break;
            case 'replace':
                this.replaceMeal(draggedMeal, existingMeal, targetDate);
                break;
        }
    }

    swapMeals(draggedMeal, existingMeal, targetDate) {
        // Move dragged meal to target date
        const draggedIndex = this.scheduledMeals.findIndex(meal => meal.id === draggedMeal.id);
        const existingIndex = this.scheduledMeals.findIndex(meal => meal.id === existingMeal.id);

        if (draggedIndex !== -1 && existingIndex !== -1) {
            // Swap the dates
            const originalDate = this.scheduledMeals[draggedIndex].date;
            this.scheduledMeals[draggedIndex].date = new Date(targetDate);
            this.scheduledMeals[existingIndex].date = originalDate;

            this.render();
            this.showMoveSuccess(`Swapped ${draggedMeal.name} and ${existingMeal.name}`, targetDate);
        }
    }

    replaceMeal(draggedMeal, existingMeal, targetDate) {
        // Remove existing meal and move dragged meal
        const existingIndex = this.scheduledMeals.findIndex(meal => meal.id === existingMeal.id);
        if (existingIndex !== -1) {
            this.scheduledMeals.splice(existingIndex, 1);
        }

        this.moveMeal(draggedMeal, targetDate);
        this.showMoveSuccess(`Replaced ${existingMeal.name} with ${draggedMeal.name}`, targetDate);
    }

    showMoveSuccess(message, targetDate) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = `✅ ${message}`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    showDropError(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = `❌ ${message}`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    notifyMealMoved(mealData, targetDate) {
        // Dispatch custom event for other components to listen to
        const event = new CustomEvent('mealMoved', {
            detail: {
                mealId: mealData.id,
                mealName: mealData.name,
                mealType: mealData.mealType,
                originalDate: mealData.originalDate,
                newDate: targetDate
            }
        });
        
        document.dispatchEvent(event);
    }
}

// Global registry for calendar views
window.calendarViews = window.calendarViews || {};
