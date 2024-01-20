<script lang="ts">
	import { onMount } from 'svelte';

	export let id: string;
	export let value = '';
	export let label = 'Textbox';
	export let type: 'text' | 'password' = 'text';
	export let required = true;
	export let disabled = false;
	export let error = false;

	let input: HTMLInputElement;

	onMount(() => {
		input.type = type;
	});
</script>

<div>
	<input {id} {disabled} {required} class:error bind:value bind:this={input} />
	<label class:disabled for={id}>{label}</label>
</div>

<style lang="scss">
	@use './textbox' as *;
	@use '../mixins';

	div {
		input {
			@include textbox-input;
		}

		label {
			@include textbox-label;
		}

		@include textbox-wrapper;
	}
</style>
