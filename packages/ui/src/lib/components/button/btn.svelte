<script lang="ts">
	export let disabled = false;
	export let variant: 'primary' | 'invisible' = 'primary';
</script>

<button class={variant} {disabled} on:click>
	<slot />
</button>

<style lang="scss">
	@use '../colors';
	@use '../mixins';

	button {
		font-size: 0.875em;
		font-weight: bold;
		line-height: 1.25em;

		padding: 0.75em;

		@include mixins.button-base;
	}
</style>
