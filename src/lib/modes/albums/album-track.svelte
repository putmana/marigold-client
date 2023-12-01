<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import ContextMenu from "$lib/components/context-menu/context-menu.svelte"
	import ContextMenuOption from "$lib/components/context-menu/context-menu-option.svelte"
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"
	import TrackEditor from "$lib/components/track-editor/track-editor.svelte"

	import { TrackAPI } from "$lib/scripts/api/TrackAPI"

	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { confirm } from "$lib/components/confirmation-modal/confirmation-modal.svelte"
	import { AudioAPI } from "$lib/scripts/api/AudioAPI"
	import { user } from "$lib/scripts/stores/UserStore"

	const dispatch = createEventDispatcher()

	export let track: Track
	export let index: number

	let editing = false

	function playTrack() {
		dispatch("play")
	}

	function editTrack() {
		playerController.resetQueue()
		editing = true
	}

	async function removeTrack() {
		const approved = await confirm({
			title: "Delete Track",
			message: `Permanently delete "${track.title}"? This cannot be undone.`
		})

		// Early return if the user declines the confirmation message
		if (!approved) return

		try {
			// Reset the queue to prevent any weird behavior
			playerController.resetQueue()

			// Delete the audio file
			await AudioAPI.remove(track.id, $user.id)

			// Delete the track from the database
			await TrackAPI.remove(track)

			// Load changes
			await library.load()
		} catch (error) {
			console.error(error)
		}
	}

	function addTrackToQueue() {
		playerController.addTracksToQueue([track.id])
	}
</script>

<TrackEditor bind:visible={editing} {track} />
<button class="wrapper" on:dblclick={playTrack}>
	<span class="index">{index + 1}</span>
	<span class="info">
		<h3 class="title">{track.title}</h3>
		<h4 class="artist">{track.artists}</h4>
	</span>
	<span class="end">
		<BtnIconSeamless on:click={playTrack} src={"public/icons/play.svg"} />
		<ContextMenu>
			<ContextMenuOption label="Add to Queue" on:click={addTrackToQueue} />
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
