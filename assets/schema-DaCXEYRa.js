const a=`
-- Ingredients master list for typeahead and normalization
CREATE TABLE IF NOT EXISTS ingredients (
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

-- Recipe ingredients junction table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id),
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
    ingredient_id INTEGER REFERENCES ingredients(id),
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

-- Insert some common ingredients to get started
INSERT OR IGNORE INTO ingredients (name, category, default_unit) VALUES
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
`,r=`
-- Sample recipes to get started
INSERT OR IGNORE INTO recipes (title, description, instructions, serving_count, prep_time, cook_time, meal_type, tags) VALUES
('Scrambled Eggs', 'Simple and fluffy scrambled eggs', 'Beat eggs with milk and salt. Cook in buttered pan over medium-low heat, stirring frequently until set.', 2, 5, 5, 'breakfast', '["quick", "protein", "vegetarian"]'),
('Chicken Stir Fry', 'Quick and healthy chicken stir fry with vegetables', 'Cut chicken into strips. Heat oil in wok, cook chicken until done. Add vegetables and stir fry sauce. Serve over rice.', 4, 15, 10, 'dinner', '["quick", "healthy", "asian"]'),
('Turkey Sandwich', 'Classic turkey and cheese sandwich', 'Layer turkey, cheese, lettuce, and tomato on bread. Add mayo and mustard to taste.', 1, 5, 0, 'lunch', '["quick", "cold", "sandwich"]');
`;function i(e){try{return e.exec(a),(e.exec("SELECT COUNT(*) as count FROM recipes")[0]?.values[0][0]||0)===0&&e.exec(r),console.log("Database initialized successfully"),!0}catch(t){return console.error("Error initializing database:",t),!1}}export{a as DATABASE_SCHEMA,r as SAMPLE_RECIPES,i as initializeDatabase};
