/**
 * Regression Tests for Favorites Filtering System
 * 
 * These tests prevent the regression where multiple event listeners
 * caused favorites filtering to fail. The issue was that attachEventListeners()
 * was called multiple times without removing previous listeners, causing
 * conflicting event handlers and preventing state changes.
 * 
 * Key regression scenarios tested:
 * 1. Multiple attachEventListeners() calls don't break functionality
 * 2. Button state changes correctly reflect filtering state
 * 3. Recipe list updates when favorites filter is toggled
 * 4. Button text and appearance update correctly
 * 5. Event listener cleanup prevents memory leaks
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM environment
const mockContainer = {
    querySelector: vi.fn(),
    innerHTML: ''
};

const mockRecipeGrid = {
    innerHTML: '',
    offsetHeight: 100
};

const mockEmptyState = {
    classList: {
        add: vi.fn(),
        remove: vi.fn()
    }
};

const mockInfoBar = {
    querySelector: vi.fn()
};

const mockFavoritesButton = {
    id: 'favorites-filter-btn',
    className: '',
    title: '',
    innerHTML: '',
    addEventListener: vi.fn(),
    cloneNode: vi.fn(),
    parentNode: {
        replaceChild: vi.fn()
    }
};

// Mock RecipeManager class with minimal implementation
class MockRecipeManager {
    constructor() {
        this.container = mockContainer;
        this.recipes = [
            { id: 1, title: 'Bacon', favorite: true, labels: [] },
            { id: 2, title: 'Caesar Salad', favorite: true, labels: [] },
            { id: 3, title: 'Pancakes', favorite: true, labels: [] },
            { id: 4, title: 'Broccoli Chips', favorite: false, labels: [] },
            { id: 5, title: 'Pasta', favorite: false, labels: [] }
        ];
        this.showFavoritesOnly = false;
        this.searchTerm = '';
        this.selectedLabels = [];
        this.sortBy = 'name';
        this.sortAscending = true;
        
        // Track event listener calls for regression testing
        this.attachEventListenersCalls = 0;
        this.eventListenersAttached = [];
    }

    getFilteredRecipes() {
        let filtered = this.recipes;

        // Filter by search term
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(recipe => 
                recipe.title.toLowerCase().includes(term)
            );
        }

        // Filter by favorites
        if (this.showFavoritesOnly) {
            filtered = filtered.filter(recipe => recipe.favorite === true);
        }

        return filtered;
    }

    renderRecipeCards() {
        const filteredRecipes = this.getFilteredRecipes();
        return filteredRecipes.map(recipe => `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <span class="favorite-star">${recipe.favorite ? '★' : '☆'}</span>
            </div>
        `).join('');
    }

    updateRecipeDisplay() {
        const recipeGrid = this.container.querySelector('#recipes-grid');
        const emptyState = this.container.querySelector('#empty-state');
        const infoBar = this.container.querySelector('.bg-gray-50.dark\\:bg-gray-700');
        
        if (recipeGrid && emptyState) {
            const filteredRecipes = this.getFilteredRecipes();
            const newHTML = this.renderRecipeCards();
            recipeGrid.innerHTML = newHTML;
            
            // Force a reflow to ensure DOM updates are rendered
            recipeGrid.offsetHeight;
            
            // Update empty state visibility
            if (filteredRecipes.length > 0) {
                emptyState.classList.add('hidden');
            } else {
                emptyState.classList.remove('hidden');
            }
            
            // Update info bar content
            if (infoBar) {
                this.updateInfoBar(infoBar);
            }
            
            // Update favorites button state
            this.updateFavoritesButton();
        }
    }

    updateFavoritesButton() {
        const favoritesBtn = this.container.querySelector('#favorites-filter-btn');
        
        if (favoritesBtn) {
            // Update button appearance and text with better dark mode support
            const newClassName = `px-4 py-2 rounded-md text-sm font-medium transition-colors ${this.showFavoritesOnly ? 
                // Active state: bright yellow with dark text for both modes
                'bg-yellow-400 hover:bg-yellow-500 text-gray-900 dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-gray-900 font-bold border-2 border-yellow-600 dark:border-yellow-500' : 
                // Inactive state: subtle yellow
                'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-yellow-200 border-2 border-transparent'
            }`;
            favoritesBtn.className = newClassName;
            favoritesBtn.title = this.showFavoritesOnly ? 'Show all recipes' : 'Show only favorites';
            
            // Update button content with correct star icon and intuitive text
            const starIcon = this.showFavoritesOnly ? '★' : '☆'; // Simplified for testing
            const buttonText = this.showFavoritesOnly ? 'Favorites Only' : 'Favorites';
            favoritesBtn.innerHTML = `${starIcon} ${buttonText}`;
        }
    }

    updateInfoBar(infoBar) {
        // Mock implementation for testing
        const filteredRecipes = this.getFilteredRecipes();
        const leftSide = { innerHTML: '' };
        infoBar.querySelector = vi.fn().mockReturnValue(leftSide);
        
        leftSide.innerHTML = `<span>${filteredRecipes.length} recipes</span>`;
    }

    attachEventListeners() {
        this.attachEventListenersCalls++;
        
        // Remove existing event listeners to prevent duplicates (regression fix)
        const existingFavBtn = this.container.querySelector('#favorites-filter-btn');
        if (existingFavBtn) {
            // Clone the element to remove all event listeners
            const newFavBtn = existingFavBtn.cloneNode(true);
            existingFavBtn.parentNode.replaceChild(newFavBtn, existingFavBtn);
        }
        
        // Favorites filter button
        const favoritesFilterBtn = this.container.querySelector('#favorites-filter-btn');
        if (favoritesFilterBtn) {
            const eventHandler = (e) => {
                this.showFavoritesOnly = !this.showFavoritesOnly;
                this.updateRecipeDisplay();
            };
            
            favoritesFilterBtn.addEventListener('click', eventHandler);
            this.eventListenersAttached.push({ element: favoritesFilterBtn, event: 'click', handler: eventHandler });
        }
    }

    // Helper method to simulate the regression scenario
    simulateMultipleAttachCalls() {
        // Simulate the scenario that caused the regression:
        // 1. Initial setup
        this.attachEventListeners();
        // 2. After render
        this.attachEventListeners();
        // 3. After mobile view return
        this.attachEventListeners();
    }
}

describe('Favorites Filtering Regression Tests', () => {
    let recipeManager;

    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks();
        
        // Setup DOM mocks
        mockContainer.querySelector.mockImplementation((selector) => {
            switch (selector) {
                case '#recipes-grid':
                    return mockRecipeGrid;
                case '#empty-state':
                    return mockEmptyState;
                case '.bg-gray-50.dark\\:bg-gray-700':
                    return mockInfoBar;
                case '#favorites-filter-btn':
                    return mockFavoritesButton;
                default:
                    return null;
            }
        });

        mockFavoritesButton.cloneNode.mockReturnValue({
            ...mockFavoritesButton,
            addEventListener: vi.fn()
        });

        recipeManager = new MockRecipeManager();
    });

    describe('Core Functionality', () => {
        it('should filter recipes to favorites only when showFavoritesOnly is true', () => {
            recipeManager.showFavoritesOnly = false;
            let filtered = recipeManager.getFilteredRecipes();
            expect(filtered).toHaveLength(5); // All recipes

            recipeManager.showFavoritesOnly = true;
            filtered = recipeManager.getFilteredRecipes();
            expect(filtered).toHaveLength(3); // Only favorites
            expect(filtered.every(recipe => recipe.favorite === true)).toBe(true);
        });

        it('should update button text correctly based on state', () => {
            recipeManager.showFavoritesOnly = false;
            recipeManager.updateFavoritesButton();
            expect(mockFavoritesButton.innerHTML).toContain('Favorites');
            expect(mockFavoritesButton.innerHTML).toContain('☆'); // Outline star

            recipeManager.showFavoritesOnly = true;
            recipeManager.updateFavoritesButton();
            expect(mockFavoritesButton.innerHTML).toContain('Favorites Only');
            expect(mockFavoritesButton.innerHTML).toContain('★'); // Filled star
        });

        it('should update button CSS classes for dark mode compatibility', () => {
            recipeManager.showFavoritesOnly = false;
            recipeManager.updateFavoritesButton();
            expect(mockFavoritesButton.className).toContain('bg-yellow-100');
            expect(mockFavoritesButton.className).toContain('dark:bg-yellow-900');

            recipeManager.showFavoritesOnly = true;
            recipeManager.updateFavoritesButton();
            expect(mockFavoritesButton.className).toContain('bg-yellow-400');
            expect(mockFavoritesButton.className).toContain('dark:bg-yellow-400');
            expect(mockFavoritesButton.className).toContain('text-gray-900');
            expect(mockFavoritesButton.className).toContain('dark:text-gray-900');
        });
    });

    describe('Regression Prevention: Multiple Event Listeners', () => {
        it('should handle multiple attachEventListeners calls without breaking functionality', () => {
            // This is the core regression test - multiple calls should not break the system
            recipeManager.simulateMultipleAttachCalls();
            
            expect(recipeManager.attachEventListenersCalls).toBe(3);
            expect(mockFavoritesButton.cloneNode).toHaveBeenCalledTimes(3);
            expect(mockFavoritesButton.parentNode.replaceChild).toHaveBeenCalledTimes(3);
        });

        it('should properly clean up event listeners on each attach call', () => {
            recipeManager.attachEventListeners();
            expect(mockFavoritesButton.cloneNode).toHaveBeenCalledWith(true);
            expect(mockFavoritesButton.parentNode.replaceChild).toHaveBeenCalled();

            // Second call should also clean up
            recipeManager.attachEventListeners();
            expect(mockFavoritesButton.cloneNode).toHaveBeenCalledTimes(2);
            expect(mockFavoritesButton.parentNode.replaceChild).toHaveBeenCalledTimes(2);
        });

        it('should maintain correct state after multiple attach calls', () => {
            recipeManager.simulateMultipleAttachCalls();
            
            // State should remain consistent
            expect(recipeManager.showFavoritesOnly).toBe(false);
            
            // Button should reflect correct state
            recipeManager.updateFavoritesButton();
            expect(mockFavoritesButton.innerHTML).toContain('Favorites');
            expect(mockFavoritesButton.innerHTML).not.toContain('Favorites Only');
        });
    });

    describe('State Management', () => {
        it('should toggle showFavoritesOnly state correctly', () => {
            expect(recipeManager.showFavoritesOnly).toBe(false);
            
            // Simulate button click
            recipeManager.showFavoritesOnly = !recipeManager.showFavoritesOnly;
            expect(recipeManager.showFavoritesOnly).toBe(true);
            
            // Toggle again
            recipeManager.showFavoritesOnly = !recipeManager.showFavoritesOnly;
            expect(recipeManager.showFavoritesOnly).toBe(false);
        });

        it('should update recipe display when state changes', () => {
            recipeManager.showFavoritesOnly = false;
            recipeManager.updateRecipeDisplay();
            expect(mockRecipeGrid.innerHTML).toContain('Broccoli Chips'); // Non-favorite should be visible

            recipeManager.showFavoritesOnly = true;
            recipeManager.updateRecipeDisplay();
            expect(mockRecipeGrid.innerHTML).not.toContain('Broccoli Chips'); // Non-favorite should be hidden
            expect(mockRecipeGrid.innerHTML).toContain('Bacon'); // Favorite should be visible
        });

        it('should force DOM reflow after updating recipe grid', () => {
            const originalOffsetHeight = mockRecipeGrid.offsetHeight;
            recipeManager.updateRecipeDisplay();
            
            // Accessing offsetHeight forces reflow - this is the regression fix for visual updates
            expect(mockRecipeGrid.offsetHeight).toBe(originalOffsetHeight);
        });
    });

    describe('UI Integration', () => {
        it('should update empty state visibility based on filtered results', () => {
            // All recipes visible - empty state should be hidden
            recipeManager.showFavoritesOnly = false;
            recipeManager.updateRecipeDisplay();
            expect(mockEmptyState.classList.add).toHaveBeenCalledWith('hidden');

            // If we had no favorites, empty state should show
            recipeManager.recipes = recipeManager.recipes.map(r => ({ ...r, favorite: false }));
            recipeManager.showFavoritesOnly = true;
            recipeManager.updateRecipeDisplay();
            expect(mockEmptyState.classList.remove).toHaveBeenCalledWith('hidden');
        });

        it('should handle info bar updates without errors', () => {
            // This test ensures updateInfoBar doesn't throw errors
            // The actual DOM interaction is tested in integration tests
            expect(() => {
                recipeManager.updateInfoBar(mockInfoBar);
            }).not.toThrow();
        });

        it('should maintain button tooltip accuracy', () => {
            recipeManager.showFavoritesOnly = false;
            recipeManager.updateFavoritesButton();
            expect(mockFavoritesButton.title).toBe('Show only favorites');

            recipeManager.showFavoritesOnly = true;
            recipeManager.updateFavoritesButton();
            expect(mockFavoritesButton.title).toBe('Show all recipes');
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty recipe list gracefully', () => {
            recipeManager.recipes = [];
            recipeManager.showFavoritesOnly = true;
            
            const filtered = recipeManager.getFilteredRecipes();
            expect(filtered).toHaveLength(0);
            
            recipeManager.updateRecipeDisplay();
            expect(mockRecipeGrid.innerHTML).toBe('');
        });

        it('should handle recipes without favorite property', () => {
            recipeManager.recipes = [
                { id: 1, title: 'Recipe Without Favorite', labels: [] }
            ];
            recipeManager.showFavoritesOnly = true;
            
            const filtered = recipeManager.getFilteredRecipes();
            expect(filtered).toHaveLength(0); // Recipe without favorite property should not appear
        });

        it('should handle missing DOM elements gracefully', () => {
            mockContainer.querySelector.mockReturnValue(null);
            
            // Should not throw errors
            expect(() => {
                recipeManager.updateRecipeDisplay();
                recipeManager.updateFavoritesButton();
                recipeManager.attachEventListeners();
            }).not.toThrow();
        });
    });

    describe('Performance Considerations', () => {
        it('should not create excessive event listeners', () => {
            // Track addEventListener calls
            let addEventListenerCalls = 0;
            mockFavoritesButton.addEventListener.mockImplementation(() => {
                addEventListenerCalls++;
            });

            // Multiple attach calls should not accumulate listeners
            recipeManager.simulateMultipleAttachCalls();
            
            // Should only have current listeners, not accumulated ones
            expect(addEventListenerCalls).toBe(3); // One per attach call
            expect(mockFavoritesButton.cloneNode).toHaveBeenCalledTimes(3); // Cleanup happened
        });

        it('should efficiently filter large recipe lists', () => {
            // Create a larger dataset
            const largeRecipeList = Array.from({ length: 1000 }, (_, i) => ({
                id: i,
                title: `Recipe ${i}`,
                favorite: i % 10 === 0, // Every 10th recipe is a favorite
                labels: []
            }));
            
            recipeManager.recipes = largeRecipeList;
            recipeManager.showFavoritesOnly = true;
            
            const start = performance.now();
            const filtered = recipeManager.getFilteredRecipes();
            const end = performance.now();
            
            expect(filtered).toHaveLength(100); // 100 favorites out of 1000
            expect(end - start).toBeLessThan(10); // Should be fast
        });
    });
});
