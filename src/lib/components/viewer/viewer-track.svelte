<script lang="ts">
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { albums, artists, covers, tracks } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { formatArtists } from "$lib/scripts/utils"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let orderedTrack: OrderedTrack
	export let showCover = true

	let shiftDown = false

	$: _track = $tracks.get(orderedTrack.id)
	$: _album = $albums.get(_track.albumID)
	$: _cover = $covers.get(_album.coverID)
	$: _artists = _track.orderedArtists.map((artist) => $artists.get(artist.id))

	$: palette = Palette.parse(_cover.palette)

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Shift") shiftDown = true
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === "Shift") shiftDown = false
	}

	function handleClick() {
		if (shiftDown) {
			addTrackToQueue()
		} else {
			playTrack()
		}
	}

	function playTrack() {
		dispatch("play")
	}

	function addTrackToQueue() {
		playerController.addTracksToQueue([_track.id])
	}
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<button class="wrapper" style={palette.toCSS()} on:click={handleClick}>
	<h1 class="index">{orderedTrack.index}</h1>
	{#if showCover}
		<span class="cover">
			<img src={_cover.fileSmall} alt={`cover for ${_track.title}`} />
		</span>
	{/if}
	<span class="info">
		<h3 class="title">{_track.title}</h3>
		<h4 class="artist">{formatArtists(_artists)}</h4>
	</span>
</button>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		@include mixins.clickable;
		display: flex;
		padding-top: 10px;
		padding-bottom: 10px;
		border-radius: 5px;
		align-items: center;

		.index {
			all: unset;
			opacity: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			width: 20px;
			font-size: larger;
		}
		.cover {
			margin-right: 20px;
			height: 40px;
			width: 40px;
			border: 1px solid var(--secondary-border);
			img {
				height: inherit;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			justify-content: center;

			.title {
				all: unset;
			}
			.artist {
				all: unset;
				opacity: 80%;
				font-size: smaller;
			}
		}
	}
	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			.index {
				opacity: 100%;
				width: 60px;
			}
			.cover {
				height: 40px;
				width: 40px;
			}
		}
	}
</style>
