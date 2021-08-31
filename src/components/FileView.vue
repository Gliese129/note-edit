<template>
	<div class="file-view">
		<div class="icon"></div>
		<span class="name">{{ props.name }}</span>
	</div>
</template>

<script lang="ts" setup>
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
		background-image: url('@/assets/file-icon/pdf.png');
		zoom: 0.2;
	}
	.name {
		line-height: 100%;
	}
}
</style>
