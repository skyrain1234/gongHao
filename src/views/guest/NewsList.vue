<!-- src/views/guest/NewsList.vue -->
<template>
	<section id="newsOverview" class="newsOverview">
		<div class="newsOverview__bg" aria-hidden="true">
			<span class="newsBlob b1"></span>
			<span class="newsBlob b2"></span>
			<span class="newsGrain"></span>
		</div>

		<div class="newsWrap" v-if="classes.length">
			<!-- Header -->
			<header class="newsHead reveal news-reveal">
				<div class="newsHead__badge">最新消息</div>
				<!-- <h2 class="newsHead__title">把重要資訊整理得更清楚</h2> -->
				<p class="newsHead__desc">
					公告、活動花絮、媒體報導與研究成果，都可以在這裡快速找到。使用分類與搜尋，輕鬆定位你需要的內容。
				</p>
			</header>

			<!-- Filters -->
			<div class="newsFilters reveal news-reveal" id="newsFilters">
				<div class="newsFilters__row">
					<div class="newsFilters__label">分類</div>

					<div class="newsChips" aria-label="分類篩選">
						<button
							v-for="c in classes"
							:key="c.slug"
							class="newsChip"
							:class="{ 'is-active': c.slug === activeSlug }"
							@click="onClickTab(c)"
							type="button"
						>
							{{ c.name }}
						</button>
					</div>
				</div>

				<div class="newsFilters__row">
					<div class="newsFilters__label">排序</div>
					<div class="newsSelects">
						<label class="newsSelect">
							<span class="newsSelect__text">依</span>
							<select v-model="sort" class="newsSelect__control">
								<option value="date_desc">日期（新到舊）</option>
								<option value="date_asc">日期（舊到新）</option>
							</select>
						</label>

						<label class="newsSelect">
							<span class="newsSelect__text">年份</span>
							<select v-model="activeYear" class="newsSelect__control">
								<option value="all">全部</option>
								<!-- 年份由清單元件回傳 -->
								<option v-for="m in yearOptions" :key="m" :value="m">
									{{ m }}
								</option>
							</select>
						</label>
					</div>
				</div>

				<div class="newsFilters__row">
					<div class="newsFilters__label">版型切換</div>
					<div class="newsViewSwitch" role="group" aria-label="版型切換">
						<button
							class="newsBtn newsBtn--pill me-2"
							:class="{ 'is-active': viewMode === 'cards' }"
							type="button"
							@click="viewMode = 'cards'"
						>
							卡片
						</button>
						<button
							class="newsBtn newsBtn--pill"
							:class="{ 'is-active': viewMode === 'list' }"
							type="button"
							@click="viewMode = 'list'"
						>
							列表
						</button>
					</div>
				</div>

				<div class="newsHead__actions">
					<form
						class="newsSearch"
						role="search"
						@submit.prevent="onSubmitSearch"
					>
						<span class="material-icons" aria-hidden="true">search</span>
						<input
							ref="newsSearchInput"
							class="newsSearch__input"
							type="search"
							:placeholder="$t('common.search')"
							autocomplete="off"
							v-model="searchQuery"
							@keyup.enter.prevent="onSubmitSearch"
							@keyup.esc="onClearSearch"
						/>
						<button
							class="newsBtn newsBtn--ghost"
							type="button"
							@click="onClearSearch"
						>
							清除
						</button>
						<button class="newsBtn newsBtn--ghost" type="submit">搜尋</button>
					</form>

					<button
						class="newsBtn newsBtn--soft"
						type="button"
						@click="onResetFilters"
					>
						重設篩選
					</button>
				</div>
			</div>

			<!-- Meta -->
			<div class="newsMeta reveal news-reveal">
				<div class="newsMeta__left">
					<span class="newsMeta__dot" aria-hidden="true"></span>
					<span>共 {{ totalCount }} 則消息</span>
				</div>
				<!-- <div class="newsMeta__right">
					<span class="newsMeta__hint">點選「查看」可開啟詳情示意視窗</span>
				</div> -->
			</div>

			<!-- ✅ Grid + Pager 交給清單元件 -->
			<NewsListComp
				ref="listRef"
				:selected-class-id="selectedClassId"
				:view-mode="viewMode"
				:active-year="activeYear"
				:sort="sort"
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

import NewsListComp from "@/components/guest/views/news/NewsList.vue";
import { getNewsClassList } from "@/api/main/service/news/newsClassService";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";

/* 路由參數：從 /news 或 /news/category/:slug 傳進來 */
const props = defineProps({
	initialSlug: { type: String, default: null },
});

const route = useRoute();
const router = useRouter();

/* 分類 */
const classes = ref([]);
const activeSlug = ref("all");

/* ✅ UI 狀態（對齊 news.html） */
const viewMode = ref("cards"); // cards | list
const activeYear = ref("all");
const sort = ref("date_desc");

/* 搜尋 */
const searchQuery = ref("");
const newsSearchInput = ref(null);

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

	activeSlug.value = c.slug;
	const lang = route.params.lang;

	if (c.slug === "all") {
		router.push({
			name: "newsList",
			params: { lang },
			hash: "#newsFilters",
		});
	} else {
		router.push({
			name: "newsListByCategory",
			params: { lang, slug: c.slug },
			hash: "#newsFilters",
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
	newsSearchInput.value?.focus();
};

/* 重設（對齊 news.html 的 reset） */
const onResetFilters = async () => {
	activeSlug.value = "all";
	activeYear.value = "all";
	sort.value = "date_desc";
	await onClearSearch();

	// 路由也回 all
	const lang = route.params.lang;
	router.push({ name: "newsList", params: { lang } });

	listRef.value?.resetAll?.();
};

let revealCtl = null;

onMounted(async () => {
	try {
		const res = await getNewsClassList();
		classes.value = Array.isArray(res) ? res : [];

		activeSlug.value =
			classes.value.find((c) => c.slug === props.initialSlug)?.slug ||
			classes.value[0]?.slug ||
			"all";
	} catch (e) {
		console.error("getNewsClassList error:", e);
		classes.value = [];
		activeSlug.value = "all";
	}

	await nextTick();
	revealCtl = initReveal("#newsOverview");
});

onBeforeUnmount(() => {
	revealCtl?.destroy?.();
	revealCtl = null;
});
</script>
