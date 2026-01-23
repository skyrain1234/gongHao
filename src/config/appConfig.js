export const appConfig = {
	// 全域設定
	appName: "華越購物型網站",
	// 本地主要網址
	// appUrl: "http://localhost:5173",
	// 正式主要網址
	appUrl: "https://skyrain1234.github.io",

	// 本地API網址
	// apiUrl: "http://localhost:81",
	// 正式API網址
	apiUrl: "https://bm888Temperate.cdit168.com.tw",

	// 本地後台網址
	// adminUrl: "http://localhost:81",
	// 正式後台網址
	adminUrl: "https://bm888Temperate.cdit168.com.tw/admin",

	// SEO 設定
	seo: {
		title: "華越購物型網站",
		description:
			"進銷存軟體、雲端服務、pos系統、網站設計、網路行銷、資訊更新、台中網站設計、台中資訊、專案企劃、企劃提案、文化創意、文創，華越資訊 電子發票系統操作課程開課啦！",
		keywords: "購物,線上購物",
	},
	// 首頁
	home: {
		// 每頁最多顯示的廣告圖數
		bannerLimit: 3,
		// 每頁最多顯示的商品類別數
		productClassLimit: 10,
		// 每頁最多顯示的商品數
		productLimit: 12,
		//
		newsLimit: 4,
	},
	listing: {
		pageSize: 20,
	},
	// SEO for JSON-LD
	// 營業時間，必須填英文
	openingHours:[{
		"@type": "OpeningHoursSpecification",
		"dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
		"opens": "08:00",
		"closes": "17:30"
	}],
	// 經緯度,推薦填
	geo:{
		"@type": "GeoCoordinates",
		"latitude": "24.15461",
		"longitude": "120.61358"
	}
};
