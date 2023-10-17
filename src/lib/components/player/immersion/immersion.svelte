<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"
	import { albums, artists, covers, tracks } from "$lib/scripts/stores/LibraryStore"
	import { formatPlayerTime } from "$lib/scripts/utils"
	import Scrub from "../scrub/scrub.svelte"
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"
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

	function minimize() {
		dispatch("minimize")
	}
</script>

<div class="wrapper" style={cover.palette} transition:fly={{ duration: 200, y: 300 }}>
	<button class="btn close-btn" on:click={minimize}>
		<img class="smaller" src="public/icons/close.svg" alt="Close" />
	</button>
	<main class="stage">
		<section class="cover">
			<img src={cover.fileLarge} alt={`Cover art for ${album.title}`} />
		</section>
		<section class="info">
			<div class="details">
				<h1>{track.title}</h1>

				<h2>{artist.name}</h2>
			</div>
			<div class="controls">
				<div class="scrub">
					<div class="time">
						<p>{formatPlayerTime(currentTime)}</p>
						<p>{formatPlayerTime(duration)}</p>
					</div>
					<Scrub {currentTime} {duration} palette={cover.palette} contained={true} on:scrub />
				</div>
				<div class="buttons">
					<button
						class="btn hide-on-mobile"
						on:click={toggleshuffle}
						class:toggled={shuffleEnabled}
					>
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
				</div>
			</div>
		</section>
	</main>
	<aside class="queuebox">
		<Queue showNow={false} />
	</aside>
</div>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";

	.wrapper {
		position: fixed;
		inset: 0px 0px 0px 0px;
		display: flex;
		background-image: linear-gradient(to left, var(--primary-medium), var(--secondary-dark));

		@include mixins.desktop-only {
		}

		@include mixins.mobile-only {
			flex-direction: column;
			overflow-y: scroll;
			scroll-snap-type: y proximity;
		}

		.stage {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 50px;
			flex-grow: 1;
			min-height: 100vh;

			.cover {
				border: 1px solid var(--primary-border);
				box-shadow: 0px 0px 50px colors.$shadow;

				@include mixins.desktop-only {
					width: 400px;
				}

				@include mixins.mobile-only {
					max-width: 320px;
					margin: 0px 30px 0px 30px;
				}
				img {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 10px;

				@include mixins.desktop-only {
					width: 80%;
				}
				@include mixins.mobile-only {
					padding: 30px;
					width: 100%;
					box-sizing: border-box;
				}

				.details {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 5px;

					h1 {
						margin: 0;

						@include mixins.desktop-only {
							font-size: x-large;
						}

						@include mixins.mobile-only {
							font-size: x-large;
						}
					}
					h2 {
						margin: 0;
						font-weight: normal;

						@include mixins.desktop-only {
							font-size: smaller;
						}

						@include mixins.mobile-only {
							font-size: smaller;
						}
					}
				}

				.controls {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 30px;
					width: 100%;

					.buttons {
						display: flex;

						@include mixins.desktop-only {
							gap: 15px;
						}
					}

					.scrub {
						display: flex;
						flex-direction: column;
						gap: 10px;
						width: 100%;

						.time {
							display: flex;
							justify-content: space-between;
							padding: 2px;
							p {
								margin: 0;
								font-size: smaller;
							}
						}
					}
				}
			}
		}
		.queuebox {
			@include mixins.mobile-only {
				display: flex;
				flex-direction: column;
				padding: 15px;
				box-sizing: border-box;
			}

			@include mixins.desktop-only {
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

		&.close-btn {
			position: absolute;
			inset: 10px auto auto 10px;
		}
	}
</style>

