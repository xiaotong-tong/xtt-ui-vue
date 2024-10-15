<template>
	<component :is="unref(is)" class="menu">
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { unref } from "vue";

interface Props {
	is?: MaybeRef<"ul" | "ol" | "menu">;
}

const { is = "ul" } = defineProps<Props>();
</script>

<style scoped>
@layer components.menu {
	.menu {
		padding-inline-start: 8px;

		& > ::v-deep(.menu-item) {
			margin-block-end: 8px;
		}
	}
}
</style>
