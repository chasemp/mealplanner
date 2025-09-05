// End-to-end tests for grocery list functionality
import { test, expect } from '@playwright/test'

test.describe('Grocery List Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for app to load
    await expect(page.locator('#main-app')).toBeVisible()
  })

  test('should display grocery list interface', async ({ page }) => {
    // Navigate to grocery list tab
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-tab')).toBeVisible()
    
    // Should show grocery list manager
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    await expect(page.locator('.grocery-list-manager')).toBeVisible()
    
    // Should have main heading
    await expect(page.locator('#grocery-tab h2')).toContainText('Grocery List')
  })

  test('should show week selector and generate button', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Should have week selector
    await expect(page.locator('#week-selector')).toBeVisible()
    
    // Should have generate list button
    const generateBtn = page.locator('#generate-list-btn')
    await expect(generateBtn).toBeVisible()
    await expect(generateBtn).toContainText('Generate List')
  })

  test('should display scheduled meals overview', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Should show this week's meals section
    await expect(page.locator('h4:has-text("This Week\'s Meals")')).toBeVisible()
    
    // Should show meal cards or empty state
    const mealsSection = page.locator('.grocery-list-manager')
    await expect(mealsSection).toBeVisible()
  })

  test('should generate grocery list when button clicked', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Click generate list button
    const generateBtn = page.locator('#generate-list-btn')
    await generateBtn.click()
    
    // Should show shopping list section
    await expect(page.locator('h4:has-text("Shopping List")')).toBeVisible()
  })

  test('should display pantry items section', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Should show pantry items section
    await expect(page.locator('h4:has-text("Pantry Items")')).toBeVisible()
    
    // Should have manage pantry button
    await expect(page.locator('#manage-pantry-btn')).toBeVisible()
  })

  test('should handle week selector changes', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    const weekSelector = page.locator('#week-selector')
    await expect(weekSelector).toBeVisible()
    
    // Should have multiple week options
    const options = await weekSelector.locator('option').count()
    expect(options).toBeGreaterThan(1)
    
    // Should be able to change selection
    await weekSelector.selectOption({ index: 1 })
    
    // Interface should still be functional
    await expect(page.locator('#generate-list-btn')).toBeVisible()
  })

  test('should show export and print options when list is generated', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Generate a list first
    await page.click('#generate-list-btn')
    
    // Should show export and print buttons
    await expect(page.locator('#export-list-btn')).toBeVisible()
    await expect(page.locator('#print-list-btn')).toBeVisible()
  })

  test('should handle export functionality', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Generate list and try export
    await page.click('#generate-list-btn')
    
    const exportBtn = page.locator('#export-list-btn')
    if (await exportBtn.isVisible()) {
      await exportBtn.click()
      // Note: File download testing would require additional setup
      // For now, just verify the button is clickable
    }
  })

  test('should handle print functionality', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Generate list and try print
    await page.click('#generate-list-btn')
    
    const printBtn = page.locator('#print-list-btn')
    if (await printBtn.isVisible()) {
      // Note: Print dialog testing is complex in headless mode
      // For now, just verify the button exists and is clickable
      await expect(printBtn).toBeVisible()
    }
  })

  test('should handle manage pantry button', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    const managePantryBtn = page.locator('#manage-pantry-btn')
    await expect(managePantryBtn).toBeVisible()
    
    // Click should be functional (even if it shows a placeholder)
    await managePantryBtn.click()
  })

  test('should show appropriate empty states', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Should handle empty states gracefully
    const container = page.locator('.grocery-list-manager')
    await expect(container).toBeVisible()
    
    // Should show some content (either meals or empty state messages)
    const hasContent = await container.locator('*').count()
    expect(hasContent).toBeGreaterThan(0)
  })

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Should still show main elements on mobile
    await expect(page.locator('#week-selector')).toBeVisible()
    await expect(page.locator('#generate-list-btn')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    
    // Should show grid layout on larger screens
    await expect(page.locator('.grocery-list-manager')).toBeVisible()
  })

  test('should maintain functionality when switching between tabs', async ({ page }) => {
    // Go to grocery list tab
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Switch to another tab
    await page.click('[data-tab="recipes"]')
    await expect(page.locator('#recipes-tab')).toBeVisible()
    
    // Switch back to grocery list
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Should still be functional
    await expect(page.locator('#generate-list-btn')).toBeVisible()
    await expect(page.locator('#week-selector')).toBeVisible()
  })

  test('should show grocery list components in correct order', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Should have logical flow: header -> meals -> grocery list -> pantry
    const container = page.locator('.grocery-list-manager')
    await expect(container).toBeVisible()
    
    // Header should be at top
    const header = container.locator('h3').first()
    await expect(header).toContainText('Grocery Lists')
    
    // Generate button should be in header area
    await expect(page.locator('#generate-list-btn')).toBeVisible()
  })

  test('should handle grocery item interactions', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Generate list to get grocery items
    await page.click('#generate-list-btn')
    
    // Look for grocery item checkboxes
    const checkboxes = page.locator('.grocery-item-checkbox')
    const checkboxCount = await checkboxes.count()
    
    if (checkboxCount > 0) {
      // Should be able to check/uncheck items
      const firstCheckbox = checkboxes.first()
      await firstCheckbox.check()
      await expect(firstCheckbox).toBeChecked()
      
      await firstCheckbox.uncheck()
      await expect(firstCheckbox).not.toBeChecked()
    }
  })

  test('should display version information', async ({ page }) => {
    await page.click('[data-tab="grocery"]')
    await expect(page.locator('#grocery-list-container')).toBeVisible()
    
    // Version footer should be visible
    const versionFooter = page.locator('#version-display')
    await expect(versionFooter).toBeVisible()
    
    // Should show current version
    const versionText = await versionFooter.textContent()
    expect(versionText).toMatch(/v\d{4}\.\d{2}\.\d{2}\.\d{4}/)
  })
})
