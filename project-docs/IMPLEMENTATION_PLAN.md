# MealPlanner PWA Implementation Plan

## Project Overview

A Progressive Web App (PWA) for meal planning that uses local SQLite storage via WebAssembly (WASM) for offline functionality and cross-device synchronization. The app will allow users to manage recipes, create meal plans, and generate grocery lists with intelligent scheduling algorithms.

## Key Features

### Core Functionality
- **Recipe Management**: Add, edit, and organize recipes with ingredients, instructions, images, and serving counts
- **Meal Planning**: Schedule recipes across 1-4 weeks with intelligent rotation algorithms
- **Grocery Lists**: Generate weekly grocery lists based on meal plans
- **Offline Support**: Full functionality without internet connection using local SQLite database
- **Cross-Device Sync**: Share SQLite database file across devices
- **Calendar Integration**: Export meal plans to Google Calendar (recipe names only)

### Intelligent Scheduling Criteria
- Avoid back-to-back identical meals
- Optimize for shared ingredients within weeks
- Consider pantry ingredients for first week optimization
- Recipe preference weights for rotation frequency
- Seasonal and dietary considerations

## Technology Stack

- **Frontend**: Vanilla JavaScript/TypeScript with modern ES modules
- **Database**: SQLite via sql.js (WASM)
- **PWA**: Service Worker, Web App Manifest
- **UI Framework**: Lightweight CSS framework (consider Tailwind CSS)
- **Build Tool**: Vite for development and bundling
- **Testing**: Vitest for unit tests, Playwright for E2E

## Phase-by-Phase Implementation Plan

### Phase 1: Foundation & Basic PWA (Week 1-2)
**Milestone: Basic PWA with SQLite Integration**

#### Tasks:
1. **Project Setup**
   - Initialize Vite project with TypeScript
   - Configure PWA manifest and service worker
   - Set up development environment and tooling
   - Create basic project structure

2. **SQLite Integration**
   - Integrate sql.js WASM library
   - Create database schema for recipes, meal plans, and grocery lists
   - Implement basic CRUD operations
   - Add database initialization and migration system

3. **Basic UI Framework**
   - Set up responsive layout with navigation
   - Create basic component system
   - Implement routing (hash-based or History API)
   - Add basic styling and theming

#### Deliverables:
- Working PWA that can be installed
- SQLite database running in browser
- Basic navigation between sections
- Database schema implemented

#### Testing:
- Unit tests for database operations
- PWA installation and offline functionality
- Cross-browser compatibility (Chrome, Firefox, Safari)

---

### Phase 2: Recipe Management (Week 3)
**Milestone: Complete Recipe CRUD Operations**

#### Tasks:
1. **Recipe Data Model**
   - Implement Recipe entity with all fields
   - Create ingredient management system
   - Add image upload and storage (base64 or File API)
   - Implement recipe validation

2. **Recipe UI Components**
   - Recipe list view with search and filtering
   - Recipe detail view
   - Recipe creation/editing form
   - Image upload component
   - Ingredient list management

3. **Recipe Features**
   - Import recipes from URLs (basic scraping)
   - Recipe categories and tags
   - Serving size calculations
   - Recipe duplication and templates

#### Deliverables:
- Full recipe management system
- Recipe import functionality
- Image handling for recipes
- Search and filter capabilities

#### Testing:
- Recipe CRUD operations
- Image upload and display
- Recipe validation and error handling
- Import functionality with various recipe websites

---

### Phase 3: Meal Planning Engine (Week 4-5)
**Milestone: Intelligent Meal Planning System**

#### Tasks:
1. **Meal Planning Algorithm**
   - Implement scheduling algorithm with constraints
   - Add recipe preference weighting system
   - Create ingredient optimization logic
   - Implement pantry management for optimization

2. **Meal Planning UI**
   - Calendar-style meal plan view
   - Recipe selection interface
   - Drag-and-drop meal scheduling
   - Plan generation and refinement tools

3. **Planning Intelligence**
   - Shared ingredient optimization
   - Back-to-back meal prevention
   - Preference weight consideration
   - Seasonal recipe suggestions

#### Deliverables:
- Working meal planning algorithm
- Interactive meal planning interface
- Recipe scheduling with constraints
- Plan optimization features

#### Testing:
- Algorithm correctness with various scenarios
- UI responsiveness and usability
- Edge cases (insufficient recipes, conflicts)
- Performance with large recipe databases

---

### Phase 4: Grocery Lists & Export Features (Week 6)
**Milestone: Complete Grocery Management and Export**

#### Tasks:
1. **Grocery List Generation**
   - Generate weekly grocery lists from meal plans
   - Ingredient consolidation and unit conversion
   - Pantry item tracking and subtraction
   - Shopping list organization by store sections

2. **Export Functionality**
   - Export grocery lists (PDF, text, email)
   - Google Calendar integration for meal plans
   - Recipe sharing and export
   - Meal plan export formats

3. **Advanced Features**
   - Multiple meal plan management
   - Plan templates and favorites
   - Nutritional information display
   - Cost estimation for grocery lists

#### Deliverables:
- Automated grocery list generation
- Multiple export formats
- Google Calendar integration
- Advanced meal planning features

#### Testing:
- Grocery list accuracy and formatting
- Export functionality across formats
- Calendar integration reliability
- Cross-device export compatibility

---

### Phase 5: Advanced Features & Polish (Week 7-8)
**Milestone: Production-Ready Application**

#### Tasks:
1. **Database Sync & Backup**
   - SQLite file export/import
   - Cloud storage integration options
   - Backup and restore functionality
   - Cross-device synchronization guides

2. **Performance & UX Optimization**
   - Database query optimization
   - UI/UX improvements and animations
   - Accessibility compliance (WCAG 2.1)
   - Mobile-first responsive design refinement

3. **Advanced Planning Features**
   - Batch meal planning
   - Recipe rotation analytics
   - Meal plan history and favorites
   - Advanced filtering and search

#### Deliverables:
- Optimized performance and user experience
- Complete backup/sync system
- Advanced meal planning features
- Production deployment setup

#### Testing:
- Performance testing with large datasets
- Accessibility testing
- User acceptance testing
- Cross-device synchronization testing

---

### Phase 6: Deployment & Documentation (Week 9)
**Milestone: Live Application with Documentation**

#### Tasks:
1. **Production Deployment**
   - Set up hosting for static PWA
   - Configure CDN and caching
   - SSL certificate and security headers
   - Domain setup (mealplanner.foo.com)

2. **Documentation & Guides**
   - User documentation and tutorials
   - Developer documentation
   - Database schema documentation
   - Sync setup guides for users

3. **Final Testing & Launch**
   - Comprehensive end-to-end testing
   - Performance monitoring setup
   - User feedback collection system
   - Launch preparation and marketing materials

#### Deliverables:
- Live, accessible PWA
- Complete user and developer documentation
- Monitoring and feedback systems
- Launch-ready application

#### Testing:
- Production environment testing
- Load testing and performance monitoring
- Final user acceptance testing
- Security and privacy compliance

---

## Database Schema

### Tables Structure

```sql
-- Recipes table
CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    image_data TEXT, -- base64 encoded image
    serving_count INTEGER DEFAULT 4,
    prep_time INTEGER, -- minutes
    cook_time INTEGER, -- minutes
    preference_weight REAL DEFAULT 1.0, -- for rotation frequency
    tags TEXT, -- JSON array of tags
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients table
CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    category TEXT, -- produce, dairy, meat, etc.
    default_unit TEXT -- cups, lbs, etc.
);

-- Recipe ingredients junction table
CREATE TABLE recipe_ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    notes TEXT -- "chopped", "optional", etc.
);

-- Meal plans table
CREATE TABLE meal_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Scheduled meals table
CREATE TABLE scheduled_meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_plan_id INTEGER REFERENCES meal_plans(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id),
    scheduled_date DATE NOT NULL,
    meal_type TEXT DEFAULT 'dinner' -- breakfast, lunch, dinner, snack
);

-- Pantry items table
CREATE TABLE pantry_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    expiration_date DATE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Grocery lists table
CREATE TABLE grocery_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_plan_id INTEGER REFERENCES meal_plans(id),
    week_number INTEGER NOT NULL,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    items TEXT NOT NULL -- JSON array of grocery items
);
```

## Technical Considerations

### PWA Requirements
- Service Worker for offline functionality
- Web App Manifest for installation
- HTTPS requirement for PWA features
- Responsive design for mobile-first experience

### SQLite via WASM
- sql.js library for SQLite in browser
- File API for database import/export
- IndexedDB for persistent storage
- Memory management for large databases

### Performance Optimization
- Lazy loading for large recipe collections
- Virtual scrolling for long lists
- Image compression and caching
- Database query optimization

### Cross-Device Synchronization
- SQLite file export/import mechanism
- Cloud storage integration (Google Drive, Dropbox)
- Conflict resolution strategies
- Version control for database changes

## Risk Mitigation

### Technical Risks
- **WASM Performance**: Test sql.js performance with large datasets early
- **Mobile Compatibility**: Extensive mobile browser testing
- **Storage Limits**: Implement storage monitoring and cleanup
- **Sync Conflicts**: Design robust conflict resolution

### User Experience Risks
- **Complexity**: Iterative UX testing and simplification
- **Learning Curve**: Comprehensive onboarding and tutorials
- **Data Loss**: Multiple backup and export options
- **Performance**: Regular performance monitoring and optimization

## Success Metrics

### Technical Metrics
- PWA installation rate > 60%
- Offline functionality success rate > 95%
- Database operation performance < 100ms average
- Cross-device sync success rate > 90%

### User Experience Metrics
- Recipe creation completion rate > 80%
- Meal plan generation success rate > 85%
- User retention after 1 week > 70%
- Feature adoption rate > 50% for core features

## Next Steps

1. **Review and Approve Plan**: Discuss any modifications or priorities
2. **Set Up Development Environment**: Initialize project structure
3. **Begin Phase 1**: Start with PWA foundation and SQLite integration
4. **Regular Check-ins**: Weekly progress reviews and plan adjustments
5. **User Testing**: Early and frequent user feedback collection

This plan provides a structured approach to building a comprehensive meal planning PWA while maintaining flexibility for adjustments based on testing and feedback.
