<template>
	<button
		class="nami-button"
		:class="{
			'button-inline-block': props.inlineBlock,
			'button-block': props.block
		}"
		ref="button"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
const props = defineProps({
	inlineBlock: {
		type: Boolean,
		default: false
	},
	block: {
		type: Boolean,
		default: false
	}
});
</script>

<style scoped>
@layer components.textButton {
	.nami-button {
		display: inline;
		cursor: pointer;
		text-decoration: none;
		padding-inline: 8px;
	}

	.nami-button.button-inline-block {
		display: inline-flex;
	}

	.nami-button.button-block {
		display: flex;
		width: 100%;
	}

	.nami-button:is(.button-inline-block, .button-block) {
		align-items: center;
		max-width: 100%;
		box-sizing: border-box;
		padding: 4px 10px;
		justify-content: center;
	}

	.nami-button[type="primary"] {
		color: #8bcecb;
	}
}
</style>
