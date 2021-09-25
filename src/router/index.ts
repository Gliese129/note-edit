import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Upload from '@/views/upload/Main.vue'
import NoteEdit from '@/views/note-edit/Main.vue'
import NoteView from '@/views/note-view/Main.vue'

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
	},
	{
		path: '/note-edit/:fileId',
		name: 'NoteEdit',
		component: NoteEdit
	},
	{
		path: '/note-view/:fileId',
		name: 'NoteView',
		component: NoteView
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
