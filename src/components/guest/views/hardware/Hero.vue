<template>
	<!-- 頂部介紹區 -->
	<div class="hardware-title">
		<div class="container mb-5 mt-3">
			<div class="row align-items-center">
				<!-- 圖片區塊：手機先顯示 -->
				<div
					class="col-md-5 order-1 order-md-2 mb-4 mb-md-0 hardware-title-img-col shadow-sm"
					data-aos="fade-left"
				>
					<div class="hardware-title-pic">
						<div class="hardware-title-pic-inner text-center">
							<img
								src="@/assets/images/product/hardware/hardware-title.png"
								alt=""
								class="rounded w-75"
							/>
						</div>
					</div>
				</div>

				<!-- 文字區塊：手機後顯示 -->
				<div class="col-md-7 order-2 order-md-1 hardware-title-text-col">
					<div class="hardware-title-text p-4 rounded shadow-sm">
						<h2 class="mb-3 text-center text-lg-end" data-aos="fade-right">
							<img
								src="@/assets/images/product/hardware/planning_tit.png"
								alt=""
								class="w-50"
							/>
						</h2>
						<p class="mb-3 fs-md-4  fs-4  text-lg-end fw-bolder" data-aos="fade-up">
							{{ $t("hardware.hero.line1") }}<br />
							{{ $t("hardware.hero.line2") }}<br />
							{{ $t("hardware.hero.line3") }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
