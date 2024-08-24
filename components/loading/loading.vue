<template>
	<svg
		ref="svgRef"
		viewBox="0 0 128 128"
		class="nami-loading"
		:style="{
			width: `${props.size}px`,
			height: `${props.size}px`
		}"
	>
		<mask :id="maskId">
			<rect x="0" y="0" width="128" height="128" fill="white" />
			<circle cx="64" cy="64" r="34" fill="black" />
		</mask>
	</svg>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { ref, onMounted, unref, watch } from "vue";
import rough from "roughjs";
import { uniqueNumber } from "../../utils/unique";

const maskId = "nami-id-" + uniqueNumber();

interface Props {
	size?: MaybeRef<number>;
	color?: MaybeRef<string>;
}

const props = withDefaults(defineProps<Props>(), {
	size: 16,
	color: "#8bcecb"
});

const svgRef = ref<SVGSVGElement>();

function changeSvgFn() {
	if (svgRef.value) {
		const rc = rough.svg(svgRef.value);

		const content = rc.circle(64, 64, 128, {
			fill: unref(props.color),
			stroke: "none"
		});

		content.classList.add("svg-path");

		content.setAttribute("mask", `url(#${maskId})`);

		const oldContentEl = svgRef.value.querySelector(".svg-path");
		if (oldContentEl) {
			oldContentEl?.replaceWith(content);
		} else {
			svgRef.value.appendChild(content);
		}
	}
}

watch(
	() => props.color,
	() => {
		changeSvgFn();
	}
);

onMounted(() => {
	changeSvgFn();
});
</script>

<style scoped>
@layer components.loading {
	.nami-loading {
		mask: conic-gradient(transparent 45deg, #000);
		animation: rotate 2s linear infinite;
		filter: saturate(400%);
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
}
</style>
