<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let paused = true
	export let desktoponly = false

	let dispatch = createEventDispatcher()

	$: _icon = paused ? "public/icons/play.svg" : "public/icons/pause.svg"

	function playpause() {
		dispatch("playpause")
	}
</script>

<button class="btn" on:click={playpause} class:desktoponly>
	<img src={_icon} alt="play/pause button" />
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
			width: 35px;
		}
	}
</style>
