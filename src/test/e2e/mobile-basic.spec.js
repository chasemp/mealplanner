import { test, expect, devices } from '@playwright/test';

// Configure mobile device for all tests
test.use(devices['iPhone 12']);

// Basic mobile experience tests
test.describe('Mobile Experience', () => {

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

    test('should open modals in full-screen on mobile', async ({ page }) => {
        // Test recipe form modal
        await page.click('#add-recipe-btn');
        await page.waitForSelector('#recipe-form-modal');
        
        const modal = page.locator('#recipe-form-modal > div');
        const box = await modal.boundingBox();
        const viewport = page.viewportSize();
        
        if (viewport && box) {
            // On mobile, modal should be full-screen
            expect(box.width).toBeCloseTo(viewport.width, 50);
            expect(box.height).toBeCloseTo(viewport.height, 50);
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
        
        for (let i = 0; i < Math.min(5, inputCount); i++) {
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

    test('should navigate between tabs smoothly', async ({ page }) => {
        // Test tab switching
        const tabs = ['recipes', 'ingredients', 'breakfast'];
        
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
            // Both buttons should meet touch target requirements
            expect(autoPlanBox.height).toBeGreaterThanOrEqual(44);
            expect(clearPlanBox.height).toBeGreaterThanOrEqual(44);
        }
    });
});

// Performance tests for mobile
test.describe('Mobile Performance', () => {

    test('should load quickly on mobile', async ({ page }) => {
        const startTime = Date.now();
        
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        
        // Should load within 5 seconds on mobile (generous for CI)
        expect(loadTime).toBeLessThan(5000);
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
            
            // Tab switching should be under 1 second (generous for CI)
            expect(responseTime).toBeLessThan(1000);
        }
    });
});
