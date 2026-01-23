<template>
	<!-- ===== 最新消息｜資料夾毛玻璃區塊 ===== -->
	<section id="newsFolder" class="news-folder">
		<div class="news-folder__wrap">
			<!-- 資料夾 Tab（標題） -->
			<div class="news-folder__tab">
				<h2 class="news-folder__title">最新消息</h2>
			</div>

			<!-- 資料夾本體 -->
			<div class="news-folder__body">
				<div class="news-grid">
					<!-- Card 1 -->
					<article class="news-card" v-for="news in displayNews" :key="news.id">
						<router-link
							class="news-card__link"
							:to="`/${currentLang}/news/${news.id}`"
						>
							<div class="news-card__media">
								<img :src="getStorageFileUrl(news.thumbnail_url) || fallbackCover" alt="news" />
							</div>

							<div class="news-card__content">
								<div class="news-badge" :class="badgeClass(news.slug)">
									{{ news.class_name }}
								</div>

								<h3 class="news-card__title" v-if="news.pin">【置頂】{{ news.title }}</h3>
								<h3 class="news-card__title" v-else>{{ news.title }}</h3>
							</div>
						</router-link>
					</article>

					<!-- 右下：更多消息（大按鈕） -->
					<a
						class="news-more"
						:href="`/${currentLang}/news`"
						aria-label="更多消息"
					>
						<span>更多消息</span>
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { getLatestNews } from "@/api/main/service/news/newsService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
const { currentLang } = useCurrentLang();
import fallbackCover from "@/assets/images/news/newsDefault.png";

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
		const response = await getLatestNews(5); // service 回「陣列」
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
const BADGE_SLUGS = new Set([
  "announcements",
  "activities",
  "media-reports",
  "research",
]);

function badgeClass(slug) {
  const s = (slug || "").trim();
  return BADGE_SLUGS.has(s) ? `is-${s}` : "is-default";
}

</script>

<style scoped>
/* ------首頁最新消息------ */
.news-folder {
	padding: 26px 0 40px;
}

.news-folder__wrap {
	position: relative;
	max-width: var(--maxw);
	margin: 0 auto;
	padding: 0 14px;
}

/* 資料夾 Tab（左上那片） */
.news-folder__tab {
	position: absolute;
	top: -18px;
	left: 18px;
	z-index: 2;

	padding: 14px 22px 12px;
	border-radius: 18px 18px 14px 14px;

	/* 毛玻璃 + 灰襯色 */
	background: var(--folder-bg);
	backdrop-filter: var(--glass);
	-webkit-backdrop-filter: var(--glass);
	border: 1px solid rgba(255, 255, 255, 0.6);
	box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
}

/* Tab 右側做一點「資料夾折角」感 */
.news-folder__tab::after {
	content: "";
	position: absolute;
	right: -16px;
	top: 0;
	width: 28px;
	height: 100%;
	border-radius: 0 18px 18px 0;
	background: rgba(255, 255, 255, 0.22);
	filter: blur(0.2px);
}

.news-folder__title {
	margin: 0;
	font-weight: 950;
	letter-spacing: 0.6px;
	font-size: 20px;
	color: #111827;
}

/* 資料夾本體（大灰底毛玻璃） */
.news-folder__body {
	position: relative;
	border-radius: var(--radius-xl);
	padding: 54px 22px 22px; /* 上面留 Tab 空間 */

	/* ✅ 套用你上面背景模板語言（radial + 灰底 + 毛玻璃） */
	background: radial-gradient(
			900px 260px at 18% 0%,
			rgba(34, 197, 94, 0.14),
			transparent 58%
		),
		radial-gradient(
			900px 260px at 82% 0%,
			rgba(249, 115, 22, 0.12),
			transparent 58%
		),
		var(--folder-bg);

	backdrop-filter: var(--glass);
	-webkit-backdrop-filter: var(--glass);

	border: 1px solid rgba(255, 255, 255, 0.55);
	box-shadow: var(--shadow-soft);
	overflow: hidden;
}

/* 給資料夾一點內側光暈 */
.news-folder__body::before {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(
		180deg,
		rgba(255, 255, 255, 0.38),
		transparent 38%
	);
	pointer-events: none;
}

/* Grid：3 欄 + 最後一格大按鈕 */
.news-grid {
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 18px 18px;
}

/* ===== Card ===== */
.news-card {
	border-radius: var(--radius-lg);
	overflow: hidden;
	background: rgba(255, 255, 255, 0.78);
	border: 1px solid rgba(15, 23, 42, 0.08);
	box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
	transform: translateY(0);
	transition: transform 0.22s ease, box-shadow 0.22s ease,
		border-color 0.22s ease, background 0.22s ease;
}

.news-card__link {
	display: block;
	color: inherit;
	text-decoration: none;
}

/* 圖片區 */
.news-card__media {
	position: relative;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	border-radius: 14px;
	margin: 14px 14px 0;
}

.news-card__media::after {
	content: "";
	position: absolute;
	inset: 0;
	background: radial-gradient(
		400px 220px at 50% 0%,
		rgba(255, 255, 255, 0.18),
		transparent 60%
	);
	pointer-events: none;
}

.news-card__media img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transform: scale(1);
	transition: transform 0.35s ease;
}

/* 內容區 */
.news-card__content {
	padding: 12px 14px 16px;
}

.news-badge {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 15px;
	font-weight: 950;
	letter-spacing: 0.3px;
	padding: 6px 10px;
	border-radius: 999px;
	border: 1px solid rgba(15, 23, 42, 0.08);
	background: rgba(255, 255, 255, 0.7);
	margin-bottom: 8px;
	transform: translateY(0);
	transition: transform 0.22s ease, background 0.22s ease,
		border-color 0.22s ease;
}

/* 四種 badge 色 */
.news-badge.is-announcements {
	color: #7c3aed;
}
.news-badge.is-activities {
	color: #16a34a;
}
.news-badge.is-media-reports {
	color: #0ea5e9;
}
.news-badge.is-research {
	color: #de6cb4;
}

/* ✅ fallback */
.news-badge.is-default { color: #64748b; } /* slate-500 */

.news-card__title {
	margin: 0;
	font-size: 17px;
	font-weight: 950;
	line-height: 1.25;
	color: #111827;
	letter-spacing: 0.2px;
}

/* ✅ Hover 動畫：浮起 + 陰影 + 圖片微放大 + badge 微上移 */
.news-card:hover {
	transform: translateY(-6px);
	box-shadow: var(--shadow-card);

	border: 2px solid rgba(255, 153, 0, 0.534);
	background: rgba(255, 255, 255, 0.86);
}

.news-card:hover .news-card__media img {
	transform: scale(1.06);
}

.news-card:hover .news-badge {
	transform: translateY(-2px);
	background: rgba(34, 197, 94, 0.08);
	border-color: rgba(34, 197, 94, 0.22);
}

/* ===== 右下：更多消息按鈕（大方塊） ===== */
.news-more {
	display: grid;
	place-items: center;
	border-radius: var(--radius-lg);
	background: rgba(17, 24, 39, 0.64);
	color: #fff;
	text-decoration: none;
	font-weight: 950;
	letter-spacing: 0.8px;
	font-size: 22px;
	min-height: 100%;
	box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
	transition: transform 0.22s ease, background 0.22s ease;
}

.news-more:hover {
	transform: translateY(-6px);
	background: rgba(17, 24, 39, 0.78);
}

/* ===== RWD ===== */
@media (max-width: 991.98px) {
	.news-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.news-folder__body {
		padding: 52px 16px 16px;
	}
}

@media (max-width: 575.98px) {
	.news-grid {
		grid-template-columns: 1fr;
	}
	.news-folder__tab {
		left: 14px;
	}
	.news-folder__title {
		font-size: 18px;
	}
	.news-more {
		min-height: 160px;
	}
}
</style>
