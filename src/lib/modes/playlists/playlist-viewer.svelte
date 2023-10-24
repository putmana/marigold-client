<script lang="ts">
	import { playlists, covers } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"

	export let currentPlaylistID: string
	export let color: string

	$: playlist = $playlists.get(currentPlaylistID) ?? undefined
	$: color = $covers.get(playlist?.coverID)?.palette ?? ""

	function startQueue(index: number) {
		const trackIDs = playlist.orderedTracks.map((track) => track.id)
		playerController.startQueue(trackIDs, index)
	}
</script>

{#if playlist}
	<ViewerHeader
		title={playlist.title}
		coverID={playlist.coverID}
		description={playlist.description}
	/>

	{#each playlist.orderedTracks as orderedTrack, index}
		<ViewerTrack
			{orderedTrack}
			on:play={() => {
				startQueue(index)
			}}
		/>
	{/each}
{/if}
