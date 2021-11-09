<template>
	<div class="note-edit">
		<div v-if="fileId && fileId > 0">
			<file-info :editable="true" :file="fileInfo" @name-change="handleFileNameChange" />
			<el-row class="main">
				<el-col :span="9">
					<iframe class="pdf-view" :src="fileInfo.realPath"></iframe>
				</el-col>
				<el-col :offset="1" :span="14">
					<markdown v-model="note" :save-method="save" />
				</el-col>
			</el-row>
		</div>
		<el-empty v-else> 请到<el-link href="/" type="primary">首页</el-link>选择pdf </el-empty>
	</div>
</template>

<script lang="ts" setup>
import FileInfo from '@/components/FileInfo.vue'
import fileApis from '@/apis/fileApis'
import noteApis from '@/apis/noteApis'
import Markdown from '@/components/Markdown.vue'
import ElMessage from '@/utils/ElMessage'
import { onBeforeUnmount, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

let note = $ref('')
let fileId = $computed(() => {
	let id = store.state.file.fileId
	if (id) {
		getNoteById(id)
		return id
	}
	return 0
})
let fileInfo = $computed(() => {
	return {
		fileId: store.state.file.fileId,
		fileName: store.state.file.fileName,
		realPath: store.state.file.realPath
	}
})
let fileName = $ref('')
const handleFileNameChange = (value: string) => {
	fileName = value
}
const getNoteById = async (id: number) => {
	let response = await noteApis.getNoteByFile(id)
	let data = response.obj
	note = data ? data.note : ''
}

let ableSave = true
const save = async (text: string, html: string) => {
	if (!ableSave) return
	ableSave = false
	if (fileName !== fileInfo.fileName) {
		fileApis.updateFileInfo({
			id: fileInfo.fileId,
			fileName: fileName
		})
	}
	let response = await noteApis.saveNote(fileId, text)
	if (response.code === 200) ElMessage.success('保存成功!')
	setTimeout(() => {
		ableSave = true
	}, 1000)
}

// capture ctrl+s
let saveListener: any = null
onMounted(() => {
	saveListener = window.addEventListener('keydown', (e) => {
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault()
			save(note, '')
		}
	})
})
onBeforeUnmount(() => {
	window.removeEventListener('keydown', saveListener)
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
	height: 500px;
	.pdf-view {
		height: 100%;
		width: 100%;
	}
	.note {
		height: 100%;
		overflow: auto;
	}
}
</style>
