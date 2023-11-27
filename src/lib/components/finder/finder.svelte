<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"

	const dispatch = createEventDispatcher()

	export let title: string

	function openCreator() {
		dispatch("create")
	}
</script>

<aside class="wrapper">
	<header class="header">
		<h1>{title}</h1>
		<BtnIconSeamless src="public/icons/add.svg" alt="Add icon" on:click={openCreator} />
	</header>

	<slot />
</aside>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		background-color: colors.$gray-c;
		display: flex;
		flex-direction: column;
		width: calc(100vw - sizes.$nav-width);
		border-left: 1px solid colors.$border;
		border-top: 1px solid colors.$border;
		box-sizing: border-box;
	}

	.header {
		display: flex;
		align-items: center;
		height: sizes.$nav-width;
		margin: 0;
		padding-left: 15px;
		padding-right: 15px;

		h1 {
			text-transform: uppercase;
			font-size: inherit;
			flex-grow: 1;
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			min-width: calc(sizes.$screen-sm - sizes.$nav-width);
			max-width: calc(sizes.$screen-sm - sizes.$nav-width);
		}
	}
</style>
