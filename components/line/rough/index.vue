<template>
	<component
		ref="line"
		:is="props.is"
		class="nami-line"
		:class="{
			'rotation-clockwise': props.rotationWise === 'clockwise',
			'rotation-counter-clockwise': props.rotationWise === 'counter-clockwise'
		}"
		:style="{
			blockSize: typeof props.height === 'number' ? `${props.height}px` : props.height
		}"
	>
		<svg ref="svg" class="nami-svg" v-html="path"></svg>
	</component>
</template>

<script setup lang="ts">
import type { Options } from "roughjs/bundled/core.d.ts";
import { ref, onMounted, watch } from "vue";
import rough from "roughjs";
import { useResizeObserver } from "@vueuse/core";
import { random } from "xtt-utils";

interface Props {
	is?: string;
	height?: number | string;
	color?: string;
	dir?: "x" | "y";
	rotationWise?: "clockwise" | "counter-clockwise";
	roughOptions?: Options;
}

const defaultRoughOptions = {
	fillWeight: 3,
	stroke: "none",
	hachureAngle: random(125, 235)
};

const props = withDefaults(defineProps<Props>(), {
	is: "div",
	height: 3,
	color: "#000000",
	dir: "x",
	rotationWise: "clockwise"
});

const line = ref<HTMLElement | null>(null);
const svg = ref<SVGSVGElement | null>(null);

const path = ref<string>("");

const changeSvgFn = () => {
	if (line.value && svg.value) {
		line.value.classList.remove("nami-line-dir-x", "nami-line-dir-y");
		const ract = line.value.getBoundingClientRect();

		svg.value.setAttribute("viewBox", `0 0 ${ract.width} ${ract.height}`);

		path.value = rough.svg(svg.value).rectangle(0, 0, ract.width, ract.height, {
			...defaultRoughOptions,
			...props.roughOptions,
			fill: props.roughOptions?.fill ?? props.color
		}).outerHTML;

		line.value.classList.add(`nami-line-dir-${props.dir}`);
	}
};

onMounted(() => {
	changeSvgFn();
});

useResizeObserver(line, () => {
	changeSvgFn();
});

watch(
	() => props.color,
	() => {
		changeSvgFn();
	}
);
</script>

<style scoped>
@layer components.line {
	.nami-line {
		position: relative;
		display: block;
		width: 100%;
	}
	.nami-svg {
		position: absolute;
		inset: 0;
	}

	.nami-line-dir-y {
		transform-origin: top left;
		transform: rotate(90deg);

		&.rotation-counter-clockwise {
			transform-origin: top right;
			transform: rotate(-90deg);
		}
	}
}
</style>
