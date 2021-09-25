<template>
	<div class="markdown">
		<v-md-editor
			class="markdown"
			v-model="note"
			height="500px"
			left-toolbar="undo redo clear | tip h bold italic strikethrough quote | ul ol table | hr link code | mermaid todo-list align | save"
			:toolbar="toolbar"
			:tab-size="4"
			@save="props.saveMethod"
		></v-md-editor>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const props = defineProps({
	modelValue: String,
	saveMethod: Function
})
const emit = defineEmits(['update:modelValue'])
let note = $computed({
	get: () => props.modelValue,
	set: (val: string) => emit('update:modelValue', val)
})
const toolbar = reactive({
	mermaid: {
		title: '流程图',
		icon: 'el-icon-guide',
		action(editor: any) {
			editor.insert(function (selected: string) {
				const prefix = '```mermaid\n'
				const suffix = '\n```'
				const placeholder = '请输入mermaid语法'
				const content = selected || placeholder

				return {
					text: `${prefix}${content}${suffix}`,
					selected: content
				}
			})
		}
	},
	align: {
		title: '内容定位',
		icon: 'el-icon-rank',
		menus: [
			{
				name: 'left',
				text: '左对齐',
				action(editor: any) {
					editor.insert(function (selected: string) {
						const prefix = '::: align-left\n'
						const suffix = '\n:::'
						const placeholder = '请输入内容'
						const content = selected || placeholder

						return {
							text: `${prefix}${content}${suffix}`,
							selected: content
						}
					})
				}
			},
			{
				name: 'center',
				text: '居中',
				action(editor: any) {
					editor.insert(function (selected: string) {
						const prefix = '::: align-center\n'
						const suffix = '\n:::'
						const placeholder = '请输入内容'
						const content = selected || placeholder

						return {
							text: `${prefix}${content}${suffix}`,
							selected: content
						}
					})
				}
			},
			{
				name: 'right',
				text: '右对齐',
				action(editor: any) {
					editor.insert(function (selected: string) {
						const prefix = '::: align-right\n'
						const suffix = '\n:::'
						const placeholder = '请输入内容'
						const content = selected || placeholder

						return {
							text: `${prefix}${content}${suffix}`,
							selected: content
						}
					})
				}
			}
		]
	}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin dark {
	background-color: black;
	color: white;
}

:deep(.v-md-editor__editor-wrapper) {
	@include dark;
	textarea {
		@include dark;
	}
}
</style>
