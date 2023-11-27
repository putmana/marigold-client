<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import PlaylistFinder from "./playlist-finder.svelte"
	import PlaylistViewer from "./playlist-viewer.svelte"

	import { playlists } from "$lib/scripts/stores/LibraryStore"

	import { Palette } from "$lib/scripts/color-engine/palette"

	let hidden = true
	let creating = false
	let selectedPlaylistID = ""

	$: _playlist = $playlists.get(selectedPlaylistID)

	function showFinder() {
		hidden = false
	}

	function openCreator() {
		creating = true
	}
</script>

<Finder title="Playlists">
	<PlaylistFinder bind:currentPlaylistID={selectedPlaylistID} on:select={showFinder} />
</Finder>
<Viewer bind:hidden palette={_playlist?.palette ?? Palette.gray}>
	<PlaylistViewer currentPlaylistID={selectedPlaylistID} />
</Viewer>
