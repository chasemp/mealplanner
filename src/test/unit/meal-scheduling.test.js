// Meal Scheduling Functionality Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Meal Scheduling Functionality', () => {
    let dom, document, window, ItineraryView, mockDemoData;

    beforeEach(() => {
        // Set up JSDOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <head><title>Test</title></head>
                <body>
                    <div id="itinerary-container"></div>
                </body>
            </html>
        `, { url: 'http://localhost' });

        document = dom.window.document;
        window = dom.window;
        global.document = document;
        global.window = window;

        // Mock demo data
        mockDemoData = {
            scheduledMeals: [
                {
                    id: 1,
                    recipe_id: 1,
                    meal_type: 'dinner',
                    date: '2024-01-01',
                    notes: 'Test meal'
                }
            ],
            getRecipes: vi.fn(() => [
                {
                    id: 1,
                    title: 'Grilled Chicken',
                    description: 'Healthy grilled chicken',
                    meal_type: 'dinner',
                    prep_time: 15,
                    cook_time: 25,
                    serving_count: 4,
                    labels: ['healthy', 'protein'],
                    type: 'basic'
                },
                {
                    id: 2,
                    title: 'Pasta Bolognese',
                    description: 'Classic Italian pasta',
                    meal_type: 'dinner',
                    prep_time: 20,
                    cook_time: 30,
                    serving_count: 4,
                    labels: ['italian', 'comfort-food'],
                    type: 'basic'
                }
            ])
        };

        window.demoData = mockDemoData;

        // Mock ItineraryView class
        global.ItineraryView = class MockItineraryView {
            constructor(container, mealType = 'dinner') {
                this.container = container;
                this.mealType = mealType;
                this.mealPlanData = {};
            }

            getAvailableRecipes() {
                if (window.demoData) {
                    return window.demoData.getRecipes().filter(recipe => 
                        recipe.meal_type === this.mealType || recipe.meal_type === 'any'
                    );
                }
                return [];
            }

            scheduleMeal(recipeId, dateStr) {
                console.log(`📅 Scheduling meal: Recipe ${recipeId} for ${dateStr} (${this.mealType})`);
                
                const recipe = window.demoData?.getRecipes().find(r => r.id === recipeId);
                if (!recipe) {
                    console.error('Recipe not found:', recipeId);
                    return;
                }
                
                // Generate unique ID using timestamp + random number
                const newMeal = {
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    recipe_id: recipeId,
                    meal_type: this.mealType,
                    date: dateStr,
                    notes: recipe.title
                };
                
                if (window.demoData) {
                    window.demoData.scheduledMeals.push(newMeal);
                }
                
                document.dispatchEvent(new CustomEvent('mealScheduled', {
                    detail: { meal: newMeal, recipe: recipe }
                }));
                
                return newMeal;
            }

            deleteMeal(mealId) {
                console.log(`🗑️ Deleting meal ${mealId}`);
                
                const mealIndex = window.demoData?.scheduledMeals.findIndex(meal => meal.id === mealId);
                if (mealIndex === -1) {
                    console.error('Meal not found for deletion:', mealId);
                    return;
                }
                
                const deletedMeal = window.demoData.scheduledMeals[mealIndex];
                window.demoData.scheduledMeals.splice(mealIndex, 1);
                
                document.dispatchEvent(new CustomEvent('mealDeleted', {
                    detail: { mealId: mealId, date: deletedMeal.date }
                }));
                
                return deletedMeal;
            }

            showNotification(message, type = 'info') {
                // Mock notification - just log for testing
                console.log(`Notification (${type}): ${message}`);
            }

            render() {
                // Mock render method
                console.log('Rendering itinerary view');
            }
        };

        ItineraryView = global.ItineraryView;
    });

    describe('Recipe Availability', () => {
        it('should get available recipes for meal type', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const availableRecipes = itineraryView.getAvailableRecipes();
            
            expect(availableRecipes).toHaveLength(2);
            expect(availableRecipes[0].title).toBe('Grilled Chicken');
            expect(availableRecipes[1].title).toBe('Pasta Bolognese');
        });

        it('should filter recipes by meal type', () => {
            // Add a breakfast recipe
            mockDemoData.getRecipes = vi.fn(() => [
                {
                    id: 1,
                    title: 'Grilled Chicken',
                    meal_type: 'dinner',
                    labels: ['healthy']
                },
                {
                    id: 2,
                    title: 'Scrambled Eggs',
                    meal_type: 'breakfast',
                    labels: ['quick']
                }
            ]);

            const container = document.getElementById('itinerary-container');
            const breakfastView = new ItineraryView(container, 'breakfast');
            
            const availableRecipes = breakfastView.getAvailableRecipes();
            
            expect(availableRecipes).toHaveLength(1);
            expect(availableRecipes[0].title).toBe('Scrambled Eggs');
        });

        it('should return empty array when no recipes available', () => {
            mockDemoData.getRecipes = vi.fn(() => []);
            
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const availableRecipes = itineraryView.getAvailableRecipes();
            
            expect(availableRecipes).toHaveLength(0);
        });
    });

    describe('Meal Scheduling', () => {
        it('should schedule a new meal successfully', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const initialMealCount = mockDemoData.scheduledMeals.length;
            const recipeId = 1;
            const dateStr = '2024-01-02';
            
            const newMeal = itineraryView.scheduleMeal(recipeId, dateStr);
            
            expect(mockDemoData.scheduledMeals).toHaveLength(initialMealCount + 1);
            expect(newMeal.recipe_id).toBe(recipeId);
            expect(newMeal.meal_type).toBe('dinner');
            expect(newMeal.date).toBe(dateStr);
            expect(newMeal.notes).toBe('Grilled Chicken');
        });

        it('should dispatch mealScheduled event when meal is added', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            let eventFired = false;
            let eventDetail = null;
            
            document.addEventListener('mealScheduled', (e) => {
                eventFired = true;
                eventDetail = e.detail;
            });
            
            const recipeId = 1;
            const dateStr = '2024-01-02';
            
            itineraryView.scheduleMeal(recipeId, dateStr);
            
            expect(eventFired).toBe(true);
            expect(eventDetail.meal.recipe_id).toBe(recipeId);
            expect(eventDetail.recipe.title).toBe('Grilled Chicken');
        });

        it('should handle scheduling with invalid recipe ID', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const initialMealCount = mockDemoData.scheduledMeals.length;
            
            const result = itineraryView.scheduleMeal(999, '2024-01-02');
            
            expect(result).toBeUndefined();
            expect(mockDemoData.scheduledMeals).toHaveLength(initialMealCount);
            expect(consoleSpy).toHaveBeenCalledWith('Recipe not found:', 999);
            
            consoleSpy.mockRestore();
        });
    });

    describe('Meal Deletion', () => {
        it('should delete an existing meal successfully', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const initialMealCount = mockDemoData.scheduledMeals.length;
            const mealToDelete = mockDemoData.scheduledMeals[0];
            
            const deletedMeal = itineraryView.deleteMeal(mealToDelete.id);
            
            expect(mockDemoData.scheduledMeals).toHaveLength(initialMealCount - 1);
            expect(deletedMeal.id).toBe(mealToDelete.id);
        });

        it('should dispatch mealDeleted event when meal is removed', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            let eventFired = false;
            let eventDetail = null;
            
            document.addEventListener('mealDeleted', (e) => {
                eventFired = true;
                eventDetail = e.detail;
            });
            
            const mealToDelete = mockDemoData.scheduledMeals[0];
            
            itineraryView.deleteMeal(mealToDelete.id);
            
            expect(eventFired).toBe(true);
            expect(eventDetail.mealId).toBe(mealToDelete.id);
            expect(eventDetail.date).toBe(mealToDelete.date);
        });

        it('should handle deletion of non-existent meal', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const initialMealCount = mockDemoData.scheduledMeals.length;
            
            const result = itineraryView.deleteMeal(999);
            
            expect(result).toBeUndefined();
            expect(mockDemoData.scheduledMeals).toHaveLength(initialMealCount);
            expect(consoleSpy).toHaveBeenCalledWith('Meal not found for deletion:', 999);
            
            consoleSpy.mockRestore();
        });
    });

    describe('Event Integration', () => {
        it('should handle multiple meal operations with proper event flow', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const events = [];
            
            document.addEventListener('mealScheduled', (e) => {
                events.push({ type: 'scheduled', detail: e.detail });
            });
            
            document.addEventListener('mealDeleted', (e) => {
                events.push({ type: 'deleted', detail: e.detail });
            });
            
            // Schedule a meal
            const newMeal = itineraryView.scheduleMeal(2, '2024-01-03');
            
            // Delete the original meal
            const originalMeal = mockDemoData.scheduledMeals.find(m => m.id === 1);
            itineraryView.deleteMeal(1);
            
            expect(events).toHaveLength(2);
            expect(events[0].type).toBe('scheduled');
            expect(events[0].detail.recipe.title).toBe('Pasta Bolognese');
            expect(events[1].type).toBe('deleted');
            expect(events[1].detail.mealId).toBe(1);
        });
    });

    describe('Data Persistence', () => {
        it('should maintain meal data consistency after operations', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            // Initial state
            expect(mockDemoData.scheduledMeals).toHaveLength(1);
            
            // Add two meals
            const meal1 = itineraryView.scheduleMeal(1, '2024-01-02');
            const meal2 = itineraryView.scheduleMeal(2, '2024-01-03');
            
            expect(mockDemoData.scheduledMeals).toHaveLength(3);
            
            // Delete the second meal we added (meal1)
            itineraryView.deleteMeal(meal1.id);
            
            expect(mockDemoData.scheduledMeals).toHaveLength(2);
            
            // Verify the deleted meal is no longer in the array
            const remainingMeals = mockDemoData.scheduledMeals;
            expect(remainingMeals.find(meal => meal.id === meal1.id)).toBeUndefined();
            
            // Verify the other meals are still there
            expect(remainingMeals.find(meal => meal.id === meal2.id)).toBeDefined();
        });

        it('should generate unique IDs for new meals', () => {
            const container = document.getElementById('itinerary-container');
            const itineraryView = new ItineraryView(container, 'dinner');
            
            const meal1 = itineraryView.scheduleMeal(1, '2024-01-02');
            const meal2 = itineraryView.scheduleMeal(2, '2024-01-03');
            
            expect(meal1.id).not.toBe(meal2.id);
            expect(typeof meal1.id).toBe('number');
            expect(typeof meal2.id).toBe('number');
        });
    });
});
