<script lang="ts">
	import Icon from "../icon/icon.svelte"

	export let src: string
	export let alt: string
	export let tooltip: string

	export let seamless = false
	export let nopadding = false
	export let round = false
	export let submit = false
</script>

<button
	title={tooltip}
	type={submit ? "submit" : "button"}
	class:seamless
	class:nopadding
	class:round
	{...$$restProps}
	on:click
>
	<Icon {src} {alt} />
</button>

<style lang="scss">
	@use "./button";
	@use "../colors";
	@use "../vars";

	button {
		@include button.base;

		width: vars.$button_size;
		height: vars.$button_size;

		&.seamless {
			@include button.seamless;
		}

		&.nopadding {
			@include button.nopadding;

			width: auto;
			height: auto;
		}

		&.round {
			@include button.round;
		}
	}
</style>
