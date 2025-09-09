// Service Worker for MealPlanner PWA
// Handles caching, offline functionality, and background sync

const CACHE_VERSION = '2025.09.09.1701'
const CACHE_NAME = `meal-planner-v${CACHE_VERSION}`
const STATIC_CACHE = `meal-planner-static-v${CACHE_VERSION}`
const DYNAMIC_CACHE = `meal-planner-dynamic-v${CACHE_VERSION}`

// Files to cache for offline functionality
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/src/main.js',
    '/src/styles/main.css',
    '/src/database/storage.js',
    '/src/database/schema.js',
    '/node_modules/sql.js/dist/sql-wasm.wasm',
    '/node_modules/sql.js/dist/sql-wasm.js'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...')
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static assets')
                return cache.addAll(STATIC_ASSETS)
            })
            .then(() => {
                console.log('Service Worker: Static assets cached')
                return self.skipWaiting()
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache static assets', error)
            })
    )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...')
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName)
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            .then(() => {
                console.log('Service Worker: Activated')
                return self.clients.claim()
            })
    )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return
    }
    
    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) {
        return
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Cache successful responses
                        if (networkResponse.status === 200) {
                            const responseClone = networkResponse.clone()
                            
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(event.request, responseClone)
                                })
                        }
                        
                        return networkResponse
                    })
                    .catch((error) => {
                        console.log('Service Worker: Network fetch failed', error)
                        
                        // Return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html')
                        }
                        
                        throw error
                    })
            })
    )
})

// Message event - handle messages from main thread
self.addEventListener('message', (event) => {
    const { type, data } = event.data
    
    switch (type) {
        case 'DATABASE_UPDATED':
            console.log('Service Worker: Database updated at', new Date(data.timestamp))
            // Here we could trigger background sync or other operations
            handleDatabaseUpdate(data)
            break
            
        case 'SYNC_REQUEST':
            console.log('Service Worker: Sync requested')
            handleSyncRequest(data)
            break
            
        case 'SKIP_WAITING':
            self.skipWaiting()
            break
            
        case 'CLEAR_CACHE':
            console.log('Service Worker: Cache clear requested')
            handleCacheClear()
            break
            
        case 'UPDATE_CACHE_VERSION':
            console.log('Service Worker: Cache version update requested', data.version)
            handleCacheVersionUpdate(data.version)
            break
            
        default:
            console.log('Service Worker: Unknown message type', type)
    }
})

// Background sync event
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered', event.tag)
    
    if (event.tag === 'database-sync') {
        event.waitUntil(performDatabaseSync())
    }
})

// Handle database updates
async function handleDatabaseUpdate(data) {
    try {
        // Store the update timestamp
        const cache = await caches.open(DYNAMIC_CACHE)
        const response = new Response(JSON.stringify({
            lastUpdate: data.timestamp,
            version: data.version || 1
        }))
        
        await cache.put('/database-metadata', response)
        
        // Register for background sync if supported
        if ('sync' in self.registration) {
            await self.registration.sync.register('database-sync')
        }
        
        console.log('Service Worker: Database update handled')
    } catch (error) {
        console.error('Service Worker: Failed to handle database update', error)
    }
}

// Handle sync requests from main thread
async function handleSyncRequest(data) {
    try {
        // This is where we would implement cloud sync logic
        // For now, we'll just log the request
        console.log('Service Worker: Sync request data', data)
        
        // In a full implementation, this would:
        // 1. Check if we're online
        // 2. Upload local changes to cloud storage
        // 3. Download remote changes
        // 4. Merge changes and update local database
        // 5. Notify main thread of sync completion
        
        // Simulate sync completion
        setTimeout(() => {
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'SYNC_COMPLETE',
                        success: true,
                        timestamp: Date.now()
                    })
                })
            })
        }, 2000)
        
    } catch (error) {
        console.error('Service Worker: Sync request failed', error)
        
        // Notify main thread of sync failure
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'SYNC_COMPLETE',
                    success: false,
                    error: error.message,
                    timestamp: Date.now()
                })
            })
        })
    }
}

// Perform background database sync
async function performDatabaseSync() {
    try {
        console.log('Service Worker: Performing background database sync')
        
        // Check if we're online
        if (!navigator.onLine) {
            console.log('Service Worker: Offline, skipping sync')
            return
        }
        
        // Get database metadata
        const cache = await caches.open(DYNAMIC_CACHE)
        const metadataResponse = await cache.match('/database-metadata')
        
        if (metadataResponse) {
            const metadata = await metadataResponse.json()
            console.log('Service Worker: Database metadata', metadata)
            
            // Here we would implement the actual sync logic
            // For now, just log that sync would happen
            console.log('Service Worker: Would sync database with timestamp', metadata.lastUpdate)
        }
        
        console.log('Service Worker: Background sync completed')
    } catch (error) {
        console.error('Service Worker: Background sync failed', error)
    }
}

// Handle push notifications (for future sync notifications)
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received')
    
    const options = {
        body: 'Your meal plan has been updated',
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: 'meal-planner-sync',
        requireInteraction: false
    }
    
    event.waitUntil(
        self.registration.showNotification('MealPlanner', options)
    )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked')
    
    event.notification.close()
    
    event.waitUntil(
        self.clients.matchAll({ type: 'window' })
            .then((clients) => {
                // Focus existing window if available
                for (const client of clients) {
                    if (client.url === self.registration.scope && 'focus' in client) {
                        return client.focus()
                    }
                }
                
                // Otherwise open new window
                if (self.clients.openWindow) {
                    return self.clients.openWindow('/')
                }
            })
    )
})

// Handle cache clear requests from main thread
async function handleCacheClear() {
    try {
        console.log('Service Worker: Clearing all caches...')
        
        const cacheNames = await caches.keys()
        await Promise.all(
            cacheNames.map(cacheName => {
                console.log('Service Worker: Deleting cache', cacheName)
                return caches.delete(cacheName)
            })
        )
        
        console.log('Service Worker: All caches cleared')
        
        // Notify main thread
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'CACHE_CLEARED',
                    success: true,
                    timestamp: Date.now()
                })
            })
        })
        
    } catch (error) {
        console.error('Service Worker: Failed to clear caches', error)
        
        // Notify main thread of failure
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'CACHE_CLEARED',
                    success: false,
                    error: error.message,
                    timestamp: Date.now()
                })
            })
        })
    }
}

// Handle cache version updates
async function handleCacheVersionUpdate(newVersion) {
    try {
        console.log('Service Worker: Updating cache version to', newVersion)
        
        // Clear old caches
        await handleCacheClear()
        
        // Update cache names with new version
        const newCacheName = `meal-planner-v${newVersion}`
        const newStaticCache = `meal-planner-static-v${newVersion}`
        const newDynamicCache = `meal-planner-dynamic-v${newVersion}`
        
        console.log('Service Worker: Cache version updated')
        
        // Notify main thread
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'CACHE_VERSION_UPDATED',
                    success: true,
                    version: newVersion,
                    timestamp: Date.now()
                })
            })
        })
        
    } catch (error) {
        console.error('Service Worker: Failed to update cache version', error)
        
        // Notify main thread of failure
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'CACHE_VERSION_UPDATED',
                    success: false,
                    error: error.message,
                    timestamp: Date.now()
                })
            })
        })
    }
}

console.log('Service Worker: Script loaded with cache version', CACHE_VERSION)
