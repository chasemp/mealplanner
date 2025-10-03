// Meal Planning Logic Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Meal Planning Logic', () => {
    let dom, document, window, Main;

    beforeEach(() => {
        // Set up JSDOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <head><title>Test</title></head>
                <body>
                    <div id="itinerary-container"></div>
                    <div id="planning-queue"></div>
                </body>
            </html>
        `, { url: 'http://localhost' });

        document = dom.window.document;
        window = dom.window;
        global.document = document;
        global.window = window;

        // Mock the Main class with the meal planning logic
        global.Main = class MockMain {
            constructor() {
                this.itineraryViews = {
                    plan: {
                        startDate: new Date('2025-09-21')
                    }
                };
            }

            /**
             * Determines if a meal should be scheduled on a given day based on spacing constraints
             * and meals per week requirements
             */
            shouldScheduleMealOnDay(meals, currentDate, mealSpacing, weekNumber, mealsPerWeek, mealsPerWeekTracker) {
                // If this is the first meal of the week, always schedule it
                const mealsThisWeek = mealsPerWeekTracker.get(weekNumber) || 0;
                if (mealsThisWeek === 0) {
                    return true;
                }
                
                // If we've already scheduled all meals for this week, don't schedule more
                if (mealsThisWeek >= mealsPerWeek) {
                    return false;
                }
                
                // For subsequent meals in the week, check if enough days have passed since the last meal
                // This ensures meals are spaced out within the week
                const lastMealDateInWeek = meals.reduce((latestDate, meal) => {
                    const mealDate = new Date(meal.date);
                    const mealWeekNumber = Math.floor((mealDate - new Date(this.itineraryViews['plan'].startDate)) / (1000 * 60 * 60 * 24 * 7));
                    if (mealWeekNumber === weekNumber && (!latestDate || mealDate > latestDate)) {
                        return mealDate;
                    }
                    return latestDate;
                }, null);
                
                if (lastMealDateInWeek) {
                    const daysSinceLastMealInWeek = Math.floor((currentDate - lastMealDateInWeek) / (1000 * 60 * 60 * 24));
                    return daysSinceLastMealInWeek >= mealSpacing;
                }
                
                return true; // Should not happen if mealsThisWeek > 0
            }

            generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType) {
                const meals = [];
                let recipeIndex = 0;
                let lastScheduledDates = new Map(); // Track last scheduled date for each recipe
                
                // Calculate total days to plan
                const totalDays = weeks * 7;
                const currentDate = new Date(startDate);
                
                // Calculate how many meals we need to schedule per week
                const totalMealsNeeded = weeks * mealsPerWeek;
                let mealsScheduled = 0;
                
                // Track meals scheduled per week to respect mealsPerWeek constraint
                const mealsPerWeekTracker = new Map(); // weekNumber -> count
                
                // Iterate through each day and schedule meals according to constraints
                for (let day = 0; day < totalDays && mealsScheduled < totalMealsNeeded; day++) {
                    const dateStr = currentDate.toISOString().split('T')[0];
                    const weekNumber = Math.floor(day / 7);
                    
                    // Check if we've already scheduled enough meals for this week
                    const mealsThisWeek = mealsPerWeekTracker.get(weekNumber) || 0;
                    if (mealsThisWeek >= mealsPerWeek) {
                        // Move to next day
                        currentDate.setDate(currentDate.getDate() + 1);
                        continue;
                    }
                    
                    // Check if we should schedule a meal on this day based on spacing constraints
                    const shouldScheduleMeal = this.shouldScheduleMealOnDay(meals, currentDate, mealSpacing, weekNumber, mealsPerWeek, mealsPerWeekTracker);
                    
                    if (shouldScheduleMeal) {
                        // Get the next recipe in order
                        const recipe = recipes[recipeIndex % recipes.length];
                        
                        // Check meal spacing constraint
                        const lastScheduled = lastScheduledDates.get(recipe.id);
                        const daysSinceLastScheduled = lastScheduled ? 
                            Math.floor((currentDate - lastScheduled) / (1000 * 60 * 60 * 24)) : 
                            mealSpacing + 1; // If never scheduled, allow it
                        
                        if (daysSinceLastScheduled >= mealSpacing) {
                            // Schedule this recipe
                            const meal = {
                                recipe_id: recipe.id,
                                date: dateStr,
                                meal_type: mealType,
                                notes: recipe.title,
                                recipe_title: recipe.title,
                                servings: recipe.servings || 4,
                                items: recipe.items || []
                            };
                            
                            meals.push(meal);
                            lastScheduledDates.set(recipe.id, new Date(currentDate));
                            mealsScheduled++;
                            
                            // Update week tracker
                            mealsPerWeekTracker.set(weekNumber, (mealsPerWeekTracker.get(weekNumber) || 0) + 1);
                            
                            // Move to next recipe in order
                            recipeIndex++;
                        } else {
                            // In ordered mode, we skip this day and try the same recipe again tomorrow
                            // This maintains the strict ordering while respecting spacing constraints
                        }
                    }
                    
                    // Move to next day
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                return meals;
            }
        };

        Main = global.Main;
    });

    describe('shouldScheduleMealOnDay', () => {
        let main;

        beforeEach(() => {
            main = new Main();
        });

        it('should schedule first meal of the week', () => {
            const meals = [];
            const currentDate = new Date('2025-09-21'); // Sunday
            const mealSpacing = 2;
            const weekNumber = 0;
            const mealsPerWeek = 2;
            const mealsPerWeekTracker = new Map();

            const result = main.shouldScheduleMealOnDay(meals, currentDate, mealSpacing, weekNumber, mealsPerWeek, mealsPerWeekTracker);

            expect(result).toBe(true);
        });

        it('should not schedule if week quota is full', () => {
            const meals = [];
            const currentDate = new Date('2025-09-21'); // Sunday
            const mealSpacing = 2;
            const weekNumber = 0;
            const mealsPerWeek = 2;
            const mealsPerWeekTracker = new Map();
            mealsPerWeekTracker.set(0, 2); // Already scheduled 2 meals this week

            const result = main.shouldScheduleMealOnDay(meals, currentDate, mealSpacing, weekNumber, mealsPerWeek, mealsPerWeekTracker);

            expect(result).toBe(false);
        });

        it('should respect meal spacing within week', () => {
            const meals = [
                { date: '2025-09-21' } // Sunday
            ];
            const currentDate = new Date('2025-09-22'); // Monday (1 day later)
            const mealSpacing = 2;
            const weekNumber = 0;
            const mealsPerWeek = 2;
            const mealsPerWeekTracker = new Map();
            mealsPerWeekTracker.set(0, 1); // 1 meal already scheduled

            const result = main.shouldScheduleMealOnDay(meals, currentDate, mealSpacing, weekNumber, mealsPerWeek, mealsPerWeekTracker);

            expect(result).toBe(false); // Not enough days since last meal
        });

        it('should allow scheduling after sufficient spacing', () => {
            const meals = [
                { date: '2025-09-21' } // Sunday
            ];
            const currentDate = new Date('2025-09-23'); // Tuesday (2 days later)
            const mealSpacing = 2;
            const weekNumber = 0;
            const mealsPerWeek = 2;
            const mealsPerWeekTracker = new Map();
            mealsPerWeekTracker.set(0, 1); // 1 meal already scheduled

            const result = main.shouldScheduleMealOnDay(meals, currentDate, mealSpacing, weekNumber, mealsPerWeek, mealsPerWeekTracker);

            expect(result).toBe(true); // Enough days since last meal
        });
    });

    describe('generateOrderedMealPlan', () => {
        let main;

        beforeEach(() => {
            main = new Main();
        });

        it('should schedule correct number of meals per week with proper spacing', () => {
            const recipes = [
                { id: 1, title: 'American Night', servings: 4, items: [] }
            ];
            const startDate = new Date('2025-09-21'); // Sunday
            const weeks = 1;
            const mealsPerWeek = 2;
            const mealSpacing = 2;
            const mealType = 'dinner';

            const meals = main.generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType);

            expect(meals).toHaveLength(2);
            expect(meals[0].date).toBe('2025-09-21'); // Sunday
            expect(meals[1].date).toBe('2025-09-23'); // Tuesday (2 days later)
            expect(meals[0].recipe_id).toBe(1);
            expect(meals[1].recipe_id).toBe(1);
        });

        it('should respect meals per week constraint', () => {
            const recipes = [
                { id: 1, title: 'Recipe 1', servings: 4, items: [] },
                { id: 2, title: 'Recipe 2', servings: 4, items: [] }
            ];
            const startDate = new Date('2025-09-21'); // Sunday
            const weeks = 1;
            const mealsPerWeek = 1;
            const mealSpacing = 1;
            const mealType = 'dinner';

            const meals = main.generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType);

            expect(meals).toHaveLength(1);
            expect(meals[0].date).toBe('2025-09-21'); // Only one meal scheduled
        });

        it('should maintain recipe order in ordered mode', () => {
            const recipes = [
                { id: 1, title: 'First Recipe', servings: 4, items: [] },
                { id: 2, title: 'Second Recipe', servings: 4, items: [] },
                { id: 3, title: 'Third Recipe', servings: 4, items: [] }
            ];
            const startDate = new Date('2025-09-21'); // Sunday
            const weeks = 1;
            const mealsPerWeek = 3;
            const mealSpacing = 1;
            const mealType = 'dinner';

            const meals = main.generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType);

            expect(meals).toHaveLength(3);
            expect(meals[0].recipe_id).toBe(1); // First recipe
            expect(meals[1].recipe_id).toBe(2); // Second recipe
            expect(meals[2].recipe_id).toBe(3); // Third recipe
        });

        it('should handle multiple weeks correctly', () => {
            const recipes = [
                { id: 1, title: 'Weekly Recipe', servings: 4, items: [] }
            ];
            const startDate = new Date('2025-09-21'); // Sunday
            const weeks = 2;
            const mealsPerWeek = 2;
            const mealSpacing = 2;
            const mealType = 'dinner';

            const meals = main.generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType);

            expect(meals).toHaveLength(4); // 2 weeks × 2 meals per week
            
            // Check that meals are properly distributed across weeks
            const week1Meals = meals.filter(meal => {
                const mealDate = new Date(meal.date);
                const weekNumber = Math.floor((mealDate - startDate) / (1000 * 60 * 60 * 24 * 7));
                return weekNumber === 0;
            });
            const week2Meals = meals.filter(meal => {
                const mealDate = new Date(meal.date);
                const weekNumber = Math.floor((mealDate - startDate) / (1000 * 60 * 60 * 24 * 7));
                return weekNumber === 1;
            });

            expect(week1Meals).toHaveLength(2);
            expect(week2Meals).toHaveLength(2);
        });

        it('should skip days when recipe cannot be scheduled due to spacing', () => {
            const recipes = [
                { id: 1, title: 'Single Recipe', servings: 4, items: [] }
            ];
            const startDate = new Date('2025-09-21'); // Sunday
            const weeks = 1;
            const mealsPerWeek = 2;
            const mealSpacing = 3; // Require 3 days between same recipe
            const mealType = 'dinner';

            const meals = main.generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType);

            expect(meals).toHaveLength(2);
            expect(meals[0].date).toBe('2025-09-21'); // Sunday
            expect(meals[1].date).toBe('2025-09-24'); // Wednesday (3 days later)
        });

        it('should handle edge case with high meal spacing requirements', () => {
            const recipes = [
                { id: 1, title: 'Spaced Recipe', servings: 4, items: [] }
            ];
            const startDate = new Date('2025-09-21'); // Sunday
            const weeks = 1;
            const mealsPerWeek = 2;
            const mealSpacing = 5; // Require 5 days between same recipe
            const mealType = 'dinner';

            const meals = main.generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType);

            // Should schedule 2 meals: Sunday and Friday (5 days apart, which is >= 5)
            expect(meals).toHaveLength(2);
            expect(meals[0].date).toBe('2025-09-21'); // Sunday
            expect(meals[1].date).toBe('2025-09-26'); // Friday
        });
    });
});
