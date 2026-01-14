<!-- src/components/about/sections/09_ArticlePdfSection.vue -->
<template>
	<section id="sec-pdf" class="fwSec fwSecLast">
		<header class="fwSecHead">
			<span class="fwKicker">DOCUMENT</span>
			<h2 class="fwH2">協會章程（PDF）</h2>
			<!-- <p class="fwDesc">協會章程</p> -->
		</header>

		<article class="fwCard reveal">
			<div class="fwPdfRow">
				<a class="fwBtn" :href="pdfUrl" target="_blank" rel="noopener">
					下載 PDF
				</a>
			</div>

			<div class="fwPdfFrame">
				<iframe :src="pdfUrl" title="協會章程 PDF 預覽"></iframe>
			</div>
		</article>
	</section>
</template>

<script setup>
// ✅ Vite 建議：用 URL 取資源（build / GitHub Pages 都正確）
const pdfUrl = new URL("@/assets/images/about/協會章程.pdf", import.meta.url).href;
</script>
