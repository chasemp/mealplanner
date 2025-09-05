import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Setup DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body><header><div class="flex"></div></header></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock service worker APIs
Object.defineProperty(global.navigator, 'serviceWorker', {
    value: {
        register: vi.fn(),
        addEventListener: vi.fn(),
        controller: null
    },
    writable: true
});

Object.defineProperty(global.window, 'Notification', {
    value: {
        permission: 'default',
        requestPermission: vi.fn()
    },
    writable: true
});

// Mock matchMedia
Object.defineProperty(global.window, 'matchMedia', {
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
    writable: true
});

// Import the main app after setting up mocks
// Since main.js creates a global class, we need to load it and access the global
await import('../../../js/main.js');
const MealPlannerApp = global.MealPlannerApp;

describe('Service Worker & PWA Features', () => {
    let app;
    let mockRegistration;

    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();
        
        // Mock service worker registration
        mockRegistration = {
            scope: '/',
            addEventListener: vi.fn(),
            waiting: null,
            pushManager: {
                getSubscription: vi.fn().mockResolvedValue(null)
            },
            sync: {
                register: vi.fn().mockResolvedValue(undefined)
            }
        };
        
        navigator.serviceWorker.register.mockResolvedValue(mockRegistration);
        
        // Create app instance
        app = new MealPlannerApp();
    });

    afterEach(() => {
        // Clean up DOM
        document.body.innerHTML = '<header><div class="flex"></div></header>';
    });

    describe('Service Worker Registration', () => {
        it('should register service worker successfully', async () => {
            await app.initializeServiceWorker();
            
            expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js', {
                scope: '/'
            });
            expect(app.serviceWorker).toBe(mockRegistration);
        });

        it('should handle service worker registration failure', async () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            navigator.serviceWorker.register.mockRejectedValue(new Error('Registration failed'));
            
            await app.initializeServiceWorker();
            
            expect(consoleError).toHaveBeenCalledWith('❌ Service Worker registration failed:', expect.any(Error));
            expect(app.serviceWorker).toBeNull();
            
            consoleError.mockRestore();
        });

        it('should handle browsers without service worker support', async () => {
            const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
            
            // Temporarily remove service worker support
            const originalSW = navigator.serviceWorker;
            delete navigator.serviceWorker;
            
            await app.initializeServiceWorker();
            
            expect(consoleLog).toHaveBeenCalledWith('⚠️ Service Worker not supported');
            
            // Restore service worker
            navigator.serviceWorker = originalSW;
            consoleLog.mockRestore();
        });

        it('should set up update listeners', async () => {
            await app.initializeServiceWorker();
            
            expect(mockRegistration.addEventListener).toHaveBeenCalledWith('updatefound', expect.any(Function));
            expect(navigator.serviceWorker.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));
        });

        it('should show update banner if service worker is waiting', async () => {
            mockRegistration.waiting = { state: 'installed' };
            const showUpdateSpy = vi.spyOn(app, 'showUpdateAvailable').mockImplementation(() => {});
            
            await app.initializeServiceWorker();
            
            expect(showUpdateSpy).toHaveBeenCalled();
            showUpdateSpy.mockRestore();
        });
    });

    describe('PWA Features', () => {
        it('should initialize PWA features', async () => {
            const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
            
            await app.initializePWAFeatures();
            
            expect(consoleLog).toHaveBeenCalledWith('📱 Initializing PWA Features...');
            expect(consoleLog).toHaveBeenCalledWith('✅ PWA Features initialized');
            
            consoleLog.mockRestore();
        });

        it('should handle beforeinstallprompt event', async () => {
            await app.initializePWAFeatures();
            
            const mockEvent = {
                preventDefault: vi.fn()
            };
            
            // Simulate beforeinstallprompt event
            const beforeInstallHandler = window.addEventListener.mock.calls
                .find(call => call[0] === 'beforeinstallprompt')[1];
            
            if (beforeInstallHandler) {
                beforeInstallHandler(mockEvent);
                
                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(app.installPrompt).toBe(mockEvent);
            }
        });

        it('should handle app installed event', async () => {
            const showNotificationSpy = vi.spyOn(app, 'showNotification').mockImplementation(() => {});
            const hideInstallSpy = vi.spyOn(app, 'hideInstallButton').mockImplementation(() => {});
            
            await app.initializePWAFeatures();
            
            // Simulate appinstalled event
            const appInstalledHandler = window.addEventListener.mock.calls
                .find(call => call[0] === 'appinstalled')[1];
            
            if (appInstalledHandler) {
                appInstalledHandler();
                
                expect(app.installPrompt).toBeNull();
                expect(hideInstallSpy).toHaveBeenCalled();
                expect(showNotificationSpy).toHaveBeenCalledWith('MealPlanner installed successfully!', 'success');
            }
            
            showNotificationSpy.mockRestore();
            hideInstallSpy.mockRestore();
        });

        it('should detect standalone mode', async () => {
            const hideInstallSpy = vi.spyOn(app, 'hideInstallButton').mockImplementation(() => {});
            
            // Mock standalone mode
            window.matchMedia.mockReturnValue({ matches: true });
            
            await app.initializePWAFeatures();
            
            expect(hideInstallSpy).toHaveBeenCalled();
            hideInstallSpy.mockRestore();
        });
    });

    describe('Install Button Management', () => {
        it('should show install button', () => {
            app.showInstallButton();
            
            const installBtn = document.getElementById('install-btn');
            expect(installBtn).toBeTruthy();
            expect(installBtn.textContent).toContain('Install');
        });

        it('should not duplicate install button', () => {
            app.showInstallButton();
            app.showInstallButton();
            
            const installBtns = document.querySelectorAll('#install-btn');
            expect(installBtns).toHaveLength(1);
        });

        it('should hide install button', () => {
            app.showInstallButton();
            expect(document.getElementById('install-btn')).toBeTruthy();
            
            app.hideInstallButton();
            expect(document.getElementById('install-btn')).toBeFalsy();
        });

        it('should handle install button click', async () => {
            const promptInstallSpy = vi.spyOn(app, 'promptInstall').mockImplementation(() => {});
            
            app.showInstallButton();
            const installBtn = document.getElementById('install-btn');
            
            installBtn.click();
            
            expect(promptInstallSpy).toHaveBeenCalled();
            promptInstallSpy.mockRestore();
        });
    });

    describe('Install Prompt', () => {
        it('should prompt install when available', async () => {
            const mockPrompt = {
                prompt: vi.fn().mockResolvedValue({ outcome: 'accepted' })
            };
            
            app.installPrompt = mockPrompt;
            
            await app.promptInstall();
            
            expect(mockPrompt.prompt).toHaveBeenCalled();
            expect(app.installPrompt).toBeNull();
        });

        it('should handle install prompt rejection', async () => {
            const mockPrompt = {
                prompt: vi.fn().mockResolvedValue({ outcome: 'dismissed' })
            };
            
            app.installPrompt = mockPrompt;
            
            await app.promptInstall();
            
            expect(mockPrompt.prompt).toHaveBeenCalled();
            expect(app.installPrompt).toBe(mockPrompt); // Should remain available
        });

        it('should handle install prompt error', async () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            const mockPrompt = {
                prompt: vi.fn().mockRejectedValue(new Error('Prompt failed'))
            };
            
            app.installPrompt = mockPrompt;
            
            await app.promptInstall();
            
            expect(consoleError).toHaveBeenCalledWith('❌ PWA: Install prompt failed:', expect.any(Error));
            consoleError.mockRestore();
        });
    });

    describe('Push Notifications', () => {
        it('should initialize push notifications when permission granted', async () => {
            window.Notification.permission = 'granted';
            app.serviceWorker = mockRegistration;
            
            await app.initializePushNotifications();
            
            expect(mockRegistration.pushManager.getSubscription).toHaveBeenCalled();
        });

        it('should not request permission automatically', async () => {
            window.Notification.permission = 'default';
            
            await app.initializePushNotifications();
            
            expect(window.Notification.requestPermission).not.toHaveBeenCalled();
        });

        it('should request notification permission', async () => {
            const showNotificationSpy = vi.spyOn(app, 'showNotification').mockImplementation(() => {});
            window.Notification.requestPermission.mockResolvedValue('granted');
            
            const result = await app.requestNotificationPermission();
            
            expect(window.Notification.requestPermission).toHaveBeenCalled();
            expect(result).toBe('granted');
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Notifications enabled! You\'ll receive meal reminders.',
                'success'
            );
            
            showNotificationSpy.mockRestore();
        });

        it('should handle notification permission denial', async () => {
            const showNotificationSpy = vi.spyOn(app, 'showNotification').mockImplementation(() => {});
            window.Notification.requestPermission.mockResolvedValue('denied');
            
            const result = await app.requestNotificationPermission();
            
            expect(result).toBe('denied');
            expect(showNotificationSpy).toHaveBeenCalledWith(
                'Notifications disabled. You can enable them in browser settings.',
                'info'
            );
            
            showNotificationSpy.mockRestore();
        });
    });

    describe('Background Sync', () => {
        it('should schedule background sync', async () => {
            app.serviceWorker = mockRegistration;
            
            await app.scheduleBackgroundSync('test-sync');
            
            expect(mockRegistration.sync.register).toHaveBeenCalledWith('test-sync');
        });

        it('should handle background sync registration failure', async () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            app.serviceWorker = mockRegistration;
            mockRegistration.sync.register.mockRejectedValue(new Error('Sync failed'));
            
            await app.scheduleBackgroundSync();
            
            expect(consoleError).toHaveBeenCalledWith('❌ Background sync registration failed:', expect.any(Error));
            consoleError.mockRestore();
        });

        it('should use default sync tag', async () => {
            app.serviceWorker = mockRegistration;
            
            await app.scheduleBackgroundSync();
            
            expect(mockRegistration.sync.register).toHaveBeenCalledWith('database-sync');
        });
    });

    describe('Service Worker Messages', () => {
        it('should handle SYNC_MEAL_PLANS message', () => {
            const mockGoogleCalendar = {
                isAuthenticated: true
            };
            app.googleCalendarIntegration = mockGoogleCalendar;
            const syncSpy = vi.spyOn(app, 'syncMealPlanToCalendar').mockImplementation(() => {});
            
            app.handleServiceWorkerMessage({ type: 'SYNC_MEAL_PLANS' });
            
            expect(syncSpy).toHaveBeenCalled();
            syncSpy.mockRestore();
        });

        it('should handle CACHE_UPDATED message', () => {
            const showNotificationSpy = vi.spyOn(app, 'showNotification').mockImplementation(() => {});
            
            app.handleServiceWorkerMessage({ type: 'CACHE_UPDATED' });
            
            expect(showNotificationSpy).toHaveBeenCalledWith('App updated and ready to use offline!', 'info');
            showNotificationSpy.mockRestore();
        });

        it('should ignore unknown message types', () => {
            const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
            
            app.handleServiceWorkerMessage({ type: 'UNKNOWN_TYPE' });
            
            expect(consoleLog).toHaveBeenCalledWith('💬 Service Worker message:', { type: 'UNKNOWN_TYPE' });
            consoleLog.mockRestore();
        });
    });

    describe('Update Management', () => {
        it('should show update banner', () => {
            app.showUpdateAvailable();
            
            const updateBanner = document.getElementById('update-banner');
            expect(updateBanner).toBeTruthy();
            expect(updateBanner.textContent).toContain('A new version of MealPlanner is available!');
        });

        it('should handle update button click', () => {
            const applyUpdateSpy = vi.spyOn(app, 'applyUpdate').mockImplementation(() => {});
            
            app.showUpdateAvailable();
            const updateBtn = document.getElementById('update-btn');
            
            updateBtn.click();
            
            expect(applyUpdateSpy).toHaveBeenCalled();
            applyUpdateSpy.mockRestore();
        });

        it('should handle dismiss button click', () => {
            app.showUpdateAvailable();
            const dismissBtn = document.getElementById('dismiss-update');
            
            dismissBtn.click();
            
            expect(document.getElementById('update-banner')).toBeFalsy();
        });

        it('should apply update when service worker is waiting', async () => {
            const mockWaiting = {
                postMessage: vi.fn()
            };
            
            app.serviceWorker = { waiting: mockWaiting };
            
            // Mock window.location.reload
            const originalReload = window.location.reload;
            window.location.reload = vi.fn();
            
            await app.applyUpdate();
            
            expect(mockWaiting.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' });
            expect(window.location.reload).toHaveBeenCalled();
            
            // Restore original reload
            window.location.reload = originalReload;
        });
    });

    describe('Edge Cases', () => {
        it('should handle missing header element gracefully', () => {
            document.body.innerHTML = ''; // Remove header
            
            expect(() => app.showInstallButton()).not.toThrow();
            expect(document.getElementById('install-btn')).toBeFalsy();
        });

        it('should handle browsers without Notification API', async () => {
            // Temporarily remove Notification API
            const originalNotification = window.Notification;
            delete window.Notification;
            
            const result = await app.requestNotificationPermission();
            
            expect(result).toBe('unsupported');
            
            // Restore Notification API
            window.Notification = originalNotification;
        });

        it('should handle browsers without sync support', async () => {
            app.serviceWorker = {}; // No sync property
            
            await expect(app.scheduleBackgroundSync()).resolves.not.toThrow();
        });

        it('should handle missing install prompt', async () => {
            app.installPrompt = null;
            
            await expect(app.promptInstall()).resolves.not.toThrow();
        });
    });
});
