<template>
	<i
		ref="icon"
		class="icon"
		:style="{
			blockSize: typeof props.size === 'number' ? `${props.size}px` : props.size
		}"
	>
		<svg ref="svg" class="svg" view-box="0 0 24 24"></svg>
	</i>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { mdiBookOpenBlankVariantOutline } from "@mdi/js";
import rough from "roughjs";
import { css } from "xtt-utils";

interface Props {
	icon: "mdiBookOpenBlankVariantOutline";
	size?: number | string;
	color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	icon: "mdiBookOpenBlankVariantOutline",
	size: 24
});

const reflectIcon = (icon: Props["icon"]) => {
	const mdiMap = {
		mdiBookOpenBlankVariantOutline
	};

	return mdiMap[icon];
};

const svg = ref<SVGSVGElement>();

onMounted(() => {
	if (svg.value) {
		let defaultColor;
		if (!props.color) {
			defaultColor = css(svg.value as unknown as HTMLElement, "color");
			console.log(defaultColor);
		}

		const el = rough.svg(svg.value).path(reflectIcon(props.icon), {
			fill: defaultColor ?? props.color,
			stroke: defaultColor ?? props.color
		});
		svg.value.appendChild(el);
	}
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
