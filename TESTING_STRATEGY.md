# Testing Strategy for MealPlanner PWA

## 🚨 **Caching Issues & Solutions**

### **Problem**
The MealPlanner PWA experiences persistent caching issues during development that affect:
- HTML file updates not reflecting in browser
- JavaScript module changes being cached
- E2E tests failing due to stale content
- Development workflow being disrupted

### **Root Causes**
1. **Vite HMR caching** - Hot Module Replacement caches modules aggressively
2. **Browser caching** - Service Worker and browser cache HTML/JS files
3. **PWA caching** - Service Worker caches assets for offline functionality
4. **Playwright caching** - Test browser may cache resources between runs

---

## 🛠️ **Solutions Implemented**

### **1. Development Server Configuration**
- Added cache-control headers to Vite config
- Disabled aggressive caching in development
- Added cache-busting for build assets

### **2. NPM Scripts for Cache Management**
```bash
# Fresh development server
npm run dev:fresh

# Clear all caches
npm run cache:clear

# Restart with fresh cache
npm run restart

# Fresh testing
npm run test:fresh
npm run test:e2e:fresh
npm run test:all:fresh
```

### **3. Development Helper Script**
```bash
# Clear caches
node scripts/dev-helper.js clear-cache

# Restart development server
node scripts/dev-helper.js restart-dev

# Run tests fresh
node scripts/dev-helper.js test-fresh
```

---

## 🧪 **Updated Testing Workflow**

### **Before Each Development Session**
1. **Start Fresh**: `npm run dev:fresh`
2. **Clear Browser Cache**: Hard refresh (Ctrl+F5) on first load
3. **Verify Changes**: Check that HTML/JS changes are reflected

### **Before Running Tests**
1. **Clear Caches**: `npm run cache:clear`
2. **Fresh Test Run**: `npm run test:all:fresh`
3. **Verify E2E Environment**: Ensure dev server is running fresh

### **When Changes Don't Appear**
1. **Stop Dev Server**: `Ctrl+C`
2. **Clear Cache**: `npm run cache:clear`
3. **Restart Fresh**: `npm run dev:fresh`
4. **Hard Refresh Browser**: `Ctrl+F5`

### **For E2E Test Failures**
1. **Check if HTML is current**: Manually verify in browser
2. **Restart dev server**: `npm run restart`
3. **Run fresh tests**: `npm run test:e2e:fresh`
4. **Use browser tools**: Check Network tab for 304 responses

---

## 📋 **Testing Checklist**

### **Unit Tests** ✅
- [x] Database operations
- [x] Component initialization
- [x] Ingredients management
- [x] Mock implementations working
- **Status**: Mostly passing, some mock refinements needed

### **Integration Tests** ⚠️
- [x] Database-component integration
- [x] Storage persistence
- [x] Cross-component communication
- **Status**: Some failures due to mock database limitations

### **E2E Tests** ❌
- [ ] Full user workflows
- [ ] Calendar functionality
- [ ] Drag and drop operations
- [ ] PWA installation
- **Status**: Blocked by caching issues, needs fresh approach

---

## 🎯 **Recommended Testing Approach**

### **Phase 1: Stabilize Core Functionality**
1. **Focus on Unit Tests**: Get all unit tests passing
2. **Manual Testing**: Verify core features work in browser
3. **Document Known Issues**: Track what works vs. what doesn't

### **Phase 2: Integration Testing**
1. **Database Integration**: Ensure real SQLite operations work
2. **Component Integration**: Test component interactions
3. **Storage Persistence**: Verify data survives page reloads

### **Phase 3: E2E Testing**
1. **Fresh Environment**: Always start with cleared cache
2. **Critical User Paths**: Test main user workflows
3. **PWA Features**: Test offline functionality, installation

### **Phase 4: Regression Testing**
1. **Automated CI/CD**: Set up GitHub Actions with fresh environments
2. **Pre-deployment Testing**: Always test with production build
3. **Cross-browser Testing**: Verify functionality across browsers

---

## 🚀 **Next Steps**

1. **Implement Calendar Tests**: Create tests for calendar functionality
2. **Fix Mock Database**: Improve integration test mocks
3. **Add Visual Testing**: Screenshot comparisons for UI changes
4. **Performance Testing**: Test with large datasets
5. **PWA Testing**: Verify offline functionality and installation

---

## 💡 **Best Practices**

- **Always start fresh** when debugging issues
- **Use cache-busting scripts** for consistent results
- **Test in incognito mode** to avoid browser cache
- **Verify changes manually** before running automated tests
- **Document caching workarounds** for team members
- **Use network throttling** to test offline scenarios
