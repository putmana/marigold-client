<script lang="ts">
	export let id = "txt"
	export let value = ""
	export let label = "Textbox"
	export let required = true
</script>

<div class="wrapper">
	<label class="label" for={id}>{label}</label>
	<input class="textbox" placeholder={label} {id} bind:value {required} />
</div>

<style lang="scss">
	@use "src/style/mixins";

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 5px;

		@include mixins.mobile-only {
			min-width: 200px;
		}

		@include mixins.desktop-only {
			min-width: 300px;
		}

		.label {
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
