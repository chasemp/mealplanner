// Settings Manager for MealPlanner PWA
// Handles database source configuration, meal time visibility, and GitHub sync

class SettingsManager {
    constructor() {
        this.settings = {
            sourceType: 'demo',
            localDbPath: '',
            githubRepo: '',
            // githubDeployKey: '', // 🔐 REMOVED - stored securely in IndexedDB
            githubReadOnly: false,
            showBreakfast: false,
            showLunch: false,
            showDinner: true,
            calendarManagedMode: false,
            calendarNotifications: false
        };
        
        this.githubApi = null;
        this.loadSettings();
        this.setupEventListeners();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('mealplanner-settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Failed to load settings:', error);
        }
        this.applySettings();
    }

    saveSettings() {
        try {
            localStorage.setItem('mealplanner-settings', JSON.stringify(this.settings));
            console.log('Settings saved successfully');
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    applySettings() {
        // Apply source type
        const sourceSelect = document.getElementById('source-type-select');
        if (sourceSelect) {
            sourceSelect.value = this.settings.sourceType;
            this.showSourceOptions(this.settings.sourceType);
        }

        // Apply GitHub settings
        const repoInput = document.getElementById('github-repo-url');
        const deployKeyInput = document.getElementById('github-deploy-key');
        const readOnlyInput = document.getElementById('github-read-only');
        
        if (repoInput) repoInput.value = this.settings.githubRepo;
        // 🔐 NEVER populate deploy key field - it's stored securely in IndexedDB
        if (deployKeyInput) deployKeyInput.placeholder = 'Deploy key stored securely (hidden)';
        if (readOnlyInput) readOnlyInput.checked = this.settings.githubReadOnly;

        // Apply meal time visibility (defer to ensure DOM is ready)
        setTimeout(() => this.applyMealTimeVisibility(), 100);

        // Apply calendar settings
        const managedModeInput = document.getElementById('calendar-managed-mode');
        const notificationsInput = document.getElementById('calendar-notifications');
        
        if (managedModeInput) managedModeInput.checked = this.settings.calendarManagedMode;
        if (notificationsInput) notificationsInput.checked = this.settings.calendarNotifications;
    }

    applyMealTimeVisibility() {
        console.log('🍽️ Applying meal time visibility:', this.settings);
        const breakfastTab = document.querySelector('[data-tab="breakfast"]');
        const lunchTab = document.querySelector('[data-tab="lunch"]');
        const dinnerTab = document.querySelector('[data-tab="dinner"]');
        
        console.log('🔍 Found tabs:', { breakfastTab, lunchTab, dinnerTab });
        
        const breakfastContent = document.getElementById('breakfast-tab');
        const lunchContent = document.getElementById('lunch-tab');
        const dinnerContent = document.getElementById('dinner-tab');

        // Update checkboxes
        const showBreakfastInput = document.getElementById('show-breakfast');
        const showLunchInput = document.getElementById('show-lunch');
        const showDinnerInput = document.getElementById('show-dinner');
        
        if (showBreakfastInput) showBreakfastInput.checked = this.settings.showBreakfast;
        if (showLunchInput) showLunchInput.checked = this.settings.showLunch;
        if (showDinnerInput) showDinnerInput.checked = this.settings.showDinner;

        // Show/hide tabs
        if (breakfastTab) breakfastTab.style.display = this.settings.showBreakfast ? '' : 'none';
        if (lunchTab) lunchTab.style.display = this.settings.showLunch ? '' : 'none';
        if (dinnerTab) dinnerTab.style.display = this.settings.showDinner ? '' : 'none';

        // If current tab is hidden, switch to recipes
        const currentTab = document.querySelector('.nav-tab.active');
        if (currentTab) {
            const tabName = currentTab.getAttribute('data-tab');
            const isHidden = (tabName === 'breakfast' && !this.settings.showBreakfast) ||
                           (tabName === 'lunch' && !this.settings.showLunch) ||
                           (tabName === 'dinner' && !this.settings.showDinner);
            
            if (isHidden) {
                // Switch to recipes tab
                window.app?.switchTab('recipes');
            }
        }
    }

    setupEventListeners() {
        // Source type selection
        const sourceSelect = document.getElementById('source-type-select');
        if (sourceSelect) {
            sourceSelect.addEventListener('change', (e) => {
                this.settings.sourceType = e.target.value;
                this.showSourceOptions(e.target.value);
                this.saveSettings();
            });
        }

        // Local file selection
        const localFileBtn = document.getElementById('local-file-btn');
        const localFileInput = document.getElementById('local-file-input');
        
        if (localFileBtn && localFileInput) {
            localFileBtn.addEventListener('click', () => {
                localFileInput.click();
            });
            
            localFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    document.getElementById('local-file-name').textContent = file.name;
                    this.settings.localDbPath = file.name;
                    this.saveSettings();
                }
            });
        }

        // GitHub settings
        const repoInput = document.getElementById('github-repo-url');
        const deployKeyInput = document.getElementById('github-deploy-key');
        const readOnlyInput = document.getElementById('github-read-only');
        
        if (repoInput) {
            repoInput.addEventListener('change', (e) => {
                this.settings.githubRepo = e.target.value;
                this.saveSettings();
            });
        }
        
        if (deployKeyInput) {
            deployKeyInput.addEventListener('change', async (e) => {
                const deployKey = e.target.value.trim();
                
                if (deployKey) {
                    // 🔐 Store deploy key securely in IndexedDB (never in localStorage)
                    try {
                        const secureStorage = new SecureTokenStorage();
                        await secureStorage.storeTokens({
                            github_deploy_key: deployKey,
                            stored_at: new Date().toISOString()
                        });
                        
                        // Clear the input field for security
                        e.target.value = '';
                        
                        // Show confirmation but don't store in settings
                        this.showNotification('Deploy key stored securely', 'success');
                        console.log('✅ Deploy key stored securely in IndexedDB');
                    } catch (error) {
                        console.error('❌ Failed to store deploy key:', error);
                        this.showNotification('Failed to store deploy key securely', 'error');
                    }
                } else {
                    // Clear stored deploy key
                    try {
                        const secureStorage = new SecureTokenStorage();
                        await secureStorage.clearTokens();
                        this.showNotification('Deploy key cleared', 'info');
                    } catch (error) {
                        console.error('❌ Failed to clear deploy key:', error);
                    }
                }
                
                // ⚠️ NEVER store deploy key in regular settings
                // this.settings.githubDeployKey = e.target.value; // REMOVED FOR SECURITY
            });
        }
        
        if (readOnlyInput) {
            readOnlyInput.addEventListener('change', (e) => {
                this.settings.githubReadOnly = e.target.checked;
                this.saveSettings();
            });
        }

        // Meal type visibility
        const mealTypeInputs = ['show-breakfast', 'show-lunch', 'show-dinner'];
        mealTypeInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('change', (e) => {
                    const mealType = inputId.replace('show-', '');
                    this.settings[`show${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`] = e.target.checked;
                    this.applyMealTimeVisibility();
                    this.saveSettings();
                });
            }
        });

        // Calendar settings
        const calendarInputs = ['calendar-managed-mode', 'calendar-notifications'];
        calendarInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('change', (e) => {
                    const settingKey = inputId.replace('-', '').replace('-', '');
                    const camelCase = settingKey.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    this.settings[camelCase] = e.target.checked;
                    this.saveSettings();
                });
            }
        });

        // Apply source button
        const applyBtn = document.getElementById('apply-source-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyDatabaseSource();
            });
        }

        // Export database button
        const exportBtn = document.getElementById('export-db-btn-settings');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportDatabase();
            });
        }

        // Calendar sync button
        const syncBtn = document.getElementById('sync-calendar-btn');
        if (syncBtn) {
            syncBtn.addEventListener('click', () => {
                this.syncCalendar();
            });
        }

        // Calendar settings
        const calendarSettings = ['calendar-name', 'event-duration', 'breakfast-time', 'lunch-time', 'dinner-time', 'include-ingredients', 'include-prep-time'];
        calendarSettings.forEach(settingId => {
            const input = document.getElementById(settingId);
            if (input) {
                const eventType = input.type === 'checkbox' ? 'change' : 'input';
                input.addEventListener(eventType, (e) => {
                    const value = input.type === 'checkbox' ? e.target.checked : e.target.value;
                    const camelCaseKey = settingId.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    this.settings[camelCaseKey] = value;
                    this.saveSettings();
                });
            }
        });
    }

    showSourceOptions(sourceType) {
        const allOptions = document.querySelectorAll('.source-options');
        allOptions.forEach(option => option.classList.add('hidden'));

        const targetOption = document.getElementById(`${sourceType}-options`);
        if (targetOption) {
            targetOption.classList.remove('hidden');
        }
    }

    async applyDatabaseSource() {
        try {
            switch (this.settings.sourceType) {
                case 'demo':
                    await this.loadDemoData();
                    break;
                case 'local':
                    await this.loadLocalDatabase();
                    break;
                case 'github':
                    await this.loadGitHubDatabase();
                    break;
            }
            
            this.showNotification('Database source applied successfully!', 'success');
            
            // Refresh all components
            if (window.app) {
                window.app.refreshAllComponents();
            }
        } catch (error) {
            console.error('Failed to apply database source:', error);
            this.showNotification(`Failed to apply database source: ${error.message}`, 'error');
        }
    }

    async loadDemoData() {
        console.log('Loading demo data...');
        // Demo data is already loaded by default
        return true;
    }

    async loadLocalDatabase() {
        const fileInput = document.getElementById('local-file-input');
        const file = fileInput?.files[0];
        
        if (!file) {
            throw new Error('Please select a database file first');
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const uint8Array = new Uint8Array(arrayBuffer);
                    
                    // Store in IndexedDB
                    await this.storeDatabaseInIndexedDB(uint8Array);
                    
                    // Reinitialize database
                    if (window.app && window.app.databaseManager) {
                        await window.app.databaseManager.initializeFromIndexedDB();
                    }
                    
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read database file'));
            reader.readAsArrayBuffer(file);
        });
    }

    async loadGitHubDatabase() {
        if (!this.settings.githubRepo) {
            throw new Error('Please enter a GitHub repository URL');
        }

        // Initialize GitHub API
        // 🔐 Deploy key will be loaded from secure storage by GitHubDatabaseSync
        this.githubApi = new GitHubDatabaseSync(
            this.settings.githubRepo,
            null, // Deploy key loaded securely from IndexedDB
            this.settings.githubReadOnly
        );

        // Load database from GitHub
        const dbData = await this.githubApi.loadDatabase();
        
        if (dbData) {
            // Store in IndexedDB
            await this.storeDatabaseInIndexedDB(dbData);
            
            // Reinitialize database
            if (window.app && window.app.databaseManager) {
                await window.app.databaseManager.initializeFromIndexedDB();
            }
        }
    }

    async storeDatabaseInIndexedDB(uint8Array) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MealPlannerDB', 1);
            
            request.onerror = () => reject(request.error);
            
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(['database'], 'readwrite');
                const store = transaction.objectStore('database');
                
                store.put({ id: 'main', data: uint8Array });
                
                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction.error);
            };
            
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains('database')) {
                    db.createObjectStore('database', { keyPath: 'id' });
                }
            };
        });
    }

    async exportDatabase() {
        try {
            if (this.settings.sourceType === 'github' && this.githubApi && !this.settings.githubReadOnly) {
                // Export to GitHub
                await this.exportToGitHub();
            } else {
                // Export as file download
                await this.exportAsFile();
            }
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification(`Export failed: ${error.message}`, 'error');
        }
    }

    async exportToGitHub() {
        if (!this.githubApi) {
            throw new Error('GitHub sync not configured');
        }

        // Get current database
        const dbData = await this.getCurrentDatabaseData();
        
        // Convert to text format for GitHub storage
        const textData = await this.serializeDatabaseToText(dbData);
        
        // Upload to GitHub
        await this.githubApi.saveDatabase(textData);
        
        this.showNotification('Database exported to GitHub successfully!', 'success');
    }

    async exportAsFile() {
        const dbData = await this.getCurrentDatabaseData();
        
        const blob = new Blob([dbData], { type: 'application/x-sqlite3' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `mealplanner-${new Date().toISOString().split('T')[0]}.db`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        this.showNotification('Database exported as file!', 'success');
    }

    async getCurrentDatabaseData() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MealPlannerDB', 1);
            
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(['database'], 'readonly');
                const store = transaction.objectStore('database');
                const getRequest = store.get('main');
                
                getRequest.onsuccess = () => {
                    if (getRequest.result) {
                        resolve(getRequest.result.data);
                    } else {
                        reject(new Error('No database found'));
                    }
                };
                
                getRequest.onerror = () => reject(getRequest.error);
            };
            
            request.onerror = () => reject(request.error);
        });
    }

    async serializeDatabaseToText(uint8Array) {
        // Convert SQLite binary to SQL text dump
        // This is a simplified version - in practice, you'd use sql.js to dump the database
        const decoder = new TextDecoder();
        const base64 = btoa(String.fromCharCode(...uint8Array));
        
        return JSON.stringify({
            format: 'mealplanner-db',
            version: '1.0',
            timestamp: new Date().toISOString(),
            data: base64
        }, null, 2);
    }

    async syncCalendar() {
        try {
            this.showNotification('Syncing meal plans with Google Calendar...', 'info');
            
            // Check if Google Calendar integration is available
            if (window.googleCalendarIntegration) {
                const result = await window.googleCalendarIntegration.syncMealPlans(this.settings);
                if (result.success) {
                    this.showNotification(`Calendar sync successful! ${result.eventsCreated} events created.`, 'success');
                } else {
                    throw new Error(result.error || 'Calendar sync failed');
                }
            } else {
                throw new Error('Google Calendar integration not available');
            }
        } catch (error) {
            console.error('Calendar sync failed:', error);
            this.showNotification(`Calendar sync failed: ${error.message}`, 'error');
        }
    }

    showNotification(message, type = 'info') {
        if (window.app && window.app.showNotification) {
            window.app.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// GitHub Database Sync Class using WASM Git
class GitHubDatabaseSync {
    constructor(repoUrl, deployKey = null, readOnly = false) {
        this.repoUrl = repoUrl;
        this.deployKey = deployKey; // ⚠️ Temporary - will be loaded from secure storage
        this.readOnly = readOnly;
        
        // Parse repository info
        const match = repoUrl.match(/github\.com[\/:]([^\/]+)\/([^\/\.]+)/);
        if (!match) {
            throw new Error('Invalid GitHub repository URL');
        }
        
        this.owner = match[1];
        this.repo = match[2];
        this.sshUrl = `git@github.com:${this.owner}/${this.repo}.git`;
        this.httpsUrl = `https://github.com/${this.owner}/${this.repo}.git`;
        this.localPath = `/tmp/mealplanner-repo`;
        this.dbFileName = 'mealplanner.json';
        
        // Initialize wasm-git (will be loaded asynchronously)
        this.git = null;
        this.fs = null;
        
        // Initialize secure storage for deploy keys (browser-only)
        this.secureStorage = typeof window !== 'undefined' ? new SecureTokenStorage() : null;
        
        console.log(`GitHub sync initialized: ${this.owner}/${this.repo} (${readOnly ? 'read-only' : 'read-write'})`);
    }

    // 🔐 Secure Deploy Key Management
    async storeDeployKeySecurely(deployKey) {
        if (!this.secureStorage) {
            console.warn('Secure storage not available - deploy key will be memory-only');
            return;
        }
        
        try {
            // Store deploy key in encrypted IndexedDB (browser-only, never synced)
            await this.secureStorage.storeTokens({
                github_deploy_key: deployKey,
                stored_at: new Date().toISOString()
            });
            console.log('✅ Deploy key stored securely in IndexedDB');
        } catch (error) {
            console.error('❌ Failed to store deploy key securely:', error);
            throw error;
        }
    }

    async getDeployKeySecurely() {
        if (!this.secureStorage) {
            // For testing: try to get from environment variable
            if (typeof process !== 'undefined' && process.env && process.env.GITHUB_DEPLOY_KEY) {
                console.log('📋 Using deploy key from environment variable (testing)');
                return process.env.GITHUB_DEPLOY_KEY;
            }
            return null;
        }
        
        try {
            const tokens = await this.secureStorage.getTokens();
            if (tokens && tokens.github_deploy_key) {
                console.log('✅ Deploy key retrieved from secure storage');
                return tokens.github_deploy_key;
            }
            return null;
        } catch (error) {
            console.error('❌ Failed to retrieve deploy key:', error);
            return null;
        }
    }

    async clearDeployKeySecurely() {
        if (!this.secureStorage) return;
        
        try {
            await this.secureStorage.clearTokens();
            console.log('✅ Deploy key cleared from secure storage');
        } catch (error) {
            console.error('❌ Failed to clear deploy key:', error);
        }
    }

    async initializeGit() {
        if (this.git) return; // Already initialized
        
        try {
            // Import wasm-git async version for browser compatibility
            const lg2Module = await import('wasm-git/lg2_async.js');
            
            // Initialize the WASM module
            this.git = await lg2Module.default();
            this.fs = this.git.FS;
            
            console.log('✅ WASM Git initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize WASM Git:', error);
            throw new Error(`Failed to initialize Git: ${error.message}`);
        }
    }

    async loadDatabase() {
        try {
            // 🔐 Load deploy key from secure storage if not already provided
            if (!this.deployKey) {
                this.deployKey = await this.getDeployKeySecurely();
            }
            
            await this.initializeGit();
            
            // Setup SSH credentials if deploy key is provided
            if (this.deployKey && !this.readOnly) {
                await this.setupSSHCredentials();
            }
            
            // Clone or pull the repository
            const repoExists = await this.ensureRepository();
            if (!repoExists) {
                console.log('No existing database found in repository');
                return null;
            }
            
            // Read the database file
            const dbPath = `${this.localPath}/${this.dbFileName}`;
            try {
                const fileData = this.fs.readFile(dbPath);
                console.log('Database loaded from GitHub successfully');
                return fileData;
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.log('No existing database found in repository');
                    return null;
                }
                throw error;
            }
        } catch (error) {
            console.error('Failed to load database from GitHub:', error);
            throw error;
        } finally {
            // 🔐 Clear deploy key from memory after use (security)
            this.deployKey = null;
        }
    }

    async saveDatabase(databaseData) {
        if (this.readOnly) {
            throw new Error('Cannot save in read-only mode');
        }

        // 🔐 Load deploy key from secure storage if not already provided
        if (!this.deployKey) {
            this.deployKey = await this.getDeployKeySecurely();
        }
        
        if (!this.deployKey) {
            throw new Error('Deploy key required for write access');
        }

        try {
            await this.initializeGit();
            await this.setupSSHCredentials();
            
            // Ensure repository is cloned and up to date
            await this.ensureRepository();
            
            // Write the database file
            const dbPath = `${this.localPath}/${this.dbFileName}`;
            this.fs.writeFile(dbPath, databaseData);
            
            // Git add, commit, and push
            await this.commitAndPush('Update MealPlanner database');
            
            console.log('Database saved to GitHub successfully');
            return { success: true };

        } catch (error) {
            console.error('Failed to save database to GitHub:', error);
            throw error;
        } finally {
            // 🔐 Clear deploy key from memory after use (security)
            this.deployKey = null;
        }
    }

    async setupSSHCredentials() {
        if (!this.deployKey) return;
        
        try {
            // ⚠️ SECURITY: SSH key is provided in-memory only
            // Never write to WASM filesystem to prevent accidental export
            
            // For wasm-git, we need to configure SSH authentication
            // The key stays in JavaScript memory, not written to virtual filesystem
            
            // Set up Git credentials callback for SSH authentication
            // This approach keeps the key in memory only during the operation
            if (this.git && this.git.setCredentialsCallback) {
                this.git.setCredentialsCallback((url, usernameFromUrl) => {
                    if (url.includes('github.com')) {
                        return {
                            type: 'ssh',
                            username: 'git',
                            privateKey: this.deployKey,
                            publicKey: '', // GitHub doesn't need public key for auth
                            passphrase: '' // Assuming no passphrase for deploy keys
                        };
                    }
                    return null;
                });
            }
            
            console.log('✅ SSH credentials configured (memory-only)');
        } catch (error) {
            console.error('❌ Failed to setup SSH credentials:', error);
            throw error;
        }
    }

    async ensureRepository() {
        try {
            // Check if repository already exists locally
            try {
                this.fs.stat(this.localPath);
                // Repository exists, pull latest changes
                console.log('Repository exists, pulling latest changes...');
                await this.pullChanges();
                return true;
            } catch (error) {
                // Repository doesn't exist, clone it
                console.log('Cloning repository...');
                return await this.cloneRepository();
            }
        } catch (error) {
            console.error('Failed to ensure repository:', error);
            throw error;
        }
    }

    async cloneRepository() {
        try {
            const url = this.deployKey ? this.sshUrl : this.httpsUrl;
            
            // Use wasm-git to clone the repository
            await this.git.callMain(['clone', url, this.localPath]);
            
            console.log('✅ Repository cloned successfully');
            return true;
        } catch (error) {
            if (error.message && error.message.includes('not found')) {
                // Repository doesn't exist or is empty
                console.log('Repository not found or empty, will create on first push');
                
                // Initialize a new repository
                this.fs.mkdir(this.localPath, 0o755);
                await this.git.callMain(['init', this.localPath]);
                
                // Set up remote
                process.chdir(this.localPath);
                await this.git.callMain(['remote', 'add', 'origin', this.deployKey ? this.sshUrl : this.httpsUrl]);
                
                return false; // No existing database
            }
            throw error;
        }
    }

    async pullChanges() {
        try {
            process.chdir(this.localPath);
            await this.git.callMain(['pull', 'origin', 'main']);
            console.log('✅ Changes pulled successfully');
        } catch (error) {
            console.warn('Pull failed (possibly empty repository):', error.message);
            // This is okay for new repositories
        }
    }

    async commitAndPush(message) {
        try {
            process.chdir(this.localPath);
            
            // Configure git user (required for commits)
            await this.git.callMain(['config', 'user.name', 'MealPlanner App']);
            await this.git.callMain(['config', 'user.email', 'mealplanner@app.local']);
            
            // Add the database file
            await this.git.callMain(['add', this.dbFileName]);
            
            // Commit changes
            await this.git.callMain(['commit', '-m', message]);
            
            // Push to remote
            await this.git.callMain(['push', 'origin', 'main']);
            
            console.log('✅ Changes committed and pushed successfully');
        } catch (error) {
            console.error('❌ Failed to commit and push:', error);
            throw error;
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.SettingsManager = SettingsManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SettingsManager, GitHubDatabaseSync };
}
