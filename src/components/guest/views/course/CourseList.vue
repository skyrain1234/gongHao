<template>
	<section id="themeCoursesCartoon" class="themeCoursesCartoon">
		<!-- 背景裝飾 -->
		<div class="tccBg" aria-hidden="true">
			<span class="tccWave w1"></span>
			<span class="tccWave w2"></span>
			<span class="tccConfetti c1"></span>
			<span class="tccConfetti c2"></span>
			<span class="tccConfetti c3"></span>
			<span class="tccCloud cl1"></span>
			<span class="tccCloud cl2"></span>
		</div>

		<div class="tccWrap">
			<!-- 標題 + 篩選 -->
			<header class="tccHead tcc-reveal">
				<div class="tccBadge">主題課程一覽</div>
				<h2 class="tccTitle">老幼一起玩、一起做、一起把回憶變成禮物</h2>
				<p class="tccDesc">
					這些課程把「互動」放在第一位：用歌聲、桌遊、故事與手作，讓不同世代在同一個節奏裡彼此看見。
				</p>

				<!-- Chip：顯示前 N 個；其餘放 Modal（可搜尋） -->
				<div class="tccChips" role="group" aria-label="主題篩選">
					<button class="tccChip is-active" type="button" data-filter="all">
						全部
					</button>

					<button
						class="tccChip"
						type="button"
						v-for="(it, idx) in topChips"
						:key="it.id ?? idx"
						:data-filter="it.name"
					>
						{{ it.name }}
					</button>

					<button
						class="tccChip tccChip--more"
						type="button"
						@click="openModal"
					>
						更多課程
					</button>
				</div>
			</header>

			<!-- 課程清單 -->
			<div class="tccList tcc-reveal" id="tccList">
				<article
					v-for="(value, idx) in courseList"
					:key="value.id ?? idx"
					class="tccItem"
					:class="itemThemeClass(idx)"
					:data-cat="value.name"
				>
					<!-- 左側：貼紙 + icon + hashtags -->
					<div class="tccItem__left">
						<div class="tccSticker" :class="stickerClass(idx)">
							{{ value.tag_top_left }}
						</div>

						<div class="tccIcon" :class="iconClass(idx)" aria-hidden="true">
							<span class="tccIcon__face"></span>
							<span class="tccIcon__spark s1"></span>
							<span class="tccIcon__spark s2"></span>
						</div>

						<div class="tccMeta">
							<span
								v-for="(h, hIdx) in topHashtags(value.hashtag)"
								:key="hIdx"
								class="tccPill"
								:class="{ 'tccPill--soft': hIdx > 0 }"
							>
								{{ h }}
							</span>
						</div>
					</div>

					<!-- 中間：內容 -->
					<div class="tccItem__main">
						<h3 class="tccItem__title">{{ value.name }}</h3>
						<p class="tccItem__text">{{ value.description }}</p>

						<div class="tccInfoRow">
							<div class="tccInfo">
								<div class="tccInfo__k">{{ value.tag_title_1 }}</div>
								<div class="tccInfo__v">{{ value.tag_content_1 }}</div>
							</div>
							<div class="tccInfo">
								<div class="tccInfo__k">{{ value.tag_title_2 }}</div>
								<div class="tccInfo__v">{{ value.tag_content_2 }}</div>
							</div>
							<div class="tccInfo">
								<div class="tccInfo__k">{{ value.tag_title_3 }}</div>
								<div class="tccInfo__v">{{ value.tag_content_3 }}</div>
							</div>
						</div>

						<div class="tccActions">
							<router-link
								class="tccBtn"
								:to="{
									name: 'course',
									params: { lang: route.params.lang, courseId: value.id },
								}"
								@click.prevent
								>查看課程內容 →
							</router-link>
						</div>
					</div>

					<!-- 右側：緞帶 + 塗鴉 -->
					<div class="tccItem__right" aria-hidden="true">
						<div class="tccRibbon">{{ value.tag_top_right }}</div>
						<div class="tccDoodle d1"></div>
						<div class="tccDoodle d2"></div>
						<div class="tccDoodle d3"></div>
					</div>
				</article>
			</div>

			<!-- CTA -->
			<!-- <div class="tccCta tcc-reveal">
				<div class="tccCta__inner">
					<div class="tccCta__title">想要「一場就有感」的主題課？</div>
					<div class="tccCta__text">
						告訴我們對象與場域，我們可以推薦最適合的組合。
					</div>
				</div>
				<a class="tccBtn tccBtn--cta" href="#" @click.prevent>我要諮詢 →</a>
			</div> -->
		</div>

		<!-- Modal：更多課程（可搜尋） -->
		<div v-if="isModalOpen" class="tccModal" @click.self="pickFilter('all')">
			<div
				class="tccModal__panel"
				role="dialog"
				aria-modal="true"
				aria-label="選擇課程篩選"
			>
				<div class="tccModal__head">
					<div class="tccModal__title">選擇課程</div>
					<button
						class="tccModal__close"
						type="button"
						@click="pickFilter('all')"
						aria-label="關閉"
					>
						✕
					</button>
				</div>

				<div class="tccModal__body">
					<input
						class="tccModal__search"
						type="search"
						v-model="modalQuery"
						placeholder="搜尋課程名稱…"
					/>

					<div class="tccModal__list">
						<button
							class="tccModal__item"
							type="button"
							v-for="(it, idx) in modalList"
							:key="it.id ?? idx"
							@click="pickFilter(it.name)"
						>
							{{ it.name }}
						</button>
					</div>
				</div>

				<div class="tccModal__foot">
					<button
						class="tccBtn tccBtn--ghost"
						type="button"
						@click="pickFilter('all')"
					>
						顯示全部
					</button>
					<button class="tccBtn" type="button" @click="pickFilter('all')">關閉</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick, computed } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getCourseList } from "@/api/main/service/course/courseService";
import { useRoute } from "vue-router";
gsap.registerPlugin(ScrollTrigger);
const route = useRoute();
/* ---------------------------------------
 * Data
 * ------------------------------------- */
const courseList = ref([]);

/* ---------------------------------------
 * Chips：只顯示前 N 個（其餘進 modal）
 * ------------------------------------- */
const CHIP_LIMIT = 4;
const topChips = computed(() => courseList.value.slice(0, CHIP_LIMIT));

/* ---------------------------------------
 * Modal（更多課程 + 搜尋）
 * ------------------------------------- */
const isModalOpen = ref(false);
const modalQuery = ref("");

const modalList = computed(() => {
	const q = modalQuery.value.trim().toLowerCase();
	if (!q) return courseList.value;
	return courseList.value.filter((x) =>
		String(x.name || "")
			.toLowerCase()
			.includes(q),
	);
});

function openModal() {
	isModalOpen.value = true;
	modalQuery.value = "";
}

function pickFilter(filterName) {

	// 套用 filter（沿用你原本 DOM 方式）
	applyFilter(filterName);
	playSequential();

	// chips active 同步：如果該課程在前 N 顆 chip 裡，會亮；否則回到「全部」亮
	const btn = rootEl?.querySelector(
		`.tccChip[data-filter="${cssEscapeAttr(filterName)}"]`,
	);
	if (btn) setActive(btn);
	else {
		const allBtn = rootEl?.querySelector(`.tccChip[data-filter="all"]`);
		if (allBtn) setActive(allBtn);
	}
}

// 只處理最常見會壞 selector 的字元（" \）
function cssEscapeAttr(v) {
	return String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/* ---------------------------------------
 * UI：四種樣式輪播（idx % 4）
 * ------------------------------------- */
const itemThemeClass = (idx) => {
	const themes = ["", "tccItem--mint", "tccItem--sky", "tccItem--alt"];
	return themes[idx % themes.length];
};

const iconClass = (idx) => {
	const icons = [
		"tccIcon--book",
		"tccIcon--heart",
		"tccIcon--mic",
		"tccIcon--dice",
	];
	return icons[idx % icons.length];
};

const stickerClass = (idx) => {
	const stickers = [
		"tccSticker--hot",
		"tccSticker--care",
		"tccSticker--go",
		"tccSticker--new",
	];
	return stickers[idx % stickers.length];
};

const topHashtags = (s) => {
	if (!s) return [];
	return String(s)
		.split(",")
		.map((x) => x.trim())
		.filter(Boolean)
		.slice(0, 3);
};

/* ---------------------------------------
 * DOM references（為了 unmount 清理）
 * ------------------------------------- */
let rootEl = null;
let chips = [];
let items = [];
let listEl = null;

let ioList = null;
let ioFade = null;

// 收集 chip click handler，unmount 才能 removeEventListener
const chipHandlers = new Map();

/* ---------------------------------------
 * API
 * ------------------------------------- */
const loadCourseList = async () => {
	try {
		const response = await getCourseList();
		courseList.value = response;
	} catch (err) {
		console.error("getCourseList error:", err);
		courseList.value = [];
	}
};

/* ---------------------------------------
 * Filter（沿用原本 DOM display 方式）
 * data-cat = value.name
 * ------------------------------------- */
function setActive(btn) {
	chips.forEach((c) => c.classList.toggle("is-active", c === btn));
}

function applyFilter(cat) {
	items.forEach((it) => {
		const ok = cat === "all" || it.getAttribute("data-cat") === cat;
		it.style.display = ok ? "" : "none";
		if (ok) it.classList.remove("is-in"); // allow replay
	});
}

/* ---------------------------------------
 * 星星爆炸：只注入一次；重播時重置動畫
 * ------------------------------------- */
function ensureBurst(el) {
	if (el.querySelector(".tccBurst")) return;

	const burst = document.createElement("span");
	burst.className = "tccBurst";
	burst.setAttribute("aria-hidden", "true");

	const colors = [
		"rgba(255,178,92,.92)",
		"rgba(126,199,255,.92)",
		"rgba(123,214,183,.92)",
		"rgba(199,163,255,.92)",
		"rgba(255,127,106,.92)",
	];

	const n = 10;
	for (let i = 0; i < n; i++) {
		const star = document.createElement("span");
		star.className = "tccStar";

		star.style.setProperty(
			"--col",
			colors[Math.floor(Math.random() * colors.length)],
		);

		const x = 70 + Math.random() * 22;
		const y = 10 + Math.random() * 22;

		const angle = ((-75 + Math.random() * 150) * Math.PI) / 180;
		const dist = 45 + Math.random() * 80;
		const tx = Math.cos(angle) * dist;
		const ty = Math.sin(angle) * dist;

		const d = Math.floor(Math.random() * 170);

		star.style.setProperty("--x", x + "%");
		star.style.setProperty("--y", y + "%");
		star.style.setProperty("--tx", tx.toFixed(1) + "px");
		star.style.setProperty("--ty", ty.toFixed(1) + "px");
		star.style.setProperty("--d", d + "ms");

		burst.appendChild(star);
	}

	el.appendChild(burst);
}

function replayStars(el) {
	const stars = el.querySelectorAll(".tccStar");
	stars.forEach((s) => {
		s.style.animation = "none";
		void s.offsetHeight;
		s.style.animation = "";
	});
}

/* ---------------------------------------
 * Sequential reveal（依序播放）
 * ------------------------------------- */
function playSequential() {
	const visible = items.filter((it) => it.style.display !== "none");
	visible.forEach((el, idx) => {
		ensureBurst(el);
		el.classList.remove("is-in");
		setTimeout(() => {
			el.classList.add("is-in");
			replayStars(el);
		}, idx * 140);
	});
}

/* ---------------------------------------
 * Lifecycle
 * ------------------------------------- */
onMounted(async () => {
	rootEl = document.querySelector("#themeCoursesCartoon");
	if (!rootEl) return;

	// 先抓資料，再等 DOM render 完（讓 v-for 產生 .tccItem/.tccChip）
	await loadCourseList();
	await nextTick();

	chips = Array.from(rootEl.querySelectorAll(".tccChip"));
	items = Array.from(rootEl.querySelectorAll(".tccItem"));
	listEl = rootEl.querySelector("#tccList");

	// chips click：為了 unmount 能移除，handler 存起來
	chips.forEach((btn) => {
		const handler = () => {
			setActive(btn);
			applyFilter(btn.dataset.filter);
			playSequential();
		};
		chipHandlers.set(btn, handler);
		btn.addEventListener("click", handler);
	});

	// list 進入視窗後播放一次 sequential
	ioList = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (!en.isIntersecting) return;
				playSequential();
				ioList.unobserve(en.target);
			});
		},
		{ threshold: 0.12 },
	);
	if (listEl) ioList.observe(listEl);

	// head/cta 進入視窗後加 is-in
	ioFade = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) en.target.classList.add("is-in");
			});
		},
		{ threshold: 0.12 },
	);

	const head = rootEl.querySelector(".tccHead");
	const cta = rootEl.querySelector(".tccCta");
	if (head) ioFade.observe(head);
	if (cta) ioFade.observe(cta);
});

onBeforeUnmount(() => {
	// observers
	if (ioList) {
		ioList.disconnect();
		ioList = null;
	}
	if (ioFade) {
		ioFade.disconnect();
		ioFade = null;
	}

	// chip events
	chips.forEach((btn) => {
		const handler = chipHandlers.get(btn);
		if (handler) btn.removeEventListener("click", handler);
	});
	chipHandlers.clear();

	// refs
	rootEl = null;
	chips = [];
	items = [];
	listEl = null;
});
</script>

<style scoped>
/* Modal */
.tccModal {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.45);
	display: grid;
	place-items: center;
	padding: 16px;
	z-index: 9999;
}
.tccModal__panel {
	width: min(720px, 100%);
	background: #fff7ec;
	border-radius: 18px;
	box-shadow: 0 20px 80px rgba(0, 0, 0, 0.25);
	overflow: hidden;
}
.tccModal__head,
.tccModal__foot {
	padding: 14px 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
}
.tccModal__title {
	font-weight: 700;
}
.tccModal__close {
	border: 0;
	background: transparent;
	font-size: 18px;
	cursor: pointer;
}
.tccModal__body {
	padding: 0 16px 16px;
}
.tccModal__search {
	width: 100%;
	padding: 10px 12px;
	border-radius: 12px;
	border: 1px solid rgba(0, 0, 0, 0.12);
	margin-bottom: 12px;
}
.tccModal__list {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 10px;
	max-height: min(52vh, 520px);
	overflow: auto;
	padding-right: 4px;
}
@media (max-width: 520px) {
	.tccModal__list {
		grid-template-columns: 1fr;
	}
}
.tccModal__item {
	text-align: left;
	padding: 10px 12px;
	border-radius: 12px;
	border: 2px solid rgba(0, 0, 0, 0.1);
	background: rgba(255, 255, 255, 0.7);
	cursor: pointer;
	font-weight: 1000;
	box-shadow: 1px 0px 5px rgba(46, 42, 37, 0.1);
}
.tccModal__item:hover {
	background: rgba(255, 178, 92, 0.4);
}
</style>
