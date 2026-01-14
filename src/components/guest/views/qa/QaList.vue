<template>
	<div>
		<!-- ===========================
		     載入中畫面
		     =========================== -->
		<BaseLoading v-if="isLoading">
			{{ $t("common.loading") }}
		</BaseLoading>

		<!-- ===========================
		     QA 清單（有資料才顯示）
		     =========================== -->
		<div v-else-if="filteredItems.length" class="faq-content mt-3">
			<div class="faq-pane active" id="qaAccordion">
				<div class="faq-item" v-for="item in filteredItems" :key="item.id">
					<!-- 題目列 -->
					<div
						class="faq-header"
						role="button"
						data-bs-toggle="collapse"
						:data-bs-target="`#qa-${item.id}`"
						aria-expanded="false"
						:aria-controls="`qa-${item.id}`"
					>
						<div class="faq-label">Q</div>

						<button type="button" class="faq-question">
							{{ item.question }}
						</button>

						<div class="faq-toggle">
							<i class="bi bi-chevron-down"></i>
						</div>
					</div>

					<!-- 答案區 -->
					<div
						:id="`qa-${item.id}`"
						class="faq-answer-wrapper collapse"
						role="region"
						:aria-labelledby="`qa-${item.id}`"
						data-bs-parent="#qaAccordion"
					>
						<!-- 這裡的 answer 已經在載入時做過 absolutizeContentUrls -->
						<div class="faq-answer" v-html="item.answer"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- ===========================
		     無資料 & 非 loading
		     =========================== -->
		<div v-else class="text-center text-muted mt-4">
			{{ $t("common.no-data") || "目前沒有符合條件的項目" }}
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getQa } from "@/api/main/service/qa/qaService";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";
import { absolutizeContentUrls } from "@/api/main/tools/storageFileTools";

const props = defineProps({
	// 0 = 查看所有（全部），>0 = 單一分類
	selectedClassId: { type: Number, default: null },
	// 關鍵字（來自父層搜尋框）
	keyword: { type: String, default: "" },
});

const qaList = ref([]);
const isLoading = ref(false);

onMounted(loadQaList);

async function loadQaList() {
	isLoading.value = true;
	try {
		const response = await getQa();

		// 在這裡把內文 HTML 做「圖片 / 連結路徑」轉換
		qaList.value = (response || []).map((item) => ({
			...item,
			answer: absolutizeContentUrls(item.answer || ""),
		}));
	} catch (err) {
		console.error("getQa error:", err);
		qaList.value = [];
	} finally {
		isLoading.value = false;
	}
}

// 依「分類 + 關鍵字」做過濾
const filteredItems = computed(() => {
	let list = qaList.value;

	// ============================
	// 1) 先依分類（id > 0 才用 class_id）
	// ============================
	if (props.selectedClassId && props.selectedClassId > 0) {
		list = list.filter((it) => it.class_id === props.selectedClassId);
	}
	// id = 0（查看所有）就不過濾，直接用全部 list

	// ============================
	// 2) 再依關鍵字（可空）
	// ============================
	const kw = (props.keyword || "").trim().toLowerCase();
	if (!kw) {
		// 沒有關鍵字：直接回目前 list
		return list;
	}

	// 有關鍵字：在目前 list 中搜尋
	return list.filter((it) => {
		const q = String(it.question || "").toLowerCase();
		const a = String(it.answer || "").toLowerCase();
		return q.includes(kw) || a.includes(kw);
	});
});
</script>
