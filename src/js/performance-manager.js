// Performance Management and Optimization
class PerformanceManager {
    constructor() {
        this.metrics = {
            loadTimes: [],
            renderTimes: [],
            databaseOperations: [],
            memoryUsage: []
        };
        this.observers = [];
        this.cacheManager = new CacheManager();
        this.lazyLoader = new LazyLoader();
        this.init();
    }

    init() {
        this.setupPerformanceObservers();
        this.enableVirtualScrolling();
        this.optimizeDatabaseQueries();
        this.setupMemoryMonitoring();
        
        console.log('🚀 Performance Manager initialized');
    }

    setupPerformanceObservers() {
        // Performance Observer for navigation timing
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    this.recordMetric(entry.entryType, entry);
                });
            });

            observer.observe({ entryTypes: ['navigation', 'measure', 'mark'] });
            this.observers.push(observer);
        }

        // Intersection Observer for lazy loading
        this.lazyLoader.setupIntersectionObserver();
    }

    recordMetric(type, entry) {
        const metric = {
            type,
            name: entry.name,
            duration: entry.duration || entry.loadEventEnd - entry.loadEventStart,
            timestamp: Date.now()
        };

        switch (type) {
            case 'navigation':
                this.metrics.loadTimes.push(metric);
                break;
            case 'measure':
                if (entry.name.includes('render')) {
                    this.metrics.renderTimes.push(metric);
                } else if (entry.name.includes('database')) {
                    this.metrics.databaseOperations.push(metric);
                }
                break;
        }

        // Keep only last 100 metrics
        Object.keys(this.metrics).forEach(key => {
            if (this.metrics[key].length > 100) {
                this.metrics[key] = this.metrics[key].slice(-100);
            }
        });
    }

    measureOperation(name, operation) {
        performance.mark(`${name}-start`);
        
        const result = operation();
        
        if (result && typeof result.then === 'function') {
            // Handle async operations
            return result.finally(() => {
                performance.mark(`${name}-end`);
                performance.measure(name, `${name}-start`, `${name}-end`);
            });
        } else {
            // Handle sync operations
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
            return result;
        }
    }

    enableVirtualScrolling() {
        // Virtual scrolling for large lists
        this.virtualScrollManager = new VirtualScrollManager();
    }

    optimizeDatabaseQueries() {
        // Database query optimization
        this.queryOptimizer = new QueryOptimizer();
    }

    setupMemoryMonitoring() {
        if ('memory' in performance) {
            setInterval(() => {
                const memInfo = performance.memory;
                this.metrics.memoryUsage.push({
                    used: memInfo.usedJSHeapSize,
                    total: memInfo.totalJSHeapSize,
                    limit: memInfo.jsHeapSizeLimit,
                    timestamp: Date.now()
                });
            }, 30000); // Every 30 seconds
        }
    }

    getPerformanceReport() {
        const report = {
            averageLoadTime: this.calculateAverage(this.metrics.loadTimes),
            averageRenderTime: this.calculateAverage(this.metrics.renderTimes),
            averageDatabaseTime: this.calculateAverage(this.metrics.databaseOperations),
            memoryTrend: this.getMemoryTrend(),
            recommendations: this.generateRecommendations()
        };

        return report;
    }

    calculateAverage(metrics) {
        if (metrics.length === 0) return 0;
        const sum = metrics.reduce((acc, metric) => acc + metric.duration, 0);
        return Math.round(sum / metrics.length);
    }

    getMemoryTrend() {
        if (this.metrics.memoryUsage.length < 2) return 'insufficient-data';
        
        const recent = this.metrics.memoryUsage.slice(-10);
        const trend = recent[recent.length - 1].used - recent[0].used;
        
        if (trend > 1000000) return 'increasing'; // 1MB increase
        if (trend < -1000000) return 'decreasing';
        return 'stable';
    }

    generateRecommendations() {
        const recommendations = [];
        
        const avgRender = this.calculateAverage(this.metrics.renderTimes);
        if (avgRender > 100) {
            recommendations.push('Consider optimizing render operations - average render time is high');
        }

        const avgDb = this.calculateAverage(this.metrics.databaseOperations);
        if (avgDb > 50) {
            recommendations.push('Database operations are slow - consider indexing or query optimization');
        }

        const memoryTrend = this.getMemoryTrend();
        if (memoryTrend === 'increasing') {
            recommendations.push('Memory usage is increasing - check for memory leaks');
        }

        if (recommendations.length === 0) {
            recommendations.push('Performance looks good!');
        }

        return recommendations;
    }

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Cache Management
class CacheManager {
    constructor() {
        this.cache = new Map();
        this.maxSize = 100;
        this.ttl = 5 * 60 * 1000; // 5 minutes
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    set(key, data) {
        if (this.cache.size >= this.maxSize) {
            // Remove oldest item
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    clear() {
        this.cache.clear();
    }

    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            hitRate: this.calculateHitRate()
        };
    }

    calculateHitRate() {
        // This would need to be implemented with hit/miss tracking
        return 0.85; // Placeholder
    }
}

// Lazy Loading Manager
class LazyLoader {
    constructor() {
        this.observer = null;
        this.lazyElements = new Set();
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadElement(entry.target);
                        this.observer.unobserve(entry.target);
                        this.lazyElements.delete(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });
        }
    }

    observe(element) {
        if (this.observer) {
            this.observer.observe(element);
            this.lazyElements.add(element);
        }
    }

    loadElement(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
        }

        if (element.dataset.content) {
            element.innerHTML = element.dataset.content;
            element.removeAttribute('data-content');
        }

        element.classList.add('loaded');
    }

    unobserveAll() {
        if (this.observer) {
            this.lazyElements.forEach(element => {
                this.observer.unobserve(element);
            });
            this.lazyElements.clear();
        }
    }
}

// Virtual Scrolling Manager
class VirtualScrollManager {
    constructor() {
        this.containers = new Map();
    }

    enableVirtualScrolling(container, options = {}) {
        const config = {
            itemHeight: options.itemHeight || 100,
            bufferSize: options.bufferSize || 5,
            ...options
        };

        const virtualScroller = new VirtualScroller(container, config);
        this.containers.set(container, virtualScroller);
        
        return virtualScroller;
    }

    disableVirtualScrolling(container) {
        const scroller = this.containers.get(container);
        if (scroller) {
            scroller.destroy();
            this.containers.delete(container);
        }
    }
}

class VirtualScroller {
    constructor(container, config) {
        this.container = container;
        this.config = config;
        this.items = [];
        this.visibleItems = [];
        this.scrollTop = 0;
        this.containerHeight = 0;
        
        this.init();
    }

    init() {
        this.container.style.overflow = 'auto';
        this.container.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Create viewport
        this.viewport = document.createElement('div');
        this.viewport.style.position = 'relative';
        this.container.appendChild(this.viewport);
        
        this.updateVisibleItems();
    }

    setItems(items) {
        this.items = items;
        this.updateVisibleItems();
    }

    handleScroll() {
        this.scrollTop = this.container.scrollTop;
        this.updateVisibleItems();
    }

    updateVisibleItems() {
        const containerHeight = this.container.clientHeight;
        const itemHeight = this.config.itemHeight;
        const bufferSize = this.config.bufferSize;
        
        const startIndex = Math.max(0, Math.floor(this.scrollTop / itemHeight) - bufferSize);
        const endIndex = Math.min(
            this.items.length - 1,
            Math.ceil((this.scrollTop + containerHeight) / itemHeight) + bufferSize
        );

        // Update viewport height
        this.viewport.style.height = `${this.items.length * itemHeight}px`;

        // Clear existing items
        this.viewport.innerHTML = '';

        // Render visible items
        for (let i = startIndex; i <= endIndex; i++) {
            const item = this.items[i];
            if (item) {
                const element = this.renderItem(item, i);
                element.style.position = 'absolute';
                element.style.top = `${i * itemHeight}px`;
                element.style.height = `${itemHeight}px`;
                this.viewport.appendChild(element);
            }
        }
    }

    renderItem(item, index) {
        // This should be overridden by the implementing class
        const element = document.createElement('div');
        element.textContent = item.toString();
        return element;
    }

    destroy() {
        this.container.removeEventListener('scroll', this.handleScroll.bind(this));
        if (this.viewport && this.viewport.parentNode) {
            this.viewport.parentNode.removeChild(this.viewport);
        }
    }
}

// Query Optimizer
class QueryOptimizer {
    constructor() {
        this.queryCache = new Map();
        this.indexedFields = new Set(['id', 'name', 'category', 'meal_type']);
    }

    optimizeQuery(query, data) {
        const cacheKey = this.generateCacheKey(query);
        
        // Check cache first
        if (this.queryCache.has(cacheKey)) {
            return this.queryCache.get(cacheKey);
        }

        // Optimize the query
        let result = data;

        // Apply filters in order of selectivity
        if (query.filters) {
            const sortedFilters = this.sortFiltersBySelectivity(query.filters);
            sortedFilters.forEach(filter => {
                result = this.applyFilter(result, filter);
            });
        }

        // Apply sorting
        if (query.sort) {
            result = this.applySort(result, query.sort);
        }

        // Apply pagination
        if (query.limit || query.offset) {
            result = this.applyPagination(result, query.limit, query.offset);
        }

        // Cache the result
        this.queryCache.set(cacheKey, result);
        
        return result;
    }

    generateCacheKey(query) {
        return JSON.stringify(query);
    }

    sortFiltersBySelectivity(filters) {
        // Sort filters by expected selectivity (most selective first)
        return filters.sort((a, b) => {
            const selectivityA = this.getFilterSelectivity(a);
            const selectivityB = this.getFilterSelectivity(b);
            return selectivityA - selectivityB;
        });
    }

    getFilterSelectivity(filter) {
        // Estimate filter selectivity (lower is more selective)
        if (filter.field === 'id') return 0.01;
        if (filter.operator === '=') return 0.1;
        if (filter.operator === 'in') return 0.3;
        if (filter.operator === 'like') return 0.7;
        return 0.5;
    }

    applyFilter(data, filter) {
        return data.filter(item => {
            const value = item[filter.field];
            
            switch (filter.operator) {
                case '=':
                    return value === filter.value;
                case '!=':
                    return value !== filter.value;
                case '>':
                    return value > filter.value;
                case '<':
                    return value < filter.value;
                case 'like':
                    return value && value.toString().toLowerCase().includes(filter.value.toLowerCase());
                case 'in':
                    return Array.isArray(filter.value) && filter.value.includes(value);
                default:
                    return true;
            }
        });
    }

    applySort(data, sort) {
        return [...data].sort((a, b) => {
            const aVal = a[sort.field];
            const bVal = b[sort.field];
            
            if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    applyPagination(data, limit, offset = 0) {
        if (!limit) return data;
        return data.slice(offset, offset + limit);
    }

    clearCache() {
        this.queryCache.clear();
    }
}

// Image Optimization
class ImageOptimizer {
    static compressImage(file, maxWidth = 800, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calculate new dimensions
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }

    static generateThumbnail(file, size = 150) {
        return this.compressImage(file, size, 0.7);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PerformanceManager,
        CacheManager,
        LazyLoader,
        VirtualScrollManager,
        QueryOptimizer,
        ImageOptimizer
    };
}
