<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let paused = true

	let dispatch = createEventDispatcher()

	$: src = paused ? "public/icons/play.svg" : "public/icons/pause.svg"

	function playpause() {
		dispatch("playpause")
	}
</script>

<button on:click={playpause}>
	<img {src} alt="play/pause icon" />
</button>

<style lang="scss">
	@use "./player-btn";

	button {
		@include player-btn.base;

		img {
			width: 1.75em;
		}
	}
</style>
