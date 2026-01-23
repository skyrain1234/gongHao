<template>
	<Head>
		<title>{{ webSetting.webSetting.site_title }}</title>
		<meta
			name="description"
			:content="webSetting.webSetting.site_description"
		/>
		<meta name="keywords" :content="webSetting.webSetting.site_keywords" />
	</Head>

	<div>
		<GuestHeader />
		<main>
			<router-view></router-view>
		</main>
		<GuestFooter />
	</div>
</template>

<script setup>
import GuestHeader from "./GuestHeader.vue";
import GuestFooter from "./GuestFooter.vue";

import { onMounted, watch, computed } from "vue";
import { Head } from "@unhead/vue/components";
import { useWebSettingStore } from "@/stores/webSetting";
import { useRoute } from "vue-router";

import { useHead } from "@unhead/vue";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import { appConfig } from "@/config/appConfig.js";
import parseTaiwanAddress, {
	toPostalAddress,
} from "@/api/main/tools/parseTaiwanAddress";

const webSetting = useWebSettingStore();
const route = useRoute();

onMounted(async () => {
	await webSetting.loadWebSetting();
});

/** 只負責「頁面的 body class」，不影響 theme-dark / nav-on */
let lastPageClass = null;

function updateBodyClass() {
	const pageClass = route.meta.class;

	// 移除前一個 page class（如果有）
	if (lastPageClass) {
		document.body.classList.remove(lastPageClass);
	}

	// 加上這一頁的 page class
	if (pageClass) {
		document.body.classList.add(pageClass);
	}

	lastPageClass = pageClass || null;
}

// 載入當下先跑一次
onMounted(() => {
	updateBodyClass();
});

// meta.class 變動時更新
watch(
	() => route.meta.class,
	() => {
		updateBodyClass();
	}
);

// ===== JSON-LD =====
const parsed = computed(() =>
	parseTaiwanAddress(webSetting.webSetting.address, { preferTai: "臺" })
);

const ld = computed(() => ({
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: webSetting.webSetting.name,
	image: getStorageFileUrl(webSetting.webSetting.site_logo),
	url: appConfig.appUrl,
	telephone: webSetting.webSetting.contact_phone,
	address: toPostalAddress(parsed.value),
	geo: appConfig.geo,
	openingHoursSpecification: appConfig.openingHours,
	sameAs: [
		webSetting.webSetting.facebook_link,
		webSetting.webSetting.instagram_link,
		webSetting.webSetting.line_link,
	],
	description: webSetting.webSetting.site_description,
}));

useHead({
	script: [
		{
			type: "application/ld+json",
			innerHTML: JSON.stringify(ld.value),
		},
	],
});
</script>

<style lang="scss"></style>
