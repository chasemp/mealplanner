// Unit tests for drag and drop functionality
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock CalendarView class with drag and drop functionality
class MockCalendarView {
    constructor(container, mealType = 'dinner') {
        this.container = container
        this.mealType = mealType
        this.viewDate = new Date('2024-12-01')
        this.scheduledMeals = [
            {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                date: new Date('2024-12-05'),
                recipe: { id: 'recipe-1' }
            },
            {
                id: 'meal-2',
                name: 'Chicken Stir Fry',
                mealType: 'dinner',
                date: new Date('2024-12-10'),
                recipe: { id: 'recipe-2' }
            }
        ]
    }

    handleDragStart(e) {
        const mealItem = e.target
        
        // Handle missing DOM elements gracefully
        if (!mealItem || !mealItem.dataset) {
            console.log('🎯 Invalid drag target')
            return null
        }

        const mealData = {
            id: mealItem.dataset.mealId,
            name: mealItem.dataset.mealName,
            mealType: mealItem.dataset.mealType,
            originalDate: mealItem.dataset.originalDate
        }

        e.dataTransfer.setData('application/json', JSON.stringify(mealData))
        e.dataTransfer.effectAllowed = 'move'

        mealItem.classList.add('dragging')
        mealItem.style.opacity = '0.5'

        console.log('🎯 Drag started:', mealData)
        return mealData
    }

    handleDragEnd(e) {
        const mealItem = e.target
        
        mealItem.classList.remove('dragging')
        mealItem.style.opacity = '1'

        console.log('🎯 Drag ended')
    }

    handleDrop(e, targetDate) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const mealData = JSON.parse(e.dataTransfer.getData('application/json'))
            
            if (!this.validateDrop(mealData, targetDate)) {
                return false
            }

            this.moveMeal(mealData, targetDate)
            console.log('🎯 Meal dropped:', mealData, 'to', targetDate)
            return true
        } catch (error) {
            console.error('Error handling drop:', error)
            this.showDropError('Failed to move meal. Please try again.')
            return false
        }
    }

    validateDrop(mealData, targetDate) {
        // Handle null or undefined meal data
        if (!mealData || !mealData.originalDate) {
            console.log('🎯 Invalid meal data provided')
            return false
        }

        if (mealData.originalDate === targetDate) {
            console.log('🎯 Dropped on same date, no action needed')
            return false
        }

        try {
            const targetMeals = this.getMealsForDate(new Date(targetDate))
            const conflictingMeal = targetMeals.find(meal => 
                meal.mealType === mealData.mealType && meal.id !== mealData.id
            )

            if (conflictingMeal) {
                this.showConflictDialog(mealData, conflictingMeal, targetDate)
                return false
            }

            return true
        } catch (error) {
            console.log('🎯 Invalid target date provided')
            return false
        }
    }

    moveMeal(mealData, targetDate) {
        const mealIndex = this.scheduledMeals.findIndex(meal => meal.id === mealData.id)
        if (mealIndex !== -1) {
            this.scheduledMeals[mealIndex].date = new Date(targetDate)
            this.showMoveSuccess(mealData.name, targetDate)
            this.notifyMealMoved(mealData, targetDate)
            return true
        }
        return false
    }

    getMealsForDate(date) {
        const dateKey = this.formatDateKey(date)
        return this.scheduledMeals.filter(meal => 
            this.formatDateKey(meal.date) === dateKey && 
            meal.mealType === this.mealType
        )
    }

    formatDateKey(date) {
        return date.toISOString().split('T')[0]
    }

    showConflictDialog(draggedMeal, existingMeal, targetDate) {
        console.log('Showing conflict dialog:', { draggedMeal, existingMeal, targetDate })
        return 'conflict-modal'
    }

    showMoveSuccess(mealName, targetDate) {
        console.log(`✅ ${mealName} moved to ${targetDate}`)
        return { message: `${mealName} moved to ${targetDate}`, type: 'success' }
    }

    showDropError(message) {
        console.log(`❌ ${message}`)
        return { message, type: 'error' }
    }

    notifyMealMoved(mealData, targetDate) {
        const event = new CustomEvent('mealMoved', {
            detail: {
                mealId: mealData.id,
                mealName: mealData.name,
                mealType: mealData.mealType,
                originalDate: mealData.originalDate,
                newDate: targetDate
            }
        })
        
        document.dispatchEvent(event)
        return event
    }

    swapMeals(draggedMeal, existingMeal, targetDate) {
        const draggedIndex = this.scheduledMeals.findIndex(meal => meal.id === draggedMeal.id)
        const existingIndex = this.scheduledMeals.findIndex(meal => meal.id === existingMeal.id)

        if (draggedIndex !== -1 && existingIndex !== -1) {
            const originalDate = this.scheduledMeals[draggedIndex].date
            this.scheduledMeals[draggedIndex].date = new Date(targetDate)
            this.scheduledMeals[existingIndex].date = originalDate
            return true
        }
        return false
    }

    replaceMeal(draggedMeal, existingMeal, targetDate) {
        const existingIndex = this.scheduledMeals.findIndex(meal => meal.id === existingMeal.id)
        if (existingIndex !== -1) {
            this.scheduledMeals.splice(existingIndex, 1)
            return this.moveMeal(draggedMeal, targetDate)
        }
        return false
    }
}

describe('Drag and Drop Functionality', () => {
    let dom
    let calendarView
    let mockConsole

    beforeEach(() => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <div id="calendar-container">
                    <div class="calendar-day" data-date="2024-12-05">
                        <div class="meal-item" 
                             draggable="true"
                             data-meal-id="meal-1"
                             data-meal-name="Spaghetti Carbonara"
                             data-meal-type="dinner"
                             data-original-date="2024-12-05">
                            <span class="drag-handle">⋮⋮</span>
                            <span class="meal-name">Spaghetti Carbonara</span>
                        </div>
                    </div>
                    <div class="calendar-day" data-date="2024-12-10">
                        <div class="meal-item" 
                             draggable="true"
                             data-meal-id="meal-2"
                             data-meal-name="Chicken Stir Fry"
                             data-meal-type="dinner"
                             data-original-date="2024-12-10">
                            <span class="drag-handle">⋮⋮</span>
                            <span class="meal-name">Chicken Stir Fry</span>
                        </div>
                    </div>
                    <div class="calendar-day" data-date="2024-12-15"></div>
                </div>
            </body>
            </html>
        `)
        
        global.document = dom.window.document
        global.window = dom.window
        global.CustomEvent = dom.window.CustomEvent

        // Mock console methods
        mockConsole = {
            log: vi.fn(),
            warn: vi.fn(),
            error: vi.fn()
        }
        global.console = mockConsole

        const container = document.getElementById('calendar-container')
        calendarView = new MockCalendarView(container, 'dinner')
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('Drag Start Functionality', () => {
        it('should handle drag start correctly', () => {
            const mealItem = document.querySelector('.meal-item')
            const mockEvent = {
                target: mealItem,
                dataTransfer: {
                    setData: vi.fn(),
                    effectAllowed: null
                }
            }

            const result = calendarView.handleDragStart(mockEvent)

            expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith(
                'application/json', 
                JSON.stringify({
                    id: 'meal-1',
                    name: 'Spaghetti Carbonara',
                    mealType: 'dinner',
                    originalDate: '2024-12-05'
                })
            )
            expect(mockEvent.dataTransfer.effectAllowed).toBe('move')
            expect(mealItem.classList.contains('dragging')).toBe(true)
            expect(mealItem.style.opacity).toBe('0.5')
            expect(console.log).toHaveBeenCalledWith('🎯 Drag started:', result)
        })

        it('should extract correct meal data from DOM attributes', () => {
            const mealItem = document.querySelector('[data-meal-id="meal-2"]')
            const mockEvent = {
                target: mealItem,
                dataTransfer: {
                    setData: vi.fn(),
                    effectAllowed: null
                }
            }

            const result = calendarView.handleDragStart(mockEvent)

            expect(result).toEqual({
                id: 'meal-2',
                name: 'Chicken Stir Fry',
                mealType: 'dinner',
                originalDate: '2024-12-10'
            })
        })
    })

    describe('Drag End Functionality', () => {
        it('should handle drag end correctly', () => {
            const mealItem = document.querySelector('.meal-item')
            mealItem.classList.add('dragging')
            mealItem.style.opacity = '0.5'

            const mockEvent = { target: mealItem }
            calendarView.handleDragEnd(mockEvent)

            expect(mealItem.classList.contains('dragging')).toBe(false)
            expect(mealItem.style.opacity).toBe('1')
            expect(console.log).toHaveBeenCalledWith('🎯 Drag ended')
        })

        it('should clean up visual states', () => {
            const mealItem = document.querySelector('.meal-item')
            mealItem.classList.add('dragging')
            mealItem.style.opacity = '0.3'

            calendarView.handleDragEnd({ target: mealItem })

            expect(mealItem.classList.contains('dragging')).toBe(false)
            expect(mealItem.style.opacity).toBe('1')
        })
    })

    describe('Drop Validation', () => {
        it('should reject drop on same date', () => {
            const mealData = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            const result = calendarView.validateDrop(mealData, '2024-12-05')

            expect(result).toBe(false)
            expect(console.log).toHaveBeenCalledWith('🎯 Dropped on same date, no action needed')
        })

        it('should allow drop on empty date', () => {
            const mealData = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            const result = calendarView.validateDrop(mealData, '2024-12-15')

            expect(result).toBe(true)
        })

        it('should detect conflicts with existing meals', () => {
            const mealData = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            const showConflictSpy = vi.spyOn(calendarView, 'showConflictDialog')
            const result = calendarView.validateDrop(mealData, '2024-12-10')

            expect(result).toBe(false)
            expect(showConflictSpy).toHaveBeenCalled()
        })

        it('should allow drop when no conflicts exist', () => {
            const mealData = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            const result = calendarView.validateDrop(mealData, '2024-12-20')

            expect(result).toBe(true)
        })
    })

    describe('Drop Handling', () => {
        it('should handle successful drop', () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                stopPropagation: vi.fn(),
                dataTransfer: {
                    getData: vi.fn().mockReturnValue(JSON.stringify({
                        id: 'meal-1',
                        name: 'Spaghetti Carbonara',
                        mealType: 'dinner',
                        originalDate: '2024-12-05'
                    }))
                }
            }

            const validateSpy = vi.spyOn(calendarView, 'validateDrop').mockReturnValue(true)
            const moveSpy = vi.spyOn(calendarView, 'moveMeal')

            const result = calendarView.handleDrop(mockEvent, '2024-12-15')

            expect(mockEvent.preventDefault).toHaveBeenCalled()
            expect(mockEvent.stopPropagation).toHaveBeenCalled()
            expect(validateSpy).toHaveBeenCalled()
            expect(moveSpy).toHaveBeenCalled()
            expect(result).toBe(true)
        })

        it('should handle drop validation failure', () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                stopPropagation: vi.fn(),
                dataTransfer: {
                    getData: vi.fn().mockReturnValue(JSON.stringify({
                        id: 'meal-1',
                        name: 'Spaghetti Carbonara',
                        mealType: 'dinner',
                        originalDate: '2024-12-05'
                    }))
                }
            }

            const validateSpy = vi.spyOn(calendarView, 'validateDrop').mockReturnValue(false)
            const moveSpy = vi.spyOn(calendarView, 'moveMeal')

            const result = calendarView.handleDrop(mockEvent, '2024-12-05')

            expect(validateSpy).toHaveBeenCalled()
            expect(moveSpy).not.toHaveBeenCalled()
            expect(result).toBe(false)
        })

        it('should handle malformed data transfer', () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                stopPropagation: vi.fn(),
                dataTransfer: {
                    getData: vi.fn().mockReturnValue('invalid-json')
                }
            }

            const errorSpy = vi.spyOn(calendarView, 'showDropError')
            const result = calendarView.handleDrop(mockEvent, '2024-12-15')

            expect(console.error).toHaveBeenCalled()
            expect(errorSpy).toHaveBeenCalledWith('Failed to move meal. Please try again.')
            expect(result).toBe(false)
        })
    })

    describe('Meal Movement', () => {
        it('should move meal to new date', () => {
            const mealData = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            const notifySpy = vi.spyOn(calendarView, 'notifyMealMoved')
            const successSpy = vi.spyOn(calendarView, 'showMoveSuccess')

            const result = calendarView.moveMeal(mealData, '2024-12-15')

            expect(result).toBe(true)
            expect(calendarView.scheduledMeals[0].date).toEqual(new Date('2024-12-15'))
            expect(successSpy).toHaveBeenCalledWith('Spaghetti Carbonara', '2024-12-15')
            expect(notifySpy).toHaveBeenCalled()
        })

        it('should handle non-existent meal', () => {
            const mealData = {
                id: 'non-existent',
                name: 'Non-existent Meal',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            const result = calendarView.moveMeal(mealData, '2024-12-15')

            expect(result).toBe(false)
        })

        it('should update meal date correctly', () => {
            const originalDate = calendarView.scheduledMeals[1].date
            const mealData = {
                id: 'meal-2',
                name: 'Chicken Stir Fry',
                mealType: 'dinner',
                originalDate: '2024-12-10'
            }

            calendarView.moveMeal(mealData, '2024-12-20')

            expect(calendarView.scheduledMeals[1].date).toEqual(new Date('2024-12-20'))
            expect(calendarView.scheduledMeals[1].date).not.toEqual(originalDate)
        })
    })

    describe('Conflict Resolution', () => {
        it('should swap meals correctly', () => {
            const draggedMeal = { id: 'meal-1', name: 'Spaghetti Carbonara' }
            const existingMeal = { id: 'meal-2', name: 'Chicken Stir Fry' }
            const targetDate = '2024-12-10'

            const originalDate1 = calendarView.scheduledMeals[0].date
            const originalDate2 = calendarView.scheduledMeals[1].date

            const result = calendarView.swapMeals(draggedMeal, existingMeal, targetDate)

            expect(result).toBe(true)
            expect(calendarView.scheduledMeals[0].date).toEqual(new Date(targetDate))
            expect(calendarView.scheduledMeals[1].date).toEqual(originalDate1)
        })

        it('should replace meal correctly', () => {
            const draggedMeal = { id: 'meal-1', name: 'Spaghetti Carbonara' }
            const existingMeal = { id: 'meal-2', name: 'Chicken Stir Fry' }
            const targetDate = '2024-12-10'

            const originalLength = calendarView.scheduledMeals.length

            const result = calendarView.replaceMeal(draggedMeal, existingMeal, targetDate)

            expect(result).toBe(true)
            expect(calendarView.scheduledMeals.length).toBe(originalLength - 1)
            expect(calendarView.scheduledMeals[0].date).toEqual(new Date(targetDate))
        })

        it('should handle swap with non-existent meals', () => {
            const draggedMeal = { id: 'non-existent-1', name: 'Non-existent 1' }
            const existingMeal = { id: 'non-existent-2', name: 'Non-existent 2' }

            const result = calendarView.swapMeals(draggedMeal, existingMeal, '2024-12-15')

            expect(result).toBe(false)
        })
    })

    describe('Event Notifications', () => {
        it('should dispatch meal moved event', () => {
            const eventSpy = vi.fn()
            document.addEventListener('mealMoved', eventSpy)

            const mealData = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            calendarView.notifyMealMoved(mealData, '2024-12-15')

            expect(eventSpy).toHaveBeenCalled()
            const eventDetail = eventSpy.mock.calls[0][0].detail
            expect(eventDetail.mealId).toBe('meal-1')
            expect(eventDetail.mealName).toBe('Spaghetti Carbonara')
            expect(eventDetail.newDate).toBe('2024-12-15')
        })

        it('should include correct event data', () => {
            let capturedEvent = null
            document.addEventListener('mealMoved', (e) => {
                capturedEvent = e
            })

            const mealData = {
                id: 'meal-2',
                name: 'Chicken Stir Fry',
                mealType: 'dinner',
                originalDate: '2024-12-10'
            }

            calendarView.notifyMealMoved(mealData, '2024-12-20')

            expect(capturedEvent).toBeTruthy()
            expect(capturedEvent.detail).toEqual({
                mealId: 'meal-2',
                mealName: 'Chicken Stir Fry',
                mealType: 'dinner',
                originalDate: '2024-12-10',
                newDate: '2024-12-20'
            })
        })
    })

    describe('Date Utilities', () => {
        it('should format date key correctly', () => {
            const date = new Date('2024-12-05T10:30:00')
            const result = calendarView.formatDateKey(date)
            expect(result).toBe('2024-12-05')
        })

        it('should get meals for specific date', () => {
            const date = new Date('2024-12-05')
            const meals = calendarView.getMealsForDate(date)
            
            expect(meals).toHaveLength(1)
            expect(meals[0].id).toBe('meal-1')
            expect(meals[0].name).toBe('Spaghetti Carbonara')
        })

        it('should return empty array for date with no meals', () => {
            const date = new Date('2024-12-25')
            const meals = calendarView.getMealsForDate(date)
            
            expect(meals).toHaveLength(0)
        })

        it('should filter meals by meal type', () => {
            // Add a breakfast meal to test filtering
            calendarView.scheduledMeals.push({
                id: 'meal-3',
                name: 'Pancakes',
                mealType: 'breakfast',
                date: new Date('2024-12-05'),
                recipe: { id: 'recipe-3' }
            })

            const date = new Date('2024-12-05')
            const dinnerMeals = calendarView.getMealsForDate(date)
            
            expect(dinnerMeals).toHaveLength(1)
            expect(dinnerMeals[0].mealType).toBe('dinner')
        })
    })

    describe('User Feedback', () => {
        it('should show success notification', () => {
            const result = calendarView.showMoveSuccess('Test Meal', '2024-12-15')
            
            expect(result.type).toBe('success')
            expect(result.message).toBe('Test Meal moved to 2024-12-15')
            expect(console.log).toHaveBeenCalledWith('✅ Test Meal moved to 2024-12-15')
        })

        it('should show error notification', () => {
            const result = calendarView.showDropError('Test error message')
            
            expect(result.type).toBe('error')
            expect(result.message).toBe('Test error message')
            expect(console.log).toHaveBeenCalledWith('❌ Test error message')
        })

        it('should show conflict dialog', () => {
            const draggedMeal = { id: 'meal-1', name: 'Spaghetti Carbonara' }
            const existingMeal = { id: 'meal-2', name: 'Chicken Stir Fry' }
            const targetDate = '2024-12-15'

            const result = calendarView.showConflictDialog(draggedMeal, existingMeal, targetDate)
            
            expect(result).toBe('conflict-modal')
            expect(console.log).toHaveBeenCalledWith('Showing conflict dialog:', {
                draggedMeal,
                existingMeal,
                targetDate
            })
        })
    })

    describe('Edge Cases', () => {
        it('should handle empty scheduled meals array', () => {
            calendarView.scheduledMeals = []
            
            const mealData = { id: 'meal-1', name: 'Test Meal', mealType: 'dinner', originalDate: '2024-12-05' }
            const result = calendarView.moveMeal(mealData, '2024-12-15')
            
            expect(result).toBe(false)
        })

        it('should handle null meal data', () => {
            const result = calendarView.validateDrop(null, '2024-12-15')
            
            expect(result).toBe(false)
            expect(console.log).toHaveBeenCalledWith('🎯 Invalid meal data provided')
        })

        it('should handle invalid target date', () => {
            const mealData = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                originalDate: '2024-12-05'
            }

            const result = calendarView.validateDrop(mealData, 'invalid-date')
            
            expect(result).toBe(false)
            expect(console.log).toHaveBeenCalledWith('🎯 Invalid target date provided')
        })

        it('should handle missing DOM elements gracefully', () => {
            const mockEvent = {
                target: null,
                dataTransfer: { setData: vi.fn(), effectAllowed: null }
            }

            const result = calendarView.handleDragStart(mockEvent)
            
            expect(result).toBe(null)
            expect(console.log).toHaveBeenCalledWith('🎯 Invalid drag target')
        })
    })
})
