// E2E tests for calendar functionality
import { test, expect } from '@playwright/test'

test.describe('Calendar Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    
    // Wait for app to initialize
    await page.waitForSelector('[data-testid="app-initialized"]', { timeout: 10000 })
  })

  test('should display calendar when clicking dinner tab', async ({ page }) => {
    // Click on dinner tab
    await page.getByRole('button', { name: 'Dinner' }).click()
    
    // Wait for calendar to load
    await page.waitForSelector('.simple-calendar', { timeout: 5000 })
    
    // Verify calendar elements are present
    await expect(page.locator('.simple-calendar')).toBeVisible()
    await expect(page.getByText('December 2024 - Dinner')).toBeVisible()
    await expect(page.getByText('✅ Calendar loaded successfully!')).toBeVisible()
  })

  test('should show clickable calendar days', async ({ page }) => {
    // Navigate to dinner tab
    await page.getByRole('button', { name: 'Dinner' }).click()
    await page.waitForSelector('.simple-calendar')
    
    // Verify calendar days are present and clickable
    const calendarDays = page.locator('.calendar-day')
    await expect(calendarDays.first()).toBeVisible()
    
    // Check that days have the expected content
    await expect(page.getByText('Click to add dinner').first()).toBeVisible()
  })

  test('should trigger meal scheduling dialog when clicking a date', async ({ page }) => {
    // Navigate to dinner tab
    await page.getByRole('button', { name: 'Dinner' }).click()
    await page.waitForSelector('.simple-calendar')
    
    // Set up dialog handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Schedule dinner meal for Dec')
      await dialog.accept()
    })
    
    // Click on a calendar day
    await page.getByText('15 Click to add dinner').click()
  })

  test('should have navigation buttons', async ({ page }) => {
    // Navigate to dinner tab
    await page.getByRole('button', { name: 'Dinner' }).click()
    await page.waitForSelector('.simple-calendar')
    
    // Verify navigation buttons exist
    await expect(page.getByRole('button', { name: '← Previous' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Next →' })).toBeVisible()
  })

  test('should work for all meal types', async ({ page }) => {
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner']
    
    for (const mealType of mealTypes) {
      // Click on meal type tab
      await page.getByRole('button', { name: mealType }).click()
      
      // Wait for calendar to load (or other content)
      await page.waitForTimeout(1000)
      
      // Verify the tab is active
      const tabButton = page.getByRole('button', { name: mealType })
      await expect(tabButton).toHaveClass(/active/)
    }
  })

  test('should display calendar view and auto plan buttons', async ({ page }) => {
    // Navigate to dinner tab
    await page.getByRole('button', { name: 'Dinner' }).click()
    
    // Verify action buttons are present
    await expect(page.getByRole('button', { name: '📅 Calendar View' })).toBeVisible()
    await expect(page.getByRole('button', { name: '🤖 Auto Plan' })).toBeVisible()
  })

  test('should maintain calendar state when switching tabs', async ({ page }) => {
    // Navigate to dinner tab and verify calendar loads
    await page.getByRole('button', { name: 'Dinner' }).click()
    await page.waitForSelector('.simple-calendar')
    
    // Switch to recipes tab
    await page.getByRole('button', { name: 'Recipes' }).click()
    await expect(page.getByText('Recipes')).toBeVisible()
    
    // Switch back to dinner tab
    await page.getByRole('button', { name: 'Dinner' }).click()
    
    // Calendar should still be there (or reload quickly)
    await page.waitForSelector('.simple-calendar', { timeout: 3000 })
    await expect(page.locator('.simple-calendar')).toBeVisible()
  })
})
