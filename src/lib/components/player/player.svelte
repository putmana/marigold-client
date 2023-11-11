<script lang="ts">
	import { tracks } from "$lib/scripts/library/TracksStore"
	import {
		currentTrack,
		initialized,
		playerController,
		queueRepeatMode,
		queueSessionKey,
		queueShuffleEnabled
	} from "$lib/scripts/stores/PlayerStore"

	import ControlBar from "./control-bar/control-bar.svelte"
	import Immersion from "./immersion/immersion.svelte"

	let file = ""
	let paused = true
	let maximized = false
	let currentTime = 0
	let duration = 0

	let audio: HTMLAudioElement
	let trackSessionKey = ""

	$: shuffleEnabled = $queueShuffleEnabled
	$: repeatMode = $queueRepeatMode
	$: trackID = $currentTrack

	// Only update the currently playing track if the key changes to prevent Svelte from restarting the audio when unrelated parts of the PlayerStore change
	$: if ($initialized) {
		if (trackSessionKey != $queueSessionKey) {
			trackSessionKey = $queueSessionKey
			file = $tracks.get($currentTrack).file
			audio.load()
			audio.autoplay = true
		}
	} else {
		file = ""
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "k") {
			maximized = !maximized
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
		// Restart the current track if more than two seconds in
		if (currentTime > 2) {
			currentTime = 0
			return
		}

		playerController.skipPrev()
	}

	function skipnext() {
		playerController.skipNext()
	}

	function autoskip() {
		playerController.autoSkipNext()
	}

	function toggleshuffle() {
		playerController.toggleShuffle()
	}

	function togglerepeat() {
		playerController.toggleRepeat()
	}

	function scrub(e: CustomEvent) {
		currentTime = e.detail.time
	}

	function minimize() {
		maximized = false
	}

	function maximize() {
		maximized = true
	}
</script>

<svelte:window on:keydown={handleKeyDown} />
{#if $initialized}
	{#if maximized}
		<Immersion
			{trackID}
			{paused}
			{shuffleEnabled}
			{repeatMode}
			{currentTime}
			{duration}
			on:playpause={playpause}
			on:skipprev={skipprev}
			on:skipnext={skipnext}
			on:toggleshuffle={toggleshuffle}
			on:togglerepeat={togglerepeat}
			on:scrub={scrub}
			on:minimize={minimize}
		/>
	{:else}
		<ControlBar
			{trackID}
			{paused}
			{shuffleEnabled}
			{repeatMode}
			{currentTime}
			{duration}
			on:playpause={playpause}
			on:skipprev={skipprev}
			on:skipnext={skipnext}
			on:toggleshuffle={toggleshuffle}
			on:togglerepeat={togglerepeat}
			on:scrub={scrub}
			on:maximize={maximize}
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
