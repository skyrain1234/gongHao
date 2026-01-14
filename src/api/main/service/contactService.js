import { postData } from "@/api/main/api";

//登入
export const submitContactData = async (data) => {
	try {
		const response = await postData("/message", data);
		return response; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
	}
};
