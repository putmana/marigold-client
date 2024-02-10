<script lang="ts">
	import { createEventDispatcher } from "svelte"

	let dispatch = createEventDispatcher()

	const src = "public/icons/skip-next.svg"

	function skipnext() {
		dispatch("skipnext")
	}
</script>

<button on:click={skipnext}>
	<img {src} alt="Skip to next track icon" />
</button>

<style lang="scss">
	@use "./player-btn";

	button {
		@include player-btn.base;

		img {
			width: 1.5em;
		}
	}
</style>
