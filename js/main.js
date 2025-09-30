// MealPlanner Main Application
class MealPlannerApp {
    constructor() {
        this.currentTab = 'menu';
        this.previousTab = null;
        this.navigationHistory = [];
        this.version = '2025.09.29.1354';
        this.itineraryViews = {};
        this.calendarViews = {};
        this.recipeManager = null;
        this.itemsManager = null;
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
            plan: 'itinerary'
        };
        this.selectedRecipes = {
            plan: []
        };
        this.favoriteRecipes = [];
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
        setTimeout(async () => {
            const loading = document.getElementById('loading');
            const mainApp = document.getElementById('main-app');
            
            if (loading) loading.style.display = 'none';
            if (mainApp) mainApp.classList.remove('hidden');
            
            this.setupEventListeners();
            this.initializeTheme();
            
            // Initialize managers with delay to ensure all scripts are loaded
            await this.initializeManagers();
            
            // Load favorite recipes after managers are initialized
            this.favoriteRecipes = this.loadFavoriteRecipes();
            
            // Test if critical classes are available
            console.log('🧪 Testing class availability...');
            console.log('ItineraryView available:', typeof ItineraryView !== 'undefined');
            console.log('CalendarView available:', typeof CalendarView !== 'undefined');
            
            this.initializeServiceWorker();
            this.initializePWAFeatures();
            
            try {
                console.log('🔄 About to initialize itinerary views...');
                this.initializeItineraryViews();
                console.log('✅ Itinerary views initialized successfully');
            } catch (error) {
                console.error('❌ Error initializing itinerary views:', error);
                console.error('Stack trace:', error.stack);
            }
            
            try {
                console.log('🔄 About to initialize meal planning controls...');
                this.initializeMealPlanningControls();
                console.log('✅ Meal planning controls initialized successfully');
            } catch (error) {
                console.error('❌ Error initializing meal planning controls:', error);
                console.error('Stack trace:', error.stack);
            }
            
            this.generateCalendarDays();
            
            console.log(`✅ MealPlanner v${this.version} initialized successfully!`);
            
            // Set up navigation listeners for browser back/forward support
            this.setupNavigationListeners();
            
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

        // Settings tab export/import buttons
        document.getElementById('export-db-btn-settings')?.addEventListener('click', () => {
            this.handleExportDatabase();
        });

        document.getElementById('import-db-btn-settings')?.addEventListener('click', () => {
            this.handleImportDatabase();
        });

        // Import file input
        document.getElementById('import-file-input')?.addEventListener('change', (e) => {
            this.handleImportFile(e);
        });

        // Google Calendar integration
        document.getElementById('google-calendar-btn')?.addEventListener('click', () => {
            this.handleGoogleCalendarAction();
        });

        // View toggle button
        document.getElementById('view-toggle-plan')?.addEventListener('click', () => {
            this.toggleView('plan');
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

    switchTab(tabName, options = {}) {
        const { trackHistory = true, fromSettings = false } = options;
        
        // Track navigation history (but not when returning from settings)
        if (trackHistory && !fromSettings && this.currentTab !== tabName) {
            // Store the current tab as previous
            this.previousTab = this.currentTab;
            
            // Add to navigation history (limit to last 10 entries)
            this.navigationHistory.push({
                tab: this.currentTab,
                timestamp: Date.now()
            });
            
            // Keep only last 10 entries
            if (this.navigationHistory.length > 10) {
                this.navigationHistory = this.navigationHistory.slice(-10);
            }
            
            // Push to browser history for back/forward support
            this.pushNavigationState(tabName, { previousTab: this.currentTab });
            
            console.log(`📍 Navigation: ${this.currentTab} → ${tabName}`, {
                previousTab: this.previousTab,
                historyLength: this.navigationHistory.length
            });
        }

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

        // Show selected tab (handle menu tab mapping)
        const tabId = tabName === 'menu' ? 'menu-tab' : `${tabName}-tab`;
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
            tabElement.classList.remove('hidden');
        }

        // Re-render ItemsManager when switching to items tab to ensure list view is shown
        if (tabName === 'items' && this.itemsManager) {
            console.log('🔄 Re-rendering ItemsManager for items tab activation');
            this.itemsManager.render();
        }
        this.currentTab = tabName;

        // Update mobile navigation if it exists
        if (window.mobileNavigation) {
            window.mobileNavigation.onTabChange(tabName);
        }

        // Update pending recipes and delta comparison if switching to plan tab
        if (tabName === 'plan') {
            this.updatePendingRecipes();
            // Update Plan vs Menu delta comparison to show current differences
            this.updatePlanMenuDelta();
            
            // Refresh the plan itinerary view to ensure auto-plan controls are visible
            if (this.itineraryViews && this.itineraryViews['plan']) {
                console.log('🔄 Refreshing plan itinerary view to show auto-plan controls');
                this.itineraryViews['plan'].render();
            }
        }

        console.log(`Switched to ${tabName} tab`);
    }

    // Navigation Stack System with Browser History Integration
    pushNavigationState(tabName, data = {}) {
        const state = {
            tab: tabName,
            data: data,
            timestamp: Date.now()
        };

        // Update browser history
        const url = new URL(window.location);
        url.searchParams.set('tab', tabName);
        history.pushState(state, '', url);

        console.log(`📍 Pushed navigation state: ${tabName}`, state);
    }

    popNavigationState() {
        if (this.navigationHistory.length > 0) {
            const previousState = this.navigationHistory.pop();
            if (previousState) {
                console.log(`📍 Popped navigation state: ${previousState.tab}`, previousState);
                return previousState;
            }
        }
        return null;
    }

    getCurrentNavigationState() {
        return {
            currentTab: this.currentTab,
            previousTab: this.previousTab,
            historyLength: this.navigationHistory.length,
            history: [...this.navigationHistory]
        };
    }

    clearNavigationStack() {
        this.navigationHistory = [];
        this.previousTab = null;
        console.log('🧹 Navigation stack cleared');
    }

    setupNavigationListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            console.log('🔄 Browser navigation detected:', event.state);
            
            if (event.state && event.state.tab) {
                // Switch to the tab from browser history
                this.switchTab(event.state.tab, { trackHistory: false });
            } else {
                // Handle URL parameters for direct navigation
                const urlParams = new URLSearchParams(window.location.search);
                const tabFromUrl = urlParams.get('tab');
                if (tabFromUrl && tabFromUrl !== this.currentTab) {
                    this.switchTab(tabFromUrl, { trackHistory: false });
                }
            }
        });

        // Handle initial page load with URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const initialTab = urlParams.get('tab');
        if (initialTab && initialTab !== this.currentTab) {
            this.switchTab(initialTab, { trackHistory: false });
        }

        console.log('✅ Navigation listeners set up');
    }

    returnFromSettings() {
        // Return to the previous tab, or default to recipes if no previous tab
        const targetTab = this.previousTab || 'recipes';
        
        console.log(`🔙 Returning from settings to: ${targetTab}`, {
            previousTab: this.previousTab,
            currentTab: this.currentTab
        });
        
        // Switch to previous tab without tracking this as a new navigation
        this.switchTab(targetTab, { trackHistory: false, fromSettings: true });
    }

    updatePendingRecipes() {
        const pendingList = document.getElementById('pending-recipes-list');
        const emptyState = document.getElementById('pending-recipes-empty');
        
        if (!pendingList || !emptyState) return;

        // Get pending recipes from localStorage
        const pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
        console.log(`🔄 updatePendingRecipes: Found ${pendingRecipes.length} pending recipes`);
        
        // Update planning queue info bar FIRST (before early return)
        this.updatePlanningQueueInfo(pendingRecipes);
        
        if (pendingRecipes.length === 0) {
            pendingList.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        
        // Render pending recipes with drag and drop support
        pendingList.innerHTML = pendingRecipes.map((pending, index) => {
            const addedDate = new Date(pending.addedAt).toLocaleDateString();
            const isCombo = pending.recipe_type === 'combo';
            
            return `
                <div class="planning-queue-item flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${isCombo ? 'border-l-4 border-purple-500' : ''}" 
                     data-recipe-id="${pending.id}" 
                     data-queue-index="${index}"
                     draggable="true"
                     ondragstart="window.app.handlePlanningQueueDragStart(event)"
                     ondragover="window.app.handlePlanningQueueDragOver(event)"
                     ondrop="window.app.handlePlanningQueueDrop(event)"
                     ondragend="window.app.handlePlanningQueueDragEnd(event)"
                     ontouchstart="window.app.handlePlanningQueueTouchStart(event)"
                     ontouchmove="window.app.handlePlanningQueueTouchMove(event)"
                     ontouchend="window.app.handlePlanningQueueTouchEnd(event)">
                    
                    <!-- Drag Handle -->
                    <div class="drag-handle text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing mr-3 touch-manipulation" 
                         title="Drag to reorder">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                        </svg>
                    </div>
                    
                    <div class="flex items-center space-x-3 flex-1 view-pending-recipe" data-recipe-id="${pending.id}">
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">${pending.title}</h4>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Added ${addedDate}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium remove-pending-recipe" data-recipe-id="${pending.id}" onclick="event.stopPropagation()">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach event listeners for pending recipe actions
        this.attachPendingRecipeListeners();
    }

    // Planning Queue Drag and Drop Handlers
    handlePlanningQueueDragStart(event) {
        const item = event.target.closest('.planning-queue-item');
        if (!item) return;

        const recipeId = item.dataset.recipeId;
        const queueIndex = parseInt(item.dataset.queueIndex);
        
        // Store drag data
        event.dataTransfer.setData('text/plain', JSON.stringify({
            type: 'planning-queue-item',
            recipeId: recipeId,
            sourceIndex: queueIndex
        }));
        
        // Visual feedback
        item.classList.add('opacity-50');
        
        console.log(`🎯 Started dragging planning queue item: ${recipeId} from index ${queueIndex}`);
    }

    handlePlanningQueueDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        
        const item = event.target.closest('.planning-queue-item');
        if (!item) return;
        
        // Add visual feedback for drop zone
        item.classList.add('border-2', 'border-blue-400', 'border-dashed');
    }

    handlePlanningQueueDrop(event) {
        event.preventDefault();
        
        const targetItem = event.target.closest('.planning-queue-item');
        if (!targetItem) return;
        
        // Remove visual feedback
        targetItem.classList.remove('border-2', 'border-blue-400', 'border-dashed');
        
        try {
            const dragData = JSON.parse(event.dataTransfer.getData('text/plain'));
            
            if (dragData.type !== 'planning-queue-item') return;
            
            const sourceIndex = dragData.sourceIndex;
            const targetIndex = parseInt(targetItem.dataset.queueIndex);
            
            if (sourceIndex === targetIndex) return;
            
            console.log(`🎯 Dropping planning queue item from index ${sourceIndex} to ${targetIndex}`);
            
            this.reorderPlanningQueue(sourceIndex, targetIndex);
            
        } catch (error) {
            console.error('Error handling planning queue drop:', error);
        }
    }

    handlePlanningQueueDragEnd(event) {
        const item = event.target.closest('.planning-queue-item');
        if (!item) return;
        
        // Remove visual feedback
        item.classList.remove('opacity-50');
        
        // Remove drag over effects from all items
        document.querySelectorAll('.planning-queue-item').forEach(item => {
            item.classList.remove('border-2', 'border-blue-400', 'border-dashed');
        });
        
        console.log('🎯 Planning queue drag ended');
    }

    // Touch support for mobile drag and drop
    handlePlanningQueueTouchStart(event) {
        const item = event.target.closest('.planning-queue-item');
        if (!item) return;
        
        this.touchDragData = {
            item: item,
            startY: event.touches[0].clientY,
            recipeId: item.dataset.recipeId,
            sourceIndex: parseInt(item.dataset.queueIndex)
        };
        
        // Visual feedback
        item.classList.add('opacity-75', 'scale-105', 'z-10', 'shadow-lg');
        
        console.log(`📱 Touch drag started for planning queue item: ${this.touchDragData.recipeId}`);
    }

    handlePlanningQueueTouchMove(event) {
        if (!this.touchDragData) return;
        
        event.preventDefault();
        
        const touch = event.touches[0];
        const currentY = touch.clientY;
        
        // Find the item under the touch point
        const elementBelow = document.elementFromPoint(touch.clientX, currentY);
        const targetItem = elementBelow?.closest('.planning-queue-item');
        
        // Remove previous hover effects
        document.querySelectorAll('.planning-queue-item').forEach(item => {
            item.classList.remove('border-2', 'border-blue-400', 'border-dashed');
        });
        
        // Add hover effect to target
        if (targetItem && targetItem !== this.touchDragData.item) {
            targetItem.classList.add('border-2', 'border-blue-400', 'border-dashed');
        }
    }

    handlePlanningQueueTouchEnd(event) {
        if (!this.touchDragData) return;
        
        const touch = event.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetItem = elementBelow?.closest('.planning-queue-item');
        
        // Remove visual feedback
        this.touchDragData.item.classList.remove('opacity-75', 'scale-105', 'z-10', 'shadow-lg');
        document.querySelectorAll('.planning-queue-item').forEach(item => {
            item.classList.remove('border-2', 'border-blue-400', 'border-dashed');
        });
        
        // Perform reorder if valid target
        if (targetItem && targetItem !== this.touchDragData.item) {
            const sourceIndex = this.touchDragData.sourceIndex;
            const targetIndex = parseInt(targetItem.dataset.queueIndex);
            
            console.log(`📱 Touch drop: moving from index ${sourceIndex} to ${targetIndex}`);
            this.reorderPlanningQueue(sourceIndex, targetIndex);
        }
        
        this.touchDragData = null;
        console.log('📱 Touch drag ended');
    }

    // Reorder the planning queue items
    reorderPlanningQueue(sourceIndex, targetIndex) {
        const pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
        
        if (sourceIndex < 0 || sourceIndex >= pendingRecipes.length || 
            targetIndex < 0 || targetIndex >= pendingRecipes.length) {
            console.error('Invalid reorder indices:', sourceIndex, targetIndex);
            return;
        }
        
        // Remove item from source position
        const [movedItem] = pendingRecipes.splice(sourceIndex, 1);
        
        // Insert at target position
        pendingRecipes.splice(targetIndex, 0, movedItem);
        
        // Save reordered list
        localStorage.setItem('mealplanner_pending_recipes', JSON.stringify(pendingRecipes));
        
        // Update the display
        this.updatePendingRecipes();
        
        console.log(`✅ Reordered planning queue: moved item from ${sourceIndex} to ${targetIndex}`);
        
        // Show feedback
        this.showNotification('Planning queue reordered', 'success');
    }

    updatePlanningQueueInfo(pendingRecipes) {
        const queueCountEl = document.getElementById('queue-count');
        const comboCountEl = document.getElementById('combo-count');
        const planningQueueCountEl = document.getElementById('planning-queue-count');
        
        const totalCount = pendingRecipes.length;
        const comboCount = pendingRecipes.filter(recipe => recipe.recipe_type === 'combo').length;
        
        console.log(`🔄 updatePlanningQueueInfo: Updating counters - ${totalCount} total, ${comboCount} combos`);
        
        // Update info bar counts (if they exist - they may have been removed)
        if (queueCountEl) {
            queueCountEl.innerHTML = `<strong>${totalCount}</strong> recipe${totalCount !== 1 ? 's' : ''} queued`;
        }
        if (comboCountEl) {
            comboCountEl.innerHTML = `<strong>${comboCount}</strong> combo${comboCount !== 1 ? 's' : ''}`;
        }
        
        // Update Planning Queue header count (this is the main counter we care about)
        if (planningQueueCountEl) {
            planningQueueCountEl.textContent = `(${totalCount})`;
        }
    }

    attachPendingRecipeListeners() {
        // Remove pending recipe buttons
        document.querySelectorAll('.remove-pending-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const recipeId = parseInt(btn.dataset.recipeId);
                this.removePendingRecipe(recipeId);
            });
        });

        // View pending recipe buttons
        document.querySelectorAll('.view-pending-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const recipeId = parseInt(btn.dataset.recipeId);
                if (window.recipeManager) {
                    // Set up navigation to return to Plan tab instead of Recipes tab
                    if (window.recipeManager.navigationStack) {
                        // Clear any existing navigation stack to ensure clean return
                        window.recipeManager.navigationStack = [];
                    }
                    
                    // Store current Plan tab state for return navigation
                    const currentPlanContent = document.getElementById('plan-tab').innerHTML;
                    if (window.recipeManager.navigationStack) {
                        window.recipeManager.navigationStack.push({
                            container: currentPlanContent,
                            scrollPosition: window.scrollY,
                            returnTab: 'plan' // Custom property to indicate return destination
                        });
                    }
                    
                    window.recipeManager.showRecipeDetail(recipeId);
                }
            });
        });

        // Clear all pending recipes button with safety toggle integration
        const clearAllBtn = document.getElementById('clear-pending-recipes');
        if (clearAllBtn) {
            const clearCallback = () => {
                localStorage.removeItem('mealplanner_pending_recipes');
                this.updatePendingRecipes();
            };
            
            // Use settings manager for clear with safety toggles, with fallback to simple confirm
            const settingsManager = window.mealPlannerSettings || window.settingsManager;
            if (settingsManager && settingsManager.createClearFiltersHandler) {
                // Create a mock manager instance for the safety system
                const mockManager = {
                    hasActiveFilters: () => {
                        // Check if there are any pending recipes to clear
                        const pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
                        return pendingRecipes.length > 0;
                    }
                };
                
                const clearHandler = settingsManager.createClearFiltersHandler(
                    clearCallback, 
                    '#clear-pending-recipes', 
                    mockManager,
                    'Are you sure you want to clear all recipes from the planning queue?'
                );
                clearAllBtn.addEventListener('click', clearHandler);
            } else {
                // Fallback to simple confirm dialog if settings manager not available
                clearAllBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to clear all recipes from the planning queue?')) {
                        clearCallback();
                    }
                });
            }
        }
    }

    removePendingRecipe(recipeId) {
        let pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
        pendingRecipes = pendingRecipes.filter(p => p.id !== recipeId);
        localStorage.setItem('mealplanner_pending_recipes', JSON.stringify(pendingRecipes));
        this.updatePendingRecipes();
        
        // Update recipe button states in the recipe manager
        if (this.recipeManager) {
            this.recipeManager.render();
        }
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
        console.log('📱 TRACE: initializeManagers() ENTRY POINT');
        console.log('🔍 TRACE: localStorage state before manager initialization:');
        console.log('  - items:', localStorage.getItem('mealplanner_items') ? 'EXISTS' : 'NULL');
        console.log('  - recipes:', localStorage.getItem('mealplanner_recipes') ? 'EXISTS' : 'NULL');
        console.log('  - demo_data_populated flag:', localStorage.getItem('mealplanner_demo_data_populated'));
        console.log('📱 Initializing managers...');
        
        // Check if all manager classes are available
        const managersAvailable = {
            RecipeManager: typeof RecipeManager !== 'undefined',
            MealManager: typeof MealManager !== 'undefined',
            ItemsManager: typeof ItemsManager !== 'undefined',
            GroceryListManager: typeof GroceryListManager !== 'undefined',
            SettingsManager: typeof SettingsManager !== 'undefined',
            GoogleCalendarIntegration: typeof GoogleCalendarIntegration !== 'undefined',
            MealRotationEngine: typeof MealRotationEngine !== 'undefined',
            ScheduleManager: typeof ScheduleManager !== 'undefined'
        };
        
        console.log('📱 Manager availability:', managersAvailable);
        
        // Wait a bit if managers aren't ready
        if (!managersAvailable.RecipeManager || !managersAvailable.MealManager || !managersAvailable.ItemsManager || !managersAvailable.ScheduleManager) {
            console.log('📱 Waiting for managers to load...');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Initialize managers
        try {
            // Initialize settings manager FIRST - other managers depend on it
            this.initializeSettingsManager();
            
            // Initialize system labels - must happen after settings manager but before other managers
            this.initializeSystemLabels();
            
            this.initializeRecipeManager();
            this.initializeScheduleManager();
            this.initializeItemsManager();
            this.initializeGroceryListManager();
        this.initializeGoogleCalendar();
        this.initializePerformanceManager();
        this.initializeAdvancedPlanning();
        this.initializePantryManager();
        this.initializeMealRotationEngine();
        this.initializeAutoPlanControls();
        } catch (error) {
            console.error('❌ Error initializing managers:', error);
        }
    }

    initializeAutoPlanControls() {
        console.log('🎛️ Initializing auto-plan controls...');
        
        // Initialize meals per week slider
        const mealsPerWeekSlider = document.getElementById('meals-per-week');
        const mealsPerWeekValue = document.getElementById('meals-per-week-value');
        
        if (mealsPerWeekSlider && mealsPerWeekValue) {
            // Update display value when slider changes
            mealsPerWeekSlider.addEventListener('input', (e) => {
                mealsPerWeekValue.textContent = e.target.value;
            });
            
            // Initialize display value
            mealsPerWeekValue.textContent = mealsPerWeekSlider.value;
        }
        
        // Initialize meal spacing slider
        const mealSpacingSlider = document.getElementById('meal-spacing');
        const mealSpacingValue = document.getElementById('meal-spacing-value');
        
        if (mealSpacingSlider && mealSpacingValue) {
            // Update display value when slider changes
            mealSpacingSlider.addEventListener('input', (e) => {
                mealSpacingValue.textContent = e.target.value;
            });
            
            // Initialize display value
            mealSpacingValue.textContent = mealSpacingSlider.value;
        }
        
        console.log('✅ Auto-plan controls initialized');
    }

    initializeRecipeManager() {
        console.log('🍳 Initializing recipe manager...');
        
        const container = document.getElementById('recipe-manager-container');
        if (container) {
            this.recipeManager = new RecipeManager(container);
            window.recipeManager = this.recipeManager;
            console.log('✅ Recipe manager initialized');
            console.log('✅ this.recipeManager assigned:', !!this.recipeManager);
        } else {
            console.warn('⚠️ Recipe manager container not found');
        }
    }


    initializeScheduleManager() {
        console.log('📅 Initializing schedule manager...');
        
        this.scheduleManager = new ScheduleManager();
        window.scheduleManager = this.scheduleManager;
        console.log('✅ Schedule manager initialized');
    }

    initializeItemsManager() {
        console.log('🥕 Initializing items manager...');
        
        const container = document.getElementById('items-manager-container');
        if (container) {
            this.itemsManager = new ItemsManager(container);
            window.itemsManager = this.itemsManager;
            console.log('✅ Items manager initialized');
        }
    }

    initializeGroceryListManager() {
        console.log('🛒 Initializing grocery list manager...');
        
        const container = document.getElementById('grocery-list-container');
        console.log('🛒 DEBUG: grocery-list-container found:', !!container, container);
        
        if (container) {
            this.groceryListManager = new GroceryListManager(container);
            window.groceryListManager = this.groceryListManager;
            console.log('✅ Grocery list manager initialized');
            
            // Initialize the grocery list manager
            if (this.groceryListManager.init) {
                this.groceryListManager.init().then(() => {
                    console.log('✅ Grocery list manager init completed');
                }).catch(error => {
                    console.error('❌ Error initializing grocery list manager:', error);
                });
            }
        } else {
            console.error('❌ grocery-list-container not found!');
        }
    }

    initializeSettingsManager() {
        console.log('⚙️ TRACE: initializeSettingsManager() ENTRY POINT');
        console.log('🔍 TRACE: localStorage state before SettingsManager constructor:');
        console.log('  - items:', localStorage.getItem('mealplanner_items') ? 'EXISTS' : 'NULL');
        console.log('  - recipes:', localStorage.getItem('mealplanner_recipes') ? 'EXISTS' : 'NULL');
        console.log('  - demo_data_populated flag:', localStorage.getItem('mealplanner_demo_data_populated'));
        
        console.log('⚙️ Initializing settings manager...');
        this.settingsManager = new SettingsManager();
        
        console.log('🔍 TRACE: localStorage state after SettingsManager constructor:');
        console.log('  - items:', localStorage.getItem('mealplanner_items') ? 'EXISTS' : 'NULL');
        console.log('  - recipes:', localStorage.getItem('mealplanner_recipes') ? 'EXISTS' : 'NULL');
        console.log('  - demo_data_populated flag:', localStorage.getItem('mealplanner_demo_data_populated'));
        
        window.settingsManager = this.settingsManager;
        window.mealPlannerSettings = this.settingsManager; // Also set the expected reference
        console.log('✅ Settings manager initialized and available as both window.settingsManager and window.mealPlannerSettings');
    }

    initializeSystemLabels() {
        console.log('🏷️ Initializing system labels...');
        
        try {
            // System labels that should always exist regardless of data source
            const systemLabels = [
                {
                    id: 'system_recipe_combo',
                    name: 'recipe_combo',
                    type: 'recipe_combo',
                    color: '#F59E0B',
                    description: 'Automatically applied to combo recipes that combine multiple individual recipes',
                    isSystem: true,
                    created_at: new Date().toISOString()
                },
                {
                    id: 'system_favorites',
                    name: 'favorites',
                    type: 'custom',
                    color: '#EAB308',
                    description: 'Automatically applied to recipes marked as favorites',
                    isSystem: true,
                    created_at: new Date().toISOString()
                },
                {
                    id: 'system_breakfast',
                    name: 'breakfast',
                    type: 'meal_type',
                    color: '#F97316',
                    description: 'Recipes suitable for breakfast meals',
                    isSystem: true,
                    created_at: new Date().toISOString()
                },
                {
                    id: 'system_lunch',
                    name: 'lunch',
                    type: 'meal_type',
                    color: '#10B981',
                    description: 'Recipes suitable for lunch meals',
                    isSystem: true,
                    created_at: new Date().toISOString()
                },
                {
                    id: 'system_dinner',
                    name: 'dinner',
                    type: 'meal_type',
                    color: '#8B5CF6',
                    description: 'Recipes suitable for dinner meals',
                    isSystem: true,
                    created_at: new Date().toISOString()
                }
            ];
            
            // Always ensure system labels exist in localStorage
            localStorage.setItem('mealplanner_system_labels', JSON.stringify(systemLabels));
            console.log('🏷️ System labels initialized:', systemLabels.length);
            
            // Verify system labels are preserved in clearAllData exclusions
            const currentExclusions = [
                'mealplanner_demo_data_populated',
                'mealplanner_system_labels',
                'mealplanner_user_labels'
            ];
            console.log('🏷️ System labels protected from data clearing:', currentExclusions);
            
        } catch (error) {
            console.error('❌ Error initializing system labels:', error);
        }
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
            const recipes = window.mealPlannerSettings?.getAuthoritativeData('recipes') || [];
            const userPreferences = JSON.parse(localStorage.getItem('mealPreferences') || '{}');
            const pantryItems = window.mealPlannerSettings?.getAuthoritativeData('items') || [];
            
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
        console.log('🔍 ItineraryView class available:', typeof ItineraryView);
        console.log('🔍 CalendarView class available:', typeof CalendarView);
        
        // Check if required classes are available
        if (typeof ItineraryView === 'undefined') {
            console.error('❌ ItineraryView class not found! Script may not have loaded properly.');
            return;
        }
        if (typeof CalendarView === 'undefined') {
            console.error('❌ CalendarView class not found! Script may not have loaded properly.');
            return;
        }
        
        // Initialize both itinerary and calendar views for each meal type
        const mealTypes = ['plan']; // Only plan tab is supported now
        
        // Initialize calendar views registry
        this.calendarViews = {};
        window.calendarViews = window.calendarViews || {};
        
        console.log('🔧 Starting to initialize views for meal types:', mealTypes);
        
        mealTypes.forEach(mealType => {
            // Initialize itinerary view
            const itineraryContainer = document.getElementById(`${mealType}-itinerary`);
            console.log(`🔍 Looking for ${mealType}-itinerary container:`, !!itineraryContainer);
            if (itineraryContainer) {
                console.log(`🔧 Creating ItineraryView for ${mealType}`);
                this.itineraryViews[mealType] = new ItineraryView(itineraryContainer, mealType);
                console.log(`🎨 Rendering ${mealType} itinerary view`);
                this.itineraryViews[mealType].render();
                
                // Store in global registry for onclick handlers
                window.itineraryViews[mealType] = this.itineraryViews[mealType];
                
                console.log(`✅ ${mealType} itinerary view initialized and rendered`);
            } else {
                console.error(`❌ ${mealType}-itinerary container not found in DOM`);
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
        // Initialize recipe selection for plan
        this.renderRecipeSelection('plan');
        this.attachRecipeSelectionListeners('plan');
        
        // Initialize the scheduling pipeline
        this.initializeSchedulingPipeline();
    }

    renderRecipeSelection(mealType) {
        const browserContainer = document.getElementById(`${mealType}-recipe-browser`);
        if (!browserContainer) return;

        // Get recipes from centralized authoritative data source
        let recipes = [];
        
        if (window.mealPlannerSettings) {
            const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            recipes = allRecipes || [];
            console.log(`🍽️ ${mealType} tab loaded ${recipes.length} recipes from authoritative source`);
        } else {
            console.warn(`⚠️ Settings manager not available for ${mealType} tab recipe selection`);
            recipes = [];
        }

        // Apply all filters and sorting
        const filteredRecipes = this.getFilteredAndSortedRecipes(recipes, mealType);

        // Update label dropdown options
        this.updateLabelOptions(recipes);

        // Render recipe browser
        if (filteredRecipes.length === 0) {
            browserContainer.innerHTML = '<p class="text-gray-500 text-center py-8">No recipes found matching your criteria.</p>';
        } else {
            browserContainer.innerHTML = filteredRecipes.map(recipe => {
                const isFavorite = this.isRecipeFavorite(recipe.id);
                const selectedRecipes = this.selectedRecipes[mealType] || [];
                const isInQueue = selectedRecipes.includes(recipe.id);
                
                return `
                    <div class="recipe-browser-item flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-1">
                                <h4 class="font-medium text-gray-900 dark:text-white text-sm">${recipe.title}</h4>
                                ${isFavorite ? '<span class="text-red-500 text-xs">❤️</span>' : ''}
                                ${recipe.type === 'combo' ? '<span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">COMBO</span>' : ''}
                            </div>
                            <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">${recipe.description || ''}</p>
                            <div class="flex items-center space-x-3 text-xs text-gray-500">
                                <span>⏱️ ${(recipe.prep_time || 0) + (recipe.cook_time || 0)} min</span>
                                <span>👥 ${recipe.serving_count || 4}</span>
                            </div>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${(recipe.labels || []).slice(0, 2).map(label => 
                                    `<span class="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">${label}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <button class="ml-3 px-3 py-1 text-sm rounded-md transition-colors ${isInQueue ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}" 
                                onclick="window.app.addRecipeToQueue('${mealType}', ${recipe.id})" 
                                ${isInQueue ? 'disabled' : ''}>
                            ${isInQueue ? '✓ Added' : '+ Add'}
                        </button>
                    </div>
                `;
            }).join('');
        }

        this.renderSelectionQueue(mealType);
    }

    getFilteredAndSortedRecipes(recipes, mealType) {
        let filtered = [...recipes];

        // Get filter values
        const searchTerm = document.getElementById('plan-recipe-search')?.value?.trim().toLowerCase() || '';
        const selectedCategory = document.getElementById('plan-recipe-category')?.value || 'all';
        const selectedType = document.getElementById('plan-recipe-type')?.value || 'all';
        const selectedLabel = document.getElementById('plan-recipe-label')?.value || 'all';
        const sortBy = document.getElementById('plan-recipe-sort')?.value || 'name';

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm) ||
                (recipe.description || '').toLowerCase().includes(searchTerm) ||
                (recipe.labels || []).some(label => label.toLowerCase().includes(searchTerm))
            );
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(recipe => recipe.meal_type === selectedCategory);
        } else {
            // Default to all recipes for plan meal type
            if (mealType === 'plan') {
                // Plan can include any meal type
                filtered = filtered.filter(recipe => 
                    recipe.meal_type === 'breakfast' || recipe.meal_type === 'lunch' || 
                    recipe.meal_type === 'dinner' || recipe.meal_type === 'any'
                );
            }
        }

        // Apply type filter
        if (selectedType !== 'all') {
            filtered = filtered.filter(recipe => {
                if (selectedType === 'combo') {
                    return recipe.type === 'combo';
                } else if (selectedType === 'single') {
                    return recipe.type !== 'combo';
                }
                return true;
            });
        }

        // Apply label filter
        if (selectedLabel !== 'all') {
            filtered = filtered.filter(recipe => {
                const recipeLabels = [
                    ...(recipe.labels || []),
                    ...(recipe.tags || [])
                ];
                return recipeLabels.some(label => label.toLowerCase() === selectedLabel.toLowerCase());
            });
        }

        // Apply favorites filter if enabled
        if (this.showFavoritesOnly) {
            filtered = filtered.filter(recipe => this.isRecipeFavorite(recipe.id));
        }

        // Sort recipes
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'date':
                    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
                case 'prep_time':
                    return ((a.prep_time || 0) + (a.cook_time || 0)) - ((b.prep_time || 0) + (b.cook_time || 0));
                case 'serving_count':
                    return (b.serving_count || 0) - (a.serving_count || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // Extract label names from typed labels (handles both old and new format)
    extractLabelNames(labels) {
        if (!Array.isArray(labels)) return [];
        
        return labels.map(label => {
            if (typeof label === 'string') return label;
            if (label && typeof label === 'object' && label.name) return label.name;
            return String(label);
        });
    }

    updateLabelOptions(recipes) {
        const labelSelect = document.getElementById('plan-recipe-label');
        if (!labelSelect) return;

        // Get all unique labels
        const labels = new Set();
        recipes.forEach(recipe => {
            // Extract label names from typed labels
            const labelNames = this.extractLabelNames(recipe.labels || []);
            labelNames.forEach(label => labels.add(label));
            (recipe.tags || []).forEach(tag => labels.add(tag));
        });

        // Update options
        const currentValue = labelSelect.value;
        labelSelect.innerHTML = '<option value="all">All Labels</option>' +
            Array.from(labels).sort().map(label => 
                `<option value="${label}" ${currentValue === label ? 'selected' : ''}>${label}</option>`
            ).join('');
    }

    clearPlanFilters(mealType) {
        // Reset all filter controls to default values
        const searchInput = document.getElementById('plan-recipe-search');
        const categorySelect = document.getElementById('plan-recipe-category');
        const typeSelect = document.getElementById('plan-recipe-type');
        const labelSelect = document.getElementById('plan-recipe-label');
        const sortSelect = document.getElementById('plan-recipe-sort');

        if (searchInput) searchInput.value = '';
        if (categorySelect) categorySelect.value = mealType === 'plan' ? 'all' : 'all';
        if (typeSelect) typeSelect.value = 'all';
        if (labelSelect) labelSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'name';

        // Also clear favorites filter
        this.showFavoritesOnly = false;
        this.updateFavoritesToggleIcon();

        // Re-render with cleared filters
        this.renderRecipeSelection(mealType);
    }

    toggleFavoritesFilter(mealType) {
        this.showFavoritesOnly = !this.showFavoritesOnly;
        this.updateFavoritesToggleIcon();
        this.renderRecipeSelection(mealType);
    }

    updateFavoritesToggleIcon() {
        const favoritesBtn = document.getElementById('show-favorites-only');
        if (favoritesBtn) {
            const icon = favoritesBtn.querySelector('span');
            if (icon) {
                icon.textContent = this.showFavoritesOnly ? '❤️' : '🤍';
            }
            favoritesBtn.classList.toggle('text-red-500', this.showFavoritesOnly);
            favoritesBtn.classList.toggle('text-gray-400', !this.showFavoritesOnly);
        }
    }


    renderSelectionQueue(mealType) {
        const queueContainer = document.getElementById('selected-recipes-container');
        const countElement = document.getElementById('selected-recipe-count');
        const scheduleCountElement = document.getElementById('schedule-count');
        const scheduleBtn = document.getElementById('schedule-selected-recipes');
        const emptyMessage = document.getElementById('empty-selection-message');
        
        if (!queueContainer) return;
        
        const selectedRecipes = this.selectedRecipes[mealType] || [];
        
        // Update counts
        if (countElement) countElement.textContent = `${selectedRecipes.length} items`;
        if (scheduleCountElement) scheduleCountElement.textContent = selectedRecipes.length;
        
        // Enable/disable schedule button
        if (scheduleBtn) {
            scheduleBtn.disabled = selectedRecipes.length === 0;
        }
        
        // Show/hide empty message
        if (emptyMessage) {
            emptyMessage.style.display = selectedRecipes.length === 0 ? 'block' : 'none';
        }
        
        if (selectedRecipes.length === 0) {
            return;
        }
        
        // Get recipe details for selected items
        let recipes = [];
        if (window.mealPlannerSettings) {
            const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            recipes = allRecipes.filter(recipe => selectedRecipes.includes(recipe.id));
        }
        
        // Render selected recipe chips
        const selectedChips = recipes.map(recipe => `
            <div class="selected-recipe-chip flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-lg text-sm">
                <span>${recipe.title}</span>
                <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-bold" 
                        onclick="window.app.removeRecipeFromQueue('${mealType}', ${recipe.id})" 
                        title="Remove from selection">
                    ✕
                </button>
            </div>
        `).join('');
        
        queueContainer.innerHTML = selectedChips;
    }

    addRecipeToQueue(mealType, recipeId) {
        if (!this.selectedRecipes[mealType]) {
            this.selectedRecipes[mealType] = [];
        }
        
        if (!this.selectedRecipes[mealType].includes(recipeId)) {
            this.selectedRecipes[mealType].push(recipeId);
            this.renderRecipeSelection(mealType);
            console.log(`Added recipe ${recipeId} to ${mealType} queue`);
        }
    }

    removeRecipeFromQueue(mealType, recipeId) {
        if (this.selectedRecipes[mealType]) {
            const index = this.selectedRecipes[mealType].indexOf(recipeId);
            if (index > -1) {
                this.selectedRecipes[mealType].splice(index, 1);
                this.renderRecipeSelection(mealType);
                console.log(`Removed recipe ${recipeId} from ${mealType} queue`);
            }
        }
    }

    attachRecipeSelectionListeners(mealType) {
        // Search input listener
        const searchInput = document.getElementById('plan-recipe-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.renderRecipeSelection(mealType);
            });
        }

        // Category filter listener
        const categorySelect = document.getElementById('plan-recipe-category');
        if (categorySelect) {
            categorySelect.addEventListener('change', () => {
                this.renderRecipeSelection(mealType);
            });
        }

        // Type filter listener
        const typeSelect = document.getElementById('plan-recipe-type');
        if (typeSelect) {
            typeSelect.addEventListener('change', () => {
                this.renderRecipeSelection(mealType);
            });
        }

        // Label filter listener
        const labelSelect = document.getElementById('plan-recipe-label');
        if (labelSelect) {
            labelSelect.addEventListener('change', () => {
                this.renderRecipeSelection(mealType);
            });
        }

        // Sort selector listener
        const sortSelect = document.getElementById('plan-recipe-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this.renderRecipeSelection(mealType);
            });
        }

        // Clear filters button
        const clearFiltersBtn = document.getElementById('clear-plan-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearPlanFilters(mealType);
            });
        }

        // Clear selection button
        const clearSelectionBtn = document.getElementById('clear-recipe-selection');
        if (clearSelectionBtn) {
            clearSelectionBtn.addEventListener('click', () => {
                this.clearRecipeSelection(mealType);
            });
        }

        // Favorites toggle button (icon only)
        const showFavoritesBtn = document.getElementById('show-favorites-only');
        if (showFavoritesBtn) {
            showFavoritesBtn.addEventListener('click', () => {
                this.toggleFavoritesFilter(mealType);
            });
        }
    }

    // Legacy method for backward compatibility
    attachLegacyRecipeSelectionListeners(mealType) {
        const gridContainer = document.getElementById(`${mealType}-recipe-grid`);
        
        // Recipe card click handlers (legacy grid-based interface)
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
        const selectedCount = this.selectedRecipes['plan'].length;
        
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
            selectedRecipeIds: [...this.selectedRecipes['plan']],
            mealType: 'plan'
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
        
        if (window.mealPlannerSettings) {
            const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
            
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
        this.clearMealPlanData('plan');
        
        // Apply new schedule
        this.applyGeneratedPlan('plan', schedule.meals);
        
        // Refresh the itinerary view
        this.refreshItineraryView('plan');
    }

    refreshItineraryView(mealType) {
        const itineraryContainer = document.getElementById(`${mealType}-itinerary`);
        if (itineraryContainer && window.ItineraryView) {
            // Re-initialize the itinerary view with new data
            const itineraryView = new window.ItineraryView(itineraryContainer, mealType);
            
            // Update the stored reference
            this.itineraryViews[mealType] = itineraryView;
            window.itineraryViews[mealType] = itineraryView;
            
            // Render the view
            itineraryView.render();
            
            console.log(`🔄 Refreshed ${mealType} itinerary view`);
        } else {
            console.warn(`⚠️ Could not refresh ${mealType} itinerary view - container or ItineraryView not found`);
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
        ['plan'].forEach(mealType => {
            this.initializeMealTypeControls(mealType);
        });
        
        // Removed delayed retry for auto-plan button - primary listener in initializeMealTypeControls should be sufficient
        
        // Initialize update menu button
        this.initializeUpdateMenuButton();
        
        // Initialize delta view toggle
        this.initializeDeltaViewToggle();
        
        console.log('✅ Meal planning controls initialized');
    }

    initializeUpdateMenuButton() {
        const updateMenuBtn = document.getElementById('update-menu-btn');
        if (updateMenuBtn) {
            updateMenuBtn.addEventListener('click', () => {
                this.handleUpdateMenu();
            });
            console.log('✅ Update Menu button initialized');
        }
        
        // Initialize Menu tab week selector
        this.initializeMenuWeekSelector();
    }
    
    initializeMenuWeekSelector() {
        const weekSelector = document.getElementById('menu-week-selector');
        if (weekSelector) {
            // Generate formatted dropdown options like Plan tab
            this.populateMenuWeekOptions(weekSelector);
            
            weekSelector.addEventListener('change', () => {
                this.updateMenuMealsDisplay();
            });
            
            // Initial load
            this.updateMenuMealsDisplay();
            console.log('✅ Menu week selector initialized');
        }
    }
    
    populateMenuWeekOptions(weekSelector) {
        const today = new Date();
        
        // Calculate the start of the current week (Sunday)
        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() - today.getDay());
        
        // Generate options for different week ranges (same as Plan tab)
        const weekRanges = [
            { weeks: 1, label: 'This Week' },
            { weeks: 2, label: '2 Weeks' },
            { weeks: 4, label: '4 Weeks' },
            { weeks: 8, label: '8 Weeks' }
        ];
        
        const options = [];
        weekRanges.forEach(range => {
            const endDate = new Date(currentWeekStart);
            endDate.setDate(currentWeekStart.getDate() + (range.weeks * 7) - 1);
            
            const startStr = currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const endStr = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            options.push(`
                <option value="${range.weeks}">
                    ${range.label} (${startStr} - ${endStr})
                </option>
            `);
        });
        
        weekSelector.innerHTML = options.join('');
        
        // Set default selection to "This Week" (1 week) to match Plan tab
        weekSelector.value = '1';
        
        console.log('✅ Menu week selector options populated with formatted dates, default: This Week');
    }
    
    updateMenuMealsDisplay() {
        const weekSelector = document.getElementById('menu-week-selector');
        const mealsContainer = document.getElementById('menu-meals-container');
        
        if (!weekSelector || !mealsContainer) return;
        
        const weeks = parseInt(weekSelector.value);
        
        // Use same start date calculation as Plan tab (Sunday of current week)
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
        
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + (weeks * 7) - 1);
        
        // Get scheduled meals for the selected timeframe
        let scheduledMeals = [];
        if (window.mealPlannerSettings) {
            const allMeals = window.mealPlannerSettings.getAuthoritativeData('menuScheduledMeals') || [];
            scheduledMeals = allMeals.filter(meal => {
                const mealDate = new Date(meal.date);
                // Normalize dates to avoid timezone issues
                const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
                const startDateNormalized = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const endDateNormalized = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                
                return mealDateNormalized >= startDateNormalized && mealDateNormalized <= endDateNormalized;
            });
        }
        
        if (scheduledMeals.length === 0) {
            mealsContainer.innerHTML = `
                <div class="text-gray-500 dark:text-gray-400 text-center py-4">
                    No meals scheduled for this timeframe. Use the Plan tab to schedule meals.
                </div>
            `;
            
            // Update grocery list even when no meals to ensure it reflects the empty state
            // Use a small delay to ensure DOM is fully updated before updating grocery list
            setTimeout(() => {
                if (window.groceryListManager && window.groceryListManager.updateDateRange) {
                    window.groceryListManager.updateDateRange(startDate, endDate);
                    console.log('🛒 Grocery list updated for empty menu state');
                }
            }, 50);
            return;
        }
        
        // Group meals by date
        const mealsByDate = {};
        scheduledMeals.forEach(meal => {
            const dateKey = meal.date;
            if (!mealsByDate[dateKey]) {
                mealsByDate[dateKey] = [];
            }
            mealsByDate[dateKey].push(meal);
        });
        
        // Generate HTML for meals
        let mealsHTML = '';
        Object.keys(mealsByDate).sort().forEach(date => {
            const meals = mealsByDate[date];
            const dateObj = new Date(date);
            const dateStr = dateObj.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });
            
            mealsHTML += `
                <div class="mb-4">
                    <h4 class="font-medium text-gray-900 dark:text-white mb-2">${dateStr}</h4>
                    <div class="space-y-2">
            `;
            
            meals.forEach(meal => {
                // Use string concatenation instead of template strings to avoid truncation issues
                const recipeId = meal.recipe_id;
                const mealType = meal.meal_type;
                const mealId = meal.id;
                
                // Clean inheritance: Get recipe name from recipe database via recipe_id
                const recipeName = this.getMealDisplayName(meal);
                
                if (recipeName === 'Unknown Recipe') {
                    console.warn(`🚨 No recipe name found for meal ${mealId} (recipe_id: ${recipeId})`);
                }
                
                const servings = meal.servings || 4;
                
                mealsHTML += '<div class="flex items-center justify-between bg-white dark:bg-gray-600 rounded p-3 border border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer transition-colors" ' +
                    'onclick="window.app.viewScheduledMeal(' + recipeId + ', \'' + mealType + '\', \'' + mealId + '\')" ' +
                    'title="Click to view recipe details">' +
                    '<div>' +
                        '<div class="font-medium text-gray-900 dark:text-white">' + recipeName + '</div>' +
                        '<div class="text-sm text-gray-500 dark:text-gray-400">' + meal.meal_type + ' • ' + servings + ' servings</div>' +
                    '</div>' +
                    '<div class="text-gray-400 dark:text-gray-300">' +
                        '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>' +
                        '</svg>' +
                    '</div>' +
                '</div>';
            });
            
            mealsHTML += `
                    </div>
                </div>
            `;
        });
        
        mealsContainer.innerHTML = mealsHTML;
        console.log(`📅 Updated Menu tab with ${scheduledMeals.length} meals for ${weeks} week(s)`);
        console.log(`📅 Menu date range: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
        
        // Update grocery list AFTER menu page is updated to ensure proper synchronization
        // This ensures the grocery list reflects the actual scheduled meals shown on the menu page
        // Use a small delay to ensure DOM is fully updated before updating grocery list
        setTimeout(() => {
            if (window.groceryListManager && window.groceryListManager.updateDateRange) {
                window.groceryListManager.updateDateRange(startDate, endDate);
                console.log('🛒 Grocery list updated after menu page display');
            }
        }, 50);
        
        // Debug: Detailed Menu tab meal analysis
        console.log(`🔍 DETAILED MENU TAB ANALYSIS:`);
        console.log(`📊 Total meals found in Menu tab: ${scheduledMeals.length}`);
        scheduledMeals.forEach((meal, index) => {
            // Use same recipe name lookup logic as the display code for consistency
            // Clean inheritance: All recipe data comes from recipe_id lookup
            const recipeName = this.getMealDisplayName(meal);
            console.log(`  ${index + 1}. ${recipeName} on ${new Date(meal.date).toLocaleDateString()} (ID: ${meal.id})`);
        });
        
        // Debug: Compare with Plan tab data for verification
        if (window.itineraryViews && window.itineraryViews.plan) {
            const planMeals = window.itineraryViews.plan.getScheduledMealsInTimeframe();
            console.log(`🔍 Data sync check - Plan tab has ${planMeals.length} meals, Menu tab has ${scheduledMeals.length} meals`);
            if (planMeals.length !== scheduledMeals.length) {
                console.warn('⚠️ Data mismatch between Plan and Menu tabs!');
                console.log('Plan tab meals:', planMeals.map(m => ({ 
                    name: m.name || m.recipe_name || (m.recipe_id ? 'Recipe ID ' + m.recipe_id : 'Unknown'), 
                    date: m.date, 
                    id: m.id 
                })));
                console.log('Menu tab meals:', scheduledMeals.map(m => ({ 
                    name: m.name || m.recipe_name || (m.recipe_id ? 'Recipe ID ' + m.recipe_id : 'Unknown'), 
                    date: m.date, 
                    id: m.id 
                })));
            } else {
                console.log('✅ Plan and Menu tabs show identical meal counts');
            }
        }
    }

    initializeMealTypeControls(mealType) {
        // Plan Dropdown (only for plan mealType)
        if (mealType === 'plan') {
            const planDropdownBtn = document.getElementById('plan-dropdown-btn');
            const planDropdownMenu = document.getElementById('plan-dropdown-menu');
            const shuffleOption = document.getElementById('plan-shuffle-option');
            const orderedOption = document.getElementById('plan-ordered-option');
            
            console.log(`🔍 Looking for plan dropdown elements:`, {
                dropdownBtn: !!planDropdownBtn,
                dropdownMenu: !!planDropdownMenu,
                shuffleOption: !!shuffleOption,
                orderedOption: !!orderedOption
            });
            
            if (planDropdownBtn && planDropdownMenu && shuffleOption && orderedOption) {
                // Toggle dropdown visibility
                planDropdownBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isHidden = planDropdownMenu.classList.contains('hidden');
                    if (isHidden) {
                        planDropdownMenu.classList.remove('hidden');
                    } else {
                        planDropdownMenu.classList.add('hidden');
                    }
                    console.log(`🔽 Plan dropdown toggled: ${isHidden ? 'opened' : 'closed'}`);
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!planDropdownBtn.contains(e.target) && !planDropdownMenu.contains(e.target)) {
                        planDropdownMenu.classList.add('hidden');
                    }
                });
                
                // Shuffle option (current auto plan functionality)
                shuffleOption.addEventListener('click', () => {
                    console.log(`🎲 Shuffle option selected for ${mealType}`);
                    planDropdownMenu.classList.add('hidden');
                    this.enableMealSpacingSlider(); // Enable spacing for shuffle mode
                    this.handleAutoPlan(mealType); // Use existing auto plan logic
                });
                
                // Ordered option (new functionality)
                orderedOption.addEventListener('click', () => {
                    console.log(`📋 Ordered option selected for ${mealType}`);
                    planDropdownMenu.classList.add('hidden');
                    this.disableMealSpacingSlider(); // Disable spacing for ordered mode
                    this.handleOrderedPlan(mealType); // New method for ordered planning
                });
                
                console.log(`✅ Plan dropdown initialized for ${mealType}`);
            } else {
                console.error(`❌ Plan dropdown elements not found in DOM`);
            }
        }

        // Clear Planned button (only for plan mealType)
        if (mealType === 'plan') {
            const clearPlannedBtn = document.getElementById('clear-planned-btn');
            if (clearPlannedBtn) {
                const clearCallback = () => {
                    this.handleClearPlanChanges();
                };
                
                // Use settings manager for clear with safety toggles
                const settingsManager = window.mealPlannerSettings || window.settingsManager;
                if (settingsManager && settingsManager.createClearFiltersHandler) {
                    // Create a mock manager instance for the safety system
                    const mockManager = {
                        hasActiveFilters: () => {
                            // Check if there are plan changes to clear
                            const planMeals = settingsManager.getAuthoritativeData('planScheduledMeals') || [];
                            const menuMeals = settingsManager.getAuthoritativeData('menuScheduledMeals') || [];
                            return planMeals.length > 0 || menuMeals.length > 0;
                        }
                    };
                    
                    const clearHandler = settingsManager.createClearFiltersHandler(
                        clearCallback, 
                        '#clear-planned-btn', 
                        mockManager,
                        'Are you sure you want to clear all planned changes? This will revert to your committed menu.'
                    );
                    clearPlannedBtn.addEventListener('click', clearHandler);
                } else {
                    // Fallback to simple confirm dialog if settings manager not available
                    clearPlannedBtn.addEventListener('click', () => {
                        if (confirm('Are you sure you want to clear all planned changes? This will revert to your committed menu.')) {
                            clearCallback();
                        }
                    });
                }
                console.log('✅ Clear Planned button initialized');
            } else {
                console.warn('⚠️ Clear Planned button not found');
            }
        }
    }

    handleAutoPlan(mealType) {
        console.log(`🤖 Auto planning ${mealType} meals...`);
        console.log(`🔍 Meal rotation engine available:`, !!this.mealRotationEngine);
        console.log(`🔍 Itinerary views:`, Object.keys(this.itineraryViews));
        console.log(`🔍 Looking for itinerary view:`, mealType);
        
        // Check if meal rotation engine is available
        if (!this.mealRotationEngine) {
            console.error('❌ Meal rotation engine not available for auto planning');
            this.showNotification('Meal rotation engine not available. Please refresh the page and try again.', 'error');
            return;
        }

        // Get the current itinerary view for this meal type
        const itineraryView = this.itineraryViews[mealType];
        console.log(`🔍 Found itinerary view for ${mealType}:`, !!itineraryView);
        if (!itineraryView) {
            console.error(`❌ No itinerary view found for ${mealType}`);
            this.showNotification('Meal planning view not available. Please try again.', 'error');
            return;
        }

        // Get pending recipes from the planning queue
        const pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
        if (pendingRecipes.length === 0) {
            this.showNotification('Please add some recipes to the planning queue first using the 📅 button on recipe cards.', 'warning');
            return;
        }

        try {
            // Use pending recipes for auto planning
            let selectedRecipes = pendingRecipes;
            const selectedRecipeIds = pendingRecipes.map(recipe => recipe.id);
            console.log(`🤖 Using ${selectedRecipes.length} recipes from planning queue for auto planning`);

            if (selectedRecipes.length === 0) {
                this.showNotification('Selected recipes could not be found. Please try again.', 'error');
                return;
            }

            // Use the meal rotation engine to generate a plan with selected recipes
            // SCOPE FIX: Use the itinerary view's date range instead of always starting from today
            const weeksToShow = itineraryView.weeksToShow || 4;
            const startDate = itineraryView.startDate || new Date();
            
            // Get auto-plan control values
            const mealsPerWeek = parseInt(document.getElementById('meals-per-week')?.value || '7');
            const mealSpacing = parseInt(document.getElementById('meal-spacing')?.value || '3');
            
            // Calculate end date for logging
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + (weeksToShow * 7) - 1);
            
            console.log(`📅 Auto-plan scope: ${weeksToShow} weeks from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
            console.log(`🎛️ Auto-plan settings: ${mealsPerWeek} meals/week, ${mealSpacing} days spacing`);
            
            // Generate rotation for the specified period using only selected recipes
            const rotation = this.mealRotationEngine.generateRotation(
                startDate, 
                weeksToShow, 
                mealType, 
                { 
                    forceInclude: selectedRecipeIds,
                    availableRecipes: selectedRecipes,
                    constraints: {
                        minDaysBetweenSameRecipe: mealSpacing,
                        mealsPerWeek: mealsPerWeek
                    }
                }
            );
            
            if (rotation && rotation.meals && rotation.meals.length > 0) {
                console.log(`🎯 Auto plan generated ${rotation.meals.length} meals:`, rotation.meals);
                
                // Apply the generated plan to the itinerary view
                this.applyGeneratedPlan(mealType, rotation.meals);
                
                // Clear the pending recipes queue since they've been scheduled
                localStorage.removeItem('mealplanner_pending_recipes');
                
                // Force immediate UI update with empty array to ensure counters reset
                this.updatePlanningQueueInfo([]);
                this.updatePendingRecipes();
                
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

    handleOrderedPlan(mealType) {
        console.log(`📋 Ordered planning ${mealType} meals...`);
        
        // Get the itinerary view for the current meal type
        const itineraryView = this.itineraryViews[mealType];
        if (!itineraryView) {
            this.showNotification('Itinerary view not available. Please refresh the page.', 'error');
            return;
        }

        // Get pending recipes from planning queue
        const pendingRecipes = JSON.parse(localStorage.getItem('mealplanner_pending_recipes') || '[]');
        console.log(`📋 Found ${pendingRecipes.length} recipes in planning queue for ordered planning`);

        if (pendingRecipes.length === 0) {
            this.showNotification('Please add meals to the planning queue first before using ordered planning.', 'warning');
            return;
        }

        try {
            // Get auto-plan control values for constraints
            const mealsPerWeek = parseInt(document.getElementById('meals-per-week')?.value || '7');
            const mealSpacing = parseInt(document.getElementById('meal-spacing')?.value || '3');
            
            // Get date range from itinerary view
            const weeksToShow = itineraryView.weeksToShow || 4;
            const startDate = new Date(itineraryView.startDate || new Date());
            
            // Calculate end date
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + (weeksToShow * 7) - 1);
            
            console.log(`📅 Ordered plan scope: ${weeksToShow} weeks from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
            console.log(`🎛️ Ordered plan settings: ${mealsPerWeek} meals/week, ${mealSpacing} days spacing`);
            
            // Generate ordered meal plan
            const orderedMeals = this.generateOrderedMealPlan(pendingRecipes, startDate, weeksToShow, mealsPerWeek, mealSpacing, mealType);
            
            if (orderedMeals.length === 0) {
                this.showNotification('Could not generate ordered meal plan. Please check your settings and try again.', 'error');
                return;
            }

            // Apply the generated plan
            this.applyGeneratedPlan(mealType, orderedMeals);
            
            // Clear the planning queue after successful planning
            localStorage.setItem('mealplanner_pending_recipes', JSON.stringify([]));
            this.updatePendingRecipes();
            
            // Show success notification
            this.showNotification(`✅ Successfully scheduled ${orderedMeals.length} meals in order from planning queue!`, 'success');
            
            console.log(`✅ Ordered planning completed: ${orderedMeals.length} meals scheduled`);
            
        } catch (error) {
            console.error('❌ Error during ordered planning:', error);
            this.showNotification('An error occurred during ordered planning. Please try again.', 'error');
        }
    }

    generateOrderedMealPlan(recipes, startDate, weeks, mealsPerWeek, mealSpacing, mealType) {
        console.log(`🔄 Generating ordered meal plan with ${recipes.length} recipes`);
        
        const meals = [];
        let recipeIndex = 0;
        
        // Calculate total days to plan
        const totalDays = weeks * 7;
        const currentDate = new Date(startDate);
        
        // Calculate how many meals we need to schedule per week
        const totalMealsNeeded = weeks * mealsPerWeek;
        let mealsScheduled = 0;
        
        console.log(`📊 Planning ${totalMealsNeeded} meals over ${weeks} weeks (${mealsPerWeek} per week) with ${mealSpacing} days spacing`);
        
        // Create a list of days when we should schedule meals, respecting spacing
        const mealDays = [];
        let lastMealDay = -mealSpacing - 1; // Start before the first possible day
        
        for (let week = 0; week < weeks; week++) {
            const weekStartDay = week * 7;
            const weekEndDay = weekStartDay + 6;
            
            // Calculate how many meals we can fit in this week with the given spacing
            const mealsThisWeek = Math.min(mealsPerWeek, Math.floor(7 / (mealSpacing + 1)));
            
            console.log(`📅 Week ${week + 1}: Can fit ${mealsThisWeek} meals with ${mealSpacing} days spacing`);
            
            // Add meal days for this week, respecting spacing
            for (let i = 0; i < mealsThisWeek; i++) {
                // Find the next available day that respects spacing
                let nextMealDay = Math.max(weekStartDay, lastMealDay + mealSpacing + 1);
                
                // If we can't fit this meal in the current week, skip to next week
                if (nextMealDay > weekEndDay) {
                    console.log(`⏭️ Skipping meal ${i + 1} in week ${week + 1} - no space with ${mealSpacing} days spacing`);
                    break;
                }
                
                mealDays.push(nextMealDay);
                lastMealDay = nextMealDay;
                
                console.log(`📅 Added meal day ${nextMealDay} (day ${nextMealDay - weekStartDay + 1} of week ${week + 1})`);
            }
        }
        
        console.log(`📅 Total meal days: ${mealDays.map(d => `Day ${d}`).join(', ')}`);
        
        // Iterate through each meal day and schedule meals in order
        for (const day of mealDays) {
            if (mealsScheduled >= totalMealsNeeded) break;
            if (recipeIndex >= recipes.length) {
                console.log(`🔄 Wrapping around to start of recipe list`);
                recipeIndex = 0;
            }
            
            const dateStr = new Date(startDate.getTime() + day * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const recipe = recipes[recipeIndex];
            
            // Schedule this recipe
            const meal = {
                recipe_id: recipe.id, // Use the actual recipe ID from the pending recipes
                date: dateStr,
                meal_type: mealType,
                notes: recipe.title,
                recipe_title: recipe.title,
                servings: recipe.servings || 4,
                items: recipe.items || []
            };
            
            meals.push(meal);
            mealsScheduled++;
            
            console.log(`📅 Scheduled "${recipe.title}" for ${dateStr} (meal ${mealsScheduled}/${totalMealsNeeded})`);
            
            // Move to next recipe in order
            recipeIndex++;
        }
        
        console.log(`✅ Generated ${meals.length} ordered meals`);
        return meals;
    }

    enableMealSpacingSlider() {
        const mealSpacingSlider = document.getElementById('meal-spacing');
        const mealSpacingValue = document.getElementById('meal-spacing-value');
        const mealSpacingContainer = mealSpacingSlider?.closest('.bg-gray-50');
        const mealSpacingLabel = document.querySelector('label[for="meal-spacing"]');
        
        if (mealSpacingSlider && mealSpacingValue && mealSpacingContainer && mealSpacingLabel) {
            // Enable the slider
            mealSpacingSlider.disabled = false;
            mealSpacingSlider.style.opacity = '1';
            mealSpacingSlider.style.cursor = 'pointer';
            
            // Enable the value display
            mealSpacingValue.style.opacity = '1';
            
            // Reset container styling
            mealSpacingContainer.style.opacity = '1';
            
            // Reset label styling
            mealSpacingLabel.style.opacity = '1';
            mealSpacingLabel.title = '';
            
            console.log('✅ Meal spacing slider enabled for shuffle mode');
        }
    }

    disableMealSpacingSlider() {
        const mealSpacingSlider = document.getElementById('meal-spacing');
        const mealSpacingValue = document.getElementById('meal-spacing-value');
        const mealSpacingContainer = mealSpacingSlider?.closest('.bg-gray-50');
        const mealSpacingLabel = document.querySelector('label[for="meal-spacing"]');
        
        if (mealSpacingSlider && mealSpacingValue && mealSpacingContainer && mealSpacingLabel) {
            // Disable the slider
            mealSpacingSlider.disabled = true;
            mealSpacingSlider.style.opacity = '0.5';
            mealSpacingSlider.style.cursor = 'not-allowed';
            
            // Grey out the value display
            mealSpacingValue.style.opacity = '0.5';
            
            // Grey out the entire container
            mealSpacingContainer.style.opacity = '0.6';
            
            // Grey out the label and add tooltip
            mealSpacingLabel.style.opacity = '0.6';
            mealSpacingLabel.title = 'Disabled in ordered planning mode - meals are scheduled in exact queue order';
            
            console.log('🚫 Meal spacing slider disabled for ordered mode');
        }
    }

    async handleUpdateMenu() {
        console.log('🍽️ Updating Menu from Plan tab scheduled meals...');
        
        try {
            // PLAN VS MENU ARCHITECTURE: Copy prospective schedule (Plan) to committed schedule (Menu)
            if (!window.mealPlannerSettings) {
                this.showNotification('Settings manager not available. Please try again.', 'error');
                return;
            }
            
            // Get all scheduled meals from Plan storage (prospective schedule)
            const planScheduledMeals = window.mealPlannerSettings.getAuthoritativeData('planScheduledMeals') || [];
            console.log(`📅 Found ${planScheduledMeals.length} meals in Plan storage (prospective schedule)`);
            
            // Debug: Log the structure of plan meals to identify any data issues
            if (planScheduledMeals.length > 0) {
                console.log('🔍 Plan meals structure sample:', planScheduledMeals[0]);
                console.log('🔍 Plan meals:', planScheduledMeals.map(m => ({ id: m.id, recipe_id: m.recipe_id, name: this.getMealDisplayName(m) })));
            }
            
            if (planScheduledMeals.length === 0) {
                this.showNotification('No scheduled meals found in Plan. Please use Auto Plan or manually schedule meals first.', 'warning');
                return;
            }
            
            // Copy Plan schedule to Menu storage (commit the prospective schedule)
            window.mealPlannerSettings.saveAuthoritativeData('menuScheduledMeals', planScheduledMeals);
            console.log(`📅 Copied ${planScheduledMeals.length} meals from Plan to Menu storage (committed schedule)`);
            
            // Debug: Verify the copy was successful
            const copiedMeals = window.mealPlannerSettings.getAuthoritativeData('menuScheduledMeals') || [];
            console.log('🔍 Menu meals after copy:', copiedMeals.map(m => ({ id: m.id, recipe_id: m.recipe_id, name: this.getMealDisplayName(m) })));
            
            // Show delta information
            const menuScheduledMeals = window.mealPlannerSettings.getAuthoritativeData('menuScheduledMeals') || [];
            console.log(`📊 Menu now has ${menuScheduledMeals.length} committed meals`);
            
            this.showNotification(`Menu updated! ${planScheduledMeals.length} meals committed to menu.`, 'success');
            
            // Refresh the grocery list manager to reflect the scheduled meals
            if (this.groceryListManager && this.groceryListManager.generateFromScheduledMeals) {
                await this.groceryListManager.generateFromScheduledMeals();
                console.log('🛒 Grocery list updated from scheduled meals');
            }
            
            // Refresh the Menu tab meals display
            this.updateMenuMealsDisplay();
            
            // Show success notification with timeframe-specific count
            if (this.itineraryViews && this.itineraryViews['plan']) {
                const planView = this.itineraryViews['plan'];
                const mealsInTimeframe = planView.getScheduledMealsInTimeframe();
                const timeframeName = planView.weeksToShow === 1 ? 'This week' : `${planView.weeksToShow} weeks`;
                this.showNotification(`Menu updated! ${mealsInTimeframe.length} scheduled meals from ${timeframeName} synced to grocery list.`, 'success');
                console.log(`✅ Menu update completed with ${mealsInTimeframe.length} meals from current timeframe`);
            } else {
                console.log(`✅ Menu update completed with ${planScheduledMeals.length} meals`);
            }
            
        } catch (error) {
            console.error('❌ Error updating menu:', error);
            this.showNotification('Error updating menu. Please try again.', 'error');
        }
    }

    handleClearPlanChanges() {
        console.log('🗑️ Clearing Plan changes - reverting to Menu schedule...');
        
        try {
            if (!window.mealPlannerSettings) {
                this.showNotification('Settings manager not available. Please try again.', 'error');
                return;
            }
            
            // Get current Menu schedule (committed schedule)
            const menuScheduledMeals = window.mealPlannerSettings.getAuthoritativeData('menuScheduledMeals') || [];
            console.log(`📅 Found ${menuScheduledMeals.length} meals in Menu storage (committed schedule)`);
            
            // Copy Menu schedule back to Plan storage (discard prospective changes)
            window.mealPlannerSettings.saveAuthoritativeData('planScheduledMeals', menuScheduledMeals);
            console.log(`📅 Copied ${menuScheduledMeals.length} meals from Menu to Plan storage (discarded changes)`);
            
            this.showNotification(`Plan changes cleared! Reverted to menu with ${menuScheduledMeals.length} meals.`, 'success');
            
            // Update delta comparison display
            this.updatePlanMenuDelta();
            
            // Refresh all components to show reverted data
            this.refreshAllComponents();
            
        } catch (error) {
            console.error('Error clearing plan changes:', error);
            this.showNotification('Error clearing plan changes. Please try again.', 'error');
        }
    }

    initializeDeltaViewToggle() {
        const diffBtn = document.getElementById('delta-view-diff');
        const setBtn = document.getElementById('delta-view-set');
        
        if (diffBtn && setBtn) {
            diffBtn.addEventListener('click', () => this.toggleDeltaView('diff'));
            setBtn.addEventListener('click', () => this.toggleDeltaView('set'));
        }
    }
    
    toggleDeltaView(viewType) {
        const diffBtn = document.getElementById('delta-view-diff');
        const setBtn = document.getElementById('delta-view-set');
        const diffView = document.getElementById('delta-diff-view');
        const setView = document.getElementById('delta-set-view');
        const mealCounts = document.getElementById('delta-meal-counts');
        
        if (viewType === 'diff') {
            // Show diff view
            if (diffView) diffView.classList.remove('hidden');
            if (setView) setView.classList.add('hidden');
            // Keep meal counts visible and opaque
            if (mealCounts) {
                mealCounts.classList.remove('opacity-0');
                mealCounts.classList.add('opacity-100');
            }
            
            // Update button styles
            if (diffBtn) {
                diffBtn.className = 'px-3 py-1 text-xs font-medium rounded-md transition-colors bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm';
            }
            if (setBtn) {
                setBtn.className = 'px-3 py-1 text-xs font-medium rounded-md transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white';
            }
        } else {
            // Show set view
            if (diffView) diffView.classList.add('hidden');
            if (setView) setView.classList.remove('hidden');
            // Keep meal counts space but make content invisible
            if (mealCounts) {
                mealCounts.classList.remove('opacity-100');
                mealCounts.classList.add('opacity-0');
            }
            
            // Update button styles
            if (setBtn) {
                setBtn.className = 'px-3 py-1 text-xs font-medium rounded-md transition-colors bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm';
            }
            if (diffBtn) {
                diffBtn.className = 'px-3 py-1 text-xs font-medium rounded-md transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white';
            }
            
            // Update the set view content
            this.updateDeltaSetView();
        }
    }
    
    updateDeltaSetView() {
        console.log('📊 Updating Set view (final outcome)...');
        
        try {
            if (!window.mealPlannerSettings) {
                console.warn('Settings manager not available for set view');
                return;
            }
            
            // Get the date range from the plan itinerary view
            const planItineraryView = this.itineraryViews?.plan;
            let startDate, endDate;
            
            if (planItineraryView && planItineraryView.startDate && planItineraryView.weeksToShow) {
                startDate = new Date(planItineraryView.startDate);
                endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + (planItineraryView.weeksToShow * 7) - 1);
            }
            
            // Get the final planned meals (what the menu will become)
            const allPlanMeals = window.mealPlannerSettings.getAuthoritativeData('planScheduledMeals') || [];
            let planMeals = allPlanMeals;
            
            if (startDate && endDate) {
                const filterByDateRange = (meals) => meals.filter(meal => {
                    if (!meal.date) return false;
                    const mealDate = new Date(meal.date);
                    const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
                    const startDateNormalized = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                    const endDateNormalized = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                    return mealDateNormalized >= startDateNormalized && mealDateNormalized <= endDateNormalized;
                });
                
                planMeals = filterByDateRange(allPlanMeals);
            }
            
            // Group meals by date
            const mealsByDate = {};
            planMeals.forEach(meal => {
                const dateKey = meal.date;
                if (!mealsByDate[dateKey]) {
                    mealsByDate[dateKey] = [];
                }
                mealsByDate[dateKey].push(meal);
            });
            
            // Sort dates
            const sortedDates = Object.keys(mealsByDate).sort();
            
            // Populate the set view
            const setMealSchedule = document.getElementById('set-meal-schedule');
            if (setMealSchedule) {
                if (sortedDates.length === 0) {
                    setMealSchedule.innerHTML = `
                        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                            <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p class="font-medium">No meals planned</p>
                            <p class="text-sm">Add recipes to your planning queue and use the Plan button to schedule meals.</p>
                        </div>
                    `;
                } else {
                    setMealSchedule.innerHTML = sortedDates.map(dateKey => {
                        const meals = mealsByDate[dateKey];
                        const date = new Date(dateKey);
                        const formattedDate = date.toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'short', 
                            day: 'numeric' 
                        });
                        
                        return `
                            <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-3">
                                    <h5 class="font-semibold text-gray-900 dark:text-white">${formattedDate}</h5>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">${meals.length} meal${meals.length !== 1 ? 's' : ''}</span>
                                </div>
                                <div class="space-y-2">
                                    ${meals.map(meal => `
                                        <div class="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                            <span class="font-medium text-gray-900 dark:text-white">${this.getMealDisplayName(meal)}</span>
                                            <span class="text-xs text-gray-500 dark:text-gray-400 capitalize">${meal.meal_type || 'meal'}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }
            
        } catch (error) {
            console.error('Error updating set view:', error);
        }
    }

    updatePlanMenuDelta() {
        console.log('📊 Updating Plan vs Menu delta comparison...');
        
        try {
            if (!window.mealPlannerSettings) {
                console.warn('Settings manager not available for delta comparison');
                return;
            }
            
            // Get the date range from the plan itinerary view to scope the delta comparison
            const planItineraryView = this.itineraryViews?.plan;
            let startDate, endDate;
            
            if (planItineraryView && planItineraryView.startDate && planItineraryView.weeksToShow) {
                startDate = new Date(planItineraryView.startDate);
                endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + (planItineraryView.weeksToShow * 7) - 1);
                console.log(`📊 Delta comparison scoped to: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
            } else {
                console.warn('📊 No date range available from plan itinerary view, comparing all meals');
            }
            
            // Get Plan and Menu schedules
            const allPlanMeals = window.mealPlannerSettings.getAuthoritativeData('planScheduledMeals') || [];
            const allMenuMeals = window.mealPlannerSettings.getAuthoritativeData('menuScheduledMeals') || [];
            
            // Use meals directly with consistent object reference structure
            let planMeals = allPlanMeals;
            let menuMeals = allMenuMeals;
            
            if (startDate && endDate) {
                const filterByDateRange = (meals) => meals.filter(meal => {
                    if (!meal.date) return false;
                    const mealDate = new Date(meal.date);
                    const mealDateNormalized = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
                    const startDateNormalized = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                    const endDateNormalized = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                    return mealDateNormalized >= startDateNormalized && mealDateNormalized <= endDateNormalized;
                });
                
                planMeals = filterByDateRange(allPlanMeals);
                menuMeals = filterByDateRange(allMenuMeals);
                console.log(`📊 Filtered to date range - Plan: ${planMeals.length}/${allPlanMeals.length} meals, Menu: ${menuMeals.length}/${allMenuMeals.length} meals`);
            } else {
                console.log(`📊 Plan has ${planMeals.length} meals, Menu has ${menuMeals.length} meals (all meals, no date filter)`);
            }
            
            // Calculate delta
            const planMealIds = new Set(planMeals.map(m => `${m.recipe_id}-${m.date}-${m.meal_type}`));
            const menuMealIds = new Set(menuMeals.map(m => `${m.recipe_id}-${m.date}-${m.meal_type}`));
            
            const mealsToAdd = planMeals.filter(m => !menuMealIds.has(`${m.recipe_id}-${m.date}-${m.meal_type}`));
            const mealsToRemove = menuMeals.filter(m => !planMealIds.has(`${m.recipe_id}-${m.date}-${m.meal_type}`));
            
            console.log(`📊 Delta (scoped): ${mealsToAdd.length} to add, ${mealsToRemove.length} to remove`);
            
            // Update UI with improved visual design
            const deltaContainer = document.getElementById('plan-menu-delta');
            const deltaMealCounts = document.getElementById('delta-meal-counts');
            const deltaAdditions = document.getElementById('delta-additions');
            const deltaRemovals = document.getElementById('delta-removals');
            const additionsCount = document.getElementById('additions-count');
            const removalsCount = document.getElementById('removals-count');
            const additionsList = document.getElementById('additions-list');
            const removalsList = document.getElementById('removals-list');
            const deltaSummary = document.getElementById('delta-summary');
            
            // Always show delta container
            if (deltaContainer) deltaContainer.classList.remove('hidden');
            
            if (mealsToAdd.length === 0 && mealsToRemove.length === 0) {
                // No changes - show "no changes" message
                if (deltaMealCounts) {
                    const currentMenuCount = menuMeals.length;
                    const plannedCount = planMeals.length;
                    deltaMealCounts.innerHTML = `<span class="font-medium">${currentMenuCount}</span> → <span class="font-medium">${plannedCount}</span> meals`;
                }
                
                // Hide additions and removals sections
                if (deltaAdditions) deltaAdditions.classList.add('hidden');
                if (deltaRemovals) deltaRemovals.classList.add('hidden');
                
                // Show "no changes" message
                if (deltaSummary) {
                    deltaSummary.innerHTML = `<span class="text-gray-500 dark:text-gray-400">No changes between plan and menu</span>`;
                }
            } else {
                // Show changes
                
                // Update meal count context (before/after)
                if (deltaMealCounts) {
                    const currentMenuCount = menuMeals.length;
                    const plannedCount = planMeals.length;
                    deltaMealCounts.innerHTML = `<span class="font-medium">${currentMenuCount}</span> → <span class="font-medium">${plannedCount}</span> meals`;
                }
                
                // Handle additions (green)
                if (mealsToAdd.length > 0) {
                    if (deltaAdditions) deltaAdditions.classList.remove('hidden');
                    if (additionsCount) additionsCount.textContent = mealsToAdd.length;
                    if (additionsList) {
                        additionsList.innerHTML = mealsToAdd.map(meal => {
                            const date = new Date(meal.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                            });
                            // Get recipe name using consistent object reference structure
                            const recipeName = this.getMealDisplayName(meal);
                            return `<div class="flex justify-between items-center">
                                <span class="font-medium">${recipeName}</span>
                                <span class="text-xs opacity-75">${date}</span>
                            </div>`;
                        }).join('');
                    }
                } else {
                    if (deltaAdditions) deltaAdditions.classList.add('hidden');
                }
                
                // Handle removals (red)
                if (mealsToRemove.length > 0) {
                    if (deltaRemovals) deltaRemovals.classList.remove('hidden');
                    if (removalsCount) removalsCount.textContent = mealsToRemove.length;
                    if (removalsList) {
                        removalsList.innerHTML = mealsToRemove.map(meal => {
                            const date = new Date(meal.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                            });
                            // Get recipe name using consistent object reference structure
                            const recipeName = this.getMealDisplayName(meal);
                            return `<div class="flex justify-between items-center">
                                <span class="font-medium">${recipeName}</span>
                                <span class="text-xs opacity-75">${date}</span>
                            </div>`;
                        }).join('');
                    }
                } else {
                    if (deltaRemovals) deltaRemovals.classList.add('hidden');
                }
                
                // Update summary
                if (deltaSummary) {
                    let summaryParts = [];
                    if (mealsToAdd.length > 0) {
                        summaryParts.push(`<span class="text-green-600 dark:text-green-400 font-medium">+${mealsToAdd.length}</span>`);
                    }
                    if (mealsToRemove.length > 0) {
                        summaryParts.push(`<span class="text-red-600 dark:text-red-400 font-medium">-${mealsToRemove.length}</span>`);
                    }
                    
                    const netChange = mealsToAdd.length - mealsToRemove.length;
                    const netChangeText = netChange > 0 ? 
                        `<span class="text-green-600 dark:text-green-400">+${netChange} net</span>` :
                        netChange < 0 ? 
                        `<span class="text-red-600 dark:text-red-400">${netChange} net</span>` :
                        `<span class="text-gray-500">No net change</span>`;
                    
                    deltaSummary.innerHTML = `${summaryParts.join(' ')} (${netChangeText})`;
                }
            }
            
        } catch (error) {
            console.error('Error updating delta comparison:', error);
        }
    }

    // Navigation method for viewing scheduled meals from Menu tab
    viewScheduledMeal(recipeId, mealType, scheduledMealId) {
        console.log(`🍽️ Viewing scheduled meal: Recipe ${recipeId}, Type: ${mealType}, Scheduled ID: ${scheduledMealId}`);
        
        if (!window.recipeManager) {
            console.error('❌ Recipe manager not available');
            return;
        }
        
        // Set up navigation stack to return to Menu tab
        if (window.recipeManager.navigationStack) {
            // Clear any existing navigation stack to ensure clean return
            window.recipeManager.navigationStack = [];
        }
        
        // Store current Menu tab state for return navigation
        const currentMenuContent = document.getElementById('menu-tab').innerHTML;
        if (window.recipeManager.navigationStack) {
            window.recipeManager.navigationStack.push({
                container: currentMenuContent,
                scrollPosition: window.scrollY,
                returnTab: 'menu', // Custom property to indicate return destination
                scheduledMealId: scheduledMealId // Store for potential updates
            });
        }
        
        // Navigate to recipe detail view
        window.recipeManager.showRecipeDetail(recipeId);
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
            // PLAN VS MENU ARCHITECTURE: Save to Plan storage (prospective schedule)
            // Plan tab shows working schedule, Menu tab shows committed schedule
            let scheduledMeals = [];
            if (window.mealPlannerSettings) {
                scheduledMeals = window.mealPlannerSettings.getAuthoritativeData('planScheduledMeals') || [];
                console.log(`📖 Reading ${scheduledMeals.length} existing PLAN scheduled meals from authoritative source`);
            }
            
            // Remove existing meals of this type (to avoid duplicates)
            scheduledMeals = scheduledMeals.filter(meal => meal.meal_type !== mealType);
            
            // Convert generated meals to proper scheduled meal format
            const newScheduledMeals = meals.map((meal, index) => {
                // Handle meal rotation engine format where recipe is nested in meal.recipe
                const recipe = meal.recipe || meal;
                const recipeId = meal.recipe_id || recipe.id || meal.id;
                const recipeName = this.getMealDisplayName(meal);
                
                const scheduledMeal = {
                    id: `${mealType}-${Date.now()}-${index}`,
                    recipe_id: recipeId, // Single source of truth for recipe reference
                    meal_type: mealType,
                    date: meal.date instanceof Date ? meal.date.toISOString().split('T')[0] : meal.date,
                    servings: meal.servings || recipe.servings || 4,
                    created_at: new Date().toISOString()
                    // All other properties (title, description, items, etc.) inherited via recipe_id lookup
                };
                
                console.log(`📅 Creating scheduled meal ${index + 1}:`, {
                    originalMeal: meal,
                    extractedRecipe: recipe,
                    finalScheduledMeal: scheduledMeal
                });
                return scheduledMeal;
            });
            
            // Add new meals to the schedule
            scheduledMeals.push(...newScheduledMeals);
            
            // Save to the PLAN authoritative data source (prospective schedule)
            if (window.mealPlannerSettings) {
                window.mealPlannerSettings.saveAuthoritativeData('planScheduledMeals', scheduledMeals);
                console.log(`💾 Saved ${scheduledMeals.length} meals to PLAN authoritative data source`);
                
                // Dispatch events for each new meal to trigger grocery list updates
                newScheduledMeals.forEach(meal => {
                    document.dispatchEvent(new CustomEvent('mealScheduled', {
                        detail: { 
                            scheduledMeal: meal,
                            mealType: mealType
                        }
                    }));
                });
            } else {
                console.error('❌ Cannot save scheduled meals - settings manager not available');
                throw new Error('Settings manager not available for saving scheduled meals');
            }
            
            console.log(`✅ Applied ${newScheduledMeals.length} ${mealType} meals to schedule`);
            console.log(`📊 Total scheduled meals after save:`, scheduledMeals.length);
            console.log(`📊 Scheduled meals data:`, scheduledMeals);
            
            // Notify schedule manager if available to reload from the updated authoritative data
            if (window.scheduleManager && window.scheduleManager.loadScheduledMeals) {
                window.scheduleManager.loadScheduledMeals();
                console.log(`🔄 Notified schedule manager to reload data`);
                console.log(`📊 Schedule manager now has ${window.scheduleManager.scheduledMeals.length} total meals`);
            }
            
            // Refresh views to show the new meals
            this.refreshMealPlanViews();
            
            // Force refresh the plan itinerary view specifically
            if (this.itineraryViews['plan']) {
                console.log('🔄 Force refreshing plan itinerary view');
                this.itineraryViews['plan'].forceRefresh();
            }
            
            // Update delta view if this is the plan tab
            if (mealType === 'plan') {
                console.log('📊 Updating delta view after applying generated plan');
                this.updatePlanMenuDelta();
            }
            
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
            
            // Update delta view if this is the plan tab
            if (mealType === 'plan') {
                console.log('📊 Updating delta view after clearing plan data');
                this.updatePlanMenuDelta();
            }
            
        } catch (error) {
            console.error('Error clearing meal plan data:', error);
            throw error;
        }
    }

    async clearAllData() {
        console.log('🗑️ COMPREHENSIVE CLEAR: Clearing ALL application data and preventing demo auto-population...');
        
        try {
            // STEP 1: Use SettingsManager comprehensive clear to handle localStorage and flags
            if (window.mealPlannerSettings) {
                const success = window.mealPlannerSettings.clearAllData();
                if (!success) {
                    throw new Error('SettingsManager clearAllData failed');
                }
            }
            
            // STEP 2: Clear all manager in-memory data and UI caches
            if (this.itemsManager) {
                await this.itemsManager.clearAllData();
            }
            
            if (this.recipeManager) {
                await this.recipeManager.clearAllData();
                // CRITICAL: Clear RecipeManager items cache to prevent demo data pollution
                this.recipeManager.items = [];
                console.log('🔄 CLEARED RecipeManager items cache');
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
            
            // STEP 3: Clear local app state and UI caches
            this.selectedRecipes = {
                plan: []
            };
            
            // Clear favorites
            this.favoriteRecipes = new Set();
            this.saveFavoriteRecipes();
            
            // Clear meal rotation engine
            if (this.mealRotationEngine) {
                this.mealRotationEngine.clearAllData();
            }
            
            // STEP 4: Force refresh all components to show empty state
            await this.refreshAllComponents();
            
            // MENU TAB FIX: Explicitly refresh menu meals display after clearing data
            // The refreshAllComponents() method doesn't call updateMenuMealsDisplay()
            // which is needed to refresh the Menu tab's scheduled meals display
            this.updateMenuMealsDisplay();
            
            console.log('✅ COMPREHENSIVE CLEAR completed successfully');
            console.log('🚫 Demo data auto-population PREVENTED - will only load on explicit user reset');
            
        } catch (error) {
            console.error('❌ Error in comprehensive clear:', error);
            throw error;
        }
    }

    // Get scheduled meals from authoritative source
    getScheduledMeals() {
        if (window.mealPlannerSettings) {
            return window.mealPlannerSettings.getAuthoritativeData('scheduledMeals');
        }
        
        console.warn('⚠️ Settings manager not available, returning empty scheduled meals');
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
            
            // Dispatch event for other components to update (like grocery list)
            const removedCount = originalCount - scheduledMeals.length;
            if (removedCount > 0) {
                document.dispatchEvent(new CustomEvent('mealUnscheduled', {
                    detail: { 
                        mealId: mealId,
                        date: dateStr,
                        mealType: mealType,
                        removedCount: removedCount
                    }
                }));
            }
            
            console.log(`✅ Removed ${removedCount} meal(s) from schedule`);
            
            return true;
        } catch (error) {
            console.error('Error removing meal from schedule:', error);
            return false;
        }
    }

    // Refresh all meal plan related views
    async refreshMealPlanViews() {
        console.log('🔄 Refreshing all meal plan views...');
        
        // Refresh itinerary views
        Object.entries(this.itineraryViews).forEach(([mealType, view]) => {
            if (view && view.render) {
                console.log(`🔄 Refreshing ${mealType} itinerary view`);
                view.render();
            } else {
                console.warn(`⚠️ ${mealType} itinerary view not available for refresh`);
            }
        });
        
        // Refresh calendar views
        Object.entries(this.calendarViews).forEach(([mealType, view]) => {
            if (view && view.render) {
                console.log(`🔄 Refreshing ${mealType} calendar view`);
                view.render();
            } else {
                console.warn(`⚠️ ${mealType} calendar view not available for refresh`);
            }
        });
        
        console.log('✅ Meal plan views refresh completed');
        
        // Refresh grocery list to reflect scheduled meal changes
        if (this.groceryListManager && this.groceryListManager.generateFromScheduledMeals) {
            await this.groceryListManager.generateFromScheduledMeals();
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
        
        console.log(`Switched plan to ${newView} view`);
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
                        <input type="checkbox" id="include-items" class="text-blue-600">
                        <span>Include items in event descriptions</span>
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
                const includeItems = modal.querySelector('#include-items').checked;
                const includeInstructions = modal.querySelector('#include-instructions').checked;
                
                // Update managed mode
                this.googleCalendarIntegration.setManagedMode(selectedMode === 'managed');
                
                // Sync meal plan
                await this.syncMealPlanToCalendar({
                    includeItems,
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

    async handleDataSourceChange(sourceType) {
        console.log(`🗄️ Data source changed to: ${sourceType}`);
        
        switch (sourceType) {
            case 'demo':
                await this.loadDemoData();
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

    async loadDemoData() {
        console.log('📊 Loading demo data...');
        
        // Use the settings manager's loadDemoData method which respects existing data
        if (this.settingsManager) {
            await this.settingsManager.loadDemoData();
        }
        
        // Show notification
        this.showNotification('Demo data loaded! This includes sample recipes, items, and meal plans.', 'success');
        
        // Re-render all components with demo data
        await this.refreshAllComponents();
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
        
        try {
            // Create a blob with the current database state
            const dbData = this.getCurrentDatabaseData();
            const blob = new Blob([dbData], { type: 'application/json' });
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mealplanner-export-${new Date().toISOString().split('T')[0]}.json`;
            a.style.display = 'none';
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Database exported successfully!', 'success');
        } catch (error) {
            console.error('❌ Error exporting database:', error);
            this.showNotification('Error exporting database. Please try again.', 'error');
        }
    }

    handleImportDatabase() {
        console.log('📥 Opening file picker for import...');
        
        // Trigger the hidden file input
        const fileInput = document.getElementById('import-file-input');
        if (fileInput) {
            fileInput.click();
        } else {
            this.showNotification('Import functionality not available.', 'error');
        }
    }

    async handleImportFile(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        console.log('📥 Importing file:', file.name);

        try {
            // Read the file content
            const fileContent = await this.readFileAsText(file);
            
            // Parse the JSON
            const importData = JSON.parse(fileContent);
            
            // Validate the import data structure
            if (!this.validateImportData(importData)) {
                this.showNotification('Invalid import file format. Please use a valid MealPlanner export file.', 'error');
                return;
            }

            // Confirm import with user
            const confirmed = await this.confirmImport(importData);
            if (!confirmed) {
                return;
            }

            // Import the data
            await this.importDataToLocalStorage(importData);
            
            // Refresh all components to reflect the new data
            await this.refreshAllComponents();
            
            this.showNotification('Database imported successfully! All data has been refreshed.', 'success');
            
        } catch (error) {
            console.error('❌ Error importing database:', error);
            this.showNotification('Error importing database. Please check the file format and try again.', 'error');
        } finally {
            // Reset the file input
            event.target.value = '';
        }
    }

    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }

    validateImportData(data) {
        // Check if it's a valid MealPlanner export
        if (!data || typeof data !== 'object') {
            return false;
        }

        // Check for required fields
        if (!data.version || !data.exported || !data.schema || !data.data) {
            return false;
        }

        // Check if schema structure matches expected format
        const expectedSchemaKeys = [
            'items', 'recipes', 'combos', 'scheduledMeals', 
            'planScheduledMeals', 'menuScheduledMeals', 'pantryItems',
            'groceryList', 'demoDataPopulated', 'mealPreferences',
            'favoriteRecipes', 'settings'
        ];

        const schemaKeys = Object.keys(data.schema);
        const hasRequiredKeys = expectedSchemaKeys.every(key => schemaKeys.includes(key));

        return hasRequiredKeys;
    }

    async confirmImport(importData) {
        // Show confirmation dialog with import details
        const itemCount = importData.data.items?.length || 0;
        const recipeCount = importData.data.recipes?.length || 0;
        const comboCount = importData.data.combos?.length || 0;
        const mealCount = importData.data.scheduledMeals?.length || 0;
        
        const message = `Import data from ${importData.exported}?\n\n` +
                       `Items: ${itemCount}\n` +
                       `Recipes: ${recipeCount}\n` +
                       `Combos: ${comboCount}\n` +
                       `Scheduled Meals: ${mealCount}\n\n` +
                       `This will replace all current data. Continue?`;

        return confirm(message);
    }

    async importDataToLocalStorage(importData) {
        console.log('📥 Importing data using authoritative data source...');
        
        // Use the authoritative data source system for consistency
        if (!window.mealPlannerSettings) {
            throw new Error('Settings manager not available for import');
        }

        // Clear existing data first by saving empty arrays to authoritative source
        const dataTypes = ['items', 'recipes', 'meals', 'scheduledMeals', 'planScheduledMeals', 'menuScheduledMeals', 'pantryItems'];
        dataTypes.forEach(dataType => {
            window.mealPlannerSettings.saveAuthoritativeData(dataType, []);
        });

        // Import new data using the authoritative system
        // The export structure has a 'data' object with the actual data arrays
        Object.keys(importData.data).forEach(key => {
            const value = importData.data[key];
            
            if (value !== null && value !== undefined && Array.isArray(value)) {
                // Use the key directly as the data type (items, recipes, etc.)
                // The export already uses the correct naming convention
                window.mealPlannerSettings.saveAuthoritativeData(key, value);
                console.log(`✅ Imported ${key}: ${value.length} items via authoritative source`);
            } else if (value !== null && value !== undefined) {
                // Handle non-array values (like demoDataPopulated flag)
                // These should be saved directly to localStorage since they're not managed by authoritative source
                const storageKey = importData.schema[key];
                if (storageKey) {
                    localStorage.setItem(storageKey, JSON.stringify(value));
                    console.log(`✅ Imported ${key}: ${value} to localStorage`);
                }
            }
        });

        console.log('✅ Data import completed using authoritative data source');
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
        
        modal.addEventListener('modal-action', async (e) => {
            if (e.detail.action === 'demo') {
                document.getElementById('data-source-select').value = 'demo';
                await this.loadDemoData();
            }
        });
    }

    loadDatabaseFile(file) {
        console.log(`📂 Loading database file: ${file.name}`);
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                // In a real implementation, this would parse the SQLite file
                console.log('Database file loaded:', e.target.result.byteLength, 'bytes');
                this.showNotification(`Database "${file.name}" loaded successfully!`, 'success');
                await this.refreshAllComponents();
            } catch (error) {
                console.error('Error loading database file:', error);
                this.showNotification('Error loading database file. Please check the file format.', 'error');
                // Reset to demo data
                document.getElementById('data-source-select').value = 'demo';
            }
        };
        reader.readAsArrayBuffer(file);
    }

    async createDatabaseFile(name, path) {
        console.log(`🆕 Creating database: ${name} at ${path}`);
        
        // In a real implementation, this would create a new SQLite database
        this.showNotification(`New database "${name}" created successfully!`, 'success');
        await this.refreshAllComponents();
    }

    getCurrentDatabaseData() {
        // Export all localStorage data in a schema-complete JSON object
        const exportData = {
            version: this.version,
            exported: new Date().toISOString(),
            schema: {
                items: 'mealplanner_items',
                recipes: 'mealplanner_recipes', 
                combos: 'mealplanner_combos',
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
            data: {}
        };

        // Export all localStorage data
        Object.keys(exportData.schema).forEach(key => {
            const storageKey = exportData.schema[key];
            const value = localStorage.getItem(storageKey);
            if (value) {
                try {
                    exportData.data[key] = JSON.parse(value);
                } catch (e) {
                    // If not JSON, store as string
                    exportData.data[key] = value;
                }
            } else {
                exportData.data[key] = null;
            }
        });

        return JSON.stringify(exportData, null, 2);
    }

    handleExportDatabase() {
        console.log('💾 Exporting database...');
        
        try {
            // Create a blob with the current database state
            const dbData = this.getCurrentDatabaseData();
            const blob = new Blob([dbData], { type: 'application/json' });
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mealplanner-export-${new Date().toISOString().split('T')[0]}.json`;
            a.style.display = 'none';
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Database exported successfully!', 'success');
        } catch (error) {
            console.error('❌ Error exporting database:', error);
            this.showNotification('Error exporting database. Please try again.', 'error');
        }
    }

    handleImportDatabase() {
        console.log('📥 Opening file picker for import...');
        
        // Trigger the hidden file input
        const fileInput = document.getElementById('import-file-input');
        if (fileInput) {
            fileInput.click();
        } else {
            this.showNotification('Import functionality not available.', 'error');
        }
    }

    async handleImportFile(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        console.log('📥 Importing file:', file.name);

        try {
            // Read the file content
            const fileContent = await this.readFileAsText(file);
            
            // Parse the JSON
            const importData = JSON.parse(fileContent);
            
            // Validate the import data structure
            if (!this.validateImportData(importData)) {
                this.showNotification('Invalid import file format. Please use a valid MealPlanner export file.', 'error');
                return;
            }

            // Confirm import with user
            const confirmed = await this.confirmImport(importData);
            if (!confirmed) {
                return;
            }

            // Import the data
            await this.importDataToLocalStorage(importData);
            
            // Refresh all components to reflect the new data
            await this.refreshAllComponents();
            
            this.showNotification('Database imported successfully! All data has been refreshed.', 'success');
            
        } catch (error) {
            console.error('❌ Error importing database:', error);
            this.showNotification('Error importing database. Please check the file format and try again.', 'error');
        } finally {
            // Reset the file input
            event.target.value = '';
        }
    }

    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }

    validateImportData(data) {
        // Check if it's a valid MealPlanner export
        if (!data || typeof data !== 'object') {
            return false;
        }

        // Check for required fields
        if (!data.version || !data.exported || !data.schema || !data.data) {
            return false;
        }

        // Check if schema structure matches expected format
        const expectedSchemaKeys = [
            'items', 'recipes', 'combos', 'scheduledMeals', 
            'planScheduledMeals', 'menuScheduledMeals', 'pantryItems',
            'groceryList', 'demoDataPopulated', 'mealPreferences',
            'favoriteRecipes', 'settings'
        ];

        const schemaKeys = Object.keys(data.schema);
        const hasRequiredKeys = expectedSchemaKeys.every(key => schemaKeys.includes(key));

        return hasRequiredKeys;
    }

    async confirmImport(importData) {
        // Show confirmation dialog with import details
        const itemCount = importData.data.items?.length || 0;
        const recipeCount = importData.data.recipes?.length || 0;
        const comboCount = importData.data.combos?.length || 0;
        const mealCount = importData.data.scheduledMeals?.length || 0;
        
        const message = `Import data from ${importData.exported}?\n\n` +
                       `Items: ${itemCount}\n` +
                       `Recipes: ${recipeCount}\n` +
                       `Combos: ${comboCount}\n` +
                       `Scheduled Meals: ${mealCount}\n\n` +
                       `This will replace all current data. Continue?`;

        return confirm(message);
    }

    async importDataToLocalStorage(importData) {
        console.log('📥 Importing data to localStorage...');
        
        // Clear existing data first
        Object.values(importData.schema).forEach(storageKey => {
            localStorage.removeItem(storageKey);
        });

        // Import new data
        Object.keys(importData.schema).forEach(key => {
            const storageKey = importData.schema[key];
            const value = importData.data[key];
            
            if (value !== null && value !== undefined) {
                if (typeof value === 'object') {
                    localStorage.setItem(storageKey, JSON.stringify(value));
                } else {
                    localStorage.setItem(storageKey, value);
                }
                console.log(`✅ Imported ${key}: ${Array.isArray(value) ? value.length : '1'} items`);
            }
        });

        console.log('✅ Data import completed');
    }

    async refreshAllComponents() {
        console.log('🔄 Refreshing all components...');
        console.log('🔄 RecipeManager available:', !!this.recipeManager);
        console.log('🔄 ItemsManager available:', !!this.itemsManager);
        console.log('🔄 MealManager available:', !!this.mealManager);
        
        // IMPORT/EXPORT FIX: Reload data before rendering to ensure UI reflects imported data
        // This fixes the issue where imported data exists in localStorage but UI doesn't display it
        // Note: loadRecipes() and loadItems() already call render(), so we don't need to call render() again
        // Try both this.recipeManager and window.recipeManager
        const recipeManager = this.recipeManager || window.recipeManager;
        if (recipeManager) {
            console.log('🔄 Calling RecipeManager.loadRecipes()...');
            await recipeManager.loadRecipes();
            console.log('✅ RecipeManager.loadRecipes() completed');
        } else {
            console.warn('⚠️ RecipeManager not available in refreshAllComponents (tried both this.recipeManager and window.recipeManager)');
        }
        if (this.itemsManager) {
            await this.itemsManager.loadItems();
        }
        if (this.mealManager) {
            await this.mealManager.loadRecipes();
            await this.mealManager.loadMeals();
            this.mealManager.render();
        }
        if (this.groceryListManager) {
            // CONSISTENCY FIX: Reload data before rendering to prevent stale cached data
            // This ensures Menu tab shows correct state after clearAllData(), just like other tabs
            await this.groceryListManager.loadData();
            this.groceryListManager.render();
        }
        
        // Force refresh itinerary and calendar views to ensure they reload data from localStorage
        // Use forceRefresh() instead of render() to clear cached state and reload data
        Object.values(this.itineraryViews).forEach(view => {
            if (view.forceRefresh) {
                view.forceRefresh();
            } else {
                view.render();
            }
        });
        Object.values(this.calendarViews).forEach(view => {
            if (view.forceRefresh) {
                view.forceRefresh();
            } else {
                view.render();
            }
        });

        // PLANNING QUEUE COUNTER FIX: Update pending recipes counter after refreshing components
        // This ensures the planning queue counter reflects the current state after clear all / reset demo data
        this.updatePendingRecipes();
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
        
        console.log('🔍 Theme debug:', { savedTheme });
        
        // Only use dark mode if explicitly saved as 'dark'
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            this.updateThemeIcons(true);
            console.log('🌙 Applied dark theme');
        } else {
            // Default to light mode (ignore system preference)
            document.documentElement.classList.remove('dark');
            this.updateThemeIcons(false);
            console.log('🌞 Applied light theme (default)');
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
        if (!window.mealPlannerSettings) return [];
        
        const allRecipes = window.mealPlannerSettings.getAuthoritativeData('recipes');
        
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

    // Clean meal data access utilities
    getMealDisplayName(meal) {
        if (!meal || !meal.recipe_id) return 'Unknown Recipe';
        const recipe = window.recipeManager?.getRecipe(meal.recipe_id);
        return recipe ? recipe.title : 'Unknown Recipe';
    }

    getMealDescription(meal) {
        if (!meal || !meal.recipe_id) return '';
        const recipe = window.recipeManager?.getRecipe(meal.recipe_id);
        return recipe ? recipe.description : '';
    }

    getMealItems(meal) {
        if (!meal || !meal.recipe_id) return [];
        const recipe = window.recipeManager?.getRecipe(meal.recipe_id);
        return recipe ? recipe.items || [] : [];
    }

    getMealLabels(meal) {
        if (!meal || !meal.recipe_id) return [];
        const recipe = window.recipeManager?.getRecipe(meal.recipe_id);
        return recipe ? recipe.labels || [] : [];
    }

    getMealImageUrl(meal) {
        if (!meal || !meal.recipe_id) return null;
        const recipe = window.recipeManager?.getRecipe(meal.recipe_id);
        return recipe ? recipe.image_url : null;
    }

    getMealPrepTime(meal) {
        if (!meal || !meal.recipe_id) return 0;
        const recipe = window.recipeManager?.getRecipe(meal.recipe_id);
        return recipe ? recipe.prep_time || 0 : 0;
    }

    getMealCookTime(meal) {
        if (!meal || !meal.recipe_id) return 0;
        const recipe = window.recipeManager?.getRecipe(meal.recipe_id);
        return recipe ? recipe.cook_time || 0 : 0;
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
