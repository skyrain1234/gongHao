<!-- components/guest/views/home/HomeNewsAndFooter.vue -->
<template>
	<!-- 最新消息 -->
	<main class="flex-grow-1">
		<div
			class="container-xxl mt-5 latestNews"
			:aria-label="$t('index.news.sectionLabel')"
		>
			<div class="news-wrap">
				<div class="mb-3">
					<h1 class="news-wrap-title m-0 text-center">
						{{ $t("index.news.title") }}
					</h1>
				</div>

				<div class="row g-3">
					<!-- 1 ~ N -->
					<div
						class="col-12 col-sm-6 col-lg-3 d-flex"
						v-for="news in displayNews"
						:key="news.id"
					>
						<router-link
							:to="`/${currentLang}/news/${news.id}`"
							class="news-card"
						>
							<!-- 預覽圖 -->
							<div class="news-media">
								<img :src="getStorageFileUrl(news.thumbnail_url)" alt="" />
							</div>

							<div class="news-card-body">
								<!-- 標題 -->
								<h3 class="news-title">{{ news.title }}</h3>

								<!-- 底部區（分類＋時間） -->
								<div class="news-meta">
									<p class="news-class">{{ news.class_name }}</p>
									<time class="news-date" :datetime="news.publish_date">
										{{ news.publish_date }}
									</time>
								</div>
							</div>
						</router-link>
					</div>

					<!-- 更多最新消息 -->
					<div class="col-12 col-sm-6 col-lg-3">
						<router-link
							:to="`/${currentLang}/news`"
							class="news-more"
							:aria-label="$t('index.news.moreAria')"
						>
							<div class="news-more__inner">
								<div class="news-more__icon bi bi-newspaper"></div>
								<div class="news-more__txt">
									{{ $t("index.news.more") }}
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { getLatestNews } from "@/api/main/service/news/newsService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
const { currentLang } = useCurrentLang();

// 取得最新的幾筆消息（原始資料）
const latestNews = ref([]);

// 螢幕尺寸判斷
const isSmallScreen = ref(false);

const handleResize = () => {
	isSmallScreen.value = window.innerWidth < 576; // 跟 Bootstrap xs 斷點一致
};

// 實際要顯示在畫面上的資料
const displayNews = computed(() => {
	if (isSmallScreen.value) {
		// 小螢幕只顯示 3 筆
		return latestNews.value.slice(0, 3);
	}
	// 大螢幕就全部顯示
	return latestNews.value;
});

// 讀取最新消息
const loadLatestNews = async () => {
	try {
		const response = await getLatestNews(); // service 回「陣列」
		latestNews.value = response;
	} catch (err) {
		console.error("getLatestNews error:", err);
		latestNews.value = [];
	}
};

onMounted(() => {
	handleResize();
	window.addEventListener("resize", handleResize);
	loadLatestNews();
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
/* ============================
   最新消息外層容器（玻璃卡）
============================ */
.latestNews .news-wrap {
	/* 背景與玻璃效果 */
	background: var(--news-bg, var(--glass-bg));
	backdrop-filter: blur(var(--glass-blur));
	-webkit-backdrop-filter: blur(var(--glass-blur));

	/* 圓角 & 邊框：共用 token */
	border-radius: var(--radius-lg);
	border: 1px solid var(--glass-border-color);

	/* 陰影：可用 --news-shadow 覆蓋，否則吃全站陰影 */
	box-shadow: var(--news-shadow, var(--shadow-soft));

	/* 內距：純 spacing，不走 theme 變數也可以 */
	padding: clamp(16px, 3vw, 28px);
}

/* 標題 */
.latestNews .news-wrap-title {
	font-weight: 800;
	letter-spacing: 0.02em;
	font-size: 2rem;
	color: var(--color-text-main);
}

/* ============================
   單張最新消息卡片
============================ */
.latestNews .news-card {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	text-decoration: none;
	border-radius: var(--radius-md);
	overflow: hidden;
	background: var(--bg-surface);
	border: 1px solid rgba(0, 0, 0, 0.06);
	box-shadow: var(--shadow-soft);
	transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.latestNews .news-card:hover {
	transform: translateY(-2px);
	box-shadow: var(--shadow-elevated);
}

/* 深色模式：卡片背景 */
:deep(.theme-dark) .latestNews .news-card {
	background: rgba(15, 23, 42, 0.8);
	border: 1px solid rgba(148, 163, 184, 0.18);
}

/* ============================
   預覽圖
============================ */
.latestNews .news-media {
	aspect-ratio: 16/9;
	background: var(--bg-surface);
	overflow: hidden;
}
.latestNews .news-media img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

/* ============================
   內容區（標題 + meta）
============================ */
.latestNews .news-card-body {
	padding: 14px 14px 12px;
	display: flex;
	flex-direction: column;
	gap: 6px;
	flex: 1 1 auto;
}

.latestNews .news-title {
	font-size: 1.2rem;
	line-height: 1.3;
	font-weight: 700;
	color: var(--color-text-main);
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.latestNews .news-class {
	font-size: 1rem;
	color: var(--color-text-muted);
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.latestNews .news-date {
	margin-top: 6px;
	font-size: 0.8rem;
	letter-spacing: 0.06em;
	color: var(--color-text-muted);
}

/* ============================
   更多按鈕卡片
============================ */
.latestNews .news-more {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	text-decoration: none;
	border-radius: var(--radius-md);
	border: 1px dashed rgba(0, 0, 0, 0.15);
	background: rgba(255, 255, 255, 0.75);
	transition: transform 0.22s ease, background 0.22s ease,
		border-color 0.22s ease;
}
.latestNews .news-more:hover {
	transform: translateY(-2px);
	background: var(--bg-surface);
	border-color: rgba(0, 0, 0, 0.25);
}

/* icon / text */
.latestNews .news-more__inner {
	text-align: center;
	padding: 24px 10px;
}
.latestNews .news-more__icon {
	font-size: 36px;
	color: var(--color-primary);
	margin-bottom: 10px;
}
.latestNews .news-more__txt {
	font-weight: 700;
	font-size: 1.2rem;
	color: var(--color-primary);
}

@media (max-width: 575.98px) {
	.latestNews .news-wrap {
		border-radius: var(--radius-md);
	}
}
</style>
