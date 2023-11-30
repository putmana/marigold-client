<script lang="ts">
	import PlaylistHeader from "./playlist-header.svelte"
	import ViewerTrack from "$lib/components/viewer/viewer-track.svelte"
	import PlaylistEditor from "./edit/playlist-editor.svelte"
	import TrackPicker, { openPicker } from "$lib/components/track-picker/track-picker.svelte"

	import { playlists, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	let editing = false

	export let currentPlaylistID: string

	$: _playlist = $playlists.get(currentPlaylistID)
	$: _tracks = _playlist?.tracklist.map((track) => $tracks.get(track.id))

	function startQueue(index: number) {
		playerController.startQueue(
			_playlist.tracklist.map((t) => t.id),
			index
		)
	}

	function openEditor() {
		editing = true
	}
</script>

{#if _playlist}
	{#key currentPlaylistID}
		<TrackPicker />
		<PlaylistEditor bind:visible={editing} playlist={_playlist} />
	{/key}

	<PlaylistHeader
		playlist={_playlist}
		on:play={() => {
			startQueue(0)
		}}
		on:edit={openEditor}
		on:pick={() => {
			openPicker(_playlist.id)
		}}
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
