# MealPlanner Integrated Roadmap
*Last Updated: 2025-01-08*

## 📊 **Current State Analysis**

### ✅ **What's Implemented & Working**
- **Core Infrastructure**: PWA foundation, SQLite database, service worker
- **Recipe Management**: Full CRUD operations, ingredients, instructions, images
- **Ingredients Management**: Catalog with categories, units, nutrition info
- **Basic Meal Scheduling**: Individual recipe scheduling with calendar/itinerary views
- **Grocery List Generation**: Basic list generation from scheduled meals
- **Google Calendar Integration**: OAuth, publishing meals to calendar
- **Settings & UI**: Dark mode, meal type visibility, responsive design
- **Testing Framework**: 749 passing tests, comprehensive coverage
- **Deployment**: Live at mealplanner.523.life with automated CI/CD

### ❌ **Critical Issues Identified** (User Review 2025-01-08)

#### **🚨 Critical Blocking Issues**
1. **Issue #7**: Light/dark mode toggle not working
2. **Issue #10**: Clear function on meal tabs doesn't remove scheduled meals
3. **Issue #1**: Meal type visibility settings not hiding unchecked tabs

#### **🚨 Core Workflow Missing**
4. **Issue #11**: Major meal scheduling workflow redesign needed
   - No meal selection from defined meals
   - No time period-based scheduling
   - Grocery list tab should be "Scheduled" tab
5. **Issue #12**: Scheduled tab needs unified calendar & itinerary views

#### **🔧 Medium Priority Issues**
6. **Issue #2**: Tab order doesn't follow logical workflow (should be: Ingredients → Recipes → Meals → Scheduled → Settings)
7. **Issue #3**: Dropdown default text missing/inconsistent on small screens
8. **Issue #4**: "Meal types" should be "Recipe types" on Recipe tab
9. **Issue #5**: Clear filters button missing on Recipes tab
10. **Issue #9**: Missing meals in demo dataset (need at least 7)

#### **💡 UI Polish Issues**
11. **Issue #6A & #8**: Remove unnecessary stat counters ("44 Labels", "5 Categories", etc.)
12. **Issue #6B**: Implement unified favorites system across all tabs

---

## 🎯 **Phase 1: Core Workflow Foundation**

### **Milestone 1.1: Fix Critical Blocking Issues** ⚡ *IMMEDIATE*
**Duration**: 2-3 days  
**Goal**: Fix broken core functionality that blocks user testing

#### **Critical Fixes**:
1. **🚨 Issue #7**: Fix light/dark mode toggle functionality
2. **🚨 Issue #10**: Fix clear function on breakfast/lunch/dinner tabs
3. **🔧 Issue #1**: Fix meal type visibility settings (hide unchecked tabs)

#### **Validation Criteria**:
- [ ] Theme toggle switches between light/dark modes
- [ ] Clear button removes all scheduled meals from itinerary AND calendar
- [ ] Meal type visibility settings hide/show appropriate tabs
- [ ] All existing tests still pass
- [ ] Manual testing on live site confirms fixes

#### **Tests to Add**:
- Theme toggle integration test
- Clear functionality across all meal tabs
- Settings persistence for meal type visibility

---

### **Milestone 1.2: Information Architecture Redesign** 📐 *HIGH PRIORITY*
**Duration**: 3-4 days  
**Goal**: Restructure navigation and terminology for clear user flow

#### **Navigation & Terminology Fixes**:
1. **🎨 Issue #2**: Reorder tabs: Ingredients → Recipes → Meals → Scheduled → Settings
2. **🎨 Issue #4**: Change "Meal types" to "Recipe types" on Recipe tab
3. **🚨 Issue #11A**: Rename "Grocery List" tab to "Scheduled"
4. **🔧 Issue #3**: Fix dropdown default text display issues
5. **🔧 Issue #5**: Add clear filters button to Recipes tab (match Ingredients)

#### **Validation Criteria**:
- [ ] Tab order follows logical workflow
- [ ] Terminology is consistent and clear
- [ ] All dropdowns show proper default text
- [ ] Clear filters works on all tabs
- [ ] Navigation feels intuitive

#### **Tests to Add**:
- Navigation order tests
- Dropdown default text tests
- Clear filters functionality tests

---

### **Milestone 1.3: Core Meal Scheduling Workflow** 🎯 *CRITICAL*
**Duration**: 5-7 days  
**Goal**: Implement the missing meal selection and scheduling pipeline

#### **New Functionality**:
1. **🚨 Issue #11B**: Add meal selection interface to breakfast/lunch/dinner tabs
2. **🚨 Issue #11C**: Implement time period selection with "Review Scheduled" vs "Schedule New" modes
3. **🚨 Issue #12**: Create unified Scheduled tab with calendar & itinerary views
4. **🚨 Issue #11D**: Integrate grocery list generation with scheduled meals

#### **Implementation Steps**:

**Step 1: Meal Selection Interface**
```javascript
// Add to each meal tab (breakfast/lunch/dinner):
- Time period selector (This Week, Next Week, Next 2 Weeks, etc.)
- Mode detection: "Review Scheduled" or "Schedule New"
- Meal picker from defined meals collection
- Schedule confirmation interface
```

**Step 2: Scheduled Tab Creation**
```javascript
// New Scheduled tab functionality:
- Unified calendar view (all meal types per day)
- Unified itinerary view (chronological all meals)
- Grocery list generation section
- Export functionality
```

**Step 3: Data Model Updates**
```javascript
// Enhanced scheduling data structure:
- Link scheduled meals to meal definitions
- Time period management
- Schedule state tracking
```

#### **Validation Criteria**:
- [ ] Can select meals from collection and schedule them
- [ ] Time period selection works correctly
- [ ] Scheduled tab shows unified view of all meals
- [ ] Grocery list generates from scheduled meals only
- [ ] Calendar and itinerary views are consistent

#### **Tests to Add**:
- Meal selection and scheduling workflow tests
- Scheduled tab unified view tests
- Grocery list generation from scheduled meals tests

---

### **Milestone 1.4: Demo Data & Polish** ✨ *MEDIUM PRIORITY*
**Duration**: 2-3 days  
**Goal**: Complete user experience with demo data and UI improvements

#### **Demo Data & UI Improvements**:
1. **⚠️ Issue #9**: Add 7+ demo meals to default dataset
2. **🔧 Issue #6B**: Implement unified favorites system (star next to search)
3. **💡 Issues #6A, #8**: Remove unnecessary stat counters across all tabs
4. **🔧 Issue #3**: Ensure responsive dropdown behavior

#### **Demo Meals Requirements**:
- Minimum 7 meals covering breakfast, lunch, dinner
- Mix of single-recipe and multi-recipe meals
- Showcase variety and meal planning concepts
- Include in default demo dataset

#### **Validation Criteria**:
- [ ] Demo dataset includes 7+ diverse meals
- [ ] Favorites system works across ingredients, recipes, meals
- [ ] UI is clean without unnecessary counters
- [ ] New user experience is smooth and educational

#### **Tests to Add**:
- Demo data loading tests
- Favorites functionality tests
- UI cleanup verification tests

---

## 🧪 **Testing Strategy for Phase 1**

### **Regression Prevention**:
1. **Before each milestone**: Run full test suite (`npm test`)
2. **After each milestone**: Manual testing checklist
3. **Integration testing**: Test workflow end-to-end
4. **Cross-browser testing**: Chrome, Firefox, Safari

### **Milestone Validation Process**:
1. **Code complete** → Run automated tests
2. **Deploy to staging** → Manual validation checklist
3. **User acceptance** → Stakeholder validates the milestone
4. **Deploy to production** → Update version
5. **Regression check** → Verify no existing functionality broken

### **Manual Testing Checklist** (for each milestone):
- [ ] All tabs load and function correctly
- [ ] Theme toggle works
- [ ] Clear functions work across all tabs
- [ ] Meal scheduling workflow completes successfully
- [ ] Grocery list generates correctly
- [ ] Mobile responsiveness maintained
- [ ] No console errors

---

## 📋 **Complete Issue Tracker**

### **🚨 Critical Issues**
- **#7**: Light/dark mode toggle not working
- **#10**: Clear function on meal tabs doesn't remove scheduled meals
- **#11**: Major meal scheduling workflow redesign needed
- **#12**: Scheduled tab needs unified calendar & itinerary views

### **⚠️ High Priority Issues**
- **#9**: Missing meals in demo dataset (need at least 7)

### **🔧 Medium Priority Issues**
- **#1**: Meal type visibility settings not hiding unchecked tabs
- **#2**: Tab order doesn't follow logical workflow
- **#3**: Dropdown default text missing/inconsistent
- **#4**: "Meal types" should be "Recipe types" on Recipe tab
- **#5**: Clear filters button missing on Recipes tab

### **💡 Low Priority Issues**
- **#6A & #8**: Remove unnecessary stat counters
- **#6B**: Implement unified favorites system

---

## 🎯 **Success Metrics**

### **Phase 1 Success Criteria**
- [ ] All critical blocking issues resolved
- [ ] Complete meal scheduling workflow functional
- [ ] Unified scheduled tab with calendar/itinerary views
- [ ] Demo data enables full workflow demonstration
- [ ] 90%+ test coverage maintained
- [ ] No regression in existing functionality

### **User Experience Goals**
- [ ] New users can complete full workflow with demo data
- [ ] Logical tab order matches mental model
- [ ] Clear, consistent terminology throughout
- [ ] Mobile-responsive across all features
- [ ] Intuitive meal selection and scheduling

---

## 🚀 **Next Steps**

**Immediate Action**: Begin Milestone 1.1 - Fix Critical Blocking Issues
1. Fix theme toggle functionality
2. Fix clear button across all meal tabs
3. Fix meal type visibility settings

**Timeline**: Phase 1 completion in 2-3 weeks with clear validation milestones

**Legacy Documentation**: Previous roadmaps moved to `/legacy/` directory
- `legacy/INTEGRATED_ROADMAP.md`
- `legacy/IMPLEMENTATION_PLAN.md`

**Living Documents**: 
- `pwa_lessons.md` - Continues to be updated with development insights
- `ROADMAP.md` - This document, the single source of truth for project direction
