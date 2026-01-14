<template>
	<section id="foundationBridge" class="foundationBridge">
		<div class="foundationBridge__bg" aria-hidden="true"></div>

		<!-- ✅ playful waves -->
		<svg
			class="foundationBridge__waves"
			viewBox="0 0 1440 320"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<path
				class="w1"
				d="M0,160 C180,220 320,110 520,150 C740,195 880,260 1080,200 C1260,145 1360,120 1440,150 L1440,320 L0,320 Z"
			/>
			<path
				class="w2"
				d="M0,210 C220,260 360,170 560,210 C760,250 910,310 1100,250 C1260,210 1360,190 1440,215 L1440,320 L0,320 Z"
			/>
		</svg>

		<!-- ✅ doodle curves -->
		<svg
			class="foundationBridge__doodles"
			viewBox="0 0 1200 520"
			aria-hidden="true"
		>
			<!-- dummy defs for glow so filter works here too -->
			<defs>
				<filter id="softGlowD" x="-40%" y="-40%" width="180%" height="180%">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			<path
				class="d1"
				d="M70,420 C180,320 250,470 360,380 C460,300 520,360 620,310"
				fill="none"
			/>
			<path
				class="d2"
				d="M820,120 C910,80 980,150 1060,110 C1120,80 1160,90 1180,70"
				fill="none"
			/>
			<path
				class="d3"
				d="M210,120 C290,60 360,140 440,95 C520,50 590,90 650,60"
				fill="none"
			/>
			<circle class="p1" cx="690" cy="410" r="6" />
			<circle class="p2" cx="980" cy="260" r="6" />
			<circle class="p3" cx="140" cy="250" r="6" />
		</svg>

		<!-- decorative bridge line (animated) -->
		<svg
			class="foundationBridge__bridge"
			viewBox="0 0 1200 520"
			aria-hidden="true"
		>
			<defs>
				<filter id="softGlowB" x="-40%" y="-40%" width="180%" height="180%">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				<linearGradient id="bridgeGrad" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stop-color="rgba(86,199,168,.0)" />
					<stop offset="0.35" stop-color="rgba(86,199,168,.55)" />
					<stop offset="0.75" stop-color="rgba(232,142,98,.55)" />
					<stop offset="1" stop-color="rgba(232,142,98,.0)" />
				</linearGradient>
			</defs>

			<circle class="bridgeDot" cx="200" cy="340" r="10" />
			<circle class="bridgeDot" cx="980" cy="160" r="10" />

			<path
				class="bridgePath"
				d="M200,340 C360,140 560,120 720,210 C820,270 900,250 980,160"
				fill="none"
			/>
			<path
				class="bridgePath2"
				d="M190,352 C360,168 560,150 710,235 C820,300 910,275 995,170"
				fill="none"
			/>
		</svg>

		<div class="container position-relative">
			<div class="foundationBridge__frame">
				<!-- left: image -->
				<div class="foundationBridge__media js-fb-media">
					<div class="mediaShape">
						<!-- logo -->
						<img src="@/assets/images/logo/Logo.png" alt="BRIDGE 跨世代共好" />
					</div>
				</div>

				<!-- right: content (KEEP YOUR COPY) -->
				<div class="foundationBridge__content">
					<div class="kicker js-fb-kicker">
						<span class="kickerLine"></span>
						<span class="kickerText">關於我們</span>
					</div>

					<h2 class="title js-fb-title">
						以【老幼共學】為起點<br />
						擁抱【跨世代共好】的願景
					</h2>

					<div class="desc js-fb-desc">
						<p>
							本會以跨世代（包括跨年齡、跨族群、跨區域、跨黨派等）共好為宗旨，推動其能異中求同、和諧共好為目標。
						</p>
						<p>
							我們有著一致的理念，就是希望在台灣這塊寶島土地上，無論年齡、性別、族群、區域、黨派等差異，都能夠跨越鴻溝共好共融。
							協會就像一座橋樑一樣，聯繫著這些差異，創造異中求同，特別是推動跨世代的共好。
						</p>
					</div>

					<div class="cta js-fb-cta">
						<a class="btnWarm" href="about.html">
							關於我們 <i class="bi bi-arrow-right"></i>
						</a>
					</div>
				</div>
				<!-- /content -->
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let ctx = null;

onMounted(() => {
	const root = document.querySelector("#foundationBridge");
	if (!root) return;

	// ✅ 手機/平板：完全不跑動畫（你原本的策略）
	const isDesktop = window.matchMedia("(min-width: 992px)").matches;
	if (!isDesktop) return;

	// ✅ 無障礙 / 省電：不跑動畫
	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;
	if (prefersReduced) return;

	ctx = gsap.context(() => {
		// =========================
		// Elements
		// =========================
		const media = root.querySelector(".js-fb-media");
		const kicker = root.querySelector(".js-fb-kicker");
		const title = root.querySelector(".js-fb-title");
		const desc = root.querySelector(".js-fb-desc");
		const cta = root.querySelector(".js-fb-cta");

		const bridgeSvg = root.querySelector(".foundationBridge__bridge");
		const path1 = root.querySelector(".bridgePath");
		const path2 = root.querySelector(".bridgePath2");
		const dots = root.querySelectorAll(".bridgeDot");

		const doodlePaths = root.querySelectorAll(
			".foundationBridge__doodles path"
		);
		const doodleDots = root.querySelectorAll(
			".foundationBridge__doodles circle"
		);

		// =========================
		// Helpers
		// =========================
		function prepDraw(p) {
			if (!p || !p.getTotalLength) return;
			const len = p.getTotalLength();
			p.style.strokeDasharray = `${len}`;
			p.style.strokeDashoffset = `${len}`;
		}

		// ✅ 延後：進入視窗才做 getTotalLength（減少首屏成本）
		let prepared = false;
		const prepareDrawOnce = () => {
			if (prepared) return;
			prepared = true;

			prepDraw(path1);
			prepDraw(path2);
			doodlePaths.forEach(prepDraw);
		};

		// =========================
		// Floating bridge (transform only)
		// =========================
		if (bridgeSvg) {
			gsap.set(bridgeSvg, { willChange: "transform", force3D: true });
			gsap.to(bridgeSvg, {
				y: -10,
				duration: 5.5,
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
			});
		}

		// =========================
		// Timeline (ScrollTrigger)
		// =========================
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: root,
				start: "top 75%",
				toggleActions: "play none none reverse",
				onEnter: prepareDrawOnce,
				onEnterBack: prepareDrawOnce,
			},
		});

		// 內容進場
		tl.fromTo(
			media,
			{ opacity: 0, y: 18, scale: 0.985 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.55,
				ease: "power2.out",
				force3D: true,
			},
			0
		)
			.fromTo(
				[kicker, title],
				{ opacity: 0, y: 14 },
				{
					opacity: 1,
					y: 0,
					duration: 0.55,
					ease: "power2.out",
					stagger: 0.08,
					force3D: true,
				},
				0.08
			)
			.fromTo(
				desc,
				{ opacity: 0, y: 12 },
				{ opacity: 1, y: 0, duration: 0.48, ease: "power2.out", force3D: true },
				0.18
			)
			.fromTo(
				cta,
				{ opacity: 0, y: 10 },
				{ opacity: 1, y: 0, duration: 0.42, ease: "power2.out", force3D: true },
				0.26
			);

		// ✅ Bridge line draw（維持原 timing）
		if (path1)
			tl.to(
				path1,
				{ strokeDashoffset: 0, duration: 0.75, ease: "power2.out" },
				0.05
			);
		if (path2)
			tl.to(
				path2,
				{ strokeDashoffset: 0, duration: 0.65, ease: "power2.out" },
				0.12
			);

		// ✅ Doodles draw（維持原 timing）
		if (doodlePaths.length) {
			tl.to(
				doodlePaths,
				{
					strokeDashoffset: 0,
					duration: 0.9,
					ease: "power2.out",
					stagger: 0.08,
				},
				0.06
			);
		}

		// ✅ Dots pop（維持原 timing）
		if (dots.length) {
			tl.fromTo(
				dots,
				{ scale: 0.7, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.35,
					stagger: 0.06,
					ease: "back.out(2)",
					force3D: true,
				},
				0.2
			);
		}
		if (doodleDots.length) {
			tl.fromTo(
				doodleDots,
				{ scale: 0.7, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.35,
					stagger: 0.06,
					ease: "back.out(2)",
					force3D: true,
				},
				0.22
			);
		}
	}, root);
});

onBeforeUnmount(() => {
	if (ctx) {
		ctx.revert();
		ctx = null;
	}
});
</script>

<style scoped>
/* ---ABOUT區塊--- */
/* =========================
   Foundation Bridge (Warm + Playful Curves) + PERF
   ========================= */
#foundationBridge.foundationBridge {
	--cream: #fbf7f2;
	--paper: rgba(255, 255, 255, 0.74);
	--ink: rgba(48, 42, 36, 0.9);
	--muted: rgba(58, 52, 46, 0.68);

	position: relative;
	padding: 72px 0;
	overflow: hidden;
	isolation: isolate;

	/* ✅ PERF: limit repaint spillover */
	contain: layout paint;
}

/* full width background: warm + gentle layers */
#foundationBridge .foundationBridge__bg {
	position: absolute;
	inset: 0;
	z-index: 0;

	background: radial-gradient(
			900px 420px at 18% 18%,
			rgba(255, 220, 195, 0.6),
			transparent 60%
		),
		radial-gradient(
			820px 420px at 84% 20%,
			rgba(205, 232, 221, 0.62),
			transparent 60%
		),
		radial-gradient(
			900px 500px at 55% 105%,
			rgba(170, 200, 255, 0.2),
			transparent 60%
		),
		linear-gradient(180deg, var(--cream) 0%, #f6faf8 55%, #f2f6f4 100%);

	/* ✅ PERF: 避免 multi fixed 造成 scroll 掉幀
	   - 預設全部 scroll 最穩
	   - 桌機若想保留一點 fixed 感 → 只留最後一層 fixed
	*/
	background-attachment: scroll, scroll, scroll, scroll;

	background-repeat: no-repeat;
	background-position: center, center, center, center;
	background-size: auto, auto, auto, cover;
}

@media (min-width: 992px) {
	#foundationBridge .foundationBridge__bg {
		/* ✅ 折衷：保留一點 fixed 但避免四層全 fixed */
		background-attachment: scroll, scroll, scroll, fixed;
	}
}

/* subtle paper grain (premium foundation vibe) */
#foundationBridge .foundationBridge__bg::after {
	content: "";
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

/* ✅ PERF: 行動裝置關 grain（混合模式合成較吃） */
@media (max-width: 991.98px) {
	#foundationBridge .foundationBridge__bg::after {
		display: none;
	}
}

/* ✅ playful waves at bottom */
#foundationBridge .foundationBridge__waves {
	position: absolute;
	left: 0;
	right: 0;
	bottom: -1px;
	width: 100%;
	height: 240px;
	z-index: 1;
	pointer-events: none;
	opacity: 0.95;
}
#foundationBridge .foundationBridge__waves .w1 {
	fill: rgba(255, 255, 255, 0.82);
}
#foundationBridge .foundationBridge__waves .w2 {
	fill: rgba(255, 255, 255, 0.58);
}

/* ✅ doodle curves (childlike but soft) */
#foundationBridge .foundationBridge__doodles {
	position: absolute;
	inset: 0;
	width: min(1300px, 98vw);
	height: auto;
	left: 50%;
	top: 45%;
	transform: translate(-50%, -55%) translateZ(0); /* ✅ 合成層穩定 */
	z-index: 1;
	pointer-events: none;
	opacity: 0.7;

	/* ✅ PERF hint */
	will-change: opacity;
}
#foundationBridge .foundationBridge__doodles .d1,
#foundationBridge .foundationBridge__doodles .d2,
#foundationBridge .foundationBridge__doodles .d3 {
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-width: 3;
	/* hand-drawn rhythm */
	stroke-dasharray: 10 9;
	filter: url(#softGlowD);
}
#foundationBridge .foundationBridge__doodles .d1 {
	stroke: rgba(232, 142, 98, 0.55);
}
#foundationBridge .foundationBridge__doodles .d2 {
	stroke: rgba(86, 199, 168, 0.55);
}
#foundationBridge .foundationBridge__doodles .d3 {
	stroke: rgba(170, 200, 255, 0.55);
}
#foundationBridge .foundationBridge__doodles .p1,
#foundationBridge .foundationBridge__doodles .p2,
#foundationBridge .foundationBridge__doodles .p3 {
	fill: rgba(255, 255, 255, 0.95);
	stroke: rgba(80, 70, 60, 0.18);
	stroke-width: 2;
	filter: url(#softGlowD);
}

/* bridge svg sits behind content (signature) */
#foundationBridge .foundationBridge__bridge {
	position: absolute;
	inset: 0;
	width: min(1200px, 92vw);
	height: auto;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%) translateZ(0); /* ✅ 合成層穩定 */
	z-index: 1;
	opacity: 0.9;
	pointer-events: none;

	/* ✅ PERF hint */
	will-change: transform, opacity;
}

/* path styles */
#foundationBridge .bridgePath {
	stroke: url(#bridgeGrad);
	stroke-width: 6;
	stroke-linecap: round;
	filter: url(#softGlowB);
	opacity: 0.95;
}
#foundationBridge .bridgePath2 {
	stroke: rgba(255, 255, 255, 0.7);
	stroke-width: 2;
	stroke-linecap: round;
	opacity: 0.55;
}
#foundationBridge .bridgeDot {
	fill: rgba(255, 255, 255, 0.95);
	stroke: rgba(80, 70, 60, 0.22);
	stroke-width: 2;
	filter: url(#softGlowB);
}

/* ✅ PERF: 手機/平板不跑動畫時，順便關掉重的 svg filter（視覺差異小，成本差很大） */
@media (max-width: 991.98px) {
	#foundationBridge .foundationBridge__doodles .d1,
	#foundationBridge .foundationBridge__doodles .d2,
	#foundationBridge .foundationBridge__doodles .d3,
	#foundationBridge .foundationBridge__doodles .p1,
	#foundationBridge .foundationBridge__doodles .p2,
	#foundationBridge .foundationBridge__doodles .p3,
	#foundationBridge .bridgePath,
	#foundationBridge .bridgeDot {
		filter: none !important;
	}
}

/* main frame card (signature shape) */
#foundationBridge .foundationBridge__frame {
	position: relative;
	z-index: 2;

	display: grid;
	grid-template-columns: 420px 1fr;
	gap: 28px;
	align-items: center;

	padding: 22px;
	border-radius: 28px;

	background: var(--paper);
	border: 1px solid rgba(40, 40, 40, 0.08);
	box-shadow: 0 24px 80px rgba(25, 30, 30, 0.12),
		0 2px 0 rgba(255, 255, 255, 0.4) inset;

	/* ✅ blur 卡片質感（桌機保留） */
	backdrop-filter: blur(7px);
}

/* ✅ PERF: 行動裝置關掉 backdrop-filter，用較實的紙感補回 */
@media (max-width: 991.98px) {
	#foundationBridge .foundationBridge__frame {
		backdrop-filter: none;
		background: rgba(255, 255, 255, 0.86);
	}
}

/* “soft cut” highlight corner */
#foundationBridge .foundationBridge__frame::before {
	content: "";
	position: absolute;
	right: -60px;
	top: -70px;
	width: 220px;
	height: 220px;
	border-radius: 60px;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 255, 255, 0.75),
		rgba(255, 255, 255, 0) 65%
	);
	transform: rotate(16deg);
	opacity: 0.9;
	pointer-events: none;
}

/* media block */
#foundationBridge .foundationBridge__media {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

/* warm organic shape */
#foundationBridge .mediaShape {
	width: 100%;
	max-width: 420px;
	height: 360px;
	border-radius: 26px 80px 28px 80px; /* signature rhythm */
	overflow: hidden;
	background: #fff;
	border: 1px solid rgba(40, 40, 40, 0.08);
	box-shadow: 0 18px 55px rgba(18, 35, 35, 0.1);
	position: relative;
}
#foundationBridge .mediaShape::after {
	content: "";
	position: absolute;
	inset: 0;
	background: radial-gradient(
			520px 260px at 30% 20%,
			rgba(255, 240, 225, 0.35),
			transparent 60%
		),
		linear-gradient(120deg, rgba(0, 0, 0, 0.04), transparent 55%);
	pointer-events: none;
}
#foundationBridge .mediaShape img {
	width: 100%;
	height: 100%;
	object-fit: contain; /* 若是 logo 想完整顯示 → contain */
	display: block;
}

/* content */
#foundationBridge .foundationBridge__content {
	padding: 10px 10px 10px 6px;
}

#foundationBridge .kicker {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 12px;
}
#foundationBridge .kickerLine {
	width: 54px;
	height: 2px;
	border-radius: 999px;
	background: rgba(130, 110, 90, 0.55);
}
#foundationBridge .kickerText {
	font-weight: 900;
	letter-spacing: 0.18em;
	font-size: 24px;
	color: rgba(80, 70, 60, 0.7);
}

/* title */
#foundationBridge .title {
	margin: 0 0 14px;
	font-weight: 950;
	letter-spacing: 0.06em;
	line-height: 1.18;
	font-size: 42px;
	color: var(--ink);
}

/* paragraphs */
#foundationBridge .desc p {
	margin: 0 0 14px;
	font-size: 17px;
	line-height: 2;
	color: var(--muted);
	max-width: 60ch;
}

/* CTA button */
#foundationBridge .cta {
	margin-top: 6px;
}
#foundationBridge .btnWarm {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	padding: 12px 18px;
	border-radius: 999px;

	text-decoration: none;
	font-weight: 900;
	letter-spacing: 0.12em;
	color: #fff;

	background: linear-gradient(
		180deg,
		rgba(232, 142, 98, 0.95) 0%,
		rgba(210, 120, 82, 0.95) 100%
	);
	box-shadow: 0 16px 40px rgba(210, 120, 82, 0.22);
	transition: transform 0.18s ease, filter 0.18s ease;
}
#foundationBridge .btnWarm:hover {
	transform: translateY(-1px);
	filter: brightness(0.98);
}

/* ✅ PERF: 觸控裝置避免 hover sticky */
@media (hover: none) {
	#foundationBridge .btnWarm:hover {
		transform: none;
		filter: none;
	}
}

/* RWD */
@media (max-width: 991.98px) {
	#foundationBridge.foundationBridge {
		padding: 56px 0;
	}
	#foundationBridge .foundationBridge__frame {
		grid-template-columns: 1fr;
		padding: 18px;
		border-radius: 24px;
	}
	#foundationBridge .mediaShape {
		height: 260px;
		border-radius: 22px 66px 22px 66px;
	}
	#foundationBridge .title {
		font-size: 32px;
	}
	#foundationBridge .desc p {
		max-width: none;
	}
	#foundationBridge .foundationBridge__bridge {
		width: 105vw;
		opacity: 0.65;
	}
	#foundationBridge .foundationBridge__doodles {
		opacity: 0.45;
	}
	#foundationBridge .foundationBridge__waves {
		height: 200px;
	}
}
@media (max-width: 575.98px) {
	#foundationBridge .title {
		font-size: 28px;
	}
}
</style>
