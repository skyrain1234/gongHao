<template>
	<section id="courseBlock" aria-label="Course / Training / Research">
		<!-- ✅ 底層背景：沿用 eventsBoard 的光暈語言（在 CSS 用 ::before / ::after 做） -->

		<!-- ✅ 第二層氣氛：courseBlock 自己的漂浮 blob + grain（會很淡，不搶） -->
		<div class="bg-layer" aria-hidden="true">
			<div class="blob b1"></div>
			<div class="blob b2"></div>
			<div class="blob b3"></div>
			<div class="grain"></div>
		</div>

		<div class="cb-container">
			<!-- Desktop layout -->
			<div class="cb-grid cb-desktop">
				<!-- Left big -->
				<a class="cb-card cb-big cb-reveal" data-tone="course" href="#">
					<div class="cb-head">
						<div>
							<h3 class="cb-title">老幼共學主題課程</h3>
							<div class="cb-subtitle">Course</div>
						</div>
					</div>

					<div class="cb-media">
						<div class="cb-mask" aria-hidden="true"></div>
						<div class="cb-sheen" aria-hidden="true"></div>
						<!-- TODO: 換成你的圖片 -->
						<img src="@/assets/images/index/course.jpg" alt="老幼共學主題課程" />
					</div>
				</a>

				<!-- Right column -->
				<div class="cb-right">
					<a class="cb-card cb-small cb-reveal" data-tone="training" href="#">
						<div class="cb-head">
							<div>
								<h3 class="cb-title">課程與人才培訓</h3>
								<div class="cb-subtitle">Training</div>
							</div>
						</div>

						<div class="cb-media">
							<div class="cb-mask" aria-hidden="true"></div>
							<div class="cb-sheen" aria-hidden="true"></div>
							<!-- TODO: 換成你的圖片 -->
							<img src="@/assets/images/index/training.jpg" alt="課程與人才培訓" />
						</div>
					</a>

					<a class="cb-card cb-small cb-reveal" data-tone="research" href="#">
						<div class="cb-head">
							<div>
								<h3 class="cb-title">研究與出版</h3>
								<div class="cb-subtitle">Research &amp; Publications</div>
							</div>
						</div>

						<div class="cb-media">
							<div class="cb-mask" aria-hidden="true"></div>
							<div class="cb-sheen" aria-hidden="true"></div>
							<!-- TODO: 換成你的圖片 -->
							<img src="@/assets/images/index/publication.png" alt="研究與出版" />
						</div>
					</a>
				</div>
			</div>

			<!-- Mobile Swiper -->
			<div class="cb-mobile">
				<div class="swiper" id="cbSwiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<a class="cb-card cb-big cb-reveal" data-tone="course" href="#">
								<div class="cb-head">
									<div>
										<h3 class="cb-title">老幼共學主題課程</h3>
										<div class="cb-subtitle">Course</div>
									</div>
								</div>
								<div class="cb-media">
									<div class="cb-mask" aria-hidden="true"></div>
									<div class="cb-sheen" aria-hidden="true"></div>
									<img src="@/assets/images/index/course.jpg" alt="" />
								</div>
							</a>
						</div>

						<div class="swiper-slide">
							<a class="cb-card cb-big cb-reveal" data-tone="training" href="#">
								<div class="cb-head">
									<div>
										<h3 class="cb-title">課程與人才培訓</h3>
										<div class="cb-subtitle">Training</div>
									</div>
								</div>
								<div class="cb-media">
									<div class="cb-mask" aria-hidden="true"></div>
									<div class="cb-sheen" aria-hidden="true"></div>
									<img src="@/assets/images/index/training.jpg" alt="" />
								</div>
							</a>
						</div>

						<div class="swiper-slide">
							<a class="cb-card cb-big cb-reveal" data-tone="research" href="#">
								<div class="cb-head">
									<div>
										<h3 class="cb-title">研究與出版</h3>
										<div class="cb-subtitle">Research &amp; Publications</div>
									</div>
								</div>
								<div class="cb-media">
									<div class="cb-mask" aria-hidden="true"></div>
									<div class="cb-sheen" aria-hidden="true"></div>
									<img src="@/assets/images/index/publication.png" alt="" />
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ✅ Swiper Core
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

let ctx = null;
let swiper = null;
let onResize = null;

onMounted(() => {
	const root = document.querySelector("#courseBlock");
	if (!root) return;

	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;

	// =========================
	// GSAP（用 context 收編）
	// =========================
	ctx = gsap.context(() => {
		if (prefersReduced || typeof gsap === "undefined") {
			root.querySelectorAll(".cb-reveal").forEach((el) => {
				el.style.opacity = "1";
				el.style.transform = "none";
			});
			root
				.querySelectorAll(".cb-mask")
				.forEach((el) => (el.style.display = "none"));
			return;
		}

		const b1 = root.querySelector(".bg-layer .b1");
		const b2 = root.querySelector(".bg-layer .b2");
		const b3 = root.querySelector(".bg-layer .b3");

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

		// reveal
		const cards = Array.from(root.querySelectorAll(".cb-reveal"));
		gsap.set(cards, { opacity: 0, y: 18 });

		ScrollTrigger.batch(cards, {
			start: "top 85%",
			onEnter: (batch) => {
				gsap.to(batch, {
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: "power2.out",
					stagger: 0.12,
				});

				batch.forEach((card) => {
					const mask = card.querySelector(".cb-mask");
					if (mask)
						gsap.to(mask, {
							xPercent: 110,
							duration: 0.9,
							ease: "power2.out",
							delay: 0.08,
						});

					const title = card.querySelector(".cb-title");
					const sub = card.querySelector(".cb-subtitle");
					gsap.fromTo(
						[title, sub],
						{ opacity: 0, y: 10 },
						{
							opacity: 1,
							y: 0,
							duration: 0.55,
							ease: "power2.out",
							stagger: 0.08,
							delay: 0.12,
						}
					);
				});
			},
			once: true,
		});

		// hover sheen（事件要自己清：ctx 不會自動 removeEventListener）
		if (window.matchMedia("(hover:hover)").matches) {
			root.querySelectorAll(".cb-card").forEach((card) => {
				const sheen = card.querySelector(".cb-sheen");
				if (!sheen) return;

				let tl;
				const enter = () => {
					if (tl) tl.kill();
					gsap.set(sheen, { x: "-40%", opacity: 0.0 });
					tl = gsap.timeline();
					tl.to(sheen, { opacity: 0.75, duration: 0.12, ease: "power1.out" })
						.to(sheen, { x: "60%", duration: 0.55, ease: "power2.out" }, 0.03)
						.to(
							sheen,
							{ opacity: 0.0, duration: 0.18, ease: "power1.out" },
							0.42
						);
				};

				const leave = () => {
					if (tl) tl.kill();
					gsap.set(sheen, { opacity: 0 });
				};

				card.addEventListener("mouseenter", enter);
				card.addEventListener("mouseleave", leave);
				card._cbEnter = enter;
				card._cbLeave = leave;
			});
		}
	}, root);

	// =========================
	// Swiper (mobile)
	// =========================
	const isMobile = () => window.matchMedia("(max-width: 991.98px)").matches;

	function initSwiper() {
		const el = root.querySelector("#cbSwiper");
		if (!el || !isMobile() || swiper) return;

		swiper = new Swiper(el, {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: "auto",
			spaceBetween: 14,
			centeredSlides: false,
			grabCursor: true,
			autoplay: { delay: 3200, disableOnInteraction: false },
		});
	}

	function destroySwiper() {
		if (!swiper || isMobile()) return;
		swiper.destroy(true, true);
		swiper = null;
	}

	initSwiper();

	onResize = () => {
		initSwiper();
		destroySwiper();
	};
	window.addEventListener("resize", onResize);

	// optional：尺寸算錯時刷新一下
	ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
	// ✅ 1) 先清 Swiper + 事件
	if (swiper) {
		swiper.destroy(true, true);
		swiper = null;
	}
	if (onResize) {
		window.removeEventListener("resize", onResize);
		onResize = null;
	}

	// ✅ 2) 清 hover 事件
	const root = document.querySelector("#courseBlock");
	if (root) {
		root.querySelectorAll(".cb-card").forEach((card) => {
			if (card._cbEnter) card.removeEventListener("mouseenter", card._cbEnter);
			if (card._cbLeave) card.removeEventListener("mouseleave", card._cbLeave);
			delete card._cbEnter;
			delete card._cbLeave;
		});
	}

	// ✅ 3) 最後 ctx.revert：只清本元件的 GSAP/ScrollTrigger（不會誤殺全站）
	if (ctx) {
		ctx.revert();
		ctx = null;
	}
});
</script>

<style>
/*-----------------------------OTHER------------------------------------*/

#courseBlock {
	--card: rgba(236, 236, 236, 0.86);
	--text: #1a1a1a;
	--muted: rgba(58, 52, 46, 0.68);

	--course: #f4c75a;
	--train: #f2a46f;
	--research: #77b9d6;

	--radius-lg: 28px;
	--radius-md: 22px;

	--shadow1: 0 14px 34px rgba(0, 0, 0, 0.1);
	--shadow2: 0 3px 12px rgba(0, 0, 0, 0.07);

	position: relative;
	padding: clamp(28px, 4.5vw, 64px) 0;
	overflow: hidden;
	isolation: isolate;
	background: transparent !important;

	color: var(--text);
}

#courseBlock * {
	box-sizing: border-box;
}

#courseBlock .cb-container {
	width: min(1180px, calc(100% - 56px));
	margin: 0 auto;
	position: relative;
	z-index: 2;
}

/* =======================
   ✅ 銜接 eventsBoard 的背景語言
   1) ::before = 同配方底色（起點用 eventsBoard 的尾端色 #f2f6f4）
   2) ::after  = 上緣羽化帶（避免切割）
======================= */
/* ✅ 讓 courseBlock 的底色「完全跟 eventsBoard 同語言」 */
#courseBlock::before {
	content: "";
	position: absolute;
	inset: 0;
	z-index: 0;
	pointer-events: none;

	/* 直接沿用 eventsBoard 的背景配方，只調整位置讓它在區塊內自然 */
	background: radial-gradient(
			900px 420px at 18% 18%,
			rgba(255, 220, 195, 0.55),
			transparent 60%
		),
		radial-gradient(
			820px 420px at 84% 20%,
			rgba(205, 232, 221, 0.6),
			transparent 60%
		),
		radial-gradient(
			900px 520px at 55% 105%,
			rgba(170, 200, 255, 0.18),
			transparent 60%
		),
		linear-gradient(180deg, #fbf7f2 0%, #f6faf8 55%, #f2f6f4 100%);
}

/* ✅ 上緣羽化：用同一套 cream 色去做，不要混到純白 */
#courseBlock::after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: -1px;
	height: 170px;
	z-index: 1;
	pointer-events: none;

	background: linear-gradient(
		to bottom,
		rgba(251, 247, 242, 0) 0%,
		rgba(251, 247, 242, 0.7) 35%,
		rgba(251, 247, 242, 0) 100%
	);
}

/* =======================
   第二層：courseBlock 自己的淡淡漂浮光暈
======================= */
#courseBlock .bg-layer {
	position: absolute;
	inset: 0;
	z-index: 1;
	pointer-events: none;
}

#courseBlock .blob {
	position: absolute;
	width: 560px;
	height: 560px;
	border-radius: 999px;
	filter: blur(52px);
	opacity: 0.2; /* ✅ 很淡：避免兩套 blob 打架 */
	transform: translate3d(0, 0, 0);
	will-change: transform;
	mix-blend-mode: multiply;
}

/* ✅ 直接用 eventsBoard 的色系（橘/綠/藍），保持一致 */
#courseBlock .blob.b1 {
	left: -160px;
	top: 30px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 170, 130, 0.65),
		transparent 60%
	);
}
#courseBlock .blob.b2 {
	right: -200px;
	top: 20px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(110, 225, 195, 0.55),
		transparent 60%
	);
}
#courseBlock .blob.b3 {
	left: 28%;
	bottom: -260px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(160, 195, 255, 0.55),
		transparent 60%
	);
}

/* grain：改成和 eventsBoard 一樣的點點語言 */
#courseBlock .grain {
	position: absolute;
	inset: 0;
	opacity: 0.1;
	background-image: radial-gradient(
		rgba(0, 0, 0, 0.22) 0.6px,
		transparent 0.6px
	);
	background-size: 12px 12px;
	mix-blend-mode: soft-light;
	pointer-events: none;
}

/* =======================
   Desktop grid
======================= */
#courseBlock .cb-grid {
	display: grid;
	grid-template-columns: 1.14fr 0.86fr;
	gap: 22px;
	align-items: stretch;
}
#courseBlock .cb-right {
	display: grid;
	grid-template-rows: 1fr 1fr;
	gap: 22px;
}

/* =======================
   Card
======================= */
#courseBlock .cb-card {
	display: block;
	text-decoration: none;
	color: inherit;

	background: var(--card);
	border-radius: 34px;
	padding: 26px;
	box-shadow: 0 24px 80px rgba(25, 30, 30, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.04);
	backdrop-filter: blur(10px);
	overflow: hidden;
	position: relative;
	transform: translateZ(0);
}

/* tone dot */
#courseBlock .cb-card::before {
	content: "";
	position: absolute;
	left: 18px;
	top: 18px;
	width: 12px;
	height: 12px;
	border-radius: 999px;
	background: rgba(0, 0, 0, 0.15);
}
#courseBlock .cb-card[data-tone="course"]::before {
	background: color-mix(in srgb, var(--course) 80%, #fff 20%);
}
#courseBlock .cb-card[data-tone="training"]::before {
	background: color-mix(in srgb, var(--train) 80%, #fff 20%);
}
#courseBlock .cb-card[data-tone="research"]::before {
	background: color-mix(in srgb, var(--research) 80%, #fff 20%);
}

#courseBlock .cb-head {
	display: flex;
	gap: 14px;
	margin-bottom: 16px;
}
#courseBlock .cb-title {
	margin: 0;
	font-weight: 900;
	letter-spacing: 0.2px;
	font-size: clamp(18px, 2.1vw, 26px);
	line-height: 1.2;
}
#courseBlock .cb-subtitle {
	margin-top: 8px;
	font-size: 14px;
	color: var(--muted);
	letter-spacing: 0.3px;
}

/* media window */
#courseBlock .cb-media {
	position: relative;
	border-radius: 26px;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.35);
	box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.72);
	transform: translateZ(0);
}
#courseBlock .cb-media::after {
	content: "";
	position: absolute;
	right: 0;
	bottom: 0;
	width: 34px;
	height: 34px;
	background: rgba(255, 255, 255, 0.78);
	clip-path: polygon(100% 0, 0 100%, 100% 100%);
	opacity: 0.85;
}
#courseBlock .cb-media img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	transform: scale(1.02);
	will-change: transform, filter;
}

/* sizes */
#courseBlock .cb-big .cb-media {
	height: 500px;
}
#courseBlock .cb-small .cb-media {
	height: 200px;
	border-radius: 22px;
}
#courseBlock .cb-small .cb-title {
	font-size: clamp(18px, 1.8vw, 22px);
}

/* mask */
#courseBlock .cb-mask {
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.92);
	transform: translateX(0%);
	will-change: transform;
	z-index: 3;
}

/* sheen */
#courseBlock .cb-sheen {
	position: absolute;
	inset: -40% -60%;
	background: linear-gradient(
		120deg,
		transparent 35%,
		rgba(255, 255, 255, 0.55) 50%,
		transparent 65%
	);
	transform: translateX(-40%) rotate(12deg);
	opacity: 0;
	pointer-events: none;
	z-index: 4;
}

/* hover */
@media (hover: hover) {
	#courseBlock .cb-card {
		transition: transform 0.25s ease, box-shadow 0.25s ease;
	}
	#courseBlock .cb-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 28px 90px rgba(25, 30, 30, 0.14);
	}
	#courseBlock .cb-card:hover .cb-media img {
		transform: scale(1.06);
		filter: saturate(1.05);
		transition: transform 0.35s ease, filter 0.35s ease;
	}
	#courseBlock .cb-card:hover .cb-sheen {
		opacity: 0.75;
		transition: opacity 0.15s ease;
	}
}

/* reveal initial */
#courseBlock .cb-reveal {
	opacity: 0;
	transform: translateY(18px);
}

/* mobile */
#courseBlock .cb-mobile {
	display: none;
}
#courseBlock .cb-desktop {
	display: grid;
}

@media (max-width: 991.98px) {
	#courseBlock .cb-desktop {
		display: none;
	}
	#courseBlock .cb-mobile {
		display: block;
	}
	#courseBlock .swiper {
		width: 100%;
		padding: 8px 6px 22px;
	}
	#courseBlock .swiper-slide {
		width: 86%;
	}
	#courseBlock .cb-card {
		box-shadow: 0 24px 80px rgba(25, 30, 30, 0.12);
	}
	#courseBlock .cb-big .cb-media {
		height: 360px;
	}
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
	#courseBlock .cb-reveal {
		opacity: 1 !important;
		transform: none !important;
	}
	#courseBlock .blob {
		display: none;
	}
	#courseBlock .grain {
		opacity: 0.05;
	}
	#courseBlock .cb-mask {
		display: none;
	}
}
#courseBlock::before,
#courseBlock::after {
	display: none !important; /* 你之前加的銜接底，現在改由 wrapper 提供 */
}
</style>
