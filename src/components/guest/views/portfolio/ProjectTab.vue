<!-- src/components/guest/views/portfolio/ProjectTab.vue -->
<template>
	<section>
		<div class="row g-3">
			<div
				v-for="item in pagedProjects"
				:key="item.id"
				class="col-12 col-md-6 col-lg-4"
				data-aos="fade"
			>
				<div class="card portfolio-card h-100">
					<!-- 有網址 -->
					<div
						target="_blank"
						rel="noopener"
						class="text-decoration-none text-reset d-flex flex-column h-100"
						aria-label="前往專案頁面"
					>


						<div class="portfolio-card-body card-body">
							<div class="portfolio-title" :title="item.title">
								{{ item.title }}
							</div>
							<!-- <div class="portfolio-meta text-break">
								{{ item.url }}
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 分頁 -->
		<Pagination
			v-if="!isLoading && projects.length > limit"
			v-model:page="currentPage"
			:total-pages="totalPages"
			:window-size="3"
			:show-jump="true"
			:show-info="true"
			:limit="limit"
			:total-items="projects.length"
			class="mt-4"
		/>

		<!-- 載入中 / 空狀態 -->
		<BaseLoading v-if="isLoading" />
		<!-- 沒資料 -->
		<div v-else-if="!projects.length" class="col-12 text-center py-5">
			{{ $t("common.no-data") }}
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getProjectList } from "@/api/main/service/portfolio/projectService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import Pagination from "@/components/guest/common/pagination/pagination.vue";
import { useScrollOnPageChange } from "@/api/main/tools/scrollOnPageChange";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projects = ref([]);
const isLoading = ref(true);

/* 分頁設定 */
const limit = 20;
const currentPage = ref(1);
const totalPages = computed(() =>
	Math.max(1, Math.ceil(projects.value.length / limit))
);
const pagedProjects = computed(() => {
	const start = (currentPage.value - 1) * limit;
	return projects.value.slice(start, start + limit);
});

useScrollOnPageChange(currentPage, null);

/* 初始化 */
onMounted(() => {
	loadProjectList();
});

/* Core API */
const loadProjectList = async () => {
	try {
		isLoading.value = true;
		const response = await getProjectList();
		projects.value = response;
	} catch (err) {
		console.error("getProjectList error:", err);
		projects.value = [];
	} finally {
		isLoading.value = false;
	}
};
</script>
