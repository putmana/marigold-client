<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import PlaylistFinder from "./playlist-finder.svelte"
	import PlaylistViewer from "./playlist-viewer.svelte"

	import { selectedPlaylistID } from "$lib/scripts/stores/LibraryStore"
	import { editing } from "$lib/scripts/stores/EditStore"

	let hidden = true
	let color = ""

	function showFinder() {
		hidden = false
	}
</script>

<Finder title="Playlists">
	<PlaylistFinder bind:currentPlaylistID={$selectedPlaylistID} on:select={showFinder} />
</Finder>
<Viewer bind:hidden {color}>
	{#if $editing}
		...
	{:else}
		<PlaylistViewer bind:color currentPlaylistID={$selectedPlaylistID} />
	{/if}
</Viewer>
