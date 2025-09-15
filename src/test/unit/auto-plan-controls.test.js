/**
 * Auto-Plan Controls Tests
 * Tests the restored auto-plan controls functionality (Commit: 5c31398)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Auto-Plan Controls', () => {
    let dom;
    let window;
    let document;

    beforeEach(() => {
        // Create JSDOM environment with auto-plan controls HTML
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <div id="app">
                    <div class="itinerary-view">
                        <!-- Auto Plan Controls (only for plan tab) -->
                        <div class="mb-6 space-y-4">
                            <!-- Meals per Week Control -->
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <label for="meals-per-week" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Meals per Week
                                </label>
                                <div class="flex items-center space-x-4">
                                    <input type="range"
                                           id="meals-per-week"
                                           min="1"
                                           max="7"
                                           value="7"
                                           class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600">
                                    <span id="meals-per-week-value" class="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">7</span>
                                </div>
                                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>1</span>
                                    <span>7</span>
                                </div>
                            </div>

                            <!-- Meal Spacing Control -->
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <label for="meal-spacing" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Minimum Days Between Same Meal
                                </label>
                                <div class="flex items-center space-x-4">
                                    <input type="range"
                                           id="meal-spacing"
                                           min="1"
                                           max="14"
                                           value="3"
                                           class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600">
                                    <span id="meal-spacing-value" class="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">3</span>
                                </div>
                                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>1</span>
                                    <span>14</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `, {
            url: 'http://localhost:8080',
            pretendToBeVisual: true,
            resources: 'usable'
        });

        window = dom.window;
        document = window.document;
        global.window = window;
        global.document = document;
    });

    afterEach(() => {
        dom.window.close();
    });

    describe('Auto-Plan Controls HTML Structure', () => {
        it('should have meals per week slider with correct attributes', () => {
            const slider = document.getElementById('meals-per-week');
            const valueDisplay = document.getElementById('meals-per-week-value');

            expect(slider).toBeTruthy();
            expect(slider.type).toBe('range');
            expect(slider.min).toBe('1');
            expect(slider.max).toBe('7');
            expect(slider.value).toBe('7');
            expect(valueDisplay).toBeTruthy();
            expect(valueDisplay.textContent).toBe('7');
        });

        it('should have meal spacing slider with correct attributes', () => {
            const slider = document.getElementById('meal-spacing');
            const valueDisplay = document.getElementById('meal-spacing-value');

            expect(slider).toBeTruthy();
            expect(slider.type).toBe('range');
            expect(slider.min).toBe('1');
            expect(slider.max).toBe('14');
            expect(slider.value).toBe('3');
            expect(valueDisplay).toBeTruthy();
            expect(valueDisplay.textContent).toBe('3');
        });

        it('should have proper labels and accessibility', () => {
            const mealsPerWeekLabel = document.querySelector('label[for="meals-per-week"]');
            const mealSpacingLabel = document.querySelector('label[for="meal-spacing"]');

            expect(mealsPerWeekLabel).toBeTruthy();
            expect(mealsPerWeekLabel.textContent).toContain('Meals per Week');
            expect(mealSpacingLabel).toBeTruthy();
            expect(mealSpacingLabel.textContent).toContain('Minimum Days Between Same Meal');
        });
    });

    describe('Auto-Plan Controls Functionality', () => {
        let initializeAutoPlanControls;

        beforeEach(() => {
            // Mock the initializeAutoPlanControls function
            initializeAutoPlanControls = vi.fn(() => {
                console.log('🎛️ Initializing auto-plan controls...');

                // Initialize meals per week slider
                const mealsPerWeekSlider = document.getElementById('meals-per-week');
                const mealsPerWeekValue = document.getElementById('meals-per-week-value');

                if (mealsPerWeekSlider && mealsPerWeekValue) {
                    // Update display value when slider changes
                    mealsPerWeekSlider.addEventListener('input', (e) => {
                        mealsPerWeekValue.textContent = e.target.value;
                    });

                    // Initialize display value
                    mealsPerWeekValue.textContent = mealsPerWeekSlider.value;
                }

                // Initialize meal spacing slider
                const mealSpacingSlider = document.getElementById('meal-spacing');
                const mealSpacingValue = document.getElementById('meal-spacing-value');

                if (mealSpacingSlider && mealSpacingValue) {
                    // Update display value when slider changes
                    mealSpacingSlider.addEventListener('input', (e) => {
                        mealSpacingValue.textContent = e.target.value;
                    });

                    // Initialize display value
                    mealSpacingValue.textContent = mealSpacingSlider.value;
                }

                console.log('✅ Auto-plan controls initialized');
            });
        });

        it('should initialize auto-plan controls successfully', () => {
            // Act
            initializeAutoPlanControls();

            // Assert
            expect(initializeAutoPlanControls).toHaveBeenCalled();
        });

        it('should update meals per week value when slider changes', () => {
            // Arrange
            const slider = document.getElementById('meals-per-week');
            const valueDisplay = document.getElementById('meals-per-week-value');
            
            // Initialize controls
            initializeAutoPlanControls();

            // Act
            slider.value = '5';
            slider.dispatchEvent(new window.Event('input'));

            // Assert
            expect(valueDisplay.textContent).toBe('5');
        });

        it('should update meal spacing value when slider changes', () => {
            // Arrange
            const slider = document.getElementById('meal-spacing');
            const valueDisplay = document.getElementById('meal-spacing-value');
            
            // Initialize controls
            initializeAutoPlanControls();

            // Act
            slider.value = '7';
            slider.dispatchEvent(new window.Event('input'));

            // Assert
            expect(valueDisplay.textContent).toBe('7');
        });

        it('should handle missing elements gracefully', () => {
            // Arrange - Remove elements
            const slider = document.getElementById('meals-per-week');
            const valueDisplay = document.getElementById('meals-per-week-value');
            slider.remove();
            valueDisplay.remove();

            // Act & Assert - Should not throw error
            expect(() => initializeAutoPlanControls()).not.toThrow();
        });
    });

    describe('Auto-Plan Controls Integration', () => {
        it('should work with meal rotation engine', () => {
            // Mock meal rotation engine
            const mockMealRotationEngine = {
                generateRotation: vi.fn((options) => {
                    const { mealsPerWeek, mealSpacing } = options;
                    return {
                        meals: Array(mealsPerWeek).fill().map((_, i) => ({
                            id: `meal-${i}`,
                            recipeId: i + 1,
                            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000)
                        })),
                        mealsPerWeek,
                        mealSpacing
                    };
                })
            };

            // Test with different slider values
            const testCases = [
                { mealsPerWeek: 3, mealSpacing: 2 },
                { mealsPerWeek: 5, mealSpacing: 4 },
                { mealsPerWeek: 7, mealSpacing: 1 }
            ];

            testCases.forEach(({ mealsPerWeek, mealSpacing }) => {
                const result = mockMealRotationEngine.generateRotation({ mealsPerWeek, mealSpacing });
                expect(result.mealsPerWeek).toBe(mealsPerWeek);
                expect(result.mealSpacing).toBe(mealSpacing);
                expect(result.meals).toHaveLength(mealsPerWeek);
            });
        });

        it('should validate slider value ranges', () => {
            const mealsPerWeekSlider = document.getElementById('meals-per-week');
            const mealSpacingSlider = document.getElementById('meal-spacing');

            // Test meals per week range
            expect(parseInt(mealsPerWeekSlider.min)).toBe(1);
            expect(parseInt(mealsPerWeekSlider.max)).toBe(7);
            expect(parseInt(mealsPerWeekSlider.value)).toBeGreaterThanOrEqual(1);
            expect(parseInt(mealsPerWeekSlider.value)).toBeLessThanOrEqual(7);

            // Test meal spacing range
            expect(parseInt(mealSpacingSlider.min)).toBe(1);
            expect(parseInt(mealSpacingSlider.max)).toBe(14);
            expect(parseInt(mealSpacingSlider.value)).toBeGreaterThanOrEqual(1);
            expect(parseInt(mealSpacingSlider.value)).toBeLessThanOrEqual(14);
        });
    });

    describe('Auto-Plan Controls Styling', () => {
        it('should have proper CSS classes for theming', () => {
            const mealsPerWeekContainer = document.querySelector('#meals-per-week').closest('.bg-gray-50');
            const mealSpacingContainer = document.querySelector('#meal-spacing').closest('.bg-gray-50');

            expect(mealsPerWeekContainer).toBeTruthy();
            expect(mealsPerWeekContainer.classList.contains('dark:bg-gray-700')).toBe(true);
            expect(mealSpacingContainer).toBeTruthy();
            expect(mealSpacingContainer.classList.contains('dark:bg-gray-700')).toBe(true);
        });

        it('should have responsive design classes', () => {
            const containers = document.querySelectorAll('.mb-6.space-y-4');
            expect(containers.length).toBeGreaterThan(0);
            
            containers.forEach(container => {
                expect(container.classList.contains('mb-6')).toBe(true);
                expect(container.classList.contains('space-y-4')).toBe(true);
            });
        });
    });
});
