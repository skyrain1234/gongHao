<template>
  <!-- ✅ Loading Overlay -->
  <div
    ref="pageLoaderEl"
    id="pageLoader"
    class="page-loader"
    aria-hidden="false"
  >
    <div class="page-loader__inner">
      <img
        class="page-loader__gif"
        src="@/assets/images/index/loader.gif"
        alt="Loading"
        width="220"
        height="220"
        loading="eager"
        decoding="async"
      />
      <div class="page-loader__text">Loading…</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// ✅ 只把這個換成 Vue ref，其餘邏輯保持你原本的寫法
const pageLoaderEl = ref(null);

onMounted(() => {
  // ✅ Loader controller（幾乎原封不動）
  (() => {
    const loader = pageLoaderEl.value; // ← 唯一差異：用 ref 取代 getElementById
    if (!loader) return;

    const MIN_SHOW_MS = 2500; // 至少顯示多久，避免閃一下
    const FADE_DELAY_MS = 240; // 進入淡出前的短暫延遲
    const start = performance.now();

    document.documentElement.classList.add("is-loading");
    document.body.classList.add("is-loading");

    function hideLoader() {
      // ✅ 已隱藏就不要重跑（避免重複觸發）
      if (loader.classList.contains("is-hidden")) return;

      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_SHOW_MS - elapsed);

      setTimeout(() => {
        setTimeout(() => {
          loader.classList.add("is-hidden");
          loader.setAttribute("aria-hidden", "true");
          document.documentElement.classList.remove("is-loading");
          document.body.classList.remove("is-loading");
        }, FADE_DELAY_MS);
      }, wait);
    }

    // 1) 最常用：等整頁資源（含圖片）載入完（保留）
    window.addEventListener("load", hideLoader);

    // ✅ Vue / SPA 保底：如果不會觸發 load，也會在 mounted 後走一次
    // （不會「每次換頁重顯示」，因為這個元件不會重掛就只跑一次）
    setTimeout(hideLoader, 0);

    // 2) 保底：若某些資源卡住，最多 8 秒自動關閉（保留）
    setTimeout(hideLoader, 8000);

    // 3) 如果你想手動關閉：在你自己的初始化完成後呼叫 window.hidePageLoader()
    window.hidePageLoader = hideLoader;

    // ✅ 卸載時清理（避免殘留 is-loading）
    onBeforeUnmount(() => {
      window.removeEventListener("load", hideLoader);
      if (window.hidePageLoader === hideLoader) delete window.hidePageLoader;
      document.documentElement.classList.remove("is-loading");
      document.body.classList.remove("is-loading");
    });
  })();
});
</script>
