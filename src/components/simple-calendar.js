// Simple calendar component that actually works
export class SimpleCalendar {
  constructor(containerId, mealType = 'dinner') {
    this.containerId = containerId
    this.mealType = mealType
    this.currentDate = new Date()
    this.monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }

  render() {
    const container = document.getElementById(this.containerId)
    if (!container) {
      console.error(`Container ${this.containerId} not found`)
      return
    }

    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    
    container.innerHTML = `
      <div class="simple-calendar bg-white rounded-lg shadow-lg p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button id="prev-month-${this.mealType}" class="p-2 hover:bg-gray-100 rounded-lg">
            ← Previous
          </button>
          <h2 class="text-xl font-bold text-gray-900">
            ${this.monthNames[month]} ${year} - ${this.mealType.charAt(0).toUpperCase() + this.mealType.slice(1)}
          </h2>
          <button id="next-month-${this.mealType}" class="p-2 hover:bg-gray-100 rounded-lg">
            Next →
          </button>
        </div>

        <!-- Day Headers -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          ${this.dayNames.map(day => `
            <div class="p-2 text-center font-medium text-gray-600 text-sm">
              ${day}
            </div>
          `).join('')}
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          ${this.renderDays()}
        </div>

        <!-- Status -->
        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-700">
            ✅ Calendar loaded successfully! 
            Click on any date to schedule a ${this.mealType} meal.
          </p>
        </div>
      </div>
    `

    this.setupEventListeners()
    console.log(`Simple calendar rendered for ${this.mealType}`)
  }

  renderDays() {
    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    let daysHTML = ''
    
    // Previous month's trailing days
    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      daysHTML += `
        <div class="p-2 text-center text-gray-400 hover:bg-gray-50 rounded cursor-pointer">
          ${day}
        </div>
      `
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = this.isToday(date)
      const dateStr = this.formatDate(date)
      
      daysHTML += `
        <div class="calendar-day p-2 text-center hover:bg-blue-50 rounded cursor-pointer border-2 border-transparent
                    ${isToday ? 'bg-blue-100 border-blue-300 font-bold' : 'hover:border-blue-200'}"
             data-date="${dateStr}">
          <div class="text-sm">${day}</div>
          <div class="text-xs text-gray-500 mt-1">
            Click to add ${this.mealType}
          </div>
        </div>
      `
    }
    
    // Next month's leading days
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (startingDayOfWeek + daysInMonth)
    
    for (let day = 1; day <= remainingCells; day++) {
      daysHTML += `
        <div class="p-2 text-center text-gray-400 hover:bg-gray-50 rounded cursor-pointer">
          ${day}
        </div>
      `
    }
    
    return daysHTML
  }

  setupEventListeners() {
    // Month navigation
    document.getElementById(`prev-month-${this.mealType}`)?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1)
      this.render()
    })

    document.getElementById(`next-month-${this.mealType}`)?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1)
      this.render()
    })

    // Day clicks
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', (e) => {
        const date = e.currentTarget.dataset.date
        if (date) {
          alert(`Schedule ${this.mealType} meal for ${date}`)
          console.log(`Clicked date: ${date} for ${this.mealType}`)
        }
      })
    })
  }

  formatDate(date) {
    return date.toISOString().split('T')[0]
  }

  isToday(date) {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
}
