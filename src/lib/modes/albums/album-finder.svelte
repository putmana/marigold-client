<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import { albums } from "$lib/scripts/stores/LibraryStore"

	import FinderItem from "$lib/components/finder/finder-item.svelte"

	let dispatch = createEventDispatcher()

	export let currentAlbumID: string

	function selectAlbum(albumID: string) {
		currentAlbumID = albumID
		dispatch("select")
	}
</script>

{#each [...$albums] as [albumID, album]}
	<FinderItem
		id={albumID}
		title={album.title}
		artists={album.artists}
		coverID={album.coverID}
		selected={albumID == currentAlbumID}
		on:select={() => {
			selectAlbum(albumID)
		}}
	/>
{/each}
