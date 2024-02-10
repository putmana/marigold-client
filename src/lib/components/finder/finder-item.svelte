<script lang="ts">
	import type { Palette } from "$lib/scripts/color-engine/palette"
	import { bgPalette } from "$lib/scripts/stores/PaletteStore"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let palette: Palette
	export let selected: boolean

	function selectItem() {
		dispatch("select")
	}
</script>

<button
	class="wrapper"
	class:selected
	on:click={selectItem}
	class:seamless={!selected}
	style={$bgPalette.toCSS()}
>
	<slot />
</button>

<style lang="scss">
	@use "/src/lib/ui/button/button";

	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";
	@use "/src/lib/ui/vars";

	.wrapper {
		@include button.base;
		@include button.nopadding;

		display: flex;
		align-items: center;
		gap: vars.$item_gap;

		box-sizing: border-box;
		padding: vars.$item_gap;

		&.selected {
			padding: vars.$item_gap;
		}

		&.seamless {
			@include button.seamless;
		}
	}
</style>
