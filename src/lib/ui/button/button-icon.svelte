<script lang="ts">
	export let src: string
	export let alt: string
	export let text: string | null = null

	export let seamless = false
	export let nopadding = false
	export let reverse = false
	export let toggled = false
</script>

<button class:seamless class:toggled class:nopadding {...$$restProps} on:click>
	{#if text && reverse}
		{text}
	{/if}
	<img {src} {alt} />
	{#if text && !reverse}
		{text}
	{/if}
</button>

<style lang="scss">
	@use "./button";
	@use "../colors";
	@use "../vars";

	button {
		@include button.base;

		padding: 0.75em;
		gap: 0.25em;

		img {
			display: block;
			width: 1.5em;
		}

		&.nopadding {
			padding: 0;
		}
	}
</style>
