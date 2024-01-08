<script lang="ts">
	export let id = "txt"
	export let value = ""
	export let label = "Textbox"
	export let required = true
	export let rows = 3
</script>

<div class="wrapper">
	<label class="label" for={id}>{label}</label>
	<textarea class="textbox" placeholder={label} {id} {rows} bind:value {required} />
</div>

<style lang="scss">
	@use "src/style/mixins";

	.wrapper {
		display: flex;
		position: relative;
		flex-direction: column;
		min-width: 200px;

		.label {
			position: absolute;
			inset: -5px auto auto 6px;
			padding: 0 5px;
			opacity: 70%;
			font-size: x-small;
			text-transform: uppercase;
			font-weight: bold;
		}
		.textbox {
			@include mixins.textbox;
		}
	}
</style>
