// src/api/main/tools/revealOnScroll.js

/**
 * 啟用「往下＋模糊 → 滾進視窗變清晰」的進場動畫
 *
 * @param {Object} options
 * @param {string} [options.selector='.reveal-on-scroll'] - 要套動畫的元素選擇器
 * @param {number|number[]} [options.threshold=0.2] - IntersectionObserver threshold
 * @param {Element|null} [options.root=null] - 觀察範圍的 root（預設是 viewport）
 * @param {string} [options.rootMargin='0px'] - root 的 margin
 * @param {boolean} [options.once=true] - 是否只播放一次動畫
 *
 * @returns {{ destroy: () => void }}
 */
export function initRevealOnScroll({
	selector = ".reveal-on-scroll",
	threshold = 0.2,
	root = null,
	rootMargin = "0px",
	once = true,
} = {}) {
	// 找出所有目標元素
	const targets = Array.from(document.querySelectorAll(selector));

	if (!targets.length) {
		// 沒東西可觀察也返回一個安全的 destroy
		return {
			destroy() {},
		};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");

					// 只需要觸發一次的話，就取消觀察
					if (once) {
						observer.unobserve(entry.target);
					}
				}
			});
		},
		{
			root,
			rootMargin,
			threshold,
		}
	);

	// 開始觀察所有目標元素
	targets.forEach((el) => observer.observe(el));

	// 回傳清理函式，給 Vue 頁面在 onBeforeUnmount 用
	return {
		destroy() {
			observer.disconnect();
		},
	};
}
