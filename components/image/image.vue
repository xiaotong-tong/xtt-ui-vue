<template>
	<figure :style="customStyleOfWrapper">
		<img
			v-bind="$attrs"
			:src="src"
			:alt="alt || description"
			:data-group="groupName || id"
			@click="handleImageClick"
		/>
		<figcaption v-if="description" :style="customStyleOfDesc">
			{{ description }}
		</figcaption>
	</figure>

	<!-- Full view -->
	<Dialog
		v-if="fullView"
		class="fullviewDialog"
		v-model:show="fullViewDialogShow"
		width="90lvw"
		height="90lvh"
		:footer="false"
		transparent
		:customStyleOfCloseBtn="{
			width: '36px',
			height: '36px'
		}"
	>
		<figure class="fullview">
			<img :src="src" :alt="alt || description" :data-group="groupName || id" />
			<figcaption v-if="description" :style="customStyleOfDesc">
				{{ description }}
			</figcaption>
		</figure>
	</Dialog>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";
import { useId, ref } from "vue";
import Dialog from "../dialog/dialog.vue";

interface Props {
	customStyleOfWrapper?: StyleValue;
	customStyleOfDesc?: StyleValue;
	description?: string;
	groupName?: string;
	alt?: string;
	fullView?: boolean;
	src: string;
}

const { description, alt, customStyleOfWrapper, groupName, fullView = false, src } = defineProps<Props>();

const id = useId();

function handleImageClick() {
	if (fullView !== false) {
		fullViewDialogShow.value = true;
	}
}

const fullViewDialogShow = ref(false);
</script>

<style scoped>
@layer components.image {
	figure {
		margin: 0;
	}

	img {
		display: block;
		max-width: 100%;
		height: auto;
	}

	figcaption {
		text-align: center;
		margin-top: 0.5em;
		font-size: 12px;
		color: #999;
	}

	.fullview {
		width: 100%;
		height: 100%;

		& > img {
			width: 100%;
			height: calc(100% - 1.5em);
			object-fit: contain;
		}
	}
}
</style>
