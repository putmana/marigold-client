<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import PlaylistFinder from "./playlist-finder.svelte"
	import PlaylistViewer from "./playlist-viewer.svelte"

	import { covers, playlists, selectedPlaylistID } from "$lib/scripts/stores/LibraryStore"
	import { editing } from "$lib/scripts/stores/EditStore"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import PlaylistEditor from "./playlist-editor.svelte"

	let hidden = true

	$: _playlist = $playlists.get($selectedPlaylistID)
	$: _cover = $covers.get(_playlist?.coverID)

	$: palette = Palette.parse(_cover?.palette)

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
