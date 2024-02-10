<script lang="ts">
	import type { Palette } from "$lib/scripts/color-engine/palette"
	import { createEventDispatcher } from "svelte"

	import ColorInput from "./color-input.svelte"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"

	const dispatch = createEventDispatcher()

	export let palette: Palette

	function autoPick() {
		dispatch("autopick")
	}
</script>

<div class="wrapper">
	<ColorInput bind:color={palette.primary} />
	<ColorInput bind:color={palette.secondary} />
	<ButtonIcon
		type="button"
		on:click={autoPick}
		src="public/icons/wand.svg"
		alt="Wand icon"
		tooltip={"Automatically pick colors from cover art"}
		round
	/>
</div>

<style lang="scss">
	@use "/src/lib/ui/vars";

	.wrapper {
		display: flex;
		gap: vars.$item_gap;
	}
</style>
