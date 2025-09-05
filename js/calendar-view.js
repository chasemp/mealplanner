// Calendar View Component for Meal Planning
class CalendarView {
    constructor(container, mealType = 'dinner', mealPlanData = {}) {
        this.container = container;
        this.mealType = mealType;
        this.mealPlanData = mealPlanData;
        this.currentDate = new Date();
        this.viewDate = new Date(); // Date being viewed in calendar
        this.scheduledMeals = this.getMockScheduledMeals();
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
                    <div class="min-h-[100px] border-r border-b ${cellClass} p-2 cursor-pointer" 
                         data-date="${this.formatDateKey(cellDate)}"
                         onclick="window.calendarViews['${this.mealType}'].selectDate('${this.formatDateKey(cellDate)}')">
                        <div class="text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} mb-1">
                            ${cellDay}
                        </div>
                        <div class="space-y-1">
                            ${mealDisplay}
                        </div>
                    </div>
                `;
            }
        }
        
        return daysHtml;
    }

    renderDayMeals(meals) {
        return meals.map(meal => `
            <div class="text-xs bg-blue-500 text-white px-2 py-1 rounded truncate" 
                 title="${meal.name}">
                ${meal.name}
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
            meal.mealType === this.mealType
        );
    }

    getAllScheduledMeals() {
        const year = this.viewDate.getFullYear();
        const month = this.viewDate.getMonth();
        
        return this.scheduledMeals.filter(meal => {
            const mealDate = new Date(meal.date);
            return mealDate.getFullYear() === year && 
                   mealDate.getMonth() === month &&
                   meal.mealType === this.mealType;
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
        return date.toISOString().split('T')[0];
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
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
    }
}

// Global registry for calendar views
window.calendarViews = window.calendarViews || {};
