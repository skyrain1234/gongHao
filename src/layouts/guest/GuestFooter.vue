<template>
	<!-- FOOTER -->
	<footer id="siteFooter" class="siteFooter" aria-label="網站頁尾">
		<div class="siteFooter__wrap">
			<div class="siteFooter__grid">
				<!-- LEFT -->
				<div class="siteFooter__left">
					<div class="siteFooter__brand">
						<!-- LOGO（請換成你的檔案） -->
						<img
							class="siteFooter__logo"
							src="@/assets/images/logo-white.png"
							alt="BRIDGE Institute of Taiwan"
						/>
						<div class="siteFooter__brandText">
							<div class="siteFooter__zh">
								社團法人<br />台灣跨世代共好推動協會
							</div>
							<div class="siteFooter__en">BRIDGE Institute of Taiwan</div>
						</div>
					</div>

					<div class="siteFooter__divider"></div>

					<ul class="siteFooter__social" aria-label="社群連結">
						<li>
							<a
								class="siteFooter__icon"
								href="#"
								target="_blank"
								rel="noreferrer"
								aria-label="Facebook"
							>
								<!-- facebook -->
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path
										d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.89h-2.32v6.99A10 10 0 0 0 22 12Z"
									/>
								</svg>
							</a>
						</li>
						<li>
							<a
								class="siteFooter__icon"
								href="#"
								target="_blank"
								rel="noreferrer"
								aria-label="Instagram"
							>
								<!-- instagram -->
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path
										d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4.5A5.5 5.5 0 1 1 6.5 12 5.51 5.51 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 10.5ZM18 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
									/>
								</svg>
							</a>
						</li>
						<li>
							<a
								class="siteFooter__icon"
								href="#"
								target="_blank"
								rel="noreferrer"
								aria-label="Threads"
							>
								<!-- threads (簡化版) -->
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path
										d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm5.23 12.44c-.36 2.55-2.15 4.26-4.94 4.26-3.31 0-5.4-2.35-5.4-6.36 0-3.9 2.1-6.34 5.4-6.34 2.73 0 4.47 1.42 4.91 3.66h-2.08c-.33-1.17-1.23-1.8-2.83-1.8-2.02 0-3.25 1.57-3.25 4.48 0 2.94 1.22 4.52 3.25 4.52 1.54 0 2.45-.64 2.79-1.79-.79.62-1.85.97-3.07.97v-1.73c1.53 0 2.76-.42 3.62-1.18-.58-.77-1.63-1.23-3.06-1.23v-1.72c1.92 0 3.44.63 4.34 1.72.17.2.32.42.44.65.05.09.09.18.13.27.03.07.05.13.07.2.11.31.16.64.12.95Z"
									/>
								</svg>
							</a>
						</li>
						<li>
							<a
								class="siteFooter__icon"
								href="#"
								target="_blank"
								rel="noreferrer"
								aria-label="YouTube"
							>
								<!-- youtube -->
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path
										d="M21.6 7.2a3 3 0 0 0-2.1-2.12C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.48A3 3 0 0 0 2.4 7.2 31.5 31.5 0 0 0 2 12a31.5 31.5 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.12c1.8.48 7.5.48 7.5.48s5.7 0 7.5-.48a3 3 0 0 0 2.1-2.12A31.5 31.5 0 0 0 22 12a31.5 31.5 0 0 0-.4-4.8ZM10 15.3V8.7L16 12l-6 3.3Z"
									/>
								</svg>
							</a>
						</li>
						<li>
							<a
								class="siteFooter__icon"
								href="#"
								target="_blank"
								rel="noreferrer"
								aria-label="X"
							>
								<!-- X -->
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path
										d="M18.9 2H22l-6.8 7.78L23 22h-6.8l-5.3-7.1L4.7 22H2l7.3-8.35L1 2h6.9l4.8 6.4L18.9 2Zm-1.2 18h1.9L7.2 3.9H5.1L17.7 20Z"
									/>
								</svg>
							</a>
						</li>
					</ul>

					<div class="siteFooter__meta">
						<div class="siteFooter__line">
							<span class="k">地址：</span
							><span class="v">新竹縣湖口鄉中平路一段755-1號</span>
						</div>
						<div class="siteFooter__line">
							<span class="k">EMAIL：</span
							><a
								class="siteFooter__mail v"
								href="mailto:bridge.institute2025@hotmail.com"
								>bridge.institute2025@hotmail.com</a
							>
						</div>
					</div>
				</div>

				<!-- RIGHT -->
				<nav class="siteFooter__nav" aria-label="頁尾導覽">
					<div class="siteFooter__cols">
						<section class="siteFooter__col">
							<h3 class="siteFooter__h">協會介紹</h3>
							<a class="siteFooter__a" href="#">協會宗旨與理念</a>
							<a class="siteFooter__a" href="#">協會沿革（成立故事）</a>
							<a class="siteFooter__a" href="#">理事長的話</a>
							<a class="siteFooter__a" href="#">發起人的話</a>
							<a class="siteFooter__a" href="#">特別嘉賓/貴賓賀詞</a>
							<a class="siteFooter__a" href="#">理監事、顧問團隊</a>
							<a class="siteFooter__a" href="#">協會章程（可下載 PDF）</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">最新消息</h3>
							<a class="siteFooter__a" href="#">公告</a>
							<a class="siteFooter__a" href="#">活動花絮</a>
							<a class="siteFooter__a" href="#">媒體報導</a>
							<a class="siteFooter__a" href="#">出版品 / 研究成果發佈</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">老幼共學主題課程</h3>
							<a class="siteFooter__a" href="#">共創小時候的回憶</a>
							<a class="siteFooter__a" href="#">幼老共玩樂作夥</a>
							<a class="siteFooter__a" href="#">花樣下歌聲（老幼合唱）</a>
							<a class="siteFooter__a" href="#">老幼大富翁（益智/桌遊）</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">活動</h3>
							<a class="siteFooter__a" href="#">跨世代音樂饗宴</a>
							<a class="siteFooter__a" href="#">跨世代路跑</a>
							<a class="siteFooter__a" href="#">客家文化相關活動</a>
							<a class="siteFooter__a" href="#">重大計畫一覽</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">課程與人才培訓</h3>
							<a class="siteFooter__a" href="#">簡易教師（志工）培訓</a>
							<a class="siteFooter__a" href="#">老幼共學課程規劃師</a>
							<a class="siteFooter__a" href="#">老幼共學營運管理師</a>
							<a class="siteFooter__a" href="#">研習課程時間表與報名</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">研究與出版</h3>
							<a class="siteFooter__a" href="#">老幼共學實務應用</a>
							<a class="siteFooter__a" href="#">研究報告</a>
							<a class="siteFooter__a" href="#">公開教材下載</a>
							<a class="siteFooter__a" href="#">AI × 跨世代教材及案例</a>
							<a class="siteFooter__a" href="#">SDGs × 跨世代行動計畫</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">會員專區</h3>
							<a class="siteFooter__a" href="#">入會方式（個人/團體/贊助）</a>
							<a class="siteFooter__a" href="#">入會/贊助線上申請表</a>
							<a class="siteFooter__a" href="#">會員權益與費用</a>
							<a class="siteFooter__a" href="#">最新會員公告（限會員）</a>
							<a class="siteFooter__a" href="#">理監事會議紀錄（限會員）</a>
							<a class="siteFooter__a" href="#">下載中心（章程、表單）</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">合作夥伴</h3>
							<a class="siteFooter__a" href="#">國內合作 NPO</a>
							<a class="siteFooter__a" href="#">國際合作 NPO</a>
							<a class="siteFooter__a" href="#">企業夥伴（CSR）</a>
							<a class="siteFooter__a" href="#">如何與協會合作</a>
						</section>

						<section class="siteFooter__col">
							<h3 class="siteFooter__h">聯絡我們</h3>
							<a class="siteFooter__a" href="#">Email</a>
							<a class="siteFooter__a" href="#">FB</a>
							<a class="siteFooter__a" href="#">IG</a>
							<a class="siteFooter__a" href="#">Threads</a>
							<a class="siteFooter__a" href="#">YouTube</a>
							<a class="siteFooter__a" href="#">線上留言表單</a>
						</section>
					</div>
				</nav>
			</div>

			<!-- bottom line -->
			<div class="siteFooter__bottom">
				<div class="siteFooter__bottomLine"></div>
				<div class="siteFooter__copyright">
					<span>Copyright © 2025 社團法人 台灣跨世代共好推動協會</span>
					<span class="siteFooter__sep">　　</span>
					<span>Design by 華越資通</span>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
import { useWebSettingStore } from "@/stores/webSetting";
import { computed } from "vue";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";

const { currentLang } = useCurrentLang();

const store = useWebSettingStore();
const webSetting = computed(() => store.webSetting);
const currentYear = new Date().getFullYear();

const props = defineProps({
	variant: {
		type: String,
		default: "default",
	},
});
</script>

<style scoped>
/* =========================
   Footer (match your mock)
   ========================= */
#siteFooter.siteFooter {
	--bg: #7e7e7e; /* 截圖那種霧灰 */
	--text: rgba(255, 255, 255, 0.92);
	--muted: rgba(255, 255, 255, 0.72);
	--line: rgba(255, 255, 255, 0.55);
	--hover: #ffffff;

	background: var(--bg);
	color: var(--text);
}

.siteFooter__wrap {
	max-width: 1320px;
	margin: 0 auto;
	padding: 52px 24px 18px;
}

.siteFooter__grid {
	display: grid;
	grid-template-columns: 420px 1fr; /* 左大塊＋右多欄 */
	gap: 56px;
	align-items: start;
}

/* LEFT */
.siteFooter__brand {
	display: flex;
	align-items: center;
	gap: 18px;
}

.siteFooter__logo {
	width: 120px;
	height: auto;
	display: block;
	filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.06));
}

.siteFooter__brandText {
	line-height: 1.25;
}
.siteFooter__zh {
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0.08em;
}
.siteFooter__en {
	margin-top: 6px;
	font-size: 12px;
	letter-spacing: 0.08em;
	color: var(--muted);
}

.siteFooter__divider {
	width: 72%;
	height: 1px;
	background: var(--line);
	margin: 18px 0 16px;
}

.siteFooter__social {
	list-style: none;
	padding: 0;
	margin: 0 0 16px;
	display: flex;
	gap: 14px;
	align-items: center;
}
.siteFooter__icon {
	width: 34px;
	height: 34px;
	border-radius: 999px;
	display: grid;
	place-items: center;
	text-decoration: none;
	border: 1px solid rgba(255, 255, 255, 0.25);
	transition: transform 0.18s ease, background 0.18s ease,
		border-color 0.18s ease;
}
.siteFooter__icon svg {
	width: 18px;
	height: 18px;
	fill: rgba(255, 255, 255, 0.9);
}
.siteFooter__icon:hover {
	transform: translateY(-2px);
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.45);
}

.siteFooter__meta {
	font-size: 13px;
	color: var(--muted);
	letter-spacing: 0.02em;
}
.siteFooter__line {
	margin: 10px 0;
	display: flex;
	gap: 10px;
}
.siteFooter__line .k {
	width: 74px; /* 讓「地 址 / EMAIL」對齊 */
	flex: 0 0 auto;
	color: rgba(255, 255, 255, 0.84);
	letter-spacing: 0.14em;
}
.siteFooter__line .v {
	color: var(--muted);
}
.siteFooter__mail {
	color: var(--muted);
	text-decoration: none;
	border-bottom: 1px solid rgba(255, 255, 255, 0.28);
	padding-bottom: 1px;
}
.siteFooter__mail:hover {
	color: var(--hover);
	border-bottom-color: rgba(255, 255, 255, 0.6);
}

/* RIGHT NAV */
.siteFooter__cols {
	display: grid;
	grid-template-columns: repeat(
		5,
		minmax(140px, 1fr)
	); /* 你截圖大概 5 欄一排 */
	gap: 22px 34px;
}

.siteFooter__col {
	min-width: 140px;
}

.siteFooter__h {
	font-size: 15px;
	margin: 0 0 10px;
	font-weight: 800;
	letter-spacing: 0.08em;
	color: rgba(255, 255, 255, 0.94);
}

.siteFooter__a {
	display: block;
	font-size: 13px;
	line-height: 1.9;
	color: rgba(255, 255, 255, 0.7);
	text-decoration: none;
	letter-spacing: 0.02em;
	transition: color 0.15s ease, transform 0.15s ease;
}
.siteFooter__a:hover {
	color: rgba(255, 255, 255, 0.95);
	transform: translateX(2px);
}

/* BOTTOM */
.siteFooter__bottom {
	margin-top: 34px;
}
.siteFooter__bottomLine {
	height: 1px;
	background: var(--line);
	width: 100%;
	margin-bottom: 12px;
}
.siteFooter__copyright {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.78);
	text-align: center;
	letter-spacing: 0.04em;
}

/* =========================
   RWD
   ========================= */
@media (max-width: 1100px) {
	.siteFooter__grid {
		grid-template-columns: 380px 1fr;
		gap: 40px;
	}
	.siteFooter__cols {
		grid-template-columns: repeat(4, minmax(140px, 1fr));
	}
}
@media (max-width: 920px) {
	.siteFooter__grid {
		grid-template-columns: 1fr;
	}
	.siteFooter__divider {
		width: 100%;
	}
	.siteFooter__cols {
		grid-template-columns: repeat(3, minmax(140px, 1fr));
	}
}
@media (max-width: 640px) {
	.siteFooter__wrap {
		padding: 42px 16px 16px;
	}
	.siteFooter__brand {
		gap: 14px;
	}
	.siteFooter__logo {
		width: 96px;
	}
	.siteFooter__cols {
		grid-template-columns: repeat(2, minmax(140px, 1fr));
		gap: 18px 18px;
	}
	.siteFooter__line {
		flex-direction: column;
		gap: 6px;
	}
	.siteFooter__line .k {
		width: auto;
	}
}
</style>
