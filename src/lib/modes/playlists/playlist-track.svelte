<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import ContextMenu from "$lib/components/context-menu/context-menu.svelte"
	import ContextMenuOption from "$lib/components/context-menu/context-menu-option.svelte"
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"

	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { albums, library, tracks } from "$lib/scripts/stores/LibraryStore"
	import { confirm } from "$lib/components/confirmation-modal/confirmation-modal.svelte"
	import { PlaylistAPI } from "$lib/scripts/api/PlaylistAPI"

	const dispatch = createEventDispatcher()

	export let playlistTrack: PlaylistTrack
	export let index: number

	let track = $tracks.get(playlistTrack.id)
	let cover = $albums.get(track.albumID).cover

	function playTrack() {
		dispatch("play")
	}

	async function removeTrack() {
		const approved = await confirm({
			title: "Remove From Playlist",
			message: `Remove ${track.title} from this playlist?`
		})

		// Early return if the user declines the confirmation message
		if (!approved) return

		const r1 = await PlaylistAPI.removeTrack(playlistTrack.refID)

		if (r1.error) console.error(r1.error)
		await library.load()
	}

	function addTrackToQueue() {
		playerController.addTracksToQueue([track.id])
	}
</script>

<button class="wrapper" on:dblclick={playTrack}>
	<span class="index">{index + 1}</span>
	<span class="cover">
		<img src={cover.small} alt={`cover for ${track.title}`} />
	</span>

	<span class="info">
		<h3 class="title">{track.title}</h3>
		<h4 class="artist">{track.artists}</h4>
	</span>
	<span class="end">
		<BtnIconSeamless on:click={playTrack} src={"public/icons/play.svg"} />
		<ContextMenu>
			<ContextMenuOption label="Add to Queue" on:click={addTrackToQueue} />
			<ContextMenuOption label="Remove from Playlist" on:click={removeTrack} />
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
				@include mixins.clamp-text(1);
			}
			.artist {
				all: unset;
				@include mixins.clamp-text(1);
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
