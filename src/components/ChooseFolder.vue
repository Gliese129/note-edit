<template>
	<div class="choose-folder">
		<h3>请选择位置</h3>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item
				v-if="props.allowUnexistFolder"
				v-for="(part, index) in path"
				:key="index"
			>
				<el-autocomplete
					class="path-input"
					size="mini"
					v-model="path[index]"
					@input="autoSetLength(index)"
					@click="focusIndex = index"
					@focus="focusIndex = index"
					:fetch-suggestions="querySearch"
					clearable
				/>
			</el-breadcrumb-item>
			<el-breadcrumb-item v-else>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script lang="ts" setup>
import fileApis from '@/apis/fileApis'
import type { IFileInfo } from '@/global/entity/File'
import { fileInfoToNode } from '@/utils/file'
import { reactive, watch } from 'vue'

const props = defineProps({
	allowUnexistFolder: Boolean,
	pathArray: Array
})
const emit = defineEmits(['update:pathArray'])
let path = $computed<string[]>({
	get: () => props.pathArray,
	set: (value: string[]) => emit('update:pathArray', value)
})
const folderId = reactive<number[]>([0])
const autoSetLength = (pos: number) => {
	while (path.length > pos + 1) {
		path.pop()
		folderId.pop()
	}
	path.push('')
	folderId.push(0)
}

let focusIndex = $ref(0)
watch($$(focusIndex), () => {
	flag = true
})

let advice = [] as any[] // * 符合条件的文件夹数组（无需响应）
let flag = $ref(true) // * 判断是否重新建议列表是否需要更新
const fetchSuggestion = async (pos: number) => {
	focusIndex = pos
	let usefulPath = [] as string[]
	for (let i = 0; i < focusIndex; ++i) usefulPath.push(path[i])
	while (advice.length > 0) advice.pop()
	let response = await fileApis.fetchChildrenByPath(usefulPath)
	let data = response.obj as IFileInfo[]
	flag = false
	advice = fileInfoToNode(data)
}
const querySearch = async (queryString: string, cb: any) => {
	if (flag) await fetchSuggestion(focusIndex)
	let results = [] as any[]
	for (let i = 0; i < advice.length; ++i) {
		let folder = advice[i]
		if (queryString) {
			if (folder.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
				results.push({ value: folder.name })
		} else results.push({ value: folder.name })
	}
	// 调用 callback 返回建议列表的数据
	cb(results)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.choose-folder {
	--input-width: 120px;
	:deep(.path-input) {
		width: var(--input-width);
	}
}
</style>
