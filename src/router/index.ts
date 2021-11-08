import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ElMessage from '@/utils/ElMessage'
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
		path: '/note/edit/:fileId',
		name: 'NoteEdit',
		component: NoteEdit,
		meta: {
			hasNote: true
		}
	},
	{
		path: '/note/view/:fileId',
		name: 'NoteView',
		component: NoteView,
		meta: {
			hasNote: true
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.meta.hasNote) {
		if (to.params.fileId && to.params.fileId !== '0') {
			next()
		} else {
			ElMessage.warning('请先选择文件')
			next({
				name: 'Home'
			})
		}
	} else next()
})

export default router
