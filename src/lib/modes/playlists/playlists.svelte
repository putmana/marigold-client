<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import PlaylistFinder from "./playlist-finder.svelte"
	import PlaylistViewer from "./playlist-viewer.svelte"
	import PlaylistEditor from "./playlist-editor.svelte"

	import { playlists, selectedPlaylistID } from "$lib/scripts/library/PlaylistsStore"

	import { editing } from "$lib/scripts/stores/EditStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	let hidden = true

	$: _playlist = $playlists.get($selectedPlaylistID)

	$: palette = Palette.parse(_playlist?.palette)

	function showFinder() {
		hidden = false
	}

	function openEditor() {
		$editing = true
	}

	function closeEditor() {
		$editing = false
	}
</script>

<Finder title="Playlists">
	<PlaylistFinder bind:currentPlaylistID={$selectedPlaylistID} on:select={showFinder} />
</Finder>
<Viewer bind:hidden {palette}>
	{#if $editing}
		<PlaylistEditor currentPlaylistID={$selectedPlaylistID} on:close={closeEditor} />
	{:else}
		<PlaylistViewer currentPlaylistID={$selectedPlaylistID} on:edit={openEditor} />
	{/if}
</Viewer>
