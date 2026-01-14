<template>
	<div class="container my-5">
		<!-- 返回按鈕 -->
		<button
			type="button"
			class="back-btn mb-3 text-decoration-none"
			@click="goBack"
		>
			<i class="bi bi-arrow-left-circle"></i> 返回
		</button>

		<div class="row justify-content-center">
			<div class="col-12 col-md-8 col-lg-6">
				<div class="card shadow-sm">
					<div class="card-body p-4">
						<div class="card-title">
							<h2 class="h4 mb-3 text-center fw-bold">軟體保證書下載</h2>
						</div>

						<div class="card-text">
							<p class="text-muted fs-6 text-center mb-4">
								請輸入公司統編與軟體序號（序號必填），系統會產生保證書 PDF。
							</p>

							<!-- 統編 -->
							<div class="mb-3">
								<label for="editorial" class="form-label fw-bold">
									公司統編（可選填）
								</label>
								<input
									id="editorial"
									type="text"
									class="form-control"
									v-model.trim="form.editorial"
									placeholder="請輸入公司統編"
								/>
							</div>

							<!-- 軟體序號 -->
							<div class="mb-3">
								<label for="serialno" class="form-label fw-bold">
									軟體序號<span class="text-danger">*</span>
								</label>
								<input
									id="serialno"
									type="text"
									class="form-control"
									v-model.trim="form.serialno"
									:class="{ 'is-invalid': serialError }"
									placeholder="請輸入17碼序號"
								/>
								<div class="invalid-feedback" v-if="serialError">
									請輸入軟體序號。
								</div>
							</div>

							<!-- 錯誤訊息 -->
							<div v-if="errorMessage" class="alert alert-danger py-2 small">
								{{ errorMessage }}
							</div>

							<!-- 送出按鈕 -->
							<div class="d-grid mt-3">
								<button
									type="button"
									class="submit-btn"
									:disabled="isLoading"
									@click="onSubmit"
								>
									<span v-if="isLoading">
										<i class="bi bi-arrow-repeat me-1 spin"></i>
										產生保證書中…
									</span>
									<span v-else>確認送出</span>
								</button>
							</div>

							<!-- 有 PDF 之後才出現的下載 / 預覽 + 安裝程式 -->
							<div v-if="pdfUrl">
								<div class="mt-3 d-flex flex-wrap gap-2">
									<a
										class="btn btn-success flex-grow-1"
										:href="pdfUrl"
										download="warranty.pdf"
									>
										<i class="bi bi-download me-1"></i>
										下載保證書
									</a>

									<button
										type="button"
										class="btn btn-outline-secondary flex-grow-1"
										@click="previewPdf"
									>
										<i class="bi bi-eye me-1"></i>
										預覽保證書
									</button>
								</div>

								<!-- 軟體安裝程式下載（固定顯示） -->
								<div class="mt-3">
									<a
										class="btn btn-outline-primary w-100"
										href="https://download.bm888.com.tw/JBSSetup.zip"
										target="_blank"
										rel="noopener"
									>
										<i class="bi bi-box-arrow-down me-1"></i>
										下載軟體安裝程式（JBSSetup）2.5GB
									</a>
								</div>
							</div>

							<p class="text-muted fs-6 mt-3 mb-0 text-center">
								※ 若查無資料，請確認序號是否正確，或聯絡客服協助處理。
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, computed, onBeforeUnmount } from "vue";
import { generateWarrantyPdf } from "@/api/main/service/product/WarrantyService";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
	// 有歷史紀錄就往回
	if (window.history.length > 1) {
		router.back();
	} else {
		// 沒有上一頁（例如直接從外部開這個網址）
		// 可以給一個預設的 fallback 頁面
		router.push("/"); // 或改成 `/${currentLang}/service/softwareList`
	}
};

const form = reactive({
	editorial: "",
	serialno: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const pdfUrl = ref(null); // 產生後的 PDF 連結（blob:url 或後端 URL）

const serialError = computed(
	() => !form.serialno && errorMessage.value !== ""
);

// 表單送出：只產生 PDF，不馬上下載
const onSubmit = async () => {
	errorMessage.value = "";
	pdfUrl.value = null;

	if (!form.serialno) {
		errorMessage.value = "請先輸入軟體序號。";
		return;
	}

	try {
		isLoading.value = true;

		const { url } = await generateWarrantyPdf({
			editorial: form.editorial || null,
			serialno: form.serialno,
		});

		pdfUrl.value = url; // 顯示下載 / 預覽按鈕
	} catch (err) {
		console.error(err);
		errorMessage.value =
			err?.message || "產生保證書時發生錯誤，請稍後再試。";
	} finally {
		isLoading.value = false;
	}
};

// 預覽：用新分頁打開 PDF
const previewPdf = () => {
	if (!pdfUrl.value) return;
	window.open(pdfUrl.value, "_blank");
};

// 清理 blob URL，避免記憶體洩漏（如果 url 是 createObjectURL 出來的話）
onBeforeUnmount(() => {
	if (pdfUrl.value && pdfUrl.value.startsWith("blob:")) {
		URL.revokeObjectURL(pdfUrl.value);
	}
});
</script>

<style scoped>
.card {
	/* 背景與玻璃效果：若沒定義 --glass-bg 就退回白底透明 */
	background: var(--glass-bg, rgba(255, 255, 255, 0.8));
	backdrop-filter: blur(var(--glass-blur));
	-webkit-backdrop-filter: blur(var(--glass-blur));

	/* 圓角 & 邊框：共用 token */
	border-radius: var(--radius-lg);
	border: 1px solid var(--glass-border-color);

	/* 陰影：可用 --news-shadow 覆蓋，否則吃全站陰影 */
	box-shadow: var(--news-shadow, var(--shadow-soft));

	/* 內距：純 spacing */
	padding: clamp(16px, 3vw, 28px);
}
</style>
