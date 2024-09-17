<template>
	<div
		ref="markdownBodyRef"
		class="markdown-body"
		:class="{
			'text-line': props.textLine
		}"
	></div>
</template>

<script setup lang="ts">
import type { MaybeRef } from "vue";
import { ref, watch, unref, onMounted, nextTick, createApp, onUnmounted } from "vue";
import { gsap } from "gsap";
import { marked } from "../../utils/marked";

interface Props {
	content: MaybeRef<string>;
	theme?: "light" | "dark";
	textLine?: MaybeRef<boolean>;
}

const props = withDefaults(defineProps<Props>(), {
	content: ""
});

const markdownBodyRef = ref<HTMLElement>();

function openAnime() {
	// 如果还没有内容，提前返回
	if (!markdownBodyRef.value || !mdApp.value) {
		return;
	}

	const ract = markdownBodyRef.value.getBoundingClientRect();

	const tl = gsap.timeline();

	// 如果内容高度大于视口高度，先将可见区域范围内做个动画，再对整个内容做动画，防止高度过高，感受不到动画效果
	if (ract.height > (visualViewport?.height || window.innerHeight)) {
		tl.fromTo(
			markdownBodyRef.value,
			{
				height: 0,
				overflow: "hidden"
			},
			{
				height: visualViewport?.height,
				duration: 1
			}
		);

		tl.to(
			markdownBodyRef.value,
			{
				height: "auto",
				duration: 0.5
			},
			"+=0"
		);
	} else {
		tl.fromTo(
			markdownBodyRef.value,
			{
				height: 0,
				overflow: "hidden"
			},
			{
				height: "auto",
				duration: 1
			}
		);
	}

	tl.to(
		markdownBodyRef.value,
		{
			overflow: "auto"
		},
		"+=0"
	);

	tl.play();
}

const mdApp = ref<ReturnType<typeof createApp>>();
watch(
	() => props.content,
	async (content) => {
		mdApp.value?.unmount();

		if (!unref(content)) {
			return;
		}

		const html = await marked(unref(content));

		mdApp.value = createApp({
			template: html
		});

		mdApp.value.mount(markdownBodyRef.value!);

		nextTick(() => {
			openAnime();
		});
	},
	{
		immediate: true
	}
);

onMounted(() => {
	openAnime();
});

onUnmounted(() => {
	mdApp.value?.unmount();
});
</script>

<style>
@import "github-markdown-css";
</style>

<style scoped>
@layer components.markdown {
	.markdown-body ::v-deep(.code-line::before) {
		content: attr(data-line-num);
		display: inline-block;
		width: 2em;
		padding-right: 1em;
		text-align: right;
		color: var(--color-fg-muted);
	}
}

.markdown-body {
	--bgColor-default: transparent;
	--md-color-canvas-default: transparent;
	--md-color-canvas-subtle: transparent;
	--md-color-border-default: #d0d7de;
	--md-pre-bg-color: hsla(0deg, 0%, 95%, 0.4);

	max-width: 100%;
	overflow-x: auto;
	padding-block-start: 24px;
}
.theme-dark .markdown-body {
	--md-color-border-default: #30363d;
	--md-pre-bg-color: #1b2426;
	--fgColor-default: #cfd3dc;

	color: #cfd3dc;
}

.markdown-body ::v-deep(pre) {
	border: 1px solid var(--color-border-default);
	background-color: var(--md-pre-bg-color);
}

.markdown-body ::v-deep(pre code) {
	padding-inline-start: 0;
	/* color: var(--d-color, #24292e); */
}

.markdown-body.text-line ::v-deep(p) {
	border-block-end: 1px solid var(--d-color, #f2b25b);
}

/* 歌词样式重置 */
.markdown-body ::v-deep(:is(.lrc-lang-ja, #not-used-selector)) {
	margin-bottom: 8px;
}
.markdown-body ::v-deep(.lrc-lang-zh) {
	font-size: 12px;
}
/* 歌词样式重置 */

/* 下面内容由 github-markdown-css 复制并更改 */
.markdown-body {
	color-scheme: light;
	--color-prettylights-syntax-comment: #6e7781;
	--color-prettylights-syntax-constant: #0550ae;
	--color-prettylights-syntax-entity: #8250df;
	--color-prettylights-syntax-storage-modifier-import: #24292f;
	--color-prettylights-syntax-entity-tag: #116329;
	--color-prettylights-syntax-keyword: #cf222e;
	--color-prettylights-syntax-string: #0a3069;
	--color-prettylights-syntax-variable: #953800;
	--color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
	--color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
	--color-prettylights-syntax-invalid-illegal-bg: #82071e;
	--color-prettylights-syntax-carriage-return-text: #f6f8fa;
	--color-prettylights-syntax-carriage-return-bg: #cf222e;
	--color-prettylights-syntax-string-regexp: #116329;
	--color-prettylights-syntax-markup-list: #3b2300;
	--color-prettylights-syntax-markup-heading: #0550ae;
	--color-prettylights-syntax-markup-italic: #24292f;
	--color-prettylights-syntax-markup-bold: #24292f;
	--color-prettylights-syntax-markup-deleted-text: #82071e;
	--color-prettylights-syntax-markup-deleted-bg: #ffebe9;
	--color-prettylights-syntax-markup-inserted-text: #116329;
	--color-prettylights-syntax-markup-inserted-bg: #dafbe1;
	--color-prettylights-syntax-markup-changed-text: #953800;
	--color-prettylights-syntax-markup-changed-bg: #ffd8b5;
	--color-prettylights-syntax-markup-ignored-text: #eaeef2;
	--color-prettylights-syntax-markup-ignored-bg: #0550ae;
	--color-prettylights-syntax-meta-diff-range: #8250df;
	--color-prettylights-syntax-brackethighlighter-angle: #57606a;
	--color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
	--color-prettylights-syntax-constant-other-reference-link: #0a3069;
	--color-fg-default: #24292f;
	--color-fg-muted: #57606a;
	--color-fg-subtle: #6e7781;
	--color-canvas-default: var(--md-color-canvas-default);
	--color-canvas-subtle: var(--md-color-canvas-subtle);
	--color-border-default: var(--md-color-border-default);
	--color-border-muted: hsla(210, 18%, 87%, 1);
	--color-neutral-muted: rgba(175, 184, 193, 0.2);
	--color-accent-fg: #0969da;
	--color-accent-emphasis: #0969da;
	--color-attention-subtle: #fff8c5;
	--color-danger-fg: #cf222e;
}

/* 下面内容由 github-markdown-css 复制并更改 */
.theme-dark .markdown-body {
	color-scheme: dark;
	--color-prettylights-syntax-comment: #8b949e;
	--color-prettylights-syntax-constant: #79c0ff;
	--color-prettylights-syntax-entity: #d2a8ff;
	--color-prettylights-syntax-storage-modifier-import: #c9d1d9;
	--color-prettylights-syntax-entity-tag: #7ee787;
	--color-prettylights-syntax-keyword: #ff7b72;
	--color-prettylights-syntax-string: #a5d6ff;
	--color-prettylights-syntax-variable: #ffa657;
	--color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
	--color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
	--color-prettylights-syntax-invalid-illegal-bg: #8e1519;
	--color-prettylights-syntax-carriage-return-text: #f0f6fc;
	--color-prettylights-syntax-carriage-return-bg: #b62324;
	--color-prettylights-syntax-string-regexp: #7ee787;
	--color-prettylights-syntax-markup-list: #f2cc60;
	--color-prettylights-syntax-markup-heading: #1f6feb;
	--color-prettylights-syntax-markup-italic: #c9d1d9;
	--color-prettylights-syntax-markup-bold: #c9d1d9;
	--color-prettylights-syntax-markup-deleted-text: #ffdcd7;
	--color-prettylights-syntax-markup-deleted-bg: #67060c;
	--color-prettylights-syntax-markup-inserted-text: #aff5b4;
	--color-prettylights-syntax-markup-inserted-bg: #033a16;
	--color-prettylights-syntax-markup-changed-text: #ffdfb6;
	--color-prettylights-syntax-markup-changed-bg: #5a1e02;
	--color-prettylights-syntax-markup-ignored-text: #c9d1d9;
	--color-prettylights-syntax-markup-ignored-bg: #1158c7;
	--color-prettylights-syntax-meta-diff-range: #d2a8ff;
	--color-prettylights-syntax-brackethighlighter-angle: #8b949e;
	--color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
	--color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
	--color-fg-default: #c9d1d9;
	--color-fg-muted: #8b949e;
	--color-fg-subtle: #6e7681;
	--color-canvas-default: var(--md-color-canvas-default);
	--color-canvas-subtle: var(--md-color-canvas-subtle);
	--color-border-default: var(--md-color-border-default);
	--color-border-muted: #21262d;
	--color-neutral-muted: rgba(110, 118, 129, 0.4);
	--color-accent-fg: #58a6ff;
	--color-accent-emphasis: #1f6feb;
	--color-attention-subtle: rgba(187, 128, 9, 0.15);
	--color-danger-fg: #f85149;
}
</style>
