<template>
	<!-- Hero 區 -->
	<header id="product-hero" class="d-flex align-items-center">
		<div class="container">
			<div class="row align-items-center">
				<!-- 左側圖片 -->
				<div
					class="col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center"
					data-aos="fade-right"
				>
					<div class="hero-img"></div>
				</div>

				<div class="col-lg-6 text-center text-lg-start mt-4 mt-lg-0">
					<!-- 大標題 -->
					<h1 class="hero-title" data-aos="fade-down">
						{{ $t("product.hero.title") }}
					</h1>
					<!-- 內容 -->
					<p class="hero-sub" data-aos="fade-left">
						{{ $t("product.hero.subLine1") }}
						<br />
						{{ $t("product.hero.subLine2") }}
					</p>

					<!-- 按鈕區 -->
					<div class="my-4" data-aos="fade-left">
						<!-- 聯絡我們 -->
						<a class="hero-btn me-2" @click="openChat">
							{{ $t("nav.contact") }}
						</a>
						<!-- 查看課程 -->
						<router-link
							class="hero-btn-outline me-2"
							:to="{
								name: 'newsListByCategory',
								params: {
									lang: currentLang,
									slug: 'course', // 🔁 這裡換成你要的 slug
								},
							}"
						>
							{{ $t("product.hero.ctaCourse") }}
						</router-link>
						<!-- 保證書下載 -->
						<router-link
							class="hero-btn-outline mt-md-0 mt-2 "
							:to="`/${currentLang}/warranty`"
						>
							{{ $t("product.hero.warranty") }}
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { useContactChatStore } from "@/stores/contactChat";
import { computed } from "vue";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
const { currentLang } = useCurrentLang();
// 聊天框
const chatStore = useContactChatStore();

const openChat = () => {
	chatStore.open();
};
</script>

<style scoped>
/* HERO 區 */
#product-hero {
	height: 100vh;

	/* 背景：page-product 給 product-hero 用的主題色，fallback 用全站頁面背景 */
	background: var(--product-hero-bg, var(--bg-page));

	position: relative;
	overflow: hidden;
}

#product-hero .hero-title {
	font-size: 2.8rem;
	font-weight: 800;
	line-height: 1.3;
	/* 標題顏色：先吃 product 專用，退回全站主文字色 */
	color: var(--product-hero-title-color, var(--color-text-main));
}

#product-hero .hero-sub {
	font-size: 1.4rem;
	margin-top: 14px;
	/* 副標顏色：先吃 product 專用，退回 muted */
	color: var(--product-hero-sub-color, var(--color-text-muted));
	max-width: 450px;
}

/* 按鈕：走全站 button / primary 色系 */
#product-hero .hero-btn {
	display: inline-block;
	background: var(--btn-primary-bg);
	padding: 10px 26px;
	border-radius: var(--radius-round, 30px);
	color: var(--color-text-inverse, #fff);
	font-weight: 600;
	text-decoration: none;
	transition: 0.25s;
	cursor: pointer;
	box-shadow: var(--shadow-soft);
}

#product-hero .hero-btn:hover {
	background: var(--btn-primary-bg-strong);
	transform: translateY(-2px);
	box-shadow: var(--shadow-elevated);
}

#product-hero .hero-btn-outline {
	display: inline-block;
	border: 2px solid var(--color-primary);
	padding: 10px 24px;
	border-radius: var(--radius-round, 30px);
	color: var(--color-primary);
	font-weight: 600;
	text-decoration: none;
	transition: 0.25s;
	background: transparent;
}

#product-hero .hero-btn-outline:hover {
	background: var(--color-primary);
	color: var(--color-text-inverse, #fff);
	transform: translateY(-2px);
}

/* 右側產品展示圖 */
#product-hero .hero-img {
	width: 600px;
	height: 380px;
	border-radius: var(--radius-lg);
	background: url("@/assets/images/product/product-area1.png") center/cover
		no-repeat;
	box-shadow: var(--shadow-elevated);
	backdrop-filter: blur(6px);
}

/* RWD */
@media (max-width: 768px) {
	#product-hero {
		height: auto;
		text-align: center;
	}

	#product-hero .hero-title {
		font-size: 2rem;
	}

	#product-hero .hero-sub {
		font-size: 1.2rem;
	}

	#product-hero .hero-img {
		width: 100%;
		height: 300px;
	}
}
</style>
