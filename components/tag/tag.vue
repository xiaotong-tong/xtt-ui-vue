<template>
	<component
		:is="tagName"
		class="nami-tag"
		ref="tag"
		:style="{
			'--tag-color': props.color
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
}

const props = withDefaults(defineProps<Props>(), {
	color: "#e0e0e6",
	tagName: "button"
});
</script>

<style scoped>
@layer components.tags {
	.nami-tag {
		display: inline-block;
		padding: 0px 0.5em;
		border: 1px solid var(--tag-color);
		border-radius: 1em;
		color: var(--tag-color);
		font-size: 14px;
		min-width: 2em;
	}
}
</style>
