<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let desktoponly = false
	export let shuffleEnabled = false

	let dispatch = createEventDispatcher()

	const _icon = "public/icons/shuffle.svg"

	$: toggled = shuffleEnabled

	function toggleshuffle() {
		dispatch("toggleshuffle")
	}
</script>

<button class="btn" on:click={toggleshuffle} class:desktoponly class:toggled>
	<img src={_icon} alt="toggle shuffle button" />
</button>

<style lang="scss">
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.btn {
		@include mixins.clickable;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		width: 45px;
		border-radius: 5px;

		img {
			width: 20px;
		}

		&::after {
			content: "";
			height: 0px;
			width: 0px;
			border-radius: 5px;
			background-color: var(--primary-verylight);
			transition: all 0.2s ease-in-out;
		}

		&.toggled {
			&::after {
				content: "";
				margin-top: 5px;
				width: 15px;
				height: 5px;
			}
		}

		@include mixins.mobile-only {
			&.desktoponly {
				display: none;
			}
		}
	}
</style>
