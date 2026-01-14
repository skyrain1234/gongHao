import { loadingAlert } from "@/utils/sweetalert";
/**
 * 非同步函式包裝，防止重複載入
 *
 * @param {Ref<boolean>} loadingRef 載入狀態為true、false
 * @param {boolean} loadingAnimationBoolean 是否顯示載入動畫
 * @param {string} loadingText 載入文字
 * @returns
 */

export const useLoadingWrapper = (
	loadingRef,
	loadingAnimationBoolean = false,
	loadingText = "載入中..."
) => {
	return async (callback) => {
		if (loadingRef.value) return;
		loadingRef.value = true;
		try {
			if (loadingAnimationBoolean) loadingAlert(loadingText);
			await callback();
		} finally {
			loadingRef.value = false;
		}
	};
};
