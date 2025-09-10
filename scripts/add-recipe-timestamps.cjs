#!/usr/bin/env node
/**
 * Script to add created_at timestamps to all recipes in demo-data.js
 * Creates realistic timestamps spread over several months
 */

const fs = require('fs');
const path = require('path');

// Read the demo-data.js file
const demoDataPath = path.join(__dirname, '..', 'js', 'demo-data.js');
let content = fs.readFileSync(demoDataPath, 'utf8');

// Generate realistic timestamps spread over 4 months (June - September 2025)
const generateTimestamps = (count) => {
    const timestamps = [];
    const startDate = new Date('2025-06-01T08:00:00Z');
    const endDate = new Date('2025-09-10T20:00:00Z');
    const timeRange = endDate.getTime() - startDate.getTime();
    
    for (let i = 0; i < count; i++) {
        // Spread timestamps somewhat evenly but with some randomness
        const baseOffset = (i / count) * timeRange;
        const randomOffset = (Math.random() - 0.5) * (timeRange / count) * 0.5; // ±25% variation
        const timestamp = new Date(startDate.getTime() + baseOffset + randomOffset);
        
        // Round to nearest 15 minutes for realism
        const minutes = timestamp.getMinutes();
        const roundedMinutes = Math.round(minutes / 15) * 15;
        timestamp.setMinutes(roundedMinutes, 0, 0);
        
        timestamps.push(timestamp.toISOString());
    }
    
    // Sort chronologically
    return timestamps.sort();
};

// Count existing recipes to generate appropriate number of timestamps
const recipeMatches = content.match(/title: '[^']+'/g);
const recipeCount = recipeMatches ? recipeMatches.length : 0;
console.log(`Found ${recipeCount} recipes in demo data`);

// Generate timestamps
const timestamps = generateTimestamps(recipeCount);
console.log(`Generated ${timestamps.length} timestamps from ${timestamps[0]} to ${timestamps[timestamps.length - 1]}`);

// Add created_at to each recipe that doesn't already have one
let timestampIndex = 0;
let updatedCount = 0;

// Pattern to match recipe blocks and add created_at before instructions
const recipePattern = /(cook_time: \d+,)(\s+)(instructions: \[)/g;

content = content.replace(recipePattern, (match, cookTime, whitespace, instructions) => {
    // Check if created_at already exists in this recipe block
    const beforeMatch = content.substring(0, content.indexOf(match));
    const lastRecipeStart = beforeMatch.lastIndexOf('title: \'');
    const recipeBlock = content.substring(lastRecipeStart, content.indexOf(match) + match.length + 100);
    
    if (recipeBlock.includes('created_at:')) {
        // Already has created_at, don't modify
        return match;
    }
    
    // Add created_at timestamp
    const timestamp = timestamps[timestampIndex % timestamps.length];
    timestampIndex++;
    updatedCount++;
    
    return `${cookTime}${whitespace}created_at: '${timestamp}',${whitespace}${instructions}`;
});

// Write the updated content back
fs.writeFileSync(demoDataPath, content, 'utf8');

console.log(`✅ Added created_at timestamps to ${updatedCount} recipes`);
console.log(`📅 Timestamps range from ${timestamps[0]} to ${timestamps[timestamps.length - 1]}`);
console.log(`📝 Updated ${demoDataPath}`);
