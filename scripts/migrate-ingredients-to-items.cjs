#!/usr/bin/env node

/**
 * Database Migration Script: Ingredients → Items
 * 
 * This script migrates the database schema from "ingredients" terminology 
 * to "items" for consistency and inclusivity.
 * 
 * BREAKING CHANGE: This will modify existing database structure.
 * Only run this during alpha/beta phases.
 */

const fs = require('fs');
const path = require('path');

class DatabaseMigration {
    constructor() {
        this.migrationVersion = '2025.09.15.001';
        this.backupPath = path.join(__dirname, '..', 'backups');
        this.schemaPath = path.join(__dirname, '..', 'src', 'database', 'schema.js');
    }

    /**
     * Main migration execution
     */
    async migrate() {
        console.log('🚀 Starting Database Migration: Ingredients → Items');
        console.log(`📅 Migration Version: ${this.migrationVersion}`);
        console.log('⚠️  WARNING: This is a breaking change for existing databases');
        
        try {
            // Step 1: Create backup directory
            this.createBackupDirectory();
            
            // Step 2: Generate migration SQL
            const migrationSQL = this.generateMigrationSQL();
            
            // Step 3: Save migration script
            this.saveMigrationScript(migrationSQL);
            
            // Step 4: Update schema file
            this.updateSchemaFile();
            
            console.log('✅ Migration preparation completed successfully!');
            console.log('\n📋 Next Steps:');
            console.log('1. Review the generated migration SQL');
            console.log('2. Test with demo data');
            console.log('3. Update all application code');
            console.log('4. Run comprehensive tests');
            
        } catch (error) {
            console.error('❌ Migration failed:', error.message);
            process.exit(1);
        }
    }

    /**
     * Create backup directory structure
     */
    createBackupDirectory() {
        if (!fs.existsSync(this.backupPath)) {
            fs.mkdirSync(this.backupPath, { recursive: true });
        }
        console.log('📁 Backup directory ready');
    }

    /**
     * Generate SQL migration script
     */
    generateMigrationSQL() {
        return `-- Database Migration: Ingredients → Items
-- Version: ${this.migrationVersion}
-- WARNING: This is a breaking change

BEGIN TRANSACTION;

-- Step 1: Create new tables with 'items' terminology
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    category TEXT, -- produce, dairy, meat, pantry, etc.
    default_unit TEXT, -- cups, lbs, pieces, etc.
    cost_per_unit REAL, -- estimated cost per default unit
    storage_notes TEXT, -- storage instructions
    nutrition_per_100g TEXT, -- JSON with calories, protein, carbs, fat
    barcode TEXT, -- UPC/EAN barcode if scanned
    brand TEXT, -- brand name if applicable
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create new recipe_items junction table
CREATE TABLE IF NOT EXISTS recipe_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id),
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    notes TEXT, -- "chopped", "optional", etc.
    sort_order INTEGER DEFAULT 0
);

-- Step 3: Update pantry_items table to reference items
CREATE TABLE IF NOT EXISTS pantry_items_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER REFERENCES items(id),
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    expiration_date DATE,
    notes TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Migrate data from old tables to new tables
INSERT INTO items (id, name, category, default_unit, cost_per_unit, storage_notes, nutrition_per_100g, barcode, brand, created_at, updated_at)
SELECT id, name, category, default_unit, cost_per_unit, storage_notes, nutrition_per_100g, barcode, brand, created_at, updated_at
FROM ingredients;

INSERT INTO recipe_items (id, recipe_id, item_id, quantity, unit, notes, sort_order)
SELECT id, recipe_id, ingredient_id, quantity, unit, notes, sort_order
FROM recipe_ingredients;

INSERT INTO pantry_items_new (id, item_id, quantity, unit, expiration_date, notes, updated_at)
SELECT id, ingredient_id, quantity, unit, expiration_date, notes, updated_at
FROM pantry_items;

-- Step 5: Drop old tables (BREAKING CHANGE)
DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS pantry_items;
DROP TABLE IF EXISTS ingredients;

-- Step 6: Rename new pantry table
ALTER TABLE pantry_items_new RENAME TO pantry_items;

-- Step 7: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_recipe_items_recipe_id ON recipe_items(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_items_item_id ON recipe_items(item_id);
CREATE INDEX IF NOT EXISTS idx_pantry_items_item_id ON pantry_items(item_id);

COMMIT;

-- Verification queries
SELECT 'Items count:' as check_type, COUNT(*) as count FROM items;
SELECT 'Recipe items count:' as check_type, COUNT(*) as count FROM recipe_items;
SELECT 'Pantry items count:' as check_type, COUNT(*) as count FROM pantry_items;
`;
    }

    /**
     * Save migration script to file
     */
    saveMigrationScript(sql) {
        const migrationFile = path.join(this.backupPath, `migration_${this.migrationVersion}.sql`);
        fs.writeFileSync(migrationFile, sql);
        console.log(`💾 Migration SQL saved to: ${migrationFile}`);
    }

    /**
     * Update the schema.js file
     */
    updateSchemaFile() {
        const schemaContent = this.generateNewSchema();
        fs.writeFileSync(this.schemaPath, schemaContent);
        console.log('📝 Schema file updated');
    }

    /**
     * Generate new schema content
     */
    generateNewSchema() {
        return `// Database schema and initialization
export const DATABASE_SCHEMA = \`
-- Items master list for typeahead and normalization
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    category TEXT, -- produce, dairy, meat, pantry, etc.
    default_unit TEXT, -- cups, lbs, pieces, etc.
    cost_per_unit REAL, -- estimated cost per default unit
    storage_notes TEXT, -- storage instructions
    nutrition_per_100g TEXT, -- JSON with calories, protein, carbs, fat
    barcode TEXT, -- UPC/EAN barcode if scanned
    brand TEXT, -- brand name if applicable
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    image_data TEXT, -- base64 encoded image or null
    serving_count INTEGER DEFAULT 4,
    prep_time INTEGER, -- minutes
    cook_time INTEGER, -- minutes
    preference_weight REAL DEFAULT 1.0, -- for rotation frequency (0.1 = rarely, 2.0 = often)
    tags TEXT, -- JSON array of tags
    meal_type TEXT DEFAULT 'dinner', -- breakfast, lunch, dinner, snack
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Recipe items junction table
CREATE TABLE IF NOT EXISTS recipe_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id),
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    notes TEXT, -- "chopped", "optional", etc.
    sort_order INTEGER DEFAULT 0
);

-- Meal plans table
CREATE TABLE IF NOT EXISTS meal_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    meal_type TEXT NOT NULL, -- breakfast, lunch, dinner
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Scheduled meals table
CREATE TABLE IF NOT EXISTS scheduled_meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_plan_id INTEGER REFERENCES meal_plans(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id),
    scheduled_date DATE NOT NULL,
    meal_type TEXT NOT NULL, -- breakfast, lunch, dinner
    notes TEXT
);

-- Pantry items table for optimization
CREATE TABLE IF NOT EXISTS pantry_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER REFERENCES items(id),
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    expiration_date DATE,
    notes TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Grocery lists table
CREATE TABLE IF NOT EXISTS grocery_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_plan_id INTEGER REFERENCES meal_plans(id),
    week_start_date DATE NOT NULL,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    items TEXT NOT NULL -- JSON array of grocery items with quantities and crossed-out status
);

-- Insert some common items to get started
INSERT OR IGNORE INTO items (name, category, default_unit) VALUES
-- Produce
('Red Onion', 'produce', 'pieces'),
('Yellow Onion', 'produce', 'pieces'),
('White Onion', 'produce', 'pieces'),
('Garlic', 'produce', 'cloves'),
('Tomatoes', 'produce', 'pieces'),
('Bell Pepper', 'produce', 'pieces'),
('Carrots', 'produce', 'pieces'),
('Celery', 'produce', 'stalks'),
('Potatoes', 'produce', 'lbs'),
('Sweet Potatoes', 'produce', 'pieces'),
('Broccoli', 'produce', 'heads'),
('Spinach', 'produce', 'oz'),
('Lettuce', 'produce', 'heads'),
('Mushrooms', 'produce', 'oz'),
('Lemons', 'produce', 'pieces'),
('Limes', 'produce', 'pieces'),

-- Dairy
('Milk', 'dairy', 'cups'),
('Heavy Cream', 'dairy', 'cups'),
('Butter', 'dairy', 'sticks'),
('Eggs', 'dairy', 'pieces'),
('Cheddar Cheese', 'dairy', 'oz'),
('Mozzarella Cheese', 'dairy', 'oz'),
('Parmesan Cheese', 'dairy', 'oz'),
('Greek Yogurt', 'dairy', 'cups'),
('Sour Cream', 'dairy', 'cups'),

-- Meat & Protein
('Chicken Breast', 'meat', 'lbs'),
('Chicken Thighs', 'meat', 'lbs'),
('Ground Beef', 'meat', 'lbs'),
('Ground Turkey', 'meat', 'lbs'),
('Salmon', 'meat', 'lbs'),
('Shrimp', 'meat', 'lbs'),
('Bacon', 'meat', 'slices'),
('Ham', 'meat', 'slices'),

-- Pantry
('Olive Oil', 'pantry', 'tbsp'),
('Vegetable Oil', 'pantry', 'tbsp'),
('Salt', 'pantry', 'tsp'),
('Black Pepper', 'pantry', 'tsp'),
('Garlic Powder', 'pantry', 'tsp'),
('Onion Powder', 'pantry', 'tsp'),
('Paprika', 'pantry', 'tsp'),
('Cumin', 'pantry', 'tsp'),
('Oregano', 'pantry', 'tsp'),
('Basil', 'pantry', 'tsp'),
('Thyme', 'pantry', 'tsp'),
('Bay Leaves', 'pantry', 'pieces'),
('Flour', 'pantry', 'cups'),
('Sugar', 'pantry', 'cups'),
('Brown Sugar', 'pantry', 'cups'),
('Baking Powder', 'pantry', 'tsp'),
('Baking Soda', 'pantry', 'tsp'),
('Vanilla Extract', 'pantry', 'tsp'),
('Soy Sauce', 'pantry', 'tbsp'),
('Worcestershire Sauce', 'pantry', 'tbsp'),
('Hot Sauce', 'pantry', 'tbsp'),
('Ketchup', 'pantry', 'tbsp'),
('Mustard', 'pantry', 'tbsp'),
('Mayonnaise', 'pantry', 'tbsp'),

-- Grains & Bread
('Rice', 'grains', 'cups'),
('Pasta', 'grains', 'oz'),
('Bread', 'grains', 'slices'),
('Tortillas', 'grains', 'pieces'),
('Quinoa', 'grains', 'cups'),
('Oats', 'grains', 'cups'),

-- Canned/Jarred
('Chicken Broth', 'pantry', 'cups'),
('Beef Broth', 'pantry', 'cups'),
('Vegetable Broth', 'pantry', 'cups'),
('Diced Tomatoes', 'pantry', 'cans'),
('Tomato Sauce', 'pantry', 'cans'),
('Tomato Paste', 'pantry', 'tbsp'),
('Coconut Milk', 'pantry', 'cans'),
('Black Beans', 'pantry', 'cans'),
('Kidney Beans', 'pantry', 'cans'),
('Chickpeas', 'pantry', 'cans');
\`;

export const SAMPLE_RECIPES = \`
-- Sample recipes to get started
INSERT OR IGNORE INTO recipes (title, description, instructions, serving_count, prep_time, cook_time, meal_type, tags) VALUES
('Scrambled Eggs', 'Simple and fluffy scrambled eggs', 'Beat eggs with milk and salt. Cook in buttered pan over medium-low heat, stirring frequently until set.', 2, 5, 5, 'breakfast', '["quick", "protein", "vegetarian"]'),
('Chicken Stir Fry', 'Quick and healthy chicken stir fry with vegetables', 'Cut chicken into strips. Heat oil in wok, cook chicken until done. Add vegetables and stir fry sauce. Serve over rice.', 4, 15, 10, 'dinner', '["quick", "healthy", "asian"]'),
('Turkey Sandwich', 'Classic turkey and cheese sandwich', 'Layer turkey, cheese, lettuce, and tomato on bread. Add mayo and mustard to taste.', 1, 5, 0, 'lunch', '["quick", "cold", "sandwich"]');
\`;
`;
    }
}

// Execute migration if run directly
if (require.main === module) {
    const migration = new DatabaseMigration();
    migration.migrate().catch(console.error);
}

module.exports = { DatabaseMigration };
