<script lang="ts">
	import type { Palette } from "$lib/scripts/color-engine/palette"
	import { createEventDispatcher } from "svelte"
	import ColorInput from "./color-input.svelte"
	import BtnIconRound from "../button/btn-icon-round.svelte"

	const dispatch = createEventDispatcher()

	export let palette: Palette

	function autoPick() {
		dispatch("autopick")
	}
</script>

<div class="wrapper">
	<ColorInput bind:color={palette.primary} />
	<ColorInput bind:color={palette.secondary} />
	<BtnIconRound src="public/icons/palette.svg" on:click={autoPick} />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		gap: 5px;
	}
</style>
