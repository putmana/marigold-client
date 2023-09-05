<script lang="ts">
	import { defaultColor, playerPalette } from "$lib/stores/colors"
	import { onDestroy } from "svelte"
	import Controller from "./subcomponents/controller.svelte"
	import { buildPalette } from "$lib/scripts/palette"

	onDestroy(() => {
		$playerPalette = buildPalette(defaultColor)
	})
</script>

<div
	class="player"
	style="--main-light: {$playerPalette.main.light}; --main-dark: {$playerPalette.main.dark}"
>
	<Controller />
</div>

<style lang="scss">
	@import "/static/vars.scss";
	.player {
		min-height: calc($player-size + $margin-size);
		z-index: 2;
		background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
		//box-shadow: 0 calc($shadow-size * -1) calc($shadow-size * 2) $shadow-color;
	}
</style>
