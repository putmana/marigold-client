<script lang="ts">
	import { fade } from "svelte/transition"
	import { quintInOut } from "svelte/easing"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"

	export let src = "public/icons/context-menu.svg"

	let open = false

	function toggle() {
		open = !open
	}

	function close() {
		setTimeout(() => (open = false), 100)
	}
</script>

<div class="wrapper">
	<BtnIconSeamless {src} alt="Context menu icon" on:click={toggle} on:focusout={close} />
	{#if open}
		<div class="menu" transition:fade={{ duration: 100, easing: quintInOut }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	@use "/src/style/colors";

	.wrapper {
		position: relative;

		.menu {
			position: absolute;
			inset: calc(100% + 5px) 0px auto auto;
			z-index: 100;

			display: flex;
			flex-direction: column;

			min-width: 150px;
			min-height: 60px;
			padding: 5px;

			backdrop-filter: blur(30px);
			background-color: colors.$hover;

			border: 1px solid colors.$border-hover;
			border-radius: 5px;
		}
	}
</style>
