// src/composables/useCurrentLang.js
import { computed } from "vue";
import { useRoute } from "vue-router";

/**
 * 目前語系：
 * 1. 優先讀 route.params.lang
 * 2. 再讀 localStorage.locale
 * 3. 最後預設 zh-TW
 */
export function useCurrentLang() {
	const route = useRoute();

	const currentLang = computed(() => {
		return localStorage.getItem("locale") || route.params?.lang ||  "zh-TW";
	});

	return {
		currentLang,
	};
}
