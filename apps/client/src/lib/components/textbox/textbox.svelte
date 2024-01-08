<script lang="ts">
	export let id = "txt"
	export let value = ""
	export let label = "Textbox"
	export let required = true
	export let censor = false
	export let invalid = false
</script>

<div class="wrapper">
	<label class="label" for={id}>{label}</label>
	{#if censor}
		<input
			class="textbox"
			class:invalid
			type="password"
			placeholder={label}
			{id}
			bind:value
			{required}
		/>
	{:else}
		<input
			class="textbox"
			class:invalid
			type="text"
			placeholder={label}
			{id}
			bind:value
			{required}
		/>
	{/if}
</div>

<style lang="scss">
	@use "src/style/mixins";
	@use "src/style/colors";

	.wrapper {
		display: flex;
		position: relative;
		flex-direction: column;
		min-width: 200px;

		.label {
			position: absolute;
			inset: -5px auto auto 6px;
			padding: 0 5px;
			font-size: x-small;
			text-transform: uppercase;
			font-weight: bold;
		}

		.textbox {
			@include mixins.textbox;
		}
	}
</style>
