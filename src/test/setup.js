// Vitest setup file for unit and integration tests
import { vi } from 'vitest'

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

// Mock URL.createObjectURL for file downloads
global.URL = {
  createObjectURL: vi.fn(() => 'mock-blob-url'),
  revokeObjectURL: vi.fn(),
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

// Setup DOM testing utilities
beforeEach(() => {
  document.body.innerHTML = ''
  localStorageMock.clear.mockClear()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
})
