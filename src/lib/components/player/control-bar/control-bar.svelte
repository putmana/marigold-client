<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"

	import { albums } from "$lib/scripts/stores/LibraryStore"
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"

	import { formatPlayerTime } from "$lib/scripts/utils"

	import Queue from "$lib/components/queue/queue.svelte"

	import PlayerBtnPlaypause from "../player-btn/player-btn-playpause.svelte"
	import PlayerBtnSkipprev from "../player-btn/player-btn-skipprev.svelte"
	import PlayerBtnSkipnext from "../player-btn/player-btn-skipnext.svelte"
	import PlayerBtnShuffle from "../player-btn/player-btn-shuffle.svelte"
	import PlayerBtnRepeat from "../player-btn/player-btn-repeat.svelte"
	import Scrub from "../scrub/scrub.svelte"

	export let track: Track
	export let shuffleEnabled: boolean
	export let repeatMode: RepeatMode
	export let paused: boolean
	export let currentTime: number
	export let duration: number

	let showQueue = false

	let dispatch = createEventDispatcher()

	$: _album = $albums.get(track.albumID)

	$: _currentTime = formatPlayerTime(currentTime)
	$: _duration = formatPlayerTime(duration)

	$: formattedTime = `${_currentTime} / ${_duration}`

	function togglequeue() {
		showQueue = !showQueue
	}

	function maximize() {
		dispatch("maximize")
	}
</script>

<footer class="wrapper" style={_album.palette.toCSS()} transition:fly={{ duration: 300, y: 60 }}>
	<button class="info seamless" on:click={maximize}>
		<div class="cover">
			<img src={_album.cover.small} alt={`Cover art for ${_album.title}`} />
		</div>
		<ul class="details">
			<li class="title">{track.title}</li>
			<li class="artist">{track.artists}</li>
		</ul>
	</button>
	<div class="controls">
		<div class="buttons">
			<PlayerBtnShuffle {shuffleEnabled} on:toggleshuffle />
			<PlayerBtnSkipprev on:skipprev />
			<PlayerBtnPlaypause {paused} on:playpause />
			<PlayerBtnSkipnext on:skipnext />
			<PlayerBtnRepeat {repeatMode} on:togglerepeat />
		</div>
	</div>
	<div class="actions">
		<div class="time">
			{formattedTime}
		</div>
		<button class="btn" on:click={togglequeue} class:toggled={showQueue}>
			<img class="smaller" src="public/icons/queue.svg" alt="Queue" />
		</button>
	</div>
</footer>
{#if showQueue}
	<div class="queuebox" style={_album?.palette.toCSS()} transition:fly={{ duration: 300, x: 300 }}>
		<div class="inner-wrapper">
			<Queue />
		</div>
	</div>
{/if}

<style lang="scss">
	@use "/src/lib/ui/button/button";
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	.wrapper {
		background-color: var(--secondary-dark);
		background-image: linear-gradient(to right, var(--secondary-dark), var(--primary-medium));
		border-top: vars.$item_border;
		display: flex;
		padding: vars.$item_gap;

		.info {
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: flex-start;
			gap: calc(2 * vars.$item_gap);

			.cover {
				img {
					display: block;
					width: 2.75rem;
				}
			}

			.details {
				margin: 0;
				padding: 0;
				list-style-type: none;

				.artist {
					color: colors.$text_b;
				}
			}
		}

		.controls {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			justify-content: center;
			align-items: center;
			gap: vars.$item_gap;

			.buttons {
				display: flex;
				gap: vars.$item_gap;
			}

			.scrub {
				width: 80%;
			}
		}

		.actions {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			flex: 1;
		}
	}
</style>
