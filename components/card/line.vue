<template>
	<div
		ref="cardRef"
		class="card"
		:class="{ dark: unref(isDark) }"
		:style="{
			'--color': color,
			width: unref(width) + 'px',
			height: unref(height) + 'px',
			'--scroll-color': scrollColor,
			'--bg-color': bgColor,
			'--border-size': borderSize + 'px',
			resize: resizeable ? 'both' : undefined
		}"
	>
		<slot>
			<div class="content" :contenteditable="editable ? true : undefined"></div>
		</slot>
	</div>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { unref, ref } from "vue";
import { defaultColor, isDark as defaultIsDark } from "../../utils/config";
import { useResizeObserver } from "@vueuse/core";

interface Props {
	color?: MaybeRef<string>;
	scrollColor?: MaybeRef<string>;
	bgColor?: MaybeRef<string>;
	isDark?: MaybeRef<boolean>;
	resizeable?: MaybeRef<boolean>;
	editable?: MaybeRef<boolean>;
	borderSize?: MaybeRef<number>;
}

const {
	color = defaultColor,
	scrollColor = "#686868",
	isDark = defaultIsDark,
	resizeable = false,
	editable = false,
	bgColor = "#fae8f577",
	borderSize = 1
} = defineProps<Props>();

const width = defineModel("width", { type: Number });
const height = defineModel("height", { type: Number });

const cardRef = ref<HTMLElement>();
useResizeObserver(cardRef, () => {
	width.value = cardRef.value?.offsetWidth ?? 0;
	height.value = cardRef.value?.offsetHeight ?? 0;
});
</script>

<style scoped>
@layer components.card.line {
	.card {
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
		padding: 8px;
		background-color: var(--bg-color);

		.content {
			width: 100%;
			height: 100%;
			padding: 0.5em;
			overflow: auto;

			&:focus-visible {
				outline: none;
			}

			&::-webkit-scrollbar-thumb {
				background: var(--scroll-color);
			}
		}

		&::-webkit-scrollbar-thumb {
			background: var(--scroll-color);
		}
	}

	.card::before,
	.card::after {
		content: "";
		position: absolute;
		border: var(--border-size, thin) solid;
		pointer-events: none;
	}
	.card::before {
		inset: 2px;
		border-image: linear-gradient(
				-45deg,
				rgb(from var(--color) r g b / 0.8) 0%,
				rgb(from var(--color) r g b / 0.2) 40%,
				transparent 40%,
				transparent 60%,
				rgb(from var(--color) r g b / 0.2) 60%,
				rgb(from var(--color) r g b / 0.8)
			)
			1;
	}
	.card::after {
		inset: calc(5px + var(--border-size, 1px));
		border-image: linear-gradient(
				-45deg,
				transparent min(4%, 24px),
				rgb(from var(--color) r g b / 0.6) min(4%, 24px),
				rgb(from var(--color) r g b / 0.2) 20%,
				transparent 20%,
				transparent 70%,
				rgb(from var(--color) r g b / 0.2) 70%,
				rgb(from var(--color) r g b / 0.6) max(96%, calc(100% - 24px)),
				transparent max(96%, calc(100% - 24px)),
				transparent
			)
			1;
	}

	.card.dark {
		background-color: #b0a3ae77;
	}
}
</style>
