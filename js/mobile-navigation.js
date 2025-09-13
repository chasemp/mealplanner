// Mobile Navigation Enhancement
class MobileNavigation {
    constructor() {
        this.isMobile = this.detectMobile();
        this.currentTab = 'dinner';
        this.userHasInteracted = false; // Track if user has interacted with page
        this.autoHideEnabled = false; // Default to false - always show navigation
        this.lastScrollY = 0;
        this.scrollThreshold = 10;
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
            this.setupTouchFeedback();
            this.setupScrollListener();
            this.loadAutoHideSetting();
        }

        // Listen for resize events
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = this.detectMobile();
            
            if (wasMobile !== this.isMobile) {
                this.toggleNavigationMode();
            }
        });

        // Periodic check to ensure event listeners stay attached (every 5 seconds)
        setInterval(() => {
            if (this.isMobile) {
                const bottomNav = document.getElementById('mobile-bottom-nav');
                if (bottomNav && !bottomNav._mobileNavHandler) {
                    console.log('📱 Mobile nav event listeners lost, reattaching...');
                    this.setupEventListeners();
                }
            }
        }, 5000);
    }

    createBottomNavigation() {
        // Check if bottom nav already exists
        if (document.getElementById('mobile-bottom-nav')) {
            return;
        }

        const bottomNav = document.createElement('div');
        bottomNav.id = 'mobile-bottom-nav';
        bottomNav.className = 'fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40 safe-area-inset-bottom';
        
        // Get settings to determine which tabs to show
        const settings = window.settingsManager?.settings || { showBreakfast: false, showLunch: false, showDinner: true };
        
        let tabsHTML = `
            <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="items">
                <span class="text-lg mb-1">🥕</span>
                <span class="text-xs font-medium">Items</span>
            </button>
            
            <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="recipes">
                <span class="text-lg mb-1">📖</span>
                <span class="text-xs font-medium">Recipes</span>
            </button>
            
`;
        
        // Only add breakfast tab if enabled
        if (settings.showBreakfast) {
            tabsHTML += `
            <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="breakfast">
                <span class="text-lg mb-1">🍳</span>
                <span class="text-xs font-medium">Breakfast</span>
            </button>`;
        }
        
        // Only add lunch tab if enabled
        if (settings.showLunch) {
            tabsHTML += `
            <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="lunch">
                <span class="text-lg mb-1">🥪</span>
                <span class="text-xs font-medium">Lunch</span>
            </button>`;
        }
        
        // Only add plan tab if enabled (should be true by default)
        if (settings.showPlan) {
            tabsHTML += `
            <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="plan">
                <span class="text-lg mb-1">📋</span>
                <span class="text-xs font-medium">Plan</span>
            </button>`;
        }
        
        tabsHTML += `
            <button class="mobile-nav-tab flex flex-col items-center py-1 px-1 min-w-0 flex-1" data-tab="menu">
                <span class="text-lg mb-1">📄</span>
                <span class="text-xs font-medium">Menu</span>
            </button>`;
        
        bottomNav.innerHTML = `<div class="flex justify-around items-center py-2">${tabsHTML}</div>`;

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
        if (!bottomNav) {
            console.warn('⚠️ Mobile bottom nav not found for event listeners');
            return;
        }

        // Remove any existing listeners to prevent duplicates
        const existingHandler = bottomNav._mobileNavHandler;
        if (existingHandler) {
            bottomNav.removeEventListener('click', existingHandler);
        }

        // Create new handler and store reference for cleanup
        const clickHandler = (e) => {
            console.log('📱 Mobile nav click detected:', e.target);
            const tabButton = e.target.closest('.mobile-nav-tab');
            if (tabButton) {
                const tabName = tabButton.dataset.tab;
                console.log('📱 Switching to tab:', tabName);
                this.switchTab(tabName);
            } else {
                console.log('📱 Click not on tab button');
            }
        };

        bottomNav.addEventListener('click', clickHandler);
        bottomNav._mobileNavHandler = clickHandler; // Store for cleanup
        
        console.log('📱 Mobile navigation event listeners attached');
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        this.updateActiveTab(tabName);
        
        // Add haptic feedback AFTER successful navigation to avoid Chrome blocking
        this.addHapticFeedback();
        
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

    // Method to refresh mobile navigation when settings change
    refreshNavigation() {
        const bottomNav = document.getElementById('mobile-bottom-nav');
        if (bottomNav && this.isMobile) {
            bottomNav.remove();
            this.createBottomNavigation();
            this.setupEventListeners();
            this.setupTouchFeedback();
        }
    }

    // Method to ensure event listeners are attached (can be called safely multiple times)
    ensureEventListeners() {
        if (this.isMobile) {
            console.log('📱 Ensuring mobile navigation event listeners...');
            this.setupEventListeners();
        }
    }

    // Debug method to check mobile navigation health
    checkHealth() {
        const bottomNav = document.getElementById('mobile-bottom-nav');
        const hasHandler = bottomNav && bottomNav._mobileNavHandler;
        const tabButtons = bottomNav ? bottomNav.querySelectorAll('.mobile-nav-tab').length : 0;
        
        console.log('📱 Mobile Navigation Health Check:', {
            isMobile: this.isMobile,
            bottomNavExists: !!bottomNav,
            hasEventHandler: !!hasHandler,
            tabButtonCount: tabButtons,
            currentTab: this.currentTab
        });
        
        return {
            healthy: this.isMobile && bottomNav && hasHandler && tabButtons > 0,
            bottomNavExists: !!bottomNav,
            hasEventHandler: !!hasHandler,
            tabButtonCount: tabButtons
        };
    }

    // Add haptic feedback for mobile interactions (if supported)
    addHapticFeedback() {
        // Run haptic feedback asynchronously to avoid blocking navigation
        setTimeout(() => {
            if ('vibrate' in navigator) {
                try {
                    navigator.vibrate(10); // Short vibration for feedback
                } catch (error) {
                    // Silently ignore vibration errors (blocked by browser security)
                    // This is expected on first interaction before user gesture
                }
            }
        }, 0);
    }

    // Enhanced touch feedback
    setupTouchFeedback() {
        const bottomNav = document.getElementById('mobile-bottom-nav');
        if (!bottomNav) return;

        bottomNav.querySelectorAll('.mobile-nav-tab').forEach(tab => {
            tab.addEventListener('touchstart', () => {
                tab.style.transform = 'scale(0.95)';
                tab.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                // Note: Haptic feedback moved to successful navigation to avoid Chrome blocking
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

    setupScrollListener() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollBehavior();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleScrollBehavior() {
        if (!this.autoHideEnabled) return;

        const currentScrollY = window.scrollY;
        const bottomNav = document.getElementById('mobile-bottom-nav');
        
        if (!bottomNav) return;

        const scrollDifference = currentScrollY - this.lastScrollY;

        if (Math.abs(scrollDifference) < this.scrollThreshold) {
            return;
        }

        if (scrollDifference > 0 && currentScrollY > 100) {
            // Scrolling down - hide navigation
            bottomNav.style.transform = 'translateY(100%)';
            bottomNav.style.transition = 'transform 0.3s ease-in-out';
        } else if (scrollDifference < 0) {
            // Scrolling up - show navigation
            bottomNav.style.transform = 'translateY(0)';
            bottomNav.style.transition = 'transform 0.3s ease-in-out';
        }

        this.lastScrollY = currentScrollY;
    }

    updateAutoHideSetting(enabled) {
        this.autoHideEnabled = enabled;
        const bottomNav = document.getElementById('mobile-bottom-nav');
        
        if (!enabled && bottomNav) {
            // If auto-hide is disabled, always show the navigation
            bottomNav.style.transform = 'translateY(0)';
            bottomNav.style.transition = 'transform 0.3s ease-in-out';
        }
        
        console.log(`📱 Mobile navigation auto-hide ${enabled ? 'enabled' : 'disabled'}`);
    }

    loadAutoHideSetting() {
        // Load setting from settings manager or localStorage
        if (window.settingsManager && window.settingsManager.settings) {
            this.autoHideEnabled = window.settingsManager.settings.mobileNavAutoHide || false;
        } else {
            // Fallback to localStorage
            try {
                const settings = JSON.parse(localStorage.getItem('mealplanner_settings') || '{}');
                this.autoHideEnabled = settings.mobileNavAutoHide || false;
            } catch (e) {
                this.autoHideEnabled = false;
            }
        }
        
        console.log(`📱 Loaded mobile navigation auto-hide setting: ${this.autoHideEnabled}`);
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
