import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

// Mock IndexedDB
const mockIndexedDB = {
    open: vi.fn(() => ({
        onsuccess: null,
        onerror: null,
        onupgradeneeded: null,
        result: {
            transaction: vi.fn(() => ({
                objectStore: vi.fn(() => ({
                    put: vi.fn(),
                    get: vi.fn(() => ({ onsuccess: null, onerror: null }))
                })),
                oncomplete: null,
                onerror: null
            })),
            objectStoreNames: { contains: vi.fn(() => false) },
            createObjectStore: vi.fn()
        }
    }))
};

describe('Settings Manager', () => {
    let dom;
    let SettingsManager;
    let settingsManager;

    beforeEach(async () => {
        // Setup DOM
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <select id="source-type-select">
                    <option value="demo">Demo Data</option>
                    <option value="local">Local Database</option>
                    <option value="github">GitHub Repository</option>
                </select>
                
                <div id="demo-options" class="source-options"></div>
                <div id="local-options" class="source-options hidden"></div>
                <div id="github-options" class="source-options hidden"></div>
                
                <input type="file" id="local-file-input" />
                <button id="local-file-btn">Choose File</button>
                <span id="local-file-name"></span>
                
                <input type="url" id="github-repo-url" />
                <textarea id="github-deploy-key"></textarea>
                <input type="checkbox" id="github-read-only" />
                
                <input type="checkbox" id="show-breakfast" checked />
                <input type="checkbox" id="show-lunch" checked />
                <input type="checkbox" id="show-dinner" checked />
                
                <input type="checkbox" id="calendar-managed-mode" />
                <input type="checkbox" id="calendar-notifications" />
                
                <button id="apply-source-btn">Apply Source</button>
                <button id="export-db-btn-settings">Export Database</button>
                
                <button class="nav-tab" data-tab="breakfast">Breakfast</button>
                <button class="nav-tab" data-tab="lunch">Lunch</button>
                <button class="nav-tab" data-tab="dinner">Dinner</button>
                
                <div id="breakfast-tab"></div>
                <div id="lunch-tab"></div>
                <div id="dinner-tab"></div>
            </body>
            </html>
        `, { url: 'http://localhost' });

        global.window = dom.window;
        global.document = dom.window.document;
        global.localStorage = localStorageMock;
        global.indexedDB = mockIndexedDB;
        global.fetch = vi.fn();
        global.btoa = vi.fn(str => Buffer.from(str).toString('base64'));
        global.atob = vi.fn(str => Buffer.from(str, 'base64').toString());

        // Mock console methods
        global.console.log = vi.fn();
        global.console.warn = vi.fn();
        global.console.error = vi.fn();

        // Load the SettingsManager
        const { SettingsManager: SM } = await import('../../../js/settings-manager.js');
        SettingsManager = SM;
    });

    afterEach(() => {
        vi.clearAllMocks();
        if (dom) {
            dom.window.close();
        }
    });

    describe('Initialization', () => {
        it('should initialize with default settings', () => {
            settingsManager = new SettingsManager();
            
            expect(settingsManager.settings).toEqual({
                sourceType: 'demo',
                localDbPath: '',
                githubRepo: '',
                // githubDeployKey removed for security - stored in IndexedDB
                githubReadOnly: false,
                showBreakfast: true,
                showLunch: true,
                showDinner: true,
                calendarManagedMode: false,
                calendarNotifications: false
            });
        });

        it('should load settings from localStorage if available', () => {
            const savedSettings = {
                sourceType: 'github',
                githubRepo: 'https://github.com/chasemp/mp',
                showLunch: false
            };
            
            localStorageMock.getItem.mockReturnValue(JSON.stringify(savedSettings));
            
            settingsManager = new SettingsManager();
            
            expect(settingsManager.settings.sourceType).toBe('github');
            expect(settingsManager.settings.githubRepo).toBe('https://github.com/chasemp/mp');
            expect(settingsManager.settings.showLunch).toBe(false);
            expect(settingsManager.settings.showBreakfast).toBe(true); // Default preserved
        });

        it('should handle corrupted localStorage gracefully', () => {
            localStorageMock.getItem.mockReturnValue('invalid json');
            
            expect(() => {
                settingsManager = new SettingsManager();
            }).not.toThrow();
            
            expect(settingsManager.settings.sourceType).toBe('demo');
        });
    });

    describe('Settings Persistence', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should save settings to localStorage', () => {
            settingsManager.settings.sourceType = 'github';
            settingsManager.saveSettings();
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'mealplanner-settings',
                JSON.stringify(settingsManager.settings)
            );
        });

        it('should handle save errors gracefully', () => {
            localStorageMock.setItem.mockImplementation(() => {
                throw new Error('Storage quota exceeded');
            });
            
            expect(() => {
                settingsManager.saveSettings();
            }).not.toThrow();
        });
    });

    describe('Source Type Management', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should show correct source options based on selection', () => {
            settingsManager.showSourceOptions('demo');
            
            const demoOptions = document.getElementById('demo-options');
            const localOptions = document.getElementById('local-options');
            const githubOptions = document.getElementById('github-options');
            
            expect(demoOptions.classList.contains('hidden')).toBe(false);
            expect(localOptions.classList.contains('hidden')).toBe(true);
            expect(githubOptions.classList.contains('hidden')).toBe(true);
        });

        it('should update settings when source type changes', () => {
            const sourceSelect = document.getElementById('source-type-select');
            sourceSelect.value = 'github';
            sourceSelect.dispatchEvent(new dom.window.Event('change'));
            
            expect(settingsManager.settings.sourceType).toBe('github');
        });
    });

    describe('Meal Type Visibility', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should apply meal type visibility settings', () => {
            settingsManager.settings.showBreakfast = false;
            settingsManager.settings.showLunch = true;
            settingsManager.settings.showDinner = false;
            
            settingsManager.applyMealTypeVisibility();
            
            const breakfastTab = document.querySelector('[data-tab="breakfast"]');
            const lunchTab = document.querySelector('[data-tab="lunch"]');
            const dinnerTab = document.querySelector('[data-tab="dinner"]');
            
            expect(breakfastTab.style.display).toBe('none');
            expect(lunchTab.style.display).toBe('');
            expect(dinnerTab.style.display).toBe('none');
        });

        it('should update checkboxes to match settings', () => {
            settingsManager.settings.showBreakfast = false;
            settingsManager.settings.showLunch = true;
            settingsManager.settings.showDinner = false;
            
            settingsManager.applyMealTypeVisibility();
            
            const breakfastCheckbox = document.getElementById('show-breakfast');
            const lunchCheckbox = document.getElementById('show-lunch');
            const dinnerCheckbox = document.getElementById('show-dinner');
            
            expect(breakfastCheckbox.checked).toBe(false);
            expect(lunchCheckbox.checked).toBe(true);
            expect(dinnerCheckbox.checked).toBe(false);
        });

        it('should handle meal type checkbox changes', () => {
            const breakfastCheckbox = document.getElementById('show-breakfast');
            breakfastCheckbox.checked = false;
            breakfastCheckbox.dispatchEvent(new dom.window.Event('change'));
            
            expect(settingsManager.settings.showBreakfast).toBe(false);
        });
    });

    describe('GitHub Integration', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should handle GitHub repository URL changes', () => {
            const repoInput = document.getElementById('github-repo-url');
            repoInput.value = 'https://github.com/chasemp/mp';
            repoInput.dispatchEvent(new dom.window.Event('change'));
            
            expect(settingsManager.settings.githubRepo).toBe('https://github.com/chasemp/mp');
        });

        it('should handle deploy key changes', () => {
            const deployKeyInput = document.getElementById('github-deploy-key');
            const testKey = '-----BEGIN OPENSSH PRIVATE KEY-----\ntest\n-----END OPENSSH PRIVATE KEY-----';
            deployKeyInput.value = testKey;
            deployKeyInput.dispatchEvent(new dom.window.Event('change'));
            
            // Deploy key is no longer stored in settings for security
            // It should be stored in SecureTokenStorage (IndexedDB)
            expect(settingsManager.settings.githubDeployKey).toBeUndefined();
        });

        it('should handle read-only mode toggle', () => {
            const readOnlyInput = document.getElementById('github-read-only');
            readOnlyInput.checked = true;
            readOnlyInput.dispatchEvent(new dom.window.Event('change'));
            
            expect(settingsManager.settings.githubReadOnly).toBe(true);
        });
    });

    describe('Database Operations', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should handle demo data loading', async () => {
            settingsManager.settings.sourceType = 'demo';
            
            const result = await settingsManager.loadDemoData();
            expect(result).toBe(true);
        });

        it('should handle local database file selection', () => {
            const fileInput = document.getElementById('local-file-input');
            const mockFile = new dom.window.File(['test'], 'test.db', { type: 'application/x-sqlite3' });
            
            Object.defineProperty(fileInput, 'files', {
                value: [mockFile],
                writable: false,
            });
            
            fileInput.dispatchEvent(new dom.window.Event('change'));
            
            expect(document.getElementById('local-file-name').textContent).toBe('test.db');
            expect(settingsManager.settings.localDbPath).toBe('test.db');
        });

        it('should serialize database to text format', async () => {
            const testData = new Uint8Array([1, 2, 3, 4, 5]);
            const result = await settingsManager.serializeDatabaseToText(testData);
            
            const parsed = JSON.parse(result);
            expect(parsed.format).toBe('mealplanner-db');
            expect(parsed.version).toBe('1.0');
            expect(parsed.data).toBeDefined();
        });
    });

    describe('Error Handling', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should handle missing DOM elements gracefully', () => {
            // Remove an element
            document.getElementById('source-type-select').remove();
            
            expect(() => {
                settingsManager.applySettings();
            }).not.toThrow();
        });

        it('should handle database loading errors', async () => {
            settingsManager.settings.sourceType = 'local';
            
            try {
                await settingsManager.loadLocalDatabase();
            } catch (error) {
                expect(error.message).toContain('Please select a database file first');
            }
        });

        it('should show error notifications for failed operations', async () => {
            // Mock showNotification
            settingsManager.showNotification = vi.fn();
            
            settingsManager.settings.sourceType = 'local';
            
            try {
                await settingsManager.applyDatabaseSource();
            } catch (error) {
                // Expected to fail
            }
            
            expect(settingsManager.showNotification).toHaveBeenCalledWith(
                expect.stringContaining('Failed to apply database source'),
                'error'
            );
        });
    });

    describe('GitHub Database Sync', () => {
        let GitHubDatabaseSync;
        let githubSync;

        beforeEach(async () => {
            const { GitHubDatabaseSync: GDS } = await import('../../../js/settings-manager.js');
            GitHubDatabaseSync = GDS;
        });

        it('should parse GitHub repository URL correctly', () => {
            githubSync = new GitHubDatabaseSync('https://github.com/chasemp/mp', 'test-key');
            
            expect(githubSync.owner).toBe('chasemp');
            expect(githubSync.repo).toBe('mp');
        });

        it('should throw error for invalid repository URL', () => {
            expect(() => {
                new GitHubDatabaseSync('invalid-url', 'test-key');
            }).toThrow('Invalid GitHub repository URL');
        });

        it('should handle read-only mode correctly', () => {
            githubSync = new GitHubDatabaseSync('https://github.com/chasemp/mp', '', true);
            
            expect(githubSync.readOnly).toBe(true);
        });

        it('should validate repository URL format', () => {
            // Test URL parsing logic that works in Node.js
            expect(() => {
                new GitHubDatabaseSync('https://github.com/chasemp/mp');
            }).not.toThrow();
            
            expect(() => {
                new GitHubDatabaseSync('invalid-url');
            }).toThrow('Invalid GitHub repository URL');
        });

        it('should extract owner and repo from URL', () => {
            const sync = new GitHubDatabaseSync('https://github.com/chasemp/mp');
            expect(sync.owner).toBe('chasemp');
            expect(sync.repo).toBe('mp');
            expect(sync.sshUrl).toBe('git@github.com:chasemp/mp.git');
        });
    });
});
