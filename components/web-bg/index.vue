<template>
	<Teleport to="body">
		<div
			aria-hidden="true"
			class="web-bg"
			:style="{
				backgroundImage: `url(${url})`,
				filter: props.mask ? (props.dark ? 'brightness(0.3)' : 'brightness(0.7)') : ''
			}"
		></div>
	</Teleport>
</template>

<script lang="ts" setup>
import type { MaybeRef } from "vue";
import { watch, ref, unref } from "vue";

interface Props {
	src?: MaybeRef<string>;
	mask?: boolean;
	dark?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	src: "https://image.xtt.moe/images/bg.webp",
	mask: false,
	dark: false
});

const url = ref<string>(unref(props.src));

watch(
	() => props.src,
	(val) => {
		if (val) {
			url.value = unref(val);
		}
	}
);
</script>

<style scoped>
.web-bg {
	position: fixed;
	inset: 0;
	background-position: center;
	background-size: cover;
	z-index: -9;
}
</style>
