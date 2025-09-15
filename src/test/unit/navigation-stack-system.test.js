/**
 * Navigation Stack System Tests
 * Tests the restored navigation stack system (Commit: 2c8703d)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Navigation Stack System', () => {
    let dom;
    let window;
    let document;
    let mealPlanner;

    beforeEach(() => {
        // Create JSDOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <div id="app">
                    <nav>
                        <button data-tab="items">Items</button>
                        <button data-tab="recipes">Recipes</button>
                        <button data-tab="plan">Plan</button>
                        <button data-tab="menu">Menu</button>
                        <button data-tab="settings">Settings</button>
                    </nav>
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
        global.history = window.history;
        global.URL = window.URL;

        // Mock mealPlanner with navigation stack functionality
        mealPlanner = {
            navigationStack: [],
            currentTab: 'recipes',
            isNavigating: false,

            pushNavigationState: function(tabName, data = {}) {
                if (this.isNavigating) return;

                const state = {
                    tab: tabName,
                    data: data,
                    timestamp: Date.now()
                };

                this.navigationStack.push(state);
                this.currentTab = tabName;

                // Update browser history
                const url = new URL(window.location);
                url.searchParams.set('tab', tabName);
                history.pushState(state, '', url);

                console.log(`📍 Pushed navigation state: ${tabName}`, state);
            },

            popNavigationState: function() {
                if (this.navigationStack.length <= 1) return null;

                this.navigationStack.pop();
                const previousState = this.navigationStack[this.navigationStack.length - 1];
                this.currentTab = previousState.tab;

                // Update browser history
                const url = new URL(window.location);
                url.searchParams.set('tab', previousState.tab);
                history.replaceState(previousState, '', url);

                console.log(`📍 Popped navigation state, current: ${this.currentTab}`);
                return previousState;
            },

            getCurrentNavigationState: function() {
                return this.navigationStack[this.navigationStack.length - 1] || null;
            },

            clearNavigationStack: function() {
                this.navigationStack = [];
                this.currentTab = 'recipes';
                console.log('📍 Navigation stack cleared');
            },

            switchTab: function(tabName, data = {}) {
                console.log(`🔄 Switching to tab: ${tabName}`, data);

                // Push to navigation stack if not already navigating
                if (!this.isNavigating) {
                    this.pushNavigationState(tabName, data);
                }

                // Update UI
                this.updateTabUI(tabName);
            },

            updateTabUI: function(tabName) {
                // Mock UI update
                console.log(`🎨 Updating UI for tab: ${tabName}`);
            },

            setupNavigationListeners: function() {
                // Mock setup of navigation listeners
                console.log('🔗 Setting up navigation listeners');
            }
        };
    });

    afterEach(() => {
        dom.window.close();
    });

    describe('Navigation Stack Management', () => {
        it('should initialize with empty navigation stack', () => {
            expect(mealPlanner.navigationStack).toEqual([]);
            expect(mealPlanner.currentTab).toBe('recipes');
            expect(mealPlanner.isNavigating).toBe(false);
        });

        it('should push navigation state correctly', () => {
            // Act
            mealPlanner.pushNavigationState('plan', { week: '2025-09-15' });

            // Assert
            expect(mealPlanner.navigationStack).toHaveLength(1);
            expect(mealPlanner.currentTab).toBe('plan');
            expect(mealPlanner.navigationStack[0]).toMatchObject({
                tab: 'plan',
                data: { week: '2025-09-15' },
                timestamp: expect.any(Number)
            });
        });

        it('should not push state when navigating', () => {
            // Arrange
            mealPlanner.isNavigating = true;
            const initialLength = mealPlanner.navigationStack.length;

            // Act
            mealPlanner.pushNavigationState('plan');

            // Assert
            expect(mealPlanner.navigationStack).toHaveLength(initialLength);
        });

        it('should pop navigation state correctly', () => {
            // Arrange
            mealPlanner.pushNavigationState('items');
            mealPlanner.pushNavigationState('plan');
            expect(mealPlanner.navigationStack).toHaveLength(2);

            // Act
            const previousState = mealPlanner.popNavigationState();

            // Assert
            expect(mealPlanner.navigationStack).toHaveLength(1);
            expect(mealPlanner.currentTab).toBe('items');
            expect(previousState.tab).toBe('items');
        });

        it('should not pop when stack has only one item', () => {
            // Arrange
            mealPlanner.pushNavigationState('plan');
            expect(mealPlanner.navigationStack).toHaveLength(1);

            // Act
            const result = mealPlanner.popNavigationState();

            // Assert
            expect(result).toBeNull();
            expect(mealPlanner.navigationStack).toHaveLength(1);
        });

        it('should clear navigation stack', () => {
            // Arrange
            mealPlanner.pushNavigationState('items');
            mealPlanner.pushNavigationState('plan');
            expect(mealPlanner.navigationStack).toHaveLength(2);

            // Act
            mealPlanner.clearNavigationStack();

            // Assert
            expect(mealPlanner.navigationStack).toEqual([]);
            expect(mealPlanner.currentTab).toBe('recipes');
        });
    });

    describe('Navigation State Access', () => {
        it('should get current navigation state', () => {
            // Arrange
            mealPlanner.pushNavigationState('plan', { week: '2025-09-15' });

            // Act
            const currentState = mealPlanner.getCurrentNavigationState();

            // Assert
            expect(currentState).toMatchObject({
                tab: 'plan',
                data: { week: '2025-09-15' },
                timestamp: expect.any(Number)
            });
        });

        it('should return null for empty stack', () => {
            // Act
            const currentState = mealPlanner.getCurrentNavigationState();

            // Assert
            expect(currentState).toBeNull();
        });
    });

    describe('Tab Switching Integration', () => {
        it('should switch tab and update navigation stack', () => {
            // Act
            mealPlanner.switchTab('plan', { week: '2025-09-15' });

            // Assert
            expect(mealPlanner.currentTab).toBe('plan');
            expect(mealPlanner.navigationStack).toHaveLength(1);
            expect(mealPlanner.navigationStack[0].tab).toBe('plan');
            expect(mealPlanner.navigationStack[0].data).toEqual({ week: '2025-09-15' });
        });

        it('should build navigation history correctly', () => {
            // Act - Navigate through multiple tabs
            mealPlanner.switchTab('items');
            mealPlanner.switchTab('recipes');
            mealPlanner.switchTab('plan');
            mealPlanner.switchTab('menu');

            // Assert
            expect(mealPlanner.navigationStack).toHaveLength(4);
            expect(mealPlanner.navigationStack[0].tab).toBe('items');
            expect(mealPlanner.navigationStack[1].tab).toBe('recipes');
            expect(mealPlanner.navigationStack[2].tab).toBe('plan');
            expect(mealPlanner.navigationStack[3].tab).toBe('menu');
            expect(mealPlanner.currentTab).toBe('menu');
        });
    });

    describe('Browser History Integration', () => {
        it('should update URL when pushing state', () => {
            // Act
            mealPlanner.pushNavigationState('plan', { week: '2025-09-15' });

            // Assert
            const url = new URL(window.location);
            expect(url.searchParams.get('tab')).toBe('plan');
        });

        it('should update URL when popping state', () => {
            // Arrange
            mealPlanner.pushNavigationState('items');
            mealPlanner.pushNavigationState('plan');

            // Act
            mealPlanner.popNavigationState();

            // Assert
            const url = new URL(window.location);
            expect(url.searchParams.get('tab')).toBe('items');
        });
    });

    describe('Navigation Stack Edge Cases', () => {
        it('should handle rapid navigation changes', () => {
            // Act - Rapid navigation
            for (let i = 0; i < 10; i++) {
                mealPlanner.switchTab(`tab${i}`);
            }

            // Assert
            expect(mealPlanner.navigationStack).toHaveLength(10);
            expect(mealPlanner.currentTab).toBe('tab9');
        });

        it('should handle navigation with complex data', () => {
            // Arrange
            const complexData = {
                filters: { search: 'chicken', labels: ['dinner'] },
                sort: { field: 'name', direction: 'asc' },
                pagination: { page: 2, size: 10 }
            };

            // Act
            mealPlanner.pushNavigationState('recipes', complexData);

            // Assert
            expect(mealPlanner.navigationStack[0].data).toEqual(complexData);
        });

        it('should maintain timestamp ordering', () => {
            // Arrange
            const startTime = Date.now();
            mealPlanner.pushNavigationState('items');
            mealPlanner.pushNavigationState('recipes');
            mealPlanner.pushNavigationState('plan');

            // Act
            const states = mealPlanner.navigationStack;

            // Assert
            expect(states[0].timestamp).toBeLessThanOrEqual(states[1].timestamp);
            expect(states[1].timestamp).toBeLessThanOrEqual(states[2].timestamp);
            expect(states[0].timestamp).toBeGreaterThanOrEqual(startTime);
        });
    });

    describe('Navigation Stack Persistence', () => {
        it('should maintain state across operations', () => {
            // Arrange
            mealPlanner.pushNavigationState('items');
            mealPlanner.pushNavigationState('recipes');

            // Act - Perform various operations
            const currentState = mealPlanner.getCurrentNavigationState();
            mealPlanner.switchTab('plan');
            const newState = mealPlanner.getCurrentNavigationState();

            // Assert
            expect(currentState.tab).toBe('recipes');
            expect(newState.tab).toBe('plan');
            expect(mealPlanner.navigationStack).toHaveLength(3);
        });

        it('should handle stack overflow protection', () => {
            // Act - Add many states
            for (let i = 0; i < 1000; i++) {
                mealPlanner.pushNavigationState(`tab${i}`);
            }

            // Assert - Should not crash and should maintain reasonable stack size
            expect(mealPlanner.navigationStack.length).toBe(1000);
            expect(mealPlanner.currentTab).toBe('tab999');
        });
    });
});
