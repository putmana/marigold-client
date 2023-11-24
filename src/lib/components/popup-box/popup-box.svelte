<script lang="ts">
	import { fade, fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"

	const dispatch = createEventDispatcher()

	export let label = "Untitled Popup Box"
	export let visible: boolean

	function close() {
		dispatch("close")
	}
</script>

{#if visible}
	<div class="wrapper" transition:fade={{ duration: 200 }}>
		<div class="box" transition:fly={{ duration: 300, y: -50 }}>
			<header class="titlebar">
				<h1 class="label">{label}</h1>
				<BtnIconSeamless src="public/icons/close.svg" alt="Close" on:click={close} />
			</header>
			<main class="content">
				<slot name="content" />
			</main>
		</div>
	</div>
{/if}

<style lang="scss">
	@use "src/style/colors";
	@use "src/style/mixins";

	.wrapper {
		position: fixed;
		inset: 0px 0px 0px 0px;
		z-index: 2;
		display: flex;
		backdrop-filter: brightness(50%) saturate(50%);
		align-items: center;
		justify-content: center;

		@include mixins.desktop-only {
			align-items: center;
		}

		@include mixins.mobile-only {
			align-items: start;
		}

		.box {
			display: flex;
			flex-direction: column;
			margin: 10px;
			margin-bottom: 60px;
			padding: 20px;
			gap: 20px;
			background-color: colors.$gray-c;
			border: 1px solid colors.$border-hover;
			border-radius: 5px;
			box-shadow: 0px 0px 30px colors.$shadow;
			width: max-content;
			box-sizing: border-box;
			max-width: 95svw;

			.titlebar {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.label {
					margin: 0;
					text-transform: uppercase;
					font-size: inherit;
				}
			}

			.content {
				display: flex;
				gap: 5px;
			}
		}
	}
</style>
