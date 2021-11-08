<template>
	<el-container>
		<el-header>
			<el-menu mode="horizontal" router class="head">
				<el-menu-item index="/">主页</el-menu-item>
				<el-menu-item index="4">
					<el-link href="https://www.ilovepdf.com/" target="_blank"> I love pdf </el-link>
				</el-menu-item>
			</el-menu>
		</el-header>
		<el-container>
			<el-aside width="null">
				<el-menu router :collapse="isCollapse">
					<el-menu-item index="#" @click="isCollapse = !isCollapse">
						<el-icon v-show="isCollapse"><expand /></el-icon>
						<el-icon v-show="!isCollapse"><fold /></el-icon>
						<template #title>
							<div style="width: 300px; display: inline-block">
								<span v-show="isCollapse">展开</span>
								<span v-show="!isCollapse">收起</span>
							</div>
						</template>
					</el-menu-item>
					<el-menu-item index="/">
						<el-icon><list /></el-icon>
						<template #title>
							<span>总览</span>
						</template>
					</el-menu-item>
					<el-menu-item index="/upload">
						<el-icon><upload /></el-icon>
						<template #title>
							<span>上传</span>
						</template>
					</el-menu-item>
					<el-sub-menu index="note" expanded :disabled="fileId == 0">
						<template #title>
							<el-icon><notebook /></el-icon>
							<span v-if="fileId == 0">笔记</span>
							<span v-else>{{ fileName }}</span>
						</template>
						<el-menu-item :index="`/note/view/${fileId}`">
							<template #title>
								<el-icon><notebook /></el-icon>
								<span>查看</span>
							</template>
						</el-menu-item>
						<el-menu-item :index="`/note/edit/${fileId}`">
							<template #title>
								<el-icon><edit /></el-icon>
								<span>编辑</span>
							</template>
						</el-menu-item>
					</el-sub-menu>
				</el-menu>
			</el-aside>
			<el-main><router-view /></el-main>
		</el-container>
	</el-container>
</template>
<script lang="ts" setup>
import { List, Upload, Notebook, Edit, Expand, Fold } from '@element-plus/icons'
import { useStore } from 'vuex'
const store = useStore()
let fileId = $computed(() => store.state.file.fileId)
let fileName = $computed(() => store.state.file.fileName)
let isCollapse = $ref(false)
</script>

<style lang="scss">
.head {
	.el-menu-item {
		width: 30%;
		text-align: center;
	}
}
.el-container {
	position: relative;
	top: 1px;
	height: 100%;
	.el-aside {
		span {
			margin-left: 5px;
		}
	}
}
</style>
