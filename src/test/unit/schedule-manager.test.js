import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
};
global.localStorage = localStorageMock;

// Mock document and DOM
global.document = {
    dispatchEvent: vi.fn(),
    body: {
        innerHTML: ''
    }
};

// Import the class
import '../../../js/schedule-manager.js';
const ScheduleManager = global.window.ScheduleManager;

describe('ScheduleManager', () => {
    let scheduleManager;
    let mockMeal;
    let mockRecipe;

    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();
        localStorageMock.getItem.mockReturnValue(null);
        
        // Mock SettingsManager for centralized data authority
        global.window = global.window || {};
        global.window.mealPlannerSettings = {
            getCurrentDatabaseSource() {
                return 'demo';
            },
            shouldLoadDemoData() {
                return true;
            },
            getAuthoritativeData(dataType) {
                switch (dataType) {
                    case 'scheduledMeals':
                        return [];
                    default:
                        return [];
                }
            },
            saveAuthoritativeData(dataType, data) {
                // Mock save - do nothing in tests
                console.log(`Mock save: ${dataType} with ${data.length} items`);
            }
        };
        
        // Create fresh instance
        scheduleManager = new ScheduleManager();
        
        // Mock meal data
        mockMeal = {
            id: 'meal-1',
            name: 'Sunday Dinner Combo',
            meal_type: 'dinner',
            recipes: [
                { recipe_id: 1, servings: 4 },
                { recipe_id: 4, servings: 4 }
            ],
            servings: 4,
            total_time: 65
        };

        // Mock recipe data
        mockRecipe = {
            id: 1,
            title: 'Grilled Chicken',
            servings: 4,
            prep_time: 15,
            cook_time: 25
        };
    });

    describe('Initialization', () => {
        it('should initialize with empty scheduled meals when no stored data', () => {
            expect(scheduleManager.scheduledMeals).toBeDefined();
            expect(Array.isArray(scheduleManager.scheduledMeals)).toBe(true);
        });

        it('should load stored scheduled meals from localStorage', () => {
            const storedMeals = [
                { id: 1, meal_name: 'Test Meal', meal_type: 'dinner', date: '2025-09-08' }
            ];
            
            // Mock settings manager to return stored meals
            const mockSettings = {
                getAuthoritativeData: vi.fn().mockReturnValue(storedMeals),
                saveAuthoritativeData: vi.fn(),
                getCurrentDatabaseSource: vi.fn().mockReturnValue('browser')
            };
            global.window = { mealPlannerSettings: mockSettings };
            
            const manager = new ScheduleManager();
            expect(manager.scheduledMeals).toEqual(storedMeals);
        });

        it('should handle localStorage errors gracefully', () => {
            localStorageMock.getItem.mockImplementation(() => {
                throw new Error('Storage error');
            });
            
            const manager = new ScheduleManager();
            expect(manager.scheduledMeals).toEqual([]);
        });
    });

    describe('Meal Scheduling', () => {
        it('should schedule a meal successfully', () => {
            const date = '2025-09-08';
            const scheduledMeal = scheduleManager.scheduleMeal(mockMeal, date);

            expect(scheduledMeal).toBeDefined();
            expect(scheduledMeal.meal_id).toBe(mockMeal.id);
            expect(scheduledMeal.meal_name).toBe(mockMeal.name);
            expect(scheduledMeal.meal_type).toBe(mockMeal.meal_type);
            expect(scheduledMeal.date).toBe(date);
            expect(scheduledMeal.recipes).toEqual(mockMeal.recipes);
            expect(scheduledMeal.total_time).toBe(mockMeal.total_time);
        });

        it('should generate unique IDs for scheduled meals', () => {
            const date = '2025-09-08';
            const meal1 = scheduleManager.scheduleMeal(mockMeal, date);
            const meal2 = scheduleManager.scheduleMeal(mockMeal, date);

            expect(meal1.id).not.toBe(meal2.id);
        });

        it('should save scheduled meals to localStorage', () => {
            const date = '2025-09-08';
            
            // Mock settings manager to track saves
            const mockSettings = {
                getAuthoritativeData: vi.fn().mockReturnValue([]),
                saveAuthoritativeData: vi.fn(),
                getCurrentDatabaseSource: vi.fn().mockReturnValue('browser')
            };
            global.window = { mealPlannerSettings: mockSettings };
            
            // Create fresh manager with mocked settings
            const manager = new ScheduleManager();
            manager.scheduleMeal(mockMeal, date);

            expect(mockSettings.saveAuthoritativeData).toHaveBeenCalledWith(
                'scheduledMeals',
                expect.any(Array)
            );
        });

        it('should dispatch mealScheduled event', () => {
            const date = '2025-09-08';
            scheduleManager.scheduleMeal(mockMeal, date);

            expect(document.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'mealScheduled',
                    detail: expect.objectContaining({
                        meal: mockMeal
                    })
                })
            );
        });

        it('should handle optional parameters', () => {
            const date = '2025-09-08';
            const options = {
                servings: 6,
                notes: 'Special occasion'
            };
            
            const scheduledMeal = scheduleManager.scheduleMeal(mockMeal, date, options);

            expect(scheduledMeal.servings).toBe(6);
            expect(scheduledMeal.notes).toBe('Special occasion');
        });
    });

    describe('Recipe Scheduling (Legacy Support)', () => {
        it('should schedule individual recipes with meal type', () => {
            const mealType = 'dinner';
            const date = '2025-09-08';
            
            const scheduledMeal = scheduleManager.scheduleRecipe(mockRecipe, mealType, date);

            expect(scheduledMeal.meal_type).toBe(mealType);
            expect(scheduledMeal.meal_name).toBe(mockRecipe.title);
            expect(scheduledMeal.recipes).toHaveLength(1);
            expect(scheduledMeal.recipes[0].recipe_id).toBe(mockRecipe.id);
            expect(scheduledMeal.total_time).toBe(40); // prep_time + cook_time
        });

        it('should create temporary meal ID for recipe scheduling', () => {
            const scheduledMeal = scheduleManager.scheduleRecipe(mockRecipe, 'dinner', '2025-09-08');
            
            expect(scheduledMeal.meal_id).toContain(`recipe-${mockRecipe.id}`);
        });
    });

    describe('Querying Scheduled Meals', () => {
        beforeEach(() => {
            // Add some test data
            scheduleManager.scheduleMeal(mockMeal, '2025-09-08');
            scheduleManager.scheduleMeal({
                ...mockMeal,
                id: 'meal-2',
                meal_type: 'breakfast'
            }, '2025-09-08');
            scheduleManager.scheduleMeal({
                ...mockMeal,
                id: 'meal-3'
            }, '2025-09-09');
        });

        it('should get scheduled meals by type', () => {
            const dinnerMeals = scheduleManager.getScheduledMealsByType('dinner');
            const breakfastMeals = scheduleManager.getScheduledMealsByType('breakfast');

            expect(dinnerMeals).toHaveLength(2);
            expect(breakfastMeals).toHaveLength(1);
            expect(dinnerMeals.every(meal => meal.meal_type === 'dinner')).toBe(true);
            expect(breakfastMeals.every(meal => meal.meal_type === 'breakfast')).toBe(true);
        });

        it('should get scheduled meals by date', () => {
            const mealsOn8th = scheduleManager.getScheduledMealsByDate('2025-09-08');
            const mealsOn9th = scheduleManager.getScheduledMealsByDate('2025-09-09');

            expect(mealsOn8th).toHaveLength(2);
            expect(mealsOn9th).toHaveLength(1);
        });

        it('should get scheduled meals in date range', () => {
            const mealsInRange = scheduleManager.getScheduledMealsInRange('2025-09-08', '2025-09-09');
            
            expect(mealsInRange).toHaveLength(3);
        });

        it('should return all scheduled meals', () => {
            const allMeals = scheduleManager.getAllScheduledMeals();
            
            expect(allMeals).toHaveLength(3);
            expect(allMeals).not.toBe(scheduleManager.scheduledMeals); // Should return copy
        });
    });

    describe('Meal Management', () => {
        let scheduledMealId;

        beforeEach(() => {
            const scheduledMeal = scheduleManager.scheduleMeal(mockMeal, '2025-09-08');
            scheduledMealId = scheduledMeal.id;
        });

        it('should remove scheduled meal', () => {
            const removedMeal = scheduleManager.removeScheduledMeal(scheduledMealId);

            expect(removedMeal).toBeDefined();
            expect(removedMeal.id).toBe(scheduledMealId);
            expect(scheduleManager.getAllScheduledMeals()).toHaveLength(0);
        });

        it('should dispatch mealUnscheduled event when removing', () => {
            scheduleManager.removeScheduledMeal(scheduledMealId);

            expect(document.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'mealUnscheduled'
                })
            );
        });

        it('should return null when removing non-existent meal', () => {
            const result = scheduleManager.removeScheduledMeal(99999);
            expect(result).toBeNull();
        });

        it('should update scheduled meal', () => {
            const updates = {
                servings: 6,
                notes: 'Updated notes'
            };

            const updatedMeal = scheduleManager.updateScheduledMeal(scheduledMealId, updates);

            expect(updatedMeal.servings).toBe(6);
            expect(updatedMeal.notes).toBe('Updated notes');
            expect(updatedMeal.updated_at).toBeDefined();
        });

        it('should dispatch mealUpdated event when updating', () => {
            scheduleManager.updateScheduledMeal(scheduledMealId, { servings: 6 });

            expect(document.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'mealUpdated'
                })
            );
        });

        it('should return null when updating non-existent meal', () => {
            const result = scheduleManager.updateScheduledMeal(99999, { servings: 6 });
            expect(result).toBeNull();
        });
    });

    describe('Legacy Format Support', () => {
        it('should convert scheduled meal to legacy format', () => {
            const scheduledMeal = scheduleManager.scheduleMeal(mockMeal, '2025-09-08');
            const legacyFormat = scheduleManager.toLegacyFormat(scheduledMeal);

            expect(legacyFormat).toEqual({
                id: scheduledMeal.id,
                recipe_id: mockMeal.recipes[0].recipe_id,
                recipe_name: mockMeal.recipes[0].title,
                meal_type: mockMeal.meal_type,
                date: '2025-09-08',
                notes: mockMeal.name
            });
        });

        it('should get all scheduled meals in legacy format', () => {
            scheduleManager.scheduleMeal(mockMeal, '2025-09-08');
            const legacyMeals = scheduleManager.getScheduledMealsLegacyFormat();

            expect(legacyMeals).toHaveLength(1);
            expect(legacyMeals[0]).toHaveProperty('recipe_id');
            expect(legacyMeals[0]).toHaveProperty('meal_type');
            expect(legacyMeals[0]).toHaveProperty('date');
            expect(legacyMeals[0]).toHaveProperty('notes');
        });

        it('should filter legacy format by meal type', () => {
            scheduleManager.scheduleMeal(mockMeal, '2025-09-08');
            scheduleManager.scheduleMeal({
                ...mockMeal,
                id: 'meal-2',
                meal_type: 'breakfast'
            }, '2025-09-08');

            const dinnerMeals = scheduleManager.getScheduledMealsLegacyFormat('dinner');
            const breakfastMeals = scheduleManager.getScheduledMealsLegacyFormat('breakfast');

            expect(dinnerMeals).toHaveLength(1);
            expect(breakfastMeals).toHaveLength(1);
            expect(dinnerMeals[0].meal_type).toBe('dinner');
            expect(breakfastMeals[0].meal_type).toBe('breakfast');
        });
    });

    describe('Data Persistence', () => {
        it('should handle localStorage save errors gracefully', () => {
            localStorageMock.setItem.mockImplementation(() => {
                throw new Error('Storage full');
            });

            // Should not throw
            expect(() => {
                scheduleManager.scheduleMeal(mockMeal, '2025-09-08');
            }).not.toThrow();
        });

        it('should clear all scheduled meals', () => {
            // Mock settings manager to track saves
            const mockSettings = {
                getAuthoritativeData: vi.fn().mockReturnValue([]),
                saveAuthoritativeData: vi.fn(),
                getCurrentDatabaseSource: vi.fn().mockReturnValue('browser')
            };
            global.window = { mealPlannerSettings: mockSettings };
            
            // Create fresh manager with mocked settings
            const manager = new ScheduleManager();
            manager.scheduleMeal(mockMeal, '2025-09-08');
            expect(manager.getAllScheduledMeals()).toHaveLength(1);

            manager.clearAllScheduledMeals();
            expect(manager.getAllScheduledMeals()).toHaveLength(0);
            expect(mockSettings.saveAuthoritativeData).toHaveBeenCalledWith('scheduledMeals', []);
        });
    });

    describe('Demo Data Integration', () => {
        it('should provide demo meals when no MealManager available', () => {
            const demoMeals = scheduleManager.getDemoMeals();
            
            expect(demoMeals).toHaveLength(3);
            expect(demoMeals[0].meal_type).toBe('breakfast');
            expect(demoMeals[1].meal_type).toBe('lunch');
            expect(demoMeals[2].meal_type).toBe('dinner');
        });

        it('should initialize demo schedule when no stored data (non-test environment)', () => {
            // Temporarily set NODE_ENV to non-test
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'development';
            
            try {
                // Mock settings manager to return demo data
                const demoMeals = [
                    { id: 1, meal_name: 'Demo Meal 1', meal_type: 'dinner', date: '2025-09-08' },
                    { id: 2, meal_name: 'Demo Meal 2', meal_type: 'dinner', date: '2025-09-09' }
                ];
                const mockSettings = {
                    getAuthoritativeData: vi.fn().mockReturnValue(demoMeals),
                    saveAuthoritativeData: vi.fn(),
                    getCurrentDatabaseSource: vi.fn().mockReturnValue('demo')
                };
                global.window = { mealPlannerSettings: mockSettings };
                
                // Create new instance to trigger demo initialization
                const manager = new ScheduleManager();
                
                // Should have demo meals scheduled
                expect(manager.getAllScheduledMeals().length).toBeGreaterThan(0);
            } finally {
                // Restore original NODE_ENV
                process.env.NODE_ENV = originalEnv;
            }
        });
    });
});
