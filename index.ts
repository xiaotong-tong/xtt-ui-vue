import type { App } from "vue";
import "./index.css";

import config from "./utils/config";

import roughLine from "./components/line/rough/index.vue";
import roughCard from "./components/card/rough/index.vue";
import roughFullCard from "./components/card/rough/full.vue";
import LineCard from "./components/card/line.vue";
import roughIcon from "./components/icon/rough/index.vue";
import webBG from "./components/web-bg/index.vue";
import icon from "./components/icon/index.vue";
import BaseIcon from "./components/icon/icon.vue";
import listMasonry from "./components/list/masonry/masonry.vue";
import listMasonryItem from "./components/list/masonry/masonryItem.vue";
import hBanner from "./components/hBanner/hBanner.vue";
// import live2d from "./components/live2d/index.vue";
import markdown from "./components/markdown/markdown.vue";
import qrCode from "./components/qrcode/qrcode.vue";
import lineButton from "./components/button/lineButton.vue";
import Button from "./components/button/button.vue";
import TextButton from "./components/button/textButton.vue";
import Link from "./components/link/link.vue";
import Dialog from "./components/dialog/dialog.vue";
import Cropper from "./components/cropper/cropper.vue";
import Tag from "./components/tag/tag.vue";
import Image from "./components/image/image.vue";
import Menu from "./components/menu/menu.vue";
import MenuItem from "./components/menu/menuItem.vue";
import FieldsetCard from "./components/card/fieldset.vue";
import Panel from "./components/panel/panel.vue";
import TextArea from "./components/textarea/textarea.vue";
import Alert from "./components/alert/alert.vue";
import Sound from "./components/sound/sound.vue";

import { useMessage } from "./components/message/useMessage";

const withInstall = (app: App) => {
	app.component("namiIcon", BaseIcon);
	app.component("namiRoughLine", roughLine);
	app.component("namiRoughCard", roughCard);
	app.component("namiRoughIcon", roughIcon);
	app.component("namiWebBG", webBG);
	app.component("namiListMasonry", listMasonry);
	app.component("namiListMasonryItem", listMasonryItem);
	app.component("namiLink", Link);
};

export {
	roughLine,
	roughCard,
	roughFullCard,
	LineCard,
	roughIcon,
	icon as Icon,
	BaseIcon,
	webBG,
	listMasonry,
	listMasonryItem,
	hBanner,
	// live2d,
	markdown,
	qrCode,
	lineButton,
	Button as NamiButton,
	TextButton,
	Dialog as Modal,
	Link,
	Cropper,
	Tag,
	Image,
	Menu,
	MenuItem,
	FieldsetCard,
	Panel,
	TextArea,
	Alert,
	Sound,
	withInstall,
	withInstall as default,
	config,
	useMessage
};
