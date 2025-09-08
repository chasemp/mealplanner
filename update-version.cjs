#!/usr/bin/env node

/**
 * Simple cache-busting version updater for MealPlanner
 * Updates version numbers in index.html, js/main.js, and css/styles.css
 */

const fs = require('fs');
const path = require('path');

// Generate new version (timestamp-based)
const now = new Date();
const version = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}.${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

console.log(`🔄 Updating to version: ${version}`);

// Files to update
const files = [
    {
        path: 'index.html',
        patterns: [
            { regex: /styles\.css\?v=[\d.]+/g, replacement: `styles.css?v=${version}` },
            // Update ALL JavaScript file versions in script tags
            { regex: /\.js\?v=[\d.]+/g, replacement: `.js?v=${version}` },
            { regex: /<span id="version-display">v[\d.]+<\/span>/g, replacement: `<span id="version-display">v${version}</span>` }
        ]
    },
    {
        path: 'js/main.js',
        patterns: [
            { regex: /this\.version = '[\d.]+'/g, replacement: `this.version = '${version}'` }
        ]
    },
    {
        path: 'css/styles.css',
        patterns: [
            { regex: /\/\* MealPlanner Custom Styles v[\d.]+ \*\//g, replacement: `/* MealPlanner Custom Styles v${version} */` }
        ]
    }
];

// Update files
files.forEach(file => {
    try {
        let content = fs.readFileSync(file.path, 'utf8');
        let updated = false;
        
        file.patterns.forEach(pattern => {
            if (pattern.regex.test(content)) {
                content = content.replace(pattern.regex, pattern.replacement);
                updated = true;
            }
        });
        
        if (updated) {
            fs.writeFileSync(file.path, content);
            console.log(`✅ Updated ${file.path}`);
        } else {
            console.log(`⚠️  No patterns found in ${file.path}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${file.path}:`, error.message);
    }
});

// Validation: Check that all JS files in index.html have consistent versions
try {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    const jsVersions = [...indexContent.matchAll(/\.js\?v=([\d.]+)/g)].map(match => match[1]);
    const uniqueVersions = [...new Set(jsVersions)];
    
    if (uniqueVersions.length === 1 && uniqueVersions[0] === version) {
        console.log(`✅ All ${jsVersions.length} JavaScript files have consistent version: ${version}`);
    } else {
        console.warn(`⚠️  Version inconsistency detected:`);
        console.warn(`   Expected: ${version}`);
        console.warn(`   Found: ${uniqueVersions.join(', ')}`);
        console.warn(`   Total JS files: ${jsVersions.length}`);
    }
} catch (error) {
    console.error(`❌ Version validation failed:`, error.message);
}

console.log(`🎉 Version update complete: ${version}`);
