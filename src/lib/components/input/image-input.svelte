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
	<button class="input-button" on:click={openFileBrowser}>
		<img {src} alt="Upload preview" />
	</button>
	<input
		class="input"
		bind:this={input}
		{required}
		{id}
		type="file"
		accept="image/png, image/jpeg"
		on:change={loadFile}
	/>
</div>

<style lang="scss">
	@use "src/style/mixins";
	@use "src/style/colors";

	.wrapper {
		display: flex;
		flex-direction: column;

		.input {
			display: none;
		}

		.input-button {
			@include mixins.clickable-solid;

			@include mixins.desktop-only {
				width: 300px;
				height: 300px;
			}

			@include mixins.mobile-only {
				height: 200px;
				width: 200px;
			}

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
