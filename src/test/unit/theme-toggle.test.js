// Unit tests for theme toggle functionality
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock the MealPlannerApp class theme methods
class MockMealPlannerApp {
    constructor() {
        this.version = '2025.09.05.0910'
    }

    initializeTheme() {
        console.log('🎨 Initializing theme system...')
        
        try {
            // Check for saved theme preference or default to light mode
            let savedTheme = null;
            try {
                savedTheme = localStorage.getItem('theme');
            } catch (error) {
                console.warn('localStorage not available:', error);
            }
            
            let prefersDark = false;
            try {
                prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            } catch (error) {
                console.warn('matchMedia not available:', error);
            }
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.documentElement.classList.add('dark')
                this.updateThemeIcons(true)
            } else {
                document.documentElement.classList.remove('dark')
                this.updateThemeIcons(false)
            }
        } catch (error) {
            console.warn('Theme initialization failed:', error);
            // Default to light theme
            document.documentElement.classList.remove('dark')
            this.updateThemeIcons(false)
        }
        
        console.log('✅ Theme system initialized')
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark')
        
        if (isDark) {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            this.updateThemeIcons(false)
            console.log('🌞 Switched to light mode')
        } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            this.updateThemeIcons(true)
            console.log('🌙 Switched to dark mode')
        }
    }

    updateThemeIcons(isDark) {
        const lightIcon = document.getElementById('theme-toggle-light-icon')
        const darkIcon = document.getElementById('theme-toggle-dark-icon')
        
        if (lightIcon && darkIcon) {
            if (isDark) {
                lightIcon.classList.remove('hidden')
                darkIcon.classList.add('hidden')
            } else {
                lightIcon.classList.add('hidden')
                darkIcon.classList.remove('hidden')
            }
        }
    }
}

describe('Theme Toggle Functionality', () => {
    let dom
    let app
    let mockLocalStorage
    let mockMatchMedia

    beforeEach(() => {
        // Create DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <button id="theme-toggle">
                    <svg id="theme-toggle-light-icon" class="hidden"></svg>
                    <svg id="theme-toggle-dark-icon"></svg>
                </button>
            </body>
            </html>
        `)
        
        global.document = dom.window.document
        global.window = dom.window

        // Mock localStorage
        mockLocalStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn()
        }
        global.localStorage = mockLocalStorage

        // Mock matchMedia
        mockMatchMedia = vi.fn(() => ({
            matches: false,
            addListener: vi.fn(),
            removeListener: vi.fn()
        }))
        global.window.matchMedia = mockMatchMedia

        // Mock console methods
        global.console = {
            log: vi.fn(),
            error: vi.fn(),
            warn: vi.fn()
        }

        app = new MockMealPlannerApp()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('Theme Initialization', () => {
        it('should initialize with light theme by default', () => {
            mockLocalStorage.getItem.mockReturnValue(null)
            mockMatchMedia.mockReturnValue({ matches: false })
            
            app.initializeTheme()
            
            expect(document.documentElement.classList.contains('dark')).toBe(false)
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme')
        })

        it('should initialize with dark theme if saved in localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue('dark')
            
            app.initializeTheme()
            
            expect(document.documentElement.classList.contains('dark')).toBe(true)
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme')
        })

        it('should initialize with light theme if saved in localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue('light')
            
            app.initializeTheme()
            
            expect(document.documentElement.classList.contains('dark')).toBe(false)
        })

        it('should respect system preference when no saved theme', () => {
            mockLocalStorage.getItem.mockReturnValue(null)
            mockMatchMedia.mockReturnValue({ matches: true }) // prefers dark
            
            app.initializeTheme()
            
            expect(document.documentElement.classList.contains('dark')).toBe(true)
        })

        it('should update theme icons correctly on initialization', () => {
            const lightIcon = document.getElementById('theme-toggle-light-icon')
            const darkIcon = document.getElementById('theme-toggle-dark-icon')
            
            mockLocalStorage.getItem.mockReturnValue('dark')
            app.initializeTheme()
            
            expect(lightIcon.classList.contains('hidden')).toBe(false)
            expect(darkIcon.classList.contains('hidden')).toBe(true)
        })
    })

    describe('Theme Toggle', () => {
        it('should toggle from light to dark theme', () => {
            // Start in light mode
            document.documentElement.classList.remove('dark')
            
            app.toggleTheme()
            
            expect(document.documentElement.classList.contains('dark')).toBe(true)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
        })

        it('should toggle from dark to light theme', () => {
            // Start in dark mode
            document.documentElement.classList.add('dark')
            
            app.toggleTheme()
            
            expect(document.documentElement.classList.contains('dark')).toBe(false)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light')
        })

        it('should update icons when toggling to dark mode', () => {
            const lightIcon = document.getElementById('theme-toggle-light-icon')
            const darkIcon = document.getElementById('theme-toggle-dark-icon')
            
            // Start in light mode
            document.documentElement.classList.remove('dark')
            lightIcon.classList.add('hidden')
            darkIcon.classList.remove('hidden')
            
            app.toggleTheme()
            
            expect(lightIcon.classList.contains('hidden')).toBe(false)
            expect(darkIcon.classList.contains('hidden')).toBe(true)
        })

        it('should update icons when toggling to light mode', () => {
            const lightIcon = document.getElementById('theme-toggle-light-icon')
            const darkIcon = document.getElementById('theme-toggle-dark-icon')
            
            // Start in dark mode
            document.documentElement.classList.add('dark')
            lightIcon.classList.remove('hidden')
            darkIcon.classList.add('hidden')
            
            app.toggleTheme()
            
            expect(lightIcon.classList.contains('hidden')).toBe(true)
            expect(darkIcon.classList.contains('hidden')).toBe(false)
        })

        it('should log theme changes', () => {
            // Toggle to dark
            document.documentElement.classList.remove('dark')
            app.toggleTheme()
            expect(console.log).toHaveBeenCalledWith('🌙 Switched to dark mode')
            
            // Toggle to light
            app.toggleTheme()
            expect(console.log).toHaveBeenCalledWith('🌞 Switched to light mode')
        })
    })

    describe('Icon Updates', () => {
        it('should show light icon in dark mode', () => {
            const lightIcon = document.getElementById('theme-toggle-light-icon')
            const darkIcon = document.getElementById('theme-toggle-dark-icon')
            
            app.updateThemeIcons(true)
            
            expect(lightIcon.classList.contains('hidden')).toBe(false)
            expect(darkIcon.classList.contains('hidden')).toBe(true)
        })

        it('should show dark icon in light mode', () => {
            const lightIcon = document.getElementById('theme-toggle-light-icon')
            const darkIcon = document.getElementById('theme-toggle-dark-icon')
            
            app.updateThemeIcons(false)
            
            expect(lightIcon.classList.contains('hidden')).toBe(true)
            expect(darkIcon.classList.contains('hidden')).toBe(false)
        })

        it('should handle missing icons gracefully', () => {
            // Remove icons from DOM
            document.getElementById('theme-toggle-light-icon').remove()
            document.getElementById('theme-toggle-dark-icon').remove()
            
            expect(() => {
                app.updateThemeIcons(true)
                app.updateThemeIcons(false)
            }).not.toThrow()
        })
    })

    describe('Theme Persistence', () => {
        it('should save dark theme preference', () => {
            document.documentElement.classList.remove('dark')
            app.toggleTheme()
            
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
        })

        it('should save light theme preference', () => {
            document.documentElement.classList.add('dark')
            app.toggleTheme()
            
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light')
        })

        it('should load saved theme preference on initialization', () => {
            mockLocalStorage.getItem.mockReturnValue('dark')
            
            app.initializeTheme()
            
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme')
            expect(document.documentElement.classList.contains('dark')).toBe(true)
        })
    })

    describe('System Preference Detection', () => {
        it('should detect system dark mode preference', () => {
            mockLocalStorage.getItem.mockReturnValue(null)
            mockMatchMedia.mockReturnValue({ matches: true })
            
            app.initializeTheme()
            
            expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
            expect(document.documentElement.classList.contains('dark')).toBe(true)
        })

        it('should detect system light mode preference', () => {
            mockLocalStorage.getItem.mockReturnValue(null)
            mockMatchMedia.mockReturnValue({ matches: false })
            
            app.initializeTheme()
            
            expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
            expect(document.documentElement.classList.contains('dark')).toBe(false)
        })

        it('should prioritize saved preference over system preference', () => {
            mockLocalStorage.getItem.mockReturnValue('light')
            mockMatchMedia.mockReturnValue({ matches: true }) // System prefers dark
            
            app.initializeTheme()
            
            // Should use saved preference (light) instead of system preference (dark)
            expect(document.documentElement.classList.contains('dark')).toBe(false)
        })
    })

    describe('Multiple Toggles', () => {
        it('should handle multiple theme toggles correctly', () => {
            // Start in light mode
            document.documentElement.classList.remove('dark')
            
            // Toggle to dark
            app.toggleTheme()
            expect(document.documentElement.classList.contains('dark')).toBe(true)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
            
            // Toggle back to light
            app.toggleTheme()
            expect(document.documentElement.classList.contains('dark')).toBe(false)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light')
            
            // Toggle to dark again
            app.toggleTheme()
            expect(document.documentElement.classList.contains('dark')).toBe(true)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
        })
    })

    describe('Edge Cases', () => {
        it('should handle localStorage errors gracefully', () => {
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('localStorage not available')
            })
            
            expect(() => {
                app.initializeTheme()
            }).not.toThrow()
        })

        it('should handle matchMedia not supported', () => {
            global.window.matchMedia = undefined
            mockLocalStorage.getItem.mockReturnValue(null)
            
            expect(() => {
                app.initializeTheme()
            }).not.toThrow()
        })
    })
})
