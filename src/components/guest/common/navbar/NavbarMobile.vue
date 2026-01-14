<template>
	<!-- Mobile Offcanvas -->
	<div
		class="offcanvas offcanvas-end"
		tabindex="-1"
		id="mobileNav"
		aria-labelledby="mobileNavLabel"
	>
		<div class="offcanvas-header">
			<div class="offcanvas-title" id="mobileNavLabel">網站選單</div>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="offcanvas"
				aria-label="Close"
			></button>
		</div>
		<div class="offcanvas-body">
			<a class="m-home" href="index.html">
				<span>首頁 Home</span>
				<i class="bi bi-arrow-right"></i>
			</a>

			<div class="accordion" id="mAcc">
				<div class="accordion-item">
					<h2 class="accordion-header" id="mH1">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC1"
						>
							協會介紹 About
						</button>
					</h2>
					<div
						id="mC1"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-mission' }"
								>協會宗旨與理念
							</router-link>
							<!-- <router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-history' }"
								>協會沿革(成立故事)
							</router-link> -->
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-chair' }"
								>理事長的話
							</router-link>
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-founder' }"
								>發起人的話
							</router-link>
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-bless' }"
								>特別嘉賓/貴賓賀詞
							</router-link>

							<!-- <router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-team' }"
								>理監事、顧問團隊
							</router-link> -->
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-pdf' }"
								>協會章程(PDF)
							</router-link>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH2">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC2"
						>
							最新消息 News
						</button>
					</h2>
					<div
						id="mC2"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="news-notice.html">公告</a>
							<a class="m-item" href="news-gallery.html">活動花絮</a>
							<a class="m-item" href="news-media.html">媒體報導</a>
							<a class="m-item" href="news-publications.html"
								>出版品 / 研究成果發佈</a
							>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH3">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC3"
						>
							老幼共學主題課程 Course
						</button>
					</h2>
					<div
						id="mC3"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="course-memory.html">共創小時候的回憶</a>
							<a class="m-item" href="course-visit.html">幼老共下來作客</a>
							<a class="m-item" href="course-chorus.html"
								>花樹下歌聲揚（老幼合唱）</a
							>
							<a class="m-item" href="course-boardgame.html"
								>老幼大富翁（益智/桌遊）</a
							>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH4">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC4"
						>
							活動 Events
						</button>
					</h2>
					<div
						id="mC4"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="events-music.html">跨世代音樂饗宴</a>
							<a class="m-item" href="events-run.html">跨世代路跑</a>
							<a class="m-item" href="events-hakka.html">客家文化相關活動</a>
							<a class="m-item" href="events-plan-2026-2028.html"
								>2026–2028 重大計畫一覽</a
							>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH5">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC5"
						>
							課程與人才培訓 Training
						</button>
					</h2>
					<div
						id="mC5"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="training-grand-teacher.html"
								>爺奶教師（志工）培訓</a
							>
							<a class="m-item" href="training-facilitator.html"
								>老幼共學活動帶領員</a
							>
							<a class="m-item" href="training-designer.html"
								>老幼共學課程規劃師</a
							>
							<a class="m-item" href="training-operator.html"
								>老幼共學營運管理師</a
							>
							<a class="m-item" href="training-schedule.html">研習課程時間表</a>
							<a class="m-item" href="training-register.html">報名</a>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH6">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC6"
						>
							研究與出版 Research & Publications
						</button>
					</h2>
					<div
						id="mC6"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="research-book.html">書籍介紹</a>
							<a class="m-item" href="research-reports.html">研究報告</a>
							<a class="m-item" href="research-open-materials.html"
								>公開教材下載</a
							>
							<a class="m-item" href="research-ai-cases.html"
								>AI × 教材及案例</a
							>
							<a class="m-item" href="research-sdgs.html">SDGs × 行動計畫</a>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH7">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC7"
						>
							會員專區 Members
						</button>
					</h2>
					<div
						id="mC7"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="members-join.html">入會方式</a>
							<a class="m-item" href="members-apply.html"
								>入會/贊助線上申請表</a
							>
							<a class="m-item" href="members-benefits.html">會員權益與費用</a>
							<!-- <a class="m-item" href="members-notices.html">最新會務公告</a>
									<a class="m-item" href="members-minutes.html"
										>理監事會議紀錄</a
									>
									<a class="m-item" href="members-downloads.html">下載中心</a> -->
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH8">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC8"
						>
							合作夥伴 Partnerships
						</button>
					</h2>
					<div
						id="mC8"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="partners-domestic.html">國內合作 NPO</a>
							<a class="m-item" href="partners-international.html"
								>國際合作 NPO</a
							>
							<a class="m-item" href="partners-csr.html">企業夥伴（CSR）</a>
							<a class="m-item" href="partners-howto.html">如何與協會合作</a>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header" id="mH9">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#mC9"
						>
							聯絡我們 Contact
						</button>
					</h2>
					<div
						id="mC9"
						class="accordion-collapse collapse"
						data-bs-parent="#mAcc"
					>
						<div class="accordion-body pt-2">
							<a class="m-item" href="contact.html#address">協會地址</a>
							<a class="m-item" href="contact.html#email">Email</a>
							<a class="m-item" href="contact.html#social">社群連結</a>
							<a class="m-item" href="contact.html#form">線上留言表單</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";

const { currentLang } = useCurrentLang();
</script>
