<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let desktoponly = false

	let dispatch = createEventDispatcher()

	const _icon = "public/icons/skip-prev.svg"

	function skipprev() {
		dispatch("skipprev")
	}
</script>

<button class="btn" on:click={skipprev} class:desktoponly>
	<img src={_icon} alt="skip prev button" />
</button>

<style lang="scss">
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.btn {
		@include mixins.clickable;

		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
		width: 45px;
		border-radius: 5px;

		img {
			width: 20px;
		}

		@include mixins.mobile-only {
			&.desktoponly {
				display: none;
			}
		}
	}
</style>
