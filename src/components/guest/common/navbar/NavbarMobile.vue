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
			<!-- ✅ Home -->
			<router-link
				class="m-home"
				:to="`/${currentLang}`"
				@click="closeOffcanvas"
			>
				<span>首頁 Home</span>
				<i class="bi bi-arrow-right"></i>
			</router-link>

			<div class="accordion" id="mAcc">
				<!-- =====================
				     About
				     ===================== -->
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
								@click="closeOffcanvas"
							>
								協會宗旨與理念
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-chair' }"
								@click="closeOffcanvas"
							>
								理事長的話
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-founder' }"
								@click="closeOffcanvas"
							>
								發起人的話
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-bless' }"
								@click="closeOffcanvas"
							>
								特別嘉賓/貴賓賀詞
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/about`, hash: '#sec-pdf' }"
								@click="closeOffcanvas"
							>
								協會章程(PDF)
							</router-link>
						</div>
					</div>
				</div>

				<!-- =====================
				     News
				     ===================== -->
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
							<!-- ✅ 這裡我用「分類列表」的路由命名：newsListByCategory
							     你若後端 slug 是 notice/gallery/media/publications 請維持一致 -->
							<router-link
								class="m-item"
								:to="{
									name: 'newsListByCategory',
									params: { lang: currentLang, slug: 'notice' },
								}"
								@click="closeOffcanvas"
							>
								公告
							</router-link>

							<router-link
								class="m-item"
								:to="{
									name: 'newsListByCategory',
									params: { lang: currentLang, slug: 'gallery' },
								}"
								@click="closeOffcanvas"
							>
								活動花絮
							</router-link>

							<router-link
								class="m-item"
								:to="{
									name: 'newsListByCategory',
									params: { lang: currentLang, slug: 'media' },
								}"
								@click="closeOffcanvas"
							>
								媒體報導
							</router-link>

							<router-link
								class="m-item"
								:to="{
									name: 'newsListByCategory',
									params: { lang: currentLang, slug: 'publications' },
								}"
								@click="closeOffcanvas"
							>
								出版品 / 研究成果發佈
							</router-link>
						</div>
					</div>
				</div>

				<!-- =====================
				     Events
				     ===================== -->
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
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/event` }"
								@click="closeOffcanvas"
							>
								活動一覽
							</router-link>

							<!-- 若未來有事件分類頁，再補 name/params -->
						</div>
					</div>
				</div>

				<!-- =====================
				     Course
				     ===================== -->
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
							<!-- ✅ 先給「一覽」最穩：避免你還沒做每堂課 detail route -->
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/course` }"
								@click="closeOffcanvas"
							>
								主題課程一覽
							</router-link>

							<!-- 如果你已經有 course detail（例如 name: courseDetail, params: { lang, slug }）
							     就把下面改成你的真實 slug -->
							<!--
							<router-link
								class="m-item"
								:to="{ name: 'courseDetail', params: { lang: currentLang, slug: 'memory' } }"
								@click="closeOffcanvas"
							>
								共創小時候的回憶
							</router-link>
							-->
						</div>
					</div>
				</div>

				<!-- =====================
				     Training
				     ===================== -->
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
							<!-- ✅ 如果你還沒建 training 路由，先用 # 占位；有路由就改成 router-link -->
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/training` }"
								@click="closeOffcanvas"
							>
								培訓課程一覽
							</router-link>

							<!-- 若你是分頁：training/grand-teacher... 也照下面格式補 -->
							<!--
							<router-link class="m-item" :to="`/${currentLang}/training/grand-teacher`" @click="closeOffcanvas">
								爺奶教師（志工）培訓
							</router-link>
							-->
						</div>
					</div>
				</div>

				<!-- =====================
				     Research
				     ===================== -->
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
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/research/book` }"
								@click="closeOffcanvas"
							>
								書籍介紹
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/research/reports` }"
								@click="closeOffcanvas"
							>
								研究報告
							</router-link>

							<!-- <router-link
								class="m-item"
								:to="{ path: `/${currentLang}/research/open-materials` }"
								@click="closeOffcanvas"
							>
								公開教材下載
							</router-link> -->

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/research/ai-cases` }"
								@click="closeOffcanvas"
							>
								AI × 教材及案例
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/research/sdgs` }"
								@click="closeOffcanvas"
							>
								SDGs × 行動計畫
							</router-link>
						</div>
					</div>
				</div>

				<!-- =====================
				     Members
				     ===================== -->
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
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/members/join` }"
								@click="closeOffcanvas"
							>
								入會方式
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/members/apply` }"
								@click="closeOffcanvas"
							>
								入會/贊助線上申請表
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/members/benefits` }"
								@click="closeOffcanvas"
							>
								會員權益與費用
							</router-link>
						</div>
					</div>
				</div>

				<!-- =====================
				     Partnerships
				     ===================== -->
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
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/partners/domestic` }"
								@click="closeOffcanvas"
							>
								國內合作 NPO
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/partners/international` }"
								@click="closeOffcanvas"
							>
								國際合作 NPO
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/partners/csr` }"
								@click="closeOffcanvas"
							>
								企業夥伴（CSR）
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/partners/howto` }"
								@click="closeOffcanvas"
							>
								如何與協會合作
							</router-link>
						</div>
					</div>
				</div>

				<!-- =====================
				     Contact
				     ===================== -->
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
							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/contact`, hash: '#address' }"
								@click="closeOffcanvas"
							>
								協會地址
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/contact`, hash: '#email' }"
								@click="closeOffcanvas"
							>
								Email
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/contact`, hash: '#social' }"
								@click="closeOffcanvas"
							>
								社群連結
							</router-link>

							<router-link
								class="m-item"
								:to="{ path: `/${currentLang}/contact`, hash: '#form' }"
								@click="closeOffcanvas"
							>
								線上留言表單
							</router-link>
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

/**
 * ✅ 點選任何連結後把 offcanvas 關掉
 * - Bootstrap 5：需要 window.bootstrap 或 import Offcanvas
 */
function closeOffcanvas() {
	const el = document.getElementById("mobileNav");
	if (!el) return;

	// 方式 A：全域 bootstrap（多數情況）
	const bs = window.bootstrap;
	if (bs?.Offcanvas) {
		const inst = bs.Offcanvas.getInstance(el) || new bs.Offcanvas(el);
		inst.hide();
		return;
	}

	// 方式 B：保底：觸發 dismiss（避免你沒掛全域 bootstrap）
	const btn = el.querySelector('[data-bs-dismiss="offcanvas"]');
	btn?.click();
}
</script>
