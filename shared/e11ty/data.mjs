import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const rootDir = join(currentDir, '..', '..')

function loadLocalEnv() {
  const envPath = join(rootDir, '.env')
  if (!existsSync(envPath)) {
    return
  }

  const fileContents = readFileSync(envPath, 'utf-8')

  fileContents.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      return
    }

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) {
      return
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    if (!key || process.env[key]) {
      return
    }

    let value = trimmed.slice(separatorIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    process.env[key] = value
  })
}

export function appData(eleventyConfig) {
  loadLocalEnv()
  eleventyConfig.addGlobalData(
    'package',
    JSON.parse(readFileSync(join(currentDir, '..', '..', 'core', 'package.json'), 'utf-8'))
  )
  eleventyConfig.addGlobalData('buildDate', new Date().toISOString())
  eleventyConfig.addGlobalData('runtimeConfig', {
    azureFunctionEndpoint: process.env.NEXT_PUBLIC_AZURE_FUNCTION_ENDPOINT || '',
    enforcementEngineEndpoint: process.env.NEXT_PUBLIC_ENFORCEMENT_ENGINE_ENDPOINT || ''
  })
}
