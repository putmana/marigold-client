<script lang="ts">
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
	<div class="wrapper">
		<div class="box">
			<header class="titlebar">
				<h1 class="label">{label}</h1>
				<BtnIconSeamless src="public/icons/close.svg" alt="Close" on:click={close} />
			</header>
			<main class="content">
				<slot name="content" />
			</main>
			<footer class="footer">
				<slot name="footer" />
			</footer>
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
		background-color: colors.$shadow;
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
			padding: 20px;
			gap: 20px;
			background-color: colors.$gray-c;
			border: 1px solid colors.$hover;
			border-radius: 5px;
			box-shadow: 0px 0px 50px colors.$shadow-dark;
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

			.footer {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>
