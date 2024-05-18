import { App } from "vue";
import roughLine from "./components/line/rough/index.vue";
import roughCard from "./components/card/rough/index.vue";

const withInstall = (app: App) => {
	app.component("namiRoughLine", roughLine);
	app.component("namiRoughCard", roughCard);
};

export { roughLine, roughCard, withInstall, withInstall as default };
