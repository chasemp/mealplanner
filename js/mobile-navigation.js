// Mobile Navigation Enhancement
class MobileNavigation {
    constructor() {
        this.isMobile = this.detectMobile();
        this.currentTab = 'dinner';
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
                <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="ingredients">
                    <span class="text-lg mb-1">🥕</span>
                    <span class="text-xs font-medium">Ingredients</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="recipes">
                    <span class="text-lg mb-1">📖</span>
                    <span class="text-xs font-medium">Recipes</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="meals">
                    <span class="text-lg mb-1">🍽️</span>
                    <span class="text-xs font-medium">Meals</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="breakfast">
                    <span class="text-lg mb-1">🍳</span>
                    <span class="text-xs font-medium">Breakfast</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="lunch">
                    <span class="text-lg mb-1">🥪</span>
                    <span class="text-xs font-medium">Lunch</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="dinner">
                    <span class="text-lg mb-1">📋</span>
                    <span class="text-xs font-medium">Plan</span>
                </button>
                
                <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="scheduled">
                    <span class="text-lg mb-1">🍽️</span>
                    <span class="text-xs font-medium">Menu</span>
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
