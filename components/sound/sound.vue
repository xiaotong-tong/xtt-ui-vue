<template>
	<Icon class="soundTrigger" icon="mdiVolumeHigh" v-bind="$attrs" @click="play" v-show="audioCanplay"></Icon>
	<audio ref="audioRef" preload="metadata" :src="src" @canplay="canplay"></audio>
</template>

<script setup lang="ts">
import { useTemplateRef, ref } from "vue";
import Icon from "../icon/icon.vue";

interface Props {
	src: string;
}

const { src } = defineProps<Props>();

const audioRef = useTemplateRef<HTMLAudioElement>("audioRef");

const play = () => {
	audioRef.value?.play().catch((error) => {
		console.error("Error playing audio:", error);
	});
};

const audioCanplay = ref(false);
const canplay = () => {
	audioCanplay.value = true;
};
</script>

<style scoped>
@layer components.sound {
	.soundTrigger {
		cursor: pointer;
	}
}
</style>
