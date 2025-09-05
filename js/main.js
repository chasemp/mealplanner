// MealPlanner Main Application
class MealPlannerApp {
    constructor() {
        this.currentTab = 'recipes';
        this.init();
    }

    init() {
        console.log('🚀 Initializing MealPlanner...');
        
        // Hide loading and show app
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('main-app').classList.remove('hidden');
            
            this.setupEventListeners();
            this.generateCalendarDays();
            
            console.log('✅ MealPlanner initialized successfully!');
        }, 1000);
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Database buttons
        document.getElementById('new-db-btn')?.addEventListener('click', () => {
            console.log('New DB clicked');
        });

        document.getElementById('export-db-btn')?.addEventListener('click', () => {
            console.log('Export DB clicked');
        });

        document.getElementById('import-db-btn')?.addEventListener('click', () => {
            console.log('Import DB clicked');
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
