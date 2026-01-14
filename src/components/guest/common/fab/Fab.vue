<template>
	<!-- ✅ 加上 is-visible 控制：頂端顯示、接近底部隱藏 -->
	<div class="fab-container" :class="{ 'is-visible': isVisible }">
		<!-- fb連結 -->
		<a :href="webSetting.facebook_link" target="_blank" class="fab-button" v-if="webSetting.facebook_link">
			<i class="bi bi-facebook"></i>
		</a>
		<!-- line連結 -->
		<a :href="webSetting.line_link" target="_blank" class="fab-button" v-if="webSetting.line_link">
			<i class="bi bi-line"></i>
		</a>
		<!-- 聯絡我們按鈕 -->
		<button
			class="fab-button"
			id="openChatBtn"
			type="button"
			@click.prevent="toggleChat"
		>
			<i class="bi bi-chat-left-text"></i>
		</button>
	</div>

	<!-- 聯絡表單聊天框 -->
	<div
		class="contact-chatbox"
		id="contactChatbox"
		:class="{ 'is-open': isOpen }"
	>
		<div class="chatbox-header">
			<span><i class="bi bi-envelope-paper"></i> {{ $t("nav.contact") }}</span>
			<button type="button" class="close-btn" id="closeChat" @click="closeChat">
				<i class="bi bi-x-lg"></i>
			</button>
		</div>

		<div class="chatbox-body">
			<form
				ref="contactFormRef"
				id="contactForm"
				@submit.prevent="submitContact"
			>
				<!-- 蜜罐欄位（人類看不到） -->
				<div class="d-none">
					<input
						type="text"
						v-model="formData.website"
						autocomplete="off"
						tabindex="-1"
					/>
				</div>

				<!-- 公司行號 -->
				<div class="mb-1">
					<label for="company" class="form-label">
						{{ $t("contact.fields.company") }}
						<span class="text-danger">*</span>
					</label>
					<input
						type="text"
						id="company"
						class="form-control"
						v-model="formData.company"
						required
					/>
				</div>

				<!-- 公司地址 -->
				<div class="mb-1">
					<label for="company_address" class="form-label">
						{{ $t("contact.fields.companyAddress") }}
					</label>
					<input
						type="text"
						id="company_address"
						class="form-control"
						v-model="formData.company_address"
					/>
				</div>

				<!-- 聯絡人 -->
				<div class="mb-1">
					<label for="name" class="form-label">
						{{ $t("contact.fields.pointOfContact") }}
						<span class="text-danger">*</span>
					</label>
					<input
						type="text"
						id="name"
						class="form-control"
						required
						v-model="formData.name"
						ref="nameInputRef"
					/>
				</div>

				<!-- 公司行業別 -->
				<div class="mb-1">
					<label for="industry" class="form-label">
						{{ $t("contact.fields.industry") }}
					</label>
					<input
						type="text"
						id="industry"
						class="form-control"
						v-model="formData.industry"
					/>
				</div>

				<!-- 連絡電話 -->
				<div class="mb-1">
					<label for="phone" class="form-label">
						{{ $t("contact.fields.phone") }}
						<span class="text-danger">*</span>
					</label>
					<input
						type="tel"
						id="phone"
						class="form-control"
						required
						v-model="formData.phone"
					/>
				</div>

				<!-- 公司統編 -->
				<div class="mb-1">
					<label for="tax_id" class="form-label">
						{{ $t("contact.fields.taxId") }}
					</label>
					<input
						type="text"
						id="tax_id"
						class="form-control"
						v-model="formData.tax_id"
						inputmode="numeric"
						autocomplete="off"
					/>
				</div>

				<!-- email -->
				<div class="mb-1">
					<label for="email" class="form-label">
						{{ $t("contact.fields.email") }}
						<span class="text-danger">*</span>
					</label>
					<input
						type="email"
						id="email"
						class="form-control"
						required
						v-model="formData.email"
					/>
				</div>

				<!-- 主旨（服務項目） -->
				<div class="mb-1">
					<label for="subject" class="form-label">
						{{ $t("contact.fields.service") }}
						<span class="text-danger">*</span>
					</label>

					<select
						id="subject"
						class="form-select"
						aria-label="Default select example"
						v-model="formData.subject"
						required
					>
						<option value="" disabled>
							{{ $t("contact.placeholders.servicePlaceholder") }}
						</option>

						<option
							v-for="code in SERVICE_CODES"
							:key="code"
							:value="t(`contact.serviceOptions.${code}`, {}, { locale: 'zh-TW' })"
						>
							{{ t(`contact.serviceOptions.${code}`) }}
						</option>
					</select>
				</div>


				<!-- 需求備註 -->
				<div class="mb-1">
					<label for="note" class="form-label">
						{{ $t("contact.fields.note") }}
					</label>
					<textarea
						id="note"
						class="form-control"
						rows="2"
						v-model="formData.note"
					></textarea>
				</div>

				<!-- 留言內容 -->
				<div class="mb-1">
					<label for="message" class="form-label">
						{{ $t("contact.fields.message") }}
						<span class="text-danger">*</span>
					</label>
					<textarea
						id="message"
						class="form-control"
						rows="3"
						required
						v-model="formData.message"
					></textarea>
				</div>

				<button type="submit" class="contact-btn" :disabled="isLoading">
					{{ $t("contact.buttons.submit") }}
				</button>
			</form>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
	reactive,
	nextTick,
	watch,
	computed,
	onMounted,
	onBeforeUnmount,
} from "vue";
import { loadingAlert, successAlert, errorAlert } from "@/utils/sweetalert";
import { submitContactData } from "@/api/main/service/contactService";
import { formatErrorMessages } from "@/utils/formatter";

import { useWebSettingStore } from "@/stores/webSetting";
import { useContactChatStore } from "@/stores/contactChat";
import { useI18n } from "vue-i18n";

const webSetting = computed(() => useWebSettingStore().webSetting);
const { t } = useI18n();

const chatStore = useContactChatStore();
const isOpen = computed(() => chatStore.isOpen);

// ✅ FAB：頂端顯示、接近底部隱藏
const isVisible = ref(true);

const onScroll = () => {
	const doc = document.documentElement;
	const scrollTop = window.scrollY || doc.scrollTop;
	const clientH = doc.clientHeight;
	const scrollH = doc.scrollHeight;

	const bottomOffset = 160; // ⭐ 距離底部剩 160px 就隱藏（可自行調）
	const nearBottom = scrollTop + clientH >= scrollH - bottomOffset;

	isVisible.value = !nearBottom;
};

onMounted(() => {
	onScroll(); // 初始判斷一次（確保頂端顯示）
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", onScroll, { passive: true });
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", onScroll);
	window.removeEventListener("resize", onScroll);
});

// 表單資料（新增欄位：company_address、industry、tax_id）
const formData = reactive({
	name: "",
	company: "",
	company_address: "",
	industry: "",
	phone: "",
	tax_id: "",
	email: "",
	subject: "",
	message: "",
	note: "",
	website: "",
});

// ✅ 加上 hardware
const SERVICE_CODES = [
	"cloud",
	"software",
	"hardware",
	"web",
	"grant",
	"course",
	"other",
];

const isLoading = ref(false);

// DOM refs
const nameInputRef = ref(null);
const contactFormRef = ref(null);

const closeChat = () => {
	chatStore.close();
};

const toggleChat = async () => {
	chatStore.toggle();
	await nextTick();
	if (chatStore.isOpen && nameInputRef.value) {
		nameInputRef.value.focus();
	}
};

/**
 * 表單送出
 */
const submitContact = async () => {
	if (isLoading.value) return;

	// ✅ 先檢查必填，避免先打 API
	if (!formData.subject) {
		errorAlert("請選擇服務項目");
		return;
	}

	isLoading.value = true;

	try {
		const response = await submitContactData(formData);

		if (response.success) {
			successAlert(response.message);

			// 成功後關閉聊天框 + 清空表單
			closeChat();

			// Object.assign(formData, {
			// 	name: "",
			// 	company: "",
			// 	company_address: "",
			// 	industry: "",
			// 	phone: "",
			// 	tax_id: "",
			// 	email: "",
			// 	subject: "",
			// 	message: "",
			// 	note: "",
			// 	website: "",
			// });
		} else {
			errorAlert(response.message, formatErrorMessages(response.data));
		}
	} catch (err) {
		console.error(err);
		errorAlert("送出失敗");
	} finally {
		isLoading.value = false;
	}
};

watch(isLoading, (newValue) => {
	if (newValue) loadingAlert("送出中");
});
</script>

<style lang="scss" scoped>
/* 你的樣式原封不動 + ✅新增 is-visible 顯示/隱藏控制 */
.fab-container {
	position: fixed;
	right: var(--fab-margin);
	bottom: var(--fab-margin);
	display: flex;
	flex-direction: column;
	gap: var(--fab-gap);
	z-index: 1000;

	/* ✅ 預設可由 is-visible 控制 */
	opacity: 0;
	transform: translateY(8px);
	pointer-events: none;
	transition: opacity 0.25s ease, transform 0.25s ease;
}

.fab-container.is-visible {
	opacity: 1;
	transform: translateY(0);
	pointer-events: auto;
}

.fab-button {
	width: var(--fab-size);
	height: var(--fab-size);
	border-radius: 50%;
	border: none;
	background-color: var(--btn-primary-bg);
	color: #fff;
	font-size: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: var(--shadow-soft, 0 4px 12px rgba(0, 0, 0, 0.2));
	cursor: pointer;
	transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.fab-button:hover {
	background-color: var(--btn-primary-bg-hover);
	transform: scale(1.05);
	box-shadow: var(--shadow-elevated, 0 8px 24px rgba(0, 0, 0, 0.25));
}

.contact-chatbox {
	position: fixed;
	bottom: var(--fab-margin);
	right: calc(var(--fab-margin) + var(--fab-size) + var(--fab-gap));
	width: 320px;
	max-width: min(320px, 90vw);

	/* ✅ 新增：整個 chatbox 變成 column，才能讓 body 可捲動 */
	display: flex;
	flex-direction: column;

	/* ✅ 新增：高度限制（手機不會爆） */
	max-height: min(72vh, 520px);

	background: var(--bg-surface, #fff);
	border-radius: var(--radius-md, 12px);
	box-shadow: var(--shadow-elevated);
	z-index: 1001;

	opacity: 0;
	transform: translateY(10px) scale(0.98);
	visibility: hidden;
	pointer-events: none;
	transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
	color: var(--color-text-main, #000);

	/* ✅ 新增：避免內容超出圓角 */
	overflow: hidden;
}

.contact-chatbox.is-open {
	opacity: 1;
	transform: translateY(0) scale(1);
	visibility: visible;
	pointer-events: auto;
}

.chatbox-header {
	background-color: var(--btn-primary-bg);
	color: #fff;
	padding: 10px 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 500;
	border-radius: var(--radius-md, 12px) var(--radius-md, 12px) 0 0;

	/* ✅ 新增：header 固定在上方 */
	position: sticky;
	top: 0;
	z-index: 2;
}

.chatbox-header .close-btn {
	background: transparent;
	border: none;
	color: inherit;
	font-size: 1rem;
	cursor: pointer;
}

.chatbox-body {
	/* ✅ 改：讓內容區可捲動 */
	flex: 1;
	overflow-y: auto;

	/* ✅ iOS 滑動更順 */
	-webkit-overflow-scrolling: touch;

	padding: 14px;
}

.form-label {
	font-size: 0.9rem;
	margin-bottom: 4px;
}
.form-control {
	width: 100%;
	border: 1px solid #ccc;
	border-radius: var(--radius-sm, 6px);
	padding: 6px 10px;
	font-size: 0.9rem;
	box-sizing: border-box;
}
.form-control:focus {
	outline: none;
	border-color: var(--color-primary);
	box-shadow: 0 0 0 0.1rem rgba(85, 119, 156, 0.35);
}
.contact-btn {
	background-color: var(--btn-primary-bg);
	border: none;
	border-radius: var(--radius-sm, 6px);
	padding: 8px 12px;
	color: #fff;
	width: 100%;
	cursor: pointer;
	font-weight: 600;
	transition: background-color 0.2s, box-shadow 0.2s;
}
.contact-btn:hover {
	background-color: var(--btn-primary-bg-strong);
	box-shadow: var(--shadow-soft, 0 4px 12px rgba(0, 0, 0, 0.2));
}

@media (max-width: 575.98px) {
	.contact-chatbox {
		bottom: calc(var(--fab-margin) + var(--fab-size) + var(--fab-gap));
		right: var(--fab-margin);

		/* ✅ 手機更高一點 */
		max-height: 78vh;
		width: min(360px, 92vw);
	}
}
</style>
