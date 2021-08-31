import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Upload from '@/views/Upload.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/upload',
		name: 'Upload',
		component: Upload
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
