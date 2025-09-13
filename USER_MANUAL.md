# MealPlanner User Manual

## Table of Contents
1. [Database Source Management](#database-source-management)
2. [Demo Data Mode](#demo-data-mode)
3. [Data Persistence and Authority](#data-persistence-and-authority)
4. [Navigation and UI](#navigation-and-ui)
5. [Item Management](#item-management)
6. [Troubleshooting](#troubleshooting)

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
