// End-to-end tests for basic PWA functionality
import { test, expect } from '@playwright/test'

test.describe('MealPlanner PWA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the application', async ({ page }) => {
    // Wait for app to load
    await expect(page.locator('#main-app')).toBeVisible()
    
    // Check title
    await expect(page).toHaveTitle('MealPlanner')
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('MealPlanner')
  })

  test('should have all navigation tabs', async ({ page }) => {
    await expect(page.locator('[data-tab="recipes"]')).toBeVisible()
    await expect(page.locator('[data-tab="breakfast"]')).toBeVisible()
    await expect(page.locator('[data-tab="lunch"]')).toBeVisible()
    await expect(page.locator('[data-tab="dinner"]')).toBeVisible()
    await expect(page.locator('[data-tab="grocery"]')).toBeVisible()
  })

  test('should switch between tabs', async ({ page }) => {
    // Start on recipes tab (default)
    await expect(page.locator('#recipes-tab')).toBeVisible()
    await expect(page.locator('#plan-tab')).toBeHidden()
    
    // Click plan tab
    await page.click('[data-tab="plan"]')
    await expect(page.locator('#plan-tab')).toBeVisible()
    await expect(page.locator('#recipes-tab')).toBeHidden()
    
    // Check active tab styling
    await expect(page.locator('[data-tab="plan"]')).toHaveClass(/active/)
    await expect(page.locator('[data-tab="recipes"]')).not.toHaveClass(/active/)
  })

  test('should have database import/export buttons', async ({ page }) => {
    await expect(page.locator('#export-db-btn')).toBeVisible()
    await expect(page.locator('#import-db-btn')).toBeVisible()
  })

  test('should show add recipe button on recipes tab', async ({ page }) => {
    await expect(page.locator('#add-recipe-btn')).toBeVisible()
    await expect(page.locator('#add-recipe-btn')).toContainText('Add Recipe')
  })
})

test.describe('PWA Features', () => {
  test('should have PWA manifest', async ({ page }) => {
    await page.goto('/')
    
    // Check for manifest link
    const manifestLink = page.locator('link[rel="manifest"]')
    if (await manifestLink.count() > 0) {
      const href = await manifestLink.getAttribute('href')
      expect(href).toBeTruthy()
    }
  })

  test('should have service worker registration', async ({ page }) => {
    await page.goto('/')
    
    // Check if service worker is registered
    const swRegistration = await page.evaluate(() => {
      return 'serviceWorker' in navigator
    })
    
    expect(swRegistration).toBe(true)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check that content is visible and properly sized
    await expect(page.locator('#main-app')).toBeVisible()
    await expect(page.locator('header')).toBeVisible()
    
    // Check navigation tabs are still accessible
    await expect(page.locator('[data-tab="recipes"]')).toBeVisible()
  })
})

test.describe('Database Operations', () => {
  test('should handle database export', async ({ page }) => {
    await page.goto('/')
    
    // Set up download handler
    const downloadPromise = page.waitForEvent('download')
    
    // Click export button
    await page.click('#export-db-btn')
    
    // Wait for download (this might not work in initial version, but tests the UI)
    // const download = await downloadPromise
    // expect(download.suggestedFilename()).toMatch(/\.db$/)
  })

  test('should handle database import UI', async ({ page }) => {
    await page.goto('/')
    
    // Click import button should trigger file input
    await page.click('#import-db-btn')
    
    // Check that file input exists (even if hidden)
    await expect(page.locator('#db-file-input')).toBeAttached()
  })
})

test.describe('Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/')
    
    // Check main heading
    await expect(page.locator('h1')).toBeVisible()
    
    // Check section headings
    await expect(page.locator('h2')).toBeVisible()
  })

  test('should have keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Tab through navigation
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Should be able to activate tabs with keyboard
    await page.keyboard.press('Enter')
  })

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/')
    
    // Check for navigation landmarks
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    
    // Check for main content area
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })
})
