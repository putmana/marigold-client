<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"

	import { albums } from "$lib/scripts/library/AlbumsStore"
	import { tracks } from "$lib/scripts/library/TracksStore"
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"

	import { formatPlayerTime } from "$lib/scripts/utils"

	import PlayPauseBtn from "$lib/components/controls/play-pause-btn.svelte"
	import SkipNextBtn from "$lib/components/controls/skip-next-btn.svelte"
	import SkipPrevBtn from "$lib/components/controls/skip-prev-btn.svelte"
	import ToggleShuffleBtn from "$lib/components/controls/toggle-shuffle-btn.svelte"
	import ToggleRepeatBtn from "$lib/components/controls/toggle-repeat-btn.svelte"
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"
	import Scrub from "../scrub/scrub.svelte"

	export let trackID: string
	export let shuffleEnabled: boolean
	export let repeatMode: RepeatMode
	export let paused: boolean
	export let currentTime: number
	export let duration: number

	let showQueue = false

	let dispatch = createEventDispatcher()

	$: _track = $tracks.get(trackID)
	$: _album = $albums.get(_track.albumID)

	$: _currentTime = formatPlayerTime(currentTime)
	$: _duration = formatPlayerTime(duration)

	function minimize() {
		dispatch("minimize")
	}
</script>

<div class="wrapper" style={_album.palette.toCSS()} transition:fly={{ duration: 200, y: 300 }}>
	<div class="close-btn">
		<BtnIconSeamless src="public/icons/close.svg" on:click={minimize} />
	</div>
	<section class="cover">
		<img src={_album.cover.large} alt={`Cover for ${_track.title}`} />
	</section>
	<section class="details">
		<div class="info">
			<h1 class="title">
				{_track.title}
			</h1>
			<h2 class="artists">
				{_track.artists}
			</h2>
		</div>
		<div class="controls">
			<div class="scrub">
				<div class="time">
					<span>{_currentTime}</span>
					<span>{_duration}</span>
				</div>
				<Scrub {currentTime} {duration} palette={_album.palette} on:scrub />
			</div>
			<div class="buttons">
				<ToggleShuffleBtn {shuffleEnabled} on:toggleshuffle />
				<SkipPrevBtn on:skipprev />
				<PlayPauseBtn {paused} on:playpause />
				<SkipNextBtn on:skipnext />
				<ToggleRepeatBtn {repeatMode} on:togglerepeat />
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";

	.wrapper {
		position: fixed;
		inset: 0px 0px 0px 0px;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 60px;

		@include mixins.desktop-only {
			background-image: linear-gradient(to right, var(--primary-medium), var(--secondary-dark));
		}

		@include mixins.mobile-only {
			background-image: linear-gradient(to bottom, var(--primary-medium), var(--secondary-dark));
			flex-direction: column;
		}

		.close-btn {
			position: absolute;
			inset: 30px auto auto 30px;
		}

		.cover {
			display: flex;
			justify-content: center;
			max-width: min(80%, 350px);

			img {
				display: block;
				max-width: 100%;
				box-shadow: 0px 0px 20px colors.$shadow;
			}
		}

		.details {
			display: flex;
			flex-direction: column;
			width: 400px;
			gap: 20px;

			@include mixins.mobile-only {
				width: min(80%, 350px);
			}

			.info {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 10px;

				.title {
					margin: 0px;

					@include mixins.desktop-only {
						font-size: xx-large;
					}

					@include mixins.mobile-only {
						font-size: x-large;
					}
				}

				.artists {
					margin: 0px;
					font-weight: normal;
					opacity: 80%;

					@include mixins.desktop-only {
						font-size: medium;
					}

					@include mixins.mobile-only {
						font-size: medium;
					}
				}
			}

			.controls {
				display: flex;
				flex-direction: column;
				gap: 30px;
				align-items: center;

				.scrub {
					display: flex;
					flex-direction: column;
					width: 100%;
					gap: 10px;

					.time {
						font-size: smaller;
						display: flex;
						justify-content: space-between;
					}
				}

				.buttons {
					width: 100%;
					display: flex;
					gap: 5px;
					justify-content: center;
				}
			}
		}
	}
</style>
