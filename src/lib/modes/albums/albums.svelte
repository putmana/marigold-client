<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import AlbumFinder from "./album-finder.svelte"
	import AlbumViewer from "./album-viewer.svelte"

	import { selectedAlbumID } from "$lib/scripts/stores/LibraryStore"
	import { editing } from "$lib/scripts/stores/EditStore"

	let hidden = true
	let color = ""

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
<Viewer bind:hidden {color}>
	{#if $editing}
		...
	{:else}
		<AlbumViewer bind:color currentAlbumID={$selectedAlbumID} on:edit={openEditor} />
	{/if}
</Viewer>
