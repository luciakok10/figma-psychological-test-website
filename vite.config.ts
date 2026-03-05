import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 這是解決 404 的關鍵：確保路徑對準你的 GitHub 專案名稱
  base: '/figma-psychological-test-website/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
  assetsInclude: ['**/*.svg', '**/*.csv'],
})