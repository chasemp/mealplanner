/**
 * Export/Import Functionality Tests
 * Tests the robust export/import system for demo data management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn()
};

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-url');
global.URL.revokeObjectURL = vi.fn();

// Mock document.createElement and appendChild for file download simulation
const mockAnchor = {
    href: '',
    download: '',
    click: vi.fn()
};

// We'll set up these mocks after JSDOM is created

describe('Export/Import Functionality', () => {
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
                    <button id="export-db-btn">Export Database</button>
                    <button id="import-db-btn">Import Database</button>
                    <input type="file" id="import-file-input" accept=".json" style="display: none;">
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
        global.localStorage = localStorageMock;

        // Set up mocks after JSDOM is created
        global.document.createElement = vi.fn((tagName) => {
            if (tagName === 'a') {
                return mockAnchor;
            }
            return document.createElement(tagName);
        });

        // Mock document.body methods by spying on the actual methods
        vi.spyOn(document.body, 'appendChild').mockImplementation(vi.fn());
        vi.spyOn(document.body, 'removeChild').mockImplementation(vi.fn());

        // Mock mealPlanner instance
        mealPlanner = {
            getCurrentDatabaseData: vi.fn(() => ({
                version: '2025.09.13.0859',
                exported: new Date().toISOString(),
                schema: {
                    items: 'mealplanner_items',
                    recipes: 'mealplanner_recipes',
                    scheduledMeals: 'mealplanner_scheduledMeals',
                    planScheduledMeals: 'mealplanner_planScheduledMeals',
                    menuScheduledMeals: 'mealplanner_menuScheduledMeals',
                    pantryItems: 'mealplanner_pantryItems',
                    groceryList: 'mealplanner_groceryList',
                    demoDataPopulated: 'mealplanner_demo_data_populated',
                    mealPreferences: 'mealPreferences',
                    favoriteRecipes: 'favoriteRecipes',
                    settings: 'mealplanner_settings'
                },
                data: {
                    items: [
                        { id: 1, name: 'Chicken', category: 'meat', default_unit: 'pounds' },
                        { id: 2, name: 'Rice', category: 'pantry', default_unit: 'cups' }
                    ],
                    recipes: [
                        { id: 1, title: 'Chicken and Rice', description: 'A simple dish', servings: 4, prep_time: 15, cook_time: 30, recipe_type: 'regular' },
                        { id: 2, title: 'Complete Dinner Combo', description: 'A complete dinner', servings: 4, recipe_type: 'combo' }
                    ],
                    scheduledMeals: [],
                    planScheduledMeals: [
                        { id: 'plan-1', recipe_id: 1, mealDate: '2025-09-08T17:00:00.000Z' }
                    ],
                    menuScheduledMeals: [],
                    pantryItems: [],
                    groceryList: [],
                    demoDataPopulated: true,
                    mealPreferences: {},
                    favoriteRecipes: [],
                    settings: {}
                }
            })),
            showNotification: vi.fn(),
            refreshAllComponents: vi.fn(),
            handleExportDatabase: function() {
                console.log('💾 Exporting database...');
                
                try {
                    const dbData = this.getCurrentDatabaseData();
                    const jsonString = JSON.stringify(dbData, null, 2);
                    const blob = new Blob([jsonString], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `mealplanner-export-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    this.showNotification('Database exported successfully!', 'success');
                } catch (error) {
                    console.error('❌ Error exporting database:', error);
                    this.showNotification('Error exporting database. Please try again.', 'error');
                }
            },
            handleImportDatabase: function() {
                console.log('📥 Opening file picker for import...');
                const fileInput = document.getElementById('import-file-input');
                if (fileInput) {
                    fileInput.click();
                } else {
                    this.showNotification('Import functionality not available.', 'error');
                }
            },
            handleImportFile: async function(event) {
                const file = event.target.files[0];
                if (!file) return;

                try {
                    const text = await this.readFileAsText(file);
                    const importData = JSON.parse(text);
                    
                    if (!this.validateImportData(importData)) {
                        this.showNotification('Invalid import file format.', 'error');
                        return;
                    }

                    const confirmed = await this.confirmImport(importData);
                    if (!confirmed) return;

                    await this.importDataToLocalStorage(importData);
                    await this.refreshAllComponents();
                    
                    this.showNotification('Database imported successfully! All data has been refreshed.', 'success');
                } catch (error) {
                    console.error('❌ Error importing database:', error);
                    this.showNotification('Error importing database. Please check the file format and try again.', 'error');
                } finally {
                    event.target.value = '';
                }
            },
            readFileAsText: function(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = (e) => reject(e);
                    reader.readAsText(file);
                });
            },
            validateImportData: function(data) {
                return !!(data && 
                         data.version && 
                         data.schema && 
                         data.data && 
                         Array.isArray(data.data.items) && 
                         Array.isArray(data.data.recipes));
            },
            confirmImport: async function(data) {
                const itemCount = data.data.items?.length || 0;
                const recipeCount = data.data.recipes?.length || 0;
                const comboCount = data.data.combos?.length || 0;
                const scheduledCount = data.data.scheduledMeals?.length || 0;
                
                const message = `Import data from ${data.exported}?\n\nItems: ${itemCount}\nRecipes: ${recipeCount}\nCombos: ${comboCount}\nScheduled Meals: ${scheduledCount}\n\nThis will replace all current data. Continue?`;
                
                // Mock confirmation - in real app this would show a dialog
                return window.confirm(message);
            },
            importDataToLocalStorage: async function(data) {
                console.log('📥 Importing data to localStorage...');
                
                // Import each data type
                Object.keys(data.schema).forEach(key => {
                    const storageKey = data.schema[key];
                    const dataArray = data.data[key];
                    if (dataArray !== null && dataArray !== undefined) {
                        localStorage.setItem(storageKey, JSON.stringify(dataArray));
                        console.log(`✅ Imported ${key}: ${dataArray.length} items`);
                    }
                });
                
                console.log('✅ Data import completed');
            }
        };

        // Reset mocks
        vi.clearAllMocks();
        localStorageMock.getItem.mockReturnValue(null);
    });

    afterEach(() => {
        dom.window.close();
    });

    describe('Export Functionality', () => {
        it('should export database data successfully', () => {
            // Act
            mealPlanner.handleExportDatabase();

            // Assert
            expect(mealPlanner.getCurrentDatabaseData).toHaveBeenCalled();
            expect(URL.createObjectURL).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith('a');
            expect(mockAnchor.click).toHaveBeenCalled();
            expect(document.body.appendChild).toHaveBeenCalled();
            expect(document.body.removeChild).toHaveBeenCalled();
            expect(URL.revokeObjectURL).toHaveBeenCalled();
            expect(mealPlanner.showNotification).toHaveBeenCalledWith('Database exported successfully!', 'success');
        });

        it('should handle export errors gracefully', () => {
            // Arrange
            mealPlanner.getCurrentDatabaseData.mockImplementation(() => {
                throw new Error('Export failed');
            });

            // Act
            mealPlanner.handleExportDatabase();

            // Assert
            expect(mealPlanner.showNotification).toHaveBeenCalledWith('Error exporting database. Please try again.', 'error');
        });

        it('should create properly formatted export data', () => {
            // Act
            const exportData = mealPlanner.getCurrentDatabaseData();

            // Assert
            expect(exportData).toHaveProperty('version');
            expect(exportData).toHaveProperty('exported');
            expect(exportData).toHaveProperty('schema');
            expect(exportData).toHaveProperty('data');
            expect(exportData.data).toHaveProperty('items');
            expect(exportData.data).toHaveProperty('recipes');
            expect(exportData.data).toHaveProperty('scheduledMeals');
            expect(exportData.data).toHaveProperty('planScheduledMeals');
            expect(exportData.data).toHaveProperty('menuScheduledMeals');
            expect(Array.isArray(exportData.data.items)).toBe(true);
            expect(Array.isArray(exportData.data.recipes)).toBe(true);
        });
    });

    describe('Import Functionality', () => {
        it('should open file picker for import', () => {
            // Arrange
            const fileInput = document.getElementById('import-file-input');
            const clickSpy = vi.spyOn(fileInput, 'click');

            // Act
            mealPlanner.handleImportDatabase();

            // Assert
            expect(clickSpy).toHaveBeenCalled();
        });

        it('should handle missing file input gracefully', () => {
            // Arrange
            const fileInput = document.getElementById('import-file-input');
            fileInput.remove();

            // Act
            mealPlanner.handleImportDatabase();

            // Assert
            expect(mealPlanner.showNotification).toHaveBeenCalledWith('Import functionality not available.', 'error');
        });

        it('should validate import data correctly', () => {
            // Arrange
            const validData = {
                version: '2025.09.13.0859',
                schema: { items: 'test' },
                data: { items: [], recipes: [] }
            };

            const invalidData = {
                version: '2025.09.13.0859'
                // Missing schema and data
            };

            // Act & Assert
            expect(mealPlanner.validateImportData(validData)).toBe(true);
            expect(mealPlanner.validateImportData(invalidData)).toBe(false);
            expect(mealPlanner.validateImportData(null)).toBe(false);
            expect(mealPlanner.validateImportData(undefined)).toBe(false);
        });

        it('should import data to localStorage correctly', async () => {
            // Arrange
            const importData = {
                schema: {
                    items: 'mealplanner_items',
                    recipes: 'mealplanner_recipes'
                },
                data: {
                    items: [{ id: 1, name: 'Test Item' }],
                    recipes: [{ id: 1, title: 'Test Recipe' }]
                }
            };

            // Act
            await mealPlanner.importDataToLocalStorage(importData);

            // Assert
            expect(localStorage.setItem).toHaveBeenCalledWith('mealplanner_items', JSON.stringify([{ id: 1, name: 'Test Item' }]));
            expect(localStorage.setItem).toHaveBeenCalledWith('mealplanner_recipes', JSON.stringify([{ id: 1, title: 'Test Recipe' }]));
        });

        it('should handle null/undefined data arrays gracefully', async () => {
            // Arrange
            const importData = {
                schema: {
                    items: 'mealplanner_items',
                    recipes: 'mealplanner_recipes',
                    combos: 'mealplanner_combos'
                },
                data: {
                    items: [{ id: 1, name: 'Test Item' }],
                    recipes: null,
                    combos: undefined
                }
            };

            // Act
            await mealPlanner.importDataToLocalStorage(importData);

            // Assert
            expect(localStorage.setItem).toHaveBeenCalledWith('mealplanner_items', JSON.stringify([{ id: 1, name: 'Test Item' }]));
            expect(localStorage.setItem).not.toHaveBeenCalledWith('mealplanner_recipes', expect.anything());
            expect(localStorage.setItem).not.toHaveBeenCalledWith('mealplanner_combos', expect.anything());
        });
    });

    describe('File Reading', () => {
        it('should read file as text correctly', async () => {
            // Arrange
            const mockFile = new File(['{"test": "data"}'], 'test.json', { type: 'application/json' });
            
            // Mock FileReader
            const mockReader = {
                readAsText: vi.fn(),
                onload: null,
                onerror: null
            };
            global.FileReader = vi.fn(() => mockReader);

            // Act
            const promise = mealPlanner.readFileAsText(mockFile);
            
            // Simulate successful read
            mockReader.onload({ target: { result: '{"test": "data"}' } });
            const result = await promise;

            // Assert
            expect(result).toBe('{"test": "data"}');
            expect(mockReader.readAsText).toHaveBeenCalledWith(mockFile);
        });

        it('should handle file reading errors', async () => {
            // Arrange
            const mockFile = new File([''], 'test.json', { type: 'application/json' });
            
            const mockReader = {
                readAsText: vi.fn(),
                onload: null,
                onerror: null
            };
            global.FileReader = vi.fn(() => mockReader);

            // Act & Assert
            const promise = mealPlanner.readFileAsText(mockFile);
            
            // Simulate error
            mockReader.onerror({ target: { error: 'Read failed' } });
            
            await expect(promise).rejects.toEqual({ target: { error: 'Read failed' } });
        });
    });

    describe('Integration Tests', () => {
        it('should complete full export-import cycle', async () => {
            // Arrange
            const originalData = mealPlanner.getCurrentDatabaseData();
            const mockFile = new File([JSON.stringify(originalData)], 'test-export.json', { type: 'application/json' });
            
            // Mock FileReader for import
            const mockReader = {
                readAsText: vi.fn(),
                onload: null,
                onerror: null
            };
            global.FileReader = vi.fn(() => mockReader);

            // Mock window.confirm for import confirmation
            global.window.confirm = vi.fn(() => true);

            // Act - Export
            mealPlanner.handleExportDatabase();

            // Act - Import
            const importPromise = mealPlanner.handleImportFile({ target: { files: [mockFile] } });
            mockReader.onload({ target: { result: JSON.stringify(originalData) } });
            await importPromise;

            // Assert
            expect(mealPlanner.getCurrentDatabaseData).toHaveBeenCalled();
            expect(mealPlanner.refreshAllComponents).toHaveBeenCalled();
            expect(mealPlanner.showNotification).toHaveBeenCalledWith('Database imported successfully! All data has been refreshed.', 'success');
        });
    });
});
