<!-- src/views/guest/NewsList.vue -->
<template>
	<section id="evtOverview" class="evtOverview">
		<div class="evtOverview__bg" aria-hidden="true">
			<span class="evtBlob b1"></span>
			<span class="evtBlob b2"></span>
			<span class="evtBlob b3"></span>
			<span class="evtGrain"></span>
		</div>

		<div class="evtWrap" v-if="classes.length">
			<!-- Header -->
			<header class="evtHead reveal evt-reveal">
				<div class="evtHead__badge">活動一覽</div>
				<!-- <h2 class="evtHead__title">把重要資訊整理得更清楚</h2> -->
				<p class="evtHead__desc">
					公告、活動花絮、媒體報導與研究成果，都可以在這裡快速找到。使用分類與搜尋，輕鬆定位你需要的內容。
				</p>
			</header>

			<!-- Filters -->
			<div class="evtFilters reveal evt-reveal" id="evtFilters">
				<div class="evtFilters__row">
					<div class="evtFilters__label">分類</div>

					<div class="evtChips" aria-label="分類篩選">
						<button
							v-for="c in classes"
							:key="c.slug"
							class="evtChip"
							:class="{ 'is-active': c.slug === activeSlug }"
							@click="onClickTab(c)"
							type="button"
						>
							{{ c.name }}
						</button>
					</div>
				</div>

				<div class="evtFilters__row">
					<div class="evtFilters__label">篩選</div>
					<div class="evtSelects">
						<label class="evtSelect">
							<span class="evtSelect__text">狀態</span>
							<select v-model="statusFilter" class="evtSelect__control">
								<option value="all">全部</option>
								<option value="open">開放報名中</option>
								<option value="soon">尚未開始</option>
								<option value="ended">已截止報名</option>
							</select>
						</label>
						<label class="evtSelect">
							<span class="evtSelect__text">依</span>
							<select v-model="sort" class="evtSelect__control">
								<option value="date_desc">日期（新到舊）</option>
								<option value="date_asc">日期（舊到新）</option>
							</select>
						</label>

						<label class="evtSelect">
							<span class="evtSelect__text">年份</span>
							<select v-model="activeYear" class="evtSelect__control">
								<option value="all">全部</option>
								<!-- 年份由清單元件回傳 -->
								<option v-for="m in yearOptions" :key="m" :value="m">
									{{ m }}
								</option>
							</select>
						</label>
					</div>
				</div>

				<div class="evtFilters__row">
					<div class="evtFilters__label">版型切換</div>
					<div class="evtViewSwitch" role="group" aria-label="版型切換">
						<button
							class="evtBtn evtBtn--pill me-2"
							:class="{ 'is-active': viewMode === 'cards' }"
							type="button"
							@click="viewMode = 'cards'"
						>
							卡片
						</button>
						<button
							class="evtBtn evtBtn--pill"
							:class="{ 'is-active': viewMode === 'list' }"
							type="button"
							@click="viewMode = 'list'"
						>
							列表
						</button>
					</div>
				</div>

				<div class="evtHead__actions">
					<form
						class="evtSearch"
						role="search"
						@submit.prevent="onSubmitSearch"
					>
						<span class="material-icons" aria-hidden="true">search</span>
						<input
							ref="evtSearchInput"
							class="evtSearch__input"
							type="search"
							:placeholder="$t('common.search')"
							autocomplete="off"
							v-model="searchQuery"
							@keyup.enter.prevent="onSubmitSearch"
							@keyup.esc="onClearSearch"
						/>
						<button
							class="evtBtn evtBtn--ghost"
							type="button"
							@click="onClearSearch"
						>
							清除
						</button>
						<button class="evtBtn evtBtn--ghost" type="submit">搜尋</button>
					</form>

					<button
						class="evtBtn evtBtn--soft"
						type="button"
						@click="onResetFilters"
					>
						重設
					</button>
				</div>
			</div>

			<!-- Meta -->
			<div class="evtMeta reveal evt-reveal">
				<div class="evtMeta__left">
					<span class="evtMeta__dot" aria-hidden="true"></span>
					<span>共 {{ totalCount }} 則消息</span>
				</div>
				<!-- <div class="evtMeta__right">
					<span class="evtMeta__hint">點選「查看」可開啟詳情示意視窗</span>
				</div> -->
			</div>

			<!-- ✅ Grid + Pager 交給清單元件 -->
			<EventListComp
				ref="listRef"
				:selected-class-id="selectedClassId"
				:view-mode="viewMode"
				:active-year="activeYear"
				:sort="sort"
				:status-filter="statusFilter"
				@update:total="totalCount = $event"
				@update:years="yearOptions = $event"
			/>
		</div>

		<!-- 載入中 -->
		<BaseLoading v-else />
	</section>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { initReveal } from "@/utils/reveal.js";

import EventListComp from "@/components/guest/views/event/EventList.vue";
import { getEventClassList } from "@/api/main/service/event/eventClassService";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";

/* 路由參數：從 /event 或 /event/category/:slug 傳進來 */
const props = defineProps({
	initialSlug: { type: String, default: null },
});

const route = useRoute();
const router = useRouter();

/* 分類 */
const classes = ref([]);
const activeSlug = ref("all");

/* ✅ UI 狀態（對齊 event.html） */
const viewMode = ref("cards"); // cards | list
const activeYear = ref("all");
const sort = ref("date_desc");
const statusFilter = ref("all"); // all | open | soon | ended | none

/* 搜尋 */
const searchQuery = ref("");
const evtSearchInput = ref(null);

/* 清單元件 ref（保留你原本 expose 搜尋） */
const listRef = ref(null);

/* 統計與年份選項（由 child 回傳） */
const totalCount = ref(0);
const yearOptions = ref([]);

/* ✅ current 選到的 class_id（給 child 做 filter） */
const selectedClassId = computed(() => {
	const current = classes.value.find((c) => c.slug === activeSlug.value);
	// all 的時候通常你後端會給 null/0/或 all 的 id
	// 這裡策略：slug === all => null（child 就不過濾 class_id）
	if (!current || current.slug === "all") return null;
	return Number(current.id) || null;
});

/* 點擊分類 Tab（保留你原來路由行為） */
const onClickTab = async (c) => {
	if (c.slug === activeSlug.value) return;

	searchQuery.value = "";
	activeYear.value = "all";
	sort.value = "date_desc";
	statusFilter.value = "all";

	activeSlug.value = c.slug;
	const lang = route.params.lang;

	if (c.slug === "all") {
		router.push({
			name: "eventList",
			params: { lang },
			hash: "#evtFilters",
		});
	} else {
		router.push({
			name: "eventListByCategory",
			params: { lang, slug: c.slug },
			hash: "#evtFilters",
		});
	}

	// 切分類後，把 child 分頁/狀態重設（如果你需要）
	listRef.value?.resetAll?.();
};

/* 搜尋提交：沿用你既有 API 搜尋（在 child 內做） */
const onSubmitSearch = async () => {
	if (!listRef.value?.searchByKeyword) return;
	await listRef.value.searchByKeyword(searchQuery.value);
};

/* 清空搜尋 */
const onClearSearch = async () => {
	searchQuery.value = "";
	if (listRef.value?.searchByKeyword) {
		await listRef.value.searchByKeyword("");
	}
	evtSearchInput.value?.focus();
};

/* 重設（對齊 event.html 的 reset） */
const onResetFilters = async () => {
	activeSlug.value = "all";
	activeYear.value = "all";
	sort.value = "date_desc";
	statusFilter.value = "all";
	await onClearSearch();

	// 路由也回 all
	const lang = route.params.lang;
	router.push({ name: "eventList", params: { lang } });

	listRef.value?.resetAll?.();
};

let revealCtl = null;

onMounted(async () => {
	try {
		const res = await getEventClassList();
		classes.value = Array.isArray(res) ? res : [];

		activeSlug.value =
			classes.value.find((c) => c.slug === props.initialSlug)?.slug ||
			classes.value[0]?.slug ||
			"all";
	} catch (e) {
		console.error("getEventClassList error:", e);
		classes.value = [];
		activeSlug.value = "all";
	}

	await nextTick();
	revealCtl = initReveal("#evtOverview");
});

onBeforeUnmount(() => {
	revealCtl?.destroy?.();
	revealCtl = null;
});
</script>
