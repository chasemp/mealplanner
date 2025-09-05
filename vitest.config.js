import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load environment variables from .env.test
  const env = loadEnv(mode, process.cwd(), ['GITHUB_'])
  
  return {
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.js'],
      env: env,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['**/e2e/**', '**/node_modules/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
        'dist/'
      ]
    }
  },
  // Ensure sql.js WASM files are handled properly in tests
  assetsInclude: ['**/*.wasm']
  }
})
