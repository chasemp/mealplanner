#!/usr/bin/env node

// Development helper script to manage caching issues
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const commands = {
  'clear-cache': () => {
    console.log('🧹 Clearing development caches...')
    
    // Clear Vite cache
    try {
      execSync('rm -rf node_modules/.vite', { stdio: 'inherit' })
      console.log('✅ Cleared Vite cache')
    } catch (e) {
      console.log('⚠️  Vite cache already clear')
    }
    
    // Clear dist folder
    try {
      execSync('rm -rf dist', { stdio: 'inherit' })
      console.log('✅ Cleared dist folder')
    } catch (e) {
      console.log('⚠️  Dist folder already clear')
    }
    
    console.log('🎉 Cache clearing complete!')
  },
  
  'restart-dev': () => {
    console.log('🔄 Restarting development server...')
    
    // Kill existing Vite processes
    try {
      execSync('pkill -f "vite"', { stdio: 'inherit' })
      console.log('✅ Stopped existing Vite processes')
    } catch (e) {
      console.log('⚠️  No existing Vite processes found')
    }
    
    // Wait a moment
    execSync('sleep 2')
    
    // Clear cache
    commands['clear-cache']()
    
    // Start dev server
    console.log('🚀 Starting fresh development server...')
    execSync('npm run dev', { stdio: 'inherit' })
  },
  
  'test-fresh': () => {
    console.log('🧪 Running tests with fresh environment...')
    
    // Clear cache first
    commands['clear-cache']()
    
    // Run tests
    execSync('npm run test:all', { stdio: 'inherit' })
  },
  
  'help': () => {
    console.log(`
🛠️  MealPlanner Development Helper

Available commands:
  clear-cache   - Clear all development caches
  restart-dev   - Restart development server with fresh cache
  test-fresh    - Run all tests with cleared cache
  help          - Show this help message

Usage:
  node scripts/dev-helper.js <command>
  npm run dev:helper <command>
`)
  }
}

const command = process.argv[2]

if (!command || !commands[command]) {
  commands.help()
  process.exit(1)
}

commands[command]()
