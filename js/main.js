// MealPlanner Main Application
class MealPlannerApp {
    constructor() {
        this.currentTab = 'dinner';
        this.version = '2025.09.09.1701';
        this.itineraryViews = {};
        this.calendarViews = {};
        this.recipeManager = null;
        this.ingredientsManager = null;
        this.groceryListManager = null;
        this.settingsManager = null;
        this.googleCalendarIntegration = null;
        this.mealRotationEngine = null;
        this.performanceManager = null;
        this.advancedPlanningManager = null;
        this.pantryManager = null;
        this.serviceWorker = null;
        this.installPrompt = null;
        this.currentViews = {
            breakfast: 'itinerary',
            lunch: 'itinerary', 
            dinner: 'itinerary'
        };
        this.selectedRecipes = {
            breakfast: [],
            lunch: [],
            dinner: []
        };
        this.favoriteRecipes = this.loadFavoriteRecipes();
        this.showFavoritesOnly = false;
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
            
            // Initialize managers with delay to ensure all scripts are loaded
            this.initializeManagers();
            
            this.initializeServiceWorker();
            this.initializePWAFeatures();
            this.initializeItineraryViews();
            this.initializeMealPlanningControls();
            this.generateCalendarDays();
            
            console.log(`✅ MealPlanner v${this.version} initialized successfully!`);
            
            // Make app globally available for other components
            window.app = this;
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
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                console.log('🎨 Theme toggle clicked');
                this.toggleTheme();
            });
            console.log('✅ Theme toggle event listener attached');
        } else {
            console.error('❌ Theme toggle button not found!');
        }

        // Listen for Google Calendar auth changes
        document.addEventListener('googleCalendarAuthChanged', (e) => {
            this.updateGoogleCalendarUI(e.detail.isAuthenticated);
        });

        // Listen for mobile navigation tab switches
        document.addEventListener('mobileTabSwitch', (e) => {
            this.switchTab(e.detail.tabName);
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

        // Show selected tab (handle scheduled tab mapping)
        const tabId = tabName === 'scheduled' ? 'scheduled-tab' : `${tabName}-tab`;
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
            tabElement.classList.remove('hidden');
        }
        this.currentTab = tabName;

        // Update mobile navigation if it exists
        if (window.mobileNavigation) {
            window.mobileNavigation.onTabChange(tabName);
        }

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

    async initializeManagers() {
        console.log('📱 Initializing managers...');
        
        // Check if all manager classes are available
        const managersAvailable = {
            RecipeManager: typeof RecipeManager !== 'undefined',
            MealManager: typeof MealManager !== 'undefined',
            IngredientsManager: typeof IngredientsManager !== 'undefined',
            GroceryListManager: typeof GroceryListManager !== 'undefined',
            SettingsManager: typeof SettingsManager !== 'undefined',
            GoogleCalendarIntegration: typeof GoogleCalendarIntegration !== 'undefined',
            MealRotationEngine: typeof MealRotationEngine !== 'undefined',
            ScheduleManager: typeof ScheduleManager !== 'undefined'
        };
        
        console.log('📱 Manager availability:', managersAvailable);
        
        // Wait a bit if managers aren't ready
        if (!managersAvailable.RecipeManager || !managersAvailable.MealManager || !managersAvailable.IngredientsManager || !managersAvailable.ScheduleManager) {
            console.log('📱 Waiting for managers to load...');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Initialize managers
        try {
            // Initialize settings manager FIRST - other managers depend on it
            this.initializeSettingsManager();
            this.initializeRecipeManager();
            this.initializeMealManager();
            this.initializeScheduleManager();
            this.initializeIngredientsManager();
            this.initializeGroceryListManager();
        this.initializeGoogleCalendar();
        this.initializePerformanceManager();
        this.initializeAdvancedPlanning();
        this.initializePantryManager();
            this.initializeMealRotationEngine();
        } catch (error) {
            console.error('❌ Error initializing managers:', error);
        }
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

    initializeMealManager() {
        console.log('🍽️ Initializing meal manager...');
        
        const container = document.getElementById('meal-manager-container');
        if (container) {
            this.mealManager = new MealManager(container);
            window.mealManager = this.mealManager;
            console.log('✅ Meal manager initialized');
        }
    }

    initializeScheduleManager() {
        console.log('📅 Initializing schedule manager...');
        
        this.scheduleManager = new ScheduleManager();
        window.scheduleManager = this.scheduleManager;
        console.log('✅ Schedule manager initialized');
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
        
        try {
            // Check if MealRotationEngine class is available
            if (typeof MealRotationEngine === 'undefined') {
                console.error('❌ MealRotationEngine class not found');
                return;
            }
            
            this.mealRotationEngine = new MealRotationEngine();
            
            // Initialize with current recipes and user preferences
            const recipes = this.getMockRecipes();
            const userPreferences = JSON.parse(localStorage.getItem('mealPreferences') || '{}');
            const pantryItems = this.getMockPantryItems();
            
            this.mealRotationEngine.initialize(recipes, userPreferences, pantryItems);
            
            // Make globally available for testing
            window.mealRotationEngine = this.mealRotationEngine;
            
            console.log('✅ Meal Rotation Engine initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Meal Rotation Engine:', error);
            this.mealRotationEngine = null;
        }
    }

    initializePerformanceManager() {
        console.log('🚀 Initializing performance manager...');
        if (typeof PerformanceManager !== 'undefined') {
            this.performanceManager = new PerformanceManager();
            window.performanceManager = this.performanceManager;
            console.log('✅ Performance manager initialized');
        } else {
            console.log('⚠️ PerformanceManager not available');
        }
    }

    initializeAdvancedPlanning() {
        console.log('🎯 Initializing advanced planning manager...');
        if (typeof AdvancedPlanningManager !== 'undefined') {
            this.advancedPlanningManager = new AdvancedPlanningManager();
            window.advancedPlanningManager = this.advancedPlanningManager;
            console.log('✅ Advanced planning manager initialized');
        } else {
            console.log('⚠️ AdvancedPlanningManager not available');
        }
    }

    initializePantryManager() {
        console.log('🏪 Initializing pantry manager...');
        if (typeof PantryManager !== 'undefined') {
            // Initialize with a container if we're on the pantry tab
            const pantryContainer = document.getElementById('pantry-container');
            if (pantryContainer) {
                this.pantryManager = new PantryManager(pantryContainer);
            }
            window.pantryManager = this.pantryManager;
            console.log('✅ Pantry manager initialized');
        } else {
            console.log('⚠️ PantryManager not available');
        }
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
        
        // Initialize recipe selection for meal types
        this.initializeRecipeSelection();
    }

    initializeRecipeSelection() {
        // Initialize recipe selection for dinner (can extend to other meal types later)
        this.renderRecipeSelection('dinner');
        this.attachRecipeSelectionListeners('dinner');
        
        // Initialize the scheduling pipeline
        this.initializeSchedulingPipeline();
    }

    renderRecipeSelection(mealType) {
        const gridContainer = document.getElementById(`${mealType}-recipe-grid`);
        if (!gridContainer) return;

        // Get recipes from centralized authoritative data source
        let recipes = [];
        
        if (window.mealPlannerSettings) {
            const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            recipes = allRecipes.filter(recipe => 
                recipe.meal_type === mealType || recipe.meal_type === 'dinner'
            );
            console.log(`🍽️ ${mealType} tab loaded ${recipes.length} recipes from authoritative source`);
        } else {
            console.warn(`⚠️ Settings manager not available for ${mealType} tab recipe selection`);
            recipes = [];
        }
        
        // Apply favorites filter if enabled
        if (this.showFavoritesOnly) {
            recipes = recipes.filter(recipe => this.isRecipeFavorite(recipe.id));
        }

        // Render recipe selection cards
        gridContainer.innerHTML = recipes.map(recipe => `
            <div class="recipe-selection-card border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors ${
                this.selectedRecipes[mealType].includes(recipe.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : ''
            }" data-recipe-id="${recipe.id}">
                <div class="flex items-start justify-between mb-2">
                    <h4 class="font-medium text-gray-900 dark:text-white text-sm">${recipe.title}</h4>
                    <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                        <button class="favorite-btn text-lg hover:scale-110 transition-transform ${
                            this.isRecipeFavorite(recipe.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }" data-recipe-id="${recipe.id}" title="${this.isRecipeFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}">
                            ${this.isRecipeFavorite(recipe.id) ? '❤️' : '🤍'}
                        </button>
                        <input type="checkbox" class="recipe-checkbox" ${
                            this.selectedRecipes[mealType].includes(recipe.id) ? 'checked' : ''
                        }>
                    </div>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">${recipe.description}</p>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>${(recipe.prep_time || 0) + (recipe.cook_time || 0)}min</span>
                    <span>${recipe.servings || recipe.serving_count || 'N/A'} servings</span>
                </div>
            </div>
        `).join('');

        // Update selected count
        this.updateSelectedRecipeCount(mealType);
    }

    attachRecipeSelectionListeners(mealType) {
        const gridContainer = document.getElementById(`${mealType}-recipe-grid`);
        const selectAllBtn = document.getElementById('select-all-recipes');
        const clearSelectionBtn = document.getElementById('clear-recipe-selection');
        const showFavoritesBtn = document.getElementById('show-favorites-only');

        // Recipe card click handlers
        if (gridContainer) {
            gridContainer.addEventListener('click', (e) => {
                // Handle favorite button clicks
                if (e.target.classList.contains('favorite-btn')) {
                    e.stopPropagation(); // Prevent card selection
                    const recipeId = parseInt(e.target.dataset.recipeId);
                    this.toggleFavoriteRecipe(recipeId);
                    return;
                }
                
                // Handle card selection (but not if clicking on checkbox)
                if (!e.target.classList.contains('recipe-checkbox')) {
                    const card = e.target.closest('.recipe-selection-card');
                    if (card) {
                        const recipeId = parseInt(card.dataset.recipeId);
                        this.toggleRecipeSelection(mealType, recipeId);
                    }
                }
            });
        }

        // Select all button
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => {
                this.selectAllRecipes(mealType);
            });
        }

        // Clear selection button
        if (clearSelectionBtn) {
            clearSelectionBtn.addEventListener('click', () => {
                this.clearRecipeSelection(mealType);
            });
        }

        // Show favorites only button
        if (showFavoritesBtn) {
            showFavoritesBtn.addEventListener('click', () => {
                this.toggleFavoritesFilter(mealType);
            });
        }
    }

    toggleRecipeSelection(mealType, recipeId) {
        const selectedRecipes = this.selectedRecipes[mealType];
        const index = selectedRecipes.indexOf(recipeId);
        
        if (index > -1) {
            selectedRecipes.splice(index, 1);
        } else {
            selectedRecipes.push(recipeId);
        }
        
        this.renderRecipeSelection(mealType);
        console.log(`${mealType} selected recipes:`, selectedRecipes);
    }

    selectAllRecipes(mealType) {
        // Get recipes from centralized authoritative data source
        if (window.mealPlannerSettings) {
            const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            const recipes = allRecipes.filter(recipe => 
                recipe.meal_type === mealType || recipe.meal_type === 'dinner'
            );
            this.selectedRecipes[mealType] = recipes.map(r => r.id);
            console.log(`📱 Selected all ${recipes.length} recipes for ${mealType} from authoritative source`);
        } else {
            console.warn('⚠️ Settings manager not available for selectAllRecipes');
            this.selectedRecipes[mealType] = [];
        }
        
        this.renderRecipeSelection(mealType);
    }

    clearRecipeSelection(mealType) {
        this.selectedRecipes[mealType] = [];
        this.renderRecipeSelection(mealType);
    }

    updateSelectedRecipeCount(mealType) {
        const countElement = document.getElementById('selected-recipe-count');
        const scheduleBtn = document.getElementById('schedule-selected-recipes');
        
        if (countElement) {
            countElement.textContent = this.selectedRecipes[mealType].length;
        }
        
        // Enable/disable schedule button based on selection
        if (scheduleBtn) {
            const hasSelection = this.selectedRecipes[mealType].length > 0;
            scheduleBtn.disabled = !hasSelection;
            scheduleBtn.classList.toggle('opacity-50', !hasSelection);
            scheduleBtn.classList.toggle('cursor-not-allowed', !hasSelection);
        }
    }

    initializeSchedulingPipeline() {
        console.log('📅 Initializing meal scheduling pipeline...');
        
        // Schedule Selected Recipes button
        const scheduleBtn = document.getElementById('schedule-selected-recipes');
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', () => {
                this.showSchedulingOptions();
            });
        }
        
        // Cancel Scheduling button
        const cancelBtn = document.getElementById('cancel-scheduling');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.hideSchedulingOptions();
            });
        }
        
        // Generate Schedule button
        const generateBtn = document.getElementById('generate-schedule');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateMealSchedule();
            });
        }
        
        // Initialize start date to today
        const startDateInput = document.getElementById('scheduling-start-date');
        if (startDateInput) {
            const today = new Date();
            startDateInput.value = today.toISOString().split('T')[0];
        }
        
        console.log('✅ Meal scheduling pipeline initialized');
    }

    showSchedulingOptions() {
        const panel = document.getElementById('scheduling-options-panel');
        const selectedCount = this.selectedRecipes['dinner'].length;
        
        if (panel && selectedCount > 0) {
            panel.classList.remove('hidden');
            panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            console.log(`📅 Showing scheduling options for ${selectedCount} selected recipes`);
        }
    }

    hideSchedulingOptions() {
        const panel = document.getElementById('scheduling-options-panel');
        if (panel) {
            panel.classList.add('hidden');
        }
    }

    async generateMealSchedule() {
        const generateBtn = document.getElementById('generate-schedule');
        const originalText = generateBtn.innerHTML;
        
        try {
            // Show loading state
            generateBtn.innerHTML = '⏳ Generating...';
            generateBtn.disabled = true;
            
            // Get scheduling parameters
            const params = this.getSchedulingParameters();
            
            // Validate parameters
            if (!this.validateSchedulingParameters(params)) {
                return;
            }
            
            console.log('🚀 Generating meal schedule with parameters:', params);
            
            // Generate the schedule using the meal rotation engine
            const schedule = await this.createMealSchedule(params);
            
            if (schedule && schedule.meals.length > 0) {
                // Apply the generated schedule
                await this.applyGeneratedSchedule(schedule);
                
                // Hide scheduling options
                this.hideSchedulingOptions();
                
                // Show success message
                this.showSchedulingSuccess(schedule.meals.length);
                
                console.log(`✅ Successfully generated schedule with ${schedule.meals.length} meals`);
            } else {
                throw new Error('Failed to generate meal schedule');
            }
            
        } catch (error) {
            console.error('❌ Error generating meal schedule:', error);
            this.showSchedulingError(error.message);
        } finally {
            // Restore button state
            generateBtn.innerHTML = originalText;
            generateBtn.disabled = false;
        }
    }

    getSchedulingParameters() {
        const periodSelect = document.getElementById('scheduling-period');
        const startDateInput = document.getElementById('scheduling-start-date');
        const modeSelect = document.getElementById('scheduling-mode');
        const skipWeekendsCheck = document.getElementById('skip-weekends');
        const avoidRepeatsCheck = document.getElementById('avoid-repeats');
        
        return {
            weeks: parseInt(periodSelect.value),
            startDate: new Date(startDateInput.value),
            mode: modeSelect.value,
            skipWeekends: skipWeekendsCheck.checked,
            avoidRepeats: avoidRepeatsCheck.checked,
            selectedRecipeIds: [...this.selectedRecipes['dinner']],
            mealType: 'dinner'
        };
    }

    validateSchedulingParameters(params) {
        if (!params.startDate || isNaN(params.startDate.getTime())) {
            this.showSchedulingError('Please select a valid start date');
            return false;
        }
        
        if (params.selectedRecipeIds.length === 0) {
            this.showSchedulingError('Please select at least one recipe');
            return false;
        }
        
        return true;
    }

    async createMealSchedule(params) {
        // Get selected recipes with full data
        const selectedRecipes = await this.getSelectedRecipesData(params.selectedRecipeIds);
        
        if (params.mode === 'intelligent') {
            // Use the meal rotation engine for intelligent scheduling
            return this.generateIntelligentSchedule(params, selectedRecipes);
        } else if (params.mode === 'random') {
            return this.generateRandomSchedule(params, selectedRecipes);
        } else if (params.mode === 'sequential') {
            return this.generateSequentialSchedule(params, selectedRecipes);
        }
        
        throw new Error('Invalid scheduling mode');
    }

    async getSelectedRecipesData(recipeIds) {
        const recipes = [];
        
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            const allRecipes = demoData.getRecipes();
            
            recipeIds.forEach(id => {
                const recipe = allRecipes.find(r => r.id === id);
                if (recipe) {
                    recipes.push(recipe);
                }
            });
        }
        
        return recipes;
    }

    generateIntelligentSchedule(params, selectedRecipes) {
        if (window.MealRotationEngine) {
            const engine = new window.MealRotationEngine();
            engine.setRecipes(selectedRecipes);
            
            const options = {
                skipWeekends: params.skipWeekends,
                avoidRepeats: params.avoidRepeats,
                forcedRecipes: params.selectedRecipeIds
            };
            
            return engine.generateRotation(params.startDate, params.weeks, params.mealType, options);
        }
        
        // Fallback to random if rotation engine not available
        return this.generateRandomSchedule(params, selectedRecipes);
    }

    generateRandomSchedule(params, selectedRecipes) {
        const meals = [];
        const totalDays = params.weeks * 7;
        
        for (let day = 0; day < totalDays; day++) {
            const currentDate = new Date(params.startDate);
            currentDate.setDate(currentDate.getDate() + day);
            
            // Skip weekends if requested
            if (params.skipWeekends && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
                continue;
            }
            
            // Select random recipe
            const randomRecipe = selectedRecipes[Math.floor(Math.random() * selectedRecipes.length)];
            
            meals.push({
                id: `meal-${params.mealType}-${day}`,
                date: new Date(currentDate),
                mealType: params.mealType,
                recipe: randomRecipe,
                score: 1.0,
                reasoning: ['Random selection']
            });
        }
        
        return { meals, stats: {}, recommendations: [] };
    }

    generateSequentialSchedule(params, selectedRecipes) {
        const meals = [];
        const totalDays = params.weeks * 7;
        let recipeIndex = 0;
        
        for (let day = 0; day < totalDays; day++) {
            const currentDate = new Date(params.startDate);
            currentDate.setDate(currentDate.getDate() + day);
            
            // Skip weekends if requested
            if (params.skipWeekends && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
                continue;
            }
            
            // Select recipe in sequence
            const selectedRecipe = selectedRecipes[recipeIndex % selectedRecipes.length];
            recipeIndex++;
            
            meals.push({
                id: `meal-${params.mealType}-${day}`,
                date: new Date(currentDate),
                mealType: params.mealType,
                recipe: selectedRecipe,
                score: 1.0,
                reasoning: ['Sequential selection']
            });
        }
        
        return { meals, stats: {}, recommendations: [] };
    }

    async applyGeneratedSchedule(schedule) {
        // Clear existing schedule for this meal type
        this.clearMealPlanData('dinner');
        
        // Apply new schedule
        this.applyGeneratedPlan('dinner', schedule.meals);
        
        // Refresh the itinerary view
        this.refreshItineraryView('dinner');
    }

    refreshItineraryView(mealType) {
        const itineraryContainer = document.getElementById(`${mealType}-itinerary`);
        if (itineraryContainer && window.ItineraryView) {
            // Re-initialize the itinerary view with new data
            const itineraryView = new window.ItineraryView(itineraryContainer, mealType);
            itineraryView.render();
        }
    }

    showSchedulingSuccess(mealCount) {
        // Create a temporary success message
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successMsg.innerHTML = `✅ Successfully scheduled ${mealCount} meals!`;
        
        document.body.appendChild(successMsg);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 3000);
    }

    showSchedulingError(message) {
        // Create a temporary error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        errorMsg.innerHTML = `❌ ${message}`;
        
        document.body.appendChild(errorMsg);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (errorMsg.parentNode) {
                errorMsg.parentNode.removeChild(errorMsg);
            }
        }, 5000);
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
            console.error('❌ Meal rotation engine not available for auto planning');
            this.showNotification('Meal rotation engine not available. Please refresh the page and try again.', 'error');
            return;
        }

        // Get the current itinerary view for this meal type
        const itineraryView = this.itineraryViews[mealType];
        if (!itineraryView) {
            this.showNotification('Meal planning view not available. Please try again.', 'error');
            return;
        }

        // Check if any recipes are selected
        const selectedRecipeIds = this.selectedRecipes[mealType] || [];
        if (selectedRecipeIds.length === 0) {
            this.showNotification(`Please select some recipes for ${mealType} planning first.`, 'warning');
            return;
        }

        try {
            // Get selected recipes from demo data
            let selectedRecipes = [];
            if (window.DemoDataManager) {
                const demoData = new window.DemoDataManager();
                const allRecipes = demoData.getRecipes();
                selectedRecipes = allRecipes.filter(recipe => selectedRecipeIds.includes(recipe.id));
            }

            if (selectedRecipes.length === 0) {
                this.showNotification('Selected recipes could not be found. Please try again.', 'error');
                return;
            }

            // Use the meal rotation engine to generate a plan with selected recipes
            const weeksToShow = itineraryView.weeksToShow || 4;
            const startDate = new Date();
            
            // Generate rotation for the specified period using only selected recipes
            const rotation = this.mealRotationEngine.generateRotation(
                startDate, 
                weeksToShow, 
                mealType, 
                { 
                    forceRecipes: selectedRecipeIds,
                    availableRecipes: selectedRecipes
                }
            );
            
            if (rotation && rotation.meals && rotation.meals.length > 0) {
                // Apply the generated plan to the itinerary view
                this.applyGeneratedPlan(mealType, rotation.meals);
                
                // Show success notification with stats
                const message = `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} plan generated! ${rotation.meals.length} meals planned using ${selectedRecipes.length} selected recipes.`;
                this.showNotification(message, 'success');
                
                // Log generation stats
                console.log(`📊 ${mealType} plan stats:`, rotation.stats);
            } else {
                this.showNotification('No meals could be generated with the selected recipes. Please try selecting more recipes.', 'warning');
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
                    // Update the view's data and re-render
                    itineraryView.mealPlanData = this.getScheduledMeals();
                    itineraryView.render();
                }
                
                const calendarView = this.calendarViews[mealType];
                if (calendarView) {
                    // Update the view's data and re-render
                    calendarView.mealPlanData = this.getScheduledMeals();
                    calendarView.render();
                }
                
                // Also refresh the current tab display
                this.switchTab(this.currentTab);
                
                this.showNotification(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} meal plan cleared successfully.`, 'success');
            } catch (error) {
                console.error('Error clearing meal plan:', error);
                this.showNotification('Error clearing meal plan. Please try again.', 'error');
            }
        }
    }

    applyGeneratedPlan(mealType, meals) {
        console.log(`📅 Applying ${meals.length} ${mealType} meals to plan...`);
        
        try {
            // Get current scheduled meals
            let scheduledMeals = this.getScheduledMeals();
            
            // Remove existing meals of this type (to avoid duplicates)
            scheduledMeals = scheduledMeals.filter(meal => meal.meal_type !== mealType);
            
            // Convert generated meals to proper scheduled meal format
            const newScheduledMeals = meals.map((meal, index) => ({
                id: `${mealType}-${Date.now()}-${index}`,
                recipe_id: meal.recipe_id || meal.id,
                recipe_name: meal.recipe_name || meal.name || meal.title,
                meal_type: mealType,
                date: meal.date, // Standardized on 'date' property only
                servings: meal.servings || 4,
                ingredients: meal.ingredients || [],
                created_at: new Date().toISOString()
            }));
            
            // Add new meals to the schedule
            scheduledMeals.push(...newScheduledMeals);
            
            // Save to storage
            this.saveScheduledMeals(scheduledMeals);
            
            console.log(`✅ Applied ${newScheduledMeals.length} ${mealType} meals to schedule`);
            
            // Refresh views to show the new meals
            this.refreshMealPlanViews();
            
            // Show success notification
            this.showNotification(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} meal plan generated successfully!`, 'success');
            
        } catch (error) {
            console.error('Error applying generated plan:', error);
            this.showNotification('Error applying meal plan. Please try again.', 'error');
        }
    }

    clearMealPlanData(mealType) {
        console.log(`🗑️ Clearing ${mealType} data from storage...`);
        
        try {
            // Use ScheduleManager if available for consistency
            if (window.scheduleManager) {
                const originalMeals = window.scheduleManager.getScheduledMealsByType(mealType);
                const originalCount = originalMeals.length;
                
                // Remove all meals of this type using ScheduleManager
                originalMeals.forEach(meal => {
                    window.scheduleManager.removeScheduledMeal(meal.id);
                });
                
                console.log(`✅ Cleared ${originalCount} ${mealType} meals from schedule via ScheduleManager`);
            } else {
                // Fallback to original method
                let scheduledMeals = this.getScheduledMeals();
                const originalCount = scheduledMeals.length;
                
                // Filter out meals of this type
                scheduledMeals = scheduledMeals.filter(meal => meal.meal_type !== mealType);
                
                // Save the updated meals back to storage
                this.saveScheduledMeals(scheduledMeals);
                
                console.log(`✅ Cleared ${originalCount - scheduledMeals.length} ${mealType} meals from schedule`);
            }
            
            // Clear any local selection state for this meal type
            if (this.selectedRecipes) {
                this.selectedRecipes[mealType] = [];
                this.renderRecipeSelection(mealType);
            }
            
            // Clear meal rotation engine data for this meal type
            if (this.mealRotationEngine && this.mealRotationEngine.clearMealType) {
                this.mealRotationEngine.clearMealType(mealType);
            }
            
        } catch (error) {
            console.error('Error clearing meal plan data:', error);
            throw error;
        }
    }

    async clearAllData() {
        console.log('🗑️ Clearing ALL application data for in-memory mode...');
        
        try {
            // Clear all manager data
            if (this.ingredientsManager) {
                await this.ingredientsManager.clearAllData();
            }
            
            if (this.recipeManager) {
                await this.recipeManager.clearAllData();
            }
            
            if (this.mealManager) {
                await this.mealManager.clearAllData();
            }
            
            if (this.scheduleManager) {
                await this.scheduleManager.clearAllScheduledMeals();
            }
            
            if (this.groceryListManager) {
                await this.groceryListManager.clearAllData();
            }
            
            // Clear local app state
            this.selectedRecipes = {
                breakfast: [],
                lunch: [],
                dinner: []
            };
            
            // Clear favorites
            this.favoriteRecipes = new Set();
            this.saveFavoriteRecipes();
            
            // Clear meal rotation engine
            if (this.mealRotationEngine) {
                this.mealRotationEngine.clearAllData();
            }
            
            // Refresh all components to show empty state
            this.refreshAllComponents();
            
            console.log('✅ All application data cleared successfully');
            
        } catch (error) {
            console.error('❌ Error clearing all data:', error);
            throw error;
        }
    }

    // Get scheduled meals from localStorage or demo data
    getScheduledMeals() {
        try {
            // Try to get from localStorage first
            const stored = localStorage.getItem('mealplanner_scheduled_meals');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Error loading from localStorage:', error);
        }
        
        // Fallback to demo data
        if (window.DemoDataManager) {
            const demoData = new window.DemoDataManager();
            return demoData.getScheduledMeals();
        }
        
        return [];
    }

    // Save scheduled meals to localStorage
    saveScheduledMeals(scheduledMeals) {
        try {
            localStorage.setItem('mealplanner_scheduled_meals', JSON.stringify(scheduledMeals));
            console.log(`💾 Saved ${scheduledMeals.length} scheduled meals to localStorage`);
            
            // Trigger refresh of dependent components
            this.refreshMealPlanViews();
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Remove a specific meal from the schedule
    removeMealFromSchedule(mealId, dateStr, mealType) {
        console.log(`🗑️ Removing meal ${mealId} (${mealType}) from ${dateStr}`);
        
        try {
            let scheduledMeals = this.getScheduledMeals();
            const originalCount = scheduledMeals.length;
            
            // Remove the specific meal by ID or date+type combination
            scheduledMeals = scheduledMeals.filter(meal => {
                if (mealId && meal.id) {
                    return meal.id !== mealId;
                } else {
                    // Fallback: remove by date and meal type
                    if (!meal.date) {
                        console.warn(`⚠️ Cannot remove meal ${meal.id} - missing date property:`, meal);
                        return true; // Keep meal if we can't identify it
                    }
                    const mealDate = new Date(meal.date);
                    return !(mealDate.toDateString() === dateStr && meal.meal_type === mealType);
                }
            });
            
            this.saveScheduledMeals(scheduledMeals);
            
            console.log(`✅ Removed ${originalCount - scheduledMeals.length} meal(s) from schedule`);
            
            return true;
        } catch (error) {
            console.error('Error removing meal from schedule:', error);
            return false;
        }
    }

    // Refresh all meal plan related views
    refreshMealPlanViews() {
        // Refresh itinerary views
        Object.values(this.itineraryViews).forEach(view => {
            if (view && view.render) {
                view.render();
            }
        });
        
        // Refresh calendar views
        Object.values(this.calendarViews).forEach(view => {
            if (view && view.render) {
                view.render();
            }
        });
        
        // Refresh grocery list to reflect scheduled meal changes
        if (this.groceryListManager && this.groceryListManager.generateFromScheduledMeals) {
            this.groceryListManager.generateFromScheduledMeals();
        }
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
            type === 'warning' ? 'bg-yellow-500 text-white' :
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
        
        console.log('🔍 Theme debug:', { savedTheme, prefersDark });
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
            this.updateThemeIcons(true);
            console.log('🌙 Applied dark theme');
        } else {
            document.documentElement.classList.remove('dark');
            this.updateThemeIcons(false);
            console.log('🌞 Applied light theme');
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
                // In dark mode, show moon icon (dark icon) and hide sun icon (light icon)
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            } else {
                // In light mode, show sun icon (light icon) and hide moon icon (dark icon)
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
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

    // ===== FAVORITES SYSTEM =====
    
    loadFavoriteRecipes() {
        try {
            const stored = localStorage.getItem('mealplanner_favorite_recipes');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading favorite recipes:', error);
            return [];
        }
    }
    
    saveFavoriteRecipes() {
        try {
            // Save favorite recipes using the centralized data authority
            if (window.mealPlannerSettings) {
                window.mealPlannerSettings.saveAuthoritativeData('favoriteRecipes', this.favoriteRecipes);
            } else {
                console.warn('⚠️ Settings manager not available, falling back to localStorage');
                localStorage.setItem('mealplanner_favorite_recipes', JSON.stringify(this.favoriteRecipes));
            }
            console.log(`💾 Saved ${this.favoriteRecipes.length} favorite recipes`);
        } catch (error) {
            console.error('Error saving favorite recipes:', error);
        }
    }
    
    toggleFavoriteRecipe(recipeId) {
        const index = this.favoriteRecipes.indexOf(recipeId);
        
        if (index > -1) {
            // Remove from favorites
            this.favoriteRecipes.splice(index, 1);
            console.log(`💔 Removed recipe ${recipeId} from favorites`);
            this.showNotification('Recipe removed from favorites', 'success');
        } else {
            // Add to favorites
            this.favoriteRecipes.push(recipeId);
            console.log(`❤️ Added recipe ${recipeId} to favorites`);
            this.showNotification('Recipe added to favorites', 'success');
        }
        
        this.saveFavoriteRecipes();
        
        // Refresh recipe displays to update favorite icons
        this.renderRecipeSelection(this.currentTab);
        
        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('favoritesChanged', {
            detail: { recipeId, isFavorite: this.isRecipeFavorite(recipeId) }
        }));
    }
    
    isRecipeFavorite(recipeId) {
        return this.favoriteRecipes.includes(recipeId);
    }
    
    getFavoriteRecipes() {
        if (!window.DemoDataManager) return [];
        
        const demoData = new window.DemoDataManager();
        const allRecipes = demoData.getRecipes();
        
        return allRecipes.filter(recipe => this.favoriteRecipes.includes(recipe.id));
    }
    
    clearAllFavorites() {
        const confirmed = confirm('Are you sure you want to clear all favorite recipes? This action cannot be undone.');
        
        if (confirmed) {
            this.favoriteRecipes = [];
            this.saveFavoriteRecipes();
            this.renderRecipeSelection(this.currentTab);
            this.showNotification('All favorites cleared', 'success');
            
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('allFavoritesCleared'));
        }
    }
    
    toggleFavoritesFilter(mealType) {
        this.showFavoritesOnly = !this.showFavoritesOnly;
        
        // Update button appearance
        const showFavoritesBtn = document.getElementById('show-favorites-only');
        if (showFavoritesBtn) {
            if (this.showFavoritesOnly) {
                showFavoritesBtn.classList.add('bg-red-100', 'text-red-700', 'border-red-300');
                showFavoritesBtn.classList.remove('btn-secondary');
                showFavoritesBtn.textContent = '❤️ Showing Favorites';
            } else {
                showFavoritesBtn.classList.remove('bg-red-100', 'text-red-700', 'border-red-300');
                showFavoritesBtn.classList.add('btn-secondary');
                showFavoritesBtn.textContent = '❤️ Favorites';
            }
        }
        
        // Re-render recipes with filter applied
        this.renderRecipeSelection(mealType);
        
        // Show notification
        const favoriteCount = this.getFavoriteRecipes().length;
        if (this.showFavoritesOnly) {
            this.showNotification(`Showing ${favoriteCount} favorite recipes`, 'info');
        } else {
            this.showNotification('Showing all recipes', 'info');
        }
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
