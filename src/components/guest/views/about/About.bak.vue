<template>
	<section
		id="assocAboutWrap"
		class="fwAbout"
		aria-label="協會介紹大區塊（基金會風格）"
	>
		<!-- 大背景（紙感 + 水彩） -->
		<div class="fwBg" aria-hidden="true">
			<div class="paper"></div>
			<span class="wash w1"></span>
			<span class="wash w2"></span>
			<span class="wash w3"></span>
		</div>

		<div class="fwInner">
			<!-- 頁首 -->
			<!-- 大 LOGO 區塊（替換原本 fwLogoBar） -->
			<section class="fwHeroLogo" aria-label="協會 Logo 主視覺">
				<div class="fwHeroLogo__inner">
					<div class="fwHeroLogo__logo">
						<!-- 換成你的 LOGO -->
						<img
							src="@/assets/images/logo/Logo.png"
							alt="社團法人台灣跨世代共好推動協會 Logo"
						/>
					</div>

					<div class="fwHeroLogo__content">
						<div class="fwHeroLogo__badge">BRIDGE Institute of Taiwan</div>
						<h2 class="fwHeroLogo__name">社團法人台灣跨世代共好推動協會</h2>
						<p class="fwHeroLogo__tagline">
							以溫柔而務實的方式，推動跨世代共學與社區支持。
						</p>
					</div>
				</div>
			</section>

			<!-- 1 -->
			<section id="sec-mission" class="fwSec">
				<header class="fwSecHead">
					<span class="fwKicker">MISSION</span>
					<h2 class="fwH2">協會宗旨與理念</h2>
					<p class="fwDesc">
						以共學、陪伴、連結為核心，打造能被看見、被支持的友善網絡。
					</p>
				</header>

				<div class="fwGrid two">
					<article class="fwCard reveal">
						<div class="fwCard__label">本會宗旨</div>
						<p class="fwP">
							本會以跨世代 (包括跨年齡、跨性別、跨族群、跨區域、跨黨派等)
							共好為宗旨， 推動其能異中求同、和諧共好為目標。
						</p>
						<p class="fwP">
							協會未來擬結合社區、學校、據點、非營利組織及政府力量，
							舉辦各項共學、共創、共融、共好活動，
							並協助政府推動關懷與扶助弱勢群體之政策執行。
						</p>
						<div class="fwChips">
							<span>共學</span><span>陪伴</span><span>連結</span
							><span>共好</span>
						</div>
					</article>

					<article class="fwCard fwCard--tint reveal">
						<div class="fwCard__label">核心價值</div>
						<ul class="fwList">
							<li><b>尊重差異</b>：理解不同世代的節奏與需求</li>
							<li><b>一起參與</b>：以共學創造自然互動與連結</li>
							<li><b>溫柔堅定</b>：把善意做成可落地的服務</li>
							<li><b>長期陪伴</b>：擴散到更多社區與家庭</li>
						</ul>
					</article>
				</div>
			</section>

			<!-- 2 -->
			<section id="sec-history" class="fwSec">
				<header class="fwSecHead">
					<span class="fwKicker">STORY</span>
					<h2 class="fwH2">協會沿革</h2>
					<p class="fwDesc">用時間軸呈現：起心動念 → 籌備 → 成立 → 里程碑。</p>
				</header>

				<div class="fwTimeline">
					<div class="fwT">
						<div class="fwT__line"></div>
						<article class="fwCard fwT__card reveal">
							<div class="fwMeta">202X｜起心動念</div>
							<div class="fwTtl">看見需求，聚集夥伴</div>
							<p class="fwSmall">
								從社區與課程現場出發，逐步形成跨世代共學的構想與初版方案。
							</p>
						</article>
					</div>

					<div class="fwT">
						<div class="fwT__line"></div>
						<article class="fwCard fwT__card reveal">
							<div class="fwMeta">202X｜籌備啟動</div>
							<div class="fwTtl">把願景做成行動設計</div>
							<p class="fwSmall">
								整合教育、社工、醫療與志工資源，建立課程與合作模式。
							</p>
						</article>
					</div>

					<div class="fwT">
						<div class="fwT__line"></div>
						<article class="fwCard fwT__card reveal">
							<div class="fwMeta">202X｜正式成立</div>
							<div class="fwTtl">制度化與長期推動</div>
							<p class="fwSmall">
								建立治理架構與培力流程，讓服務可延續、可擴散。
							</p>
						</article>
					</div>
				</div>
			</section>

			<!-- 3 -->
			<section id="sec-chair" class="fwSec">
				<header class="fwSecHead">
					<span class="fwKicker">MESSAGE</span>
					<h2 class="fwH2">理事長的話</h2>
					<!-- <p class="fwDesc">理事長的話</p> -->
				</header>

				<div class="fwGrid two reveal">
					<article class="fwCard fwQuote">
						<div class="fwCard__label">
							以【老幼共學】為起點，擁抱【跨世代共好】的願景
						</div>
						<p class="fwQuote__text">
							&emsp;&emsp;
							114年春暖花開之際，阿斌老師在新竹湖口佳佳幼兒園上完第一堂的老幼合唱團－【花樹下歌聲揚】課程，課後和園長葉桂娥一邊用餐、一邊閑聊著。我們深感老幼共學光靠著計畫的補助推動是遠遠不夠的，必須要有更多的人參與，集合眾人的智慧及經驗，才有辦法朝永續發展的方向前進。
						</p>
						<p class="fwQuote__text">
							&emsp;&emsp;因此當下我們就決定成立【台灣跨世代共好推動協會】，以最快的速度完成了發起人的籌組，裡面包含了大學教授、幼兒園業者與教師、照顧服務業、律師、地方民代、體適能教練、保險金融業、休閒旅遊業…等各行各業代表，這些人才，都是未來在推動跨世代共好相關活動時最強的後盾與最大的助力。
						</p>
						<p class="fwQuote__text">
							&emsp;&emsp;
							我們有著一致的理念，就是希望在台灣這塊寶島土地上，無論年齡、性別、族群、區域、黨派等差異，都能夠跨越鴻溝共好共融。協會就像一座橋樑一樣，聯繫著這些差異，創造異中求同，特別是推動跨世代的共好。因此，協會的英文名稱為Building
							Relationships In Diverse Generational Exchange Institute of
							Taiwan，縮寫為BRIDGE Institute of
							Taiwan，就是代表了橋樑、溝通、共好的概念。
						</p>
						<div class="fwSign">
							<div class="fwName">理事長｜張善斌</div>
							<div class="fwRole">社團法人台灣跨世代共好推動協會</div>
						</div>
					</article>

					<aside class="fwCard fwPhoto">
						<div class="fwPhoto__box">
							<!-- 換成你的圖 -->
							<img
								src="@/assets/images/about/Zhang-Shan-Bin.jpg"
								alt="理事長照片"
							/>
						</div>
						<div class="fwHint">
							&emsp;&emsp;張善斌博士，福建與苗栗客家混血兒，生於臺北市。畢業於國立臺灣大學資訊工程學系，在校期間最常出沒的地方卻是合唱團與游泳池，音樂與運動也因此成為人生中持續陪伴的重要元素。
							畢業後考取淡江大學管理科學研究所，服役後移居臺中，先後任教於南開、嶺東及朝陽科技大學，並於國立雲林科技大學取得管理博士學位。
						</div>
						<div class="fwHint">
							&emsp;&emsp;
							秉持跨領域與斜槓精神，他曾參與超過七個合唱團，並取得音樂照顧、健身教練、高齡體適能指導員與健康管理師等多項證照，持續在教育、健康與高齡服務之間實踐整合與創新。
							現任教於朝陽科技大學銀髮產業管理系，並擔任社團法人台灣跨世代共好推動協會創始會員暨首任理事長，致力於搭起不同世代之間理解與共好的橋樑。
						</div>
					</aside>
				</div>
			</section>

			<!-- 4 -->
			<section id="sec-founder" class="fwSec">
				<header class="fwSecHead">
					<span class="fwKicker">ORIGIN</span>
					<h2 class="fwH2">發起人的話</h2>
					<p class="fwDesc">用故事語氣，說明「為何要做」與「希望改變什麼」。</p>
				</header>

				<article class="fwCard fwCard--tint reveal">
					<p class="fwP">
						我們從陪伴與教學的現場出發，看見長者與孩子在同一個場域互動時，
						會自然產生理解與支持。協會希望把這份連結，做成可被複製、能在社區落地的方案，
						讓更多家庭與社區都能得到更好的支持網絡。
					</p>

					<div class="fwCallout">
						<div class="fwCallout__icon">♡</div>
						<div class="fwCallout__text">
							<b>我們的邀請</b>
							<div>加入志工、支持計畫、成為合作夥伴，一起把善意做成日常。</div>
						</div>
					</div>
				</article>
			</section>

			<!-- 5 -->
			<section id="sec-bless" class="fwSec">
				<header class="fwSecHead">
					<span class="fwKicker">BLESSINGS</span>
					<h2 class="fwH2">特別嘉賓 / 貴賓賀詞</h2>
					<p class="fwDesc">特別嘉賓 / 貴賓賀詞</p>
				</header>

				<div class="fwGrid three reveal">
					<article class="fwCard fwMini">
						<div class="fwWho">（貴賓姓名）</div>
						<div class="fwJob">（職稱/單位）</div>
						<p class="fwSmall">
							祝福協會推動跨世代共好，讓更多家庭與社區受益。
						</p>
					</article>
					<article class="fwCard fwMini">
						<div class="fwWho">（貴賓姓名）</div>
						<div class="fwJob">（職稱/單位）</div>
						<p class="fwSmall">期待協會成為連結資源的平台，擴大社會影響力。</p>
					</article>
					<article class="fwCard fwMini">
						<div class="fwWho">（貴賓姓名）</div>
						<div class="fwJob">（職稱/單位）</div>
						<p class="fwSmall">願服務穩健前行，讓溫柔與專業一起落地。</p>
					</article>
				</div>
			</section>

			<!-- 6 -->
			<section id="sec-team" class="fwSec">
				<header class="fwSecHead">
					<span class="fwKicker">TEAM</span>
					<h2 class="fwH2">理監事、顧問團隊</h2>
					<p class="fwDesc">理監事、顧問團隊</p>
				</header>

				<div class="fwGrid three reveal">
					<article class="fwCard fwPerson">
						<div class="fwAvatar">人像</div>
						<div class="fwWho">（姓名）</div>
						<div class="fwJob">理事｜（單位/職稱）</div>
						<div class="fwTags">
							<span>教育</span><span>課程設計</span><span>社區共學</span>
						</div>
					</article>
					<article class="fwCard fwPerson">
						<div class="fwAvatar">人像</div>
						<div class="fwWho">（姓名）</div>
						<div class="fwJob">監事｜（單位/職稱）</div>
						<div class="fwTags">
							<span>社福</span><span>志工培力</span><span>資源連結</span>
						</div>
					</article>
					<article class="fwCard fwPerson">
						<div class="fwAvatar">人像</div>
						<div class="fwWho">（姓名）</div>
						<div class="fwJob">顧問｜（單位/職稱）</div>
						<div class="fwTags">
							<span>研究評估</span><span>公益倡議</span><span>跨域合作</span>
						</div>
					</article>
				</div>
			</section>

			<!-- 7 -->
			<section id="sec-pdf" class="fwSec fwSecLast">
				<header class="fwSecHead">
					<span class="fwKicker">DOCUMENT</span>
					<h2 class="fwH2">協會章程（PDF）</h2>
					<p class="fwDesc">協會章程</p>
				</header>

				<article class="fwCard reveal">
					<div class="fwPdfRow">
						<a
							class="fwBtn"
							href="files/bylaws.pdf"
							target="_blank"
							rel="noopener"
							>開啟 / 下載 PDF</a
						>
					</div>

					<div class="fwPdfFrame">
						<iframe
							v-if="associationArticle?.file_url"
							:src="getStorageFileUrl(associationArticle.file_url)"
							title="協會章程 PDF 預覽"
						></iframe>
						<div v-else class="text-muted">尚未上傳章程 PDF</div>
					</div>
				</article>
			</section>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { getAssociationArticleList } from "@/api/main/service/about/associationArticleService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";

const associationArticleList = ref([]);
const associationArticle = computed(
	() => associationArticleList.value?.[0] ?? null
);

const loadAssociationArticle = async () => {
	try {
		const response = await getAssociationArticleList();
		associationArticleList.value = response;
	} catch (err) {
		console.error("getAssociationArticleList error:", err);
		associationArticleList.value = [];
	}
};

// ✅ io 要能被清掉
let io = null;

function setupReveal() {
	// 先清舊的
	if (io) {
		io.disconnect();
		io = null;
	}

	const els = Array.from(document.querySelectorAll("#assocAboutWrap .reveal"));
	if (!els.length) return; // 這次抓不到就等下一拍再呼叫

	// set stagger indices for containers
	document
		.querySelectorAll("#assocAboutWrap .reveal-stagger")
		.forEach((wrap) => {
			const step = wrap.getAttribute("data-stagger-step");
			if (step) wrap.style.setProperty("--rv-stagger-step", `${step}ms`);

			const children = Array.from(wrap.querySelectorAll(":scope > .reveal"));
			children.forEach((el, i) =>
				el.style.setProperty("--rv-stagger-index", i)
			);
		});

	// apply per-element data settings
	els.forEach((el) => {
		const delay = el.getAttribute("data-reveal-delay");
		const dur = el.getAttribute("data-reveal-dur");
		const dist = el.getAttribute("data-reveal-dist");
		if (delay) el.style.setProperty("--rv-delay", `${delay}ms`);
		if (dur) el.style.setProperty("--rv-dur", `${dur}ms`);
		if (dist) el.style.setProperty("--rv-dist", `${dist}px`);
	});

	io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const el = entry.target;
				const onceAttr = el.getAttribute("data-reveal-once");
				const once = onceAttr === null ? true : onceAttr !== "false";

				if (entry.isIntersecting) {
					el.classList.add("is-in");
					if (once) io?.unobserve(el);
				} else {
					if (!once) el.classList.remove("is-in");
				}
			});
		},
		{
			root: null,
			threshold: 0.18,
			rootMargin: "0px 0px -12% 0px",
		}
	);

	els.forEach((el) => io.observe(el));
}

onMounted(async () => {
	// 先載資料
	await loadAssociationArticle();

	// 等 Vue render 完
	await nextTick();
	// 加載動畫
	setupReveal();

	if (!io) {
		requestAnimationFrame(setupReveal);
	}
});

onBeforeUnmount(() => {
	if (io) {
		io.disconnect();
		io = null;
	}
});
</script>

