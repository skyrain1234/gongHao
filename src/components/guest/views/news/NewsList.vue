<!-- src/components/guest/views/news/NewsList.vue -->
<template>
	<div>
		<!-- =============================
		     News Grid（Vue 渲染卡片/清單）
		     ============================= -->
		<div
			class="newsGrid"
			:class="{
				'newsGrid--cards': viewMode === 'cards',
				'newsGrid--list': viewMode === 'list',
			}"
			aria-live="polite"
		>
			<!-- 一則消息卡 -->
			<article
				class="newsCard"
				v-for="newsItem in paginatedNews"
				:key="newsItem.id"
			>
				<!-- 預覽圖：list 模式不顯示 -->
				<div class="newsCard__thumb" v-if="viewMode !== 'list'">
					<img
						class="newsCard__img"
						:src="getStorageFileUrl(newsItem.thumbnail_url) || fallbackCover"
						:alt="newsItem.title"
					/>
				</div>

				<div class="newsCard__body">
					<!-- 類別標籤 -->
					<div class="newsCard__top">
						<span class="newsPill" :class="badgeClass(newsItem.slug)">
							{{ newsItem.class_name }}
						</span>
					</div>

					<!-- 標題：置頂標示 -->
					<h3 class="newsCard__title" v-if="newsItem.pin">
						【置頂】{{ newsItem.title }}
					</h3>
					<h3 class="newsCard__title" v-else>{{ newsItem.title }}</h3>

					<!-- 摘要 -->
					<p class="newsCard__desc">
						{{ excerpt(newsItem) }}
					</p>

					<!-- 底部：日期 + 進入內頁 -->
					<div class="newsCard__foot">
						<span class="newsDate">{{ newsItem.publish_date }}</span>

						<router-link
							class="newsLink"
							:to="{
								name: 'news',
								params: { lang: route.params.lang, newsId: newsItem.id },
							}"
						>
							查看 →
						</router-link>
					</div>
				</div>
			</article>
		</div>

		<!-- =============================
		     Pagination（共用元件）
		     ============================= -->
		<div v-if="!isLoading" class="mx-auto mt-5">
			<Pagination
				v-model:page="currentPage"
				:total-pages="totalPages"
				:limit="pageLimit"
				:total-items="sorted.length"
				:window-size="3"
				:show-info="true"
				:show-jump="true"
			/>
		</div>
	</div>
</template>

<script setup>
/* =============================
 * Imports
 * ============================= */
import { ref, computed, watch, onMounted, defineExpose } from "vue";
import { useRoute } from "vue-router";
import {
	getNewsList,
	getNewsSearch,
} from "@/api/main/service/news/newsService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import { appConfig } from "@/config/appConfig.js";

import Pagination from "@/components/guest/common/pagination/pagination.vue";
import { useScrollOnPageChange } from "@/api/main/tools/scrollOnPageChange";

/**
 * fallbackCover 用 import（Vite 會處理 build 路徑 / hash），
 * 不要用字串 "@/assets/..."（字串不會被解析）
 */
import fallbackCover from "@/assets/images/news/newsDefault.png";

const route = useRoute();

/* =============================
 * Props / Emits
 * ============================= */
const props = defineProps({
	selectedClassId: { type: Number, default: null }, // null = 全部分類
	viewMode: { type: String, default: "cards" }, // cards | list
	activeYear: { type: String, default: "all" }, // all | YYYY
	sort: { type: String, default: "date_desc" }, // date_desc | date_asc | title_asc
});

const emit = defineEmits([
	"update:total", // 回報總筆數（給父層顯示）
	"update:years", // 回報年份 options（給父層下拉選單）
]);

/* =============================
 * State
 * ============================= */
const newsList = ref([]); // API 原始資料（陣列）
const isLoading = ref(true);

/** 分頁：沿用舊版命名與行為 */
const currentPage = ref(1);
const pageLimit = Number(appConfig.home.newsLimit ?? 6);

/* =============================
 * Date helpers
 * ============================= */
/** 取年份 key：YYYY */
const getYearKey = (iso) => (iso ? String(iso).slice(0, 4) : "");

/* =============================
 * API：載入 / 搜尋
 * ============================= */
const loadAllNews = async () => {
	try {
		isLoading.value = true;
		const result = await getNewsList();
		newsList.value = Array.isArray(result) ? result : [];
	} catch (err) {
		console.error("getNewsList error:", err);
		newsList.value = [];
	} finally {
		isLoading.value = false;
	}
};

/**
 * expose：給父層用 ref 呼叫
 * - keyword 空字串：回到全部列表
 * - keyword 有值：走搜尋 API
 */
const searchByKeyword = async (keyword) => {
	currentPage.value = 1;

	try {
		isLoading.value = true;

		const result = !keyword
			? await getNewsList()
			: await getNewsSearch(keyword);
		newsList.value = Array.isArray(result) ? result : [];
	} catch (err) {
		console.error("getNewsSearch error:", err);
		newsList.value = [];
	} finally {
		isLoading.value = false;
	}
};

/** 其他 reset（父層可能會用到） */
const resetToFirstPage = () => (currentPage.value = 1);
const resetAll = () => (currentPage.value = 1);

defineExpose({ searchByKeyword, resetToFirstPage, resetAll });

/* =============================
 * Filters
 * ============================= */
/** 分類篩選（selectedClassId = null 表示全部） */
const byClass = computed(() => {
	if (!props.selectedClassId) return newsList.value;
	return newsList.value.filter(
		(newsItem) => Number(newsItem.class_id) === Number(props.selectedClassId)
	);
});

/** 年份篩選（activeYear = all 表示全部） */
const byYear = computed(() => {
	if (props.activeYear === "all") return byClass.value;

	return byClass.value.filter(
		(newsItem) => getYearKey(newsItem.publish_date) === props.activeYear
	);
});

/* =============================
 * Sort
 * ============================= */
const sorted = computed(() => {
	const arr = [...byYear.value];

	// ✅ 置頂永遠在最前面（pin: true/1）
	const pinRank = (x) => (x?.pin ? 0 : 1); // 0 先，1 後

	arr.sort((a, b) => {
		// 1) 先比置頂
		const p = pinRank(a) - pinRank(b);
		if (p !== 0) return p;

		// 2) 再比排序
		if (props.sort === "date_desc") {
			return String(b.publish_date).localeCompare(String(a.publish_date));
		}
		if (props.sort === "date_asc") {
			return String(a.publish_date).localeCompare(String(b.publish_date));
		}

		return 0;
	});

	return arr;
});

/* =============================
 * Pagination
 * ============================= */
const total = computed(() => sorted.value.length);

const totalPages = computed(() =>
	Math.max(1, Math.ceil(total.value / pageLimit))
);

const paginatedNews = computed(() => {
	// 防止資料變少時 currentPage 超出頁數
	const p = Math.min(currentPage.value, totalPages.value);
	const start = (p - 1) * pageLimit;
	return sorted.value.slice(start, start + pageLimit);
});

/* UX：換頁自動捲回列表頂部 */
useScrollOnPageChange(currentPage, null);

/* 分類/年份/排序改變 → 回到第 1 頁 */
watch(
	() => [props.selectedClassId, props.activeYear, props.sort],
	() => {
		currentPage.value = 1;
	}
);

/* =============================
 * Emit：回報給父層
 * ============================= */
/** 回報總筆數 */
watch(
	() => total.value,
	() => emit("update:total", total.value),
	{ immediate: true }
);

/** 年份下拉選單 options（依目前分類 byClass 統計） */
const yearOptions = computed(() => {
	const set = new Set(
		byClass.value
			.map((newsItem) => getYearKey(newsItem.publish_date))
			.filter(Boolean)
	);
	return Array.from(set).sort((a, b) => b.localeCompare(a)); // 新到舊
});

watch(
	() => yearOptions.value,
	() => emit("update:years", yearOptions.value),
	{ immediate: true }
);

/* 初次載入 */
onMounted(async () => {
	await loadAllNews();
	emit("update:total", total.value);
	emit("update:years", yearOptions.value);
});

/* =============================
 * UI：Badge 顏色（依分類 slug）
 * ============================= */
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

/* =============================
 * HTML 轉純文字（去掉 tag、保留文字）
 * ============================= */
function htmlToText(html) {
	if (!html) return "";
	// 用 DOMParser 比 regex 安全
	const doc = new DOMParser().parseFromString(String(html), "text/html");
	const text = doc.body?.textContent || "";
	// 把多餘空白、換行收斂
	return text.replace(/\s+/g, " ").trim();
}

// 摘要：優先 description/desc；沒有才從 content 抽文字
function excerpt(newsItem, maxChars = 120) {
	const raw =
		(newsItem.description || "").trim() ||
		(newsItem.desc || "").trim() ||
		htmlToText(newsItem.content || "");

	if (!raw) return "";

	// 可選：限制字數（搭配 2 行更穩）
	if (raw.length > maxChars) return raw.slice(0, maxChars) + "…";
	return raw;
}
</script>

<style scoped>
.newsEmpty {
	grid-column: 1 / -1;
	text-align: center;
	padding: 48px 0;
	opacity: 0.75;
}
/* 限制行數避免版面爆掉 */
.newsCard__desc {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2; /*  只顯示 2 行 */
	overflow: hidden;
}
.newsCard__title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1; /*  只顯示 1 行 */
	overflow: hidden;
}
</style>
