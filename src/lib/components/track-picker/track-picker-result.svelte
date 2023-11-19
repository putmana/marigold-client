<script lang="ts">
	import { albums } from "$lib/scripts/library/AlbumsStore"
	import { tracks } from "$lib/scripts/library/TracksStore"

	export let trackID: string
	export let picked = false

	$: _track = $tracks.get(trackID)
	$: _cover = $albums?.get(_track.albumID).cover.small
</script>

<button class="wrapper" on:click class:picked>
	<span class="cover">
		<img src={_cover} alt={`cover for ${_track.title}`} />
	</span>
	<span class="info">
		<h3 class="title">
			{_track.title}
		</h3>
		<h4 class="artist">
			{_track.artists}
		</h4>
	</span>
	<span class="end">
		{#if picked}
			<img src="public/icons/check.svg" alt="checked box" />
		{:else}
			<img src="public/icons/uncheck.svg" alt="unchecked box" />
		{/if}
	</span>
</button>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		@include mixins.clickable;
		display: flex;
		width: 100%;
		border-radius: 5px;
		align-items: center;
		padding: 10px 15px 10px 15px;
		box-sizing: border-box;

		.cover {
			margin-right: 10px;
			height: 40px;
			width: 40px;
			border: 1px solid var(--secondary-border);
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
		.end {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
