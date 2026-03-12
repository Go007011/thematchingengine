import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const patterns = [/\/\/ prettier-ignore[\s]*/g]
const outputRoot = process.env.PREVIEW_OUTPUT_DIR || 'dist'

function getHtmlFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      return getHtmlFiles(fullPath)
    }

    return fullPath.endsWith('.html') ? [fullPath] : []
  })
}

getHtmlFiles(outputRoot).forEach((file) => {
  let content = readFileSync(file, 'utf8')
  let modified = false

  patterns.forEach((pattern) => {
    const nextContent = content.replace(pattern, '')

    if (nextContent !== content) {
      content = nextContent
      modified = true
    }
  })

  if (modified) {
    writeFileSync(file, content)
    console.log(`Cleaned: ${file}`)
  }
})
