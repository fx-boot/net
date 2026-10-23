import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const directorPortrait = existsSync(fileURLToPath(new URL('./public/media/director/acro-hat-portrait.jpg', import.meta.url)))
  ? '/media/director/acro-hat-portrait.jpg'
  : '/media/director/darkroom-placeholder.svg'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { __DIRECTOR_PORTRAIT_SRC__: JSON.stringify(directorPortrait) },
  server: { host: '127.0.0.1', port: 5173 },
})
