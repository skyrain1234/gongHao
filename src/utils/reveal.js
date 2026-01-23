// src/utils/reveal.js
export function initReveal(rootSelector = "#assocAboutWrap") {
    // 限定範圍：拆元件後也不會掃到別頁
	const root = document.querySelector(rootSelector) || document;

	const els = Array.from(root.querySelectorAll(".reveal"));
	if (!els.length) return { destroy: () => {} };

	// set stagger indices for containers
	root.querySelectorAll(".reveal-stagger").forEach((wrap) => {
		const step = wrap.getAttribute("data-stagger-step");
		if (step) wrap.style.setProperty("--rv-stagger-step", `${step}ms`);

		const children = Array.from(wrap.querySelectorAll(":scope > .reveal"));
		children.forEach((el, i) => el.style.setProperty("--rv-stagger-index", i));
	});

	// apply per-element data settings
	els.forEach((el) => {
		const delay = el.getAttribute("data-reveal-delay");
		const dur = el.getAttribute("data-reveal-dur");
		const dist = el.getAttribute("data-reveal-dist");
		if (delay) el.style.setProperty("--rv-delay", `${delay}ms`);
		if (dur) el.style.setProperty("--rv-dur", `${dur}ms`);
		if (dist) el.style.setProperty("--rv-dist", `${dist}px`);
	});

	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const el = entry.target;
				const onceAttr = el.getAttribute("data-reveal-once");
				const once = onceAttr === null ? true : onceAttr !== "false";

				if (entry.isIntersecting) {
					el.classList.add("is-in");
					if (once) io.unobserve(el);
				} else {
					if (!once) el.classList.remove("is-in");
				}
			});
		},
		{ root: null, threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
	);

	els.forEach((el) => io.observe(el));

	return {
		destroy() {
			io.disconnect();
		},
	};
}
