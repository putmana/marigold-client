<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import AlbumFinder from "./album-finder.svelte"
	import AlbumViewer from "./album-viewer.svelte"
	import AlbumCreator from "./create/album-creator.svelte"

	import { albums } from "$lib/scripts/stores/LibraryStore"

	import { Palette } from "$lib/scripts/color-engine/palette"

	let hidden = true
	let creating = false
	let selectedAlbumID = ""

	$: _album = $albums.get(selectedAlbumID)

	function showFinder() {
		hidden = false
	}

	function openCreator() {
		creating = true
	}
</script>

<Finder title="Albums" on:create={openCreator} palette={_album?.palette ?? Palette.gray}>
	<AlbumFinder bind:currentAlbumID={selectedAlbumID} on:select={showFinder} />
</Finder>
<Viewer bind:hidden empty={selectedAlbumID == ""} palette={_album?.palette ?? Palette.gray}>
	<AlbumViewer currentAlbumID={selectedAlbumID} />
	{#key selectedAlbumID}
		<AlbumCreator bind:visible={creating} />
	{/key}
</Viewer>
