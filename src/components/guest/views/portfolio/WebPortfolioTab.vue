<!-- src/components/guest/views/portfolio/WebPortfolioTab.vue -->
<template>
	<section>
		<!-- 分類： -->
		<div
			class="portfolio-tabs d-flex flex-wrap mb-3 gap-2 py-2"
			role="group"
			aria-label="Web Filter"
		>
			<!-- 查看全部按鈕 -->
			<button
				v-if="classes.length"
				type="button"
				class="tab-pill me-2"
				:class="{ active: selectedClassId === null }"
				@click.prevent="selectedClassId = null"
				data-aos="fade"
				data-aos-delay="100"
			>
				{{ $t("common.all") }}
			</button>

			<!-- 分類按鈕 -->
			<button
				v-for="(c, i) in classes"
				:key="c.id"
				type="button"
				class="tab-pill me-2"
				:class="{ active: selectedClassId === c.id }"
				@click.prevent="selectedClassId = c.id"
				data-aos="fade"
				:data-aos-delay="i * 100 + 100"
			>
				{{ c.name }}
			</button>
		</div>

		<!-- 清單：套用 portfolio-card 結構 -->
		<div class="row g-3">
			<div
				v-for="item in pagedList"
				:key="item.id"
				class="col-12 col-md-6 col-lg-4"
				data-aos="fade"
				data-aos-delay="500"
			>
				<div class="card portfolio-card h-100">
					<!-- 有網址：整張卡片可點，外層用 a 包住 -->
					<a
						v-if="item.url"
						:href="item.url"
						target="_blank"
						rel="noopener"
						class="text-decoration-none text-reset d-flex flex-column h-100"
						aria-label="前往網站"
					>
						<div class="portfolio-media">
							<img
								:src="getStorageFileUrl(item.thumbnail_url)"
								:alt="item.name"
								class="w-100 h-100"
							/>
							<!-- 上方小標籤（類別） -->
							<span v-if="item.class_name" class="pf-tag-pill">
								{{ item.class_name }}
							</span>
						</div>

						<!-- 文字區 -->
						<div class="portfolio-card-body card-body">
							<div class="portfolio-title text-truncate" :title="item.name">
								{{ item.name }}
							</div>

							<div class="portfolio-meta text-break">
								{{ item.description }}
							</div>
						</div>
					</a>

					<!-- 沒網址：純展示卡片 -->
					<div
						v-else
						class="d-flex flex-column h-100 text-reset text-decoration-none"
					>
						<div class="portfolio-media">
							<img
								:src="getStorageFileUrl(item.thumbnail_url)"
								:alt="item.name"
								class="w-100 h-100"
							/>
							<span v-if="item.class_name" class="pf-tag-pill">
								{{ item.class_name }}
							</span>
						</div>

						<div class="portfolio-card-body card-body">
							<div class="portfolio-title text-truncate" :title="item.name">
								{{ item.name }}
							</div>

							<div class="portfolio-meta text-muted">—</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 分頁 -->
		<Pagination
			v-if="!isLoading && filteredList.length > limit"
			v-model:page="currentPage"
			:total-pages="totalPages"
			:window-size="3"
			:show-jump="true"
			:show-info="true"
			:limit="limit"
			:total-items="filteredList.length"
			class="mt-4"
		/>

		<!-- 載入中 / 空狀態 -->
		<BaseLoading v-if="isLoading" />
		<!-- 沒資料 -->
		<div v-else-if="!filteredList.length" class="col-12 text-center py-5">
			{{ $t("common.no-data") }}
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getPortfolioClassList } from "@/api/main/service/portfolio/portfolioClassService";
import { getPortfolio } from "@/api/main/service/portfolio/portfolioService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import Pagination from "@/components/guest/common/pagination/pagination.vue";
import { useScrollOnPageChange } from "@/api/main/tools/scrollOnPageChange";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";

const classes = ref([]);
const list = ref([]);
const selectedClassId = ref(null);
const isLoading = ref(true);

/* 分頁 */
const limit = 9;
const currentPage = ref(1);
const filteredList = computed(() => {
	if (selectedClassId.value === null) return list.value;
	return list.value.filter(
		(x) => String(x.class_id) === String(selectedClassId.value)
	);
});
const totalPages = computed(() =>
	Math.max(1, Math.ceil(filteredList.value.length / limit))
);
const pagedList = computed(() => {
	const start = (currentPage.value - 1) * limit;
	return filteredList.value.slice(start, start + limit);
});

useScrollOnPageChange(currentPage, null);
watch(selectedClassId, () => {
	currentPage.value = 1;
});

/* 初始化 */
onMounted(() => {
	loadPortfolioList();
	loadPortfolioClassList();
});

/* API */
const loadPortfolioClassList = async () => {
	try {
		const response = await getPortfolioClassList();
		classes.value = response;
	} catch (err) {
		console.error("getPortfolioClassList error:", err);
		classes.value = [];
	}
};

const loadPortfolioList = async () => {
	try {
		isLoading.value = true;
		const response = await getPortfolio();
		list.value = response;
	} catch (err) {
		console.error("getPortfolio error:", err);
		list.value = [];
	} finally {
		isLoading.value = false;
	}
};
</script>
