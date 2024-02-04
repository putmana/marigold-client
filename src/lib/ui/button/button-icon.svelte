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
		gap: calc(vars.$item_gap / 2);

		img {
			width: 1.5rem;
		}

		&.nopadding {
			padding: 0;
		}
	}
</style>
