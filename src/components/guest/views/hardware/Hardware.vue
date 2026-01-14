<template>
	<div class="display-card container my-4 mt-5">
		<div>
			<h1 class="shop-big-title text-center">
				{{ $t("hardware.hardware.title") }}
			</h1>
		</div>

		<!-- 分類區塊：從資料庫 classList 來 -->
		<section v-for="cls in classList" :key="cls.id" class="mt-5 mb-5">
			<h2 class="shop-sm-title">{{ cls.name }}</h2>

			<div class="row g-4">
				<div
					class="col-6 col-md-4 col-lg-3"
					v-for="item in groupedHardware[cls.id] || []"
					:key="item.id"
				>
					<div class="product-card">
						<div class="image-box">
							<img
								style="cursor: zoom-in"
								:src="getStorageFileUrl(item.thumbnail_url)"
								:alt="item.name"
								data-bs-toggle="modal"
								data-bs-target="#lightboxModal"
								@click="openLightbox(item)"
							/>
						</div>
						<h5 class="title">{{ item.name }}</h5>
						<p v-if="item.description" class="desc">
							{{ item.description }}
						</p>
					</div>
				</div>

				<!-- 通用空資料提示 -->
				<div
					v-if="!(groupedHardware[cls.id] && groupedHardware[cls.id].length)"
					class="col-12 text-center text-muted"
				>
					{{ $t("hardware.hardware.empty") }}
				</div>
			</div>
		</section>
	</div>
	<!-- Modal (燈箱效果) -->
	<div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-body p-0 text-center position-relative">
					<button
						type="button"
						class="btn-close btn-close-white position-absolute end-0 top-0 m-3"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>

					<img
						:src="lightboxImageSrc"
						class="img-fluid rounded"
						:alt="lightboxTitle || 'image'"
					/>

					<div v-if="lightboxTitle" class="p-3 text-start">
						<div class="fw-bold mb-1">{{ lightboxTitle }}</div>
						<div v-if="lightboxDesc" class="opacity-75">{{ lightboxDesc }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 後端 API
import { getHardwareList } from "@/api/main/service/hardware/hardwareService";
import { getHardwareClassList } from "@/api/main/service/hardware/hardwareClassService";

import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";

// 分類 & 全部硬體
const classList = ref([]); // 例如：[{id:1, class_name:'POS系統...'}, ...]
const allHardware = ref([]); // 例如：[{id:16, class_id:3, name:'...', ...}, ...]

// 依 class_id 分組（key = class_id）
const groupedHardware = computed(() => {
	const map = {};
	for (const item of allHardware.value) {
		const cid = item.class_id;
		if (!map[cid]) map[cid] = [];
		map[cid].push(item);
	}
	return map;
});

// 載入分類 + 硬體
const loadData = async () => {
	try {
		const [classRes, hardwareRes] = await Promise.all([
			getHardwareClassList(),
			getHardwareList(),
		]);

		// 依你目前 service 的寫法，通常會直接 return response.data
		classList.value = classRes || [];
		allHardware.value = hardwareRes || [];
	} catch (error) {
		console.error("硬體/分類 API 請求錯誤:", error);
		classList.value = [];
		allHardware.value = [];
	}
};

onMounted(() => {
	loadData();
});

const lightboxImageSrc = ref("");
const lightboxTitle = ref("");
const lightboxDesc = ref("");

function openLightbox(item) {
	lightboxImageSrc.value = getStorageFileUrl(item.thumbnail_url);
	lightboxTitle.value = item.name || "";
	lightboxDesc.value = item.description || "";
}
</script>
