<script lang="ts">
	import { onMount } from 'svelte';

	export let id: string;
	export let value = '';
	export let label = 'Textbox';
	export let type: 'text' | 'password' = 'text';
	export let required = true;
	export let disabled = false;
	export let error: string | null = null;

	let input: HTMLInputElement;

	onMount(() => {
		input.type = type;
	});
</script>

<div>
	<label for={id}>{label}</label>
	<input {id} {disabled} {required} bind:value bind:this={input} />
	{#if error !== null}
		<p>{error}</p>
	{/if}
</div>

<style lang="scss">
	@use '../mixins';

	div {
		position: relative;
		min-width: 10em;

		label {
			position: absolute;
			inset: -0.375em auto auto 6px;

			padding: 0 0.625em;

			font-size: 0.625em;
			text-transform: uppercase;
			font-weight: bold;
		}

		input {
			font-size: 0.875em;
			line-height: 1.25em;

			padding: 0.75em;

			@include mixins.textbox-base;
		}
	}
</style>
