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
				<a class="fwBtn" v-if="associationArticle?.file_url" :href="getStorageFileUrl(associationArticle.file_url)" target="_blank" rel="noopener">
					下載 PDF
				</a>
			</div>

			<div class="fwPdfFrame">
				<iframe
					v-if="associationArticle?.file_url"
					:src="getStorageFileUrl(associationArticle.file_url)"
					title="協會章程 PDF 預覽"
				></iframe>

				<div v-else class="text-muted">尚未上傳章程 PDF</div>
			</div>
		</article>
	</section>
</template>

<script setup>
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";

defineProps({
	associationArticle: { type: Object, default: null },
});
</script>
