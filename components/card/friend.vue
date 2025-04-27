<template>
	<FieldsetCard>
		<a class="friend" :href="link" target="_blank" rel="noopener noreferrer">
			<img class="logo" :src="logo" :alt="name" />
			<div>
				<div>{{ name }}</div>
				<div>{{ description }}</div>
			</div>
		</a>
	</FieldsetCard>
</template>

<script setup lang="ts">
import FieldsetCard from "./fieldset.vue";

interface Props {
	name: string;
	link: string;
	description?: string;
	logo?: string;
}

const {
	name,
	link,
	description = "喵喵喵？这里需要填什么喵？",
	logo = "https://image.xtt.cool/images/mlian2.md.webp"
} = defineProps<Props>();
</script>

<style scoped>
@layer components.card.friend {
	.friend {
		height: 50px;
		display: flex;
		align-items: center;
		column-gap: 8px;

		.logo {
			width: 40px;
			height: 40px;
		}
	}
}
</style>
