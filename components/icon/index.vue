<template>
	<i
		ref="icon"
		class="icon"
		:style="{
			blockSize: typeof props.size === 'number' ? `${props.size}px` : props.size
		}"
	>
		<template v-if="props.icon === 'cat'">
			<myCatIcon class="svg" />
		</template>
		<template v-else-if="props.icon === 'heart'">
			<myHeartIcon class="svg" />
		</template>
	</i>
</template>

<script setup lang="ts">
import myCatIcon from "./icons/cat.vue";
import myHeartIcon from "./icons/heart.vue";

interface Props {
	icon: "cat" | "heart";
	size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
	icon: "cat",
	size: 24
});
</script>

<style scoped>
.icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	aspect-ratio: 1;
}

.svg {
	width: 100%;
	height: 100%;
}
</style>
