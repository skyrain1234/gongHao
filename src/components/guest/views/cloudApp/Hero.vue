<template>
	<header class="d-flex align-items-center cloud-hero">
		<div class="container">
			<div class="row align-items-center">
				<!-- 文字：小螢幕在上，桌機在右 -->
				<div
					class="col-lg-6 text-center text-lg-start
						order-1 order-lg-2"
				>
					<h1 class="hero-title">
						{{ $t("product.cloud_app.hero.title") }}
					</h1>
					<p class="hero-sub">
						{{ $t("product.cloud_app.hero.subtitle") }}
					</p>
				</div>

				<!-- 圖片：小螢幕在下，桌機在左 -->
				<div
					class="col-lg-6 d-flex justify-content-center
						order-2 order-lg-1"
				>
					<div class="hero-img"></div>
				</div>
			</div>
		</div>
	</header>
</template>
