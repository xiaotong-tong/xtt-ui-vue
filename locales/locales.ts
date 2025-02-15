import { lang } from "../utils/config";
import { ref, watch } from "vue";

const i18nMap = {
	zh: {
		dialog: {
			okText: "确定",
			cancelText: "取消"
		}
	},
	ja: {
		dialog: {
			okText: "確定",
			cancelText: "キャンセル"
		}
	}
};

export const curI18n = ref(i18nMap[lang.value]);

watch(lang, (newVal) => {
	curI18n.value = i18nMap[newVal];
});
