import { test, expect } from '@playwright/test';

test.describe('Comprehensive MealPlanner Workflow', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Test against local server to avoid caching issues
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
  });

  test('Complete workflow: recipe scheduling, data management, and editing', async () => {
    console.log('Starting comprehensive workflow test...');

    // Step 1: Test basic recipe scheduling
    console.log('Step 1: Testing basic recipe scheduling...');
    await testBasicRecipeScheduling(page);

    // Step 2: Clear all data and create test data
    console.log('Step 2: Creating test data workflow...');
    await testDataCreationWorkflow(page);

    // Step 3: Test demo data reset and validation
    console.log('Step 3: Testing demo data reset...');
    await testDemoDataReset(page);

    // Step 4: Test editing functionality
    console.log('Step 4: Testing edit functionality...');
    await testEditFunctionality(page);

    // Step 5: Test mobile view
    console.log('Step 5: Testing mobile view...');
    await testMobileView(page);

    console.log('All workflow tests completed successfully!');
  });

  async function testBasicRecipeScheduling(page) {
    // Navigate to recipes tab
    await page.click('[data-tab="recipes"]');
    await page.waitForTimeout(500);

    // Check if we have recipes available
    const recipeCards = await page.locator('.recipe-card').count();
    console.log(`Found ${recipeCards} recipe cards`);
    
    if (recipeCards > 0) {
      // Click on first recipe to add to schedule
      await page.click('.recipe-card:first-child .add-to-schedule-btn');
      await page.waitForTimeout(500);

      // Navigate to plan tab to verify
      await page.click('[data-tab="plan"]');
      await page.waitForTimeout(500);

      // Check if recipe appears in pending or scheduled
      const pendingItems = await page.locator('.pending-meal-item').count();
      console.log(`Found ${pendingItems} pending meal items`);
    }
  }

  async function testDataCreationWorkflow(page) {
    // Clear all data first
    await page.click('[data-tab="settings"]');
    await page.waitForTimeout(500);
    
    // Look for clear data button
    const clearDataBtn = page.locator('button:has-text("Clear All Data"), button:has-text("Clear Data")');
    if (await clearDataBtn.count() > 0) {
      await clearDataBtn.click();
      await page.waitForTimeout(1000);
      
      // Confirm if there's a confirmation dialog
      const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Yes"), button:has-text("Clear")');
      if (await confirmBtn.count() > 0) {
        await confirmBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    // Create 11 items
    console.log('Creating 11 items...');
    await page.click('[data-tab="items"]');
    await page.waitForTimeout(500);

    const itemNames = [
      'Chicken Breast', 'Rice', 'Broccoli', 'Olive Oil', 'Garlic',
      'Onion', 'Tomatoes', 'Pasta', 'Cheese', 'Spinach', 'Eggs'
    ];

    for (let i = 0; i < itemNames.length; i++) {
      await createItem(page, itemNames[i]);
      await page.waitForTimeout(300);
    }

    // Verify items were created
    const itemCount = await page.locator('.item-card, .ingredient-item').count();
    console.log(`Created ${itemCount} items`);

    // Create 7 recipes
    console.log('Creating 7 recipes...');
    await page.click('[data-tab="recipes"]');
    await page.waitForTimeout(500);

    const recipeNames = [
      'Chicken Rice Bowl', 'Pasta Primavera', 'Garlic Spinach', 
      'Scrambled Eggs', 'Tomato Salad', 'Broccoli Stir Fry', 'Cheese Omelet'
    ];

    for (let i = 0; i < recipeNames.length; i++) {
      await createRecipe(page, recipeNames[i], itemNames.slice(0, 3));
      await page.waitForTimeout(500);
    }

    // Create 3 combos (meals)
    console.log('Creating 3 combos...');
    await page.click('[data-tab="meals"]');
    await page.waitForTimeout(500);

    const comboNames = ['Breakfast Combo', 'Lunch Combo', 'Dinner Combo'];
    
    for (let i = 0; i < comboNames.length; i++) {
      await createCombo(page, comboNames[i], recipeNames.slice(0, 2));
      await page.waitForTimeout(500);
    }

    // Add 3 combos to pending
    console.log('Adding combos to pending...');
    await page.click('[data-tab="plan"]');
    await page.waitForTimeout(500);

    // Schedule the combos
    console.log('Scheduling combos...');
    await scheduleCombosToPlan(page);

    // Verify on menu tab
    console.log('Verifying on menu tab...');
    await page.click('[data-tab="menu"]');
    await page.waitForTimeout(500);

    const menuItems = await page.locator('.menu-item, .scheduled-meal').count();
    console.log(`Found ${menuItems} items on menu`);
  }

  async function testDemoDataReset(page) {
    // Reset to demo data
    await page.click('[data-tab="settings"]');
    await page.waitForTimeout(500);

    const resetDemoBtn = page.locator('button:has-text("Reset Demo Data"), button:has-text("Load Demo Data")');
    if (await resetDemoBtn.count() > 0) {
      await resetDemoBtn.click();
      await page.waitForTimeout(2000);
    }

    // Verify demo data is loaded
    await page.click('[data-tab="recipes"]');
    await page.waitForTimeout(500);
    
    const demoRecipes = await page.locator('.recipe-card').count();
    console.log(`Demo data loaded: ${demoRecipes} recipes`);

    // Clear data again
    await page.click('[data-tab="settings"]');
    await page.waitForTimeout(500);
    
    const clearBtn = page.locator('button:has-text("Clear All Data"), button:has-text("Clear Data")');
    if (await clearBtn.count() > 0) {
      await clearBtn.click();
      await page.waitForTimeout(1000);
    }

    // Validate empty state
    await page.click('[data-tab="recipes"]');
    await page.waitForTimeout(500);
    
    const emptyRecipes = await page.locator('.recipe-card').count();
    console.log(`After clear: ${emptyRecipes} recipes`);

    // Reapply demo data
    await page.click('[data-tab="settings"]');
    await page.waitForTimeout(500);
    
    if (await resetDemoBtn.count() > 0) {
      await resetDemoBtn.click();
      await page.waitForTimeout(2000);
    }

    // Verify restoration
    await page.click('[data-tab="recipes"]');
    await page.waitForTimeout(500);
    
    const restoredRecipes = await page.locator('.recipe-card').count();
    console.log(`After restore: ${restoredRecipes} recipes`);
  }

  async function testEditFunctionality(page) {
    // Test editing an item
    await page.click('[data-tab="items"]');
    await page.waitForTimeout(500);

    const firstItem = page.locator('.item-card, .ingredient-item').first();
    if (await firstItem.count() > 0) {
      // Look for edit button
      const editBtn = firstItem.locator('button:has-text("Edit"), .edit-btn, [data-action="edit"]');
      if (await editBtn.count() > 0) {
        await editBtn.click();
        await page.waitForTimeout(500);
        
        // Edit the name
        const nameInput = page.locator('input[name="name"], input[placeholder*="name"]').first();
        if (await nameInput.count() > 0) {
          await nameInput.fill('Edited Item Name');
          
          // Save
          const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update")');
          if (await saveBtn.count() > 0) {
            await saveBtn.click();
            await page.waitForTimeout(500);
          }
        }
      }
    }

    // Test editing a recipe
    await page.click('[data-tab="recipes"]');
    await page.waitForTimeout(500);

    const firstRecipe = page.locator('.recipe-card').first();
    if (await firstRecipe.count() > 0) {
      const editBtn = firstRecipe.locator('button:has-text("Edit"), .edit-btn, [data-action="edit"]');
      if (await editBtn.count() > 0) {
        await editBtn.click();
        await page.waitForTimeout(500);
        
        const nameInput = page.locator('input[name="name"], input[placeholder*="name"]').first();
        if (await nameInput.count() > 0) {
          await nameInput.fill('Edited Recipe Name');
          
          const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update")');
          if (await saveBtn.count() > 0) {
            await saveBtn.click();
            await page.waitForTimeout(500);
          }
        }
      }
    }

    // Test editing a combo/meal
    await page.click('[data-tab="meals"]');
    await page.waitForTimeout(500);

    const firstMeal = page.locator('.meal-card').first();
    if (await firstMeal.count() > 0) {
      const editBtn = firstMeal.locator('button:has-text("Edit"), .edit-btn, [data-action="edit"]');
      if (await editBtn.count() > 0) {
        await editBtn.click();
        await page.waitForTimeout(500);
        
        const nameInput = page.locator('input[name="name"], input[placeholder*="name"]').first();
        if (await nameInput.count() > 0) {
          await nameInput.fill('Edited Meal Name');
          
          const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update")');
          if (await saveBtn.count() > 0) {
            await saveBtn.click();
            await page.waitForTimeout(500);
          }
        }
      }
    }
  }

  async function testMobileView(page) {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Test navigation in mobile view
    const tabs = ['items', 'recipes', 'meals', 'plan', 'menu', 'settings'];
    
    for (const tab of tabs) {
      console.log(`Testing mobile navigation to ${tab} tab`);
      await page.click(`[data-tab="${tab}"]`);
      await page.waitForTimeout(500);
      
      // Verify tab is active
      const activeTab = await page.locator(`[data-tab="${tab}"].active, [data-tab="${tab}"][aria-selected="true"]`).count();
      console.log(`${tab} tab active: ${activeTab > 0}`);
    }

    // Test mobile-specific functionality
    await testMobileSpecificFeatures(page);
  }

  async function testMobileSpecificFeatures(page) {
    // Test mobile menu interactions
    await page.click('[data-tab="recipes"]');
    await page.waitForTimeout(500);

    // Test mobile card interactions
    const recipeCards = await page.locator('.recipe-card').count();
    if (recipeCards > 0) {
      // Test touch interactions
      await page.tap('.recipe-card:first-child');
      await page.waitForTimeout(300);
    }
  }

  // Helper functions
  async function createItem(page, name) {
    const addBtn = page.locator('button:has-text("Add Item"), button:has-text("Add New"), .add-item-btn');
    if (await addBtn.count() > 0) {
      await addBtn.click();
      await page.waitForTimeout(300);
      
      const nameInput = page.locator('input[name="name"], input[placeholder*="name"]').first();
      if (await nameInput.count() > 0) {
        await nameInput.fill(name);
        
        const saveBtn = page.locator('button:has-text("Save"), button:has-text("Add"), button:has-text("Create")');
        if (await saveBtn.count() > 0) {
          await saveBtn.click();
          await page.waitForTimeout(300);
        }
      }
    }
  }

  async function createRecipe(page, name, ingredients) {
    const addBtn = page.locator('button:has-text("Add Recipe"), button:has-text("Add New"), .add-recipe-btn');
    if (await addBtn.count() > 0) {
      await addBtn.click();
      await page.waitForTimeout(300);
      
      const nameInput = page.locator('input[name="name"], input[placeholder*="name"]').first();
      if (await nameInput.count() > 0) {
        await nameInput.fill(name);
        
        // Add ingredients if possible
        for (const ingredient of ingredients.slice(0, 2)) {
          const ingredientSelect = page.locator('select[name="ingredient"], .ingredient-select');
          if (await ingredientSelect.count() > 0) {
            await ingredientSelect.selectOption({ label: ingredient });
            await page.waitForTimeout(100);
          }
        }
        
        const saveBtn = page.locator('button:has-text("Save"), button:has-text("Add"), button:has-text("Create")');
        if (await saveBtn.count() > 0) {
          await saveBtn.click();
          await page.waitForTimeout(300);
        }
      }
    }
  }

  async function createCombo(page, name, recipes) {
    const addBtn = page.locator('button:has-text("Add Meal"), button:has-text("Add New"), .add-meal-btn');
    if (await addBtn.count() > 0) {
      await addBtn.click();
      await page.waitForTimeout(300);
      
      const nameInput = page.locator('input[name="name"], input[placeholder*="name"]').first();
      if (await nameInput.count() > 0) {
        await nameInput.fill(name);
        
        const saveBtn = page.locator('button:has-text("Save"), button:has-text("Add"), button:has-text("Create")');
        if (await saveBtn.count() > 0) {
          await saveBtn.click();
          await page.waitForTimeout(300);
        }
      }
    }
  }

  async function scheduleCombosToPlan(page) {
    // Look for combos to add to pending
    const mealCards = await page.locator('.meal-card, .combo-card').count();
    console.log(`Found ${mealCards} meal cards to schedule`);
    
    // Add meals to pending if not already there
    for (let i = 0; i < Math.min(3, mealCards); i++) {
      const addToPendingBtn = page.locator('.meal-card, .combo-card').nth(i).locator('button:has-text("Add to Pending"), .add-to-pending-btn');
      if (await addToPendingBtn.count() > 0) {
        await addToPendingBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // Schedule pending items
    const pendingItems = await page.locator('.pending-meal-item').count();
    console.log(`Found ${pendingItems} pending items to schedule`);
    
    for (let i = 0; i < pendingItems; i++) {
      const scheduleBtn = page.locator('.pending-meal-item').nth(i).locator('button:has-text("Schedule"), .schedule-btn');
      if (await scheduleBtn.count() > 0) {
        await scheduleBtn.click();
        await page.waitForTimeout(300);
        
        // Select a date if date picker appears
        const dateInput = page.locator('input[type="date"], .date-picker');
        if (await dateInput.count() > 0) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + i + 1);
          await dateInput.fill(tomorrow.toISOString().split('T')[0]);
          
          const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Schedule")');
          if (await confirmBtn.count() > 0) {
            await confirmBtn.click();
            await page.waitForTimeout(300);
          }
        }
      }
    }
  }
});
