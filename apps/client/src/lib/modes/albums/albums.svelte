<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import FinderItemMedia from "$lib/components/finder/finder-item-media.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import AlbumHeader from "./album-header.svelte"
	import AlbumTrack from "./album-track.svelte"
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"

	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	import { openAlbumCreatorModal } from "./create/album-creator.svelte"

	let hidden = true

	let selectedAlbumID = ""

	$: _album = $albums.get(selectedAlbumID)

	function startQueue(index: number) {
		playerController.startQueue(
			_album.tracklist.map((t) => t.id),
			index
		)
	}
</script>

<Finder title="Albums" palette={_album?.palette ?? Palette.gray}>
	<svelte:fragment slot="header">
		<BtnIconSeamless src="public/icons/add.svg" on:click={openAlbumCreatorModal} />
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
		{#if _album}
			<AlbumHeader
				album={_album}
				on:play={() => {
					startQueue(0)
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
