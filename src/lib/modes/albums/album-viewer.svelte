<script lang="ts">
	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"

	import { albums } from "$lib/scripts/library/AlbumsStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	export let currentAlbumID: string

	$: _album = $albums.get(currentAlbumID)

	function startQueue(index: number) {
		playerController.startQueue(_album.trackIDs, index)
	}
</script>

{#if _album}
	<ViewerHeader
		title={_album.title}
		cover={_album.cover}
		palette={_album.palette}
		description={_album.artists}
		on:play={() => {
			startQueue(0)
		}}
		on:edit
	/>

	{#each _album.trackIDs as trackID, index}
		<ViewerTrack
			{trackID}
			{index}
			showCover={false}
			on:play={() => {
				startQueue(index)
			}}
		/>
	{/each}
{/if}
