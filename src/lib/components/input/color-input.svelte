<script lang="ts">
	import { Color } from "$lib/scripts/color-engine/color"

	export let id = "img"
	export let color = Color.gray
	export let required = true
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
	@use "src/style/mixins";
	@use "src/style/colors";

	input[type="color"] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		@include mixins.clickable-solid;

		position: relative;
		margin: 0px;
		width: 50px;
		height: 50px;
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
