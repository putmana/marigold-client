<script lang="ts">
	import { createEventDispatcher } from "svelte"

	let dispatch = createEventDispatcher()

	export let id = "img"
	export let initial_src = ""
	export let src = initial_src
	export let label = "Image upload"
	export let required = true

	let input: HTMLInputElement

	function loadFile(e: Event) {
		const reader = new FileReader()
		const input = e.target as HTMLInputElement

		reader.readAsDataURL(input.files[0])
		reader.onload = (e) => {
			const url = e.target.result.toString()
			src = url
			dispatch("change", { file: input.files[0], url: url })
		}
	}

	function openFileBrowser() {
		input.click()
	}
</script>

<div class="wrapper">
	<div class="file-preview">
		<img {src} alt="Upload preview" />
		<button class="label" on:click={openFileBrowser}>
			<label class="label-text" for={id}>{label}</label>
		</button>
	</div>
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

		.file-preview {
			position: relative;
			border: 1px solid colors.$border-hover;

			@include mixins.desktop-only {
				width: 300px;
				height: 300px;
			}
			@include mixins.mobile-only {
				height: 200px;
				width: 200px;
			}

			.label {
				@include mixins.clickable;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				inset: -1px -1px -1px -1px;
				font-size: small;
				text-transform: uppercase;
				font-weight: bold;

				.label-text {
					pointer-events: none;
					opacity: 0%;
					transition: opacity 0.2s ease;
				}

				&:hover {
					background-color: colors.$shadow;

					.label-text {
						opacity: 100%;
					}
				}
			}

			img {
				width: inherit;
				height: inherit;
			}
		}
	}
</style>
