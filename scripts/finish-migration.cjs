#!/usr/bin/env node

/**
 * Script to finish the ingredients → items migration
 * Updates remaining test files and references
 */

const fs = require('fs');
const path = require('path');

class MigrationFinisher {
    constructor() {
        this.replacements = [
            // Database table references
            { from: /\bingredients\b/g, to: 'items', context: 'table' },
            { from: /recipe_ingredients/g, to: 'recipe_items' },
            { from: /ingredient_id/g, to: 'item_id' },
            
            // Test descriptions and comments
            { from: /ingredients functionality/gi, to: 'items functionality' },
            { from: /ingredients database/gi, to: 'items database' },
            { from: /ingredients integration/gi, to: 'items integration' },
            { from: /ingredients management/gi, to: 'items management' },
            
            // Variable and method names (be careful with context)
            { from: /getIngredients\(/g, to: 'getItems(' },
            { from: /loadIngredients\(/g, to: 'loadItems(' },
            { from: /ingredients\s*:/g, to: 'items:' },
            
            // Comments and documentation
            { from: /ingredient cards/gi, to: 'item cards' },
            { from: /ingredient list/gi, to: 'item list' },
        ];
    }

    async finishMigration() {
        console.log('🔧 Finishing ingredients → items migration...');
        
        try {
            // Update test files
            await this.updateTestFiles();
            
            // Update any remaining references
            await this.updateRemainingReferences();
            
            console.log('✅ Migration finishing completed!');
            
        } catch (error) {
            console.error('❌ Migration finishing failed:', error.message);
            process.exit(1);
        }
    }

    async updateTestFiles() {
        const testFiles = [
            'src/test/integration/database-items.test.js',
            'src/test/e2e/items-functionality.spec.js',
            'src/test/unit/demo-data-validation.test.js',
            'src/test/regression/export-import-lifecycle.test.js'
        ];

        for (const file of testFiles) {
            if (fs.existsSync(file)) {
                console.log(`📝 Updating ${file}...`);
                await this.updateFile(file);
            }
        }
    }

    async updateRemainingReferences() {
        // Update any remaining files that might have missed references
        const filesToCheck = [
            'src/test/unit/database.test.js',
            'src/test/unit/ingredient-labels.test.js'
        ];

        for (const file of filesToCheck) {
            if (fs.existsSync(file)) {
                console.log(`🔍 Checking ${file}...`);
                await this.updateFile(file);
            }
        }
    }

    async updateFile(filePath) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let changed = false;

            // Apply safe replacements
            for (const replacement of this.replacements) {
                const originalContent = content;
                content = content.replace(replacement.from, replacement.to);
                if (content !== originalContent) {
                    changed = true;
                }
            }

            if (changed) {
                fs.writeFileSync(filePath, content);
                console.log(`  ✅ Updated ${filePath}`);
            } else {
                console.log(`  ⏭️  No changes needed in ${filePath}`);
            }

        } catch (error) {
            console.error(`  ❌ Error updating ${filePath}:`, error.message);
        }
    }
}

// Execute if run directly
if (require.main === module) {
    const finisher = new MigrationFinisher();
    finisher.finishMigration().catch(console.error);
}

module.exports = { MigrationFinisher };
