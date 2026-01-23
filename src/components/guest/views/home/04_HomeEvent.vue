<template>
	<section id="eventsBoard" class="eventsBoard">
		<!-- 背景層（同關於我們：柔和光暈 + grain + 漂浮 blob） -->
		<div class="eventsBoard__bg" aria-hidden="true">
			<span class="blob b1"></span>
			<span class="blob b2"></span>
			<span class="blob b3"></span>
		</div>

		<div class="container">
			<div class="eventsBoard__wrap">
				<!-- 右上標籤 -->
				<div class="eventsBoard__tab">活動一覽</div>

				<!-- 主面板 -->
				<div class="eventsBoard__panel">
					<!-- 左側圖 -->
					<div class="eventsBoard__media js-eb-media">
						<div class="eventsBoard__imgFrame">
							<img src="@/assets/images/index/events.jpg" alt="活動主圖" />
						</div>
					</div>

					<!-- 右側列表 -->
					<div class="eventsBoard__list js-eb-list">
						<div v-for="event in displayEvent">
							<router-link
								class="eventRow js-eb-item"
								:to="`/${currentLang}/event/${event.id}`"
							>
								<div class="eventRow__date">{{ event.publish_date }}</div>
								<div class="eventRow__main">
									<div class="eventRow__title" v-if="event.pin">
										【置頂】{{ event.title }}
									</div>
									<div class="eventRow__title" v-else>{{ event.title }}</div>
									<!-- <div class="eventRow__desc">重大計劃一覽</div> -->
								</div>
								<span class="eventRow__go" aria-hidden="true">→</span>
							</router-link>
						</div>
						<div class="eventsBoard__actions js-eb-actions">
							<a class="eventsBoard__more" href="event-gallery.html"
								>查看更多</a
							>
						</div>
					</div>
				</div>
				<!-- /panel -->
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed , nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
let ctx = null; //  gsap context

import { getLatestEvent } from "@/api/main/service/event/eventService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
const { currentLang } = useCurrentLang();

// 取得最新的幾筆消息（原始資料）
const latestEvent = ref([]);

// 螢幕尺寸判斷
const isSmallScreen = ref(false);

const handleResize = () => {
	isSmallScreen.value = window.innerWidth < 576; // 跟 Bootstrap xs 斷點一致
};

// 實際要顯示在畫面上的資料
const displayEvent = computed(() => {
	if (isSmallScreen.value) {
		// 小螢幕只顯示 3 筆
		return latestEvent.value.slice(0, 3);
	}
	// 大螢幕就全部顯示
	return latestEvent.value;
});

// 讀取最新消息
const loadLatestEvent = async () => {
	try {
		const response = await getLatestEvent(4); // service 回「陣列」
		latestEvent.value = response;
	} catch (err) {
		console.error("getLatestEvent error:", err);
		latestEvent.value = [];
	}
};

function initGsap(root) {
	if (!root) return;
	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
		return;

	// 如果重跑（資料更新/resize），先清掉舊的
	if (ctx) {
		ctx.revert();
		ctx = null;
	}

	ctx = gsap.context(() => {
		const b1 = root.querySelector(".eventsBoard__bg .b1");
		const b2 = root.querySelector(".eventsBoard__bg .b2");
		const b3 = root.querySelector(".eventsBoard__bg .b3");

		const panel = root.querySelector(".eventsBoard__panel");
		const media = root.querySelector(".js-eb-media");
		const items = root.querySelectorAll(".js-eb-item");
		const actions = root.querySelector(".js-eb-actions");
		const tab = root.querySelector(".eventsBoard__tab");

		// 背景漂浮
		if (b1)
			gsap.to(b1, {
				x: 26,
				y: -18,
				duration: 6.2,
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
			});
		if (b2)
			gsap.to(b2, {
				x: -22,
				y: 20,
				duration: 7.1,
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
			});
		if (b3)
			gsap.to(b3, {
				x: 18,
				y: -22,
				duration: 7.6,
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
			});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: root,
				start: "top 75%",
				toggleActions: "play none none reverse",
			},
		});

		if (panel)
			tl.fromTo(
				panel,
				{ opacity: 0, y: 16 },
				{ opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
				0
			);
		if (tab)
			tl.fromTo(
				tab,
				{ opacity: 0, y: -10 },
				{ opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
				0.05
			);
		if (media)
			tl.fromTo(
				media,
				{ opacity: 0, y: 14, scale: 0.99 },
				{ opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
				0.12
			);

		// ✅ 關鍵：items 有了才做
		if (items.length) {
			tl.fromTo(
				items,
				{ opacity: 0, y: 10 },
				{ opacity: 1, y: 0, duration: 0.42, ease: "power2.out", stagger: 0.08 },
				0.18
			);
		}

		if (actions)
			tl.fromTo(
				actions,
				{ opacity: 0, y: 10 },
				{ opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
				0.45
			);
	}, root);

	ScrollTrigger.refresh();
}

onMounted(async () => {
	const root = document.querySelector("#eventsBoard");
	if (!root) return;

	handleResize();
	window.addEventListener("resize", handleResize);

	await loadLatestEvent(); // ✅ 等資料回來
	await nextTick(); // ✅ 等 DOM 渲染出 .js-eb-item
	initGsap(root); // ✅ 再建 GSAP
});

onBeforeUnmount(() => {
	// 清掉這個 context 內所有 gsap 動畫 + ScrollTrigger
	if (ctx) {
		ctx.revert();
		ctx = null;
	}

	window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* =========================
   活動一覽 Events Board (same vibe as foundationBridge)
   ========================= */

#eventsBoard {
	background: transparent;
}
#eventsBoard.eventsBoard {
	--cream: #fbf7f2;
	--paper: rgba(255, 255, 255, 0.74);
	--ink: rgba(48, 42, 36, 0.9);
	--muted: rgba(58, 52, 46, 0.68);

	position: relative;
	padding: 70px 0;
	overflow: hidden;
	isolation: isolate;
}

/* 背景底：同關於我們的溫暖光暈語言 */
#eventsBoard .eventsBoard__bg {
	position: absolute;
	inset: 0;
	z-index: 0;

	background: none !important;
}

/* 漂浮光暈 blobs（用 GSAP 動） */
#eventsBoard .eventsBoard__bg .blob {
	position: absolute;
	width: 520px;
	height: 520px;
	border-radius: 999px;
	filter: blur(26px);
	opacity: 0.65;
	transform: translate3d(0, 0, 0);
}
#eventsBoard .eventsBoard__bg .b1 {
	left: -120px;
	top: 70px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 170, 130, 0.65),
		transparent 60%
	);
}
#eventsBoard .eventsBoard__bg .b2 {
	right: -140px;
	top: 40px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(110, 225, 195, 0.55),
		transparent 60%
	);
}
#eventsBoard .eventsBoard__bg .b3 {
	left: 35%;
	bottom: -200px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(160, 195, 255, 0.55),
		transparent 60%
	);
}

/* 外框（灰白大圓角底） */
#eventsBoard .eventsBoard__wrap {
	position: relative;
	z-index: 1;
	max-width: 1320px;
	margin: 0 auto;
	padding: 0 14px;
}

/* 主面板：像你圖那個大灰底 */
#eventsBoard .eventsBoard__panel {
	position: relative;
	border-radius: 34px;
	padding: 46px 48px;
	background: rgba(236, 236, 236, 0.86);
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0 24px 80px rgba(25, 30, 30, 0.1);
	backdrop-filter: blur(10px);
	display: grid;
	grid-template-columns: 520px 1fr;
	gap: 46px;
	align-items: center;
}

/* 右上標籤 */
#eventsBoard .eventsBoard__tab {
	position: absolute;
	right: 42px;
	top: -50px;
	z-index: 2;
	padding: 18px 30px;
	border-radius: 22px;
	background: rgba(236, 236, 236, 0.95);
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
	font-weight: 950;
	letter-spacing: 0.6px;
	font-size: 20px;
	color: #111;
}

/* 左圖框（白邊 + 陰影） */
#eventsBoard .eventsBoard__imgFrame {
	width: 100%;
	max-width: 520px;
	border-radius: 26px;
	padding: 14px;
	background: rgba(255, 255, 255, 0.85);
	border: 1px solid rgba(0, 0, 0, 0.06);
	box-shadow: 0 18px 55px rgba(15, 23, 42, 0.12);
}
#eventsBoard .eventsBoard__imgFrame img {
	width: 100%;
	aspect-ratio: 16 / 11;
	object-fit: cover;
	border-radius: 20px;
	display: block;
}

/* 右側列表 */
#eventsBoard .eventsBoard__list {
	display: flex;
	flex-direction: column;
	gap: 0;
}

/* 一列（底下虛線） */
#eventsBoard .eventRow {
	display: grid;
	grid-template-columns: 110px 1fr 56px;
	gap: 18px;
	align-items: center;
	padding: 18px 0;
	text-decoration: none;
	color: inherit;
	border-bottom: 1px dotted rgba(0, 0, 0, 0.28);
}

#eventsBoard .eventRow__date {
	font-weight: 900;
	color: rgba(232, 84, 84, 0.95); /* 日期紅 */
	letter-spacing: 0.04em;
	font-size: 16px;
}

#eventsBoard .eventRow__title {
	font-weight: 950;
	color: #111;
	font-size: 20px;
	letter-spacing: 0.02em;
	line-height: 1.2;
}

#eventsBoard .eventRow__desc {
	margin-top: 6px;
	font-size: 14px;
	color: rgba(0, 0, 0, 0.55);
	line-height: 1.5;
	max-width: 70ch;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

/* 右側箭頭（圓框） */
#eventsBoard .eventRow__go {
	width: 44px;
	height: 44px;
	border-radius: 999px;
	display: grid;
	place-items: center;
	border: 2px solid rgba(0, 0, 0, 0.75);
	color: rgba(0, 0, 0, 0.85);
	font-weight: 950;
	transform: translateX(0);
	transition: transform 0.18s ease, background 0.18s ease,
		border-color 0.18s ease;
}

/* Hover：整列微亮 + 箭頭前進 */
#eventsBoard .eventRow:hover .eventRow__go {
	transform: translateX(4px);
	background: rgba(255, 255, 255, 0.45);
	border-color: rgba(0, 0, 0, 0.85);
}

/* 右下「查看更多」 */
#eventsBoard .eventsBoard__actions {
	display: flex;
	justify-content: flex-end;
	padding-top: 26px;
}
#eventsBoard .eventsBoard__more {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 150px;
	height: 48px;
	border-radius: 999px;
	border: 2px solid rgba(0, 0, 0, 0.75);
	color: rgba(0, 0, 0, 0.9);
	text-decoration: none;
	font-weight: 950;
	letter-spacing: 0.08em;
	background: rgba(255, 255, 255, 0.25);
	transition: transform 0.18s ease, background 0.18s ease;
}
#eventsBoard .eventsBoard__more:hover {
	transform: translateY(-2px);
	background: rgba(255, 255, 255, 0.45);
}

/* RWD */
@media (max-width: 991.98px) {
	#eventsBoard .eventsBoard__panel {
		grid-template-columns: 1fr;
		padding: 36px 22px;
		gap: 22px;
	}
	#eventsBoard .eventsBoard__tab {
		right: 18px;
		font-size: 22px;
		padding: 14px 22px;
	}
	#eventsBoard .eventRow {
		grid-template-columns: 96px 1fr 50px;
	}
}
@media (max-width: 575.98px) {
	#eventsBoard .eventRow {
		grid-template-columns: 92px 1fr 46px;
	}
	#eventsBoard .eventRow__title {
		font-size: 18px;
	}
	#eventsBoard .eventRow__desc {
		display: none; /* 手機簡化，避免太擠 */
	}
}
</style>
