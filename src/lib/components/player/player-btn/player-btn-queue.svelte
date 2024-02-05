<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let queueEnabled = false

	let dispatch = createEventDispatcher()

	const src = "public/icons/queue.svg"

	$: toggled = queueEnabled

	function toggleQueue() {
		dispatch("togglequeue")
	}
</script>

<button class="seamless" class:toggled on:click={toggleQueue}>
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
