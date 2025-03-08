<template>
	<component
		ref="line"
		:is="props.is"
		class="nami-line"
		:style="{
			blockSize: heightValue,
			inlineSize: widthValue
		}"
	>
		<svg ref="svg" class="nami-svg" v-html="path"></svg>
	</component>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import type { Options } from "roughjs/bundled/core.d.ts";
import { ref, onMounted, watch, unref, computed } from "vue";
import rough from "roughjs";
import { useResizeObserver } from "@vueuse/core";
import { random } from "xtt-utils";
import { defaultColor } from "../../../utils/config";

interface Props {
	is?: string;
	height?: number | string;
	width?: number | string;
	color?: MaybeRef<string>;
	dir?: "x" | "y";
	roughOptions?: Options;
}

const defaultFillWeight = random(2, 4);

const props = withDefaults(defineProps<Props>(), {
	is: "div",
	height: 3,
	width: "100%",
	dir: "x" // x: 横向，y: 纵向
});

const defaultRoughOptions = {
	fillWeight: defaultFillWeight,
	hachureGap: defaultFillWeight * 1.5,
	stroke: "none",
	hachureAngle: props.dir === "x" ? random(125, 245) : random(30, 145)
};

const widthValue = computed(() => {
	const width = props.dir === "y" ? props.height : props.width;
	return typeof width === "number" ? `${width}px` : width;
});
const heightValue = computed(() => {
	const height = props.dir === "y" ? props.width : props.height;
	return typeof height === "number" ? `${height}px` : height;
});

const line = ref<HTMLElement | null>(null);
const svg = ref<SVGSVGElement | null>(null);

const path = ref<string>("");

const changeSvgFn = () => {
	if (line.value && svg.value) {
		const ract = line.value.getBoundingClientRect();

		svg.value.setAttribute("viewBox", `0 0 ${ract.width} ${ract.height}`);

		path.value = rough.svg(svg.value).rectangle(0, 0, ract.width, ract.height, {
			...defaultRoughOptions,
			...props.roughOptions,
			fill: props.roughOptions?.fill ?? unref(props.color) ?? unref(defaultColor)
		}).outerHTML;
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
	}
	.nami-svg {
		position: absolute;
		inset: 0;
	}
}
</style>
