<!-- src/views/guest/BlogList.vue -->
<template>
	<div class="container my-5 page-news">
		<!-- ========== Tabs + 搜尋列 ========== -->
		<div
			v-if="classes.length"
			class="d-flex flex-column flex-md-row align-items-center align-items-md-center justify-content-center justify-content-md-between gap-3 mb-4"
		>
			<!-- Tabs -->
			<div class="news-tabs d-flex justify-content-center flex-wrap gap-2 py-2">
				<button
					v-for="(c, i) in classes"
					:key="c.slug"
					type="button"
					class="tab-pill d-inline-flex align-items-center"
					:class="{ active: c.slug === activeSlug }"
					@click="onClickTab(c)"
					data-aos="fade"
					:data-aos-delay="i * 100"
				>
					<!-- icon：小螢幕自動隱藏 -->
					<i
						v-if="c.icon_class"
						:class="[c.icon_class, 'me-1', 'd-none', 'd-md-inline-block']"
					></i>
					<span>{{ c.name }}</span>
				</button>
			</div>

			<!-- 搜尋 -->
			<form
				class="search-form d-flex justify-content-center justify-content-md-end"
				role="search"
				@submit.prevent="onSubmitSearch"
				data-aos="fade"
			>
				<div class="input-group w-100" style="max-width: 360px">
					<input
						type="search"
						class="form-control"
						:placeholder="$t('common.search')"
						v-model="searchQuery"
						@keyup.enter.prevent="onSubmitSearch"
						@keyup.esc="onClearSearch"
						ref="searchInput"
					/>
					<button
						class="btn btn-outline-secondary"
						type="button"
						@click="onClearSearch"
					>
						<span class="material-icons">clear</span>
					</button>
					<button class="btn btn-outline-secondary" type="submit">
						<span class="material-icons">search</span>
					</button>
				</div>
			</form>
		</div>

		<!-- 載入中 -->
		<BaseLoading v-else />

		<!-- ========== 分類內容 ========== -->
		<div class="tab-content" v-if="classes.length">
			<div
				v-for="c in classes"
				:key="`${c.slug}-pane`"
				class="tab-pane fade"
				:class="{ 'show active': c.slug === activeSlug }"
			>
				<!-- 只有 active 的才渲染 -->
				<BlogListComp
					v-if="c.slug === activeSlug"
					:ref="setListRef"
					:selected-class-id="c.id"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import BlogListComp from "@/components/guest/views/blog/BlogList.vue";
import { getBlogClassList } from "@/api/main/service/blog/blogClassService";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";

/* 路由參數：從 /blog 或 /blog/category/:slug 傳進來 */
const props = defineProps({
	initialSlug: { type: String, default: null },
});

/* Router */
const route = useRoute();
const router = useRouter();

/* State */
const classes = ref([]); // 所有分類（含 all）
const activeSlug = ref("all"); // 目前啟用的分類 slug

/* 搜尋欄 */
const searchQuery = ref("");
const searchInput = ref(null);
const listRef = ref(null);
const setListRef = (el) => (listRef.value = el);

/* 點擊分類 Tab */
const onClickTab = (c) => {
	if (c.slug === activeSlug.value) return;

	searchQuery.value = ""; // 切換分類清空搜尋
	activeSlug.value = c.slug;

	const lang = route.params.lang;

	if (c.slug === "all") {
		router.push({ name: "blogList", params: { lang } });
	} else {
		router.push({
			name: "blogListByCategory",
			params: { lang, slug: c.slug },
		});
	}
};

/* 搜尋提交 */
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
	searchInput.value?.focus();
};

/* 載入分類 + 決定預設分類 */
onMounted(async () => {
	try {
		const res = await getBlogClassList();
		classes.value = Array.isArray(res) ? res : [];

		activeSlug.value =
			classes.value.find((c) => c.slug === props.initialSlug)?.slug ||
			classes.value[0]?.slug || // 第一筆（通常就是 all）
			"all"; // 最終 fallback
	} catch (e) {
		console.error("getBlogClassList error:", e);
		classes.value = [];
		activeSlug.value = "all";
	}
});
</script>
