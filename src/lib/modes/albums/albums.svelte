<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import AlbumFinder from "./album-finder.svelte"
	import AlbumViewer from "./album-viewer.svelte"
	import AlbumEditor from "./album-editor.svelte"

	import { library, selectedAlbumID } from "$lib/scripts/stores/LibraryStore"
	import { editing } from "$lib/scripts/stores/EditStore"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { pb } from "$lib/scripts/database/pocketbase"

	let hidden = true
	let palette: Palette = Palette.gray

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
		<AlbumEditor bind:palette currentAlbumID={$selectedAlbumID} />
	{:else}
		<AlbumViewer bind:palette currentAlbumID={$selectedAlbumID} on:edit={openEditor} />
	{/if}
</Viewer>
