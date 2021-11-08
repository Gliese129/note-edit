<template>
	<div class="note-edit">
		<div v-if="fileId && fileId > 0">
			<el-row>
				<el-col :span="9">
					<iframe class="pdf-view" :src="fileInfo.realPath"></iframe>
				</el-col>
				<el-col :offset="1" :span="14">
					<markdown v-model="note" :save-method="save" />
				</el-col>
			</el-row>
		</div>
		<el-empty v-else> 请到<router-link to="/">首页</router-link>选择pdf </el-empty>
	</div>
</template>

<script lang="ts" setup>
import fileApis from '@/apis/fileApis'
import noteApis from '@/apis/noteApis'
import Markdown from '@/components/Markdown.vue'
import ElMessage from '@/utils/ElMessage'
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

const save = (text: string, html: string) => {
	noteApis.saveNote(fileId, text).then((response) => {
		if (response.code === 200) ElMessage.success('保存成功!')
	})
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.note-edit {
	margin-top: 20px;
	* {
		width: 100%;
	}
	.pdf-view {
		height: 500px;
	}
}
</style>
