// MealPlanner Main Application
class MealPlannerApp {
    constructor() {
        this.currentTab = 'recipes';
        this.version = '2025.09.05.0913';
        this.itineraryViews = {};
        this.calendarViews = {};
        this.recipeManager = null;
        this.groceryListManager = null;
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
            document.getElementById('loading').style.display = 'none';
            document.getElementById('main-app').classList.remove('hidden');
            
            this.setupEventListeners();
            this.initializeTheme();
            this.initializeRecipeManager();
            this.initializeGroceryListManager();
            this.initializeItineraryViews();
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

    initializeGroceryListManager() {
        console.log('🛒 Initializing grocery list manager...');
        
        const container = document.getElementById('grocery-list-container');
        if (container) {
            this.groceryListManager = new GroceryListManager(container);
            window.groceryListManager = this.groceryListManager;
            console.log('✅ Grocery list manager initialized');
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
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
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
