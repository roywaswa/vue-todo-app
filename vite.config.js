import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `
  //         @import "./src/assets/sass/_variables.scss";
  //         @import "./src/assets/sass/_mixins.scss";
  //       `
  //     }
  //   }
  // }
})
