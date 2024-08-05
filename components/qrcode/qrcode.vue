<template>
	<img :src="codeUrl" :alt="alt" v-if="codeUrl" />
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import type { QRCodeToDataURLOptions } from "qrcode";
import QRCode from "qrcode";
import { ref, unref, watch } from "vue";

interface Props {
	content: MaybeRef<string>;
	alt?: string;
	option?: QRCodeToDataURLOptions;
}

const props = withDefaults(defineProps<Props>(), {
	alt: "QR Code"
});

const defaultOptions = {
	margin: 1
};

const codeUrl = ref<string>("");

watch(
	() => unref(props.content),
	() => {
		const content = unref(props.content);
		if (!content) {
			codeUrl.value = "";
			return;
		}

		QRCode.toDataURL(
			content,
			{
				...defaultOptions,
				...props.option
			},
			(err, url) => {
				if (err) {
					console.error(err);
					return;
				}
				codeUrl.value = url;
			}
		);
	},
	{ immediate: true }
);

watch(
	() => unref(props.option),
	() => {
		const content = unref(props.content);
		if (!content) {
			return;
		}

		QRCode.toDataURL(
			content,
			{
				...defaultOptions,
				...props.option
			},
			(err, url) => {
				if (err) {
					console.error(err);
					return;
				}
				codeUrl.value = url;
			}
		);
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped></style>
