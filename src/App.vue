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
			<el-aside :class="isCollapse ? 'folded' : 'expanded'">
				<el-menu router :collapse="isCollapse">
					<el-menu-item index="#" @click="isCollapse = !isCollapse">
						<el-icon v-show="isCollapse"><expand /></el-icon>
						<el-icon v-show="!isCollapse"><fold /></el-icon>
						<template #title>
							<span v-show="isCollapse">展开</span>
							<span v-show="!isCollapse">收起</span>
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
							<span v-else class="note-name">
								{{ fileName }}
							</span>
						</template>
						<el-menu-item-group title="Normal Actions">
							<el-menu-item :index="`/note/view/${fileId}`">
								<el-icon><notebook /></el-icon>
								<template #title>
									<span>查看</span>
								</template>
							</el-menu-item>
							<el-menu-item :index="`/note/edit/${fileId}`">
								<el-icon><edit /></el-icon>
								<template #title>
									<span>编辑</span>
								</template>
							</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="Danger Actions">
							<el-menu-item
								:index="`/note/delete/${fileId}`"
								:disabled="fileId === 0"
							>
								<el-icon><delete /></el-icon>
								<template #title>
									<span>删除</span>
								</template>
							</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
				</el-menu>
			</el-aside>
			<el-main><router-view /></el-main>
		</el-container>
	</el-container>
</template>
<script lang="ts" setup>
import { List, Upload, Notebook, Edit, Expand, Fold, Delete } from '@element-plus/icons'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
const store = useStore()
const route = useRoute()
let fileId = $computed(() => {
	if (store.state.file.fileId) {
		return store.state.file.fileId
	} else if (route.params.fileId) {
		store.dispatch('file/fetchFileInfoLight', route.params.fileId)
	} else {
		return 0
	}
})
let fileName = $computed(() => store.state.file.fileName)
let isCollapse = $ref(false)
const collapseRouters = ['/note']
watch(
	() => route.path,
	() => {
		let flag = false
		collapseRouters.forEach((item) => {
			if (route.path.startsWith(item)) {
				flag = true
			}
		})
		isCollapse = flag
	}
)
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
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
	.folded {
		width: 70px;
		transition: width 0.5s;
	}
	.expanded {
		width: 250px;
		transition: width 0.5s;
	}
	.el-aside {
		span {
			margin-left: 5px;
		}
		.note-name {
			overflow: hidden;
			max-width: 160px;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: inline-block;
		}
	}
	.el-main {
		padding-top: 0;
	}
}
</style>
