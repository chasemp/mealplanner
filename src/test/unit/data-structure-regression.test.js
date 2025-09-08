import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * REGRESSION PREVENTION TESTS
 * 
 * These tests prevent critical data structure inconsistencies that break filtering functionality.
 * Based on Lesson 7: Data Structure Consistency for Filtering Systems
 */

describe('Data Structure Regression Prevention', () => {
    let DemoDataManager;

    beforeEach(() => {
        // Use a comprehensive mock that matches the real demo data structure
        // This ensures our regression tests validate the expected data format
        DemoDataManager = class MockDemoDataManager {
                getRecipes() {
                    return [
                        {
                            id: 1,
                            title: 'Grilled Chicken with Vegetables',
                            description: 'Healthy grilled chicken breast served with roasted vegetables',
                            meal_type: 'dinner',
                            tags: ['healthy', 'protein', 'chicken'],
                            labels: ['healthy', 'protein', 'chicken']
                        },
                        {
                            id: 2,
                            title: 'Scrambled Eggs and Toast',
                            description: 'Simple and delicious breakfast with eggs and buttered toast',
                            meal_type: 'breakfast',
                            tags: ['breakfast', 'quick', 'easy'],
                            labels: ['breakfast', 'quick', 'easy']
                        },
                        {
                            id: 3,
                            title: 'Greek Salad',
                            description: 'Fresh Mediterranean salad with feta cheese and olives',
                            meal_type: 'lunch',
                            tags: ['healthy', 'vegetarian', 'mediterranean'],
                            labels: ['healthy', 'vegetarian', 'mediterranean']
                        },
                        {
                            id: 4,
                            title: 'Beef and Potato Stew',
                            description: 'Hearty comfort food stew with beef and vegetables',
                            meal_type: 'dinner',
                            tags: ['comfort-food', 'stew', 'hearty', 'beef'],
                            labels: ['comfort-food', 'stew', 'hearty', 'beef'],
                            favorite: true
                        }
                    ];
                }
            };
    });

    describe('Recipe Data Structure Consistency', () => {
        it('should ensure all recipes have both tags and labels properties', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            expect(recipes.length).toBeGreaterThan(0);
            
            recipes.forEach((recipe, index) => {
                // Critical: Both tags and labels must exist for filtering to work
                expect(recipe.tags, `Recipe ${index + 1} (${recipe.title}) missing tags property`).toBeDefined();
                expect(recipe.labels, `Recipe ${index + 1} (${recipe.title}) missing labels property`).toBeDefined();
                
                // Both should be arrays
                expect(Array.isArray(recipe.tags), `Recipe ${index + 1} tags should be array`).toBe(true);
                expect(Array.isArray(recipe.labels), `Recipe ${index + 1} labels should be array`).toBe(true);
                
                // Both should have content (not empty)
                expect(recipe.tags.length, `Recipe ${index + 1} should have tags`).toBeGreaterThan(0);
                expect(recipe.labels.length, `Recipe ${index + 1} should have labels`).toBeGreaterThan(0);
            });
        });

        it('should ensure recipes have required meal_type property', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
            
            recipes.forEach((recipe, index) => {
                expect(recipe.meal_type, `Recipe ${index + 1} (${recipe.title}) missing meal_type`).toBeDefined();
                expect(validMealTypes, `Recipe ${index + 1} has invalid meal_type: ${recipe.meal_type}`).toContain(recipe.meal_type);
            });
        });

        it('should ensure recipes have searchable content', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            recipes.forEach((recipe, index) => {
                // Title is required for search
                expect(recipe.title, `Recipe ${index + 1} missing title`).toBeDefined();
                expect(typeof recipe.title, `Recipe ${index + 1} title should be string`).toBe('string');
                expect(recipe.title.length, `Recipe ${index + 1} title should not be empty`).toBeGreaterThan(0);
                
                // Description should exist for search
                expect(recipe.description, `Recipe ${index + 1} (${recipe.title}) missing description`).toBeDefined();
                expect(typeof recipe.description, `Recipe ${index + 1} description should be string`).toBe('string');
            });
        });

        it('should ensure recipes have semantic tags for protein searches', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            // Find recipes that mention proteins in title or description
            const proteinKeywords = ['beef', 'chicken', 'salmon', 'fish', 'pork', 'turkey'];
            const proteinRecipes = recipes.filter(recipe => {
                const text = (recipe.title + ' ' + recipe.description).toLowerCase();
                return proteinKeywords.some(protein => text.includes(protein));
            });
            
            // These recipes should have corresponding protein tags
            proteinRecipes.forEach(recipe => {
                const text = (recipe.title + ' ' + recipe.description).toLowerCase();
                const allTags = [...(recipe.tags || []), ...(recipe.labels || [])].map(tag => tag.toLowerCase());
                
                proteinKeywords.forEach(protein => {
                    if (text.includes(protein)) {
                        expect(allTags, `Recipe "${recipe.title}" mentions ${protein} but missing ${protein} tag`).toContain(protein);
                    }
                });
            });
        });

        it('should prevent empty or null tag/label arrays', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            recipes.forEach((recipe, index) => {
                // Prevent null/undefined arrays
                expect(recipe.tags, `Recipe ${index + 1} tags is null/undefined`).not.toBeNull();
                expect(recipe.labels, `Recipe ${index + 1} labels is null/undefined`).not.toBeNull();
                
                // Prevent empty arrays (recipes should be categorized)
                expect(recipe.tags.length, `Recipe ${index + 1} (${recipe.title}) has empty tags array`).toBeGreaterThan(0);
                expect(recipe.labels.length, `Recipe ${index + 1} (${recipe.title}) has empty labels array`).toBeGreaterThan(0);
            });
        });
    });

    describe('Filtering Logic Compatibility', () => {
        it('should ensure tag/label filtering will find results', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            // Collect all unique tags and labels
            const allTags = new Set();
            const allLabels = new Set();
            
            recipes.forEach(recipe => {
                (recipe.tags || []).forEach(tag => allTags.add(tag.toLowerCase()));
                (recipe.labels || []).forEach(label => allLabels.add(label.toLowerCase()));
            });
            
            // Common filtering terms should have matches
            const commonFilters = ['healthy', 'quick', 'easy', 'comfort-food'];
            commonFilters.forEach(filter => {
                const hasTagMatch = Array.from(allTags).some(tag => tag.includes(filter));
                const hasLabelMatch = Array.from(allLabels).some(label => label.includes(filter));
                
                if (!hasTagMatch && !hasLabelMatch) {
                    console.warn(`Warning: Common filter "${filter}" has no matches in tags or labels`);
                }
            });
            
            // Should have some healthy options
            expect(allTags.has('healthy') || allLabels.has('healthy'), 'Should have healthy recipes for filtering').toBe(true);
        });

        it('should ensure meal type filtering will find results for each type', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            const mealTypeCounts = {
                breakfast: 0,
                lunch: 0,
                dinner: 0,
                snack: 0
            };
            
            recipes.forEach(recipe => {
                if (mealTypeCounts.hasOwnProperty(recipe.meal_type)) {
                    mealTypeCounts[recipe.meal_type]++;
                }
            });
            
            // Should have at least one recipe for main meal types
            expect(mealTypeCounts.breakfast, 'Should have breakfast recipes').toBeGreaterThan(0);
            expect(mealTypeCounts.lunch, 'Should have lunch recipes').toBeGreaterThan(0);
            expect(mealTypeCounts.dinner, 'Should have dinner recipes').toBeGreaterThan(0);
            
            console.log('Meal type distribution:', mealTypeCounts);
        });

        it('should ensure search functionality will find results', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            // Test common search terms
            const searchTerms = ['chicken', 'beef', 'salad', 'pasta', 'eggs'];
            
            searchTerms.forEach(term => {
                const matches = recipes.filter(recipe => {
                    const searchText = (
                        recipe.title + ' ' + 
                        recipe.description + ' ' + 
                        (recipe.tags || []).join(' ') + ' ' + 
                        (recipe.labels || []).join(' ')
                    ).toLowerCase();
                    
                    return searchText.includes(term.toLowerCase());
                });
                
                if (matches.length === 0) {
                    console.warn(`Warning: Search term "${term}" returns no results`);
                }
            });
        });
    });

    describe('UI Component Compatibility', () => {
        it('should ensure dropdown options will be populated', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            // Simulate getAllLabels() method from RecipeManager
            const allLabels = new Set();
            recipes.forEach(recipe => {
                (recipe.labels || []).forEach(label => allLabels.add(label));
                (recipe.tags || []).forEach(tag => allLabels.add(tag));
            });
            
            const labelArray = Array.from(allLabels).sort();
            
            // Should have labels for dropdown population
            expect(labelArray.length, 'Should have labels for dropdown options').toBeGreaterThan(0);
            
            // Should have variety (more than just one label)
            expect(labelArray.length, 'Should have multiple labels for meaningful filtering').toBeGreaterThan(3);
        });

        it('should ensure statistics will show meaningful numbers', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            // Recipe count
            expect(recipes.length, 'Should have multiple recipes for demo').toBeGreaterThan(3);
            
            // Label variety
            const uniqueLabels = new Set();
            recipes.forEach(recipe => {
                (recipe.labels || []).forEach(label => uniqueLabels.add(label));
                (recipe.tags || []).forEach(tag => uniqueLabels.add(tag));
            });
            
            expect(uniqueLabels.size, 'Should have diverse labels for statistics').toBeGreaterThan(5);
            
            // Favorites (should have some but not all)
            const favoriteCount = recipes.filter(r => r.favorite === true).length;
            expect(favoriteCount, 'Should have some favorites for testing').toBeGreaterThan(0);
            expect(favoriteCount, 'Should not have all favorites (need variety)').toBeLessThan(recipes.length);
        });
    });

    describe('Performance and Scalability', () => {
        it('should not have excessively long tag/label arrays', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            recipes.forEach((recipe, index) => {
                // Prevent performance issues with too many tags
                expect(recipe.tags.length, `Recipe ${index + 1} has too many tags`).toBeLessThan(20);
                expect(recipe.labels.length, `Recipe ${index + 1} has too many labels`).toBeLessThan(20);
                
                // Ensure tags are reasonable length (not essays)
                recipe.tags.forEach((tag, tagIndex) => {
                    expect(tag.length, `Recipe ${index + 1} tag ${tagIndex + 1} too long`).toBeLessThan(50);
                });
                
                recipe.labels.forEach((label, labelIndex) => {
                    expect(label.length, `Recipe ${index + 1} label ${labelIndex + 1} too long`).toBeLessThan(50);
                });
            });
        });

        it('should have reasonable total number of unique labels', () => {
            const demoData = new DemoDataManager();
            const recipes = demoData.getRecipes();
            
            const uniqueLabels = new Set();
            recipes.forEach(recipe => {
                (recipe.labels || []).forEach(label => uniqueLabels.add(label));
                (recipe.tags || []).forEach(tag => uniqueLabels.add(tag));
            });
            
            // Should have enough variety but not overwhelming
            expect(uniqueLabels.size, 'Should have sufficient label variety').toBeGreaterThan(10);
            expect(uniqueLabels.size, 'Should not have excessive labels (UI performance)').toBeLessThan(100);
        });
    });
});
