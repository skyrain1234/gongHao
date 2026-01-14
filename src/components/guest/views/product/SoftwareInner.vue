<template>
	<div class="softwareInner">
		<div class="container">
			<!-- 返回按鈕 -->
			<router-link
				:to="`/${currentLang}/service/softwareList`"
				class="back-btn mb-2 text-decoration-none"
				type="button"
			>
				<i class="bi bi-arrow-left-circle"></i> 返回
			</router-link>

			<div class="product-inner-area p-4 p-md-5">
				<!-- 上方輪播區 -->
				<section v-if="subImageSrcList.length" id="product-center" class="pb-4">
					<div class="container">
						<div class="product-center-wrapper">
							<!-- 左箭頭 -->
							<button
								type="button"
								class="product-center__arrow product-center__arrow--prev"
								aria-label="Previous"
							></button>

							<!-- Swiper 主體 -->
							<Swiper
								class="product-center-slider"
								:modules="swiperModules"
								:loop="false"
								:centered-slides="true"
								:slides-per-view="3"
								:space-between="40"
								:breakpoints="{
									0: { slidesPerView: 1.1, spaceBetween: 20 },
									992: { slidesPerView: 3, spaceBetween: 24 },
								}"
								:navigation="{
									nextEl: '.product-center__arrow--next',
									prevEl: '.product-center__arrow--prev',
								}"
								:pagination="{
									el: '.product-center-pagination',
									clickable: true,
								}"
							>
								<SwiperSlide
									v-for="item in subImageSrcList"
									:key="item"
									class="product-slide"
								>
									<div class="product-slide-inner">
										<img
											style="cursor: zoom-in"
											:src="item"
											:alt="product.name || 'product image'"
											data-bs-toggle="modal"
											data-bs-target="#lightboxModal"
											@click="changeImage(item)"
										/>
									</div>
								</SwiperSlide>
							</Swiper>

							<!-- 自訂分頁點 -->
							<div class="product-center-pagination"></div>

							<!-- 右箭頭 -->
							<button
								type="button"
								class="product-center__arrow product-center__arrow--next"
								aria-label="Next"
							></button>
						</div>
					</div>
				</section>

				<!-- 沒圖片就用預覽圖 -->
				<section class="d-flex justify-content-center my-4" v-else>
					<img
						class="img-fluid"
						style="max-width: 300px; max-height: 250px"
						:src="getStorageFileUrl(product.thumbnail_url)"
						alt=""
					/>
				</section>

				<!-- 下方內容區 -->
				<section id="product-content" class="py-md-3">
					<div class="container">
						<!-- 標題區 -->
						<div class="row align-items-center mb-4">
							<div class="col-lg-6 mb-3 mb-lg-0">
								<div class="pc-chip">{{ product.class_name }}</div>
								<h3 class="pc-title mt-2">{{ product.name }}</h3>
							</div>
							<div class="col-lg-6 text-lg-end">
								<ul
									class="nav nav-pills pc-tabs justify-content-lg-end"
									role="tablist"
								>
									<li class="nav-item" role="presentation" v-if="productDesc">
										<button
											type="button"
											class="nav-link"
											:class="{ active: activeTab === 'intro' }"
											@click="activeTab = 'intro'"
											role="tab"
										>
											<i class="bi bi-info-circle me-1"></i> 產品簡介
										</button>
									</li>
									<li class="nav-item" role="presentation" v-if="productDesc2">
										<button
											type="button"
											class="nav-link"
											:class="{ active: activeTab === 'feature' }"
											@click="activeTab = 'feature'"
											role="tab"
										>
											<i class="bi bi-stars me-1"></i> 特色說明
										</button>
									</li>
									<li class="nav-item" role="presentation" v-if="productDesc3">
										<button
											type="button"
											class="nav-link"
											:class="{ active: activeTab === 'flow' }"
											@click="activeTab = 'flow'"
											role="tab"
										>
											<i class="bi bi-diagram-3 me-1"></i> 相關流程
										</button>
									</li>
								</ul>
							</div>
						</div>

						<!-- 內容區 -->
						<div class="tab-content">
							<!-- 產品簡介 -->
							<div
								class="tab-pane fade"
								:class="{
									show: activeTab === 'intro',
									active: activeTab === 'intro',
								}"
								role="tabpanel"
							>
								<div class="pc-card">
									<div v-html="productDesc"></div>
								</div>
							</div>

							<!-- 特色說明 -->
							<div
								class="tab-pane fade"
								:class="{
									show: activeTab === 'feature',
									active: activeTab === 'feature',
								}"
								role="tabpanel"
							>
								<div class="pc-card">
									<div v-html="productDesc2"></div>
								</div>
							</div>

							<!-- 相關流程 -->
							<div
								class="tab-pane fade"
								:class="{
									show: activeTab === 'flow',
									active: activeTab === 'flow',
								}"
								role="tabpanel"
							>
								<div class="pc-card">
									<div class="pc-flow-grid">
										<div v-html="productDesc3"></div>
									</div>
								</div>
							</div>
							<!-- end flow tab -->
						</div>
						<!-- tab-content -->
					</div>
				</section>
			</div>
		</div>
	</div>
	<!-- Modal (燈箱效果) -->
	<div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content bg-dark">
				<div class="modal-body p-0 text-center">
					<img
						id="lightboxImage"
						:src="lightboxImageSrc"
						class="img-fluid rounded"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
	getStorageFileUrl,
	absolutizeContentUrls,
} from "@/api/main/tools/storageFileTools";
import { getProduct } from "@/api/main/service/product/productService";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
import { parseStringJsonToJson } from "@/utils/formatter";

// 語系
const { currentLang } = useCurrentLang();

// Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const route = useRoute();
const swiperModules = [Navigation, Pagination];

const activeTab = ref("intro");
const product = ref({});
const subImageSrcList = ref([]);
const lightboxImageSrc = ref();

// 副圖切換主圖
function changeImage(src) {
	lightboxImageSrc.value = src;
}
// 載入單筆產品資料
const loadProduct = async (id) => {
	try {
		const response = await getProduct(id);
		// image_url 是字串 JSON，先轉成陣列
		response.image_url = parseStringJsonToJson(response.image_url) || [];
		product.value = response;
		lightboxImageSrc.value = getStorageFileUrl(product.value.image_url[0]);
		subImageSrcList.value = product.value.image_url.map((img) =>
			getStorageFileUrl(img)
		);
	} catch (err) {
		console.error("getProduct error:", err);
		product.value = {};
		subImageSrcList.value = [];
	}
};

onMounted(() => {
	loadProduct(route.params.softwareId);
});

// 內文 HTML（轉換圖片 / 連結路徑）
const productDesc = computed(() =>
	absolutizeContentUrls(product.value?.description || "")
);
const productDesc2 = computed(() =>
	absolutizeContentUrls(product.value?.description2 || "")
);
const productDesc3 = computed(() =>
	absolutizeContentUrls(product.value?.description3 || "")
);
</script>

<style scoped>
.softwareInner {
	margin-top: 90px;
}
/* 整個內容玻璃效果外框 */
.product-inner-area {
	background: rgba(255, 255, 255, 0.5) !important;
	backdrop-filter: blur(12px);
	border-radius: 20px;
}

/* =============================
   上方輪播區
   ============================= */

#product-center .product-center-slider {
	margin: 0 auto;
}

/* 單張 slide 外層：陰影、圓角、縮放動畫、比例統一 1:1 */
#product-center .product-slide-inner {
	border-radius: 16px;
	overflow: hidden;
	/* background: #fff; */
	/* box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12); */
	transform: scale(0.85);
	opacity: 0.6;
	transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
	aspect-ratio: 1 / 1.1;
}

/* 圖片填滿容器，以完整呈現為主（不裁切） */
#product-center .product-slide-inner img {
	width: 100%;
	height: 100%;
	display: block;
	object-fit: contain;
	/* min-height: 250px; */
}

/* 中間那張 slide 放大＋加亮 */
#product-center :deep(.swiper-slide-active) .product-slide-inner,
#product-center :deep(.swiper-slide-duplicate-active) .product-slide-inner {
	transform: scale(1);
	opacity: 1;
	/* box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18); */
}

/* 分頁點點位置與樣式 */
#product-center :deep(.product-center-pagination) {
	position: static; /* 取消 absolute，跟著正常文流排版 */
	margin-top: 12px;
	text-align: center;
}

/* 點點大小、顏色 */
#product-center :deep(.product-center-pagination .swiper-pagination-bullet) {
	width: 8px;
	height: 8px;
	background: #aaa;
	opacity: 1;
}

#product-center
	:deep(.product-center-pagination .swiper-pagination-bullet-active) {
	background: #333;
}

/* 讓箭頭可以相對輪播定位 */
.product-center-wrapper {
	position: relative;
}

/* 自訂箭頭外觀 */
.product-center__arrow {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 40px;
	height: 40px;
	border: none;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 10;
	transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
	font-size: 0; /* 隱藏文字 */
}

/* 用 bootstrap-icons 當箭頭圖示 */
.product-center__arrow::before {
	font-family: "bootstrap-icons";
	font-size: 20px;
	color: #333;
}

.product-center__arrow--prev {
	left: -20px;
}

.product-center__arrow--prev::before {
	content: "\F284"; /* chevron-left */
}

.product-center__arrow--next {
	right: -20px;
}

.product-center__arrow--next::before {
	content: "\F285"; /* chevron-right */
}

.product-center__arrow:hover {
	background: #111827;
	transform: translateY(-50%) scale(1.05);
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.product-center__arrow:hover::before {
	color: #fff;
}

/* =============================
   下方內容區
   ============================= */

#product-content {
	background: radial-gradient(
		circle at top left,
		#f5f7fb 0,
		#f9fafb 45%,
		#ffffff 100%
	);
	color: #333;
}

/* 小標籤 */
#product-content .pc-chip {
	display: inline-block;
	padding: 4px 10px;
	border-radius: 999px;
	font-size: 1.2rem;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	background: rgba(0, 0, 0, 0.06);
}

/* 大標題 */
#product-content .pc-title {
	margin: 6px 0 8px;
	font-size: 2.4rem;
	font-weight: 700;
}

/* Tabs 樣式 */
#product-content .pc-tabs .nav-link {
	margin-inline: 6px;
	padding: 6px 16px;
	border-radius: 999px;
	border: 1px solid transparent;
	background: transparent;
	color: #555;
	font-size: 1.2rem;
	transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease,
		border-color 0.2s ease;
}

#product-content .pc-tabs .nav-link.active {
	background: #111827;
	color: #fff;
	border-color: #111827;
	box-shadow: 0 6px 18px rgba(15, 23, 42, 0.25);
}

/* 共用卡片 */
#product-content .pc-card {
	margin-bottom: 16px;
	padding: 20px 22px;
	border-radius: 18px;
	background: rgba(255, 255, 255, 0.85);
	border: 1px solid rgba(148, 163, 184, 0.3);
	box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
	backdrop-filter: blur(10px);
}

#product-content .pc-card:last-child {
	margin-bottom: 0;
}

/* 文字行距（套在 v-html 裡的 <p>） */
#product-content .pc-card p {
	margin-bottom: 8px;
	font-size: 0.95rem;
	line-height: 1.9;
}

/* v-html 內圖片：限制在欄寬內，避免跑過去側邊欄 */
:deep(.pc-card img) {
	max-width: 100%;
	height: auto;
	display: block;
}

/* =============================
   RWD
   ============================= */
@media (max-width: 992px) {
	/* #product-content .pc-flow-grid {
		grid-template-columns: 1fr;
	} */
}

@media (max-width: 768px) {
	/* 小螢幕時隱藏左右箭頭 */
	.product-center__arrow {
		display: none;
	}
}

/* ===== 手機滿版（不動 template） ===== */
@media (max-width: 576px) {
	/* 1) 外層 Bootstrap container 變得更貼邊 */

	/* 2) 玻璃外框：滿版感 → 去大圓角、縮小 padding */
	.product-inner-area {
		/* border-radius: 0 !important; */
		backdrop-filter: none; /* 可選：滿版通常比較乾淨 */
		padding: 0 0 !important; /* 取代 p-4 的厚 padding */
		background: rgba(255, 255, 255, 0.9) !important;
	}

	/* 3) 你在輪播區/內容區又包了一層 container，手機把它們變輕 */
	#product-center :deep(.container),
	#product-content :deep(.container) {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}

	/* 4) Tabs 在手機別太擠（字小一點、間距小一點） */
	#product-content .pc-tabs .nav-link {
		margin-inline: 4px;
		padding: 6px 12px;
		font-size: 1rem;
	}

	/* 5) 內容卡片：縮小 padding、可選去圓角/陰影 */
	#product-content .pc-card {
		padding: 14px 14px;
		border-radius: 12px; /* 你要真滿版可改成 0 */
		box-shadow: none; /* 滿版通常不需要厚陰影 */
	}

	/* 6) 標題大小微調 */
	#product-content .pc-title {
		font-size: 2rem;
		margin-left: 10px;
	}
	#product-content .pc-chip {
		margin-left: 10px;
		margin-top: 10px;
		font-size: 1.1rem;
	}

	/* 7) 輪播外層別被箭頭的 left:-20 吃掉視覺（雖然你768以下隱藏箭頭了，保險） */
	.product-center-wrapper {
		overflow: hidden;
	}
}
</style>
