<template>
	<component
		ref="card"
		:is="props.is"
		class="nami-card"
		:style="{
			padding: props.padding + 'px'
		}"
	>
		<svg ref="svg" class="nami-svg" v-html="path"></svg>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
import type { Options } from "roughjs/bundled/core.d.ts";
import { ref, onMounted, watch } from "vue";
import rough from "roughjs";
import { useCssVar, useResizeObserver } from "@vueuse/core";
import { random } from "xtt-utils";

interface Props {
	is?: string;
	color?: string;
	height?: number | string;
	strokeWidth?: number;
	padding?: number;
	roughOptions?: Options;
}

const defaultRoughOptions = {
	bowing: 2,
	roughness: 0.8,
	hachureAngle: random(125, 235)
};

const props = withDefaults(defineProps<Props>(), {
	is: "div",
	color: "#000000",
	height: "",
	padding: 5
});

const card = ref<HTMLElement | null>(null);
const svg = ref<SVGSVGElement | null>(null);

const path = ref<string>("");

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
		const ract = card.value.getBoundingClientRect();

		svg.value.setAttribute("viewBox", `0 0 ${ract.width} ${ract.height}`);

		const p = props.padding;

		path.value = rough.svg(svg.value).rectangle(p, p, ract.width - p * 2, ract.height - p * 2, {
			...defaultRoughOptions,
			...props.roughOptions,
			stroke: props.roughOptions?.stroke ?? props.color
		}).outerHTML;
	}
}

onMounted(() => {
	changeSvgFn();
});

useResizeObserver(card, () => {
	changeSvgFn();
});
</script>

<style>
.nami-card {
	position: relative;
	display: block;
	width: 100%;
	block-size: var(--default-height, 300px);
	box-sizing: border-box;
}
.nami-svg {
	position: absolute;
	inset: 0;
	z-index: -1;
}
</style>
