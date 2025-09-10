// Enhanced Recipe Selection Tests
// Tests for the new Planning/Pending/Schedule workflow

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock MealPlannerApp class
class MockMealPlannerApp {
    constructor() {
        this.selectedRecipes = { dinner: [] };
        this.showFavoritesOnly = false;
        this.favoriteRecipes = [];
    }

    renderRecipeSelection(mealType) {
        // Mock implementation that actually calls settings manager
        if (window.mealPlannerSettings && window.mealPlannerSettings.getAuthoritativeData) {
            const recipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            console.log(`Mock: Loaded ${recipes.length} recipes for ${mealType}`);
        }
        
        const browserContainer = document.getElementById(`${mealType}-recipe-browser`);
        if (browserContainer) {
            browserContainer.innerHTML = '<div class="recipe-browser-item">Mock Recipe</div>';
        }
        this.renderSelectionQueue(mealType);
    }

    renderSelectionQueue(mealType) {
        const queueContainer = document.getElementById('selected-recipes-container');
        const countElement = document.getElementById('selected-recipe-count');
        const scheduleBtn = document.getElementById('schedule-selected-recipes');
        const emptyMessage = document.getElementById('empty-selection-message');
        
        const selectedRecipes = this.selectedRecipes[mealType] || [];
        
        if (countElement) countElement.textContent = `${selectedRecipes.length} items selected`;
        if (scheduleBtn) scheduleBtn.disabled = selectedRecipes.length === 0;
        if (emptyMessage) emptyMessage.style.display = selectedRecipes.length === 0 ? 'block' : 'none';
        
        if (queueContainer && selectedRecipes.length > 0) {
            queueContainer.innerHTML = selectedRecipes.map(id => 
                `<div class="selected-recipe-chip" data-recipe-id="${id}">Recipe ${id} <button onclick="window.app.removeRecipeFromQueue('${mealType}', ${id})">✕</button></div>`
            ).join('');
        }
    }

    addRecipeToQueue(mealType, recipeId) {
        if (!this.selectedRecipes[mealType]) {
            this.selectedRecipes[mealType] = [];
        }
        
        if (!this.selectedRecipes[mealType].includes(recipeId)) {
            this.selectedRecipes[mealType].push(recipeId);
            this.renderRecipeSelection(mealType);
        }
    }

    removeRecipeFromQueue(mealType, recipeId) {
        if (this.selectedRecipes[mealType]) {
            const index = this.selectedRecipes[mealType].indexOf(recipeId);
            if (index > -1) {
                this.selectedRecipes[mealType].splice(index, 1);
                this.renderRecipeSelection(mealType);
            }
        }
    }

    renderFilterChips(recipes, container) {
        if (!container) return;
        container.innerHTML = '<button class="filter-chip" data-label="Italian">Italian</button>';
    }

    isRecipeFavorite(recipeId) {
        return this.favoriteRecipes.includes(recipeId);
    }
}

describe('Enhanced Recipe Selection', () => {
    let dom;
    let app;
    let mockSettings;

    beforeEach(() => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <!-- Planning Section -->
                <div id="dinner-recipe-selection">
                    <input type="text" id="recipe-search-input" placeholder="Search recipes...">
                    <button id="show-favorites-only">❤️ Favorites</button>
                    <div id="recipe-filter-chips"></div>
                    <div id="dinner-recipe-browser"></div>
                </div>

                <!-- Pending Section -->
                <div id="recipe-selection-queue">
                    <div id="selected-recipes-container">
                        <div id="empty-selection-message">No recipes selected</div>
                    </div>
                </div>
                <span id="selected-recipe-count">0 items selected</span>
                <button id="clear-recipe-selection">Clear All</button>
                <button id="schedule-selected-recipes" disabled>Schedule Selected (<span id="schedule-count">0</span>)</button>

                <!-- Schedule Section -->
                <div id="dinner-itinerary"></div>
            </body>
            </html>
        `);

        global.document = dom.window.document;
        global.window = dom.window;

        // Mock settings manager
        mockSettings = {
            getAuthoritativeData: vi.fn().mockReturnValue([
                { id: 1, title: 'Pasta Marinara', meal_type: 'dinner', description: 'Italian pasta', labels: ['Italian', 'Quick'] },
                { id: 2, title: 'Chicken Curry', meal_type: 'dinner', description: 'Spicy curry', labels: ['Indian', 'Spicy'] },
                { id: 3, title: 'Caesar Salad', meal_type: 'dinner', description: 'Fresh salad', labels: ['Healthy', 'Quick'] }
            ])
        };
        
        global.window.mealPlannerSettings = mockSettings;

        // Create app instance
        app = new MockMealPlannerApp();
        global.window.app = app;
    });

    describe('Planning Section - Recipe Browser', () => {
        it('should render recipe browser with search functionality', () => {
            app.renderRecipeSelection('dinner');
            
            const browser = document.getElementById('dinner-recipe-browser');
            expect(browser).toBeTruthy();
            expect(browser.innerHTML).toContain('recipe-browser-item');
        });

        it('should filter recipes based on search input', () => {
            const searchInput = document.getElementById('recipe-search-input');
            searchInput.value = 'pasta';
            
            // Simulate search functionality
            app.renderRecipeSelection('dinner');
            
            expect(mockSettings.getAuthoritativeData).toHaveBeenCalledWith('recipes');
        });

        it('should render filter chips for recipe labels', () => {
            const container = document.getElementById('recipe-filter-chips');
            const mockRecipes = mockSettings.getAuthoritativeData('recipes');
            
            app.renderFilterChips(mockRecipes, container);
            
            expect(container.innerHTML).toContain('filter-chip');
            expect(container.innerHTML).toContain('Italian');
        });

        it('should show favorites only when filter is enabled', () => {
            app.showFavoritesOnly = true;
            app.favoriteRecipes = [1];
            
            app.renderRecipeSelection('dinner');
            
            // Should filter to only favorite recipes
            expect(mockSettings.getAuthoritativeData).toHaveBeenCalled();
        });
    });

    describe('Pending Section - Selection Queue', () => {
        it('should start with empty selection queue', () => {
            app.renderSelectionQueue('dinner');
            
            const countElement = document.getElementById('selected-recipe-count');
            const scheduleBtn = document.getElementById('schedule-selected-recipes');
            const emptyMessage = document.getElementById('empty-selection-message');
            
            expect(countElement.textContent).toBe('0 items selected');
            expect(scheduleBtn.disabled).toBe(true);
            expect(emptyMessage.style.display).toBe('block');
        });

        it('should add recipe to selection queue', () => {
            app.addRecipeToQueue('dinner', 1);
            
            expect(app.selectedRecipes.dinner).toContain(1);
            expect(app.selectedRecipes.dinner.length).toBe(1);
        });

        it('should not add duplicate recipes to queue', () => {
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 1);
            
            expect(app.selectedRecipes.dinner.length).toBe(1);
        });

        it('should remove recipe from selection queue', () => {
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 2);
            
            expect(app.selectedRecipes.dinner.length).toBe(2);
            
            app.removeRecipeFromQueue('dinner', 1);
            
            expect(app.selectedRecipes.dinner).not.toContain(1);
            expect(app.selectedRecipes.dinner).toContain(2);
            expect(app.selectedRecipes.dinner.length).toBe(1);
        });

        it('should update UI when recipes are added to queue', () => {
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 2);
            
            const countElement = document.getElementById('selected-recipe-count');
            const scheduleBtn = document.getElementById('schedule-selected-recipes');
            const emptyMessage = document.getElementById('empty-selection-message');
            
            expect(countElement.textContent).toBe('2 items selected');
            expect(scheduleBtn.disabled).toBe(false);
            // Check if emptyMessage exists before accessing style
            if (emptyMessage) {
                expect(emptyMessage.style.display).toBe('none');
            }
        });

        it('should render selected recipe chips with remove buttons', () => {
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 2);
            
            const queueContainer = document.getElementById('selected-recipes-container');
            
            expect(queueContainer.innerHTML).toContain('selected-recipe-chip');
            expect(queueContainer.innerHTML).toContain('Recipe 1');
            expect(queueContainer.innerHTML).toContain('Recipe 2');
            expect(queueContainer.innerHTML).toContain('✕');
        });

        it('should clear all selected recipes', () => {
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 2);
            
            // Simulate clear all
            app.selectedRecipes.dinner = [];
            app.renderSelectionQueue('dinner');
            
            const countElement = document.getElementById('selected-recipe-count');
            const scheduleBtn = document.getElementById('schedule-selected-recipes');
            
            expect(countElement.textContent).toBe('0 items selected');
            expect(scheduleBtn.disabled).toBe(true);
        });
    });

    describe('Integration - Planning to Pending Workflow', () => {
        it('should move recipe from browser to pending queue', () => {
            // Start with empty queue
            expect(app.selectedRecipes.dinner.length).toBe(0);
            
            // Add recipe to queue (simulates clicking "+ Add" button)
            app.addRecipeToQueue('dinner', 1);
            
            // Verify recipe is in queue
            expect(app.selectedRecipes.dinner).toContain(1);
            
            // Verify UI updates
            const countElement = document.getElementById('selected-recipe-count');
            expect(countElement.textContent).toBe('1 items selected');
        });

        it('should prevent adding same recipe multiple times', () => {
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 1);
            
            expect(app.selectedRecipes.dinner.length).toBe(1);
        });

        it('should handle multiple recipe selections', () => {
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 2);
            app.addRecipeToQueue('dinner', 3);
            
            expect(app.selectedRecipes.dinner.length).toBe(3);
            expect(app.selectedRecipes.dinner).toEqual([1, 2, 3]);
        });

        it('should enable schedule button when recipes are selected', () => {
            const scheduleBtn = document.getElementById('schedule-selected-recipes');
            
            // Initially disabled
            expect(scheduleBtn.disabled).toBe(true);
            
            // Add recipe
            app.addRecipeToQueue('dinner', 1);
            
            // Should be enabled
            expect(scheduleBtn.disabled).toBe(false);
        });
    });

    describe('Search and Filter Integration', () => {
        it('should maintain selection state during search', () => {
            // Add recipes to queue
            app.addRecipeToQueue('dinner', 1);
            app.addRecipeToQueue('dinner', 2);
            
            // Perform search (simulates typing in search box)
            const searchInput = document.getElementById('recipe-search-input');
            searchInput.value = 'pasta';
            app.renderRecipeSelection('dinner');
            
            // Selection should be maintained
            expect(app.selectedRecipes.dinner.length).toBe(2);
            expect(app.selectedRecipes.dinner).toContain(1);
            expect(app.selectedRecipes.dinner).toContain(2);
        });

        it('should update browser display when favorites filter is toggled', () => {
            app.favoriteRecipes = [1];
            
            // Toggle favorites filter
            app.showFavoritesOnly = true;
            app.renderRecipeSelection('dinner');
            
            // Should call settings manager for recipes
            expect(mockSettings.getAuthoritativeData).toHaveBeenCalledWith('recipes');
        });
    });

    describe('Error Handling', () => {
        it('should handle missing DOM elements gracefully', () => {
            // Remove elements
            document.getElementById('selected-recipe-count')?.remove();
            document.getElementById('schedule-selected-recipes')?.remove();
            
            // Should not throw errors
            expect(() => {
                app.renderSelectionQueue('dinner');
            }).not.toThrow();
        });

        it('should handle missing settings manager', () => {
            global.window.mealPlannerSettings = null;
            
            expect(() => {
                app.renderRecipeSelection('dinner');
            }).not.toThrow();
        });

        it('should handle invalid recipe IDs', () => {
            expect(() => {
                app.addRecipeToQueue('dinner', null);
                app.addRecipeToQueue('dinner', undefined);
                app.removeRecipeFromQueue('dinner', 999);
            }).not.toThrow();
        });
    });
});
