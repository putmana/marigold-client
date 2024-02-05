<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"

	import { albums } from "$lib/scripts/stores/LibraryStore"
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"

	import { formatPlayerTime } from "$lib/scripts/utils"

	import Queue from "$lib/components/queue/queue.svelte"
	import Scrub from "../scrub/scrub.svelte"

	import PlayerBtnPlaypause from "../player-btn/player-btn-playpause.svelte"
	import PlayerBtnSkipprev from "../player-btn/player-btn-skipprev.svelte"
	import PlayerBtnSkipnext from "../player-btn/player-btn-skipnext.svelte"
	import PlayerBtnShuffle from "../player-btn/player-btn-shuffle.svelte"
	import PlayerBtnRepeat from "../player-btn/player-btn-repeat.svelte"
	import PlayerBtnQueue from "../player-btn/player-btn-queue.svelte"
	import PlayerBtnMaximize from "../player-btn/player-btn-maximize.svelte"

	export let track: Track
	export let shuffleEnabled: boolean
	export let repeatMode: RepeatMode
	export let paused: boolean
	export let currentTime: number
	export let duration: number

	let queueEnabled = false

	let dispatch = createEventDispatcher()

	$: _album = $albums.get(track.albumID)

	$: _currentTime = formatPlayerTime(currentTime)
	$: _duration = formatPlayerTime(duration)

	$: formattedTime = `${_currentTime} / ${_duration}`
</script>

<footer class="wrapper" style={_album.palette.toCSS()} transition:fly={{ duration: 300, y: 60 }}>
	<section class="scrub">
		<Scrub {currentTime} {duration} palette={_album.palette} />
	</section>

	<section class="controls">
		<div class="start">
			<div class="cover">
				<img src={_album.cover.small} alt={`Cover art for ${_album.title}`} />
			</div>
			<ul class="details">
				<li class="title">{track.title}</li>
				<li class="artist">{track.artists}</li>
			</ul>
		</div>
		<div class="middle">
			<div class="buttons">
				<PlayerBtnShuffle {shuffleEnabled} on:toggleshuffle />
				<PlayerBtnSkipprev on:skipprev />
				<PlayerBtnPlaypause {paused} on:playpause />
				<PlayerBtnSkipnext on:skipnext />
				<PlayerBtnRepeat {repeatMode} on:togglerepeat />
			</div>
		</div>
		<div class="end">
			<div class="time">
				{formattedTime}
			</div>
			<PlayerBtnMaximize on:maximize />
		</div>
	</section>
</footer>

<style lang="scss">
	@use "/src/lib/ui/button/button";
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	.wrapper {
		background-color: var(--secondary-dark);
		background-image: linear-gradient(to right, var(--secondary-dark), var(--primary-medium));
		display: flex;
		flex-direction: column;
		transition: height 0.2s ease;

		.controls {
			display: flex;
			padding: vars.$item_gap;

			.start {
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

			.middle {
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
			}

			.end {
				display: flex;
				flex: 1;
				justify-content: flex-end;
				align-items: center;
				padding: 0 vars.$item_gap;
				gap: vars.$item_gap;
			}
		}
	}
</style>
