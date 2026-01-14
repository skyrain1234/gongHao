<template>
	<!-- 外層套用 #portfolio 結構，讓你那組 CSS 生效 -->
		<div class="container my-5 page-portfolio" id="portfolio-area">
			<div class="h1 mb-4 fw-bold" data-aos="fade">{{ $t("nav.portfolio") }}</div>

			<!-- Tabs-->
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item" data-aos="fade" data-aos-delay="100">
					<a
						href="#"
						class="nav-link fw-bold fs-4"
						:class="{ active: activeTab === 'web' }"
						role="tab"
						:aria-selected="activeTab === 'web'"
						@click.prevent="setTab('web')"
					>
						{{ $t("nav.portfolioMenu.web") }}
					</a>
				</li>
				<li class="nav-item" data-aos="fade" data-aos-delay="200">
					<a
						href="#"
						class="nav-link fw-bold fs-4"
						:class="{ active: activeTab === 'project' }"
						role="tab"
						:aria-selected="activeTab === 'project'"
						@click.prevent="setTab('project')"
					>
						{{ $t("nav.portfolioMenu.project") }}
					</a>
				</li>
			</ul>

			<!-- Panels -->
			<div class="tab-content pt-3">
				<!-- 網頁作品 -->
				<div
					class="tab-pane fade"
					:class="{ 'show active': activeTab === 'web' }"
					role="tabpanel"
				>
					<WebPortfolioTab />
				</div>

				<!-- 專案作品 -->
				<div
					class="tab-pane fade"
					:class="{ 'show active': activeTab === 'project' }"
					role="tabpanel"
				>
					<ProjectTab />
				</div>
			</div>
		</div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import WebPortfolioTab from "@/components/guest/views/portfolio/WebPortfolioTab.vue";
import ProjectTab from "@/components/guest/views/portfolio/ProjectTab.vue";

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.tab === "project" ? "project" : "web");

function setTab(tab) {
	if (activeTab.value === tab) return;
	activeTab.value = tab;
	router.replace({ query: { ...route.query, tab } });
	nextTick(() => window.scrollTo({ top: 0, behavior: "smooth" }));
}

watch(
	() => route.query.tab,
	(t) => {
		activeTab.value = t === "project" ? "project" : "web";
		nextTick(() => window.scrollTo({ top: 0, behavior: "smooth" }));
	}
);
</script>
