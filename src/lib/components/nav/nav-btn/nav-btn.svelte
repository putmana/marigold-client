<script lang="ts">
	import { mode, type Mode } from "$lib/scripts/stores/ModeStore"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"

	export let label: string
	export let iconPath: string
	export let tab: Mode

	$: enabled = $mode === tab

	function switchMode() {
		$mode = tab
	}
</script>

<button class:seamless={!enabled} on:click={switchMode}>
	<img src={iconPath} alt={`${label} icon`} />
</button>

<style lang="scss">
	@use "/src/lib/ui/button/button";

	button {
		@include button.base;

		padding: 0.75em;

		img {
			display: block;
			width: 1.5em;
		}
	}
</style>
