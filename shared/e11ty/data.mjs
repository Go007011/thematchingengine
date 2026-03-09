import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export function appData(eleventyConfig) {
  eleventyConfig.addGlobalData(
    'package',
    JSON.parse(readFileSync(join(currentDir, '..', '..', 'core', 'package.json'), 'utf-8'))
  )
  eleventyConfig.addGlobalData('buildDate', new Date().toISOString())
}
