<script lang="ts">
	import { fade, fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"
	import Throbber from "../throbber/throbber.svelte"
	import ProgressBar from "../progress-bar/progress-bar.svelte"

	const dispatch = createEventDispatcher()

	export let title = "Untitled Popup Box"
	export let loading = false
	export let progress: number | undefined

	function close() {
		dispatch("close")
	}
</script>

<div class="wrapper" transition:fade={{ duration: 200 }}>
	<div class="box" transition:fly={{ duration: 300, y: -50 }}>
		<header class="titlebar">
			<h1 class="title">{title}</h1>
			<BtnIconSeamless src="public/icons/close.svg" alt="Close" on:click={close} />
		</header>
		<main class="content">
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
	</div>
</div>

<style lang="scss">
	@use "src/style/colors";
	@use "src/style/mixins";

	.wrapper {
		position: absolute;
		inset: 0px auto auto 0px;
		z-index: 15;

		display: flex;
		justify-content: center;
		align-items: center;

		height: 100svh;
		width: 100svw;

		backdrop-filter: brightness(50%) saturate(50%);

		.box {
			position: relative;

			display: flex;
			flex-direction: column;
			gap: 20px;

			box-sizing: border-box;
			width: max-content;
			max-width: 95svw;
			max-height: 95svh;
			margin: 10px;
			padding: 20px;

			background-color: colors.$gray-c;
			border: 1px solid colors.$border-hover;
			border-radius: 5px;
			box-shadow: 0px 0px 30px colors.$shadow;

			overflow-y: scroll;

			.titlebar {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					margin: 0;
					text-transform: uppercase;
					font-size: medium;
				}
			}

			.content {
				display: flex;
				gap: 5px;
			}

			.loader {
				position: absolute;
				inset: 0px 0px 0px 0px;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 30px;

				background-color: colors.$gray-c;
			}
		}
	}
</style>
