<script lang="ts">
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"
	import { createEventDispatcher } from "svelte"

	export let desktoponly = false
	export let repeatMode: RepeatMode = "OFF"

	let dispatch = createEventDispatcher()

	$: _icon = repeatMode === "ONE" ? "public/icons/repeat-one.svg" : "public/icons/repeat.svg"

	$: toggled = repeatMode === "OFF" ? false : true

	function togglerepeat() {
		dispatch("togglerepeat")
	}
</script>

<button class="btn" on:click={togglerepeat} class:desktoponly class:toggled>
	<img src={_icon} alt="toggle repeat button" />
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
		height: 50px;
		width: 50px;
		border-radius: 5px;

		img {
			width: 15px;
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
