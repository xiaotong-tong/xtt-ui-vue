<template>
	<div class="card" :class="{ dark: unref(isDark) }" :style="{ '--color': color }">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { unref } from "vue";
import { defaultColor, isDark as defaultIsDark } from "../../utils/config";

interface Props {
	color?: MaybeRef<string>;
	isDark?: MaybeRef<boolean>;
}

const { color = defaultColor, isDark = defaultIsDark } = defineProps<Props>();
</script>

<style scoped>
@layer components.card.line {
	.card {
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
		padding: 8px;
		background-color: #fae8f577;
	}

	.card::before,
	.card::after {
		content: "";
		position: absolute;
		border: thin solid;
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
		inset: 5px;
		border-image: linear-gradient(
				-45deg,
				transparent 4%,
				rgb(from var(--color) r g b / 0.6) 4%,
				rgb(from var(--color) r g b / 0.2) 20%,
				transparent 20%,
				transparent 70%,
				rgb(from var(--color) r g b / 0.2) 70%,
				rgb(from var(--color) r g b / 0.6) 96%,
				transparent 96%,
				transparent
			)
			1;
	}

	.card.dark {
		background-color: #b0a3ae77;
	}
}
</style>
