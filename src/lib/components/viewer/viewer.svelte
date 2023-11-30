<script lang="ts">
	import type { Palette } from "$lib/scripts/color-engine/palette"

	export let hidden: boolean
	export let palette: Palette
	export let empty: boolean

	// Hide the finder on mobile displays
	function hide() {
		hidden = true
	}
</script>

<main class="wrapper" class:hidden class:empty style={palette.toCSS()}>
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
	@use "/src/style/colors";
	.wrapper {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: var(--primary-medium);

		.topbar {
			padding: 20px;
			padding-bottom: 10px;
			position: sticky;
			top: 0;
			background-color: var(--primary-medium);

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
			flex-grow: 1;
			flex-direction: column;
			padding-bottom: 180px;
			overflow-y: scroll;
		}

		&.empty {
			background-image: url("public/images/logo-tl.svg");
			background-repeat: no-repeat;
			background-position: center;
			background-size: 70px;
			background-color: colors.$gray-b;

			box-shadow: inset 30px 0px 30px -30px colors.$shadow;

			.list {
				padding: none;
			}
		}
	}

	@media (max-width: sizes.$screen-lg) {
		.wrapper {
			position: fixed;
			width: 100vw;
			height: 100vh;
			transition: all 0.3s ease-out;
			.list {
				background-image: linear-gradient(to bottom, var(--primary-medium), var(--secondary-dark));
			}
			&.hidden {
				transform: translateX(100vw);
			}
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			background-image: linear-gradient(to right, var(--primary-medium), var(--secondary-dark));
			flex-grow: 1;
		}
		.topbar {
			display: none;
		}
	}
</style>
