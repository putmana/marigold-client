<script lang="ts">
	import { albums, artists, covers, tracks } from "$lib/scripts/stores/LibraryStore"

	export let trackID: string

	$: track = $tracks.get(trackID)
	$: album = $albums.get(track.albumID)
	$: artist = $artists.get(album.artistID)
	$: cover = $covers.get(album.coverID)
</script>

<footer class="wrapper" style={cover.palette}>
	<div class="inner-wrapper">
		<section class="info">
			<div class="cover">
				<img class="cover" src={cover.fileLarge} alt={`Cover art for ${album.title}`} />
			</div>
			<div class="details">
				<h1 class="title">{track.title}</h1>
				<h2 class="artist">{artist.name}</h2>
			</div>
		</section>
	</div>
</footer>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";

	.wrapper {
		position: fixed;
		inset: auto 0px 0px 0px;
		background-image: linear-gradient(to left, var(--primary-medium), var(--secondary-dark));
		box-shadow: 0px 0px 50px colors.$shadow;
		.inner-wrapper {
			max-height: 60px;
			display: flex;
			border-top: 1px solid colors.$border-hover;
			.info {
				display: flex;
				gap: 15px;
				.cover {
					height: inherit;
					width: inherit;
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
		}
	}
</style>
