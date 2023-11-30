<script lang="ts">
	import ViewerHeader from "$lib/components/viewer/viewer-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"
	import AlbumEditor from "./edit/album-editor.svelte"
	import TrackUploader, { openUploader } from "$lib/components/track-uploader/track-uploader.svelte"

	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	let editing = false

	export let currentAlbumID: string

	$: _album = $albums.get(currentAlbumID)
	$: _tracks = _album?.tracklist.map((t) => $tracks.get(t.id))

	$: _tracks?.sort((a, b) => a.index - b.index)

	function startQueue(index: number) {
		playerController.startQueue(
			_album.tracklist.map((t) => t.id),
			index
		)
	}

	function openEdtior() {
		editing = true
	}
</script>

{#key currentAlbumID}
	{#if _album}
		{#key currentAlbumID}
			<TrackUploader />
			<AlbumEditor bind:visible={editing} album={_album} />
		{/key}

		<ViewerHeader
			title={_album.title}
			cover={_album.cover}
			palette={_album.palette}
			description={_album.artists}
			on:play={() => {
				startQueue(0)
			}}
			on:edit={openEdtior}
			on:upload={() => {
				openUploader(_album.id)
			}}
		/>

		{#each _tracks as track, index}
			<ViewerTrack
				{track}
				{index}
				showCover={false}
				on:play={() => {
					startQueue(index)
				}}
			/>
		{/each}
	{/if}
{/key}
