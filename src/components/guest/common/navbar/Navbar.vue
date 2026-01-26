<template>
	<section>
		<header id="navbar">
			<div class="nav-wrap">
				<div class="nav-inner">
					<!-- Brand -->
					<RouterLink class="brand" :to="`/${currentLang}`">
						<img src="@/assets/images/logo/Logo.png" alt="logo" />
						<div class="brand-txt">
							社團法人<br />台灣跨世代共好推動協會
							<small>BRIGE Institute of Taiwan</small>
						</div>
					</RouterLink>

					<!-- Desktop nav -->
					<ul class="main-nav d-none d-lg-flex">
						<li>
							<RouterLink class="nav-linkx" :to="`/${currentLang}`">
								<span class="zh">首頁</span><span class="en">Home</span>
							</RouterLink>
						</li>

						<li class="js-mega">
							<button
								class="mega-trigger"
								type="button"
								aria-expanded="false"
								aria-controls="megaPanel"
							>
								<span class="zh">協會介紹</span><span class="en">About</span>
							</button>
						</li>

						<li class="js-mega">
							<button
								class="mega-trigger"
								type="button"
								aria-expanded="false"
								aria-controls="megaPanel"
							>
								<span class="zh">公告與活動</span
								><span class="en">News&Event</span>
							</button>
						</li>

						<li class="js-mega">
							<button
								class="mega-trigger"
								type="button"
								aria-expanded="false"
								aria-controls="megaPanel"
							>
								<span class="zh">主題課程與培訓</span
								><span class="en">Course&Training</span>
							</button>
						</li>

						<li class="js-mega">
							<button
								class="mega-trigger"
								type="button"
								aria-expanded="false"
								aria-controls="megaPanel"
							>
								<span class="zh">研究與出版</span
								><span class="en">Research</span>
							</button>
						</li>

						<!-- <li class="js-mega">
							<button
								class="mega-trigger"
								type="button"
								aria-expanded="false"
								aria-controls="megaPanel"
							>
								<span class="zh">會員專區</span><span class="en">Members</span>
							</button>
						</li> -->

						<li class="js-mega">
							<button
								class="mega-trigger"
								type="button"
								aria-expanded="false"
								aria-controls="megaPanel"
							>
								<span class="zh">合作夥伴</span><span class="en">Partners</span>
							</button>
						</li>

						<li class="js-mega">
							<button
								class="mega-trigger"
								type="button"
								aria-expanded="false"
								aria-controls="megaPanel"
							>
								<span class="zh">聯絡我們</span><span class="en">Contact</span>
							</button>
						</li>
					</ul>

					<!-- Actions -->
					<div class="nav-actions">
						<button
							class="btn-icon d-lg-none"
							type="button"
							data-bs-toggle="offcanvas"
							data-bs-target="#mobileNav"
							aria-controls="mobileNav"
							aria-label="Open menu"
						>
							<i class="bi bi-list" style="font-size: 22px"></i>
						</button>
					</div>
				</div>
			</div>

			<!-- overlay (click to close) -->
			<div class="mega-overlay" id="megaOverlay" aria-hidden="true"></div>

			<!-- Mega panel (FULL WIDTH) -->
			<div class="mega-panel" id="megaPanel" aria-hidden="true">
				<div class="mega-inner">
					<div class="mega-card">
						<div class="mega-row">
							<div class="mega-title">協會介紹</div>
							<div class="mega-links">
								<router-link
									:to="{ path: `/${currentLang}/about`, hash: '#sec-mission' }"
									>協會宗旨與理念
								</router-link>
								<!-- <router-link  :to="{ path: `/${currentLang}/about`, hash: '#sec-history' }">
									協會沿革(成立故事)
								</router-link> -->
								<router-link
									:to="{ path: `/${currentLang}/about`, hash: '#sec-chair' }"
									>理事長的話
								</router-link>
								<router-link
									:to="{ path: `/${currentLang}/about`, hash: '#sec-founder' }"
									>發起人的話
								</router-link>
								<router-link
									:to="{ path: `/${currentLang}/about`, hash: '#sec-bless' }"
									>特別嘉賓/貴賓賀詞
								</router-link>

								<!-- <router-link
									:to="{ path: `/${currentLang}/about`, hash: '#sec-team' }"
									>理監事、顧問團隊
								</router-link> -->
								<router-link
									:to="{ path: `/${currentLang}/about`, hash: '#sec-pdf' }"
									>協會章程
								</router-link>
							</div>
						</div>

						<div class="mega-row">
							<div class="mega-title">最新消息</div>
							<div class="mega-links">
								<router-link
									v-for="c in NewsclassList"
									:key="c.slug"
									:to="{
										name: 'newsListByCategory',
										params: { lang: currentLang, slug: c.slug },
									}"
								>
									{{ c.name }}
								</router-link>
							</div>
						</div>

						<div class="mega-row">
							<div class="mega-title">活動</div>
							<div class="mega-links">
								<router-link :to="{ path: `/${currentLang}/event`}">活動一覽</router-link>
								<!-- <a href="events-music.html">跨世代音樂饗宴</a>
								<a href="events-run.html">跨世代路跑</a>
								<a href="events-hakka.html">客家文化相關活動</a>
								<a href="events-plan-2026-2028.html">2026–2028 重大計畫一覽</a> -->
							</div>
						</div>

						<div class="mega-row">
							<div class="mega-title">主題課程</div>
							<div class="mega-links">
								<router-link :to="{ path: `/${currentLang}/course`}">主題課程一覽</router-link>
								<!-- <a href="course-memory.html">共創小時候的回憶</a>
								<a href="course-visit.html">幼老共下來作客</a>
								<a href="course-chorus.html">花樹下歌聲揚（老幼合唱）</a>
								<a href="course-boardgame.html">老幼大富翁（益智/桌遊）</a> -->
							</div>
						</div>

						<div class="mega-row">
							<div class="mega-title">人才培訓</div>
							<div class="mega-links">
								<!-- <a href="training-grand-teacher.html">爺奶教師（志工）培訓</a> -->
								<a href="#">培訓課程一覽</a>
								<!-- <a href="training-facilitator.html">老幼共學活動帶領員</a>
								<a href="training-designer.html">老幼共學課程規劃師</a>
								<a href="training-operator.html">老幼共學營運管理師</a> -->
								<!-- <a href="training-schedule.html">研習課程時間表</a> -->
								<!-- <a href="training-register.html">報名</a> -->
							</div>
						</div>

						<div class="mega-row">
							<div class="mega-title">研究與出版</div>
							<div class="mega-links">
								<a href="#">老幼共學實務應用（書籍介紹）</a>
								<a href="#">研究報告</a>
								<!-- <a href="research-open-materials.html">公開教材下載</a> -->
								<a href="#">AI × 跨世代教材及案例</a>
								<a href="#">SDGs × 跨世代行動計畫</a>
							</div>
						</div>

						<!-- <div class="mega-row">
							<div class="mega-title">會員專區</div>
							<div class="mega-links">
								<a href="members-join.html">入會方式（個人 / 團體 / 贊助）</a>
								<a href="members-apply.html">入會/贊助線上申請表</a>
								<a href="members-benefits.html">會員權益與費用</a>
								<a href="members-notices.html">最新會務公告（限會員）</a>
								<a href="members-minutes.html">理監事會議紀錄（限會員）</a>
								<a href="members-downloads.html">下載中心（章程、表單）</a>
							</div>
						</div> -->

						<div class="mega-row">
							<div class="mega-title">合作夥伴</div>
							<div class="mega-links">
								<a href="#">國內合作 NPO</a>
								<a href="#">國際合作 NPO</a>
								<a href="#">企業夥伴（CSR）</a>
								<!-- <a href="partners-howto.html">如何與協會合作</a> -->
							</div>
						</div>

						<div class="mega-row">
							<div class="mega-title">聯絡我們</div>
							<div class="mega-links">
								<a href="#">協會地址</a>
								<a href="#">Email</a>
								<a href="#">FB/IG/Threads/YouTube</a>
								<a href="#">線上留言表單</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile Offcanvas -->
			<NavbarMoblie />
		</header>
	</section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { RouterLink } from "vue-router";
import NavbarMoblie from "@/components/guest/common/navbar/NavbarMobile.vue";
import { getNewsClassList } from "@/api/main/service/news/newsClassService";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";

/* State */
const { currentLang } = useCurrentLang();
const NewsclassList = ref([]);
const isLoading = ref(true);

/* =============================
 * 載入最新消息分類
 * ============================ */
const loadNewsClassList = async () => {
	try {
		isLoading.value = true;
		const result = await getNewsClassList();
		NewsclassList.value = result;
	} catch (err) {
		console.error("getNewsList error:", err);
		NewsclassList.value = [];
	} finally {
		isLoading.value = false;
	}
};

// =============================
// ✅ 外層保存：用來卸載清理
// =============================
let tHeight = null;
let navbar = null;
let megaPanel = null;
let megaOverlay = null;
let triggers = [];
let isOpen = false;

let onResize = null;
let onWinLoad = null;
let onOverlayClick = null;
let onDocClick = null;
let onDocKeydown = null;
let onPanelClick = null;

const onTriggerClickMap = new Map();

onMounted(() => {
	loadNewsClassList();

	navbar = document.querySelector("#navbar");
	if (!navbar) return;

	triggers = [...navbar.querySelectorAll(".js-mega .mega-trigger")];
	megaPanel = navbar.querySelector("#megaPanel");
	megaOverlay = navbar.querySelector("#megaOverlay");

	isOpen = false;
	const isDesktop = () => window.matchMedia("(min-width: 992px)").matches;

	// ✅ 同步 navbar 高度：給 mega-panel 用，也給頁面撐出 fixed top 的空間
	function setNavHeight() {
		const h = Math.ceil(navbar.getBoundingClientRect().height);
		document.documentElement.style.setProperty("--nav-h", `${h}px`);
		document.body.style.paddingTop = `${h}px`;
	}

	setNavHeight();

	onWinLoad = () => setNavHeight();
	window.addEventListener("load", onWinLoad, { once: true });

	tHeight = setTimeout(setNavHeight, 250);

	// resize
	onResize = () => {
		setNavHeight();
		if (!isDesktop()) closeMega(true);
	};
	window.addEventListener("resize", onResize);

	// GSAP optional
	let tl = null;
	function ensureTL() {
		if (tl || typeof gsap === "undefined") return tl;

		gsap.set(megaPanel, { y: -8, opacity: 0 });
		gsap.set(megaOverlay, { opacity: 0 });

		tl = gsap
			.timeline({ paused: true })
			.to(megaOverlay, { opacity: 1, duration: 0.18, ease: "power1.out" }, 0)
			.to(
				megaPanel,
				{ y: 0, opacity: 1, duration: 0.22, ease: "power2.out" },
				0
			);

		return tl;
	}

	function setActive(btn) {
		triggers.forEach((t) => t.classList.remove("is-active"));
		if (btn) btn.classList.add("is-active");
	}

	function openMega(btn) {
		if (!isDesktop()) return;

		if (!isOpen) {
			isOpen = true;
			navbar.classList.add("mega-open");
			const anim = ensureTL();
			if (anim) anim.play(0);
		}

		setActive(btn);
		triggers.forEach((t) =>
			t.setAttribute("aria-expanded", t === btn ? "true" : "false")
		);
	}

	function closeMega(immediate = false) {
		if (!isDesktop()) return;

		isOpen = false;
		triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
		setActive(null);

		const anim = ensureTL();
		if (anim && !immediate) {
			anim.reverse();
			setTimeout(() => navbar.classList.remove("mega-open"), 220);
		} else {
			navbar.classList.remove("mega-open");
			if (anim) anim.pause(0).reverse(0);
		}
	}

	function toggleMega(btn) {
		if (!isDesktop()) return;

		const isSame = btn.classList.contains("is-active");
		if (!isOpen) openMega(btn);
		else {
			if (isSame) closeMega(false);
			else openMega(btn);
		}
	}

	// --- listeners ---
	triggers.forEach((btn) => {
		const handler = (e) => {
			e.preventDefault();
			e.stopPropagation();
			toggleMega(btn);
		};
		onTriggerClickMap.set(btn, handler);
		btn.addEventListener("click", handler);
	});

	onOverlayClick = () => closeMega(false);
	megaOverlay?.addEventListener("click", onOverlayClick);

	onDocClick = (e) => {
		if (!isDesktop()) return;
		if (!navbar.contains(e.target)) closeMega(false);
	};
	document.addEventListener("click", onDocClick);

	onDocKeydown = (e) => {
		if (e.key === "Escape") closeMega(false);
	};
	document.addEventListener("keydown", onDocKeydown);

	onPanelClick = (e) => {
		const a = e.target.closest("a");
		if (!a) return;
		closeMega(true);
	};
	megaPanel?.addEventListener("click", onPanelClick);
});

// ✅ 正確：setup 頂層註冊卸載清理（不放 onMounted 裡）
onBeforeUnmount(() => {
	if (tHeight) clearTimeout(tHeight);

	if (onResize) window.removeEventListener("resize", onResize);
	// ⚠️ 因為你 addEventListener("load", ..., { once: true })
	// 有可能已自動移除，但移除一下也沒壞處
	if (onWinLoad) window.removeEventListener("load", onWinLoad);

	triggers.forEach((btn) => {
		const handler = onTriggerClickMap.get(btn);
		if (handler) btn.removeEventListener("click", handler);
	});
	onTriggerClickMap.clear();

	if (megaOverlay && onOverlayClick)
		megaOverlay.removeEventListener("click", onOverlayClick);
	if (onDocClick) document.removeEventListener("click", onDocClick);
	if (onDocKeydown) document.removeEventListener("keydown", onDocKeydown);
	if (megaPanel && onPanelClick)
		megaPanel.removeEventListener("click", onPanelClick);

	// 保底：卸載時把狀態復原
	document.body.style.paddingTop = "";
	document.documentElement.style.removeProperty("--nav-h");
});
</script>
