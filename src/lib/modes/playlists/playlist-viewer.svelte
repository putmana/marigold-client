<script lang="ts">
	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"

	import { playlists } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	export let currentPlaylistID: string

	$: _playlist = $playlists.get(currentPlaylistID)

	function startQueue(index: number) {
		playerController.startQueue(_playlist.trackIDs, index)
	}
</script>

{#if _playlist}
	<ViewerHeader
		title={_playlist.title}
		coverID={_playlist.coverID}
		description={_playlist.description}
		on:play={() => {
			startQueue(0)
		}}
		on:edit
	/>

	{#each _playlist.trackIDs as trackID, index}
		<ViewerTrack
			{trackID}
			{index}
			on:play={() => {
				startQueue(index)
			}}
		/>
	{/each}
{/if}
