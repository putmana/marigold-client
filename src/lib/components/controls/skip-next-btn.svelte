<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let desktoponly = false

	let dispatch = createEventDispatcher()

	const _icon = "public/icons/skip-next.svg"

	function skipnext() {
		dispatch("skipnext")
	}
</script>

<button class="btn" on:click={skipnext} class:desktoponly>
	<img src={_icon} alt="skip next button" />
</button>

<style lang="scss">
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.btn {
		@include mixins.clickable;

		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		width: 50px;
		border-radius: 5px;

		img {
			width: 25px;
		}

		@include mixins.mobile-only {
			&.desktoponly {
				display: none;
			}
		}
	}
</style>
