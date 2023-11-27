<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import ContextMenu from "../context-menu/context-menu.svelte"
	import ContextMenuOption from "../context-menu/context-menu-option.svelte"
	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"
	import TrackEditor from "../track-editor/track-editor.svelte"

	import { TrackAPI } from "$lib/scripts/api/TrackAPI"

	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { albums, library } from "$lib/scripts/stores/LibraryStore"

	const dispatch = createEventDispatcher()

	export let track: Track
	export let index: number
	export let showCover = true

	let editing = false

	$: _cover = $albums.get(track.albumID)?.cover.small ?? ""

	function playTrack() {
		dispatch("play")
	}

	function editTrack() {
		playerController.resetQueue()
		editing = true
	}

	async function removeTrack() {
		const r1 = await TrackAPI.remove(track)
		if (r1.error) console.error(r1.error)
		await library.load()
		console.log("Deleting track")
	}

	function addTrackToQueue() {
		playerController.addTracksToQueue([track.id])
	}
</script>

<TrackEditor bind:visible={editing} {track} />
<button class="wrapper" on:dblclick={playTrack}>
	<span class="index">{index + 1}</span>
	{#if showCover}
		<span class="cover">
			<img src={_cover} alt={`cover for ${track.title}`} />
		</span>
	{/if}
	<span class="info">
		<h3 class="title">{track.title}</h3>
		<h4 class="artist">{track.artists}</h4>
	</span>
	<span class="end">
		<BtnIconSeamless on:click={playTrack} src={"public/icons/play.svg"} />
		<ContextMenu>
			<ContextMenuOption label="Add to Queue" on:click={addTrackToQueue} />
			<ContextMenuOption label="Add Track to Playlist" />

			<ContextMenuOption label="Edit Track" on:click={editTrack} />
			<ContextMenuOption label="Delete Track" on:click={removeTrack} />
		</ContextMenu>
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
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 20px;
			font-size: larger;
			opacity: 0%;
		}

		.cover {
			margin-right: 20px;
			height: 40px;
			width: 40px;

			img {
				height: inherit;
				box-shadow: 0px 0px 5px colors.$shadow-faint;
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

		.end {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 60px;
			padding: 0px 10px;
			transition: opacity 0.2s ease;
			gap: 5px;
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			.index {
				opacity: 100%;
				min-width: 60px;
			}
			.cover {
				height: 40px;
				width: 40px;
			}
			.end {
				min-width: 60px;
				opacity: 0%;
			}

			&:hover,
			&:focus,
			&:focus-within {
				.end {
					opacity: 100%;
				}
			}
		}
	}
</style>
