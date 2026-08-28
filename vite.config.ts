import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/ChrisLum-WebsitePortfolio/' : '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'spa-github-pages-fallback',
      closeBundle() {
        const indexPath = resolve('dist/index.html')
        if (existsSync(indexPath)) {
          copyFileSync(indexPath, resolve('dist/404.html'))
        }
      },
    },
  ],
})
