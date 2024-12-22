<template>
	<fieldsetCard
		class="message"
		:class="{ dark: unref(isDark) }"
		:borderColor="color"
		v-if="!destroyed"
		:style="{
			'--color': unref(color)
		}"
	>
		<slot></slot>
	</fieldsetCard>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { unref, ref, onMounted } from "vue";
import fieldsetCard from "../card/fieldset.vue";
import { defaultColor, isDark as defaultIsDark } from "../../utils/config";

interface Props {
	color?: MaybeRef<string>;
	duration?: number;
	isDark?: MaybeRef<boolean>;
}

const { color = defaultColor, duration = 5000, isDark = defaultIsDark } = defineProps<Props>();

const destroyed = ref(false);

function destroy() {
	destroyed.value = true;
}

onMounted(() => {
	setTimeout(() => {
		destroy();
	}, unref(duration));
});
</script>

<style scoped>
@layer components.message {
	.message {
		max-width: min(90%, 500px);
		min-width: 4em;
		background-color: #fff;
		box-shadow: 0 1px 2px 3px rgb(from var(--color) r g b / 0.2), 0 2px 4px 2px rgb(from var(--color) r g b / 0.14),
			0 1px 5px 1px rgb(from var(--color) r g b / 0.12);
	}

	.message.dark {
		background-color: #333;
		color: #cfd3dc;
	}
}
</style>
