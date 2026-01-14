import { fetchData } from "../api";

export const getWebSetting = async () => {
	try {
		const response = await fetchData("/webSetting");
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};
