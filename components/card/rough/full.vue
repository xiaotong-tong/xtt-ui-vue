<template>
	<component ref="card" :is="props.is" class="nami-card">
		<svg ref="svg" class="nami-svg" viewBox="0 0 160 90" preserveAspectRatio="none"></svg>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
import type { Options } from "roughjs/bundled/core.d.ts";
import { ref, onMounted, watch } from "vue";
import rough from "roughjs";
import { useCssVar } from "@vueuse/core";
import { random } from "xtt-utils";

interface Props {
	is?: string;
	color?: string;
	height?: number | string;
	roughOptions?: Options;
}

const defaultRoughOptions = {
	bowing: 2,
	roughness: 0.8,
	hachureAngle: random(125, 235),
	strokeWidth: 1,
	fillWeight: 3
};

const props = withDefaults(defineProps<Props>(), {
	is: "div",
	color: "#000000",
	height: ""
});

const card = ref<HTMLElement | null>(null);
const svg = ref<SVGSVGElement | null>(null);

const height = useCssVar("--default-height", card, {
	initialValue: "300px"
});

watch(
	() => props.height,
	(val) => {
		height.value = typeof val === "number" ? `${val}px` : val;
	}
);

watch(
	() => props.color,
	() => {
		changeSvgFn();
	}
);

function changeSvgFn() {
	if (card.value && svg.value) {
		const content = rough.svg(svg.value).rectangle(0, 0, 160, 160, {
			...defaultRoughOptions,
			...props.roughOptions,
			stroke: props.roughOptions?.stroke ?? props.color,
			fill: props.roughOptions?.fill ?? props.color
		});

		svg.value.replaceChildren(content);
	}
}

onMounted(() => {
	changeSvgFn();
});
</script>

<style scoped>
@layer components.card {
	.nami-card {
		position: relative;
		width: 100%;
		block-size: var(--default-height, 300px);
		box-sizing: border-box;
		padding: 5px;

		& > .nami-svg {
			position: absolute;
			inset: 0;
			z-index: -1;
		}
	}
}
</style>
