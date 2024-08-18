<template>
	<button
		class="nami-button"
		ref="button"
		:style="{
			'--stroke': unref(props.borderColor)
		}"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<svg aria-hidden="true" ref="borderSvgRef" class="border-svg" mask="url(#nami-border-mask)">
			<mask id="nami-border-mask">
				<rect x="0" y="0" :width="width" :height="height" fill="white" />
				<rect
					ref="maskRectRef"
					:x="maskPointsInfo.x"
					:y="maskPointsInfo.y"
					:width="maskPointsInfo.width"
					:height="maskPointsInfo.height"
					fill="black"
				/>
			</mask>
		</svg>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { ref, unref, watch, onMounted } from "vue";
import rough from "roughjs";
import { useElementBounding } from "@vueuse/core";
import { gsap } from "gsap";
import { random } from "xtt-utils";

interface Props {
	borderColor?: MaybeRef<string>;
	borderWidth?: MaybeRef<number>;
	activeBorderColor?: MaybeRef<string>;
}

const props = withDefaults(defineProps<Props>(), {
	borderColor: "#e0e0e6",
	activeBorderColor: "#8bcecb",
	borderWidth: 2
});

const button = ref<HTMLButtonElement>();
const borderSvgRef = ref<SVGSVGElement>();

const { width, height } = useElementBounding(button);

const maskPointsInfo = ref<{ x: number; y: number; width: number; height: number }>({
	x: unref(props.borderWidth),
	y: unref(props.borderWidth),
	width: width.value ? width.value - 2 * unref(props.borderWidth) : 0,
	height: height.value ? height.value - 2 * unref(props.borderWidth) : 0
});

function sizeChangeFn() {
	if (borderSvgRef.value) {
		const w = width.value;
		const h = height.value;

		borderSvgRef.value?.setAttribute("viewBox", `0 0 ${w} ${h}`);

		maskPointsInfo.value.x = unref(props.borderWidth);
		maskPointsInfo.value.y = unref(props.borderWidth);
		maskPointsInfo.value.width = w - 2 * unref(props.borderWidth);
		maskPointsInfo.value.height = h - 2 * unref(props.borderWidth);
	}
}

function changeSvgFn() {
	if (borderSvgRef.value) {
		const w = width.value;
		const h = height.value;

		const topLine = rough.svg(borderSvgRef.value);

		const options = {
			stroke: "transparent",
			bowing: 1,
			roughness: 0.8,
			hachureAngle: random(125, 235),
			strokeWidth: 3,
			fill: "var(--stroke)",
			fillWeight: 1,
			hachureGap: 2
		};

		const content = topLine.rectangle(0, 0, w, h, options);

		content.classList.add("border-svg-path");

		content.setAttribute("mask", `url(#nami-border-mask)`);

		const oldContentEl = borderSvgRef.value.querySelector(".border-svg-path");
		if (oldContentEl) {
			oldContentEl?.replaceWith(content);
		} else {
			borderSvgRef.value.appendChild(content);
		}
	}
}

watch([width, height], () => {
	sizeChangeFn();
	changeSvgFn();
});
watch(
	() => props.borderWidth,
	() => {
		sizeChangeFn();
	}
);

const maskRectRef = ref<SVGRectElement>();
const tl = gsap.timeline({
	duration: 0.5,
	yoyo: true,
	ease: "power1.inOut",
	onComplete: () => {
		console.log("onComplete");
	}
}); // 鼠标移入移出时的动画

onMounted(() => {
	tl.to(maskRectRef.value!, {
		x: width.value / 2,
		y: height.value / 2,
		width: 0,
		height: 0
	});

	tl.to(
		button.value!,
		{
			"--stroke": unref(props.activeBorderColor)
		},
		">-0.5"
	);
	tl.pause();
});

function handleMouseEnter() {
	if (maskRectRef.value) {
		tl.play();
	}
}

function handleMouseLeave() {
	if (maskRectRef.value) {
		tl.reverse();
	}
}
</script>

<style scoped>
@layer components.button {
	.nami-button {
		padding: 0.4em 0.8em;
		position: relative;

		& > .border-svg {
			position: absolute;
			inset: 0;
			z-index: -99;
		}
	}
}
</style>
