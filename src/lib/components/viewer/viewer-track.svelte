<script lang="ts">
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { albums } from "$lib/scripts/library/AlbumsStore"
	import { tracks } from "$lib/scripts/library/TracksStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let trackID: string
	export let index: number
	export let showCover = true

	let shiftDown = false

	$: _track = $tracks.get(trackID)
	$: _album = $albums.get(_track?.albumID)
	$: _palette = Palette.parse(_album?.palette)

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

{#if _track}
	<button class="wrapper" style={_palette.toCSS()} on:click={handleClick}>
		<h1 class="index">{index + 1}</h1>
		{#if showCover}
			<span class="cover">
				<img src={_album.cover} alt={`cover for ${_track.title}`} />
			</span>
		{/if}
		<span class="info">
			<h3 class="title">{_track.title}</h3>
			<h4 class="artist">{_track.artists}</h4>
		</span>
	</button>
{/if}

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
