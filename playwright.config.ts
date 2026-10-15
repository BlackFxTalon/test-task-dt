import { defineConfig } from '@playwright/test'

const port = 3100

export default defineConfig({
  testDir: 'tests/e2e',
  workers: 1,
  use: {
    baseURL: `http://localhost:${port}`
  },
  webServer: [
    {
      command: 'node tests/e2e/stub-api.mjs',
      port: 4010,
      reuseExistingServer: !process.env.CI
    },
    {
      command: 'npm run build && node .output/server/index.mjs',
      port,
      timeout: 180_000,
      reuseExistingServer: !process.env.CI,
      env: {
        PORT: String(port),
        NUXT_ALIAS: 'e2e',
        NUXT_API_BASE: 'http://localhost:4010'
      }
    }
  ]
})
