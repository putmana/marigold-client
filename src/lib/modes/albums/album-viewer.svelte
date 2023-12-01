<script lang="ts">
	import AlbumHeader from "./album-header.svelte"
	import AlbumEditor from "./edit/album-editor.svelte"
	import AlbumTrack from "./album-track.svelte"
	import TrackUploader, { openUploader } from "$lib/components/track-uploader/track-uploader.svelte"

	import { albums } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	let editing = false

	export let currentAlbumID: string

	$: _album = $albums.get(currentAlbumID)

	function startQueue(index: number) {
		playerController.startQueue(
			_album.tracklist.map((t) => t.id),
			index
		)
	}

	function openEditor() {
		editing = true
	}
</script>

{#key currentAlbumID}
	{#if _album}
		<TrackUploader />
		<AlbumEditor bind:visible={editing} album={_album} />

		<AlbumHeader
			album={_album}
			on:play={() => {
				startQueue(0)
			}}
			on:edit={openEditor}
			on:upload={() => {
				openUploader(_album.id)
			}}
		/>

		{#each _album.tracklist as albumTrack, index}
			<AlbumTrack
				{albumTrack}
				{index}
				on:play={() => {
					startQueue(index)
				}}
			/>
		{/each}
	{/if}
{/key}
