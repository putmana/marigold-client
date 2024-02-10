<script lang="ts">
	import { createEventDispatcher } from "svelte"

	let dispatch = createEventDispatcher()

	const src = "public/icons/skip-prev.svg"

	function skipprev() {
		dispatch("skipprev")
	}
</script>

<button on:click={skipprev}>
	<img {src} alt="Skip to previous track icon" />
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
