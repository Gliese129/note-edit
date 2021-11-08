<template>
	<div class="file-view">
		<el-icon v-if="props.type === 'folder'">
			<folder-opened v-show="props.opened" />
			<folder v-show="!props.opened" />
		</el-icon>
		<el-icon v-else>
			<document />
		</el-icon>
		<span icon="el-icon-folder" class="name">{{ props.name }}</span>
	</div>
</template>

<script lang="ts" setup>
import { Folder, FolderOpened, Document } from '@element-plus/icons'

const props = defineProps({
	name: String,
	type: String,
	opened: Boolean
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.file-view {
	.icon {
		display: inline-block;
		width: 100px;
		height: 100px;
		zoom: 0.2;
	}
	.name {
		line-height: 100%;
	}
}

.folder {
	background-image: url('@/assets/file-icon/folder.png');
}
.pdf {
	background-image: url('@/assets/file-icon/pdf.png');
}
</style>
