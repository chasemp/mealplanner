// End-to-end tests for itinerary view functionality
import { test, expect } from '@playwright/test'

test.describe('Itinerary View Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for app to load
    await expect(page.locator('#main-app')).toBeVisible()
  })

  test('should display itinerary view by default on meal planning tabs', async ({ page }) => {
    // Click on breakfast tab
    await page.click('[data-tab="breakfast"]')
    await expect(page.locator('#breakfast-tab')).toBeVisible()
    
    // Should show itinerary view by default
    await expect(page.locator('#breakfast-itinerary')).toBeVisible()
    await expect(page.locator('#breakfast-calendar')).toBeHidden()
    
    // Should have itinerary content
    await expect(page.locator('#breakfast-itinerary .itinerary-view')).toBeVisible()
    await expect(page.locator('#breakfast-itinerary h3')).toContainText('breakfast Plan Itinerary')
  })

  test('should switch between itinerary and calendar views', async ({ page }) => {
    // Go to dinner tab
    await page.click('[data-tab="dinner"]')
    await expect(page.locator('#dinner-tab')).toBeVisible()
    
    // Should start with itinerary view
    await expect(page.locator('#dinner-itinerary')).toBeVisible()
    await expect(page.locator('#dinner-calendar')).toBeHidden()
    
    // Button should show "Calendar View"
    const toggleButton = page.locator('#view-toggle-dinner')
    await expect(toggleButton).toContainText('📅 Calendar View')
    
    // Click to switch to calendar view
    await toggleButton.click()
    
    // Should now show calendar view
    await expect(page.locator('#dinner-itinerary')).toBeHidden()
    await expect(page.locator('#dinner-calendar')).toBeVisible()
    
    // Button should now show "Itinerary View"
    await expect(toggleButton).toContainText('📋 Itinerary View')
    
    // Click to switch back to itinerary view
    await toggleButton.click()
    
    // Should be back to itinerary view
    await expect(page.locator('#dinner-itinerary')).toBeVisible()
    await expect(page.locator('#dinner-calendar')).toBeHidden()
    await expect(toggleButton).toContainText('📅 Calendar View')
  })

  test('should display planning summary metrics', async ({ page }) => {
    await page.click('[data-tab="lunch"]')
    await expect(page.locator('#lunch-itinerary')).toBeVisible()
    
    // Should show planning summary cards
    const summaryCards = page.locator('#lunch-itinerary .grid .bg-white.rounded-lg.shadow')
    await expect(summaryCards).toHaveCount(4)
    
    // Should show metric labels
    await expect(page.locator('#lunch-itinerary')).toContainText('Total Meals')
    await expect(page.locator('#lunch-itinerary')).toContainText('Unique Recipes')
    await expect(page.locator('#lunch-itinerary')).toContainText('Shared Ingredients')
    await expect(page.locator('#lunch-itinerary')).toContainText('Estimated Cost')
    
    // Should show numeric values
    const metricValues = page.locator('#lunch-itinerary .text-2xl.font-bold')
    await expect(metricValues.first()).toBeVisible()
  })

  test('should display weekly breakdown', async ({ page }) => {
    await page.click('[data-tab="breakfast"]')
    await expect(page.locator('#breakfast-itinerary')).toBeVisible()
    
    // Should show weeks container
    await expect(page.locator('#breakfast-itinerary .space-y-4')).toBeVisible()
    
    // Should show week cards (default 4 weeks)
    const weekCards = page.locator('#breakfast-itinerary .bg-white.rounded-lg.shadow')
    // Expect at least 4 week cards (plus summary cards)
    await expect(weekCards).toHaveCount.greaterThanOrEqual(4)
    
    // Should show week headers with dates
    await expect(page.locator('#breakfast-itinerary')).toContainText('Week 1:')
    await expect(page.locator('#breakfast-itinerary')).toContainText('Week 2:')
  })

  test('should handle weeks selector', async ({ page }) => {
    await page.click('[data-tab="dinner"]')
    await expect(page.locator('#dinner-itinerary')).toBeVisible()
    
    // Find the weeks selector
    const weeksSelect = page.locator('#dinner-itinerary select')
    await expect(weeksSelect).toBeVisible()
    
    // Should have default value of 4 weeks
    await expect(weeksSelect).toHaveValue('4')
    
    // Change to 2 weeks
    await weeksSelect.selectOption('2')
    
    // Should update the display
    await expect(page.locator('#dinner-itinerary')).toContainText('2 weeks')
    
    // Change to 8 weeks
    await weeksSelect.selectOption('8')
    
    // Should update the display
    await expect(page.locator('#dinner-itinerary')).toContainText('8 weeks')
  })

  test('should handle generate plan functionality', async ({ page }) => {
    await page.click('[data-tab="lunch"]')
    await expect(page.locator('#lunch-itinerary')).toBeVisible()
    
    // Find the generate plan button
    const generateButton = page.locator('#lunch-itinerary button:has-text("Generate Plan")')
    await expect(generateButton).toBeVisible()
    
    // Click generate plan
    await generateButton.click()
    
    // Should show notification (if implemented)
    // Note: This might show a notification or update the view
    // For now, just verify the button is clickable
    await expect(generateButton).toBeVisible()
  })

  test('should work across all meal types', async ({ page }) => {
    const mealTypes = ['breakfast', 'lunch', 'dinner']
    
    for (const mealType of mealTypes) {
      // Navigate to meal type tab
      await page.click(`[data-tab="${mealType}"]`)
      await expect(page.locator(`#${mealType}-tab`)).toBeVisible()
      
      // Should show itinerary view
      await expect(page.locator(`#${mealType}-itinerary`)).toBeVisible()
      await expect(page.locator(`#${mealType}-itinerary .itinerary-view`)).toBeVisible()
      
      // Should show meal type in title
      await expect(page.locator(`#${mealType}-itinerary h3`)).toContainText(`${mealType} Plan Itinerary`)
      
      // Should have view toggle button
      await expect(page.locator(`#view-toggle-${mealType}`)).toBeVisible()
      
      // Should have weeks selector
      await expect(page.locator(`#${mealType}-itinerary select`)).toBeVisible()
      
      // Should have generate plan button
      await expect(page.locator(`#${mealType}-itinerary button:has-text("Generate Plan")`)).toBeVisible()
    }
  })

  test('should maintain view state when switching tabs', async ({ page }) => {
    // Go to breakfast and switch to calendar view
    await page.click('[data-tab="breakfast"]')
    await page.click('#view-toggle-breakfast')
    await expect(page.locator('#breakfast-calendar')).toBeVisible()
    
    // Switch to lunch tab
    await page.click('[data-tab="lunch"]')
    await expect(page.locator('#lunch-itinerary')).toBeVisible() // Should be itinerary by default
    
    // Switch back to breakfast
    await page.click('[data-tab="breakfast"]')
    // Should remember it was in calendar view
    await expect(page.locator('#breakfast-calendar')).toBeVisible()
    await expect(page.locator('#view-toggle-breakfast')).toContainText('📋 Itinerary View')
  })

  test('should display date ranges correctly', async ({ page }) => {
    await page.click('[data-tab="dinner"]')
    await expect(page.locator('#dinner-itinerary')).toBeVisible()
    
    // Should show date range in header
    const dateRange = page.locator('#dinner-itinerary p.text-gray-600')
    await expect(dateRange).toBeVisible()
    
    // Should contain month abbreviations and numbers
    const dateText = await dateRange.textContent()
    expect(dateText).toMatch(/\w{3} \d{1,2} - \w{3} \d{1,2}/)
    expect(dateText).toContain('weeks')
  })

  test('should be responsive and work on different screen sizes', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.click('[data-tab="breakfast"]')
    await expect(page.locator('#breakfast-itinerary')).toBeVisible()
    
    // Should still show all main elements
    await expect(page.locator('#breakfast-itinerary h3')).toBeVisible()
    await expect(page.locator('#breakfast-itinerary select')).toBeVisible()
    await expect(page.locator('#breakfast-itinerary button:has-text("Generate Plan")')).toBeVisible()
    
    // Summary cards should stack on mobile (grid-cols-1)
    const summaryGrid = page.locator('#breakfast-itinerary .grid')
    await expect(summaryGrid).toHaveClass(/grid-cols-1/)
    
    // Test on desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    
    // Should show grid layout on larger screens
    await expect(summaryGrid).toHaveClass(/md:grid-cols-4/)
  })
})
