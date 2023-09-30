<script lang="ts">
	export let hidden: boolean
	export let color: Palette

	// Replace with real controls in future
	function onKeyDown(e) {
		if (e.key == "h") {
			hidden = !hidden

			e.preventDefault()
		}
	}
</script>

<main
	class="wrapper"
	class:hidden
	style="--main-light: {color.main.light}; --main-dark: {color.main.dark}; --border-light: {color
		.border.light}"
>
	<slot />
</main>

<svelte:window on:keydown={onKeyDown} />

<style lang="scss">
	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	@media (max-width: sizes.$screen-lg) {
		.wrapper {
			background-image: linear-gradient(to bottom, var(--main-light), var(--main-dark));
			position: fixed;
			width: 100vw;
			height: 100vh;
			transition: transform 0.3s ease-out;
			&.hidden {
				transform: translateX(100vw);
			}
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			background-image: linear-gradient(to right, var(--main-light), var(--main-dark));
			flex-grow: 1;
			border-left: 1px solid var(--border-light);
		}
	}
</style>
