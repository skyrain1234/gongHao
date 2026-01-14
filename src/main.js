import { createApp, nextTick } from "vue";
import App from "@/App.vue";

// 管理全域變數及狀態資料
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
// 路由
import router from "@/router";
// Meta標籤套件
import { createHead } from "@unhead/vue/client";

// CSS初始化
import "@/assets/style/reset.scss";

//******************* npm Package *******************

// Bootstrap前端視覺套件
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// Sweetalert
import "sweetalert2/dist/sweetalert2.min.css";
// vue i18n 多語言套件
import { i18n } from "./i18n/i18n";

//******************* views Package *******************

//***************** Import CSS & JS *********************
// CSS
import "@/assets/style/general.scss";
// JS（如果裡面有操作 DOM，要確保只在 mount 之後跑）
import "@/assets/js/script.js";

import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

pinia.use(piniaPersist);
app.use(pinia);
app.use(router);
app.use(head);
app.use(i18n);

// 變更 html lang（先設一次，避免初次進站沒語系）
document.documentElement.setAttribute(
	"lang",
	localStorage.getItem("locale") || "zh-TW"
);
// (選用) 每次載入前台時，幫 <body> 加上 class
// document.body.classList.add("theme-dark");

// 路由準備好再掛 app，掛完再 init AOS
router.isReady().then(async () => {
	// 掛到 #page-top（你原本就是這個）
	app.mount("#page-top");

	// 等第一輪 DOM 更新完成，再讓 AOS 掃描 data-aos 元素
	await nextTick();

	AOS.init({
		once: true, // 只在第一次進入視窗時播放
		mirror: false, // 往上捲不重播
	});
});

// 每次路由切換後，等畫面更新完再讓 AOS 重新計算
router.afterEach(async () => {
	await nextTick();
	AOS.refreshHard();
});
