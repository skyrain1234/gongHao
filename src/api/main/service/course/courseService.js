import { fetchI18n } from "../../api";

export const getCourseList = async () => {
    try {
        const response = await fetchI18n("/course");
        return response.data; // 回傳 JSON 解析後的資料
    } catch (error) {
        console.error("API 請求錯誤:", error);
        // throw error;
    }
};

export const getCourse = async (id) => {
    try {
        const response = await fetchI18n(`/course/${id}`);
        return response.data; // 回傳 JSON 解析後的資料
    } catch (error) {
        console.error("API 請求錯誤:", error);
        // throw error;
    }
};
