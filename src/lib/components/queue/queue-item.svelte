<script lang="ts">
	import { albums, artists, covers, tracks } from "$lib/scripts/stores/LibraryStore"
	import { formatArtists } from "$lib/scripts/utils"

	export let trackID: string

	$: _track = $tracks.get(trackID)
	$: _album = $albums.get(_track.albumID)
	$: _cover = $covers.get(_album.coverID)
	$: _artists = _track.orderedArtists.map((artist) => $artists.get(artist.id))
</script>

<button class="wrapper">
	<span class="cover">
		<img src={_cover.fileSmall} alt={`cover for ${_track.title}`} />
	</span>
	<span class="info">
		<h3 class="title">
			{_track.title}
		</h3>
		<h4 class="artist">
			{formatArtists(_artists)}
		</h4>
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
	}
</style>
