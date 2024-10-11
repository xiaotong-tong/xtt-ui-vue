<template>
	<figure :style="customStyleOfWrapper">
		<img v-bind="$attrs" :alt="alt || description" />
		<figcaption v-if="description" :style="customStyleOfDesc">
			{{ description }}
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";

interface Props {
	customStyleOfWrapper?: StyleValue;
	customStyleOfDesc?: StyleValue;
	description?: string;
	groupName?: string;
	alt?: string;
}

const { description, alt, customStyleOfWrapper } = defineProps<Props>();
</script>

<style scoped>
@layer components.image {
	figure {
		margin: 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
	}

	figcaption {
		text-align: center;
		margin-top: 0.5em;
		font-size: 12px;
		color: #999;
	}
}
</style>
