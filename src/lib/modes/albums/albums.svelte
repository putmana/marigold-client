<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import AlbumFinder from "./album-finder.svelte"
	import AlbumViewer from "./album-viewer.svelte"

	import { albums, selectedAlbumID } from "$lib/scripts/library/AlbumsStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	let hidden = true

	$: _album = $albums.get($selectedAlbumID)

	function showFinder() {
		hidden = false
	}
</script>

<Finder title="Albums">
	<AlbumFinder bind:currentAlbumID={$selectedAlbumID} on:select={showFinder} />
</Finder>
<Viewer bind:hidden palette={_album?.palette ?? Palette.gray}>
	<AlbumViewer currentAlbumID={$selectedAlbumID} />
</Viewer>
