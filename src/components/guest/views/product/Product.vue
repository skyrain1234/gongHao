<template>
	<div class="product-area-content" id="software">
		<ProductCarousel
			v-for="section in classSections"
			:key="section.id"
			:bg-image="section.bgImage"
			:title="section.title"
			:desc="section.desc"
			:items="section.items"
		/>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ProductCarousel from "@/components/guest/views/product/ProductCarousel.vue";
import { getProductClassList } from "@/api/main/service/product/productClassService";
import { getProductList } from "@/api/main/service/product/productService";
import { getStorageFileUrl } from "@/api/main/tools/storageFileTools";

const productClassList = ref([]);
const productList = ref([]);

/** 取產品分類（大類：點子鋪 / 賈伯斯 / 客製化） */
const loadProductClass = async () => {
	try {
		const response = await getProductClassList(); // service 回「陣列」可直接用
		productClassList.value = response || [];
	} catch (err) {
		console.error("getProductClassList error:", err);
		productClassList.value = [];
	}
};

/** 取產品清單（依 class_id 對應到分類） */
const loadProduct = async () => {
	try {
		const response = await getProductList(); // service 回「陣列」可直接用
		productList.value = response || [];
	} catch (err) {
		console.error("getProductList error:", err);
		productList.value = [];
	}
};

//
onMounted(() => {
	loadProductClass();
	loadProduct();
});

/**
 * productsByClass
 * 把 productList 依 class_id 分組：
 * {
 *   1: [ 這個分類底下的產品... ],
 *   2: [ ... ],
 * }
 */
const productsByClass = computed(() => {
	// 用一般物件當 map：key = class_id, value = 該分類的產品陣列
	const map = {};

	for (const product of productList.value) {
		const classId = product.class_id;

		// 第一次遇到這個 classId，先建立空陣列
		if (!map[classId]) {
			map[classId] = [];
		}

		map[classId].push(product);
	}

	// 每個分類底下的產品依 no 排序（no 大的排前面）
	for (const classId in map) {
		map[classId].sort((a, b) => b.no - a.no);
	}

	return map;
});

/**
 * classSections
 * 一個「分類」 = 一個區塊 section：
 * - 背景圖：分類的 thumbnail
 * - 區塊標題 / 說明：分類的 name / description
 * - items：該分類底下的產品卡片（或至少分類自己一張卡）
 */
const classSections = computed(() => {
	// 目前只處理最上層分類（parent_id 為 null）
	const rootClasses = productClassList.value
		.filter((cls) => cls.parent_id === null)
		// 依 no 排序（no 大的在前）
		.sort((a, b) => b.no - a.no);

	return rootClasses.map((cls) => {
		// 區塊背景圖（允許 thumbnail_url 為空）
		const bgImage = cls.thumbnail_url
			? getStorageFileUrl(cls.thumbnail_url)
			: "";

		// 這個分類底下所有產品（從 map 直接拿，不用每次 filter）
		const products = productsByClass.value[cls.id] || [];

		// 如果有產品 → 用產品產生卡片
		// 如果沒有產品 → 至少用分類自己墊一張卡，避免整塊都沒有內容
		const nodesForCards = products.length ? products : [cls];

		// 轉成 ProductCarousel 需要的資料格式
		const items = nodesForCards.map((node) => ({
			id: node.id,
			title: node.name,
			img: node.thumbnail_url ? getStorageFileUrl(node.thumbnail_url) : "",
		}));

		return {
			id: cls.id,
			bgImage,
			title: cls.name,
			desc: cls.description,
			items,
		};
	});
});
</script>

<style scoped></style>
