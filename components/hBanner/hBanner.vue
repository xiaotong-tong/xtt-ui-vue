<template>
	<component class="h" ref="header" :is="props.wrapperTargetName">
		<myBannerIcon class="bg"></myBannerIcon>
		<div class="content">
			<slot></slot>
		</div>
	</component>
</template>

<script setup lang="ts">
import myBannerIcon from "../icon/icons/banner.vue";

interface Props {
	wrapperTargetName?: string;
}

const props = withDefaults(defineProps<Props>(), {
	wrapperTargetName: "h2"
});
</script>

<style scoped>
.h {
	display: block;
	position: relative;
	margin-block: 4px;
	block-size: 48px;
}

.bg {
	position: absolute;
	inset-block-start: 0;
	inset-inline-start: 0;
	height: 100%;
	pointer-events: none;
	z-index: -1;
}

.content {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	inset-block-start: 5px;
	inset-inline-start: 38px;
	width: 180px;
	height: 28px;
	font-size: 20px;
	font-weight: normal;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}
</style>
