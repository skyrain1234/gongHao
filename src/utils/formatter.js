/**
 * 將 Laravel 後端回傳的錯誤訊息物件格式化為 <br/> 分隔的字串
 *
 * @param {Object} errors - 後端錯誤物件，通常來自 Laravel 的驗證錯誤
 * @returns {string} 格式化後的錯誤訊息字串
 */
export function formatErrorMessages(errors) {
	if (!errors || typeof errors !== "object") return "";

	return Object.values(errors).flat().join("<br/>");
}
/**
 * 將 timestamp（ISO 格式）轉成可讀時間格式：YYYY-MM-DD HH:mm:ss
 * @param {string} isoString - 例如：2025-08-08T01:09:14.000000Z
 * @returns {string} 格式化後的時間字串
 */
export function formatTimestamp(isoString) {
	if (!isoString) return "";

	const date = new Date(isoString);

	const pad = (n) => n.toString().padStart(2, "0");

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1); // 月份從 0 開始
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 將字串轉換為 JSON 格式
 *
 * @param {string} string_json - 要轉換的字串
 * @returns {object} 轉換後的 JSON 物件
 */

export const parseStringJsonToJson = (string_json) => {
	if (!string_json) return [];

	try {
		// 如果是字串就 JSON.parse
		if (typeof string_json === "string") {
			return JSON.parse(string_json);
		}

		// 如果本來就是陣列
		if (Array.isArray(string_json)) {
			return string_json;
		}

		return [];
	} catch (e) {
		console.error("❌ string_json 解析失敗:", e);
		return [];
	}
};
