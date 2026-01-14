<!-- components/home/HomePartners.vue -->
<template>
	<div class="container mt-5 mb-5">
		<div class="text-center mb-4">
			<h1 class="fw-bold">{{ $t("index.partners.title") }}</h1>
			<p class="mb-0 fs-5">
				{{ $t("index.partners.subtitle") }}
			</p>
		</div>

		<!-- 三段式：依 partnerClassList 順序產出三條跑馬燈 -->
		<div
			v-for="partnerClass in partnerClassList"
			:key="partnerClass.id"
			class="mb-4"
		>
			<!-- 每段標題：分類名稱 + 查看名單 -->
			<div class="d-flex justify-content-center align-items-center gap-2 mb-3">
				<h4 class="fw-semibold mb-0">
					{{ partnerClass.name }}
				</h4>
				<button
					type="button"
					class="btn btn-sm btn-outline-secondary"
					@click="openModal(partnerClass)"
				>
					{{ $t("index.partners.viewList") }}
				</button>
			</div>

			<!-- 跑馬燈 -->
			<Swiper
				class="brand-marquee"
				:modules="[Autoplay]"
				:slides-per-view="'auto'"
				:space-between="32"
				:loop="true"
				:speed="3200"
				:allow-touch-move="true"
				:observer="true"
				:observe-parents="true"
				:autoplay="{
					delay: 0,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}"
			>
				<!-- 這條只顯示 class_id 符合的 partner，順序照後端回來的陣列 -->
				<SwiperSlide
					v-for="partner in partnerList.filter(p => p.class_id === partnerClass.id)"
					:key="partner.id"
				>
					<a
						v-if="partner.url"
						:href="partner.url"
						target="_blank"
						rel="noopener"
					>
						<img
							v-if="partner.image_url"
							:src="getStorageFileUrl(partner.image_url)"
							:alt="partner.name"
						/>
						<h4 v-else class="text-decoration-none mb-0">
							{{ partner.name }}
						</h4>
					</a>

					<!-- 沒網址就純展示 -->
					<div v-else>
						<img
							v-if="partner.image_url"
							:src="getStorageFileUrl(partner.image_url)"
							:alt="partner.name"
						/>
						<h4 v-else class="text-decoration-none mb-0">
							{{ partner.name }}
						</h4>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	</div>

	<!-- ===== Modal（不用 Bootstrap，teleport 到 body，避免被 ScrollSmoother 影響） ===== -->
	<Teleport to="body">
		<transition name="fade">
			<div
				v-if="isModalOpen"
				class="partner-modal-backdrop"
				@click.self="closeModal"
			>
				<div class="partner-modal">
					<button
						type="button"
						class="partner-modal__close"
						@click="closeModal"
					>
						×
					</button>
					<!-- 客戶名單 -->
					<h5 class="partner-modal__title">
						{{ activeClass?.name }} {{ $t("index.partners.customerList") }}
					</h5>

					<ul class="partner-modal__list">
						<li
							v-for="p in modalPartners"
							:key="p.id"
						>
							{{ p.name }}
						</li>
						<li v-if="!modalPartners.length" class="text-muted small">
							目前尚無資料
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { getPartner } from "@/api/main/service/partner/partnerService";
import { getPartnerClass } from "@/api/main/service/partner/partnerClassService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";

const partnerList = ref([]);       // /partner
const partnerClassList = ref([]);  // /partnerClass

// modal 狀態
const isModalOpen = ref(false);
const activeClass = ref(null);

// 目前分類底下的客戶名單
const modalPartners = computed(() => {
	if (!activeClass.value) return [];
	return partnerList.value.filter(
		(p) => p.class_id === activeClass.value.id
	);
});

const openModal = (partnerClass) => {
	activeClass.value = partnerClass;
	isModalOpen.value = true;
	// 開啟 modal 時鎖 body 捲動（看你要不要）
	document.body.style.overflow = "hidden";
};

const closeModal = () => {
	isModalOpen.value = false;
	document.body.style.overflow = "";
};

const loadPartnerList = async () => {
	try {
		const result = await getPartner(); // 已經是陣列
		partnerList.value = result || [];
	} catch (e) {
		console.error("getPartner error:", e);
		partnerList.value = [];
	}
};

const loadPartnerClassList = async () => {
	try {
		const result = await getPartnerClass(); // 已經是陣列
		partnerClassList.value = result || [];
	} catch (e) {
		console.error("getPartnerClass error:", e);
		partnerClassList.value = [];
	}
};

onMounted(() => {
	loadPartnerList();
	loadPartnerClassList();
});
</script>

<style scoped>
/* 三段跑馬燈外層間距 */
.mb-4 + .mb-4 {
	margin-top: 24px;
}

/* 跑馬燈樣式 */
.brand-marquee {
	width: 100%;
	height: 80px;
	overflow: hidden;
	position: relative;
}

.brand-marquee :deep(.swiper-wrapper) {
	transition-timing-function: linear !important;
}

.brand-marquee :deep(.swiper-slide) {
	width: auto !important;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 32px;
}

.brand-marquee :deep(img) {
	display: block;
	height: 60px;
	width: auto;
	filter: grayscale(1);
	opacity: 0.8;
	transition: all 0.3s ease;
}

.brand-marquee :deep(img:hover) {
	filter: grayscale(0);
	opacity: 1;
	transform: scale(1.05);
}

/* ===== Modal 樣式（不用 Bootstrap）===== */
.partner-modal-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2000; /* 要蓋過 navbar / hero 等 */
}

.partner-modal {
	background: #fff;
	border-radius: 16px;
	padding: 20px 24px;
	max-width: 480px;
	width: calc(100% - 32px);
	box-shadow: 0 18px 45px rgba(15, 23, 42, 0.28);
	position: relative;
}

.partner-modal__title {
	font-weight: 600;
	margin-bottom: 12px;
}

.partner-modal__close {
	position: absolute;
	top: 10px;
	right: 14px;
	border: none;
	background: transparent;
	font-size: 20px;
	line-height: 1;
	cursor: pointer;
}

.partner-modal__list {
	list-style: none;
	padding-left: 0;
	margin-bottom: 0;
	max-height: 320px;
	overflow-y: auto;
}

.partner-modal__list li {
	padding: 6px 0;
	border-bottom: 1px solid #eee;
	font-size: 15px;
}

/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
