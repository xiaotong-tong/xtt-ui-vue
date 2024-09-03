import "./index.css";

import type { App } from "vue";
import roughLine from "./components/line/rough/index.vue";
import roughCard from "./components/card/rough/index.vue";
import roughIcon from "./components/icon/rough/index.vue";
import webBG from "./components/web-bg/index.vue";
import icon from "./components/icon/index.vue";
import listMasonry from "./components/list/masonry/masonry.vue";
import listMasonryItem from "./components/list/masonry/masonryItem.vue";
import hBanner from "./components/hBanner/hBanner.vue";
// import live2d from "./components/live2d/index.vue";
import markdown from "./components/markdown/markdown.vue";
import qrCode from "./components/qrcode/qrcode.vue";
import lineButton from "./components/button/lineButton.vue";
import Button from "./components/button/button.vue";
import Link from "./components/link/link.vue";
import Dialog from "./components/dialog/dialog.vue";
import Cropper from "./components/cropper/cropper.vue";

const withInstall = (app: App) => {
	app.component("namiRoughLine", roughLine);
	app.component("namiRoughCard", roughCard);
	app.component("namiRoughIcon", roughIcon);
	app.component("namiCIcon", icon);
	app.component("namiWebBG", webBG);
	app.component("namiListMasonry", listMasonry);
	app.component("namiListMasonryItem", listMasonryItem);
	app.component("namiHBanner", hBanner);
	// app.component("namiLive2d", live2d);
	app.component("namiMarkdown", markdown);
	app.component("namiQrCode", qrCode);
	app.component("namiLineButton", lineButton);
	app.component("namiLink", Link);
};

export {
	roughLine,
	roughCard,
	roughIcon,
	icon,
	webBG,
	listMasonry,
	listMasonryItem,
	hBanner,
	// live2d,
	markdown,
	qrCode,
	lineButton as NamiLineButton,
	Button as NamiButton,
	Dialog as Modal,
	Link,
	Cropper,
	withInstall,
	withInstall as default
};
