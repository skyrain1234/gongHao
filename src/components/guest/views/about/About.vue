<template>
  <section
    id="assocAboutWrap"
    class="fwAbout"
    aria-label="協會介紹大區塊（基金會風格）"
  >
    <!-- 背景獨立元件 -->
    <Background />

    <!-- 內文容器 -->
    <div class="fwInner">
      <!-- Hero Logo -->
      <Hero />

      <!-- 每個區塊拆成元件 -->
      <MissionSection />
      <HistorySection />
      <ChairSection />
      <FounderSection />
      <BlessSection />
      <!-- <TeamSection /> -->

      <!-- PDF 區塊（需要 props） -->
      <ArticlePdfSection/>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { getAssociationArticleList } from "@/api/main/service/about/associationArticleService";
import { initReveal } from "@/utils/reveal.js";

// components
import Background from "@/components/guest/views/about/01_BackgroundSection.vue";
import Hero from "@/components/guest/views/about/02_HeroSection.vue";
import MissionSection from "@/components/guest/views/about/03_MissionSection.vue";
import HistorySection from "@/components/guest/views/about/04_HistorySection.vue";
import ChairSection from "@/components/guest/views/about/05_ChairSection.vue";
import FounderSection from "@/components/guest/views/about/06_FounderSection.vue";
import BlessSection from "@/components/guest/views/about/07_BlessSection.vue";
import TeamSection from "@/components/guest/views/about/08_TeamSection.vue";
import ArticlePdfSection from "@/components/guest/views/about/09_ArticlePdfSection.vue";


let revealCtl = null;

onMounted(async () => {

  revealCtl = initReveal("#assocAboutWrap");
  requestAnimationFrame(() => initReveal("#assocAboutWrap")); // 第二拍保險（可留）
});

onBeforeUnmount(() => {
  revealCtl?.destroy?.();
  revealCtl = null;
});
</script>
