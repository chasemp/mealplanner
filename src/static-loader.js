// Static loader for file:// protocol compatibility
// This handles the case where the app is opened directly from file system

(function() {
    'use strict';
    
    // Detect if we're running from file:// protocol
    const isFileProtocol = window.location.protocol === 'file:';
    
    if (isFileProtocol) {
        console.log('🔧 Running in file:// mode - enabling static compatibility');
        
        // Create a simple static version of the app
        document.addEventListener('DOMContentLoaded', function() {
            initStaticApp();
        });
    }
    
    function initStaticApp() {
        // Hide loading and show a static version
        const loading = document.getElementById('loading');
        const app = document.getElementById('app');
        
        if (loading) loading.style.display = 'none';
        
        // Create static app content
        const staticContent = `
            <div class="min-h-screen bg-gray-50">
                <!-- Header -->
                <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center py-6">
                            <div class="flex items-center">
                                <h1 class="text-3xl font-bold text-gray-900">MealPlanner</h1>
                                <span class="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Static Mode</span>
                            </div>
                            <div class="flex space-x-4">
                                <button class="text-sm text-blue-600 hover:text-blue-700" onclick="showInfo()">
                                    ℹ️ Info
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Navigation -->
                <nav class="bg-white shadow-sm">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex space-x-8">
                            <button class="nav-tab py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm" onclick="showTab('recipes')">
                                Recipes
                            </button>
                            <button class="nav-tab py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm" onclick="showTab('ingredients')">
                                Ingredients
                            </button>
                            <button class="nav-tab py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm" onclick="showTab('calendar')">
                                Meal Planning
                            </button>
                            <button class="nav-tab py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm" onclick="showTab('grocery')">
                                Grocery List
                            </button>
                        </div>
                    </div>
                </nav>

                <!-- Main Content -->
                <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div id="static-content">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome to MealPlanner</h2>
                            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-yellow-800">Static Mode Active</h3>
                                        <div class="mt-2 text-sm text-yellow-700">
                                            <p>You're viewing MealPlanner in static mode. For full functionality, please:</p>
                                            <ul class="list-disc list-inside mt-2 space-y-1">
                                                <li>Run <code class="bg-yellow-100 px-1 rounded">npm run dev</code> and visit <a href="http://localhost:5173/MealPlanner/" class="underline">http://localhost:5173/MealPlanner/</a></li>
                                                <li>Or build and serve: <code class="bg-yellow-100 px-1 rounded">npm run build && npm run preview</code></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div class="bg-blue-50 rounded-lg p-6">
                                    <h3 class="text-lg font-semibold text-blue-900 mb-2">📝 Recipe Management</h3>
                                    <p class="text-blue-700 text-sm">Store and organize your favorite recipes with ingredients, instructions, and photos.</p>
                                </div>
                                
                                <div class="bg-green-50 rounded-lg p-6">
                                    <h3 class="text-lg font-semibold text-green-900 mb-2">📅 Meal Planning</h3>
                                    <p class="text-green-700 text-sm">Schedule meals on an interactive calendar with drag-and-drop functionality.</p>
                                </div>
                                
                                <div class="bg-purple-50 rounded-lg p-6">
                                    <h3 class="text-lg font-semibold text-purple-900 mb-2">🛒 Grocery Lists</h3>
                                    <p class="text-purple-700 text-sm">Generate shopping lists from your meal plans and track pantry items.</p>
                                </div>
                                
                                <div class="bg-orange-50 rounded-lg p-6">
                                    <h3 class="text-lg font-semibold text-orange-900 mb-2">🥕 Ingredients Database</h3>
                                    <p class="text-orange-700 text-sm">Manage a normalized ingredient database with barcode scanning support.</p>
                                </div>
                                
                                <div class="bg-red-50 rounded-lg p-6">
                                    <h3 class="text-lg font-semibold text-red-900 mb-2">💾 Local Storage</h3>
                                    <p class="text-red-700 text-sm">All data stored locally with SQLite. Import/export for backup and sync.</p>
                                </div>
                                
                                <div class="bg-indigo-50 rounded-lg p-6">
                                    <h3 class="text-lg font-semibold text-indigo-900 mb-2">📱 PWA Ready</h3>
                                    <p class="text-indigo-700 text-sm">Install as a native app on mobile devices. Works offline.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
        
        if (app) {
            app.innerHTML = staticContent;
        }
        
        // Add global functions for static mode
        window.showInfo = function() {
            alert('MealPlanner PWA\\n\\nFor full functionality, run the development server:\\nnpm run dev\\n\\nOr build for production:\\nnpm run build && npm run preview');
        };
        
        window.showTab = function(tab) {
            // Simple tab switching for static mode
            const content = document.getElementById('static-content');
            const tabs = document.querySelectorAll('.nav-tab');
            
            // Update tab styles
            tabs.forEach(t => {
                t.className = 'nav-tab py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm';
            });
            event.target.className = 'nav-tab py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm';
            
            // Show different content based on tab
            const tabContent = {
                recipes: `
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Recipes</h2>
                        <p class="text-gray-600 mb-4">Recipe management is available in the full application.</p>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">Features include:</h3>
                            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                <li>Add recipes with ingredients, instructions, and photos</li>
                                <li>Organize by categories and tags</li>
                                <li>Search and filter recipes</li>
                                <li>Import/export recipe collections</li>
                            </ul>
                        </div>
                    </div>
                `,
                ingredients: `
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                        <p class="text-gray-600 mb-4">Ingredient management with barcode scanning is available in the full application.</p>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">Features include:</h3>
                            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                <li>Normalized ingredient database</li>
                                <li>Barcode scanning for quick entry</li>
                                <li>Nutritional information and costs</li>
                                <li>Category organization</li>
                            </ul>
                        </div>
                    </div>
                `,
                calendar: `
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Meal Planning</h2>
                        <p class="text-gray-600 mb-4">Interactive calendar with drag-and-drop meal scheduling is available in the full application.</p>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">Features include:</h3>
                            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                <li>Calendar view for breakfast, lunch, and dinner</li>
                                <li>Drag-and-drop meal scheduling</li>
                                <li>Auto-planning with rotation rules</li>
                                <li>Google Calendar integration</li>
                            </ul>
                        </div>
                    </div>
                `,
                grocery: `
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Grocery List</h2>
                        <p class="text-gray-600 mb-4">Automated grocery list generation from meal plans is available in the full application.</p>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">Features include:</h3>
                            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                <li>Generate lists from scheduled meals</li>
                                <li>Mark off items you already have</li>
                                <li>Pantry inventory tracking</li>
                                <li>Export to various formats</li>
                            </ul>
                        </div>
                    </div>
                `
            };
            
            content.innerHTML = tabContent[tab] || tabContent.recipes;
        };
        
        console.log('✅ Static mode initialized successfully');
    }
})();
