# MealPlanner Integrated Roadmap & User Flow

## Refined User Flow Overview

### Core User Journey
1. **Ingredients Catalog** → Add ingredients to be used in recipes
2. **Recipe Management** → Create recipes using catalogued ingredients  
3. **Combo Recipe Management** → Create "combo recipes" that combine multiple recipes (e.g., "Sunday Dinner" = fried chicken + mashed potatoes + green beans)
4. **Meal Composition** → Create meals using individual recipes OR pre-existing combo recipes
5. **Meal Type Staging** → Stage meals for specific meal types (dinner, lunch, breakfast)
5. **Meal Scheduling** → Schedule meals over time periods (1-4 weeks)
6. **Schedule Refinement** → Refine schedules using itinerary or calendar views
7. **Schedule Finalization** → Mark meal schedules as "ready" for grocery list generation
8. **Grocery List Generation** → Auto-generate shopping lists from finalized schedules
9. **Schedule Management** → Save, reference, refine, and republish meal schedules
10. **Integration & Sharing** → Share via mobile or publish to Google Calendar

---

## Current State Analysis

### ✅ **Implemented Features**
- **Ingredients Manager**: Basic ingredient catalog with categories, units, nutrition info
- **Recipe Manager**: Recipe CRUD with ingredients, instructions, images, serving counts
- **Basic Meal Scheduling**: Individual recipe scheduling with itinerary/calendar views
- **Grocery List Generation**: Basic list generation from scheduled meals
- **Google Calendar Integration**: Publish individual meals to calendar (managed/collaborative modes)
- **Settings Management**: Meal type visibility, dark mode, data source configuration
- **PWA Foundation**: Service worker, offline support, installable app

### ⚠️ **Partially Implemented**
- **Meal Composition**: Can schedule individual recipes but no multi-recipe meal concept
- **Schedule Management**: Basic scheduling exists but no save/load/manage multiple schedules
- **Advanced Planning**: Meal rotation engine exists but limited integration
- **Mobile Sharing**: PWA sharing capabilities exist but not meal-specific

### ❌ **Missing Critical Features**
- **Multi-Recipe Meals**: No concept of combining multiple recipes into one meal
- **Schedule State Management**: No "ready" state for meal schedules
- **Schedule Persistence**: No saved meal schedule management system
- **Schedule Refinement Tools**: Limited drag-drop and modification capabilities
- **Meal Schedule Tab**: No dedicated tab for managing saved schedules
- **Calendar Ownership Model**: Unclear calendar management for updates/republishing

---

## Integrated Implementation Roadmap

### **Phase 1: Core User Flow Foundation** 🎯 *Current Priority*
**Goal**: Establish the complete user flow with multi-recipe meals and schedule state management

#### **Milestone 1.1: Multi-Recipe Meal System & Combo Recipes**
- [ ] **Recipe Type Extension**: Add `type` field to recipes ('basic', 'combo')
- [ ] **Combo Recipe Model**: Data structure for recipes containing other recipes
- [ ] **Combo Recipe UI**: Interface to create combo recipes from existing recipes
- [ ] **Recipe Dependencies**: Track which recipes are used in combo recipes
- [ ] **Meal Entity Model**: Create data structure for meals using individual or combo recipes
- [ ] **Meal Composition UI**: Interface to create meals using recipes OR combo recipes
- [ ] **Meal Management**: CRUD operations for composed meals
- [ ] **Meal Staging**: Assign meals to meal types (breakfast/lunch/dinner)

#### **Milestone 1.2: Schedule State Management**
- [ ] **Schedule Status System**: Add "draft", "ready", "published" states to meal schedules
- [ ] **Schedule Finalization**: Mark schedules as "ready" for grocery list generation
- [ ] **State-Based UI**: Show different UI based on schedule state
- [ ] **Schedule Validation**: Ensure schedules are complete before marking ready

#### **Milestone 1.3: Schedule Persistence & Management**
- [ ] **Saved Schedules Tab**: New tab for managing multiple meal schedules
- [ ] **Schedule Templates**: Save schedules as reusable templates
- [ ] **Schedule History**: Track and manage previous meal schedules
- [ ] **Schedule Metadata**: Name, description, date ranges, tags for schedules

### **Phase 2: Enhanced Scheduling & Refinement** 
**Goal**: Improve schedule creation and modification tools

#### **Milestone 2.1: Advanced Schedule Refinement**
- [ ] **Enhanced Drag-Drop**: Improve meal moving between dates and meal types
- [ ] **Bulk Operations**: Select and move multiple meals at once
- [ ] **Schedule Optimization**: Auto-suggest improvements (ingredient overlap, variety)
- [ ] **Conflict Resolution**: Handle scheduling conflicts and overlaps

#### **Milestone 2.2: Intelligent Planning Integration**
- [ ] **Meal Rotation Engine**: Integrate existing engine with new meal system
- [ ] **Smart Suggestions**: Suggest meals based on ingredients, preferences, history
- [ ] **Seasonal Planning**: Incorporate seasonal ingredient preferences
- [ ] **Nutritional Balance**: Consider nutritional variety in meal planning

### **Phase 3: Grocery List & Integration Enhancement**
**Goal**: Improve grocery list generation and external integrations

#### **Milestone 3.1: Advanced Grocery Lists**
- [ ] **State-Based Generation**: Only generate from "ready" schedules
- [ ] **Multi-Schedule Lists**: Combine multiple schedules into one grocery list
- [ ] **Smart Consolidation**: Better ingredient consolidation and unit conversion
- [ ] **Shopping Organization**: Group by store sections, priority items

#### **Milestone 3.2: Enhanced Calendar Integration**
- [ ] **Calendar Ownership Model**: Clear managed vs collaborative calendar handling
- [ ] **Schedule Republishing**: Update published schedules with changes
- [ ] **Conflict Detection**: Detect and handle calendar conflicts
- [ ] **Bulk Publishing**: Publish entire meal schedules at once

#### **Milestone 3.3: Mobile & Sharing Features**
- [ ] **Native Mobile Sharing**: Share meal schedules via mobile share API
- [ ] **Export Formats**: PDF, text, email formats for schedules and grocery lists
- [ ] **QR Code Sharing**: Generate QR codes for easy schedule sharing
- [ ] **Collaborative Features**: Share schedules with family/roommates

### **Phase 4: User Experience & Polish**
**Goal**: Optimize user experience and add advanced features

#### **Milestone 4.1: UI/UX Improvements**
- [ ] **Mobile-First Design**: Optimize for mobile meal planning workflow
- [ ] **Touch Interactions**: Improve touch targets and gestures
- [ ] **Visual Feedback**: Better loading states, animations, confirmations
- [ ] **Accessibility**: Full WCAG 2.1 compliance

#### **Milestone 4.2: Advanced Features**
- [ ] **Meal Analytics**: Track favorite meals, ingredient usage, costs
- [ ] **Budget Planning**: Cost estimation and budget tracking
- [ ] **Inventory Integration**: Connect with pantry management for smarter planning
- [ ] **Recipe Scaling**: Auto-scale recipes based on household size

---

## Technical Architecture Updates

### **New Data Models Required**

```javascript
// Meal Entity (combines multiple recipes)
class Meal {
    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
        this.recipes = []; // Array of {recipeId, servings, notes}
        this.totalServings = 0;
        this.estimatedTime = 0;
        this.tags = [];
        this.mealTypes = []; // breakfast, lunch, dinner
        this.createdAt = null;
        this.updatedAt = null;
    }
}

// Enhanced Schedule Entity
class MealSchedule {
    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
        this.startDate = null;
        this.endDate = null;
        this.status = 'draft'; // draft, ready, published
        this.scheduledMeals = []; // Array of scheduled meal instances
        this.metadata = {
            tags: [],
            template: false,
            lastPublished: null,
            calendarId: null
        };
        this.createdAt = null;
        this.updatedAt = null;
    }
}

// Scheduled Meal Instance
class ScheduledMeal {
    constructor() {
        this.id = null;
        this.scheduleId = null;
        this.mealId = null; // References Meal entity
        this.date = null;
        this.mealType = 'dinner';
        this.servings = 4;
        this.notes = '';
        this.status = 'planned'; // planned, prepared, completed
    }
}
```

### **Database Schema Updates**

```sql
-- New Meals table for multi-recipe meals
CREATE TABLE meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    total_servings INTEGER DEFAULT 4,
    estimated_time INTEGER, -- total prep + cook time
    tags TEXT, -- JSON array
    meal_types TEXT, -- JSON array: breakfast, lunch, dinner
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for meal recipes
CREATE TABLE meal_recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    servings INTEGER DEFAULT 4,
    notes TEXT,
    order_index INTEGER DEFAULT 0
);

-- Enhanced meal schedules table
CREATE TABLE meal_schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT DEFAULT 'draft', -- draft, ready, published
    is_template BOOLEAN DEFAULT FALSE,
    tags TEXT, -- JSON array
    calendar_id TEXT, -- Google Calendar ID if published
    last_published DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Updated scheduled meals to reference meal schedules and meals
CREATE TABLE scheduled_meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schedule_id INTEGER REFERENCES meal_schedules(id) ON DELETE CASCADE,
    meal_id INTEGER REFERENCES meals(id), -- Can be NULL for single-recipe meals
    recipe_id INTEGER REFERENCES recipes(id), -- For backward compatibility
    scheduled_date DATE NOT NULL,
    meal_type TEXT DEFAULT 'dinner',
    servings INTEGER DEFAULT 4,
    notes TEXT,
    status TEXT DEFAULT 'planned' -- planned, prepared, completed
);
```

---

## Current Issues Integration

### **Immediate Fixes Needed** (blocking user flow)
1. **Dark Mode Toggle**: ✅ Fixed - theme icons now display correctly
2. **Meal Type Visibility**: ✅ Fixed - defaults to dinner only, toggles work
3. **Recipe Filtering**: Needs completion for better recipe selection in meals
4. **Ingredient Management**: Needs fixes for reliable meal composition
5. **Form Validation**: Recipe forms need proper validation for meal creation

### **Test Coverage Priorities**
1. **Multi-Recipe Meal Creation**: Test meal composition workflow
2. **Schedule State Transitions**: Test draft → ready → published flow
3. **Calendar Integration**: Test republishing and conflict handling
4. **Mobile Workflow**: Test complete user flow on mobile devices
5. **Data Persistence**: Test schedule saving and loading

---

## Success Metrics & Validation

### **User Flow Completion Metrics**
- [ ] **Ingredient → Recipe → Meal → Schedule**: Complete flow success rate > 80%
- [ ] **Schedule Finalization**: Users successfully mark schedules as "ready" > 90%
- [ ] **Grocery List Generation**: Accurate lists from finalized schedules > 95%
- [ ] **Schedule Management**: Users save and reuse schedules > 60%
- [ ] **Calendar Integration**: Successful publishing and updating > 85%

### **Technical Performance Metrics**
- [ ] **Multi-Recipe Meal Creation**: < 2 seconds average
- [ ] **Schedule State Changes**: < 500ms average
- [ ] **Grocery List Generation**: < 3 seconds for 4-week schedules
- [ ] **Calendar Publishing**: < 10 seconds for full schedule
- [ ] **Mobile Responsiveness**: All interactions < 100ms response time

---

## Next Steps & Priorities

### **Immediate Actions** (This Sprint)
1. **Complete Current Fixes**: Finish recipe filtering and ingredient management bugs
2. **Design Meal Entity**: Create detailed specifications for multi-recipe meals
3. **Plan Schedule Management**: Design the saved schedules tab and workflow
4. **Update Database Schema**: Plan migration for new meal and schedule entities

### **Short Term** (Next 2 Sprints)
1. **Implement Meal Composition**: Build UI for combining recipes into meals
2. **Add Schedule States**: Implement draft/ready/published status system
3. **Create Schedule Management Tab**: Build interface for managing saved schedules
4. **Enhance Calendar Integration**: Improve republishing and conflict handling

### **Medium Term** (Next Month)
1. **Advanced Refinement Tools**: Improve drag-drop and bulk operations
2. **Smart Suggestions**: Integrate meal rotation engine with new system
3. **Mobile Optimization**: Optimize entire workflow for mobile devices
4. **Comprehensive Testing**: Full end-to-end test coverage

This integrated roadmap provides a clear path from the current state to the complete user flow you've outlined, with specific milestones, technical requirements, and success metrics. Each phase builds on the previous one while maintaining backward compatibility and user experience continuity.
