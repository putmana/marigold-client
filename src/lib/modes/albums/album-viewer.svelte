<script lang="ts">
	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"

	import { albums, covers } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	export let currentAlbumID: string
	export let palette: Palette

	$: _album = $albums.get(currentAlbumID)
	$: _cover = $covers.get(_album?.coverID)

	$: palette = Palette.parse(_cover?.palette)

	function startQueue(index: number) {
		const trackIDs = _album.orderedTracks.map((track) => track.id)
		playerController.startQueue(trackIDs, index)
	}
</script>

{#if _album}
	<ViewerHeader
		title={_album.title}
		coverID={_album.coverID}
		description={""}
		on:play={() => {
			startQueue(0)
		}}
		on:edit
	/>

	{#each _album.orderedTracks as orderedTrack, index}
		<ViewerTrack
			{orderedTrack}
			showCover={false}
			on:play={() => {
				startQueue(index)
			}}
		/>
	{/each}
{/if}
