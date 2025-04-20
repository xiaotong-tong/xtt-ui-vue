<template>
	<canvas ref="live2dCanvas"></canvas>
</template>

<script setup lang="ts">
import { Application, Ticker, TickerPlugin } from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/cubism4";
import { ref, onMounted } from "vue";

const live2dCanvas = ref<HTMLCanvasElement>();
Live2DModel.registerTicker(Ticker);
Application.registerPlugin(TickerPlugin);

onMounted(async () => {
	const app = new Application({
		view: live2dCanvas.value,
		autoStart: true,
		backgroundAlpha: 0,
		width: 170,
		height: 320
	});

	const model = await Live2DModel.from(
		// "https://file.xtt.cool/local/%E6%B4%97%E7%BF%A0%E7%B4%A2%E7%BD%97%E4%BA%9A/%E6%B4%97%E7%BF%A0%E7%B4%A2%E7%BD%97%E4%BA%9A.model3.json"
		"https://file.xtt.cool/local/nami/nami.model3.json"
	);

	model.scale.set(0.05);
	model.x = 0;
	model.y = 0;

	app.stage.addChild(model);
});
</script>

<style scoped>
canvas {
	position: fixed;
	inset-block-end: 64px;
	inset-inline-start: 64px;
}
</style>
