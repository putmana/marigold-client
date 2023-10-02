<script lang="ts">
	export let hidden: boolean
	export let color: Palette

	// Hide the finder on mobile displays
	function hide() {
		hidden = true
	}
</script>

<main
	class="wrapper"
	class:hidden
	style="--main-light: {color.main.light}; --main-dark: {color.main.dark}; --border-light: {color
		.border.light}"
>
	<section class="topbar">
		<button class="back-btn" on:click={hide}
			><img class="icon" alt="back button icon" src={"public/icons/back.svg"} /></button
		>
	</section>
	<section class="list">
		<slot />
	</section>
</main>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	.wrapper {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		.topbar {
			padding: 20px;
			position: sticky;
			top: 0;
			background-color: var(--main-light);
			box-shadow: 0px 10px 10px -10px var(--main-light);
			.back-btn {
				@include mixins.clickable;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 5px;
				.icon {
					height: 20px;
					width: 20px;
				}
			}
		}
		.list {
			padding: 10px;
			display: flex;
			flex-direction: column;
			padding-bottom: 180px;
			overflow-y: scroll;
		}
	}

	@media (max-width: sizes.$screen-lg) {
		.wrapper {
			position: fixed;
			width: 100vw;
			height: 100vh;
			transition: transform 0.3s ease-out;
			.list {
				background-image: linear-gradient(to bottom, var(--main-light), var(--main-dark));
			}
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
		.topbar {
			display: none;
		}
	}
</style>
