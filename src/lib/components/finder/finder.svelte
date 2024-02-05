<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"
	import { bgPalette } from "$lib/scripts/stores/PaletteStore"

	const dispatch = createEventDispatcher()

	export let title: string
	export let palette: Palette = Palette.gray

	function openCreator() {
		dispatch("create")
	}
</script>

<aside class="wrapper" style={$bgPalette.toCSS()}>
	<header class="header">
		<h1>{title}</h1>
		<slot name="header" />
	</header>
	<div class="list">
		<slot name="body" />
	</div>
</aside>

<style lang="scss">
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	.wrapper {
		@include mixins.item;
		overflow-y: scroll;

		flex-direction: column;
		padding: 0 0 5rem 0;

		box-sizing: border-box;
		width: 20rem;
	}

	.header {
		display: flex;
		align-items: center;
		flex-shrink: 0;

		padding: 0.75rem calc(2 * vars.$item_gap);

		h1 {
			flex-grow: 1;
			margin: 0;

			font-size: 1rem;
		}
	}

	.list {
		display: flex;
		flex-direction: column;
		padding: 0rem vars.$item_gap;
		gap: vars.$item_gap;
	}
</style>
