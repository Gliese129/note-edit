<template>
	<div class="upload-file">
		<el-upload
			class="upload-demo"
			drag
			action="/api/file/upload"
			accept=".pdf"
			:data="{ path: fullPath }"
			:file-list="fileList"
			:before-upload="view"
			:on-success="handleSuccess"
			:on-error="alertError"
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<template #tip>
				<div class="el-upload__tip">只能上传 pdf 文件，且不超过 10M</div>
			</template>
		</el-upload>
	</div>
</template>

<script lang="ts" setup>
import ElMessage from '@/utils/ElMessage'
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps({
	fileName: String
})
let folderPath = $computed(() => store.state.file.folderPath)
let fileName = $ref('')
let fullPath = $computed(
	() =>
		folderPath + (props.fileName && props.fileName !== '' ? props.fileName + '.pdf' : fileName)
)
const fileList = reactive([])
const view = (file: any) => {
	fileName = file.name
	if (folderPath == '') {
		ElMessage.warning('文件必须放在某文件夹下')
		throw new Error('no root folder')
	}
}
const handleSuccess = (response: any, file: File, fileList: File[]) => {
	let code = response.code
	if (code == 500) ElMessage.error('文件不能重名!')
	if (code == 200) {
		fileName = ''
	}
}
const alertError = (err: any, file: File, fileList: File[]) => {
	if (err.code === 413) ElMessage.warning('文件过大!')
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
