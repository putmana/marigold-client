<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import FinderItemMedia from "$lib/components/finder/finder-item-media.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import AlbumCreator from "./create/album-creator.svelte"
	import AlbumEditor from "./edit/album-editor.svelte"
	import AlbumHeader from "./album-header.svelte"
	import AlbumTrack from "./album-track.svelte"
	import TrackUploader, { openUploader } from "$lib/components/track-uploader/track-uploader.svelte"
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"

	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	let hidden = true

	let selectedAlbumID = ""

	let creating = false
	let editing = false

	$: _album = $albums.get(selectedAlbumID)

	function openCreator() {
		creating = true
	}

	function openEditor() {
		editing = true
	}

	function startQueue(index: number) {
		playerController.startQueue(
			_album.tracklist.map((t) => t.id),
			index
		)
	}
</script>

<Finder title="Albums" on:create={openCreator} palette={_album?.palette ?? Palette.gray}>
	<svelte:fragment slot="header">
		<BtnIconSeamless src="public/icons/add.svg" on:click={openCreator} />
	</svelte:fragment>
	<svelte:fragment slot="body">
		{#each [...$albums] as [_, album]}
			<FinderItemMedia
				id={album.id}
				title={album.title}
				artists={album.artists}
				cover={album.cover}
				palette={album.palette}
				selected={selectedAlbumID === album.id}
				on:select={() => {
					selectedAlbumID = album.id
					hidden = false
				}}
			/>
		{/each}
	</svelte:fragment>
</Finder>

<Viewer bind:hidden empty={selectedAlbumID == ""} palette={_album?.palette ?? Palette.gray}>
	{#key selectedAlbumID}
		<AlbumCreator bind:visible={creating} />
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
					track={$tracks.get(albumTrack.id)}
					{index}
					on:play={() => {
						startQueue(index)
					}}
				/>
			{/each}
		{/if}
	{/key}
</Viewer>
