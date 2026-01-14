import { fetchI18n } from "../../api";

export const getQa = async () => {
	try {
		const response = await fetchI18n("/qa");
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

export const getQaSearch = async (title) => {
	try {
		const response = await fetchI18n(`/qa?search=${title}`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};
