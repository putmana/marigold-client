<script lang="ts">
	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"
	import { playlists } from "$lib/scripts/library/PlaylistsStore"
	import { tracks } from "$lib/scripts/library/TracksStore"

	import { playerController } from "$lib/scripts/stores/PlayerStore"

	export let currentPlaylistID: string

	$: _playlist = $playlists.get(currentPlaylistID)
	$: _tracks = _playlist?.tracklist.map((t) => $tracks.get(t.id))

	function startQueue(index: number) {
		playerController.startQueue(
			_playlist.tracklist.map((t) => t.id),
			index
		)
	}
</script>

{#if _playlist}
	<ViewerHeader
		title={_playlist.title}
		cover={_playlist.cover}
		palette={_playlist.palette}
		description={_playlist.description}
		on:play={() => {
			startQueue(0)
		}}
		on:edit
	/>

	{#each _tracks as track, index}
		<ViewerTrack
			{track}
			{index}
			on:play={() => {
				startQueue(index)
			}}
		/>
	{/each}
{/if}
