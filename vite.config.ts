import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvg } from "./src/icons/index";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
	proxy:{
		'/api':{
			target:'http://syt.atguigu.cn',
			changeOrigin:true,
		}
	}
  },
  plugins: [vue(),createSvg("./src/icons/icon/")],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});
