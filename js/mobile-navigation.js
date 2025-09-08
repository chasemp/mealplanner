// Mobile Navigation Enhancement
class MobileNavigation {
    constructor() {
        this.isMobile = this.detectMobile();
        this.currentTab = 'recipes';
        this.init();
    }

    detectMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    init() {
        if (this.isMobile) {
            this.createBottomNavigation();
            this.hideTopNavigation();
            this.setupEventListeners();
        }

        // Listen for resize events
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = this.detectMobile();
            
            if (wasMobile !== this.isMobile) {
                this.toggleNavigationMode();
            }
        });
    }

    createBottomNavigation() {
        // Check if bottom nav already exists
        if (document.getElementById('mobile-bottom-nav')) {
            return;
        }

        const bottomNav = document.createElement('div');
        bottomNav.id = 'mobile-bottom-nav';
        bottomNav.className = 'fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40 safe-area-inset-bottom';
        
        bottomNav.innerHTML = `
            <div class="flex justify-around items-center py-2">
                <button class="mobile-nav-tab flex flex-col items-center py-2 px-3 min-w-0 flex-1" data-tab="recipes">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <span class="text-xs font-medium">Recipes</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-2 px-3 min-w-0 flex-1" data-tab="ingredients">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span class="text-xs font-medium">Ingredients</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-2 px-3 min-w-0 flex-1" data-tab="meal-planning">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-xs font-medium">Planning</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-2 px-3 min-w-0 flex-1" data-tab="grocery-list">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    <span class="text-xs font-medium">Grocery</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-2 px-3 min-w-0 flex-1" data-tab="settings">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="text-xs font-medium">Settings</span>
                </button>
            </div>
        `;

        document.body.appendChild(bottomNav);
        
        // Add padding to main content to account for bottom nav
        this.addBottomPadding();
        
        // Set initial active state
        this.updateActiveTab(this.currentTab);
    }

    hideTopNavigation() {
        const topNav = document.querySelector('.flex.space-x-8');
        if (topNav) {
            topNav.style.display = 'none';
        }
    }

    showTopNavigation() {
        const topNav = document.querySelector('.flex.space-x-8');
        if (topNav) {
            topNav.style.display = 'flex';
        }
    }

    addBottomPadding() {
        const mainContent = document.querySelector('main') || document.querySelector('.container');
        if (mainContent) {
            mainContent.style.paddingBottom = '80px'; // Account for bottom nav height
        }
    }

    removeBottomPadding() {
        const mainContent = document.querySelector('main') || document.querySelector('.container');
        if (mainContent) {
            mainContent.style.paddingBottom = '';
        }
    }

    setupEventListeners() {
        const bottomNav = document.getElementById('mobile-bottom-nav');
        if (!bottomNav) return;

        bottomNav.addEventListener('click', (e) => {
            const tabButton = e.target.closest('.mobile-nav-tab');
            if (tabButton) {
                const tabName = tabButton.dataset.tab;
                this.switchTab(tabName);
            }
        });
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        this.updateActiveTab(tabName);
        
        // Trigger the main app's tab switching
        if (window.app && typeof window.app.switchTab === 'function') {
            window.app.switchTab(tabName);
        } else {
            // Fallback: dispatch custom event
            document.dispatchEvent(new CustomEvent('mobileTabSwitch', {
                detail: { tabName }
            }));
        }
    }

    updateActiveTab(tabName) {
        const bottomNav = document.getElementById('mobile-bottom-nav');
        if (!bottomNav) return;

        // Remove active class from all tabs
        bottomNav.querySelectorAll('.mobile-nav-tab').forEach(tab => {
            tab.classList.remove('text-blue-600', 'dark:text-blue-400');
            tab.classList.add('text-gray-600', 'dark:text-gray-400');
        });

        // Add active class to current tab
        const activeTab = bottomNav.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.remove('text-gray-600', 'dark:text-gray-400');
            activeTab.classList.add('text-blue-600', 'dark:text-blue-400');
        }
    }

    toggleNavigationMode() {
        const bottomNav = document.getElementById('mobile-bottom-nav');
        
        if (this.isMobile) {
            // Switch to mobile mode
            if (!bottomNav) {
                this.createBottomNavigation();
            }
            this.hideTopNavigation();
            this.addBottomPadding();
        } else {
            // Switch to desktop mode
            if (bottomNav) {
                bottomNav.remove();
            }
            this.showTopNavigation();
            this.removeBottomPadding();
        }
    }

    // Method to be called when the main app switches tabs
    onTabChange(tabName) {
        this.currentTab = tabName;
        this.updateActiveTab(tabName);
    }

    // Add haptic feedback for mobile interactions (if supported)
    addHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(10); // Short vibration for feedback
        }
    }

    // Enhanced touch feedback
    setupTouchFeedback() {
        const bottomNav = document.getElementById('mobile-bottom-nav');
        if (!bottomNav) return;

        bottomNav.querySelectorAll('.mobile-nav-tab').forEach(tab => {
            tab.addEventListener('touchstart', () => {
                tab.style.transform = 'scale(0.95)';
                tab.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                this.addHapticFeedback();
            });

            tab.addEventListener('touchend', () => {
                setTimeout(() => {
                    tab.style.transform = '';
                    tab.style.backgroundColor = '';
                }, 100);
            });

            tab.addEventListener('touchcancel', () => {
                tab.style.transform = '';
                tab.style.backgroundColor = '';
            });
        });
    }
}

// Auto-initialize if we're in a mobile environment
if (typeof window !== 'undefined') {
    window.MobileNavigation = MobileNavigation;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.mobileNavigation = new MobileNavigation();
        });
    } else {
        window.mobileNavigation = new MobileNavigation();
    }
}
