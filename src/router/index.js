import { createRouter, createWebHashHistory  } from "vue-router";

// 訪客頁面
import GuestLayout from "@/layouts/guest/GuestLayout.vue";
import Home from "@/views/guest/Home.vue";
import SoftwareInner from "@/views/guest/SoftwareInner.vue";
import SoftwareList from "@/views/guest/SoftwareList.vue";
import Qa from "@/views/guest/Qa.vue";
import News from "@/views/guest/News.vue";
import NewsList from "@/views/guest/NewsList.vue";
import Event from "@/views/guest/Event.vue";
import EventList from "@/views/guest/EventList.vue";
import Blog from "@/views/guest/Blog.vue";
import BlogList from "@/views/guest/BlogList.vue";
import Portfolio from "@/views/guest/Portfolio.vue";
import About from "@/views/guest/About.vue";
import HardwareList from "@/views/guest/HardwareList.vue";
import CloudApp from "@/views/guest/CloudApp.vue";
import Project from "@/views/guest/Project.vue";
import WebDesign from "@/views/guest/WebDesign.vue";
import ProjectContent from "@/views/guest/ProjectContent.vue";
import WarrantyForm from "@/components/guest/views/product/WarrantyForm.vue";

import {
	i18n,
	LOCALE_REGEX,
	SUPPORTED_LOCALES,
	DEFAULT_LOCALE,
} from "@/i18n/i18n";

const routes = [
	// 所有前台頁面一律放在 /:lang 前綴下
	{
		path: `/:lang(${LOCALE_REGEX})`,
		component: GuestLayout,
		// 可選：給個名字方便程式導頁時找
		children: [
			// 首頁
			{ path: "", name: "home", component: Home, meta: { class: "home-body" } },

			// 最新消息
			{
				path: "news",
				children: [
					// 列表（無分類，會自動導到預設分類）
					{
						path: "",
						name: "newsList",
						component: NewsList,
						meta: { layout: "NewsList", class: "news-body" },
					},

					// 指定分類列表（slug 來自 news_class.slug）
					{
						path: "category/:slug",
						name: "newsListByCategory",
						component: NewsList,
						meta: { layout: "NewsList", class: "news-body" },
						props: (route) => ({
							initialSlug: route.params.slug,
						}),
					},

					// 內頁：只吃數字，避免跟 slug /category 衝突
					{
						path: ":newsId(\\d+)",
						name: "news",
						component: News,
						meta: { layout: "NewsContent" },
						props: (route) => ({
							newsId: Number(route.params.newsId),
						}),
					},
				],
			},

			// 最新公告
			{
				path: "event",
				children: [
					// 列表（無分類，會自動導到預設分類）
					{
						path: "",
						name: "eventList",
						component: EventList,
						meta: { layout: "EventList", class: "event-body" },
					},

					// 指定分類列表（slug 來自 event_class.slug）
					{
						path: "category/:slug",
						name: "eventListByCategory",
						component: EventList,
						meta: { layout: "EventList", class: "event-body" },
						props: (route) => ({
							initialSlug: route.params.slug,
						}),
					},

					// 內頁：只吃數字，避免跟 slug /category 衝突
					{
						path: ":eventId(\\d+)",
						name: "event",
						component: Event,
						meta: { layout: "EventContent" },
						props: (route) => ({
							eventId: Number(route.params.eventId),
						}),
					},
				],
			},

			// 關於我們
			{
				path: "about",
				name: "about",
				component: About,
				meta: { class: "about-body" },
			},

		],
	},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    if (to.hash) {
      const nav = document.querySelector("#navbar");
      const navH = nav?.getBoundingClientRect().height || 0;
      const gap = 0;

      return {
        el: to.hash,
        top: navH + gap,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

/** beforeEach：正規化 :lang + 同步 i18n/localStorage/<html lang> */
router.beforeEach((to, _from, next) => {
	const lang = String(to.params.lang || "");
	const ok = SUPPORTED_LOCALES.includes(lang);
	if (!ok) {
		// 缺 lang 或不支援 → 導到預設語言（保留既有 query/hash/其他 params）
		return next({
			name: to.name ?? "home",
			params: { ...to.params, lang: DEFAULT_LOCALE },
			query: to.query,
			hash: to.hash,
			replace: true,
		});
	}

	// 同步 i18n 與本地端狀態

	if (i18n.global.locale.value !== lang) {
		i18n.global.locale.value = lang;
		localStorage.setItem("locale", lang);
		document.documentElement.setAttribute("lang", lang);
	}
	next();
});

export default router;
