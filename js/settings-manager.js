// Settings Manager for MealPlanner PWA
// Handles database source configuration, meal time visibility, and GitHub sync

class SettingsManager {
    constructor() {
        // Store original demo data in memory for reset functionality
        this.originalDemoData = {};
        
        this.settings = {
            sourceType: 'demo',
            localDbPath: '',
            githubRepo: '',
            // githubDeployKey: '', // 🔐 REMOVED - stored securely in IndexedDB
            githubReadOnly: false,
            showBreakfast: false,
            showLunch: false,
            showPlan: true,
            calendarManagedMode: false,
            calendarNotifications: false,
            confirmBeforeClearingFilters: false,
            requireDoublePressForClearFilters: false,
            mobileNavAutoHide: false,
            confirmBeforeDeleting: true
        };
        
        this.githubApi = null;
        this.loadSettings();
        this.setupEventListeners();
        
        // Demo data initialization is now ONLY done:
        // 1. On first-time setup (when switching TO demo mode)
        // 2. When user explicitly clicks "Reset Demo Data"
        // Page loads should NEVER auto-reload demo data - localStorage is authoritative
        
        // Initialize database source indicator after DOM is ready
        setTimeout(() => {
            this.updateDatabaseSourceIndicator();
        }, 100);
        
        // Make settings globally available for managers
        window.mealPlannerSettings = this;
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
        
        // Update database source indicator
        this.updateDatabaseSourceIndicator();

        // Apply GitHub settings
        const repoInput = document.getElementById('github-repo-url');
        const deployKeyInput = document.getElementById('github-deploy-key');
        const readOnlyInput = document.getElementById('github-read-only');
        
        if (repoInput) repoInput.value = this.settings.githubRepo;
        // 🔐 NEVER populate deploy key field - it's stored securely in IndexedDB
        if (deployKeyInput) deployKeyInput.placeholder = 'Deploy key stored securely (hidden)';
        if (readOnlyInput) readOnlyInput.checked = this.settings.githubReadOnly;

        // Apply meal time visibility (defer to ensure DOM is ready)
        setTimeout(() => {
            console.log('⏰ Applying meal time visibility after timeout...');
            this.applyMealTimeVisibility();
        }, 500);

        // Apply calendar settings
        const managedModeInput = document.getElementById('calendar-managed-mode');
        const notificationsInput = document.getElementById('calendar-notifications');
        
        if (managedModeInput) managedModeInput.checked = this.settings.calendarManagedMode;
        if (notificationsInput) notificationsInput.checked = this.settings.calendarNotifications;
        
        // Apply filter safety settings
        const confirmBeforeClearingInput = document.getElementById('confirm-before-clearing-filters');
        const requireDoublePressInput = document.getElementById('require-double-press-clear-filters');
        
        if (confirmBeforeClearingInput) confirmBeforeClearingInput.checked = this.settings.confirmBeforeClearingFilters;
        if (requireDoublePressInput) requireDoublePressInput.checked = this.settings.requireDoublePressForClearFilters;
    }

    applyMealTimeVisibility() {
        console.log('🍽️ Applying meal time visibility:', this.settings);
        const breakfastTab = document.querySelector('[data-tab="breakfast"]');
        const lunchTab = document.querySelector('[data-tab="lunch"]');
        const planTab = document.querySelector('[data-tab="plan"]');
        
        console.log('🔍 Found tabs:', { breakfastTab, lunchTab, planTab });
        
        const breakfastContent = document.getElementById('breakfast-tab');
        const lunchContent = document.getElementById('lunch-tab');
        const planContent = document.getElementById('plan-tab');

        // Update checkboxes
        const showBreakfastInput = document.getElementById('show-breakfast');
        const showLunchInput = document.getElementById('show-lunch');
        const showPlanInput = document.getElementById('show-plan');
        const mobileNavAutoHideInput = document.getElementById('mobile-nav-auto-hide');
        const confirmBeforeDeletingInput = document.getElementById('confirm-before-deleting');
        
        if (showBreakfastInput) showBreakfastInput.checked = this.settings.showBreakfast;
        if (showLunchInput) showLunchInput.checked = this.settings.showLunch;
        if (showPlanInput) showPlanInput.checked = this.settings.showPlan;
        if (mobileNavAutoHideInput) mobileNavAutoHideInput.checked = this.settings.mobileNavAutoHide;
        if (confirmBeforeDeletingInput) confirmBeforeDeletingInput.checked = this.settings.confirmBeforeDeleting;

        // Show/hide tabs
        if (breakfastTab) breakfastTab.style.display = this.settings.showBreakfast ? '' : 'none';
        if (lunchTab) lunchTab.style.display = this.settings.showLunch ? '' : 'none';
        if (planTab) planTab.style.display = this.settings.showPlan ? '' : 'none';

        // If current tab is hidden, switch to recipes
        const currentTab = document.querySelector('.nav-tab.active');
        if (currentTab) {
            const tabName = currentTab.getAttribute('data-tab');
            const isHidden = (tabName === 'breakfast' && !this.settings.showBreakfast) ||
                           (tabName === 'lunch' && !this.settings.showLunch) ||
                           (tabName === 'plan' && !this.settings.showPlan);
            
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
            sourceSelect.addEventListener('change', async (e) => {
                this.settings.sourceType = e.target.value;
                this.showSourceOptions(e.target.value);
                this.saveSettings();
                
                // Apply the new database source immediately and reload all managers
                await this.applyDatabaseSource();
                await this.reloadAllManagers();
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
        const mealTypeInputs = ['show-breakfast', 'show-lunch', 'show-plan'];
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

        // Mobile navigation auto-hide setting
        const mobileNavAutoHideInput = document.getElementById('mobile-nav-auto-hide');
        if (mobileNavAutoHideInput) {
            mobileNavAutoHideInput.addEventListener('change', (e) => {
                this.settings.mobileNavAutoHide = e.target.checked;
                this.saveSettings();
                
                // Apply the setting immediately if mobile navigation exists
                if (window.mobileNavigation) {
                    window.mobileNavigation.updateAutoHideSetting(e.target.checked);
                }
            });
        }

        // Delete confirmation setting
        const confirmBeforeDeletingInput = document.getElementById('confirm-before-deleting');
        if (confirmBeforeDeletingInput) {
            confirmBeforeDeletingInput.addEventListener('change', (e) => {
                this.settings.confirmBeforeDeleting = e.target.checked;
                this.saveSettings();
                console.log('Confirm before deleting setting updated:', e.target.checked);
            });
        }

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
        
        // Filter safety settings
        const filterSafetyInputs = ['confirm-before-clearing-filters', 'require-double-press-clear-filters'];
        filterSafetyInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('change', (e) => {
                    if (inputId === 'confirm-before-clearing-filters') {
                        this.settings.confirmBeforeClearingFilters = e.target.checked;
                    } else if (inputId === 'require-double-press-clear-filters') {
                        this.settings.requireDoublePressForClearFilters = e.target.checked;
                    }
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

        // Clear all data button
        const clearAllBtn = document.getElementById('clear-all-data-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', async () => {
                const confirmed = confirm('⚠️ This will permanently delete all your data (recipes, items, scheduled meals, etc.). This action cannot be undone.\n\nAre you sure you want to clear all data?');
                if (confirmed) {
                    try {
                        // Use the main app's clearAllData method which properly clears managers and refreshes UI
                        if (window.app) {
                            await window.app.clearAllData();
                            this.showNotification('All data cleared successfully! The app now has a clean slate.', 'success');
                        } else {
                            // Fallback to local method if app not available
                            const success = this.clearAllData();
                            if (success) {
                                this.showNotification('All data cleared successfully! The app now has a clean slate.', 'success');
                            } else {
                                this.showNotification('Failed to clear all data. Please try again.', 'error');
                            }
                        }
                    } catch (error) {
                        console.error('❌ Error clearing all data:', error);
                        this.showNotification('Failed to clear all data. Please try again.', 'error');
                    }
                }
            });
        }

        // Reset demo data button
        const resetDemoBtn = document.getElementById('reset-demo-data-btn');
        if (resetDemoBtn) {
            resetDemoBtn.addEventListener('click', async () => {
                const confirmed = confirm('This will restore all data to the original demo state, overwriting any changes you\'ve made.\n\nAre you sure you want to reset to demo data?');
                if (confirmed) {
                    const success = this.resetDemoData();
                    if (success) {
                        this.showNotification('Demo data restored successfully!', 'success');
                        // Reload all managers to reflect the restored data
                        if (window.app) {
                            await window.app.refreshAllComponents();
                        }
                    } else {
                        this.showNotification('Failed to reset demo data. Please try again.', 'error');
                    }
                }
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
        const calendarSettings = ['calendar-name', 'event-duration', 'breakfast-time', 'lunch-time', 'plan-time', 'include-ingredients', 'include-prep-time'];
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
            // Update header database source indicator
            this.updateDatabaseSourceIndicator();
            
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
        // Demo data initialization is handled by initializeDemoData() with proper flag logic
        this.initializeDemoData();
        return true;
    }


    clearAllLocalStorageData() {
        // Clear all MealPlanner-related data from localStorage
        const keysToRemove = [];
        
        // Find all keys that start with our app prefixes
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (
                key.startsWith('mealplanner_') ||
                key.startsWith('mp_') ||
                key.startsWith('ingredients_') ||
                key.startsWith('recipes_') ||
                key.startsWith('meals_') ||
                key.startsWith('scheduled_') ||
                key.startsWith('grocery_') ||
                key.startsWith('favorites_') ||
                key === 'selectedRecipes' ||
                key === 'scheduledMeals' ||
                key === 'mealPlanData'
            )) {
                keysToRemove.push(key);
            }
        }
        
        // Remove all identified keys
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
            console.log(`🗑️ Cleared localStorage key: ${key}`);
        });
        
        console.log(`🧹 Cleared ${keysToRemove.length} localStorage keys`);
    }

    updateDatabaseSourceIndicator() {
        const indicator = document.getElementById('database-source-indicator');
        const iconElement = document.getElementById('database-source-icon');
        if (!indicator || !iconElement) return;

        const sourceConfig = {
            'demo': {
                name: 'Demo Data',
                icon: `<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>`
            },
            'local': {
                name: 'Local Database',
                icon: `<path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>`
            },
            'github': {
                name: 'GitHub Repository',
                icon: `<path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>`
            }
        };

        const config = sourceConfig[this.settings.sourceType] || sourceConfig['demo'];
        
        // Update the text indicator
        indicator.textContent = config.name;
        
        // Update the icon
        iconElement.innerHTML = config.icon;

        console.log(`📊 Updated database source indicator: ${config.name}`);
    }

    // Method for managers to check current database source
    getCurrentDatabaseSource() {
        return this.settings.sourceType;
    }

    // Method for managers to check if they should load demo data
    shouldLoadDemoData() {
        return this.settings.sourceType === 'demo';
    }

    // Initialize demo data into localStorage on first load
    // 
    // CRITICAL RACE CONDITION BUG (Under Investigation):
    // This method is called during settings manager initialization, but something else
    // is loading demo data BEFORE this runs. When this method executes, localStorage
    // already contains demo data, so the flag logic is never reached.
    //
    // Evidence:
    // - Console shows "📋 items already exists in localStorage, skipping initialization"
    // - Flag is never set because initialization is skipped
    // - This causes demo data to auto-reload on every page refresh
    //
    // Investigation needed:
    // - Find what's calling demo data loading during app startup
    // - Likely in manager initialization sequence (RecipeManager, ItemsManager, etc.)
    // - Check getAuthoritativeData() call chain during startup
    initializeDemoData() {
        console.log('🎯 Initializing demo data to localStorage...');
        
        // Check if demo data was ever loaded before - if so, don't reload unless explicit reset
        const demoDataLoaded = localStorage.getItem('mealplanner_demo_data_loaded');
        if (demoDataLoaded === 'true') {
            console.log('🚩 Demo data was previously loaded - skipping auto-reload (use Reset Demo Data for explicit reload)');
            return;
        }
        
        if (!window.DemoDataManager) {
            console.warn('⚠️ DemoDataManager not available for initialization');
            return;
        }

        try {
            const demoData = new window.DemoDataManager();
            const dataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
            
            dataTypes.forEach(dataType => {
                const storageKey = `mealplanner_${dataType}`;
                let data = [];
                
                // Generate the demo data
                switch (dataType) {
                    case 'items':
                        data = demoData.getIngredients();
                        break;
                    case 'recipes':
                        data = demoData.getRecipes();
                        break;
                    case 'scheduledMeals':
                        data = demoData.getScheduledMeals();
                        break;
                    case 'pantryItems':
                        data = demoData.getPantryItems ? demoData.getPantryItems() : [];
                        break;
                    case 'meals':
                        data = demoData.getMeals ? demoData.getMeals() : [];
                        break;
                }
                
                // Store original demo data in memory for reset functionality
                this.originalDemoData[dataType] = JSON.parse(JSON.stringify(data));
                
                // Only initialize localStorage if not already present AND data hasn't been explicitly cleared
                const dataCleared = localStorage.getItem('mealplanner_data_cleared');
                if (!localStorage.getItem(storageKey)) {
                    if (dataCleared === 'true') {
                        console.log(`🚩 ${dataType} was explicitly cleared, skipping demo data initialization`);
                    } else {
                        localStorage.setItem(storageKey, JSON.stringify(data));
                        console.log(`✅ Initialized ${dataType}: ${data.length} items`);
                    }
                } else {
                    console.log(`📋 ${dataType} already exists in localStorage, skipping initialization`);
                }
            });
            
            console.log('🎯 Demo data initialization completed');
            
            // Set flag to indicate demo data has been loaded - prevents future auto-reloads
            localStorage.setItem('mealplanner_demo_data_loaded', 'true');
            console.log('🚩 Set demo data loaded flag - prevents future auto-reloads');
            
            console.log('💾 Original demo data stored in memory for reset functionality');
        } catch (error) {
            console.error('❌ Error initializing demo data:', error);
        }
    }

    // Clear all data from localStorage (for clean slate testing)
    //
    // INTENDED BEHAVIOR:
    // - Removes all user data from localStorage
    // - PRESERVES the mealplanner_demo_data_loaded flag (critical!)
    // - This ensures demo data does NOT auto-reload on page refresh
    // - Data should stay cleared until user manually adds new data or resets demo data
    //
    // CURRENT BUG:
    // - Race condition causes demo data to auto-reload despite flag preservation
    // - Something bypasses the flag system during app initialization
    clearAllData() {
        console.log('🗑️ Clearing all data from localStorage...');
        
        try {
            const dataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
            
            dataTypes.forEach(dataType => {
                const storageKey = `mealplanner_${dataType}`;
                localStorage.removeItem(storageKey);
                console.log(`✅ Cleared ${dataType} from localStorage`);
            });
            
            // Note: We keep the mealplanner_demo_data_loaded flag so demo data doesn't auto-reload
            console.log('🚩 Demo data loaded flag preserved - no auto-reload will occur');
            
            console.log('🗑️ All data cleared successfully');
            return true;
        } catch (error) {
            console.error('❌ Error clearing data:', error);
            return false;
        }
    }

    // Reset to original demo data
    resetDemoData() {
        console.log('🔄 Resetting to original demo data...');
        
        try {
            // Temporarily clear the demo data loaded flag so initializeDemoData can run
            localStorage.removeItem('mealplanner_demo_data_loaded');
            console.log('🚩 Temporarily cleared demo data loaded flag for reset');
            
            if (!this.originalDemoData || Object.keys(this.originalDemoData).length === 0) {
                console.warn('⚠️ Original demo data not available, reinitializing...');
                this.initializeDemoData();
                return true;
            }
            
            const dataTypes = ['items', 'recipes', 'scheduledMeals', 'pantryItems', 'meals'];
            
            dataTypes.forEach(dataType => {
                const storageKey = `mealplanner_${dataType}`;
                const originalData = this.originalDemoData[dataType] || [];
                
                // Restore original demo data to localStorage
                localStorage.setItem(storageKey, JSON.stringify(originalData));
                console.log(`✅ Reset ${dataType}: ${originalData.length} items restored`);
            });
            
            // Set the demo data loaded flag since we just restored demo data
            localStorage.setItem('mealplanner_demo_data_loaded', 'true');
            console.log('🚩 Set demo data loaded flag - demo data restored');
            
            console.log('🔄 Demo data reset completed');
            return true;
        } catch (error) {
            console.error('❌ Error resetting demo data:', error);
            return false;
        }
    }

    // Centralized data loading authority - all managers get data from here
    //
    // RACE CONDITION INVESTIGATION:
    // This method is called by managers during initialization (RecipeManager, ItemsManager, etc.)
    // When sourceType is 'demo', it calls getDemoData() -> getLocalData()
    // If localStorage is empty, getLocalData() returns [] (empty array)
    // BUT: Something must be populating localStorage between manager calls
    // 
    // Suspected call sequence during app startup:
    // 1. Settings manager initializes (sourceType = 'demo')
    // 2. RecipeManager initializes -> calls getAuthoritativeData('items') -> returns []
    // 3. RecipeManager initializes -> calls getAuthoritativeData('recipes') -> returns []
    // 4. ??? Something populates localStorage with demo data ???
    // 5. Settings manager calls initializeDemoData() -> finds data already exists -> skips flag setting
    getAuthoritativeData(dataType) {
        const currentSource = this.getCurrentDatabaseSource();
        console.log(`📊 Loading authoritative ${dataType} data from source: ${currentSource}`);
        
        switch (currentSource) {
            case 'demo':
                return this.getDemoData(dataType);
            case 'local':
                return this.getLocalData(dataType);
            case 'github':
                return this.getGitHubData(dataType);
            default:
                console.warn(`⚠️ Unknown data source: ${currentSource}, falling back to empty data`);
                return [];
        }
    }
    
    getDemoData(dataType) {
        // Demo data is initialized to localStorage on startup, so just read from localStorage
        // This makes demo source behave exactly like local source (just with different initial seed)
        return this.getLocalData(dataType);
    }
    

    // Centralized save method - routes to correct storage based on current database source
    saveAuthoritativeData(dataType, data) {
        const currentSource = this.getCurrentDatabaseSource();
        console.log(`💾 Saving ${dataType} to ${currentSource} storage...`);
        
        try {
            switch (currentSource) {
                case 'demo':
                case 'local':
                    // Use standard localStorage keys
                    localStorage.setItem(`mealplanner_${dataType}`, JSON.stringify(data));
                    console.log(`✅ Saved ${data.length} ${dataType} to localStorage`);
                    break;
                    
                    
                case 'github':
                    // GitHub mode - save to localStorage for now (TODO: implement GitHub sync)
                    localStorage.setItem(`mealplanner_${dataType}`, JSON.stringify(data));
                    console.log(`✅ Saved ${data.length} ${dataType} to localStorage (GitHub mode)`);
                    break;
                    
                default:
                    console.warn(`⚠️ Unknown storage source: ${currentSource}, not saving`);
            }
        } catch (error) {
            console.error(`❌ Error saving ${dataType} to ${currentSource} storage:`, error);
        }
    }
    
    getLocalData(dataType) {
        // Local file mode - try localStorage first, then empty
        try {
            const stored = localStorage.getItem(`mealplanner_${dataType}`);
            if (stored) {
                const data = JSON.parse(stored);
                console.log(`✅ Loaded ${data.length} ${dataType} from localStorage`);
                return data;
            }
        } catch (error) {
            console.warn(`⚠️ Error loading ${dataType} from localStorage:`, error);
        }
        
        console.log(`✅ No local ${dataType} found, returning empty data`);
        return [];
    }
    
    getGitHubData(dataType) {
        // GitHub mode - try localStorage first (synced data), then empty
        // TODO: Implement GitHub sync logic
        return this.getLocalData(dataType);
    }

    // Method to reload all managers when database source changes
    async reloadAllManagers() {
        console.log('🔄 Reloading all managers due to database source change...');
        
        try {
            // Reload all managers that have data
            if (window.app) {
                // Reload recipe manager
                if (window.app.recipeManager) {
                    await window.app.recipeManager.loadRecipes();
                    window.app.recipeManager.render();
                }
                
                // Reload items manager
                if (window.app.itemsManager) {
                    await window.app.itemsManager.loadIngredients();
                    window.app.itemsManager.render();
                }
                
                // Reload meal manager
                if (window.app.mealManager) {
                    await window.app.mealManager.loadRecipes();
                    await window.app.mealManager.loadMeals();
                    window.app.mealManager.render();
                }
                
                // Reload grocery list manager
                if (window.app.groceryListManager) {
                    await window.app.groceryListManager.loadData();
                    window.app.groceryListManager.render();
                }
                
                // Reload schedule manager
                if (window.app.scheduleManager) {
                    window.app.scheduleManager.loadScheduledMeals();
                }
                
                // Refresh all meal planning views
                window.app.refreshAllComponents();
                
                console.log('✅ All managers reloaded successfully');
            }
        } catch (error) {
            console.error('❌ Error reloading managers:', error);
        }
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
    
    // Centralized clear filters utility with confirmation and double press protection
    static createClearFiltersHandler(clearCallback, buttonSelector, managerInstance) {
        return function() {
            const settings = window.mealPlannerSettings?.settings;
            const requireDoublePress = settings?.requireDoublePressForClearFilters;
            const shouldConfirm = settings?.confirmBeforeClearingFilters;
            
            // Initialize double press state on manager instance if not exists
            if (!managerInstance.clearFiltersFirstPressTime) {
                managerInstance.clearFiltersFirstPressTime = null;
                managerInstance.clearFiltersTimeout = null;
            }
            
            // Handle double press requirement
            if (requireDoublePress) {
                const now = Date.now();
                const clearButton = document.querySelector(buttonSelector);
                
                if (!managerInstance.clearFiltersFirstPressTime) {
                    // First press
                    managerInstance.clearFiltersFirstPressTime = now;
                    
                    // Update button appearance for visual feedback
                    if (clearButton) {
                        clearButton.textContent = 'Press Again to Clear';
                        clearButton.classList.add('bg-red-600', 'hover:bg-red-700');
                        clearButton.classList.remove('bg-gray-500', 'hover:bg-gray-600');
                    }
                    
                    // Set timeout to reset after 3 seconds
                    managerInstance.clearFiltersTimeout = setTimeout(() => {
                        SettingsManager.resetClearFiltersState(buttonSelector, managerInstance);
                    }, 3000);
                    
                    return; // Don't clear on first press
                } else {
                    // Second press - check if within 3 seconds
                    const timeDiff = now - managerInstance.clearFiltersFirstPressTime;
                    if (timeDiff <= 3000) {
                        // Valid double press, proceed with clearing
                        SettingsManager.resetClearFiltersState(buttonSelector, managerInstance);
                    } else {
                        // Too late, reset and treat as first press
                        SettingsManager.resetClearFiltersState(buttonSelector, managerInstance);
                        // Recursive call to handle as first press
                        SettingsManager.createClearFiltersHandler(clearCallback, buttonSelector, managerInstance)();
                        return;
                    }
                }
            }
            
            // Check if confirmation is required (separate from double press)
            if (shouldConfirm) {
                // Check if there are active filters (this is manager-specific)
                let hasActiveFilters = false;
                if (typeof managerInstance.hasActiveFilters === 'function') {
                    hasActiveFilters = managerInstance.hasActiveFilters();
                } else {
                    // Fallback: assume there are active filters if we got this far
                    hasActiveFilters = true;
                }
                
                if (hasActiveFilters) {
                    const confirmed = confirm('Are you sure you want to clear all filters? This will reset your search, selected labels, favorites filter, and sort settings.');
                    if (!confirmed) {
                        return; // User cancelled, don't clear filters
                    }
                }
            }
            
            // Execute the actual clear callback
            clearCallback();
        };
    }
    
    // Reset double press state and button appearance
    static resetClearFiltersState(buttonSelector, managerInstance) {
        managerInstance.clearFiltersFirstPressTime = null;
        
        if (managerInstance.clearFiltersTimeout) {
            clearTimeout(managerInstance.clearFiltersTimeout);
            managerInstance.clearFiltersTimeout = null;
        }
        
        // Reset button appearance
        const clearButton = document.querySelector(buttonSelector);
        if (clearButton) {
            clearButton.textContent = 'Clear Filters';
            clearButton.classList.remove('bg-red-600', 'hover:bg-red-700');
            clearButton.classList.add('bg-gray-500', 'hover:bg-gray-600');
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
