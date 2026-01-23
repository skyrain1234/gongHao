<template>
	<BannerCarouselFullWidth page-key="index"/>
	<HomeFoundationBridge />
	<HomeNews />
	<section id="foundationBg">
		<HomeEvent />
		<HomeCourseBlock />
	</section>
	<HomePartners />
</template>

<script setup>
	import BannerCarouselFullWidth from "@/components/guest/common/banner/BannerCarouselFullWidth.vue";
	import HomeFoundationBridge from "@/components/guest/views/home/02_HomeFoundationBridge.vue";
	import HomeNews from "@/components/guest/views/home/03_HomeNews.vue";
	import HomeEvent from "@/components/guest/views/home/04_HomeEvent.vue";
	import HomeCourseBlock from "@/components/guest/views/home/05_HomeCourseBlock.vue";
	import HomePartners from "@/components/guest/views/home/06_HomePartners.vue";
</script>
