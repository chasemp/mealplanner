// Vitest setup file for unit and integration tests
import { vi } from 'vitest'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

// Load environment variables from .env.test for GitHub integration tests
dotenv.config({ path: '.env.test' })

// Polyfill fetch for Node.js environment
global.fetch = fetch

// Mock localStorage for tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock IndexedDB for SQLite storage tests
global.indexedDB = {
  open: vi.fn(),
  deleteDatabase: vi.fn(),
}

// Mock File API for database import/export tests
global.File = class File {
  constructor(chunks, filename, options = {}) {
    this.chunks = chunks
    this.name = filename
    this.type = options.type || ''
    this.size = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  }
}

global.FileReader = class FileReader {
  constructor() {
    this.result = null
    this.error = null
    this.readyState = 0
    this.onload = null
    this.onerror = null
  }
  
  readAsArrayBuffer(file) {
    setTimeout(() => {
      this.readyState = 2
      this.result = new ArrayBuffer(file.size)
      if (this.onload) this.onload()
    }, 0)
  }
}

// Mock URL.createObjectURL for file downloads and URL constructor
global.URL = class MockURL {
  constructor(url, base) {
    this.href = url
    this.protocol = 'https:'
    this.hostname = 'github.com'
    this.pathname = '/test/repo'
  }
  
  static createObjectURL = vi.fn(() => 'mock-blob-url')
  static revokeObjectURL = vi.fn()
}

// Mock sql.js for database tests
vi.mock('sql.js', () => ({
  default: vi.fn(() => Promise.resolve({
    Database: class MockDatabase {
      constructor() {
        this.data = new Map()
      }
      
      exec(sql) {
        // Simple mock implementation
        if (sql.includes('SELECT')) {
          return [{ columns: ['count'], values: [[0]] }]
        }
        return []
      }
      
      close() {}
      
      export() {
        return new Uint8Array([1, 2, 3, 4]) // Mock database export
      }
    }
  }))
}))

// Mock window.matchMedia for PWA tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock navigator for PWA tests
Object.defineProperty(navigator, 'serviceWorker', {
  writable: true,
  value: {
    register: vi.fn(() => Promise.resolve({
      installing: null,
      waiting: null,
      active: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
    ready: Promise.resolve({
      installing: null,
      waiting: null,
      active: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  },
})

// Mock global objects that main.js expects
global.window = global.window || {}
window.itineraryViews = {}
window.calendarViews = {}

// Mock window.confirm for tests
window.confirm = vi.fn(() => true)

// Mock SecureTokenStorage for settings tests
global.SecureTokenStorage = class MockSecureTokenStorage {
  constructor() {
    this.storage = new Map()
  }
  
  async storeToken(key, token) {
    this.storage.set(key, token)
    return Promise.resolve()
  }
  
  async getToken(key) {
    return Promise.resolve(this.storage.get(key) || null)
  }
  
  async clearToken(key) {
    this.storage.delete(key)
    return Promise.resolve()
  }
  
  async clearAllTokens() {
    this.storage.clear()
    return Promise.resolve()
  }
}

// Mock Notification API for PWA tests
global.Notification = class MockNotification {
  constructor(title, options) {
    this.title = title
    this.options = options
  }
  
  static get permission() {
    return 'granted'
  }
  
  static requestPermission() {
    return Promise.resolve('granted')
  }
}

// Mock console methods to avoid noise in tests
const originalConsole = global.console
global.console = {
  ...originalConsole,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}

// Mock ServiceWorkerRegistration for PWA tests
global.ServiceWorkerRegistration = class MockServiceWorkerRegistration {
  constructor() {
    this.sync = {
      register: vi.fn(() => Promise.resolve())
    }
  }
}

// Mock BarcodeDetector for barcode scanning tests
global.BarcodeDetector = class MockBarcodeDetector {
  constructor() {
    this.formats = ['qr_code', 'code_128', 'ean_13']
  }
  
  static getSupportedFormats() {
    return Promise.resolve(['qr_code', 'code_128', 'ean_13'])
  }
  
  detect(imageData) {
    return Promise.resolve([])
  }
}

// Setup DOM testing utilities
beforeEach(() => {
  document.body.innerHTML = ''
  localStorageMock.clear.mockClear()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  
  // Reset global objects
  window.itineraryViews = {}
  window.calendarViews = {}
  
  // Reset mocks
  if (window.confirm && typeof window.confirm.mockReturnValue === 'function') {
    window.confirm.mockReturnValue(true)
  }
  if (console.log && typeof console.log.mockClear === 'function') {
    console.log.mockClear()
  }
  if (console.warn && typeof console.warn.mockClear === 'function') {
    console.warn.mockClear()
  }
  if (console.error && typeof console.error.mockClear === 'function') {
    console.error.mockClear()
  }
  if (console.info && typeof console.info.mockClear === 'function') {
    console.info.mockClear()
  }
})
