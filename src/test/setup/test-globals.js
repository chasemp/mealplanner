/**
 * Test Environment Global Setup
 * 
 * This file sets up global mocks and dependencies that are required
 * by the application managers but not available in the test environment.
 */

import { vi } from 'vitest';

// Mock SettingsManager for tests
class MockSettingsManager {
    constructor() {
        this.settings = {
            confirmBeforeClearingFilters: false,
            requireDoublePressForClearFilters: false,
            calendarManagedMode: false,
            calendarNotifications: false
        };
    }

    static createClearFiltersHandler(clearCallback, buttonSelector, managerInstance) {
        // Return a simple handler that just calls the callback
        return function() {
            clearCallback();
        };
    }

    createClearFiltersHandler(clearCallback, buttonSelector, managerInstance) {
        return MockSettingsManager.createClearFiltersHandler(clearCallback, buttonSelector, managerInstance);
    }

    saveSettings() {
        // Mock implementation
    }

    loadSettings() {
        // Mock implementation
    }

    getCurrentDatabaseSource() {
        return 'demo';
    }
}

// Set up global mocks before tests run
beforeEach(() => {
    // Mock SettingsManager globally
    global.SettingsManager = MockSettingsManager;
    global.window = global.window || {};
    global.window.mealPlannerSettings = new MockSettingsManager();
    global.window.settingsManager = global.window.mealPlannerSettings;
    
// Mock other global dependencies
global.window.labelTypes = {
    getAllPredefinedLabels: () => ['quick', 'healthy', 'vegetarian', 'protein-rich'],
    getLabelType: (label) => 'general',
    inferLabelType: (label) => 'general', // Add missing method
    getMealTypeLabels: () => ['Breakfast', 'Lunch', 'Dinner'],
    getRecipeTypeLabels: () => ['Recipe Combo'],
    getColorClasses: (labelType) => {
        // Mock color classes for different label types
        const colorMap = {
            'meal_type': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            'recipe_type': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            'general': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
        return colorMap[labelType] || colorMap['general'];
    },
    getIcon: (labelType) => {
        // Mock icons for different label types
        const iconMap = {
            'meal_type': '🍽️',
            'recipe_type': '🍳',
            'general': '🏷️'
        };
        return iconMap[labelType] || iconMap['general'];
    }
};
    
    // Mock console methods to reduce test noise
    global.console = {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        info: vi.fn()
    };
    
    // Mock localStorage
    global.localStorage = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
    };
    
    // Mock performance API
    global.performance = {
        now: vi.fn(() => Date.now())
    };
});
