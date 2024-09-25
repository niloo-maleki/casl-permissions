import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins:[react()],
  // server:{
  //   proxy:{
  //     '/api':{
  //       target: 'https://localhost:44310',
  //       changeOrigin:true,
  //       secure:false
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@icons': resolve(__dirname, 'src/assets/svg'),
    },
  },
})
