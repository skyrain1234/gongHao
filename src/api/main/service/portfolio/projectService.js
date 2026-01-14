import { fetchI18n } from "../../api";

export const getProjectList = async () => {
    try {
        const response = await fetchI18n("/project");
        return response.data; // 回傳 JSON 解析後的資料
    } catch (error) {
        console.error("API 請求錯誤:", error);
        // throw error;
    }
};

export const getProject = async (id) => {
	try {
		const response = await fetchI18n(`/project/${id}`);
		return response.data; // 回傳 JSON 解析後的資料
	} catch (error) {
		console.error("API 請求錯誤:", error);
		// throw error;
	}
};
