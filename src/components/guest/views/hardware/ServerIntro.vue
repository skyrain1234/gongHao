<template>
	<div class="hardware-goods">
		<div class="container">
			<h2 class="section-title text-center" data-aos="fade">
				{{ $t("hardware.serverIntro.title") }}	
			</h2>

			<div class="row g-4">
				<!-- 左區塊 -->
				<div class="col-12 col-lg-6" data-aos="fade-right">
					<div class="hardware-box">
						<h3 class="hardware-subtitle">
							{{ $t("hardware.serverIntro.selfHosted.title") }}
						</h3>
						<ul class="hardware-list">
							<li>{{ $t("hardware.serverIntro.selfHosted.items.0") }}</li>
							<li>{{ $t("hardware.serverIntro.selfHosted.items.1") }}</li>
							<li>{{ $t("hardware.serverIntro.selfHosted.items.2") }}</li>
							<li>{{ $t("hardware.serverIntro.selfHosted.items.3") }}</li>
							<li>{{ $t("hardware.serverIntro.selfHosted.items.4") }}</li>
							<li>{{ $t("hardware.serverIntro.selfHosted.items.5") }}</li>
						</ul>
					</div>
				</div>

				<!-- 右區塊 -->
				<div class="col-12 col-lg-6" data-aos="fade-left">
					<div class="hardware-box">
						<h3 class="hardware-subtitle">
							{{ $t("hardware.serverIntro.difference.title") }}
						</h3>
						<ul class="hardware-list">
							<li>{{ $t("hardware.serverIntro.difference.items.0") }}</li>
							<li>{{ $t("hardware.serverIntro.difference.items.1") }}</li>
							<li>{{ $t("hardware.serverIntro.difference.items.2") }}</li>
							<li>{{ $t("hardware.serverIntro.difference.items.3") }}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
