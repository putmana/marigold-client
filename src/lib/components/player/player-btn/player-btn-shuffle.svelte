<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let shuffleEnabled = false

	let dispatch = createEventDispatcher()

	const src = "public/icons/shuffle.svg"

	$: toggled = shuffleEnabled

	function toggleShuffle() {
		dispatch("toggleshuffle")
	}
</script>

<button class="seamless" class:toggled on:click={toggleShuffle}>
	<img {src} alt="Shuffle icon" />
</button>

<style lang="scss">
	@use "./player-btn";

	button {
		@include player-btn.base;
		@include player-btn.toggleable;

		img {
			width: 1.25em;
		}
	}
</style>
