import { fetchI18n } from "../../api";

export const getCloudAppList = async () => {
    try {
        const response = await fetchI18n("/cloudApp");
        return response.data; // 回傳 JSON 解析後的資料
    } catch (error) {
        console.error("API 請求錯誤:", error);
        // throw error;
    }
};
