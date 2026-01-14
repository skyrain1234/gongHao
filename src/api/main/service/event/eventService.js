import { fetchI18n } from "../../api";

export const getEventList = async () => {
	try {
		const response = await fetchI18n("/event");
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

// 取得最新消息，預設抓 7 筆
export const getLatestEvent = async (limit = 7) => {
	try {
		const response = await fetchI18n(`/latestEvent?limit=${limit}`);
		return response.data;
	} catch (error) {
		console.error("API 請求錯誤:", error);
	}
};


export const getEventSearch = async (title) => {
	try {
		const response = await fetchI18n(`/event?search=${title}`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

export const getEvent = async (id) => {
	try {
		const response = await fetchI18n(`/event/${id}`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};
