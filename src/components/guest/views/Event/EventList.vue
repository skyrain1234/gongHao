<!-- src/components/guest/views/event/EventList.vue -->
<template>
	<div>
		<!-- =============================
		     evt Grid（Vue 渲染卡片/清單）
		     ============================= -->
		<div
			class="evtGrid"
			:class="{
				'evtGrid--cards': viewMode === 'cards',
				'evtGrid--list': viewMode === 'list',
			}"
			aria-live="polite"
		>
			<!-- 一則活動卡 -->
			<article
				class="evtCard"
				v-for="eventItem in paginatedEvent"
				:key="eventItem.id"
			>
				<!-- 預覽圖：list 模式不顯示 -->
				<div class="evtCard__thumb" v-if="viewMode !== 'list'">
					<img
						class="evtCard__img"
						:src="getStorageFileUrl(eventItem.thumbnail_url) || fallbackCover"
						:alt="eventItem.title"
					/>
				</div>

				<div class="evtCard__body">
					<!-- 狀態 + 活動時間（簡版） -->
					<div class="evtCard__top">
						<span
							class="evtPill"
							:class="statusPillClass(eventItem)"
							v-if="statusText(eventItem)"
						>
							{{ statusText(eventItem) }}
						</span>
						<span class="evtDate" v-if="eventRangeDateOnly(eventItem)">
							活動時間：{{ eventRangeDateOnly(eventItem) }}
						</span>
					</div>

					<!-- 標題：置頂標示 -->
					<h3 class="evtCard__title">
						<span v-if="eventItem.pin">【置頂】</span>{{ eventItem.title }}
					</h3>

					<!-- 摘要 -->
					<p class="evtCard__desc">
						{{ eventItem.description }}
					</p>

					<!-- 小 meta -->
					<div class="evtCard__meta">
						<span class="evtTag" v-if="signupRangeDateOnly(eventItem)">
							報名時間：{{ signupRangeDateOnly(eventItem) }}
						</span>
					</div>

					<!-- 底部：hashtag + 查看 -->
					<div class="evtCard__foot">
						<div class="evtFootLeft">
							<div class="evtTags" v-if="hashtags(eventItem).length">
								<button
									type="button"
									class="evtTag evtTag--clickable"
									v-for="tag in hashtags(eventItem)"
									:key="tag"
									@click="toggleTag(tag)"
									:class="{ 'is-active': isTagActive(tag) }"
								>
									#{{ tag }}
								</button>
							</div>
						</div>

						<button class="evtLink" type="button" @click="openEvt(eventItem)">
							查看 →
						</button>
					</div>
				</div>
			</article>

			<!-- 空狀態（可選） -->
			<div v-if="!isLoading && sorted.length === 0" class="evtEmpty">
				目前沒有符合條件的活動
			</div>
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

		<!-- =============================
		     Modal（原生 dialog）
		     ============================= -->
		<dialog ref="dlg" class="evtModal" @click="onBackdropClick">
			<div class="evtModal__panel">
				<header class="evtModal__head">
					<div class="evtModal__title">
						<!-- 第一列：狀態 + 活動日期區間 -->
						<div>
							<span
								class="evtPill"
								:class="statusPillClass(activeEvt)"
								v-if="statusText(activeEvt)"
							>
								{{ statusText(activeEvt) }}
							</span>
						</div>

						<!-- 標題 -->
						<h3 class="fw-bold">{{ activeEvt?.title }}</h3>
						<p class="small" v-if="activeEvt?.class_name">
							{{ activeEvt.class_name }}
						</p>

						<!-- 第二列：報名區間 + 類別/地點/hashtag -->
						<div>
							<template v-for="tag in hashtags(activeEvt)" :key="tag">
								<span class="evtTag me-2 fs-6">#{{ tag }}</span>
							</template>
						</div>
					</div>

					<button
						class="evtModal__close"
						type="button"
						@click="closeEvt"
						aria-label="Close"
					>
						×
					</button>
				</header>

				<div class="evtModal__body">
					<div v-if="signupRangeText(activeEvt)">
						<p>報名時間：</p>
						<p>{{ signupRangeText(activeEvt) }}</p>
					</div>

					<div v-if="eventRangeText(activeEvt)">
						<p>活動時間：</p>
						<p>{{ eventRangeText(activeEvt) }}</p>
					</div>
					<div v-if="activeEvt?.description" class="mt-2">
						<p>簡介:</p>
						<p>
							{{ activeEvt.description }}
						</p>
					</div>
				</div>

				<footer class="evtModal__foot">
					<div>
						<a
							v-if="activeEvt?.url"
							class="evtLink"
							:href="activeEvt.url"
							target="_blank"
							rel="noopener"
						>
							立即報名
						</a>
						<router-link
							class="evtLink"
							:to="{
								name: 'event',
								params: { lang: route.params.lang, eventId: activeEvt.id },
							}"
							v-if="activeEvt"
						>
							查看詳情 →
						</router-link>
					</div>
					<button class="evtLink" type="button" @click="closeEvt">關閉</button>
				</footer>
			</div>
		</dialog>
	</div>
</template>

<script setup>
/* =============================
 * Imports
 * ============================= */
import {
	ref,
	computed,
	watch,
	onMounted,
	onBeforeUnmount,
	defineExpose,
} from "vue";
import { useRoute } from "vue-router";
import {
	getEventList,
	getEventSearch,
} from "@/api/main/service/event/eventService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import { appConfig } from "@/config/appConfig.js";

import Pagination from "@/components/guest/common/pagination/pagination.vue";
import { useScrollOnPageChange } from "@/api/main/tools/scrollOnPageChange";
import { absolutizeContentUrls } from "@/api/main/tools/storageFileTools";

/**
 * fallbackCover 用 import（Vite 會處理 build 路徑 / hash）
 */
import fallbackCover from "@/assets/images/event/eventDefault.png";

const route = useRoute();

/* =============================
 * Hashtag filter (local)
 * ============================= */
const selectedTag = ref(""); // 空字串 = 未篩選

function normalizeTagKey(tag) {
	return String(tag || "")
		.trim()
		.toLowerCase();
}

function isTagActive(tag) {
	return (
		normalizeTagKey(tag) &&
		normalizeTagKey(tag) === normalizeTagKey(selectedTag.value)
	);
}

function toggleTag(tag) {
	const k = normalizeTagKey(tag);
	if (!k) return;

	// 點同一個 -> 取消
	selectedTag.value = isTagActive(tag) ? "" : tag;

	// 篩選變了，回到第一頁
	currentPage.value = 1;
}

/* =============================
 * Props / Emits
 * ============================= */
const props = defineProps({
	selectedClassId: { type: Number, default: null }, // null = 全部分類
	viewMode: { type: String, default: "cards" }, // cards | list
	activeYear: { type: String, default: "all" }, // all | YYYY
	sort: { type: String, default: "date_desc" }, // date_desc | date_asc
	statusFilter: { type: String, default: "all" }, // all | open | soon | ended | none
});

const emit = defineEmits(["update:total", "update:years"]);

/* =============================
 * State
 * ============================= */
const eventList = ref([]);
const isLoading = ref(true);

const currentPage = ref(1);
const pageLimit = Number(appConfig.home.eventLimit ?? 6);

/* =============================
 * Date helpers
 * ============================= */
const getYearKey = (iso) => (iso ? String(iso).slice(0, 4) : "");

function parseDate(v) {
	if (!v) return null;
	const d = new Date(v); // 你的後端已回 ISO (Y-m-dTH:i:sP)，這裡 OK
	return Number.isNaN(d.getTime()) ? null : d;
}

function pad2(n) {
	return String(n).padStart(2, "0");
}

function formatYMD(d) {
	if (!d) return "";
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatHM(d) {
	if (!d) return "";
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

// 只顯示日期（不含時間）：YYYY-MM-DD 或 YYYY-MM-DD ～ YYYY-MM-DD
function eventRangeDateOnly(it) {
	if (!it) return "";
	const s = parseDate(it.event_start_at);
	const e = parseDate(it.event_end_at);

	if (!s && !e) return "";
	if (s && !e) return formatYMD(s);
	if (!s && e) return `至 ${formatYMD(e)}`;

	const sameDay = formatYMD(s) === formatYMD(e);
	return sameDay ? formatYMD(s) : `${formatYMD(s)} ～ ${formatYMD(e)}`;
}

// 只顯示日期（不含時間）：YYYY-MM-DD ～ YYYY-MM-DD（缺一邊也能正常顯示）
function signupRangeDateOnly(it) {
	if (!it) return "";
	const s = parseDate(it.signup_start_at);
	const e = parseDate(it.signup_end_at);

	if (!s && !e) return "";
	if (s && !e) return `${formatYMD(s)} 起`;
	if (!s && e) return `至 ${formatYMD(e)}`;

	const sameDay = formatYMD(s) === formatYMD(e);
	return sameDay ? formatYMD(s) : `${formatYMD(s)} ～ ${formatYMD(e)}`;
}

/** 活動日期區間：event_start_at ~ event_end_at（沒有 end 就顯示單日） */
function eventRangeText(it) {
	if (!it) return "";
	const s = parseDate(it.event_start_at);
	const e = parseDate(it.event_end_at);

	if (!s && !e) return "";

	// 只有 start
	if (s && !e) return `${formatYMD(s)} ${formatHM(s)}`.trim();

	// 只有 end（很少見）
	if (!s && e) return `至 ${formatYMD(e)} ${formatHM(e)}`.trim();

	// start & end
	const sameDay = formatYMD(s) === formatYMD(e);
	if (sameDay) {
		const left = `${formatYMD(s)} ${formatHM(s)}`.trim();
		const right = `${formatHM(e)}`.trim();
		return right ? `${left} ～ ${right}` : left;
	}

	return `${formatYMD(s)} ${formatHM(s)} ～ ${formatYMD(e)} ${formatHM(e)}`
		.replace(/\s+/g, " ")
		.trim();
}

/** 報名日期區間：signup_start_at ~ signup_end_at */
function signupRangeText(it) {
	if (!it) return "";
	const s = parseDate(it.signup_start_at);
	const e = parseDate(it.signup_end_at);

	if (!s && !e) return;
		// 只有 start
	if (s && !e) return `${formatYMD(s)} ${formatHM(s)}`.trim();

	// 只有 end（很少見）
	if (!s && e) return `至 ${formatYMD(e)} ${formatHM(e)}`.trim();

	return `${formatYMD(s)} ${formatHM(s)} ～ ${formatYMD(e)} ${formatHM(e)}`
		.replace(/\s+/g, " ")
		.trim();
}

const timeValue = (it) => parseDate(it?.event_start_at)?.getTime() ?? 0;

/* =============================
 * API：載入 / 搜尋
 * ============================= */
const loadAllEvent = async () => {
	try {
		isLoading.value = true;
		const result = await getEventList();
		eventList.value = Array.isArray(result) ? result : [];
	} catch (err) {
		console.error("getEventList error:", err);
		eventList.value = [];
	} finally {
		isLoading.value = false;
	}
};

const searchByKeyword = async (keyword) => {
	currentPage.value = 1;
	try {
		isLoading.value = true;
		const result = !keyword
			? await getEventList()
			: await getEventSearch(keyword);
		eventList.value = Array.isArray(result) ? result : [];
	} catch (err) {
		console.error("getEventSearch error:", err);
		eventList.value = [];
	} finally {
		isLoading.value = false;
	}
};

const resetToFirstPage = () => (currentPage.value = 1);
const resetAll = () => {
	currentPage.value = 1;
	selectedTag.value = "";
};

defineExpose({ searchByKeyword, resetToFirstPage, resetAll });

/* =============================
 * Filters
 * ============================= */
const byClass = computed(() => {
	if (props.selectedClassId == null) return eventList.value;
	return eventList.value.filter(
		(it) => Number(it.class_id) === Number(props.selectedClassId)
	);
});

const byYear = computed(() => {
	if (props.activeYear === "all") return byClass.value;
	return byClass.value.filter(
		(it) => getYearKey(it.event_start_at) === props.activeYear
	);
});

const byTag = computed(() => {
	const key = normalizeTagKey(selectedTag.value);
	if (!key) return byYear.value;

	return byYear.value.filter((it) => {
		const tags = hashtags(it).map((t) => normalizeTagKey(t));
		return tags.includes(key);
	});
});

const byStatus = computed(() => {
	const f = props.statusFilter || "all";
	if (f === "all") return byTag.value;
	return byTag.value.filter((it) => getSignupStatus(it) === f);
});

/* =============================
 * Sort (pin first + date)
 * ============================= */
const sorted = computed(() => {
	const arr = [...byStatus.value];
	const pinRank = (x) => (x?.pin ? 0 : 1);

	arr.sort((a, b) => {
		const p = pinRank(a) - pinRank(b);
		if (p !== 0) return p;

		if (props.sort === "date_desc") return timeValue(b) - timeValue(a);
		if (props.sort === "date_asc") return timeValue(a) - timeValue(b);
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

const paginatedEvent = computed(() => {
	const p = Math.min(currentPage.value, totalPages.value);
	const start = (p - 1) * pageLimit;
	return sorted.value.slice(start, start + pageLimit);
});

useScrollOnPageChange(currentPage, null);

watch(
	() => [
		props.selectedClassId,
		props.activeYear,
		props.sort,
		props.statusFilter,
	],
	() => {
		currentPage.value = 1;
	}
);

/* =============================
 * Emit：回報給父層
 * ============================= */
watch(
	() => total.value,
	() => emit("update:total", total.value),
	{ immediate: true }
);

const yearOptions = computed(() => {
	const set = new Set(
		byClass.value.map((it) => getYearKey(it.event_start_at)).filter(Boolean)
	);
	return Array.from(set).sort((a, b) => b.localeCompare(a));
});

watch(
	() => yearOptions.value,
	() => emit("update:years", yearOptions.value),
	{ immediate: true }
);

/* 初次載入 */
onMounted(async () => {
	await loadAllEvent();
	emit("update:total", total.value);
	emit("update:years", yearOptions.value);
});

/* =============================
 * UI：報名狀態 + 即將截止
 * ============================= */
function getSignupStatus(it) {
	const now = new Date();
	const start = parseDate(it?.signup_start_at);
	const end = parseDate(it?.signup_end_at);

	if (!start && !end) return "none";
	if (start && now < start) return "soon";
	if (end && now > end) return "ended";
	return "open";
}

const ENDING_SOON_DAYS = 7;

function isEndingSoon(it, days = ENDING_SOON_DAYS) {
	const now = new Date();
	const end = parseDate(it?.signup_end_at);
	if (!end) return false;
	if (now > end) return false;

	const diffDays = (end.getTime() - now.getTime()) / 86400000;
	return Math.ceil(diffDays) <= days;
}

function statusText(it) {
	const s = getSignupStatus(it);
	if (s === "open") {
		if (isEndingSoon(it, 7)) return "報名即將截止";
		return "開放報名中";
	}
	if (s === "soon") return "尚未開始";
	if (s === "ended") return "已截止報名";
	return String(it?.class_name || "活動");
}

function statusPillClass(it) {
	const s = getSignupStatus(it);
	if (s === "open") {
		if (isEndingSoon(it, 7)) return "evtPill--ending";
		return "evtPill--open";
	}
	if (s === "soon") return "evtPill--soon";
	if (s === "ended") return "evtPill--ended";
	return "";
}

/* =============================
 * Text helpers
 * ============================= */
function htmlToText(html) {
	if (!html) return "";
	const doc = new DOMParser().parseFromString(String(html), "text/html");
	const text = doc.body?.textContent || "";
	return text.replace(/\s+/g, " ").trim();
}

function excerpt(it, maxChars = 120) {
	if (!it) return "";
	const raw =
		(it.description || "").trim() ||
		(it.desc || "").trim() ||
		htmlToText(it.content || "");

	if (!raw) return "";
	return raw.length > maxChars ? raw.slice(0, maxChars) + "…" : raw;
}

function hashtags(it) {
	const s = it?.hashtag;
	if (!s) return [];
	return String(s)
		.split(",")
		.map((x) => x.trim())
		.filter(Boolean);
}

/* =============================
 * Modal state (原生 dialog)
 * ============================= */
const dlg = ref(null);
const activeEvt = ref(null);

const openEvt = (it) => {
	activeEvt.value = it || null;
	if (dlg.value && !dlg.value.open) dlg.value.showModal();
	document.documentElement.style.overflow = "hidden";
};

const closeEvt = () => {
	if (dlg.value && dlg.value.open) dlg.value.close();
	activeEvt.value = null;
	document.documentElement.style.overflow = "";
};

const onBackdropClick = (e) => {
	if (e.target === dlg.value) closeEvt();
};

const onCancel = (e) => {
	e.preventDefault();
	closeEvt();
};

onMounted(() => {
	if (!dlg.value) return;
	dlg.value.addEventListener("cancel", onCancel);
});

onBeforeUnmount(() => {
	if (!dlg.value) return;
	dlg.value.removeEventListener("cancel", onCancel);
	document.documentElement.style.overflow = "";
});
</script>
