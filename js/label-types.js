// Label Types Configuration
class LabelTypes {
    constructor() {
        this.types = {
            'default': {
                name: 'Default',
                color: 'bg-green-100 text-green-800 dark:!bg-green-200 dark:!text-green-900',
                description: 'General recipe labels',
                icon: null // No icon for default labels
            },
            'recipe_type': {
                name: 'Recipe Type',
                color: 'bg-blue-100 text-blue-800 dark:!bg-blue-200 dark:!text-blue-900',
                description: 'Type of recipe (combo, etc.)',
                icon: '<svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'
            },
            'meal_type': {
                name: 'Meal Type',
                color: 'bg-orange-100 text-orange-800 dark:!bg-orange-900 dark:!text-orange-200',
                description: 'Type of meal (breakfast, lunch, dinner, snack)',
                icon: '<svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
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
