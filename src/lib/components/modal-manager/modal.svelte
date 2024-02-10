<script lang="ts">
	import { fade, fly } from "svelte/transition"
	import { createEventDispatcher, onDestroy, onMount } from "svelte"

	import Throbber from "../throbber/throbber.svelte"
	import ProgressBar from "../progress-bar/progress-bar.svelte"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"
	import { bgPalette } from "$lib/scripts/stores/PaletteStore"

	export let title = "Untitled Popup Box"
	export let loading = false
	export let progress: number | undefined

	let dialog: HTMLDialogElement

	function closeModal() {
		dialog.close()
	}

	onMount(() => {
		dialog = document.querySelector("dialog")
		dialog.show()
	})

	onDestroy(() => {
		dialog.close()
	})
</script>

<div class="wrapper" transition:fade={{ duration: 300 }}>
	<dialog transition:fly={{ duration: 300, y: -64 }} on:close>
		<header>
			<h1>{title}</h1>
			<ButtonIcon
				src="public/icons/close.svg"
				alt="Close"
				on:click={closeModal}
				seamless
				nopadding
			/>
		</header>
		<main>
			<slot />
		</main>
		{#if loading}
			<div class="loader" in:fade={{ duration: 200 }} out:fade={{ delay: 200, duration: 200 }}>
				<slot name="loader" />
				<div class="throbber">
					<Throbber size={60} />
				</div>
				{#if progress}
					<ProgressBar {progress} />
				{/if}
			</div>
		{/if}
	</dialog>
</div>

<style lang="scss">
	@use "src/lib/ui/vars";
	@use "src/lib/ui/colors";
	@use "src/lib/ui/mixins";

	$backdrop-filter: contrast(75%) saturate(50%) brightness(50%);

	.wrapper {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-backdrop-filter: $backdrop-filter;
		backdrop-filter: $backdrop-filter;

		dialog {
			position: relative;
			display: flex;
			flex-direction: column;

			box-sizing: border-box;
			width: max-content;
			padding: vars.$form_gap;
			gap: vars.$form_gap;

			color: colors.$text_a;
			background-color: colors.$background_b;
			border: vars.$item_border;
			border-radius: vars.$item_border_radius;
			box-shadow: vars.$modal_shadow;

			overflow-y: scroll;

			header {
				display: flex;
				align-items: center;
				flex-shrink: 0;
				padding: vars.$item_gap;

				h1 {
					flex-grow: 1;
					margin: 0;
					font-size: 1rem;
				}
			}

			main {
				padding: vars.$item_gap;
			}

			.loader {
				position: absolute;
				inset: 0;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				background-color: colors.$background_b;
			}
		}
	}
</style>
