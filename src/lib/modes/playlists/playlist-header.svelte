<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconText from "$lib/components/button/btn-icon-text.svelte"
	import BtnIcon from "$lib/components/button/btn-icon.svelte"

	const dispatch = createEventDispatcher()

	export let playlist: Playlist

	$: details = `Playlist 
		• ${playlist.tracklist.length} tracks
	`

	function play() {
		dispatch("play")
	}

	function openEditor() {
		dispatch("edit")
	}

	function openPicker() {
		dispatch("pick")
	}
</script>

<header class="wrapper" style={playlist.palette.toCSS()}>
	<section class="info">
		<h1 class="title">{playlist.title}</h1>
		<p class="details">{playlist.description}</p>
		<p class="details">{details}</p>
		<div class="header-btns">
			{#if playlist.tracklist.length === 0}
				<BtnIconText
					label="Add Tracks"
					src="public/icons/add-tracks.svg"
					alt="Add tracks icon"
					on:click={openPicker}
				/>
			{:else}
				<BtnIconText label="Play" src="public/icons/play.svg" alt="Play icon" on:click={play} />
				<BtnIcon src="public/icons/add-tracks.svg" alt="Add tracks icon" on:click={openPicker} />
			{/if}

			<BtnIcon src="public/icons/edit.svg" alt="Edit icon" on:click={openEditor} />
		</div>
	</section>
	<section class="cover">
		<div class="img-wrapper">
			<img src={playlist.cover.large} alt={`cover for ${playlist.title}`} />
		</div>
	</section>
</header>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		display: flex;
		flex-direction: column-reverse;
		box-sizing: border-box;
		padding: 20px;
		gap: 40px;
		border-bottom: 1px solid colors.$border;
		margin-bottom: 10px;
	}

	.info {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;

		.title {
			font-size: 24px;
			font-weight: 900;
			letter-spacing: -1px;
			margin: 0;
			margin-left: -2px;
		}

		.details {
			opacity: 80%;
			font-size: 16px;
			margin: 0;
		}

		.header-btns {
			display: flex;
			gap: 5px;
			margin-top: 15px;
		}
	}

	.cover {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		.img-wrapper {
			width: 200px;
			height: 200px;
			img {
				display: block;
				max-width: 100%;
				box-shadow: 0px 0px 30px colors.$shadow;
			}
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			padding-top: 60px;
		}
	}

	@media (min-width: sizes.$screen-xl) {
		.wrapper {
			justify-content: center;
			flex-direction: row;
			padding: 60px;
			gap: 60px;
			flex-wrap: wrap-reverse;
		}

		.cover {
			flex-grow: 0;
			.img-wrapper {
				max-width: 220px;
				max-height: 220px;
			}
		}

		.info {
			.title {
				font-size: 40px;
			}
		}
	}
</style>
