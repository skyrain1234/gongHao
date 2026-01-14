<template>
	<section class="general-banner" role="banner" :aria-label="heading" :style="sectionStyle">
		<div class="general-banner-overlay-text" data-aos="fade" :data-aos-duration="aosDuration" data-aos-once="false" data-aos-mirror="true">
			<h1 class="text-white m-0"><strong>{{ heading }}</strong></h1>
			<div class="title-rule" :style="{ background: ruleColor }"></div>
			<div class="my-2 text-white">
				<em class="h5">{{ subtitle }}</em>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	/** 主標 */
	heading: { type: String, required: true },
	/** 副標 */
	subtitle: { type: String, default: '' },
	/** 背景圖 url */
	bg: { type: String, required: true },

	/** 下方分隔線顏色 */
	ruleColor: { type: String, default: '#C5C4C1' },

	/** AOS 動畫時間（ms） */
	aosDuration: { type: [Number, String], default: 700 },

	/** 桌機/手機比例（字串 '23/5' 這種） */
	ratioDesktop: { type: String, default: '23/5' },
	ratioMobile: { type: String, default: '14/7' },

	/** 背景定位/尺寸 */
	position: { type: String, default: 'center' },
	size: { type: String, default: 'cover' }
})

const sectionStyle = computed(() => ({
	'--ratio-desktop': props.ratioDesktop,
	'--ratio-mobile': props.ratioMobile,
	backgroundImage: `url(${props.bg})`,
	backgroundPosition: props.position,
	backgroundSize: props.size,
	backgroundRepeat: 'no-repeat'
}))

</script>

<style lang="scss" scoped>
.general-banner {
	position: relative;
	width: 100%;
	aspect-ratio: var(--ratio-desktop, 23/5);
	display: grid;
	place-items: center;

	@media (max-width: 992px) {
		aspect-ratio: var(--ratio-mobile, 14/7);
	}

	&-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
}
.general-banner-overlay-text {
	position: relative;
	width: 100%;
	text-align: center;
	padding: clamp(16px, 3vw, 40px);

	.title-rule {
		width: 200px;
		height: 2px;
		margin: .5rem auto 0;
	}
}

/* 小工具類（可改為你的全域樣式） */
.text-white {
	color: #fff;
}

.m-0 {
	margin: 0;
}

.h5 {
	font-size: 1.25rem;
}

.my-2 {
	margin: .5rem 0;
}
</style>
