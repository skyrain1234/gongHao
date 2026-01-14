<template>
	<div
		class="page-qa"
		data-aos="fade-up"
		data-aos-duration="1000"
		data-aos-once="true"
		data-aos-mirror="false"
	>
		<div class="container">
			<div class="faq-shell">
				<!-- 標題區 -->
				<Qatitle />

				<!-- 分類 tabs -->
				<QaClassList @change="onSelectClass" class="mb-4" />

				<!-- 🔍 搜尋框 -->
				<div class="faq-search mb-3" data-aos="fade-up" data-aos-delay="150">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model.trim="keyword"
							:placeholder="$t('qa.search_placeholder')"
						/>
						<button
							type="button"
							class="btn btn-outline-secondary"
							@click="keyword = ''"
							v-if="keyword"
						>
							<i class="bi bi-x-lg"></i>
						</button>
					</div>
				</div>

				<!-- QA 列表 -->
				<QaList :selected-class-id="selectedClassId" :keyword="keyword" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import QaClassList from "@/components/guest/views/qa/QaClassList.vue";
import QaList from "@/components/guest/views/qa/QaList.vue";
import Qatitle from "@/components/guest/views/qa/Qatitle.vue";

// 選中的分類 id（0 = 全部 / 搜尋問題）
const selectedClassId = ref(null);

// 搜尋關鍵字
const keyword = ref("");

const onSelectClass = (id) => {
	selectedClassId.value = id;
	// 切換分類清掉搜尋
	keyword.value = "";
};
</script>

<style scoped>
.faq-search .form-control {
	border-radius: 999px;
	padding-inline: 1.25rem;
}

.faq-search .btn {
	border-radius: 999px;
}
</style>
