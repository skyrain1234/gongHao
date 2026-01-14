import { fetchI18n } from "../../api";

export const getBlogList = async () => {
	try {
		const response = await fetchI18n("/blog");
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

// 取得最新消息，預設抓 7 筆
export const getLatestBlog = async (limit = 7) => {
	try {
		const response = await fetchI18n(`/latestBlog?limit=${limit}`);
		return response.data;
	} catch (error) {
		console.error("API 請求錯誤:", error);
	}
};

export const getBlogSearch = async (title) => {
	try {
		const response = await fetchI18n(`/blog?search=${title}`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

export const getBlog = async (id) => {
	try {
		const response = await fetchI18n(`/blog/${id}`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};
