// Reusable Multi-Label Filter Component
class MultiLabelFilter {
    constructor(options = {}) {
        this.containerId = options.containerId || 'multi-label-filter';
        this.inputId = options.inputId || 'multi-label-input';
        this.dropdownId = options.dropdownId || 'multi-label-dropdown';
        this.placeholder = options.placeholder || 'Type to search labels...';
        this.placeholderWithSelection = options.placeholderWithSelection || 'Type to add more...';
        this.getAllLabels = options.getAllLabels || (() => []);
        this.onSelectionChange = options.onSelectionChange || (() => {});
        
        this.selectedLabels = [];
        this.searchTerm = '';
        this.isInitialized = false;
    }

    // Generate HTML for the multi-label filter
    generateHTML() {
        return `
            <div class="relative">
                <div id="${this.containerId}" class="w-full min-h-[42px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 dark:text-white cursor-text flex flex-wrap gap-1 items-center">
                    ${this.selectedLabels.map(label => `
                        <span class="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            ${label}
                            <button type="button" class="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100" onclick="window.multiLabelFilter_${this.containerId}.removeLabel('${label}')">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </span>
                    `).join('')}
                    <input 
                        type="text" 
                        id="${this.inputId}" 
                        class="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400" 
                        placeholder="${this.selectedLabels.length > 0 ? this.placeholderWithSelection : this.placeholder}"
                        autocomplete="off"
                    />
                </div>
                <div id="${this.dropdownId}" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg hidden max-h-48 overflow-y-auto">
                    <!-- Dropdown options will be populated by JavaScript -->
                </div>
            </div>
        `;
    }

    // Initialize event listeners (call after HTML is in DOM)
    initialize(container) {
        if (this.isInitialized) return;
        
        const labelInput = container.querySelector(`#${this.inputId}`);
        const labelContainer = container.querySelector(`#${this.containerId}`);
        const labelDropdown = container.querySelector(`#${this.dropdownId}`);
        
        if (!labelInput || !labelContainer || !labelDropdown) {
            console.error('MultiLabelFilter: Required elements not found');
            return;
        }

        // Make this instance globally accessible for onclick handlers
        window[`multiLabelFilter_${this.containerId}`] = this;

        // Show dropdown and focus input when clicking container
        labelContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            labelInput.focus();
            labelDropdown.classList.remove('hidden');
            this.updateDropdown(container);
        });

        // Handle typing in the input
        labelInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            labelDropdown.classList.remove('hidden');
            this.updateDropdown(container);
        });

        // Handle keyboard navigation
        labelInput.addEventListener('keydown', (e) => {
            const dropdown = container.querySelector(`#${this.dropdownId}`);
            const options = dropdown.querySelectorAll('[data-label]');
            const highlighted = dropdown.querySelector('.bg-gray-50, .dark\\:bg-gray-700');
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (options.length > 0) {
                        if (highlighted) {
                            highlighted.classList.remove('bg-gray-50', 'dark:bg-gray-700');
                            const next = highlighted.nextElementSibling;
                            if (next && next.hasAttribute('data-label')) {
                                next.classList.add('bg-gray-50', 'dark:bg-gray-700');
                            } else {
                                options[0].classList.add('bg-gray-50', 'dark:bg-gray-700');
                            }
                        } else {
                            options[0].classList.add('bg-gray-50', 'dark:bg-gray-700');
                        }
                    }
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    if (options.length > 0) {
                        if (highlighted) {
                            highlighted.classList.remove('bg-gray-50', 'dark:bg-gray-700');
                            const prev = highlighted.previousElementSibling;
                            if (prev && prev.hasAttribute('data-label')) {
                                prev.classList.add('bg-gray-50', 'dark:bg-gray-700');
                            } else {
                                options[options.length - 1].classList.add('bg-gray-50', 'dark:bg-gray-700');
                            }
                        } else {
                            options[options.length - 1].classList.add('bg-gray-50', 'dark:bg-gray-700');
                        }
                    }
                    break;
                    
                case 'Enter':
                    e.preventDefault();
                    if (highlighted) {
                        const label = highlighted.getAttribute('data-label');
                        if (label) {
                            this.addLabel(label);
                            labelInput.focus(); // Keep focus for more selections
                        }
                    }
                    break;
                    
                case 'Escape':
                    labelDropdown.classList.add('hidden');
                    labelInput.blur();
                    break;
            }
        });

        // Handle focus events
        labelInput.addEventListener('focus', () => {
            labelDropdown.classList.remove('hidden');
            this.updateDropdown(container);
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!labelContainer.contains(e.target) && !labelDropdown.contains(e.target)) {
                labelDropdown.classList.add('hidden');
                labelInput.value = ''; // Clear search when closing
                this.searchTerm = '';
            }
        });

        this.isInitialized = true;
    }

    // Add a label to selection
    addLabel(label) {
        if (!this.selectedLabels.includes(label)) {
            this.selectedLabels.push(label);
            this.searchTerm = ''; // Clear search after selection
            this.onSelectionChange(this.selectedLabels);
        }
    }

    // Remove a label from selection
    removeLabel(label) {
        this.selectedLabels = this.selectedLabels.filter(l => l !== label);
        this.onSelectionChange(this.selectedLabels);
    }

    // Clear all selected labels
    clearAll() {
        this.selectedLabels = [];
        this.searchTerm = '';
        this.onSelectionChange(this.selectedLabels);
    }

    // Set selected labels (for external updates)
    setSelectedLabels(labels) {
        this.selectedLabels = [...labels];
        this.onSelectionChange(this.selectedLabels);
    }

    // Get filtered labels for dropdown based on search term
    getFilteredLabelsForDropdown() {
        const availableLabels = this.getAllLabels().filter(label => !this.selectedLabels.includes(label));
        
        if (!this.searchTerm) {
            return availableLabels;
        }
        
        return availableLabels.filter(label => 
            label.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    // Update dropdown content based on current search
    updateDropdown(container) {
        const dropdown = container.querySelector(`#${this.dropdownId}`);
        if (!dropdown) return;

        const filteredLabels = this.getFilteredLabelsForDropdown();
        
        if (filteredLabels.length === 0) {
            dropdown.innerHTML = `
                <div class="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    ${this.searchTerm ? `No labels found matching "${this.searchTerm}"` : 'No more labels available'}
                </div>
            `;
        } else {
            dropdown.innerHTML = filteredLabels.map((label, index) => `
                <div class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm ${index === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}" 
                     data-label="${label}" 
                     onclick="window.multiLabelFilter_${this.containerId}.addLabel('${label}')">
                    ${label}
                </div>
            `).join('');
        }

        // Clear search input after updating dropdown
        const input = container.querySelector(`#${this.inputId}`);
        if (input && this.searchTerm === '') {
            input.value = '';
        }
    }
}

// Make MultiLabelFilter globally available
if (typeof window !== 'undefined') {
    window.MultiLabelFilter = MultiLabelFilter;
}
if (typeof global !== 'undefined') {
    global.MultiLabelFilter = MultiLabelFilter;
}
