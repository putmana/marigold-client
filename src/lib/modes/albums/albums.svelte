<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import FinderItemMedia from "$lib/components/finder/finder-item-media.svelte"
	import Tracklist from "$lib/components/tracklist/tracklist.svelte"
	import Track from "$lib/components/track/track.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"

	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	import { openAlbumCreatorModal } from "./create/album-creator.svelte"

	import ButtonIcon from "$lib/ui/button/button-icon.svelte"

	import { bgPalette } from "$lib/scripts/stores/PaletteStore"
	import { openAlbumEditorModal } from "./edit/album-editor.svelte"
	import Button from "$lib/ui/button/button.svelte"
	import Icon from "$lib/ui/icon/icon.svelte"
	import { pluralize } from "$lib/scripts/utils"

	let hidden = true

	let selectedAlbumID = ""

	$: _album = $albums.get(selectedAlbumID)
	$: _tracks = _album?.tracklist.map((t) => $tracks.get(t.id))

	$: $bgPalette = _album?.palette ?? Palette.gray

	$: details = [
		`${_album?.artists}`,
		`Album • ${_album?.year} • ${pluralize(_album?.tracklist.length, "track", "tracks")}`
	]

	function startQueue(index: number) {
		playerController.startQueue(
			_album.tracklist.map((t) => t.id),
			index
		)
	}
</script>

<Finder title="Albums" palette={_album?.palette ?? Palette.gray}>
	<svelte:fragment slot="header">
		<ButtonIcon
			src="public/icons/add.svg"
			alt="Add album icon"
			on:click={openAlbumCreatorModal}
			tooltip="Create a new album"
			seamless
			nopadding
		/>
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

{#key selectedAlbumID}
	{#if _album}
		<Tracklist
			title={_album.title}
			{details}
			artSrc={_album.cover.large}
			artAlt={`Cover art for ${_album.title}`}
		>
			<svelte:fragment slot="actions">
				{#if _album.tracklist.length === 0}
					<Button>
						<Icon src="public/icons/upload.svg" alt="Upload icon" />
						<span>Upload Tracks</span>
					</Button>
				{:else}
					<Button>
						<Icon src="public/icons/play.svg" alt="Play icon" />
						<span>Play</span>
					</Button>
					<ButtonIcon
						src="public/icons/upload.svg"
						alt="Upload icon"
						tooltip="Upload tracks to album"
					/>
				{/if}

				<ButtonIcon
					src="public/icons/edit.svg"
					alt="Edit icon"
					on:click={() => openAlbumEditorModal(_album)}
					tooltip="Edit album details"
				/>
			</svelte:fragment>

			<svelte:fragment slot="tracks">
				{#each _tracks as track, index}
					<Track {index} trackID={track.id} showIndex on:dblclick={() => startQueue(index)} />
				{/each}
			</svelte:fragment>
		</Tracklist>
	{/if}
{/key}
