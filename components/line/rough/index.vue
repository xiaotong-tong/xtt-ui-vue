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
import type { MaybeRef } from "vue";
import type { Options } from "roughjs/bundled/core.d.ts";
import { ref, onMounted, watch, unref } from "vue";
import rough from "roughjs";
import { useResizeObserver } from "@vueuse/core";
import { random } from "xtt-utils";
import { defaultColor } from "../../../utils/config";

interface Props {
	is?: string;
	height?: number | string;
	color?: MaybeRef<string>;
	dir?: "x" | "y";
	rotationWise?: "clockwise" | "counter-clockwise";
	roughOptions?: Options;
}

const defaultFillWeight = random(2, 4);

const defaultRoughOptions = {
	fillWeight: defaultFillWeight,
	hachureGap: defaultFillWeight * 1.5,
	stroke: "none",
	hachureAngle: random(125, 245)
};

const props = withDefaults(defineProps<Props>(), {
	is: "div",
	height: 3,
	dir: "x", // x: 横向，y: 纵向
	rotationWise: "clockwise" // 为 y 时有效，旋转方向
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
			fill: props.roughOptions?.fill ?? unref(props.color) ?? unref(defaultColor)
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
	() => unref(props.color),
	() => {
		changeSvgFn();
	}
);
watch(
	() => unref(defaultColor),
	() => {
		// 如果没有设置 props.color，就更新svg，如果设置了，此属性不该生效
		if (!props.color) {
			changeSvgFn();
		}
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
