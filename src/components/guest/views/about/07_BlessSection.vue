<!-- 07_BlessSection.vue -->
<template>
	<section id="sec-bless" class="fwSec">
		<header class="fwSecHead">
			<span class="fwKicker">BLESSINGS</span>
			<h2 class="fwH2">特別嘉賓 / 貴賓賀詞</h2>
			<p class="fwDesc">感謝各界先進的祝福與勉勵，攜手堆砌世代共融的橋樑。</p>
		</header>

		<!-- 列表： -->
		<div class="fwGrid three reveal">
			<article class="fwCard fwMini" v-for="(b, i) in blessings" :key="i">
				<div class="fwWho">{{ b.name }}</div>
				<div class="fwJob">{{ b.title }}</div>

				<p class="fw-bless-content clamp-3">
					{{ b.content }}
				</p>

				<!-- Modal按鈕：右下角 -->
				<div class="fwMore" v-if="b.content">
					<button class="fwMore__btn" type="button" @click="openBless(i)">
						More <span class="fwMore__arrow">→</span>
					</button>
				</div>
			</article>
		</div>

		<!-- Modal（原生 dialog） -->
		<dialog ref="dlg" class="fwModal" @click="onBackdropClick">
			<div class="fwModal__panel">
				<header class="fwModal__head">
					<div class="fwModal__title">
						<div class="fwWho">{{ activeBless?.name }}</div>
						<div class="fwJob">{{ activeBless?.title }}</div>
					</div>
					<button
						class="fwModal__close"
						type="button"
						@click="closeBless"
						aria-label="Close"
					>
						×
					</button>
				</header>

				<div class="fwModal__body">
					<!-- 內文用換行保留：white-space: pre-line -->
					<p class="fwP" style="margin-top: 12px; white-space: pre-line">
						{{ activeBless?.content }}
					</p>

					<!-- 若有日期/署名-->
					<div class="fwSign" v-if="activeBless?.sign">
						<div class="fwModal__title">{{ activeBless.sign }}</div>
						<div class="fwRole" v-if="activeBless?.date">
							{{ activeBless.date }}
						</div>
					</div>
				</div>

				<footer class="fwModal__foot">
					<button class="fwBtn" type="button" @click="closeBless">關閉</button>
				</footer>
			</div>
		</dialog>
	</section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * name / title / content / sign / data
 */
const blessings = ref([
	{
		name: "趙義達 修女",
		title: "私立德來幼兒園-園長",
		date: "2025.11.22",
		content:
			"攜手共創教育新篇章，讓世代共融成為台灣最美的風景\n\n" +
			"我與發起人葉園長是多年的好友，也是幼教同業的戰友。一直以來，我都非常讚賞她在幼兒園經營上的用心，以及對教育趨勢脈動的敏銳掌握。老幼共學對幼兒園來說，是一個極具意義與前瞻性的議題，我深信這不僅是教育的延伸，更將成為未來幼兒教育的重要方向。\n\n" +
			"我和葉園長再度攜手合作，是在疫情之後。她加入準公共幼兒園體系，並於112至114學年間連續三年申請教育部「準公共教保服務機構課程教學輔導」實施計畫，同時邀請我擔任專案指導老師。第一年，我們以食農教育「爺爺的菜園」為主題；第二年推動美學教育「花樹下玩美趣」，並首度將園所定調為「佳佳蒙特梭利幼兒園」；到了第三年，更將在地的客庄文化與精神融入課程，正式定位為「佳佳田園蒙特梭利幼兒園」。看著園長與團隊老師這三年一路走來，不斷在專業與實踐上成長茁壯，成果豐碩，令人由衷佩服，也感到與有榮焉。\n\n" +
			"更讓我驚喜與感動的是，除了課程教學輔導計畫之外，葉園長也與朝陽科技大學銀髮產業管理系張善斌教授攜手，推動老幼共學的計畫，並將專輔計畫與代間課程完美結合。不論是食農教育「爺爺的菜園」搭配老幼共學「大家來辦桌」、美學教育「花樹下玩美趣」延伸至老幼「花樹下歌聲揚」，甚至到本學年的「佳佳田園」與老幼共學「花樹下歌聲揚2」，都碰撞出美麗而動人的火花。看到同業仍然懷抱熱情，為幼教、為銀髮族開創出一片共榮共好的新天地，而自己也有幸親身參與其中，實在是感到無比欣慰。\n\n" +
			"最後，誠摯祝賀【台灣跨世代共好推動協會】成立大會圓滿成功！願協會在眾人的智慧與行動中，持續堆砌世代共融的橋樑；讓愛、尊重與理解，成為這塊土地最溫暖的底色，也願所有參與這段旅程的人，都能在「共學、共好」的路上，找到生命中最動人的感動與力量。\n\n" +
			"祝福大家\n" +
			"平安喜樂、恩典滿盈",
		sign: "趙義達 修女",
	},

	{
		name: "范揚松",
		title: "諮議委員｜大人物知識管理集團 董事長兼總經理",
		content:
			"賀喜【台灣跨世代共好推動協會】成立大會\n" +
			"籌辦多時，滙聚各界精英發起的跨世代共好推動協會,正式成立開始組織運作！在理事長張善斌教授領導之下,願景宏大,目標明確可行，加上理監事人才濟濟各有專擅，期盼會務昌隆,創新社會服務新藍海！特撰一首藏頭詩共勉！\n\n" +
			"跨世同修薪火縁，\n" +
			"代傳智珠愛相連；\n" +
			"共築願景開氣象，\n" +
			"學園桃李滿人間！\n\n" +
			"齊心奮搏敢爭先，\n" +
			"頭角崢嶸競前沿；\n" +
			"精金百煉不辭苦，\n" +
			"進德修業創新天！",
		sign: "范揚松",
	},

	{
		name: "劉雲山",
		title: "常務理事｜時尚數位股份有限公司 董事長",
		content:
			"今年7月10日首次參與協會舉辦的老幼共學活動，【花樹下歌聲揚】的結業成果發表，至今印象仍非常深刻。現場有孩子與長輩們的表演、互動與共學，不只是一起唱與玩，更是經驗與生命故事的交流。當天我與善斌理事長也獻唱了二首歌曲，我們以二重唱的方式呈現了大家耳熟能詳的【甜蜜的家庭】，以及客家歌謠【風平浪靜】，很榮幸能成為這段跨世代交流的一部分。這種讓長輩與孩子共學的創新方式，不僅讓長者感受到被需要，也讓孩子從中學會尊重與聆聽，是互相扶持、傳承情感的絕佳示範。\n\n" +
			"在高齡化日益加劇的台灣，家長多在壯年工作，老人與孩子其實是家中相處最多的兩代，若能透過共學設計，激發彼此潛力與陪伴的可能，對家庭、社區乃至社會都有深遠意義。期盼這樣的活動能持續擴展，讓更多人看見跨世代共好的力量！",
		sign: "劉雲山",
	},

	{
		name: "許博揚",
		title: "理事｜永錡幼兒園暨日照中心 執行長",
		content:
			"回國後的第三年，帶著學習，探險的精神踏入銀髮產業，很幸運也很開心有機會和很多前輩們ㄧ起往ㄧ個願景前進，我希望在協會裡希望能夠遇到很多志同道合的夥伴，而我也會盡我所能的分享給大家，我的所經歷到，不管好的或壞的經驗。最後感謝張老師的邀請，也很不好意思，常常很可能時間和大家對不上，希望未來我們協會能夠順利實踐初心，謙虛的接受指教，共創更好的自己。",
		sign: "許博揚",
	},

	{
		name: "沈楸坪",
		title: "創始會員｜新竹縣私立佳佳幼兒園 幼教師",
		content:
			"投入老幼共學的課程，對我來說是一段溫馨又充滿感動的旅程。看著孩子們用童真的眼光看世界，也看見長輩們用生命的智慧回應他們，彼此在互動中激盪出意想不到的火花。每一次牽手、每一個微笑，都是跨世代交流最真實的證明。\n\n" +
			"作為第一線的老師，我不只是教學者，更是陪伴者與觀察者。透過這樣的課程，我更堅信「共學」不分年齡，人人都有能力給予與學習。期盼未來能有更多這樣的機會，讓愛與理解在不同世代間自然流動，讓我們的社會更加溫柔、有力。",
		sign: "沈楸坪",
	},

	{
		name: "翁紹軒",
		title: "諮議委員｜新竹縣湖口鄉鎮民代表大會 副主席",
		content:
			"紹軒參加過幾次朝陽科技大學在佳佳幼兒園舉辦的老幼共學活動，深深感到老年人和幼兒一起學習，一起玩樂，是多麼幸福美好的事，若能長長久久，真是地方之福。\n\n" +
			"沒想到，好事來得真快，桂娥園長與善斌教授竟然邀集我們組成《台灣跨世代共好推動協會》，而且也順利立案通過了。相信在理事長的領導與大家通力合作下，湖口鄉會變成全國第一個老幼共學特色鄉鎮，感謝各位。",
		sign: "翁紹軒",
	},

	{
		name: "陳秀娟",
		title: "會務顧問｜工業技術研究院 管理師",
		content:
			"攜手跨世代，共好向前，一齊把世代連起來\n\n" +
			"走到某個年齡，才更懂長者的需求。想起爸爸生前熱愛學習，我陪他找資料，彌補輟學遺憾；也知道一個人學很不容易，若有學伴同行，討論共學，力量就會長出來。\n\n" +
			"我難忘在7月「花樹下歌聲揚」成果展中，看到孩子與長輩同台歌唱、互相扶持的情景，唱的不只是歌，更是連結與傳承。由此，理事長張善斌教授與桂娥學姐號召成立了【台灣跨世代共好推動協會】（BRIDGE Institute of Taiwan）成為老幼共學愛的實踐、生命的交流平台。\n\n" +
			"【台灣跨世代共好推動協會】的成立，以「老幼共學」為起點，讓不同年齡、族群、專業的人彼此連結，讓共好成為日常。讓我們一起築橋，讓「老有所終、壯有所用、幼有所長」在台灣落地。",
		sign: "陳秀娟",
	},

	{
		name: "黃育鈞",
		title: "秘書長｜台中豐富幸福樂齡據點 專員",
		content:
			"讓協會成為跨世代的橋\n\n" +
			"在這個變遷快速的時代，世代之間的距離似乎越來越遠。不同的年齡層，有不同的語言、價值觀與生活節奏；然而，我們始終相信——「差異不是隔閡，而是共創的起點。」\n\n" +
			"台灣跨世代共好推動協會的誕生，正是基於這份信念。我們希望搭起溝通的橋樑，讓長者的智慧能啟發青年，讓青年的創意能激勵長者；讓孩子在多元的對話中學會尊重與傾聽，讓每一個世代都能在理解中找到自己的位置，共同打造更有溫度的社會。\n\n" +
			"「共好」不是口號，而是一種生活的實踐。從家庭到社區，從教育到職場，我們願意陪伴每一個世代，用真誠的交流、實際的行動，累積信任與共識，讓愛在世代之間流動，讓台灣成為真正跨世代共榮的土地。\n\n" +
			"這是一條長遠的路，但我們相信——只要彼此願意，跨世代的理解與共好，就能從今天開始萌芽。",
		sign: "黃育鈞",
	},
]);

// ===== modal state =====
const dlg = ref(null);
const activeIndex = ref(-1);

const activeBless = computed(() => {
	if (activeIndex.value < 0) return null;
	return blessings.value[activeIndex.value] || null;
});

const openBless = (i) => {
	activeIndex.value = i;

	// dialog 打開
	if (dlg.value && !dlg.value.open) dlg.value.showModal();

	// 防止背景捲動（你也可以不做）
	document.documentElement.style.overflow = "hidden";
};

const closeBless = () => {
	if (dlg.value && dlg.value.open) dlg.value.close();
	activeIndex.value = -1;

	document.documentElement.style.overflow = "";
};

// 點「背景」關閉：只有點到 dialog 本體（backdrop區）才關
const onBackdropClick = (e) => {
	if (e.target === dlg.value) closeBless();
};

// ESC 關閉：dialog 會觸發 cancel 事件，攔截後統一走 closeBless
const onCancel = (e) => {
	e.preventDefault();
	closeBless();
};

onMounted(() => {
	if (!dlg.value) return;
	dlg.value.addEventListener("cancel", onCancel);
});

onBeforeUnmount(() => {
	if (!dlg.value) return;
	dlg.value.removeEventListener("cancel", onCancel);
	document.documentElement.style.overflow = "";
});
</script>

<style scoped>
/* 讓每張卡變成直向排版，並可把內容推到底 */
#assocAboutWrap .fwCard.fwMini {
	display: flex;
	flex-direction: column;
	min-height: 280px;
}

#assocAboutWrap .fwCard.fwMini .fw-bless-content {
	margin-top: auto; /* ✅ 把內文推到底（上面留空） */
	line-height: 1.95;
	color: rgba(31, 35, 40, 0.76);
	font-weight: 650;
	font-size: 16px;
}

/* 多行省略 ... */
#assocAboutWrap .clamp-3,
#assocAboutWrap .clamp-4,
#assocAboutWrap .clamp-5 {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;

	/* ✅ 這樣可以顯示 ...（在大多數瀏覽器有效） */
	text-overflow: ellipsis;
}

/* 你要幾行就開幾個 */
#assocAboutWrap .clamp-3 {
	-webkit-line-clamp: 3;
	line-clamp: 3;
}
#assocAboutWrap .clamp-4 {
	-webkit-line-clamp: 4;
	line-clamp: 4;
}
#assocAboutWrap .clamp-5 {
	-webkit-line-clamp: 5;
	line-clamp: 5;
}
</style>
