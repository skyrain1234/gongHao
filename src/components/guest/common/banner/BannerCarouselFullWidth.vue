<template>
  <div class="crpartFullWidth" >
    <swiper
      v-if="bannerList.length"
      :slides-per-view="1"
      :space-between="0"
      :loop="bannerList.length > 1"
      :navigation="bannerList.length > 1"
      :speed="800"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :modules="[Navigation , Autoplay]"
      :key="bannerList.length"
    >
      <swiper-slide v-for="banner in bannerList" :key="banner.id">
        <a :href="banner.link" target="_blank" class="slide-link">
          <img
            :src="getStorageFileUrl(banner.thumbnail_url)"
            :alt="banner.alt || ''"
            class="slide-img"
            decoding="async"
          />
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getBannerList } from "@/api/main/service/bannerService";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// 把圖片轉成網址
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";

// 從父層接收 pageKey
const props = defineProps({
  pageKey: { type: String, required: true },
});

const bannerList = ref([]);

const loadBannerList = async () => {
  const response = await getBannerList({ page_key: props.pageKey });
  bannerList.value = response;
};

onMounted(() => {
  loadBannerList();
});
</script>

<style lang="scss" scoped>
.crpartFullWidth {
  --swiper-navigation-color: #e6e6e682;
	--swiper-navigation-size: 32px;

  :deep(.swiper-button-prev) { left: 7vw; right: auto; };
  :deep(.swiper-button-next) { right: 7vw; left: auto; };
  :deep(.swiper-button-prev:hover),
  :deep(.swiper-button-next:hover) { color: #ffffff; }

  // height: 90vh;
  aspect-ratio: 16 / 9 ;
  @media (max-width: 992px) { aspect-ratio: 3 / 2 ; }

  /* 把高度一路傳給 Swiper 內層 */
  :deep(.swiper),
  :deep(.swiper-wrapper),
  :deep(.swiper-slide) { height: 100%; }

  /* a 與 img 吃滿容器高度 */
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-position: center;
    background: #D6D6D6;        /* 留白顏色，與上方底色一致 */
  }
}
</style>

