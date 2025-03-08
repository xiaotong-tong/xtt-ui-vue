<template>
	<section
		class="box"
		:class="{
			'box--no-title': !title
		}"
	>
		<div class="title" ref="titleRef" v-if="title">
			<slot name="legend">{{ title }}</slot>
		</div>
		<div class="content">
			<slot><span class="empty" style="height: 1em">&nbsp;</span></slot>
		</div>
		<div class="border-wrap" aria-hidden="true" ref="borderRef">
			<Line class="top" :color="borderColor" :height="2"></Line>
			<Line class="bottom" :color="borderColor" :height="2"></Line>
			<Line class="left" :color="borderColor" :height="2" dir="y"></Line>
			<Line class="right" :color="borderColor" :height="2" dir="y"></Line>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { ref, onMounted, watch } from "vue";
import Line from "../line/rough/index.vue";
import { useElementBounding } from "@vueuse/core";
import { defaultColor } from "../../utils/config";

interface Props {
	title?: MaybeRef<string>;
	borderColor?: MaybeRef<string>;
}

const { title, borderColor = defaultColor } = defineProps<Props>();

const titleRef = ref<HTMLElement>();
const borderRef = ref<HTMLElement>();

const { width, height } = useElementBounding(titleRef);

function createTitleMaskOfTitle() {
	if (!titleRef.value) return;
	if (!borderRef.value) return;

	borderRef.value.style.clipPath = `polygon(0 0, 14px 0, 14px ${height.value}px, ${width.value + 16 + 2}px ${
		height.value
	}px, ${width.value + 16 + 2}px 0, 100% 0, 100% 100%, 0 100%, 0 0)`;
}

watch([width, height], createTitleMaskOfTitle);

onMounted(createTitleMaskOfTitle);
</script>

<style scoped>
@layer components.card.fieldset {
	.box {
		border: none;
		position: relative;
		overflow: hidden;
		height: calc-size(auto, max(size, 1em));
		padding: 20px 8px 8px;

		& > .title {
			position: absolute;
			top: 0;
			left: 16px;
			padding: 0;
		}

		& > .content {
			position: relative;
			overflow: auto;
			height: 100%;
			width: 100%;
		}

		& > .border-wrap {
			position: absolute;
			inset: 0;
			height: calc-size(auto, max(size, 1em));
			pointer-events: none;
			z-index: 9999;

			& > .top {
				position: absolute;
				top: 10px;
			}

			& > .bottom {
				position: absolute;
				bottom: 0;
			}

			& > .left {
				position: absolute;
				left: 0;
			}

			& > .right {
				position: absolute;
				right: 0;
			}
		}

		&.box--no-title {
			padding-top: 8px;

			& > .border-wrap {
				& > .top {
					top: 0;
				}
			}
		}
	}
}
</style>
