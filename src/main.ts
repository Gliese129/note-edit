import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// markdown pro
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// markdown preview
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// theme
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs
import hljs from 'highlight.js'
// vuepress
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
// codemirror 编辑器的相关资源
import Codemirror from 'codemirror'
// mode
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'
// * plugins
// mermaid
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'
//.todo list
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
// align
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'
// line number
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import print from 'vue3-print-nb'

// * markdown pro use
VueMarkdownEditor.Codemirror = Codemirror
VueMarkdownEditor.use(githubTheme, {
	Hljs: hljs
})
	.use(vuepressTheme, {
		Prism
	})
	.use(createMermaidPlugin())
	.use(createTodoListPlugin())
	.use(createAlignPlugin())
	.use(createLineNumbertPlugin())
// * markdown preview use
VueMarkdownEditor.Codemirror = Codemirror
VMdPreview.use(githubTheme, {
	Hljs: hljs
})
	.use(vuepressTheme, {
		Prism
	})
	.use(createMermaidPlugin())
	.use(createTodoListPlugin())
	.use(createAlignPlugin())
	.use(createLineNumbertPlugin())

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(VueMarkdownEditor).use(VMdPreview).use(print)
app.mount('#app')
