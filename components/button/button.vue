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
		<svg aria-hidden="true" ref="borderSvgRef" class="border-svg" :mask="`url(#${maskId})`">
			<mask :id="maskId">
				<rect x="0" y="0" :width="width" :height="height" fill="white" />
				<rect
					ref="maskRectRef"
					:x="maskPointsInfo.x"
					:y="maskPointsInfo.y"
					:width="maskPointsInfo.width"
					:height="maskPointsInfo.height"
					fill="black"
					:style="{
						transform: 'none'
					}"
				/>
			</mask>
		</svg>
		<Loading class="loading" v-if="props.loading" :color="props.loadingColor" />
		<div class="content">
			<slot></slot>
		</div>
	</button>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { ref, unref, watch } from "vue";
import rough from "roughjs";
import { useElementBounding } from "@vueuse/core";
import { gsap } from "gsap";
import { random } from "xtt-utils";
import Loading from "../loading/loading.vue";
import { uniqueNumber } from "../../utils/unique";

interface Props {
	borderColor?: MaybeRef<string>;
	borderWidth?: MaybeRef<number>;
	activeBorderColor?: MaybeRef<string>;
	loading?: MaybeRef<boolean>;
	loadingColor?: MaybeRef<string>;
}

const props = withDefaults(defineProps<Props>(), {
	borderColor: "#8bcecb",
	borderWidth: 2,
	loading: false,
	loadingColor: "#000"
});

const maskId = "nami-id-" + uniqueNumber();

const button = ref<HTMLButtonElement>();
const borderSvgRef = ref<SVGSVGElement>();

const { width, height } = useElementBounding(button);

const maskPointsInfo = ref<{ x: number; y: number; width: number; height: number }>({
	x: unref(props.borderWidth),
	y: unref(props.borderWidth),
	width: width.value ? width.value - 2 * unref(props.borderWidth) : 0,
	height: height.value ? height.value - 2 * unref(props.borderWidth) : 0
});

const maskRectRef = ref<SVGRectElement>();

function sizeChangeFn() {
	if (borderSvgRef.value && maskRectRef.value) {
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

function handleMouseEnter() {
	if (maskRectRef.value) {
		gsap.to(maskRectRef.value, {
			x: width.value / 2,
			y: height.value / 2,
			width: 0,
			height: 0,
			duration: 0.5,
			yoyo: true,
			ease: "power1.inOut",
			onUpdate() {
				const currentX = gsap.getProperty(maskRectRef.value!, "x");
				const currentY = gsap.getProperty(maskRectRef.value!, "y");
				// @ts-ignore
				maskRectRef.value!.style.x = `${currentX}px`;
				// @ts-ignore
				maskRectRef.value!.style.y = `${currentY}px`;
			}
		});

		if (props.activeBorderColor) {
			gsap.to(button.value!, {
				"--stroke": unref(props.activeBorderColor),
				duration: 0.2
			});
		}
	}
}

function handleMouseLeave() {
	if (maskRectRef.value) {
		if (props.activeBorderColor) {
			gsap.to(button.value!, {
				"--stroke": unref(props.borderColor),
				duration: 0.2
			});
		}

		gsap.to(maskRectRef.value, {
			x: unref(props.borderWidth),
			y: unref(props.borderWidth),
			width: width.value - 2 * unref(props.borderWidth),
			height: height.value - 2 * unref(props.borderWidth),
			duration: 0.5,
			yoyo: true,
			ease: "power1.inOut",
			onUpdate() {
				const currentX = gsap.getProperty(maskRectRef.value!, "x");
				const currentY = gsap.getProperty(maskRectRef.value!, "y");
				// @ts-ignore
				maskRectRef.value!.style.x = `${currentX}px`;
				// @ts-ignore
				maskRectRef.value!.style.y = `${currentY}px`;
			},
			onComplete() {
				// 在完成后清除 style 中设置的 height 和 width, 否则影响元素中 height 和 width 属性的设置
				maskRectRef.value!.style.height = "";
				maskRectRef.value!.style.width = "";
			}
		});
	}
}
</script>

<style scoped>
@layer components.button {
	.nami-button {
		padding: 0.4em 1em;
		position: relative;
		display: inline-flex;
		flex-wrap: nowrap;
		align-items: center;

		&:has(.loading) {
			gap: 0.25em;
			padding-inline-start: 0.3em;
		}

		& > .content {
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		& > .border-svg {
			position: absolute;
			inset: 0;
			z-index: -99;
		}
	}
}
</style>
