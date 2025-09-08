// Advanced Meal Planning Features
class AdvancedPlanningManager {
    constructor() {
        this.planTemplates = [];
        this.planHistory = [];
        this.nutritionalTargets = {};
        this.budgetTargets = {};
        this.seasonalPreferences = {};
        this.mealPlanAnalytics = new MealPlanAnalytics();
        this.init();
    }

    init() {
        this.loadPlanTemplates();
        this.loadPlanHistory();
        this.loadNutritionalTargets();
        this.loadBudgetTargets();
        this.loadSeasonalPreferences();
        
        console.log('🎯 Advanced Planning Manager initialized');
    }

    // Plan Templates Management
    loadPlanTemplates() {
        const stored = localStorage.getItem('mealplanner_plan_templates');
        if (stored) {
            try {
                this.planTemplates = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading plan templates:', error);
                this.planTemplates = this.getDefaultTemplates();
            }
        } else {
            this.planTemplates = this.getDefaultTemplates();
        }
    }

    getDefaultTemplates() {
        return [
            {
                id: 1,
                name: 'Quick & Easy Week',
                description: 'Simple meals that take 30 minutes or less',
                criteria: {
                    maxPrepTime: 30,
                    maxCookTime: 30,
                    difficulty: 'easy',
                    tags: ['quick', 'simple', 'weeknight']
                },
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Healthy & Balanced',
                description: 'Nutritionally balanced meals with plenty of vegetables',
                criteria: {
                    minVegetables: 2,
                    maxCalories: 600,
                    tags: ['healthy', 'balanced', 'nutritious'],
                    avoidTags: ['fried', 'heavy']
                },
                created_at: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Budget Friendly',
                description: 'Affordable meals using common ingredients',
                criteria: {
                    maxCostPerServing: 5.00,
                    preferPantryItems: true,
                    tags: ['budget', 'economical', 'pantry-friendly']
                },
                created_at: new Date().toISOString()
            },
            {
                id: 4,
                name: 'Weekend Gourmet',
                description: 'Special meals for when you have more time',
                criteria: {
                    minPrepTime: 45,
                    difficulty: 'intermediate',
                    tags: ['gourmet', 'special', 'weekend'],
                    mealTypes: ['dinner']
                },
                created_at: new Date().toISOString()
            }
        ];
    }

    createPlanTemplate(templateData) {
        const newTemplate = {
            id: this.generateTemplateId(),
            ...templateData,
            created_at: new Date().toISOString()
        };

        this.planTemplates.push(newTemplate);
        this.savePlanTemplates();
        
        return newTemplate;
    }

    updatePlanTemplate(templateId, updates) {
        const index = this.planTemplates.findIndex(t => t.id === templateId);
        if (index !== -1) {
            this.planTemplates[index] = {
                ...this.planTemplates[index],
                ...updates,
                updated_at: new Date().toISOString()
            };
            this.savePlanTemplates();
            return this.planTemplates[index];
        }
        return null;
    }

    deletePlanTemplate(templateId) {
        this.planTemplates = this.planTemplates.filter(t => t.id !== templateId);
        this.savePlanTemplates();
    }

    generatePlanFromTemplate(templateId, startDate, weeks) {
        const template = this.planTemplates.find(t => t.id === templateId);
        if (!template) {
            throw new Error('Template not found');
        }

        // Get recipes that match template criteria
        const matchingRecipes = this.findRecipesMatchingCriteria(template.criteria);
        
        if (matchingRecipes.length === 0) {
            throw new Error('No recipes match the template criteria');
        }

        // Generate meal plan using template criteria
        return this.generateOptimizedPlan({
            startDate,
            weeks,
            recipes: matchingRecipes,
            criteria: template.criteria,
            templateName: template.name
        });
    }

    findRecipesMatchingCriteria(criteria) {
        // This would integrate with the recipe manager
        let recipes = window.DemoDataManager ? new window.DemoDataManager().getRecipes() : [];

        // Apply criteria filters
        if (criteria.maxPrepTime) {
            recipes = recipes.filter(r => (r.prep_time || 0) <= criteria.maxPrepTime);
        }

        if (criteria.maxCookTime) {
            recipes = recipes.filter(r => (r.cook_time || 0) <= criteria.maxCookTime);
        }

        if (criteria.difficulty) {
            recipes = recipes.filter(r => r.difficulty === criteria.difficulty);
        }

        if (criteria.tags && criteria.tags.length > 0) {
            recipes = recipes.filter(r => {
                const recipeTags = [...(r.tags || []), ...(r.labels || [])];
                return criteria.tags.some(tag => recipeTags.includes(tag));
            });
        }

        if (criteria.avoidTags && criteria.avoidTags.length > 0) {
            recipes = recipes.filter(r => {
                const recipeTags = [...(r.tags || []), ...(r.labels || [])];
                return !criteria.avoidTags.some(tag => recipeTags.includes(tag));
            });
        }

        if (criteria.mealTypes && criteria.mealTypes.length > 0) {
            recipes = recipes.filter(r => criteria.mealTypes.includes(r.meal_type));
        }

        return recipes;
    }

    // Plan History Management
    loadPlanHistory() {
        const stored = localStorage.getItem('mealplanner_plan_history');
        if (stored) {
            try {
                this.planHistory = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading plan history:', error);
                this.planHistory = [];
            }
        } else {
            this.planHistory = [];
        }
    }

    savePlanToHistory(planData) {
        const historyEntry = {
            id: this.generateHistoryId(),
            ...planData,
            created_at: new Date().toISOString()
        };

        this.planHistory.unshift(historyEntry);
        
        // Keep only last 50 plans
        if (this.planHistory.length > 50) {
            this.planHistory = this.planHistory.slice(0, 50);
        }

        this.savePlanHistory();
        return historyEntry;
    }

    getPlanHistory(limit = 10) {
        return this.planHistory.slice(0, limit);
    }

    recreatePlanFromHistory(historyId) {
        const historyEntry = this.planHistory.find(h => h.id === historyId);
        if (!historyEntry) {
            throw new Error('Plan not found in history');
        }

        // Recreate the plan with current date
        return this.generateOptimizedPlan({
            ...historyEntry.planData,
            startDate: new Date()
        });
    }

    // Nutritional Planning
    loadNutritionalTargets() {
        const stored = localStorage.getItem('mealplanner_nutritional_targets');
        if (stored) {
            try {
                this.nutritionalTargets = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading nutritional targets:', error);
                this.nutritionalTargets = this.getDefaultNutritionalTargets();
            }
        } else {
            this.nutritionalTargets = this.getDefaultNutritionalTargets();
        }
    }

    getDefaultNutritionalTargets() {
        return {
            dailyCalories: 2000,
            macros: {
                protein: { min: 15, max: 30 }, // percentage
                carbs: { min: 45, max: 65 },
                fat: { min: 20, max: 35 }
            },
            micronutrients: {
                fiber: 25, // grams
                sodium: 2300, // mg (max)
                sugar: 50 // grams (max)
            },
            servings: {
                vegetables: 5,
                fruits: 2,
                grains: 6,
                protein: 2,
                dairy: 3
            }
        };
    }

    updateNutritionalTargets(targets) {
        this.nutritionalTargets = { ...this.nutritionalTargets, ...targets };
        this.saveNutritionalTargets();
    }

    analyzeNutritionalBalance(mealPlan) {
        // Analyze the nutritional content of a meal plan
        const analysis = {
            totalCalories: 0,
            macros: { protein: 0, carbs: 0, fat: 0 },
            servings: { vegetables: 0, fruits: 0, grains: 0, protein: 0, dairy: 0 },
            deficiencies: [],
            excesses: [],
            score: 0
        };

        // This would integrate with nutritional data
        mealPlan.meals.forEach(meal => {
            const nutrition = this.estimateNutrition(meal);
            analysis.totalCalories += nutrition.calories;
            
            Object.keys(analysis.macros).forEach(macro => {
                analysis.macros[macro] += nutrition.macros[macro];
            });
            
            Object.keys(analysis.servings).forEach(category => {
                analysis.servings[category] += nutrition.servings[category];
            });
        });

        // Calculate nutritional score
        analysis.score = this.calculateNutritionalScore(analysis);
        
        // Identify deficiencies and excesses
        analysis.deficiencies = this.identifyDeficiencies(analysis);
        analysis.excesses = this.identifyExcesses(analysis);

        return analysis;
    }

    estimateNutrition(meal) {
        // Simplified nutritional estimation
        // In a real app, this would use a nutritional database
        return {
            calories: 400 + Math.random() * 200,
            macros: {
                protein: 20 + Math.random() * 15,
                carbs: 40 + Math.random() * 20,
                fat: 15 + Math.random() * 10
            },
            servings: {
                vegetables: Math.random() * 2,
                fruits: Math.random() * 1,
                grains: Math.random() * 2,
                protein: Math.random() * 1.5,
                dairy: Math.random() * 1
            }
        };
    }

    calculateNutritionalScore(analysis) {
        let score = 100;
        
        // Deduct points for being outside target ranges
        const caloriesDiff = Math.abs(analysis.totalCalories - this.nutritionalTargets.dailyCalories);
        score -= Math.min(20, caloriesDiff / 100);
        
        // Check macro balance
        Object.keys(analysis.macros).forEach(macro => {
            const target = this.nutritionalTargets.macros[macro];
            const percentage = (analysis.macros[macro] / analysis.totalCalories) * 100;
            
            if (percentage < target.min || percentage > target.max) {
                score -= 10;
            }
        });

        return Math.max(0, Math.round(score));
    }

    identifyDeficiencies(analysis) {
        const deficiencies = [];
        
        Object.keys(this.nutritionalTargets.servings).forEach(category => {
            const target = this.nutritionalTargets.servings[category];
            const actual = analysis.servings[category];
            
            if (actual < target * 0.8) { // 20% tolerance
                deficiencies.push({
                    category,
                    target,
                    actual: Math.round(actual * 10) / 10,
                    deficit: Math.round((target - actual) * 10) / 10
                });
            }
        });

        return deficiencies;
    }

    identifyExcesses(analysis) {
        const excesses = [];
        
        if (analysis.totalCalories > this.nutritionalTargets.dailyCalories * 1.1) {
            excesses.push({
                category: 'calories',
                target: this.nutritionalTargets.dailyCalories,
                actual: Math.round(analysis.totalCalories),
                excess: Math.round(analysis.totalCalories - this.nutritionalTargets.dailyCalories)
            });
        }

        return excesses;
    }

    // Budget Planning
    loadBudgetTargets() {
        const stored = localStorage.getItem('mealplanner_budget_targets');
        if (stored) {
            try {
                this.budgetTargets = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading budget targets:', error);
                this.budgetTargets = this.getDefaultBudgetTargets();
            }
        } else {
            this.budgetTargets = this.getDefaultBudgetTargets();
        }
    }

    getDefaultBudgetTargets() {
        return {
            weeklyBudget: 100,
            maxCostPerMeal: 15,
            maxCostPerServing: 5,
            preferBulkItems: true,
            avoidExpensiveIngredients: false
        };
    }

    updateBudgetTargets(targets) {
        this.budgetTargets = { ...this.budgetTargets, ...targets };
        this.saveBudgetTargets();
    }

    estimateMealPlanCost(mealPlan) {
        let totalCost = 0;
        const costBreakdown = [];

        mealPlan.meals.forEach(meal => {
            const mealCost = this.estimateMealCost(meal);
            totalCost += mealCost.total;
            costBreakdown.push({
                meal: meal.recipe_title,
                date: meal.scheduled_date,
                cost: mealCost.total,
                costPerServing: mealCost.perServing,
                ingredients: mealCost.ingredients
            });
        });

        return {
            totalCost: Math.round(totalCost * 100) / 100,
            averageCostPerMeal: Math.round((totalCost / mealPlan.meals.length) * 100) / 100,
            breakdown: costBreakdown,
            budgetStatus: this.analyzeBudgetStatus(totalCost)
        };
    }

    estimateMealCost(meal) {
        // Simplified cost estimation
        // In a real app, this would use ingredient pricing data
        const baseCost = 8 + Math.random() * 12; // $8-20 per meal
        const servings = meal.serving_count || 4;
        
        return {
            total: Math.round(baseCost * 100) / 100,
            perServing: Math.round((baseCost / servings) * 100) / 100,
            ingredients: [] // Would contain ingredient-level costs
        };
    }

    analyzeBudgetStatus(totalCost) {
        const weeklyBudget = this.budgetTargets.weeklyBudget;
        const percentage = (totalCost / weeklyBudget) * 100;
        
        if (percentage <= 80) {
            return { status: 'under-budget', percentage, message: 'Well within budget' };
        } else if (percentage <= 100) {
            return { status: 'on-budget', percentage, message: 'On track with budget' };
        } else if (percentage <= 120) {
            return { status: 'over-budget', percentage, message: 'Slightly over budget' };
        } else {
            return { status: 'significantly-over', percentage, message: 'Significantly over budget' };
        }
    }

    // Seasonal Planning
    loadSeasonalPreferences() {
        const stored = localStorage.getItem('mealplanner_seasonal_preferences');
        if (stored) {
            try {
                this.seasonalPreferences = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading seasonal preferences:', error);
                this.seasonalPreferences = this.getDefaultSeasonalPreferences();
            }
        } else {
            this.seasonalPreferences = this.getDefaultSeasonalPreferences();
        }
    }

    getDefaultSeasonalPreferences() {
        return {
            spring: {
                preferredIngredients: ['asparagus', 'peas', 'lettuce', 'radish', 'strawberries'],
                avoidedIngredients: ['heavy stews', 'root vegetables'],
                mealStyles: ['light', 'fresh', 'grilled']
            },
            summer: {
                preferredIngredients: ['tomatoes', 'cucumber', 'zucchini', 'corn', 'berries'],
                avoidedIngredients: ['heavy soups', 'braised dishes'],
                mealStyles: ['grilled', 'cold', 'salads', 'bbq']
            },
            fall: {
                preferredIngredients: ['pumpkin', 'apple', 'squash', 'sweet potato', 'cranberries'],
                avoidedIngredients: ['cold soups', 'ice cream'],
                mealStyles: ['roasted', 'braised', 'comfort-food']
            },
            winter: {
                preferredIngredients: ['root vegetables', 'citrus', 'hearty greens', 'warming spices'],
                avoidedIngredients: ['cold salads', 'gazpacho'],
                mealStyles: ['stews', 'soups', 'braised', 'warming']
            }
        };
    }

    getCurrentSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'fall';
        return 'winter';
    }

    applySeasonalPreferences(recipes) {
        const currentSeason = this.getCurrentSeason();
        const preferences = this.seasonalPreferences[currentSeason];
        
        if (!preferences) return recipes;

        return recipes.map(recipe => {
            let seasonalScore = 1.0;
            
            // Boost score for preferred ingredients
            preferences.preferredIngredients.forEach(ingredient => {
                if (this.recipeContainsIngredient(recipe, ingredient)) {
                    seasonalScore += 0.3;
                }
            });
            
            // Reduce score for avoided ingredients
            preferences.avoidedIngredients.forEach(ingredient => {
                if (this.recipeContainsIngredient(recipe, ingredient)) {
                    seasonalScore -= 0.2;
                }
            });
            
            // Boost score for preferred meal styles
            preferences.mealStyles.forEach(style => {
                if (this.recipeMatchesStyle(recipe, style)) {
                    seasonalScore += 0.2;
                }
            });

            return {
                ...recipe,
                seasonalScore: Math.max(0.1, seasonalScore)
            };
        });
    }

    recipeContainsIngredient(recipe, ingredient) {
        const recipeText = `${recipe.title} ${recipe.description} ${recipe.instructions}`.toLowerCase();
        return recipeText.includes(ingredient.toLowerCase());
    }

    recipeMatchesStyle(recipe, style) {
        const recipeLabels = recipe.labels || [];
        return recipeLabels.some(label => label.toLowerCase().includes(style.toLowerCase()));
    }

    // Advanced Plan Generation
    generateOptimizedPlan(options) {
        const {
            startDate,
            weeks,
            recipes,
            criteria = {},
            templateName = 'Custom Plan'
        } = options;

        // Apply seasonal preferences
        const seasonalRecipes = this.applySeasonalPreferences(recipes);
        
        // Generate base meal plan
        const mealPlan = this.generateBaseMealPlan(startDate, weeks, seasonalRecipes, criteria);
        
        // Optimize for nutrition if targets are set
        if (Object.keys(this.nutritionalTargets).length > 0) {
            this.optimizeForNutrition(mealPlan);
        }
        
        // Optimize for budget if targets are set
        if (Object.keys(this.budgetTargets).length > 0) {
            this.optimizeForBudget(mealPlan);
        }
        
        // Generate analytics
        const analytics = this.mealPlanAnalytics.analyzePlan(mealPlan);
        
        // Save to history
        const planData = {
            templateName,
            startDate,
            weeks,
            criteria,
            mealPlan,
            analytics
        };
        
        this.savePlanToHistory(planData);
        
        return {
            ...mealPlan,
            analytics,
            metadata: {
                templateName,
                generatedAt: new Date().toISOString(),
                criteria
            }
        };
    }

    generateBaseMealPlan(startDate, weeks, recipes, criteria) {
        // This would integrate with the existing meal rotation engine
        // For now, return a simplified structure
        const meals = [];
        const totalDays = weeks * 7;
        
        for (let day = 0; day < totalDays; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + day);
            
            // Select recipes based on criteria and seasonal preferences
            const availableRecipes = recipes.filter(recipe => 
                this.recipeMatchesCriteria(recipe, criteria)
            );
            
            if (availableRecipes.length > 0) {
                const selectedRecipe = this.selectOptimalRecipe(availableRecipes, day, meals);
                
                meals.push({
                    id: meals.length + 1,
                    recipe_id: selectedRecipe.id,
                    recipe_title: selectedRecipe.title,
                    scheduled_date: currentDate.toISOString().split('T')[0],
                    meal_type: 'dinner',
                    serving_count: selectedRecipe.serving_count || 4,
                    seasonalScore: selectedRecipe.seasonalScore || 1.0
                });
            }
        }
        
        return { meals };
    }

    recipeMatchesCriteria(recipe, criteria) {
        // Check if recipe matches the given criteria
        if (criteria.maxPrepTime && (recipe.prep_time || 0) > criteria.maxPrepTime) {
            return false;
        }
        
        if (criteria.maxCookTime && (recipe.cook_time || 0) > criteria.maxCookTime) {
            return false;
        }
        
        if (criteria.difficulty && recipe.difficulty !== criteria.difficulty) {
            return false;
        }
        
        return true;
    }

    selectOptimalRecipe(recipes, dayIndex, previousMeals) {
        // Select recipe with highest combined score
        const scoredRecipes = recipes.map(recipe => ({
            ...recipe,
            totalScore: this.calculateRecipeScore(recipe, dayIndex, previousMeals)
        }));
        
        scoredRecipes.sort((a, b) => b.totalScore - a.totalScore);
        
        // Add some randomness to avoid always picking the same top recipe
        const topRecipes = scoredRecipes.slice(0, Math.min(3, scoredRecipes.length));
        return topRecipes[Math.floor(Math.random() * topRecipes.length)];
    }

    calculateRecipeScore(recipe, dayIndex, previousMeals) {
        let score = recipe.seasonalScore || 1.0;
        
        // Avoid recent repetition
        const recentMeals = previousMeals.slice(-7); // Last week
        const timesUsedRecently = recentMeals.filter(meal => meal.recipe_id === recipe.id).length;
        score -= timesUsedRecently * 0.3;
        
        // Prefer variety in cuisine types
        const recentCuisines = recentMeals.slice(-3).map(meal => meal.cuisine_type);
        if (recentCuisines.includes(recipe.cuisine_type)) {
            score -= 0.2;
        }
        
        return Math.max(0.1, score);
    }

    optimizeForNutrition(mealPlan) {
        // Nutritional optimization logic
        const analysis = this.analyzeNutritionalBalance(mealPlan);
        
        // Make adjustments based on deficiencies
        analysis.deficiencies.forEach(deficiency => {
            this.adjustPlanForNutrition(mealPlan, deficiency);
        });
    }

    optimizeForBudget(mealPlan) {
        // Budget optimization logic
        const costAnalysis = this.estimateMealPlanCost(mealPlan);
        
        if (costAnalysis.budgetStatus.status.includes('over')) {
            this.adjustPlanForBudget(mealPlan, costAnalysis);
        }
    }

    adjustPlanForNutrition(mealPlan, deficiency) {
        // Find meals that could be replaced with more nutritious options
        // This is a simplified implementation
        console.log(`Adjusting plan for ${deficiency.category} deficiency`);
    }

    adjustPlanForBudget(mealPlan, costAnalysis) {
        // Replace expensive meals with budget-friendly alternatives
        console.log('Adjusting plan for budget constraints');
    }

    // Utility methods
    generateTemplateId() {
        return this.planTemplates.length > 0 ? Math.max(...this.planTemplates.map(t => t.id)) + 1 : 1;
    }

    generateHistoryId() {
        return this.planHistory.length > 0 ? Math.max(...this.planHistory.map(h => h.id)) + 1 : 1;
    }

    savePlanTemplates() {
        localStorage.setItem('mealplanner_plan_templates', JSON.stringify(this.planTemplates));
    }

    savePlanHistory() {
        localStorage.setItem('mealplanner_plan_history', JSON.stringify(this.planHistory));
    }

    saveNutritionalTargets() {
        localStorage.setItem('mealplanner_nutritional_targets', JSON.stringify(this.nutritionalTargets));
    }

    saveBudgetTargets() {
        localStorage.setItem('mealplanner_budget_targets', JSON.stringify(this.budgetTargets));
    }

    saveSeasonalPreferences() {
        localStorage.setItem('mealplanner_seasonal_preferences', JSON.stringify(this.seasonalPreferences));
    }
}

// Meal Plan Analytics
class MealPlanAnalytics {
    analyzePlan(mealPlan) {
        return {
            variety: this.analyzeVariety(mealPlan),
            nutrition: this.analyzeNutrition(mealPlan),
            cost: this.analyzeCost(mealPlan),
            seasonal: this.analyzeSeasonal(mealPlan),
            difficulty: this.analyzeDifficulty(mealPlan),
            overallScore: this.calculateOverallScore(mealPlan)
        };
    }

    analyzeVariety(mealPlan) {
        const uniqueRecipes = new Set(mealPlan.meals.map(meal => meal.recipe_id));
        const varietyScore = (uniqueRecipes.size / mealPlan.meals.length) * 100;
        
        return {
            score: Math.round(varietyScore),
            uniqueRecipes: uniqueRecipes.size,
            totalMeals: mealPlan.meals.length,
            recommendation: varietyScore < 70 ? 'Consider adding more recipe variety' : 'Good variety'
        };
    }

    analyzeNutrition(mealPlan) {
        // Simplified nutritional analysis
        return {
            score: 75 + Math.random() * 20, // Placeholder
            recommendation: 'Nutritional balance looks good'
        };
    }

    analyzeCost(mealPlan) {
        // Simplified cost analysis
        const estimatedCost = mealPlan.meals.length * (8 + Math.random() * 12);
        return {
            score: estimatedCost < 100 ? 90 : 60,
            estimatedTotal: Math.round(estimatedCost),
            recommendation: estimatedCost < 100 ? 'Budget-friendly plan' : 'Consider cost optimization'
        };
    }

    analyzeSeasonal(mealPlan) {
        const seasonalScores = mealPlan.meals.map(meal => meal.seasonalScore || 1.0);
        const averageScore = seasonalScores.reduce((sum, score) => sum + score, 0) / seasonalScores.length;
        
        return {
            score: Math.round(averageScore * 100),
            recommendation: averageScore > 1.2 ? 'Great seasonal alignment' : 'Consider more seasonal ingredients'
        };
    }

    analyzeDifficulty(mealPlan) {
        // Simplified difficulty analysis
        return {
            score: 80,
            recommendation: 'Good mix of easy and moderate difficulty meals'
        };
    }

    calculateOverallScore(mealPlan) {
        const variety = this.analyzeVariety(mealPlan);
        const nutrition = this.analyzeNutrition(mealPlan);
        const cost = this.analyzeCost(mealPlan);
        const seasonal = this.analyzeSeasonal(mealPlan);
        const difficulty = this.analyzeDifficulty(mealPlan);
        
        const weightedScore = (
            variety.score * 0.25 +
            nutrition.score * 0.25 +
            cost.score * 0.2 +
            seasonal.score * 0.15 +
            difficulty.score * 0.15
        );
        
        return Math.round(weightedScore);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AdvancedPlanningManager,
        MealPlanAnalytics
    };
}
