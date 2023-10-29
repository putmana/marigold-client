<script lang="ts">
	export let src = ""

	let file: FileList
	let file_input: HTMLInputElement

	function getFile(e: Event) {
		const reader = new FileReader()
		const input = e.target as HTMLInputElement

		reader.readAsDataURL(input.files[0])
		reader.onload = (e) => {
			src = e.target.result.toString()
		}
	}

	function browseFiles() {
		file_input.click()
	}
</script>

<div class="wrapper">
	<div class="file-preview">
		<img {src} alt="Cover preview" />
		<button class="label" on:click={browseFiles}>
			<label class="label-text" for="cover">Change Cover</label>
		</button>
	</div>
	<input bind:this={file_input} class="input" id="cover" type="file" on:change={getFile} />
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
