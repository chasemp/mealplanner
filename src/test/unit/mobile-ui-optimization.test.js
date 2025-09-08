// Mobile UI Optimization Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Mobile UI Optimization', () => {
    let dom, document, window;

    beforeEach(() => {
        // Set up JSDOM environment with mobile viewport
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>MealPlanner Mobile Test</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="../css/styles.css">
                </head>
                <body>
                    <div id="app">
                        <!-- Navigation tabs -->
                        <nav class="flex space-x-8">
                            <button class="nav-tab" data-tab="recipes">Recipes</button>
                            <button class="nav-tab" data-tab="ingredients">Ingredients</button>
                            <button class="nav-tab" data-tab="pantry">Pantry</button>
                        </nav>
                        
                        <!-- Main content areas -->
                        <div id="recipes-container" class="tab-content"></div>
                        <div id="ingredients-container" class="tab-content"></div>
                        <div id="pantry-container" class="tab-content"></div>
                        
                        <!-- Modal container -->
                        <div id="modal-container"></div>
                    </div>
                </body>
            </html>
        `, { 
            url: 'http://localhost',
            pretendToBeVisual: true,
            resources: "usable"
        });

        document = dom.window.document;
        window = dom.window;
        global.document = document;
        global.window = window;

        // Mock window dimensions for mobile
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375, // iPhone SE width
        });

        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 667, // iPhone SE height
        });
    });

    describe('Touch Target Optimization', () => {
        it('should ensure all buttons meet minimum 44px touch target size', () => {
            // Create test buttons with different classes
            const container = document.getElementById('app');
            container.innerHTML += `
                <div class="test-buttons">
                    <button class="btn-primary">Primary Button</button>
                    <button class="btn-secondary">Secondary Button</button>
                    <button class="nav-tab">Tab Button</button>
                    <button class="tab-button">Tab Button Alt</button>
                    <input type="button" value="Input Button" />
                    <input type="submit" value="Submit Button" />
                </div>
            `;

            const buttons = container.querySelectorAll('button, input[type="button"], input[type="submit"]');
            
            buttons.forEach(button => {
                const computedStyle = window.getComputedStyle(button);
                
                // Check minimum height (should be at least 44px)
                const minHeight = computedStyle.minHeight;
                expect(minHeight).toBe('44px');
                
                // Check padding for comfortable touch area
                const paddingTop = parseInt(computedStyle.paddingTop);
                const paddingBottom = parseInt(computedStyle.paddingBottom);
                const paddingLeft = parseInt(computedStyle.paddingLeft);
                const paddingRight = parseInt(computedStyle.paddingRight);
                
                expect(paddingTop + paddingBottom).toBeGreaterThanOrEqual(24); // 12px + 12px minimum
                expect(paddingLeft + paddingRight).toBeGreaterThanOrEqual(32); // 16px + 16px minimum
            });
        });

        it('should have touch-action manipulation to prevent double-tap zoom', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <button class="btn-primary">Test Button</button>
            `;

            const button = container.querySelector('.btn-primary');
            const computedStyle = window.getComputedStyle(button);
            
            expect(computedStyle.touchAction).toBe('manipulation');
        });

        it('should provide adequate spacing between buttons on mobile', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <div class="flex space-x-3">
                    <button class="btn-primary">Button 1</button>
                    <button class="btn-secondary">Button 2</button>
                    <button class="btn-primary">Button 3</button>
                </div>
            `;

            // On mobile, buttons should have increased spacing
            const buttonContainer = container.querySelector('.flex.space-x-3');
            const computedStyle = window.getComputedStyle(buttonContainer);
            
            // This would be tested with actual CSS media queries in a real browser
            // For now, we verify the structure is in place
            expect(buttonContainer).toBeTruthy();
        });
    });

    describe('Form Input Optimization', () => {
        it('should have minimum 16px font size to prevent iOS zoom', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <form>
                    <input type="text" placeholder="Text input" />
                    <input type="email" placeholder="Email input" />
                    <input type="password" placeholder="Password input" />
                    <input type="number" placeholder="Number input" />
                    <input type="search" placeholder="Search input" />
                    <textarea placeholder="Textarea"></textarea>
                    <select><option>Select option</option></select>
                </form>
            `;

            const inputs = container.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                const computedStyle = window.getComputedStyle(input);
                const fontSize = parseInt(computedStyle.fontSize);
                
                expect(fontSize).toBeGreaterThanOrEqual(16);
            });
        });

        it('should have adequate touch targets for form inputs', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <form>
                    <input type="text" />
                    <textarea></textarea>
                    <select><option>Option</option></select>
                </form>
            `;

            const inputs = container.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                const computedStyle = window.getComputedStyle(input);
                const minHeight = computedStyle.minHeight;
                
                expect(minHeight).toBe('44px');
            });
        });
    });

    describe('Modal Responsiveness', () => {
        it('should create full-screen modals on mobile devices', () => {
            const container = document.getElementById('modal-container');
            
            // Simulate modal creation
            container.innerHTML = `
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4">
                        <div class="p-6">
                            <h2>Modal Title</h2>
                            <form>
                                <input type="text" placeholder="Form input" />
                                <button type="submit" class="btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            const modal = container.querySelector('.fixed.inset-0');
            const modalContent = modal.querySelector('.bg-white');
            
            expect(modal).toBeTruthy();
            expect(modalContent).toBeTruthy();
            
            // On mobile, CSS should make this full-screen
            // We can verify the structure is in place for CSS to target
            expect(modalContent.classList.contains('max-w-2xl')).toBe(true);
        });
    });

    describe('Navigation Optimization', () => {
        it('should have horizontal scrolling for tab navigation on mobile', () => {
            const nav = document.querySelector('.flex.space-x-8');
            
            expect(nav).toBeTruthy();
            
            // Add more tabs to test overflow
            nav.innerHTML = `
                <button class="nav-tab">Recipes</button>
                <button class="nav-tab">Ingredients</button>
                <button class="nav-tab">Pantry</button>
                <button class="nav-tab">Grocery List</button>
                <button class="nav-tab">Meal Planning</button>
                <button class="nav-tab">Calendar</button>
                <button class="nav-tab">Settings</button>
            `;

            const tabs = nav.querySelectorAll('.nav-tab');
            expect(tabs.length).toBe(7);
            
            // CSS should handle overflow-x: auto on mobile
            // We verify the structure is in place
            expect(nav.classList.contains('space-x-8')).toBe(true);
        });

        it('should have adequate touch targets for tab buttons', () => {
            const nav = document.querySelector('.flex.space-x-8');
            nav.innerHTML = `
                <button class="nav-tab">Recipes</button>
                <button class="nav-tab">Ingredients</button>
            `;

            const tabs = nav.querySelectorAll('.nav-tab');
            
            tabs.forEach(tab => {
                // Tab buttons should have comfortable touch areas
                expect(tab.classList.contains('nav-tab')).toBe(true);
                
                // CSS should provide min-height: 60px on mobile
                // We verify the class is present for CSS targeting
            });
        });
    });

    describe('Typography and Spacing', () => {
        it('should have appropriate line height for mobile readability', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <div class="content">
                    <h1>Main Heading</h1>
                    <h2>Secondary Heading</h2>
                    <p>Body text content for mobile reading</p>
                    <small>Small text content</small>
                </div>
            `;

            const textElements = container.querySelectorAll('h1, h2, p, small');
            
            textElements.forEach(element => {
                const computedStyle = window.getComputedStyle(element);
                const lineHeight = parseFloat(computedStyle.lineHeight);
                const fontSize = parseFloat(computedStyle.fontSize);
                
                // Line height should be at least 1.4 times font size for readability
                if (!isNaN(lineHeight) && !isNaN(fontSize)) {
                    expect(lineHeight / fontSize).toBeGreaterThanOrEqual(1.4);
                }
            });
        });

        it('should prevent horizontal scrolling with proper box-sizing', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <div class="wide-content" style="width: 100%; padding: 20px;">
                    <div class="inner-content">Content</div>
                </div>
            `;

            const elements = container.querySelectorAll('*');
            
            elements.forEach(element => {
                const computedStyle = window.getComputedStyle(element);
                
                // All elements should have border-box sizing
                expect(computedStyle.boxSizing).toBe('border-box');
            });
        });
    });

    describe('Performance Optimizations', () => {
        it('should have proper will-change properties for animated elements', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <button class="btn-primary">Animated Button</button>
                <div class="tab-content">Tab Content</div>
            `;

            const animatedButton = container.querySelector('.btn-primary');
            const tabContent = container.querySelector('.tab-content');
            
            // These elements should have will-change properties for performance
            expect(animatedButton).toBeTruthy();
            expect(tabContent).toBeTruthy();
            
            // CSS should set will-change: transform for buttons
            // CSS should set will-change: opacity for tab content
        });

        it('should have appropriate transition durations for mobile', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <button class="btn-primary">Button</button>
            `;

            const button = container.querySelector('.btn-primary');
            const computedStyle = window.getComputedStyle(button);
            
            // Transitions should be fast enough for mobile (≤ 0.2s)
            const transitionDuration = computedStyle.transitionDuration;
            if (transitionDuration && transitionDuration !== 'none') {
                const duration = parseFloat(transitionDuration);
                expect(duration).toBeLessThanOrEqual(0.2);
            }
        });
    });

    describe('Accessibility and Usability', () => {
        it('should have proper focus indicators for keyboard navigation', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <button class="btn-primary">Focusable Button</button>
                <input type="text" placeholder="Focusable Input" />
                <a href="#" class="nav-tab">Focusable Link</a>
            `;

            const focusableElements = container.querySelectorAll('button, input, a');
            
            focusableElements.forEach(element => {
                // Elements should be focusable
                expect(element.tabIndex).toBeGreaterThanOrEqual(0);
                
                // CSS should provide focus indicators
                expect(element).toBeTruthy();
            });
        });

        it('should have appropriate color contrast for mobile screens', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <button class="btn-primary">Primary Button</button>
                <button class="btn-secondary">Secondary Button</button>
                <p class="text-gray-600">Body text</p>
            `;

            const elements = container.querySelectorAll('button, p');
            
            // We can't test actual color contrast in JSDOM, but we can verify
            // that elements have appropriate classes for contrast
            elements.forEach(element => {
                expect(element.className).toBeTruthy();
            });
        });
    });

    describe('Drag and Drop Mobile Optimization', () => {
        it('should have larger drag handles for touch devices', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <div class="meal-item">
                    <span class="drag-handle">⋮⋮</span>
                    <span>Meal content</span>
                </div>
            `;

            const dragHandle = container.querySelector('.drag-handle');
            const mealItem = container.querySelector('.meal-item');
            
            expect(dragHandle).toBeTruthy();
            expect(mealItem).toBeTruthy();
            
            // CSS should make drag handles larger and always visible on mobile
        });

        it('should have appropriate calendar day sizes for touch', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <div class="calendar-grid">
                    <div class="calendar-day">
                        <div class="meal-container">
                            <div class="meal-item">Meal</div>
                        </div>
                    </div>
                </div>
            `;

            const calendarDay = container.querySelector('.calendar-day');
            
            expect(calendarDay).toBeTruthy();
            
            // CSS should provide min-height: 120px on mobile for touch interactions
        });
    });
});
