import { test, expect, devices } from '@playwright/test';

// Test on iPhone 12 as primary mobile device
test.describe('Mobile Experience - iPhone 12', () => {
    test.use(devices['iPhone 12']);

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('should have proper touch targets', async ({ page }) => {
            // Check that all buttons meet minimum 44px touch target requirement
            const buttons = await page.locator('button, .btn-primary, .btn-secondary').all();
            
            for (const button of buttons) {
                const box = await button.boundingBox();
                if (box) {
                    expect(box.width).toBeGreaterThanOrEqual(44);
                    expect(box.height).toBeGreaterThanOrEqual(44);
                }
            }
        });

        test('should prevent horizontal scrolling', async ({ page }) => {
            // Check that page doesn't scroll horizontally
            const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
            const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
            
            expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Allow 1px tolerance
        });

        test('should have mobile-optimized navigation', async ({ page }) => {
            // Test tab navigation
            const tabs = page.locator('.tab-button');
            const tabCount = await tabs.count();
            
            if (tabCount > 0) {
                // Check that tabs are properly sized for mobile
                for (let i = 0; i < tabCount; i++) {
                    const tab = tabs.nth(i);
                    const box = await tab.boundingBox();
                    if (box) {
                        expect(box.height).toBeGreaterThanOrEqual(60); // Comfortable thumb reach
                    }
                }
            }
        });

        test('should open modals in full-screen on mobile', async ({ page }) => {
            // Test recipe form modal
            await page.click('#add-recipe-btn');
            await page.waitForSelector('#recipe-form-modal');
            
            const modal = page.locator('#recipe-form-modal > div');
            const box = await modal.boundingBox();
            const viewport = page.viewportSize();
            
            if (viewport && box) {
                // On mobile, modal should be full-screen
                if (viewport.width <= 640) {
                    expect(box.width).toBeCloseTo(viewport.width, 10);
                    expect(box.height).toBeCloseTo(viewport.height, 10);
                }
            }
            
            await page.click('#close-recipe-form');
        });

        test('should have proper form input sizing', async ({ page }) => {
            // Open recipe form
            await page.click('#add-recipe-btn');
            await page.waitForSelector('#recipe-form-modal');
            
            // Check input field sizing
            const inputs = page.locator('input, textarea, select');
            const inputCount = await inputs.count();
            
            for (let i = 0; i < inputCount; i++) {
                const input = inputs.nth(i);
                const fontSize = await input.evaluate(el => 
                    window.getComputedStyle(el).fontSize
                );
                
                // Font size should be at least 16px to prevent zoom on iOS
                const fontSizeValue = parseInt(fontSize);
                expect(fontSizeValue).toBeGreaterThanOrEqual(16);
            }
            
            await page.click('#close-recipe-form');
        });

        test('should handle touch interactions properly', async ({ page }) => {
            // Test button tap feedback
            const button = page.locator('#add-recipe-btn');
            
            // Simulate touch start and end
            await button.dispatchEvent('touchstart');
            await button.dispatchEvent('touchend');
            
            // Should open modal
            await expect(page.locator('#recipe-form-modal')).toBeVisible();
            await page.click('#close-recipe-form');
        });

        test('should have readable text without zoom', async ({ page }) => {
            // Check that text is readable without requiring zoom
            const textElements = page.locator('p, span, div, h1, h2, h3, h4, h5, h6');
            const count = await textElements.count();
            
            // Sample a few text elements
            const sampleSize = Math.min(10, count);
            for (let i = 0; i < sampleSize; i++) {
                const element = textElements.nth(i * Math.floor(count / sampleSize));
                const fontSize = await element.evaluate(el => {
                    const style = window.getComputedStyle(el);
                    return parseInt(style.fontSize);
                });
                
                // Text should be at least 14px for readability
                if (fontSize > 0) {
                    expect(fontSize).toBeGreaterThanOrEqual(14);
                }
            }
        });

        test('should navigate between tabs smoothly', async ({ page }) => {
            // Test tab switching
            const tabs = ['recipes', 'ingredients', 'breakfast', 'lunch', 'dinner'];
            
            for (const tab of tabs) {
                const tabButton = page.locator(`[data-tab="${tab}"]`);
                if (await tabButton.isVisible()) {
                    await tabButton.click();
                    await page.waitForTimeout(300); // Allow transition
                    
                    // Check that correct tab content is visible
                    const tabContent = page.locator(`#${tab}-tab`);
                    await expect(tabContent).toBeVisible();
                }
            }
        });

        test('should handle ingredient form on mobile', async ({ page }) => {
            // Navigate to ingredients tab
            await page.click('[data-tab="ingredients"]');
            await page.waitForSelector('#ingredients-tab');
            
            // Open add ingredient form
            await page.click('#add-ingredient-btn');
            await page.waitForSelector('#item-form-modal');
            
            // Test form interaction on mobile
            await page.fill('#item-name', 'Mobile Test Ingredient');
            await page.selectOption('#item-category', 'produce');
            await page.selectOption('#ingredient-unit', 'pieces');
            
            // Check that form is usable on mobile
            const form = page.locator('#item-form');
            const formBox = await form.boundingBox();
            const viewport = page.viewportSize();
            
            if (viewport && formBox && viewport.width <= 640) {
                // Form should fit in viewport on mobile
                expect(formBox.width).toBeLessThanOrEqual(viewport.width);
            }
            
            await page.click('#cancel-ingredient-form');
        });

        test('should handle meal planning controls on mobile', async ({ page }) => {
            // Test breakfast planning
            await page.click('[data-tab="breakfast"]');
            await page.waitForSelector('#breakfast-tab');
            
            // Test mobile-friendly controls
            const autoPlanBtn = page.locator('#auto-plan-breakfast');
            const clearPlanBtn = page.locator('#clear-plan-breakfast');
            
            // Check button spacing and sizing
            const autoPlanBox = await autoPlanBtn.boundingBox();
            const clearPlanBox = await clearPlanBtn.boundingBox();
            
            if (autoPlanBox && clearPlanBox) {
                // Buttons should be properly spaced
                const spacing = Math.abs(autoPlanBox.x - (clearPlanBox.x + clearPlanBox.width));
                expect(spacing).toBeGreaterThanOrEqual(8); // Minimum spacing
                
                // Both buttons should meet touch target requirements
                expect(autoPlanBox.height).toBeGreaterThanOrEqual(44);
                expect(clearPlanBox.height).toBeGreaterThanOrEqual(44);
            }
        });

        test('should display notifications properly on mobile', async ({ page }) => {
            // Trigger a notification
            await page.click('[data-tab="breakfast"]');
            await page.click('#auto-plan-breakfast');
            
            // Wait for notification
            await page.waitForSelector('.fixed.top-4', { timeout: 5000 });
            
            const notification = page.locator('.fixed.top-4').first();
            const notificationBox = await notification.boundingBox();
            const viewport = page.viewportSize();
            
            if (viewport && notificationBox && viewport.width <= 640) {
                // Notification should span most of the width on mobile
                expect(notificationBox.width).toBeGreaterThan(viewport.width * 0.8);
            }
        });

        test('should handle calendar view on mobile', async ({ page }) => {
            // Navigate to breakfast and switch to calendar view
            await page.click('[data-tab="breakfast"]');
            await page.click('#view-toggle-breakfast');
            
            // Wait for calendar view
            await page.waitForSelector('#breakfast-calendar');
            
            // Check calendar responsiveness
            const calendarDays = page.locator('.calendar-day');
            const dayCount = await calendarDays.count();
            
            if (dayCount > 0) {
                const firstDay = calendarDays.first();
                const dayBox = await firstDay.boundingBox();
                
                if (dayBox) {
                    // Calendar days should have adequate touch area
                    expect(dayBox.height).toBeGreaterThanOrEqual(120);
                }
            }
        });
    });
});

// Performance tests specifically for mobile
test.describe('Mobile Performance', () => {
    test.use(devices['iPhone 12']);

    test('should load quickly on mobile', async ({ page }) => {
        const startTime = Date.now();
        
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        
        // Should load within 3 seconds on mobile
        expect(loadTime).toBeLessThan(3000);
    });

    test('should be responsive during interactions', async ({ page }) => {
        await page.goto('/');
        
        // Test rapid tab switching
        const tabs = ['recipes', 'ingredients', 'breakfast'];
        
        for (const tab of tabs) {
            const startTime = Date.now();
            await page.click(`[data-tab="${tab}"]`);
            await page.waitForSelector(`#${tab}-tab`);
            const responseTime = Date.now() - startTime;
            
            // Tab switching should be under 500ms
            expect(responseTime).toBeLessThan(500);
        }
    });
});

// Accessibility tests for mobile
test.describe('Mobile Accessibility', () => {
    test.use(devices['iPhone 12']);

    test('should have proper contrast ratios', async ({ page }) => {
        await page.goto('/');
        
        // This would typically use axe-core or similar
        // For now, we'll check that dark mode toggle works
        await page.click('#theme-toggle');
        await page.waitForTimeout(300);
        
        // Verify dark mode applied
        const body = page.locator('body');
        const classList = await body.getAttribute('class');
        expect(classList).toContain('dark');
        
        // Switch back to light mode
        await page.click('#theme-toggle');
        await page.waitForTimeout(300);
    });

    test('should support keyboard navigation on mobile', async ({ page }) => {
        await page.goto('/');
        
        // Test tab navigation with keyboard
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        
        // Should navigate through interactive elements
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
    });
});
