<template>
	<div id="news-page" class="page-news">
		<div class="mb-3 ms-auto me-auto" id="news-article">
			<div class="mb-3 my-4">
				<router-link
					:to="{
						path: `/${currentLang}/portfolio`,
						query: { tab: 'project' },
					}"
					class="btn btn-outline-secondary btn-sm rounded-pill mb-3"
				>
					<i class="bi bi-arrow-left-short"></i>{{ $t("nav.portfolioMenu.project") }}
				</router-link>
				<!-- 標題 -->
				<h1 class="mb-2 fw-bold">{{ project.title }}</h1>
			</div>
			<!-- 說明 -->
			<h2 class="mb-2 fw-bold">I.{{ $t("project.caption") }}</h2>
			<div class="row g-4 mb-5">
				<!-- 主文章區 -->
				<div class="col-lg-12">
					<!-- 內文 -->
					<article class="glass-card article-card">
						<div class="article-body" v-html="projectContent"></div>
					</article>
				</div>
			</div>
			<!-- 過案實績 -->
			<h2 class="mb-2 fw-bold">II.{{ $t("project.example") }}</h2>
			<!-- 廠商列表 -->
			<div class="row g-4 mb-5">
				<div class="col-lg-12">
					<article class="glass-card article-card">
						<div class="article-body" v-html="projectExample"></div>
					</article>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getProject } from "@/api/main/service/portfolio/projectService";
import { useRoute } from "vue-router";
import {
	getStorageFileUrl,
	absolutizeContentUrls,
} from "@/api/main/tools/storageFileTools";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
const { currentLang } = useCurrentLang();
const project = ref({});
const route = useRoute();

// 載入單筆最新消息
const loadProject = async (id) => {
	try {
		const response = await getProject(id);
		project.value = response;
	} catch (err) {
		console.error("getProject error:", err);
		project.value = [];
	}
};

onMounted(() => {
	loadProject(route.params.projectId);
});

// 當網址上的 projectId 改變時，重新載入該筆新聞
watch(
	() => route.params.projectId,
	(newId, oldId) => {
		if (newId && newId !== oldId) {
			loadProject(newId);
			// 如果你希望切換文章時捲回上方，可以順便加這行
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}
);

// 內文 HTML（轉換圖片 / 連結路徑）
const projectContent = computed(() =>
	absolutizeContentUrls(project.value?.content || "")
);
const projectExample = computed(() =>
	absolutizeContentUrls(project.value?.example || "")
);
</script>

<style scoped>
.page-news{
	padding: 0;
}
/* 外層頁面背景（吃全站 bg + news 專用） */
#news-page {
	min-height: 100vh;
	padding-top: var(--page-padding-top-with-navbar);
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
	width: min(1120px, 92%);
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
	margin: 0.75rem auto;
	border-radius: var(--radius-sm);
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

/* 手機微調 padding */
@media (max-width: 576px) {
	#news-article {
		padding: 1.1rem 1rem 1.6rem;
	}
}
/*  */
:deep(table) {
  border-collapse: collapse;
  width: 100%;
}

:deep(table td, table th) {
  border: 1px solid #333;
  padding: 8px 12px;
}

</style>
