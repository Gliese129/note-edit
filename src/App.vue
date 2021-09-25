<template>
	<el-menu class="el-menu-demo" mode="horizontal" router>
		<el-menu-item index="/">主页</el-menu-item>
		<el-menu-item index="/upload">上传</el-menu-item>
		<el-menu-item :index="`/note-view/${fileId}`">查看</el-menu-item>
		<el-menu-item :index="`/note-edit/${fileId}`">编辑</el-menu-item>
		<el-menu-item index="4">
			<el-link href="https://www.ilovepdf.com/" target="_blank"> I love pdf </el-link>
		</el-menu-item>
	</el-menu>
	<router-view />
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore()
let fileId = $computed(() => store.state.file.fileId)
</script>

<style lang="scss">
.el-menu-item,
.el-sub-menu {
	width: 15%;
	min-width: 200px;
	text-align: center;
}
</style>
