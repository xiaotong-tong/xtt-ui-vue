<template>
	<component class="item" ref="item" :is="props.wrapperTargetName">
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
interface Props {
	wrapperTargetName?: string;
}

const props = withDefaults(defineProps<Props>(), {
	wrapperTargetName: "li"
});
</script>

<style scoped>
.item {
	display: block;
	position: absolute;
	inset-inline-start: 0;
	inset-block-start: 0;
}
</style>
