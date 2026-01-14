<template>
	<!-- 單一「產品區塊」：外層背景圖（大分類縮圖）＋ 內層玻璃卡＋右側輪播 -->
	<div
		class="product-list-area"
		:style="bgImage ? { backgroundImage: `url(${bgImage})` } : {}"
		data-aos="fade"
	>
		<div class="bg-tx">
			<div class="container">
				<div class="row">
					<!-- 左側：區塊標題＋說明文字 -->
					<div class="col-12 col-lg-5">
						<h1 class="product-list-title">
							<strong>{{ title }}</strong>
						</h1>
						<p class="product-list-text">
							<strong>{{ desc }}</strong>
						</p>
					</div>

					<!-- 右側：產品輪播（Swiper） -->
					<div class="col-12 col-lg-7">
						<div class="soft-carousel swiper mySwiper">
							<Swiper
								:modules="[Navigation, Pagination]"
								:slides-per-view="3"
								:slides-per-group="3"
								:space-between="24"
								:navigation="true"
								:pagination="{ clickable: true }"
								:breakpoints="{
									0: { slidesPerView: 1 , slidesPerGroup:1 }, // 手機：一次 1 張
									576: { slidesPerView: 2 , slidesPerGroup:2 }, // 小平板：一次 2 張
									992: { slidesPerView: 3 , slidesPerGroup:3}, // 桌機：一次 3 張
								}"
							>
								<!-- 每一張產品卡片 -->
								<SwiperSlide
									v-for="item in items"
									:key="item.id"
									class="soft-card"
								>
									<router-link
										:to="{
											name: 'software',
											params: { lang: route.params.lang, softwareId: item.id },
										}"
									>
										<div class="soft-inner" data-aos="fade">
											<!-- 圖片：產品縮圖 -->
											<img :src="item.img" :alt="item.title" />
											<!-- 產品名稱 -->
											<h5 class="mt-3 fs-5">{{ item.title }}</h5>
										</div>
									</router-link>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
					<!-- /右側輪播 -->
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Swiper Vue 元件
import { Swiper, SwiperSlide } from "swiper/vue";
// Swiper 導航＆分頁功能模組
import { Navigation, Pagination } from "swiper/modules";
import { useRoute } from "vue-router";
const route = useRoute();
/**
 * ProductCarousel 的對外介面（props）
 *
 * - bgImage: 區塊用的大背景圖（通常是「分類縮圖」拉大當背景）
 * - title  : 區塊標題（分類名稱，例如「點子鋪商用軟體系列」）
 * - desc   : 區塊說明文字（分類描述）
 * - items  : 要顯示在輪播裡的產品卡片陣列
 *            每一筆 item 建議格式：
 *            {
 *              id:    Number | String, // 唯一 key
 *              title: String,          // 卡片標題（產品名稱）
 *              img:   String,          // 圖片完整網址
 *            }
 */
defineProps({
	bgImage: {
		type: String,
		default: "",
	},
	title: {
		type: String,
		default: "",
	},
	desc: {
		type: String,
		default: "",
	},
	items: {
		type: Array,
		default: () => [],
	},
});
</script>

<style scoped>
/* 外層區塊：背景圖（大分類）＋ 視差設定 */
.product-list-area {
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
	background-position: center;
	overflow-x: hidden;
	height: auto;

	/* 沒背景圖時的備用底色：可看情況直接 transparent 或吃 token */
	background-color: var(--product-list-bg, transparent);
}

/* 玻璃感白底，避免背景圖太吵看不清楚文字 */
.bg-tx {
	/* 顏色由 page-product 控制，退回共用 glass 底 */
	background-color: var(--product-list-overlay-bg, var(--glass-bg));
	backdrop-filter: blur(var(--glass-blur));
	pointer-events: auto;
	opacity: 1;
	padding: 20px 0;
}

.product-list-title{
	font-size: 2.4rem;
}

.product-list-text{
	font-size: 1.2rem;
}

.soft-carousel {
	border-radius: var(--radius-lg);
}
/* --- 卡片外層：讓卡片置中 --- */
.soft-carousel .soft-card {
	/* display: flex;
	justify-content: center; */
	transition: 0.25s ease;
}
/* --- 卡片外層：讓卡片置中 --- */
.soft-carousel .soft-card:hover {
	transform: scale(1.02);
}

/* 卡片本體維持 100% 寬，就會統一 */
.soft-carousel .soft-inner {
  width: 100%;
  background: var(--product-card-bg, var(--bg-surface));
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-soft);
  text-align: center;
  transition: 0.35s;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* hover 效果：微微浮起＋加重陰影 */
.soft-carousel .soft-inner:hover {
	transform: translateY(-8px);
	box-shadow: var(--shadow-elevated);
}

/* --- 圖片：統一高度＋等比例縮放 --- */
.soft-carousel .soft-inner img {
	width: 100%;
	height: 140px;
	object-fit: contain;
	margin-bottom: 12px;
}

/* --- 卡片標題 --- */
.soft-carousel h5 {
	font-size: 1.05rem;
	font-weight: 700;
	margin-bottom: 6px;
	flex-shrink: 0;
	color: var(--product-card-title-color, var(--color-text-main));
}

/* 讓 router-link 變成整張卡片的容器，寬度 = slide 寬度 */
.soft-carousel .soft-card > a {
  display: block;
  width: 100%;
  text-decoration: none;
}

/* --- 卡片文字區（如果未來有 p 文案） --- */
.soft-carousel p {
	font-size: 0.9rem;
	color: var(--product-card-text-color, var(--color-text-muted));
	margin: 0;
	line-height: 1.4;
	flex-grow: 1;
	display: flex;
	align-items: flex-start;
}
</style>
