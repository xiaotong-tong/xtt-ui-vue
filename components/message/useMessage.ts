import type { MaybeRef } from "vue";
import { VNode, h, render, unref } from "vue";
import messageVue from "./message.vue";
import { uniqueNumber } from "../../utils/unique";

interface Props {
	color?: MaybeRef<string>;
	duration?: number;
	isDark?: MaybeRef<boolean>;
	type?: "error";
}

let containerElement: HTMLElement | null = null;
function renderContainer(): HTMLElement {
	// 如果 containerElement 存在，则直接返回
	if (containerElement) {
		return containerElement;
	}
	containerElement = document.createElement("div");
	containerElement.id = "nami-message-box-" + uniqueNumber();
	Object.assign(containerElement.style, {
		position: "fixed",
		top: "24px",
		left: "0",
		right: "0",
		bottom: "0",
		zIndex: "9999",
		display: "flex",
		gap: "16px",
		flexDirection: "column",
		alignItems: "center",
		pointerEvents: "none"
	});

	// 将 container 添加到 body 上
	document.body.appendChild(containerElement);
	return containerElement;
}

function renderMessage(message: string, props?: Props): VNode {
	const container = renderContainer();

	const messageBox = document.createElement("div");
	messageBox.id = "nami-message-" + uniqueNumber();
	messageBox.style.display = "contents";

	props = props || {};
	props.duration = props.duration || 5000;

	// 创建虚拟dom
	const messageVNode = h(messageVue, props || {}, () => message);
	// 渲染虚拟 dom 到 container 上
	render(messageVNode, messageBox);
	// 将 messageBox 添加到 container 上
	container.appendChild(messageBox);

	setTimeout(() => {
		// 移除 messageBox
		container.removeChild(messageBox);
	}, unref(props.duration) + 1000);

	return messageVNode;
}

export const useMessage = () => {
	const $message = (message: string, props?: Props) => {
		renderMessage(message, props);
	};

	$message.error = (message: string, props?: Props) => {
		props = props || {};
		props.type = "error";
		renderMessage(message, props);
	};

	return $message;
};
