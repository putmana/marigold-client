<script lang="ts">
	import type { Palette } from "$lib/scripts/color-engine/palette"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let palette: Palette
	export let selected: boolean

	function selectItem() {
		dispatch("select")
	}
</script>

<button class="wrapper" class:selected on:click={selectItem} style={palette.toCSS()}>
	<slot />
</button>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		@include mixins.clickable;

		position: relative;

		display: flex;
		align-items: center;
		flex-shrink: 0;

		box-sizing: border-box;
		height: 70px;
		margin: 0px 5px;
		padding: 0px 10px;

		border-radius: 5px;

		&.selected {
			height: 80px;

			margin: 0px;
			padding-left: 15px;

			background-color: var(--primary-medium);

			border: 1px solid colors.$border-hover;
			border-radius: 0px;

			&:hover,
			&:focus {
				box-shadow: none;
			}

			@include mixins.desktop-only {
				border-right: none;
			}
		}
	}
</style>
