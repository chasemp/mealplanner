import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM environment
const createMockContainer = () => {
    const container = {
        innerHTML: '',
        querySelector: vi.fn(),
        querySelectorAll: vi.fn(() => [])
    };
    return container;
};

// Mock RecipeManager
class MockRecipeManager {
    constructor(container) {
        this.container = container;
        this.recipes = [];
        this.ingredients = [];
        this.searchTerm = '';
        this.selectedCategory = 'all';
        this.selectedLabel = 'all';
        this.sortBy = 'name';
        this.showFavoritesOnly = false;
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

    getFavoriteRecipes() {
        return this.recipes.filter(recipe => recipe.favorite === true);
    }

    toggleFavorite(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            recipe.favorite = !recipe.favorite;
        }
    }
}

describe('Recipe Filtering System', () => {
    let recipeManager;
    let mockContainer;

    const mockRecipes = [
        {
            id: 1,
            title: 'Beef Stir Fry',
            description: 'Quick and easy beef stir fry',
            meal_type: 'dinner',
            labels: ['quick', 'asian'],
            tags: ['beef'],
            prep_time: 10,
            cook_time: 15,
            serving_count: 4,
            favorite: false,
            created_at: '2025-01-01'
        },
        {
            id: 2,
            title: 'Chicken Salad',
            description: 'Fresh chicken salad with vegetables',
            meal_type: 'lunch',
            labels: ['healthy', 'fresh'],
            tags: ['chicken'],
            prep_time: 15,
            cook_time: 0,
            serving_count: 2,
            favorite: true,
            created_at: '2025-01-02'
        },
        {
            id: 3,
            title: 'Pancakes',
            description: 'Fluffy breakfast pancakes',
            meal_type: 'breakfast',
            labels: ['sweet', 'comfort'],
            tags: ['breakfast'],
            prep_time: 5,
            cook_time: 10,
            serving_count: 6,
            favorite: false,
            created_at: '2025-01-03'
        }
    ];

    beforeEach(() => {
        mockContainer = createMockContainer();
        recipeManager = new MockRecipeManager(mockContainer);
        recipeManager.recipes = [...mockRecipes];
    });

    describe('Search Filtering', () => {
        it('should filter recipes by title', () => {
            recipeManager.searchTerm = 'beef';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Beef Stir Fry');
        });

        it('should filter recipes by description', () => {
            recipeManager.searchTerm = 'fresh';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Chicken Salad');
        });

        it('should filter recipes by tags', () => {
            recipeManager.searchTerm = 'chicken';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Chicken Salad');
        });

        it('should filter recipes by labels', () => {
            recipeManager.searchTerm = 'quick';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Beef Stir Fry');
        });

        it('should be case insensitive', () => {
            recipeManager.searchTerm = 'BEEF';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Beef Stir Fry');
        });

        it('should return all recipes when search term is empty', () => {
            recipeManager.searchTerm = '';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(3);
        });
    });

    describe('Category Filtering', () => {
        it('should filter recipes by meal type', () => {
            recipeManager.selectedCategory = 'dinner';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].meal_type).toBe('dinner');
        });

        it('should return all recipes when category is "all"', () => {
            recipeManager.selectedCategory = 'all';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(3);
        });

        it('should return empty array for non-existent category', () => {
            recipeManager.selectedCategory = 'nonexistent';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(0);
        });
    });

    describe('Label Filtering', () => {
        it('should filter recipes by label', () => {
            recipeManager.selectedLabel = 'healthy';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].labels).toContain('healthy');
        });

        it('should filter recipes by tag (treated as label)', () => {
            recipeManager.selectedLabel = 'beef';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].tags).toContain('beef');
        });

        it('should be case insensitive', () => {
            recipeManager.selectedLabel = 'HEALTHY';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
        });

        it('should return all recipes when label is "all"', () => {
            recipeManager.selectedLabel = 'all';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(3);
        });
    });

    describe('Favorites Filtering', () => {
        it('should filter to show only favorite recipes', () => {
            recipeManager.showFavoritesOnly = true;
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].favorite).toBe(true);
            expect(filtered[0].title).toBe('Chicken Salad');
        });

        it('should show all recipes when favorites filter is off', () => {
            recipeManager.showFavoritesOnly = false;
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(3);
        });

        it('should toggle favorite status', () => {
            const recipe = recipeManager.recipes[0]; // Beef Stir Fry
            expect(recipe.favorite).toBe(false);
            
            recipeManager.toggleFavorite(recipe.id);
            expect(recipe.favorite).toBe(true);
            
            recipeManager.toggleFavorite(recipe.id);
            expect(recipe.favorite).toBe(false);
        });
    });

    describe('Sorting', () => {
        it('should sort recipes by name', () => {
            recipeManager.sortBy = 'name';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered[0].title).toBe('Beef Stir Fry');
            expect(filtered[1].title).toBe('Chicken Salad');
            expect(filtered[2].title).toBe('Pancakes');
        });

        it('should sort recipes by date (newest first)', () => {
            recipeManager.sortBy = 'date';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered[0].created_at).toBe('2025-01-03');
            expect(filtered[1].created_at).toBe('2025-01-02');
            expect(filtered[2].created_at).toBe('2025-01-01');
        });

        it('should sort recipes by prep time', () => {
            recipeManager.sortBy = 'prep_time';
            const filtered = recipeManager.getFilteredRecipes();
            
            // Pancakes: 5+10=15, Chicken: 15+0=15, Beef: 10+15=25
            // When times are equal, order may vary, so check total times instead
            const totalTimes = filtered.map(r => r.prep_time + r.cook_time);
            expect(totalTimes[0]).toBe(15); // First two should be 15 min
            expect(totalTimes[1]).toBe(15);
            expect(totalTimes[2]).toBe(25); // Last should be 25 min
            expect(filtered[2].title).toBe('Beef Stir Fry'); // Beef should be last
        });

        it('should sort recipes by serving count (highest first)', () => {
            recipeManager.sortBy = 'serving_count';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered[0].serving_count).toBe(6); // Pancakes
            expect(filtered[1].serving_count).toBe(4); // Beef Stir Fry
            expect(filtered[2].serving_count).toBe(2); // Chicken Salad
        });
    });

    describe('Combined Filtering', () => {
        it('should apply multiple filters simultaneously', () => {
            recipeManager.searchTerm = 'chicken';
            recipeManager.selectedCategory = 'lunch';
            recipeManager.showFavoritesOnly = true;
            
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Chicken Salad');
        });

        it('should return empty array when filters exclude all recipes', () => {
            recipeManager.selectedCategory = 'dinner';
            recipeManager.showFavoritesOnly = true; // No dinner favorites
            
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(0);
        });

        it('should maintain sort order with filters applied', () => {
            recipeManager.selectedCategory = 'all';
            recipeManager.sortBy = 'name';
            
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered[0].title).toBe('Beef Stir Fry');
            expect(filtered[1].title).toBe('Chicken Salad');
            expect(filtered[2].title).toBe('Pancakes');
        });
    });

    describe('Favorites System', () => {
        it('should get favorite recipes', () => {
            const favorites = recipeManager.getFavoriteRecipes();
            
            expect(favorites).toHaveLength(1);
            expect(favorites[0].title).toBe('Chicken Salad');
        });

        it('should update favorites count after toggling', () => {
            expect(recipeManager.getFavoriteRecipes()).toHaveLength(1);
            
            recipeManager.toggleFavorite(1); // Toggle Beef Stir Fry
            expect(recipeManager.getFavoriteRecipes()).toHaveLength(2);
            
            recipeManager.toggleFavorite(2); // Toggle Chicken Salad (remove)
            expect(recipeManager.getFavoriteRecipes()).toHaveLength(1);
        });
    });
});
