<template>
	<section id="themeCourseDetail" class="themeCourseDetail">
		<!-- Same background system -->
		<div class="tcdBg" aria-hidden="true">
			<span class="tcdWave w1"></span>
			<span class="tcdWave w2"></span>
			<span class="tcdConfetti c1"></span>
			<span class="tcdConfetti c2"></span>
			<span class="tcdConfetti c3"></span>
			<span class="tcdCloud cl1"></span>
			<span class="tcdCloud cl2"></span>
		</div>

		<div class="tcdWrap">
			<div class="mb-3">
				<router-link :to="`/${currentLang}/course`" class="tcdBtn">
					<i class="bi bi-arrow-left-short"></i>主題課程列表
				</router-link>
			</div>

			<!-- Hero -->
			<header class="tcdHero reveal tcd-reveal">
				<div class="tcdHero__badge" v-if="course.detail_badge">
					{{ course.detail_badge }}
				</div>

				<div class="tcdHero__grid">
					<div class="tcdHero__main">
						<h1 class="tcdHero__title">{{ course.name }}</h1>
						<p class="tcdHero__desc">
							{{ course.description }}
						</p>

						<div class="tcdHero__tags" aria-label="課程標籤">
							<span class="tcdTag" v-for="tag in hashtags(course)" :key="tag">
								{{ tag }}
							</span>
						</div>

						<div class="tcdHero__actions">
							<!-- tcdPlan導航 -->
							<router-link
								v-if="course.plan_title && course.plan?.length"
								class="tcdBtn tcdBtn--primary"
								:to="{
									name: 'course',
									params: { lang: route.params.lang, courseId: course.id },
									hash: '#tcdPlan',
								}"
								>{{ course.plan_title }}
							</router-link>
							<!-- 活動花絮導航 -->
							<router-link
								v-if="course.images?.length"
								class="tcdBtn tcdBtn--secondary"
								:to="{
									name: 'course',
									params: { lang: route.params.lang, courseId: course.id },
									hash: '#tcdGallerySection',
								}"
								>活動花絮
							</router-link>
							<!-- 常見問題導航 -->
							<router-link
								v-if="course.faq?.length"
								class="tcdBtn tcdBtn--tertiary"
								:to="{
									name: 'course',
									params: { lang: route.params.lang, courseId: course.id },
									hash: '#tcdFaqSection',
								}"
								>常見問題
							</router-link>
							<!-- 底部區塊導航 -->
							<router-link
								v-if="course.cta?.button"
								class="tcdBtn tcdBtn--ghost"
								:to="{
									name: 'course',
									params: { lang: route.params.lang, courseId: course.id },
									hash: '#tcdSignup',
								}"
								>{{ course.cta.button }}</router-link
							>
						</div>
					</div>

					<!-- Cartoon cover (you can replace with <img>) -->
					<div class="tcdHero__media" role="img" aria-label="課程示意圖">
						<!-- 預覽圖片 -->
						<img
							class="tcdHero__img"
							:src="getStorageFileUrl(course.thumbnail_url)"
							alt="共創小時候的回憶"
						/>
					</div>
				</div>

				<!-- Key info strip -->
				<div class="tcdStrip">
					<div
						class="tcdStrip__item"
						v-for="(strip, i) in course.strip || []"
						:key="i"
					>
						<div class="tcdStrip__k">{{ strip.k }}</div>
						<div class="tcdStrip__v">{{ strip.v }}</div>
					</div>
				</div>
			</header>

			<!-- Highlights -->
			<section
				v-if="course.highlights_title"
				class="tcdSection reveal tcd-reveal"
				aria-labelledby="tcdHighlights"
			>
				<div class="tcdSection__head">
					<h2 id="tcdHighlights" class="tcdSection__title">
						{{ course.highlights_title }}
					</h2>
					<p class="tcdSection__desc">
						{{ course.highlights_desc }}
					</p>
				</div>

				<div class="tcdGrid3">
					<article class="tcdFeature">
						<div class="tcdFeature__icon" aria-hidden="true">★</div>
						<h3 class="tcdFeature__title">{{ course.highlight_1.title }}</h3>
						<p class="tcdFeature__text">
							{{ course.highlight_1.text }}
						</p>
					</article>
					<article class="tcdFeature">
						<div class="tcdFeature__icon" aria-hidden="true">★</div>
						<h3 class="tcdFeature__title">{{ course.highlight_2.title }}</h3>
						<p class="tcdFeature__text">
							{{ course.highlight_2.text }}
						</p>
					</article>
					<article class="tcdFeature">
						<div class="tcdFeature__icon" aria-hidden="true">★</div>
						<h3 class="tcdFeature__title">{{ course.highlight_3.title }}</h3>
						<p class="tcdFeature__text">
							{{ course.highlight_3.text }}
						</p>
					</article>
				</div>
			</section>

			<!-- Plan / Flow -->
			<section
				v-if="course.plan_title && course.plan?.length"
				id="tcdPlan"
				class="tcdSection reveal tcd-reveal"
				aria-labelledby="tcdPlanTitle"
			>
				<div class="tcdSection__head">
					<h2 id="tcdPlanTitle" class="tcdSection__title">
						{{ course.plan_title }}
					</h2>
				</div>

				<ol class="tcdSteps">
					<li class="tcdStep" v-for="(plan, i) in course.plan" :key="i">
						<div class="tcdStep__n">{{ i + 1 }}</div>
						<div class="tcdStep__body">
							<div class="tcdStep__t">{{ plan.t }}</div>
							<div class="tcdStep__d">
								{{ plan.d }}
							</div>
						</div>
					</li>
				</ol>
			</section>

			<!-- Gallery (optional) -->
			<section
				v-if="course.images?.length"
				class="tcdSection reveal tcd-reveal"
				id="tcdGallerySection"
				aria-labelledby="tcdGallery"
			>
				<div class="tcdSection__head">
					<h2 id="tcdGallery" class="tcdSection__title">活動花絮</h2>
				</div>

				<div class="tcdGallery">
					<img
						v-for="(img, idx) in course.images"
						:key="img.id"
						class="tcdShot"
						:src="getStorageFileUrl(img.image_url)"
						:alt="img.alt"
						role="button"
						tabindex="0"
						@click="openLightbox(img, idx)"
						@keydown.enter.prevent="openLightbox(img, idx)"
						@keydown.space.prevent="openLightbox(img, idx)"
					/>
				</div>
			</section>

			<!-- FAQ -->
			<section
				v-if="course.faq?.length"
				class="tcdSection reveal tcd-reveal"
				id="tcdFaqSection"
				aria-labelledby="tcdFaq"
			>
				<div class="tcdSection__head">
					<h2 id="tcdFaq" class="tcdSection__title">常見問題</h2>
					<p class="tcdSection__desc"></p>
				</div>

				<div class="tcdFaq" role="list">
					<template v-for="(faq, i) in course.faq" :key="i">
						<button class="tcdFaq__q" type="button" aria-expanded="false">
							<span>{{ faq.q }}</span>
							<span class="tcdFaq__icon" aria-hidden="true">＋</span>
						</button>
						<div class="tcdFaq__a" role="listitem">
							<p>{{ faq.a }}</p>
						</div>
					</template>
				</div>
			</section>

			<!-- Signup / CTA -->
			<section
				v-if="course.cta?.title"
				id="tcdSignup"
				class="tcdSignup reveal tcd-reveal"
				aria-labelledby="tcdSignupTitle"
			>
				<div class="tcdSignup__card">
					<div class="tcdSignup__text">
						<h2 id="tcdSignupTitle" class="tcdSignup__title">
							{{ course.cta.title }}
						</h2>
						<p class="tcdSignup__desc">
							{{ course.cta.desc }}
						</p>
					</div>
					<div class="tcdSignup__actions">
						<a
							class="tcdBtn tcdBtn--primary"
							:href="course.cta.url"
							target="_blank"
							>{{ course.cta?.button }}</a
						>
					</div>
				</div>
			</section>

			<!-- 自定content -->
			<section
				v-if="courseContent"
				class="tcdSection reveal tcd-reveal"
				id="tcdContentSection"
				aria-labelledby="tcdContent"
			>
				<div v-html="courseContent"></div>
			</section>
		</div>
	</section>
	<!-- Modal (燈箱效果) -->
	<div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content bg-dark">
				<div class="modal-body p-0 text-center">
					<img
						id="lightboxImage"
						:src="lightboxImageSrc"
						class="img-fluid rounded"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	onMounted,
	onBeforeUnmount,
	ref,
	watch,
	nextTick,
	computed,
} from "vue";
import { getCourse } from "@/api/main/service/course/courseService";
import {
	getStorageFileUrl,
	absolutizeContentUrls,
} from "@/api/main/tools/storageFileTools";
import { useCurrentLang } from "@/api/main/tools/useCurrentLang";
import { useRoute } from "vue-router";
import { initReveal } from "@/utils/reveal.js";
import { Modal } from "bootstrap";

const { currentLang } = useCurrentLang();
const route = useRoute();

const emptyCourse = () => ({
	highlight_1: { title: "", text: "" },
	highlight_2: { title: "", text: "" },
	highlight_3: { title: "", text: "" },
	cta: { title: "", desc: "", button: "", url: "" },
	strip: [],
	plan: [],
	faq: [],
	images: [],
	name: "",
	description: "",
	detail_badge: "",
	highlights_title: "",
	highlights_desc: "",
	plan_title: "",
	hashtag: "",
});

const course = ref(emptyCourse());
// Lightbox
const lightboxImageSrc = ref("");
const lightboxAlt = ref("");
const lightboxIndex = ref(0);

let lightboxModal = null;

function openLightbox(img, idx = 0) {
	lightboxIndex.value = idx;
	lightboxImageSrc.value = getStorageFileUrl(img.image_url);
	lightboxAlt.value = img.alt || "";

	const el = document.getElementById("lightboxModal");
	if (!el) return;

	// 初始化一次就好
	if (!lightboxModal) {
		lightboxModal = new Modal(el, {
			backdrop: true,
			keyboard: true,
			focus: true,
		});

		// 關閉時清空（可選）
		el.addEventListener("hidden.bs.modal", () => {
			lightboxImageSrc.value = "";
			lightboxAlt.value = "";
		});
	}

	lightboxModal.show();
}

let revealCtl = null;

// FAQ click handler
let faqClickHandler = null;

const loadCourse = async (id) => {
	try {
		const response = await getCourse(id);
		course.value = { ...emptyCourse(), ...response };
	} catch (err) {
		console.error("getCourse error:", err);
		course.value = emptyCourse();
	}
};

function bindFaq(root) {
	// 避免重複綁
	if (faqClickHandler) root.removeEventListener("click", faqClickHandler);

	faqClickHandler = (e) => {
		const btn = e.target.closest(".tcdFaq__q");
		if (!btn) return;

		const isOpen = btn.getAttribute("aria-expanded") === "true";

		// close others（保留你原本行為）
		root.querySelectorAll(".tcdFaq__q").forEach((b) => {
			b.setAttribute("aria-expanded", "false");
		});

		btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
	};

	root.addEventListener("click", faqClickHandler);
}

async function setupReveal() {
	// 先清掉舊的 observer（切換 courseId 時很重要）
	revealCtl?.destroy?.();
	revealCtl = null;

	// 等 DOM（v-if 區塊）渲染完成再掃
	await nextTick();
	revealCtl = initReveal("#themeCourseDetail");
}

onMounted(async () => {
	const root = document.querySelector("#themeCourseDetail");
	if (!root) return;

	// 先等資料回來（避免 reveal 掃不到）
	await loadCourse(route.params.courseId);

	// nextTick 後 initReveal
	await setupReveal();

	// FAQ 委派
	bindFaq(root);
});

watch(
	() => route.params.courseId,
	async (newId, oldId) => {
		if (!newId || newId === oldId) return;

		await loadCourse(newId);
		window.scrollTo({ top: 0, behavior: "smooth" });

		// 切換文章後重新掃 reveal
		await setupReveal();
	},
);

// 處理 hashtag
function hashtags(data) {
	const s = data?.hashtag;
	if (!s) return [];
	return String(s)
		.split(",")
		.map((x) => x.trim())
		.filter(Boolean);
}

onBeforeUnmount(() => {
	revealCtl?.destroy?.();
	revealCtl = null;

	const root = document.querySelector("#themeCourseDetail");
	if (root && faqClickHandler)
		root.removeEventListener("click", faqClickHandler);
	faqClickHandler = null;

	try {
		lightboxModal?.dispose?.();
	} catch (e) {}
	lightboxModal = null;
});

// 內文 HTML（轉換圖片 / 連結路徑）
const courseContent = computed(() =>
	absolutizeContentUrls(course.value?.content || ""),
);
</script>
