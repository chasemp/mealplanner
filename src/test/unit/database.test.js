// Unit tests for database operations
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { initializeDatabase, DATABASE_SCHEMA } from '../../database/schema.js'

describe('Database Schema', () => {
  let mockDb

  beforeEach(() => {
    mockDb = {
      exec: vi.fn(),
      close: vi.fn()
    }
  })

  it('should initialize database with correct schema', () => {
    mockDb.exec.mockReturnValue([{ columns: ['count'], values: [[0]] }])
    
    const result = initializeDatabase(mockDb)
    
    expect(result).toBe(true)
    expect(mockDb.exec).toHaveBeenCalledWith(DATABASE_SCHEMA)
  })

  it('should handle database initialization errors', () => {
    mockDb.exec.mockImplementation(() => {
      throw new Error('Database error')
    })
    
    const result = initializeDatabase(mockDb)
    
    expect(result).toBe(false)
  })

  it('should add sample recipes to empty database', () => {
    // Mock empty database (0 recipes)
    mockDb.exec.mockReturnValue([{ columns: ['count'], values: [[0]] }])
    
    initializeDatabase(mockDb)
    
    // Should call exec three times: schema, count check, sample data
    expect(mockDb.exec).toHaveBeenCalledTimes(3)
  })

  it('should not add sample recipes to populated database', () => {
    // Mock database with existing recipes
    mockDb.exec.mockReturnValue([{ columns: ['count'], values: [[5]] }])
    
    initializeDatabase(mockDb)
    
    // Should call exec twice: schema and count check (no sample data)
    expect(mockDb.exec).toHaveBeenCalledTimes(2)
  })
})

describe('Database Schema Structure', () => {
  it('should contain all required tables', () => {
    const schema = DATABASE_SCHEMA
    
    expect(schema).toContain('CREATE TABLE IF NOT EXISTS ingredients')
    expect(schema).toContain('CREATE TABLE IF NOT EXISTS recipes')
    expect(schema).toContain('CREATE TABLE IF NOT EXISTS recipe_ingredients')
    expect(schema).toContain('CREATE TABLE IF NOT EXISTS meal_plans')
    expect(schema).toContain('CREATE TABLE IF NOT EXISTS scheduled_meals')
    expect(schema).toContain('CREATE TABLE IF NOT EXISTS pantry_items')
    expect(schema).toContain('CREATE TABLE IF NOT EXISTS grocery_lists')
  })

  it('should include common ingredients', () => {
    const schema = DATABASE_SCHEMA
    
    expect(schema).toContain("'Red Onion'")
    expect(schema).toContain("'Chicken Breast'")
    expect(schema).toContain("'Olive Oil'")
    expect(schema).toContain("'Milk'")
  })
})
