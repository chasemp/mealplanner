// Ingredient Labels Functionality Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM environment
const mockContainer = {
    innerHTML: '',
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    addEventListener: vi.fn()
};

// Mock DemoDataManager
const mockDemoData = {
    getIngredients: () => [
        {
            id: 1,
            name: 'Chicken Breast',
            category: 'meat',
            labels: ['protein', 'lean', 'versatile', 'popular']
        },
        {
            id: 2,
            name: 'Ground Beef',
            category: 'meat',
            labels: ['protein', 'hearty', 'comfort-food', 'versatile']
        },
        {
            id: 3,
            name: 'Broccoli',
            category: 'produce',
            labels: ['vegetable', 'healthy', 'vitamin-c', 'fiber', 'green']
        },
        {
            id: 4,
            name: 'Rice',
            category: 'grains',
            labels: ['grain', 'staple', 'carbs', 'gluten-free', 'versatile', 'affordable']
        },
        {
            id: 5,
            name: 'Milk',
            category: 'dairy',
            labels: [] // No labels
        }
    ]
};

// Mock IngredientsManager class
class MockIngredientsManager {
    constructor(container) {
        this.container = container;
        this.items = [];
        this.filteredIngredients = [];
        this.currentFilter = { search: '', category: '', label: '' };
    }

    async loadItems() {
        this.items = mockDemoData.getItems();
        this.applyFilters();
    }

    applyFilters() {
        this.filteredIngredients = this.items.filter(ingredient => {
            const matchesSearch = !this.currentFilter.search || 
                ingredient.name.toLowerCase().includes(this.currentFilter.search.toLowerCase());
            
            const matchesCategory = !this.currentFilter.category || 
                ingredient.category === this.currentFilter.category;
            
            const matchesLabel = !this.currentFilter.label || 
                (ingredient.labels && ingredient.labels.includes(this.currentFilter.label));
            
            return matchesSearch && matchesCategory && matchesLabel;
        });
    }

    getAllLabels() {
        const allLabels = new Set();
        this.items.forEach(ingredient => {
            if (ingredient.labels && Array.isArray(ingredient.labels)) {
                ingredient.labels.forEach(label => allLabels.add(label));
            }
        });
        return Array.from(allLabels).sort();
    }
}

describe('Ingredient Labels Functionality', () => {
    let ingredientsManager;

    beforeEach(async () => {
        ingredientsManager = new MockIngredientsManager(mockContainer);
        await ingredientsManager.loadItems();
    });

    describe('Label Data Loading', () => {
        it('should load items with labels correctly', () => {
            expect(ingredientsManager.items).toHaveLength(5);
            expect(ingredientsManager.items[0].labels).toEqual(['protein', 'lean', 'versatile', 'popular']);
            expect(ingredientsManager.items[4].labels).toEqual([]); // Milk has no labels
        });

        it('should handle items without labels', () => {
            const milkIngredient = ingredientsManager.items.find(i => i.name === 'Milk');
            expect(milkIngredient.labels).toEqual([]);
        });
    });

    describe('getAllLabels Method', () => {
        it('should return all unique labels sorted alphabetically', () => {
            const labels = ingredientsManager.getAllLabels();
            expect(labels).toContain('protein');
            expect(labels).toContain('healthy');
            expect(labels).toContain('versatile');
            expect(labels).toContain('affordable');
            
            // Should be sorted
            const sortedLabels = [...labels].sort();
            expect(labels).toEqual(sortedLabels);
        });

        it('should not include duplicate labels', () => {
            const labels = ingredientsManager.getAllLabels();
            const uniqueLabels = [...new Set(labels)];
            expect(labels).toEqual(uniqueLabels);
        });

        it('should handle empty labels arrays', () => {
            const labels = ingredientsManager.getAllLabels();
            expect(labels).toBeInstanceOf(Array);
            expect(labels.length).toBeGreaterThan(0);
        });
    });

    describe('Label Filtering', () => {
        it('should filter items by protein label', () => {
            ingredientsManager.currentFilter.label = 'protein';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(2);
            expect(ingredientsManager.filteredIngredients.map(i => i.name)).toEqual(['Chicken Breast', 'Ground Beef']);
        });

        it('should filter items by healthy label', () => {
            ingredientsManager.currentFilter.label = 'healthy';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(1);
            expect(ingredientsManager.filteredIngredients[0].name).toBe('Broccoli');
        });

        it('should filter items by versatile label', () => {
            ingredientsManager.currentFilter.label = 'versatile';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(3);
            const names = ingredientsManager.filteredIngredients.map(i => i.name);
            expect(names).toContain('Chicken Breast');
            expect(names).toContain('Ground Beef');
            expect(names).toContain('Rice');
        });

        it('should return empty results for non-existent label', () => {
            ingredientsManager.currentFilter.label = 'non-existent-label';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(0);
        });

        it('should return all items when no label filter is applied', () => {
            ingredientsManager.currentFilter.label = '';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(5);
        });
    });

    describe('Combined Filtering', () => {
        it('should filter by both category and label', () => {
            ingredientsManager.currentFilter.category = 'meat';
            ingredientsManager.currentFilter.label = 'protein';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(2);
            expect(ingredientsManager.filteredIngredients.map(i => i.name)).toEqual(['Chicken Breast', 'Ground Beef']);
        });

        it('should filter by search, category, and label', () => {
            ingredientsManager.currentFilter.search = 'chicken';
            ingredientsManager.currentFilter.category = 'meat';
            ingredientsManager.currentFilter.label = 'protein';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(1);
            expect(ingredientsManager.filteredIngredients[0].name).toBe('Chicken Breast');
        });

        it('should return no results when filters conflict', () => {
            ingredientsManager.currentFilter.category = 'produce';
            ingredientsManager.currentFilter.label = 'protein';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.filteredIngredients).toHaveLength(0);
        });
    });

    describe('Filter State Management', () => {
        it('should initialize with empty filters', () => {
            const newManager = new MockIngredientsManager(mockContainer);
            expect(newManager.currentFilter).toEqual({ search: '', category: '', label: '' });
        });

        it('should maintain filter state when applying filters', () => {
            ingredientsManager.currentFilter.label = 'healthy';
            ingredientsManager.currentFilter.category = 'produce';
            ingredientsManager.applyFilters();
            
            expect(ingredientsManager.currentFilter.label).toBe('healthy');
            expect(ingredientsManager.currentFilter.category).toBe('produce');
        });
    });

    describe('Edge Cases', () => {
        it('should handle items with null labels', () => {
            const ingredientWithNullLabels = {
                id: 6,
                name: 'Test Ingredient',
                category: 'test',
                labels: null
            };
            
            ingredientsManager.items.push(ingredientWithNullLabels);
            ingredientsManager.currentFilter.label = 'protein';
            ingredientsManager.applyFilters();
            
            // Should not crash and should not include the ingredient with null labels
            expect(ingredientsManager.filteredIngredients.map(i => i.name)).not.toContain('Test Ingredient');
        });

        it('should handle items with undefined labels', () => {
            const ingredientWithUndefinedLabels = {
                id: 7,
                name: 'Another Test Ingredient',
                category: 'test'
                // labels property is undefined
            };
            
            ingredientsManager.items.push(ingredientWithUndefinedLabels);
            ingredientsManager.currentFilter.label = 'protein';
            ingredientsManager.applyFilters();
            
            // Should not crash and should not include the ingredient with undefined labels
            expect(ingredientsManager.filteredIngredients.map(i => i.name)).not.toContain('Another Test Ingredient');
        });

        it('should handle empty labels array in getAllLabels', () => {
            // Create manager with only items that have no labels
            const emptyLabelsManager = new MockIngredientsManager(mockContainer);
            emptyLabelsManager.items = [
                { id: 1, name: 'Test', category: 'test', labels: [] },
                { id: 2, name: 'Test2', category: 'test', labels: null },
                { id: 3, name: 'Test3', category: 'test' } // no labels property
            ];
            
            const labels = emptyLabelsManager.getAllLabels();
            expect(labels).toEqual([]);
        });
    });

    describe('Label Case Sensitivity', () => {
        it('should handle label filtering case sensitively', () => {
            ingredientsManager.currentFilter.label = 'Protein'; // Capital P
            ingredientsManager.applyFilters();
            
            // Should return no results since labels are lowercase
            expect(ingredientsManager.filteredIngredients).toHaveLength(0);
        });

        it('should return labels in their original case', () => {
            const labels = ingredientsManager.getAllLabels();
            expect(labels).toContain('protein'); // lowercase
            expect(labels).not.toContain('Protein'); // uppercase
        });
    });
});
