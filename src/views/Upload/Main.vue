<template>
	<div class="upload">
		<el-row>
			<el-col :offset="3" :span="9">
				<choose-folder :allow-unexist-folder="true" :path-array="path" />
				<div>
					<h3>文件名(不填默认为文件原名)</h3>
					<el-input placeholder="请输入文件名" v-model="fileName"
						><template #append>.pdf</template></el-input
					>
				</div>
			</el-col>
			<el-col :offset="1" :span="5">
				<upload size="mini" :file-name="fileName" />
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import ChooseFolder from '@/components/ChooseFolder.vue'
import { reactive, watch } from 'vue'
import Upload from './Upload.vue'
import { useStore } from 'vuex'
const store = useStore()

const path = reactive<string[]>([''])
watch($raw(path), (val) => {
	console.log(val)
	store.commit('file/setFolderPath', val)
})

let fileName = $ref('')
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
