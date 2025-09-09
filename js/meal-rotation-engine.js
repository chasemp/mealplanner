// Intelligent Meal Rotation Engine
class MealRotationEngine {
    constructor() {
        this.recipes = [];
        this.preferences = new Map(); // Recipe ID -> preference weight (1-10)
        this.constraints = {
            minDaysBetweenSameRecipe: 3,
            maxConsecutiveSimilarCuisines: 2,
            preferredIngredientOverlap: 0.3, // 30% ingredient overlap is optimal
            pantryPriority: 0.7, // Weight for using pantry ingredients
            seasonalBonus: 0.2, // Bonus for seasonal ingredients
            nutritionalBalance: 0.5 // Weight for nutritional variety
        };
        this.pantryItems = new Map(); // Ingredient ID -> quantity available
        this.scheduledMeals = []; // Previously scheduled meals for context
        this.nutritionalTargets = {
            protein: { min: 0.2, max: 0.4 }, // 20-40% of meals should be protein-heavy
            vegetables: { min: 0.3, max: 0.6 }, // 30-60% should be vegetable-heavy
            carbs: { min: 0.2, max: 0.5 }, // 20-50% should be carb-heavy
            healthy: { min: 0.4, max: 1.0 } // 40-100% should be healthy options
        };
    }

    // Initialize with recipes and user preferences
    initialize(recipes, userPreferences = {}, pantryItems = []) {
        console.log('🧠 Initializing Meal Rotation Engine...');
        
        this.recipes = recipes.map(recipe => ({
            ...recipe,
            lastScheduled: null,
            timesScheduled: 0,
            cuisineType: this.detectCuisineType(recipe),
            nutritionalProfile: this.analyzeNutritionalProfile(recipe),
            seasonalScore: this.calculateSeasonalScore(recipe),
            complexity: this.calculateComplexity(recipe)
        }));

        // Set user preferences (default to 5 if not specified)
        this.preferences.clear();
        this.recipes.forEach(recipe => {
            const userPref = userPreferences[recipe.id];
            if (userPref !== undefined) {
                this.preferences.set(recipe.id, Math.max(1, Math.min(10, userPref)));
            } else {
                this.preferences.set(recipe.id, 5);
            }
        });

        // Initialize pantry
        this.pantryItems.clear();
        pantryItems.forEach(item => {
            this.pantryItems.set(item.ingredientId, item.quantity);
        });

        console.log(`✅ Initialized with ${this.recipes.length} recipes, ${this.preferences.size} preferences, ${this.pantryItems.size} pantry items`);
    }

    // Generate intelligent meal rotation for specified period
    generateRotation(startDate, weeks = 4, mealType = 'dinner', options = {}) {
        console.log(`🎯 Generating ${weeks}-week ${mealType} rotation starting ${startDate.toDateString()}`);
        
        const rotation = [];
        const totalDays = weeks * 7;
        const currentDate = new Date(startDate);

        // Apply options
        const constraints = { ...this.constraints, ...options.constraints };
        const forceInclude = options.forceInclude || []; // Recipe IDs that must be included
        const exclude = options.exclude || []; // Recipe IDs to exclude
        
        // Filter available recipes
        const availableRecipes = this.recipes.filter(recipe => 
            !exclude.includes(recipe.id)
        );

        // Ensure forced recipes are included
        const forcedRecipes = forceInclude.map(id => 
            availableRecipes.find(recipe => recipe.id === id)
        ).filter(Boolean);

        for (let day = 0; day < totalDays; day++) {
            const dayDate = new Date(currentDate);
            dayDate.setDate(dayDate.getDate() + day);

            // Skip weekends if specified
            if (options.skipWeekends && (dayDate.getDay() === 0 || dayDate.getDay() === 6)) {
                continue;
            }

            // Get context for this day
            const context = this.buildDayContext(rotation, day, dayDate);
            
            // Select best recipe for this day
            const selectedRecipe = this.selectOptimalRecipe(
                availableRecipes, 
                context, 
                constraints,
                forcedRecipes
            );

            if (selectedRecipe) {
                const mealEntry = {
                    id: `meal-${mealType}-${day}`,
                    date: new Date(dayDate),
                    mealType,
                    recipe: selectedRecipe,
                    score: context.lastScore || 0,
                    reasoning: context.lastReasoning || []
                };

                rotation.push(mealEntry);
                
                // Update recipe tracking
                selectedRecipe.lastScheduled = new Date(dayDate);
                selectedRecipe.timesScheduled++;
                
                // Remove from forced list if used
                const forcedIndex = forcedRecipes.findIndex(r => r.id === selectedRecipe.id);
                if (forcedIndex !== -1) {
                    forcedRecipes.splice(forcedIndex, 1);
                }
            }
        }

        console.log(`✅ Generated rotation with ${rotation.length} meals`);
        return {
            meals: rotation,
            stats: this.generateRotationStats(rotation),
            recommendations: this.generateRecommendations(rotation, availableRecipes)
        };
    }

    // Build context for decision making
    buildDayContext(existingRotation, dayIndex, date) {
        const recentMeals = existingRotation.slice(Math.max(0, dayIndex - 7), dayIndex);
        const lastWeekMeals = existingRotation.slice(Math.max(0, dayIndex - 7), dayIndex);
        
        return {
            dayOfWeek: date.getDay(),
            dayIndex,
            recentMeals,
            lastWeekMeals,
            recentCuisines: recentMeals.map(m => m.recipe.cuisineType),
            recentIngredients: this.extractIngredients(recentMeals),
            nutritionalBalance: this.calculateNutritionalBalance(recentMeals),
            season: this.getCurrentSeason(date)
        };
    }

    // Select optimal recipe using scoring algorithm
    selectOptimalRecipe(availableRecipes, context, constraints, forcedRecipes) {
        // Filter out invalid recipes first (respects constraints)
        const validRecipes = availableRecipes.filter(recipe => 
            this.isRecipeValid(recipe, context, constraints)
        );

        if (validRecipes.length === 0) {
            console.warn('No valid recipes available for selection');
            return null;
        }

        // If we have forced recipes, prioritize them
        if (forcedRecipes.length > 0 && Math.random() < 0.7) {
            const validForcedRecipes = forcedRecipes.filter(recipe => 
                this.isRecipeValid(recipe, context, constraints)
            );
            if (validForcedRecipes.length > 0) {
                const forced = validForcedRecipes[Math.floor(Math.random() * validForcedRecipes.length)];
                context.lastReasoning = ['Forced inclusion by user preference'];
                return forced;
            }
        }

        const scores = validRecipes.map(recipe => ({
            recipe,
            score: this.calculateRecipeScore(recipe, context, constraints),
            reasoning: []
        }));

        // Sort by score (highest first)
        scores.sort((a, b) => b.score - a.score);

        // Add some randomness to prevent too much predictability
        const topCandidates = scores.slice(0, Math.min(5, scores.length));
        const weights = topCandidates.map((_, index) => Math.pow(0.8, index));
        const selectedIndex = this.weightedRandomSelect(weights);
        
        const selected = topCandidates[selectedIndex];
        if (selected) {
            context.lastScore = selected.score;
            context.lastReasoning = selected.reasoning;
            return selected.recipe;
        }

        return null;
    }

    // Calculate comprehensive score for a recipe
    calculateRecipeScore(recipe, context, constraints) {
        let score = 0;
        const reasoning = [];

        // Base preference score (0-10)
        const preferenceScore = this.preferences.get(recipe.id) || 5;
        score += preferenceScore * 10; // Weight: 100 points max
        reasoning.push(`Preference: ${preferenceScore}/10 (+${preferenceScore * 10})`);

        // Recency penalty (avoid recently used recipes)
        const recencyPenalty = this.calculateRecencyPenalty(recipe, context, constraints);
        score -= recencyPenalty;
        if (recencyPenalty > 0) {
            reasoning.push(`Recency penalty: -${recencyPenalty.toFixed(1)}`);
        }

        // Cuisine variety bonus
        const cuisineBonus = this.calculateCuisineVarietyBonus(recipe, context, constraints);
        score += cuisineBonus;
        if (cuisineBonus > 0) {
            reasoning.push(`Cuisine variety: +${cuisineBonus.toFixed(1)}`);
        }

        // Ingredient optimization
        const ingredientScore = this.calculateIngredientScore(recipe, context);
        score += ingredientScore;
        if (ingredientScore !== 0) {
            reasoning.push(`Ingredient optimization: ${ingredientScore > 0 ? '+' : ''}${ingredientScore.toFixed(1)}`);
        }

        // Pantry utilization bonus
        const pantryBonus = this.calculatePantryBonus(recipe);
        score += pantryBonus;
        if (pantryBonus > 0) {
            reasoning.push(`Pantry utilization: +${pantryBonus.toFixed(1)}`);
        }

        // Seasonal bonus
        const seasonalBonus = recipe.seasonalScore * this.constraints.seasonalBonus * 20;
        score += seasonalBonus;
        if (seasonalBonus > 0) {
            reasoning.push(`Seasonal bonus: +${seasonalBonus.toFixed(1)}`);
        }

        // Nutritional balance
        const nutritionalScore = this.calculateNutritionalScore(recipe, context);
        score += nutritionalScore;
        if (nutritionalScore !== 0) {
            reasoning.push(`Nutritional balance: ${nutritionalScore > 0 ? '+' : ''}${nutritionalScore.toFixed(1)}`);
        }

        // Day of week preferences (e.g., complex meals on weekends)
        const dayBonus = this.calculateDayOfWeekBonus(recipe, context);
        score += dayBonus;
        if (dayBonus !== 0) {
            reasoning.push(`Day preference: ${dayBonus > 0 ? '+' : ''}${dayBonus.toFixed(1)}`);
        }

        return Math.max(0, score);
    }

    calculateRecencyPenalty(recipe, context, constraints) {
        const recentUse = context.recentMeals.find(meal => meal.recipe.id === recipe.id);
        if (!recentUse) return 0;

        const daysSince = context.dayIndex - context.recentMeals.indexOf(recentUse);
        if (daysSince < constraints.minDaysBetweenSameRecipe) {
            return (constraints.minDaysBetweenSameRecipe - daysSince) * 30; // Heavy penalty
        }

        return 0;
    }

    calculateCuisineVarietyBonus(recipe, context, constraints) {
        const recentCuisines = context.recentCuisines.slice(-constraints.maxConsecutiveSimilarCuisines);
        const sameCount = recentCuisines.filter(cuisine => cuisine === recipe.cuisineType).length;
        
        if (sameCount >= constraints.maxConsecutiveSimilarCuisines) {
            return -20; // Penalty for too much of same cuisine
        }
        
        if (sameCount === 0) {
            return 15; // Bonus for variety
        }
        
        return 0;
    }

    calculateIngredientScore(recipe, context) {
        if (!recipe.ingredients || context.recentIngredients.length === 0) return 0;

        const recipeIngredients = new Set(recipe.ingredients.map(ing => ing.ingredientId));
        const recentIngredients = new Set(context.recentIngredients);
        
        const overlap = [...recipeIngredients].filter(ing => recentIngredients.has(ing)).length;
        const overlapRatio = overlap / recipeIngredients.size;
        
        const optimalOverlap = this.constraints.preferredIngredientOverlap;
        
        if (overlapRatio > optimalOverlap * 1.5) {
            return -10; // Too much overlap
        } else if (overlapRatio >= optimalOverlap * 0.5 && overlapRatio <= optimalOverlap * 1.2) {
            return 10; // Good overlap
        }
        
        return 0;
    }

    calculatePantryBonus(recipe) {
        if (!recipe.ingredients) return 0;

        let pantryIngredients = 0;
        let totalIngredients = recipe.ingredients.length;

        recipe.ingredients.forEach(ingredient => {
            const available = this.pantryItems.get(ingredient.ingredientId) || 0;
            if (available >= (ingredient.quantity || 1)) {
                pantryIngredients++;
            }
        });

        const pantryRatio = pantryIngredients / totalIngredients;
        return pantryRatio * this.constraints.pantryPriority * 25;
    }

    calculateNutritionalScore(recipe, context) {
        const profile = recipe.nutritionalProfile;
        const balance = context.nutritionalBalance;
        
        let score = 0;
        
        // Encourage nutritional variety
        Object.keys(this.nutritionalTargets).forEach(nutrient => {
            const target = this.nutritionalTargets[nutrient];
            const current = balance[nutrient] || 0;
            const recipeValue = profile[nutrient] || 0;
            
            if (current < target.min && recipeValue > 0.5) {
                score += 15; // Bonus for filling nutritional gap
            } else if (current > target.max && recipeValue > 0.5) {
                score -= 10; // Penalty for nutritional excess
            }
        });
        
        return score;
    }

    calculateDayOfWeekBonus(recipe, context) {
        const dayOfWeek = context.dayOfWeek;
        const complexity = recipe.complexity;
        
        // Weekend bonus for complex recipes
        if ((dayOfWeek === 0 || dayOfWeek === 6) && complexity > 0.7) {
            return 10;
        }
        
        // Weekday bonus for simple recipes
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && complexity < 0.4) {
            return 5;
        }
        
        return 0;
    }

    // Utility methods
    detectCuisineType(recipe) {
        const name = recipe.name.toLowerCase();
        const ingredients = recipe.ingredients?.map(ing => ing.name.toLowerCase()).join(' ') || '';
        const text = `${name} ${ingredients}`;
        
        const cuisineKeywords = {
            italian: ['pasta', 'pizza', 'risotto', 'parmesan', 'basil', 'oregano'],
            asian: ['soy', 'ginger', 'sesame', 'rice', 'noodles', 'stir'],
            mexican: ['salsa', 'cilantro', 'lime', 'cumin', 'chili', 'avocado'],
            american: ['burger', 'bbq', 'bacon', 'cheese', 'fries'],
            mediterranean: ['olive', 'feta', 'lemon', 'herbs', 'tomato'],
            indian: ['curry', 'turmeric', 'cumin', 'coriander', 'garam']
        };
        
        for (const [cuisine, keywords] of Object.entries(cuisineKeywords)) {
            if (keywords.some(keyword => text.includes(keyword))) {
                return cuisine;
            }
        }
        
        return 'general';
    }

    analyzeNutritionalProfile(recipe) {
        const ingredients = recipe.ingredients || [];
        const profile = { protein: 0, vegetables: 0, carbs: 0, healthy: 0 };
        
        ingredients.forEach(ingredient => {
            const name = ingredient.name.toLowerCase();
            
            if (name.includes('chicken') || name.includes('beef') || name.includes('fish') || 
                name.includes('egg') || name.includes('bean') || name.includes('tofu')) {
                profile.protein += 0.3;
            }
            
            if (name.includes('vegetable') || name.includes('spinach') || name.includes('broccoli') ||
                name.includes('carrot') || name.includes('pepper') || name.includes('onion')) {
                profile.vegetables += 0.3;
            }
            
            if (name.includes('rice') || name.includes('pasta') || name.includes('bread') ||
                name.includes('potato') || name.includes('quinoa')) {
                profile.carbs += 0.3;
            }
            
            if (name.includes('olive oil') || name.includes('avocado') || name.includes('nuts') ||
                name.includes('whole grain') || name.includes('organic')) {
                profile.healthy += 0.2;
            }
        });
        
        // Normalize values
        Object.keys(profile).forEach(key => {
            profile[key] = Math.min(1, profile[key]);
        });
        
        return profile;
    }

    calculateSeasonalScore(recipe) {
        // This would be enhanced with actual seasonal ingredient data
        const currentMonth = new Date().getMonth();
        const ingredients = recipe.ingredients || [];
        
        let seasonalScore = 0.5; // Base score
        
        // Simple seasonal logic (would be more sophisticated in production)
        ingredients.forEach(ingredient => {
            const name = ingredient.name.toLowerCase();
            
            // Spring (Mar-May)
            if (currentMonth >= 2 && currentMonth <= 4) {
                if (name.includes('asparagus') || name.includes('peas') || name.includes('spring')) {
                    seasonalScore += 0.1;
                }
            }
            
            // Summer (Jun-Aug)
            if (currentMonth >= 5 && currentMonth <= 7) {
                if (name.includes('tomato') || name.includes('zucchini') || name.includes('corn')) {
                    seasonalScore += 0.1;
                }
            }
            
            // Fall (Sep-Nov)
            if (currentMonth >= 8 && currentMonth <= 10) {
                if (name.includes('pumpkin') || name.includes('squash') || name.includes('apple')) {
                    seasonalScore += 0.1;
                }
            }
            
            // Winter (Dec-Feb)
            if (currentMonth >= 11 || currentMonth <= 1) {
                if (name.includes('root') || name.includes('stew') || name.includes('soup')) {
                    seasonalScore += 0.1;
                }
            }
        });
        
        return Math.min(1, seasonalScore);
    }

    calculateComplexity(recipe) {
        let complexity = 0;
        
        // Base on number of ingredients
        const ingredientCount = recipe.ingredients?.length || 0;
        complexity += Math.min(0.4, ingredientCount / 20);
        
        // Base on prep time
        if (recipe.prepTime) {
            complexity += Math.min(0.3, recipe.prepTime / 120); // 2 hours = max complexity
        }
        
        // Base on cooking method complexity
        const instructions = recipe.instructions?.toLowerCase() || '';
        const complexMethods = ['braise', 'confit', 'reduction', 'emulsion', 'ferment'];
        complexMethods.forEach(method => {
            if (instructions.includes(method)) {
                complexity += 0.1;
            }
        });
        
        return Math.min(1, complexity);
    }

    extractIngredients(meals) {
        const ingredients = [];
        meals.forEach(meal => {
            if (meal.recipe.ingredients) {
                meal.recipe.ingredients.forEach(ing => {
                    ingredients.push(ing.ingredientId);
                });
            }
        });
        return ingredients;
    }

    calculateNutritionalBalance(meals) {
        if (meals.length === 0) return {};
        
        const totals = { protein: 0, vegetables: 0, carbs: 0, healthy: 0 };
        
        meals.forEach(meal => {
            const profile = meal.recipe.nutritionalProfile || {};
            Object.keys(totals).forEach(key => {
                totals[key] += profile[key] || 0;
            });
        });
        
        // Convert to ratios
        Object.keys(totals).forEach(key => {
            totals[key] = Math.round((totals[key] / meals.length) * 100) / 100; // Round to 2 decimal places
        });
        
        return totals;
    }

    getCurrentSeason(date) {
        const month = date.getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'fall';
        return 'winter';
    }

    isRecipeValid(recipe, context, constraints) {
        // Check recency constraint
        const recentUse = context.recentMeals.find(meal => meal.recipe.id === recipe.id);
        if (recentUse) {
            const daysSince = context.dayIndex - context.recentMeals.indexOf(recentUse);
            if (daysSince < constraints.minDaysBetweenSameRecipe) {
                return false;
            }
        }
        
        return true;
    }

    weightedRandomSelect(weights) {
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return i;
            }
        }
        
        return weights.length - 1;
    }

    generateRotationStats(rotation) {
        const stats = {
            totalMeals: rotation.length,
            uniqueRecipes: new Set(rotation.map(meal => meal.recipe.id)).size,
            averageScore: rotation.reduce((sum, meal) => sum + meal.score, 0) / rotation.length,
            cuisineDistribution: {},
            nutritionalBalance: {},
            complexityDistribution: { simple: 0, medium: 0, complex: 0 }
        };
        
        // Cuisine distribution
        rotation.forEach(meal => {
            const cuisine = meal.recipe.cuisineType;
            stats.cuisineDistribution[cuisine] = (stats.cuisineDistribution[cuisine] || 0) + 1;
        });
        
        // Nutritional balance
        stats.nutritionalBalance = this.calculateNutritionalBalance(rotation);
        
        // Complexity distribution
        rotation.forEach(meal => {
            const complexity = meal.recipe.complexity;
            if (complexity < 0.33) stats.complexityDistribution.simple++;
            else if (complexity < 0.66) stats.complexityDistribution.medium++;
            else stats.complexityDistribution.complex++;
        });
        
        return stats;
    }

    generateRecommendations(rotation, availableRecipes) {
        const recommendations = [];
        const stats = this.generateRotationStats(rotation);
        
        // Check for variety issues
        if (stats.uniqueRecipes / stats.totalMeals < 0.7) {
            recommendations.push({
                type: 'variety',
                message: 'Consider adding more recipe variety to reduce repetition',
                severity: 'medium'
            });
        }
        
        // Check nutritional balance
        Object.keys(this.nutritionalTargets).forEach(nutrient => {
            const target = this.nutritionalTargets[nutrient];
            const current = stats.nutritionalBalance[nutrient] || 0;
            
            if (current < target.min) {
                recommendations.push({
                    type: 'nutrition',
                    message: `Consider adding more ${nutrient}-rich meals`,
                    severity: 'low'
                });
            }
        });
        
        // Check for unused high-preference recipes
        const unusedFavorites = availableRecipes.filter(recipe => {
            const preference = this.preferences.get(recipe.id) || 5;
            const used = rotation.some(meal => meal.recipe.id === recipe.id);
            return preference >= 8 && !used;
        });
        
        if (unusedFavorites.length > 0) {
            recommendations.push({
                type: 'preferences',
                message: `${unusedFavorites.length} high-preference recipes weren't included`,
                severity: 'low',
                recipes: unusedFavorites.map(r => r.name)
            });
        }
        
        return recommendations;
    }

    // Public API methods
    updatePreferences(recipePreferences) {
        Object.entries(recipePreferences).forEach(([recipeId, preference]) => {
            this.preferences.set(recipeId, Math.max(1, Math.min(10, preference)));
        });
    }

    updateConstraints(newConstraints) {
        this.constraints = { ...this.constraints, ...newConstraints };
    }

    updatePantry(pantryItems) {
        this.pantryItems.clear();
        pantryItems.forEach(item => {
            this.pantryItems.set(item.ingredientId, item.quantity);
        });
    }

    getRecipeAnalysis(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return null;
        
        return {
            cuisineType: recipe.cuisineType,
            nutritionalProfile: recipe.nutritionalProfile,
            seasonalScore: recipe.seasonalScore,
            complexity: recipe.complexity,
            preference: this.preferences.get(recipeId) || 5,
            timesScheduled: recipe.timesScheduled,
            lastScheduled: recipe.lastScheduled
        };
    }

    clearAllData() {
        console.log('🗑️ Clearing all meal rotation engine data...');
        this.preferences = new Map();
        this.scheduledMeals = [];
        this.rotationHistory = [];
        
        // Clear from localStorage
        localStorage.removeItem('mealplanner_rotation_preferences');
        localStorage.removeItem('mealplanner_rotation_history');
        
        console.log('✅ All meal rotation engine data cleared');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MealRotationEngine;
}

// Make class globally available but don't create instance
// The main app will create and manage the instance
if (typeof window !== 'undefined') {
    window.MealRotationEngine = MealRotationEngine;
}
