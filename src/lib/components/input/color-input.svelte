<script lang="ts">
	import { Color } from "$lib/scripts/color-engine/color"

	export let id = "img"
	export let color = Color.gray
	export let required = true

	let input: HTMLInputElement
</script>

<input
	class="input"
	bind:value={color.HEX}
	{required}
	{id}
	type="color"
	style={color.toCSSVariable("color")}
/>

<style lang="scss">
	@use "/src/lib/ui/button/button";
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	input[type="color"] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		@include button.base;
		@include button.round;

		width: vars.$button_size;

		position: relative;
		padding: 0.25em;
		border-radius: 50%;
		overflow: hidden;

		&::-webkit-color-swatch-wrapper {
			padding: 0px;
		}

		&::-webkit-color-swatch {
			border: 0px;
			border-radius: 50%;
		}
	}
</style>
