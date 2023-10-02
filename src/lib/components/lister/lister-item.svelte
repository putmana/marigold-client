<script lang="ts">
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let track: Track
	export let showCover = true

	function playTrack() {
		dispatch("play", {
			id: track.id,
			index: track.index
		})
	}
</script>

<button class="wrapper" style={`--border-dark: ${track.palette.border.dark}`} on:click={playTrack}>
	<h1 class="index">{track.index}</h1>
	{#if showCover}
		<span class="cover">
			<img src={track.cover.small} alt={`cover for ${track.title}`} />
		</span>
	{/if}
	<span class="info">
		<h3 class="title">{track.title}</h3>
		<h4 class="artist">{track.artist.name}</h4>
	</span>
</button>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		@include mixins.clickable;
		display: flex;
		padding-top: 10px;
		padding-bottom: 10px;
		border-radius: 5px;
		align-items: center;

		.index {
			all: unset;
			opacity: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			width: 20px;
			font-size: larger;
		}
		.cover {
			margin-right: 20px;
			height: 40px;
			width: 40px;
			border: 1px solid var(--border-dark);
			img {
				height: inherit;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			justify-content: center;

			.title {
				all: unset;
			}
			.artist {
				all: unset;
				opacity: 80%;
				font-size: smaller;
			}
		}
	}
	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			.index {
				opacity: 100%;
				width: 60px;
			}
			.cover {
				height: 40px;
				width: 40px;
			}
		}
	}
</style>
