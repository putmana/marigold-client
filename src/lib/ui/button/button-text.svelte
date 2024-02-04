<script lang="ts">
	export let text: string

	export let seamless = false
	export let grow = false
</script>

<button class:grow class:seamless {...$$restProps} on:click>
	{text}
</button>

<style lang="scss">
	@use "./button";
	@use "../colors";

	button {
		@include button.base;

		min-width: 5rem;
		padding: 0.75em;

		&.grow {
			width: 100%;
		}
	}
</style>
