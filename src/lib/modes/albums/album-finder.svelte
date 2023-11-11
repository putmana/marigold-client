<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import { albums } from "$lib/scripts/library/AlbumsStore"

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
		cover={album.cover}
		palette={album.palette}
		selected={albumID == currentAlbumID}
		on:select={() => {
			selectAlbum(albumID)
		}}
	/>
{/each}
