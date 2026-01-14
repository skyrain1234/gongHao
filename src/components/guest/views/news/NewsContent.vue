<template>
	<div id="news-page" class="page-news">
		<div class="mb-3 ms-auto me-auto" id="news-article">
			<div class="mb-3">
				<router-link
					:to="`/${currentLang}/news`"
					class="mx-2 mx-md-0 btn btn-outline-secondary btn-sm rounded-pill mb-3"
				>
					<i class="bi bi-arrow-left-short"></i>{{ $t("nav.news") }}
				</router-link>
				<h1 class="mb-2 mx-2 mx-md-0 fw-bold">{{ news.title }}</h1>

				<div class="mb-3">
					<div class="small">
						<span class="ms-3 me-3 fs-5">
							<i class="bi bi-calendar3"></i> {{ news.publish_date }}
						</span>
						<span class="fs-5">
							<i class="bi bi-tags"></i>{{ news.class_name }}
						</span>
					</div>
				</div>
			</div>

			<div class="row g-4 mb-5">
				<!-- 主文章區 -->
				<div class="col-lg-12">
					<!-- 預覽圖 -->
					<!-- <div class="mb-4 thumbnail">
						<img
							:src="getStorageFileUrl(news.thumbnail_url)"
							:alt="news.title"
							class=""
						/>
					</div> -->
					<!-- 內文 -->
					<article class="article-card">
						<div class="article-body" v-html="newsContent"></div>
					</article>
				</div>
			</div>
			<div class="row">
				<!-- 側邊欄 -->
				<div class="col-12">
					<div class="sidebar-card">
						<h3 class="sidebar-title">更多文章</h3>
						<div
							class="sidebar-news-item"
							v-for="item in latestNews"
							:key="item.id"
						>
							<div class="date">{{ item.publish_date }}</div>
							<router-link
								:to="{
									name: 'news',
									params: { lang: route.params.lang, newsId: item.id },
								}"
								class="title"
							>
								{{ item.title }}
							</router-link>
						</div>
						<router-link :to="`/${currentLang}/news`" class="sidebar-more-link">
							查看全部最新消息 <i class="bi bi-arrow-right-short"></i>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { getNews, getLatestNews } from "@/api/main/service/news/newsService";
import { useRoute } from "vue-router";
import { absolutizeContentUrls } from "@/api/main/tools/storageFileTools";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";

const { currentLang } = useCurrentLang();
const news = ref({});
const latestNews = ref([]);
const route = useRoute();

// 內文 HTML（轉換圖片 / 連結路徑）
const newsContent = computed(() =>
	absolutizeContentUrls(news.value?.content || "")
);

// 載入單筆最新消息
const loadNews = async (id) => {
	try {
		const response = await getNews(id);
		news.value = response;
	} catch (err) {
		console.error("getNews error:", err);
		news.value = {};
	}
};

// 取得最新的幾筆消息
const loadLatestNews = async () => {
	try {
		const response = await getLatestNews(3);
		latestNews.value = response;
	} catch (err) {
		console.error("getLatestNews error:", err);
		latestNews.value = [];
	}
};

/** 保險：確保 fb-root 存在（你 index.html 若已經有，也不會重複） */
function ensureFbRoot() {
	if (!document.getElementById("fb-root")) {
		const div = document.createElement("div");
		div.id = "fb-root";
		document.body.prepend(div);
	}
}

/** 把文章內的 FB 貼文連結 <a href="..."> 換成 <div class="fb-post" data-href="..."> */
function convertFbLinksToXfbml() {
  const root = document.querySelector("#news-article .article-body");
  if (!root) return;

  root.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!href) return;

    const isFacebook = /facebook\.com/i.test(href);
    if (!isFacebook) return;

    // ✅ 保底規則：share/p 一律不嵌入，直接外連（最穩）
    const isShareP = /facebook\.com\/share\/p\//i.test(href);
    if (isShareP) {
      const btn = document.createElement("a");
      btn.href = href;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      btn.className = "btn btn-outline-primary btn-sm rounded-pill";
      btn.textContent = "開啟 Facebook 貼文";
      a.replaceWith(btn);
      return;
    }

    // ✅ 其他「貼文型」才嘗試嵌入
    const isFbPost =
      /facebook\.com\/permalink\.php/i.test(href) ||
      /facebook\.com\/posts\//i.test(href) ||
      /facebook\.com\/reel\//i.test(href) ||
      /facebook\.com\/watch\/\?v=/i.test(href);

    if (!isFbPost) return;

    const div = document.createElement("div");
    div.className = "fb-post";
    div.setAttribute("data-href", href);
    div.setAttribute("data-width", "500");
    div.setAttribute("data-show-text", "true");

    a.replaceWith(div);
  });
}


/** 等 SDK ready 再 parse（避免 SPA/async 時序問題） */
function parseFacebookWithRetry(retry = 12) {
	if (window.FB && window.FB.XFBML) {
		const root = document.querySelector("#news-article");
		if (root) window.FB.XFBML.parse(root);
		return;
	}
	if (retry <= 0) return;
	setTimeout(() => parseFacebookWithRetry(retry - 1), 150);
}

async function enhanceEmbeds() {
	await nextTick();
	ensureFbRoot();
	convertFbLinksToXfbml();
	parseFacebookWithRetry();
}

onMounted(async () => {
	await loadNews(route.params.newsId);
	loadLatestNews();
	enhanceEmbeds();
});

// 當網址上的 newsId 改變時，重新載入該筆新聞
watch(
	() => route.params.newsId,
	async (newId, oldId) => {
		if (newId && newId !== oldId) {
			await loadNews(newId);
			window.scrollTo({ top: 0, behavior: "smooth" });
			enhanceEmbeds();
		}
	}
);

// ✅ 內容更新也要重新轉換 + parse（v-html 是重新塞 DOM）
watch(newsContent, () => {
	enhanceEmbeds();
});
</script>

<style scoped>
/* 外層頁面背景（吃全站 bg + news 專用） */
#news-page {
	min-height: 100vh;
	/* padding-top: var(--page-padding-top-with-navbar); */
	padding-bottom: var(--section-padding-y);
	background-color: var(--bg-page);
	background-image: var(--bg-image);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
}

/* 中央玻璃容器 */
#news-article {
	/* width: min(1120px, 92%); */
	width: 90vw;
	margin: 0 auto;
	background: var(--news-bg, rgba(255, 255, 255, 0.85));
	backdrop-filter: blur(12px);
	border-radius: var(--radius-lg);
	box-shadow: var(--news-shadow, var(--shadow-soft));
	padding: 1.5rem 1.5rem 2rem;
}

/* 文章大圖縮圖 */
.thumbnail img {
	aspect-ratio: 16 / 9;
	width: 50%;
	/* height: 450px; */
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-soft);
	display: block;
}

/* 內文卡片（v-html 容器） */
.article-card {
	background: var(--bg-surface);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-soft);
	padding: 1.25rem 1.4rem;
}

/* v-html 內容的基礎排版 */
.article-card :deep(.article-body) {
	font-size: 1rem;
	line-height: 1.9;
	color: var(--color-text-main);
}

/* v-html 內圖片：限制在欄寬內，避免跑過去側邊欄 */
.article-card :deep(.article-body img) {
	max-width: 100%;
	height: auto;
	display: block;
}
.article-card :deep(.article-body iframe) {
	width: 100%;
	display: block;
	border: 0;
}

/* 讓 fb-post 本身置中 */
.article-card :deep(.fb-post) {
  display: flex;
  justify-content: center;
}

/* FB 最後會產生 iframe，保險再置中一次 */
.article-card :deep(.fb-post iframe),
.article-card :deep(iframe[src*="facebook.com/plugins/"]) {
  display: block;
  margin-left: auto;
  margin-right: auto;
}


/* 側邊欄卡片 */
.sidebar-card {
	padding: 1.4rem 1.3rem;
	border-radius: var(--radius-lg);
	background: var(--news-card-bg, rgba(255, 255, 255, 0.9));
	backdrop-filter: blur(14px);
	box-shadow: var(--news-shadow, var(--shadow-soft));
	border: 1px solid rgba(255, 255, 255, 0.9);
}

/* 側邊欄標題 */
.sidebar-title {
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 0.7rem;
	color: var(--color-text-main);
}

/* 單一消息區塊 */
.sidebar-news-item {
	padding: 0.65rem 0;
	border-bottom: 1px dashed rgba(209, 213, 219, 0.85);
}
.sidebar-news-item:last-child {
	border-bottom: none;
}

/* 日期 */
.sidebar-news-item .date {
	font-size: 0.95rem;
	color: var(--news-date-color, var(--color-text-muted));
	margin-bottom: 2px;
}

/* 標題連結 */
.sidebar-news-item .title {
	font-size: 1rem;
	font-weight: 600;
	line-height: 1.34;
	color: var(--color-text-main);
	text-decoration: none;
	display: inline-block;
	transition: color 0.2s ease;
}
.sidebar-news-item .title:hover {
	color: var(--color-primary);
}

/* 查看全部連結 */
.sidebar-more-link {
	display: inline-flex;
	align-items: center;
	margin-top: 0.75rem;
	font-weight: 600;
	font-size: 1rem;
	color: var(--color-primary);
	text-decoration: none;
	transition: color 0.2s ease;
}
.sidebar-more-link:hover {
	color: var(--color-primary-dark);
}
.sidebar-more-link i {
	margin-left: 2px;
	font-size: 1rem;
}

@media (max-width: 768px) {
	.sidebar-title {
		font-size: 1.5rem;
	}
	.sidebar-news-item .title {
		font-size: 1.2rem;
	}

	/* 查看全部連結 */
	.sidebar-more-link {
		font-size: 1.2rem;
	}
	.sidebar-more-link i {
		font-size: 1.2rem;
	}
}

/* 手機微調 padding */
/* ===== 手機改滿版（只改外觀與間距，不動結構） ===== */
@media (max-width: 576px) {
	/* page 外層不要再有額外空隙 */
	#news-page {
		padding-left: 10;
		padding-right: 10;
	}

	/* 文章容器：滿版 + 去圓角/陰影/玻璃感（避免像卡片縮在中間） */
	#news-article {
		width: 100%;
		max-width: 100%;
		margin: 0; /* 不要置中留白 */
		border-radius: 0; /* 滿版通常不留圓角 */
		box-shadow: none; /* 陰影拿掉，視覺更像滿版 */
		backdrop-filter: none; /* 可選：玻璃效果也拿掉更乾淨 */
		padding: 1rem 0 1.2rem; /* 只留一點點內距 */
	}

	/* row 在手機可以更貼合（Bootstrap g-4 會有 gutters） */
	.row {
		--bs-gutter-x: 0.75rem;
	}

	/* 內文卡片：也不要再厚厚一層 padding */
	.article-card {
		padding: 0.9rem 0.9rem;
		border-radius: var(--radius-md); /* 你想要也可改成 0 */
	}

	/* 側邊欄卡片同理 */
	.sidebar-card {
		padding: 1rem 0.9rem;
		border-radius: var(--radius-md); /* 或 0 */
	}

	/* 如果你有用 thumbnail，手機建議直接滿寬 */
	.thumbnail img {
		width: 100%;
	}
}
</style>
