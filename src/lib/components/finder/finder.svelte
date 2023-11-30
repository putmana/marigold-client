<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"
	import { Palette } from "$lib/scripts/color-engine/palette"

	const dispatch = createEventDispatcher()

	export let title: string
	export let palette: Palette = Palette.gray

	function openCreator() {
		dispatch("create")
	}
</script>

<aside class="wrapper" style={palette.toCSS()}>
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
		overflow-y: scroll;

		display: flex;
		flex-direction: column;

		box-sizing: border-box;
		width: calc(100vw - sizes.$nav-width);
		padding-bottom: 180px;

		background-color: colors.$gray-c;

		border-left: 1px solid colors.$border;
		box-shadow: inset -1px 0px var(--primary-border);
	}

	.header {
		display: flex;
		align-items: center;
		flex-shrink: 0;

		height: sizes.$nav-width;
		margin: 0;
		padding-left: 15px;
		padding-right: 15px;

		h1 {
			flex-grow: 1;

			text-transform: uppercase;
			font-size: inherit;
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			min-width: calc(sizes.$screen-sm - sizes.$nav-width);
			max-width: calc(sizes.$screen-sm - sizes.$nav-width);
		}
	}
</style>
