import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Setup DOM environment
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        <div id="breakfast-tab" class="tab-content">
            <button id="auto-plan-breakfast">Auto Plan</button>
            <button id="clear-plan-breakfast">Clear</button>
            <div id="breakfast-itinerary"></div>
            <div id="breakfast-calendar"></div>
        </div>
        <div id="lunch-tab" class="tab-content">
            <button id="auto-plan-lunch">Auto Plan</button>
            <button id="clear-plan-lunch">Clear</button>
            <div id="lunch-itinerary"></div>
            <div id="lunch-calendar"></div>
        </div>
        <div id="dinner-tab" class="tab-content">
            <button id="auto-plan-plan">Auto Plan</button>
            <button id="clear-plan-plan">Clear</button>
            <div id="dinner-itinerary"></div>
            <div id="dinner-calendar"></div>
        </div>
    </body>
    </html>
`, { url: 'http://localhost' });

global.window = dom.window;
global.document = dom.window.document;

// Mock browser APIs for JSDOM
global.window.confirm = vi.fn();
global.confirm = global.window.confirm; // Also set global confirm
global.window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
Object.defineProperty(global.window, 'localStorage', {
    value: localStorageMock,
    writable: true
});

// Mock classes that would be imported
global.ItineraryView = vi.fn().mockImplementation(() => ({
    render: vi.fn(),
    weeksToShow: 4
}));

global.CalendarView = vi.fn().mockImplementation(() => ({
    render: vi.fn()
}));

global.MealRotationEngine = vi.fn().mockImplementation(() => ({
    generateRotation: vi.fn().mockReturnValue({
        meals: [
            { id: 1, name: 'Test Meal 1', date: '2024-01-01' },
            { id: 2, name: 'Test Meal 2', date: '2024-01-02' }
        ],
        stats: { totalMeals: 2, uniqueRecipes: 2 }
    }),
    clearMealType: vi.fn()
}));

// Mock DemoDataManager
const mockDemoDataInstance = {
    getScheduledMeals: vi.fn().mockReturnValue([
        { id: 1, meal_type: 'breakfast', recipe_name: 'Test Breakfast' },
        { id: 2, meal_type: 'lunch', recipe_name: 'Test Lunch' },
        { id: 3, meal_type: 'dinner', recipe_name: 'Test Dinner' }
    ]),
    getRecipes: vi.fn().mockReturnValue([
        { id: 1, title: 'Recipe 1', meal_type: 'breakfast' },
        { id: 2, title: 'Recipe 2', meal_type: 'lunch' },
        { id: 3, title: 'Recipe 3', meal_type: 'dinner' }
    ])
};

global.window.DemoDataManager = vi.fn().mockImplementation(() => mockDemoDataInstance);

// Import MealPlannerApp after DOM setup
await import('../../../js/main.js');
const MealPlannerApp = global.MealPlannerApp;

describe('Meal Planning Controls', () => {
    let app;

    beforeEach(async () => {
        // Reset DOM
        document.body.innerHTML = `
            <div id="breakfast-tab" class="tab-content">
                <button id="auto-plan-breakfast">Auto Plan</button>
                <button id="clear-plan-breakfast">Clear</button>
                <div id="breakfast-itinerary"></div>
                <div id="breakfast-calendar"></div>
            </div>
            <div id="lunch-tab" class="tab-content">
                <button id="auto-plan-lunch">Auto Plan</button>
                <button id="clear-plan-lunch">Clear</button>
                <div id="lunch-itinerary"></div>
                <div id="lunch-calendar"></div>
            </div>
            <div id="dinner-tab" class="tab-content">
                <button id="auto-plan-plan">Auto Plan</button>
                <button id="clear-plan-plan">Clear</button>
                <div id="dinner-itinerary"></div>
                <div id="dinner-calendar"></div>
            </div>
        `;
        
        // Reset mocks
        global.window.confirm.mockReset();
        global.confirm.mockReset();
        localStorageMock.getItem.mockReset();
        localStorageMock.setItem.mockReset();
        mockDemoDataInstance.getScheduledMeals.mockReset();
        mockDemoDataInstance.getRecipes.mockReset();
        
        // Reset the mock return values
        mockDemoDataInstance.getScheduledMeals.mockReturnValue([
            { id: 1, meal_type: 'breakfast', recipe_name: 'Test Breakfast' },
            { id: 2, meal_type: 'lunch', recipe_name: 'Test Lunch' },
            { id: 3, meal_type: 'dinner', recipe_name: 'Test Dinner' }
        ]);
        mockDemoDataInstance.getRecipes.mockReturnValue([
            { id: 1, title: 'Recipe 1', meal_type: 'breakfast' },
            { id: 2, title: 'Recipe 2', meal_type: 'lunch' },
            { id: 3, title: 'Recipe 3', meal_type: 'dinner' }
        ]);
        
        // Create MealPlannerApp instance
        app = new MealPlannerApp();
        
        // Mock the required components
        app.mealRotationEngine = new MealRotationEngine();
        app.itineraryViews = {
            breakfast: new ItineraryView(),
            lunch: new ItineraryView(),
            dinner: new ItineraryView()
        };
        app.calendarViews = {
            breakfast: new CalendarView(),
            lunch: new CalendarView(),
            dinner: new CalendarView()
        };
        
        // Initialize selected recipes
        app.selectedRecipes = {
            breakfast: [],
            lunch: [],
            dinner: []
        };
        
        // Mock methods that might be called during initialization
        app.renderRecipeSelection = vi.fn();
        app.getScheduledMeals = vi.fn().mockReturnValue([
            { id: 1, meal_type: 'breakfast', recipe_name: 'Test Breakfast' },
            { id: 2, meal_type: 'lunch', recipe_name: 'Test Lunch' },
            { id: 3, meal_type: 'dinner', recipe_name: 'Test Dinner' }
        ]);
        app.saveScheduledMeals = vi.fn();
        app.refreshMealPlanViews = vi.fn();
        
        // Initialize meal planning controls
        app.initializeMealPlanningControls();
        
        // Wait for initialization
        await new Promise(resolve => setTimeout(resolve, 100));
    });

    afterEach(() => {
        // Clean up any notifications
        document.querySelectorAll('.fixed.top-4.right-4').forEach(el => el.remove());
    });

    describe('Initialization', () => {
        it('should initialize meal planning controls for all meal types', () => {
            expect(app.initializeMealPlanningControls).toBeDefined();
            expect(app.initializeMealTypeControls).toBeDefined();
        });

        it('should attach event listeners to Auto Plan buttons', () => {
            const breakfastBtn = document.getElementById('auto-plan-breakfast');
            const lunchBtn = document.getElementById('auto-plan-lunch');
            const dinnerBtn = document.getElementById('auto-plan-plan');
            
            expect(breakfastBtn).toBeTruthy();
            expect(lunchBtn).toBeTruthy();
            expect(dinnerBtn).toBeTruthy();
            
            // Check that clicking triggers the handler (we'll test the handler separately)
            const handleAutoPlanSpy = vi.spyOn(app, 'handleAutoPlan');
            
            breakfastBtn.click();
            expect(handleAutoPlanSpy).toHaveBeenCalledWith('breakfast');
            
            lunchBtn.click();
            expect(handleAutoPlanSpy).toHaveBeenCalledWith('lunch');
            
            dinnerBtn.click();
            expect(handleAutoPlanSpy).toHaveBeenCalledWith('plan');
        });

        it('should attach event listeners to Clear Plan buttons', () => {
            const breakfastBtn = document.getElementById('clear-plan-breakfast');
            const lunchBtn = document.getElementById('clear-plan-lunch');
            const dinnerBtn = document.getElementById('clear-plan-plan');
            
            expect(breakfastBtn).toBeTruthy();
            expect(lunchBtn).toBeTruthy();
            expect(dinnerBtn).toBeTruthy();
            
            // Check that clicking triggers the handler
            const handleClearPlanSpy = vi.spyOn(app, 'handleClearPlan');
            
            breakfastBtn.click();
            expect(handleClearPlanSpy).toHaveBeenCalledWith('breakfast');
            
            lunchBtn.click();
            expect(handleClearPlanSpy).toHaveBeenCalledWith('lunch');
            
            dinnerBtn.click();
            expect(handleClearPlanSpy).toHaveBeenCalledWith('plan');
        });
    });

    describe('Auto Plan Functionality', () => {
        it('should show error when meal rotation engine is not available', () => {
            app.mealRotationEngine = null;
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            
            app.handleAutoPlan('breakfast');
            
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Meal rotation engine not available. Please refresh the page and try again.',
                'error'
            );
        });

        it('should show error when itinerary view is not available', () => {
            app.itineraryViews.breakfast = null;
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            
            app.handleAutoPlan('breakfast');
            
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Meal planning view not available. Please try again.',
                'error'
            );
        });

        it('should generate meal plan successfully', () => {
            // Setup selected recipes
            app.selectedRecipes = { breakfast: [1, 2, 3] };
            
            // Mock DemoDataManager
            global.window.DemoDataManager = class MockDemoDataManager {
                getRecipes() {
                    return [
                        { id: 1, title: 'Recipe 1', meal_type: 'breakfast' },
                        { id: 2, title: 'Recipe 2', meal_type: 'breakfast' },
                        { id: 3, title: 'Recipe 3', meal_type: 'breakfast' }
                    ];
                }
            };
            
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            const applyGeneratedPlanSpy = vi.spyOn(app, 'applyGeneratedPlan');
            
            app.handleAutoPlan('breakfast');
            
            expect(app.mealRotationEngine.generateRotation).toHaveBeenCalledWith(
                expect.any(Date), // startDate
                4, // weeksToShow
                'breakfast', // mealType
                expect.objectContaining({
                    forceRecipes: [1, 2, 3],
                    availableRecipes: expect.any(Array)
                })
            );
            expect(applyGeneratedPlanSpy).toHaveBeenCalledWith('breakfast', expect.any(Array));
            expect(showNotificationSpy).toHaveBeenCalledWith(
                expect.stringContaining('Breakfast plan generated!'),
                'success'
            );
        });

        it('should handle empty meal generation result', () => {
            // No selected recipes - should show recipe selection warning
            app.selectedRecipes = { breakfast: [] };
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            
            app.handleAutoPlan('breakfast');
            
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Please select some recipes for breakfast planning first.',
                'warning'
            );
        });

        it('should handle meal generation errors', () => {
            // Setup selected recipes and mock DemoDataManager
            app.selectedRecipes = { breakfast: [1, 2] };
            global.window.DemoDataManager = class MockDemoDataManager {
                getRecipes() {
                    return [
                        { id: 1, title: 'Recipe 1', meal_type: 'breakfast' },
                        { id: 2, title: 'Recipe 2', meal_type: 'breakfast' }
                    ];
                }
            };
            
            app.mealRotationEngine.generateRotation.mockImplementation(() => {
                throw new Error('Generation failed');
            });
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            app.handleAutoPlan('breakfast');
            
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating meal plan:', expect.any(Error));
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Error generating meal plan. Please try again.',
                'error'
            );
            
            consoleErrorSpy.mockRestore();
        });

        it('should use correct weeks from itinerary view', () => {
            // Setup selected recipes and mock DemoDataManager
            app.selectedRecipes = { breakfast: [1, 2] };
            global.window.DemoDataManager = class MockDemoDataManager {
                getRecipes() {
                    return [
                        { id: 1, title: 'Recipe 1', meal_type: 'breakfast' },
                        { id: 2, title: 'Recipe 2', meal_type: 'breakfast' }
                    ];
                }
            };
            
            app.itineraryViews.breakfast.weeksToShow = 2;
            
            app.handleAutoPlan('breakfast');
            
            expect(app.mealRotationEngine.generateRotation).toHaveBeenCalledWith(
                expect.any(Date), // startDate
                2, // weeksToShow
                'breakfast', // mealType
                expect.objectContaining({
                    forceRecipes: [1, 2],
                    availableRecipes: expect.any(Array)
                })
            );
        });
    });

    describe('Clear Plan Functionality', () => {
        it('should not clear when user cancels confirmation', () => {
            global.window.confirm.mockReturnValue(false);
            const clearMealPlanDataSpy = vi.spyOn(app, 'clearMealPlanData');
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            
            app.handleClearPlan('breakfast');
            
            expect(clearMealPlanDataSpy).not.toHaveBeenCalled();
            expect(showNotificationSpy).not.toHaveBeenCalled();
        });

        it('should clear plan when user confirms', () => {
            global.window.confirm.mockReturnValue(true);
            const clearMealPlanDataSpy = vi.spyOn(app, 'clearMealPlanData').mockImplementation(() => {
                // Mock successful clearing
                console.log('Mock clearing meal plan data');
            });
            const getScheduledMealsSpy = vi.spyOn(app, 'getScheduledMeals').mockReturnValue([]);
            const switchTabSpy = vi.spyOn(app, 'switchTab').mockImplementation(() => {});
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            
            app.handleClearPlan('breakfast');
            
            expect(clearMealPlanDataSpy).toHaveBeenCalledWith('breakfast');
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Breakfast meal plan cleared successfully.',
                'success'
            );
        });

        it('should refresh views after clearing', () => {
            global.window.confirm.mockReturnValue(true);
            
            app.handleClearPlan('breakfast');
            
            expect(app.itineraryViews.breakfast.render).toHaveBeenCalled();
            expect(app.calendarViews.breakfast.render).toHaveBeenCalled();
        });

        it('should handle clear errors gracefully', () => {
            global.window.confirm.mockReturnValue(true);
            const clearMealPlanDataSpy = vi.spyOn(app, 'clearMealPlanData').mockImplementation(() => {
                throw new Error('Clear failed');
            });
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            app.handleClearPlan('breakfast');
            
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error clearing meal plan:', expect.any(Error));
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Error clearing meal plan. Please try again.',
                'error'
            );
            
            consoleErrorSpy.mockRestore();
        });

        it('should show correct confirmation message for each meal type', () => {
            const confirmSpy = global.window.confirm;
            
            app.handleClearPlan('breakfast');
            expect(confirmSpy).toHaveBeenCalledWith(
                'Are you sure you want to clear all breakfast meal plans? This action cannot be undone.'
            );
            
            app.handleClearPlan('lunch');
            expect(confirmSpy).toHaveBeenCalledWith(
                'Are you sure you want to clear all lunch meal plans? This action cannot be undone.'
            );
            
            app.handleClearPlan('dinner');
            expect(confirmSpy).toHaveBeenCalledWith(
                'Are you sure you want to clear all dinner meal plans? This action cannot be undone.'
            );
        });
    });

    describe('Apply Generated Plan', () => {
        it('should refresh views when applying plan', () => {
            const mockMeals = [
                { id: 1, name: 'Test Meal 1', date: '2024-01-01' },
                { id: 2, name: 'Test Meal 2', date: '2024-01-02' }
            ];
            
            app.applyGeneratedPlan('breakfast', mockMeals);
            
            expect(app.refreshMealPlanViews).toHaveBeenCalled();
        });

        it('should handle missing views gracefully', () => {
            app.itineraryViews.breakfast = null;
            app.calendarViews.breakfast = null;
            
            const mockMeals = [{ id: 1, name: 'Test Meal', date: '2024-01-01' }];
            
            // Should not throw error
            expect(() => {
                app.applyGeneratedPlan('breakfast', mockMeals);
            }).not.toThrow();
        });
    });

    describe('Clear Meal Plan Data', () => {
        it('should log clearing action', () => {
            const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
            
            app.clearMealPlanData('breakfast');
            
            expect(consoleLogSpy).toHaveBeenCalledWith('🗑️ Clearing breakfast data from storage...');
            expect(consoleLogSpy).toHaveBeenCalledWith('✅ Cleared 1 breakfast meals from schedule');
            
            consoleLogSpy.mockRestore();
        });
    });

    describe('Integration with Meal Types', () => {
        it('should handle all meal types correctly', () => {
            const mealTypes = ['breakfast', 'lunch', 'dinner'];
            
            mealTypes.forEach(mealType => {
                const autoPlanBtn = document.getElementById(`auto-plan-${mealType}`);
                const clearPlanBtn = document.getElementById(`clear-plan-${mealType}`);
                
                expect(autoPlanBtn).toBeTruthy();
                expect(clearPlanBtn).toBeTruthy();
                
                // Test that buttons are properly connected
                const handleAutoPlanSpy = vi.spyOn(app, 'handleAutoPlan');
                const handleClearPlanSpy = vi.spyOn(app, 'handleClearPlan');
                
                autoPlanBtn.click();
                expect(handleAutoPlanSpy).toHaveBeenCalledWith(mealType);
                
                clearPlanBtn.click();
                expect(handleClearPlanSpy).toHaveBeenCalledWith(mealType);
            });
        });
    });

    describe('Error Handling', () => {
        it('should handle missing DOM elements gracefully', () => {
            // Remove buttons from DOM
            document.getElementById('auto-plan-breakfast')?.remove();
            document.getElementById('clear-plan-breakfast')?.remove();
            
            // Should not throw error when initializing
            expect(() => {
                app.initializeMealTypeControls('breakfast');
            }).not.toThrow();
        });

        it('should handle missing meal rotation engine methods', () => {
            app.mealRotationEngine = {}; // Empty object without generateRotation method
            app.selectedRecipes = { breakfast: [1, 2] }; // Add selected recipes to get past the warning
            const showNotificationSpy = vi.spyOn(app, 'showNotification');
            
            app.handleAutoPlan('breakfast');
            
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Error generating meal plan. Please try again.',
                'error'
            );
        });
    });

    describe('Notification System', () => {
        it('should show notifications with correct styling', () => {
            app.showNotification('Test message', 'success');
            
            const notification = document.querySelector('.fixed.top-4.right-4');
            expect(notification).toBeTruthy();
            expect(notification.textContent).toBe('Test message');
            expect(notification.className).toContain('bg-green-500');
        });

        it('should show error notifications with correct styling', () => {
            app.showNotification('Error message', 'error');
            
            const notification = document.querySelector('.fixed.top-4.right-4');
            expect(notification).toBeTruthy();
            expect(notification.textContent).toBe('Error message');
            expect(notification.className).toContain('bg-red-500');
        });

        it('should show warning notifications with correct styling', () => {
            app.showNotification('Warning message', 'warning');
            
            const notification = document.querySelector('.fixed.top-4.right-4');
            expect(notification).toBeTruthy();
            expect(notification.textContent).toBe('Warning message');
            expect(notification.className).toContain('bg-yellow-500');
        });

        it('should auto-remove notifications after timeout', async () => {
            // Use fake timers before creating notification
            vi.useFakeTimers();
            
            app.showNotification('Test message', 'success');
            
            let notification = document.querySelector('.fixed.top-4.right-4');
            expect(notification).toBeTruthy();
            expect(notification.textContent).toBe('Test message');
            
            // Fast-forward time by 4000ms to trigger the timeout
            vi.advanceTimersByTime(4000);
            
            // Notification should be removed
            notification = document.querySelector('.fixed.top-4.right-4');
            expect(notification).toBeFalsy();
            
            // Restore real timers
            vi.useRealTimers();
        });
    });
});
