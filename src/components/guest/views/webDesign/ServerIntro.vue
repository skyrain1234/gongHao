<template>
	<div class="hardware-goods">
		<div class="container">
			<h2 class="section-title text-center" data-aos="fade">
				{{ $t("webDesign.serverIntro.sectionTitle") }}
			</h2>

			<div class="row g-4">
				<!-- 左區塊 -->
				<div class="col-12 col-lg-6" data-aos="fade-right">
					<div class="hardware-box">
						<h3 class="hardware-subtitle">
							{{ $t("webDesign.serverIntro.planA.title") }}
						</h3>

						<ul class="hardware-list">
							<li
								v-for="(txt, idx) in $tm('webDesign.serverIntro.planA.items')"
								:key="idx"
							>
								{{ $rt(txt) }}
							</li>
						</ul>
					</div>
				</div>

				<!-- 右區塊 -->
				<div class="col-12 col-lg-6" data-aos="fade-left">
					<div class="hardware-box">
						<h3 class="hardware-subtitle">
							{{ $t("webDesign.serverIntro.planB.title") }}
						</h3>

						<ul class="hardware-list">
							<li
								v-for="(txt, idx) in $tm('webDesign.serverIntro.planB.items')"
								:key="idx"
							>
								{{ $rt(txt) }}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- 作品案例 -->
			<div class="text-center mt-5">
				<router-link
					class="intro-btn"
					:to="{
						path: `/${currentLang}/portfolio`,
						query: { tab: 'web' },
					}"
				>
					{{ $t("webDesign.serverIntro.caseBtn") }}
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
.hardware-box {
	min-height: 350px;
}
</style>
