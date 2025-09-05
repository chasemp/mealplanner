import{r as D,g as I}from"./sql.js-YwdTznbX.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const L="modulepreload",S=function(l){return"/MealPlanner/"+l},v={},y=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){let c=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=n?.nonce||n?.getAttribute("nonce");s=c(t.map(d=>{if(d=S(d),d in v)return;v[d]=!0;const p=d.endsWith(".css"),g=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${g}`))return;const o=document.createElement("link");if(o.rel=p?"stylesheet":L,p||(o.as="script"),o.crossOrigin="",o.href=d,i&&o.setAttribute("nonce",i),document.head.appendChild(o),p)return new Promise((h,b)=>{o.addEventListener("load",h),o.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return s.then(n=>{for(const i of n||[])i.status==="rejected"&&r(i.reason);return e().catch(r)})};var _=D();const k=I(_),f="MealPlannerDB",w=1,m="sqlite_data",E="meal_planner.db";class B{constructor(){this.db=null,this.SQL=null,this.isInitialized=!1}async initialize(){try{console.log("Initializing SQLite storage..."),this.SQL=await k({locateFile:t=>`https://sql.js.org/dist/${t}`});const e=await this.loadFromIndexedDB();if(e)console.log("Loading existing database from storage"),this.db=new this.SQL.Database(e);else{console.log("Creating new database"),this.db=new this.SQL.Database;const{initializeDatabase:t}=await y(async()=>{const{initializeDatabase:a}=await import("./schema-DaCXEYRa.js");return{initializeDatabase:a}},[]);t(this.db),await this.saveToIndexedDB()}return this.isInitialized=!0,console.log("SQLite storage initialized successfully"),this.setupAutoSave(),!0}catch(e){return console.error("Failed to initialize SQLite storage:",e),!1}}async loadFromIndexedDB(){return new Promise((e,t)=>{const a=indexedDB.open(f,w);a.onerror=()=>t(a.error),a.onupgradeneeded=s=>{const r=s.target.result;r.objectStoreNames.contains(m)||r.createObjectStore(m)},a.onsuccess=s=>{const c=s.target.result.transaction([m],"readonly").objectStore(m).get(E);c.onsuccess=()=>{e(c.result)},c.onerror=()=>t(c.error)}})}async saveToIndexedDB(){if(!this.db)throw new Error("No database to save");const e=this.db.export();return new Promise((t,a)=>{const s=indexedDB.open(f,w);s.onerror=()=>a(s.error),s.onupgradeneeded=r=>{const n=r.target.result;n.objectStoreNames.contains(m)||n.createObjectStore(m)},s.onsuccess=r=>{const d=r.target.result.transaction([m],"readwrite").objectStore(m).put(e,E);d.onsuccess=()=>{console.log("Database saved to IndexedDB"),t()},d.onerror=()=>a(d.error)}})}setupAutoSave(){this.saveTimeout=null,this.needsSave=!1;const e=this.db.exec.bind(this.db);this.db.exec=t=>{const a=e(t);return this.markForSave(),a}}markForSave(){this.needsSave=!0,this.saveTimeout&&clearTimeout(this.saveTimeout),this.saveTimeout=setTimeout(async()=>{this.needsSave&&(await this.saveToIndexedDB(),this.needsSave=!1,"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"DATABASE_UPDATED",timestamp:Date.now()}))},1e3)}exportDatabase(){if(!this.db)throw new Error("No database to export");const e=this.db.export(),t=new Blob([e],{type:"application/x-sqlite3"}),a=URL.createObjectURL(t),s=document.createElement("a");s.href=a,s.download=`meal-planner-${new Date().toISOString().split("T")[0]}.db`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)}async importDatabase(e){return new Promise((t,a)=>{const s=new FileReader;s.onload=async r=>{try{const n=r.target.result,i=new Uint8Array(n);this.db&&this.db.close(),this.db=new this.SQL.Database(i),await this.saveToIndexedDB(),this.setupAutoSave(),console.log("Database imported successfully"),t()}catch(n){console.error("Failed to import database:",n),a(n)}},s.onerror=()=>a(s.error),s.readAsArrayBuffer(e)})}getDatabase(){if(!this.isInitialized||!this.db)throw new Error("Database not initialized");return this.db}isReady(){return this.isInitialized&&this.db!==null}async forceSave(){this.saveTimeout&&clearTimeout(this.saveTimeout),await this.saveToIndexedDB(),this.needsSave=!1}async createNewDatabase(){try{console.log("Creating new database..."),this.db&&this.db.close(),this.db=new this.SQL.Database;const{DATABASE_SCHEMA:e}=await y(async()=>{const{DATABASE_SCHEMA:t}=await import("./schema-DaCXEYRa.js");return{DATABASE_SCHEMA:t}},[]);return this.db.exec(e),await this.saveToIndexedDB(),this.setupAutoSave(),console.log("New database created successfully"),!0}catch(e){return console.error("Failed to create new database:",e),!1}}async resetDatabase(){try{return console.log("Resetting database..."),this.db.exec(`
                DELETE FROM scheduled_meals;
                DELETE FROM grocery_lists;
                DELETE FROM meal_plans;
                DELETE FROM recipe_ingredients;
                DELETE FROM recipes;
                DELETE FROM pantry_items;
            `),await this.saveToIndexedDB(),console.log("Database reset successfully"),!0}catch(e){return console.error("Failed to reset database:",e),!1}}getStats(){if(!this.db)return null;try{const e={},t=["recipes","ingredients","meal_plans","scheduled_meals"];for(const s of t){const r=this.db.exec(`SELECT COUNT(*) as count FROM ${s}`);e[s]=r[0]?.values[0][0]||0}const a=this.db.export();return e.size=a.length,e.sizeFormatted=this.formatBytes(a.length),e}catch(e){return console.error("Error getting database stats:",e),null}}formatBytes(e){if(e===0)return"0 Bytes";const t=1024,a=["Bytes","KB","MB","GB"],s=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,s)).toFixed(2))+" "+a[s]}}const u=new B;async function T(){return await u.initialize()}class ${constructor(e){this.db=e,this.ingredients=[],this.filteredIngredients=[],this.currentFilter={search:"",category:""},this.scanner=null}async loadIngredients(){try{const e=this.db.exec(`
                SELECT i.*, 
                       COUNT(ri.recipe_id) as recipe_count,
                       AVG(ri.quantity) as avg_quantity
                FROM ingredients i
                LEFT JOIN recipe_ingredients ri ON i.id = ri.ingredient_id
                GROUP BY i.id
                ORDER BY i.name ASC
            `);e.length>0?this.ingredients=e[0].values.map(t=>{const a=e[0].columns,s={};return a.forEach((r,n)=>{s[r]=t[n]}),s}):this.ingredients=[],this.applyFilters(),this.render()}catch(e){console.error("Failed to load ingredients:",e)}}applyFilters(){this.filteredIngredients=this.ingredients.filter(e=>{const t=!this.currentFilter.search||e.name.toLowerCase().includes(this.currentFilter.search.toLowerCase()),a=!this.currentFilter.category||e.category===this.currentFilter.category;return t&&a})}render(){const e=document.getElementById("ingredients-grid");if(e){if(this.filteredIngredients.length===0){e.innerHTML=`
                <div class="col-span-full text-center py-12">
                    <div class="text-gray-400 text-6xl mb-4">🥕</div>
                    <p class="text-gray-500 text-lg">No ingredients found</p>
                    <p class="text-gray-400 mt-2">
                        ${this.currentFilter.search||this.currentFilter.category?"Try adjusting your search or filters":"Add your first ingredient to get started!"}
                    </p>
                </div>
            `;return}e.innerHTML=this.filteredIngredients.map(t=>this.createIngredientCard(t)).join("")}}createIngredientCard(e){const t={produce:"bg-green-100 text-green-800",dairy:"bg-blue-100 text-blue-800",meat:"bg-red-100 text-red-800",pantry:"bg-yellow-100 text-yellow-800",grains:"bg-orange-100 text-orange-800"};return`
            <div class="ingredient-card bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                <div class="p-4">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl">${{produce:"🥬",dairy:"🥛",meat:"🥩",pantry:"🏺",grains:"🌾"}[e.category]||"🍽️"}</span>
                            <div>
                                <h3 class="font-medium text-gray-900">${e.name}</h3>
                                <span class="inline-block px-2 py-1 text-xs rounded-full ${t[e.category]||"bg-gray-100 text-gray-800"}">
                                    ${e.category||"Other"}
                                </span>
                            </div>
                        </div>
                        <div class="flex space-x-1">
                            <button class="edit-ingredient-btn text-gray-400 hover:text-blue-600" 
                                    data-ingredient-id="${e.id}" title="Edit">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button class="delete-ingredient-btn text-gray-400 hover:text-red-600" 
                                    data-ingredient-id="${e.id}" title="Delete">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-2 text-sm text-gray-600">
                        <div class="flex justify-between">
                            <span>Default unit:</span>
                            <span class="font-medium">${e.default_unit||"pieces"}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Used in recipes:</span>
                            <span class="font-medium">${e.recipe_count||0}</span>
                        </div>
                        ${e.nutrition_per_100g?`
                            <div class="pt-2 border-t">
                                <div class="text-xs text-gray-500">Per 100g:</div>
                                <div class="flex justify-between">
                                    <span>Calories:</span>
                                    <span>${JSON.parse(e.nutrition_per_100g).calories||"N/A"}</span>
                                </div>
                            </div>
                        `:""}
                        ${e.cost_per_unit?`
                            <div class="flex justify-between">
                                <span>Est. cost:</span>
                                <span class="font-medium text-green-600">$${e.cost_per_unit}</span>
                            </div>
                        `:""}
                    </div>
                </div>
            </div>
        `}setupEventListeners(){document.getElementById("ingredient-search")?.addEventListener("input",e=>{this.currentFilter.search=e.target.value,this.applyFilters(),this.render()}),document.getElementById("category-filter")?.addEventListener("change",e=>{this.currentFilter.category=e.target.value,this.applyFilters(),this.render()}),document.getElementById("add-ingredient-btn")?.addEventListener("click",()=>{this.showIngredientModal()}),document.getElementById("scan-barcode-btn")?.addEventListener("click",()=>{this.startBarcodeScanning()}),document.getElementById("bulk-import-btn")?.addEventListener("click",()=>{this.showBulkImportModal()}),document.getElementById("ingredients-grid")?.addEventListener("click",e=>{if(e.target.closest(".edit-ingredient-btn")){const t=e.target.closest(".edit-ingredient-btn").dataset.ingredientId;this.editIngredient(parseInt(t))}else if(e.target.closest(".delete-ingredient-btn")){const t=e.target.closest(".delete-ingredient-btn").dataset.ingredientId;this.deleteIngredient(parseInt(t))}})}showIngredientModal(e=null){const t=e!==null,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content max-w-2xl">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-4">
                        ${t?"Edit Ingredient":"Add New Ingredient"}
                    </h2>
                    
                    <form id="ingredient-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input type="text" id="ingredient-name" required
                                       value="${e?.name||""}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select id="ingredient-category" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option value="produce" ${e?.category==="produce"?"selected":""}>Produce</option>
                                    <option value="dairy" ${e?.category==="dairy"?"selected":""}>Dairy</option>
                                    <option value="meat" ${e?.category==="meat"?"selected":""}>Meat & Protein</option>
                                    <option value="pantry" ${e?.category==="pantry"?"selected":""}>Pantry</option>
                                    <option value="grains" ${e?.category==="grains"?"selected":""}>Grains</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Default Unit</label>
                                <select id="ingredient-unit" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option value="pieces" ${e?.default_unit==="pieces"?"selected":""}>pieces</option>
                                    <option value="cups" ${e?.default_unit==="cups"?"selected":""}>cups</option>
                                    <option value="tbsp" ${e?.default_unit==="tbsp"?"selected":""}>tbsp</option>
                                    <option value="tsp" ${e?.default_unit==="tsp"?"selected":""}>tsp</option>
                                    <option value="lbs" ${e?.default_unit==="lbs"?"selected":""}>lbs</option>
                                    <option value="oz" ${e?.default_unit==="oz"?"selected":""}>oz</option>
                                    <option value="grams" ${e?.default_unit==="grams"?"selected":""}>grams</option>
                                    <option value="ml" ${e?.default_unit==="ml"?"selected":""}>ml</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Cost per Unit ($)</label>
                                <input type="number" id="ingredient-cost" step="0.01" min="0"
                                       value="${e?.cost_per_unit||""}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Storage Notes</label>
                            <textarea id="ingredient-storage" rows="2"
                                      placeholder="e.g., Store in refrigerator, use within 5 days"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">${e?.storage_notes||""}</textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Calories (per 100g)</label>
                                <input type="number" id="nutrition-calories" min="0"
                                       value="${e?.nutrition_per_100g&&JSON.parse(e.nutrition_per_100g).calories||""}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                                <input type="number" id="nutrition-protein" step="0.1" min="0"
                                       value="${e?.nutrition_per_100g&&JSON.parse(e.nutrition_per_100g).protein||""}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                                <input type="number" id="nutrition-carbs" step="0.1" min="0"
                                       value="${e?.nutrition_per_100g&&JSON.parse(e.nutrition_per_100g).carbs||""}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                                <input type="number" id="nutrition-fat" step="0.1" min="0"
                                       value="${e?.nutrition_per_100g&&JSON.parse(e.nutrition_per_100g).fat||""}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" id="cancel-ingredient" class="btn-secondary">Cancel</button>
                            <button type="submit" class="btn-primary">
                                ${t?"Update":"Add"} Ingredient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.getElementById("modal-container").appendChild(a),document.getElementById("cancel-ingredient").addEventListener("click",()=>a.remove()),a.addEventListener("click",s=>{s.target===a&&a.remove()}),document.getElementById("ingredient-form").addEventListener("submit",s=>{s.preventDefault(),this.saveIngredient(e?.id,a)}),document.getElementById("ingredient-name").focus()}async saveIngredient(e,t){try{const a={name:document.getElementById("ingredient-name").value.trim(),category:document.getElementById("ingredient-category").value,default_unit:document.getElementById("ingredient-unit").value,cost_per_unit:document.getElementById("ingredient-cost").value||null,storage_notes:document.getElementById("ingredient-storage").value.trim()||null,nutrition_per_100g:JSON.stringify({calories:document.getElementById("nutrition-calories").value||null,protein:document.getElementById("nutrition-protein").value||null,carbs:document.getElementById("nutrition-carbs").value||null,fat:document.getElementById("nutrition-fat").value||null})};if(!a.name){alert("Please enter an ingredient name");return}e?this.db.exec(`
                    UPDATE ingredients 
                    SET name = ?, category = ?, default_unit = ?, 
                        cost_per_unit = ?, storage_notes = ?, nutrition_per_100g = ?
                    WHERE id = ?
                `,[a.name,a.category,a.default_unit,a.cost_per_unit,a.storage_notes,a.nutrition_per_100g,e]):this.db.exec(`
                    INSERT INTO ingredients (name, category, default_unit, cost_per_unit, storage_notes, nutrition_per_100g)
                    VALUES (?, ?, ?, ?, ?, ?)
                `,[a.name,a.category,a.default_unit,a.cost_per_unit,a.storage_notes,a.nutrition_per_100g]),t.remove(),await this.loadIngredients(),window.app?.showNotification(e?"Ingredient updated successfully":"Ingredient added successfully","success")}catch(a){console.error("Failed to save ingredient:",a),alert("Failed to save ingredient. Please try again.")}}async editIngredient(e){const t=this.ingredients.find(a=>a.id===e);t&&this.showIngredientModal(t)}async deleteIngredient(e){const t=this.ingredients.find(a=>a.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This action cannot be undone.`))try{this.db.exec("DELETE FROM ingredients WHERE id = ?",[e]),await this.loadIngredients(),window.app?.showNotification("Ingredient deleted successfully","success")}catch(a){console.error("Failed to delete ingredient:",a),alert("Failed to delete ingredient. It may be used in recipes.")}}async startBarcodeScanning(){try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){alert("Camera access is not available in this browser");return}this.showBarcodeScannerModal()}catch(e){console.error("Failed to start barcode scanning:",e),alert("Failed to access camera. Please check permissions.")}}showBarcodeScannerModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content max-w-lg">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-4">Scan Barcode</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-gray-100 rounded-lg p-8 text-center">
                            <div id="scanner-container" class="relative">
                                <video id="scanner-video" class="w-full rounded-lg hidden"></video>
                                <div id="scanner-placeholder" class="text-gray-500">
                                    <div class="text-4xl mb-2">📱</div>
                                    <p>Click "Start Camera" to begin scanning</p>
                                </div>
                                <div id="scanner-overlay" class="absolute inset-0 border-2 border-red-500 rounded-lg hidden">
                                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 border-2 border-red-500"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="scanner-result" class="hidden">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 class="font-medium text-green-800 mb-2">Product Found!</h3>
                                <div id="product-info"></div>
                            </div>
                        </div>
                        
                        <div class="flex justify-between">
                            <button id="start-camera" class="btn-primary">Start Camera</button>
                            <button id="stop-scanner" class="btn-secondary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `,document.getElementById("modal-container").appendChild(e),document.getElementById("start-camera").addEventListener("click",()=>{this.initializeCamera()}),document.getElementById("stop-scanner").addEventListener("click",()=>{this.stopCamera(),e.remove()}),e.addEventListener("click",t=>{t.target===e&&(this.stopCamera(),e.remove())})}async initializeCamera(){try{const e=document.getElementById("scanner-video"),t=document.getElementById("scanner-placeholder"),a=document.getElementById("scanner-overlay"),s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});e.srcObject=s,e.play(),t.classList.add("hidden"),e.classList.remove("hidden"),a.classList.remove("hidden"),this.simulateBarcodeDetection()}catch(e){console.error("Failed to access camera:",e),alert("Failed to access camera. Please check permissions.")}}simulateBarcodeDetection(){setTimeout(()=>{this.handleBarcodeDetected("123456789012")},3e3)}async handleBarcodeDetected(e){try{const t=await this.lookupProduct(e),a=document.getElementById("scanner-result"),s=document.getElementById("product-info");t?(s.innerHTML=`
                    <div class="space-y-2">
                        <p><strong>Name:</strong> ${t.name}</p>
                        <p><strong>Brand:</strong> ${t.brand||"Unknown"}</p>
                        <p><strong>Category:</strong> ${t.category||"Unknown"}</p>
                        <button id="add-scanned-product" class="btn-primary mt-3">
                            Add to Ingredients
                        </button>
                    </div>
                `,document.getElementById("add-scanned-product").addEventListener("click",()=>{this.addScannedProduct(t)})):(s.innerHTML=`
                    <p class="text-red-600">Product not found in database</p>
                    <button id="add-manual-barcode" class="btn-secondary mt-3">
                        Add Manually
                    </button>
                `,document.getElementById("add-manual-barcode").addEventListener("click",()=>{this.showIngredientModal({barcode:e})})),a.classList.remove("hidden")}catch(t){console.error("Failed to lookup product:",t)}}async lookupProduct(e){return{"123456789012":{name:"Organic Tomatoes",brand:"Fresh Farm",category:"produce",nutrition:{calories:18,protein:.9,carbs:3.9,fat:.2}}}[e]||null}addScannedProduct(e){this.showIngredientModal({name:e.name,category:e.category,nutrition_per_100g:JSON.stringify(e.nutrition||{})})}stopCamera(){const e=document.getElementById("scanner-video");e&&e.srcObject&&e.srcObject.getTracks().forEach(a=>a.stop())}showBulkImportModal(){alert("Bulk import feature coming soon!")}}class M{constructor(e,t="dinner"){this.containerId=e,this.mealType=t,this.currentDate=new Date,this.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],this.dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}render(){const e=document.getElementById(this.containerId);if(!e){console.error(`Container ${this.containerId} not found`);return}const t=this.currentDate.getFullYear(),a=this.currentDate.getMonth();e.innerHTML=`
      <div class="simple-calendar bg-white rounded-lg shadow-lg p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button id="prev-month-${this.mealType}" class="p-2 hover:bg-gray-100 rounded-lg">
            ← Previous
          </button>
          <h2 class="text-xl font-bold text-gray-900">
            ${this.monthNames[a]} ${t} - ${this.mealType.charAt(0).toUpperCase()+this.mealType.slice(1)}
          </h2>
          <button id="next-month-${this.mealType}" class="p-2 hover:bg-gray-100 rounded-lg">
            Next →
          </button>
        </div>

        <!-- Day Headers -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          ${this.dayNames.map(s=>`
            <div class="p-2 text-center font-medium text-gray-600 text-sm">
              ${s}
            </div>
          `).join("")}
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          ${this.renderDays()}
        </div>

        <!-- Status -->
        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-700">
            ✅ Calendar loaded successfully! 
            Click on any date to schedule a ${this.mealType} meal.
          </p>
        </div>
      </div>
    `,this.setupEventListeners(),console.log(`Simple calendar rendered for ${this.mealType}`)}renderDays(){const e=this.currentDate.getFullYear(),t=this.currentDate.getMonth(),a=new Date(e,t,1),r=new Date(e,t+1,0).getDate(),n=a.getDay();let i="";const d=new Date(e,t,0).getDate();for(let o=n-1;o>=0;o--){const h=d-o;i+=`
        <div class="p-2 text-center text-gray-400 hover:bg-gray-50 rounded cursor-pointer">
          ${h}
        </div>
      `}for(let o=1;o<=r;o++){const h=new Date(e,t,o),b=this.isToday(h),x=this.formatDate(h);i+=`
        <div class="calendar-day p-2 text-center hover:bg-blue-50 rounded cursor-pointer border-2 border-transparent
                    ${b?"bg-blue-100 border-blue-300 font-bold":"hover:border-blue-200"}"
             data-date="${x}">
          <div class="text-sm">${o}</div>
          <div class="text-xs text-gray-500 mt-1">
            Click to add ${this.mealType}
          </div>
        </div>
      `}const g=Math.ceil((n+r)/7)*7-(n+r);for(let o=1;o<=g;o++)i+=`
        <div class="p-2 text-center text-gray-400 hover:bg-gray-50 rounded cursor-pointer">
          ${o}
        </div>
      `;return i}setupEventListeners(){document.getElementById(`prev-month-${this.mealType}`)?.addEventListener("click",()=>{this.currentDate.setMonth(this.currentDate.getMonth()-1),this.render()}),document.getElementById(`next-month-${this.mealType}`)?.addEventListener("click",()=>{this.currentDate.setMonth(this.currentDate.getMonth()+1),this.render()}),document.querySelectorAll(".calendar-day").forEach(e=>{e.addEventListener("click",t=>{const a=t.currentTarget.dataset.date;a&&(alert(`Schedule ${this.mealType} meal for ${a}`),console.log(`Clicked date: ${a} for ${this.mealType}`))})})}formatDate(e){return e.toISOString().split("T")[0]}isToday(e){const t=new Date;return e.toDateString()===t.toDateString()}}class C{constructor(){this.isInitialized=!1,this.currentTab="recipes",this.ingredientsManager=null,this.calendarViews={breakfast:null,lunch:null,dinner:null},this.simpleCalendars={breakfast:null,lunch:null,dinner:null}}async init(){try{if(console.log("Initializing MealPlanner app..."),this.showLoading(!0),await this.registerServiceWorker(),!await T())throw new Error("Failed to initialize database storage");this.ingredientsManager=new $(u.getDatabase()),this.setupEventListeners(),await this.loadInitialData(),this.showLoading(!1),this.showApp(),this.isInitialized=!0,console.log("MealPlanner app initialized successfully"),document.body.setAttribute("data-testid","app-initialized")}catch(e){console.error("Failed to initialize app:",e),this.showError("Failed to initialize the application. Please refresh the page.")}}async registerServiceWorker(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.register("/MealPlanner/sw.js");console.log("Service Worker registered:",e),navigator.serviceWorker.addEventListener("message",t=>{this.handleServiceWorkerMessage(t.data)}),e.addEventListener("updatefound",()=>{console.log("Service Worker update found");const t=e.installing;t.addEventListener("statechange",()=>{t.state==="installed"&&navigator.serviceWorker.controller&&this.showUpdateAvailable()})})}catch(e){console.error("Service Worker registration failed:",e)}}handleServiceWorkerMessage(e){const{type:t}=e;switch(t){case"SYNC_COMPLETE":console.log("Sync completed:",e.success?"success":"failed"),e.success?(this.showNotification("Data synced successfully","success"),this.loadInitialData()):this.showNotification("Sync failed: "+e.error,"error");break;default:console.log("Unknown service worker message:",t)}}showUpdateAvailable(){const e=document.createElement("div");e.className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-2 text-center z-50",e.innerHTML=`
            <span>A new version is available!</span>
            <button id="update-app" class="ml-4 bg-blue-700 px-3 py-1 rounded text-sm">Update</button>
            <button id="dismiss-update" class="ml-2 text-blue-200">×</button>
        `,document.body.insertBefore(e,document.body.firstChild),document.getElementById("update-app").addEventListener("click",()=>{navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SKIP_WAITING"}),window.location.reload()}),document.getElementById("dismiss-update").addEventListener("click",()=>{e.remove()})}setupEventListeners(){document.querySelectorAll(".nav-tab").forEach(e=>{e.addEventListener("click",t=>{const a=t.target.dataset.tab;this.switchTab(a)})}),document.getElementById("new-db-btn").addEventListener("click",()=>{this.showNewDatabaseModal()}),document.getElementById("export-db-btn").addEventListener("click",()=>{this.exportDatabase()}),document.getElementById("import-db-btn").addEventListener("click",()=>{document.getElementById("db-file-input").click()}),document.getElementById("db-file-input").addEventListener("change",e=>{const t=e.target.files[0];t&&this.importDatabase(t)}),document.getElementById("add-recipe-btn").addEventListener("click",()=>{this.showAddRecipeModal()}),document.addEventListener("keydown",e=>{if(e.ctrlKey||e.metaKey)switch(e.key){case"s":e.preventDefault(),this.forceSaveDatabase();break;case"e":e.preventDefault(),this.exportDatabase();break}}),document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isInitialized&&this.checkForDataUpdates()})}switchTab(e){document.querySelectorAll(".nav-tab").forEach(a=>{a.classList.remove("active"),a.dataset.tab===e&&a.classList.add("active")}),document.querySelectorAll(".tab-content").forEach(a=>{a.classList.add("hidden")});const t=document.getElementById(`${e}-tab`);t&&t.classList.remove("hidden"),this.currentTab=e,this.loadTabData(e)}async loadTabData(e){switch(e){case"recipes":await this.loadRecipes();break;case"ingredients":await this.loadIngredients();break;case"breakfast":case"lunch":case"dinner":await this.loadMealPlan(e);break;case"grocery":await this.loadGroceryList();break}}async loadInitialData(){await this.loadTabData(this.currentTab),this.updateDatabaseStats()}async loadRecipes(){try{const t=u.getDatabase().exec(`
                SELECT r.*, COUNT(ri.id) as ingredient_count
                FROM recipes r
                LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
                GROUP BY r.id
                ORDER BY r.updated_at DESC
            `),a=document.getElementById("recipes-list");if(!t.length||!t[0].values.length){a.innerHTML=`
                    <div class="col-span-full text-center py-12">
                        <p class="text-gray-500 text-lg">No recipes found.</p>
                        <p class="text-gray-400 mt-2">Add your first recipe to get started!</p>
                    </div>
                `;return}const s=t[0].values.map(r=>{const n=t[0].columns,i={};return n.forEach((c,d)=>{i[c]=r[d]}),i});a.innerHTML=s.map(r=>this.createRecipeCard(r)).join("")}catch(e){console.error("Failed to load recipes:",e),this.showError("Failed to load recipes")}}createRecipeCard(e){const t=(e.prep_time||0)+(e.cook_time||0),a=t>0?`${t} min`:"Time not set";return`
            <div class="recipe-card" data-recipe-id="${e.id}">
                ${e.image_data?`
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="${e.image_data}" alt="${e.title}" class="w-full h-48 object-cover">
                    </div>
                `:""}
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${e.title}</h3>
                    ${e.description?`
                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${e.description}</p>
                    `:""}
                    <div class="flex justify-between items-center text-sm text-gray-500">
                        <span>Serves ${e.serving_count}</span>
                        <span>${a}</span>
                        <span>${e.ingredient_count} ingredients</span>
                    </div>
                    <div class="mt-3 flex space-x-2">
                        <button class="btn-primary text-xs px-3 py-1" onclick="app.editRecipe(${e.id})">
                            Edit
                        </button>
                        <button class="btn-secondary text-xs px-3 py-1" onclick="app.viewRecipe(${e.id})">
                            View
                        </button>
                    </div>
                </div>
            </div>
        `}async loadMealPlan(e){try{if(console.log(`Loading ${e} meal plan`),this.simpleCalendars[e])this.simpleCalendars[e].render(),console.log(`Simple calendar re-rendered for ${e}`);else{const t=`${e}-calendar-container`,a=document.getElementById(t);if(a){const s=`simple-calendar-${e}`;a.innerHTML=`<div id="${s}"></div>`,this.simpleCalendars[e]=new M(s,e),this.simpleCalendars[e].render(),console.log(`Simple calendar created and rendered for ${e}`)}else console.error(`Container ${t} not found`)}}catch(t){console.error(`Failed to load ${e} meal plan:`,t)}}async loadIngredients(){this.ingredientsManager&&(await this.ingredientsManager.loadIngredients(),this.ingredientsManager.setupEventListeners())}async loadGroceryList(){console.log("Loading grocery list")}showAddRecipeModal(){console.log("Show add recipe modal"),this.showNotification("Add recipe modal coming soon!","info")}async exportDatabase(){try{u.exportDatabase(),this.showNotification("Database exported successfully","success")}catch(e){console.error("Failed to export database:",e),this.showNotification("Failed to export database","error")}}async importDatabase(e){try{this.showLoading(!0,"Importing database..."),await u.importDatabase(e),await this.loadTabData(this.currentTab),this.updateDatabaseStats(),this.showLoading(!1),this.showNotification("Database imported successfully","success")}catch(t){console.error("Failed to import database:",t),this.showLoading(!1),this.showNotification("Failed to import database","error")}}async forceSaveDatabase(){try{await u.forceSave(),this.showNotification("Database saved","success")}catch(e){console.error("Failed to save database:",e),this.showNotification("Failed to save database","error")}}async checkForDataUpdates(){console.log("Checking for data updates..."),await this.loadTabData(this.currentTab)}updateDatabaseStats(){const e=u.getStats();e&&console.log("Database stats:",e)}showLoading(e,t="Loading MealPlanner..."){const a=document.getElementById("loading"),s=a.querySelector("p");e?(s.textContent=t,a.classList.remove("hidden")):a.classList.add("hidden")}showApp(){document.getElementById("main-app").classList.remove("hidden")}showError(e){const t=document.createElement("div");t.className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50",t.innerHTML=`
            <div class="flex items-center">
                <span>${e}</span>
                <button class="ml-4 text-red-200 hover:text-white" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `,document.body.appendChild(t),setTimeout(()=>{t.parentElement&&t.remove()},5e3)}showNotification(e,t="info"){const a={success:"bg-green-500",error:"bg-red-500",info:"bg-blue-500",warning:"bg-yellow-500"},s=document.createElement("div");s.className=`fixed top-4 right-4 ${a[t]} text-white p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full`,s.innerHTML=`
            <div class="flex items-center">
                <span>${e}</span>
                <button class="ml-4 opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `,document.body.appendChild(s),setTimeout(()=>{s.classList.remove("translate-x-full")},100),setTimeout(()=>{s.parentElement&&(s.classList.add("translate-x-full"),setTimeout(()=>s.remove(),300))},4e3)}showNewDatabaseModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content p-6">
                <h2 class="text-xl font-bold mb-4">Create New Database</h2>
                <p class="text-gray-600 mb-6">Choose how you want to start your new database:</p>
                
                <div class="space-y-4">
                    <button id="create-empty-db" class="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50">
                        <div class="font-medium">Empty Database</div>
                        <div class="text-sm text-gray-500">Start completely fresh with no recipes or data</div>
                    </button>
                    
                    <button id="create-reset-db" class="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50">
                        <div class="font-medium">Reset Current Database</div>
                        <div class="text-sm text-gray-500">Clear all recipes but keep ingredient list</div>
                    </button>
                </div>
                
                <div class="flex justify-end space-x-3 mt-6">
                    <button id="cancel-new-db" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `,document.getElementById("modal-container").appendChild(e),document.getElementById("create-empty-db").addEventListener("click",()=>{this.createNewDatabase(!0),e.remove()}),document.getElementById("create-reset-db").addEventListener("click",()=>{this.createNewDatabase(!1),e.remove()}),document.getElementById("cancel-new-db").addEventListener("click",()=>{e.remove()}),e.addEventListener("click",t=>{t.target===e&&e.remove()})}async createNewDatabase(e=!1){try{this.showLoading(!0,"Creating new database...");let t;if(e?t=await u.createNewDatabase():t=await u.resetDatabase(),t)await this.loadTabData(this.currentTab),this.updateDatabaseStats(),this.showLoading(!1),this.showNotification(e?"New empty database created":"Database reset successfully","success");else throw new Error("Failed to create new database")}catch(t){console.error("Failed to create new database:",t),this.showLoading(!1),this.showNotification("Failed to create new database","error")}}editRecipe(e){console.log("Edit recipe:",e),this.showNotification("Edit recipe feature coming soon!","info")}viewRecipe(e){console.log("View recipe:",e),this.showNotification("View recipe feature coming soon!","info")}}document.addEventListener("DOMContentLoaded",()=>{window.app=new C,window.app.init()});window.addEventListener("beforeinstallprompt",l=>{l.preventDefault(),console.log("PWA install prompt available")});
