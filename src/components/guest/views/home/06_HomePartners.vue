<template>
	<section id="partnersLogos" class="partnersLogos">
		<div class="partnersLogos__bg" aria-hidden="true">
			<span class="blob b1"></span>
			<span class="blob b2"></span>
			<span class="blob b3"></span>
			<span class="wave"></span>

			<!-- playful sparkles -->
			<span class="spark s1"></span><span class="spark s2"></span
			><span class="spark s3"></span><span class="spark s4"></span>
			<span class="spark s5"></span><span class="spark s6"></span
			><span class="spark s7"></span><span class="spark s8"></span>
		</div>

		<div class="container">
			<header class="partnersLogos__head">
				<p class="partnersLogos__kicker">我們一起把善意做得更大</p>
				<h2 class="partnersLogos__title">合作夥伴</h2>
			</header>

			<!-- Desktop/Tablet: Grid -->
			<div class="partnersLogos__grid" aria-label="合作品牌 Logo">
				<!-- Logo item (only logo) -->
				<a
					class="logoTile js-logo"
					:href="partner.url"
					target="_blank"
					rel="noopener"
					aria-label="合作品牌 1"
					v-for="partner in latestPartners"
				>
					<img
						:src="getStorageFileUrl(partner.thumbnail_url)"
						alt="合作品牌 1 Logo"
						loading="lazy"
					/>
				</a>
			</div>
			<div class="mt-5 text-center">
				<button type="button" class="btn btn-lg btn-outline-warning fw-bold">
					成為合作夥伴
				</button>
			</div>

			<!-- Mobile: manual swipe row (only logo) -->
			<div class="partnersLogos__row" aria-label="合作品牌 Logo（手機滑動）">
				<div class="partnersLogos__rowInner">
					<a
						class="logoChip js-logo"
						:href="partner.url"
						target="_blank"
						rel="noopener"
						aria-label="合作品牌 1"
						v-for="partner in latestPartners"
					>
						<img
							:src="getStorageFileUrl(partner.thumbnail_url)"
							alt="合作品牌 1 Logo"
							loading="lazy"
						/>
					</a>
				</div>
			</div>
		</div>
		
	</section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getLatestPartner } from "@/api/main/service/partner/partnerService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";
gsap.registerPlugin(ScrollTrigger);

const latestPartners = ref([]);
let ctx = null;

const loadLatestPartner = async () => {
	try {
		const response = await getLatestPartner(5);
		latestPartners.value = response || [];
	} catch (err) {
		console.error("getLatestPartner error:", err);
		latestPartners.value = [];
	}
};

function initGsap(root) {
	if (!root) return;
	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
		return;

	// 可能因資料/路由重進來，先清一次
	if (ctx) {
		ctx.revert();
		ctx = null;
	}

	ctx = gsap.context(() => {
		// background float
		const b1 = root.querySelector(".b1");
		const b2 = root.querySelector(".b2");
		const b3 = root.querySelector(".b3");

		if (b1)
			gsap.to(b1, {
				x: 30,
				y: 18,
				duration: 6.5,
				yoyo: true,
				repeat: -1,
				ease: "sine.inOut",
			});
		if (b2)
			gsap.to(b2, {
				x: -28,
				y: 22,
				duration: 7.2,
				yoyo: true,
				repeat: -1,
				ease: "sine.inOut",
			});
		if (b3)
			gsap.to(b3, {
				x: 22,
				y: -16,
				duration: 8.0,
				yoyo: true,
				repeat: -1,
				ease: "sine.inOut",
			});

		// sparkles drift（⚠️ 可能為空，先判斷）
		const sparks = root.querySelectorAll(".spark");
		if (sparks.length) {
			sparks.forEach((el, i) => {
				const d = 4.8 + (i % 4) * 0.9;
				gsap.to(el, {
					x: i % 2 ? -12 : 12,
					y: i % 3 ? 10 : -10,
					rotation: i % 2 ? -10 : 10,
					duration: d,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			});
		}

		// entrance
		const kicker = root.querySelector(".partnersLogos__kicker");
		const title = root.querySelector(".partnersLogos__title");
		const gridLogos = root.querySelectorAll(".partnersLogos__grid .js-logo");
		const rowLogos = root.querySelectorAll(".partnersLogos__row .js-logo");

		const tl = gsap.timeline({
			scrollTrigger: { trigger: root, start: "top 75%", once: true },
		});

		if (kicker) {
			tl.from(kicker, {
				y: 14,
				opacity: 0,
				duration: 0.55,
				ease: "power2.out",
			});
		}
		if (title) {
			tl.from(
				title,
				{ y: 18, opacity: 0, duration: 0.65, ease: "power2.out" },
				kicker ? "-=0.25" : 0
			);
		}
		if (gridLogos.length) {
			tl.from(
				gridLogos,
				{
					opacity: 0,
					y: 16,
					duration: 0.55,
					ease: "power2.out",
					stagger: 0.06,
					clearProps: "transform",
				},
				"-=0.10"
			);
		}
		if (rowLogos.length) {
			tl.from(
				rowLogos,
				{
					opacity: 0,
					duration: 0.45,
					ease: "power2.out",
					stagger: 0.06,
					clearProps: "transform",
				},
				"-=0.10"
			);
		}
	}, root);

	ScrollTrigger.refresh();
}

onMounted(async () => {
	const root = document.querySelector("#partnersLogos");
	if (!root) return;

	await loadLatestPartner(); // ✅ 等資料
	await nextTick(); // ✅ 等 v-for 畫出 .js-logo
	initGsap(root);
});

onBeforeUnmount(() => {
	if (ctx) {
		ctx.revert();
		ctx = null;
	}
});
</script>

<style scoped>
/*-----------partner---------*/
#partnersLogos.partnersLogos {
	--cream: #fbf7f2;
	--paper: rgba(255, 255, 255, 0.78);
	--ink: rgba(42, 36, 30, 0.92);
	--muted: rgba(58, 50, 42, 0.68);
	--line: rgba(120, 105, 90, 0.18);
	--shadow: 0 18px 50px rgba(35, 28, 22, 0.1);
	--shadow2: 0 10px 24px rgba(35, 28, 22, 0.1);
	--r: 22px;
	--padY: clamp(56px, 6vw, 88px);

	position: relative;
	padding: var(--padY) 0;
	background: radial-gradient(
			900px 380px at 12% 8%,
			rgba(255, 232, 214, 0.55),
			transparent 70%
		),
		radial-gradient(
			820px 360px at 92% 22%,
			rgba(214, 238, 255, 0.45),
			transparent 70%
		),
		linear-gradient(180deg, #fff 0%, var(--cream) 44%, #fff 100%);
	overflow: hidden;
	isolation: isolate;
}

/* background */
#partnersLogos .partnersLogos__bg {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;
}
#partnersLogos .blob {
	position: absolute;
	width: 520px;
	height: 520px;
	border-radius: 999px;
	opacity: 0.78;
	background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 210, 168, 0.55),
			transparent 60%
		),
		radial-gradient(
			circle at 70% 70%,
			rgba(169, 213, 255, 0.4),
			transparent 62%
		),
		radial-gradient(
			circle at 50% 50%,
			rgba(255, 255, 255, 0.5),
			transparent 62%
		);
}
#partnersLogos .b1 {
	left: -180px;
	top: -220px;
}
#partnersLogos .b2 {
	right: -220px;
	top: 30px;
	width: 560px;
	height: 560px;
	opacity: 0.7;
}
#partnersLogos .b3 {
	left: 10%;
	bottom: -260px;
	width: 620px;
	height: 620px;
	opacity: 0.62;
}

#partnersLogos .wave {
	position: absolute;
	left: -5%;
	right: -5%;
	bottom: -70px;
	height: 220px;
	background: radial-gradient(
			120px 90px at 12% 40%,
			rgba(148, 203, 255, 0.25),
			transparent 62%
		),
		radial-gradient(
			140px 100px at 40% 62%,
			rgba(255, 208, 160, 0.24),
			transparent 62%
		),
		radial-gradient(
			160px 120px at 72% 45%,
			rgba(196, 232, 208, 0.22),
			transparent 62%
		),
		radial-gradient(
			120px 90px at 90% 65%,
			rgba(255, 225, 190, 0.24),
			transparent 62%
		);
	transform: rotate(-2deg);
	opacity: 0.95;
}

/* sparkles / bubbles */
#partnersLogos .spark {
	position: absolute;
	width: 14px;
	height: 14px;
	border-radius: 999px;
	opacity: 0.8;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 255, 255, 0.9),
		rgba(255, 255, 255, 0.35) 52%,
		transparent 62%
	);
	box-shadow: 0 10px 24px rgba(35, 28, 22, 0.06),
		0 0 0 6px rgba(255, 255, 255, 0.1);
	filter: blur(0.2px);
}
#partnersLogos .spark.s2,
#partnersLogos .spark.s5 {
	border-radius: 6px;
	clip-path: polygon(
		50% 0%,
		62% 34%,
		98% 35%,
		70% 56%,
		79% 90%,
		50% 70%,
		21% 90%,
		30% 56%,
		2% 35%,
		38% 34%
	);
}
#partnersLogos .spark.s1 {
	left: 10%;
	top: 22%;
	width: 16px;
	height: 16px;
}
#partnersLogos .spark.s2 {
	left: 22%;
	top: 10%;
	width: 18px;
	height: 18px;
}
#partnersLogos .spark.s3 {
	left: 38%;
	top: 18%;
	width: 12px;
	height: 12px;
}
#partnersLogos .spark.s4 {
	left: 62%;
	top: 12%;
	width: 16px;
	height: 16px;
}
#partnersLogos .spark.s5 {
	left: 78%;
	top: 26%;
	width: 18px;
	height: 18px;
}
#partnersLogos .spark.s6 {
	left: 88%;
	top: 16%;
	width: 12px;
	height: 12px;
}
#partnersLogos .spark.s7 {
	left: 14%;
	bottom: 26%;
	width: 12px;
	height: 12px;
}
#partnersLogos .spark.s8 {
	right: 16%;
	bottom: 22%;
	width: 16px;
	height: 16px;
}

/* header */
#partnersLogos .partnersLogos__head {
	position: relative;
	z-index: 1;
	text-align: center;
	margin: 0 auto 20px;
}
#partnersLogos .partnersLogos__kicker {
	margin: 0 0 10px;
	color: var(--muted);
	letter-spacing: 0.12em;
	font-size: 18px;
}
#partnersLogos .partnersLogos__title {
	margin: 0;
	color: var(--ink);
	font-weight: 900;
	letter-spacing: 0.02em;
	font-size: clamp(26px, 3.4vw, 40px);
	display: inline-block;
	position: relative;
	padding-bottom: 10px;
}
#partnersLogos .partnersLogos__title::after {
	content: "";
	position: absolute;
	left: 10%;
	right: 10%;
	bottom: 0;
	height: 10px;
	opacity: 0.85;
	background: radial-gradient(
				circle at 6px 6px,
				rgba(255, 203, 160, 0.85) 3px,
				transparent 3.4px
			)
			0 2px/12px 10px repeat-x,
		radial-gradient(
				circle at 6px 4px,
				rgba(165, 214, 255, 0.7) 3px,
				transparent 3.4px
			)
			6px 0/12px 10px repeat-x;
}

/* Grid */
#partnersLogos .partnersLogos__grid {
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-columns: repeat(6, minmax(0, 1fr));
	gap: 10px;
	padding: 3%;
	border: 1px solid var(--line);
	border-radius: calc(var(--r) + 10px);
	background: rgba(255, 255, 255, 0.58);
	backdrop-filter: blur(8px);
	box-shadow: var(--shadow);
	overflow: hidden;
	height: auto;
}
#partnersLogos .partnersLogos__grid::before {
	content: "";
	position: absolute;
	inset: 0;
	background: radial-gradient(
			circle at 1px 1px,
			rgba(120, 105, 90, 0.1) 1px,
			transparent 1.2px
		)
		0 0/18px 18px;
	opacity: 0.33;
	pointer-events: none;
}

/* Logo Tile */
#partnersLogos .logoTile {
	position: relative;
	display: grid;
	place-items: center;
	padding: 14px;
	border-radius: 22px 18px 22px 16px; /* playful */
	border: 1px solid rgba(120, 105, 90, 0.14);
	background: var(--paper);
	box-shadow: var(--shadow2);
	text-decoration: none;
	min-height: 86px;
	transform: translateZ(0);
	isolation: isolate;

	transition: transform 0.22s ease, border-color 0.22s ease,
		box-shadow 0.22s ease;
}
#partnersLogos .logoTile::after {
	content: "";
	position: absolute;
	right: -18px;
	top: -18px;
	width: 64px;
	height: 64px;
	background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.9),
			rgba(255, 255, 255, 0.25) 60%,
			transparent 62%
		),
		radial-gradient(
			circle at 70% 70%,
			rgba(255, 203, 160, 0.4),
			transparent 62%
		);
	transform: rotate(10deg);
	opacity: 0.95;
	pointer-events: none;
	z-index: 0;
}

#partnersLogos .logoTile img {
	width: min(92px, 100%);
	height: 44px;
	object-fit: contain;
	position: relative;
	z-index: 1;

	/* grayscale default */
	filter: grayscale(1) contrast(1.02) opacity(0.82);
	transition: filter 0.22s ease, transform 0.22s ease;
}

/* Hover -> color */
#partnersLogos .logoTile:hover,
#partnersLogos .logoTile:focus-visible {
	transform: translateY(-3px) rotate(-0.35deg);
	border-color: rgba(120, 105, 90, 0.22);
	box-shadow: 0 20px 46px rgba(35, 28, 22, 0.12);
	outline: none;
}
#partnersLogos .logoTile:hover img,
#partnersLogos .logoTile:focus-visible img {
	filter: grayscale(0) contrast(1.06) opacity(1);
	transform: scale(1.03);
}

/* Mobile row: manual swipe */
#partnersLogos .partnersLogos__row {
	display: none;
	position: relative;
	z-index: 1;
	margin-top: 14px;
	border: 1px solid var(--line);
	border-radius: calc(var(--r) + 10px);
	background: rgba(255, 255, 255, 0.58);
	backdrop-filter: blur(8px);
	box-shadow: var(--shadow);
	overflow: auto;
	-webkit-overflow-scrolling: touch;
}
#partnersLogos .partnersLogos__rowInner {
	display: flex;
	gap: 12px;
	padding: 14px;
	min-width: max-content;
}
#partnersLogos .logoChip {
	flex: 0 0 auto;
	display: grid;
	place-items: center;
	width: 96px;
	height: 72px;
	border-radius: 22px 18px 22px 16px;
	border: 1px solid rgba(120, 105, 90, 0.14);
	background: var(--paper);
	box-shadow: var(--shadow2);
	text-decoration: none;

	transition: transform 0.18s ease, border-color 0.18s ease,
		box-shadow 0.18s ease;
}
#partnersLogos .logoChip img {
	width: 78px;
	height: 40px;
	object-fit: contain;
	filter: grayscale(1) contrast(1.02) opacity(0.82);
	transition: filter 0.2s ease, transform 0.2s ease;
}
#partnersLogos .logoChip:hover,
#partnersLogos .logoChip:focus-visible {
	transform: translateY(-2px);
	border-color: rgba(120, 105, 90, 0.22);
	box-shadow: 0 16px 34px rgba(35, 28, 22, 0.12);
	outline: none;
}
#partnersLogos .logoChip:hover img,
#partnersLogos .logoChip:focus-visible img {
	filter: grayscale(0) contrast(1.06) opacity(1);
	transform: scale(1.03);
}

/* RWD */
@media (max-width: 1200px) {
	#partnersLogos .partnersLogos__grid {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
}
@media (max-width: 768px) {
	#partnersLogos .partnersLogos__grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
}
@media (max-width: 576px) {
	#partnersLogos .partnersLogos__grid {
		display: none;
	}
	#partnersLogos .partnersLogos__row {
		display: block;
	}
}

@media (prefers-reduced-motion: reduce) {
	#partnersLogos .logoTile,
	#partnersLogos .logoTile img,
	#partnersLogos .logoChip,
	#partnersLogos .logoChip img {
		transition: none !important;
	}
}
</style>
