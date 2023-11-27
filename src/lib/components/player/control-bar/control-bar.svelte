<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"

	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"

	import { formatPlayerTime } from "$lib/scripts/utils"

	import PlayPauseBtn from "$lib/components/controls/play-pause-btn.svelte"
	import SkipNextBtn from "$lib/components/controls/skip-next-btn.svelte"
	import SkipPrevBtn from "$lib/components/controls/skip-prev-btn.svelte"
	import ToggleShuffleBtn from "$lib/components/controls/toggle-shuffle-btn.svelte"
	import ToggleRepeatBtn from "$lib/components/controls/toggle-repeat-btn.svelte"
	import Scrub from "../scrub/scrub.svelte"
	import Queue from "$lib/components/queue/queue.svelte"

	export let trackID: string
	export let shuffleEnabled: boolean
	export let repeatMode: RepeatMode
	export let paused: boolean
	export let currentTime: number
	export let duration: number

	let showQueue = false

	let dispatch = createEventDispatcher()

	$: _track = $tracks.get(trackID)
	$: _album = $albums.get(_track?.albumID)

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
	<div class="scrub">
		<Scrub {currentTime} {duration} palette={_album.palette} on:scrub />
	</div>
	<div class="inner-wrapper">
		<button class="info" on:click={maximize}>
			<div class="cover">
				<img src={_album.cover.small} alt={`Cover art for ${_album.title}`} />
			</div>
			<div class="details">
				<h1 class="title">{_track.title}</h1>
				<h2 class="artist">{_track.artists}</h2>
			</div>
		</button>
		<section class="controls">
			<ToggleShuffleBtn {shuffleEnabled} on:toggleshuffle desktoponly />
			<SkipPrevBtn on:skipprev desktoponly />
			<PlayPauseBtn {paused} on:playpause />
			<SkipNextBtn on:skipnext desktoponly />
			<ToggleRepeatBtn {repeatMode} on:togglerepeat desktoponly />
		</section>
		<section class="options hide-on-mobile">
			<div class="time">
				{formattedTime}
			</div>
			<button class="btn hide-on-mobile" on:click={togglequeue} class:toggled={showQueue}>
				<img class="smaller" src="public/icons/queue.svg" alt="Queue" />
			</button>
		</section>
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
	@use "/src/style/colors";
	@use "/src/style/mixins";

	.wrapper {
		position: fixed;

		@include mixins.desktop-only {
			inset: auto 0px 0px 0px;
			background-image: linear-gradient(to left, var(--primary-medium), var(--secondary-dark));
			box-shadow: 0px 0px 30px colors.$shadow;
		}

		@include mixins.mobile-only {
			inset: auto 10px 60px 10px;
			border-radius: 5px;
			background-image: linear-gradient(to left, var(--primary-medium), var(--secondary-medium));
			box-shadow: 0px 60px 60px 60px colors.$shadow-dark;
		}

		.scrub {
			border-bottom: 1px solid colors.$border-hover;

			@include mixins.mobile-only {
				display: none;
			}
		}

		.inner-wrapper {
			max-height: 60px;
			display: flex;
			overflow: hidden;

			@include mixins.mobile-only {
				border: 1px solid colors.$border-bright;
				border-radius: 5px;
			}

			.info {
				@include mixins.clickable;
				display: flex;
				gap: 15px;

				@include mixins.desktop-only {
					width: 300px;
				}

				@include mixins.mobile-only {
					flex-grow: 1;
				}

				.cover {
					height: inherit;
					width: 60px;
					img {
						border-right: 1px solid colors.$border-hover;
						height: 100%;
					}
				}
				.details {
					display: flex;
					flex-direction: column;
					justify-content: center;
					h1 {
						margin: 0;
						font-size: inherit;
					}
					h2 {
						margin: 0;
						font-size: smaller;
						font-weight: normal;
						opacity: 0.8;
					}
				}
			}
			.controls {
				display: flex;
				gap: 5px;
				align-items: center;

				@include mixins.desktop-only {
					flex-grow: 1;
					justify-content: center;
				}

				@include mixins.mobile-only {
					justify-content: end;
					padding-right: 5px;
				}
			}

			.options {
				display: flex;
				justify-content: end;
				align-items: center;
				padding-right: 15px;
				width: 300px;
				gap: 15px;

				.time {
					font-size: smaller;
				}
			}
		}

		@include mixins.mobile-only {
			.hide-on-mobile {
				display: none !important;
			}
		}
	}

	.btn {
		@include mixins.clickable;

		display: flex;
		flex-direction: column;

		justify-content: center;
		align-items: center;

		height: 50px;
		width: 50px;

		border-radius: 5px;

		img {
			width: 25px;

			&.smaller {
				width: 15px;
			}

			&.larger {
				width: 35px;
			}
		}

		&::after {
			content: "";
			height: 0px;
			width: 0px;
			border-radius: 5px;
			background-color: var(--primary-verylight);
			transition: all 0.2s ease-in-out;
		}

		&.toggled {
			&::after {
				content: "";
				margin-top: 5px;
				width: 15px;
				height: 5px;
			}
		}
	}

	.queuebox {
		position: fixed;
		inset: auto 10px 75px auto;
		background-image: linear-gradient(to left, var(--primary-medium), var(--secondary-dark));
		background-size: 100vw;
		background-position: right;
		box-shadow: 0px 0px 50px colors.$shadow;
		border-radius: 5px;

		@include mixins.mobile-only {
			display: none;
		}

		.inner-wrapper {
			display: flex;
			flex-direction: column;
			overflow-y: scroll;
			height: 425px;
			width: 350px;
			border: 1px solid colors.$border-hover;
			border-radius: 5px;
			box-sizing: border-box;
			padding: 5px;
		}
	}
</style>
