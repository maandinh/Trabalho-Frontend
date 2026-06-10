import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  test: {
    globals: true,
    environment: "jsdom",
  },
});
=======
  server: {
    port: 5173,
    host: true
  }
})
>>>>>>> 62f9a42b6eec0fb08220586ac5c841693823eadc
