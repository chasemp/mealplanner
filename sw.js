// MealPlanner Service Worker
// Provides offline functionality, caching, and PWA features

const CACHE_NAME = 'mealplanner-v2025.09.05.1012';
const STATIC_CACHE_NAME = 'mealplanner-static-v2025.09.05.1012';
const DYNAMIC_CACHE_NAME = 'mealplanner-dynamic-v2025.09.05.1012';

// Files to cache for offline functionality
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/itinerary-view.js',
    '/js/calendar-view.js',
    '/js/recipe-manager.js',
    '/js/grocery-list-manager.js',
    '/js/google-calendar-integration.js',
    '/js/meal-rotation-engine.js',
    // External CDN resources (cached for offline)
    'https://cdn.tailwindcss.com/3.3.0',
    'https://sql.js.org/dist/sql-wasm.js',
    'https://sql.js.org/dist/sql-wasm.wasm'
];

// Dynamic content patterns to cache
const DYNAMIC_CACHE_PATTERNS = [
    /^https:\/\/apis\.google\.com\/js\/api\.js/,
    /^https:\/\/accounts\.google\.com\/gsi\/client/,
    /^https:\/\/www\.googleapis\.com\/calendar\/v3\//
];

// Network-first patterns (always try network first)
const NETWORK_FIRST_PATTERNS = [
    /^https:\/\/www\.googleapis\.com\/calendar\/v3\//,
    /^https:\/\/accounts\.google\.com\//
];

console.log('🔧 Service Worker: MealPlanner SW loaded');

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE_NAME).then((cache) => {
                console.log('📦 Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS.map(url => {
                    // Handle relative URLs
                    if (url.startsWith('/')) {
                        return new Request(url, { cache: 'reload' });
                    }
                    return url;
                }));
            }),
            
            // Initialize dynamic cache
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                console.log('📦 Service Worker: Dynamic cache initialized');
                return cache;
            })
        ]).then(() => {
            console.log('✅ Service Worker: Installation complete');
            // Force activation of new service worker
            return self.skipWaiting();
        }).catch((error) => {
            console.error('❌ Service Worker: Installation failed:', error);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('🔧 Service Worker: Activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE_NAME && 
                            cacheName !== DYNAMIC_CACHE_NAME &&
                            cacheName.startsWith('mealplanner-')) {
                            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Take control of all clients
            self.clients.claim()
        ]).then(() => {
            console.log('✅ Service Worker: Activation complete');
        })
    );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
    const url = new URL(request.url);
    
    try {
        // Strategy 1: Network First (for dynamic API calls)
        if (isNetworkFirst(url)) {
            return await networkFirstStrategy(request);
        }
        
        // Strategy 2: Cache First (for static assets)
        if (isStaticAsset(url)) {
            return await cacheFirstStrategy(request);
        }
        
        // Strategy 3: Stale While Revalidate (for dynamic content)
        return await staleWhileRevalidateStrategy(request);
        
    } catch (error) {
        console.error('❌ Service Worker: Fetch error:', error);
        
        // Fallback to offline page for navigation requests
        if (request.mode === 'navigate') {
            return await getOfflineFallback();
        }
        
        // For other requests, try cache or return error
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response('Offline', { 
            status: 503, 
            statusText: 'Service Unavailable' 
        });
    }
}

// Network First Strategy - for API calls
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 Service Worker: Network failed, trying cache for:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

// Cache First Strategy - for static assets
async function cacheFirstStrategy(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // If not in cache, fetch and cache
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Service Worker: Failed to fetch static asset:', request.url);
        throw error;
    }
}

// Stale While Revalidate Strategy - for dynamic content
async function staleWhileRevalidateStrategy(request) {
    const cachedResponse = await caches.match(request);
    
    // Fetch in background to update cache
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            const cache = caches.open(DYNAMIC_CACHE_NAME);
            cache.then(c => c.put(request, networkResponse.clone()));
        }
        return networkResponse;
    }).catch(() => {
        // Network failed, but we might have cache
        return cachedResponse;
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Otherwise wait for network
    return fetchPromise;
}

// Helper functions
function isNetworkFirst(url) {
    return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.href));
}

function isStaticAsset(url) {
    // Check if it's one of our static assets
    const pathname = url.pathname;
    return pathname.endsWith('.js') || 
           pathname.endsWith('.css') || 
           pathname.endsWith('.html') ||
           pathname === '/' ||
           STATIC_ASSETS.some(asset => {
               if (asset.startsWith('http')) {
                   return url.href.startsWith(asset);
               }
               return pathname === asset || pathname.startsWith(asset);
           });
}

async function getOfflineFallback() {
    try {
        // Try to return cached index.html
        const cache = await caches.open(STATIC_CACHE_NAME);
        const cachedIndex = await cache.match('/index.html') || await cache.match('/');
        
        if (cachedIndex) {
            return cachedIndex;
        }
        
        // Fallback offline page
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>MealPlanner - Offline</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { 
                        font-family: system-ui, sans-serif; 
                        text-align: center; 
                        padding: 2rem;
                        background: #f3f4f6;
                    }
                    .container { 
                        max-width: 400px; 
                        margin: 0 auto; 
                        background: white; 
                        padding: 2rem; 
                        border-radius: 8px; 
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .icon { font-size: 3rem; margin-bottom: 1rem; }
                    h1 { color: #374151; margin-bottom: 1rem; }
                    p { color: #6b7280; margin-bottom: 1.5rem; }
                    button { 
                        background: #3b82f6; 
                        color: white; 
                        border: none; 
                        padding: 0.75rem 1.5rem; 
                        border-radius: 6px; 
                        cursor: pointer;
                        font-size: 1rem;
                    }
                    button:hover { background: #2563eb; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="icon">🍽️</div>
                    <h1>MealPlanner</h1>
                    <p>You're currently offline, but MealPlanner is still available with limited functionality.</p>
                    <button onclick="window.location.reload()">Try Again</button>
                </div>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' }
        });
        
    } catch (error) {
        console.error('❌ Service Worker: Failed to create offline fallback:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Background Sync for data persistence
self.addEventListener('sync', (event) => {
    console.log('🔄 Service Worker: Background sync triggered:', event.tag);
    
    if (event.tag === 'database-sync') {
        event.waitUntil(syncDatabase());
    } else if (event.tag === 'meal-plan-sync') {
        event.waitUntil(syncMealPlans());
    }
});

async function syncDatabase() {
    try {
        console.log('🔄 Service Worker: Syncing database...');
        
        // Get pending database operations from IndexedDB
        const pendingOps = await getPendingDatabaseOperations();
        
        if (pendingOps.length > 0) {
            console.log(`🔄 Service Worker: Found ${pendingOps.length} pending operations`);
            
            // Process each operation
            for (const op of pendingOps) {
                await processDatabaseOperation(op);
            }
            
            // Clear processed operations
            await clearPendingDatabaseOperations();
            console.log('✅ Service Worker: Database sync complete');
        }
        
    } catch (error) {
        console.error('❌ Service Worker: Database sync failed:', error);
    }
}

async function syncMealPlans() {
    try {
        console.log('🔄 Service Worker: Syncing meal plans...');
        
        // Sync with Google Calendar if authenticated
        const clients = await self.clients.matchAll();
        if (clients.length > 0) {
            clients[0].postMessage({
                type: 'SYNC_MEAL_PLANS',
                timestamp: Date.now()
            });
        }
        
    } catch (error) {
        console.error('❌ Service Worker: Meal plan sync failed:', error);
    }
}

// Push notifications for meal reminders
self.addEventListener('push', (event) => {
    console.log('🔔 Service Worker: Push notification received');
    
    const options = {
        body: 'Time to prepare your meal!',
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        tag: 'meal-reminder',
        requireInteraction: false,
        actions: [
            {
                action: 'view',
                title: 'View Meal Plan'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };
    
    if (event.data) {
        try {
            const data = event.data.json();
            options.body = data.message || options.body;
            options.tag = data.tag || options.tag;
        } catch (error) {
            console.error('❌ Service Worker: Failed to parse push data:', error);
        }
    }
    
    event.waitUntil(
        self.registration.showNotification('MealPlanner Reminder', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Service Worker: Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'view') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
    // 'dismiss' action just closes the notification
});

// Message handling for communication with main app
self.addEventListener('message', (event) => {
    console.log('💬 Service Worker: Message received:', event.data);
    
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
                
            case 'GET_VERSION':
                event.ports[0].postMessage({ version: CACHE_NAME });
                break;
                
            case 'CLEAR_CACHE':
                clearAllCaches().then(() => {
                    event.ports[0].postMessage({ success: true });
                });
                break;
                
            case 'SCHEDULE_SYNC':
                if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
                    self.registration.sync.register(event.data.tag || 'database-sync');
                }
                break;
        }
    }
});

// Utility functions for IndexedDB operations
async function getPendingDatabaseOperations() {
    // This would integrate with the app's IndexedDB for pending operations
    // For now, return empty array
    return [];
}

async function processDatabaseOperation(operation) {
    // Process individual database operations
    console.log('🔄 Service Worker: Processing operation:', operation);
}

async function clearPendingDatabaseOperations() {
    // Clear processed operations from IndexedDB
    console.log('🗑️ Service Worker: Cleared pending operations');
}

async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('🗑️ Service Worker: All caches cleared');
}

console.log('✅ Service Worker: MealPlanner SW ready for action!');
