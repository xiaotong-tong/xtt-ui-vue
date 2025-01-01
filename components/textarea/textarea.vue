<template>
	<textarea
		class="textarea"
		:class="{ 'no-border': unref(noBorder), 'full-size': unref(fullSize), transparent: unref(transparent) }"
		:style="{
			resize: unref(resizeable) ? 'both' : undefined
		}"
		v-model="content"
	>
	</textarea>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { unref } from "vue";

interface Props {
	noBorder?: MaybeRef<boolean>;
	fullSize?: MaybeRef<boolean>;
	resizeable?: MaybeRef<boolean>;
	transparent?: MaybeRef<boolean>;
}

const { noBorder = false, fullSize = false, resizeable = false, transparent = false } = defineProps<Props>();
const content = defineModel("value", { type: String });
</script>

<style scoped>
@layer components.input.textarea {
	.textarea {
		padding: 0.5em;

		&.transparent {
			background-color: transparent;
		}
		&.full-size {
			width: 100%;
			height: 100%;

			&:focus-visible {
				outline: none;
			}
		}
	}
}
</style>
