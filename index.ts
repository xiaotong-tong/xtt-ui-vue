import { App } from "vue";
import roughLine from "./components/line/rough/index.vue";
import roughCard from "./components/card/rough/index.vue";
import roughIcon from "./components/icon/rough/index.vue";

const withInstall = (app: App) => {
	app.component("namiRoughLine", roughLine);
	app.component("namiRoughCard", roughCard);
	app.component("namiRoughIcon", roughIcon);
};

export { roughLine, roughCard, roughIcon, withInstall, withInstall as default };
