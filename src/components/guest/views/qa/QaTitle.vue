<template>
	<div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
		<div>
			<span class="badge-chip">
				<i class="bi bi-stars"></i>
				{{ $t("qa.badge") }}
			</span>
			<h1 class="section-title fw-bold">
				{{ $t("qa.title") }}
			</h1>
			<p class="section-subtitle mt-2">
				{{ $t("qa.subtitle") }}
			</p>
		</div>
		<div class="faq-aside align-self-lg-center">
			<div class="faq-aside-title">
				{{ $t("qa.aside_title") }}
			</div>
			<div class="faq-aside-desc">
				{{ $t("qa.aside_desc") }}
			</div>
			<!-- 聯絡我們 -->
			<a class="faq-contact-btn" @click="openChat">
				<i class="bi bi-chat-dots"></i>
				{{ $t("nav.contact") }}
			</a>
		</div>
	</div>
</template>

<script setup>
import { useContactChatStore } from "@/stores/contactChat";

// 聊天框
const chatStore = useContactChatStore();

const openChat = () => {
	chatStore.open();
};
</script>
