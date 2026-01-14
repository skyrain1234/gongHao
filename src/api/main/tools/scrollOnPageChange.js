// src/composables/useScrollOnPageChange.js
import { watch, nextTick } from "vue";

/**
 * 當頁碼變動時自動捲動
 * @param {Ref<number>} currentPage 當前頁碼
 * @param {Ref<HTMLElement>|null} targetRef 指定的 DOM 元素 (可選)
 */
export function useScrollOnPageChange(currentPage, targetRef = null) {
  watch(currentPage, async () => {
    await nextTick();
    if (targetRef?.value) {
      // 捲到指定元素
      targetRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // 沒傳 targetRef → 預設捲到整頁頂部
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}
