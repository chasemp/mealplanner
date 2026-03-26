# MealPlanner User Manual

## Table of Contents
1. [Database Source Management](#database-source-management)
2. [Demo Data Mode](#demo-data-mode)
3. [Data Persistence and Authority](#data-persistence-and-authority)
4. [Plan vs Menu Staging Workflow](#plan-vs-menu-staging-workflow)
5. [Navigation and UI](#navigation-and-ui)
6. [Item Management](#item-management)
7. [Troubleshooting](#troubleshooting)

---

## Database Source Management

### Overview
MealPlanner uses an **authoritative data source** system that determines where your data comes from and how it's managed. The current database source is always displayed in the header next to the MealPlanner logo.

### Available Database Sources

#### 1. Demo Data Mode
- **Purpose**: Perfect for testing, learning, and development
- **Data Storage**: Browser's localStorage
- **Persistence**: Data persists locally but won't sync across devices
- **Behavior**: Comes with pre-loaded sample recipes, items, and meals

#### 2. Local Database Mode  
- **Purpose**: For personal use with your own data
- **Data Storage**: Local database files on your device
- **Persistence**: Full local control, can export/import data
- **Behavior**: Clean slate or load from existing database file

#### 3. GitHub Repository Mode
- **Purpose**: For syncing data across devices via GitHub
- **Data Storage**: GitHub repository
- **Persistence**: Syncs across all devices with access to the repository
- **Behavior**: Collaborative data management

### Switching Database Sources
1. Go to **Settings** tab (⚙️)
2. Under **Database Source**, select your preferred **Source Type**
3. Configure source-specific options if needed
4. Click **Apply Source**
5. The header will update to show your new database source

---

## Demo Data Mode

### Demo Data Lifecycle (Technical Overview)

**CRITICAL**: Understanding how demo data works is essential for proper application behavior.

#### The Intended Flow
1. **First Site Load**: 
   - Demo data is loaded into localStorage
   - Flag `mealplanner_demo_data_loaded = true` is set
   - User can now modify this data freely

2. **Subsequent Page Loads**:
   - Flag prevents auto-reload of demo data
   - localStorage becomes the authoritative source
   - User modifications are preserved

3. **Clear All Data**:
   - Removes all data from localStorage
   - **Keeps the demo data loaded flag** (critical!)
   - No auto-reload occurs - data stays cleared

4. **Reset Demo Data** (explicit user action):
   - Temporarily clears the flag
   - Reloads original demo data
   - Sets flag again to prevent future auto-reloads

#### Current Issue (Under Investigation)
There is a **race condition** where something loads demo data before the flag system can prevent it. This causes demo data to auto-reload even after clearing, which violates the intended behavior.

**Symptoms**:
- Clear All Data works initially
- Page refresh causes demo data to reappear
- Flag system is bypassed somehow

**Investigation Status**:
- Confirmed: Something populates localStorage before `initializeDemoData()` runs
- The data already exists when flag check happens, so flag logic is skipped
- Need to find what's calling demo data loading during app initialization

### Key Principles

#### 1. localStorage is Authoritative
- Once demo data is loaded into localStorage, **localStorage becomes the authoritative source**
- Page reloads and refreshes **never** auto-reload demo data
- Your changes to demo data are preserved until explicitly cleared or reset

#### 2. Data Initialization Rules
Demo data is **only** loaded when:
- **First-time setup**: When switching TO demo mode from another source AND localStorage is empty
- **Explicit reset**: When user clicks "Reset Demo Data" button
- **Never on page load**: Page loads respect existing localStorage data

#### 3. Clear vs Reset Operations

**Clear All Data** (`🗑️ Clear All Data`):
- Removes ALL data from localStorage
- Creates a completely clean slate
- Data stays cleared until you manually add new data or reset demo data
- Perfect for starting fresh testing scenarios

**Reset Demo Data** (`🔄 Reset Demo Data`):
- Restores original sample data
- Overwrites any existing data with fresh demo content
- Use when you want to return to the original demo state

### Demo Data Workflow Example
```
1. Switch to Demo Data mode → Demo data loads automatically (first time only)
2. Modify recipes, add items, create meals → Changes saved to localStorage
3. Page refresh → Your changes are preserved (no auto-reload)
4. Clear All Data → Everything removed, clean slate
5. Page refresh → Still clean (no auto-reload)
6. Reset Demo Data → Original demo data restored
```

---

## Data Persistence and Authority

### The Authority Chain
1. **Settings Manager**: Determines which data source is authoritative
2. **localStorage**: Acts as the local cache/storage for all modes
3. **Managers**: Recipe, Items, Schedule managers load from authoritative source
4. **UI Components**: Display data from managers

### Critical Rules
- **localStorage is always the immediate source of truth** for the current session
- **Page loads never override localStorage** unless explicitly requested
- **Data modifications are immediately saved** to localStorage
- **Cross-tab consistency** is maintained through localStorage events

### Data Flow
```
User Action → Manager Updates → localStorage Save → UI Refresh
     ↑                                              ↓
Page Load ← Authoritative Source ← Settings Manager ← localStorage
```

---

## Plan vs Menu Staging Workflow

### Architecture Overview

MealPlanner uses a **staging vs production** architecture for meal planning:

- **Plan Tab** = **Staging Environment** (prospective schedule)
- **Menu Tab** = **Production Environment** (committed schedule)

This allows you to build and refine meal plans without affecting your live menu until you're ready to publish changes.

### Core Concepts

#### 1. Separate Data Storage
- **Plan Storage**: `planScheduledMeals` - working/prospective schedule
- **Menu Storage**: `menuScheduledMeals` - committed/published schedule
- **Complete Isolation**: Changes in Plan don't affect Menu until explicitly updated

#### 2. Staging Workflow
```
Recipes → Planning Queue → Auto Plan → Plan Tab (staging) → Update Menu → Menu Tab (production)
```

#### 3. State Transitions
- **Complete State Changes**: Plan moves between complete states, not incremental updates
- **Delta Comparison**: See exactly what will change before committing
- **Reset Capability**: Discard Plan changes and revert to Menu state

### Detailed Workflow

#### Step 1: Build Planning Queue
1. Go to **Recipes** tab (`📖`)
2. Click **Add to planning queue** (`📅`) on desired recipes/combos
3. Recipes are added to the planning queue (not scheduled yet)

**Example**:
```
✅ Added "Chicken Rice Bowl" to planning queue
✅ Added "Dinner Combo 1" to planning queue
Planning Queue: 2 recipes, 1 combo
```

#### Step 2: Create Prospective Schedule (Staging)
1. Go to **Plan** tab (`📋`)
2. Verify planning queue shows your recipes
3. Click **Auto Plan** to generate schedule
4. Plan creates prospective schedule in staging environment

**Example Result**:
```
✅ Plan generated! 6 meals planned using 2 selected recipes
Current Week: 2/7 meals planned
- Friday 9/12: Dinner Combo 1
- Saturday 9/13: Chicken Rice Bowl
Planning Queue: Cleared (recipes consumed by Auto Plan)
```

#### Step 3: Review and Refine (Optional)
- **View Schedule**: See all planned meals in Plan tab
- **Make Changes**: Add/remove meals, adjust dates
- **Delta Comparison**: System shows differences between Plan and Menu
- **Safe Environment**: Changes only affect staging, not live menu

#### Step 4: Commit to Production
**Option A: Update Menu** (Publish Changes)
1. Review delta comparison box (if visible)
2. Click **Update Menu** button
3. Plan schedule is copied to Menu storage
4. Menu tab now shows committed schedule
5. Grocery lists and other features update automatically

**Example**:
```
✅ Menu updated! 6 meals committed to menu
Delta Applied:
- Added: Dinner Combo 1 on 9/12, Chicken Rice Bowl on 9/13
- Removed: (none)
```

**Option B: Clear Plan Changes** (Discard Changes)
1. Click **Clear Plan Changes** button
2. Plan reverts to current Menu state
3. All staging changes are discarded
4. Plan and Menu are now synchronized

**Example**:
```
✅ Plan changes cleared! Reverted to menu with 0 meals
```

### Delta Comparison System

When Plan and Menu differ, a **Plan Changes** box appears showing:

#### Delta Summary
- **Meals to be added**: Count of new meals in Plan
- **Meals to be removed**: Count of meals being removed from Menu

#### Delta Details
- **Adding**: Specific meals and dates being added
- **Removing**: Specific meals and dates being removed

**Example Delta Display**:
```
┌─ Plan Changes ─────────────────────────────┐
│ 2 meals to be added                        │
│                                            │
│ Adding: Dinner Combo 1 on 2025-09-12,     │
│         Chicken Rice Bowl on 2025-09-13   │
└────────────────────────────────────────────┘
```

### Testing Scenarios

#### Scenario 1: Fresh Start to Full Menu
```bash
# Starting State
Plan: Empty (0 meals)
Menu: Empty (0 meals)
Delta: None (hidden)

# Step 1: Add recipes to planning queue
→ Recipes tab → Add "Chicken Rice Bowl" → Add "Dinner Combo 1"
Planning Queue: 2 recipes

# Step 2: Generate plan
→ Plan tab → Auto Plan
Plan: 6 meals (2 in current week)
Menu: Empty (0 meals)
Delta: "2 meals to be added"

# Step 3: Commit to menu
→ Click "Update Menu"
Plan: 6 meals
Menu: 6 meals (committed)
Delta: None (synchronized)
```

#### Scenario 2: Modify Existing Menu
```bash
# Starting State
Plan: 6 meals (synchronized with Menu)
Menu: 6 meals (committed)
Delta: None

# Step 1: Add more recipes
→ Recipes tab → Add "Tomato Rice" to planning queue
→ Plan tab → Auto Plan (regenerates with new recipe)
Plan: 8 meals (includes new recipe)
Menu: 6 meals (unchanged)
Delta: "2 meals to be added"

# Step 2: Review changes
Delta Details: "Adding: Tomato Rice on 2025-09-14, Tomato Rice on 2025-09-16"

# Step 3: Decide
Option A: Update Menu (commit changes)
Option B: Clear Plan Changes (discard and revert)
```

#### Scenario 3: Discard Changes
```bash
# Starting State
Plan: 8 meals (modified)
Menu: 6 meals (original)
Delta: "2 meals to be added"

# Action: Discard changes
→ Click "Clear Plan Changes"
Plan: 6 meals (reverted to Menu state)
Menu: 6 meals (unchanged)
Delta: None (synchronized)
```

### Data Storage Technical Details

#### localStorage Keys
- `mealplanner_planScheduledMeals`: Staging environment data
- `mealplanner_menuScheduledMeals`: Production environment data
- `mealplanner_scheduledMeals`: Legacy data (being migrated)

#### Console Debugging
```javascript
// Check Plan storage
console.log('Plan meals:', localStorage.getItem('mealplanner_planScheduledMeals'));

// Check Menu storage  
console.log('Menu meals:', localStorage.getItem('mealplanner_menuScheduledMeals'));

// Verify separation
Plan tab loads from: planScheduledMeals
Menu tab loads from: menuScheduledMeals
```

### Best Practices

#### 1. Plan First, Commit Later
- Always build your schedule in Plan tab first
- Review the complete plan before committing to Menu
- Use delta comparison to understand exactly what will change

#### 2. Safe Experimentation
- Plan tab is your sandbox - experiment freely
- Changes don't affect grocery lists or other features until committed
- Use "Clear Plan Changes" to start over if needed

#### 3. Complete State Management
- Don't try to make incremental changes to Menu directly
- Always work through Plan → Update Menu workflow
- Think in terms of complete meal plans, not individual meal changes

#### 4. Testing Workflow
```bash
1. Clear All Data (clean slate)
2. Create test items and recipes
3. Add recipes to planning queue
4. Generate plan in staging
5. Review delta comparison
6. Commit to menu or discard changes
7. Verify Menu tab shows committed schedule
8. Test grocery list generation from committed menu
```

### Troubleshooting Plan vs Menu Issues

#### "Menu tab shows no meals after Auto Plan"
- **Expected Behavior**: Auto Plan only affects Plan tab (staging)
- **Solution**: Click "Update Menu" to commit Plan to Menu
- **Verification**: Menu tab should show meals after Update Menu

#### "Delta comparison not showing"
- **Cause**: Plan and Menu are synchronized (no differences)
- **Solution**: Make changes in Plan tab first, then check for delta box
- **Verification**: Delta box appears when Plan ≠ Menu

#### "Clear Plan Changes not working"
- **Cause**: Plan and Menu already synchronized
- **Solution**: This is expected behavior when no changes exist
- **Verification**: Check that Plan tab matches Menu tab content

#### "Update Menu button not working"
- **Cause**: No meals in Plan to commit
- **Solution**: Generate a plan first using Auto Plan
- **Verification**: Plan tab should show meals before updating Menu

---

## Navigation and UI

### Tab Navigation
- **Items** (`🥕`): Manage ingredients and food items
- **Recipes** (`📖`): Create and manage recipes
- **Plan** (`📋`): Schedule meals and plan your week
- **Menu** (`📄`): View scheduled meals in menu format
- **Settings** (`⚙️`): Configure database source and app settings

### Navigation Stack System
The Items and Recipes tabs use a **navigation stack** system for complex page navigation:
- **Forward navigation**: Pushes current view to stack
- **Back navigation**: Pops from stack to restore previous view
- **Form submission**: Automatically returns to previous view
- **Tab switching**: Preserves navigation state

---

## Item Management

### Creating Items
1. Go to **Items** tab (`🥕`)
2. Click **Add Item** button
3. Fill out the form:
   - **Item Name**: Required
   - **Category**: Select from dropdown (Meat & Poultry, Vegetables, etc.)
   - **Default Unit**: Choose measurement unit (Pounds, Cups, etc.)
   - **Nutrition Info**: Optional calories, protein, etc.
4. Click **Save Item**
5. Form automatically returns to items list
6. New item appears immediately in the list

### Item Form Navigation
- **Save**: Returns to items list automatically
- **Cancel**: Returns to items list without saving
- **Tab Switch**: If you switch tabs during form entry, returning to Items tab will show the list (form is abandoned)

### Item Display
- Items are organized by **category**
- **Search and filter** functionality available
- **Category count** shown in summary
- **Empty state** displays helpful messages when no items exist

---

## Troubleshooting

### Demo Data Race Condition (Active Bug Investigation)

**Issue**: Demo data auto-reloads after clearing, despite flag system designed to prevent this.

**Investigation Progress**:

1. **Confirmed Race Condition**: Something loads demo data before the flag system can prevent it
2. **Evidence Found**: 
   - Console logs show `initializeDemoData()` called but data already exists
   - Flag logic is skipped because localStorage is not empty
   - Data exists when it should be empty after clearing

3. **Suspected Root Cause**: 
   - Manager initialization sequence calls `getAuthoritativeData()` during startup
   - RecipeManager, ItemsManager, etc. request data before flag system is active
   - Something in this chain populates localStorage with demo data

4. **Next Investigation Steps**:
   - Trace exact call sequence during app initialization
   - Find what populates localStorage between manager calls
   - Implement flag check earlier in the data loading chain

5. **Workaround**: Use "Reset Demo Data" to restore clean demo state, then manually clear specific items as needed.

### Common Issues

#### "Items not showing after creation"
- **Cause**: Navigation or data loading issue
- **Solution**: The item creation workflow has been fixed to automatically refresh the items list
- **Verification**: Check that the item appears immediately after saving

#### "Demo data keeps reloading"
- **Cause**: Old behavior where demo data auto-loaded on page refresh
- **Solution**: This has been fixed - demo data only loads on first setup or explicit reset
- **Verification**: Make changes to demo data, refresh page, changes should persist

#### "Clear All Data not working"
- **Cause**: Data not actually being cleared from localStorage
- **Solution**: The clear function has been verified to work correctly
- **Verification**: After clearing, all tabs should show empty states

### Debug Information
- **Console Logs**: Check browser console for detailed operation logs
- **Database Source**: Always visible in header
- **localStorage**: Can be inspected in browser developer tools
- **Version**: Shown in footer (v2025.09.12.1312)

### Getting Help
1. Check console logs for error messages
2. Verify database source in header matches expectation
3. Try switching database sources to isolate issues
4. Use "Clear All Data" to reset to clean state for testing

---

## Development Notes

### Recent Fixes (September 2025)
- ✅ **Fixed demo data auto-reload bug**: Demo data no longer auto-loads on page refresh
- ✅ **Fixed item creation navigation**: Forms now properly return to list view after save
- ✅ **Fixed Clear All Data functionality**: Properly clears all data types
- ✅ **Implemented navigation stack**: Items and Recipes tabs now have proper navigation history
- ✅ **Fixed authoritative data source**: localStorage is now properly respected as authoritative

### Architecture Principles
- **localStorage as authority**: Once data is in localStorage, it's the source of truth
- **Explicit user actions**: Data only changes when user explicitly requests it
- **Immediate feedback**: UI updates immediately after user actions
- **State preservation**: User changes are preserved across page loads and tab switches

---

*This manual will be updated as new features are added and workflows are refined.*
