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
	import HomeFoundationBridge from "@/components/guest/views/home/HomeFoundationBridge.vue";
	import HomeNews from "@/components/guest/views/home/HomeNews.vue";
	import HomeEvent from "@/components/guest/views/home/HomeEvent.vue";
	import HomeCourseBlock from "@/components/guest/views/home/HomeCourseBlock.vue";
	import HomePartners from "@/components/guest/views/home/HomePartners.vue";
</script>
