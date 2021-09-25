import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			script: {
				refSugar: true
			}
		})
	],
	base: './',
	server: {
		open: true,
		host: 'localhost',
		port: 80,
		https: false,
		proxy: {
			'/api': {
				target: 'http://101.132.79.206:8081',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	publicDir: 'public/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/')
		}
	},
	optimizeDeps: {
		include: ['@kangc/v-md-editor/lib/plugins/line-number/index.js']
	}
})
