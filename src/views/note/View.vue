<template>
	<div class="note-view">
		<div v-if="fileId && fileId > 0">
			<el-row>
				<file-info :editable="false" :file="fileInfo" />
			</el-row>
			<el-row class="main">
				<el-col :span="12">
					<iframe class="pdf-view" :src="fileInfo.realPath"></iframe>
				</el-col>
				<el-col :offset="1" :span="11" class="note">
					<el-button type="mini" v-print="printObj">打印</el-button>
					<v-md-preview id="note" :text="note"></v-md-preview>
				</el-col>
			</el-row>
		</div>
		<el-empty v-else> 请到<el-link href="/" type="primary">首页</el-link>选择pdf </el-empty>
	</div>
</template>

<script lang="ts" setup>
import FileInfo from '@/components/FileInfo.vue'
import noteApis from '@/apis/noteApis'
import { reactive } from 'vue'
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

const getNoteById = async (id: number) => {
	let response = await noteApis.getNoteByFile(id)
	let data = response.obj
	note = data ? data.note : ''
}

const printObj = reactive({
	id: 'note',
	popTitle: '笔记',
	extraHead: `<h4>${fileInfo.fileName}</h4>`
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
	height: 600px;
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
