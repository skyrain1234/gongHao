<template>
	<div class="text-center py-5 loading">
		<div class="spinner-border" role="status">
		</div>

		<div v-if="showText" class="small mt-2">
			{{ text || $t("common.loading") }}
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	text: {
		type: String,
		default: "",
	},
	showText: {
		type: Boolean,
		default: true,
	},
});
</script>
