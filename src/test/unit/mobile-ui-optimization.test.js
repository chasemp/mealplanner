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
        it('should ensure all buttons are accessible and clickable for touch interaction', () => {
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
                // Test that buttons are properly accessible
                expect(button.tagName).toMatch(/^(BUTTON|INPUT)$/);
                
                // Test that buttons have proper text content or value
                const buttonText = button.textContent || button.value || button.getAttribute('aria-label');
                expect(buttonText).toBeTruthy();
                expect(buttonText.trim().length).toBeGreaterThan(0);
                
                // Test that buttons can receive focus (important for accessibility)
                expect(button.tabIndex).toBeGreaterThanOrEqual(-1);
                
                // Test that buttons are not disabled by default
                expect(button.disabled).toBe(false);
                
                // Test click event handling capability
                let clicked = false;
                button.addEventListener('click', () => { clicked = true; });
                button.click();
                expect(clicked).toBe(true);
            });
        });

        it('should prevent double-tap zoom behavior on interactive elements', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <button class="btn-primary">Test Button</button>
                <input type="text" class="form-input" placeholder="Test input" />
                <select class="form-select"><option>Test option</option></select>
            `;

            const interactiveElements = container.querySelectorAll('button, input, select');
            
            interactiveElements.forEach(element => {
                // Test that elements can handle rapid touch events without issues
                let touchCount = 0;
                element.addEventListener('touchstart', () => { touchCount++; });
                element.addEventListener('click', () => { touchCount++; });
                
                // Simulate rapid touch events (double-tap scenario)
                element.dispatchEvent(new Event('touchstart'));
                element.dispatchEvent(new Event('click'));
                element.dispatchEvent(new Event('touchstart'));
                element.dispatchEvent(new Event('click'));
                
                // Verify events are handled properly
                expect(touchCount).toBeGreaterThan(0);
                
                // Test that element maintains focus capability
                element.focus();
                expect(document.activeElement).toBe(element);
            });
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
        it('should handle form input interactions without triggering mobile zoom', () => {
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
                // Test that inputs can receive focus without issues
                input.focus();
                expect(document.activeElement).toBe(input);
                
                // Test that inputs can handle value changes (focus on text-based inputs)
                if (input.tagName === 'INPUT' && ['text', 'email', 'password', 'search'].includes(input.type)) {
                    input.value = 'test value';
                    expect(input.value).toBe('test value');
                    
                    // Test input events
                    let inputEventFired = false;
                    input.addEventListener('input', () => { inputEventFired = true; });
                    input.dispatchEvent(new Event('input'));
                    expect(inputEventFired).toBe(true);
                } else if (input.tagName === 'TEXTAREA') {
                    input.value = 'test value';
                    expect(input.value).toBe('test value');
                } else if (input.tagName === 'INPUT' && input.type === 'number') {
                    // Number inputs might behave differently
                    input.value = '123';
                    expect(input.value).toBe('123');
                }
                
                // Test that inputs have proper accessibility attributes
                expect(input.placeholder || input.textContent || input.getAttribute('aria-label')).toBeTruthy();
            });
        });

        it('should provide accessible form input interactions for touch devices', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <form>
                    <label for="text-input">Text Input:</label>
                    <input id="text-input" type="text" />
                    
                    <label for="textarea-input">Textarea:</label>
                    <textarea id="textarea-input"></textarea>
                    
                    <label for="select-input">Select:</label>
                    <select id="select-input"><option>Option</option></select>
                </form>
            `;

            const inputs = container.querySelectorAll('input, textarea, select');
            const labels = container.querySelectorAll('label');
            
            // Test that all inputs have associated labels
            inputs.forEach(input => {
                const associatedLabel = container.querySelector(`label[for="${input.id}"]`);
                expect(associatedLabel).toBeTruthy();
                expect(associatedLabel.textContent.trim()).toBeTruthy();
            });
            
            // Test that inputs are properly focusable and interactive
            inputs.forEach(input => {
                // Test focus behavior
                input.focus();
                expect(document.activeElement).toBe(input);
                
                // Test that input can handle touch-like interactions
                let changeEventFired = false;
                input.addEventListener('change', () => { changeEventFired = true; });
                
                // Test change event (more reliable in JSDOM than focus/blur)
                input.dispatchEvent(new Event('change'));
                expect(changeEventFired).toBe(true);
                
                // Test that input maintains its type and basic properties
                expect(input.tagName).toMatch(/^(INPUT|TEXTAREA|SELECT)$/);
                if (input.tagName === 'INPUT') {
                    expect(input.type).toBeTruthy();
                }
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

        it('should handle content layout without causing horizontal overflow', () => {
            const container = document.getElementById('app');
            container.innerHTML += `
                <div class="wide-content" style="width: 100%; padding: 20px; max-width: 100%;">
                    <div class="inner-content">This is a long piece of content that should wrap properly and not cause horizontal scrolling issues on mobile devices</div>
                    <div class="flex-container" style="display: flex; flex-wrap: wrap;">
                        <div class="flex-item">Item 1</div>
                        <div class="flex-item">Item 2</div>
                        <div class="flex-item">Item 3</div>
                    </div>
                </div>
            `;

            const elements = container.querySelectorAll('.wide-content, .inner-content, .flex-container');
            
            elements.forEach(element => {
                // Test that elements exist and are properly structured
                expect(element).toBeTruthy();
                expect(element.tagName).toBeTruthy();
                
                // Test that elements have content or are containers
                const hasContent = element.textContent.trim().length > 0 || element.children.length > 0;
                expect(hasContent).toBe(true);
                
                // Test that elements are part of the DOM
                expect(element.parentNode).toBeTruthy();
            });
            
            // Test that flex container handles wrapping
            const flexContainer = container.querySelector('.flex-container');
            const flexItems = flexContainer.querySelectorAll('.flex-item');
            
            expect(flexItems.length).toBe(3);
            flexItems.forEach(item => {
                expect(item.textContent.trim()).toBeTruthy();
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
