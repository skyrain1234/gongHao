import { ref } from "vue";
import { defineStore } from "pinia";
import { getWebSetting } from "@/api/main/service/webSettingService";

export const useWebSettingStore = defineStore(
	"webSetting",
	() => {
		const webSetting = ref([]);

		const loadWebSetting = async () => {
			const response = await getWebSetting();
			if (response === undefined) return;
			webSetting.value = response;
		};

		return { webSetting, loadWebSetting };
	},
	{
		persist: {
			storage: sessionStorage, // 或 localStorage
		},
	}
);
