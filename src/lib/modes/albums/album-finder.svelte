<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import { albums, artists } from "$lib/scripts/stores/LibraryStore"

	import FinderItem from "$lib/components/finder/finder-item.svelte"

	let dispatch = createEventDispatcher()

	export let currentAlbumID: string

	function formatArtists(artists: OrderedArtist[]) {
		const artistNames = artists.map((artist) => $artists.get(artist.id).name).join(", ")

		return artistNames
	}

	function selectAlbum(albumID: string) {
		currentAlbumID = albumID
		dispatch("select")
	}
</script>

{#each [...$albums] as [albumID, album]}
	<FinderItem
		id={albumID}
		title={album.title}
		artists={formatArtists(album.orderedArtists)}
		coverID={album.coverID}
		selected={albumID == currentAlbumID}
		on:select={() => {
			selectAlbum(albumID)
		}}
	/>
{/each}
