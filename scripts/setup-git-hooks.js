#!/usr/bin/env node

// Setup Git Hooks for MealPlanner
// This script installs the pre-commit hook to prevent test regressions

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const hooksDir = path.join(projectRoot, '.git', 'hooks');
const preCommitHook = path.join(hooksDir, 'pre-commit');

console.log('🔧 Setting up Git hooks for MealPlanner...');

// Check if .git directory exists
if (!fs.existsSync(path.join(projectRoot, '.git'))) {
    console.error('❌ Error: .git directory not found. Make sure you\'re in a Git repository.');
    process.exit(1);
}

// Create hooks directory if it doesn't exist
if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
    console.log('📁 Created .git/hooks directory');
}

// Pre-commit hook content
const preCommitContent = `#!/bin/bash

# MealPlanner Pre-Commit Hook
# Prevents commits that would introduce test regressions
# 
# This hook runs:
# 1. Unit tests (including critical Clear All and demo data tests)
# 2. Integration tests
# 3. Linting checks
# 4. Version consistency checks
#
# If any tests fail, the commit is blocked with detailed error information.

set -e  # Exit on any error

echo "🔍 MealPlanner Pre-Commit Hook: Running tests to prevent regressions..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "\${color}\${message}\${NC}"
}

# Function to run a command and capture its output
run_test() {
    local test_name=$1
    local command=$2
    
    print_status $BLUE "🧪 Running \${test_name}..."
    
    if output=$(eval $command 2>&1); then
        print_status $GREEN "✅ \${test_name} passed"
        return 0
    else
        print_status $RED "❌ \${test_name} failed"
        echo "Error output:"
        echo "$output"
        return 1
    fi
}

# Track overall success
overall_success=true

# 1. Run Unit Tests (including critical regression tests)
print_status $YELLOW "📋 Step 1: Unit Tests"
if ! run_test "Unit Tests" "npm run test:run -- src/test/unit/"; then
    overall_success=false
    print_status $RED "💥 CRITICAL: Unit tests failed - this includes Clear All and demo data regression tests!"
fi

# 2. Run Integration Tests
print_status $YELLOW "📋 Step 2: Integration Tests"
if ! run_test "Integration Tests" "npm run test:run -- src/test/integration/"; then
    overall_success=false
    print_status $RED "💥 Integration tests failed!"
fi

# 3. Run Regression Tests
print_status $YELLOW "📋 Step 3: Regression Tests"
if ! run_test "Regression Tests" "npm run test:run -- src/test/regression/"; then
    overall_success=false
    print_status $RED "💥 Regression tests failed!"
fi

# 4. Check for console.log statements in production code (optional warning)
print_status $YELLOW "📋 Step 4: Code Quality Checks"
if git diff --cached --name-only | grep -E '\\.(js|ts)$' | grep -v test | xargs grep -l "console\\.log" 2>/dev/null; then
    print_status $YELLOW "⚠️  WARNING: Found console.log statements in production code. Consider removing them."
    echo "Files with console.log:"
    git diff --cached --name-only | grep -E '\\.(js|ts)$' | grep -v test | xargs grep -l "console\\.log" 2>/dev/null || true
fi

# 5. Check version consistency (if version was updated)
if git diff --cached --name-only | grep -q "update-version.cjs\\|package.json"; then
    print_status $YELLOW "📋 Step 5: Version Consistency Check"
    if ! run_test "Version Consistency" "npm run version:check"; then
        print_status $YELLOW "⚠️  Version consistency check failed. Run 'npm run version:update' if you made JavaScript changes."
    fi
fi

# Final result
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$overall_success" = true ]; then
    print_status $GREEN "🎉 All tests passed! Commit allowed."
    print_status $GREEN "✨ No regressions detected in Clear All, demo data, or other critical functionality."
    exit 0
else
    print_status $RED "🚫 COMMIT BLOCKED: Tests failed!"
    print_status $RED ""
    print_status $RED "To fix this:"
    print_status $RED "1. Review the test failures above"
    print_status $RED "2. Fix the failing tests or code"
    print_status $RED "3. Run tests manually: npm run test:run"
    print_status $RED "4. Try committing again"
    print_status $RED ""
    print_status $RED "For Clear All/demo data issues, check:"
    print_status $RED "- js/settings-manager.js (demo data flag logic)"
    print_status $RED "- js/main.js (clearAllData implementation)"
    print_status $RED "- src/test/unit/clear-all-and-demo-data.test.js"
    exit 1
fi`;

try {
    // Write the pre-commit hook
    fs.writeFileSync(preCommitHook, preCommitContent);
    
    // Make it executable
    fs.chmodSync(preCommitHook, 0o755);
    
    console.log('✅ Pre-commit hook installed successfully!');
    console.log('');
    console.log('🎯 What this hook does:');
    console.log('  • Runs unit tests (including Clear All regression tests)');
    console.log('  • Runs integration tests');
    console.log('  • Runs regression tests');
    console.log('  • Checks code quality');
    console.log('  • Validates version consistency');
    console.log('');
    console.log('🚫 Commits will be blocked if any tests fail');
    console.log('✨ This prevents regressions in critical functionality');
    console.log('');
    console.log('To test the hook: git commit (it will run automatically)');
    console.log('To bypass the hook (not recommended): git commit --no-verify');
    
} catch (error) {
    console.error('❌ Error setting up Git hooks:', error.message);
    process.exit(1);
}
