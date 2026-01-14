import axios from "axios";
import { appConfig } from "@/config/appConfig";
import router from "@/router";
import { DEFAULT_LOCALE, LOCALE_REGEX } from "@/i18n/i18n";

// 目標網址
const BASE_URL = appConfig.apiUrl; // 請改為你的 API URL
// 固定 API 端點
const API_BASE_URL = BASE_URL + "/api";
// 身分驗證 API 端點
const SANCTUM_BASE_URL = BASE_URL;
// 目標網址
export const STORAGE_BASE_URL = BASE_URL; // 圖片、影片等靜態資源儲存的網址

//一般請求
export const api = axios.create({
	baseURL: API_BASE_URL, // Laravel API 位置
	withCredentials: true, // 讓 cookie 帶入
	withXSRFToken: true,
	// timeout: 5000, // 設定請求超時時間
	headers: {
		Accept: "application/json",
	},
});

//身分驗證請求
export const apiSanctum = axios.create({
	baseURL: SANCTUM_BASE_URL, // Laravel API 位置
	withCredentials: true, // 讓 cookie 帶入
	withXSRFToken: true,
	headers: {
		Accept: "application/json",
	},
});

// 發送 GET 請求 (獲取資料)
export const fetchData = async (endpoint, params = {}) => {
	const response = await api.get(endpoint, { params });
	return response.data; // 回傳 JSON 解析後的資料
};

// 發送 POST 請求 (新增資料)
export const postData = async (endpoint, data) => {
	const response = await api.post(endpoint, data);
	return response.data;
};

// 發送 PUT 請求 (更新資料)
export const putData = async (endpoint, data) => {
	const response = await api.put(endpoint, data);
	return response.data;
};

// 發送 DELETE 請求 (刪除資料)
export const deleteData = async (endpoint) => {
	const response = await api.delete(endpoint);
	return response.data;
};

// 多語系的get請求
export const fetchI18n = async (endpoint, params = {}) => {
  const lang = router.currentRoute.value.params.lang; // 路由的lang一定存在
  const res = await api.get(`/${lang}${endpoint}`, { params });
  return res.data;
};
