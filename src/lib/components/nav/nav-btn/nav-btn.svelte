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

<ButtonIcon
	src={iconPath}
	alt={`${label} icon`}
	toggled={enabled}
	seamless={!enabled}
	padded
	on:click={switchMode}
/>
