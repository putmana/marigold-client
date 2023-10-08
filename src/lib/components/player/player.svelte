<script lang="ts">
	import { fly, slide } from "svelte/transition"
	import { defaultColor } from "$lib/scripts/color-engine/color-engine"
	import { tracks, selectedTrackID, albums, covers } from "$lib/scripts/stores/LibraryStore"
	import {
		allQueuedTracks,
		currentTrack,
		initialized,
		nextTracks,
		playerController,
		prevTracks
	} from "$lib/scripts/stores/PlayerStore"

	let audio: HTMLAudioElement
	let queueTrack = $currentTrack

	$: if (queueTrack.key != $currentTrack.key) {
		queueTrack = $currentTrack
	}

	$: track = $tracks.get(queueTrack.trackID)
	$: album = $albums.get(track?.albumID)
	$: cover = $covers.get(album?.coverID)
	$: color = cover?.palette ?? defaultColor

	$: if ($initialized) {
		audio.src = track.file
		audio.play()
	}
</script>

{#if $initialized}
	<section
		class="wrapper"
		style={`--main-light: ${color.main.light}; --main-dark: ${color.main.dark}; --border-dark: ${color.border.dark};`}
		transition:slide={{ duration: 300, axis: "y" }}
	>
		<div class="inner-wrapper" />
	</section>
{/if}
<audio bind:this={audio} />
<div class="test">
	{#each $prevTracks as ptrack}
		<p class="blue">{$tracks.get(ptrack.trackID)?.title}</p>
	{/each}
	<p class="red">{track?.title}</p>
	{#each $nextTracks as ptrack}
		<p class="green">{$tracks.get(ptrack.trackID)?.title}</p>
	{/each}
	<button on:click={playerController.skipPrev}>PREV</button>
	<button on:click={playerController.shuffleTracks}> SHUFFLE </button>
	<button on:click={playerController.unshuffleTracks}> UNSHUFFLE </button>
	<button on:click={playerController.skipNext}>NEXT</button>
</div>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";
	.test {
		position: absolute;
		top: 0;
		left: 0;
		min-width: 50px;
		min-height: 50px;
		background-color: black;
		.blue {
			color: blue;
		}
		.red {
			color: red;
		}
		.green {
			color: green;
		}
	}

	.wrapper {
		position: fixed;
		inset: auto 0px 0px 0px;
		height: 60px;
		background-image: linear-gradient(to left, var(--main-light), var(--main-dark));

		// Hack to render border color properly
		.inner-wrapper {
			height: inherit;
			width: inherit;
			border-top: 1px solid var(--border-dark);
			box-sizing: border-box;
		}
	}
</style>
