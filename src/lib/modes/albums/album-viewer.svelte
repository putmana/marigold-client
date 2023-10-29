<script lang="ts">
	import { albums, covers } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"

	export let currentAlbumID: string
	export let color: string

	$: album = $albums.get(currentAlbumID) ?? undefined
	$: color = $covers.get(album?.coverID)?.palette ?? ""

	function startQueue(index: number) {
		const trackIDs = album.orderedTracks.map((track) => track.id)
		playerController.startQueue(trackIDs, index)
	}
</script>

{#if album}
	<ViewerHeader
		title={album.title}
		coverID={album.coverID}
		description={""}
		on:play={() => {
			startQueue(0)
		}}
		on:edit
	/>

	{#each album.orderedTracks as orderedTrack, index}
		<ViewerTrack
			{orderedTrack}
			showCover={false}
			on:play={() => {
				startQueue(index)
			}}
		/>
	{/each}
{/if}
