<template>
	<!-- 手冊下載 -->
	<section id="manual-download" class="py-5">
		<div class="container">
			<h2 class="fw-bold mb-4 text-center">{{ $t("product.manual.title") }}</h2>

			<div class="row g-4">
				<div
					class="col-lg-4 col-md-6"
					v-for="manual in manualList"
					:key="manual.id"
					data-aos="fade"
				>
					<div class="manual-card p-4">
						<!-- 名稱 -->
						<h4 class="fw-bold mt-3">{{ manual.name }}</h4>
						<!-- 分類 -->
						<p class="fs-5">{{ manual.class_name }}</p>

						<a
							:href="getStorageFileUrl(manual.manual_url)"
							class="download-btn"
							download
						>
							{{ $t("common.download") }}
						</a>
					</div>
				</div>
				<div
					class="col-lg-4 col-md-6"
					data-aos="fade"
				>
					<div class="manual-card p-4">
						<h4 class="fw-bold mt-3">{{ $t("product.manual.JBS-Warranty-title") }}</h4>
						<p class="fs-5">{{ $t("product.manual.JBS-Warranty") }}</p>
						<router-link class="download-btn" :to="`/${currentLang}/warranty`">
							{{ $t("common.go") }}
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { ref, onMounted } from "vue";

import { getManualList } from "@/api/main/service/product/manualService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";

import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
const { currentLang } = useCurrentLang();

// 取得最新的幾筆消息
const manualList = ref([]);

const loadManualList = async () => {
	try {
		const response = await getManualList(); // service 回「陣列」可直接用
		manualList.value = response;
	} catch (err) {
		console.error("getManual error:", err);
		manualList.value = [];
	}
};
onMounted(() => {
	loadManualList();
});
</script>

<style scoped>
/* 手冊下載區 */
#manual-download {
	/* 背景：產品頁手冊區專用顏色，退回全站背景 */
	background: var(--manual-bg, var(--bg-page));
	color: var(--color-text-main);
}

/* 手冊卡片 */
#manual-download .manual-card {
	/* 玻璃感＋卡片底色：先吃手冊專用，退回共用 glass token / surface */
	background: var(--manual-card-bg, var(--glass-bg));
	backdrop-filter: blur(var(--glass-blur));

	border-radius: var(--radius-lg);
	padding: 24px;
	text-align: center;

	box-shadow: var(--shadow-soft);
	transition: 0.3s;
	height: 100%;
}

#manual-download .manual-card:hover {
	transform: translateY(-6px);
	box-shadow: var(--shadow-elevated);
}

/* 小圖示（如果之後有用到 .manual-icon） */
#manual-download .manual-icon {
	font-size: 52px;
	color: var(--manual-icon-color, var(--color-primary));
}

/* 下載按鈕：走全站按鈕 token */
#manual-download .download-btn {
	margin-top: 14px;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 10px 18px;
	background: var(--btn-primary-bg);
	color: var(--color-text-inverse, #fff);
	border-radius: var(--radius-round, 30px);
	text-decoration: none;
	font-weight: 600;
	transition: 0.25s;
}

#manual-download .download-btn:hover {
	background: var(--btn-primary-bg-strong);
	transform: translateY(-2px);
}
</style>


