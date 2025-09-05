// MealPlanner Main Application
class MealPlannerApp {
    constructor() {
        this.currentTab = 'recipes';
        this.version = '2025.09.05.1602';
        this.itineraryViews = {};
        this.calendarViews = {};
        this.recipeManager = null;
        this.ingredientsManager = null;
        this.groceryListManager = null;
        this.settingsManager = null;
        this.googleCalendarIntegration = null;
        this.mealRotationEngine = null;
        this.serviceWorker = null;
        this.installPrompt = null;
        this.currentViews = {
            breakfast: 'itinerary',
            lunch: 'itinerary', 
            dinner: 'itinerary'
        };
        this.init();
    }

    init() {
        console.log(`🚀 Initializing MealPlanner v${this.version}...`);
        console.log('📍 Location:', window.location.href);
        console.log('🕐 Timestamp:', new Date().toISOString());
        
        // Update version display
        this.updateVersionDisplay();
        
        // Hide loading and show app
        setTimeout(() => {
            const loading = document.getElementById('loading');
            const mainApp = document.getElementById('main-app');
            
            if (loading) loading.style.display = 'none';
            if (mainApp) mainApp.classList.remove('hidden');
            
            this.setupEventListeners();
            this.initializeTheme();
                    this.initializeRecipeManager();
        this.initializeIngredientsManager();
        this.initializeGroceryListManager();
        this.initializeSettingsManager();
            this.initializeGoogleCalendar();
            this.initializeMealRotationEngine();
            this.initializeServiceWorker();
            this.initializePWAFeatures();
            this.initializeItineraryViews();
            this.initializeMealPlanningControls();
            this.generateCalendarDays();
            
            console.log(`✅ MealPlanner v${this.version} initialized successfully!`);
        }, 1000);
    }

    updateVersionDisplay() {
        const versionElement = document.getElementById('version-display');
        if (versionElement) {
            versionElement.textContent = `v${this.version}`;
            versionElement.title = `MealPlanner v${this.version}\nLoaded: ${new Date().toLocaleString()}\nLocation: ${window.location.href}`;
        }
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Data source controls
        document.getElementById('data-source-select')?.addEventListener('change', (e) => {
            this.handleDataSourceChange(e.target.value);
        });

        document.getElementById('export-db-btn')?.addEventListener('click', () => {
            this.handleExportDatabase();
        });

        // Google Calendar integration
        document.getElementById('google-calendar-btn')?.addEventListener('click', () => {
            this.handleGoogleCalendarAction();
        });

        // View toggle buttons
        document.getElementById('view-toggle-breakfast')?.addEventListener('click', () => {
            this.toggleView('breakfast');
        });

        document.getElementById('view-toggle-lunch')?.addEventListener('click', () => {
            this.toggleView('lunch');
        });

        document.getElementById('view-toggle-dinner')?.addEventListener('click', () => {
            this.toggleView('dinner');
        });

        // Theme toggle button
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for Google Calendar auth changes
        document.addEventListener('googleCalendarAuthChanged', (e) => {
            this.updateGoogleCalendarUI(e.detail.isAuthenticated);
        });
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });

        // Remove active class from all nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active', 'border-blue-500', 'text-blue-600');
            tab.classList.add('border-transparent', 'text-gray-500');
        });

        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active', 'border-blue-500', 'text-blue-600');
            activeTab.classList.remove('border-transparent', 'text-gray-500');
        }

        // Show selected tab
        document.getElementById(`${tabName}-tab`).classList.remove('hidden');
        this.currentTab = tabName;

        console.log(`Switched to ${tabName} tab`);
    }

    generateCalendarDays() {
        const calendarDays = document.getElementById('calendar-days');
        if (!calendarDays) return;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        let daysHTML = '';
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate();
            daysHTML += `
                <div class="calendar-day p-2 text-center hover:bg-blue-50 rounded cursor-pointer border-2 border-transparent ${isToday ? 'bg-blue-100 border-blue-300 font-bold' : 'hover:border-blue-200'}"
                     data-day="${day}">
                    <div class="text-sm">${day}</div>
                    <div class="text-xs text-gray-500 mt-1">Click to add meal</div>
                </div>
            `;
        }
        calendarDays.innerHTML = daysHTML;

        // Add click handlers for calendar days
        calendarDays.addEventListener('click', (e) => {
            if (e.target.closest('.calendar-day')) {
                const day = e.target.closest('.calendar-day').dataset.day;
                if (day) {
                    alert(`Schedule meal for December ${day}, 2024`);
                }
            }
        });
    }

    initializeRecipeManager() {
        console.log('🍳 Initializing recipe manager...');
        
        const container = document.getElementById('recipe-manager-container');
        if (container) {
            this.recipeManager = new RecipeManager(container);
            window.recipeManager = this.recipeManager;
            console.log('✅ Recipe manager initialized');
        }
    }

    initializeIngredientsManager() {
        console.log('🥕 Initializing ingredients manager...');
        
        const container = document.getElementById('ingredients-manager-container');
        if (container) {
            this.ingredientsManager = new IngredientsManager(container);
            window.ingredientsManager = this.ingredientsManager;
            console.log('✅ Ingredients manager initialized');
        }
    }

    initializeGroceryListManager() {
        console.log('🛒 Initializing grocery list manager...');
        
        const container = document.getElementById('grocery-list-container');
        if (container) {
            this.groceryListManager = new GroceryListManager(container);
            window.groceryListManager = this.groceryListManager;
            console.log('✅ Grocery list manager initialized');
        }
    }

    initializeSettingsManager() {
        console.log('⚙️ Initializing settings manager...');
        this.settingsManager = new SettingsManager();
        window.settingsManager = this.settingsManager;
        console.log('✅ Settings manager initialized');
    }

    initializeGoogleCalendar() {
        console.log('🗓️ Initializing Google Calendar Integration...');
        
        // Google Calendar integration is initialized globally
        this.googleCalendarIntegration = window.googleCalendarIntegration;
        
        if (this.googleCalendarIntegration) {
            // Set initial managed mode from storage
            const managedMode = this.googleCalendarIntegration.getManagedMode();
            this.googleCalendarIntegration.setManagedMode(managedMode);
            
            // Update UI to reflect current auth status
            this.updateGoogleCalendarUI(this.googleCalendarIntegration.isAuthenticated);
            
            console.log('✅ Google Calendar Integration initialized');
        } else {
            console.error('❌ Google Calendar Integration not found');
        }
    }

    initializeMealRotationEngine() {
        console.log('🧠 Initializing Meal Rotation Engine...');
        
        this.mealRotationEngine = new MealRotationEngine();
        
        // Initialize with current recipes and user preferences
        const recipes = this.getMockRecipes(); // This will be replaced with actual database call
        const userPreferences = JSON.parse(localStorage.getItem('mealPreferences') || '{}');
        const pantryItems = this.getMockPantryItems(); // This will be replaced with actual database call
        
        this.mealRotationEngine.initialize(recipes, userPreferences, pantryItems);
        
        // Make globally available for testing
        window.mealRotationEngine = this.mealRotationEngine;
        
        console.log('✅ Meal Rotation Engine initialized');
    }

    async initializeServiceWorker() {
        console.log('🔧 Initializing Service Worker...');
        
        if ('serviceWorker' in navigator) {
            try {
                // Register service worker
                const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                });
                
                this.serviceWorker = registration;
                
                console.log('✅ Service Worker registered:', registration.scope);
                
                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 Service Worker: New version available');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateAvailable();
                        }
                    });
                });
                
                // Listen for messages from service worker
                navigator.serviceWorker.addEventListener('message', (event) => {
                    this.handleServiceWorkerMessage(event.data);
                });
                
                // Check if there's a waiting service worker
                if (registration.waiting) {
                    this.showUpdateAvailable();
                }
                
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error);
            }
        } else {
            console.log('⚠️ Service Worker not supported');
        }
    }

    async initializePWAFeatures() {
        console.log('📱 Initializing PWA Features...');
        
        // Handle install prompt
        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('📱 PWA: Install prompt available');
            event.preventDefault();
            this.installPrompt = event;
            this.showInstallButton();
        });
        
        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('📱 PWA: App installed successfully');
            this.installPrompt = null;
            this.hideInstallButton();
            this.showNotification('MealPlanner installed successfully!', 'success');
        });
        
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('📱 PWA: Running in standalone mode');
            this.hideInstallButton();
        }
        
        // Initialize push notifications (if supported)
        if ('Notification' in window && 'serviceWorker' in navigator) {
            this.initializePushNotifications();
        }
        
        console.log('✅ PWA Features initialized');
    }

    async initializePushNotifications() {
        try {
            // Check current permission
            let permission = Notification.permission;
            
            if (permission === 'default') {
                // Don't request permission automatically - let user decide
                console.log('🔔 Push notifications: Permission not requested yet');
                return;
            }
            
            if (permission === 'granted' && this.serviceWorker) {
                // Get or create push subscription
                const subscription = await this.serviceWorker.pushManager.getSubscription();
                
                if (!subscription) {
                    console.log('🔔 Push notifications: No subscription found');
                } else {
                    console.log('🔔 Push notifications: Active subscription found');
                }
            }
            
        } catch (error) {
            console.error('❌ Push notifications initialization failed:', error);
        }
    }

    handleServiceWorkerMessage(data) {
        console.log('💬 Service Worker message:', data);
        
        switch (data.type) {
            case 'SYNC_MEAL_PLANS':
                if (this.googleCalendarIntegration && this.googleCalendarIntegration.isAuthenticated) {
                    this.syncMealPlanToCalendar();
                }
                break;
                
            case 'CACHE_UPDATED':
                this.showNotification('App updated and ready to use offline!', 'info');
                break;
        }
    }

    showUpdateAvailable() {
        const updateBanner = document.createElement('div');
        updateBanner.id = 'update-banner';
        updateBanner.className = 'fixed top-0 left-0 right-0 bg-blue-600 text-white p-3 text-center z-50';
        updateBanner.innerHTML = `
            <div class="flex items-center justify-center space-x-4">
                <span>🔄 A new version of MealPlanner is available!</span>
                <button id="update-btn" class="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
                    Update Now
                </button>
                <button id="dismiss-update" class="text-blue-200 hover:text-white">
                    ✕
                </button>
            </div>
        `;
        
        document.body.appendChild(updateBanner);
        
        // Handle update button
        document.getElementById('update-btn').addEventListener('click', () => {
            this.applyUpdate();
        });
        
        // Handle dismiss button
        document.getElementById('dismiss-update').addEventListener('click', () => {
            updateBanner.remove();
        });
    }

    async applyUpdate() {
        if (this.serviceWorker && this.serviceWorker.waiting) {
            // Tell the waiting service worker to skip waiting
            this.serviceWorker.waiting.postMessage({ type: 'SKIP_WAITING' });
            
            // Reload the page to use the new service worker
            window.location.reload();
        }
    }

    showInstallButton() {
        // Add install button to header if not already present
        if (document.getElementById('install-btn')) return;
        
        const header = document.querySelector('header .flex');
        if (header) {
            const installBtn = document.createElement('button');
            installBtn.id = 'install-btn';
            installBtn.className = 'text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center space-x-1';
            installBtn.title = 'Install MealPlanner as an app';
            installBtn.innerHTML = `
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                <span>Install</span>
            `;
            
            installBtn.addEventListener('click', () => {
                this.promptInstall();
            });
            
            header.appendChild(installBtn);
        }
    }

    hideInstallButton() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.remove();
        }
    }

    async promptInstall() {
        if (this.installPrompt) {
            try {
                const result = await this.installPrompt.prompt();
                console.log('📱 PWA: Install prompt result:', result.outcome);
                
                if (result.outcome === 'accepted') {
                    this.installPrompt = null;
                }
            } catch (error) {
                console.error('❌ PWA: Install prompt failed:', error);
            }
        }
    }

    async requestNotificationPermission() {
        if ('Notification' in window) {
            try {
                const permission = await Notification.requestPermission();
                
                if (permission === 'granted') {
                    this.showNotification('Notifications enabled! You\'ll receive meal reminders.', 'success');
                    this.initializePushNotifications();
                } else {
                    this.showNotification('Notifications disabled. You can enable them in browser settings.', 'info');
                }
                
                return permission;
            } catch (error) {
                console.error('❌ Notification permission request failed:', error);
                return 'denied';
            }
        }
        
        return 'unsupported';
    }

    async scheduleBackgroundSync(tag = 'database-sync') {
        if (this.serviceWorker && window.ServiceWorkerRegistration && 'sync' in window.ServiceWorkerRegistration.prototype) {
            try {
                await this.serviceWorker.sync.register(tag);
                console.log('🔄 Background sync scheduled:', tag);
            } catch (error) {
                console.error('❌ Background sync registration failed:', error);
            }
        }
    }

    initializeItineraryViews() {
        console.log('🍽️ Initializing meal planning views...');
        
        // Initialize both itinerary and calendar views for each meal type
        const mealTypes = ['breakfast', 'lunch', 'dinner'];
        
        // Initialize calendar views registry
        this.calendarViews = {};
        window.calendarViews = window.calendarViews || {};
        
        mealTypes.forEach(mealType => {
            // Initialize itinerary view
            const itineraryContainer = document.getElementById(`${mealType}-itinerary`);
            if (itineraryContainer) {
                this.itineraryViews[mealType] = new ItineraryView(itineraryContainer, mealType);
                this.itineraryViews[mealType].render();
                
                // Store in global registry for onclick handlers
                window.itineraryViews[mealType] = this.itineraryViews[mealType];
                
                console.log(`✅ ${mealType} itinerary view initialized`);
            }
            
            // Initialize calendar view
            const calendarContainer = document.getElementById(`${mealType}-calendar`);
            if (calendarContainer) {
                this.calendarViews[mealType] = new CalendarView(calendarContainer, mealType);
                this.calendarViews[mealType].render();
                
                // Store in global registry for onclick handlers
                window.calendarViews[mealType] = this.calendarViews[mealType];
                
                console.log(`✅ ${mealType} calendar view initialized`);
            }
        });
        
        console.log('✅ Meal planning views initialized');
    }

    initializeMealPlanningControls() {
        console.log('🍽️ Initializing meal planning controls...');
        
        // Initialize controls for each meal type
        ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            this.initializeMealTypeControls(mealType);
        });
        
        console.log('✅ Meal planning controls initialized');
    }

    initializeMealTypeControls(mealType) {
        // Auto Plan button
        const autoPlanBtn = document.getElementById(`auto-plan-${mealType}`);
        if (autoPlanBtn) {
            autoPlanBtn.addEventListener('click', () => {
                this.handleAutoPlan(mealType);
            });
        }

        // Clear Plan button
        const clearPlanBtn = document.getElementById(`clear-plan-${mealType}`);
        if (clearPlanBtn) {
            clearPlanBtn.addEventListener('click', () => {
                this.handleClearPlan(mealType);
            });
        }
    }

    handleAutoPlan(mealType) {
        console.log(`🤖 Auto planning ${mealType} meals...`);
        
        // Check if meal rotation engine is available
        if (!this.mealRotationEngine) {
            this.showNotification('Meal rotation engine not available. Please try again.', 'error');
            return;
        }

        // Get the current itinerary view for this meal type
        const itineraryView = this.itineraryViews[mealType];
        if (!itineraryView) {
            this.showNotification('Meal planning view not available. Please try again.', 'error');
            return;
        }

        try {
            // Use the meal rotation engine to generate a plan
            const weeksToShow = itineraryView.weeksToShow || 4;
            const totalDays = weeksToShow * 7;
            
            // Generate rotation for the specified period
            const rotation = this.mealRotationEngine.generateRotation(totalDays, mealType);
            
            if (rotation && rotation.meals && rotation.meals.length > 0) {
                // Apply the generated plan to the itinerary view
                this.applyGeneratedPlan(mealType, rotation.meals);
                
                // Show success notification with stats
                const stats = rotation.stats || {};
                const message = `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} plan generated! ${rotation.meals.length} meals planned.`;
                this.showNotification(message, 'success');
                
                // Log generation stats
                console.log(`📊 ${mealType} plan stats:`, stats);
            } else {
                this.showNotification('No suitable meals found for auto planning. Please add more recipes.', 'warning');
            }
        } catch (error) {
            console.error('Error generating meal plan:', error);
            this.showNotification('Error generating meal plan. Please try again.', 'error');
        }
    }

    handleClearPlan(mealType) {
        console.log(`🗑️ Clearing ${mealType} meal plan...`);
        
        // Show confirmation dialog
        const confirmed = confirm(`Are you sure you want to clear all ${mealType} meal plans? This action cannot be undone.`);
        
        if (confirmed) {
            try {
                // Clear the meal plan data
                this.clearMealPlanData(mealType);
                
                // Refresh the views
                const itineraryView = this.itineraryViews[mealType];
                if (itineraryView) {
                    itineraryView.render();
                }
                
                const calendarView = this.calendarViews[mealType];
                if (calendarView) {
                    calendarView.render();
                }
                
                this.showNotification(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} meal plan cleared successfully.`, 'success');
            } catch (error) {
                console.error('Error clearing meal plan:', error);
                this.showNotification('Error clearing meal plan. Please try again.', 'error');
            }
        }
    }

    applyGeneratedPlan(mealType, meals) {
        // This would normally save to database
        // For now, we'll just trigger a re-render with the new data
        console.log(`📅 Applying ${meals.length} ${mealType} meals to plan...`);
        
        // In a real implementation, this would:
        // 1. Save the meals to the database with proper dates
        // 2. Update the local data structures
        // 3. Refresh all relevant views
        
        // For now, just refresh the views to show the mock data
        const itineraryView = this.itineraryViews[mealType];
        if (itineraryView) {
            itineraryView.render();
        }
        
        const calendarView = this.calendarViews[mealType];
        if (calendarView) {
            calendarView.render();
        }
    }

    clearMealPlanData(mealType) {
        // This would normally clear from database
        // For now, we'll just clear any local data and refresh views
        console.log(`🗑️ Clearing ${mealType} data from storage...`);
        
        // In a real implementation, this would:
        // 1. Delete scheduled meals from database for this meal type
        // 2. Clear local data structures
        // 3. Update any cached data
        
        // For now, just log the action
        console.log(`✅ ${mealType} meal plan data cleared`);
    }

    toggleView(mealType) {
        const currentView = this.currentViews[mealType];
        const newView = currentView === 'itinerary' ? 'calendar' : 'itinerary';
        
        // Hide current view
        document.getElementById(`${mealType}-${currentView}`).classList.add('hidden');
        
        // Show new view
        document.getElementById(`${mealType}-${newView}`).classList.remove('hidden');
        
        // Update button text
        const button = document.getElementById(`view-toggle-${mealType}`);
        if (button) {
            if (newView === 'calendar') {
                button.innerHTML = '📋 Itinerary View';
                button.setAttribute('data-view', 'itinerary');
            } else {
                button.innerHTML = '📅 Calendar View';
                button.setAttribute('data-view', 'calendar');
            }
        }
        
        // Update current view state
        this.currentViews[mealType] = newView;
        
        console.log(`Switched ${mealType} to ${newView} view`);
    }

    handleGoogleCalendarAction() {
        if (!this.googleCalendarIntegration) {
            console.error('Google Calendar integration not available');
            return;
        }

        if (this.googleCalendarIntegration.isAuthenticated) {
            // Show calendar options modal
            this.showGoogleCalendarModal();
        } else {
            // Authenticate first
            this.authenticateGoogleCalendar();
        }
    }

    async authenticateGoogleCalendar() {
        try {
            console.log('🔐 Authenticating with Google Calendar...');
            const success = await this.googleCalendarIntegration.authenticate();
            
            if (success) {
                this.updateGoogleCalendarUI(true);
                this.showGoogleCalendarModal();
            }
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    }

    updateGoogleCalendarUI(isAuthenticated) {
        const button = document.getElementById('google-calendar-btn');
        const status = document.getElementById('google-calendar-status');
        
        if (button && status) {
            if (isAuthenticated) {
                button.className = 'text-sm bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center space-x-1';
                status.textContent = 'Sync';
                button.title = 'Sync meal plan with Google Calendar';
            } else {
                button.className = 'text-sm bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded flex items-center space-x-1';
                status.textContent = 'Connect';
                button.title = 'Connect to Google Calendar';
            }
        }
    }

    showGoogleCalendarModal() {
        const managedMode = this.googleCalendarIntegration.getManagedMode();
        
        const modal = this.createModal('Google Calendar Sync', `
            <div class="space-y-4">
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Calendar Management Mode</h4>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2">
                            <input type="radio" name="calendar-mode" value="managed" ${managedMode ? 'checked' : ''} 
                                   class="text-blue-600">
                            <div>
                                <div class="font-medium">🔒 Managed Calendar (Recommended)</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">
                                    MealPlanner has complete control. Creates dedicated calendar and syncs all changes.
                                </div>
                            </div>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="radio" name="calendar-mode" value="collaborative" ${!managedMode ? 'checked' : ''} 
                                   class="text-blue-600">
                            <div>
                                <div class="font-medium">🤝 Collaborative Mode</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">
                                    Respects existing events. Only adds new meals, won't remove manual entries.
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <h4 class="font-medium">Sync Options</h4>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" id="include-ingredients" class="text-blue-600">
                        <span>Include ingredients in event descriptions</span>
                    </label>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" id="include-instructions" class="text-blue-600">
                        <span>Include cooking instructions</span>
                    </label>
                </div>
                
                <div class="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div class="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Note:</strong> This will sync your current meal plan to Google Calendar. 
                        ${managedMode ? 'Existing meal events will be replaced.' : 'Conflicting time slots will be skipped.'}
                    </div>
                </div>
            </div>
        `, [
            { text: 'Cancel', action: 'close' },
            { text: 'Test Connection', action: 'test' },
            { text: 'Sync Now', action: 'sync', primary: true }
        ]);

        // Handle modal actions
        modal.addEventListener('modal-action', async (e) => {
            const action = e.detail.action;
            
            if (action === 'test') {
                await this.testGoogleCalendarConnection();
            } else if (action === 'sync') {
                // Get selected options
                const selectedMode = modal.querySelector('input[name="calendar-mode"]:checked').value;
                const includeIngredients = modal.querySelector('#include-ingredients').checked;
                const includeInstructions = modal.querySelector('#include-instructions').checked;
                
                // Update managed mode
                this.googleCalendarIntegration.setManagedMode(selectedMode === 'managed');
                
                // Sync meal plan
                await this.syncMealPlanToCalendar({
                    includeIngredients,
                    includeInstructions
                });
            }
        });
    }

    async testGoogleCalendarConnection() {
        try {
            const result = await this.googleCalendarIntegration.testConnection();
            
            if (result.success) {
                this.showNotification(`✅ ${result.message}`, 'success');
            } else {
                this.showNotification(`❌ ${result.message}`, 'error');
            }
        } catch (error) {
            this.showNotification(`❌ Connection test failed: ${error.message}`, 'error');
        }
    }

    async syncMealPlanToCalendar(options = {}) {
        try {
            // Get all scheduled meals from current views
            const allScheduledMeals = this.getAllScheduledMeals();
            
            if (allScheduledMeals.length === 0) {
                this.showNotification('No meals scheduled to sync', 'info');
                return;
            }

            console.log(`📅 Syncing ${allScheduledMeals.length} meals to Google Calendar...`);
            
            await this.googleCalendarIntegration.syncMealPlan(allScheduledMeals, options);
            
        } catch (error) {
            console.error('Sync failed:', error);
            this.showNotification(`Sync failed: ${error.message}`, 'error');
        }
    }

    getAllScheduledMeals() {
        // Collect meals from all itinerary views
        const allMeals = [];
        
        Object.entries(this.itineraryViews).forEach(([mealType, view]) => {
            if (view && view.getScheduledMeals) {
                const meals = view.getScheduledMeals();
                allMeals.push(...meals.map(meal => ({
                    ...meal,
                    mealType
                })));
            }
        });
        
        // Also collect from calendar views if they have different data
        Object.entries(this.calendarViews).forEach(([mealType, view]) => {
            if (view && view.getAllScheduledMeals) {
                const meals = view.getAllScheduledMeals();
                // Avoid duplicates by checking if meal already exists
                meals.forEach(meal => {
                    const exists = allMeals.some(existing => 
                        existing.id === meal.id && existing.mealType === mealType
                    );
                    if (!exists) {
                        allMeals.push({
                            ...meal,
                            mealType
                        });
                    }
                });
            }
        });
        
        return allMeals;
    }

    handleDataSourceChange(sourceType) {
        console.log(`🗄️ Data source changed to: ${sourceType}`);
        
        switch (sourceType) {
            case 'demo':
                this.loadDemoData();
                break;
            case 'new':
                this.createNewDatabase();
                break;
            case 'existing':
                this.loadExistingDatabase();
                break;
            default:
                console.warn('Unknown data source type:', sourceType);
        }
    }

    loadDemoData() {
        console.log('📊 Loading demo data...');
        
        // Show notification
        this.showNotification('Demo data loaded! This includes sample recipes, ingredients, and meal plans.', 'success');
        
        // Re-render all components with demo data
        this.refreshAllComponents();
    }

    createNewDatabase() {
        console.log('🆕 Creating new database...');
        
        // Check if we're in a PWA/installed context
        if (this.isInstalled()) {
            this.promptForNewDatabasePath();
        } else {
            this.showInstallPrompt();
        }
    }

    loadExistingDatabase() {
        console.log('📂 Loading existing database...');
        
        // Create file input for database selection
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.db,.sqlite,.sqlite3';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.loadDatabaseFile(file);
            }
        });
        
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    handleExportDatabase() {
        console.log('💾 Exporting database...');
        
        // Create a blob with the current database state
        const dbData = this.getCurrentDatabaseData();
        const blob = new Blob([dbData], { type: 'application/octet-stream' });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mealplanner-${new Date().toISOString().split('T')[0]}.db`;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Database exported successfully!', 'success');
    }

    isInstalled() {
        // Check if app is installed as PWA
        return window.matchMedia('(display-mode: standalone)').matches || 
               window.navigator.standalone || 
               document.referrer.includes('android-app://');
    }

    promptForNewDatabasePath() {
        // Show modal for database path selection
        const modal = this.createModal('Create New Database', `
            <div class="space-y-4">
                <div>
                    <label for="db-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Database Name
                    </label>
                    <input type="text" id="db-name" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                           placeholder="my-meal-plan" value="my-meal-plan">
                </div>
                <div>
                    <label for="db-path" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Save Location
                    </label>
                    <div class="flex space-x-2">
                        <input type="text" id="db-path" 
                               class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                               placeholder="/path/to/save/location" readonly>
                        <button id="browse-path-btn" class="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">
                            Browse
                        </button>
                    </div>
                </div>
            </div>
        `, [
            { text: 'Cancel', action: 'close' },
            { text: 'Create Database', action: 'create', primary: true }
        ]);
        
        // Handle browse button
        modal.querySelector('#browse-path-btn')?.addEventListener('click', () => {
            // In a real PWA, this would use the File System Access API
            document.getElementById('db-path').value = '/Users/username/Documents/MealPlanner/';
        });
        
        // Handle create action
        modal.addEventListener('modal-action', (e) => {
            if (e.detail.action === 'create') {
                const name = document.getElementById('db-name').value;
                const path = document.getElementById('db-path').value;
                this.createDatabaseFile(name, path);
            }
        });
    }

    showInstallPrompt() {
        const modal = this.createModal('Install Required', `
            <div class="text-center space-y-4">
                <div class="text-6xl">📱</div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Install MealPlanner
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        To create and manage local database files, please install MealPlanner as a Progressive Web App (PWA).
                    </p>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p class="text-sm text-blue-800 dark:text-blue-200">
                        <strong>How to install:</strong><br>
                        • Chrome/Edge: Click the install icon in the address bar<br>
                        • Safari: Share → Add to Home Screen<br>
                        • Firefox: Menu → Install this site as an app
                    </p>
                </div>
            </div>
        `, [
            { text: 'Use Demo Data Instead', action: 'demo' },
            { text: 'Got It', action: 'close', primary: true }
        ]);
        
        modal.addEventListener('modal-action', (e) => {
            if (e.detail.action === 'demo') {
                document.getElementById('data-source-select').value = 'demo';
                this.loadDemoData();
            }
        });
    }

    loadDatabaseFile(file) {
        console.log(`📂 Loading database file: ${file.name}`);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                // In a real implementation, this would parse the SQLite file
                console.log('Database file loaded:', e.target.result.byteLength, 'bytes');
                this.showNotification(`Database "${file.name}" loaded successfully!`, 'success');
                this.refreshAllComponents();
            } catch (error) {
                console.error('Error loading database file:', error);
                this.showNotification('Error loading database file. Please check the file format.', 'error');
                // Reset to demo data
                document.getElementById('data-source-select').value = 'demo';
            }
        };
        reader.readAsArrayBuffer(file);
    }

    createDatabaseFile(name, path) {
        console.log(`🆕 Creating database: ${name} at ${path}`);
        
        // In a real implementation, this would create a new SQLite database
        this.showNotification(`New database "${name}" created successfully!`, 'success');
        this.refreshAllComponents();
    }

    getCurrentDatabaseData() {
        // In a real implementation, this would serialize the current SQLite database
        // For now, return a mock database structure
        return JSON.stringify({
            version: this.version,
            exported: new Date().toISOString(),
            recipes: [],
            ingredients: [],
            meal_plans: [],
            pantry_items: []
        });
    }

    refreshAllComponents() {
        console.log('🔄 Refreshing all components...');
        
        // Re-render all views with new data
        if (this.recipeManager) {
            this.recipeManager.render();
        }
        if (this.ingredientsManager) {
            this.ingredientsManager.render();
        }
        if (this.groceryListManager) {
            this.groceryListManager.render();
        }
        
        // Re-render itinerary and calendar views
        Object.values(this.itineraryViews).forEach(view => view.render());
        Object.values(this.calendarViews).forEach(view => view.render());
    }

    createModal(title, content, actions = []) {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">${title}</h2>
                </div>
                <div class="px-6 py-4">
                    ${content}
                </div>
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    ${actions.map(action => `
                        <button class="modal-action-btn px-4 py-2 rounded-md ${
                            action.primary 
                                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                : 'bg-gray-300 hover:bg-gray-400 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200'
                        }" data-action="${action.action}">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelectorAll('.modal-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'close') {
                    document.body.removeChild(modal);
                } else {
                    const event = new CustomEvent('modal-action', { detail: { action } });
                    modal.dispatchEvent(event);
                    document.body.removeChild(modal);
                }
            });
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        document.body.appendChild(modal);
        return modal;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 4000);
    }

    initializeTheme() {
        console.log('🎨 Initializing theme system...');
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
            this.updateThemeIcons(true);
        } else {
            document.documentElement.classList.remove('dark');
            this.updateThemeIcons(false);
        }
        
        console.log('✅ Theme system initialized');
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            this.updateThemeIcons(false);
            console.log('🌞 Switched to light mode');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            this.updateThemeIcons(true);
            console.log('🌙 Switched to dark mode');
        }
    }

    updateThemeIcons(isDark) {
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        
        if (lightIcon && darkIcon) {
            if (isDark) {
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            } else {
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            }
        }
    }

    // Mock data methods for meal rotation engine
    getMockRecipes() {
        return [
            {
                id: 'recipe-1',
                name: 'Spaghetti Carbonara',
                ingredients: [
                    { ingredientId: 'ing-1', name: 'Spaghetti', quantity: 1 },
                    { ingredientId: 'ing-2', name: 'Eggs', quantity: 3 },
                    { ingredientId: 'ing-3', name: 'Parmesan Cheese', quantity: 1 },
                    { ingredientId: 'ing-4', name: 'Bacon', quantity: 200 }
                ],
                prepTime: 30,
                instructions: 'Cook pasta, mix with eggs and cheese, add bacon'
            },
            {
                id: 'recipe-2',
                name: 'Chicken Stir Fry',
                ingredients: [
                    { ingredientId: 'ing-5', name: 'Chicken Breast', quantity: 500 },
                    { ingredientId: 'ing-6', name: 'Mixed Vegetables', quantity: 300 },
                    { ingredientId: 'ing-7', name: 'Soy Sauce', quantity: 2 },
                    { ingredientId: 'ing-8', name: 'Rice', quantity: 200 }
                ],
                prepTime: 25,
                instructions: 'Stir fry chicken and vegetables, serve with rice'
            },
            {
                id: 'recipe-3',
                name: 'Vegetarian Curry',
                ingredients: [
                    { ingredientId: 'ing-9', name: 'Mixed Vegetables', quantity: 400 },
                    { ingredientId: 'ing-10', name: 'Coconut Milk', quantity: 1 },
                    { ingredientId: 'ing-11', name: 'Curry Powder', quantity: 2 },
                    { ingredientId: 'ing-8', name: 'Rice', quantity: 200 }
                ],
                prepTime: 35,
                instructions: 'Simmer vegetables in coconut milk with curry spices'
            },
            {
                id: 'recipe-4',
                name: 'Grilled Salmon',
                ingredients: [
                    { ingredientId: 'ing-12', name: 'Salmon Fillet', quantity: 600 },
                    { ingredientId: 'ing-13', name: 'Asparagus', quantity: 300 },
                    { ingredientId: 'ing-14', name: 'Lemon', quantity: 1 },
                    { ingredientId: 'ing-15', name: 'Olive Oil', quantity: 2 }
                ],
                prepTime: 20,
                instructions: 'Grill salmon and asparagus, finish with lemon'
            },
            {
                id: 'recipe-5',
                name: 'Beef Tacos',
                ingredients: [
                    { ingredientId: 'ing-16', name: 'Ground Beef', quantity: 500 },
                    { ingredientId: 'ing-17', name: 'Taco Shells', quantity: 8 },
                    { ingredientId: 'ing-18', name: 'Lettuce', quantity: 1 },
                    { ingredientId: 'ing-19', name: 'Tomatoes', quantity: 2 }
                ],
                prepTime: 15,
                instructions: 'Cook beef, assemble tacos with fresh toppings'
            }
        ];
    }

    getMockPantryItems() {
        return [
            { ingredientId: 'ing-8', quantity: 5 }, // Rice
            { ingredientId: 'ing-15', quantity: 1 }, // Olive Oil
            { ingredientId: 'ing-7', quantity: 1 }, // Soy Sauce
            { ingredientId: 'ing-11', quantity: 1 } // Curry Powder
        ];
    }
}

// Make MealPlannerApp globally available for testing
if (typeof window !== 'undefined') {
    window.MealPlannerApp = MealPlannerApp;
}
if (typeof global !== 'undefined') {
    global.MealPlannerApp = MealPlannerApp;
}

// Initialize the app when DOM is ready
function initializeApp() {
    try {
        console.log('Initializing MealPlanner...');
        const app = new MealPlannerApp();
        console.log('MealPlanner initialized successfully');
    } catch (error) {
        console.error('Failed to initialize MealPlanner:', error);
        document.body.innerHTML = `
            <div class="min-h-screen bg-gray-100 flex items-center justify-center">
                <div class="bg-white p-8 rounded-lg shadow-lg max-w-md">
                    <h1 class="text-xl font-bold text-red-600 mb-4">Initialization Error</h1>
                    <p class="text-gray-700 mb-4">Failed to load MealPlanner. Please check the console for details.</p>
                    <p class="text-sm text-gray-500">Error: ${error.message}</p>
                    <button onclick="location.reload()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Retry
                    </button>
                </div>
            </div>
        `;
    }
}

// Show timeout message after 5 seconds
setTimeout(() => {
    const timeoutMsg = document.getElementById('loading-timeout');
    if (timeoutMsg && !timeoutMsg.classList.contains('hidden')) {
        timeoutMsg.classList.remove('hidden');
    }
}, 5000);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
