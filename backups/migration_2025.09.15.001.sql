-- Database Migration: Ingredients → Items
-- Version: 2025.09.15.001
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
