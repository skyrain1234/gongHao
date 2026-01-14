<template>
  <div class="fab-container" :class="{ 'is-visible': isVisible }">
    <!-- Go Top -->
    <button class="fab-button" @click="scrollToTop" aria-label="回到頂部">
      <span class="material-icons">keyboard_double_arrow_up</span>
    </button>
    <!-- Go Top -->
    <button class="fab-button" @click="scrollToBottom" aria-label="回到頂部">
      <span class="material-icons">keyboard_double_arrow_down</span>
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isVisible = ref(false);

const onScroll = () => {
  isVisible.value = window.scrollY >= window.innerHeight;
};

onMounted(() => {
  onScroll(); // 初始判斷一次
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function scrollToBottom() {
  const root = document.scrollingElement;
  window.scrollTo({
    top: root.scrollHeight,
    behavior: "smooth",
  });
}
</script>

<style lang="scss" scoped>
.fab-container {
  position: fixed;
  bottom: 40px;
  /* 距離底部 40px*/
  left: 30px;
  /* 距離左側 30px*/
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 9999;
}

/* 預設隱藏（不可點） */
.fab-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.2s,
    background-color 0.3s ease;
}

.fab-button:hover {
  background-color: #222;
}

.fab-button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.fab-container.is-visible .fab-button {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.material-icons {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
}

/* 平板以下（≤768px）：不顯示 */
@media (max-width: 768px) {
	.fab-container {
		display: none;
	}
}
</style>
