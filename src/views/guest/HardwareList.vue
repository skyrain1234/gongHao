<template>
	<div class="page-product mt-2">
		<!-- 進版主視覺 -->
		<Hero />
		<!-- 服務流程步驟 -->
		<Step />
		<!-- server介紹區塊 -->
		<ServerIntro />
		<!-- POS & 其他周邊 -->
		<Hardware id="hardware" />
	</div>
</template>

<script setup>
import Hero from "@/components/guest/views/hardware/Hero.vue";
import Step from "@/components/guest/views/hardware/Step.vue";
import ServerIntro from "@/components/guest/views/hardware/ServerIntro.vue";
import Hardware from "@/components/guest/views/hardware/Hardware.vue";
</script>
