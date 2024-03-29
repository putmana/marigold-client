<script lang="ts">
	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"
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
	$: track = $tracks.get($currentTrack) ?? undefined

	// Only update the currently playing track if the key changes to prevent Svelte from restarting the audio when unrelated parts of the PlayerStore change
	$: if ($initialized && track) {
		if (trackSessionKey != $queueSessionKey) {
			trackSessionKey = $queueSessionKey

			file = track.file

			audio.load()
			audio.autoplay = true

			const album = $albums.get(track.albumID)

			if ("mediaSession" in navigator) {
				navigator.mediaSession.metadata = new MediaMetadata({
					title: track.title,
					artist: track.artists,
					album: album.title,
					artwork: [
						{
							src: album.cover.large,
							sizes: "500x500",
							type: "image/webp"
						}
					]
				})

				navigator.mediaSession.setActionHandler("previoustrack", skipprev)
				navigator.mediaSession.setActionHandler("nexttrack", skipnext)
			}
		}
	} else {
		file = ""
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

{#if $initialized && track}
	{#if maximized}
		<Immersion
			{track}
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
			{track}
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
