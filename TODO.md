# MealPlanner TODO List

## 🎯 Current Priority: Test Documentation (WHY/WHAT Comments)

### Progress: 144/925 tests documented (16% complete)

## ✅ Completed
- [x] **demo-data-validation.test.js** (20/20 tests) - Critical data integrity protection
- [x] **clear-all-and-demo-data.test.js** (already had comments) - Critical data lifecycle
- [x] **settings-manager.test.js** (24/24 tests) - Critical app configuration
- [x] **database-source-switching.test.js** (10/28 tests) - Partial completion
- [x] **recipe-manager.test.js** (6/53 tests) - Partial completion

## 🔄 In Progress
- [ ] **items-manager.test.js** - Core inventory management tests
- [ ] **meal-rotation-engine.test.js** - Meal planning algorithm tests  
- [ ] **manager-initialization-order.test.js** - Critical startup sequence tests

## 📋 Next Priority (Manager Tests)
- [ ] **meal-scheduling.test.js** - Meal calendar functionality
- [ ] **database.test.js** - Core database operations
- [ ] **critical-bug-regression.test.js** - Regression prevention

## 📝 Remaining Test Files (40+ files, ~781 tests)
- [ ] **recipe-manager-infobox.test.js**
- [ ] **recipe-filtering-debug.test.js** 
- [ ] **add-items-functionality.test.js**
- [ ] **add-recipe-functionality.test.js**
- [ ] **combo-recipes.test.js**
- [ ] **meal-planning-controls.test.js**
- [ ] **mobile-navigation.test.js**
- [ ] **demo-data.test.js**
- [ ] **demo-data-autoritative-source.test.js**
- [ ] And 35+ more test files...

## 🎯 Goal
Every test should have meaningful WHY/WHAT comments:
```javascript
it('should do something', () => {
    // WHY: [Why this behavior matters to users]
    // WHAT: [What this test specifically validates]
    
    // test code...
});
```

## 📊 Impact
When tests fail during refactoring, comments immediately tell developers:
- **Fix the code** (protecting user-facing behavior)
- **Update the test** (implementation details changed)

---
*Last updated: 2025-09-16*
