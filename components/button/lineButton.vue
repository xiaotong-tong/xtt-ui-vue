<template>
	<button
		class="nami-button"
		ref="button"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<svg aria-hidden="true" ref="svg" class="nami-border"></svg>
		<svg aria-hidden="true" ref="activeSvg" class="nami-border active"></svg>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { ref, unref, watch } from "vue";
import rough from "roughjs";
import { useElementBounding } from "@vueuse/core";
import { gsap } from "gsap";

interface Props {
	borderColor?: MaybeRef<string>;
}

const props = withDefaults(defineProps<Props>(), {
	borderColor: "#e0e0e6"
});

const button = ref<HTMLButtonElement>();
const svg = ref<SVGSVGElement>();
const activeSvg = ref<SVGSVGElement>();

const { width, height } = useElementBounding(button);

const tl = gsap.timeline(); // 鼠标移入移出时的动画
const mouseInEl = ref(false);

const path = ref("");
const pathLength = ref(0);

function sizeChangeFn() {
	if (svg.value) {
		const w = width.value;
		const h = height.value;

		svg.value.setAttribute("viewBox", `0 0 ${w} ${h}`);
		activeSvg.value?.setAttribute("viewBox", `0 0 ${w} ${h}`);
		path.value = `M1 1 L${w - 2} 1 L${w - 2} ${h - 2} L0 ${h - 2} L0 0z`;
	}
}

function changeSvgFn() {
	if (svg.value) {
		const rc = rough.svg(svg.value);

		const content = rc.path(path.value, {
			roughness: 0.2,
			fill: "none",
			stroke: unref(props.borderColor),
			strokeWidth: 1
		});

		const pathEl = content.children[0] as SVGPathElement;
		pathLength.value = pathEl.getTotalLength();

		svg.value.replaceChildren(content);

		pathEl.style.strokeDasharray = pathLength.value + "px";

		gsap.fromTo(
			pathEl,
			{ strokeDashoffset: pathLength.value },
			{ strokeDashoffset: 0, duration: 1, ease: "power1.inOut" }
		);

		// 下面是鼠标移入移出时的动画用到的
		const copyContent = rc.path(path.value, {
			roughness: 0.2,
			fill: "none",
			stroke: "#f4b6d1",
			strokeWidth: 1
		});
		activeSvg.value?.replaceChildren(copyContent);
		const copyPathEl = copyContent.children[0] as SVGPathElement;
		copyPathEl.style.strokeDasharray = pathLength.value + "px";

		tl.fromTo(
			copyPathEl,
			{ strokeDashoffset: pathLength.value },
			{
				strokeDashoffset: 0,
				duration: 3,
				ease: "power1.inOut",
				onComplete: () => {
					if (!mouseInEl.value) {
						activeSvg.value!.style.opacity = "0";
					}
				}
			}
		);
	}
}

watch([width, height], () => {
	sizeChangeFn();
	changeSvgFn();
});

function handleMouseEnter() {
	if (activeSvg.value) {
		mouseInEl.value = true;
		activeSvg.value.style.opacity = "1";
		// 播放动画
		tl.play();
	}
}

function handleMouseLeave() {
	if (activeSvg.value) {
		mouseInEl.value = false;
		// 回退动画
		tl.reverse();
	}
}
</script>

<style scoped>
@layer components.button {
	.nami-button {
		padding: 0.4em 0.8em;
		position: relative;

		& > .nami-border {
			position: absolute;
			inset: 0;

			&.active {
				opacity: 0;
			}
		}
	}
}
</style>
