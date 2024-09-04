<template>
	<div @click="uploadImageEvent" v-bind="$attrs">
		<slot>
			<NamiButton :borderColor="props.color">{{ props.buttonText }}</NamiButton>
		</slot>
	</div>

	<Dialog
		v-model:show="dialogShow"
		@ok="okHandle"
		:asyncOkCallback="props.asyncOkCallback"
		@cancel="cancelHandle"
		:height="600"
	>
		<cropper-canvas v-if="dialogShow" background class="cropper" ref="canvas">
			<cropper-image
				initial-center-size="contain"
				:src="src"
				alt="待裁切图片"
				class="image"
				ref="image"
				rotatable
				scalable
				skewable
				translatable
			></cropper-image>
			<cropper-shade hidden></cropper-shade>
			<cropper-handle action="select" plain></cropper-handle>
			<cropper-selection
				initial-coverage="0.5"
				aspect-ratio="1"
				movable
				resizable
				zoomable
				ref="selection"
				within="image"
			>
				<cropper-grid role="grid" covered></cropper-grid>
				<cropper-crosshair centered></cropper-crosshair>
				<cropper-handle
					action="move"
					theme-color="rgba(255, 255, 255, 0.35)"
				></cropper-handle>
				<cropper-handle action="n-resize"></cropper-handle>
				<cropper-handle action="e-resize"></cropper-handle>
				<cropper-handle action="s-resize"></cropper-handle>
				<cropper-handle action="w-resize"></cropper-handle>
				<cropper-handle action="ne-resize"></cropper-handle>
				<cropper-handle action="nw-resize"></cropper-handle>
				<cropper-handle action="se-resize"></cropper-handle>
				<cropper-handle action="sw-resize"></cropper-handle>
			</cropper-selection>
		</cropper-canvas>
	</Dialog>
</template>

<script setup lang="ts">
import "cropperjs";
import { ref } from "vue";
import Dialog from "../dialog/dialog.vue";
import NamiButton from "../button/button.vue";

const props = withDefaults(
	defineProps<{
		buttonText?: string;
		color?: string;
		asyncOkCallback?: boolean;
	}>(),
	{
		buttonText: "上传图片",
		color: "#a5a9aa"
	}
);

const emits = defineEmits<{
	(
		e: "submit",
		data: { commentText: string; nickname: string; email: string; photoUrl: string },
		callback?: Function
	): void;
}>();

const src = ref("");
const dialogShow = ref(false);

const canvas = ref<HTMLElement | null>(null);
const image = ref<HTMLElement | null>(null);
const selection = ref<HTMLElement | null>(null);

// 点击上传图片按钮
const uploadImageEvent = () => {
	const file = document.createElement("input");
	file.type = "file";
	file.accept = "image/*";
	file.click();

	file.onchange = async () => {
		if (!file.files) {
			return;
		}

		src.value = URL.createObjectURL(file.files[0]);
		dialogShow.value = true;

		file.remove();
	};
};

function cancelHandle() {
	URL.revokeObjectURL(src.value);
}

async function okHandle(callback?: Function) {
	const canvas = await (selection.value as any)?.$toCanvas();
	emits("submit", canvas, callback);
	URL.revokeObjectURL(src.value);
}
</script>

<style scoped>
.cropper {
	height: calc(100% - 16px);
}

.image {
	width: 100%;
}
</style>
