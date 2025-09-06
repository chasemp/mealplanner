import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Import the demo data to check structure
class MockDemoDataManager {
    getRecipes() {
        return [
            {
                id: 1,
                title: 'Beef Stir Fry',
                description: 'Quick and easy beef stir fry with vegetables',
                meal_type: 'dinner',
                labels: ['quick', 'healthy', 'beef', 'vegetables'],
                tags: ['beef', 'vegetables'],
                prep_time: 15,
                cook_time: 10,
                servings: 4,
                favorite: false
            },
            {
                id: 2,
                title: 'Chicken Salad',
                description: 'Fresh chicken salad with mixed greens',
                meal_type: 'lunch',
                labels: ['healthy', 'light'],
                tags: ['chicken', 'salad'],
                prep_time: 10,
                cook_time: 0,
                servings: 2,
                favorite: true
            },
            {
                id: 3,
                title: 'Pancakes',
                description: 'Fluffy breakfast pancakes',
                meal_type: 'breakfast',
                labels: ['sweet', 'comfort'],
                tags: ['pancakes', 'breakfast'],
                prep_time: 5,
                cook_time: 15,
                servings: 4,
                favorite: false
            }
        ];
    }
}

// Mock RecipeManager for testing
class MockRecipeManager {
    constructor() {
        this.recipes = [];
        this.searchTerm = '';
        this.selectedCategory = 'all';
        this.selectedLabel = 'all';
        this.sortBy = 'name';
        this.showFavoritesOnly = false;
        
        // Load mock data
        const demoData = new MockDemoDataManager();
        this.recipes = demoData.getRecipes();
    }

    getFilteredRecipes() {
        let filtered = this.recipes;

        // Filter by search term
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(recipe => 
                recipe.title.toLowerCase().includes(term) ||
                recipe.description.toLowerCase().includes(term) ||
                (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(term))) ||
                (recipe.labels && recipe.labels.some(label => label.toLowerCase().includes(term)))
            );
        }

        // Filter by category
        if (this.selectedCategory !== 'all') {
            filtered = filtered.filter(recipe => recipe.meal_type === this.selectedCategory);
        }

        // Filter by label
        if (this.selectedLabel !== 'all') {
            filtered = filtered.filter(recipe => {
                const recipeLabels = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ];
                return recipeLabels.some(label => label.toLowerCase() === this.selectedLabel.toLowerCase());
            });
        }

        // Filter by favorites
        if (this.showFavoritesOnly) {
            filtered = filtered.filter(recipe => recipe.favorite === true);
        }

        // Sort recipes
        filtered.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'date':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'prep_time':
                    return (a.prep_time + a.cook_time) - (b.prep_time + b.cook_time);
                case 'serving_count':
                    return (b.serving_count || b.servings || 0) - (a.serving_count || a.servings || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    }
}

describe('Recipe Filtering Debug Tests', () => {
    let recipeManager;

    beforeEach(() => {
        recipeManager = new MockRecipeManager();
    });

    describe('Data Structure Validation', () => {
        it('should have valid recipe data structure', () => {
            expect(recipeManager.recipes).toHaveLength(3);
            
            const beefRecipe = recipeManager.recipes.find(r => r.title === 'Beef Stir Fry');
            expect(beefRecipe).toBeTruthy();
            expect(beefRecipe.title).toBe('Beef Stir Fry');
            expect(beefRecipe.tags).toContain('beef');
            expect(beefRecipe.meal_type).toBe('dinner');
            expect(beefRecipe.labels).toContain('quick');
        });

        it('should have proper tags and labels structure', () => {
            recipeManager.recipes.forEach(recipe => {
                expect(Array.isArray(recipe.labels)).toBe(true);
                expect(Array.isArray(recipe.tags)).toBe(true);
                expect(typeof recipe.title).toBe('string');
                expect(typeof recipe.description).toBe('string');
            });
        });
    });

    describe('Search Functionality Debug', () => {
        it('should filter by search term "beef"', () => {
            recipeManager.searchTerm = 'beef';
            const filtered = recipeManager.getFilteredRecipes();
            
            console.log('Search term:', recipeManager.searchTerm);
            console.log('All recipes:', recipeManager.recipes.map(r => ({ title: r.title, tags: r.tags })));
            console.log('Filtered recipes:', filtered.map(r => ({ title: r.title, tags: r.tags })));
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Beef Stir Fry');
        });

        it('should filter by search term in title', () => {
            recipeManager.searchTerm = 'stir';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Beef Stir Fry');
        });

        it('should filter by search term in description', () => {
            recipeManager.searchTerm = 'fluffy';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Pancakes');
        });

        it('should be case insensitive', () => {
            recipeManager.searchTerm = 'BEEF';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Beef Stir Fry');
        });

        it('should return empty array for non-matching search', () => {
            recipeManager.searchTerm = 'pizza';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(0);
        });
    });

    describe('Category Filtering Debug', () => {
        it('should filter by meal type "dinner"', () => {
            recipeManager.selectedCategory = 'dinner';
            const filtered = recipeManager.getFilteredRecipes();
            
            console.log('Selected category:', recipeManager.selectedCategory);
            console.log('All recipes meal types:', recipeManager.recipes.map(r => ({ title: r.title, meal_type: r.meal_type })));
            console.log('Filtered recipes:', filtered.map(r => ({ title: r.title, meal_type: r.meal_type })));
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].meal_type).toBe('dinner');
        });

        it('should filter by meal type "breakfast"', () => {
            recipeManager.selectedCategory = 'breakfast';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].meal_type).toBe('breakfast');
        });

        it('should show all recipes when category is "all"', () => {
            recipeManager.selectedCategory = 'all';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(3);
        });
    });

    describe('Label Filtering Debug', () => {
        it('should filter by label "healthy"', () => {
            recipeManager.selectedLabel = 'healthy';
            const filtered = recipeManager.getFilteredRecipes();
            
            console.log('Selected label:', recipeManager.selectedLabel);
            console.log('All recipes labels:', recipeManager.recipes.map(r => ({ title: r.title, labels: r.labels })));
            console.log('Filtered recipes:', filtered.map(r => ({ title: r.title, labels: r.labels })));
            
            expect(filtered).toHaveLength(2); // Beef Stir Fry and Chicken Salad
            expect(filtered.every(r => r.labels.includes('healthy'))).toBe(true);
        });

        it('should filter by tag as label', () => {
            recipeManager.selectedLabel = 'beef';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].tags).toContain('beef');
        });
    });

    describe('Sorting Debug', () => {
        it('should sort by name', () => {
            recipeManager.sortBy = 'name';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered[0].title).toBe('Beef Stir Fry');
            expect(filtered[1].title).toBe('Chicken Salad');
            expect(filtered[2].title).toBe('Pancakes');
        });

        it('should sort by prep time', () => {
            recipeManager.sortBy = 'prep_time';
            const filtered = recipeManager.getFilteredRecipes();
            
            // Should be sorted by total time (prep + cook)
            const totalTimes = filtered.map(r => r.prep_time + r.cook_time);
            expect(totalTimes[0]).toBeLessThanOrEqual(totalTimes[1]);
            expect(totalTimes[1]).toBeLessThanOrEqual(totalTimes[2]);
        });

        it('should sort by servings', () => {
            recipeManager.sortBy = 'serving_count';
            const filtered = recipeManager.getFilteredRecipes();
            
            // Should be sorted by servings descending
            const servings = filtered.map(r => r.servings);
            expect(servings[0]).toBeGreaterThanOrEqual(servings[1]);
            expect(servings[1]).toBeGreaterThanOrEqual(servings[2]);
        });
    });

    describe('Combined Filtering Debug', () => {
        it('should combine search and category filters', () => {
            recipeManager.searchTerm = 'beef';
            recipeManager.selectedCategory = 'dinner';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Beef Stir Fry');
        });

        it('should return empty when filters conflict', () => {
            recipeManager.searchTerm = 'beef';
            recipeManager.selectedCategory = 'breakfast';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(0);
        });
    });
});
