<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import FinderItemMedia from "$lib/components/finder/finder-item-media.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import PlaylistHeader from "./playlist-header.svelte"
	import PlaylistTrack from "./playlist-track.svelte"
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"

	import { playlists, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	import { openPlaylistCreatorModal } from "./create/playlist-creator.svelte"

	let hidden = true

	let selectedPlaylistID = ""

	$: _playlist = $playlists.get(selectedPlaylistID)

	function startQueue(index: number) {
		playerController.startQueue(
			_playlist.tracklist.map((t) => t.id),
			index
		)
	}
</script>

<Finder title="Playlists" palette={_playlist?.palette ?? Palette.gray}>
	<svelte:fragment slot="header">
		<BtnIconSeamless src="public/icons/add.svg" on:click={openPlaylistCreatorModal} />
	</svelte:fragment>
	<svelte:fragment slot="body">
		{#each [...$playlists] as [_, playlist]}
			<FinderItemMedia
				id={playlist.id}
				title={playlist.title}
				cover={playlist.cover}
				palette={playlist.palette}
				selected={selectedPlaylistID === playlist.id}
				on:select={() => {
					selectedPlaylistID = playlist.id
					hidden = false
				}}
			/>
		{/each}
	</svelte:fragment>
</Finder>

<Viewer bind:hidden empty={selectedPlaylistID == ""} palette={_playlist?.palette ?? Palette.gray}>
	{#key selectedPlaylistID}
		{#if _playlist}
			<PlaylistHeader
				playlist={_playlist}
				on:play={() => {
					startQueue(0)
				}}
			/>
			{#each _playlist.tracklist as playlistTrack, index}
				<PlaylistTrack
					track={$tracks.get(playlistTrack.id)}
					refID={playlistTrack.refID}
					{index}
					on:play={() => {
						startQueue(index)
					}}
				/>
			{/each}
		{/if}
	{/key}
</Viewer>
