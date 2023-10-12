<script lang="ts">
	import { tracks } from "$lib/scripts/stores/LibraryStore"
	import {
		currentTrack,
		initialized,
		nextTracks,
		playerController,
		prevTracks
	} from "$lib/scripts/stores/PlayerStore"

	import ControlBar from "./control-bar/control-bar.svelte"
	import Immersion from "./immersion/immersion.svelte"

	let maximized = false

	let audio: HTMLAudioElement
	let playingTrack = $currentTrack

	// Only update the currentply playing track if the key changes to prevent Svelte from restarting the audio when unrelated parts of the PlayerStore change
	$: if (playingTrack.key != $currentTrack.key) {
		playingTrack = $currentTrack
	}

	$: if ($initialized) {
		audio.src = $tracks.get(playingTrack.trackID).file
		audio.play()
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "k") {
			maximized = !maximized
			console.log(maximized)
			e.preventDefault()
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />
{#if $initialized}
	{#if maximized}
		<Immersion />
	{:else}
		<ControlBar trackID={playingTrack.trackID} />
	{/if}
{/if}
<audio bind:this={audio} />
