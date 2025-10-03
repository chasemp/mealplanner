# Known Issues - MealPlanner Application

## Current Status: Navigation Issue Investigation

### 🔴 CRITICAL: Menu Tab Navigation Not Working

**Issue**: Clicking scheduled meals on the Menu tab does not navigate to recipe detail view.

**Symptoms**:
- onclick handler is truncated to only 32 characters: `window.app.viewScheduledMeal(7, `
- Missing closing parenthesis, meal type, and meal ID parameters
- No JavaScript errors in console, but click handler doesn't execute
- Playwright reports "Ref not found" after click attempts

**Root Cause**: Template string interpolation in `updateMenuMealsDisplay()` function is failing
- Expected onclick: `window.app.viewScheduledMeal(7, "plan", "plan-1757784966710-0")`
- Actual onclick: `window.app.viewScheduledMeal(7, ` (truncated)

**Location**: `js/main.js` line 1866 in `updateMenuMealsDisplay()` function

**Attempted Fixes**:
1. ✅ Fixed `ReferenceError: plan is not defined` by using `JSON.stringify(meal.meal_type)`
2. ✅ Fixed `ReferenceError: plan is not defined` by using `JSON.stringify(meal.id)`
3. ❌ Template string still truncates during HTML generation

**Next Steps**:
- Investigate why template string interpolation truncates at 32 characters
- Check for character limits in HTML generation process
- Consider alternative approach: use event listeners instead of onclick attributes
- Test with simpler meal IDs to isolate the issue

---

## Other Known Issues

### 🟡 Version Inconsistency
**Issue**: Multiple JavaScript files loading different versions
- `main.js`: v2025.09.13.0859 ✅
- Other JS files: v2025.09.13.0854 ❌

**Impact**: Potential caching issues and inconsistent behavior

**Files Affected**:
- `js/settings-manager.js`
- `js/recipe-manager.js` 
- `js/schedule-manager.js`
- `js/items-manager.js`
- `js/grocery-list-manager.js`
- `js/google-calendar-integration.js`
- `js/performance-manager.js`
- `js/advanced-planning.js`
- `js/meal-rotation-engine.js`
- `js/barcode-scanner.js`
- `js/demo-data.js`

### 🟡 IndexedDB Error
**Issue**: `NotFoundError: Failed to execute 'transaction' on 'IDBDatabase'`
**Location**: Export functionality
**Impact**: Non-blocking, export still works
**Status**: Needs investigation

### 🟡 CalendarView and ScheduleManager Data Source
**Issue**: Both components load from `'scheduledMeals'` instead of `'menuScheduledMeals'`
**Location**: 
- `js/calendar-view.js`
- `js/schedule-manager.js`
**Impact**: May cause display inconsistencies
**Status**: Noted but not directly fixed

---

## Testing Status

### ✅ Completed
- Basic workflow (add to planning queue, auto-plan, update menu)
- Data management (clear all data, reset demo data)
- Editing functionality (items, recipes, combos)
- Mobile and desktop viewport testing
- Data export/import functionality
- Menu tab display fix (now shows committed meals)

### 🔄 In Progress
- Menu tab navigation (clicking scheduled meals)

### ⏳ Pending
- Regression tests for validated behaviors
- User manual documentation
- PWA lessons documentation
- Plan Changes delta display implementation
- Desktop tab navigation fixes

---

## Technical Notes

### Cache Busting Strategy
- Updated `meta name="cache-bust"` tag
- Updated `<title>` tag
- Updated `main.js` script tag with version parameter
- Updated internal `this.version` in main.js
- Used URL query parameters for hard refresh

### Data Flow
- Plan tab: `planScheduledMeals` (staging)
- Menu tab: `menuScheduledMeals` (committed)
- Update Menu: copies from plan to menu
- Navigation: should go from Menu to Recipe detail

### Template String Issues
- Template strings work correctly in isolation
- HTML generation process truncates at 32 characters
- Issue appears to be in the `updateMenuMealsDisplay()` function
- May be related to character limits or string processing

---

## Next Actions

1. **IMMEDIATE**: Fix Menu tab navigation issue
   - Investigate template string truncation
   - Consider event listener approach
   - Test with simpler data

2. **SHORT TERM**: Version consistency
   - Update all JS files to same version
   - Implement consistent cache busting

3. **MEDIUM TERM**: Complete testing suite
   - Add regression tests
   - Document user workflows
   - Fix remaining navigation issues

4. **LONG TERM**: Code cleanup
   - Remove unused code
   - Add comprehensive comments
   - Improve error handling
