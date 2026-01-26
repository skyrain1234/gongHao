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
						<!-- <span class="evtDate" v-if="eventRangeDateOnly(eventItem)">
							活動時間：{{ eventRangeDateOnly(eventItem) }}
						</span> -->
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
						<span class="evtTag" v-if="eventRangeDateOnly(eventItem)">
							活動時間：{{ eventRangeDateOnly(eventItem) }}
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
							{{activeEvt?.url_text}}
						</a>

						<router-link
							class="evtLink ms-2"
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
import fallbackCover from "@/assets/images/event/eventDefault.png";

const route = useRoute();

/* =============================
 * Props / Emits
 * ============================= */
const props = defineProps({
	selectedClassId: { type: Number, default: null },
	viewMode: { type: String, default: "cards" },
	activeYear: { type: String, default: "all" },
	sort: { type: String, default: "date_desc" },
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
 * Tag filter
 * ============================= */
const selectedTag = ref("");

function normalizeTagKey(tag) {
	return String(tag || "")
		.trim()
		.toLowerCase();
}
function isTagActive(tag) {
	const a = normalizeTagKey(tag);
	const b = normalizeTagKey(selectedTag.value);
	return !!a && a === b;
}
function toggleTag(tag) {
	const k = normalizeTagKey(tag);
	if (!k) return;
	selectedTag.value = isTagActive(tag) ? "" : tag;
	currentPage.value = 1;
}

/* =============================
 * Date helpers (display)
 * ============================= */
const getYearKey = (iso) => (iso ? String(iso).slice(0, 4) : "");

function parseDate(v) {
	if (!v) return null;
	const d = new Date(v); // 後端 ISO (含時區) 才最穩
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

/** 通用日期區間 formatter */
function formatRange(
	startISO,
	endISO,
	{ dateOnly = false, withSuffix = false } = {},
) {
	const s = parseDate(startISO);
	const e = parseDate(endISO);
	if (!s && !e) return "";

	const fmtDate = (d) => formatYMD(d);
	const fmtTime = (d) => formatHM(d);
	const fmtDT = (d) =>
		dateOnly ? fmtDate(d) : `${fmtDate(d)} ${fmtTime(d)}`.trim();

	if (s && !e) {
		if (dateOnly && withSuffix) return `${fmtDate(s)} 起`;
		return fmtDT(s);
	}
	if (!s && e) return dateOnly ? fmtDate(e) : `至 ${fmtDT(e)}`.trim();

	const sameDay = fmtDate(s) === fmtDate(e);

	if (dateOnly) return sameDay ? fmtDate(s) : `${fmtDate(s)} ～ ${fmtDate(e)}`;

	if (sameDay) {
		const left = fmtDT(s);
		const right = fmtTime(e);
		return right ? `${left} ～ ${right}` : left;
	}

	return `${fmtDT(s)} ～ ${fmtDT(e)}`.replace(/\s+/g, " ").trim();
}

// template 需要的名稱（保持不動）
function eventRangeDateOnly(it) {
	return formatRange(it?.event_start_at, it?.event_end_at, { dateOnly: true });
}
function signupRangeDateOnly(it) {
	return formatRange(it?.signup_start_at, it?.signup_end_at, {
		dateOnly: true,
		withSuffix: true,
	});
}
function eventRangeText(it) {
	return formatRange(it?.event_start_at, it?.event_end_at);
}
function signupRangeText(it) {
	return formatRange(it?.signup_start_at, it?.signup_end_at);
}

/* =============================
 * Decorated: 一次算好衍生欄位（重點）
 * ============================= */
const ENDING_SOON_DAYS = 7;

function computeSignupStatus(nowMs, startISO, endISO) {
	const start = parseDate(startISO);
	const end = parseDate(endISO);

	if (!start && !end) return "none";
	if (start && nowMs < start.getTime()) return "soon";
	if (end && nowMs > end.getTime()) return "ended";
	return "open";
}

function computeEndingSoon(nowMs, endISO, days = ENDING_SOON_DAYS) {
	const end = parseDate(endISO);
	if (!end) return false;
	const endMs = end.getTime();
	if (nowMs > endMs) return false;
	const diffDays = (endMs - nowMs) / 86400000;
	return Math.ceil(diffDays) <= days;
}

const decorated = computed(() => {
	const nowMs = Date.now();

	return eventList.value.map((it) => {
		const tags = (it?.hashtag ? String(it.hashtag) : "")
			.split(",")
			.map((x) => x.trim())
			.filter(Boolean);

		const tagKeys = tags.map((t) => normalizeTagKey(t)).filter(Boolean);

		const status = computeSignupStatus(
			nowMs,
			it?.signup_start_at,
			it?.signup_end_at,
		);
		const endingSoon =
			status === "open"
				? computeEndingSoon(nowMs, it?.signup_end_at, ENDING_SOON_DAYS)
				: false;

		const time = parseDate(it?.event_start_at)?.getTime();
		// 沒有日期：一律排最後（desc/asc 都一致）
		const safeTime = Number.isFinite(time) ? time : -Infinity;

		return {
			...it,
			_tags: tags,
			_tagKeys: tagKeys,
			_status: status, // open|soon|ended|none
			_endingSoon: endingSoon,
			_time: safeTime,
			_yearKey: getYearKey(it?.event_start_at),
		};
	});
});

/* =============================
 * Status UI helpers (改用衍生欄位)
 * ============================= */
function getSignupStatus(it) {
	return it?._status ?? "none";
}
function statusText(it) {
	const s = getSignupStatus(it);
	if (s === "open") return it?._endingSoon ? "報名即將截止" : "開放報名中";
	if (s === "soon") return "尚未開始報名";
	if (s === "ended") return "已截止報名";
	return String(it?.class_name || "活動");
}
function statusPillClass(it) {
	const s = getSignupStatus(it);
	if (s === "open")
		return it?._endingSoon ? "evtPill--ending" : "evtPill--open";
	if (s === "soon") return "evtPill--soon";
	if (s === "ended") return "evtPill--ended";
	return "";
}

/* =============================
 * Hashtags helper (改用衍生欄位，但保留相容)
 * ============================= */
function hashtags(it) {
	if (!it) return [];
	if (Array.isArray(it._tags)) return it._tags; // decorated 的
	// fallback：舊資料也能跑
	const s = it?.hashtag;
	if (!s) return [];
	return String(s)
		.split(",")
		.map((x) => x.trim())
		.filter(Boolean);
}

/* =============================
 * API
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
 * Filters（用 decorated）
 * ============================= */
const filtered = computed(() => {
	const classId = props.selectedClassId;
	const year = props.activeYear;
	const tagKey = normalizeTagKey(selectedTag.value);
	const status = props.statusFilter || "all";

	return decorated.value.filter((it) => {
		if (classId != null && Number(it.class_id) !== Number(classId))
			return false;
		if (year !== "all" && it._yearKey !== year) return false;

		if (tagKey) {
			if (!it._tagKeys?.includes(tagKey)) return false;
		}

		if (status !== "all" && it._status !== status) return false;

		return true;
	});
});

/* =============================
 * Sort (pin first + date)
 * ============================= */
const sorted = computed(() => {
	const arr = [...filtered.value];
	const pinRank = (x) => (x?.pin ? 0 : 1);

	arr.sort((a, b) => {
		const p = pinRank(a) - pinRank(b);
		if (p !== 0) return p;

		if (props.sort === "date_desc") return b._time - a._time;
		if (props.sort === "date_asc") return a._time - b._time;
		return 0;
	});

	return arr;
});

/* =============================
 * Pagination
 * ============================= */
const total = computed(() => sorted.value.length);
const totalPages = computed(() =>
	Math.max(1, Math.ceil(total.value / pageLimit)),
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
	},
);

/* =============================
 * Emit：total / years
 * ============================= */
watch(
	() => total.value,
	() => emit("update:total", total.value),
	{ immediate: true },
);

const yearOptions = computed(() => {
	// 邏輯：依「分類」抽年份（你原本 byClass 的精神）
	const classId = props.selectedClassId;
	const set = new Set(
		decorated.value
			.filter((it) =>
				classId == null ? true : Number(it.class_id) === Number(classId),
			)
			.map((it) => it._yearKey)
			.filter(Boolean),
	);
	return Array.from(set).sort((a, b) => b.localeCompare(a));
});

watch(
	() => yearOptions.value,
	() => emit("update:years", yearOptions.value),
	{ immediate: true },
);

/* =============================
 * Modal (dialog)
 * ============================= */
const dlg = ref(null);
const activeEvt = ref(null);

function lockScroll() {
	document.documentElement.style.overflow = "hidden";
}
function unlockScroll() {
	document.documentElement.style.overflow = "";
}

const openEvt = (it) => {
	activeEvt.value = it || null;
	if (dlg.value && !dlg.value.open) dlg.value.showModal();
	lockScroll();
};

const closeEvt = () => {
	if (dlg.value && dlg.value.open) dlg.value.close();
	activeEvt.value = null;
	unlockScroll();
};

const onBackdropClick = (e) => {
	if (e.target === dlg.value) closeEvt();
};

const onCancel = (e) => {
	e.preventDefault();
	closeEvt();
};

/* =============================
 * Lifecycle
 * ============================= */
onMounted(async () => {
	await loadAllEvent();
	emit("update:total", total.value);
	emit("update:years", yearOptions.value);

	if (dlg.value) dlg.value.addEventListener("cancel", onCancel);
});

onBeforeUnmount(() => {
	if (dlg.value) dlg.value.removeEventListener("cancel", onCancel);
	unlockScroll();
});
</script>
