<!-- src/components/guest/views/cloud/CloudApps.vue（假設路徑） -->
<template>
	<div class="container mt-3 mb-3" id="cloud-severs-content">
		<!-- 載入中 -->
		<BaseLoading v-if="isLoading" />

		<!-- 雲端產品卡片列表 -->
		<div
			v-else
			class="jbs-card reveal-on-scroll"
			v-for="item in cloudApps"
			:key="item.id"
		>
			<a :href="item.url" class="text-decoration-none" target="_blank">

				<div class="jbs-inner">
					<div class="jbs-left">
						<h2 class="jbs-title">{{ item.name }}</h2>
						<p class="jbs-subtitle">{{ item.description }}</p>
					</div>

					<div class="jbs-right">
						<img
							:src="getStorageFileUrl(item.thumbnail_url)"
							:alt="item.name"
						/>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { initRevealOnScroll } from "@/api/main/tools/revealOnScroll";

import { getCloudAppList } from "@/api/main/service/cloudApp/cloudAppService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import BaseLoading from "@/components/guest/common/loading/BaseLoading.vue";

const cloudApps = ref([]);
const isLoading = ref(true);

/* Reveal on scroll */
let revealInstance = null;

const setupReveal = async () => {
	// 等 cloudApps 根據最新資料渲染完成
	await nextTick();

	const targets = document.querySelectorAll(".reveal-on-scroll");
	if (!targets.length) return; // 沒元素就不做事，安全返回

	// 之前有 observer 就先關掉
	if (revealInstance && typeof revealInstance.destroy === "function") {
		revealInstance.destroy();
	}

	revealInstance = initRevealOnScroll({
		selector: ".reveal-on-scroll",
		threshold: 0.2,
		once: true,
	});
};

/* 取得雲端產品資料 */
const loadCloudApp = async () => {
	try {
		isLoading.value = true;
		const response = await getCloudAppList();
		cloudApps.value = response;
	} catch (err) {
		console.error("getCloudApp error:", err);
		cloudApps.value = [];
	} finally {
		isLoading.value = false;
		await setupReveal(); // 資料載完再初始化動畫
	}
};

onMounted(async () => {
	await loadCloudApp();
});

onBeforeUnmount(() => {
	if (revealInstance && typeof revealInstance.destroy === "function") {
		revealInstance.destroy();
		revealInstance = null;
	}
});
</script>
