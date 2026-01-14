// src/api/main/service/product/WarrantyService.js
import { api } from "@/api/main/api";

/**
 * 產生保證書 PDF
 * 成功：回 { blob, url }
 * 失敗：throw Error(message)
 */
export const generateWarrantyPdf = async (data) => {
	// 用 validateStatus 把所有 HTTP 狀態都當成功回來自己判斷
	const response = await api.post("/warranty/download", data, {
		responseType: "blob",
		validateStatus: () => true,
	});

	const contentType = response.headers["content-type"] || "";

	// ① 成功：PDF
	if (contentType.includes("application/pdf")) {
		const blob = new Blob([response.data], { type: "application/pdf" });
		const url = window.URL.createObjectURL(blob);
		return { blob, url };
	}

	// ② 失敗：後端回來的是 JSON（api_ok）
	// 把 blob 轉成文字再 parse
	const text = await new Response(response.data).text();
	let json = null;
	try {
		json = JSON.parse(text);
	} catch (e) {
		// 非預期格式，給一個通用錯誤
		throw new Error("產生保證書時發生錯誤，請稍後再試。");
	}

	// 你的 api_ok 通常會有 message
	const msg =
		json?.message ||
		json?.error ||
		"產生保證書時發生錯誤，請稍後再試。";

	throw new Error(msg);
};
