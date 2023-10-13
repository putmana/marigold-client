<script lang="ts">
	import { fly } from "svelte/transition"
	import { createEventDispatcher } from "svelte"
	import { albums, artists, covers, tracks } from "$lib/scripts/stores/LibraryStore"
	import { formatPlayerTime } from "$lib/scripts/utils"

	export let trackID: string
	export let paused: boolean
	export let shuffle: boolean
	export let repeat: "OFF" | "ONE" | "ALL"
	export let repeatEnabled = false
	export let currentTime: number
	export let duration: number

	let dispatch = createEventDispatcher()

	$: track = $tracks.get(trackID)
	$: album = $albums.get(track.albumID)
	$: artist = $artists.get(album.artistID)
	$: cover = $covers.get(album.coverID)

	$: if (repeat === "ALL" || repeat === "ONE") {
		repeatEnabled = true
	} else {
		repeatEnabled = false
	}

	$: s_currentTime = formatPlayerTime(currentTime)
	$: s_duration = formatPlayerTime(duration)
	$: formattedTime = `${s_currentTime}  /  ${s_duration}`

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
</script>

<footer class="wrapper" style={cover.palette} transition:fly={{ duration: 300, y: 60 }}>
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
			<button class="btn hide-on-mobile" on:click={toggleshuffle} class:toggled={shuffle}>
				<img class="smaller" src="public/icons/shuffle.svg" alt="Shuffle" />
			</button>
			<button class="btn hide-on-mobile" on:click={skipprev}>
				<img src="public/icons/skip-prev.svg" alt="Previous Track" />
			</button>
			<button class="btn" on:click={playpause}>
				{#if paused}
					<img class="larger" src="public/icons/play.svg" alt="Play" />
				{:else}
					<img class="larger" src="public/icons/pause.svg" alt="Pause" />
				{/if}
			</button>
			<button class="btn hide-on-mobile" on:click={skipnext}>
				<img src="public/icons/skip-next.svg" alt="Next Track" />
			</button>

			<button class="btn hide-on-mobile" on:click={togglerepeat} class:toggled={repeatEnabled}>
				{#if repeat === "ONE"}
					<img class="smaller" src="public/icons/repeat-one.svg" alt="Repeat" />
				{:else}
					<img class="smaller" src="public/icons/repeat.svg" alt="Repeat" />
				{/if}
			</button>
		</section>
		<section class="options hide-on-mobile">
			<div class="time">
				{formattedTime}
			</div>
			<button class="btn hide-on-mobile">
				<img class="smaller" src="public/icons/queue.svg" alt="Queue" />
			</button>
		</section>
	</div>
</footer>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";

	.wrapper {
		position: fixed;
		background-image: linear-gradient(to left, var(--primary-medium), var(--secondary-dark));

		@include mixins.desktop-only {
			inset: auto 0px 0px 0px;
			box-shadow: 0px 0px 50px colors.$shadow;
		}

		@include mixins.mobile-only {
			inset: auto 10px 40px 10px;
			border-radius: 5px;

			box-shadow: 0px 60px 60px 60px colors.$shadow-dark;
		}

		.inner-wrapper {
			max-height: 60px;
			display: flex;
			overflow: hidden;

			@include mixins.mobile-only {
				border: 1px solid colors.$border-bright;
				border-radius: 5px;
			}

			@include mixins.desktop-only {
				border-top: 1px solid colors.$border-hover;
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
</style>
