// Label Types Configuration
class LabelTypes {
    constructor() {
        this.types = {
            'default': {
                name: 'Default',
                color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                description: 'General recipe labels'
            },
            'recipe_type': {
                name: 'Recipe Type',
                color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                description: 'Type of recipe (combo, etc.)'
            }
        };
        
        // Predefined labels by type
        this.predefinedLabels = {
            'recipe_type': [
                'combo'  // Only combo recipes get a label, basic recipes don't need one
            ],
            'default': [
                'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free',
                'quick', 'easy', 'healthy', 'comfort-food', 'spicy',
                'italian', 'mexican', 'asian', 'american', 'mediterranean',
                'breakfast', 'lunch', 'dinner', 'snack', 'dessert',
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
