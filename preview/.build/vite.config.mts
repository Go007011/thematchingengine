import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const bannerText = getBanner('Dashboard Shell')
const entryPath = path.resolve(__dirname, '../js/dashboard')
const entry = `${entryPath}.ts`
const previewOutputRoot = process.env.PREVIEW_OUTPUT_DIR || 'dist'
const azureFunctionsShim = path.resolve(__dirname, './azure-functions-shim.ts')

const baseConfig = createViteConfig({
  entry,
  name: 'dashboard',
  fileName: () => 'dashboard.js',
  formats: ['es'],
  outDir: path.resolve(__dirname, '..', previewOutputRoot, 'preview/js'),
  banner: bannerText,
  minify: false
})

export default defineConfig({
  ...baseConfig,
  resolve: {
    alias: {
      '../../services/azureFunctions/index': azureFunctionsShim
    }
  }
})
