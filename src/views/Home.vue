<template>
	<div class="home">
		<el-tree :props="treeProps" :load="loadNode" lazy>
			<template #default="{ node, data }">
				<el-popover
					placement="right"
					:width="100"
					trigger="click"
					v-if="data.type !== 'folder'"
				>
					<template #reference>
						<file-view :name="data.name" :type="data.type" />
					</template>
					<el-button-group>
						<el-button @click="viewNote(data.id)">查看笔记</el-button>
						<el-button @click="editNote(data.id)">编辑笔记</el-button>
					</el-button-group>
				</el-popover>
				<file-view v-else :name="data.name" :type="data.type" />
			</template>
		</el-tree>
	</div>
</template>

<script lang="ts" setup>
import FileView from '@/components/FileView.vue'
import { reactive } from 'vue'
import type { ITreeNode } from '@/global/entity/Tree'
import fileApis from '@/apis/fileApis'
import { fileInfoToNode } from '@/utils/file'

const treeProps = reactive({
	label: 'name',
	children: 'children',
	isLeaf: 'leaf'
})
const loadNode = (node: any, resolve: any) => {
	let nodeData = node.data
	if (node.level === 0) {
		// * 加载根目录
		fileApis.fetchRootFolders().then((response) => {
			let data = response.obj
			resolve(fileInfoToNode(data))
		})
	} else {
		fileApis.fetchChildrenFiles(nodeData.id).then((response) => {
			let data = response.obj
			resolve(fileInfoToNode(data))
		})
	}
}
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const editNote = (fileId: number) => {
	store.commit('file/setFileId', fileId)
	router.push({
		path: `/note-edit/${fileId}`
	})
}
const viewNote = (fileId: number) => {
	store.commit('file/setFileId', fileId)
	router.push({
		path: `/note-view/${fileId}`
	})
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
	margin-top: 10px;
}
.el-tree {
	width: 90%;
	margin: auto;
}
</style>
