<script lang="ts">
	import PlaylistHeader from "./playlist-header.svelte"
	import PlaylistEditor from "./edit/playlist-editor.svelte"
	import PlaylistTrack from "./playlist-track.svelte"
	import TrackPicker, { openPicker } from "$lib/components/track-picker/track-picker.svelte"

	import { playlists, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	let editing = false

	export let currentPlaylistID: string

	$: _playlist = $playlists.get(currentPlaylistID)

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

{#key currentPlaylistID}
	{#if _playlist}
		<TrackPicker />
		<PlaylistEditor bind:visible={editing} playlist={_playlist} />

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

		{#each _playlist.tracklist as playlistTrack, index}
			<PlaylistTrack
				{playlistTrack}
				{index}
				on:play={() => {
					startQueue(index)
				}}
			/>
		{/each}
	{/if}
{/key}
