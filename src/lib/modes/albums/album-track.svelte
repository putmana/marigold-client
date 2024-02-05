<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import ContextMenu from "$lib/components/context-menu/context-menu.svelte"
	import ContextMenuOption from "$lib/components/context-menu/context-menu-option.svelte"
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"
	import { openTrackEditorModal } from "$lib/components/track-editor/track-editor.svelte"

	import { TrackAPI } from "$lib/scripts/api/TrackAPI"

	import { playerController } from "$lib/scripts/stores/PlayerStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { confirm } from "$lib/components/confirmation-modal/confirmation-modal.svelte"
	import { AudioAPI } from "$lib/scripts/api/AudioAPI"
	import { user } from "$lib/scripts/stores/UserStore"

	const dispatch = createEventDispatcher()

	export let track: Track
	export let index: number

	function playTrack() {
		dispatch("play")
	}

	function editTrack() {
		openTrackEditorModal(track)
	}

	async function removeTrack() {
		const approved = await confirm(
			"Delete Track",
			`Delete "${track.title}"? This cannot be undone.`
		)

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

<button class="seamless" on:dblclick={playTrack}>
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
	@use "/src/lib/ui/button/button";
	@use "/src/lib/ui/mixins";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/vars";

	button {
		@include button.base;

		.index {
			width: 4rem;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: vars.$item_gap;
			flex-grow: 1;
		}
		.end {
		}
	}
</style>
