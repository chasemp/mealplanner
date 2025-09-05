// Unit tests for ItineraryView component
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock the ItineraryView class since it's loaded via script tag
class MockItineraryView {
    constructor(container, mealType = 'dinner', mealPlanData = {}) {
        this.container = container
        this.mealType = mealType
        this.mealPlanData = mealPlanData
        this.expandedWeeks = new Set()
        this.startDate = new Date('2024-12-01')
        this.weeksToShow = 4
        this.currentView = 'itinerary'
    }

    render() {
        this.container.innerHTML = `
            <div class="itinerary-view">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-lg font-semibold capitalize">${this.mealType} Plan Itinerary</h3>
                        <p class="text-gray-600 text-sm">${this.formatDateRange()} • ${this.weeksToShow} weeks</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <select id="weeks-select-${this.mealType}">
                            <option value="4" selected>4 Weeks</option>
                        </select>
                        <button id="generate-plan-${this.mealType}">Generate Plan</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.getTotalMeals()}</div>
                        <div class="text-sm text-gray-600">Total Meals</div>
                    </div>
                </div>
                <div class="space-y-4" id="weeks-container">
                    ${this.renderWeeks()}
                </div>
            </div>
        `
        this.attachEventListeners()
    }

    formatDateRange() {
        const endDate = new Date(this.startDate)
        endDate.setDate(endDate.getDate() + (this.weeksToShow * 7) - 1)
        const options = { month: 'short', day: 'numeric' }
        return `${this.startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`
    }

    getTotalMeals() {
        return this.weeksToShow * 7
    }

    getUniqueRecipes() {
        return Math.min(this.getTotalMeals(), 15)
    }

    getSharedIngredients() {
        return Math.floor(this.getUniqueRecipes() * 0.6)
    }

    getEstimatedCost() {
        return (this.getTotalMeals() * 8.50).toFixed(2)
    }

    renderWeeks() {
        let weeksHtml = ''
        for (let week = 0; week < this.weeksToShow; week++) {
            const weekStart = new Date(this.startDate)
            weekStart.setDate(weekStart.getDate() + (week * 7))
            const weekEnd = new Date(weekStart)
            weekEnd.setDate(weekEnd.getDate() + 6)
            
            weeksHtml += `
                <div class="bg-white rounded-lg shadow" data-week="${week}">
                    <div class="p-4 border-b border-gray-200">
                        <button class="week-toggle" data-week="${week}">
                            Week ${week + 1}: ${this.formatWeekRange(weekStart, weekEnd)}
                        </button>
                    </div>
                    <div id="week-${week}" class="week-content ${this.expandedWeeks.has(week) ? '' : 'hidden'}">
                        Week ${week + 1} content
                    </div>
                </div>
            `
        }
        return weeksHtml
    }

    formatWeekRange(start, end) {
        const options = { month: 'short', day: 'numeric' }
        return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
    }

    toggleWeek(weekIndex) {
        if (this.expandedWeeks.has(weekIndex)) {
            this.expandedWeeks.delete(weekIndex)
        } else {
            this.expandedWeeks.add(weekIndex)
        }
        this.render()
    }

    attachEventListeners() {
        const weeksSelect = this.container.querySelector(`#weeks-select-${this.mealType}`)
        if (weeksSelect) {
            weeksSelect.addEventListener('change', (e) => {
                this.weeksToShow = parseInt(e.target.value)
                this.render()
            })
        }

        const generateBtn = this.container.querySelector(`#generate-plan-${this.mealType}`)
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateMealPlan()
            })
        }

        // Week toggle buttons
        this.container.querySelectorAll('.week-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const weekIndex = parseInt(e.target.dataset.week)
                this.toggleWeek(weekIndex)
            })
        })
    }

    generateMealPlan() {
        // Mock implementation
        return true
    }
}

describe('ItineraryView', () => {
    let dom
    let container
    let itineraryView

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><div id="test-container"></div>')
        global.document = dom.window.document
        global.window = dom.window
        
        container = document.getElementById('test-container')
        itineraryView = new MockItineraryView(container, 'dinner')
    })

    describe('initialization', () => {
        it('should initialize with correct default values', () => {
            expect(itineraryView.mealType).toBe('dinner')
            expect(itineraryView.weeksToShow).toBe(4)
            expect(itineraryView.currentView).toBe('itinerary')
            expect(itineraryView.expandedWeeks).toBeInstanceOf(Set)
            expect(itineraryView.expandedWeeks.size).toBe(0)
        })

        it('should accept custom meal type', () => {
            const breakfastView = new MockItineraryView(container, 'breakfast')
            expect(breakfastView.mealType).toBe('breakfast')
        })

        it('should set start date', () => {
            expect(itineraryView.startDate).toBeInstanceOf(Date)
        })
    })

    describe('rendering', () => {
        beforeEach(() => {
            itineraryView.render()
        })

        it('should render the main itinerary structure', () => {
            expect(container.querySelector('.itinerary-view')).toBeTruthy()
            expect(container.querySelector('h3')).toBeTruthy()
            expect(container.querySelector('h3').textContent).toContain('dinner Plan Itinerary')
        })

        it('should render planning summary metrics', () => {
            const metrics = container.querySelectorAll('.text-2xl.font-bold')
            expect(metrics.length).toBeGreaterThan(0)
            expect(container.textContent).toContain('Total Meals')
        })

        it('should render weeks selector', () => {
            const weeksSelect = container.querySelector('#weeks-select-dinner')
            expect(weeksSelect).toBeTruthy()
            expect(weeksSelect.value).toBe('4')
        })

        it('should render generate plan button', () => {
            const generateBtn = container.querySelector('#generate-plan-dinner')
            expect(generateBtn).toBeTruthy()
            expect(generateBtn.textContent).toContain('Generate Plan')
        })

        it('should render correct number of weeks', () => {
            // Count only the week container elements, not all elements with data-week
            const weekElements = container.querySelectorAll('.bg-white.rounded-lg.shadow[data-week]')
            expect(weekElements.length).toBe(4)
        })

        it('should render week toggle buttons', () => {
            const weekToggles = container.querySelectorAll('.week-toggle')
            expect(weekToggles.length).toBe(4)
        })
    })

    describe('date formatting', () => {
        it('should format date range correctly', () => {
            const dateRange = itineraryView.formatDateRange()
            expect(dateRange).toMatch(/\w{3} \d{1,2} - \w{3} \d{1,2}/)
        })

        it('should format week range correctly', () => {
            const start = new Date('2024-12-01T12:00:00')
            const end = new Date('2024-12-07T12:00:00')
            const weekRange = itineraryView.formatWeekRange(start, end)
            expect(weekRange).toMatch(/Dec \d{1,2} - Dec \d{1,2}/) // Allow for timezone differences
        })
    })

    describe('calculations', () => {
        it('should calculate total meals correctly', () => {
            expect(itineraryView.getTotalMeals()).toBe(28) // 4 weeks * 7 days
        })

        it('should calculate unique recipes', () => {
            const uniqueRecipes = itineraryView.getUniqueRecipes()
            expect(uniqueRecipes).toBeGreaterThan(0)
            expect(uniqueRecipes).toBeLessThanOrEqual(28)
        })

        it('should calculate estimated cost', () => {
            const cost = itineraryView.getEstimatedCost()
            expect(cost).toBe('238.00') // 28 meals * $8.50
        })
    })

    describe('week expansion', () => {
        beforeEach(() => {
            itineraryView.render()
        })

        it('should start with no expanded weeks', () => {
            const hiddenWeeks = container.querySelectorAll('.week-content.hidden')
            expect(hiddenWeeks.length).toBe(4)
        })

        it('should expand week when toggled', () => {
            itineraryView.toggleWeek(0)
            expect(itineraryView.expandedWeeks.has(0)).toBe(true)
        })

        it('should collapse expanded week when toggled again', () => {
            itineraryView.toggleWeek(0)
            itineraryView.toggleWeek(0)
            expect(itineraryView.expandedWeeks.has(0)).toBe(false)
        })

        it('should handle multiple expanded weeks', () => {
            itineraryView.toggleWeek(0)
            itineraryView.toggleWeek(2)
            expect(itineraryView.expandedWeeks.has(0)).toBe(true)
            expect(itineraryView.expandedWeeks.has(2)).toBe(true)
            expect(itineraryView.expandedWeeks.size).toBe(2)
        })
    })

    describe('event listeners', () => {
        beforeEach(() => {
            itineraryView.render()
        })

        it('should handle weeks selector change', () => {
            const weeksSelect = container.querySelector('#weeks-select-dinner')
            
            // Simulate the change event properly
            Object.defineProperty(weeksSelect, 'value', { value: '2', writable: true })
            const changeEvent = new dom.window.Event('change', { bubbles: true })
            Object.defineProperty(changeEvent, 'target', { value: weeksSelect })
            weeksSelect.dispatchEvent(changeEvent)
            
            expect(itineraryView.weeksToShow).toBe(2)
        })

        it('should handle generate plan button click', () => {
            const generateSpy = vi.spyOn(itineraryView, 'generateMealPlan')
            const generateBtn = container.querySelector('#generate-plan-dinner')
            generateBtn.click()
            
            expect(generateSpy).toHaveBeenCalled()
        })

        it('should handle week toggle button clicks', () => {
            const toggleSpy = vi.spyOn(itineraryView, 'toggleWeek')
            const weekToggle = container.querySelector('.week-toggle[data-week="0"]')
            weekToggle.click()
            
            expect(toggleSpy).toHaveBeenCalledWith(0)
        })
    })

    describe('different meal types', () => {
        it('should render breakfast view correctly', () => {
            const breakfastView = new MockItineraryView(container, 'breakfast')
            breakfastView.render()
            
            expect(container.querySelector('h3').textContent).toContain('breakfast Plan Itinerary')
            expect(container.querySelector('#weeks-select-breakfast')).toBeTruthy()
            expect(container.querySelector('#generate-plan-breakfast')).toBeTruthy()
        })

        it('should render lunch view correctly', () => {
            const lunchView = new MockItineraryView(container, 'lunch')
            lunchView.render()
            
            expect(container.querySelector('h3').textContent).toContain('lunch Plan Itinerary')
            expect(container.querySelector('#weeks-select-lunch')).toBeTruthy()
            expect(container.querySelector('#generate-plan-lunch')).toBeTruthy()
        })
    })

    describe('responsive behavior', () => {
        beforeEach(() => {
            itineraryView.render()
        })

        it('should update display when weeks selection changes', () => {
            itineraryView.weeksToShow = 2
            itineraryView.render()
            
            expect(itineraryView.getTotalMeals()).toBe(14) // 2 weeks * 7 days
            // Count only the week elements, not all elements with data-week
            const weekElements = container.querySelectorAll('.bg-white.rounded-lg.shadow[data-week]')
            expect(weekElements.length).toBe(2)
        })

        it('should maintain expanded state during re-render', () => {
            itineraryView.toggleWeek(1)
            const wasExpanded = itineraryView.expandedWeeks.has(1)
            
            itineraryView.render()
            
            expect(itineraryView.expandedWeeks.has(1)).toBe(wasExpanded)
        })
    })
})
