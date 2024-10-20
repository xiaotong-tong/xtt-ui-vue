<template>
	<li class="menu-item">
		<div
			v-if="prev"
			class="menu-item-pre-style"
			aria-hidden="true"
			:style="{
				backgroundImage: `url(${unref(preImageUrl)})`
			}"
		></div>
		<div class="menu-item-content">
			<slot></slot>
		</div>
	</li>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { unref } from "vue";

interface Props {
	preImageUrl?: MaybeRef<string>;
	prev?: boolean;
}

const { preImageUrl = "/images/jian.webp", prev = true } = defineProps<Props>();
</script>

<style scoped>
@layer components.menuItem {
	.menu-item {
		display: flex;
		align-items: start;
	}

	.menu-item-pre-style {
		height: 1.5em;
		width: 3em;
		background: url("/images/jian.webp");
		background-size: contain;
		background-repeat: no-repeat;
	}

	.menu-item-content {
		flex: 1;
	}
}
</style>
