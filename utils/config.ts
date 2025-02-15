import { ref } from "vue";

export const defaultColor = ref("#f4b6d1");
export const isDark = ref(false);
export const lang = ref<"zh" | "ja">("zh");

export default {
	defaultColor,
	isDark,
	lang
};
