// Settings Manager for MealPlanner PWA
// Handles database source configuration, meal type visibility, and GitHub sync

class SettingsManager {
    constructor() {
        this.settings = {
            sourceType: 'demo',
            localDbPath: '',
            githubRepo: '',
            githubDeployKey: '',
            githubReadOnly: false,
            showBreakfast: true,
            showLunch: true,
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
        if (deployKeyInput) deployKeyInput.value = this.settings.githubDeployKey;
        if (readOnlyInput) readOnlyInput.checked = this.settings.githubReadOnly;

        // Apply meal type visibility
        this.applyMealTypeVisibility();

        // Apply calendar settings
        const managedModeInput = document.getElementById('calendar-managed-mode');
        const notificationsInput = document.getElementById('calendar-notifications');
        
        if (managedModeInput) managedModeInput.checked = this.settings.calendarManagedMode;
        if (notificationsInput) notificationsInput.checked = this.settings.calendarNotifications;
    }

    applyMealTypeVisibility() {
        const breakfastTab = document.querySelector('[data-tab="breakfast"]');
        const lunchTab = document.querySelector('[data-tab="lunch"]');
        const dinnerTab = document.querySelector('[data-tab="dinner"]');
        
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
            deployKeyInput.addEventListener('change', (e) => {
                this.settings.githubDeployKey = e.target.value;
                this.saveSettings();
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
                    this.applyMealTypeVisibility();
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
        this.githubApi = new GitHubDatabaseSync(
            this.settings.githubRepo,
            this.settings.githubDeployKey,
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

    showNotification(message, type = 'info') {
        if (window.app && window.app.showNotification) {
            window.app.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// GitHub Database Sync Class
class GitHubDatabaseSync {
    constructor(repoUrl, deployKey, readOnly = false) {
        this.repoUrl = repoUrl;
        this.deployKey = deployKey;
        this.readOnly = readOnly;
        
        // Parse repository info
        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
            throw new Error('Invalid GitHub repository URL');
        }
        
        this.owner = match[1];
        this.repo = match[2];
        this.apiBase = 'https://api.github.com';
        
        console.log(`GitHub sync initialized: ${this.owner}/${this.repo} (${readOnly ? 'read-only' : 'read-write'})`);
    }

    async loadDatabase() {
        try {
            // Try to fetch the database file from the repository
            const response = await fetch(`${this.apiBase}/repos/${this.owner}/${this.repo}/contents/mealplanner.json`);
            
            if (response.status === 404) {
                console.log('No existing database found in repository');
                return null;
            }
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            const content = JSON.parse(atob(data.content));
            
            // Convert back from base64 to Uint8Array
            const binaryString = atob(content.data);
            const uint8Array = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }
            
            console.log('Database loaded from GitHub successfully');
            return uint8Array;
            
        } catch (error) {
            console.error('Failed to load database from GitHub:', error);
            throw error;
        }
    }

    async saveDatabase(textData) {
        if (this.readOnly) {
            throw new Error('Cannot save in read-only mode');
        }

        if (!this.deployKey) {
            throw new Error('Deploy key required for write access');
        }

        try {
            // Get current file SHA (if exists)
            let sha = null;
            try {
                const response = await fetch(`${this.apiBase}/repos/${this.owner}/${this.repo}/contents/mealplanner.json`);
                if (response.ok) {
                    const data = await response.json();
                    sha = data.sha;
                }
            } catch (error) {
                // File doesn't exist, that's okay
            }

            // Prepare the commit
            const content = btoa(textData);
            const payload = {
                message: `Update MealPlanner database - ${new Date().toISOString()}`,
                content: content,
                branch: 'main'
            };

            if (sha) {
                payload.sha = sha;
            }

            // Note: In a real implementation, you'd need to use the deploy key for authentication
            // This is a simplified version that assumes the repository is public or you have other auth
            const response = await fetch(`${this.apiBase}/repos/${this.owner}/${this.repo}/contents/mealplanner.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${this.getAccessToken()}` // Would need proper auth
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to save to GitHub: ${response.status} ${response.statusText}`);
            }

            console.log('Database saved to GitHub successfully');
            return true;

        } catch (error) {
            console.error('Failed to save database to GitHub:', error);
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
