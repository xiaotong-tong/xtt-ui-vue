<template>
	<Icon class="soundTrigger" icon="mdiVolumeHigh" v-bind="$attrs" @click="play" v-show="audioCanplay"></Icon>
	<audio ref="audioRef" :preload="preload" :src="src" @canplay="canplay"></audio>
</template>

<script setup lang="ts">
import { useTemplateRef, ref } from "vue";
import Icon from "../icon/icon.vue";

interface Props {
	src: string;
	preload?: "none" | "metadata" | "auto";
}

const { src, preload = "metadata" } = defineProps<Props>();

const audioRef = useTemplateRef<HTMLAudioElement>("audioRef");

const playing = ref(false);
const play = () => {
	if (playing.value) {
		audioRef.value?.pause();
		playing.value = false;
		return;
	}

	audioRef.value
		?.play()
		.then(() => {
			playing.value = true;
		})
		.catch((error) => {
			console.error("Error playing audio:", error);
		});
};

const audioCanplay = ref(false);
const canplay = () => {
	audioCanplay.value = true;
};
if (preload === "none") {
	audioCanplay.value = true;
}
</script>

<style scoped>
@layer components.sound {
	.soundTrigger {
		cursor: pointer;
	}
}
</style>
