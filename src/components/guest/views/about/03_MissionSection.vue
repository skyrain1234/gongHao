<template>
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
					<span>共學</span><span>陪伴</span><span>連結</span><span>共好</span>
				</div>
			</article>

			<article class="fwCard fwCard--tint reveal">
				<div class="fwCard__label">核心任務</div>

				<!-- 預覽 4 筆 -->
				<ul class="fwList fwList--compact">
					<li v-for="(item, idx) in previewMissions" :key="idx">{{ item }}</li>
				</ul>

				<!-- 右下 More -->
				<div class="fwMore" v-if="hasMore">
					<button class="fwMore__btn" type="button" @click="openMissionModal">
						more <span class="fwMore__arrow" aria-hidden="true">→</span>
					</button>
				</div>

				<!-- Modal -->
				<dialog ref="missionDialog" class="fwModal" @click="onDialogClick">
					<div class="fwModal__panel">
						<header class="fwModal__head">
							<h3 class="fwModal__title">核心任務</h3>
							<button
								class="fwModal__close"
								type="button"
								@click="closeMissionModal"
							>
								×
							</button>
						</header>

						<div class="fwModal__body">
							<ul class="fwList">
								<li v-for="(item, idx) in missions" :key="idx">{{ item }}</li>
							</ul>
						</div>

						<footer class="fwModal__foot">
							<button class="fwBtn" type="button" @click="closeMissionModal">
								關閉
							</button>
						</footer>
					</div>
				</dialog>
			</article>
		</div>
	</section>
</template>
<script setup>
import { computed, ref } from "vue";

const missions = [
	"舉辦跨世代共學、共創、共融、共好相關活動",
	"推廣多元文化之交流與保存，特別著重於客家文化之傳承、原住民文化之保存，以及新住民文化之融合",
	"發展世代對話與代間交流方案，促進不同世代之理解與同理",
	"執行跨世代志工計畫與社區陪伴及支持服務",
	"協助學校、社區與各類機構導入跨世代教育與合作模式",
	"培訓跨世代活動設計、帶領人員及相關營運管理人才",
	"承辦與執行中央或地方政府之教育、社會福利、創新創意等相關計畫",
	"進行跨世代共好相關之研究、出版與推廣工作",
	"舉辦論壇、工作坊與研討會，提升社會大眾之關注與參與",
	"連結國內外相關組織與團體，拓展跨世代行動與合作網絡",
	"結合 AI 科技融入跨世代教育，發展相關教材、工具與推廣應用",
	"規劃並執行符合 SDGs 17 項永續發展目標之行動方案",
	"辦理其他符合本會章程宗旨及相關規定之事項與活動",
];

const PREVIEW_COUNT = 4;
const previewMissions = computed(() => missions.slice(0, PREVIEW_COUNT));
const hasMore = computed(() => missions.length > PREVIEW_COUNT);

const missionDialog = ref(null);

const openMissionModal = () => missionDialog.value?.showModal?.();
const closeMissionModal = () => missionDialog.value?.close?.();

// ✅ 點到 backdrop 才關（點內容不關）
const onDialogClick = (e) => {
	const dlg = missionDialog.value;
	if (!dlg) return;
	if (e.target === dlg) dlg.close();
};
</script>

<style scoped>
/* list preview 稍微緊湊，避免右卡過長 */
#assocAboutWrap .fwList--compact li {
	margin-bottom: 10px;
}
</style>
