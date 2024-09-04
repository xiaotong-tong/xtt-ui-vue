<template>
	<Teleport to="body">
		<dialog
			ref="dialogRef"
			class="dialog"
			:style="{
				'--dialog-width':
					typeof props.width === 'number' ? `${props.width}px` : props.width,
				'--dialog-height':
					typeof props.height === 'number' ? `${props.height}px` : props.height
			}"
		>
			<svg ref="decorationRef" class="decoration"></svg>
			<section class="content" v-bind="$attrs">
				<div class="main">
					<slot></slot>
				</div>
				<slot name="footer">
					<div class="footer">
						<NamiButton @click="cancelHandle" :borderColor="props.color">{{
							props.cancelText
						}}</NamiButton>
						<NamiButton
							@click="okHandle"
							:loading="okBtnLoading"
							:borderColor="props.color"
							>{{ props.okText }}</NamiButton
						>
					</div>
				</slot>
			</section>
			<button v-if="props.closeBtn" class="close" @click="cancelHandle">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</dialog>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import NamiButton from "../button/button.vue";
import rough from "roughjs";
import { css } from "xtt-utils";

interface Props {
	color?: string;
	width?: number | string;
	height?: number | string;
	closeBtn?: boolean;
	okText?: string;
	asyncOkCallback?: boolean;
	cancelText?: string;
}

const props = withDefaults(defineProps<Props>(), {
	color: "#a5a9aa",
	width: 800,
	height: 500,
	closeBtn: true,
	okText: "确定",
	cancelText: "取消",
	asyncOkCallback: false
});

const emits = defineEmits<{
	(e: "ok", callback?: Function): void;
	(e: "cancel"): void;
}>();

const dialogRef = ref<HTMLDialogElement>();

// dialog 显示隐藏
const show = defineModel("show", { type: Boolean, default: false });
watch(show, (val) => {
	dialogRef.value?.[val ? "showModal" : "close"]();
	if (val) {
		addDecoration();

		// 查询当前页面中共有多少个 dialog 在打开中
		// 如果有打开的 dialog, 就向下移动 16px, 以作提示多重打开
		const opendDialog = document.querySelectorAll("dialog[open]");
		css(dialogRef.value!, "--dialog-opend-number", opendDialog.length + "");
	}
});

const okBtnLoading = ref(false);
function okHandle() {
	if (okBtnLoading.value) return;

	if (props.asyncOkCallback) {
		okBtnLoading.value = true;
	}
	emits("ok", () => {
		okBtnLoading.value = false;
		show.value = false;
	});

	if (!props.asyncOkCallback) {
		show.value = false;
	}
}
function cancelHandle() {
	emits("cancel");
	show.value = false;
}

// 添加装饰
const decorationRef = ref<SVGSVGElement>();
function addDecoration() {
	if (!decorationRef.value) return;
	if (!dialogRef.value) return;

	const svg = decorationRef.value;
	const { width: w, height: h } = dialogRef.value.getBoundingClientRect();

	svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
	const rc = rough.svg(svg);

	// 添加线条
	const path1 = rc.path(
		`M0 16 L${w / 3} 16 Z M16 0 L16 ${h / 1.5} Z M${w - 16} ${h} L${w - 16} ${
			h - h / 1.5
		} Z M${w} ${h - 16} L${w - w / 3} ${h - 16} Z`,
		{
			stroke: props.color,
			strokeWidth: 1,
			roughness: 4,
			bowing: 0.5
		}
	);

	path1.classList.add("path1");
	const oldLine1 = decorationRef.value.querySelector(".path1");
	if (oldLine1) {
		oldLine1?.replaceWith(path1);
	} else {
		decorationRef.value.appendChild(path1);
	}
}

onUnmounted(() => {
	dialogRef.value?.close();
});

// 监听 ESC 键
window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		cancelHandle();
	}
});
</script>

<style scoped>
@layer components.dialog {
	.dialog {
		display: none;
		width: var(--dialog-width, 800px);
		height: var(--dialog-height, 500px);
		padding: 20px;
		background-color: #ffffff;
		box-shadow: 0 0 10px 0 #00000033;
		transform: translateY(calc((var(--dialog-opend-number, 1) - 1) * 16px));

		& > .decoration {
			position: absolute;
			inset: 0;
		}

		& > .content {
			position: relative;
			height: 100%;
			padding: 8px;
			display: flex;
			flex-direction: column;

			& .main {
				flex: 1;
				overflow: auto;
			}

			& .footer {
				display: flex;
				justify-content: flex-end;
				gap: 8px;
			}
		}

		& > .close {
			position: absolute;
			top: 10px;
			right: 10px;
			width: 24px;
			height: 24px;
			color: #928575;
		}
	}

	.dialog[open] {
		display: block;
	}
}
</style>
