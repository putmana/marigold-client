<script lang="ts">
	export let disabled = false;
	export let variant: 'primary' | 'invisible' = 'primary';
</script>

<button class={variant} {disabled} on:click>
	<slot />
</button>

<style lang="scss">
	@use './btn' as *;
	@use '../colors';

	button {
		padding: 0.75em;

		@include btn;
	}
</style>
