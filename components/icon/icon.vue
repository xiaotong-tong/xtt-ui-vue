<template>
	<i class="icon">
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path :d="reflectIcon(props.icon)"></path>
		</svg>
	</i>
</template>

<script setup lang="ts">
import {
	mdiHomeOutline,
	mdiPower,
	mdiLogin,
	mdiEmailOpenHeartOutline,
	mdiBookEditOutline,
	mdiClose,
	mdiRobotConfusedOutline,
	mdiVolumeHigh,
	mdiMusicNote,
	mdiThemeLightDark,
	mdiPenPlus,
	mdiGithub,
	mdiMapSearchOutline,
	mdiReplyOutline,
	mdiArrowLeft,
	mdiFormatFont,
	mdiChatOutline,
	mdiChatRemoveOutline,
	mdiChevronDown,
	mdiTranslate,
	mdiCat,
	mdiPaw,
	mdiMenu,
	mdiContentCopy,
	mdiAnimationPlayOutline,
	mdiBookOpenBlankVariantOutline,
	mdiDeleteOutline,
	mdiClockOutline,
	mdiUpdate,
	mdiCloseCircle,
	mdiCursorMove,
	mdiCheckCircleOutline
} from "@mdi/js";

interface Props {
	icon:
		| "mdiHomeOutline"
		| "mdiPower"
		| "mdiLogin"
		| "mdiEmailOpenHeartOutline"
		| "mdiBookEditOutline"
		| "mdiClose"
		| "mdiRobotConfusedOutline"
		| "mdiVolumeHigh"
		| "mdiMusicNote"
		| "mdiThemeLightDark"
		| "mdiPenPlus"
		| "mdiGithub"
		| "mdiMapSearchOutline"
		| "mdiReplyOutline"
		| "mdiArrowLeft"
		| "mdiFormatFont"
		| "mdiChatOutline"
		| "mdiChatRemoveOutline"
		| "mdiChevronDown"
		| "mdiTranslate"
		| "mdiCat"
		| "mdiPaw"
		| "mdiMenu"
		| "mdiContentCopy"
		| "mdiAnimationPlayOutline"
		| "mdiBookOpenBlankVariantOutline"
		| "mdiDeleteOutline"
		| "mdiClockOutline"
		| "mdiUpdate"
		| "mdiCloseCircle"
		| "mdiCursorMove"
		| "mdiCheckCircleOutline";
}

const props = withDefaults(defineProps<Props>(), {
	icon: "mdiPower"
});

const reflectIcon = (icon: Props["icon"]) => {
	const mdiMap = {
		mdiHomeOutline,
		mdiPower,
		mdiLogin,
		mdiEmailOpenHeartOutline,
		mdiBookEditOutline,
		mdiClose,
		mdiRobotConfusedOutline,
		mdiVolumeHigh,
		mdiMusicNote,
		mdiThemeLightDark,
		mdiPenPlus,
		mdiGithub,
		mdiMapSearchOutline,
		mdiReplyOutline,
		mdiArrowLeft,
		mdiFormatFont,
		mdiChatOutline,
		mdiChatRemoveOutline,
		mdiChevronDown,
		mdiTranslate,
		mdiCat,
		mdiPaw,
		mdiMenu,
		mdiContentCopy,
		mdiAnimationPlayOutline,
		mdiBookOpenBlankVariantOutline,
		mdiDeleteOutline,
		mdiClockOutline,
		mdiUpdate,
		mdiCloseCircle,
		mdiCursorMove,
		mdiCheckCircleOutline
	};

	return mdiMap[icon];
};
</script>

<style scoped>
.icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	fill: currentColor;
}

.theme-dark .icon {
	color: #cfd3dc;
	stroke: currentColor;
}
</style>
