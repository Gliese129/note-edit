<template>
	<div class="note-view">
		<div v-if="fileId && fileId > 0">
			<el-row>
				<el-col :span="12">
					<iframe class="pdf-view" :src="fileInfo.realPath"></iframe>
				</el-col>
				<el-col :offset="1" :span="11" class="note">
					<el-button type="mini" v-print="printObj">打印</el-button>
					<v-md-preview id="note" :text="note"></v-md-preview>
				</el-col>
			</el-row>
		</div>
		<el-empty v-else> 请到<router-link to="/">首页</router-link>选择pdf </el-empty>
	</div>
</template>

<script lang="ts" setup>
import fileApis from '@/apis/fileApis'
import noteApis from '@/apis/noteApis'
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
let note = $ref('')
let fileId = $computed(() => (route.params.fileId ? Number(route.params.fileId) : 0))
const fileInfo = reactive({
	id: 0,
	fileName: '',
	realPath: ''
})
const getInfoById = (id: number) => {
	if (id && id > 0) {
		fileApis.fetchFileById(id).then((response) => {
			let data = response.obj
			fileInfo.id = data.id
			fileInfo.fileName = data.fileName
			fileInfo.realPath = data.realPath
		})
		noteApis.getNoteByFile(id).then((response) => {
			let data = response.obj
			note = data.note
		})
	}
}
watch($$(fileId), (val) => {
	getInfoById(val)
})
onMounted(() => {
	getInfoById(fileId)
})
const printObj = reactive({
	id: 'note',
	popTitle: '笔记',
	extraHead: `<h4>${fileInfo.fileName}</h4>`
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.note-view {
	margin-top: 20px;
}
.pdf-view {
	height: 600px;
	width: 100%;
}
.note {
	height: 600px;
	overflow: auto;
}
</style>
