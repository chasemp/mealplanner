# Recipe Testing Update Plan

## 🔄 **Major Change**: Modal → Mobile Page Architecture

**Old Approach**: Recipe details always opened in modals
**New Approach**: 
- **Desktop (>768px)**: Modal (unchanged)
- **Mobile (≤768px)**: Full-screen page replacement

## 📋 **Tests That Need Updates**

### 1. **Unit Tests** (`src/test/unit/recipe-manager.test.js`)
- ✅ **Keep**: Recipe form modal tests (still used)
- 🔄 **Update**: `showRecipeDetail()` mock to handle mobile vs desktop
- ➕ **Add**: Mobile recipe page functionality tests
- ➕ **Add**: Mobile navigation flow tests (back/close buttons)
- ➕ **Add**: Edit flow from mobile recipe page tests

### 2. **E2E Tests** (`src/test/e2e/mobile-*.spec.js`)
- 🔄 **Update**: Recipe detail interaction tests
- ➕ **Add**: Mobile recipe page navigation tests
- ➕ **Add**: Mobile recipe page content visibility tests
- ➕ **Add**: Mobile edit flow tests (recipe page → edit modal → back to recipe page)

### 3. **Integration Tests** (`src/test/integration/recipe-management.test.js`)
- 🔄 **Update**: Recipe detail display tests
- ➕ **Add**: Mobile vs desktop behavior tests

## 🎯 **New Test Requirements**

### **Mobile Recipe Page Tests**
```javascript
describe('Mobile Recipe Page', () => {
  test('should show full-screen recipe page on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 }); // Mobile
    await page.click('.recipe-card'); // Click any recipe
    
    // Should NOT see modal
    await expect(page.locator('#recipe-detail-modal')).not.toBeVisible();
    
    // Should see mobile recipe page elements
    await expect(page.locator('#mobile-recipe-back')).toBeVisible();
    await expect(page.locator('#mobile-recipe-close')).toBeVisible();
    await expect(page.locator('#mobile-recipe-edit')).toBeVisible();
  });

  test('should navigate back from mobile recipe page', async ({ page }) => {
    // ... click recipe, then test back button
    await page.click('#mobile-recipe-back');
    await expect(page.locator('.recipe-card')).toBeVisible(); // Back to list
  });

  test('should handle edit flow from mobile recipe page', async ({ page }) => {
    // ... click recipe, click edit, save, should return to recipe page
  });
});
```

### **Desktop Modal Tests** (ensure still work)
```javascript
describe('Desktop Recipe Modal', () => {
  test('should show modal on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 }); // Desktop
    await page.click('.recipe-card');
    
    // Should see modal
    await expect(page.locator('#recipe-detail-modal')).toBeVisible();
    
    // Should NOT see mobile page elements
    await expect(page.locator('#mobile-recipe-back')).not.toBeVisible();
  });
});
```

## 🔧 **Implementation Steps**

1. **Update MockRecipeManager** to handle mobile vs desktop detection
2. **Add mobile recipe page tests** to unit tests
3. **Update e2e tests** to test both mobile and desktop flows
4. **Add viewport-specific test cases**
5. **Test edit flow integration** between mobile page and modal
6. **Verify all existing functionality** still works on desktop

## ⚠️ **Critical Test Areas**

- **Viewport detection** (768px breakpoint)
- **Mobile navigation flow** (back/close buttons work)
- **Edit flow continuity** (mobile page → edit modal → back to mobile page)
- **Desktop modal preservation** (unchanged behavior)
- **Event listener reattachment** after mobile page navigation
- **State management** (previousView, editingFromMobileView flags)
