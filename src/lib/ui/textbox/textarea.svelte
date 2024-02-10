<script lang="ts">
	export let id: string
	export let value = ""
	export let label = "Textbox"
	export let required = true
	export let disabled = false
	export let error = false
	export let grow = false
	export let rows = 3
	export let placeholder = label
</script>

<div>
	<textarea {id} {rows} {disabled} {required} {placeholder} class:grow class:error bind:value />
	<label class:disabled for={id}>{label}</label>
</div>

<style lang="scss">
	@use "../vars";
	@use "./textbox" as *;

	div {
		textarea {
			@include textbox-input;

			height: auto;
			padding: calc(0.5 * vars.$button_content_size);
			resize: none;

			&.grow {
				width: 100%;
			}
		}

		label {
			@include textbox-label;
		}

		@include textbox-wrapper;
	}
</style>
