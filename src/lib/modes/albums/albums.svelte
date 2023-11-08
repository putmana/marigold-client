<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import AlbumFinder from "./album-finder.svelte"
	import AlbumViewer from "./album-viewer.svelte"
	import AlbumEditor from "./album-editor.svelte"

	import { albums, covers, selectedAlbumID } from "$lib/scripts/stores/LibraryStore"
	import { editing } from "$lib/scripts/stores/EditStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	let hidden = true
	let palette = Palette.gray

	$: palette = loadPalette($selectedAlbumID)

	function loadPalette(albumID: string) {
		const _album = $albums.get(albumID)
		const _cover = $covers.get(_album?.coverID)

		return Palette.parse(_cover?.palette)
	}

	function showFinder() {
		hidden = false
	}

	function openEditor() {
		$editing = true
		console.log("EDITOR OPENED")
	}

	function closeEditor() {
		$editing = false
	}
</script>

<Finder title="Albums">
	<AlbumFinder bind:currentAlbumID={$selectedAlbumID} on:select={showFinder} />
</Finder>
<Viewer bind:hidden {palette}>
	{#if $editing}
		<AlbumEditor currentAlbumID={$selectedAlbumID} on:close={closeEditor} />
	{:else}
		<AlbumViewer currentAlbumID={$selectedAlbumID} on:edit={openEditor} />
	{/if}
</Viewer>
