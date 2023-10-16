<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"
	import { albums, artists, covers, tracks } from "$lib/scripts/stores/LibraryStore"
	import { formatPlayerTime } from "$lib/scripts/utils"
	import Scrub from "../scrub/scrub.svelte"
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"
	import ListerItem from "$lib/components/lister/lister-item.svelte"
	import Queue from "$lib/components/queue/queue.svelte"

	const ICON_PLAY = "public/icons/play.svg"
	const ICON_PAUSE = "public/icons/pause.svg"

	const ICON_REPEAT_ALL = "public/icons/repeat.svg"
	const ICON_REPEAT_ONE = "public/icons/repeat-one.svg"

	export let trackID: string
	export let shuffleEnabled: boolean
	export let repeatMode: RepeatMode
	export let paused: boolean
	export let currentTime: number
	export let duration: number

	let showQueue = false

	let dispatch = createEventDispatcher()

	$: track = $tracks.get(trackID)
	$: album = $albums.get(track.albumID)
	$: artist = $artists.get(album.artistID)
	$: cover = $covers.get(album.coverID)
	$: repeatEnabled = repeatMode === "OFF" ? false : true

	$: s_currentTime = formatPlayerTime(currentTime)
	$: s_duration = formatPlayerTime(duration)
	$: formattedTime = `${s_currentTime}  /  ${s_duration}`

	$: playpauseIcon = paused ? ICON_PLAY : ICON_PAUSE
	$: repeatIcon = repeatMode == "ONE" ? ICON_REPEAT_ONE : ICON_REPEAT_ALL

	function playpause() {
		dispatch("playpause")
	}

	function skipnext() {
		dispatch("skipnext")
	}

	function skipprev() {
		dispatch("skipprev")
	}

	function toggleshuffle() {
		dispatch("toggleshuffle")
	}

	function togglerepeat() {
		dispatch("togglerepeat")
	}

	function togglequeue() {
		showQueue = !showQueue
	}
</script>

<footer class="wrapper" style={cover.palette} transition:fly={{ duration: 300, y: 60 }}>
	<div class="scrub">
		<Scrub {currentTime} {duration} palette={cover.palette} on:scrub />
	</div>
	<div class="inner-wrapper">
		<section class="info">
			<div class="cover">
				<img src={cover.fileLarge} alt={`Cover art for ${album.title}`} />
			</div>
			<div class="details">
				<h1 class="title">{track.title}</h1>
				<h2 class="artist">{artist.name}</h2>
			</div>
		</section>
		<section class="controls">
			<button class="btn hide-on-mobile" on:click={toggleshuffle} class:toggled={shuffleEnabled}>
				<img class="smaller" src="public/icons/shuffle.svg" alt="Shuffle" />
			</button>
			<button class="btn hide-on-mobile" on:click={skipprev}>
				<img src="public/icons/skip-prev.svg" alt="Previous Track" />
			</button>
			<button class="btn" on:click={playpause}>
				<img class="larger" src={playpauseIcon} alt="Play" />
			</button>
			<button class="btn hide-on-mobile" on:click={skipnext}>
				<img src="public/icons/skip-next.svg" alt="Next Track" />
			</button>

			<button class="btn hide-on-mobile" on:click={togglerepeat} class:toggled={repeatEnabled}>
				<img class="smaller" src={repeatIcon} alt="Repeat" />
			</button>
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
	<div class="queuebox" style={cover.palette} transition:fly={{ duration: 300, x: 300 }}>
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
			box-shadow: 0px 0px 50px colors.$shadow;
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
					border-right: 1px solid colors.$border-hover;
					box-sizing: border-box;
					img {
						height: 100%;
						width: 100%;
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
