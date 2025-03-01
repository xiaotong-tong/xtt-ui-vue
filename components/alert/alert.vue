<template>
	<component
		:is="tagName"
		class="nami-alert"
		:class="[type]"
		:style="{
			backgroundColor: color
		}"
	>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";

interface Props {
	color?: MaybeRef<string>;
	tagName?: string;
	type?: "default" | "success" | "warning" | "error";
}

const { tagName = "div", color, type = "default" } = defineProps<Props>();
</script>

<style scoped>
@layer components.alert {
	.nami-alert {
		display: block;
		padding: 0.5em 1em;
	}

	.nami-alert.default {
		background-color: #fafafc;
		border: thin solid #e9e9eb;
	}
	.nami-alert.success {
		background-color: #edf7f2;
		border: thin solid #e1f3d8;
	}
	.nami-alert.warning {
		background-color: #fef7ed;
		border: thin solid #ffecb3;
	}
	.nami-alert.error {
		background-color: #fbeef1;
		border: thin solid #fcd7d7;
	}
}
</style>
