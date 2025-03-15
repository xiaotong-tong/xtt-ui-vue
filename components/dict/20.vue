<template>
	<div class="dict-20">
		<div
			ref="dictRef"
			class="dict-wrapper"
			@mousemove="handleMouseMove"
			:style="{
				transform: `rotate(${rotateX}deg) rotateY(${rotateY}deg)`
			}"
		>
			<!-- 十二个顶点 -->
			<div
				class="vertex"
				v-for="(vertex, index) in dictVertexMap"
				:style="{
					transform: `translate3d(${vertex[0]}px, ${vertex[1]}px, ${vertex[2]}px)`
				}"
			></div>

			<!-- 20个面 -->
			<!-- <div class="face face-1">1</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { unref, ref, onMounted, watch, useTemplateRef, computed } from "vue";
import { useElementSize } from "@vueuse/core";

interface Props {
	size?: MaybeRef<number | string>;
}

const { size } = defineProps<Props>();

const dictRef = useTemplateRef<HTMLDivElement>("dictRef");
const { width } = useElementSize(dictRef);

// 获取正20面体的顶点坐标
const dictVertexMap = ref<number[][]>([]);
const getDict20Vertex = () => {
	// 黄金比例
	const phi = (1 + Math.sqrt(5)) / 2;
	// 外接圆半径
	const d = width.value / 2;
	// 正20面体的顶点坐标
	/* 
(0,±1,±ϕ),
(±1,±ϕ,0),
(±ϕ,0,±1)
 */
	dictVertexMap.value = [
		[0, d, d / phi],
		[0, -d, d / phi],
		[0, d, -d / phi],
		[0, -d, -d / phi],
		[d, d / phi, 0],
		[-d, d / phi, 0],
		[d, -d / phi, 0],
		[-d, -d / phi, 0],
		[d / phi, 0, d],
		[d / phi, 0, -d],
		[-d / phi, 0, d],
		[-d / phi, 0, -d]
	];
};

// 获取正20面体中两点之间的连线边长
const getDict20EdgeLength = computed(() => {
	const dictVertexMapValue = unref(dictVertexMap);
	if (!dictVertexMapValue.length) return 0;
	// 因为所有边长都是一样的，所以只需要计算一次
	const [x1, y1, z1] = dictVertexMapValue[0];
	const [x2, y2, z2] = dictVertexMapValue[2];
	// 两点之间的距离
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
});

// 旋转角度
const rotateX = ref(0);
const rotateY = ref(0);

const handleMouseMove = (event: MouseEvent) => {
	if (dictRef.value) {
		const { clientX, clientY } = event;
		const { width, height } = dictRef.value.getBoundingClientRect();
		const x = clientY % 360;
		const y = clientX % 360;
		rotateX.value = x;
		rotateY.value = y;
	}
};

onMounted(() => {
	getDict20Vertex();
});
</script>

<style scoped>
@layer components.dict.dict20 {
	.dict-20 {
		--container-width: 200px;
		--face-width: var(--container-width) / 2;
		perspective: 1000px;
		overflow: hidden;
		width: var(--container-width);
		aspect-ratio: 1 / 1;
	}
	.dict-wrapper {
		position: relative;
		width: 100%;
		height: 100%;

		/* 开启 3d */
		transform-style: preserve-3d;
		transform-origin: center;

		.vertex {
			--vertex-size: 8px;
			width: var(--vertex-size);
			height: var(--vertex-size);
			background-color: #000;
			position: absolute;
			left: calc(50% - var(--vertex-size) / 2);
			top: calc(50% - var(--vertex-size) / 2);
		}

		.face {
			position: absolute;
			left: 50%;
			top: 0;
			width: 0;
			height: 0;
			border-left: var(--face-width) solid transparent;
			border-right: var(--face-width) solid transparent;
			border-bottom: calc(var(--face-width) * 1.732) solid #000;
			background-color: rgba(0, 0, 0, 0.1);
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transform-origin: center;
		}
	}
}
</style>
