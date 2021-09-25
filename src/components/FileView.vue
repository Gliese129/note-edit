<template>
	<div class="file-view">
		<div class="icon" :class="props.type ? props.type.toLowerCase() : ''"></div>
		<span class="name">{{ props.name }}</span>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'

const props = defineProps({
	name: String,
	type: String
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
