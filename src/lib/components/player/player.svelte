<script lang="ts">
	import { tracks } from "$lib/scripts/stores/LibraryStore"
	import {
		atQueueEnd,
		currentTrack,
		initialized,
		nextTracks,
		playerController,
		prevTracks,
		repeatQueue,
		shuffleQueue
	} from "$lib/scripts/stores/PlayerStore"

	import ControlBar from "./control-bar/control-bar.svelte"
	import Immersion from "./immersion/immersion.svelte"

	let file = ""
	let paused = true
	let maximized = false
	let currentTime = 0
	let duration = 0
	let repeat: "OFF" | "ONE" | "ALL" = "OFF"

	let audio: HTMLAudioElement
	let playingTrack = $currentTrack

	$: shuffle = $shuffleQueue

	// Only update the currentply playing track if the key changes to prevent Svelte from restarting the audio when unrelated parts of the PlayerStore change
	$: if (playingTrack.key != $currentTrack.key) {
		playingTrack = $currentTrack
	}

	$: if ($initialized) {
		file = $tracks.get(playingTrack.trackID).file
		audio.load()
		audio.autoplay = true
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "k") {
			currentTime = audio.duration - 10
			e.preventDefault()
		}
	}

	function playpause() {
		paused = !paused
	}

	function skiptoindex(index: number) {
		playerController.skipToIndex(index)
	}

	function skipprev() {
		playerController.skipPrev()
	}

	function skipnext() {
		playerController.skipNext()
	}

	function autoskip() {
		if ($atQueueEnd && repeat === "ALL") {
			skiptoindex(0)
			return
		}

		if ($atQueueEnd && repeat === "OFF") {
			playerController.resetQueue()
			return
		}

		if (repeat === "ONE") {
			currentTime = 0
			paused = false
			return
		}

		skipnext()
	}

	function toggleshuffle() {
		if ($shuffleQueue) {
			playerController.unshuffleTracks()
		} else {
			playerController.shuffleTracks()
		}
	}

	function togglerepeat() {
		if (repeat === "OFF") {
			repeat = "ALL"
			return
		}

		if (repeat === "ALL") {
			repeat = "ONE"
			return
		}

		repeat = "OFF"
	}
</script>

<svelte:window on:keydown={handleKeyDown} />
{#if $initialized}
	{#if maximized}
		<Immersion />
	{:else}
		<ControlBar
			{paused}
			{shuffle}
			{repeat}
			{currentTime}
			{duration}
			trackID={playingTrack.trackID}
			on:playpause={playpause}
			on:skipprev={skipprev}
			on:skipnext={skipnext}
			on:toggleshuffle={toggleshuffle}
			on:togglerepeat={togglerepeat}
		/>
	{/if}
{/if}

<audio
	bind:this={audio}
	src={file}
	bind:paused
	bind:currentTime
	bind:duration
	on:ended={autoskip}
/>
