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
	<button type="button" on:click={openFileBrowser}>
		<label class="label" for={id}>{label}</label>
		<img {src} alt="Upload preview" />
	</button>
	<input
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
	@use "/src/lib/ui/button/button";
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;

		input {
			width: 1px;
			height: 1px;
			opacity: 0px;
		}

		button {
			@include button.base;

			position: relative;
			padding: 0.25em;

			@include mixins.desktop-only {
				width: 16rem;
				height: 16rem;
			}

			@include mixins.mobile-only {
				height: 12rem;
				width: 12rem;
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
