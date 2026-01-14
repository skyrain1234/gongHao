<template>
	<div class="hardware-goods">
		<div class="container">
			<h2 class="section-title text-center" data-aos="fade">服務流程</h2>

			<div class="row g-4">
				<!-- 左區塊 -->
				<div class="col-12 col-lg-6" data-aos="fade-right">
					<div class="hardware-box">
						<h3 class="hardware-subtitle">我們的優勢</h3>
						<ul class="hardware-list">
							<li>已輔導多家企業成功申請到研發補助款，過件率高達70%。</li>
							<li>
								熟知政府申請管道及流程，可為各家企業針對研發標的，提供最精準的申請計畫評估，增加過件機率。
							</li>
							<li>
								與多位育成中心教授及研究委員合作，可提供案件較精準的評估及判斷，增加過件機率。
							</li>
							<li>
								專精補助業務，相較專利事務所及企管公司跨足其他領域，我們較為熟知補助作業。
							</li>
							<li>
								專業顧問全程服務，讓客戶從申請至結案皆有專人為您處理，省去寫計畫及與繁雜的處理程序。
							</li>
						</ul>
					</div>
				</div>

				<!-- 右區塊 -->
				<div class="col-12 col-lg-6" data-aos="fade-left">
					<div class="hardware-box">
						<h3 class="hardware-subtitle">政府補助案輔導及流程</h3>
						<ul class="hardware-list">
							<li>政府補助案輔導及流程 政府補助案的資金無須償還</li>
							<li>
								針對上市櫃公司、中小企業及新創團隊，不分產業別，均有合適申請的補助案。
							</li>
						</ul>
						<img
							src="@/assets/images/project/project_process.png"
							alt=""
							class="w-100"
						/>
					</div>
				</div>
			</div>
			<div class="text-center mt-5">
				<router-link
					class="intro-btn"
					:to="{
						path: `/${currentLang}/portfolio`,
						query: { tab: 'project' },
					}"
				>
					過往案例
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
const { currentLang } = useCurrentLang();
</script>

<style scoped>
/* 區塊卡片 */
.hardware-box {
	min-height: 500px;
}
</style>
