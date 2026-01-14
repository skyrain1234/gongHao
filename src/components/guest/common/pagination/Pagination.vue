<template>
	<div>
		<!-- ================= Pagination ================= -->
		<nav :aria-label="$t('common.pagination.aria.pagination')">
			<ul class="pagination d-flex justify-content-center">
				<!-- Previous -->
				<li class="page-item" :class="{ disabled: currentPage === 1 }">
					<button
						class="page-link"
						@click="goToPage(currentPage - 1)"
						:aria-label="$t('common.pagination.aria.prev')"
					>
						«
					</button>
				</li>

				<!-- First page -->
				<li v-if="pageWindow.startPageNumber > 1" class="page-item">
					<button class="page-link" @click="goToPage(1)">1</button>
				</li>

				<!-- Leading ellipsis -->
				<li v-if="pageWindow.startPageNumber > 2" class="page-item disabled">
					<span class="page-link">…</span>
				</li>

				<!-- Page numbers -->
				<li
					v-for="pageNumber in pageWindow.pageNumberList"
					:key="`page-${pageNumber}`"
					class="page-item"
					:class="{ active: currentPage === pageNumber }"
					:aria-current="currentPage === pageNumber ? 'page' : null"
				>
					<button class="page-link" @click="goToPage(pageNumber)">
						{{ pageNumber }}
					</button>
				</li>

				<!-- Trailing ellipsis -->
				<li
					v-if="pageWindow.endPageNumber < totalPages - 1"
					class="page-item disabled"
				>
					<span class="page-link">…</span>
				</li>

				<!-- Last page -->
				<li v-if="pageWindow.endPageNumber < totalPages" class="page-item">
					<button class="page-link" @click="goToPage(totalPages)">
						{{ totalPages }}
					</button>
				</li>

				<!-- Next -->
				<li class="page-item" :class="{ disabled: currentPage === totalPages }">
					<button
						class="page-link"
						@click="goToPage(currentPage + 1)"
						:aria-label="$t('common.pagination.aria.next')"
					>
						»
					</button>
				</li>
			</ul>
		</nav>

		<!-- ================= Page Info ================= -->
		<p v-if="showInfo" class="text-center mt-2">
			{{
				$t("common.pagination.info.page", {
					current: currentPage,
					total: totalPages,
				})
			}}
			<span v-if="limit && totalItems">
				{{
					$t("common.pagination.info.items", {
						limit,
						totalItems,
					})
				}}
			</span>
		</p>

		<!-- ================= Jump to Page ================= -->
		<div v-if="showJump" class="d-flex justify-content-center mt-2">
			<div
				class="input-group input-group-sm align-items-center justify-content-center"
				style="width: 180px"
			>
				<label class="me-2 small">
					{{ $t("common.pagination.jump.prefix") }}
				</label>

				<input
					v-model="gotoPageInputValue"
					type="number"
					class="form-control"
					:min="1"
					:max="totalPages"
					@keydown.enter.prevent="onGoPage"
				/>

				<label class="mx-2 small">
					{{ $t("common.pagination.jump.suffix") }}
				</label>
			</div>

			<button class="btn btn-outline-secondary" @click="onGoPage">
				{{ $t("common.pagination.jump.go") }}
			</button>
		</div>

		<!-- ================= Error Message ================= -->
		<div class="d-flex justify-content-center">
			<small v-if="gotoErrorMessageText" class="text-danger d-block mt-1">
				{{ gotoErrorMessageText }}
			</small>
		</div>
	</div>
</template>

<script setup>
/* =========================
 * Imports
 * ========================= */
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // Router用來同步網址 ?page

/* =========================
 * v-model:page（雙向綁定）
 * 讀寫 currentPage 會自動同步父層
 * ========================= */
const currentPage = defineModel("page", { type: Number, default: 1 });

/* =========================
 * Props（父層傳入）
 * - 核心邏輯：totalPages, windowSize
 * - 顯示控制：showInfo, showJump
 * - 額外資訊（純顯示）：limit, totalItems
 * - URL 同步選項 : syncQuery , queryParamName , urlMode , preserveQueryKeys
 * ========================= */
const props = defineProps({
	totalPages: { type: Number, required: true }, // 總頁數（父層計算）
	windowSize: { type: Number, default: 5 }, // 一次顯示多少個頁碼
	showInfo: { type: Boolean, default: true }, // 顯示「第 X / Y 頁」
	showJump: { type: Boolean, default: true }, // 顯示跳頁輸入
	limit: { type: Number, default: null }, // 每頁幾筆（純顯示）
	totalItems: { type: Number, default: null }, // 總筆數（純顯示）
	syncQuery: { type: Boolean, default: true }, // 是否同步網址 ?page=
	queryParamName: { type: String, default: "page" }, // 參數名可自訂
	urlMode: { type: String, default: "replace" }, // 'replace' 或 'push'
	preserveQueryKeys: { type: Array, default: () => [] }, // 其它要保留的 query keys
});

/* =========================
 * Utils
 * - clampPage：統一邊界處理（最小 1，最大 totalPages）
 * ========================= */
function clampPage(requestedPage) {
	const totalPageCount = Math.max(1, props.totalPages || 1);
	/*檢查傳入的值是否為有限數字（排除 NaN, Infinity 等異常值
      true:把小數點去掉，false:設為1 */
	const safePage = Number.isFinite(requestedPage)
		? Math.trunc(requestedPage)
		: 1;
	// 範圍限制在 [1, totalPageCount]
	return Math.min(Math.max(safePage, 1), totalPageCount);
}

/* =========================
 *   Router 同步輔助
 * ========================= */
const route = useRoute();
const router = useRouter();

//統一處理參數值轉換成合法數字頁碼
function parsePage(queryValue) {
	const numericPage = Number(queryValue);
	return Number.isFinite(numericPage) && numericPage >= 1
		? Math.trunc(numericPage)
		: 1;
}

// 循環保護
let syncingFromState = false;
let syncingFromRoute = false;

/* =========================
 * Init
 * - 初始化把當前頁夾回有效範圍
 * - 延後到 mounted，且若 syncQuery 為true先套用網址 ?
 * ========================= */
onMounted(() => {
	if (props.syncQuery) {
		const pageFromQuery = parsePage(route.query[props.queryParamName]);
		if (pageFromQuery !== currentPage.value) {
			currentPage.value = pageFromQuery; // 透過 v-model 回寫父層
		}
	}
	currentPage.value = clampPage(currentPage.value);
});

/* =========================
 * Watchers
 * - 總頁數變更：若超界就自動夾回（defineModel 會自動 emit）
 * ========================= */
watch(
	() => props.totalPages,
	() => {
		const clampedPage = clampPage(currentPage.value);
		if (clampedPage !== currentPage.value) {
			currentPage.value = clampedPage;
		}
	}
);

/* =========================
 * （新增）URL 同步（state ↔ query）
 * ========================= */
// state → URL
watch(
	() => currentPage.value,
	(page) => {
		if (!props.syncQuery) return;
		if (syncingFromRoute) return;

		const pageFromQuery = parsePage(route.query[props.queryParamName]);
		if (pageFromQuery === page) return;

		// 預設保留所有 query
		const nextQuery = { ...route.query, [props.queryParamName]: page };

		// 確保保留指定 keys
		props.preserveQueryKeys.forEach((key) => {
			if (route.query[key] !== undefined) nextQuery[key] = route.query[key];
		});

		syncingFromState = true;
		const navigationTarget = { query: nextQuery };
		(props.urlMode === "push"
			? router.push(navigationTarget)
			: router.replace(navigationTarget)
		).finally(() => (syncingFromState = false));
	}
);

// URL → state（上一頁/前進）
watch(
	() => route.query[props.queryParamName],
	(queryValue) => {
		if (!props.syncQuery) return;
		if (syncingFromState) return;

		const pageFromQuery = parsePage(queryValue);
		if (pageFromQuery !== currentPage.value) {
			syncingFromRoute = true;
			currentPage.value = pageFromQuery; // 透過 v-model 回寫
			syncingFromRoute = false;
		}
	},
	{ immediate: true } //加入這行按下上一頁時才會自動帶入分頁
);

/* =========================
 * Computed
 * - pageWindow：計算要顯示的頁碼視窗
 * ========================= */
const pageWindow = computed(() => {
	const totalPageCount = Math.max(1, props.totalPages || 1); // 總頁數（至少 1 頁）
	const activePage = clampPage(currentPage.value); // 目前頁碼
	const windowSize = Math.max(1, props.windowSize); // 一次顯示多少頁碼
	const halfWindow = Math.floor(windowSize / 2); // 左右各幾個頁碼

	let startPage = Math.max(1, activePage - halfWindow); // 視窗開始頁碼
	let endPage = Math.min(totalPageCount, startPage + windowSize - 1); // 視窗結束頁碼
	startPage = Math.max(1, endPage - windowSize + 1); // 補齊：確保顯示完整 windowSize

	const pages = [];
	for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
		pages.push(pageNumber); // 頁碼清單陣列
	}

	return {
		startPageNumber: startPage,
		endPageNumber: endPage,
		pageNumberList: pages,
	};
});

/* =========================
 * Methods
 * - goToPage：統一導頁入口（上一頁 / 下一頁 / 點頁碼 / 跳頁）
 * - onGoPage：處理跳頁輸入與錯誤訊息
 * ========================= */

/* 導頁 */
function goToPage(targetPage) {
	const clampedPage = clampPage(targetPage);
	if (clampedPage !== currentPage.value) {
		currentPage.value = clampedPage; // 自動觸發 v-model 回寫
	}
}

/* 跳頁 */
const gotoPageInputValue = ref("");
const gotoErrorMessageText = ref(""); // 輸入錯誤提醒

function onGoPage() {
	const requestedPage = Number(gotoPageInputValue.value);
	const clampedPage = clampPage(requestedPage);

	// 若非整數
	if (!Number.isInteger(requestedPage)) {
		gotoErrorMessageText.value = "請輸入整數頁碼";
		return;
	}
	// 若小於1或超過頁碼範圍
	if (clampedPage !== requestedPage) {
		gotoErrorMessageText.value = `頁碼範圍為 1–${props.totalPages}`;
		return;
	}

	// 合法 → 清除錯誤與搜尋框並導頁
	gotoErrorMessageText.value = "";
	goToPage(requestedPage);
	gotoPageInputValue.value = "";
}
</script>
<style lang="scss" scoped>
.page-link:hover {
	background-color: rgb(31, 68, 214);
	color: white;
}
.page-item.active .page-link {
	background-color: rgb(31, 68, 214);
	color: white;
}
</style>
