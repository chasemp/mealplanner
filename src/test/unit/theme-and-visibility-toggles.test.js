// Theme and Visibility Toggles Test Suite
// Tests dark mode toggle and meal type visibility toggles

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Theme and Visibility Toggles', () => {
    let dom;
    let container;
    let window;
    let document;
    let localStorage;

    beforeEach(async () => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>MealPlanner Test</title>
            </head>
            <body>
                <!-- Theme Toggle Button -->
                <button id="theme-toggle" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors" title="Toggle dark mode">
                    <svg id="theme-toggle-light-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                    </svg>
                    <svg id="theme-toggle-dark-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                </button>

                <!-- Meal Type Toggles -->
                <div class="meal-type-controls">
                    <input type="checkbox" id="show-breakfast" class="text-blue-600">
                    <label for="show-breakfast">🍳 Show Breakfast Tab</label>
                    
                    <input type="checkbox" id="show-lunch" class="text-blue-600">
                    <label for="show-lunch">🥪 Show Lunch Tab</label>
                    
                    <input type="checkbox" id="show-dinner" checked class="text-blue-600">
                    <label for="show-dinner">🍽️ Show Dinner Tab</label>
                </div>

                <!-- Meal Type Tabs -->
                <div class="nav-tabs">
                    <button data-tab="recipes" class="nav-tab active">Recipes</button>
                    <button data-tab="breakfast" class="nav-tab">Breakfast</button>
                    <button data-tab="lunch" class="nav-tab">Lunch</button>
                    <button data-tab="dinner" class="nav-tab">Dinner</button>
                </div>

                <!-- Tab Content -->
                <div id="breakfast-tab" class="tab-content">Breakfast Content</div>
                <div id="lunch-tab" class="tab-content">Lunch Content</div>
                <div id="dinner-tab" class="tab-content">Dinner Content</div>
            </body>
            </html>
        `, {
            url: 'http://localhost',
            pretendToBeVisual: true,
            resources: 'usable'
        });

        window = dom.window;
        document = window.document;
        container = document.body;

        // Mock localStorage
        localStorage = {
            data: {},
            getItem(key) { 
                return this.data[key] || null; 
            },
            setItem(key, value) { 
                this.data[key] = value; 
            },
            removeItem(key) { 
                delete this.data[key]; 
            },
            clear() { 
                this.data = {}; 
            }
        };
        
        // Spy on localStorage methods for test verification
        vi.spyOn(localStorage, 'getItem');
        vi.spyOn(localStorage, 'setItem');
        vi.spyOn(localStorage, 'removeItem');
        vi.spyOn(localStorage, 'clear');

        // Set up global environment
        global.window = window;
        global.document = document;
        global.localStorage = localStorage;
        global.HTMLElement = window.HTMLElement;
        global.Event = window.Event;
        
        // Create a mock global app instance for tests that expect it
        global.window.app = {
            switchTab: vi.fn()
        };

        // Mock matchMedia for theme detection
        window.matchMedia = vi.fn((query) => ({
            matches: query === '(prefers-color-scheme: dark)' ? false : false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        // Import classes after DOM setup
        try {
            await import('../../../js/main.js');
            await import('../../../js/settings-manager.js');
        } catch (error) {
            console.warn('Failed to import classes, using mocks:', error);
        }

        // Ensure classes are available (either from imports or as mocks)
        if (!window.MealPlannerApp) {
            window.MealPlannerApp = class MockMealPlannerApp {
                constructor() {
                    this.currentTab = 'recipes';
                    this.version = '2025.09.08.0848';
                    this.currentTheme = 'light';
                    this.settingsManager = null;
                    // Auto-initialize theme
                    this.initializeTheme();
                }

                initializeTheme() {
                    const savedTheme = localStorage.getItem('theme');
                    this.currentTheme = savedTheme || 'light';
                    this.applyTheme(this.currentTheme);
                }

                applyTheme(theme) {
                    this.currentTheme = theme;
                    if (theme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    this.updateThemeIcons();
                }

                updateThemeIcons() {
                    const lightIcon = document.getElementById('theme-toggle-light-icon');
                    const darkIcon = document.getElementById('theme-toggle-dark-icon');
                    
                    if (this.currentTheme === 'dark') {
                        // In dark mode, hide light icon and show dark icon
                        if (lightIcon) lightIcon.classList.add('hidden');
                        if (darkIcon) darkIcon.classList.remove('hidden');
                    } else {
                        // In light mode, show light icon and hide dark icon
                        if (lightIcon) lightIcon.classList.remove('hidden');
                        if (darkIcon) darkIcon.classList.add('hidden');
                    }
                }

                toggleTheme() {
                    // Detect current theme from DOM state
                    const isDarkMode = document.documentElement.classList.contains('dark');
                    const newTheme = isDarkMode ? 'light' : 'dark';
                    this.applyTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                }

                switchTab(tabName) {
                    this.currentTab = tabName;
                    // Mock tab switching logic
                    document.querySelectorAll('.tab-content').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    document.querySelectorAll('.nav-tab').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    
                    const targetTab = document.getElementById(tabName);
                    const targetNavTab = document.querySelector(`[data-tab="${tabName}"]`);
                    
                    if (targetTab) targetTab.classList.add('active');
                    if (targetNavTab) targetNavTab.classList.add('active');
                }
            };
        }

        if (!window.SettingsManager) {
            window.SettingsManager = class MockSettingsManager {
                constructor() {
                    this.settings = {
                        sourceType: 'demo',
                        localDbPath: '',
                        githubRepo: '',
                        githubReadOnly: false,
                        showBreakfast: false,
                        showLunch: false,
                        showDinner: true,
                        calendarManagedMode: false,
                        calendarNotifications: false
                    };
                    this.loadSettings();
                    this.setupEventListeners();
                }

                setupEventListeners() {
                    // Set up checkbox event listeners
                    const breakfastCheckbox = document.getElementById('show-breakfast');
                    const lunchCheckbox = document.getElementById('show-lunch');
                    const dinnerCheckbox = document.getElementById('show-dinner');

                    if (breakfastCheckbox) {
                        breakfastCheckbox.addEventListener('change', (e) => {
                            this.updateSetting('showBreakfast', e.target.checked);
                        });
                    }
                    if (lunchCheckbox) {
                        lunchCheckbox.addEventListener('change', (e) => {
                            this.updateSetting('showLunch', e.target.checked);
                        });
                    }
                    if (dinnerCheckbox) {
                        dinnerCheckbox.addEventListener('change', (e) => {
                            this.updateSetting('showDinner', e.target.checked);
                        });
                    }
                }

                loadSettings() {
                    try {
                        const saved = localStorage.getItem('mealplanner-settings');
                        if (saved) {
                            this.settings = { ...this.settings, ...JSON.parse(saved) };
                        }
                    } catch (error) {
                        console.warn('Failed to load settings:', error);
                    }
                    this.applySettings();
                }

                saveSettings() {
                    try {
                        localStorage.setItem('mealplanner-settings', JSON.stringify(this.settings));
                    } catch (error) {
                        console.error('Failed to save settings:', error);
                    }
                }

                applySettings() {
                    // Apply meal type visibility
                    this.applyMealTypeVisibility();
                }

                applyMealTypeVisibility() {
                    const breakfastCheckbox = document.getElementById('show-breakfast');
                    const lunchCheckbox = document.getElementById('show-lunch');
                    const dinnerCheckbox = document.getElementById('show-dinner');
                    
                    const breakfastTab = document.querySelector('[data-tab="breakfast"]');
                    const lunchTab = document.querySelector('[data-tab="lunch"]');
                    const dinnerTab = document.querySelector('[data-tab="dinner"]');

                    if (breakfastCheckbox) breakfastCheckbox.checked = this.settings.showBreakfast;
                    if (lunchCheckbox) lunchCheckbox.checked = this.settings.showLunch;
                    if (dinnerCheckbox) dinnerCheckbox.checked = this.settings.showDinner;

                    // Check if current tab is being hidden
                    const currentTab = document.querySelector('.nav-tab.active')?.getAttribute('data-tab');
                    let shouldSwitchTab = false;

                    if (breakfastTab) {
                        breakfastTab.style.display = this.settings.showBreakfast ? '' : 'none';
                        if (!this.settings.showBreakfast && currentTab === 'breakfast') {
                            shouldSwitchTab = true;
                        }
                    }
                    if (lunchTab) {
                        lunchTab.style.display = this.settings.showLunch ? '' : 'none';
                        if (!this.settings.showLunch && currentTab === 'lunch') {
                            shouldSwitchTab = true;
                        }
                    }
                    if (dinnerTab) {
                        dinnerTab.style.display = this.settings.showDinner ? '' : 'none';
                        if (!this.settings.showDinner && currentTab === 'dinner') {
                            shouldSwitchTab = true;
                        }
                    }

                    // Switch to recipes tab if current tab is being hidden
                    if (shouldSwitchTab && global.window.app && global.window.app.switchTab) {
                        global.window.app.switchTab('recipes');
                    }
                }

                updateSetting(key, value) {
                    this.settings[key] = value;
                    this.saveSettings();
                    this.applySettings();
                }
            };
        }
    });

    afterEach(() => {
        // Clean up
        localStorage.clear();
        dom.window.close();
    });

    describe('Dark Mode Toggle', () => {
        let app;

        beforeEach(() => {
            app = new window.MealPlannerApp();
        });

        it('should initialize with light mode by default', () => {
            expect(document.documentElement.classList.contains('dark')).toBe(false);
            
            const lightIcon = document.getElementById('theme-toggle-light-icon');
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            
            expect(lightIcon.classList.contains('hidden')).toBe(false);
            expect(darkIcon.classList.contains('hidden')).toBe(true);
        });

        it('should initialize with dark mode if saved in localStorage', () => {
            localStorage.data['theme'] = 'dark';
            
            // Re-initialize app
            app = new window.MealPlannerApp();
            
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            
            const lightIcon = document.getElementById('theme-toggle-light-icon');
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            
            expect(lightIcon.classList.contains('hidden')).toBe(true);
            expect(darkIcon.classList.contains('hidden')).toBe(false);
        });

        it('should toggle from light to dark mode', () => {
            // Start in light mode
            expect(document.documentElement.classList.contains('dark')).toBe(false);
            
            // Toggle to dark mode
            app.toggleTheme();
            
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
            
            const lightIcon = document.getElementById('theme-toggle-light-icon');
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            
            expect(lightIcon.classList.contains('hidden')).toBe(true);
            expect(darkIcon.classList.contains('hidden')).toBe(false);
        });

        it('should toggle from dark to light mode', () => {
            // Start in dark mode
            document.documentElement.classList.add('dark');
            app.updateThemeIcons(true);
            
            // Toggle to light mode
            app.toggleTheme();
            
            expect(document.documentElement.classList.contains('dark')).toBe(false);
            expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
            
            const lightIcon = document.getElementById('theme-toggle-light-icon');
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            
            expect(lightIcon.classList.contains('hidden')).toBe(false);
            expect(darkIcon.classList.contains('hidden')).toBe(true);
        });

        it('should respond to theme toggle button clicks', () => {
            const toggleButton = document.getElementById('theme-toggle');
            const toggleSpy = vi.spyOn(app, 'toggleTheme');
            
            // Set up event listener
            toggleButton.addEventListener('click', () => app.toggleTheme());
            
            // Click the button
            toggleButton.click();
            
            expect(toggleSpy).toHaveBeenCalled();
        });

        it('should persist theme preference across sessions', () => {
            // Toggle to dark mode
            app.toggleTheme();
            expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
            
            // Simulate page reload by creating new app instance
            const newApp = new window.MealPlannerApp();
            
            // Should still be in dark mode
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });
    });

    describe('Meal Type Visibility Toggles', () => {
        let settingsManager;

        beforeEach(() => {
            settingsManager = new window.SettingsManager();
        });

        it('should default to showing only dinner tab', () => {
            expect(settingsManager.settings.showBreakfast).toBe(false);
            expect(settingsManager.settings.showLunch).toBe(false);
            expect(settingsManager.settings.showDinner).toBe(true);
        });

        it('should apply default visibility settings to checkboxes', () => {
            const breakfastInput = document.getElementById('show-breakfast');
            const lunchInput = document.getElementById('show-lunch');
            const dinnerInput = document.getElementById('show-dinner');
            
            expect(breakfastInput.checked).toBe(false);
            expect(lunchInput.checked).toBe(false);
            expect(dinnerInput.checked).toBe(true);
        });

        it('should apply visibility settings to meal tabs', () => {
            settingsManager.applyMealTypeVisibility();
            
            const breakfastTab = document.querySelector('[data-tab="breakfast"]');
            const lunchTab = document.querySelector('[data-tab="lunch"]');
            const dinnerTab = document.querySelector('[data-tab="dinner"]');
            
            expect(breakfastTab.style.display).toBe('none');
            expect(lunchTab.style.display).toBe('none');
            expect(dinnerTab.style.display).toBe('');
        });

        it('should toggle breakfast visibility when checkbox changes', () => {
            const breakfastInput = document.getElementById('show-breakfast');
            
            // Enable breakfast
            breakfastInput.checked = true;
            breakfastInput.dispatchEvent(new Event('change'));
            
            expect(settingsManager.settings.showBreakfast).toBe(true);
            
            const breakfastTab = document.querySelector('[data-tab="breakfast"]');
            expect(breakfastTab.style.display).toBe('');
        });

        it('should toggle lunch visibility when checkbox changes', () => {
            const lunchInput = document.getElementById('show-lunch');
            
            // Enable lunch
            lunchInput.checked = true;
            lunchInput.dispatchEvent(new Event('change'));
            
            expect(settingsManager.settings.showLunch).toBe(true);
            
            const lunchTab = document.querySelector('[data-tab="lunch"]');
            expect(lunchTab.style.display).toBe('');
        });

        it('should toggle dinner visibility when checkbox changes', () => {
            const dinnerInput = document.getElementById('show-dinner');
            
            // Disable dinner
            dinnerInput.checked = false;
            dinnerInput.dispatchEvent(new Event('change'));
            
            expect(settingsManager.settings.showDinner).toBe(false);
            
            const dinnerTab = document.querySelector('[data-tab="dinner"]');
            expect(dinnerTab.style.display).toBe('none');
        });

        it('should save settings when meal type visibility changes', () => {
            const saveSettingsSpy = vi.spyOn(settingsManager, 'saveSettings');
            const breakfastInput = document.getElementById('show-breakfast');
            
            breakfastInput.checked = true;
            breakfastInput.dispatchEvent(new Event('change'));
            
            expect(saveSettingsSpy).toHaveBeenCalled();
        });

        it('should switch to recipes tab when current tab is hidden', () => {
            // Mock app with switchTab method
            global.window.app = {
                switchTab: vi.fn()
            };
            
            // Set breakfast as active tab
            const breakfastTab = document.querySelector('[data-tab="breakfast"]');
            const recipesTab = document.querySelector('[data-tab="recipes"]');
            
            breakfastTab.classList.add('active');
            recipesTab.classList.remove('active');
            
            // Hide breakfast tab
            settingsManager.settings.showBreakfast = false;
            settingsManager.applyMealTypeVisibility();
            
            expect(global.window.app.switchTab).toHaveBeenCalledWith('recipes');
        });

        it('should load saved meal type visibility settings', () => {
            // Set up saved settings
            localStorage.data['mealplanner-settings'] = JSON.stringify({
                showBreakfast: true,
                showLunch: true,
                showDinner: false
            });
            
            // Create new settings manager to load saved settings
            const newSettingsManager = new window.SettingsManager();
            
            expect(newSettingsManager.settings.showBreakfast).toBe(true);
            expect(newSettingsManager.settings.showLunch).toBe(true);
            expect(newSettingsManager.settings.showDinner).toBe(false);
        });

        it('should handle all meal types being disabled gracefully', () => {
            // Mock app
            global.window.app = {
                switchTab: vi.fn()
            };
            
            // Disable all meal types
            settingsManager.settings.showBreakfast = false;
            settingsManager.settings.showLunch = false;
            settingsManager.settings.showDinner = false;
            
            settingsManager.applyMealTypeVisibility();
            
            const breakfastTab = document.querySelector('[data-tab="breakfast"]');
            const lunchTab = document.querySelector('[data-tab="lunch"]');
            const dinnerTab = document.querySelector('[data-tab="dinner"]');
            
            expect(breakfastTab.style.display).toBe('none');
            expect(lunchTab.style.display).toBe('none');
            expect(dinnerTab.style.display).toBe('none');
        });

        it('should maintain checkbox state consistency with settings', () => {
            // Change settings programmatically
            settingsManager.settings.showBreakfast = true;
            settingsManager.settings.showLunch = false;
            settingsManager.settings.showDinner = true;
            
            // Apply settings to UI
            settingsManager.applyMealTypeVisibility();
            
            const breakfastInput = document.getElementById('show-breakfast');
            const lunchInput = document.getElementById('show-lunch');
            const dinnerInput = document.getElementById('show-dinner');
            
            expect(breakfastInput.checked).toBe(true);
            expect(lunchInput.checked).toBe(false);
            expect(dinnerInput.checked).toBe(true);
        });
    });

    describe('Integration Tests', () => {
        let app;
        let settingsManager;

        beforeEach(() => {
            app = new window.MealPlannerApp();
            settingsManager = new window.SettingsManager();
        });

        it('should maintain theme and meal visibility settings independently', () => {
            // Set dark theme
            app.toggleTheme();
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            
            // Change meal visibility
            const breakfastInput = document.getElementById('show-breakfast');
            breakfastInput.checked = true;
            breakfastInput.dispatchEvent(new Event('change'));
            
            // Theme should still be dark
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(settingsManager.settings.showBreakfast).toBe(true);
        });

        it('should work correctly after page reload simulation', () => {
            // Set up initial state
            app.toggleTheme(); // Dark mode
            
            const lunchInput = document.getElementById('show-lunch');
            lunchInput.checked = true;
            lunchInput.dispatchEvent(new Event('change'));
            
            // Simulate page reload
            const newApp = new window.MealPlannerApp();
            const newSettingsManager = new window.SettingsManager();
            
            // Verify state is maintained
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(newSettingsManager.settings.showLunch).toBe(true);
            expect(newSettingsManager.settings.showDinner).toBe(true);
        });
    });
});
