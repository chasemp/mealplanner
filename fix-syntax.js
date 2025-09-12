const fs = require('fs');

// Read the file
const content = fs.readFileSync('js/recipe-manager.js', 'utf8');
const lines = content.split('\n');

// Find the problematic section and remove it
// Keep everything up to line 2502 (${contentSection})
// Remove lines 2503-2625 (the old template literal code)
// Keep everything from line 2626 onwards

const fixedLines = [
    ...lines.slice(0, 2502), // Lines 0-2502 (including ${contentSection})
    ...lines.slice(2625)     // Lines 2626 onwards (skip the problematic section)
];

// Write the fixed file
fs.writeFileSync('js/recipe-manager.js', fixedLines.join('\n'));

console.log('✅ Fixed syntax errors by removing duplicate template literal code');
console.log(`Removed lines 2503-2625 (${2625 - 2503 + 1} lines)`);
