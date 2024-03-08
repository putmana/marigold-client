<script lang="ts">
	export let seamless = false
	export let nopadding = false
	export let grow = false
	export let round = false
	export let submit = false
</script>

<button
	type={submit ? "submit" : "button"}
	class:seamless
	class:nopadding
	class:grow
	class:round
	{...$$restProps}
	on:click
>
	<slot />
</button>

<style lang="scss">
	@use "./button";
	@use "../colors";
	@use "../vars";

	button {
		@include button.base;

		gap: calc(0.25 * vars.$button_content_size);
		min-width: vars.$button_content_size;

		&.seamless {
			@include button.seamless;
		}

		&.nopadding {
			@include button.nopadding;
		}

		&.grow {
			width: 100%;
		}

		&.round {
			@include button.round;
		}
	}
</style>

