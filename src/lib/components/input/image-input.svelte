<script lang="ts">
	import { createEventDispatcher } from "svelte"

	let dispatch = createEventDispatcher()

	export let id = "img"
	export let src = ""
	export let label = "Image upload"
	export let required = true

	let input: HTMLInputElement

	function loadFile(e: Event) {
		const reader = new FileReader()
		const input = e.target as HTMLInputElement

		const file = input.files[0]

		if (file) {
			reader.readAsDataURL(file)
			reader.onload = (e) => {
				const url = e.target.result.toString()
				src = url
				dispatch("change", { file: input.files[0], url: url })
			}
		}
	}

	function openFileBrowser() {
		input.click()
	}
</script>

<div class="wrapper">
	<button type="button" class="input-button" on:click={openFileBrowser}>
		<label class="label" for={id}>{label}</label>
		<img {src} alt="Upload preview" />
	</button>
	<input
		class="input"
		bind:this={input}
		{required}
		{id}
		name={id}
		type="file"
		accept="image/png, image/jpeg"
		on:change={loadFile}
		tabindex="-1"
	/>
</div>

<style lang="scss">
	@use "src/style/mixins";
	@use "src/style/colors";

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;

		.input {
			width: 1px;
			height: 1px;
			opacity: 0px;
		}

		.input-button {
			position: relative;

			@include mixins.button;
			padding: 5px;

			@include mixins.desktop-only {
				width: 210px;
				height: 210px;
			}

			@include mixins.mobile-only {
				height: 200px;
				width: 200px;
			}

			label {
				position: absolute;
				pointer-events: none;
				opacity: 0%;
			}

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
