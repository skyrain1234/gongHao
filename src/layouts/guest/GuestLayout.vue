<template>
	<div>
		<GuestHeader />
		<main>
			<router-view></router-view>
		</main>
		<GuestFooter />
	</div>
</template>

<script setup>
import GuestHeader from "./GuestHeader.vue";
import GuestFooter from "./GuestFooter.vue";

</script>

<style lang="scss"></style>
