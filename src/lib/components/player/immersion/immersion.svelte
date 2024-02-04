<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"

	import { albums } from "$lib/scripts/stores/LibraryStore"
	import type { RepeatMode } from "$lib/scripts/stores/PlayerStore"

	import { formatPlayerTime } from "$lib/scripts/utils"

	import PlayerBtnPlaypause from "../player-btn/player-btn-playpause.svelte"
	import PlayerBtnSkipprev from "../player-btn/player-btn-skipprev.svelte"
	import PlayerBtnSkipnext from "../player-btn/player-btn-skipnext.svelte"
	import PlayerBtnShuffle from "../player-btn/player-btn-shuffle.svelte"
	import PlayerBtnRepeat from "../player-btn/player-btn-repeat.svelte"
	import Scrub from "../scrub/scrub.svelte"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"

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

	function minimize() {
		dispatch("minimize")
	}
</script>

<div class="wrapper" style={_album.palette.toCSS()} transition:fly={{ duration: 200, y: 300 }}>
	<div class="close-btn">
		<ButtonIcon src="public/icons/close.svg" alt="Close icon" on:click={minimize} seamless />
	</div>
	<section class="cover">
		<img src={_album.cover.large} alt={`Cover for ${track.title}`} />
	</section>
	<section class="details">
		<div class="info">
			<h1 class="title">
				{track.title}
			</h1>
			<h2 class="artists">
				{track.artists}
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
				<PlayerBtnShuffle {shuffleEnabled} on:toggleshuffle />
				<PlayerBtnSkipprev on:skipprev />
				<PlayerBtnPlaypause {paused} on:playpause />
				<PlayerBtnSkipnext on:skipnext />
				<PlayerBtnRepeat {repeatMode} on:togglerepeat />
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";

	.wrapper {
		position: fixed;
		z-index: 10;
		width: 100svw;
		height: 100svh;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 60px;

		@include mixins.desktop-only {
			background-image: linear-gradient(to right, var(--primary-medium), var(--secondary-dark));
		}

		@include mixins.mobile-only {
			background-image: linear-gradient(to bottom, var(--primary-medium), var(--secondary-dark));
			flex-direction: column;
			max-height: 100svh;
		}

		.close-btn {
			position: absolute;
			inset: 30px auto auto 30px;
		}

		.cover {
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			max-width: 250px;

			img {
				display: block;
				max-width: 100%;
				box-shadow: 0px 0px 30px colors.$shadow;
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
