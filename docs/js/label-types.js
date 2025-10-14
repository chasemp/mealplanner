// Label Types Configuration
class LabelTypes {
    constructor() {
        this.types = {
            'default': {
                name: 'Default',
                color: 'bg-green-100 text-green-800 dark:!bg-green-200 dark:!text-green-900',
                description: 'General recipe labels',
                icon: null, // No icon for default labels
                scope: 'recipe' // default scope
            },
            'recipe_type': {
                name: 'Recipe Type',
                color: 'bg-blue-100 text-blue-800 dark:!bg-blue-200 dark:!text-blue-900',
                description: 'Type of recipe (combo, etc.)',
                icon: '<svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',
                scope: 'recipe'
            },
            'meal_type': {
                name: 'Meal Type',
                color: 'bg-orange-100 text-orange-800 dark:!bg-orange-900 dark:!text-orange-200',
                description: 'Type of meal (breakfast, lunch, dinner, snack)',
                icon: '<svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
                scope: 'recipe'
            },
            'item_default': {
                name: 'Item Label',
                color: 'bg-teal-100 text-teal-800 dark:!bg-teal-200 dark:!text-teal-900',
                description: 'General item labels',
                icon: null,
                scope: 'item'
            },
            'item_category': {
                name: 'Category',
                color: 'bg-purple-100 text-purple-800 dark:!bg-purple-200 dark:!text-purple-900',
                description: 'Item category (produce, dairy, meat, etc.)',
                icon: '<svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>',
                scope: 'item'
            },
            'shared': {
                name: 'Shared Label',
                color: 'bg-indigo-100 text-indigo-800 dark:!bg-indigo-200 dark:!text-indigo-900',
                description: 'Labels shared between recipes and items',
                icon: '<svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>',
                scope: 'both'
            }
        };
        
        // Predefined labels by type
        this.predefinedLabels = {
            'recipe_type': [
                'Recipe Combo'  // Only combo recipes get a label, basic recipes don't need one
            ],
            'meal_type': [
                'Breakfast', 'Lunch', 'Dinner', 'Snack'
            ],
            'default': [
                'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free',
                'quick', 'easy', 'healthy', 'comfort-food', 'spicy',
                'italian', 'mexican', 'asian', 'american', 'mediterranean',
                'protein', 'low-carb', 'high-protein', 'family-meal'
            ],
            'item_category': [
                'Produce', 'Dairy', 'Meat & Poultry', 'Seafood', 'Pantry',
                'Spices & Herbs', 'Beverages', 'Frozen', 'Bakery', 'Other'
            ],
            'item_default': [
                'organic', 'local', 'seasonal', 'bulk', 'fresh',
                'canned', 'jarred', 'boxed', 'packaged'
            ]
        };
    }

    // Get all label types
    getAllTypes() {
        return Object.keys(this.types);
    }

    // Get type configuration
    getTypeConfig(type) {
        return this.types[type] || this.types['default'];
    }

    // Get color classes for a label type
    getColorClasses(type) {
        return this.getTypeConfig(type).color;
    }

    // Get icon for a label type
    getIcon(type) {
        return this.getTypeConfig(type).icon || '';
    }

    // Get predefined labels for a type
    getPredefinedLabels(type) {
        return this.predefinedLabels[type] || [];
    }

    // Get all predefined labels (for demo mode)
    getAllPredefinedLabels() {
        const allLabels = [];
        for (const type of Object.keys(this.predefinedLabels)) {
            allLabels.push(...this.predefinedLabels[type]);
        }
        return allLabels;
    }

    // Determine label type from label name (for existing labels without explicit type)
    inferLabelType(labelName) {
        // Handle legacy "combo" label - treat as recipe_type
        if (labelName === 'combo') {
            return 'recipe_type';
        }
        
        for (const [type, labels] of Object.entries(this.predefinedLabels)) {
            if (labels.includes(labelName)) {
                return type;
            }
        }
        return 'default';
    }

    // Create a typed label object
    createTypedLabel(name, type = 'default') {
        return {
            name: name,
            type: type,
            color: this.getColorClasses(type)
        };
    }

    // Convert simple label array to typed labels
    convertToTypedLabels(labels) {
        if (!Array.isArray(labels)) return [];
        
        return labels.map(label => {
            if (typeof label === 'string') {
                return this.createTypedLabel(label, this.inferLabelType(label));
            } else if (label && typeof label === 'object' && label.name) {
                // Already a typed label
                return label;
            }
            return this.createTypedLabel(String(label));
        });
    }

    // Extract just the label names from typed labels
    extractLabelNames(typedLabels) {
        if (!Array.isArray(typedLabels)) return [];
        
        return typedLabels.map(label => {
            if (typeof label === 'string') return label;
            if (label && typeof label === 'object' && label.name) return label.name;
            return String(label);
        });
    }

    // Get label types for a specific scope (recipe, item, or both)
    getTypesForScope(scope) {
        return Object.entries(this.types)
            .filter(([_, config]) => config.scope === scope || config.scope === 'both')
            .map(([type, _]) => type);
    }

    // Infer label type for items
    inferItemLabelType(labelName) {
        // Check if it's a category label
        if (this.predefinedLabels.item_category.some(cat => 
            cat.toLowerCase() === labelName.toLowerCase())) {
            return 'item_category';
        }
        
        // Check if it's in item default labels
        if (this.predefinedLabels.item_default.includes(labelName)) {
            return 'item_default';
        }
        
        // Default to item_default for unknown item labels
        return 'item_default';
    }

    // Get all predefined labels for items
    getAllItemLabels() {
        const allLabels = [];
        allLabels.push(...this.predefinedLabels.item_category);
        allLabels.push(...this.predefinedLabels.item_default);
        return allLabels;
    }

    // Get category labels specifically
    getCategoryLabels() {
        return [...this.predefinedLabels.item_category];
    }
}

// Make LabelTypes globally available
if (typeof window !== 'undefined') {
    window.LabelTypes = LabelTypes;
    window.labelTypes = new LabelTypes();
}
if (typeof global !== 'undefined') {
    global.LabelTypes = LabelTypes;
    global.labelTypes = new LabelTypes();
}
