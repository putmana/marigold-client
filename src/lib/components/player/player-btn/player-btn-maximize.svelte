<script lang="ts">
	import { createEventDispatcher } from "svelte"

	let dispatch = createEventDispatcher()

	const src = "public/icons/maximize.svg"

	function maximize() {
		dispatch("maximize")
	}
</script>

<button class="seamless" on:click={maximize}>
	<img {src} alt="Skip to next track icon" />
</button>

<style lang="scss">
	@use "./player-btn";

	button {
		@include player-btn.base;

		img {
			width: 1.25em;
		}
	}
</style>
