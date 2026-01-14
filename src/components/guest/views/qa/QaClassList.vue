<template>
	<!-- 分類清單（有資料才顯示） -->
	<div v-if="classes.length" class="faq-tabs-wrapper mt-4">
		<ul class="nav nav-pills gap-2 faq-tabs">
			<li class="nav-item" v-for="(c, i) in classes" :key="c.id">
				<button
					type="button"
					class="nav-link faq-tab-btn d-flex align-items-center gap-2"
					:class="{ active: c.id === selectedId }"
					@click="select(c)"
					data-aos="fade"
					:data-aos-delay="i * 100"
				>
					<i :class="c.icon_class"></i>
					<span>{{ c.name }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getQaClassList } from "@/api/main/service/qa/qaClassService";

const route = useRoute();
const router = useRouter();

const emit = defineEmits(["change"]);

const classes = ref([]);
const selectedId = ref(null);

onMounted(loadQaClasses);

async function loadQaClasses() {
	try {
		// 後端已經把「搜尋問題（全部）」放在第一筆
		const response = await getQaClassList();
		classes.value = Array.isArray(response) ? response : [];
	} catch (e) {
		console.error("getQaClassList error:", e);
		classes.value = [];
	}

	if (!classes.value.length) return;

	const currentSlug = String(route.params.classSlug || "");

	// 沒有 slug -> 預設用第一個（通常是「搜尋問題」）
	if (!currentSlug) {
		setSelected(classes.value[0], true);
		return;
	}

	// 初次載入：依 URL slug 選取，找不到就 fallback 第一個
	const row = findBySlug(currentSlug) || classes.value[0];
	setSelected(row, false);
}

// 由 slug 找分類
function findBySlug(slug) {
	const s = String(slug).trim().toLowerCase();
	return classes.value.find(
		(x) => String(x.slug).trim().toLowerCase() === s
	);
}

function setSelected(row, syncUrl) {
	if (!row) return;

	selectedId.value = row.id;

	// 依需要同步 URL（/qa/:slug）
	if (syncUrl) {
		router.replace({
			name: "qa",
			params: { classSlug: row.slug },
			query: route.query,
		});
	}

	// 0 代表「全部 / 搜尋問題」
	emit("change", row.id);
}

function select(row) {
	if (!row || row.id === selectedId.value) return;
	setSelected(row, true);
}

// 監聽 URL 的 :classSlug 改變（例如 router-link 切換）
watch(
	() => route.params.classSlug,
	(nv) => {
		if (!classes.value.length) return;
		const row = findBySlug(String(nv)) || classes.value[0];
		if (row && row.id !== selectedId.value) {
			setSelected(row, false);
		}
	}
);
</script>

<style scoped>
.nav-pills .nav-link {
	background-color: transparent;
	border-radius: 0;
	border-bottom: 2px solid transparent; /* 預留底線高度，避免跳動 */
}

/* active 狀態：改變底線顏色＋文字顏色 */
.nav-pills .nav-link.active {
	background-color: transparent;
	border-radius: 0;
	border-bottom: 2px solid #3bbbf8;
	color: #3bbbf8;
}
</style>
