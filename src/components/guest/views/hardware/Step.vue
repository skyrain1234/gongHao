<template>
	<div class="hardware-steps-wrapper">
		<div class="container">
			<section
				class="hardware-steps service-steps"
				data-aos="fade-up"
				data-aos-easing="ease-out-cubic"
			>
				<div class="steps-inner container">
					<!-- 上方步驟進度條 -->
					<div class="steps-timeline">
						<button
							class="step-node"
							:class="{ active: activeStep === 1 }"
							type="button"
							@click="setActiveStep(1)"
						>
							1
						</button>
						<button
							class="step-node"
							:class="{ active: activeStep === 2 }"
							type="button"
							@click="setActiveStep(2)"
						>
							2
						</button>
						<button
							class="step-node"
							:class="{ active: activeStep === 3 }"
							type="button"
							@click="setActiveStep(3)"
						>
							3
						</button>
					</div>

					<!-- 下方三塊說明區 -->
					<div class="steps-panels">
						<!-- STEP 1 -->
						<article
							class="step-panel"
							:class="{ active: activeStep === 1 }"
							@mouseenter="setActiveStep(1)"
						>
							<div class="step-panel-number">01</div>
							<h3 class="step-panel-title">
								{{ $t("hardware.steps.step1.title") }}
							</h3>
							<p class="step-panel-text">
								{{ $t("hardware.steps.step1.text") }}
							</p>
						</article>

						<!-- STEP 2 -->
						<article
							class="step-panel"
							:class="{ active: activeStep === 2 }"
							@mouseenter="setActiveStep(2)"
						>
							<div class="step-panel-number">02</div>
							<h3 class="step-panel-title">
								{{ $t("hardware.steps.step2.title") }}
							</h3>
							<p class="step-panel-text">
								{{ $t("hardware.steps.step2.text") }}
							</p>
						</article>

						<!-- STEP 3 -->
						<article
							class="step-panel"
							:class="{ active: activeStep === 3 }"
							@mouseenter="setActiveStep(3)"
						>
							<div class="step-panel-number">03</div>
							<h3 class="step-panel-title">
								{{ $t("hardware.steps.step3.title") }}
							</h3>
							<p class="step-panel-text">
								{{ $t("hardware.steps.step3.text") }}
							</p>
						</article>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
/**
 * activeStep：目前選中的流程步驟（1 / 2 / 3）
 * - 用來控制：
 *   1. 上方圓圈的 .active 樣式
 *   2. 下方對應說明卡片的 .active 樣式／互動
 */
const activeStep = ref(1);

const setActiveStep = (step) => {
	activeStep.value = step;
};
</script>
