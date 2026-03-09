import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const bannerText = getBanner('Dashboard Shell')
const entryPath = path.resolve(__dirname, '../js/dashboard')
const entry = `${entryPath}.ts`

export default createViteConfig({
  entry,
  name: 'dashboard',
  fileName: () => 'dashboard.js',
  formats: ['es'],
  outDir: path.resolve(__dirname, '../dist/preview/js'),
  banner: bannerText,
  minify: false
})
