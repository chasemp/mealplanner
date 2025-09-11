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
        getRecipeTypeLabels: () => ['Recipe Combo']
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
