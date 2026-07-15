import { defineConfig } from 'vite'
import react from '@vitejs/react-plugin'

export default defineConfig({
  plugins: [react()],
  base: '/cyber-practical/', // Add your repository name wrapped in slashes
})
