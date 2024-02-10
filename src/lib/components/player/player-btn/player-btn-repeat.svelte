<script lang="ts">
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"
	import { createEventDispatcher } from "svelte"

	export let repeatMode: RepeatMode = "OFF"

	let dispatch = createEventDispatcher()

	$: src = repeatMode === "ONE" ? "public/icons/repeat-one.svg" : "public/icons/repeat.svg"

	$: toggled = repeatMode === "OFF" ? false : true

	function togglerepeat() {
		dispatch("togglerepeat")
	}
</script>

<button class:toggled on:click={togglerepeat}>
	<img {src} alt="Repeat icon" />
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
