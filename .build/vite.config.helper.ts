import path from 'node:path'
import { defineConfig, type UserConfig } from 'vite'

interface CreateViteConfigOptions {
  entry: string
  name?: string
  fileName: string | ((format: string) => string)
  formats: ('es' | 'umd' | 'iife' | 'cjs')[]
  outDir: string
  banner?: string
  minify?: boolean | 'esbuild'
}

export function createViteConfig({
  entry,
  name,
  fileName,
  formats,
  outDir,
  banner,
  minify = false
}: CreateViteConfigOptions): UserConfig {
  const rollupOutput: {
    generatedCode: {
      constBindings: boolean
    }
    banner?: string
  } = {
    generatedCode: {
      constBindings: true
    }
  }

  if (banner) {
    rollupOutput.banner = banner
  }

  const config: UserConfig = {
    build: {
      lib: {
        entry: path.resolve(entry),
        name,
        fileName: typeof fileName === 'function' ? fileName : () => fileName,
        formats
      },
      outDir: path.resolve(outDir),
      emptyOutDir: false,
      sourcemap: true,
      rollupOptions: {
        output: rollupOutput
      },
      target: 'es2015',
      minify
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    esbuild: {
      target: 'es2015',
      tsconfigRaw: {
        compilerOptions: {
          module: 'ES2020',
          target: 'ES2015'
        }
      }
    }
  }

  return defineConfig(config)
}
