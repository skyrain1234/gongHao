<template>
	<div class="page-product mt-2">
		<!-- banner -->
		<img src="@/assets/images/web/banner.png" class="w-100" alt="" />
		<!-- 進版主視覺 -->
		<Hero />
		<!-- server介紹區塊 -->
		<ServerIntro />
	</div>
</template>

<script setup>
import Hero from "@/components/guest/views/webDesign/Hero.vue";
import ServerIntro from "@/components/guest/views/webDesign/ServerIntro.vue";
</script>
