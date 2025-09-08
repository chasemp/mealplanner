import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock the actual demo data structure
class MockDemoDataManager {
    getRecipes() {
        return [
            {
                id: 1,
                title: 'Grilled Chicken with Vegetables',
                description: 'Healthy grilled chicken breast served with roasted vegetables',
                meal_type: 'dinner',
                labels: ['healthy', 'protein', 'low-carb', 'chicken'],
                tags: ['healthy', 'protein', 'low-carb', 'chicken'],
                prep_time: 15,
                cook_time: 25,
                servings: 4,
                favorite: false
            },
            {
                id: 2,
                title: 'Spaghetti Bolognese',
                description: 'Classic Italian pasta with rich meat sauce',
                meal_type: 'dinner',
                labels: ['italian', 'comfort-food', 'pasta', 'beef'],
                tags: ['italian', 'comfort-food', 'pasta', 'beef'],
                prep_time: 20,
                cook_time: 45,
                servings: 6,
                favorite: true
            },
            {
                id: 3,
                title: 'Scrambled Eggs and Toast',
                description: 'Simple and delicious breakfast with eggs and buttered toast',
                meal_type: 'breakfast',
                labels: ['breakfast', 'quick', 'easy'],
                tags: ['breakfast', 'quick', 'easy'],
                prep_time: 5,
                cook_time: 10,
                servings: 2,
                favorite: false
            },
            {
                id: 4,
                title: 'Salmon Teriyaki Bowl',
                description: 'Grilled salmon with rice and vegetables in teriyaki sauce',
                meal_type: 'dinner',
                labels: ['healthy', 'asian', 'fish'],
                tags: ['healthy', 'asian', 'fish'],
                prep_time: 20,
                cook_time: 30,
                servings: 4,
                favorite: false
            },
            {
                id: 5,
                title: 'Greek Salad',
                description: 'Fresh Mediterranean salad with feta cheese and olives',
                meal_type: 'lunch',
                labels: ['healthy', 'vegetarian', 'mediterranean'],
                tags: ['healthy', 'vegetarian', 'mediterranean'],
                prep_time: 15,
                cook_time: 0,
                servings: 4,
                favorite: true
            }
        ];
    }
}

// Mock RecipeManager with dropdown filtering logic
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

        // Filter by category (meal_type)
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
                    return (b.servings || 0) - (a.servings || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    getAllLabels() {
        const labels = new Set();
        this.recipes.forEach(recipe => {
            if (recipe.labels && Array.isArray(recipe.labels)) {
                recipe.labels.forEach(label => labels.add(label));
            }
            if (recipe.tags && Array.isArray(recipe.tags)) {
                recipe.tags.forEach(tag => labels.add(tag));
            }
        });
        return Array.from(labels).sort();
    }

    getUniqueLabels() {
        const filteredRecipes = this.getFilteredRecipes();
        const labels = new Set();
        filteredRecipes.forEach(recipe => {
            if (recipe.labels && Array.isArray(recipe.labels)) {
                recipe.labels.forEach(label => labels.add(label));
            }
            if (recipe.tags && Array.isArray(recipe.tags)) {
                recipe.tags.forEach(tag => labels.add(tag));
            }
        });
        return Array.from(labels);
    }

    getFavoriteRecipes() {
        return this.recipes.filter(recipe => recipe.favorite === true);
    }
}

describe('Recipe Dropdown Filtering Tests', () => {
    let recipeManager;

    beforeEach(() => {
        recipeManager = new MockRecipeManager();
    });

    describe('Meal Type Dropdown Filtering', () => {
        it('should filter recipes by breakfast meal type', () => {
            recipeManager.selectedCategory = 'breakfast';
            const filtered = recipeManager.getFilteredRecipes();
            
            console.log('Filtering by breakfast:');
            console.log('All recipes:', recipeManager.recipes.map(r => ({ title: r.title, meal_type: r.meal_type })));
            console.log('Filtered:', filtered.map(r => ({ title: r.title, meal_type: r.meal_type })));
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].meal_type).toBe('breakfast');
            expect(filtered[0].title).toBe('Scrambled Eggs and Toast');
        });

        it('should filter recipes by lunch meal type', () => {
            recipeManager.selectedCategory = 'lunch';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].meal_type).toBe('lunch');
            expect(filtered[0].title).toBe('Greek Salad');
        });

        it('should filter recipes by dinner meal type', () => {
            recipeManager.selectedCategory = 'dinner';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(3);
            filtered.forEach(recipe => {
                expect(recipe.meal_type).toBe('dinner');
            });
            
            const titles = filtered.map(r => r.title).sort();
            expect(titles).toEqual([
                'Grilled Chicken with Vegetables',
                'Salmon Teriyaki Bowl', 
                'Spaghetti Bolognese'
            ]);
        });

        it('should show all recipes when meal type is "all"', () => {
            recipeManager.selectedCategory = 'all';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(5);
        });

        it('should return empty array for non-existent meal type', () => {
            recipeManager.selectedCategory = 'snack';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(0);
        });
    });

    describe('Label Dropdown Filtering', () => {
        it('should filter recipes by "healthy" label', () => {
            recipeManager.selectedLabel = 'healthy';
            const filtered = recipeManager.getFilteredRecipes();
            
            console.log('Filtering by healthy label:');
            console.log('All recipes labels:', recipeManager.recipes.map(r => ({ title: r.title, labels: r.labels })));
            console.log('Filtered:', filtered.map(r => ({ title: r.title, labels: r.labels })));
            
            expect(filtered.length).toBeGreaterThan(0);
            filtered.forEach(recipe => {
                const hasHealthyLabel = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ].some(label => label.toLowerCase() === 'healthy');
                expect(hasHealthyLabel).toBe(true);
            });
        });

        it('should filter recipes by "italian" label', () => {
            recipeManager.selectedLabel = 'italian';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Spaghetti Bolognese');
            expect(filtered[0].labels).toContain('italian');
        });

        it('should filter recipes by "vegetarian" label', () => {
            recipeManager.selectedLabel = 'vegetarian';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Greek Salad');
            expect(filtered[0].labels).toContain('vegetarian');
        });

        it('should show all recipes when label is "all"', () => {
            recipeManager.selectedLabel = 'all';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(5);
        });

        it('should return empty array for non-existent label', () => {
            recipeManager.selectedLabel = 'nonexistent';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(0);
        });

        it('should be case insensitive for label filtering', () => {
            recipeManager.selectedLabel = 'HEALTHY';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered.length).toBeGreaterThan(0);
            filtered.forEach(recipe => {
                const hasHealthyLabel = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ].some(label => label.toLowerCase() === 'healthy');
                expect(hasHealthyLabel).toBe(true);
            });
        });
    });

    describe('Combined Dropdown Filtering', () => {
        it('should combine meal type and label filters', () => {
            recipeManager.selectedCategory = 'dinner';
            recipeManager.selectedLabel = 'healthy';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered.length).toBeGreaterThan(0);
            filtered.forEach(recipe => {
                expect(recipe.meal_type).toBe('dinner');
                const hasHealthyLabel = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ].some(label => label.toLowerCase() === 'healthy');
                expect(hasHealthyLabel).toBe(true);
            });
        });

        it('should return empty when filters conflict', () => {
            recipeManager.selectedCategory = 'breakfast';
            recipeManager.selectedLabel = 'italian';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(0);
        });

        it('should work with search + dropdown filters', () => {
            recipeManager.searchTerm = 'chicken';
            recipeManager.selectedCategory = 'dinner';
            const filtered = recipeManager.getFilteredRecipes();
            
            expect(filtered).toHaveLength(1);
            expect(filtered[0].title).toBe('Grilled Chicken with Vegetables');
            expect(filtered[0].meal_type).toBe('dinner');
        });
    });

    describe('Dropdown Options Generation', () => {
        it('should generate all available labels for dropdown', () => {
            const allLabels = recipeManager.getAllLabels();
            
            console.log('All available labels:', allLabels);
            
            expect(allLabels).toContain('healthy');
            expect(allLabels).toContain('italian');
            expect(allLabels).toContain('vegetarian');
            expect(allLabels).toContain('breakfast');
            expect(allLabels).toContain('quick');
            expect(allLabels).toContain('beef');
            expect(allLabels).toContain('chicken');
            expect(Array.isArray(allLabels)).toBe(true);
        });

        it('should generate unique labels from filtered results', () => {
            recipeManager.selectedCategory = 'dinner';
            const uniqueLabels = recipeManager.getUniqueLabels();
            
            console.log('Unique labels for dinner recipes:', uniqueLabels);
            
            expect(uniqueLabels).toContain('healthy');
            expect(uniqueLabels).toContain('italian');
            expect(uniqueLabels).not.toContain('breakfast'); // Should not appear in dinner recipes
        });

        it('should handle favorites filtering correctly', () => {
            const favoriteRecipes = recipeManager.getFavoriteRecipes();
            
            expect(favoriteRecipes).toHaveLength(2);
            expect(favoriteRecipes.map(r => r.title)).toContain('Spaghetti Bolognese');
            expect(favoriteRecipes.map(r => r.title)).toContain('Greek Salad');
        });
    });

    describe('Statistics Updates with Filtering', () => {
        it('should update recipe count based on filters', () => {
            // All recipes
            recipeManager.selectedCategory = 'all';
            expect(recipeManager.getFilteredRecipes()).toHaveLength(5);
            
            // Dinner only
            recipeManager.selectedCategory = 'dinner';
            expect(recipeManager.getFilteredRecipes()).toHaveLength(3);
            
            // Healthy dinner
            recipeManager.selectedLabel = 'healthy';
            expect(recipeManager.getFilteredRecipes()).toHaveLength(2);
        });

        it('should update label count based on filters', () => {
            // All labels
            recipeManager.selectedCategory = 'all';
            const allLabels = recipeManager.getUniqueLabels();
            expect(allLabels.length).toBeGreaterThan(10);
            
            // Dinner labels only
            recipeManager.selectedCategory = 'dinner';
            const dinnerLabels = recipeManager.getUniqueLabels();
            expect(dinnerLabels.length).toBeLessThan(allLabels.length);
            expect(dinnerLabels).not.toContain('breakfast');
        });
    });
});
