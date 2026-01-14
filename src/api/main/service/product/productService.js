import { fetchData,fetchI18n } from "../../api";

export const getProductList = async (params = {}) => {
	try {
		const response = await fetchI18n("/product",params);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

export const getProductJoinSpecList = async () => {
	try {
		const response = await fetchData("/product?spec=1");
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

export const getProductJoinSpec = async (id) => {
	try {
		const response = await fetchData(`/product/${id}?spec=1`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};

export const getProduct = async (id) => {
	try {
		const response = await fetchI18n(`/product/${id}`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};
