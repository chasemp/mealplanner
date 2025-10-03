// Secure Token Storage for PWA
class SecureTokenStorage {
    constructor() {
        this.dbName = 'MealPlannerAuth';
        this.storeName = 'tokens';
        this.db = null;
        this.initDB();
    }

    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };
        });
    }

    async storeTokens(tokens) {
        if (!this.db) await this.initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            // In a real implementation, you'd encrypt the tokens here
            const encryptedTokens = this.simpleEncrypt(JSON.stringify(tokens));
            
            const request = store.put(encryptedTokens, 'google_calendar_tokens');
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getTokens() {
        if (!this.db) await this.initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            
            const request = store.get('google_calendar_tokens');
            request.onsuccess = () => {
                if (request.result) {
                    try {
                        const decrypted = this.simpleDecrypt(request.result);
                        resolve(JSON.parse(decrypted));
                    } catch (error) {
                        console.error('Failed to decrypt tokens:', error);
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async clearTokens() {
        if (!this.db) await this.initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            const request = store.delete('google_calendar_tokens');
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Simple encryption for demo - in production use Web Crypto API
    simpleEncrypt(text) {
        // This is a placeholder - use proper encryption in production
        return btoa(text);
    }

    simpleDecrypt(encrypted) {
        // This is a placeholder - use proper decryption in production
        return atob(encrypted);
    }
}

// Google Calendar Integration Component
class GoogleCalendarIntegration {
    constructor() {
        this.isAuthenticated = false;
        this.gapi = null;
        this.calendarId = 'primary'; // Default to primary calendar
        this.mealPlanCalendarId = null; // Dedicated meal plan calendar
        this.authInstance = null;
        this.managedMode = true; // Default to managed calendar mode
        
        // Google API configuration
        this.CLIENT_ID = this.getClientId();
        this.API_KEY = this.getApiKey();
        this.DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
        this.SCOPES = 'https://www.googleapis.com/auth/calendar';
        
        // Initialize secure token storage
        this.tokenStorage = new SecureTokenStorage();
        
        this.initializeAPI();
    }

    getClientId() {
        // In production, this would come from environment variables or secure config
        const isProduction = !this.isDevelopmentMode();
        return isProduction 
            ? 'your-prod-client-id.googleusercontent.com'
            : 'your-dev-client-id.googleusercontent.com';
    }

    getApiKey() {
        // Public API key - safe to include in client code
        const isProduction = !this.isDevelopmentMode();
        return isProduction 
            ? 'your-prod-api-key'
            : 'your-dev-api-key';
    }

    setManagedMode(enabled) {
        this.managedMode = enabled;
        console.log(`🔧 Calendar management mode: ${enabled ? 'Managed' : 'Collaborative'}`);
        
        // Store preference
        localStorage.setItem('mealplanner_calendar_managed_mode', enabled.toString());
    }

    getManagedMode() {
        const stored = localStorage.getItem('mealplanner_calendar_managed_mode');
        return stored !== null ? stored === 'true' : true; // Default to managed
    }

    async initializeAPI() {
        try {
            console.log('🗓️ Initializing Google Calendar API...');
            
            // Check if we're in a development environment
            if (this.isDevelopmentMode()) {
                console.log('🔧 Development mode: Using mock Google Calendar API');
                this.initializeMockAPI();
                return;
            }

            // Load Google API script dynamically
            await this.loadGoogleAPIScript();
            
            // Initialize the Google API client
            await this.initializeGoogleAPI();
            
            console.log('✅ Google Calendar API initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Google Calendar API:', error);
            this.initializeMockAPI(); // Fallback to mock API
        }
    }

    isDevelopmentMode() {
        // Check if we're running locally or in development
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.protocol === 'file:' ||
               !this.CLIENT_ID || !this.API_KEY;
    }

    initializeMockAPI() {
        console.log('🎭 Initializing mock Google Calendar API for development');
        this.gapi = {
            load: (api, callback) => callback(),
            client: {
                init: () => Promise.resolve(),
                calendar: {
                    calendars: {
                        list: () => Promise.resolve({
                            result: {
                                items: [
                                    { id: 'primary', summary: 'Primary Calendar' },
                                    { id: 'meal-plan-calendar', summary: 'Meal Planning' }
                                ]
                            }
                        }),
                        insert: (params) => Promise.resolve({
                            result: { id: 'meal-plan-calendar', summary: params.resource.summary }
                        })
                    },
                    events: {
                        list: () => Promise.resolve({ result: { items: [] } }),
                        insert: (params) => Promise.resolve({
                            result: {
                                id: 'mock-event-' + Date.now(),
                                summary: params.resource.summary,
                                start: params.resource.start,
                                end: params.resource.end
                            }
                        }),
                        delete: () => Promise.resolve({ result: {} })
                    }
                }
            },
            auth2: {
                getAuthInstance: () => ({
                    isSignedIn: {
                        get: () => true,
                        listen: () => {}
                    },
                    signIn: () => Promise.resolve(),
                    signOut: () => Promise.resolve()
                })
            }
        };
        
        this.isAuthenticated = true;
        this.authInstance = this.gapi.auth2.getAuthInstance();
    }

    async loadGoogleAPIScript() {
        return new Promise((resolve, reject) => {
            if (window.gapi) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async initializeGoogleAPI() {
        return new Promise((resolve, reject) => {
            window.gapi.load('client:auth2', async () => {
                try {
                    await window.gapi.client.init({
                        apiKey: this.API_KEY,
                        clientId: this.CLIENT_ID,
                        discoveryDocs: [this.DISCOVERY_DOC],
                        scope: this.SCOPES
                    });

                    this.gapi = window.gapi;
                    this.authInstance = this.gapi.auth2.getAuthInstance();
                    
                    // Listen for sign-in state changes
                    this.authInstance.isSignedIn.listen(this.updateSigninStatus.bind(this));
                    
                    // Handle initial sign-in state
                    this.updateSigninStatus(this.authInstance.isSignedIn.get());
                    
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    updateSigninStatus(isSignedIn) {
        this.isAuthenticated = isSignedIn;
        console.log(`🔐 Google Calendar authentication status: ${isSignedIn ? 'Signed in' : 'Signed out'}`);
        
        // Dispatch event for UI updates
        document.dispatchEvent(new CustomEvent('googleCalendarAuthChanged', {
            detail: { isAuthenticated: this.isAuthenticated }
        }));
    }

    async authenticate() {
        try {
            if (!this.authInstance) {
                throw new Error('Google API not initialized');
            }

            if (this.isAuthenticated) {
                console.log('✅ Already authenticated with Google Calendar');
                return true;
            }

            console.log('🔐 Authenticating with Google Calendar...');
            await this.authInstance.signIn();
            
            return this.isAuthenticated;
        } catch (error) {
            console.error('❌ Google Calendar authentication failed:', error);
            this.showAuthError(error.message);
            return false;
        }
    }

    async signOut() {
        try {
            if (this.authInstance && this.isAuthenticated) {
                await this.authInstance.signOut();
                console.log('👋 Signed out from Google Calendar');
            }
        } catch (error) {
            console.error('❌ Sign out failed:', error);
        }
    }

    async getCalendars() {
        try {
            if (!this.isAuthenticated) {
                throw new Error('Not authenticated with Google Calendar');
            }

            const response = await this.gapi.client.calendar.calendars.list();
            return response.result.items || [];
        } catch (error) {
            console.error('❌ Failed to fetch calendars:', error);
            return [];
        }
    }

    async createMealPlanCalendar() {
        try {
            if (!this.isAuthenticated) {
                throw new Error('Not authenticated with Google Calendar');
            }

            const calendarResource = {
                summary: 'Meal Planning',
                description: 'Automated meal planning schedule from MealPlanner app',
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };

            const response = await this.gapi.client.calendar.calendars.insert({
                resource: calendarResource
            });

            this.mealPlanCalendarId = response.result.id;
            console.log('✅ Created meal plan calendar:', this.mealPlanCalendarId);
            
            return response.result;
        } catch (error) {
            console.error('❌ Failed to create meal plan calendar:', error);
            throw error;
        }
    }

    async publishMealPlan(scheduledMeals, options = {}) {
        try {
            if (!this.isAuthenticated) {
                const authenticated = await this.authenticate();
                if (!authenticated) {
                    throw new Error('Authentication required');
                }
            }

            console.log(`📅 Publishing meal plan to Google Calendar (${this.managedMode ? 'Managed' : 'Collaborative'} mode)...`);

            // Ensure we have a dedicated meal plan calendar
            if (!this.mealPlanCalendarId) {
                await this.ensureMealPlanCalendar();
            }

            // In managed mode, always clear existing events for full sync
            // In collaborative mode, only clear if explicitly requested
            const shouldClear = this.managedMode || options.clearExisting;
            if (shouldClear) {
                await this.clearMealPlanEvents();
            }

            // Create events for each scheduled meal
            const createdEvents = [];
            for (const meal of scheduledMeals) {
                try {
                    // In collaborative mode, check for conflicts
                    if (!this.managedMode && !options.clearExisting) {
                        const hasConflict = await this.checkForConflicts(meal);
                        if (hasConflict) {
                            console.warn(`⚠️ Skipping ${meal.name} due to time conflict`);
                            continue;
                        }
                    }

                    const event = await this.createMealEvent(meal, options);
                    createdEvents.push(event);
                } catch (error) {
                    console.error(`❌ Failed to create event for meal: ${meal.name}`, error);
                }
            }

            console.log(`✅ Published ${createdEvents.length} meal events to Google Calendar`);
            this.showPublishSuccess(createdEvents.length, this.managedMode);
            
            return createdEvents;
        } catch (error) {
            console.error('❌ Failed to publish meal plan:', error);
            this.showPublishError(error.message);
            throw error;
        }
    }

    async checkForConflicts(meal) {
        try {
            const startDate = new Date(meal.date);
            const endDate = new Date(meal.date);
            
            // Set meal time ranges
            const mealTimes = {
                breakfast: { start: 8, end: 9 },
                lunch: { start: 12, end: 13 },
                dinner: { start: 18, end: 19 }
            };
            
            const times = mealTimes[meal.mealType] || mealTimes.dinner;
            startDate.setHours(times.start, 0, 0, 0);
            endDate.setHours(times.end, 0, 0, 0);

            // Check for existing events in this time slot
            const response = await this.gapi.client.calendar.events.list({
                calendarId: this.mealPlanCalendarId,
                timeMin: startDate.toISOString(),
                timeMax: endDate.toISOString(),
                singleEvents: true
            });

            const existingEvents = response.result.items || [];
            return existingEvents.length > 0;
        } catch (error) {
            console.error('Failed to check for conflicts:', error);
            return false; // Assume no conflict if check fails
        }
    }

    async ensureMealPlanCalendar() {
        try {
            // Check if meal plan calendar already exists
            const calendars = await this.getCalendars();
            const existingCalendar = calendars.find(cal => 
                cal.summary === 'Meal Planning' || cal.id === this.mealPlanCalendarId
            );

            if (existingCalendar) {
                this.mealPlanCalendarId = existingCalendar.id;
                console.log('📅 Using existing meal plan calendar:', this.mealPlanCalendarId);
            } else {
                await this.createMealPlanCalendar();
            }
        } catch (error) {
            console.error('❌ Failed to ensure meal plan calendar:', error);
            // Fallback to primary calendar
            this.mealPlanCalendarId = 'primary';
        }
    }

    async createMealEvent(meal, options = {}) {
        const startDate = new Date(meal.date);
        const endDate = new Date(meal.date);

        // Set appropriate times based on meal type
        const mealTimes = {
            breakfast: { start: 8, end: 9 },
            lunch: { start: 12, end: 13 },
            dinner: { start: 18, end: 19 }
        };

        const times = mealTimes[meal.mealType] || mealTimes.dinner;
        startDate.setHours(times.start, 0, 0, 0);
        endDate.setHours(times.end, 0, 0, 0);

        const eventResource = {
            summary: `${this.capitalizeMealType(meal.mealType)}: ${meal.name}`,
            description: this.createEventDescription(meal, options),
            start: {
                dateTime: startDate.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            end: {
                dateTime: endDate.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            colorId: this.getMealTypeColor(meal.mealType),
            source: {
                title: 'MealPlanner',
                url: window.location.origin
            }
        };

        const response = await this.gapi.client.calendar.events.insert({
            calendarId: this.mealPlanCalendarId,
            resource: eventResource
        });

        return response.result;
    }

    createEventDescription(meal, options) {
        let description = `Meal planned with MealPlanner\n\n`;
        
        if (meal.recipe) {
            description += `Recipe: ${meal.recipe.name}\n`;
            
            if (options.includeIngredients && meal.recipe.ingredients) {
                description += `\nIngredients:\n`;
                meal.recipe.ingredients.forEach(ingredient => {
                    description += `• ${ingredient.quantity} ${ingredient.unit} ${ingredient.name}\n`;
                });
            }
            
            if (options.includeInstructions && meal.recipe.instructions) {
                description += `\nInstructions:\n${meal.recipe.instructions}\n`;
            }
            
            if (meal.recipe.servings) {
                description += `\nServings: ${meal.recipe.servings}\n`;
            }
            
            if (meal.recipe.prepTime) {
                description += `Prep Time: ${meal.recipe.prepTime} minutes\n`;
            }
        }
        
        description += `\nGenerated by MealPlanner - ${window.location.origin}`;
        
        return description;
    }

    capitalizeMealType(mealType) {
        return mealType.charAt(0).toUpperCase() + mealType.slice(1);
    }

    getMealTypeColor(mealType) {
        // Google Calendar color IDs
        const colors = {
            breakfast: '5', // Yellow
            lunch: '2',     // Green
            dinner: '4'     // Red
        };
        return colors[mealType] || '1'; // Default blue
    }

    async clearMealPlanEvents() {
        try {
            console.log('🧹 Clearing existing meal plan events...');
            
            // Get events from the meal plan calendar
            const response = await this.gapi.client.calendar.events.list({
                calendarId: this.mealPlanCalendarId,
                q: 'MealPlanner', // Search for events created by MealPlanner
                timeMin: new Date().toISOString(),
                maxResults: 100
            });

            const events = response.result.items || [];
            
            // Delete each event
            for (const event of events) {
                try {
                    await this.gapi.client.calendar.events.delete({
                        calendarId: this.mealPlanCalendarId,
                        eventId: event.id
                    });
                } catch (error) {
                    console.error(`Failed to delete event: ${event.id}`, error);
                }
            }

            console.log(`🗑️ Cleared ${events.length} existing meal plan events`);
        } catch (error) {
            console.error('❌ Failed to clear existing events:', error);
        }
    }

    showAuthError(message) {
        this.showNotification(`Authentication failed: ${message}`, 'error');
    }

    showPublishSuccess(eventCount, managedMode) {
        const modeText = managedMode ? '(Managed Calendar)' : '(Collaborative Mode)';
        this.showNotification(`Successfully published ${eventCount} meals to Google Calendar! ${modeText}`, 'success');
    }

    showPublishError(message) {
        this.showNotification(`Failed to publish to Google Calendar: ${message}`, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }

    // Public API methods
    async syncMealPlan(scheduledMeals, options = {}) {
        return this.publishMealPlan(scheduledMeals, { 
            clearExisting: true, 
            ...options 
        });
    }

    async addMealToCalendar(meal, options = {}) {
        return this.publishMealPlan([meal], options);
    }

    getAuthenticationStatus() {
        return {
            isAuthenticated: this.isAuthenticated,
            calendarId: this.mealPlanCalendarId
        };
    }

    async testConnection() {
        try {
            if (!this.isAuthenticated) {
                return { success: false, message: 'Not authenticated' };
            }

            const calendars = await this.getCalendars();
            return { 
                success: true, 
                message: `Connected successfully. Found ${calendars.length} calendars.`,
                calendars: calendars.map(cal => ({ id: cal.id, name: cal.summary }))
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

// Global instance
window.googleCalendarIntegration = new GoogleCalendarIntegration();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GoogleCalendarIntegration;
}
