<script lang="ts">
	export let disabled = false;
	export let variant: 'primary' | 'invisible' = 'primary';
	export let src: string;
	export let alt: string;
</script>

<button class={variant} {disabled} on:click>
	<img {src} {alt} />
</button>

<style lang="scss">
	@use '../colors';
	@use '../mixins';

	button {
		font-size: 0.875em;
		padding: 0.625em;

		@include mixins.button-base;
	}

	img {
		height: 1.5em;
	}
</style>
