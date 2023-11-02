<script lang="ts">
	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"

	import { playlists, covers } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	export let currentPlaylistID: string
	export let palette: Palette

	$: _playlist = $playlists.get(currentPlaylistID) ?? undefined
	$: palette = $covers.get(_playlist?.coverID)?.palette ?? Palette.gray

	function startQueue(index: number) {
		const trackIDs = _playlist.orderedTracks.map((track) => track.id)
		playerController.startQueue(trackIDs, index)
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

	{#each _playlist.orderedTracks as orderedTrack, index}
		<ViewerTrack
			{orderedTrack}
			on:play={() => {
				startQueue(index)
			}}
		/>
	{/each}
{/if}
