<template>
	<div class="file-info">
		<h4 v-if="props.editable">
			<el-input v-model="fileName" clearable @change="emits('name-change', fileName)">
				<template #append>.pdf</template>
			</el-input>
		</h4>
		<h4 v-else>{{ fileInfo.fileName }}</h4>
		<el-button-group>
			<el-button
				size="mini"
				v-clipboard:copy="fileInfo.fileName"
				v-clipboard:success="copySuccess"
			>
				复制文件名
			</el-button>
			<el-button size="mini" v-clipboard:copy="fileUrl" v-clipboard:success="copySuccess">
				复制文件地址
			</el-button>
		</el-button-group>
	</div>
</template>

<script lang="ts" setup>
import type { IFileInfo } from '@/global/entity/File'
import { useRoute } from 'vue-router'
import ElMessage from '@/utils/ElMessage'
const route = useRoute()
const props = defineProps({
	editable: Boolean,
	file: Object
})
const emits = defineEmits(['name-change'])
let fileInfo = $computed(() => {
	let file = props.file as IFileInfo
	if (file) {
		fileName = file.fileName
	}
	return file as IFileInfo
})
let fileUrl = $computed(() =>
	window.location.href
		.replace(route.fullPath, ('/' + fileInfo.realPath) as string)
		.replace(/\\/, '/')
		.replace(/\/#/, '')
)
let fileName = $ref('')

const copySuccess = () => {
	ElMessage.success('复制成功!')
}
</script>

<style lang="scss" scoped>
.file-info {
	h4 {
		margin-bottom: 5px;
	}
}
</style>
