import { fetchData } from "../../api";

export const getPartner = async () => {
	try {
		const response = await fetchData("/partner");
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

// 取得最新消息，預設抓 7 筆
export const getLatestPartner = async (limit = 7) => {
	try {
		const response = await fetchData(`/latestPartner?limit=${limit}`);
		return response.data;
	} catch (error) {
		console.error("API 請求錯誤:", error);
	}
};
