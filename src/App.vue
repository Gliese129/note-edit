<template>
	<el-menu class="el-menu-demo" mode="horizontal" router>
		<el-menu-item index="/">主页</el-menu-item>
		<el-sub-menu index="2">
			<template #title>工作台</template>
			<el-menu-item index="/note-edit">笔记</el-menu-item>
			<el-menu-item index="/upload">上传</el-menu-item>
		</el-sub-menu>
	</el-menu>
	<router-view />
</template>
<script lang="ts" setup></script>

<style lang="scss">
.el-menu-item,
.el-sub-menu {
	width: 15%;
	min-width: 200px;
	text-align: center;
}
</style>
