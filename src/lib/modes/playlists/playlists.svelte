<script lang="ts">
	import Button from "$lib/ui/button/button.svelte"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"
	import Icon from "$lib/ui/icon/icon.svelte"

	import Finder from "$lib/components/finder/finder.svelte"
	import FinderItemMedia from "$lib/components/finder/finder-item-media.svelte"
	import Tracklist from "$lib/components/tracklist/tracklist.svelte"
	import Track from "$lib/components/track/track.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"

	import { bgPalette } from "$lib/scripts/stores/PaletteStore"
	import { playlists, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { openPlaylistCreatorModal } from "./create/playlist-creator.svelte"
	import { openPlaylistEditorModal } from "./edit/playlist-editor.svelte"
	import { pluralize } from "$lib/scripts/utils"

	let hidden = true

	let selectedPlaylistID = ""

	$: _playlist = $playlists.get(selectedPlaylistID)
	$: _tracks = _playlist?.tracklist.map((t) => $tracks.get(t.id))

	$: $bgPalette = _playlist?.palette ?? Palette.gray

	$: details = [
		`${_playlist?.description}`,
		`Playlist • ${pluralize(_playlist?.tracklist.length, "track", "tracks")}`
	]

	function startQueue(index: number) {
		playerController.startQueue(
			_playlist.tracklist.map((t) => t.id),
			index
		)
	}
</script>

<Finder title="Playlists" palette={_playlist?.palette ?? Palette.gray}>
	<svelte:fragment slot="header">
		<ButtonIcon
			src="public/icons/add.svg"
			alt="Add album icon"
			on:click={openPlaylistCreatorModal}
			tooltip="Create a new playlist"
			seamless
			nopadding
		/>
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

{#key selectedPlaylistID}
	{#if _playlist}
		<Tracklist
			title={_playlist.title}
			{details}
			artSrc={_playlist.cover.large}
			artAlt={`Cover art for ${_playlist.title}`}
		>
			<svelte:fragment slot="actions">
				{#if _playlist.tracklist.length === 0}
					<Button>
						<Icon src="public/icons/playlist_add.svg" alt="Add to playlist icon" />
						<span>Add tracks</span>
					</Button>
				{:else}
					<Button>
						<Icon src="public/icons/play.svg" alt="Play icon" />
						<span>Play</span>
					</Button>
					<ButtonIcon
						src="public/icons/playlist-add.svg"
						alt="Add to playlist icon"
						tooltip="Add tracks to playlist"
					/>
				{/if}

				<ButtonIcon
					src="public/icons/edit.svg"
					alt="Edit icon"
					on:click={() => openPlaylistEditorModal(_playlist)}
					tooltip="Edit playlist details"
				/>
			</svelte:fragment>

			<svelte:fragment slot="tracks">
				{#each _tracks as track, index}
					<Track
						{index}
						trackID={track.id}
						showIndex
						showCover
						on:dblclick={() => startQueue(index)}
					/>
				{/each}
			</svelte:fragment>
		</Tracklist>
	{/if}
{/key}
