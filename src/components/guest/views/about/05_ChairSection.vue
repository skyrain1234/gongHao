<template>
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
					<!-- <div class="fwName">理事長｜張善斌</div>
					<div class="fwRole">社團法人台灣跨世代共好推動協會</div> -->
					<div class="fwRole">理事長 張善斌 2025.11.22</div>
				</div>
			</article>

			<aside class="fwCard fwPhoto">
				<div class="fwPhoto__box">
					<!-- 理事長照片 -->
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
				<!-- 右下 More（開人物 modal） -->
				<div class="fwMore">
					<button class="fwMore__btn" type="button" @click="openChairModal">
						more <span class="fwMore__arrow" aria-hidden="true">→</span>
					</button>
				</div>

				<!-- 理事長介紹 Modal -->
				<dialog ref="chairDialog" class="fwModal" @click="onChairDialogClick">
					<div class="fwModal__panel">
						<header class="fwModal__head">
							<h3 class="fwModal__title">理事長介紹</h3>
							<button
								class="fwModal__close"
								type="button"
								@click="closeChairModal"
							>
								×
							</button>
						</header>

						<div class="fwModal__body" v-if="chair">
							<!-- 頭區：照片 + 名稱 + 現職 -->
							<div class="fwChairHead">
								<img
									class="fwChairHead__photo"
									:src="chair.photo"
									:alt="chair.name"
								/>
								<div class="fwChairHead__info">
									<div class="fwChairHead__name">{{ chair.name }}</div>

									<!-- -->
									<div
										class="fwChairHead__job"
										v-if="chair.current_job?.length"
									>
										<div
											class="fwJobRow"
											v-for="(job, idx) in chair.current_job"
											:key="idx"
										>
											{{ job }}
										</div>
									</div>

									<!-- 最高學歷 -->
									<!-- <div class="fwChairHead__edu" v-if="chair.highest_education">
										{{ chair.highest_education }}
									</div> -->
									<!-- 專長badge -->
									<!-- <div class="fwTags mt-2" v-if="chair.tags?.length">
										<span v-for="t in chair.tags" :key="t">{{ t }}</span>
									</div> -->
								</div>
							</div>
							<hr />
							<!-- ✅ Tabs -->
							<nav class="fwTabBar" role="tablist" aria-label="理事長資料切換">
								<button
									class="fwTab"
									:class="{ 'is-active': activeTab === 'intro' }"
									type="button"
									role="tab"
									:aria-selected="activeTab === 'intro'"
									@click="activeTab = 'intro'"
								>
									簡介
								</button>
								<button
									class="fwTab"
									:class="{ 'is-active': activeTab === 'career' }"
									type="button"
									role="tab"
									:aria-selected="activeTab === 'career'"
									@click="activeTab = 'career'"
								>
									學經歷
								</button>
								<button
									class="fwTab"
									:class="{ 'is-active': activeTab === 'cert' }"
									type="button"
									role="tab"
									:aria-selected="activeTab === 'cert'"
									@click="activeTab = 'cert'"
								>
									證照
								</button>
								<button
									class="fwTab"
									:class="{ 'is-active': activeTab === 'pub' }"
									type="button"
									role="tab"
									:aria-selected="activeTab === 'pub'"
									@click="activeTab = 'pub'"
								>
									著作
								</button>
							</nav>

							<!-- ✅ Tab Panels -->
							<section
								v-show="activeTab === 'intro'"
								class="fwTabPanel"
								role="tabpanel"
							>
								<div class="fwModalSec" v-if="chair.bio">
									<div class="fwModalSec__title">簡介</div>
									<p class="m-0 fwModalText">{{ chair.bio }}</p>
								</div>

								<div class="fwModalSec" v-if="chair.expertise?.length">
									<div class="fwModalSec__title">專長</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.expertise" :key="idx">
											{{ x }}
										</li>
									</ul>
								</div>
							</section>

							<section
								v-show="activeTab === 'career'"
								class="fwTabPanel"
								role="tabpanel"
							>
								<div class="fwModalSec" v-if="chair.education?.length">
									<div class="fwModalSec__title">學歷</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.education" :key="idx">
											{{ x }}
										</li>
									</ul>
								</div>

								<div class="fwModalSec" v-if="chair.exp?.length">
									<div class="fwModalSec__title">經歷</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.exp" :key="idx">{{ x }}</li>
									</ul>
								</div>

								<div class="fwModalSec" v-if="chair.service?.length">
									<div class="fwModalSec__title">參與 / 服務</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.service" :key="idx">
											{{ x }}
										</li>
									</ul>
								</div>
							</section>

							<section
								v-show="activeTab === 'cert'"
								class="fwTabPanel"
								role="tabpanel"
							>
								<div class="fwModalSec" v-if="chair.certificate?.length">
									<div class="fwModalSec__title">專業證照</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.certificate" :key="idx">
											{{ x }}
										</li>
									</ul>
								</div>
							</section>

							<section
								v-show="activeTab === 'pub'"
								class="fwTabPanel"
								role="tabpanel"
							>
								<div class="fwModalSec" v-if="chair.book?.length">
									<div class="fwModalSec__title">專書著作</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.book" :key="idx">{{ x }}</li>
									</ul>
								</div>

								<div class="fwModalSec" v-if="chair.journals?.length">
									<div class="fwModalSec__title">期刊論文</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.journals" :key="idx">
											{{ x }}
										</li>
									</ul>
								</div>

								<div class="fwModalSec" v-if="chair.conferences?.length">
									<div class="fwModalSec__title">研討會論文</div>
									<ul class="m-0 fwModalText">
										<li v-for="(x, idx) in chair.conferences" :key="idx">
											{{ x }}
										</li>
									</ul>
								</div>
							</section>
						</div>

						<footer class="fwModal__foot">
							<button class="fwBtn" type="button" @click="closeChairModal">
								關閉
							</button>
						</footer>
					</div>
				</dialog>
			</aside>
		</div>
	</section>
</template>
<script setup>
import { computed, ref } from "vue";

// 資料 先寫死
const advisors = [
	{
		id: 1,
		name: "張善斌",
		photo: new URL("@/assets/images/about/Zhang-Shan-Bin.jpg", import.meta.url)
			.href,
		current_job: [
			"朝陽科技大學 銀髮產業管理系 副教授 (2016 起))",
			"社團法人 台灣跨世代共好推動協會 創會理事長 (2025 起)",
		],
		highest_education: "國立雲林科技大學 管理研究所 博士",
		tags: ["銀髮族產業", "企業電子化", "專案管理"],
		expertise: [
			"銀髮族產業服務管理",
			"企業電子化規劃 (資訊安全與法律)",
			"專案管理與計畫執行 (IPMA Level D)",
			"文創事業經營與行銷",
			"跨世代活動與課程設計",
		],
		bio: "",
		education: [
			"國立雲林科技大學 管理研究所 博士",
			"淡江大學 管理科學研究所 碩士",
			"國立臺灣大學 資訊工程學系 學士",
		],
		exp: [
			"教育部 USR (大學社會責任) 幼老共園計畫 協同主持人 (2023-2024)",
			"朝陽科技大學 幼老共園推動中心 總監 (2023-2024)",
			"教育部 扎根高中職資訊科學教育計畫 主持人 (2014-2015)",
			"教育部 資通訊軟體創新人才推升推廣計畫 主持人 (2013-2014)",
			"嶺東科技大學 資訊管理系 副教授兼系主任 (2005-2016)",
			"經濟部 中小企業經營輔導專家 (1996-2002)",
			"南開科技大學 資訊管理系 副教授兼系主任 (1993-2005)",
			"中科院 航空工業發展中心 技士 (1987-1993)",
		],
		service: [
			"中華民國幼老共園促進發展協會終身會員兼監事 (2022 起)",
			"台灣高齡學習與服務管理學會終身會員兼監事 (2016 起)",
			"財團法人揚生慈善基金會專業顧問 (2022-2024)",
			"中華民國資訊管理學會終身會員 (2011 起)",
			"中華民國科技管理學會終身會員 (2003 起)",
			"台灣專案管理學會 (Level D, 2013-2014 百大名師)",
			"台大合唱團、台灣省交響樂團附設合唱團、台北愛樂合唱團、台中聖樂團、宇宙光百人合唱團、台中愛唱歌手合唱團、台中新世紀合唱團男低音 (BASS)",
		],
		certificate: [
			"HMCA 國際健康管理照護協會 C 級健康管理師",
			"中華民國青少年體育協會 銀髮體適能指導員",
			"ISCA 國際運動教練協會 國際 C 級健身教練",
			"日本加賀谷·宮本式 音樂照顧活動 初級認證",
			"後青春繪本館 熟齡繪本帶領人（進階）",
			"TÜV Rheinland Trainer for Care Management",
			"CEO 國際認證中心 銀髮族產業服務管理師",
			"CEO 國際認證中心 文化創意事業經營行銷講師",
			"CEO 國際認證中心 文化創意產品行銷企劃員",
			"ERP Software Consultant for Distribution Module",
			"企業電子化規劃師（資訊安全與法律）",
			"IPMA Level D, Project Management Associate",
			"中華民國水上救生員證照",
		],
		book: [
			"《老幼共學實務應用—未來教育新亮點》ISBN 978-626-423-929-5（528），五南出版社，台北，2025。",
		],

		journals: [
			"Shann-Bin Chang (2012). Using patent analysis to establish technological position: Two different strategic approaches. Technological Forecasting & Social Change, 79, 3-15. (SSCI)",
			"Shann-Bin Chang*, Shu-Min Chang (2010). Exploring the Perception and Behavior of Software Engineers about Computer Software Patent. WSEAS TRANSACTIONS on INFORMATION SCIENCE and APPLICATIONS, 7(11), 1358-1367. (EI)",
			"Shann-Bin Chang, Kuei-Kuei Lai, Shu-Min Chang (2009). Exploring Technology Diffusion and Classification of Business Methods: Using the Patent Citation Network. Technological Forecasting and Social Change, 76(1), 107-117. (SSCI)",
			"Shann-Bin Chang*, Lai Kuei-Kuei, Shu-Min Chang (2006, Sep). Mobility of Technology Positioning with Change in Patent Portfolio. The Journal of American Academy of Business, Cambridge, 10(1), 90-96. (ABI/INFORM, EBSCO)",
			"Shu-Min Chang, Shann-Bin Chang* (2006, Sep). Exploring Technologic Characters of Finance Group in Business Methods: Using Patent Content Analysis and Citation Network. The Business Review, Cambridge, 5(2), 122-129. (ABI/INFORM)",
		],

		conferences: [
			"Huaii Hsu, Shann-Bin Chang, Shu-Wei Lin (2021). An Empirical Study for Using Youth Powers to Create New Model for Aging Baby Boomers in Taiwan. International Conference on Social Sciences and Intelligent Management (SSIM 2021), Taichung.",
			"張善斌、鄭冠瑛、蕭浥家、陳盈臻、賴翊甄、王汝瓊、江念慈（2018 年 5 月）。以認真休閒理論探討休閒運動對健康促進的影響—以中高齡為例。2018 第 19 屆管理學域國際學術研討會，E68-82。",
			"S.B. Chang, K.Y. Huang, S.M. Chang (2018). Exploring the Internet Resource for Senior Citizens in Taiwan. IEEM 2017, Singapore, 909-913.",
			"K.Y. Huang, S.B. Chang, P.R. Tsai (2018). The Advantage of the Arduino Sensing System on Parking Guidance Information Systems. IEEM 2017, Singapore, 2078-2082.",
			"Kuang Yu Huang, Shann-Bin Chang, Lieh-Dai Yang (2018). The Approach to Classifying Multi-Output Datasets based on Cluster Validity Index Method. 2017 IEEE 8th International Conference on Awareness Science and Technology (iCAST 2017), 552-556.",
		],
	},
];

const chair = computed(() => advisors.find((x) => x.id === 1) || null);

/** ✅ dialog（B：點背景關閉） */
const chairDialog = ref(null);

const activeTab = ref("intro");

// 打開 modal 時重置 tab（可選但體驗好）
const openChairModal = () => {
	activeTab.value = "intro";
	chairDialog.value?.showModal?.();
};

// const openChairModal = () => chairDialog.value?.showModal?.();
const closeChairModal = () => chairDialog.value?.close?.();

const onChairDialogClick = (e) => {
	const dlg = chairDialog.value;
	if (!dlg) return;
	if (e.target === dlg) dlg.close();
};
</script>
<style scoped>
#assocAboutWrap .fwChairHead {
	display: flex;
	gap: 14px;
	align-items: flex-start;
}

#assocAboutWrap .fwChairHead__photo {
	width: 92px;
	height: 92px;
	border-radius: 16px;
	object-fit: cover;
	border: 1px solid rgba(31, 35, 40, 0.12);
	background: rgba(255, 255, 255, 0.7);
	flex: 0 0 auto;
}

#assocAboutWrap .fwChairHead__name {
	font-weight: 950;
	font-size: 20px;
	line-height: 1.2;
}

#assocAboutWrap .fwChairHead__job {
	margin-top: 6px;
	font-weight: 800;
	color: rgba(31, 35, 40, 0.78);
	line-height: 1.5;
}

#assocAboutWrap .fwChairHead__edu {
	margin-top: 4px;
	color: rgba(31, 35, 40, 0.68);
	font-weight: 650;
	line-height: 1.6;
}

#assocAboutWrap .fwModalSec {
	margin-top: 14px;
}

#assocAboutWrap .fwModalSec__title {
	font-weight: 950;
	letter-spacing: 0.06em;
	color: rgba(47, 93, 80, 0.95);
	margin-bottom: 8px;
}

/* 手機：頭區改直向 */
@media (max-width: 576px) {
	#assocAboutWrap .fwChairHead {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
}

#assocAboutWrap .fwTabBar {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin: 14px 0 8px;
}

#assocAboutWrap .fwTab {
	appearance: none;
	border: 1px solid rgba(31, 35, 40, 0.1);
	background: rgba(255, 255, 255, 0.6);
	color: rgba(31, 35, 40, 0.78);
	padding: 8px 12px;
	border-radius: 12px;
	font-weight: 900;
	font-size: 16px;
	cursor: pointer;
	transition: transform 0.15s ease, background 0.15s ease;
}

#assocAboutWrap .fwTab:hover {
	background: rgba(255, 255, 255, 0.85);
	transform: translateY(-1px);
}

#assocAboutWrap .fwTab.is-active {
	background: rgba(255, 255, 255, 0.92);
	border-color: rgba(47, 93, 80, 0.28);
	color: rgba(47, 93, 80, 0.98);
}

#assocAboutWrap .fwTabPanel {
	padding-top: 8px;
}

/* current_job array 每行 */
#assocAboutWrap .fwJobRow {
	margin-top: 4px;
}
#assocAboutWrap .fwModalText {
	color: var(--muted);
	line-height: 1.75;
	font-weight: 650;
	font-size: 17px;
}
</style>
