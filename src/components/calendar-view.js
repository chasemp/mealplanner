// Calendar component for meal planning with drag-and-drop functionality
export class CalendarView {
  constructor(database) {
    this.db = database
    this.currentDate = new Date()
    this.selectedMealType = 'dinner' // breakfast, lunch, dinner
    this.scheduledMeals = new Map() // date-mealType -> recipe
    this.recipes = []
    this.draggedRecipe = null
    
    this.monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }

  async initialize() {
    try {
      await this.loadRecipes()
      await this.loadScheduledMeals()
      this.render()
      this.setupEventListeners()
      console.log('Calendar view initialized successfully')
    } catch (error) {
      console.error('Failed to initialize calendar view:', error)
    }
  }

  async loadRecipes() {
    try {
      const result = this.db.exec(`
        SELECT r.*, COUNT(ri.ingredient_id) as ingredient_count
        FROM recipes r
        LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
        GROUP BY r.id
        ORDER BY r.name ASC
      `)
      
      if (result.length > 0) {
        this.recipes = result[0].values.map(row => ({
          id: row[0],
          name: row[1],
          description: row[2],
          instructions: row[3],
          prep_time: row[4],
          cook_time: row[5],
          servings: row[6],
          image_url: row[7],
          created_at: row[8],
          updated_at: row[9],
          ingredient_count: row[10] || 0
        }))
      }
    } catch (error) {
      console.error('Failed to load recipes:', error)
      this.recipes = []
    }
  }

  async loadScheduledMeals() {
    try {
      const result = this.db.exec(`
        SELECT sm.*, r.name as recipe_name, r.description, r.servings, r.prep_time
        FROM scheduled_meals sm
        JOIN recipes r ON sm.recipe_id = r.id
        WHERE sm.scheduled_date >= date('now', '-7 days')
        AND sm.scheduled_date <= date('now', '+30 days')
        ORDER BY sm.scheduled_date ASC
      `)
      
      this.scheduledMeals.clear()
      if (result.length > 0) {
        result[0].values.forEach(row => {
          const key = `${row[2]}-${row[3]}` // date-mealType
          this.scheduledMeals.set(key, {
            id: row[0],
            recipe_id: row[1],
            scheduled_date: row[2],
            meal_type: row[3],
            servings: row[4],
            notes: row[5],
            recipe_name: row[6],
            description: row[7],
            recipe_servings: row[8],
            prep_time: row[9]
          })
        })
      }
    } catch (error) {
      console.error('Failed to load scheduled meals:', error)
    }
  }

  render() {
    // Find the calendar container (could have different IDs for different meal types)
    let container = document.getElementById('calendar-container')
    if (!container) {
      // Try meal-specific containers
      const mealType = this.selectedMealType
      container = document.getElementById(`calendar-container-${mealType}`)
    }
    
    if (!container) {
      console.error('Calendar container not found')
      return
    }

    container.innerHTML = `
      <div class="calendar-view bg-white rounded-lg shadow-lg">
        <!-- Calendar Header -->
        <div class="calendar-header bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <button id="prev-month" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h2 id="current-month" class="text-2xl font-bold">
                ${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}
              </h2>
              <button id="next-month" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <div class="flex items-center space-x-4">
              <button id="today-btn" class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                Today
              </button>
              <select id="meal-type-filter" class="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white">
                <option value="all">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner" selected>Dinner</option>
              </select>
            </div>
          </div>
          
          <!-- Meal Type Tabs -->
          <div class="flex space-x-1 bg-white/10 rounded-lg p-1">
            <button class="meal-type-tab px-4 py-2 rounded-md transition-colors ${this.selectedMealType === 'breakfast' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/20'}" data-meal-type="breakfast">
              🌅 Breakfast
            </button>
            <button class="meal-type-tab px-4 py-2 rounded-md transition-colors ${this.selectedMealType === 'lunch' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/20'}" data-meal-type="lunch">
              ☀️ Lunch
            </button>
            <button class="meal-type-tab px-4 py-2 rounded-md transition-colors ${this.selectedMealType === 'dinner' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/20'}" data-meal-type="dinner">
              🌙 Dinner
            </button>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="calendar-grid">
          <!-- Day Headers -->
          <div class="day-headers grid grid-cols-7 bg-gray-50 border-b">
            ${this.dayNames.map(day => `
              <div class="day-header p-3 text-center font-semibold text-gray-700 border-r last:border-r-0">
                ${day}
              </div>
            `).join('')}
          </div>
          
          <!-- Calendar Days -->
          <div id="calendar-days" class="grid grid-cols-7 min-h-[600px]">
            ${this.renderCalendarDays()}
          </div>
        </div>

        <!-- Recipe Sidebar -->
        <div class="recipe-sidebar fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform translate-x-full transition-transform z-50" id="recipe-sidebar">
          <div class="p-4 border-b bg-gray-50">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Available Recipes</h3>
              <button id="close-sidebar" class="p-2 hover:bg-gray-200 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="mt-2">
              <input type="text" id="recipe-search" placeholder="Search recipes..." 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
          
          <div id="recipe-list" class="flex-1 overflow-y-auto p-4">
            ${this.renderRecipeList()}
          </div>
        </div>

        <!-- Overlay -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 hidden z-40"></div>
      </div>
    `
  }

  renderCalendarDays() {
    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    // Get previous month's last days
    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()
    
    let daysHTML = ''
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const date = new Date(year, month - 1, day)
      daysHTML += this.renderCalendarDay(date, true)
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      daysHTML += this.renderCalendarDay(date, false)
    }
    
    // Next month's leading days
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (startingDayOfWeek + daysInMonth)
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day)
      daysHTML += this.renderCalendarDay(date, true)
    }
    
    return daysHTML
  }

  renderCalendarDay(date, isOtherMonth) {
    const dateStr = this.formatDate(date)
    const isToday = this.isToday(date)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    
    // Get scheduled meal for this date and meal type
    const mealKey = `${dateStr}-${this.selectedMealType}`
    const scheduledMeal = this.scheduledMeals.get(mealKey)
    
    return `
      <div class="calendar-day border-r border-b last:border-r-0 min-h-[120px] p-2 
                  ${isOtherMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'} 
                  ${isToday ? 'bg-blue-50 border-blue-200' : ''}
                  ${isWeekend && !isOtherMonth ? 'bg-gray-25' : ''}
                  hover:bg-gray-50 transition-colors cursor-pointer"
           data-date="${dateStr}"
           ondrop="window.calendarView?.handleDrop(event)"
           ondragover="window.calendarView?.handleDragOver(event)"
           ondragenter="window.calendarView?.handleDragEnter(event)"
           ondragleave="window.calendarView?.handleDragLeave(event)">
        
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium ${isToday ? 'text-blue-600' : ''}">${date.getDate()}</span>
          ${!isOtherMonth ? `
            <button class="add-meal-btn opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all text-gray-500 hover:text-gray-700" 
                    data-date="${dateStr}" title="Add meal">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          ` : ''}
        </div>
        
        ${scheduledMeal ? `
          <div class="scheduled-meal bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-lg p-2 text-xs">
            <div class="font-medium text-green-800 truncate" title="${scheduledMeal.recipe_name}">
              ${scheduledMeal.recipe_name}
            </div>
            <div class="text-green-600 mt-1">
              ${scheduledMeal.servings} servings
              ${scheduledMeal.prep_time ? `• ${scheduledMeal.prep_time}min` : ''}
            </div>
            <div class="flex justify-end mt-1">
              <button class="remove-meal-btn p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700" 
                      data-date="${dateStr}" data-meal-type="${this.selectedMealType}" title="Remove meal">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        ` : `
          <div class="drop-zone h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
            Drop recipe here
          </div>
        `}
      </div>
    `
  }

  renderRecipeList() {
    if (this.recipes.length === 0) {
      return `
        <div class="text-center text-gray-500 py-8">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p>No recipes available</p>
          <p class="text-sm mt-1">Add some recipes to start meal planning!</p>
        </div>
      `
    }

    return this.recipes.map(recipe => `
      <div class="recipe-item bg-white border border-gray-200 rounded-lg p-3 mb-3 cursor-move hover:shadow-md transition-shadow"
           draggable="true"
           data-recipe-id="${recipe.id}"
           ondragstart="window.calendarView?.handleRecipeDragStart(event)">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            ${recipe.name.charAt(0).toUpperCase()}
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-gray-900 truncate">${recipe.name}</h4>
            <p class="text-sm text-gray-600 line-clamp-2 mt-1">${recipe.description || 'No description'}</p>
            <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>🍽️ ${recipe.servings} servings</span>
              ${recipe.prep_time ? `<span>⏱️ ${recipe.prep_time}min</span>` : ''}
              <span>📋 ${recipe.ingredient_count} ingredients</span>
            </div>
          </div>
        </div>
      </div>
    `).join('')
  }

  setupEventListeners() {
    // Month navigation
    document.getElementById('prev-month')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1)
      this.render()
    })

    document.getElementById('next-month')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1)
      this.render()
    })

    document.getElementById('today-btn')?.addEventListener('click', () => {
      this.currentDate = new Date()
      this.render()
    })

    // Meal type tabs
    document.querySelectorAll('.meal-type-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.selectedMealType = e.target.dataset.mealType
        this.render()
      })
    })

    // Sidebar controls
    document.getElementById('close-sidebar')?.addEventListener('click', () => {
      this.closeSidebar()
    })

    document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
      this.closeSidebar()
    })

    // Recipe search
    document.getElementById('recipe-search')?.addEventListener('input', (e) => {
      this.filterRecipes(e.target.value)
    })

    // Add meal buttons
    document.querySelectorAll('.add-meal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        this.openSidebar()
      })
    })

    // Remove meal buttons
    document.querySelectorAll('.remove-meal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const date = e.target.closest('[data-date]').dataset.date
        const mealType = e.target.dataset.mealType
        this.removeMeal(date, mealType)
      })
    })

    // Calendar day clicks
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', (e) => {
        if (!e.target.closest('.add-meal-btn, .remove-meal-btn')) {
          this.openSidebar()
        }
      })
    })

    // Make this instance globally available for drag/drop handlers
    window.calendarView = this
  }

  // Drag and Drop Handlers
  handleRecipeDragStart(event) {
    const recipeId = parseInt(event.target.dataset.recipeId)
    this.draggedRecipe = this.recipes.find(r => r.id === recipeId)
    event.dataTransfer.setData('text/plain', recipeId)
    event.target.style.opacity = '0.5'
  }

  handleDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  handleDragEnter(event) {
    event.preventDefault()
    const dayElement = event.currentTarget
    dayElement.classList.add('drag-over')
  }

  handleDragLeave(event) {
    const dayElement = event.currentTarget
    if (!dayElement.contains(event.relatedTarget)) {
      dayElement.classList.remove('drag-over')
    }
  }

  async handleDrop(event) {
    event.preventDefault()
    const dayElement = event.currentTarget
    dayElement.classList.remove('drag-over')
    
    const date = dayElement.dataset.date
    const recipeId = event.dataTransfer.getData('text/plain')
    
    if (this.draggedRecipe && date) {
      await this.scheduleMeal(date, this.selectedMealType, this.draggedRecipe)
      this.draggedRecipe = null
    }
  }

  // Meal Management
  async scheduleMeal(date, mealType, recipe) {
    try {
      // Check if meal already exists for this date/type
      const existingKey = `${date}-${mealType}`
      if (this.scheduledMeals.has(existingKey)) {
        const confirmed = confirm(`A ${mealType} is already scheduled for ${date}. Replace it?`)
        if (!confirmed) return
        
        // Remove existing meal
        await this.removeMeal(date, mealType, false)
      }

      // Insert new scheduled meal
      this.db.exec(`
        INSERT INTO scheduled_meals (recipe_id, scheduled_date, meal_type, servings, notes)
        VALUES (?, ?, ?, ?, ?)
      `, [recipe.id, date, mealType, recipe.servings, ''])

      // Reload and re-render
      await this.loadScheduledMeals()
      this.render()
      
      // Show success notification
      if (window.app?.showNotification) {
        window.app.showNotification(`${recipe.name} scheduled for ${mealType} on ${date}`, 'success')
      }
      
    } catch (error) {
      console.error('Failed to schedule meal:', error)
      if (window.app?.showNotification) {
        window.app.showNotification('Failed to schedule meal', 'error')
      }
    }
  }

  async removeMeal(date, mealType, showConfirmation = true) {
    try {
      const mealKey = `${date}-${mealType}`
      const scheduledMeal = this.scheduledMeals.get(mealKey)
      
      if (!scheduledMeal) return

      if (showConfirmation) {
        const confirmed = confirm(`Remove ${scheduledMeal.recipe_name} from ${mealType} on ${date}?`)
        if (!confirmed) return
      }

      // Delete from database
      this.db.exec('DELETE FROM scheduled_meals WHERE id = ?', [scheduledMeal.id])

      // Reload and re-render
      await this.loadScheduledMeals()
      this.render()
      
      if (window.app?.showNotification) {
        window.app.showNotification('Meal removed successfully', 'success')
      }
      
    } catch (error) {
      console.error('Failed to remove meal:', error)
      if (window.app?.showNotification) {
        window.app.showNotification('Failed to remove meal', 'error')
      }
    }
  }

  // Sidebar Management
  openSidebar() {
    const sidebar = document.getElementById('recipe-sidebar')
    const overlay = document.getElementById('sidebar-overlay')
    
    if (sidebar && overlay) {
      sidebar.classList.remove('translate-x-full')
      overlay.classList.remove('hidden')
      document.body.style.overflow = 'hidden'
    }
  }

  closeSidebar() {
    const sidebar = document.getElementById('recipe-sidebar')
    const overlay = document.getElementById('sidebar-overlay')
    
    if (sidebar && overlay) {
      sidebar.classList.add('translate-x-full')
      overlay.classList.add('hidden')
      document.body.style.overflow = ''
    }
  }

  filterRecipes(searchTerm) {
    const recipeItems = document.querySelectorAll('.recipe-item')
    const term = searchTerm.toLowerCase()
    
    recipeItems.forEach(item => {
      const recipeName = item.querySelector('h4').textContent.toLowerCase()
      const recipeDesc = item.querySelector('p').textContent.toLowerCase()
      
      if (recipeName.includes(term) || recipeDesc.includes(term)) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
  }

  // Utility Methods
  formatDate(date) {
    return date.toISOString().split('T')[0]
  }

  isToday(date) {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Public API for external access
  async refresh() {
    await this.loadRecipes()
    await this.loadScheduledMeals()
    this.render()
  }

  setMealType(mealType) {
    this.selectedMealType = mealType
    this.render()
  }

  goToDate(date) {
    this.currentDate = new Date(date)
    this.render()
  }
}