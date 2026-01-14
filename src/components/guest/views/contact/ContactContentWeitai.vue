<template>
	<section class="contact-content py-2 mt-5 mb-5 mx-auto" id="contact-us">
		<div
			class="container-fluid"
			data-aos="fade"
			data-aos-duration="1000"
			data-aos-once="true"
			data-aos-mirror="false"
		>
		<!-- 標題區 -->
			<div
				class="row align-items-center"
				data-aos="fade"
				data-aos-duration="900"
				data-aos-once="false"
				data-aos-mirror="true"
			>
				<div class="col-10 col-lg-8 mx-auto contact-content-text text-center">
					<h2><strong>歡迎與我們聯繫</strong></h2>
					<span class="h5">
						<p style="background-color: #c5c4c1; height: 2px; width: 100%"></p>
					</span>
					<p class="fs-5 lh-lg mb-0">
						您可以使用電話與我們聯絡，或利用以下表單來傳達您的訊息，
					</p>
					<p class="fs-5 lh-lg mb-0">
						希望您能留下大名及聯絡信箱，我們將會迅速處理，謝謝您。
					</p>
				</div>
			</div>
			<!-- 表單區 -->
			<div class="row">
				<div class="col-md-12 order-1 order-md-1 mb-4 mb-md-0">
					<form>
						<!-- 蜜罐欄位（人類看不到）防止機器人自動填入，若有填入則後端判定非法 -->
						<div class="d-none">
							<input type="text" v-model="formData.website" value="" />
						</div>
						<div class="row">
							<!-- 公司名稱 -->
							<div class="col-6 mt-4">
								{{ $t("contact.fields.company") }}
								<div class="form-floating">
									<input
										type="text"
										class="form-control"
										id="company"
										placeholder="company"
										v-model="formData.company"
									/>
									<label for="company">Company</label>
								</div>
							</div>

							<!-- 聯絡人姓名 -->
							<div class="col-6 mt-4">
								{{ $t("contact.fields.pointOfContact") }}
								<div class="form-floating">
									<input
										type="text"
										class="form-control"
										id="name"
										placeholder="name"
										v-model="formData.name"
									/>
									<label for="name">Name</label>
								</div>
							</div>
						</div>

						<div class="row">
							<!-- 公司地址 -->
							<div class="col-6 mt-3">
								{{ $t("contact.fields.companyAddress") }}
								<div class="form-floating mb-3">
									<input
										type="text"
										class="form-control"
										id="company-address"
										placeholder="address"
										v-model="formData.company_address"
									/>
									<label for="company-address">Company Address</label>
								</div>
							</div>

							<!-- 連絡電話 -->
							<div class="col-6 mt-3">
								{{ $t("contact.fields.phone") }}
								<div class="form-floating mb-3">
									<input
										type="phone"
										class="form-control"
										id="phone"
										placeholder="phone"
										v-model="formData.phone"
									/>
									<label for="phone">Phone</label>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-6 mt-3">
								{{ $t("contact.fields.email") }}
								<div class="form-floating mb-3">
									<input
										type="email"
										class="form-control"
										id="email"
										placeholder="name@example.com"
										v-model="formData.email"
									/>
									<label for="email">Email</label>
								</div>
							</div>
						</div>

						<!-- 服務項目（單選） -->
						<div class="row">
							<div class="col-12 mt-3">
								<label class="form-label fw-semibold d-block mb-2">{{
									$t("contact.fields.service")
								}}</label>

								<div class="d-flex flex-wrap gap-3 align-items-center">
									<template v-for="code in SERVICE_CODES" :key="code">
										<!-- 指定value為中文 -->
										<input
											class="btn-check"
											type="radio"
											name="service"
											:id="`${code}`"
											:value="
												t(
													`contact.serviceOptions.${code}`,
													{},
													{ locale: 'zh-TW' }
												)
											"
											v-model="formData.subject"
										/>
										<label
											class="btn btn-outline-secondary rounded-pill px-3 py-2"
											:for="`${code}`"
										>
											{{ t(`contact.serviceOptions.${code}`) }}
										</label>
									</template>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-12 mt-3">
								<div class="form-floating">
									{{ $t("contact.fields.message") }}
									<textarea
										class="form-control"
										placeholder="Leave a comment here"
										id="message"
										style="height: 30vh"
										v-model="formData.message"
									></textarea>
								</div>
							</div>
						</div>

						<button
							type="button"
							class="btn btn-warning mx-auto mt-4 p-2 w-25 text-nowrap send"
							@click="submitContact"
						>
							{{ $t("contact.buttons.submit") }}
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { loadingAlert, successAlert, errorAlert } from "@/utils/sweetalert";
import { submitContactData } from "@/api/main/service/contactService";
import { formatErrorMessages } from "@/utils/formatter";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const isLoading = ref(false);

const formData = reactive({
	website: "", //密罐欄位，防止機器人自動填入
	name: "",
	email: "",
	company: "",
	company_address: "",
	phone: "",
	subject: "", // 單選結果會直接存進來
	message: "",
});

// 固定代碼表，為了subject欄位直接存中文，此處的code需對齊src\i18n\locales\zh-TW\contact.json
const SERVICE_CODES = ["cloud", "software", "web", "grant", "course", "other"];

// 監聽載入狀態
watch(isLoading, (val) => {
	if (val) loadingAlert("送出中");
});

// 送出表單
const submitContact = async () => {
	if (isLoading.value) return;

	//  驗證是否選擇服務項目
	if (!formData.subject) {
		errorAlert("請選擇服務項目");
		return;
	}

	isLoading.value = true;

	try {
		const response = await submitContactData(formData);
		if (response.success) {
			successAlert(response.message);
			router.push("/contact");
		} else {
			errorAlert(response.message, formatErrorMessages(response.data));
		}
	} catch (err) {
		errorAlert("送出失敗");
	} finally {
		isLoading.value = false;
	}
};
</script>

<style lang="scss" scoped>
.contact-content {
	width: 80%;
	background-color: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(8px);
	border-radius: 1rem;
	font-size: 0.9rem;

	.contact-content-text {
		border-radius: 20px;
		padding: 10px;
		background-color: rgba(255, 255, 255, 0.3);
		color: #555;
	}
}
.send {
	width: 10%;
	color: #fff;
}
@media (max-width: 768px) {
	.contact-content {
		width: 100%;
	}
	.send {
		width: 60%;
	}
}
</style>
