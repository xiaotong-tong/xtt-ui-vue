import type { App } from "vue";
import roughLine from "./components/line/rough/index.vue";
import roughCard from "./components/card/rough/index.vue";
import roughIcon from "./components/icon/rough/index.vue";
import webBG from "./components/web-bg/index.vue";
import icon from "./components/icon/index.vue";
import listMasonry from "./components/list/masonry/masonry.vue";
import listMasonryItem from "./components/list/masonry/masonryItem.vue";

const withInstall = (app: App) => {
	app.component("namiRoughLine", roughLine);
	app.component("namiRoughCard", roughCard);
	app.component("namiRoughIcon", roughIcon);
	app.component("namiCIcon", icon);
	app.component("namiWebBG", webBG);
	app.component("namiListMasonry", listMasonry);
	app.component("namiListMasonryItem", listMasonryItem);
};

export {
	roughLine,
	roughCard,
	roughIcon,
	icon,
	webBG,
	listMasonry,
	listMasonryItem,
	withInstall,
	withInstall as default
};
