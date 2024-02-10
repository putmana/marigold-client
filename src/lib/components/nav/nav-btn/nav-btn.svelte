<script lang="ts">
	import { mode, type Mode } from "$lib/scripts/stores/ModeStore"
	import Icon from "$lib/ui/icon/icon.svelte"

	export let label: string
	export let iconPath: string
	export let tab: Mode

	$: enabled = $mode === tab

	function switchMode() {
		$mode = tab
	}
</script>

<button title={label} class:seamless={!enabled} on:click={switchMode}>
	<Icon src={iconPath} alt={`${label} icon`} />
</button>

<style lang="scss">
	@use "/src/lib/ui/button/button";

	button {
		@include button.base;

		&.seamless {
			@include button.seamless;
		}
	}
</style>
