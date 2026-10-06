import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' so the built prototype can be dropped on any static host (or a sub-path) as-is.
export default defineConfig({
  base: './',
  plugins: [react()],
})
