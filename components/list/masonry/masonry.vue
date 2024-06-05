<template>
	<component class="list" ref="list" :is="props.wrapperTargetName">
		<slot :width="itemWidth"></slot>
	</component>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { ref, unref, watch } from "vue";
import { useElementSize, useMutationObserver } from "@vueuse/core";
import { gsap } from "gsap";

interface Props {
	wrapperTargetName?: string;
	cols?: MaybeRef<number>;
	columnGap?: MaybeRef<number>;
	rowGap?: MaybeRef<number>;
}

const props = withDefaults(defineProps<Props>(), {
	wrapperTargetName: "ul",
	cols: 4,
	columnGap: 0,
	rowGap: 0
});

const emits = defineEmits<{
	resize: [width: number];
}>();

const list = ref<HTMLElement | null>(null);

const colsCount = ref(unref(props.cols)); // 当前总计列数
const colsHeight = ref(new Array(unref(colsCount)).fill(0)); // 每列的高度

const { width } = useElementSize(list);
const itemWidth = ref(0);

function initItem(node: HTMLElement) {
	if (!width.value) return;

	const minIndex = colsHeight.value.indexOf(Math.min(...colsHeight.value));
	const min = colsHeight.value[minIndex];

	itemWidth.value =
		(width.value - unref(props.columnGap) * (unref(colsCount) - 1)) / unref(colsCount);

	node.style.width = `${itemWidth.value}px`;
	node.style.transform = `translateY(${min}px) translateX(${
		minIndex * (unref(itemWidth) + unref(props.columnGap))
	}px`;

	gsap.fromTo(
		node,
		{
			opacity: 0,
			y: min + 50
		},
		{
			opacity: 1,
			duration: 1,
			y: min,
			ease: "power2.out"
		}
	);

	colsHeight.value[minIndex] += node.offsetHeight + unref(props.rowGap);

	list.value!.style.height = `${Math.max(...colsHeight.value)}px`;
}

useMutationObserver(
	list,
	(mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === "childList") {
				mutation.addedNodes.forEach((node: Node) => {
					if (node.nodeType === 1) {
						initItem(node as HTMLElement);
					}
				});
			}
		});
	},
	{
		childList: true
	}
);

watch(width, () => {
	emits("resize", unref(width));
	if (list.value?.children.length) {
		colsHeight.value.fill(0);
		for (const node of list.value.children) {
			initItem(node as HTMLElement);
		}
	}
});

watch(
	() => props.cols,
	(value) => {
		colsCount.value = unref(value);
		colsHeight.value = Array(unref(value)).fill(0);
	}
);
</script>

<style scoped>
.list {
	display: block;
	box-sizing: border-box;
	width: 100%;
	position: relative;
}
</style>
