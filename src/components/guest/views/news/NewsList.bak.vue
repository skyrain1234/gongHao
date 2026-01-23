<!-- src/components/guest/views/news/NewsList.vue -->
<template>
	<div>
		<!-- =============================
         清單區（卡片列表）
    ============================== -->
		<div class="row g-4 mb-3 mt-2">
			<!-- 每一個消息卡片 -->
			<div
				class="col-md-6 col-lg-4 col-12"
				v-for="newsItem in paginatedNews"
				:key="newsItem.id"
				data-aos="fade"
				data-aos-duration="500"
			>
				<div class="card h-100 news-card box_roller border-0 shadow-sm">
					<!-- 滑動才出現的按鈕（box_roller + roller） -->
					<!-- <div class="roller">
						<router-link
							:to="{
								name: 'news',
								params: { lang: route.params.lang, newsId: newsItem.id },
							}"
							class="btn btn-more fw-bold"
						>
							了解更多
						</router-link>
					</div> -->

					<!-- 圖片：Bootstrap ratio -->
					<div class="news-media">
						<img
							:src="getStorageFileUrl(newsItem.thumbnail_url)"
							:alt="newsItem.title"
							class="w-100 h-100"
						/>
					</div>

					<!-- 文字區 -->
					<div class="card-body d-flex flex-column news-card-body">
						<p class="news-class mb-1">
							{{ newsItem.class_name }}
						</p>

						<h5 class="card-title news-title">
							{{ newsItem.title }}
						</h5>

						<div
							class="news-meta mt-auto d-flex justify-content-between align-items-center"
						>
							<!-- 日期 -->
							<p class="news-date mb-0">
								{{ newsItem.publish_date }}
							</p>
							<!-- 查看內容 -->
							<router-link
								:to="{
									name: 'news',
									params: { lang: route.params.lang, newsId: newsItem.id },
								}"
								class="news-more"
							>
								{{$t('common.more')}}
							</router-link>
						</div>
					</div>
				</div>
			</div>

			<!-- 載入中 -->
			<BaseLoading v-if="isLoading" />

			<!-- 沒資料 -->
			<div v-else-if="!paginatedNews.length" class="col-12 text-center py-5">
				{{ $t("common.no-data") }}
			</div>
		</div>

		<!-- =============================
         分頁區
    ============================== -->
		<div v-if="!isLoading" class="mx-auto pb-3">
			<Pagination
				v-model:page="currentPage"
				:total-pages="totalPages"
				:limit="pageLimit"
				:total-items="filteredNews.length"
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
 * ============================ */
import { ref, computed, watch, onMounted, defineExpose } from "vue";
import { useRoute } from "vue-router";
import {
	getNewsList,
	getNewsSearch,
} from "@/api/main/service/news/newsService";
import Pagination from "@/components/guest/common/pagination/pagination.vue";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import { useScrollOnPageChange } from "@/api/main/tools/scrollOnPageChange";
import { appConfig } from "@/config/appConfig.js";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";

const route = useRoute();

/* =============================
 * Props：父層傳來的分類 id
 * ============================ */
const props = defineProps({
	selectedClassId: { type: Number, default: null },
});

/* =============================
 * State 變數
 * ============================ */
const newsList = ref([]); // API 原始資料
const isLoading = ref(true); // 載入中
const currentPage = ref(1); // 當前頁碼

/* =============================
 * API：第一次載入全部
 * ============================ */
const loadAllNews = async () => {
	try {
		isLoading.value = true;
		const result = await getNewsList();
		newsList.value = result;
	} catch (err) {
		console.error("getNewsList error:", err);
		newsList.value = [];
	} finally {
		isLoading.value = false;
	}
};

/* =============================
 * API：父層呼叫搜尋用
 * ============================ */
const searchByKeyword = async (keyword) => {
	currentPage.value = 1;

	try {
		isLoading.value = true;

		if (!keyword) {
			// 空字串 → 回到全部
			const result = await getNewsList();
			newsList.value = result;
		} else {
			// 有關鍵字 → 呼叫搜尋 API
			const result = await getNewsSearch(keyword);
			newsList.value = result;
		}
	} catch (err) {
		console.error("getNewsSearch error:", err);
		newsList.value = [];
	} finally {
		isLoading.value = false;
	}
};

// 讓父層 ref 可呼叫這個方法
defineExpose({ searchByKeyword });

/* =============================
 * 計算屬性：分類過濾
 * ============================ */
const filteredNews = computed(() => {
	if (!props.selectedClassId) return newsList.value;
	return newsList.value.filter(
		(item) => item.class_id === props.selectedClassId
	);
});

/* =============================
 * 計算屬性：分頁
 * ============================ */
const pageLimit = Number(appConfig.home.newsLimit ?? 10);

const totalPages = computed(() =>
	Math.max(1, Math.ceil(filteredNews.value.length / pageLimit))
);

const paginatedNews = computed(() => {
	const start = (currentPage.value - 1) * pageLimit;
	return filteredNews.value.slice(start, start + pageLimit);
});

/* =============================
 * UX：換頁自動捲動
 * ============================ */
useScrollOnPageChange(currentPage, null);

/* 當分類改變，回到第 1 頁 */
watch(
	() => props.selectedClassId,
	() => {
		currentPage.value = 1;
	}
);

/* =============================
 * onMounted：載入全部
 * ============================ */
onMounted(() => {
	loadAllNews();
});
</script>

<style scoped>
/* 按鈕點下去微縮一下，小小互動感（限本元件內 button） */
button {
	transition: transform 0.06s ease;
}
button:active {
	transform: scale(0.98);
}
</style>
