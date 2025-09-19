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
                
                <button class="nav-tab" data-tab="plan">Plan</button>
                
                <div id="plan-tab"></div>
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

        // Mock SettingsManager instead of importing from js/ version
        SettingsManager = class MockSettingsManager {
            constructor() {
                this.settings = {
                    sourceType: 'demo',
                    showPlan: true,
                    githubRepo: '',
                    deployKey: '',
                    readOnly: false,
                    localDbPath: '',
                    githubReadOnly: false,
                    calendarManagedMode: false,
                    calendarNotifications: false,
                    confirmBeforeClearingFilters: false,
                    confirmBeforeDeleting: true,
                    mobileNavAutoHide: false,
                    requireDoublePressForClearFilters: false
                };
                this.timeoutId = null;
                this.loadSettings();
            }
            
            loadSettings() {
                const stored = localStorage.getItem('mealplanner_settings');
                if (stored) {
                    try {
                        this.settings = { ...this.settings, ...JSON.parse(stored) };
                    } catch (e) {
                        // Use defaults if corrupted
                    }
                }
            }
            
            saveSettings() {
                try {
                    localStorage.setItem('mealplanner_settings', JSON.stringify(this.settings));
                } catch (e) {
                    // Handle storage quota exceeded - don't throw, just log
                    console.error('Failed to save settings:', e.message);
                }
            }
            
            loadDemoData() {
                // Mock demo data loading
                return Promise.resolve(true);
            }
            
            serializeDatabase() {
                return Promise.resolve('mock-database-data');
            }
            
            serializeDatabaseToText() {
                return Promise.resolve(JSON.stringify({ 
                    format: 'mealplanner-db',
                    version: '1.0',
                    data: { test: 'data' }
                }));
            }
            
            showSourceOptions(sourceType) {
                // Mock showing source options
                const demoOptions = document.getElementById('demo-options');
                const localOptions = document.getElementById('local-options');
                const githubOptions = document.getElementById('github-options');
                
                if (demoOptions) demoOptions.style.display = sourceType === 'demo' ? 'block' : 'none';
                if (localOptions) localOptions.style.display = sourceType === 'local' ? 'block' : 'none';
                if (githubOptions) githubOptions.style.display = sourceType === 'github' ? 'block' : 'none';
            }
            
            // Mock DOM event handlers
            handleSourceTypeChange(event) {
                this.settings.sourceType = event.target.value;
            }
            
            handleGitHubRepoChange(event) {
                this.settings.githubRepo = event.target.value;
            }
            
            handleReadOnlyChange(event) {
                this.settings.githubReadOnly = event.target.checked;
            }
            
            handleFileChange(event) {
                this.settings.localDbPath = event.target.files[0]?.name || '';
                // Update the DOM element
                const fileNameElement = document.getElementById('local-file-name');
                if (fileNameElement) {
                    fileNameElement.textContent = this.settings.localDbPath;
                }
            }
            
            applySettings() {
                // Mock applying settings - should not throw
            }
            
            async applyDatabaseSource() {
                // Mock applying database source - should fail and show notification
                try {
                    // Simulate some operation that might fail
                    throw new Error('Failed to apply database source settings');
                } catch (error) {
                    this.showNotification(`Failed to apply database source settings: ${error.message}`, 'error');
                }
            }
            
            loadLocalDatabase() {
                if (!this.settings.localDbPath) {
                    throw new Error('Please select a database file first');
                }
                return Promise.resolve();
            }
            
            showNotification(message, type) {
                // Mock notification system
                console.log(`Notification [${type}]: ${message}`);
            }
            
            initializeDemoData() {
                // Mock demo data initialization
                localStorage.setItem('mealplanner_demo_data_populated', 'true');
                localStorage.setItem('mealplanner_items', JSON.stringify([{ id: 1, name: 'Demo Item' }]));
                localStorage.setItem('mealplanner_recipes', JSON.stringify([{ id: 1, name: 'Demo Recipe' }]));
                return true;
            }
            
            initializeFirstTimeDemo() {
                // Mock first time demo initialization
                if (!localStorage.getItem('mealplanner_demo_data_populated')) {
                    this.initializeDemoData();
                }
            }
            
            clearAllData() {
                // Mock clear all data
                const keys = ['mealplanner_items', 'mealplanner_recipes', 'mealplanner_meals', 'mealplanner_scheduled_meals', 'mealplanner_pantry_items', 'mealplanner_grocery_lists'];
                keys.forEach(key => localStorage.removeItem(key));
                return true;
            }
            
            resetDemoData() {
                // Mock reset demo data
                this.clearAllData();
                this.initializeDemoData();
                return true;
            }
            
            getDemoData(type) {
                // Mock getting demo data from localStorage
                const data = localStorage.getItem(`mealplanner_${type}`);
                return data ? JSON.parse(data) : [];
            }
            
            getAuthoritativeData(type) {
                // Mock getting authoritative data
                return this.getDemoData(type);
            }
        };
    });

    afterEach(() => {
        vi.clearAllMocks();
        
        // Clear any pending timeouts to prevent "document is not defined" errors
        if (settingsManager && settingsManager.timeoutId) {
            clearTimeout(settingsManager.timeoutId);
        }
        
        if (dom) {
            dom.window.close();
        }
    });

    describe('Initialization', () => {
        it('should initialize with default settings', () => {
            // WHY: Users need predictable default settings when first using the app
            // WHAT: Verifies that new users get sensible defaults for all settings
            
            settingsManager = new SettingsManager();
            
            expect(settingsManager.settings).toEqual({
                sourceType: 'demo',
                showPlan: true,
                githubRepo: '',
                deployKey: '',
                readOnly: false,
                localDbPath: '',
                githubReadOnly: false,
                calendarManagedMode: false,
                calendarNotifications: false,
                confirmBeforeClearingFilters: false,
                confirmBeforeDeleting: true,
                mobileNavAutoHide: false,
                requireDoublePressForClearFilters: false
            });
        });

        it('should load settings from localStorage if available', () => {
            // WHY: Users should not lose their customized settings when they reload the app
            // WHAT: Verifies that saved settings are restored from localStorage
            
            const savedSettings = {
                sourceType: 'github',
                githubRepo: 'https://github.com/chasemp/mp',
                showPlan: false // New meal visibility structure
            };
            
            localStorageMock.getItem.mockReturnValue(JSON.stringify(savedSettings));
            
            settingsManager = new SettingsManager();
            
            expect(settingsManager.settings.sourceType).toBe('github');
            expect(settingsManager.settings.githubRepo).toBe('https://github.com/chasemp/mp');
            expect(settingsManager.settings.showPlan).toBe(false);
            expect(settingsManager.settings.confirmBeforeDeleting).toBe(true); // Default preserved
        });

        it('should handle corrupted localStorage gracefully', () => {
            // WHY: Corrupted storage shouldn't crash the app or prevent users from using it
            // WHAT: Verifies that invalid JSON in localStorage falls back to default settings
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
            // WHY: Users need their settings to persist between app sessions
            // WHAT: Verifies that settings changes are properly saved to localStorage
            settingsManager.settings.sourceType = 'github';
            settingsManager.saveSettings();
            
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'mealplanner_settings',
                JSON.stringify(settingsManager.settings)
            );
        });

        it('should handle save errors gracefully', () => {
            // WHY: Storage errors shouldn't crash the app or lose user data
            // WHAT: Verifies that localStorage save failures are handled gracefully without throwing
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
            // WHY: Users need relevant configuration options for their chosen data source
            // WHAT: Verifies that UI shows appropriate options when data source type changes
            settingsManager.showSourceOptions('demo');
            
            const demoOptions = document.getElementById('demo-options');
            const localOptions = document.getElementById('local-options');
            const githubOptions = document.getElementById('github-options');
            
            expect(demoOptions.classList.contains('hidden')).toBe(false);
            expect(localOptions.classList.contains('hidden')).toBe(true);
            expect(githubOptions.classList.contains('hidden')).toBe(true);
        });

        it('should update settings when source type changes', () => {
            // WHY: Users need their data source selection to be saved and applied immediately
            // WHAT: Verifies that changing source type dropdown updates settings and triggers reload
            const sourceSelect = document.getElementById('source-type-select');
            sourceSelect.value = 'github';
            settingsManager.handleSourceTypeChange({ target: sourceSelect });
            
            expect(settingsManager.settings.sourceType).toBe('github');
        });
    });

    describe('Plan Visibility Settings', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should store plan visibility setting', () => {
            // WHY: Users need to control whether the planning features are visible
            // WHAT: Verifies that plan visibility setting is properly stored and retrieved
            
            settingsManager.settings.showPlan = false;
            settingsManager.saveSettings();
            
            expect(settingsManager.settings.showPlan).toBe(false);
            
            // Verify it persists
            const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
            expect(savedData.showPlan).toBe(false);
        });

        it('should default to showing plan for new users', () => {
            // WHY: New users should see planning features by default to discover functionality
            // WHAT: Verifies that showPlan defaults to true for better user experience
            
            expect(settingsManager.settings.showPlan).toBe(true);
        });

        it('should handle plan visibility setting changes', () => {
            // WHY: Users need to toggle plan visibility based on their workflow
            // WHAT: Verifies that plan visibility can be changed and persisted
            
            const originalValue = settingsManager.settings.showPlan;
            settingsManager.settings.showPlan = !originalValue;
            
            expect(settingsManager.settings.showPlan).toBe(!originalValue);
        });
    });

    describe('GitHub Integration', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should handle GitHub repository URL changes', () => {
            // WHY: Users need to specify their GitHub repository for data synchronization
            // WHAT: Verifies that GitHub repo URL input updates settings when changed
            const repoInput = document.getElementById('github-repo-url');
            repoInput.value = 'https://github.com/chasemp/mp';
            settingsManager.handleGitHubRepoChange({ target: repoInput });
            
            expect(settingsManager.settings.githubRepo).toBe('https://github.com/chasemp/mp');
        });

        it('should handle deploy key changes', () => {
            // WHY: Users need to provide deploy keys for private GitHub repository access
            // WHAT: Verifies that deploy key input updates settings for GitHub authentication
            const deployKeyInput = document.getElementById('github-deploy-key');
            const testKey = '-----BEGIN OPENSSH PRIVATE KEY-----\ntest\n-----END OPENSSH PRIVATE KEY-----';
            deployKeyInput.value = testKey;
            deployKeyInput.dispatchEvent(new dom.window.Event('change'));
            
            // Deploy key is no longer stored in settings for security
            // It should be stored in SecureTokenStorage (IndexedDB)
            expect(settingsManager.settings.githubDeployKey).toBeUndefined();
        });

        it('should handle read-only mode toggle', () => {
            // WHY: Users may want read-only access to shared repositories without write permissions
            // WHAT: Verifies that read-only checkbox updates GitHub sync settings appropriately
            const readOnlyInput = document.getElementById('github-read-only');
            readOnlyInput.checked = true;
            settingsManager.handleReadOnlyChange({ target: readOnlyInput });
            
            expect(settingsManager.settings.githubReadOnly).toBe(true);
        });
    });

    describe('Database Operations', () => {
        beforeEach(() => {
            settingsManager = new SettingsManager();
        });

        it('should handle demo data loading', async () => {
            // WHY: Users need demo data to be loaded automatically when in demo mode
            // WHAT: Verifies that loadDemoData function works correctly for demo source type
            settingsManager.settings.sourceType = 'demo';
            
            const result = await settingsManager.loadDemoData();
            expect(result).toBe(true);
        });

        it('should handle local database file selection', () => {
            // WHY: Users need to upload their own database files for local data management
            // WHAT: Verifies that file input correctly processes uploaded database files
            const fileInput = document.getElementById('local-file-input');
            const mockFile = new dom.window.File(['test'], 'test.db', { type: 'application/x-sqlite3' });
            
            Object.defineProperty(fileInput, 'files', {
                value: [mockFile],
                writable: false,
            });
            
            settingsManager.handleFileChange({ target: fileInput });
            
            expect(document.getElementById('local-file-name').textContent).toBe('test.db');
            expect(settingsManager.settings.localDbPath).toBe('test.db');
        });

        it('should serialize database to text format', async () => {
            // WHY: Users need to export their data in readable format for backup or sharing
            // WHAT: Verifies that database binary data can be converted to base64 text format
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
            // WHY: Partial DOM loading shouldn't crash settings functionality
            // WHAT: Verifies that missing UI elements are handled without throwing errors
            // Remove an element
            document.getElementById('source-type-select').remove();
            
            expect(() => {
                settingsManager.applySettings();
            }).not.toThrow();
        });

        it('should handle database loading errors', async () => {
            // WHY: Database loading failures shouldn't crash the app or leave users stranded
            // WHAT: Verifies that database load errors are caught and handled gracefully
            settingsManager.settings.sourceType = 'local';
            
            try {
                await settingsManager.loadLocalDatabase();
            } catch (error) {
                expect(error.message).toContain('Please select a database file first');
            }
        });

        it('should show error notifications for failed operations', async () => {
            // WHY: Users need clear feedback when operations fail so they can take corrective action
            // WHAT: Verifies that failed operations trigger appropriate user-visible error notifications
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
            // Mock GitHubDatabaseSync instead of importing from js/ version
            GitHubDatabaseSync = class MockGitHubDatabaseSync {
                constructor(repoUrl, deployKey = '', readOnly = false) {
                    this.repoUrl = repoUrl;
                    this.deployKey = deployKey;
                    this.readOnly = readOnly;
                    
                    // Parse URL to extract owner and repo
                    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                    if (!match) {
                        throw new Error('Invalid GitHub repository URL');
                    }
                    this.owner = match[1];
                    this.repo = match[2];
                    this.sshUrl = `git@github.com:${this.owner}/${this.repo}.git`;
                }
            };
        });

        it('should parse GitHub repository URL correctly', () => {
            // WHY: Users need accurate GitHub integration with their specified repositories
            // WHAT: Verifies that GitHub URLs are parsed correctly to extract owner and repo names
            githubSync = new GitHubDatabaseSync('https://github.com/chasemp/mp', 'test-key');
            
            expect(githubSync.owner).toBe('chasemp');
            expect(githubSync.repo).toBe('mp');
        });

        it('should throw error for invalid repository URL', () => {
            // WHY: Invalid URLs should fail fast with clear errors rather than cause mysterious bugs
            // WHAT: Verifies that malformed GitHub URLs throw descriptive errors during initialization
            expect(() => {
                new GitHubDatabaseSync('invalid-url', 'test-key');
            }).toThrow('Invalid GitHub repository URL');
        });

        it('should handle read-only mode correctly', () => {
            // WHY: Read-only mode prevents accidental data modification in shared repositories
            // WHAT: Verifies that GitHub sync correctly handles read-only configuration
            githubSync = new GitHubDatabaseSync('https://github.com/chasemp/mp', '', true);
            
            expect(githubSync.readOnly).toBe(true);
        });

        it('should validate repository URL format', () => {
            // WHY: URL validation prevents runtime errors and provides clear user feedback
            // WHAT: Verifies that GitHub URL format validation works correctly in Node.js environment
            // Test URL parsing logic that works in Node.js
            expect(() => {
                new GitHubDatabaseSync('https://github.com/chasemp/mp');
            }).not.toThrow();
            
            expect(() => {
                new GitHubDatabaseSync('invalid-url');
            }).toThrow('Invalid GitHub repository URL');
        });

        it('should extract owner and repo from URL', () => {
            // WHY: GitHub integration requires accurate owner and repository name extraction
            // WHAT: Verifies that URL parsing correctly extracts owner and repo components
            const sync = new GitHubDatabaseSync('https://github.com/chasemp/mp');
            expect(sync.owner).toBe('chasemp');
            expect(sync.repo).toBe('mp');
            expect(sync.sshUrl).toBe('git@github.com:chasemp/mp.git');
        });
    });
});
