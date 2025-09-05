// Unit tests for Google Calendar Integration
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock SecureTokenStorage
class MockSecureTokenStorage {
    constructor() {
        this.storage = new Map();
    }

    async storeTokens(tokens) {
        this.storage.set('google_calendar_tokens', tokens);
        return Promise.resolve();
    }

    async getTokens() {
        return Promise.resolve(this.storage.get('google_calendar_tokens') || null);
    }

    async clearTokens() {
        this.storage.delete('google_calendar_tokens');
        return Promise.resolve();
    }

    simpleEncrypt(text) {
        return btoa(text);
    }

    simpleDecrypt(encrypted) {
        return atob(encrypted);
    }
}

// Mock GoogleCalendarIntegration
class MockGoogleCalendarIntegration {
    constructor() {
        this.isAuthenticated = false;
        this.gapi = null;
        this.calendarId = 'primary';
        this.mealPlanCalendarId = null;
        this.authInstance = null;
        this.managedMode = true;
        
        this.CLIENT_ID = 'test-client-id.googleusercontent.com';
        this.API_KEY = 'test-api-key';
        this.DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
        this.SCOPES = 'https://www.googleapis.com/auth/calendar';
        
        this.tokenStorage = new MockSecureTokenStorage();
        this.initializeMockAPI();
    }

    isDevelopmentMode() {
        return true; // Always return true for testing
    }

    getClientId() {
        return 'test-client-id.googleusercontent.com';
    }

    getApiKey() {
        return 'test-api-key';
    }

    setManagedMode(enabled) {
        this.managedMode = enabled;
        console.log(`🔧 Calendar management mode: ${enabled ? 'Managed' : 'Collaborative'}`);
    }

    getManagedMode() {
        return this.managedMode;
    }

    initializeMockAPI() {
        this.gapi = {
            client: {
                calendar: {
                    calendars: {
                        list: vi.fn().mockResolvedValue({
                            result: {
                                items: [
                                    { id: 'primary', summary: 'Primary Calendar' },
                                    { id: 'meal-plan-calendar', summary: 'Meal Planning' }
                                ]
                            }
                        }),
                        insert: vi.fn().mockResolvedValue({
                            result: { id: 'meal-plan-calendar', summary: 'Meal Planning' }
                        })
                    },
                    events: {
                        list: vi.fn().mockResolvedValue({ result: { items: [] } }),
                        insert: vi.fn().mockImplementation((params) => {
                            const resource = params.resource;
                            return Promise.resolve({
                                result: {
                                    id: 'mock-event-' + Date.now(),
                                    summary: resource.summary,
                                    description: resource.description,
                                    start: resource.start,
                                    end: resource.end
                                }
                            });
                        }),
                        delete: vi.fn().mockResolvedValue({ result: {} })
                    }
                }
            },
            auth2: {
                getAuthInstance: () => ({
                    isSignedIn: {
                        get: () => this.isAuthenticated,
                        listen: vi.fn()
                    },
                    signIn: vi.fn().mockResolvedValue(),
                    signOut: vi.fn().mockResolvedValue()
                })
            }
        };
        
        this.authInstance = this.gapi.auth2.getAuthInstance();
    }

    async authenticate() {
        try {
            if (this.isAuthenticated) {
                return true;
            }

            await this.authInstance.signIn();
            this.isAuthenticated = true;
            this.updateSigninStatus(true);
            
            return true;
        } catch (error) {
            console.error('Authentication failed:', error);
            return false;
        }
    }

    async signOut() {
        try {
            if (this.authInstance && this.isAuthenticated) {
                await this.authInstance.signOut();
                this.isAuthenticated = false;
                this.updateSigninStatus(false);
            }
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    }

    updateSigninStatus(isSignedIn) {
        this.isAuthenticated = isSignedIn;
        console.log(`🔐 Google Calendar authentication status: ${isSignedIn ? 'Signed in' : 'Signed out'}`);
    }

    async getCalendars() {
        if (!this.isAuthenticated) {
            throw new Error('Not authenticated with Google Calendar');
        }

        const response = await this.gapi.client.calendar.calendars.list();
        return response.result.items || [];
    }

    async createMealPlanCalendar() {
        if (!this.isAuthenticated) {
            throw new Error('Not authenticated with Google Calendar');
        }

        const response = await this.gapi.client.calendar.calendars.insert({
            resource: {
                summary: 'Meal Planning',
                description: 'Automated meal planning schedule from MealPlanner app',
                timeZone: 'America/New_York'
            }
        });

        this.mealPlanCalendarId = response.result.id;
        return response.result;
    }

    async publishMealPlan(scheduledMeals, options = {}) {
        if (!this.isAuthenticated) {
            const authenticated = await this.authenticate();
            if (!authenticated) {
                throw new Error('Authentication required');
            }
        }

        if (!this.mealPlanCalendarId) {
            await this.ensureMealPlanCalendar();
        }

        const shouldClear = this.managedMode || options.clearExisting;
        if (shouldClear) {
            await this.clearMealPlanEvents();
        }

        const createdEvents = [];
        for (const meal of scheduledMeals) {
            try {
                if (!this.managedMode && !options.clearExisting) {
                    const hasConflict = await this.checkForConflicts(meal);
                    if (hasConflict) {
                        continue;
                    }
                }

                const event = await this.createMealEvent(meal, options);
                createdEvents.push(event);
            } catch (error) {
                console.error(`Failed to create event for meal: ${meal.name}`, error);
            }
        }

        return createdEvents;
    }

    async checkForConflicts(meal) {
        const response = await this.gapi.client.calendar.events.list({
            calendarId: this.mealPlanCalendarId,
            timeMin: new Date(meal.date).toISOString(),
            timeMax: new Date(meal.date).toISOString(),
            singleEvents: true
        });

        const existingEvents = response.result.items || [];
        return existingEvents.length > 0;
    }

    async createMealEvent(meal, options = {}) {
        const startDate = new Date(meal.date);
        const endDate = new Date(meal.date);

        const mealTimes = {
            breakfast: { start: 8, end: 9 },
            lunch: { start: 12, end: 13 },
            dinner: { start: 18, end: 19 }
        };

        const times = mealTimes[meal.mealType] || mealTimes.dinner;
        startDate.setUTCHours(times.start, 0, 0, 0);
        endDate.setUTCHours(times.end, 0, 0, 0);

        const eventResource = {
            summary: `${this.capitalizeMealType(meal.mealType)}: ${meal.name}`,
            description: this.createEventDescription(meal, options),
            start: {
                dateTime: startDate.toISOString(),
                timeZone: 'America/New_York'
            },
            end: {
                dateTime: endDate.toISOString(),
                timeZone: 'America/New_York'
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
        }
        
        return description;
    }

    capitalizeMealType(mealType) {
        return mealType.charAt(0).toUpperCase() + mealType.slice(1);
    }

    async ensureMealPlanCalendar() {
        const calendars = await this.getCalendars();
        const existingCalendar = calendars.find(cal => cal.summary === 'Meal Planning');

        if (existingCalendar) {
            this.mealPlanCalendarId = existingCalendar.id;
        } else {
            await this.createMealPlanCalendar();
        }
    }

    async clearMealPlanEvents() {
        const response = await this.gapi.client.calendar.events.list({
            calendarId: this.mealPlanCalendarId,
            q: 'MealPlanner',
            maxResults: 100
        });

        const events = response.result.items || [];
        
        for (const event of events) {
            await this.gapi.client.calendar.events.delete({
                calendarId: this.mealPlanCalendarId,
                eventId: event.id
            });
        }
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

    async syncMealPlan(scheduledMeals, options = {}) {
        return this.publishMealPlan(scheduledMeals, { 
            clearExisting: true, 
            ...options 
        });
    }

    getAuthenticationStatus() {
        return {
            isAuthenticated: this.isAuthenticated,
            calendarId: this.mealPlanCalendarId
        };
    }
}

describe('Google Calendar Integration', () => {
    let dom
    let integration
    let mockConsole

    beforeEach(() => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <div id="google-calendar-btn">Connect</div>
            </body>
            </html>
        `)
        
        global.document = dom.window.document
        global.window = dom.window
        global.CustomEvent = dom.window.CustomEvent

        // Mock console methods
        mockConsole = {
            log: vi.fn(),
            warn: vi.fn(),
            error: vi.fn()
        }
        global.console = mockConsole

        integration = new MockGoogleCalendarIntegration()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('Initialization', () => {
        it('should initialize with correct default values', () => {
            expect(integration.isAuthenticated).toBe(false)
            expect(integration.managedMode).toBe(true)
            expect(integration.CLIENT_ID).toBe('test-client-id.googleusercontent.com')
            expect(integration.API_KEY).toBe('test-api-key')
        })

        it('should initialize token storage', () => {
            expect(integration.tokenStorage).toBeInstanceOf(MockSecureTokenStorage)
        })

        it('should initialize mock API in development mode', () => {
            expect(integration.gapi).toBeTruthy()
            expect(integration.gapi.client.calendar).toBeTruthy()
        })
    })

    describe('Authentication', () => {
        it('should authenticate successfully', async () => {
            const result = await integration.authenticate()
            
            expect(result).toBe(true)
            expect(integration.isAuthenticated).toBe(true)
            expect(integration.authInstance.signIn).toHaveBeenCalled()
        })

        it('should return true if already authenticated', async () => {
            integration.isAuthenticated = true
            
            const result = await integration.authenticate()
            
            expect(result).toBe(true)
            expect(integration.authInstance.signIn).not.toHaveBeenCalled()
        })

        it('should sign out successfully', async () => {
            integration.isAuthenticated = true
            
            await integration.signOut()
            
            expect(integration.isAuthenticated).toBe(false)
            expect(integration.authInstance.signOut).toHaveBeenCalled()
        })

        it('should update signin status correctly', () => {
            integration.updateSigninStatus(true)
            
            expect(integration.isAuthenticated).toBe(true)
            expect(console.log).toHaveBeenCalledWith('🔐 Google Calendar authentication status: Signed in')
        })
    })

    describe('Calendar Management', () => {
        beforeEach(async () => {
            await integration.authenticate()
        })

        it('should get calendars when authenticated', async () => {
            const calendars = await integration.getCalendars()
            
            expect(calendars).toHaveLength(2)
            expect(calendars[0].summary).toBe('Primary Calendar')
            expect(calendars[1].summary).toBe('Meal Planning')
        })

        it('should throw error when getting calendars without authentication', async () => {
            integration.isAuthenticated = false
            
            await expect(integration.getCalendars()).rejects.toThrow('Not authenticated with Google Calendar')
        })

        it('should create meal plan calendar', async () => {
            const result = await integration.createMealPlanCalendar()
            
            expect(result.id).toBe('meal-plan-calendar')
            expect(result.summary).toBe('Meal Planning')
            expect(integration.mealPlanCalendarId).toBe('meal-plan-calendar')
        })

        it('should ensure meal plan calendar exists', async () => {
            await integration.ensureMealPlanCalendar()
            
            expect(integration.mealPlanCalendarId).toBe('meal-plan-calendar')
        })
    })

    describe('Management Mode', () => {
        it('should set managed mode correctly', () => {
            integration.setManagedMode(false)
            
            expect(integration.managedMode).toBe(false)
            expect(console.log).toHaveBeenCalledWith('🔧 Calendar management mode: Collaborative')
        })

        it('should get managed mode correctly', () => {
            integration.managedMode = false
            
            const result = integration.getManagedMode()
            
            expect(result).toBe(false)
        })

        it('should default to managed mode', () => {
            const result = integration.getManagedMode()
            
            expect(result).toBe(true)
        })
    })

    describe('Event Creation', () => {
        beforeEach(async () => {
            await integration.authenticate()
            await integration.ensureMealPlanCalendar()
        })

        it('should create meal event with correct properties', async () => {
            const meal = {
                id: 'meal-1',
                name: 'Spaghetti Carbonara',
                mealType: 'dinner',
                date: new Date('2024-12-01'),
                recipe: {
                    name: 'Spaghetti Carbonara',
                    ingredients: [
                        { name: 'Spaghetti', quantity: '400g', unit: 'g' }
                    ]
                }
            }

            const event = await integration.createMealEvent(meal, { includeIngredients: true })
            
            expect(event.summary).toBe('Dinner: Spaghetti Carbonara')
            expect(event.description).toContain('Recipe: Spaghetti Carbonara')
            expect(event.description).toContain('Ingredients:')
            expect(event.description).toContain('• 400g g Spaghetti')
        })

        it('should set correct meal times', async () => {
            const breakfastMeal = {
                id: 'meal-1',
                name: 'Pancakes',
                mealType: 'breakfast',
                date: new Date('2024-12-01T00:00:00Z') // Use UTC to avoid timezone issues
            }

            const event = await integration.createMealEvent(breakfastMeal)
            
            // Check that the time is set correctly (allowing for timezone differences)
            const startTime = new Date(event.start.dateTime)
            const endTime = new Date(event.end.dateTime)
            
            expect(startTime.getUTCHours()).toBe(8) // 8 AM UTC for breakfast
            expect(endTime.getUTCHours()).toBe(9)   // 9 AM UTC for breakfast
        })

        it('should create event description with options', () => {
            const meal = {
                name: 'Test Meal',
                recipe: {
                    name: 'Test Recipe',
                    ingredients: [{ name: 'Test Ingredient', quantity: '1', unit: 'cup' }],
                    instructions: 'Test instructions'
                }
            }

            const description = integration.createEventDescription(meal, {
                includeIngredients: true,
                includeInstructions: true
            })
            
            expect(description).toContain('Recipe: Test Recipe')
            expect(description).toContain('Ingredients:')
            expect(description).toContain('• 1 cup Test Ingredient')
            expect(description).toContain('Instructions:')
            expect(description).toContain('Test instructions')
        })
    })

    describe('Meal Plan Publishing', () => {
        beforeEach(async () => {
            await integration.authenticate()
        })

        it('should publish meal plan in managed mode', async () => {
            const meals = [
                {
                    id: 'meal-1',
                    name: 'Breakfast Meal',
                    mealType: 'breakfast',
                    date: new Date('2024-12-01')
                },
                {
                    id: 'meal-2',
                    name: 'Dinner Meal',
                    mealType: 'dinner',
                    date: new Date('2024-12-01')
                }
            ]

            integration.setManagedMode(true)
            const events = await integration.publishMealPlan(meals)
            
            expect(events).toHaveLength(2)
            expect(integration.gapi.client.calendar.events.insert).toHaveBeenCalledTimes(2)
        })

        it('should sync meal plan with clear existing', async () => {
            const meals = [
                {
                    id: 'meal-1',
                    name: 'Test Meal',
                    mealType: 'dinner',
                    date: new Date('2024-12-01')
                }
            ]

            const events = await integration.syncMealPlan(meals)
            
            expect(events).toHaveLength(1)
            expect(integration.gapi.client.calendar.events.list).toHaveBeenCalled()
        })

        it('should handle authentication requirement', async () => {
            integration.isAuthenticated = false
            const meals = [{ id: 'meal-1', name: 'Test', mealType: 'dinner', date: new Date() }]

            const events = await integration.publishMealPlan(meals)
            
            expect(integration.isAuthenticated).toBe(true)
            expect(events).toHaveLength(1)
        })

        it('should skip conflicting meals in collaborative mode', async () => {
            integration.setManagedMode(false)
            
            // Mock conflict detection
            vi.spyOn(integration, 'checkForConflicts').mockResolvedValue(true)
            
            const meals = [
                {
                    id: 'meal-1',
                    name: 'Conflicting Meal',
                    mealType: 'dinner',
                    date: new Date('2024-12-01')
                }
            ]

            const events = await integration.publishMealPlan(meals)
            
            expect(events).toHaveLength(0)
            expect(integration.checkForConflicts).toHaveBeenCalled()
        })
    })

    describe('Connection Testing', () => {
        it('should test connection successfully when authenticated', async () => {
            await integration.authenticate()
            
            const result = await integration.testConnection()
            
            expect(result.success).toBe(true)
            expect(result.message).toContain('Connected successfully')
            expect(result.calendars).toHaveLength(2)
        })

        it('should fail connection test when not authenticated', async () => {
            const result = await integration.testConnection()
            
            expect(result.success).toBe(false)
            expect(result.message).toBe('Not authenticated')
        })
    })

    describe('Utility Methods', () => {
        it('should capitalize meal type correctly', () => {
            expect(integration.capitalizeMealType('breakfast')).toBe('Breakfast')
            expect(integration.capitalizeMealType('lunch')).toBe('Lunch')
            expect(integration.capitalizeMealType('dinner')).toBe('Dinner')
        })

        it('should get authentication status', () => {
            integration.isAuthenticated = true
            integration.mealPlanCalendarId = 'test-calendar'
            
            const status = integration.getAuthenticationStatus()
            
            expect(status.isAuthenticated).toBe(true)
            expect(status.calendarId).toBe('test-calendar')
        })

        it('should detect development mode', () => {
            const isDev = integration.isDevelopmentMode()
            
            expect(isDev).toBe(true)
        })
    })

    describe('Error Handling', () => {
        it('should handle authentication failure', async () => {
            integration.authInstance.signIn.mockRejectedValue(new Error('Auth failed'))
            
            const result = await integration.authenticate()
            
            expect(result).toBe(false)
            expect(console.error).toHaveBeenCalledWith('Authentication failed:', expect.any(Error))
        })

        it('should handle calendar creation failure', async () => {
            await integration.authenticate()
            integration.gapi.client.calendar.calendars.insert.mockRejectedValue(new Error('Calendar creation failed'))
            
            await expect(integration.createMealPlanCalendar()).rejects.toThrow('Calendar creation failed')
        })

        it('should handle event creation failure', async () => {
            await integration.authenticate()
            await integration.ensureMealPlanCalendar()
            
            integration.gapi.client.calendar.events.insert.mockRejectedValue(new Error('Event creation failed'))
            
            const meal = { id: 'meal-1', name: 'Test', mealType: 'dinner', date: new Date() }
            
            await expect(integration.createMealEvent(meal)).rejects.toThrow('Event creation failed')
        })
    })

    describe('Token Storage', () => {
        it('should store tokens securely', async () => {
            const tokens = {
                access_token: 'test-access-token',
                refresh_token: 'test-refresh-token',
                expires_at: Date.now() + 3600000
            }

            await integration.tokenStorage.storeTokens(tokens)
            const retrieved = await integration.tokenStorage.getTokens()
            
            expect(retrieved).toEqual(tokens)
        })

        it('should clear tokens', async () => {
            const tokens = { access_token: 'test-token' }
            await integration.tokenStorage.storeTokens(tokens)
            
            await integration.tokenStorage.clearTokens()
            const retrieved = await integration.tokenStorage.getTokens()
            
            expect(retrieved).toBeNull()
        })

        it('should handle encryption/decryption', () => {
            const text = 'test-data'
            const encrypted = integration.tokenStorage.simpleEncrypt(text)
            const decrypted = integration.tokenStorage.simpleDecrypt(encrypted)
            
            expect(decrypted).toBe(text)
            expect(encrypted).not.toBe(text)
        })
    })
})
