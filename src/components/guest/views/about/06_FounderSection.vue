<template>
	<section id="sec-founder" class="fwSec">
		<header class="fwSecHead">
			<span class="fwKicker">ORIGIN</span>
			<h2 class="fwH2">發起人的話</h2>
			<!-- <p class="fwDesc">用故事語氣，說明「為何要做」與「希望改變什麼」。</p> -->
		</header>

		<article class="fwCard fwCard--tint reveal">
			<div class="fwFounderLayout">
				<!-- 左：人物 -->
				<figure class="fwFounderPortrait">
					<img
						src="@/assets/images/about/founder.jpg"
						alt="發起人 葉桂娥 園長"
						loading="lazy"
					/>
					<figcaption>發起人｜新竹縣私立佳佳幼兒園園長 葉桂娥</figcaption>
				</figure>

				<!-- 右：文字 -->
				<div class="fwFounderText">
					<p class="fwP">
						&emsp;&emsp;老幼共學的故事，總是從一個簡單卻溫暖的起心動念開始。
						一方水土養一方人。四十餘年來，佳佳幼兒園深耕在這片新竹湖口的田中央，承載著鄉里的寄託與家長的信任，陪伴無數孩子與家庭共同成長。能有今日的基礎，全賴地方耆老、鄰里親朋長久以來的支持與守護。
					</p>

					<p class="fwP">
						台灣在2025年正式邁入「超高齡社會」。這不再只是數據或論文中的議題，而是真實存在於我們的生活日常——看著昔日的哥哥姊姊、叔叔伯伯，如今白髮蒼蒼、步履緩慢，我們深刻體會到世代流轉的痕跡，也開始思考：我們能為這些曾經提攜我們的人，做些什麼？
					</p>

					<p class="fwP">
						那份想要回饋的心，讓我決定重新打開幼兒園的大門。邀請村里的長輩、孩子們的爺奶走進園所，一起學習、一起遊戲、一起分享生命的故事。課堂中有孩子的笑聲、長輩的驚喜；活動後有滿足的笑容與真誠的擁抱。老幼共學，不僅讓長輩們重新找到被需要的感覺，也讓孩子從小學會尊重與關懷。
					</p>

					<p class="fwP">
						我們把客家文化的根與社區互動的情感都放進課程裡，也與「準公共幼兒園課程教學輔導計畫」相互連結，規劃了充滿溫度的代間學習活動。園內老師積極參與老幼共學課程培訓，村里的長輩更是踴躍參與，每一次活動都為社區裡最動人的風景。從【花樹下歌聲揚】的合唱課開始，到一場場笑聲與淚光交織的學習時光，這一路的旅程讓我們確信：老幼共學不僅是一種教育創新，更是一種生命交流與愛的實踐。
					</p>

					<p class="fwP">
						如今，【台灣跨世代共好推動協會】的成立，讓這份初心得以延續與擴大。協會將成為世代之間最堅實的橋樑，串連各界力量，讓不同年齡、族群、專業的人都能在同一個平台上互相理解、支持與成長。我們共同期盼，有朝一日能真正實現《禮運大同篇》中所描繪的理想社會—「老有所終，壯有所用，幼有所長。」
					</p>

					<p class="fwP">
						親愛的會員與朋友們：感謝您願意成為跨世代共好的同行者。每一份參與、每一次相遇，都是推動社會前進的力量。願我們在彼此的陪伴與鼓勵中，讓善意不斷延伸，讓愛的橋樑持續築起。
					</p>

					<p class="fwP fwFounderBlessing">
						祝福大家　身體健康、平安喜樂、心想事成。
					</p>

					<p class="fwP fwFounderSign">
						發起人　新竹縣私立佳佳幼兒園園長 葉桂娥
						<span class="fwFounderSign__date">2025.11.22</span>
					</p>
				</div>
			</div>

			<!-- 下方：場景照 -->
			<div class="fwFounderGallery2 reveal-stagger" data-stagger-step="90">
				<figure class="fwFounderShot reveal">
					<img
						src="@/assets/images/about/founder-01.jpg"
						alt="老幼共學活動現場"
						loading="lazy"
					/>
				</figure>
				<figure class="fwFounderShot reveal">
					<img
						src="@/assets/images/about/founder-02.jpg"
						alt="孩子與長輩一起互動"
						loading="lazy"
					/>
				</figure>
			</div>

			<!-- <div class="fwCallout">
				<div class="fwCallout__icon">♡</div>
				<div class="fwCallout__text">
					<b>我們的邀請</b>
					<div>加入志工、支持計畫、成為合作夥伴，一起把善意做成日常。</div>
				</div>
			</div> -->
		</article>
	</section>
</template>
<style scoped>
/* =========================
   Founder: portrait left on desktop
   ========================= */
#assocAboutWrap #sec-founder .fwFounderLayout {
	display: grid;
	grid-template-columns: 280px 1fr;
	gap: 18px;
	align-items: start;
}

/* 左側人物卡（跟你的卡片風格一致） */
#assocAboutWrap #sec-founder .fwFounderPortrait {
	margin: 0;
	padding: 12px;
	border-radius: var(--r);
	border: 1px solid var(--line);
	background: rgba(255, 255, 255, 0.55);
	box-shadow: 0 12px 26px rgba(31, 35, 40, 0.06);
}

/* 人物照片 */
#assocAboutWrap #sec-founder .fwFounderPortrait img {
	width: 100%;
	aspect-ratio: 4 / 5;
	object-fit: cover;
	border-radius: calc(var(--r) - 6px);
	display: block;
}

/* 人物說明 */
#assocAboutWrap #sec-founder .fwFounderPortrait figcaption {
	margin-top: 10px;
	font-size: 14px;
	line-height: 1.6;
	color: var(--muted);
	font-weight: 650;
}

/* 文字段落：用你 fwP，但加段距更好讀 */
#assocAboutWrap #sec-founder .fwFounderText .fwP {
	margin: 0 0 14px 0;
}

/* 祝福句：加粗、略分隔 */
#assocAboutWrap #sec-founder .fwFounderBlessing {
	margin-top: 18px;
	font-weight: 900;
}

/* 署名：右對齊 + 小一點 + 淡色 */
#assocAboutWrap #sec-founder .fwFounderSign {
	margin-top: 10px;
	text-align: right;
	font-size: 15px;
	color: var(--muted);
	letter-spacing: 0.02em;
}

#assocAboutWrap #sec-founder .fwFounderSign__date {
	display: inline-block;
	margin-left: 10px;
	opacity: 0.9;
}

/* =========================
   Founder: gallery 2 photos
   ========================= */
#assocAboutWrap #sec-founder .fwFounderGallery2 {
	margin-top: 18px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12px;
}

#assocAboutWrap #sec-founder .fwFounderShot {
	margin: 0;
	border-radius: 16px;
	overflow: hidden;
	border: 1px solid rgba(31, 35, 40, 0.12);
	background: rgba(255, 255, 255, 0.62);
	box-shadow: 0 10px 22px rgba(31, 35, 40, 0.06);
}

#assocAboutWrap #sec-founder .fwFounderShot img {
	width: 100%;
	height: 280px;
	object-fit: cover;
	display: block;
}

/* =========================
   Responsive: portrait on top for mobile/tablet
   ========================= */
@media (max-width: 992px) {
	#assocAboutWrap #sec-founder .fwFounderLayout {
		grid-template-columns: 1fr;
	}

	#assocAboutWrap #sec-founder .fwFounderPortrait img {
		aspect-ratio: 16 / 9;
	}

	#assocAboutWrap #sec-founder .fwFounderGallery2 {
		grid-template-columns: 1fr;
	}
}
</style>
